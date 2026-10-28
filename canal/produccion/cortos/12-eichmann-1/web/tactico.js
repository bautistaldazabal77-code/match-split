// Mapas tácticos y dibujos para los reels de Eichmann (los cargan las tres partes).
// Datos: Natural Earth 10 m (dominio público, bsas.js) y un extracto de OpenStreetMap (© colaboradores de OSM, ODbL, garibaldi.js).

const TAC = { agua: '#060c12', tierra: '#10161d', urbano: '#18212b', calle: '#2c3744', avenida: '#4a5868', borde: '#3b4a5a', txt: '#9fb0c0', rojo: '#ff2a2a' };

// marco de "carta táctica": esquinas, rótulo, grilla con coordenadas, escala y norte
function marcoTac(svg, proj, o = {}) {
  const g = el('g', {}, svg), [x0, y0, x1, y1] = o.caja || [40, 330, 1040, 1150];
  const gr = el('g', { opacity: .5 }, g), paso = o.paso || .1;
  const [lo0, la1] = proj.invert([x0, y0]), [lo1, la0] = proj.invert([x1, y1]);
  const fmtG = (v, ns) => `${Math.floor(Math.abs(v))}°${String(Math.round((Math.abs(v) % 1) * 60)).padStart(2, '0')}'${v < 0 ? ns[0] : ns[1]}`;
  for (let lo = Math.ceil(lo0 / paso) * paso; lo < lo1; lo += paso) {
    const x = proj([lo, la0])[0]; el('line', { x1: x, y1: y0, x2: x, y2: y1, stroke: '#1d2833', 'stroke-width': 1.5, 'stroke-dasharray': '4 8' }, gr);
    const t = el('text', { x: x + 6, y: y0 + 22, fill: '#5d6e7e', 'font-family': 'IBM Plex Mono', 'font-size': 16 }, gr); t.textContent = fmtG(lo, 'OE');
  }
  for (let la = Math.ceil(la0 / paso) * paso; la < la1; la += paso) {
    const y = proj([lo0, la])[1]; el('line', { x1: x0, y1: y, x2: x1, y2: y, stroke: '#1d2833', 'stroke-width': 1.5, 'stroke-dasharray': '4 8' }, gr);
    const t = el('text', { x: x0 + 8, y: y - 6, fill: '#5d6e7e', 'font-family': 'IBM Plex Mono', 'font-size': 16 }, gr); t.textContent = fmtG(la, 'SN');
  }
  const L = 34; [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]].forEach(([x, y, sx, sy]) => el('path', { d: `M${x + sx * L},${y} L${x},${y} L${x},${y + sy * L}`, fill: 'none', stroke: '#8fa2b4', 'stroke-width': 3 }, g));
  // escala
  const km = o.km || 5, [ax] = proj([lo0, la0]), bx = proj([lo0 + km / (111.32 * Math.cos(la0 * Math.PI / 180)), la0])[0], w = Math.abs(bx - ax), sx = x0 + 24, sy = y1 - 30;
  el('rect', { x: sx, y: sy, width: w, height: 8, fill: '#ece8e1' }, g); el('rect', { x: sx + w / 2, y: sy, width: w / 2, height: 8, fill: '#3b4a5a' }, g);
  const tk = el('text', { x: sx, y: sy - 10, fill: '#ece8e1', 'font-family': 'IBM Plex Mono', 'font-size': 18 }, g); tk.textContent = km >= 1 ? `${km} KM` : `${km * 1000} M`;
  // norte
  const nx = x1 - 50, ny = y1 - 70; el('path', { d: `M${nx},${ny - 26} L${nx + 12},${ny + 10} L${nx},${ny + 2} L${nx - 12},${ny + 10} Z`, fill: '#ece8e1' }, g);
  const tn = el('text', { x: nx, y: ny + 34, fill: '#ece8e1', 'font-family': 'Oswald', 'font-size': 20, 'text-anchor': 'middle' }, g); tn.textContent = 'N';
  if (o.titulo) { const tt = el('text', { x: x1 - 12, y: y0 + 24, fill: '#8fa2b4', 'font-family': 'IBM Plex Mono', 'font-size': 17, 'text-anchor': 'end', 'letter-spacing': 2 }, g); tt.textContent = o.titulo; }
  if (o.fuente) { const tf = el('text', { x: x1 - 12, y: y1 - 10, fill: '#5d6e7e', 'font-family': 'IBM Plex Mono', 'font-size': 14, 'text-anchor': 'end' }, g); tf.textContent = o.fuente; }
  return g;
}

