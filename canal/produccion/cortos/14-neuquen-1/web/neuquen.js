// Dibujos y mapas compartidos por las dos partes de "¿Y si…? La antena china de Neuquén".
// Mapas: Natural Earth 10 m (dominio público, patagonia.js) y los de comun/web/mapas.js.
const NQ = { estacion: [-70.15, -38.19], neuquen: [-68.06, -38.95], zapala: [-70.07, -38.9], chos: [-70.27, -37.38], malargue: [-69.4, -35.78], malargueC: [-69.59, -35.47], pekin: [116.4, 39.9] };
const ROJO = '#ff5148', CELESTE = '#8fd0ff', AMBAR = '#ffc142', VERDE = '#5ee093';

// noche en la meseta: cielo, estrellas y lomas; devuelve una función que hace titilar las estrellas
function desierto(svg, o = {}) {
  const d = el('defs', {}, svg), id = svg.id + 'cielo', lg = el('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, d), H = o.hor || 1250;
  el('stop', { offset: 0, 'stop-color': '#03050b' }, lg); el('stop', { offset: .7, 'stop-color': '#0b1424' }, lg); el('stop', { offset: 1, 'stop-color': '#1d2333' }, lg);
  el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: `url(#${id})` }, svg);
  const r = rnd(o.seed || 7), est = [];
  for (let i = 0; i < 170; i++) est.push({ c: el('circle', { cx: r() * 1080, cy: r() * H, r: .6 + r() * 1.8, fill: '#fff' }, svg), f: .5 + r() * 2, p: r() * 6 });
  el('path', { d: `M-50,${H} C150,${H - 60} 300,${H - 40} 460,${H - 70} C640,${H - 100} 820,${H - 50} 1130,${H - 80} L1130,2100 L-50,2100 Z`, fill: '#121722' }, svg);
  el('path', { d: `M-50,${H + 70} C200,${H + 30} 420,${H + 60} 640,${H + 40} C820,${H + 25} 960,${H + 60} 1130,${H + 50} L1130,2100 L-50,2100 Z`, fill: '#0b0f16' }, svg);
  return t => est.forEach(s => s.c.setAttribute('opacity', (.35 + .65 * Math.abs(Math.sin(t * s.f + s.p))).toFixed(2)));
}

// carta táctica de Neuquén y alrededores, con provincias; M.punto(lonlat, texto) agrega un marcador con rótulo
function cartaNeuquen(svg, o = {}) {
  const M = mapaZona(svg, PATA, { centro: o.centro || [-69.4, -37.4], ancho: o.ancho || 7.5, titulo: o.titulo || 'NEUQUÉN · ARGENTINA', km: o.km || 100, paso: o.paso || 1, caja: o.caja });
  PATA.lagos.features.forEach(f => el('path', { d: M.path(f), fill: TAC.agua, stroke: '#1d2833' }, M.g));
  M.prov = {};
  for (const f of PATA.prov.features) {
    const n = f.properties.name, p = el('path', { d: M.path(f), fill: 'none', stroke: f.properties.adm0_a3 === 'ARG' ? '#3b4a5a' : '#262e37', 'stroke-width': 1.5, 'stroke-dasharray': '3 6' }, M.g);
    (M.prov[n] = M.prov[n] || []).push(p);
  }
  M.resaltar = (n, col = ROJO, q = 1) => (M.prov[n] || []).forEach(p => { p.setAttribute('fill', col); p.setAttribute('fill-opacity', (.16 * q).toFixed(3)); p.setAttribute('stroke', col); p.setAttribute('stroke-opacity', q); p.setAttribute('stroke-dasharray', ''); p.setAttribute('stroke-width', 3); });
  M.punto = (ll, txt, o2 = {}) => {
    const [x, y] = M.proj(ll), m = marca(M.g, x, y, { col: o2.col }), an = o2.anchor || 'start';
    const r = rotulo(M.g, x + (an === 'end' ? -26 : 26), y + (o2.dy ?? 8), txt, { size: o2.size || 20, col: o2.col || '#ece8e1', anchor: an });
    return { m, r, x, y, ver(q, t = 0) { m.g.setAttribute('opacity', q); r.setAttribute('opacity', q); m.pulso(t); } };
  };
  M.texto = (ll, txt, o2 = {}) => { const [x, y] = M.proj(ll); const t = etiqueta(M.g, txt, x, y, { size: o2.size || 22, col: o2.col || '#5d6e7e', anchor: 'middle', ls: 6 }); return t; };
  return M;
}

// anillo de porcentaje; devuelve update(k) que lo llena hasta frac
function dona(svg, cx, cy, r, w, frac, colA, colB) {
  el('circle', { cx, cy, r, fill: 'none', stroke: colB, 'stroke-width': w }, svg);
  const C = 2 * Math.PI * r, fg = el('circle', { cx, cy, r, fill: 'none', stroke: colA, 'stroke-width': w, 'stroke-dasharray': `0 ${C}`, transform: `rotate(-90 ${cx} ${cy})` }, svg);
  return k => fg.setAttribute('stroke-dasharray', `${(C * frac * k).toFixed(1)} ${C}`);
}

// sello que cae con rebote sobre un elemento HTML (id); el texto va adentro del elemento
const sello = (id, t, a) => { const n = $(id), q = P(t, a - .05, a + .18); n.style.opacity = q; n.style.transform = `rotate(-8deg) scale(${lerp(2.2, 1, eo(q))})`; };

// archivo (ícono de documento) en SVG, unos 70 x 90 px, centrado en el origen
function archivo(parent, col = '#e9e6df') {
  const g = el('g', {}, parent);
  el('path', { d: 'M-35,-45 L15,-45 L35,-25 L35,45 L-35,45 Z', fill: col }, g); el('path', { d: 'M15,-45 L15,-25 L35,-25 Z', fill: '#000', opacity: .25 }, g);
  for (let i = 0; i < 5; i++) el('rect', { x: -24, y: -18 + i * 12, width: i === 4 ? 30 : 48, height: 5, fill: '#5d6672' }, g);
  return g;
}
