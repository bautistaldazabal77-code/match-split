// Mapas y dibujos compartidos por las dos partes de "¿Y si…? La Antártida en 2048".
// Mapa: Natural Earth (comun/web/land-50m.json y countries-50m.json, dominio público). Los sectores siguen los decretos de cada país (al sur de 60° S).
const ANT = { orcadas: [-44.74, -60.74], esperanza: [-56.99, -63.4], marambio: [-56.63, -64.24], carlini: [-58.67, -62.24], sanmartin: [-67.1, -68.13], belgrano: [-34.63, -77.87],
  ushuaia: [-68.3, -54.8], parenas: [-70.9, -53.15], weddell: [-45, -71.5], polo: [0, -90] };
const SECTOR = { AR: [-74, -25], CL: [-90, -53], UK: [-80, -20] };
const COL = { AR: '#74acdf', CL: '#e0433a', UK: '#3a5fb0' };
const ROJO = '#ff5148', CELESTE = '#8fd0ff', AMBAR = '#ffc142', VERDE = '#5ee093';

// polígono de un sector antártico: entre dos meridianos, desde 60° S hasta el polo
function sectorGeo(l0, l1) {
  const ring = []; for (let l = l0; l <= l1 + 1e-6; l += 1) ring.push([l, -60]);
  ring.push([l1, -89.9], [l0, -89.9], [l0, -60]);
  let f = { type: 'Polygon', coordinates: [ring] };
  if (d3.geoArea(f) > 2 * Math.PI) f = { type: 'Polygon', coordinates: [ring.slice().reverse()] };
  return f;
}
// mapa polar (polo sur al centro, la península antártica hacia arriba); M.cam(lon, lat, zoom) mueve la cámara
function mapaPolo(svg, o = {}) {
  const cy = o.cy || 900, proj = d3.geoAzimuthalEqualArea().rotate([0, 90, o.giro ?? -60]).scale(o.scale || 1450).translate([540, cy]).clipAngle(o.clip || 50), path = d3.geoPath(proj);
  const d = el('defs', {}, svg), id = svg.id, rg = el('radialGradient', { id: id + 'oc' }, d);
  el('stop', { offset: 0, 'stop-color': '#0d2236' }, rg); el('stop', { offset: 1, 'stop-color': '#050b12' }, rg);
  const root = el('g', {}, svg), M = { root, proj, path, svg, z: 1 };
  el('path', { d: path({ type: 'Sphere' }), fill: `url(#${id}oc)`, stroke: '#2f4b66', 'stroke-width': 2 }, root);
  el('path', { d: path(d3.geoGraticule().step([15, 5])()), fill: 'none', stroke: '#8fb3cc', 'stroke-opacity': .08, 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  M.sec = el('g', {}, root);
  el('path', { d: path(MAPDATA.land), fill: '#1a222c', stroke: '#33404e', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke' }, root);
  const an = MAPDATA.countries.features.find(f => f.id === '010');
  M.hielo = el('path', { d: path(an), fill: '#c9d6e2', stroke: '#eef4f8', 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  el('path', { d: path(d3.geoGraticule().extent([[-180, -60.01], [180, -59.99]]).step([360, 1])()), fill: 'none', stroke: '#ffc142', 'stroke-opacity': .35, 'stroke-width': 2, 'stroke-dasharray': '6 8', 'vector-effect': 'non-scaling-stroke' }, root);
  M.top = el('g', {}, root);
  M.cam = (lon, lat, z = 1, dy = 0) => { const [x, y] = proj([lon, lat]); M.z = z; root.setAttribute('transform', `translate(540 ${cy + dy}) scale(${z}) translate(${-x} ${-y})`); };
  M.sector = (k, attrs = {}) => el('path', { d: path(sectorGeo(...SECTOR[k])), fill: COL[k], 'fill-opacity': .35, stroke: COL[k], 'stroke-width': 3, 'vector-effect': 'non-scaling-stroke', opacity: 0, ...attrs }, M.sec);
  // marcador de base con tamaño fijo en pantalla (llamar a b.fijo() después de mover la cámara)
  M.base = (ll, txt, o2 = {}) => {
    const [x, y] = proj(ll), g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, M.top), inner = el('g', {}, g), col = o2.col || '#ffde00';
    const ring = el('circle', { r: 10, fill: 'none', stroke: col, 'stroke-width': 3 }, inner); el('circle', { r: 8, fill: col, stroke: '#050b12', 'stroke-width': 2 }, inner);
    const an2 = o2.anchor || 'start', tx = etiqueta(inner, txt, an2 === 'end' ? -20 : 20, o2.dy ?? 8, { size: o2.size || 24, w: 600, col, anchor: an2 });
    return { g, ver(q, t = 0) { g.setAttribute('opacity', q); inner.setAttribute('transform', `scale(${1 / M.z})`); const p = (t * .9) % 1; ring.setAttribute('r', 10 + 28 * p); ring.setAttribute('opacity', 1 - p); } };
  };
  return M;
}
function banderaRU(parent, w = 180) {
  const g = el('g', {}, parent), h = w * 2 / 3;
  [['#fff', 0], ['#0039a6', 1], ['#d52b1e', 2]].forEach(([c, i]) => el('rect', { y: i * h / 3, width: w, height: h / 3 + .5, fill: c }, g));
  return g;
}
// buque de investigación (de costado), unos 420 px de largo, línea de flotación en y = 0
function buqueSismico(parent, o = {}) {
  const g = el('g', {}, parent), casco = o.casco || '#3a4450';
  el('path', { d: 'M-210,-36 L170,-36 L215,-12 L190,22 L-200,22 L-214,0 Z', fill: casco }, g);
  el('rect', { x: -40, y: -96, width: 170, height: 60, fill: '#d9d5cc' }, g); el('rect', { x: 10, y: -140, width: 90, height: 46, fill: '#d9d5cc' }, g);
  for (let i = 0; i < 4; i++) el('rect', { x: -28 + i * 38, y: -82, width: 22, height: 14, fill: '#2b3440' }, g);
  el('path', { d: 'M-190,-36 L-190,-110 L-120,-36', fill: 'none', stroke: '#c9ced4', 'stroke-width': 6 }, g);
  el('path', { d: 'M60,-140 L60,-190 M40,-172 L80,-172', stroke: '#c9ced4', 'stroke-width': 5 }, g);
  return g;
}
// pantalla de radar circular: barrido que gira; devuelve update(t)
function radar(svg, cx, cy, r, col = '#5ee093') {
  const g = el('g', {}, svg);
  for (let i = 1; i <= 4; i++) el('circle', { cx, cy, r: r * i / 4, fill: 'none', stroke: col, 'stroke-opacity': .25, 'stroke-width': 2 }, g);
  el('path', { d: `M${cx - r},${cy} L${cx + r},${cy} M${cx},${cy - r} L${cx},${cy + r}`, stroke: col, 'stroke-opacity': .2, 'stroke-width': 2 }, g);
  const ba = el('path', { fill: col, opacity: .22 }, g), li = el('line', { x1: cx, y1: cy, stroke: col, 'stroke-width': 3 }, g);
  return t => {
    const a = (t * 1.6) % (2 * Math.PI), a0 = a - .6;
    ba.setAttribute('d', `M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 0 1 ${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} Z`);
    li.setAttribute('x2', cx + r * Math.cos(a)); li.setAttribute('y2', cy + r * Math.sin(a)); return a;
  };
}
// sello que cae con rebote sobre un elemento HTML (id)
const sello = (id, t, a) => { const n = $(id), q = P(t, a - .05, a + .18); n.style.opacity = q; n.style.transform = `rotate(-8deg) scale(${lerp(2.2, 1, eo(q))})`; };
// copos de nieve que caen; devuelve update(t)
function nieve(svg, n = 120, seed = 3) {
  const r = rnd(seed), cs = [];
  for (let i = 0; i < n; i++) cs.push({ c: el('circle', { r: 1 + r() * 3, fill: '#fff', opacity: .3 + r() * .6 }, svg), x: r() * 1080, v: 40 + r() * 90, p: r() * 1920, w: r() * 6 });
  return t => cs.forEach(s => { s.c.setAttribute('cx', (s.x + 30 * Math.sin(t * .8 + s.w)).toFixed(1)); s.c.setAttribute('cy', ((s.p + t * s.v) % 1960 - 20).toFixed(1)); });
}
// archivo (ícono de documento), unos 70 x 90 px, centrado en el origen
function archivoA(parent, col = '#e9e6df') {
  const g = el('g', {}, parent);
  el('path', { d: 'M-35,-45 L15,-45 L35,-25 L35,45 L-35,45 Z', fill: col }, g); el('path', { d: 'M15,-45 L15,-25 L35,-25 Z', fill: '#000', opacity: .25 }, g);
  for (let i = 0; i < 5; i++) el('rect', { x: -24, y: -18 + i * 12, width: i === 4 ? 30 : 48, height: 5, fill: '#5d6672' }, g);
  return g;
}
