// Motor de escenas: todo depende solo de t (segundos), así cada cuadro es reproducible.
const W = 1920, H = 1080;
const C = Object.fromEntries(TL.cues.map(c => [c.id, c]));
const S = id => C[id].start, E = id => C[id].end;
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

// ---------- Ventanas de cada escena ----------
const SCN = {
  s_lead: [0, 2.75, .05, .25],
  s_hook: [2.55, S('c2') + .6, 1.0, .9],
  s_map1: [S('c2') - .3, S('c3') + .3, 1.2, .6],
  s_check: [S('c3') - .25, S('c7') + .15, .5, .4],
  s_neg: [S('c7') - .2, S('c10') + .1, .4, .4],
  s_jup: [S('c10') - .15, S('c12') + .3, .5, .7],
  s_map2: [S('c12') - .4, S('c13') + .3, 1.0, .6],
  s_cards: [S('c13') - .3, S('title') - .1, .6, .9],
  s_title: [S('title') + .05, E('title') - .2, 1.4, 1.0],
  s_chap: [S('chapter') + .3, S('c16') + .1, .9, .7],
  s_dhaka: [S('c16') - .3, S('c17') + .3, .9, .6],
  s_build: [S('c17') - .3, S('c18') + .3, .7, .6],
  s_printer: [S('c18') - .3, S('c22') + .3, .7, .7],
  s_quote: [S('c22') - .3, S('c24') + .2, .7, .6],
  s_end: [S('c24') - .3, TL.duration - .8, .8, 2.8],
};

