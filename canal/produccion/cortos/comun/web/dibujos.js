// Dibujos vectoriales para los cortos: barcos y submarinos de perfil, íconos para mapas, aviones, banderas,
// edificios y la pantalla del sonar. Todo se dibuja en el origen (línea de flotación en y = 0) y se ubica con transform.

// ---------- Barcos de perfil ----------
// fragata moderna, de unos 640 px de eslora (proa a la derecha)
function fragata(parent, o = {}) {
  const g = el('g', {}, parent), gris = o.gris || '#56606c', osc = '#323a44';
  el('path', { d: 'M-318,-22 L296,-30 L336,-46 L322,-2 Q306,30 262,40 L-282,40 Q-306,30 -318,6 Z', fill: gris }, g);
  el('path', { d: 'M-318,6 Q-306,30 -282,40 L262,40 Q306,30 322,-2 L330,6 L-318,6 Z', fill: '#2b3139', opacity: .6 }, g);
  el('path', { d: 'M-312,8 L326,8', stroke: '#8b2f2a', 'stroke-width': 7 }, g);                     // línea de flotación
  el('rect', { x: -230, y: -72, width: 130, height: 50, fill: gris }, g);                             // hangar
  el('rect', { x: -96, y: -96, width: 110, height: 74, fill: gris }, g);                              // superestructura
  el('path', { d: 'M-70,-96 L-52,-140 L-8,-140 L-2,-96 Z', fill: osc }, g);                            // chimenea
  el('rect', { x: 20, y: -112, width: 120, height: 90, fill: gris }, g);                              // puente
  for (let i = 0; i < 6; i++) el('rect', { x: 30 + i * 18, y: -104, width: 12, height: 10, fill: o.luces ? '#ffd890' : '#1b222b' }, g);
  el('path', { d: 'M70,-112 L80,-210 L90,-112 M62,-170 L98,-170 M66,-140 L94,-140', stroke: osc, 'stroke-width': 6, fill: 'none' }, g);   // mástil
  el('rect', { x: 64, y: -226, width: 32, height: 16, rx: 3, fill: osc }, g);                          // radar
  el('rect', { x: 196, y: -48, width: 46, height: 22, rx: 6, fill: osc }, g); el('rect', { x: 236, y: -42, width: 60, height: 6, fill: osc }, g);   // cañón
  const n = el('text', { x: 268, y: 0, fill: '#d9dde2', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 26 }, g); n.textContent = o.num || '40';
  if (o.luces) for (const [x, y] of [[-300, -30], [320, -50], [80, -216]]) el('circle', { cx: x, cy: y, r: 4, fill: '#ffefc4' }, g);
  return g;
}
// crucero de la Segunda Guerra (perfil del General Belgrano), unos 760 px
function crucero(parent) {
  const g = el('g', {}, parent), gris = '#5a6068', osc = '#353a41';
  el('path', { d: 'M-380,-26 L330,-30 L392,-52 L374,-4 Q350,32 300,42 L-340,42 Q-372,30 -380,4 Z', fill: gris }, g);
  el('path', { d: 'M-374,8 L380,8', stroke: '#7a2d28', 'stroke-width': 7 }, g);
  const torre = (x, y, d) => { const t = el('g', { transform: `translate(${x} ${y})` }, g); el('rect', { x: -30, y: -22, width: 60, height: 24, rx: 6, fill: osc }, t); for (const dy of [-16, -10, -4]) el('rect', { x: d > 0 ? 24 : -90, y: dy, width: 66, height: 4, fill: osc }, t); };
  torre(230, -30, 1); torre(150, -46, 1); torre(-220, -30, -1); torre(-140, -46, -1);
  el('rect', { x: -90, y: -90, width: 190, height: 62, fill: gris }, g);
  el('rect', { x: 40, y: -150, width: 70, height: 62, fill: gris }, g);
  el('rect', { x: -40, y: -150, width: 34, height: 64, fill: osc }, g); el('rect', { x: 10, y: -146, width: 30, height: 58, fill: osc }, g);
  el('path', { d: 'M75,-150 L75,-250 M60,-200 L90,-200', stroke: osc, 'stroke-width': 6 }, g);
  return g;
}
// submarino nuclear (silueta tipo Astute / Churchill), unos 560 px, proa a la derecha
function submarino(parent, o = {}) {
  const g = el('g', {}, parent), c = o.col || '#1d232b';
  el('path', { d: 'M-280,0 C-250,-20 -200,-30 -150,-30 L200,-30 C250,-30 285,-18 290,0 C285,18 250,30 200,30 L-150,30 C-200,30 -250,20 -280,0 Z', fill: c }, g);
  el('path', { d: 'M90,-30 L98,-88 Q104,-96 130,-96 L176,-96 Q186,-96 186,-86 L180,-30 Z', fill: c }, g);           // vela
  el('path', { d: 'M-270,0 L-312,-40 L-300,0 L-312,40 Z', fill: c }, g);                                                // timones
  el('path', { d: 'M-150,-30 L200,-30', stroke: '#ffffff', 'stroke-opacity': .06, 'stroke-width': 4 }, g);
  if (o.borde) el('path', { d: 'M-280,0 C-250,-20 -200,-30 -150,-30 L200,-30 C250,-30 285,-18 290,0 C285,18 250,30 200,30 L-150,30 C-200,30 -250,20 -280,0 Z', fill: 'none', stroke: o.borde, 'stroke-width': 3 }, g);
  return g;
}
function torpedo(parent) {
  const g = el('g', {}, parent);
  el('path', { d: 'M-34,-6 L22,-6 Q36,-6 38,0 Q36,6 22,6 L-34,6 Z', fill: '#9aa3ad' }, g);
  el('path', { d: 'M-34,-6 L-44,-12 L-40,0 L-44,12 L-34,6 Z', fill: '#6d757e' }, g);
  return g;
}
// caza (silueta lateral tipo F-16), unos 300 px, mirando a la derecha
function caza(parent, col = '#9aa6b2') {
  const g = el('g', {}, parent);
  el('path', { d: 'M-150,4 L-120,-6 L60,-12 Q110,-14 150,0 Q110,8 60,8 L-120,10 Z', fill: col }, g);
  el('path', { d: 'M40,-12 Q70,-30 100,-12 Z', fill: '#2a3540' }, g);                       // cabina
  el('path', { d: 'M-130,-6 L-160,-62 L-126,-62 L-80,-8 Z', fill: col }, g);                 // deriva
  el('path', { d: 'M-40,4 L-110,40 L-60,40 L30,6 Z', fill: '#7e8a96' }, g);                  // ala
  el('path', { d: 'M20,8 L50,22 L80,8 Z', fill: '#6d7884' }, g);                             // toma de aire
  return g;
}
// ---------- Íconos vistos desde arriba (para mapas): apuntan a la derecha ----------
function iconoBarco(parent, col, s = 1) { const g = el('g', {}, parent); el('path', { d: `M${-14 * s},${-5 * s} L${8 * s},${-5 * s} L${16 * s},0 L${8 * s},${5 * s} L${-14 * s},${5 * s} Z`, fill: col, stroke: '#06080b', 'stroke-width': 1.5 }, g); return g; }
function iconoSub(parent, col, s = 1) { const g = el('g', {}, parent); el('rect', { x: -15 * s, y: -4 * s, width: 30 * s, height: 8 * s, rx: 4 * s, fill: col, stroke: '#06080b', 'stroke-width': 1.5 }, g); return g; }
function iconoAvion(parent, col, s = 1) { const g = el('g', {}, parent); el('path', { d: `M${14 * s},0 L${-6 * s},${-12 * s} L${-2 * s},0 L${-6 * s},${12 * s} Z M${-6 * s},0 L${-14 * s},${-5 * s} L${-12 * s},0 L${-14 * s},${5 * s} Z`, fill: col, stroke: '#06080b', 'stroke-width': 1.2 }, g); return g; }

