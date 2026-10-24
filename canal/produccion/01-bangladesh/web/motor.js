// Motor de escenas: todo depende solo de t (segundos), así cada cuadro es reproducible.
// Cada capítulo (cap0.js, cap1.js, …) agrega su HTML, sus ventanas de tiempo en SCN y sus funciones en SETUP y RENDER.
const W = 1920, H = 1080;
const C = Object.fromEntries(TL.cues.map(c => [c.id, c]));
const S = id => C[id].start, E = id => C[id].end;
// momento aproximado en que se dice una frase dentro de una línea (proporcional a la posición en el texto)
const AT = (id, frase) => { const c = C[id], i = c.text.indexOf(frase); if (i < 0) throw new Error('falta ' + frase + ' en ' + id); return c.start + (c.end - c.start) * i / c.text.length; };
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const io = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;   // ease in-out
const eo = x => 1 - Math.pow(1 - x, 3);                                  // ease out
const P = (t, a, b) => clamp((t - a) / (b - a));
const win = (t, a, b, fi = .7, fo = .7) => Math.min(P(t, a, a + fi), 1 - P(t, b - fo, b));
const lerp = (a, b, x) => a + (b - a) * x;
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function rnd(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
// Ken Burns: mueve y acerca una foto
function kb(img, k, s0, s1, x0 = 0, x1 = 0, y0 = 0, y1 = 0) {
  img.style.transform = `translate(${lerp(x0, x1, k).toFixed(1)}px,${lerp(y0, y1, k).toFixed(1)}px) scale(${lerp(s0, s1, k).toFixed(4)})`;
}
// tecleo: cuántos caracteres de un texto se ven en t
const typed = (t, t0, t1, txt) => txt.slice(0, t < t0 ? 0 : clamp(Math.floor((t - t0) / (t1 - t0) * txt.length) + 1, 0, txt.length));

// ---------- Registro ----------
const SCN = {};                 // id -> [entra, sale, fundido de entrada, fundido de salida]
const SETUP = [], MAPSETUP = [], RENDER = [];
let T = 0;
const on = (id, pad = .2) => T > SCN[id][0] - pad && T < SCN[id][1] + pad;
function addCSS(css) { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }
function addHTML(html) { document.body.insertAdjacentHTML('beforeend', html); }
// progreso 0..1 de una escena
const K = (id, t) => P(t, SCN[id][0], SCN[id][1]);

// ---------- Plantillas ----------
// foto con Ken Burns; o = {src, credit, pos, filter, kb:[s0,s1,x0,x1,y0,y1], tag, cap:[arriba, abajo], inner, html}
const FILTER = 'saturate(.55) brightness(.55) contrast(1.08)';
function photo(id, w, o) {
  addHTML(`<div class="scene" id="${id}"><div class="cam"><div class="ph"><img src="img/${o.src}" style="object-position:${o.pos || '50% 50%'};filter:${o.filter || FILTER}"></div><div class="vig"></div>${o.inner || ''}</div>
    ${o.tag ? `<div class="tag" style="left:110px;top:96px">${o.tag}</div>` : ''}
    ${o.cap ? `<div class="cap"><div class="k">${o.cap[0]}</div>${o.cap[1] ? `<div class="v">${o.cap[1]}</div>` : ''}</div>` : ''}
    ${o.credit !== '' ? `<div class="credit">${(o.ilus ? 'Imagen ilustrativa · ' : '') + (o.credit || CRED[o.src] || '')}</div>` : ''}${o.html || ''}</div>`);
  SCN[id] = w;
  const img = document.querySelector(`#${id} .ph img`), k = o.kb || [1.04, 1.14, 0, 0, 0, 0];
  RENDER.push(t => { if (on(id)) kb(img, K(id, t), ...k); });
  return $(id);
}
// placa de capítulo
function chapterCard(id, cue, num, title, sub = '') {
  addHTML(`<div class="scene" id="${id}"><div class="cam"><div class="center">
    <div class="chn">${num}</div><div class="cht">${title}</div>${sub ? `<div class="chd">${sub}</div>` : ''}</div></div></div>`);
  SCN[id] = [S(cue) + .3, E(cue) + .1, .9, .7];
  const [n, ti, d] = ['.chn', '.cht', '.chd'].map(s => document.querySelector(`#${id} ${s}`));
  RENDER.push(t => {
    if (!on(id)) return;
    const a = S(cue);
    n.style.opacity = eo(P(t, a + .3, a + 1.4));
    ti.style.opacity = eo(P(t, a + .8, a + 1.8));
    ti.style.letterSpacing = lerp(.06, .01, eo(P(t, a + .8, a + 3.5))) + 'em';
    if (d) d.style.opacity = eo(P(t, a + 1.4, a + 2.4));
  });
}
// texto grande al centro (preguntas, frases clave); aparece letra por letra o con fundido
function bigText(id, w, html, o = {}) {
  addHTML(`<div class="scene" id="${id}">${o.bg || '<div class="glow"></div>'}<div class="cam"><div class="center"><div class="big ${o.cls || ''}">${html}</div>${o.sub ? `<div class="bigsub">${o.sub}</div>` : ''}</div></div></div>`);
  SCN[id] = w;
  const b = document.querySelector(`#${id} .big`), s = document.querySelector(`#${id} .bigsub`);
  RENDER.push(t => {
    if (!on(id)) return;
    const a = w[0] + (o.delay || .2), k = eo(P(t, a, a + .9));
    b.style.opacity = k; b.style.transform = `translateY(${lerp(18, 0, k)}px)`;
    b.style.letterSpacing = lerp(o.ls0 ?? .08, o.ls1 ?? .02, eo(P(t, a, a + 3))) + 'em';
    if (s) s.style.opacity = eo(P(t, a + (o.subDelay || 1), a + (o.subDelay || 1) + .8));
  });
}
// cita con atribución
function quote(id, w, text, who, role, o = {}) {
  addHTML(`<div class="scene" id="${id}">${o.bg || ''}<div class="cam"><div class="qwrap"><div class="qbar"></div>
    <div class="qtext"><span class="qt"></span><span class="qc"></span></div>
    <div class="qwho">${who}</div><div class="qrole">${role}</div></div></div>${o.credit ? `<div class="credit">${o.credit}</div>` : ''}</div>`);
  SCN[id] = w;
  const q = '“' + text + '”', $q = document.querySelector(`#${id} .qt`), $c = document.querySelector(`#${id} .qc`);
  const bar = document.querySelector(`#${id} .qbar`), who$ = document.querySelector(`#${id} .qwho`), role$ = document.querySelector(`#${id} .qrole`);
  const [t0, t1] = o.span || [w[0] + .5, w[1] - 1.2];
  RENDER.push(t => {
    if (!on(id)) return;
    $q.textContent = typed(t, t0, t1, q);
    $c.style.opacity = (Math.floor(t * 2.2) % 2 === 0 || t < t1) ? 1 : 0;
    bar.style.transform = `scaleY(${eo(P(t, w[0], w[0] + .8))})`;
    who$.style.opacity = P(t, t1 - .2, t1 + .5); role$.style.opacity = P(t, t1 + .2, t1 + .9);
    if (o.img) kb(document.querySelector(`#${id} .ph img`), K(id, t), ...(o.kb || [1.05, 1.12, 0, 0, 0, 0]));
  });
}

// ---------- Mapas ----------
const cities = {
  daca: [90.41, 23.81], ny: [-74.0, 40.71], manila: [120.98, 14.6], colombo: [79.86, 6.93], macao: [113.54, 22.19],
  la: [-118.24, 34.05], dalian: [121.61, 38.91], pyongyang: [125.75, 39.03], frankfurt: [8.68, 50.11], makati: [121.03, 14.55],
  londres: [-0.13, 51.51], bruselas: [4.35, 50.85],
};
let MAPDATA = null;
function defs(svg) {
  const d = el('defs', {}, svg);
  const rg = el('radialGradient', { id: svg.id + 'halo' }, d);
  el('stop', { offset: '0%', 'stop-color': '#ffb23e', 'stop-opacity': .55 }, rg);
  el('stop', { offset: '100%', 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const rr = el('radialGradient', { id: svg.id + 'halor' }, d);
  el('stop', { offset: '0%', 'stop-color': '#d23a32', 'stop-opacity': .7 }, rr);
  el('stop', { offset: '100%', 'stop-color': '#d23a32', 'stop-opacity': 0 }, rr);
}
// marcador de ciudad: se dibuja en el origen y se escala al revés del zoom para mantener su tamaño
function city(g, xy, label, anchor = 'start', dx = 22) {
  const svg = g.ownerSVGElement;
  const c = el('g', { opacity: 0, transform: `translate(${xy[0]} ${xy[1]})` }, g);
  const inner = el('g', {}, c);
  const halo = el('circle', { r: 26, fill: `url(#${svg.id}halo)` }, inner);
  const dot = el('circle', { r: 5, fill: '#ffd28a' }, inner);
  const ring = el('circle', { r: 10, fill: 'none', stroke: '#ffb23e', 'stroke-width': 1.5 }, inner);
  const t = el('text', { x: anchor === 'end' ? -dx : dx, y: 8, fill: '#e9e6df', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': '3', 'text-anchor': anchor }, inner);
  t.textContent = label;
  return { c, inner, ring, halo, dot, xy, svg, text: t };
}
function redCity(cty) {   // pasa un marcador a rojo
  cty.halo.setAttribute('fill', `url(#${cty.svg.id}halor)`); cty.ring.setAttribute('stroke', '#d23a32'); cty.dot.setAttribute('fill', '#ff8a7e');
}
function pulse(cty, t, sp = .8, off = 0) {
  const pr = ((t + off) * sp) % 1;
  cty.ring.setAttribute('r', 10 + pr * 30); cty.ring.setAttribute('opacity', 1 - pr);
}
// mapa mundi nocturno
function worldMap(svg, rotate, proj) {
  const { land, borders } = MAPDATA;
  proj = proj || d3.geoNaturalEarth1().rotate(rotate).fitExtent([[40, 70], [W - 40, H - 70]], { type: 'Sphere' });
  const path = d3.geoPath(proj);
  const g = el('g', {}, svg);
  el('path', { d: path({ type: 'Sphere' }), fill: '#080b0f', stroke: '#1b222b', 'stroke-width': 1.2 }, g);
  el('path', { d: path(d3.geoGraticule10()), fill: 'none', stroke: '#121820', 'stroke-width': 1 }, g);
  el('path', { d: path(land), fill: '#141a21', stroke: '#2b3440', 'stroke-width': .8 }, g);
  el('path', { d: path(borders), fill: 'none', stroke: '#1d252f', 'stroke-width': .6 }, g);
  return { proj, path, g, svg };
}
// mapa regional (Mercator) ajustado a un rectángulo [[lon0, lat0], [lon1, lat1]]
function regionMap(svg, bbox, ext = [[60, 60], [W - 60, H - 60]]) {
  const { land, borders } = MAPDATA;
  const proj = d3.geoMercator().fitExtent(ext, { type: 'MultiPoint', coordinates: bbox });
  const path = d3.geoPath(proj);
  const g = el('g', {}, svg);
  el('rect', { x: -W, y: -H, width: 3 * W, height: 3 * H, fill: '#080b0f' }, g);
  el('path', { d: path(land), fill: '#11161c', stroke: '#252d38', 'stroke-width': 1 }, g);
  el('path', { d: path(borders), fill: 'none', stroke: '#27303b', 'stroke-width': 1.2 }, g);
  return { proj, path, g, svg };
}
const country = id => MAPDATA.countries.features.find(f => f.id === id);
// arco animable entre dos puntos (lon/lat) sobre un mapa
function arc(m, a, b, col = '#e9e6df', w = 3, extra = {}) {
  const d = m.path({ type: 'LineString', coordinates: [a, b] });
  const pth = el('path', Object.assign({ d, fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', opacity: .85 }, extra), m.g);
  const L = pth.getTotalLength();
  pth.setAttribute('stroke-dasharray', L); pth.setAttribute('stroke-dashoffset', L);
  return { pth, L, draw(k) { pth.setAttribute('stroke-dashoffset', L * (1 - k)); } };
}
// cámara de un mapa: centro (en px del mapa) y escala
function mapCam(m, cx, cy, s) {
  m.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-cx} ${-cy})`);
}

// ---------- Dibujos isométricos ----------
const c30 = Math.cos(Math.PI / 6), s30 = Math.sin(Math.PI / 6);
const iso = (x, y, z) => [(x - y) * c30, (x + y) * s30 - z];
const pts = arr => arr.map(p => iso(...p).map(v => v.toFixed(1)).join(',')).join(' ');
function poly(g, arr, fill, extra = {}) {
  return el('polygon', Object.assign({ points: pts(arr), fill }, extra), g);
}
function boxFaces(x, y, z, w, d, h) {
  return [
    [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]],
    [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]],
    [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]],
  ];
}
function box(g, x, y, z, w, d, h, [top, left, right], stroke = 'none') {
  const f = boxFaces(x, y, z, w, d, h);
  return {
    top: poly(g, f[0], top, { stroke, 'stroke-width': 1 }),
    left: poly(g, f[1], left, { stroke, 'stroke-width': 1 }),
    right: poly(g, f[2], right, { stroke, 'stroke-width': 1 }),
  };
}
function moveBox(b, x, y, z, w, d, h) {
  const f = boxFaces(x, y, z, w, d, h);
  b.top.setAttribute('points', pts(f[0])); b.left.setAttribute('points', pts(f[1])); b.right.setAttribute('points', pts(f[2]));
}
function lightDefs(svg) {
  const d = el('defs', {}, svg);
  const sg = el('radialGradient', { id: 'spotg' }, d);
  el('stop', { offset: '0%', 'stop-color': '#9fb4cc', 'stop-opacity': .16 }, sg);
  el('stop', { offset: '60%', 'stop-color': '#9fb4cc', 'stop-opacity': .05 }, sg);
  el('stop', { offset: '100%', 'stop-color': '#9fb4cc', 'stop-opacity': 0 }, sg);
  const rg = el('radialGradient', { id: 'ledhalo' }, d);
  el('stop', { offset: '0%', 'stop-color': '#ffb23e', 'stop-opacity': .7 }, rg);
  el('stop', { offset: '100%', 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const wg = el('radialGradient', { id: 'warm' }, d);
  el('stop', { offset: '0%', 'stop-color': '#ffd9a0', 'stop-opacity': .2 }, wg);
  el('stop', { offset: '100%', 'stop-color': '#ffd9a0', 'stop-opacity': 0 }, wg);
}
const PZ = 40;   // altura de la mesa
function drawPrinter(svg, { stack = 0, floor = true } = {}) {
  const g = el('g', {}, svg);
  if (floor) {
    poly(g, [[-700, -700, 0], [1100, -700, 0], [1100, 1100, 0], [-700, 1100, 0]], '#0a0d11');
    const sp = iso(170, 125, 0);
    el('ellipse', { cx: sp[0], cy: sp[1], rx: 620, ry: 330, fill: 'url(#spotg)', opacity: .9 }, g);
  }
  box(g, -120, -90, 0, 560, 420, PZ, ['#1a1f26', '#12161b', '#0e1115']);
  box(g, 0, 0, PZ, 340, 250, 120, ['#2d333b', '#1e232a', '#161a1f'], '#333a44');
  poly(g, [[40, 30, PZ + 120.5], [300, 30, PZ + 120.5], [300, 95, PZ + 120.5], [40, 95, PZ + 120.5]], '#0b0e12');
  // ranura frontal por donde sale el papel
  poly(g, [[60, 250.5, PZ + 66], [280, 250.5, PZ + 66], [280, 250.5, PZ + 74], [60, 250.5, PZ + 74]], '#07090c');
  box(g, 50, 250, PZ + 55, 240, 80, 6, ['#3a414b', '#272c33', '#1f242a'], '#424a55');
  poly(g, [[230, 250.5, PZ + 85], [325, 250.5, PZ + 85], [325, 250.5, PZ + 108], [230, 250.5, PZ + 108]], '#0f1216');
  const sheets = [];
  for (let k = 0; k < stack; k++) {
    const b = box(g, 70, 255, PZ + 61 + k * 1.6, 200, 70, 1.4, ['#d9d5cc', '#b9b5ad', '#a9a59e']);
    for (const f of Object.values(b)) f.setAttribute('opacity', 0);
    sheets.push(b);
  }
  const lp = iso(305, 250, PZ + 96);
  const led = el('circle', { cx: lp[0], cy: lp[1], r: 6, fill: '#ffb23e' }, g);
  const halo = el('circle', { cx: lp[0], cy: lp[1], r: 26, fill: 'url(#ledhalo)' }, g);
  return { g, led, halo, sheets, lp };
}
// hojas que salen de la impresora: una cada gap segundos desde t0
function printSheets(pr, t, t0, gap) {
  pr.sheets.forEach((sh, i) => {
    const a = t0 + i * gap, k = eo(P(t, a, a + .6));
    const vis = t > a;
    const y0 = lerp(170, 255, k), y1 = Math.max(250.5, y0);
    if (vis) moveBox(sh, 70, y1, PZ + 61 + i * 1.6 + (1 - k) * 8, 200, Math.max(.1, y0 + 70 - y1), 1.4);
    for (const f of Object.values(sh)) f.setAttribute('opacity', vis ? 1 : 0);
  });
}
function blinkLed(pr, t, rate = 1.6) {
  const b = Math.floor(t * rate) % 2 === 0;
  pr.led.setAttribute('fill', b ? '#ffb23e' : '#3a2a12'); pr.halo.setAttribute('opacity', b ? 1 : .05);
}
// ---------- Ilustraciones de trazo ----------
function stroke(svg, d, extra = {}) {
  return el('path', Object.assign({ d, fill: 'none', stroke: '#e9e6df', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, extra), svg);
}
const drawK = (p, k) => p.setAttribute('stroke-dashoffset', 1 - k);

// ---------- Render ----------
function render(t) {
  T = t;
  for (const id in SCN) {
    const [a, b, fi, fo] = SCN[id];
    const o = win(t, a, b, fi, fo);
    const s = $(id);
    s.style.opacity = o.toFixed(3);
    s.style.visibility = o > 0 ? 'visible' : 'hidden';
    const cam = s.querySelector('.cam');
    if (cam && o > 0) cam.style.transform = `scale(${lerp(1, 1.045, io(P(t, a, b)))})`;
  }
  for (const f of RENDER) f(t);
}
function start() {
  window.READY = (async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    for (const f of SETUP) f();
    const land = topojson.feature(await (await fetch('land-50m.json')).json(), 'land');
    const world = await (await fetch('countries-50m.json')).json();
    MAPDATA = { land, world, countries: topojson.feature(world, world.objects.countries), borders: topojson.mesh(world, world.objects.countries, (a, b) => a !== b) };
    for (const f of MAPSETUP) f();
    render(0);
    return true;
  })();
  window.render = render;
}