// ---------- Mapas ----------
const cities = { daca: [90.41, 23.81], ny: [-74.0, 40.71], manila: [120.98, 14.6] };
let M1, M2, M3;
async function setupMaps() {
  const land = topojson.feature(await (await fetch('land-50m.json')).json(), 'land');
  const world = await (await fetch('countries-50m.json')).json();
  const countries = topojson.feature(world, world.objects.countries);
  const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
  const grat = d3.geoGraticule10();

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
  function city(g, xy, label, anchor = 'start', dx = 22) {
    const c = el('g', { opacity: 0 }, g);
    el('circle', { cx: xy[0], cy: xy[1], r: 26, fill: 'url(#halo)' }, c);
    el('circle', { cx: xy[0], cy: xy[1], r: 5, fill: '#ffd28a' }, c);
    const ring = el('circle', { cx: xy[0], cy: xy[1], r: 10, fill: 'none', stroke: '#ffb23e', 'stroke-width': 1.5 }, c);
    const t = el('text', { x: xy[0] + (anchor === 'end' ? -dx : dx), y: xy[1] + 8, fill: '#e9e6df', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': '3', 'text-anchor': anchor }, c);
    t.textContent = label;
    return { c, ring };
  }
  function defs(svg) {
    const d = el('defs', {}, svg);
    const rg = el('radialGradient', { id: 'halo' }, d);
    el('stop', { offset: '0%', 'stop-color': '#ffb23e', 'stop-opacity': .55 }, rg);
    el('stop', { offset: '100%', 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  }

  // Mapa 1: el mundo de noche, foco en Daca
  const s1 = $('map1'); defs(s1);
  M1 = worldMap(s1, [-30, 0]);
  M1.daca = M1.proj(cities.daca);
  M1.cd = city(M1.g, M1.daca, 'DACA, BANGLADÉS');

  // Mapa 2: Nueva York al centro, arcos Daca → Nueva York → Manila
  const s2 = $('map2'); defs(s2);
  M2 = worldMap(s2, [74, 0]);
  const p = k => M2.proj(cities[k]);
  M2.c = { daca: city(M2.g, p('daca'), 'DACA', 'end'), ny: city(M2.g, p('ny'), 'NUEVA YORK', 'start'), manila: city(M2.g, p('manila'), 'MANILA', 'start') };
  M2.arcs = [['daca', 'ny', '#e9e6df'], ['ny', 'manila', '#d23a32']].map(([a, b, col]) => {
    const d = M2.path({ type: 'LineString', coordinates: [cities[a], cities[b]] });
    const pth = el('path', { d, fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round' }, M2.g);
    const L = pth.getTotalLength();
    pth.setAttribute('stroke-dasharray', L); pth.setAttribute('stroke-dashoffset', L);
    return { pth, L };
  });

  // Mapa 3: Bangladés y alrededores
  const s3 = $('map3'); defs(s3);
  const bd = countries.features.find(f => f.id === '050');
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
function poly(g, pts, fill, extra = {}) {
  return el('polygon', Object.assign({ points: pts.map(p => iso(...p).map(v => v.toFixed(1)).join(',')).join(' '), fill }, extra), g);
}
function box(g, x, y, z, w, d, h, [top, left, right], stroke = 'none') {
  return {
    top: poly(g, [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], top, { stroke, 'stroke-width': 1 }),
    left: poly(g, [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], left, { stroke, 'stroke-width': 1 }),
    right: poly(g, [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], right, { stroke, 'stroke-width': 1 }),
  };
}
let B = {}, PR = {}, PE = {};
function setupBuilding() {
  const svg = $('bsvg');
  const g = el('g', {}, svg); B.g = g;
  const FL = 12, FH = 46, Wd = 300;
  // suelo
  poly(g, [[-500, -500, 0], [800, -500, 0], [800, 800, 0], [-500, 800, 0]], '#090c10');
  el('ellipse', { cx: 0, cy: iso(150, 150, 0)[1], rx: 560, ry: 300, fill: 'url(#spotg)', opacity: .9 }, g);
  B.win = [];
  for (let f = 0; f < FL; f++) {
    const z = f * FH;
    box(g, 0, 0, z, Wd, Wd, FH - 3, ['#1c222a', '#141920', '#0f1318'], '#222a34');
    const row = [];
    for (let k = 0; k < 6; k++) {
      // ventanas en la cara izquierda (y = Wd) y derecha (x = Wd)
      const a = 18 + k * 47;
      row.push(poly(g, [[a, Wd + .5, z + 12], [a + 30, Wd + .5, z + 12], [a + 30, Wd + .5, z + 34], [a, Wd + .5, z + 34]], '#202a36'));
      row.push(poly(g, [[Wd + .5, a, z + 12], [Wd + .5, a + 30, z + 12], [Wd + .5, a + 30, z + 34], [Wd + .5, a, z + 34]], '#1a222c'));
    }
    B.win.push(row);
  }
  box(g, 40, 40, FL * FH, 220, 220, 14, ['#232a33', '#181d24', '#12161b']);
  B.FH = FH; B.FL = FL;
}
function spot(g, cx, cy, rx, ry, op) {
  el('ellipse', { cx, cy, rx, ry, fill: 'url(#spotg)', opacity: op }, g);
}
function drawPrinter(svg, withPaper) {
  const g = el('g', {}, svg);
  poly(g, [[-700, -700, 0], [1100, -700, 0], [1100, 1100, 0], [-700, 1100, 0]], '#0a0d11');
  spot(g, iso(170, 125, 0)[0], iso(170, 125, 0)[1], 620, 330, .9);
  // mesa
  box(g, -120, -90, 0, 560, 420, 40, ['#1a1f26', '#12161b', '#0e1115']);
  const Z = 40;
  // cuerpo
  box(g, 0, 0, Z, 340, 250, 120, ['#2d333b', '#1e232a', '#161a1f'], '#333a44');
  // ranura de salida (arriba)
  poly(g, [[40, 30, Z + 120.5], [300, 30, Z + 120.5], [300, 95, Z + 120.5], [40, 95, Z + 120.5]], '#0b0e12');
  // bandeja de salida (frente)
  box(g, 50, 250, Z + 55, 240, 80, 6, ['#3a414b', '#272c33', '#1f242a'], '#424a55');
  // panel y LED
  poly(g, [[230, 250.5, Z + 85], [325, 250.5, Z + 85], [325, 250.5, Z + 108], [230, 250.5, Z + 108]], '#0f1216');
  const led = el('circle', { cx: iso(305, 250, Z + 96)[0], cy: iso(305, 250, Z + 96)[1], r: 6, fill: '#ffb23e' }, g);
  const halo = el('circle', { cx: iso(305, 250, Z + 96)[0], cy: iso(305, 250, Z + 96)[1], r: 26, fill: 'url(#ledhalo)' }, g);
  let paper = null;
  if (withPaper) {
    paper = el('g', {}, g);
    // hojas apiladas en la bandeja
    for (let k = 0; k < 4; k++) box(paper, 70, 255, Z + 61 + k * 2, 200, 70, 1.5, ['#d9d5cc', '#b9b5ad', '#a9a59e']);
  }
  return { g, led, halo, paper };
}
function setupPrinters() {
  for (const id of ['psvg', 'esvg', 'bsvg']) {
    const d = el('defs', {}, $(id));
    const sg = el('radialGradient', { id: 'spotg' }, d);
    el('stop', { offset: '0%', 'stop-color': '#9fb4cc', 'stop-opacity': .16 }, sg);
    el('stop', { offset: '60%', 'stop-color': '#9fb4cc', 'stop-opacity': .05 }, sg);
    el('stop', { offset: '100%', 'stop-color': '#9fb4cc', 'stop-opacity': 0 }, sg);
    const rg = el('radialGradient', { id: 'ledhalo' }, d);
    el('stop', { offset: '0%', 'stop-color': '#ffb23e', 'stop-opacity': .7 }, rg);
    el('stop', { offset: '100%', 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  }
  PR = drawPrinter($('psvg'), true);
  PE = drawPrinter($('esvg'), false);
  const rows = [['SWIFT MT103', 'USD 2.400.000'], ['SWIFT MT202', 'USD 15.000.000'], ['SWIFT MT103', 'USD 870.500'], ['SWIFT MT103', 'USD 6.125.000'], ['SWIFT MT202', 'USD 40.000.000'], ['SWIFT MT103', 'USD 1.310.250'], ['SWIFT MT103', 'USD 9.900.000'], ['SWIFT MT202', 'USD 22.750.000'], ['SWIFT MT103', 'USD 3.004.000'], ['SWIFT MT103', 'USD 515.800']];
  $('lrows').innerHTML = rows.map(([a, b]) => `<div class="lr"><span>${a}</span><span>${b}</span></div>`).join('');
}

// ---------- Lista de chequeo ----------
function setupChecks() {
  const items = ['Contraseñas correctas', 'Acceso al sistema correcto', 'Día, hora y feriado perfectos'];
  $('rows').innerHTML = items.map(t => `<div class="row"><svg viewBox="0 0 58 58"><rect x="2" y="2" width="54" height="54" fill="none" stroke="#4a5059" stroke-width="2"/><path class="ck" d="M14 30 L25 41 L45 18" fill="none" stroke="#e9e6df" stroke-width="5" stroke-linecap="round" stroke-dasharray="48" stroke-dashoffset="48"/></svg><span class="lbl">${t}</span></div>`).join('');
}

// ---------- Render ----------
const QUOTE = '“' + C.c23.text + '”';
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
  // arranque: LED que titila con la impresora
  $('leadled').style.opacity = (t < 2.6 && (Math.floor(t * 6) % 3 !== 0)) ? 1 : 0.15;

  // gancho: cartel borroso que se acerca sin llegar a leerse del todo
  if (t < S('c2') + 1) {
    const k = P(t, 2.6, S('c2') + .6);
    $('sign').style.filter = `blur(${lerp(22, 11, io(k))}px) brightness(${lerp(.35, .6, k)})`;
    $('sign').style.transform = `rotate(-3deg) scale(${lerp(.9, 1.08, io(k))})`;
  }
  // mapa 1: zoom lento hacia Daca
  if (M1 && t > S('c2') - 1 && t < S('c3') + 1) {
    const k = io(P(t, S('c2') - .3, S('c3') + .3));
    const [cx, cy] = M1.daca, s = lerp(1.0, 2.0, k);
    const px = lerp(W / 2, cx - 140, k), py = lerp(H / 2, cy, k);
    M1.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-px} ${-py})`);
    M1.cd.c.setAttribute('opacity', P(t, S('c2') + 2, S('c2') + 3));
    const pr = (t * .8) % 1;
    M1.cd.ring.setAttribute('r', 10 + pr * 30); M1.cd.ring.setAttribute('opacity', 1 - pr);
  }
  // lista de chequeo y fracaso
  if (t > S('c3') - 1 && t < S('c7') + 1) {
    const ids = ['c3', 'c4', 'c5'];
    const fail = P(t, S('c6') - .05, S('c6') + .6);
    document.querySelectorAll('#rows .row').forEach((r, i) => {
      const k = P(t, S(ids[i]) - .1, S(ids[i]) + .35);
      r.style.opacity = (k > 0 ? lerp(0, 1, eo(k)) : 0) * lerp(1, .28, fail);
      r.style.transform = `translateX(${lerp(-30, 0, eo(k))}px)`;
      r.querySelector('.ck').setAttribute('stroke-dashoffset', 48 * (1 - P(t, S(ids[i]) + .2, S(ids[i]) + .7)));
    });
    $('failline').style.width = (1120 * eo(fail)) + 'px';
    $('failline').style.top = '538px';
  }
  // negaciones tachadas
  if (t > S('c7') - 1 && t < S('c10') + 1) {
    const ids = ['c7', 'c8', 'c9'];
    document.querySelectorAll('#negs .neg').forEach((n, i) => {
      const k = P(t, S(ids[i]) - .1, S(ids[i]) + .3);
      const next = i < 2 ? P(t, S(ids[i + 1]) - .1, S(ids[i + 1]) + .3) : 0;
      n.style.opacity = eo(k) * lerp(1, .35, next);
      const st = n.querySelector('.strike');
      st.style.width = `calc(${eo(P(t, E(ids[i]) - .35, E(ids[i]) + .15)) * 100}% + 40px * ${eo(P(t, E(ids[i]) - .35, E(ids[i]) + .15))})`;
    });
  }
  // JUPITER tecleado y la letra equivocada
  if (t > S('c10') - 1 && t < S('c12') + 1) {
    const j0 = E('c10') + .25;
    const n = clamp(Math.floor((t - j0) / .11) + 1, 0, 7);
    $('jupt').textContent = 'JUPITER'.slice(0, t < j0 ? 0 : n);
    $('caret').style.opacity = (Math.floor(t * 2.4) % 2 === 0 || n < 7) ? 1 : 0;
    const f = P(t, S('c11') + .9, S('c11') + 1.6);
    $('fund').style.opacity = eo(f);
    $('fund').style.transform = `translateY(${lerp(20, 0, eo(f))}px)`;
    $('jup').style.transform = `translateY(${lerp(0, -20, eo(f))}px)`;
  }
  // mapa 2: arcos
  if (M2 && t > S('c12') - 1 && t < S('c13') + 1) {
    const a0 = S('c12');
    M2.c.daca.c.setAttribute('opacity', P(t, a0, a0 + .6));
    M2.c.ny.c.setAttribute('opacity', P(t, a0 + 3.4, a0 + 4));
    M2.c.manila.c.setAttribute('opacity', P(t, a0 + 6.4, a0 + 7));
    M2.arcs[0].pth.setAttribute('stroke-dashoffset', M2.arcs[0].L * (1 - io(P(t, a0 + .8, a0 + 3.6))));
    M2.arcs[1].pth.setAttribute('stroke-dashoffset', M2.arcs[1].L * (1 - io(P(t, a0 + 4.1, a0 + 6.8))));
    for (const k of ['daca', 'ny', 'manila']) {
      const pr = ((t + k.length * .3) * .7) % 1;
      M2.c[k].ring.setAttribute('r', 10 + pr * 26); M2.c[k].ring.setAttribute('opacity', 1 - pr);
    }
    const s = lerp(1.0, 1.06, io(P(t, a0 - .4, S('c13'))));
    M2.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-W / 2} ${-H / 2})`);
  }
  // dos casualidades
  if (t > S('c13') - 1 && t < S('title') + .5) {
    const a = P(t, S('c13'), S('c13') + .6), b = P(t, S('c14'), S('c14') + .8);
    $('cardA').style.opacity = lerp(.25, 1, eo(a)) * lerp(1, .45, b);
    $('cardB').style.opacity = lerp(.18, 1, eo(b));
    $('cardA').querySelector('.top').style.transform = `scaleX(${eo(a) * (1 - b)})`;
    $('cardB').querySelector('.top').style.transform = `scaleX(${eo(b)})`;
    $('cardB').style.boxShadow = `0 0 ${80 * b}px rgba(210,58,50,${.25 * b})`;
  }
  // título
  if (t > S('title') - .5 && t < E('title') + .5) {
    const k = P(t, S('title'), E('title'));
    $('t2').style.letterSpacing = lerp(.12, .03, eo(P(t, S('title'), S('title') + 3.5))) + 'em';
    $('tline').style.width = (900 * eo(P(t, S('title') + .6, S('title') + 2.4))) + 'px';
    $('t3').style.opacity = P(t, S('title') + 1.6, S('title') + 2.6);
    $('t1').style.opacity = P(t, S('title') + .3, S('title') + 1.3);
  }
  // capítulo
  if (t > S('chapter') && t < S('c16') + .5) {
    const k = P(t, S('chapter') + .3, S('chapter') + 1.4);
    $('cn').style.opacity = eo(k);
    $('ct').style.opacity = eo(P(t, S('chapter') + .8, S('chapter') + 1.8));
    $('cd').style.opacity = eo(P(t, S('chapter') + 1.4, S('chapter') + 2.4));
  }
  // Bangladés
  if (M3 && t > S('c16') - 1 && t < S('c17') + 1) {
    const k = io(P(t, S('c16') - .3, S('c17') + .3));
    const [cx, cy] = M3.daca, s = lerp(1.0, 1.18, k);
    const px = lerp(W / 2, (W / 2 + cx) / 2, k), py = lerp(H / 2, (H / 2 + cy) / 2, k);
    M3.g.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-px} ${-py})`);
    M3.cd.c.setAttribute('opacity', P(t, S('c16') + .6, S('c16') + 1.4));
    const pr = (t * .8) % 1;
    M3.cd.ring.setAttribute('r', 10 + pr * 30); M3.cd.ring.setAttribute('opacity', 1 - pr);
    $('clock').style.opacity = P(t, S('c16') + 3.2, S('c16') + 4);
    $('clockh').textContent = '08:45';
  }
  // edificio: sube piso por piso hasta el 10
  if (B.g && t > S('c17') - 1 && t < S('c18') + 1) {
    const a = S('c17') + .4, b = S('c17') + 4.2;
    const fl = clamp(Math.floor(lerp(1, 10.99, io(P(t, a, b)))), 1, 10);
    $('floorv').textContent = 'PISO ' + String(fl).padStart(2, '0');
    $('floorr').style.opacity = P(t, b, b + .5);
    B.win.forEach((row, f) => row.forEach((w, k) => {
      const lit = f + 1 === 10 && fl === 10;
      const pass = f + 1 === fl && fl < 10;
      w.setAttribute('fill', lit ? (k % 2 ? '#c98a2c' : '#ffb23e') : pass ? '#3a4a5e' : (k % 2 ? '#1a222c' : '#202a36'));
    }));
    const k = io(P(t, a - .4, b + 1.5));
    const camY = lerp(260, 560, k), s = lerp(1.0, 1.55, io(P(t, b - .5, S('c18') + .3)));
    B.g.setAttribute('transform', `translate(${1060} ${camY}) scale(${s}) translate(0 ${lerp(0, 90, k)})`);
  }
  // impresora + registro
  if (PR.g && t > S('c18') - 1 && t < S('c22') + 1) {
    const lA = S('c18') + 1.0, lB = S('c21') - .2;
    const lk = P(t, lA, lA + .8), lout = P(t, lB, lB + .7);
    $('ledger').style.opacity = eo(lk) * (1 - lout);
    $('ledger').style.transform = `translateY(${lerp(40, 0, eo(lk))}px) scale(${lerp(.98, 1, eo(lk))})`;
    const rowsEls = document.querySelectorAll('#ledger .lr');
    rowsEls.forEach((r, i) => { r.style.opacity = P(t, lA + .6 + i * .9, lA + .9 + i * .9); });
    const empty = P(t, S('c21') - .1, S('c21') + .6);
    PR.paper.setAttribute('opacity', 1 - empty);
    const on = t > S('c21') ? (Math.floor((t - S('c21')) * 1.6) % 2 === 0) : true;
    PR.led.setAttribute('fill', t > S('c21') ? (on ? '#ffb23e' : '#3a2a12') : '#3d8a5a');
    PR.halo.setAttribute('opacity', t > S('c21') ? (on ? 1 : .05) : .25);
    const push = io(P(t, S('c20') - .5, S('c22')));
    const shiftX = lerp(-260, 0, P(t, lB, lB + 1.2));
    PR.g.setAttribute('transform', `translate(${860 + shiftX + push * 40} ${430 + push * 60}) scale(${lerp(1.25, 1.75, push)})`);
    $('ptag').style.opacity = P(t, S('c18'), S('c18') + 1) * (1 - P(t, S('c20'), S('c20') + .8));
  }
  // cita a máquina de escribir
  if (t > S('c22') - 1 && t < S('c24') + 1) {
    $('qbar').style.height = (230 * eo(P(t, S('c22') + .1, S('c22') + .9))) + 'px';
    $('qname').style.opacity = P(t, S('c22') + .4, S('c22') + 1.1);
    $('qrole').style.opacity = P(t, S('c22') + .8, S('c22') + 1.5);
    const ts = S('c23') - .2, te = E('c23') - .3;
    const n = t < ts ? 0 : clamp(Math.floor((t - ts) / (te - ts) * QUOTE.length) + 1, 0, QUOTE.length);
    $('qt').textContent = QUOTE.slice(0, n);
    $('qcaret').style.opacity = (n < QUOTE.length || Math.floor(t * 2.2) % 2 === 0) && t > ts - .5 ? 1 : 0;
    $('qbar').style.top = '300px';
    $('qbar').style.height = Math.max(parseFloat($('qbar').style.height), n > 0 ? 470 * eo(P(t, ts, ts + 1)) : 0) + 'px';
  }
  // cierre
  if (PE.g && t > S('c24') - 1) {
    const k = io(P(t, S('c24') - .3, TL.duration));
    PE.g.setAttribute('transform', `translate(${900} ${470}) scale(${lerp(.95, 1.15, k)})`);
    const on = Math.floor(t * 1.6) % 2 === 0;
    PE.led.setAttribute('fill', on ? '#ffb23e' : '#3a2a12');
    PE.halo.setAttribute('opacity', on ? 1 : .05);
    $('etag').style.opacity = P(t, S('c24') + .4, S('c24') + 1.4) * (1 - P(t, E('c24') + .3, E('c24') + 1.5));
  }
}

window.READY = (async () => {
  await document.fonts.ready;
  setupChecks(); setupPrinters(); setupBuilding();
  await setupMaps();
  render(0);
  return true;
})();
window.render = render;
