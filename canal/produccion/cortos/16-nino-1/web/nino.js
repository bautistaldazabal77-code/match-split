// Mapas y dibujos compartidos por las dos partes de "¿Y si…? El Niño llega a su pico".
// Mapa: Natural Earth 10 m (dominio público), recortado por mapas/recorte_cuenca.py (web/cuenca.js).
// Niveles del Paraná en Rosario: alerta 5,00 m y evacuación 5,30 m (INA). Las casas, lanchas, barcos y puentes son ilustraciones.
const NI = { rosario: [-60.64, -32.95], victoria: [-60.16, -32.62], santafe: [-60.7, -31.63], corrientes: [-58.83, -27.47], posadas: [-55.9, -27.37], iguazu: [-54.59, -25.6],
  delta: [-58.6, -34.05], bsas: [-58.38, -34.6], asuncion: [-57.58, -25.28], curitiba: [-49.27, -25.43], saopaulo: [-46.63, -23.55], pacifico: [-120, 0] };
const ROJO = '#ff5148', CELESTE = '#8fd0ff', AMBAR = '#ffc142', VERDE = '#5ee093', AGUA = '#3fa3e6';
const NIV = { alerta: 5.0, evac: 5.3 };
const fmtM = h => h.toFixed(2).replace('.', ',') + ' m';

// cauce del Paraná de aguas arriba hacia el Delta, encadenando los tramos de Natural Earth (el índice sale del orden de web/cuenca.js;
// el tramo 0 lleva el nombre "Paraná" pero es el río Paraguay, y el 3 y el 7 son brazos repetidos)
const CAUCE = (() => {
  const R = CUENCA.rios.features.filter(f => f.properties.name === 'Paraná').map(f => f.geometry.coordinates);
  return [9, 5, 10, 6, 11, 13, -8, 14, 1, 2, 4].flatMap(i => i < 0 ? R[-i].slice().reverse() : R[i]);
})();