// ---------- Banderas (w x h, esquina superior izquierda en el origen) ----------
function banderaAR(parent, w = 180) {
  const g = el('g', {}, parent), h = w * .62;
  el('rect', { width: w, height: h, fill: '#74acdf' }, g); el('rect', { y: h / 3, width: w, height: h / 3, fill: '#fff' }, g);
  el('circle', { cx: w / 2, cy: h / 2, r: h / 9, fill: '#f6b40e', stroke: '#85340a', 'stroke-width': w / 180 }, g);
  return g;
}
function banderaUK(parent, w = 180) {
  const g = el('g', {}, parent), h = w / 2;
  el('rect', { width: w, height: h, fill: '#012169' }, g);
  el('path', { d: `M0,0 L${w},${h} M${w},0 L0,${h}`, stroke: '#fff', 'stroke-width': h * .2 }, g);
  el('path', { d: `M0,0 L${w},${h} M${w},0 L0,${h}`, stroke: '#c8102e', 'stroke-width': h * .067 }, g);
  el('path', { d: `M${w / 2},0 V${h} M0,${h / 2} H${w}`, stroke: '#fff', 'stroke-width': h / 3 }, g);
  el('path', { d: `M${w / 2},0 V${h} M0,${h / 2} H${w}`, stroke: '#c8102e', 'stroke-width': h / 5 }, g);
  return g;
}
function banderaUS(parent, w = 180) {
  const g = el('g', {}, parent), h = w * .526;
  for (let i = 0; i < 13; i++) el('rect', { y: i * h / 13, width: w, height: h / 13 + .5, fill: i % 2 ? '#fff' : '#b22234' }, g);
  el('rect', { width: w * .4, height: h * 7 / 13, fill: '#3c3b6e' }, g);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) el('circle', { cx: w * .4 * (c + .5) / 6, cy: h * 7 / 13 * (r + .5) / 5, r: w / 140, fill: '#fff' }, g);
  return g;
}
// ---------- Edificios ----------
// Casa Rosada de noche (fachada simplificada), unos 900 px de ancho, base en y = 0
function casaRosada(parent, luz = 0) {
  const g = el('g', {}, parent), rosa = '#c98a86', sombra = '#9c6662';
  el('rect', { x: -450, y: -300, width: 900, height: 300, fill: rosa }, g);
  el('rect', { x: -110, y: -380, width: 220, height: 380, fill: rosa }, g);
  el('path', { d: 'M-130,-380 L0,-430 L130,-380 Z', fill: sombra }, g);
  el('rect', { x: -450, y: -310, width: 900, height: 14, fill: sombra }, g);
  el('path', { d: 'M-55,0 V-120 A55,55 0 0 1 55,-120 V0 Z', fill: '#2a1b1b' }, g);                // arco central
  const vent = [];
  for (const y of [-250, -150]) for (let x = -420; x <= 380; x += 70) {
    if (Math.abs(x + 20) < 120) continue;
    vent.push(el('path', { d: `M${x},${y + 70} V${y + 15} A20,20 0 0 1 ${x + 40},${y + 15} V${y + 70} Z`, fill: '#2a1b1b' }, g));
  }
  for (const x of [-80, -20, 40]) vent.push(el('path', { d: `M${x},-250 V-300 A20,20 0 0 1 ${x + 40},-300 V-250 Z`, fill: '#2a1b1b' }, g));
  el('path', { d: 'M0,-430 V-520', stroke: '#c9ced4', 'stroke-width': 5 }, g);
  const fl = el('g', { transform: 'translate(2 -518)' }, g); banderaAR(fl, 80);
  return { g, vent };
}
// Casa Blanca (fachada simplificada), unos 700 px
function casaBlanca(parent) {
  const g = el('g', {}, parent), b = '#e6e8ea', s = '#b9bec4';
  el('rect', { x: -350, y: -200, width: 700, height: 200, fill: b }, g);
  el('rect', { x: -120, y: -250, width: 240, height: 250, fill: b }, g);
  el('path', { d: 'M-140,-250 L0,-310 L140,-250 Z', fill: s }, g);
  for (let x = -100; x <= 100; x += 40) el('rect', { x: x - 6, y: -240, width: 12, height: 200, fill: s }, g);
  for (let x = -320; x <= 300; x += 60) if (Math.abs(x) > 140) for (const y of [-170, -90]) el('rect', { x, y, width: 26, height: 44, fill: '#2b3440' }, g);
  return g;
}
// ---------- Pantalla de sonar (HTML) ----------
function sonarHTML(id) {
  return `<div id="${id}" style="position:absolute;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,#06261a,#03140d 70%);border:4px solid #1f6b4a;box-shadow:0 0 80px rgba(60,220,140,.25) inset,0 30px 90px rgba(0,0,0,.6);overflow:hidden">
    ${[1, 2, 3].map(k => `<div style="position:absolute;left:${50 - k * 16.6}%;top:${50 - k * 16.6}%;width:${k * 33.2}%;height:${k * 33.2}%;border:2px solid rgba(80,230,150,.22);border-radius:50%"></div>`).join('')}
    <div style="position:absolute;left:50%;top:0;bottom:0;border-left:2px solid rgba(80,230,150,.15)"></div><div style="position:absolute;top:50%;left:0;right:0;border-top:2px solid rgba(80,230,150,.15)"></div>
    <div class="sw" style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(80,230,150,.55),rgba(80,230,150,0) 60deg,transparent 360deg)"></div>
    <div class="bl" style="position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#ff5148;box-shadow:0 0 24px #ff5148;opacity:0"></div>
    <div style="position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#7dffb8"></div></div>`;
}

