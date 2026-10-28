// Atajos para los reels verticales en estilo "caso real" (van después de caso.js).
// La zona libre va de y = 330 (debajo de la interfaz) a y = 1150 (encima de los subtítulos).

// foto con título grande, píldoras y sello que aparecen cuando se dicen.
// o = {titulo, tT, top, size, align, pills: [[t, texto, estilo]], pTop, sello: {t, txt, x, y, size, rot}, + lo de fotoC (lbl, ev, evT, kb, bn, pos, tinte)}
function fotoR(id, w, src, o = {}) {
  const top = o.top ?? 420, pTop = o.pTop ?? top + (o.titulo ? (o.size || 150) * (o.titulo.split('<br>').length) * .95 + 30 : 0);
  const inner = (o.titulo ? `<div id="${id}T" class="cbig" style="position:absolute;left:64px;right:64px;top:${top}px;text-align:${o.align || 'left'};font-size:${o.size || 150}px;opacity:0;text-shadow:0 0 30px #000">${o.titulo}</div>` : '')
    + (o.pills || []).map(([, s, est], i) => `<div id="${id}p${i}" class="cpill" style="position:absolute;left:64px;top:${pTop + i * 72}px;opacity:0;${est || ''}">${s}</div>`).join('')
    + (o.sello ? selloC(id + 's', o.sello.txt, o.sello.x ?? 90, o.sello.y ?? 900, o.sello.size || 110) : '') + (o.inner || '');
  fotoC(id, w, src, { ...o, inner });
  RENDER.push(t => {
    if (!on(id)) return;
    if (o.titulo) { const a = o.tT ?? w[0] + .2, q = P(t, a - .1, a + .3); $(id + 'T').style.opacity = q * (o.tHasta ? 1 - P(t, o.tHasta - .3, o.tHasta) : 1); $(id + 'T').style.transform = `translateY(${lerp(24, 0, eo(q))}px)`; }
    (o.pills || []).forEach(([a], i) => { const q = P(t, a - .1, a + .25); $(id + 'p' + i).style.opacity = q; $(id + 'p' + i).style.transform = `translateX(${lerp(-30, 0, eo(q))}px)`; });
    if (o.sello) golpeC(id + 's', t, o.sello.t, o.sello.rot ?? -6);
  });
}

// cita que se escribe letra por letra, con autor y fuente; o = {bg, top}
function citaR(id, w, txt, t0, t1, autor, fuente, o = {}) {
  scene(id, [...w.slice(0, 4), 1.03], `${o.bg || '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>'}
    <div style="position:absolute;left:110px;right:80px;top:${o.top ?? 430}px"><div id="${id}b" style="position:absolute;left:-40px;top:6px;width:8px;height:100%;background:#ff2a2a;transform-origin:top"></div>
      <div id="${id}t" style="font:italic 500 74px/1.2 'Cormorant Garamond';color:#ece8e1;min-height:200px;text-shadow:0 0 20px #000"></div>
      <div class="osw" id="${id}a" style="font-size:34px;letter-spacing:.16em;margin-top:34px;opacity:0">${autor}</div>
      <div class="mono" id="${id}f" style="font-size:20px;color:#8a8a8a;margin-top:8px;opacity:0">${fuente}</div></div>`);
  RENDER.push(t => {
    if (!on(id)) return;
    $(id + 't').textContent = typed(t, t0, t1, txt); $(id + 'b').style.transform = `scaleY(${eo(P(t, w[0], w[0] + .6))})`;
    $(id + 'a').style.opacity = P(t, w[0] + .2, w[0] + .7); $(id + 'f').style.opacity = P(t, w[0] + .5, w[0] + 1);
  });
}

// hojas que caen y un número que cuenta (o un texto fijo); o = {num | texto, tNum, pre, suf, rotulo, lbl, cartel: [t, html]}
function papelesR(id, w, o = {}) {
  const [a] = w;
  scene(id, [...w.slice(0, 4), 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div><div id="${id}P"></div>
    ${o.lbl ? `<div class="clbl" style="opacity:1"><i></i>${o.lbl}</div>` : ''}
    <div id="${id}N" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="cbig" id="${id}V" style="font-size:180px;color:#ff2a2a">0</div><div class="osw" style="font-size:34px;letter-spacing:.24em">${o.rotulo || ''}</div></div>
    ${o.cartel ? `<div id="${id}C" class="cbig" style="position:absolute;left:0;right:0;top:960px;padding:14px 30px;text-align:center;font-size:96px;opacity:0;background:rgba(5,5,5,.88)">${o.cartel[1]}</div>` : ''}`);
  const pila = $(id + 'P'), r = rnd(11); for (let i = 0; i < 22; i++) pila.insertAdjacentHTML('beforeend', `<div class="cpapel ${id}H" style="left:${40 + r() * 800}px;top:${640 + r() * 420}px;width:200px;height:260px;opacity:0;padding:18px">${Array.from({ length: 8 }, (_, j) => `<div style="height:9px;margin:10px 0;width:${60 + ((i * 7 + j * 13) % 38)}%;background:${(i + j) % 3 ? '#111' : '#bdb5a6'}"></div>`).join('')}</div>`);
  const hs = [...document.querySelectorAll(`#${id} .${id}H`)], tn = o.tNum ?? a + .3;
  RENDER.push(t => {
    if (!on(id)) return;
    $(id + 'N').style.opacity = P(t, tn - .2, tn + .2); $(id + 'V').textContent = o.texto ?? (o.pre || '') + fmt((o.num || 0) * eo(P(t, tn - .1, tn + 1.2))) + (o.suf || '');
    hs.forEach((h, i) => { const k = P(t, a + .2 + i * .1, a + .5 + i * .1); h.style.opacity = k * .85; h.style.transform = `rotate(${(i % 5 - 2) * 6}deg) translateY(${lerp(-60, 0, eo(k))}px)`; });
    if (o.cartel) $(id + 'C').style.opacity = P(t, o.cartel[0] - .1, o.cartel[0] + .3);
  });
}

// cierre de serie sobre una escena final: "PASÓ DE VERDAD · FUENTES EN LA DESCRIPCIÓN"
const cierreR = `<div id="cierreR" style="position:absolute;left:0;right:0;top:1180px;text-align:center;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.4em;color:#ff2a2a">PASÓ DE VERDAD</div><div class="osw" style="font-size:24px;letter-spacing:.24em;color:#8a8a8a;margin-top:10px">FUENTES EN LA DESCRIPCIÓN</div></div>`;
function cierreAnim(t) { const n = $('cierreR'); if (n) n.style.opacity = P(t, S('outro') + .3, S('outro') + .9); }
