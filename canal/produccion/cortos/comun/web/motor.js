// Motor de escenas para los cortos verticales (1080x1920). Todo depende solo de t (segundos), así cada cuadro es reproducible.
// El episodio carga timeline.js (window.TL, con el momento de cada palabra) y agrega sus escenas en SCN, SETUP y RENDER.
const W = window.ANCHO || 1080, H = window.ALTO || 1920;   // los videos largos ponen ANCHO = 1920 y ALTO = 1080 antes de cargar el motor
const C = Object.fromEntries(TL.cues.map(c => [c.id, c]));
const S = id => C[id].start, E = id => C[id].end;
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, '');
// momento en que empieza a decirse una frase dentro de una línea (con los tiempos de cada palabra)
const AT = (id, frase) => {
  const c = C[id], q = norm(frase).split(' ').filter(Boolean), w = (c.words || []).map(x => norm(x.w));
  for (let i = 0; i + q.length <= w.length; i++) if (q.every((x, k) => w[i + k] === x)) return c.words[i].s;
  throw new Error('falta ' + frase + ' en ' + id);
};
// momento en que termina de decirse la frase
const ATE = (id, frase) => {
  const c = C[id], q = norm(frase).split(' ').filter(Boolean), w = c.words.map(x => norm(x.w));
  for (let i = 0; i + q.length <= w.length; i++) if (q.every((x, k) => w[i + k] === x)) return c.words[i + q.length - 1].e;
  throw new Error('falta ' + frase + ' en ' + id);
};
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const io = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;   // ease in-out
const eo = x => 1 - Math.pow(1 - x, 3);                                  // ease out
const back = x => 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2); // ease out con rebote
const P = (t, a, b) => clamp((t - a) / (b - a));
const win = (t, a, b, fi = .3, fo = .3) => Math.min(P(t, a, a + fi), 1 - P(t, b - fo, b));
const lerp = (a, b, x) => a + (b - a) * x;
const $ = id => document.getElementById(id);
const $$ = (sel, root = document) => root.querySelector(sel);
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function rnd(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function kb(img, k, s0, s1, x0 = 0, x1 = 0, y0 = 0, y1 = 0) {
  img.style.transform = `translate(${lerp(x0, x1, k).toFixed(1)}px,${lerp(y0, y1, k).toFixed(1)}px) scale(${lerp(s0, s1, k).toFixed(4)})`;
}
const typed = (t, t0, t1, txt) => txt.slice(0, t < t0 ? 0 : clamp(Math.floor((t - t0) / (t1 - t0) * txt.length) + 1, 0, txt.length));
// temblor reproducible (para teléfonos que vibran o la onda expansiva)
const shake = (t, amp, f = 38) => [amp * Math.sin(t * f * 6.283), amp * Math.sin(t * f * 4.71 + 1.3)];

// ---------- Registro ----------
const SCN = {};                 // id -> [entra, sale, fundido de entrada, fundido de salida, zoom final]
const SETUP = [], RENDER = [];
let T = 0;
const on = (id, pad = .2) => T > SCN[id][0] - pad && T < SCN[id][1] + pad;
function addCSS(css) { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }
function addHTML(html, parent = document.getElementById('stage')) { parent.insertAdjacentHTML('beforeend', html); }
const K = (id, t) => P(t, SCN[id][0], SCN[id][1]);
function scene(id, w, html) { addHTML(`<div class="scene" id="${id}"><div class="cam">${html}</div></div>`); SCN[id] = w; return $(id); }

// foto de fondo con Ken Burns; o = {src, pos, filter, kb:[s0,s1,x0,x1,y0,y1], inner}
const FILTER = 'saturate(.6) brightness(.6) contrast(1.08)';
function photoHTML(src, o = {}) {
  return `<div class="ph"><img src="img/${src}" style="object-position:${o.pos || '50% 50%'};filter:${o.filter || FILTER}"></div><div class="vig"></div>`;
}
function photo(id, w, src, o = {}) {
  const s = scene(id, w, photoHTML(src, o) + (o.inner || ''));
  if (o.credit !== '') addHTML(`<div class="credit">${o.credit || CRED[src] || ''}</div>`, s);
  const img = $$('.ph img', s), k = o.kb || [1.04, 1.14, 0, 0, 0, 0];
  RENDER.push(t => { if (on(id)) kb(img, K(id, t), ...k); });
  return s;
}

// ---------- Subtítulos ----------
// Las palabras aparecen cuando se dicen, en grupos cortos; las palabras clave van en color.
// KW: lista de [cue, palabra, color] con color r (peligro), g (a salvo) o a (dato).
function captions(KW = [], o = {}) {
  const kw = {}; for (const [c, w, col] of KW) kw[c + '|' + norm(w)] = col;
  const words = [];
  for (const c of TL.cues) for (const x of (c.words || [])) words.push({ ...x, cue: c.id, col: kw[c.id + '|' + norm(x.w)] });
  const groups = []; let g = null;
  for (let i = 0; i < words.length; i++) {
    const w = words[i], prev = words[i - 1];
    const brk = !g || g.cue !== w.cue || /[.,:;?!]$/.test(prev.w) || g.words.length >= (o.max || 3)
      || g.chars + w.w.length > (o.chars || 16) || w.s - prev.e > .35 || (o.breaks || []).includes(w.cue + '|' + i);
    if (brk) { g = { cue: w.cue, words: [], chars: 0 }; groups.push(g); }
    g.words.push(w); g.chars += w.w.length + 1;
  }
  for (const g of groups) g.a = g.words[0].s - .04;
  groups.forEach((g, i) => {
    const end = g.words[g.words.length - 1].e, nx = groups[i + 1];
    g.b = nx && nx.a - end < .7 ? nx.a : end + .45;
  });
  addHTML(`<div id="caps"></div>`, document.body);
  const box = $('caps');
  box.innerHTML = groups.map((g, i) => `<div class="cg" id="cg${i}">${g.words.map(w => `<span class="${w.col || ''}">${w.w.replace(/[,;]$/, '')}</span>`).join(' ')}</div>`).join('');
  const nodes = groups.map((g, i) => [...$('cg' + i).children]);
  let hidden = false;
  window.CAPS_OFF = (a, b) => (o.off = o.off || []).push([a, b]);
  RENDER.push(t => {
    const off = (o.off || []).some(([a, b]) => t >= a && t < b);
    groups.forEach((g, i) => {
      const d = $('cg' + i), vis = !off && t >= g.a && t < g.b;
      d.style.display = vis ? 'block' : 'none';
      if (!vis) return;
      g.words.forEach((w, k) => {
        const n = nodes[i][k], p = P(t, w.s - .03, w.s + .12);
        n.style.opacity = p > 0 ? 1 : 0;
        n.style.transform = `scale(${lerp(1.18, 1, eo(p)).toFixed(3)})`;
      });
      d.style.opacity = 1 - P(t, g.b - .08, g.b);
    });
  });
  return groups;
}

// ---------- Interfaz fija: serie, aviso de recreación y reloj ----------
function hud(o) {
  addHTML(`<div id="hud"><div id="serie">${o.serie}</div><div id="aviso">${o.aviso}</div>
    <div id="reloj"><i></i><span class="d">${o.dia}</span><span class="h">--:--</span></div></div>`, document.body);
  const r = $('reloj'), h = $$('#reloj .h'), dot = $$('#reloj i');
  RENDER.push(t => {
    $('serie').style.opacity = $('aviso').style.opacity = 1 - P(t, o.hide - .4, o.hide);
    // o.horas: [[t, 'hh:mm', rojo?], ...] ordenado
    let cur = null; for (const x of o.horas) if (t >= x[0]) cur = x;
    r.style.opacity = cur ? 1 - P(t, o.hide - .4, o.hide) : 0;
    if (!cur) return;
    h.textContent = cur[1];
    const flash = 1 - P(t, cur[0], cur[0] + .6);
    r.classList.toggle('rojo', !!cur[2]);
    r.style.transform = `scale(${1 + .12 * flash})`;
    dot.style.opacity = Math.floor(t * 2) % 2 ? .35 : 1;
  });
}

// ---------- Dibujos ----------
// figura de persona (pictograma); o.casco: Tomás con casco blanco y chaleco naranja
function persona(parent, x, y, s = 1, o = {}) {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, parent);
  const col = o.col || '#5d6672';
  el('rect', { x: -9, y: -58, width: 18, height: 34, rx: 8, fill: o.casco ? '#ff7a1a' : col }, g);
  if (o.casco) { el('rect', { x: -9, y: -46, width: 18, height: 3.5, fill: '#e9eef2' }, g); el('rect', { x: -9, y: -38, width: 18, height: 3.5, fill: '#e9eef2' }, g); }
  el('rect', { x: -8, y: -27, width: 7, height: 27, rx: 3.5, fill: o.casco ? '#24364a' : col }, g);
  el('rect', { x: 1, y: -27, width: 7, height: 27, rx: 3.5, fill: o.casco ? '#24364a' : col }, g);
  el('circle', { cx: 0, cy: -68, r: 8.5, fill: o.casco ? '#d39a74' : col }, g);
  if (o.casco) el('path', { d: 'M-10,-69 A10,10 0 0 1 10,-69 L12,-68 L-12,-68 Z', fill: '#f2f4f6' }, g);
  return g;
}
function flecha(parent, x1, y1, x2, y2, col, w = 10) {
  const g = el('g', {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
  g.setAttribute('transform', `translate(${x1} ${y1}) rotate(${a * 180 / Math.PI})`);
  el('rect', { x: 0, y: -w / 2, width: Math.max(0, L - w * 2.2), height: w, rx: w / 2, fill: col }, g);
  el('path', { d: `M${L},0 L${L - w * 2.8},${-w * 1.6} L${L - w * 2.8},${w * 1.6} Z`, fill: col }, g);
  return g;
}

function render(t) {
  T = t;
  for (const id in SCN) {
    const [a, b, fi = .25, fo = .25, z = 1.06] = SCN[id];
    const o = win(t, a, b, fi, fo), s = $(id);
    s.style.opacity = o.toFixed(3);
    s.style.visibility = o > 0 ? 'visible' : 'hidden';
    const cam = s.firstElementChild;
    if (o > 0 && z) cam.style.transform = `scale(${lerp(1, z, io(P(t, a, b)))})`;
  }
  for (const f of RENDER) f(t);
}
function start() {
  window.READY = (async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    if (window.cargarMapas) await cargarMapas();     // los episodios con mapas arman esas escenas en SETUP
    for (const f of SETUP) f();
    render(0);
    return true;
  })();
  window.render = render;
}