// carta de la cuenca del Paraná con ríos y provincias; M.onda(k) mueve el pulso de la crecida por el cauce (k de 0 a 1)
function cartaCuenca(svg, o = {}) {
  const M = mapaZona(svg, CUENCA, { centro: o.centro || [-56.5, -28], ancho: o.ancho || 15, titulo: o.titulo || 'CUENCA DEL PARANÁ', km: o.km || 200, paso: o.paso || 2, caja: o.caja });
  CUENCA.lagos.features.forEach(f => el('path', { d: M.path(f), fill: '#0b2335', stroke: '#1d3b52' }, M.g));
  M.prov = {};
  for (const f of CUENCA.prov.features) {
    const n = f.properties.name, p = el('path', { d: M.path(f), fill: 'none', stroke: f.properties.adm0_a3 === 'ARG' ? '#3b4a5a' : '#262e37', 'stroke-width': 1.5, 'stroke-dasharray': '3 6' }, M.g);
    (M.prov[n] = M.prov[n] || []).push(p);
  }
  M.resaltar = (n, col = ROJO, q = 1) => (M.prov[n] || []).forEach(p => { p.setAttribute('fill', col); p.setAttribute('fill-opacity', (.16 * q).toFixed(3)); p.setAttribute('stroke', col); p.setAttribute('stroke-opacity', q); p.setAttribute('stroke-dasharray', ''); p.setAttribute('stroke-width', 3); });
  CUENCA.rios.features.forEach(f => el('path', { d: M.path(f), fill: 'none', stroke: '#24557a', 'stroke-width': f.properties.scalerank <= 4 ? 2.6 : 1.4, 'stroke-linecap': 'round' }, M.g));
  const cauce = { type: 'LineString', coordinates: CAUCE };
  M.parana = el('path', { d: M.path(cauce), fill: 'none', stroke: AGUA, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, M.g);
  const brillo = el('path', { d: M.path(cauce), fill: 'none', stroke: '#bfe6ff', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0, pathLength: 1, 'stroke-dasharray': '0 1' }, M.g);
  const pulso = el('circle', { r: 16, fill: '#bfe6ff', opacity: 0 }, M.g), halo = el('circle', { r: 16, fill: 'none', stroke: '#bfe6ff', 'stroke-width': 4, opacity: 0 }, M.g);
  const L = M.parana.getTotalLength();
  // largo de cauce (0..1) a la altura de un punto dado (el más cercano)
  M.kDe = ll => { const [x, y] = M.proj(ll); let best = 0, bd = 1e9; for (let i = 0; i <= 400; i++) { const p = M.parana.getPointAtLength(L * i / 400), d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = i / 400; } } return best; };
  M.onda = (k, t = 0, q = 1) => {
    brillo.setAttribute('opacity', .55 * q); brillo.style.strokeDasharray = `${clamp(k).toFixed(4)} 1`;
    const p = M.parana.getPointAtLength(L * clamp(k)); pulso.setAttribute('cx', p.x); pulso.setAttribute('cy', p.y); halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y);
    const f = (t * 1.2) % 1; pulso.setAttribute('opacity', k > 0 && k < 1 ? q : 0); halo.setAttribute('r', 16 + 40 * f); halo.setAttribute('opacity', k > 0 && k < 1 ? q * (1 - f) : 0);
  };
  M.punto = (ll, txt, o2 = {}) => {
    const [x, y] = M.proj(ll), m = marca(M.g, x, y, { col: o2.col }), an = o2.anchor || 'start';
    const r = rotulo(M.g, x + (an === 'end' ? -26 : 26), y + (o2.dy ?? 8), txt, { size: o2.size || 20, col: o2.col || '#ece8e1', anchor: an });
    return { m, r, x, y, ver(q, t = 0) { m.g.setAttribute('opacity', q); r.setAttribute('opacity', q); m.pulso(t); } };
  };
  M.texto = (ll, txt, o2 = {}) => { const [x, y] = M.proj(ll); return etiqueta(M.g, txt, x, y, { size: o2.size || 22, col: o2.col || '#5d6e7e', anchor: 'middle', ls: 6 }); };
  return M;
}

// escala hidrométrica (regla del puerto) de lo a hi metros, alto h px, con las líneas de alerta y evacuación; r.set(altura, t) mueve el agua
function regla(parent, x, y, h, o = {}) {
  const lo = o.lo ?? 3, hi = o.hi ?? 7, w = o.w || 120, g = el('g', { transform: `translate(${x} ${y})` }, parent), Y = v => h - (v - lo) / (hi - lo) * h;
  el('rect', { x: -8, y: -8, width: w + 16, height: h + 16, rx: 6, fill: '#0b1015', stroke: '#3a4652', 'stroke-width': 2 }, g);
  el('rect', { width: w, height: h, fill: '#ecebe6' }, g);
  for (let v = lo; v < hi - 1e-6; v += .1) {
    const dm = Math.round(v * 10) % 10, yy = Y(v + .1), hh = h / (hi - lo) / 10;
    if (dm % 2 === 0) el('rect', { x: dm % 10 === 0 ? 0 : w * .45, y: yy, width: w * (dm % 10 === 0 ? 1 : .55), height: hh, fill: Math.floor(v) % 2 ? '#c3332b' : '#1b2128' }, g);
  }
  for (let v = Math.ceil(lo); v <= hi; v++) etiqueta(g, String(v), -18, Y(v) + 12, { size: 34, w: 800, col: '#ecebe6', anchor: 'end', ls: 0 });
  const linea = (v, col, txt) => { const gg = el('g', {}, g); el('line', { x1: -10, x2: w + 30, y1: Y(v), y2: Y(v), stroke: col, 'stroke-width': 5, 'stroke-dasharray': '14 8' }, gg); etiqueta(gg, txt, w + 38, Y(v) + 9, { size: 24, w: 700, col }); return gg; };
  const r = { g, Y };
  r.alerta = linea(NIV.alerta, AMBAR, 'ALERTA 5,00'); r.evac = linea(NIV.evac, ROJO, 'EVACUACIÓN 5,30');
  r.alerta.setAttribute('transform', 'translate(0 18)'); r.evac.setAttribute('transform', 'translate(0 -12)');
  const agua = el('path', { fill: AGUA, opacity: .55 }, g), sup = el('path', { fill: 'none', stroke: '#bfe6ff', 'stroke-width': 4 }, g);
  r.set = (v, t = 0) => {
    const yy = Y(clamp(v, lo, hi)); let d = '', s = '';
    for (let xx = -60; xx <= w + 60; xx += 10) { const p = `${xx},${(yy + 5 * Math.sin(xx / 22 + t * 3)).toFixed(1)}`; d += (d ? ' L' : 'M') + p; s += (s ? ' L' : 'M') + p; }
    agua.setAttribute('d', `${d} L${w + 60},${h + 60} L-60,${h + 60} Z`); sup.setAttribute('d', s);
  };
  return r;
}

