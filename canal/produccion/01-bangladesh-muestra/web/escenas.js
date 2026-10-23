// Motor de escenas: todo depende solo de t (segundos), así cada cuadro es reproducible.
const W = 1920, H = 1080;
const C = Object.fromEntries(TL.cues.map(c => [c.id, c]));
const S = id => C[id].start, E = id => C[id].end;
// momento aproximado en que se dice una frase dentro de una línea (proporcional a la posición en el texto)
const AT = (id, frase) => { const c = C[id], i = c.text.indexOf(frase); if (i < 0) throw new Error('falta ' + frase); return c.start + (c.end - c.start) * i / c.text.length; };
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

// ---------- Ventanas de cada escena: [entra, sale, fundido de entrada, fundido de salida] ----------
const SCN = {
  s_lead: [0, 2.75, .05, .25],
  s_hook: [2.55, S('c2') + .5, 1.0, .8],
  s_night: [S('c2') - .4, AT('c2', 'del banco') + .5, .9, .8],
  s_map1: [AT('c2', 'del banco') - .3, S('c3') + .25, .8, .5],
  s_count: [AT('c2', 'alguien') - .2, S('c3') + .1, .5, .4],
  s_pc: [S('c3') - .35, S('c5') - .1, .4, .4],
  s_cal: [S('c5') - .25, S('c7') - .15, .4, .5],
  s_neg: [S('c7') - .25, S('c10') - .1, .4, .35],
  s_doc: [S('c10') - .2, E('c10') + .45, .35, .35],
  s_jup: [E('c10') + .1, S('c12') + .3, .3, .7],
  s_map2: [S('c12') - .4, S('c13') + .3, 1.0, .6],
  s_cards: [S('c13') - .3, S('title') - .1, .6, .9],
  s_title: [S('title') + .05, E('title') - .2, 1.4, 1.0],
  s_chap: [S('chapter') + .3, S('c16') + .1, .9, .7],
  s_dhaka: [S('c16') - .3, AT('c16', 'Viernes') + .4, .9, .6],
  s_morning: [AT('c16', 'Viernes') - .2, S('c17') + .2, .7, .6],
  s_clock: [AT('c16', 'Viernes') + .3, S('c17') - .1, .5, .5],
  s_tower: [S('c17') - .3, AT('c17', 'dentro') + .3, .7, .6],
  s_build: [AT('c17', 'dentro') - .2, S('c18') + .3, .5, .6],
  s_printer: [S('c18') - .3, S('c19') + .1, .7, .5],
  s_split: [S('c19') - .3, S('c20') + .05, .5, .5],
  s_arch: [S('c20') - .3, S('c21') + .05, .5, .5],
  s_empty: [S('c21') - .3, S('c22') + .2, .6, .5],
  s_quote: [S('c22') - .3, S('c24') + .2, .6, .6],
  s_end: [S('c24') - .3, TL.duration - .8, .8, 2.8],
};