// ---------- Mar de costado, burbujas, explosión en el agua y etiquetas ----------
// fondo de mar visto de costado: cielo de noche, superficie en ys, agua que se oscurece hacia abajo
function marCostado(svg, ys, o = {}) {
  const id = svg.id, d = el('defs', {}, svg);
  const lg = (n, st) => { const g = el('linearGradient', { id: id + n, x1: 0, y1: 0, x2: 0, y2: 1 }, d); for (const [of, c] of st) el('stop', { offset: of, 'stop-color': c }, g); };
  lg('cie', [[0, '#03060c'], [1, o.alba ? '#3a2a3a' : '#121c2c']]); lg('agua', [[0, '#0e3147'], [.35, '#08202f'], [1, '#02070b']]);
  const rg = el('radialGradient', { id: id + 'luna' }, d); el('stop', { offset: 0, 'stop-color': '#dfe8f0', 'stop-opacity': .5 }, rg); el('stop', { offset: 1, 'stop-color': '#dfe8f0', 'stop-opacity': 0 }, rg);
  el('rect', { x: -500, y: -500, width: 2100, height: ys + 500, fill: `url(#${id}cie)` }, svg);
  el('circle', { cx: 820, cy: ys - 260, r: 140, fill: `url(#${id}luna)` }, svg); el('circle', { cx: 820, cy: ys - 260, r: 26, fill: '#e8eef4', opacity: .85 }, svg);
  el('rect', { x: -500, y: ys, width: 2100, height: 2600, fill: `url(#${id}agua)` }, svg);
  const rayos = el('g', { opacity: .035 }, svg);
  for (let i = 0; i < 6; i++) el('path', { d: `M${700 + i * 40},${ys} L${300 + i * 140},${ys + 1400} L${360 + i * 140},${ys + 1400} L${720 + i * 40},${ys} Z`, fill: '#bfe3ff' }, rayos);
  const ola = el('path', { fill: 'none', stroke: '#9cc7e6', 'stroke-opacity': .35, 'stroke-width': 3 }, svg);
  const motas = []; const r = rnd(o.seed || 3);
  for (let i = 0; i < 60; i++) motas.push({ c: el('circle', { r: 1 + r() * 2.2, fill: '#bfe3ff', opacity: .15 + r() * .25 }, svg), x: r() * 1080, y: ys + 40 + r() * 1400, v: 6 + r() * 14 });
  return t => {
    let p = ''; for (let x = -40; x <= 1120; x += 20) p += (p ? ' L' : 'M') + x + ',' + (ys + 5 * Math.sin(x / 70 + t * 2.2)).toFixed(1);
    ola.setAttribute('d', p);
    for (const m of motas) { m.c.setAttribute('cx', (m.x + Math.sin(t * .5 + m.y) * 10).toFixed(1)); m.c.setAttribute('cy', (((m.y - t * m.v) % 1400 + 1400) % 1400 + ys + 40).toFixed(1)); }
  };
}
// estela de burbujas detrás de un objeto que se mueve por una trayectoria f(u) -> [x, y]
function burbujas(parent, n = 40, seed = 5) {
  const r = rnd(seed), b = [];
  for (let i = 0; i < n; i++) b.push({ c: el('circle', { r: 2 + r() * 5, fill: 'none', stroke: '#cfeaff', 'stroke-width': 2, opacity: 0 }, parent), d: r(), j: (r() - .5) * 18 });
  return (f, u, vida = .35) => b.forEach((q, i) => {
    const uu = u - q.d * vida; if (uu < 0) { q.c.setAttribute('opacity', 0); return; }
    const [x, y] = f(uu); const age = (u - uu) / vida;
    q.c.setAttribute('cx', (x + q.j).toFixed(1)); q.c.setAttribute('cy', (y - age * 40 + q.j * .5).toFixed(1)); q.c.setAttribute('opacity', (.8 * (1 - age)).toFixed(3));
  });
}
function explosionAgua(parent) {      // flash + columna de agua; se anima con k (0..1)
  const g = el('g', { opacity: 0 }, parent), gid = 'ex' + Math.random().toString(36).slice(2, 6), dd = el('defs', {}, g);
  const rg = el('radialGradient', { id: gid }, dd); el('stop', { offset: 0, 'stop-color': '#fffbe8' }, rg); el('stop', { offset: .4, 'stop-color': '#ffd27a', 'stop-opacity': .7 }, rg); el('stop', { offset: 1, 'stop-color': '#ff8a2a', 'stop-opacity': 0 }, rg);
  const fl = el('circle', { r: 10, fill: `url(#${gid})` }, g);
  const col = el('g', {}, g), puffs = [];
  for (let i = 0; i < 14; i++) puffs.push({ c: el('ellipse', { fill: i % 3 ? '#dcecf8' : '#f4f9ff' }, col), f: i / 13, j: (i * 37 % 11 - 5) * 6 });
  const spray = []; const r = rnd(9);
  for (let i = 0; i < 26; i++) spray.push({ c: el('circle', { r: 3 + r() * 7, fill: '#e8f4ff' }, g), a: -Math.PI / 2 + (r() - .5) * 1.4, v: 300 + r() * 500 });
  return k => {
    g.setAttribute('opacity', k > 0 && k < 1 ? 1 : 0);
    fl.setAttribute('r', 20 + 260 * eo(clamp(k * 4))); fl.setAttribute('opacity', (1 - clamp(k * 3)).toFixed(3));
    const h = 420 * Math.sin(Math.PI * clamp(k * 1.2)), w = 60 + 140 * k;
    for (const p of puffs) { p.c.setAttribute('cx', p.j * (1 + k)); p.c.setAttribute('cy', -h * p.f); p.c.setAttribute('rx', (w * (1 - p.f * .6) * .6 + 20).toFixed(1)); p.c.setAttribute('ry', (30 + 40 * k).toFixed(1)); }
    col.setAttribute('opacity', (.92 * (1 - clamp(k * 1.3 - .3))).toFixed(3));
    for (const s of spray) { const tt = k * 1.6; s.c.setAttribute('cx', (Math.cos(s.a) * s.v * tt).toFixed(1)); s.c.setAttribute('cy', (Math.sin(s.a) * s.v * tt + 600 * tt * tt).toFixed(1)); s.c.setAttribute('opacity', (1 - clamp(k * 1.4)).toFixed(3)); }
  };
}
const pill = (id, txt, top, col = '#c3332b', extra = '') => `<div id="${id}" class="pill" style="position:absolute;left:64px;top:${top}px;background:${col};color:#fff;font-size:30px;opacity:0;${extra}">${txt}</div>`;
const aparece = (id, t, a, d = .3) => { const n = $(id), q = P(t, a - .05, a + d); n.style.opacity = q; n.style.transform = `scale(${lerp(.8, 1, back(q))})`; n.style.transformOrigin = '0 50%'; return q; };

