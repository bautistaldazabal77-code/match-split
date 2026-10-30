// Dibujos compartidos por las dos partes de "Si una tormenta te atrapa en el Aconcagua" (historia de ficción). Todo es ilustración.
const NOCHE = { cielo0: '#050a16', cielo1: '#132341', nieve: '#e6eef7', roca: '#1b2536', roca2: '#26334a', calido: '#ffb35c', calido2: '#ff7a2f', madera: '#5a3a26', madera2: '#3f2819', rojo: '#ff4a3d', verde: '#5ee093', ambar: '#ffc142' };

// montaña de noche: cielo con estrellas, macizo del Aconcagua y cordones de adelante; devuelve {g, estrellas(t)}
function montana(svg, o = {}) {
  const id = svg.id, d = el('defs', {}, svg), lg = el('linearGradient', { id: id + 'cie', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': NOCHE.cielo0 }, lg); el('stop', { offset: 1, 'stop-color': NOCHE.cielo1 }, lg);
  const g = el('g', {}, svg); el('rect', { x: -200, y: -200, width: 1480, height: 2400, fill: `url(#${id}cie)` }, g);
  const r = rnd(o.seed || 11), est = [];
  for (let i = 0; i < 90; i++) est.push({ c: el('circle', { cx: r() * 1080, cy: r() * 900, r: .6 + r() * 1.8, fill: '#fff' }, g), f: r() * 6, v: .5 + r() });
  el('circle', { cx: 820, cy: 300, r: 70, fill: '#dfe8f5', opacity: .9 }, g); el('circle', { cx: 820, cy: 300, r: 160, fill: '#dfe8f5', opacity: .06 }, g);
  const yb = o.base || 1250;
  // macizo principal (cumbre doble, como el Aconcagua visto desde el norte)
  el('path', { d: `M-100,${yb} L120,${yb - 380} L300,${yb - 560} L430,${yb - 760} L520,${yb - 830} L585,${yb - 790} L640,${yb - 850} L760,${yb - 640} L900,${yb - 470} L1180,${yb - 200} L1180,${yb + 900} L-100,${yb + 900} Z`, fill: NOCHE.roca2 }, g);
  el('path', { d: `M430,${yb - 760} L520,${yb - 830} L585,${yb - 790} L640,${yb - 850} L760,${yb - 640} L700,${yb - 650} L660,${yb - 700} L610,${yb - 660} L560,${yb - 720} L500,${yb - 690} L470,${yb - 720} Z`, fill: NOCHE.nieve, opacity: .92 }, g);
  el('path', { d: `M300,${yb - 560} L430,${yb - 760} L470,${yb - 720} L420,${yb - 640} L360,${yb - 600} Z M760,${yb - 640} L900,${yb - 470} L840,${yb - 500} L780,${yb - 580} Z`, fill: NOCHE.nieve, opacity: .55 }, g);
  el('path', { d: `M-100,${yb + 60} L200,${yb - 180} L380,${yb - 60} L560,${yb - 260} L760,${yb - 90} L1180,${yb - 260} L1180,${yb + 900} L-100,${yb + 900} Z`, fill: NOCHE.roca }, g);
  el('path', { d: `M-100,${yb + 220} C200,${yb + 120} 500,${yb + 180} 1180,${yb + 80} L1180,${yb + 900} L-100,${yb + 900} Z`, fill: '#cfdbe8' }, g);
  return { g, estrellas(t, q = 1) { est.forEach(s => s.c.setAttribute('opacity', (q * (.35 + .5 * Math.abs(Math.sin(t * s.v + s.f)))).toFixed(2))); } };
}

// viento blanco: nieve que cruza en diagonal; devuelve update(t, fuerza 0..1)
function viento(svg, n = 220, seed = 5) {
  const r = rnd(seed), g = el('g', {}, svg), cs = [];
  for (let i = 0; i < n; i++) cs.push({ l: el('line', { stroke: '#fff', 'stroke-linecap': 'round', 'stroke-width': .8 + r() * 2.6, opacity: .25 + r() * .6 }, g), x: r() * 1400, y: r() * 2000, v: .6 + r() * .9, L: 10 + r() * 40 });
  const velo = el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: '#cfe0f0', opacity: 0 }, g);
  return (t, f = 1) => {
    g.setAttribute('opacity', Math.min(1, .2 + f));
    for (const c of cs) { const x = ((c.x - t * 900 * c.v * (.4 + f)) % 1400 + 1400) % 1400 - 160, y = (c.y + t * 260 * c.v) % 2000 - 40, L = c.L * (.5 + f * 1.4);
      c.l.setAttribute('x1', x.toFixed(1)); c.l.setAttribute('y1', y.toFixed(1)); c.l.setAttribute('x2', (x + L).toFixed(1)); c.l.setAttribute('y2', (y - L * .25).toFixed(1)); }
    velo.setAttribute('opacity', (.05 + .12 * f * (.7 + .3 * Math.sin(t * 2.3))).toFixed(3));
  };
}