// lluvia en un rectángulo; devuelve update(t, q)
function lluvia(parent, caja, n = 160, seed = 7, col = '#9cc7e6') {
  const [x0, y0, x1, y1] = caja, r = rnd(seed), g = el('g', {}, parent), gs = [];
  for (let i = 0; i < n; i++) gs.push({ l: el('line', { stroke: col, 'stroke-width': 1.5 + r() * 1.5, 'stroke-linecap': 'round', opacity: .25 + r() * .5 }, g), x: x0 + r() * (x1 - x0), p: r(), v: .8 + r() * .8, L: 20 + r() * 30 });
  return (t, q = 1) => {
    g.setAttribute('opacity', q);
    for (const s of gs) { const y = y0 + (((s.p + t * s.v) % 1) * (y1 - y0)), x = s.x - (y - y0) * .12; s.l.setAttribute('x1', x.toFixed(1)); s.l.setAttribute('y1', y.toFixed(1)); s.l.setAttribute('x2', (x - s.L * .2).toFixed(1)); s.l.setAttribute('y2', (y + s.L).toFixed(1)); }
  };
}

// agua de río de costado con oleaje; devuelve update(t, ys) (ys = nivel en pantalla)
function rio(parent, o = {}) {
  const g = el('g', {}, parent), col = o.col || '#123a55';
  const cuerpo = el('path', { fill: col, opacity: o.op ?? .92 }, g), ola = el('path', { fill: 'none', stroke: '#7fc0ea', 'stroke-width': 3, 'stroke-opacity': .6 }, g);
  return (t, ys) => {
    let p = ''; for (let x = -60; x <= 1140; x += 20) p += (p ? ' L' : 'M') + x + ',' + (ys + 6 * Math.sin(x / 60 + t * 2)).toFixed(1);
    cuerpo.setAttribute('d', p + ' L1140,2200 L-60,2200 Z'); ola.setAttribute('d', p);
  };
}

// casa de isla sobre pilotes (palafito) con el poste de la entrada; base en y = 0 (el piso queda 150 px arriba)
function casaIsla(parent, o = {}) {
  const g = el('g', {}, parent), mad = o.madera || '#8a5a3a';
  for (const x of [-170, -60, 60, 170]) el('rect', { x: x - 9, y: -150, width: 18, height: 190, fill: '#5b3b26' }, g);
  el('rect', { x: -200, y: -170, width: 400, height: 22, fill: '#6b4630' }, g);
  el('rect', { x: -180, y: -330, width: 360, height: 162, fill: mad }, g);
  for (let i = 0; i < 9; i++) el('line', { x1: -180, x2: 180, y1: -312 + i * 18, y2: -312 + i * 18, stroke: '#000', 'stroke-opacity': .18, 'stroke-width': 2 }, g);
  el('path', { d: 'M-215,-325 L0,-440 L215,-325 Z', fill: '#9b3b2e' }, g);
  el('rect', { x: -120, y: -290, width: 70, height: 60, fill: '#ffd98a', opacity: o.luz ?? .8 }, g); el('rect', { x: 40, y: -300, width: 64, height: 130, fill: '#4a2f1f' }, g);
  const poste = el('g', { transform: 'translate(-260 0)' }, g);
  el('rect', { x: -12, y: -330, width: 24, height: 370, fill: '#6e4a31' }, poste);
  return { g, poste };
}

