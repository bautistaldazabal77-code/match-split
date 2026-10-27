// Mapas para los cortos (d3 + Natural Earth): el Atlántico Sur plano, un globo que gira y el mundo entero.
// Necesitan MAPDATA, que se carga en SETUP_MAPAS antes de armar las escenas (ver cargarMapas()).
let MAPDATA = null;
async function cargarMapas() {
  const land = topojson.feature(await (await fetch('../../comun/web/land-50m.json')).json(), 'land');
  const world = await (await fetch('../../comun/web/countries-50m.json')).json();
  MAPDATA = { land, world, countries: topojson.feature(world, world.objects.countries), borders: topojson.mesh(world, world.objects.countries, (a, b) => a !== b) };
}
const LUGAR = {
  ba: [-58.38, -34.6], mdp: [-57.55, -38.0], ushuaia: [-68.3, -54.8], stanley: [-57.85, -51.69], mpa: [-58.45, -51.82],
  dc: [-77.04, 38.9], londres: [-0.13, 51.51], bruselas: [4.35, 50.85], copenhague: [12.57, 55.68], mayport: [-81.4, 30.39], ascension: [-14.4, -7.95],
  belgrano: [-61.53, -55.4], tez: [-59.5, -51.75],
};
// costa atlántica argentina (aproximada) para calcular la franja de 200 millas
const COSTA = [[-56.7, -36.3], [-57.5, -38.0], [-59.0, -38.7], [-61.5, -39.0], [-62.1, -40.0], [-63.0, -41.1], [-64.9, -40.8], [-65.1, -41.9], [-63.6, -42.7], [-64.5, -43.3],
  [-65.3, -44.5], [-66.5, -45.0], [-67.5, -46.0], [-67.6, -46.8], [-66.0, -47.8], [-67.6, -49.0], [-68.3, -50.2], [-69.0, -51.6], [-68.4, -52.4], [-68.3, -53.2], [-67.0, -54.6], [-65.3, -54.9], [-63.8, -54.8]];
