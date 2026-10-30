/* ACE Al Día · medición.
   1) Medición propia (siempre activa, anónima): visitas, clics, herramientas usadas y de qué anuncio viene cada visita (UTM).
      Se manda a tu planilla de Google (ver medicion/apps-script.gs). Usa un identificador aleatorio guardado en este navegador; no guarda datos personales.
   2) Píxeles de anuncios y mapa de calor (Meta, Google Analytics 4, TikTok, Microsoft Clarity): se cargan solo si la persona acepta las cookies de medición.
   Completá ACE_MEDICION con tus códigos. Lo que quede vacío, no se carga. */
window.ACE_MEDICION = Object.assign({
  ENDPOINT: "",        // URL de la aplicación web de Google Apps Script (termina en /exec)
  GA4: "",             // Google Analytics 4, por ejemplo "G-XXXXXXXXXX"
  META_PIXEL: "",      // píxel de Meta (Facebook e Instagram), por ejemplo "123456789012345"
  TIKTOK_PIXEL: "",    // píxel de TikTok
  CLARITY: "",         // Microsoft Clarity (mapas de calor y grabaciones), por ejemplo "abcd1234ef"
}, window.ACE_MEDICION || {});

(function () {
  const C = window.ACE_MEDICION, LS = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
  const SS = (k, v) => { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } };
  const id = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  const visitante = LS("ace-v") || (LS("ace-v", id()), LS("ace-v")) || id();
  const sesion = SS("ace-s") || (SS("ace-s", id()), SS("ace-s")) || id();

  // origen: UTM y referencia. Se guarda el primer origen (primer contacto) y el de esta visita
  const q = new URLSearchParams(location.search), utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ttclid"].forEach(k => { if (q.get(k)) utm[k] = q.get(k).slice(0, 120); });
  const ref = document.referrer && !document.referrer.startsWith(location.origin) ? new URL(document.referrer).hostname : "";
  if (Object.keys(utm).length || ref) SS("ace-origen", JSON.stringify({ ...utm, ref }));
  const origen = JSON.parse(SS("ace-origen") || LS("ace-origen1") || "{}");
  if (!LS("ace-origen1") && (Object.keys(origen).length)) LS("ace-origen1", JSON.stringify(origen));
  const primerOrigen = JSON.parse(LS("ace-origen1") || "{}");
  const fuente = o => o.utm_source || (o.fbclid ? "facebook" : o.gclid ? "google" : o.ttclid ? "tiktok" : o.ref || "directo");

  const pagina = location.pathname.includes("/herramientas") ? "herramientas" : location.pathname.includes("/panel") ? "panel" : "landing";
  const cola = [];
  function enviar(datos) {
    const cuerpo = JSON.stringify(datos);
    if (!C.ENDPOINT) { cola.push(datos); if (window.ACE_DEBUG) console.log("[medición]", datos); return true; }
    try { if (navigator.sendBeacon && navigator.sendBeacon(C.ENDPOINT, new Blob([cuerpo], { type: "text/plain" }))) return true; } catch (e) {}
    fetch(C.ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: cuerpo, keepalive: true }).catch(() => {});
    return true;
  }
  function base() {
    return { visitante, sesion, pagina, url: location.pathname + location.hash, fuente: fuente(origen), campana: origen.utm_campaign || "", contenido: origen.utm_content || "",
      medio: origen.utm_medium || "", primera_fuente: fuente(primerOrigen), ancho: innerWidth, fecha: new Date().toISOString() };
  }
  // evento propio + espejo en los píxeles que estén cargados
  function evento(nombre, extra = {}) {
    enviar({ tipo: "evento", evento: nombre, ...base(), ...extra });
    try { if (window.gtag) gtag("event", nombre.replace(/[^a-z0-9_]/gi, "_"), extra); } catch (e) {}
    try { if (window.fbq) fbq("trackCustom", nombre.replace(/[^a-z0-9_]/gi, "_"), extra); } catch (e) {}
  }
  // anotado: va a la hoja de anotados con todo lo que completó y su origen
  async function anotado(datos) {
    const ok = enviar({ tipo: "anotado", ...base(), ...datos, primer_origen: JSON.stringify(primerOrigen), origen: JSON.stringify(origen) });
    try { if (window.fbq) fbq("track", "Lead", { content_name: (datos.herramientas || []).join(",") }); } catch (e) {}
    try { if (window.gtag) gtag("event", "generate_lead", { herramientas: (datos.herramientas || []).join(",") }); } catch (e) {}
    try { if (window.ttq) ttq.track("SubmitForm"); } catch (e) {}
    return ok;
  }

  // ---- clics: se nombran solos (data-ev manda si está) ----
  const seccion = el => { const s = el.closest("section[id], header, footer, dialog"); return s ? (s.id || s.tagName.toLowerCase()) : "otra"; };
  function nombreClic(el) {
    if (el.dataset.ev) return el.dataset.ev;
    if (el.dataset.alta !== undefined) return el.dataset.alta ? "avisame:" + el.dataset.alta : "anotarme";
    const h = el.getAttribute("href") || "";
    if (/herramientas\/(index\.html)?#(\w+)/.test(h)) return "probar:" + h.split("#")[1];
    if (/herramientas\//.test(h)) return "probar:todas";
    if (h.startsWith("#")) return "ir:" + (h.slice(1) || "inicio");
    if (el.dataset.t) return "abrir:" + el.dataset.t;
    return (el.id || (el.textContent || "").trim().slice(0, 40) || el.tagName).toLowerCase();
  }
  document.addEventListener("click", e => {
    const el = e.target.closest("a, button, summary, label.drop, [data-ev]"); if (!el) return;
    const r = document.documentElement, x = Math.round(100 * e.pageX / Math.max(1, r.scrollWidth)), y = Math.round(e.pageY);
    evento("clic", { elemento: nombreClic(el), seccion: seccion(el), x, y });
  }, { capture: true });

  // ---- secciones vistas y profundidad de lectura ----
  if ("IntersectionObserver" in window) {
    const vistas = new Set(), io = new IntersectionObserver(es => es.forEach(en => { const s = en.target.id; if (en.isIntersecting && !vistas.has(s)) { vistas.add(s); evento("seccion_vista", { seccion: s }); } }), { threshold: .4 });
    addEventListener("DOMContentLoaded", () => document.querySelectorAll("section[id]").forEach(s => io.observe(s)));
  }
  const hitos = new Set(); addEventListener("scroll", () => { const r = document.documentElement, p = (scrollY + innerHeight) / Math.max(1, r.scrollHeight);
    [50, 90].forEach(h => { if (p * 100 >= h && !hitos.has(h)) { hitos.add(h); evento("lectura", { porcentaje: h }); } }); }, { passive: true });

  // ---- consentimiento y píxeles ----
  function cargar(src, attrs = {}) { const s = document.createElement("script"); s.async = true; s.src = src; Object.assign(s, attrs); document.head.appendChild(s); return s; }
  function pixeles() {
    if (C.GA4) { cargar("https://www.googletagmanager.com/gtag/js?id=" + C.GA4); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", C.GA4); }
    if (C.META_PIXEL) { !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"); fbq("init", C.META_PIXEL); fbq("track", "PageView"); }
    if (C.TIKTOK_PIXEL) { !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"]; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.load = function (e) { var n = "https://analytics.tiktok.com/i18n/pixel/events.js"; var a = d.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = n + "?sdkid=" + e + "&lib=" + t; var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(a, s) }; ttq.load(C.TIKTOK_PIXEL); ttq.page() }(window, document, "ttq"); }
    if (C.CLARITY) { (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", C.CLARITY); }
  }
  const hayPixeles = C.GA4 || C.META_PIXEL || C.TIKTOK_PIXEL || C.CLARITY;
  function banner() {
    const d = document.createElement("div"); d.className = "consent"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Cookies de medición");
    d.innerHTML = `<p>Usamos cookies de medición para saber qué herramientas interesan más y mejorar los anuncios. <a href="${pagina === "landing" ? "" : "../"}privacidad.html">Más información</a>.</p><div><button class="btn out sm" type="button" data-c="no">Solo necesarias</button><button class="btn sm" type="button" data-c="si">Aceptar</button></div>`;
    d.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (!b) return; LS("ace-consent", b.dataset.c); evento("consentimiento", { respuesta: b.dataset.c }); d.remove(); if (b.dataset.c === "si") pixeles(); });
    document.body.appendChild(d);
  }
  addEventListener("DOMContentLoaded", () => {
    evento("visita", { referencia: ref, titulo: document.title.slice(0, 80) });
    if (!hayPixeles) return;
    const c = LS("ace-consent"); if (c === "si") pixeles(); else if (!c) banner();
  });

  window.ACE = { evento, anotado, cola, visitante, origen, primerOrigen, fuente: () => fuente(origen) };
})();