// Buenos Aires y el conurbano (Natural Earth 10 m). o = {centro: [lon, lat], ancho (grados), caja}
function mapaBsAs(svg, o = {}) {
  const caja = o.caja || [40, 330, 1040, 1150], [cx, cy] = o.centro || [-58.5, -34.6], a = o.ancho || .6, h = a * (caja[3] - caja[1]) / (caja[2] - caja[0]);
  const proj = d3.geoMercator().fitExtent([[caja[0], caja[1]], [caja[2], caja[3]]], { type: 'MultiPoint', coordinates: [[cx - a / 2, cy - h / 2], [cx + a / 2, cy + h / 2]] }), path = d3.geoPath(proj);
  const id = 'clp' + Math.random().toString(36).slice(2, 7), defs = el('defs', {}, svg), cp = el('clipPath', { id }, defs);
  el('rect', { x: caja[0], y: caja[1], width: caja[2] - caja[0], height: caja[3] - caja[1] }, cp);
  const base = el('g', { 'clip-path': `url(#${id})` }, svg), g = el('g', {}, base);
  el('rect', { x: -2000, y: -2000, width: 6000, height: 6000, fill: TAC.agua }, g);
  BSAS.land.features.forEach(f => el('path', { d: path(f), fill: TAC.tierra, stroke: TAC.borde, 'stroke-width': 2 }, g));
  BSAS.urban.features.forEach(f => el('path', { d: path(f), fill: TAC.urbano, stroke: '#202b37', 'stroke-width': 1 }, g));
  BSAS.roads.features.forEach(f => el('path', { d: path(f), fill: 'none', stroke: /Major|Highway/.test(f.properties.type || '') ? '#566576' : '#323e4b', 'stroke-width': /Major|Highway/.test(f.properties.type || '') ? 3 : 2 }, g));
  const marco = marcoTac(svg, proj, { caja, titulo: o.titulo, fuente: o.fuente ?? 'MAPA: NATURAL EARTH', km: o.km || 5, paso: o.paso || .1 });
  return { proj, path, g, base, marco, caja };
}

// zona de la calle Garibaldi (OpenStreetMap, mapa actual)
function mapaCalle(svg, o = {}) {
  const caja = o.caja || [40, 330, 1040, 1150], [cx, cy] = o.centro || [-58.5962, -34.4735], a = o.ancho || .012, h = a * (caja[3] - caja[1]) / (caja[2] - caja[0]);
  const proj = d3.geoMercator().fitExtent([[caja[0], caja[1]], [caja[2], caja[3]]], { type: 'MultiPoint', coordinates: [[cx - a / 2, cy - h / 2], [cx + a / 2, cy + h / 2]] }), path = d3.geoPath(proj);
  const id = 'clp' + Math.random().toString(36).slice(2, 7), defs = el('defs', {}, svg), cp = el('clipPath', { id }, defs);
  el('rect', { x: caja[0], y: caja[1], width: caja[2] - caja[0], height: caja[3] - caja[1] }, cp);
  const base = el('g', { 'clip-path': `url(#${id})` }, svg), g = el('g', {}, base);
  el('rect', { x: -2000, y: -2000, width: 6000, height: 6000, fill: '#0b1015' }, g);
  GARI.edif.features.forEach(f => el('path', { d: path(f), fill: '#151c24', stroke: '#1d2630', 'stroke-width': 1 }, g));
  const ancho = { primary: 16, secondary: 13, tertiary: 10, residential: 7, unclassified: 7, living_street: 6, trunk: 18, motorway: 18 };
  const calles = {};
  GARI.calles.features.forEach(f => { const p = el('path', { d: path(f), fill: 'none', stroke: ancho[f.properties.k] > 9 ? TAC.avenida : TAC.calle, 'stroke-width': ancho[f.properties.k] || 6, 'stroke-linecap': 'round' }, g); (calles[f.properties.n] = calles[f.properties.n] || []).push(p); });
  GARI.vias.features.forEach(f => { el('path', { d: path(f), fill: 'none', stroke: '#6b7a8a', 'stroke-width': 5 }, g); el('path', { d: path(f), fill: 'none', stroke: '#0b1015', 'stroke-width': 2.5, 'stroke-dasharray': '10 10' }, g); });
  const marco = marcoTac(svg, proj, { caja, titulo: o.titulo, fuente: o.fuente ?? 'MAPA ACTUAL: © OPENSTREETMAP', km: o.km || .2, paso: o.paso || .005 });
  return { proj, path, g, base, marco, calles, caja };
}