const MN200 = 200 * 1.852 / 111.2;                  // 200 millas náuticas en grados de arco
// borde exterior de la zona económica exclusiva: para cada latitud, el punto más al este a 200 millas de la costa
function bordeZEE() {
  const pts = [];
  for (let i = 0; i < COSTA.length - 1; i++) for (let k = 0; k < 6; k++) pts.push([lerp(COSTA[i][0], COSTA[i + 1][0], k / 6), lerp(COSTA[i][1], COSTA[i + 1][1], k / 6)]);
  const out = [];
  for (let la = -35.6; la >= -58.4; la -= .2) {
    let best = -Infinity;
    for (const [lo, l0] of pts) { const dl = la - l0; if (Math.abs(dl) < MN200) best = Math.max(best, lo + Math.sqrt(MN200 * MN200 - dl * dl) / Math.cos(la * Math.PI / 180)); }
    if (best > -Infinity) out.push([best, la]);
  }
  return out;
}
// mapa plano del Atlántico Sur; la cámara se mueve con camMapa()
function mapaSur(svg, o = {}) {
  const proj = d3.geoMercator().center(o.center || [-60, -45]).scale(o.scale || 2100).translate([540, 900]);
  const path = d3.geoPath(proj), id = svg.id;
  const d = el('defs', {}, svg);
  const rg = el('radialGradient', { id: id + 'mar' }, d);
  el('stop', { offset: 0, 'stop-color': '#0b1a28' }, rg); el('stop', { offset: 1, 'stop-color': '#050b12' }, rg);
  const root = el('g', {}, svg), M = { root, proj, path, svg };
  el('rect', { x: -4000, y: -4000, width: 9000, height: 9000, fill: `url(#${id}mar)` }, root);
  el('path', { d: path(d3.geoGraticule().step([5, 5])()), fill: 'none', stroke: '#8fb3cc', 'stroke-opacity': .07, 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  M.zee = el('g', { opacity: 0 }, root);
  const borde = bordeZEE(); M.borde = borde;
  el('path', { d: path({ type: 'Polygon', coordinates: [[...COSTA.map(p => [p[0] + .6, p[1]]), ...borde.slice().reverse(), COSTA[0]]] }), fill: '#2f6f9e', opacity: .22 }, M.zee);
  M.zeeLine = el('path', { d: path({ type: 'LineString', coordinates: borde }), fill: 'none', stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '10 8', 'vector-effect': 'non-scaling-stroke' }, M.zee);
  M.capa = el('g', {}, root);                       // capa debajo de la tierra (zonas, círculos)
  el('path', { d: path(MAPDATA.land), fill: '#161d26', stroke: '#33404e', 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  el('path', { d: path(MAPDATA.borders), fill: 'none', stroke: '#33404e', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke' }, root);
  const ar = MAPDATA.countries.features.find(f => f.id === '032'), mv = MAPDATA.countries.features.find(f => f.id === '238');
  M.ar = el('path', { d: path(ar), fill: '#1c2a3a', stroke: '#4a6a8a', 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  M.mv = el('path', { d: path(mv), fill: '#3a2f2f', stroke: '#c9a0a0', 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, root);
  M.top = el('g', {}, root);                        // capa de marcas encima de todo
  return M;
}
// cámara: (lon, lat) queda en (540, 900 + dy) con zoom z
function camMapa(M, lon, lat, z = 1, dy = 0) {
  const [x, y] = M.proj([lon, lat]); M.z = z;
  M.root.setAttribute('transform', `translate(540 ${900 + dy}) scale(${z}) translate(${-x} ${-y})`);
}
// marca con tamaño fijo en pantalla aunque el mapa haga zoom; devuelve {g, inner}
function marca(M, lonlat, html) {
  const [x, y] = M.proj(lonlat), g = el('g', { transform: `translate(${x} ${y})` }, M.top), inner = el('g', {}, g);
  return { g, inner, xy: [x, y] };
}
const fijo = (M, m, extra = '') => m.inner.setAttribute('transform', `scale(${1 / (M.z || 1)}) ${extra}`);
function etiqueta(parent, txt, x, y, o = {}) {
  const t = el('text', { x, y, fill: o.col || '#e9e6df', 'font-family': o.font || 'IBM Plex Mono', 'font-size': o.size || 26, 'font-weight': o.w || 500, 'letter-spacing': o.ls ?? 3, 'text-anchor': o.anchor || 'start' }, parent);
  t.textContent = txt; return t;
}
function circuloGeo(M, centro, radioGrados, attrs, parent) {
  return el('path', { d: M.path(d3.geoCircle().center(centro).radius(radioGrados)()), 'vector-effect': 'non-scaling-stroke', ...attrs }, parent || M.capa);
}

// ---------- Globo (proyección ortográfica que gira) ----------
function globo(svg, o = {}) {
  const r = o.r || 470, cx = o.cx || 540, cy = o.cy || 900, proj = d3.geoOrthographic().scale(r).translate([cx, cy]).clipAngle(90), path = d3.geoPath(proj);
  const d = el('defs', {}, svg), id = svg.id;
  const rg = el('radialGradient', { id: id + 'gl', cx: .38, cy: .32 }, d);
  el('stop', { offset: 0, 'stop-color': '#13283b' }, rg); el('stop', { offset: 1, 'stop-color': '#050b12' }, rg);
  const G = { proj, path, root: el('g', {}, svg) };
  el('circle', { cx, cy, r: r + 30, fill: '#2f6f9e', opacity: .08 }, G.root);
  G.sphere = el('path', { fill: `url(#${id}gl)`, stroke: '#2f4b66', 'stroke-width': 2 }, G.root);
  G.grat = el('path', { fill: 'none', stroke: '#8fb3cc', 'stroke-opacity': .1, 'stroke-width': 1 }, G.root);
  G.land = el('path', { fill: '#1a222c', stroke: '#33404e', 'stroke-width': 1 }, G.root);
  G.hi = {};                                        // países resaltados: id -> path
  for (const [cid, col] of Object.entries(o.paises || {})) G.hi[cid] = el('path', { fill: col, stroke: '#06080b', 'stroke-width': .8 }, G.root);
  G.top = el('g', {}, G.root);
  G.feat = id => MAPDATA.countries.features.find(f => f.id === id);
  G.update = (rot, scale) => {
    proj.rotate(rot); if (scale) proj.scale(scale);
    G.sphere.setAttribute('d', path({ type: 'Sphere' })); G.grat.setAttribute('d', path(d3.geoGraticule().step([15, 15])()));
    G.land.setAttribute('d', path(MAPDATA.land));
    for (const cid in G.hi) G.hi[cid].setAttribute('d', path(G.feat(cid)) || '');
  };
  // un punto del globo en pantalla (null si está del otro lado)
  G.xy = ll => { const c = proj.invert([cx, cy]); return d3.geoDistance(ll, c) < Math.PI / 2 - .02 ? proj(ll) : null; };
  return G;
}
// arco (círculo máximo) entre dos lugares, dibujado hasta la fracción k
function arcoGeo(path, a, b, k) {
  const it = d3.geoInterpolate(a, b), n = 60, pts = [];
  for (let i = 0; i <= n * k; i++) pts.push(it(i / n));
  return pts.length > 1 ? path({ type: 'LineString', coordinates: pts }) : '';
}