// refugio de madera (por fuera), unos 420 px de ancho, base en y = 0; devuelve {g, ventana(q)}
function refugioExt(parent) {
  const g = el('g', {}, parent);
  el('ellipse', { cx: 0, cy: 6, rx: 260, ry: 26, fill: '#000', opacity: .35 }, g);
  el('path', { d: 'M-200,0 L-200,-150 L0,-290 L200,-150 L200,0 Z', fill: NOCHE.madera }, g);
  for (let i = 0; i < 6; i++) el('line', { x1: -200, x2: 200, y1: -20 - i * 24, y2: -20 - i * 24, stroke: '#000', 'stroke-opacity': .22, 'stroke-width': 3 }, g);
  el('path', { d: 'M-230,-140 L0,-310 L230,-140 L210,-128 L0,-280 L-210,-128 Z', fill: NOCHE.nieve }, g);
  el('rect', { x: 40, y: -120, width: 90, height: 120, fill: NOCHE.madera2 }, g);
  const ven = el('rect', { x: -130, y: -125, width: 90, height: 70, fill: NOCHE.calido }, g);
  el('path', { d: 'M-85,-125 L-85,-55 M-130,-90 L-40,-90', stroke: NOCHE.madera2, 'stroke-width': 6 }, g);
  const halo = el('circle', { cx: -85, cy: -90, r: 120, fill: NOCHE.calido, opacity: .15 }, g);
  el('rect', { x: -60, y: -230, width: 150, height: 14, fill: '#f2f2f2' }, g); etiqueta(g, 'BERLÍN', 15, -218, { size: 13, w: 700, col: '#20242c', anchor: 'middle', ls: 2 });
  return { g, ventana(q) { ven.setAttribute('opacity', q); halo.setAttribute('opacity', .15 * q); } };
}