// texto de mapa con fondo
function rotulo(parent, x, y, txt, o = {}) {
  const g = el('g', { transform: `translate(${x} ${y})`, opacity: o.op ?? 0 }, parent), s = o.size || 22;
  const w = txt.length * s * .62 + 20, an = o.anchor || 'start', dx = an === 'end' ? -w : an === 'middle' ? -w / 2 : 0;
  el('rect', { x: dx, y: -s - 6, width: w, height: s + 14, fill: o.bg || 'rgba(5,5,5,.85)', stroke: o.col || '#ece8e1', 'stroke-width': 1.5 }, g);
  const t = el('text', { x: dx + 10, y: 0, fill: o.col || '#ece8e1', 'font-family': 'IBM Plex Mono', 'font-size': s, 'font-weight': 500 }, g); t.textContent = txt;
  return g;
}
// marcador táctico: rombo con halo que late
function marca(parent, x, y, o = {}) {
  const col = o.col || TAC.rojo, g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, parent);
  const halo = el('circle', { r: 14, fill: 'none', stroke: col, 'stroke-width': 3 }, g);
  el('path', { d: 'M0,-14 L14,0 L0,14 L-14,0 Z', fill: col, stroke: '#050505', 'stroke-width': 2 }, g);
  return { g, pulso(t) { const p = (t * .9) % 1; halo.setAttribute('r', 14 + p * 40); halo.setAttribute('opacity', 1 - p); } };
}
// línea animable entre puntos de pantalla (recta o curva) con flecha al final
function trazo(parent, pts, o = {}) {
  const d = o.curva ? `M${pts[0][0]},${pts[0][1]} Q${o.curva[0]},${o.curva[1]} ${pts[1][0]},${pts[1][1]}` : 'M' + pts.map(p => p.join(',')).join(' L');
  const p = el('path', { d, fill: 'none', stroke: o.col || TAC.rojo, 'stroke-width': o.w || 5, 'stroke-linecap': 'round', 'stroke-dasharray': '0 1', pathLength: 1 }, parent);
  const pt = o.punto ? el('circle', { r: o.punto, fill: o.col || TAC.rojo, opacity: 0 }, parent) : null, L = p.getTotalLength();
  return { p, draw(k) { p.style.strokeDasharray = `${k.toFixed(4)} 1`; if (pt) { const q = p.getPointAtLength(L * k); pt.setAttribute('cx', q.x); pt.setAttribute('cy', q.y); pt.setAttribute('opacity', k > 0 && k < 1 ? 1 : 0); } } };
}