// lancha (de costado), unos 260 px de largo, línea de flotación en y = 0
function lancha(parent, o = {}) {
  const g = el('g', {}, parent);
  el('path', { d: 'M-130,-30 L120,-30 L140,-46 L130,0 Q120,18 100,18 L-120,18 Z', fill: o.casco || '#d9dde2' }, g);
  el('rect', { x: -130, y: -14, width: 250, height: 10, fill: o.franja || '#ff7a1a' }, g);
  el('path', { d: 'M-40,-30 L-30,-80 L50,-80 L70,-30 Z', fill: '#3a4450' }, g); el('path', { d: 'M-26,-72 L44,-72 L58,-40 L-34,-40 Z', fill: '#9fc3dc', opacity: .7 }, g);
  return g;
}

// buque granelero (de costado), unos 760 px de largo, línea de flotación en y = 0
function granelero(parent, o = {}) {
  const g = el('g', {}, parent);
  el('path', { d: 'M-380,-70 L360,-70 L392,-40 L370,30 L-360,30 L-384,0 Z', fill: o.casco || '#2b3138' }, g);
  el('path', { d: 'M-384,0 L370,0 L366,30 L-360,30 Z', fill: '#8a2a24' }, g);
  for (let i = 0; i < 6; i++) el('rect', { x: -250 + i * 95, y: -86, width: 76, height: 18, fill: '#55606c' }, g);
  el('rect', { x: -380, y: -190, width: 110, height: 120, fill: '#e3e1db' }, g); el('rect', { x: -364, y: -230, width: 80, height: 40, fill: '#e3e1db' }, g);
  for (let i = 0; i < 3; i++) el('rect', { x: -368 + i * 32, y: -170, width: 22, height: 14, fill: '#2b3440' }, g);
  for (let i = 0; i < 4; i++) { el('line', { x1: -200 + i * 140, y1: -86, x2: -200 + i * 140, y2: -190, stroke: '#c9a227', 'stroke-width': 7 }, g); el('line', { x1: -200 + i * 140, y1: -186, x2: -140 + i * 140, y2: -120, stroke: '#c9a227', 'stroke-width': 4 }, g); }
  return g;
}

// puente colgante (ilustración): dos torres, cables y tablero; p.caer(k) derrumba la torre derecha
function puenteColgante(parent) {
  const g = el('g', {}, parent), col = '#cfd5dc';
  const izq = el('g', {}, g), der = el('g', {}, g), tab = el('g', {}, g), tab2 = el('g', {}, g);
  const torre = (gg, x) => { el('rect', { x: x - 16, y: -260, width: 32, height: 330, fill: col }, gg); el('rect', { x: x - 34, y: -40, width: 68, height: 16, fill: col }, gg); };
  torre(izq, -230); torre(der, 230);
  el('path', { d: 'M-420,-10 Q-330,-40 -230,-250', fill: 'none', stroke: col, 'stroke-width': 5 }, izq);
  el('path', { d: 'M-230,-250 Q0,-40 230,-250', fill: 'none', stroke: col, 'stroke-width': 5 }, tab);
  for (let i = -8; i <= 8; i++) { const x = i * 26, yc = -250 + 210 * (1 - (x / 230) ** 2); el('line', { x1: x, x2: x, y1: yc, y2: 0, stroke: col, 'stroke-width': 2 }, tab); }
  el('rect', { x: -420, y: 0, width: 650, height: 16, fill: col }, tab);
  el('rect', { x: 230, y: 0, width: 190, height: 16, fill: col }, tab2); el('path', { d: 'M230,-250 Q330,-40 420,-10', fill: 'none', stroke: col, 'stroke-width': 5 }, der);
  return { g, caer(k) { const e = io(clamp(k)); der.setAttribute('transform', `rotate(${(28 * e).toFixed(2)} 230 70) translate(0 ${(120 * e * e).toFixed(1)})`);
    tab.setAttribute('transform', `rotate(${(14 * e).toFixed(2)} -230 0)`); tab2.setAttribute('transform', `translate(0 ${(160 * e * e).toFixed(1)}) rotate(${(20 * e).toFixed(2)} 230 0)`); } };
}