// interior del refugio: paredes de madera, ventana con tormenta, puerta, calentador, radio y las bolsas de dormir
// devuelve {llama(t, q), pantalla(estado: 'on'|'off', t), puerta(golpe 0..1, t), lucas(dormido 0..1), ventana(t)}
function interior(svg, o = {}) {
  const g = el('g', {}, svg), W = 1080;
  el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: '#24170f' }, g);
  for (let i = 0; i < 24; i++) el('rect', { x: -40, y: 160 + i * 52, width: 1200, height: 48, fill: i % 2 ? '#3a2618' : '#34210f' }, g);
  el('rect', { x: -100, y: 1350, width: 1300, height: 800, fill: '#2a1b10' }, g);
  for (let i = 0; i < 8; i++) el('line', { x1: -100, x2: 1200, y1: 1360 + i * 70, y2: 1360 + i * 70, stroke: '#000', 'stroke-opacity': .25, 'stroke-width': 3 }, g);
  // ventana con tormenta
  const vg = el('g', { transform: 'translate(120 420)' }, g);
  el('rect', { x: -14, y: -14, width: 288, height: 248, fill: '#1a0f08' }, vg);
  const vc = el('g', {}, vg); el('rect', { width: 260, height: 220, fill: '#0b1426' }, vc);
  const cp = el('clipPath', { id: svg.id + 'vcl' }, el('defs', {}, svg)); el('rect', { width: 260, height: 220 }, cp); vc.setAttribute('clip-path', `url(#${svg.id}vcl)`);
  const vientoV = viento(vc, 50, 8);
  el('path', { d: 'M130,0 L130,220 M0,110 L260,110', stroke: '#1a0f08', 'stroke-width': 10 }, vg);
  // puerta
  const pg = el('g', { transform: 'translate(760 640)' }, g);
  el('rect', { x: -16, y: -16, width: 272, height: 742, fill: '#1a0f08' }, pg);
  const hoja = el('g', {}, pg); el('rect', { width: 240, height: 710, fill: '#4c3020' }, hoja);
  for (let i = 0; i < 5; i++) el('rect', { x: 0, y: 10 + i * 140, width: 240, height: 120, fill: 'none', stroke: '#2e1c10', 'stroke-width': 5 }, hoja);
  el('rect', { x: 0, y: 330, width: 240, height: 26, fill: '#2e1c10' }, hoja); el('circle', { cx: 205, cy: 380, r: 12, fill: '#c9a14a' }, hoja);
  const rendija = el('rect', { x: 0, y: 704, width: 240, height: 8, fill: '#9fc6ef', opacity: .5 }, pg);
  // estante con la radio
  el('rect', { x: 80, y: 820, width: 380, height: 18, fill: '#1a0f08' }, g);
  const rg = el('g', { transform: 'translate(150 690)' }, g);
  el('rect', { width: 240, height: 130, rx: 12, fill: '#2b2f36' }, rg); el('rect', { x: 8, y: 8, width: 224, height: 114, rx: 8, fill: '#3a3f48' }, rg);
  const scr = el('rect', { x: 22, y: 24, width: 120, height: 52, rx: 4, fill: '#0b0f0d' }, rg);
  const ondas = el('path', { fill: 'none', stroke: NOCHE.verde, 'stroke-width': 3 }, rg);
  const bat = el('g', { transform: 'translate(160 30)' }, rg); el('rect', { width: 50, height: 24, rx: 3, fill: 'none', stroke: '#9aa3ad', 'stroke-width': 3 }, bat); el('rect', { x: 50, y: 7, width: 5, height: 10, fill: '#9aa3ad' }, bat);
  const batNivel = el('rect', { x: 4, y: 4, width: 42, height: 16, fill: NOCHE.verde }, bat);
  for (let i = 0; i < 6; i++) el('circle', { cx: 34 + i * 18, cy: 100, r: 5, fill: '#20242a' }, rg);
  el('path', { d: 'M220,0 L248,-150', stroke: '#9aa3ad', 'stroke-width': 5 }, rg);
  // calentador (estufa de montaña) en el piso
  const cg = el('g', { transform: 'translate(560 1350)' }, g);
  const rgr = el('radialGradient', { id: svg.id + 'res' }, el('defs', {}, svg)); el('stop', { offset: 0, 'stop-color': NOCHE.calido, 'stop-opacity': 1 }, rgr); el('stop', { offset: 1, 'stop-color': NOCHE.calido, 'stop-opacity': 0 }, rgr);
  const resplandor = el('circle', { cx: 0, cy: -60, r: 520, fill: `url(#${svg.id}res)`, opacity: .14 }, cg);
  el('rect', { x: -60, y: -40, width: 120, height: 40, rx: 6, fill: '#585e66' }, cg); el('rect', { x: -40, y: -60, width: 80, height: 22, rx: 4, fill: '#3a3f46' }, cg);
  const llama = el('path', { fill: NOCHE.calido2 }, cg), llama2 = el('path', { fill: '#ffe08a' }, cg);
  // bolsas de dormir
  const b1 = el('g', { transform: 'translate(170 1540)' }, g); el('path', { d: 'M0,0 C40,-60 330,-60 360,-10 C360,40 330,60 300,60 L20,60 C-10,60 -20,30 0,0 Z', fill: '#c0392b' }, b1);
  const lucas = el('g', { transform: 'translate(250 1650)' }, g); el('path', { d: 'M0,0 C40,-70 400,-70 440,-10 C440,50 400,70 370,70 L30,70 C-10,70 -25,35 0,0 Z', fill: '#2c6fb0' }, lucas);
  const cab = el('g', {}, lucas); el('circle', { cx: 40, cy: -10, r: 38, fill: '#e2b394' }, cab); el('path', { d: 'M4,-14 C4,-60 76,-62 78,-14 C60,-36 24,-36 4,-14 Z', fill: '#6b4b2c' }, cab);
  // sombra general (oscuridad cuando baja la llama)
  const oscuro = el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: '#000', opacity: 0 }, g);
  return {
    g, hoja, rendija,
    ventana(t, f = 1) { vientoV(t, f); },
    llama(t, q = 1) {
      const h = (60 + 40 * Math.sin(t * 11) * .3 + 18 * Math.sin(t * 23)) * q, w = 26 * (.6 + .4 * q);
      llama.setAttribute('d', `M${-w},-60 C${-w},${-60 - h * .5} -6,${-60 - h * .7} 0,${-60 - h} C6,${-60 - h * .7} ${w},${-60 - h * .5} ${w},-60 Z`);
      llama2.setAttribute('d', `M${-w * .45},-60 C${-w * .45},${-60 - h * .3} -3,${-60 - h * .45} 0,${-60 - h * .6} C3,${-60 - h * .45} ${w * .45},${-60 - h * .3} ${w * .45},-60 Z`);
      resplandor.setAttribute('opacity', (.12 + .3 * q * (.85 + .15 * Math.sin(t * 9))).toFixed(3)); oscuro.setAttribute('opacity', (.55 * (1 - q)).toFixed(3));
    },
    pantalla(estado, t = 0) {
      const on = estado === 'on'; scr.setAttribute('fill', on ? '#0e2a1a' : '#050605'); batNivel.setAttribute('width', on ? 42 : 0); batNivel.setAttribute('fill', on ? NOCHE.verde : NOCHE.rojo);
      let p = ''; if (on) for (let x = 0; x <= 110; x += 5) p += (p ? ' L' : 'M') + (27 + x) + ',' + (50 + 16 * Math.sin(x * .3 + t * 14) * Math.sin(t * 3 + x * .05)).toFixed(1);
      ondas.setAttribute('d', p);
    },
    puerta(golpe = 0, t = 0) { const s = golpe * 6 * Math.sin(t * 60); hoja.setAttribute('transform', `translate(${s.toFixed(1)} 0)`); rendija.setAttribute('opacity', (.5 + .4 * golpe).toFixed(2)); },
    lucas(dormido = 1) { cab.setAttribute('transform', `translate(0 ${(8 * dormido).toFixed(1)})`); },
  };
}

// tarjeta de regla (HTML)
const reglaHTML = (id, n, titulo, sub, top) => `<div id="${id}" class="regla" style="top:${top}px;opacity:0"><span>REGLA #${n}</span><b>${titulo}</b><small>${sub}</small></div>`;