// íconos simples (silueta blanca o del color pedido)
function icono(parent, tipo, x, y, s = 1, col = '#ece8e1') {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})`, opacity: 0 }, parent), f = { fill: col };
  if (tipo === 'colectivo') { el('rect', { x: -60, y: -34, width: 120, height: 58, rx: 10, ...f }, g); for (let i = 0; i < 4; i++) el('rect', { x: -50 + i * 26, y: -26, width: 20, height: 18, fill: '#0b1015' }, g); el('circle', { cx: -34, cy: 26, r: 10, fill: '#0b1015', stroke: col, 'stroke-width': 4 }, g); el('circle', { cx: 34, cy: 26, r: 10, fill: '#0b1015', stroke: col, 'stroke-width': 4 }, g); }
  if (tipo === 'auto') { el('path', { d: 'M-56,10 L-48,-10 L-28,-28 L26,-28 L44,-10 L58,-6 L58,14 L-56,14 Z', ...f }, g); el('path', { d: 'M-24,-22 L-8,-22 L-8,-10 L-38,-10 Z M0,-22 L22,-22 L36,-10 L0,-10 Z', fill: '#0b1015' }, g); el('circle', { cx: -32, cy: 16, r: 11, fill: '#0b1015', stroke: col, 'stroke-width': 4 }, g); el('circle', { cx: 34, cy: 16, r: 11, fill: '#0b1015', stroke: col, 'stroke-width': 4 }, g); }
  if (tipo === 'fabrica') { el('path', { d: 'M-60,30 L-60,-10 L-30,-30 L-30,-10 L0,-30 L0,-10 L30,-30 L30,-60 L46,-60 L46,30 Z', ...f }, g); }
  if (tipo === 'persona') { el('circle', { cx: 0, cy: -38, r: 14, ...f }, g); el('path', { d: 'M-20,30 L-20,-8 Q-20,-20 -8,-20 L8,-20 Q20,-20 20,-8 L20,30 Z', ...f }, g); }
  if (tipo === 'chico') { el('circle', { cx: 0, cy: -20, r: 10, ...f }, g); el('path', { d: 'M-13,26 L-13,0 Q-13,-8 -5,-8 L5,-8 Q13,-8 13,0 L13,26 Z', ...f }, g); }
  if (tipo === 'barco') { el('path', { d: 'M-70,0 L70,0 L52,26 L-58,26 Z', ...f }, g); el('rect', { x: -30, y: -24, width: 54, height: 24, ...f }, g); el('rect', { x: 2, y: -46, width: 14, height: 22, ...f }, g); }
  if (tipo === 'avion') { el('path', { d: 'M-60,0 Q-60,-8 -50,-8 L50,-8 Q66,-6 70,0 Q66,6 50,8 L-50,8 Q-60,8 -60,0 Z M-6,-6 L-26,-50 L-12,-50 L22,-6 Z M-6,6 L-26,50 L-12,50 L22,6 Z M-56,-4 L-66,-24 L-56,-24 L-44,-4 Z M-56,4 L-66,24 L-56,24 L-44,4 Z', ...f }, g); }
  if (tipo === 'tren') { el('rect', { x: -70, y: -22, width: 140, height: 40, rx: 4, ...f }, g); el('rect', { x: -60, y: -14, width: 22, height: 14, fill: '#0b1015' }, g); for (let i = 0; i < 3; i++) el('circle', { cx: -44 + i * 44, cy: 22, r: 8, fill: '#0b1015', stroke: col, 'stroke-width': 3 }, g); }
  if (tipo === 'carta') { el('rect', { x: -50, y: -32, width: 100, height: 64, ...f }, g); el('path', { d: 'M-50,-32 L0,6 L50,-32', fill: 'none', stroke: '#0b1015', 'stroke-width': 5 }, g); }
  return g;
}
const mostrar = (n, q, dy = 18) => { n.setAttribute('opacity', q); const tr = n.getAttribute('data-tr') || n.getAttribute('transform') || ''; if (!n.getAttribute('data-tr')) n.setAttribute('data-tr', tr); n.setAttribute('transform', `${tr} translate(0 ${(lerp(dy, 0, eo(q))).toFixed(1)})`); };