// polígono de la anomalía cálida del Pacífico ecuatorial (para el globo de la apertura); s = intensidad (0..1)
function anomaliaGeo(s = 1) {
  const top = [], bot = [];
  for (let lon = -185; lon <= -78; lon += 3) { const u = (lon + 185) / 107, a = (3 + 9 * Math.sin(Math.PI * Math.min(1, u * 1.15)) ** .8) * s + 1; top.push([lon, a]); bot.push([lon, -a * .9]); }
  let f = { type: 'Polygon', coordinates: [[...top, ...bot.reverse(), top[0]]] };
  if (d3.geoArea(f) > 2 * Math.PI) f = { type: 'Polygon', coordinates: [f.coordinates[0].slice().reverse()] };
  return f;
}

// personajes inventados de la historia
const ELSA = { ropa: '#4f6a8c', pelo: '#cfd2d6', barba: 0, piel: '#e2b394', halo: '#8fd0ff' }, BRUNO = { ropa: '#26313d', chaleco: true, casco: true, barba: .45, halo: '#ffc142' };
const filtroBlur = (svg, id, s = 14) => { const f = el('filter', { id, x: '-50%', y: '-50%', width: '200%', height: '200%' }, el('defs', {}, svg)); el('feGaussianBlur', { stdDeviation: s }, f); return `url(#${id})`; };
// ciudad sobre la barranca, río e isla de costado (esquema); devuelve {svg, agua(t, nivel), casa}
function corte(svg, o = {}) {
  const d = el('defs', {}, svg), lg = el('linearGradient', { id: svg.id + 'c', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': o.cielo || '#0b1626' }, lg); el('stop', { offset: 1, 'stop-color': '#1b2a3a' }, lg);
  el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: `url(#${svg.id}c)` }, svg);
  const r = rnd(4), ciudad = el('g', {}, svg);
  for (let i = 0; i < 9; i++) { const w = 40 + r() * 30, h = 90 + r() * 220, x = -20 + i * 50; el('rect', { x, y: 900 - h, width: w, height: h, fill: '#1f2a36', stroke: '#2c3a48' }, ciudad); for (let j = 0; j < h / 34 - 1; j++) if (r() > .4) el('rect', { x: x + 10, y: 900 - h + 14 + j * 34, width: 10, height: 12, fill: '#ffd98a', opacity: .55 }, ciudad); }
  el('path', { d: 'M-100,900 L440,900 Q470,905 480,960 L520,1120 L520,2000 L-100,2000 Z', fill: '#3b2f25' }, svg);
  el('path', { d: 'M-100,900 L440,900 Q470,905 480,960 L520,1120', fill: 'none', stroke: '#5a4836', 'stroke-width': 6 }, svg);
  const isla = el('path', { d: 'M760,1110 Q820,1080 1200,1084 L1200,2000 L760,2000 Z', fill: '#2c3a26' }, svg);
  const casa = casaIsla(el('g', { transform: `translate(${o.cx || 930} 1090) scale(${o.cs || .55})` }, svg), { luz: o.luz });
  const agua = rio(svg, { op: .9 });
  return { agua, casa, isla, ciudad };
}

// sello que cae con rebote sobre un elemento HTML (id); el texto va adentro del elemento
const sello = (id, t, a) => { const n = $(id), q = P(t, a - .05, a + .18); n.style.opacity = q; n.style.transform = `rotate(-8deg) scale(${lerp(2.2, 1, eo(q))})`; };