// ---------- Mapas ----------
const cities = { daca: [90.41, 23.81], ny: [-74.0, 40.71], manila: [120.98, 14.6], colombo: [79.86, 6.93] };
let M1, M2, M3;
function defs(svg) {
  const d = el('defs', {}, svg);
  const rg = el('radialGradient', { id: 'halo' }, d);
  el('stop', { offset: '0%', 'stop-color': '#ffb23e', 'stop-opacity': .55 }, rg);
  el('stop', { offset: '100%', 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const rr = el('radialGradient', { id: 'halor' }, d);
  el('stop', { offset: '0%', 'stop-color': '#d23a32', 'stop-opacity': .7 }, rr);
  el('stop', { offset: '100%', 'stop-color': '#d23a32', 'stop-opacity': 0 }, rr);
}
// marcador de ciudad: se dibuja en el origen y se escala al revés del zoom para mantener su tamaño
function city(g, xy, label, anchor = 'start', dx = 22) {
  const c = el('g', { opacity: 0, transform: `translate(${xy[0]} ${xy[1]})` }, g);
  const inner = el('g', {}, c);
  const halo = el('circle', { r: 26, fill: 'url(#halo)' }, inner);
  el('circle', { r: 5, fill: '#ffd28a' }, inner);
  const ring = el('circle', { r: 10, fill: 'none', stroke: '#ffb23e', 'stroke-width': 1.5 }, inner);
  const t = el('text', { x: anchor === 'end' ? -dx : dx, y: 8, fill: '#e9e6df', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': '3', 'text-anchor': anchor }, inner);
  t.textContent = label;
  return { c, inner, ring, halo, xy };
}
function pulse(cty, t, sp = .8, off = 0) {
  const pr = ((t + off) * sp) % 1;
  cty.ring.setAttribute('r', 10 + pr * 30); cty.ring.setAttribute('opacity', 1 - pr);
}
async function setupMaps() {
  const land = topojson.feature(await (await fetch('land-50m.json')).json(), 'land');
  const world = await (await fetch('countries-50m.json')).json();
  const countries = topojson.feature(world, world.objects.countries);
  const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
  const grat = d3.geoGraticule10();
  const bd = countries.features.find(f => f.id === '050');

  function worldMap(svg, rotate) {
    const proj = d3.geoNaturalEarth1().rotate(rotate).fitExtent([[40, 70], [W - 40, H - 70]], { type: 'Sphere' });
    const path = d3.geoPath(proj);
    const g = el('g', {}, svg);
    el('path', { d: path({ type: 'Sphere' }), fill: '#080b0f', stroke: '#1b222b', 'stroke-width': 1.2 }, g);
    el('path', { d: path(grat), fill: 'none', stroke: '#121820', 'stroke-width': 1 }, g);
    el('path', { d: path(land), fill: '#141a21', stroke: '#2b3440', 'stroke-width': .8 }, g);
    el('path', { d: path(borders), fill: 'none', stroke: '#1d252f', 'stroke-width': .6 }, g);
    return { proj, path, g };
  }

  // Mapa 1: el mundo de noche, zoom hasta Bangladés
  const s1 = $('map1'); defs(s1);
  M1 = worldMap(s1, [-30, 0]);
  M1.bd = el('path', { d: M1.path(bd), fill: '#ffb23e', 'fill-opacity': .14, stroke: '#ffb23e', 'stroke-width': .6, opacity: 0 }, M1.g);
  M1.daca = M1.proj(cities.daca);
  M1.cd = city(M1.g, M1.daca, 'DACA · BANCO DE BANGLADÉS');

  // Mapa 2: Nueva York al centro, órdenes Daca → Nueva York → Manila y Sri Lanka
  const s2 = $('map2'); defs(s2);
  M2 = worldMap(s2, [74, 0]);
  const p = k => M2.proj(cities[k]);
  M2.c = { daca: city(M2.g, p('daca'), 'DACA', 'end'), ny: city(M2.g, p('ny'), 'NUEVA YORK', 'start'), manila: city(M2.g, p('manila'), 'MANILA', 'start'), colombo: city(M2.g, p('colombo'), 'SRI LANKA', 'end') };
  M2.arcs = [['daca', 'ny', '#e9e6df', 3], ['ny', 'manila', '#d23a32', 3], ['ny', 'colombo', '#d23a32', 2]].map(([a, b, col, w]) => {
    const d = M2.path({ type: 'LineString', coordinates: [cities[a], cities[b]] });
    const pth = el('path', { d, fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', opacity: .85 }, M2.g);
    const L = pth.getTotalLength();
    pth.setAttribute('stroke-dasharray', L); pth.setAttribute('stroke-dashoffset', L);
    // paquetes: cada uno es una orden de pago viajando por la ruta
    const pk = Array.from({ length: 12 }, () => el('rect', { width: 14, height: 10, x: -7, y: -5, rx: 1.5, fill: col === '#e9e6df' ? '#ffd28a' : '#ff7a6e', opacity: 0 }, M2.g));
    return { pth, L, pk };
  });
  for (const k in M2.c) M2.g.appendChild(M2.c[k].c);   // ciudades por encima de las rutas

  // Mapa 3: Bangladés y alrededores
  const s3 = $('map3'); defs(s3);
  const proj3 = d3.geoMercator().fitExtent([[560, 170], [1360, 910]], bd);
  const path3 = d3.geoPath(proj3);
  const g3 = el('g', {}, s3);
  el('path', { d: path3(land), fill: '#11161c', stroke: '#252d38', 'stroke-width': 1 }, g3);
  el('path', { d: path3(borders), fill: 'none', stroke: '#27303b', 'stroke-width': 1.2 }, g3);
  el('path', { d: path3(bd), fill: '#1b222b', stroke: '#8b919a', 'stroke-width': 2 }, g3);
  M3 = { g: g3, daca: proj3(cities.daca) };
  M3.cd = city(g3, M3.daca, 'DACA');
  const bl = el('text', { x: proj3([90.2, 22.2])[0], y: proj3([90.2, 22.2])[1], fill: '#4a5059', 'font-family': 'IBM Plex Mono', 'font-size': 30, 'letter-spacing': 10, 'text-anchor': 'middle' }, g3);
  bl.textContent = 'BANGLADÉS';
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
let B = {}, PR = {}, PR2 = {}, PE = {}, AR = {};
function setupBuilding() {
  const svg = $('bsvg'); lightDefs(svg);
  const g = el('g', {}, svg); B.g = g;
  const FL = 12, FH = 46, Wd = 300;
  poly(g, [[-500, -500, 0], [800, -500, 0], [800, 800, 0], [-500, 800, 0]], '#090c10');
  el('ellipse', { cx: 0, cy: iso(150, 150, 0)[1], rx: 560, ry: 300, fill: 'url(#spotg)', opacity: .9 }, g);
  B.win = [];
  for (let f = 0; f < FL; f++) {
    const z = f * FH;
    box(g, 0, 0, z, Wd, Wd, FH - 3, ['#1c222a', '#141920', '#0f1318'], '#222a34');
    const row = [];
    for (let k = 0; k < 6; k++) {
      const a = 18 + k * 47;
      row.push(poly(g, [[a, Wd + .5, z + 12], [a + 30, Wd + .5, z + 12], [a + 30, Wd + .5, z + 34], [a, Wd + .5, z + 34]], '#202a36'));
      row.push(poly(g, [[Wd + .5, a, z + 12], [Wd + .5, a + 30, z + 12], [Wd + .5, a + 30, z + 34], [Wd + .5, a, z + 34]], '#1a222c'));
    }
    B.win.push(row);
  }
  box(g, 40, 40, FL * FH, 220, 220, 14, ['#232a33', '#181d24', '#12161b']);
}
const PZ = 40;   // altura de la mesa
function drawPrinter(svg, { stack = 0 } = {}) {
  const g = el('g', {}, svg);
  poly(g, [[-700, -700, 0], [1100, -700, 0], [1100, 1100, 0], [-700, 1100, 0]], '#0a0d11');
  const sp = iso(170, 125, 0);
  el('ellipse', { cx: sp[0], cy: sp[1], rx: 620, ry: 330, fill: 'url(#spotg)', opacity: .9 }, g);
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
function setupPrinters() {
  for (const id of ['psvg', 'esvg', 'esvg1']) lightDefs($(id));
  PR = drawPrinter($('psvg'), { stack: 9 });
  PR2 = drawPrinter($('esvg1'));
  // cierre: oficina con tres luces de techo que se apagan
  const svg = $('esvg');
  PE = drawPrinter(svg);
  PE.pools = [-420, 0, 420].map(dx => el('ellipse', { cx: dx + 170, cy: 60, rx: 380, ry: 210, fill: 'url(#warm)' }, PE.g));
  PE.dark = el('rect', { x: -4000, y: -4000, width: 8000, height: 8000, fill: '#020304', opacity: 0 }, PE.g);
  PE.g.appendChild(PE.led); PE.g.appendChild(PE.halo);   // el LED queda por encima de la oscuridad
  const bd = el('defs', {}, svg);
  const beam = el('linearGradient', { id: 'beam', x1: 0, y1: 0, x2: 0, y2: 1 }, bd);
  el('stop', { offset: '0%', 'stop-color': '#fff1d6', 'stop-opacity': .16 }, beam);
  el('stop', { offset: '100%', 'stop-color': '#fff1d6', 'stop-opacity': 0 }, beam);
  PE.lamps = [480, 960, 1440].map(x => {
    const lg = el('g', {}, svg);
    const glow = el('polygon', { points: `${x - 150},70 ${x + 150},70 ${x + 430},1080 ${x - 430},1080`, fill: 'url(#beam)' }, lg);
    el('rect', { x: x - 180, y: 30, width: 360, height: 30, rx: 3, fill: '#1c2026' }, lg);
    const bar = el('rect', { x: x - 165, y: 56, width: 330, height: 10, rx: 2, fill: '#f3ead8' }, lg);
    return { glow, bar };
  });
  const rows = [['SWIFT MT103', 'USD 2.400.000'], ['SWIFT MT202', 'USD 15.000.000'], ['SWIFT MT103', 'USD 870.500'], ['SWIFT MT103', 'USD 6.125.000'], ['SWIFT MT202', 'USD 40.000.000'], ['SWIFT MT103', 'USD 1.310.250'], ['SWIFT MT103', 'USD 9.900.000'], ['SWIFT MT202', 'USD 22.750.000'], ['SWIFT MT103', 'USD 3.004.000'], ['SWIFT MT103', 'USD 515.800']];
  $('lrows').innerHTML = rows.map(([a, b]) => `<div class="lr"><span>${a}</span><span>${b}</span></div>`).join('');
  // computadora y papel con los mismos movimientos
  const r7 = rows.slice(0, 8).map(([a, b]) => `<div class="sr"><span>${a.replace('SWIFT ', '')}</span><span>${b}</span></div>`).join('');
  $('sms').innerHTML = `<div style="font-size:18px;letter-spacing:.2em;color:#5c7d94;margin-bottom:10px">BASE DE DATOS · TRANSFERENCIAS</div>${r7}`;
  $('sps').innerHTML = `<div style="font:500 20px 'IBM Plex Mono';letter-spacing:.2em;border-bottom:2px solid #1c1d1f;padding-bottom:14px;margin-bottom:8px">REGISTRO IMPRESO</div>${r7}`;
}
// archivo: pilas de cajas que caen en su lugar
function setupArchive() {
  const svg = $('asvg'); lightDefs(svg);
  const g = el('g', {}, svg); AR.g = g;
  poly(g, [[-900, -900, 0], [1400, -900, 0], [1400, 1400, 0], [-900, 1400, 0]], '#090b0e');
  el('ellipse', { cx: iso(250, 250, 0)[0], cy: iso(250, 250, 0)[1], rx: 820, ry: 430, fill: 'url(#warm)' }, g);
  // tres hileras de estantes, con pasillos entre medio
  const R = rnd(11), items = [];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) {
    const n = 2 + Math.floor(R() * 2) + (j === 0 ? 1 : 0);
    for (let k = 0; k < n; k++) items.push({ x: i * 104, y: j * 170, k, d: i * .1 + (2 - j) * .3 + k * .09 });
  }
  items.sort((a, b) => (a.x + a.y) - (b.x + b.y) || a.k - b.k);   // de atrás hacia adelante, de abajo hacia arriba
  AR.boxes = items.map(it => {
    const b = box(g, it.x, it.y, it.k * 40, 92, 76, 38, ['#5a4a38', '#47392b', '#3a2f24'], '#6b5944');
    const lab = poly(g, [[it.x + 20, it.y + 76.5, it.k * 40 + 12], [it.x + 62, it.y + 76.5, it.k * 40 + 12], [it.x + 62, it.y + 76.5, it.k * 40 + 26], [it.x + 20, it.y + 76.5, it.k * 40 + 26]], '#d8d2c4');
    return { b, lab, it, d: it.d };
  });
}

// ---------- Ilustraciones de trazo ----------
function stroke(svg, d, extra = {}) {
  return el('path', Object.assign({ d, fill: 'none', stroke: '#e9e6df', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, extra), svg);
}
let IL = {};
function setupIllustrations() {
  // escudo del antivirus
  const sh = $('shield');
  const sd = el('defs', {}, sh);
  const sg = el('radialGradient', { id: 'shglow' }, sd);
  el('stop', { offset: '0%', 'stop-color': '#4fb07a', 'stop-opacity': .25 }, sg);
  el('stop', { offset: '100%', 'stop-color': '#4fb07a', 'stop-opacity': 0 }, sg);
  IL.shglow = el('circle', { cx: 260, cy: 280, r: 230, fill: 'url(#shglow)', opacity: 0 }, sh);
  IL.shield = stroke(sh, 'M260 120 L390 172 Q392 330 260 440 Q128 330 130 172 Z', { 'stroke-width': 6 });
  IL.shin = stroke(sh, 'M260 160 L355 198 Q356 318 260 400 Q164 318 165 198 Z', { 'stroke-width': 2, stroke: '#4a5059' });
  IL.check = stroke(sh, 'M200 280 L245 325 L325 232', { 'stroke-width': 10, stroke: '#4fb07a' });
  // guardia con linterna
  const gu = $('guard');
  const gd = el('defs', {}, gu);
  const cg = el('linearGradient', { id: 'cone', x1: 0, y1: 0, x2: 1, y2: 0 }, gd);
  el('stop', { offset: '0%', 'stop-color': '#ffd28a', 'stop-opacity': .5 }, cg);
  el('stop', { offset: '100%', 'stop-color': '#ffd28a', 'stop-opacity': 0 }, cg);
  IL.cone = el('polygon', { points: '0,0 300,-95 300,95', fill: 'url(#cone)', opacity: 0 }, gu);
  IL.guard = [
    stroke(gu, 'M188 178 Q190 140 228 132 Q266 140 268 178'),            // gorra
    stroke(gu, 'M176 180 L292 180'),                                      // visera
    stroke(gu, 'M190 182 Q190 248 228 250 Q266 248 266 182'),            // cara
    stroke(gu, 'M118 470 Q122 300 228 282 Q334 300 338 470'),            // hombros y torso
    stroke(gu, 'M300 318 L352 352 L402 330'),                             // brazo
    stroke(gu, 'M398 318 L438 306 L446 330 L406 342 Z', { 'stroke-width': 4 }),   // linterna
    stroke(gu, 'M246 330 L262 322 L278 330 L276 352 L262 362 L248 352 Z', { 'stroke-width': 3, stroke: '#ffb23e' }), // placa
  ];
  // lupa sobre la letra
  const ln = $('lens');
  el('circle', { cx: 80, cy: 80, r: 62, fill: 'rgba(233,230,223,.06)', stroke: '#e9e6df', 'stroke-width': 7 }, ln);
  el('line', { x1: 126, y1: 126, x2: 178, y2: 178, stroke: '#e9e6df', 'stroke-width': 14, 'stroke-linecap': 'round' }, ln);
  // reloj del calendario
  const cs = $('clksvg');
  el('circle', { cx: 190, cy: 190, r: 172, fill: '#0b0e12', stroke: '#2a313b', 'stroke-width': 3 }, cs);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6, r1 = i % 3 ? 150 : 138;
    el('line', { x1: 190 + Math.sin(a) * r1, y1: 190 - Math.cos(a) * r1, x2: 190 + Math.sin(a) * 160, y2: 190 - Math.cos(a) * 160, stroke: '#8b919a', 'stroke-width': i % 3 ? 2 : 5 }, cs);
  }
  IL.hh = el('line', { x1: 190, y1: 190, x2: 190, y2: 100, stroke: '#e9e6df', 'stroke-width': 9, 'stroke-linecap': 'round' }, cs);
  IL.mh = el('line', { x1: 190, y1: 190, x2: 190, y2: 58, stroke: '#d23a32', 'stroke-width': 5, 'stroke-linecap': 'round' }, cs);
  el('circle', { cx: 190, cy: 190, r: 9, fill: '#e9e6df' }, cs);
  // polvo del título
  const R = rnd(5), ds = $('dust');
  IL.dust = Array.from({ length: 80 }, () => ({ x: R() * W, y: R() * H, r: .8 + R() * 2.2, v: 6 + R() * 18, o: .08 + R() * .3, ph: R() * 6, e: el('circle', { r: 1, fill: '#e9e6df' }, ds) }));
}

// ---------- Calendario y terminal ----------
function setupCalendar() {
  const dn = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];
  let h = dn.map(d => `<div class="dn">${d}</div>`).join('');
  for (let d = 1; d <= 35; d++) {
    if (d > 29) { h += '<div class="d e"></div>'; continue; }
    h += `<div class="d" id="d${d}">${d}<div class="fill"></div><div class="hl"></div><div class="nt"></div></div>`;
  }
  $('cgrid').innerHTML = h;
  const notes = { 4: ['NOCHE:<br>EL ATAQUE', '#ff6a5e'], 5: ['FINDE<br>EN DACA', '#8fb3cc'], 6: ['FED<br>CERRADA', '#8fb3cc'], 7: ['FED<br>CERRADA', '#8fb3cc'], 8: ['FERIADO<br>EN MANILA', '#ffb23e'] };
  for (const d in notes) { const n = $('d' + d).querySelector('.nt'); n.innerHTML = notes[d][0]; n.style.color = notes[d][1]; }
  $('d4').querySelector('.fill').style.background = 'rgba(210,58,50,.16)';
  for (const d of [5, 6, 7]) $('d' + d).querySelector('.fill').style.background = 'rgba(80,120,160,.16)';
  $('d8').querySelector('.fill').style.background = 'rgba(255,178,62,.18)';
  $('d8').querySelector('.hl').style.borderColor = '#ffb23e';
  // terminal: mensajes de la red bancaria
  const m = [['MT202', 'NUEVA YORK', 'USD 15.000.000'], ['MT103', 'LONDRES', 'USD 2.400.000'], ['MT103', 'SINGAPUR', 'USD 870.500'], ['MT202', 'NUEVA YORK', 'USD 40.000.000'], ['MT103', 'TOKIO', 'USD 6.125.000'], ['MT103', 'FRÁNCFORT', 'USD 1.310.250']];
  $('mrows').innerHTML = m.map(r => `<div class="mr">${r.map(x => `<span>${x}</span>`).join('')}</div>`).join('');
}
// posiciones fijas (sin transformaciones) para animaciones que dependen del diseño
let GEO = {};
function measure() {
  const r = e => e.getBoundingClientRect();
  const show = ids => ids.forEach(id => { $(id).style.visibility = 'visible'; });
  show(['s_doc', 's_cards', 's_split']);
  const jw = r($('jw')); GEO.jw = [jw.left + jw.width / 2, jw.top + jw.height / 2];
  const ca = r($('cardA')), tu = r($('tu'));
  GEO.lens = [tu.left - ca.left + tu.width / 2 - 80, tu.top - ca.top + tu.height / 2 - 80];
  const ls = $('links');
  GEO.links = [...document.querySelectorAll('#sms .sr')].map((a, i) => {
    const b = document.querySelectorAll('#sps .sr')[i], ra = r(a), rb = r(b);
    const x1 = ra.right + 30, y1 = ra.top + ra.height / 2, x2 = rb.left - 8, y2 = rb.top + rb.height / 2;
    return el('path', { d: `M${x1} ${y1} C${x1 + 120} ${y1} ${x2 - 120} ${y2} ${x2} ${y2}`, fill: 'none', stroke: '#ffb23e', 'stroke-width': 2, opacity: .7, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, ls);
  });
}

// ---------- Render ----------
const QUOTE = '“' + C.c23.text + '”';
const sw = (t, a, b) => clamp((t - a) / (b - a));
function render(t) {
  for (const id in SCN) {
    const [a, b, fi, fo] = SCN[id];
    const o = win(t, a, b, fi, fo);
    const s = $(id);
    s.style.opacity = o.toFixed(3);
    s.style.visibility = o > 0 ? 'visible' : 'hidden';
    const cam = s.querySelector('.cam');
    if (cam && o > 0) cam.style.transform = `scale(${lerp(1, 1.045, io(P(t, a, b)))})`;
  }
  const on = (id, pad = .2) => t > SCN[id][0] - pad && t < SCN[id][1] + pad;
  $('leadled').style.opacity = (t < 2.6 && (Math.floor(t * 6) % 3 !== 0)) ? 1 : 0.15;

  // 1 · el cartel real, borroso, que se acerca sin llegar a leerse del todo
  if (on('s_hook')) {
    const k = io(P(t, 2.55, S('c2') + .5));
    $('hookimg').style.transform = `translateY(${(140 * k).toFixed(1)}px) scale(${lerp(1.04, 1.42, k).toFixed(4)})`;
    $('hookimg').style.filter = `blur(${lerp(20, 10, k).toFixed(1)}px) brightness(${lerp(.46, .72, k).toFixed(3)}) saturate(.55) contrast(1.12)`;
  }
  // 2 · Daca de noche
  if (on('s_night')) kb($('nightimg'), P(t, SCN.s_night[0], SCN.s_night[1]), 1.08, 1.16, 70, -70, 0, -10);
  // 3 · mapa: zoom hasta Bangladés
  if (M1 && on('s_map1')) {
    const [a] = SCN.s_map1;
    const k = io(P(t, a, S('c3') + .1));
    const [cx, cy] = M1.daca, s = Math.exp(lerp(0, Math.log(3.4), k));
    const px = lerp(W / 2, cx + 60 / s, k), py = lerp(H / 2, cy + 20 / s, k);
    M1.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-px} ${-py})`);
    M1.cd.inner.setAttribute('transform', `scale(${1 / s})`);
    M1.cd.c.setAttribute('opacity', P(t, a + 1.6, a + 2.4));
    M1.bd.setAttribute('opacity', P(t, a + 1.2, a + 2.4));
    M1.bd.setAttribute('stroke-width', .6 / s * 2);
    pulse(M1.cd, t);
  }
  // contador del intento de robo
  if (on('s_count')) {
    const a = AT('c2', 'casi mil') - .3;
    $('countv').textContent = fmt(951e6 * eo(P(t, a, a + 1.9)));
  }
  // 4 · la terminal: usuario, contraseña y conexión
  if (on('s_pc')) {
    const [a, b] = SCN.s_pc;
    const k = io(P(t, a, b));
    $('mon').style.transform = `perspective(2600px) rotateY(${lerp(-16, -7, k)}deg) rotateX(3deg) scale(${lerp(.9, 1.0, k)})`;
    const u = 'operador.10', u0 = S('c3') - .3, p0 = S('c3') + .25;
    const nu = clamp(Math.floor((t - u0) / .045) + 1, 0, u.length);
    const np = clamp(Math.floor((t - p0) / .085) + 1, 0, 10);
    $('lu').textContent = t < u0 ? '' : u.slice(0, nu);
    $('lp').textContent = t < p0 ? '' : '•'.repeat(np);
    const blink = Math.floor(t * 2.6) % 2 === 0;
    $('cu').style.opacity = t < p0 ? (blink || nu < u.length ? 1 : 0) : 0;
    $('cp').style.opacity = t >= p0 && t < AT('c3', 'correctas') ? (blink || np < 10 ? 1 : 0) : 0;
    const ok = P(t, AT('c3', 'correctas'), AT('c3', 'correctas') + .3);
    $('ok').style.opacity = eo(ok);
    $('ok').style.transform = `scale(${lerp(.96, 1, eo(ok))})`;
    const sw1 = P(t, S('c4') - .2, S('c4') + .15);
    $('wlogin').style.opacity = 1 - sw1; $('sys').style.opacity = sw1;
    document.querySelectorAll('#mrows .mr').forEach((r, i) => { r.style.opacity = P(t, S('c4') + .1 + i * .16, S('c4') + .3 + i * .16); });
    const l1 = t > S('c4') + .2, l2 = t > AT('c4', 'sistema');
    $('ld1').style.background = l1 ? '#4fb07a' : '#2a3b48'; $('ld1').style.boxShadow = l1 ? '0 0 14px #4fb07a' : 'none';
    $('ld2').style.background = l2 ? '#4fb07a' : '#2a3b48'; $('ld2').style.boxShadow = l2 ? '0 0 14px #4fb07a' : 'none';
    $('lst').style.color = l2 ? '#4fb07a' : '#5c7d94';
  }
  // 5 · día, hora y feriado; después, el sello
  if (on('s_cal')) {
    const d4 = AT('c5', 'el día'), hr = AT('c5', 'la hora'), fe = AT('c5', 'feriado');
    const show = (d, a, dur = .35) => {
      const k = eo(P(t, a, a + dur)), c = $('d' + d);
      c.querySelector('.fill').style.opacity = k; c.querySelector('.nt').style.opacity = k;
      c.style.color = k > .5 ? '#e9e6df' : '#6d737c';
      return k;
    };
    const k4 = show(4, d4 - .15);
    const h4 = $('d4').querySelector('.hl'); h4.style.opacity = k4; h4.style.transform = `scale(${lerp(1.25, 1, k4)})`;
    [5, 6, 7].forEach((d, i) => show(d, fe - .45 + i * .14));
    const k8 = show(8, fe + .05, .45);
    const h8 = $('d8').querySelector('.hl'); h8.style.opacity = k8; h8.style.transform = `scale(${lerp(1.25, 1, k8)})`;
    $('d8').style.boxShadow = `0 0 ${50 * k8}px rgba(255,178,62,${.3 * k8})`;
    const ck = eo(P(t, hr - .25, hr + .6));
    $('clk').style.opacity = lerp(.18, 1, eo(P(t, hr - .4, hr)));
    IL.hh.setAttribute('transform', `rotate(${258 * ck} 190 190)`);
    IL.mh.setAttribute('transform', `rotate(${(216 + 720) * ck} 190 190)`);
    const mins = Math.round((20 * 60 + 36) * ck);
    $('clkt').textContent = String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
    $('clkny').style.opacity = P(t, hr + .5, hr + .9);
    // y aun así, fracasó
    const st = P(t, S('c6') - .02, S('c6') + .16);
    $('stamp').style.opacity = st > 0 ? .95 : 0;
    $('stamp').style.transform = `rotate(-7deg) scale(${lerp(2.3, 1, eo(st))})`;
    const sh = st > 0 ? Math.exp(-(t - S('c6')) * 9) : 0;
    $('calcam').style.transform = `translate(${(Math.sin(t * 91) * 14 * sh).toFixed(1)}px,${(Math.cos(t * 77) * 10 * sh).toFixed(1)}px)`;
    const dim = P(t, S('c6'), S('c6') + .5);
    $('cal').style.opacity = lerp(1, .38, dim); $('clk').style.filter = `grayscale(${dim})`;
    $('cal').style.filter = `grayscale(${dim})`;
  }
  // 6 · ni antivirus, ni guardia, ni analista
  if (on('s_neg')) {
    const panes = [['pnA', 'c7'], ['pnB', 'c8'], ['pnC', 'c9']];
    panes.forEach(([id, c], i) => {
      const p = $(id), k = eo(P(t, S(c) - .2, S(c) + .25));
      const x = eo(P(t, E(c) - .2, E(c) + .12));
      p.style.opacity = k * lerp(1, .42, P(t, E(c) + .05, E(c) + .5));
      p.style.transform = `translateY(${lerp(40, 0, k)}px)`;
      p.querySelector('.x').style.transform = `rotate(-50.9deg) scaleX(${x})`;
    });
    const a7 = S('c7');
    IL.shield.setAttribute('stroke-dashoffset', 1 - io(P(t, a7 - .15, a7 + .7)));
    IL.shin.setAttribute('stroke-dashoffset', 1 - io(P(t, a7, a7 + .8)));
    IL.check.setAttribute('stroke-dashoffset', 1 - eo(P(t, a7 + .55, a7 + 1.0)));
    IL.shglow.setAttribute('opacity', P(t, a7 + .6, a7 + 1.0) * (1 - P(t, E('c7') - .1, E('c7') + .3)));
    const a8 = S('c8');
    IL.guard.forEach((g, i) => g.setAttribute('stroke-dashoffset', 1 - io(P(t, a8 - .2 + i * .05, a8 + .35 + i * .05))));
    IL.cone.setAttribute('opacity', P(t, a8 + .2, a8 + .5) * .9);
    IL.cone.setAttribute('transform', `translate(444 318) rotate(${(Math.sin(t * 2.4) * 14 + 38).toFixed(2)})`);
    kb($('fedimg'), P(t, S('c9') - .2, S('c10')), 1.15, 1.3, 30, -20, 0, -10);
  }
  // 7 · la orden de pago: aparece la palabra
  if (on('s_doc')) {
    const a = S('c10') - .2, k = eo(P(t, a, a + .4));
    $('doc').style.transform = `translateY(${lerp(50, 0, k)}px)`;
    const hb = eo(P(t, AT('c10', 'palabra') - .1, AT('c10', 'palabra') + .25));
    $('jbox').style.opacity = hb; $('jbox').style.transform = `scale(${lerp(1.4, 1, hb)})`;
    $('jw').style.color = hb > .5 ? '#d23a32' : '#1c1d1f';
    const z = io(P(t, AT('c10', 'palabra') + .15, E('c10') + .45));
    const s = lerp(1, 2.8, z), [jx, jy] = GEO.jw;
    $('doccam').style.transform = `translate(${-(jx - W / 2) * s * z}px,${-(jy - H / 2) * s * z}px) scale(${s})`;
  }
  // 8 · JUPITER tecleado y la letra equivocada
  if (on('s_jup')) {
    const j0 = E('c10') + .25;
    const n = clamp(Math.floor((t - j0) / .11) + 1, 0, 7);
    $('jupt').textContent = 'JUPITER'.slice(0, t < j0 ? 0 : n);
    $('caret').style.opacity = (Math.floor(t * 2.4) % 2 === 0 || n < 7) ? 1 : 0;
    const f = P(t, S('c11') + .9, S('c11') + 1.6);
    $('fund').style.opacity = eo(f);
    $('fund').style.transform = `translateY(${lerp(20, 0, eo(f))}px)`;
    $('jup').style.transform = `translateY(${lerp(0, -20, eo(f))}px)`;
  }
  // 9 · mapa: las órdenes viajan
  if (M2 && on('s_map2')) {
    const a0 = S('c12'), stop = AT('c12', 'dos casualidades');
    M2.c.daca.c.setAttribute('opacity', P(t, a0, a0 + .6));
    M2.c.ny.c.setAttribute('opacity', P(t, a0 + 2.6, a0 + 3.2));
    M2.c.manila.c.setAttribute('opacity', P(t, a0 + 5.0, a0 + 5.6));
    M2.c.colombo.c.setAttribute('opacity', P(t, a0 + 5.6, a0 + 6.2));
    const spans = [[a0 + .6, a0 + 2.9], [a0 + 3.3, a0 + 5.4], [a0 + 4.0, a0 + 6.0]];
    M2.arcs.forEach((r, i) => {
      const k = io(P(t, ...spans[i]));
      r.pth.setAttribute('stroke-dashoffset', r.L * (1 - k));
      const live = t > spans[i][1] - .4;
      const blocked = i > 0 && t > stop;
      r.pk.forEach((p, j) => {
        if (!live || (i === 2 && j % 3)) { p.setAttribute('opacity', 0); return; }
        let u = ((t - spans[i][1]) * .28 + j / r.pk.length) % 1;
        if (blocked) u = Math.min(u, ((stop - spans[i][1]) * .28 + j / r.pk.length) % 1);
        const q = r.pth.getPointAtLength(u * r.L), q2 = r.pth.getPointAtLength(Math.min(r.L, u * r.L + 2));
        const ang = Math.atan2(q2.y - q.y, q2.x - q.x) * 180 / Math.PI;
        p.setAttribute('transform', `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
        const fade = blocked ? 1 - P(t, stop, stop + 1.2) : 1;
        p.setAttribute('opacity', (Math.sin(u * Math.PI) * .9 + .1) * P(t, spans[i][1] - .4, spans[i][1]) * fade);
      });
    });
    for (const k in M2.c) pulse(M2.c[k], t, .7, k.length * .3);
    const bl = P(t, stop, stop + .5);
    M2.c.ny.ring.setAttribute('stroke', bl > 0 ? '#d23a32' : '#ffb23e');
    M2.c.ny.halo.setAttribute('fill', bl > .5 ? 'url(#halor)' : 'url(#halo)');
    $('ordv').textContent = String(Math.round(35 * eo(P(t, a0 + 1.4, a0 + 5.0)))).padStart(2, '0');
    $('ord').style.opacity = P(t, a0 + 1.0, a0 + 1.6);
    const s = lerp(1.0, 1.06, io(P(t, a0 - .4, S('c13'))));
    M2.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-W / 2} ${-H / 2})`);
  }
  // 10 · dos casualidades
  if (on('s_cards')) {
    const a = P(t, S('c13'), S('c13') + .6), b = P(t, S('c14'), S('c14') + .8);
    $('cardA').style.opacity = lerp(.25, 1, eo(a)) * lerp(1, .45, b);
    $('cardB').style.opacity = lerp(.18, 1, eo(b));
    $('cardA').querySelector('.top').style.transform = `scaleX(${eo(a) * (1 - b)})`;
    $('cardB').querySelector('.top').style.transform = `scaleX(${eo(b)})`;
    $('cardB').style.boxShadow = `0 0 ${80 * b}px rgba(210,58,50,${.25 * b})`;
    const lk = io(P(t, S('c13') + .1, S('c13') + 1.3));
    const [lx, ly] = GEO.lens;
    $('lens').style.transform = `translate(${lerp(420, lx, lk)}px,${lerp(470, ly, lk)}px) scale(${lerp(.8, 1, lk)})`;
    $('tu').style.color = lk > .85 ? '#d23a32' : '#e9e6df';
    $('tu').style.textShadow = lk > .85 ? '0 0 26px rgba(210,58,50,.7)' : 'none';
    kb($('cbimg'), P(t, S('c13'), S('title')), 1.05, 1.2, 0, -20, 0, 10);
    $('qmark').style.opacity = eo(P(t, S('c14') + 1.0, S('c14') + 1.8));
  }
  // 11 · título
  if (on('s_title')) {
    $('t2').style.letterSpacing = lerp(.12, .03, eo(P(t, S('title'), S('title') + 3.5))) + 'em';
    $('tline').style.width = (900 * eo(P(t, S('title') + .6, S('title') + 2.4))) + 'px';
    $('t3').style.opacity = P(t, S('title') + 1.6, S('title') + 2.6);
    $('t1').style.opacity = P(t, S('title') + .3, S('title') + 1.3);
    for (const d of IL.dust) {
      const y = ((d.y - t * d.v) % H + H) % H, x = d.x + Math.sin(t * .3 + d.ph) * 12;
      d.e.setAttribute('cx', x.toFixed(1)); d.e.setAttribute('cy', y.toFixed(1)); d.e.setAttribute('r', d.r);
      d.e.setAttribute('opacity', (d.o * (.6 + .4 * Math.sin(t * 1.3 + d.ph))).toFixed(3));
    }
  }
  // 12 · capítulo
  if (on('s_chap')) {
    $('cn').style.opacity = eo(P(t, S('chapter') + .3, S('chapter') + 1.4));
    $('ct').style.opacity = eo(P(t, S('chapter') + .8, S('chapter') + 1.8));
    $('cd').style.opacity = eo(P(t, S('chapter') + 1.4, S('chapter') + 2.4));
  }
  // 13 · Bangladés
  if (M3 && on('s_dhaka')) {
    const [a, b] = SCN.s_dhaka;
    const k = io(P(t, a, b));
    const [cx, cy] = M3.daca, s = lerp(1.0, 1.4, k);
    const px = lerp(W / 2, cx, k), py = lerp(H / 2, cy, k);
    M3.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-px} ${-py})`);
    M3.cd.inner.setAttribute('transform', `scale(${1 / s})`);
    M3.cd.c.setAttribute('opacity', P(t, S('c16') + .3, S('c16') + 1.0));
    pulse(M3.cd, t);
  }
  // 14 · Motijheel y el reloj
  if (on('s_morning')) kb($('mornimg'), P(t, SCN.s_morning[0], SCN.s_morning[1]), 1.04, 1.13, -30, 30, 0, -16);
  if (on('s_clock')) {
    const sec = clamp(Math.floor(t - AT('c16', 'Viernes')), 0, 59);
    $('clockh').innerHTML = `08:45<small>:${String(sec).padStart(2, '0')}</small>`;
  }
  // 15 · la torre: la cámara sube por la fachada
  if (on('s_tower')) {
    const img = $('towerimg'), hh = img.naturalHeight * W / img.naturalWidth;
    const k = io(P(t, SCN.s_tower[0], SCN.s_tower[1]));
    img.style.width = W + 'px'; img.style.height = hh + 'px';
    img.style.transform = `translateY(${lerp(-(hh - H), -(hh - H) * .22, k).toFixed(1)}px) scale(${lerp(1.0, 1.06, k).toFixed(4)})`;
  }
  // 16 · edificio: sube piso por piso hasta el 10
  if (B.g && on('s_build')) {
    const a = AT('c17', 'dentro'), b = a + 1.9;
    const fl = clamp(Math.floor(lerp(1, 10.99, io(P(t, a - .1, b)))), 1, 10);
    $('floorv').textContent = 'PISO ' + String(fl).padStart(2, '0');
    $('floorr').style.opacity = P(t, b, b + .5);
    B.win.forEach((row, f) => row.forEach((w, k) => {
      const lit = f + 1 === 10 && fl === 10;
      const pass = f + 1 === fl && fl < 10;
      w.setAttribute('fill', lit ? (k % 2 ? '#c98a2c' : '#ffb23e') : pass ? '#3a4a5e' : (k % 2 ? '#1a222c' : '#202a36'));
    }));
    const k = io(P(t, a - .4, b + 1.2));
    const camY = lerp(260, 560, k), s = lerp(1.0, 1.7, io(P(t, b + .2, S('c18') + .3)));
    B.g.setAttribute('transform', `translate(${1060} ${camY}) scale(${s}) translate(0 ${lerp(0, 90, k)})`);
  }
  // 17 · la impresora imprime el registro
  if (PR.g && on('s_printer')) {
    const t0 = S('c18') + .2, gap = .95;
    PR.sheets.forEach((sh, i) => {
      const a = t0 + i * gap, k = eo(P(t, a, a + .6));
      const vis = t > a;
      const y0 = lerp(170, 255, k), y1 = Math.max(250.5, y0);
      if (vis) moveBox(sh, 70, y1, PZ + 61 + i * 1.6 + (1 - k) * 8, 200, Math.max(.1, y0 + 70 - y1), 1.4);
      for (const f of Object.values(sh)) f.setAttribute('opacity', vis ? 1 : 0);
    });
    const lA = AT('c18', 'registro') - .4;
    const lk = P(t, lA, lA + .7);
    $('ledger').style.opacity = eo(lk);
    $('ledger').style.transform = `translateY(${lerp(40, 0, eo(lk))}px) scale(${lerp(.98, 1, eo(lk))})`;
    document.querySelectorAll('#ledger .lr').forEach((r, i) => { r.style.opacity = P(t, lA + .5 + i * .45, lA + .7 + i * .45); });
    PR.led.setAttribute('fill', '#3d8a5a'); PR.halo.setAttribute('opacity', .25);
    const push = io(P(t, SCN.s_printer[0], SCN.s_printer[1]));
    PR.g.setAttribute('transform', `translate(${lerp(560, 620, push)} ${lerp(420, 440, push)}) scale(${lerp(1.3, 1.5, push)})`);
    $('ptag').style.opacity = P(t, S('c18'), S('c18') + 1) * (1 - P(t, lA, lA + .6));
  }
  // 18 · en las computadoras y en papel
  if (on('s_split')) {
    const a = S('c19') - .2;
    document.querySelectorAll('#sms .sr').forEach((r, i) => { r.style.opacity = P(t, a + i * .1, a + .2 + i * .1); });
    document.querySelectorAll('#sps .sr').forEach((r, i) => { r.style.opacity = P(t, a + .2 + i * .1, a + .4 + i * .1); });
    const g1 = eo(P(t, AT('c19', 'guardados') - .1, AT('c19', 'guardados') + .4));
    const g2 = eo(P(t, AT('c19', 'impresos') - .1, AT('c19', 'impresos') + .4));
    $('sm').style.boxShadow = `0 40px 120px rgba(0,0,0,.7), 0 0 ${120 * g1}px rgba(70,140,200,${.35 * g1})`;
    $('sp').style.boxShadow = `0 40px 120px rgba(0,0,0,.7), 0 0 ${120 * g2}px rgba(255,210,150,${.3 * g2})`;
    $('sl1').style.opacity = lerp(.3, 1, g1); $('sl1').style.color = g1 > .5 ? '#8fb3cc' : '#8b919a';
    $('sl2').style.opacity = lerp(.3, 1, g2); $('sl2').style.color = g2 > .5 ? '#ffd28a' : '#8b919a';
    $('sm').style.opacity = lerp(1, .55, g2 * (1 - g1 * .4));
    GEO.links.forEach((l, i) => l.setAttribute('stroke-dashoffset', 1 - io(P(t, AT('c19', 'impresos') + i * .1, AT('c19', 'impresos') + .5 + i * .1))));
  }
  // 19 · el archivo
  if (AR.g && on('s_arch')) {
    const a = S('c20') - .3;
    AR.boxes.forEach(({ b, lab, it, d }) => {
      const k = eo(P(t, a + d, a + d + .35));
      const z = it.k * 40 + (1 - k) * 160;
      moveBox(b, it.x, it.y, z, 92, 76, 38);
      lab.setAttribute('points', pts([[it.x + 20, it.y + 76.5, z + 12], [it.x + 62, it.y + 76.5, z + 12], [it.x + 62, it.y + 76.5, z + 26], [it.x + 20, it.y + 76.5, z + 26]]));
      const o = k > 0 ? 1 : 0;
      for (const f of [b.top, b.left, b.right, lab]) f.setAttribute('opacity', o);
    });
    const k = io(P(t, a, S('c21')));
    AR.g.setAttribute('transform', `translate(${lerp(1040, 990, k)} ${lerp(380, 330, k)}) scale(${lerp(1.45, 1.1, k)})`);
  }
  // 20 · la bandeja vacía
  if (PR2.g && on('s_empty')) {
    const blink = Math.floor((t - S('c21')) * 1.6) % 2 === 0;
    PR2.led.setAttribute('fill', blink ? '#ffb23e' : '#3a2a12');
    PR2.halo.setAttribute('opacity', blink ? 1 : .05);
    const k = io(P(t, SCN.s_empty[0], SCN.s_empty[1]));
    PR2.g.setAttribute('transform', `translate(${lerp(820, 760, k)} ${lerp(330, 220, k)}) scale(${lerp(1.7, 2.3, k)})`);
    $('etag1').style.opacity = P(t, S('c21') + .3, S('c21') + 1.0);
  }
  // 21 · la denuncia y la cita a máquina
  if (on('s_quote')) {
    $('qbar').style.height = (110 * eo(P(t, S('c22') + .1, S('c22') + .8))) + 'px';
    $('qname').style.opacity = P(t, S('c22') + .2, S('c22') + .9);
    $('qrole').style.opacity = P(t, S('c22') + .6, S('c22') + 1.3);
    const dk = eo(P(t, AT('c22', 'Más tarde') - .2, AT('c22', 'Más tarde') + .6));
    $('pdoc').style.opacity = dk;
    $('pdoc').style.transform = `translateY(${lerp(120, 0, dk)}px) rotate(${lerp(1.5, -.6, dk)}deg)`;
    const ts = S('c23') - .2, te = E('c23') - .3;
    const n = t < ts ? 0 : clamp(Math.floor((t - ts) / (te - ts) * QUOTE.length) + 1, 0, QUOTE.length);
    $('qt').textContent = QUOTE.slice(0, n);
    $('qcaret').style.opacity = (n < QUOTE.length || Math.floor(t * 2.2) % 2 === 0) && t > ts - .5 ? 1 : 0;
  }
  // 22 · cierre: se apagan las luces, solo queda la luz que titila
  if (PE.g && on('s_end')) {
    const k = io(P(t, S('c24') - .3, TL.duration));
    PE.g.setAttribute('transform', `translate(${860} ${520}) scale(${lerp(.95, 1.12, k)})`);
    const blink = Math.floor(t * 1.6) % 2 === 0;
    PE.led.setAttribute('fill', blink ? '#ffb23e' : '#3a2a12');
    PE.halo.setAttribute('opacity', blink ? 1 : .05);
    const offs = [AT('c24', 'La impresora') - 2.2, AT('c24', 'La impresora') - 1.4, AT('c24', 'La impresora') - .6];
    let dark = 0;
    PE.lamps.forEach((l, i) => {
      const off = t > offs[i];
      l.bar.setAttribute('fill', off ? '#1a1e24' : '#f3ead8');
      l.glow.setAttribute('opacity', off ? 0 : 1);
      PE.pools[i].setAttribute('opacity', off ? 0 : 1);
      if (off) dark++;
    });
    PE.dark.setAttribute('opacity', [0, .25, .45, .62][dark]);
    $('etag').style.opacity = P(t, S('c24') + .4, S('c24') + 1.4) * (1 - P(t, E('c24') + .3, E('c24') + 1.5));
  }
}

window.READY = (async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
  setupCalendar(); setupIllustrations(); setupPrinters(); setupBuilding(); setupArchive();
  measure();
  await setupMaps();
  render(0);
  return true;
})();
window.render = render;
