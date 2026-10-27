// Escenas del corto "Si una guerra nuclear te agarra en el subte de Buenos Aires" (parte 1).
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

// ---------- Subtítulos, serie, aviso y reloj ----------
captions([
  ['h1', 'nuclear', 'r'], ['h1', 'mejores', 'g'], ['h1', 'sobrevivir', 'g'], ['h2', 'no', 'r'], ['h2', 'haces', 'r'],
  ['c1', 'Tomás', 'a'], ['c1', 'veintiocho', 'a'], ['c1', 'primera', 'a'], ['c1', 'novecientos', 'a'], ['c1', 'trece', 'a'], ['c1', 'mil', 'a'],
  ['c2', 'ocho', 'a'], ['c2', 'doce', 'a'], ['c2', 'pico', 'a'], ['c3', 'suenan', 'r'],
  ['c5', 'Perú', 'a'], ['c5', 'correr', 'r'], ['c5', 'escaleras', 'r'],
  ['c6', 'contrario', 'g'], ['c6', 'Baja', 'g'],
  ['c7', 'destello', 'a'], ['c7', 'primero', 'a'], ['c7', 'onda', 'r'], ['c7', 'expansiva', 'r'],
  ['c8', 'vidrio', 'r'], ['c8', 'lluvia', 'r'], ['c9', 'ventaja', 'g'], ['c9', 'enorme', 'g'],
  ['c10', 'escudo', 'g'], ['c10', 'nueve', 'a'], ['c10', 'centímetros', 'a'], ['c10', 'mitad', 'a'],
  ['c11', 'metro', 'a'], ['c11', 'mil', 'g'], ['c11', 'menos', 'g'],
  ['c12', 'Kiev', 'a'], ['c12', 'ciento', 'a'], ['c12', 'cinco', 'a'], ['c12', 'pocos', 'r'],
  ['c13', 'muralla', 'g'], ['c13', 'encima', 'r'], ['c13', 'bomba', 'r'],
  ['c14', 'plan', 'g'], ['c15', 'Lejos', 'g'], ['c15', 'bocas', 'r'], ['c16', 'medio', 'g'], ['c16', 'Agua', 'g'],
  ['c16', 'veinticuatro', 'a'], ['c16', 'horas', 'a'], ['c17', 'resuelto', 'g'],
  ['c18', 'veinte', 'r'], ['c18', 'hermana', 'r'],
], { max: 3, chars: 15 });
CAPS_OFF(S('c4') - .4, E('c4') + .3);          // el texto de la alerta ya está en el celular
CAPS_OFF(S('c19') - .2, E('outro'));            // el mensaje de la hermana se lee en la pantalla
hud({
  serie: 'SI TE AGARRA… · PARTE 1', aviso: 'ESCENARIO HIPOTÉTICO · RECREACIÓN', dia: 'MAR', hide: S('outro') + .2,
  horas: [[S('c3') - .1, '08:12'], [AT('c5', 'El tren'), '08:14'], [AT('c18', 'ocho y veinte'), '08:20', true]],
});

// ---------- El corte de la ciudad y el subte (se usa en varias escenas) ----------
// Lienzo de 1080 x 2600: cielo y edificios arriba, la calle en Y0 y la estación debajo.
const Y0 = 1580, ROOF = 1668, PLAT = 1790, BOXB = 1834;
const BOCA = [880, 992];                       // abertura de la boca del subte en la vereda
const ESC = [[992, Y0 + 18], [720, PLAT]];      // la escalera: de la vereda al andén
function defsCorte(svg) {
  const id = svg.id, d = el('defs', {}, svg);
  const lg = (n, stops, x2 = 0, y2 = 1) => { const g = el('linearGradient', { id: id + n, x1: 0, y1: 0, x2, y2 }, d); for (const [o, c, a = 1] of stops) el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, g); };
  const rg = (n, stops, cx = .5, cy = .5) => { const g = el('radialGradient', { id: id + n, cx, cy, r: .5 }, d); for (const [o, c, a = 1] of stops) el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, g); };
  lg('sky', [[0, '#03060c'], [.55, '#0a111e'], [1, '#1f2a3d']]);
  lg('tierra', [[0, '#3a2c20'], [.18, '#2a1f17'], [1, '#0c0806']]);
  lg('stem', [[0, '#7a3a22'], [.6, '#c86a2e'], [1, '#ffd58a']]);
  rg('fl', [[0, '#fffdf0'], [.18, '#ffe7a8', .95], [.45, '#ff9a3c', .45], [1, '#ff5a1a', 0]]);
  rg('cap', [[0, '#fff1c0'], [.35, '#ffad4a'], [.7, '#a9532a'], [1, '#3b2722']], .5, .72);
  rg('core', [[0, '#fffbe6'], [.5, '#ffc766', .8], [1, '#ff8a2a', 0]]);
  rg('ok', [[0, '#4fc483', .55], [1, '#4fc483', 0]]);
  rg('mal', [[0, '#e0433a', .6], [1, '#e0433a', 0]]);
  rg('luz', [[0, '#fff1c9', .5], [1, '#fff1c9', 0]]);
  const f = el('filter', { id: id + 'puff', x: '-30%', y: '-30%', width: '160%', height: '160%' }, d);
  el('feTurbulence', { type: 'fractalNoise', baseFrequency: .018, numOctaves: 3, seed: 4, result: 'n' }, f);
  el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: 70, xChannelSelector: 'R', yChannelSelector: 'G' }, f);
  const b = el('filter', { id: id + 'blur', x: '-50%', y: '-50%', width: '200%', height: '200%' }, d);
  el('feGaussianBlur', { stdDeviation: 6 }, b);
}
function hongo(parent, x, y, id) {
  const g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, parent);
  const inner = el('g', {}, g);
  el('path', { d: 'M-46,10 C-34,-120 -30,-260 -60,-380 L60,-380 C30,-260 34,-120 46,10 Z', fill: `url(#${id}stem)`, filter: `url(#${id}puff)` }, inner);
  const cap = el('g', { filter: `url(#${id}puff)` }, inner);
  for (const [cx, cy, rx, ry] of [[0, -430, 230, 115], [-140, -405, 120, 78], [140, -405, 120, 78], [0, -510, 160, 95], [-80, -480, 120, 80], [85, -485, 120, 80], [0, -380, 130, 50]])
    el('ellipse', { cx, cy, rx, ry, fill: `url(#${id}cap)` }, cap);
  el('ellipse', { cx: 0, cy: 6, rx: 260, ry: 34, fill: `url(#${id}cap)`, filter: `url(#${id}puff)`, opacity: .8 }, inner);
  const core = el('ellipse', { cx: 0, cy: -415, rx: 190, ry: 85, fill: `url(#${id}core)` }, inner);
  return { g, inner, core };
}
// o: {seed, fx (dónde explota), gente: cuántas personas en el andén}
function corte(svg, o = {}) {
  const r = rnd(o.seed || 7), id = svg.id;
  defsCorte(svg);
  const root = el('g', {}, svg), R = { root, ventanas: [], gente: [], edif: [] };
  el('rect', { x: -400, y: -600, width: 1880, height: Y0 + 600, fill: `url(#${id}sky)` }, root);
  for (let i = 0; i < 90; i++) el('circle', { cx: r() * 1080, cy: r() * 1150, r: .7 + r() * 1.4, fill: '#d7deea', opacity: .12 + r() * .45 }, root);
  const FX = o.fx ?? 770, FY = 1360;
  R.halo = el('circle', { cx: FX, cy: FY, r: 760, fill: `url(#${id}fl)`, opacity: 0 }, root);
  R.hongo = hongo(root, FX, FY, id);
  // edificios lejanos y cercanos (con un hueco: la avenida 9 de Julio, donde está el Obelisco)
  const far = el('g', {}, root);
  for (let x = -60; x < 1140;) { const w = 40 + r() * 70, h = 120 + r() * 280; el('rect', { x, y: Y0 - h, width: w + 1, height: h, fill: '#111a28' }, far); x += w + r() * 4; }
  R.near = el('g', {}, root);
  for (let x = -40; x < 1140;) {
    const w = 64 + r() * 110, h = 80 + r() * 330;
    if (x + w > 250 && x < 420) { x = 420; continue; }
    const b = el('g', {}, R.near); R.edif.push({ g: b, x: x + w / 2 });
    el('rect', { x, y: Y0 - h, width: w, height: h, fill: '#0a0f17' }, b);
    for (let wy = Y0 - h + 16; wy < Y0 - 30; wy += 24) for (let wx = x + 10; wx < x + w - 14; wx += 17) {
      if (r() < .3) R.ventanas.push(el('rect', { x: wx, y: wy, width: 8, height: 11, fill: '#ffb85c', opacity: (.3 + r() * .6).toFixed(2) }, b));
    }
    x += w + 2 + r() * 6;
  }
  // el Obelisco, iluminado
  el('ellipse', { cx: 335, cy: Y0 - 20, rx: 110, ry: 60, fill: `url(#${id}luz)` }, root);
  el('path', { d: `M318,${Y0} L352,${Y0} L343,${Y0 - 325} L335,${Y0 - 350} L327,${Y0 - 325} Z`, fill: '#d9d2c3' }, root);
  el('path', { d: `M335,${Y0} L352,${Y0} L343,${Y0 - 325} L335,${Y0 - 350} Z`, fill: '#a9a294' }, root);
  el('rect', { x: 332, y: Y0 - 318, width: 5, height: 8, fill: '#3a3a3a' }, root);
  // calle, faroles y la boca del subte
  el('rect', { x: -400, y: Y0 - 4, width: 1880, height: 26, fill: '#1b1f27' }, root);
  for (let x = 20; x < 1080; x += 70) el('rect', { x, y: Y0 + 6, width: 34, height: 3, fill: '#5a5f66', opacity: .6 }, root);
  for (const x of [120, 560, 760]) {
    el('rect', { x, y: Y0 - 120, width: 4, height: 116, fill: '#2a2f37' }, root);
    el('rect', { x: x - 14, y: Y0 - 124, width: 22, height: 5, rx: 2, fill: '#ffe2a0' }, root);
    el('ellipse', { cx: x - 3, cy: Y0 - 40, rx: 60, ry: 90, fill: `url(#${id}luz)`, opacity: .5 }, root);
  }
  el('rect', { x: BOCA[0] - 6, y: Y0 - 34, width: 6, height: 34, fill: '#8d939b' }, root);
  el('rect', { x: BOCA[0] - 6, y: Y0 - 36, width: BOCA[1] - BOCA[0] + 12, height: 5, fill: '#8d939b' }, root);
  el('rect', { x: BOCA[1], y: Y0 - 34, width: 6, height: 34, fill: '#8d939b' }, root);
  el('rect', { x: BOCA[0] - 40, y: Y0 - 120, width: 5, height: 120, fill: '#3a3f47' }, root);
  el('rect', { x: BOCA[0] - 70, y: Y0 - 160, width: 66, height: 44, rx: 6, fill: '#0f4f8a' }, root);
  el('circle', { cx: BOCA[0] - 37, cy: Y0 - 138, r: 15, fill: '#4cc3f0' }, root);
  const sA = el('text', { x: BOCA[0] - 37, y: Y0 - 131, 'text-anchor': 'middle', fill: '#fff', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 20 }, root); sA.textContent = 'A';
  // tierra
  el('rect', { x: -400, y: Y0 + 22, width: 1880, height: 1200, fill: `url(#${id}tierra)` }, root);
  for (let k = 0; k < 9; k++) {
    let p = `M-20,${Y0 + 70 + k * 105}`; for (let x = 0; x <= 1100; x += 110) p += ` Q${x + 55},${Y0 + 70 + k * 105 + (r() - .5) * 26} ${x + 110},${Y0 + 70 + k * 105 + (r() - .5) * 10}`;
    el('path', { d: p, stroke: '#e8c9a0', 'stroke-opacity': .05, 'stroke-width': 3, fill: 'none' }, root);
  }
  for (let i = 0; i < 260; i++) el('ellipse', { cx: r() * 1080, cy: Y0 + 30 + r() * 1000, rx: 2 + r() * 7, ry: 1.5 + r() * 4, fill: r() < .5 ? '#47372a' : '#1a130e', opacity: .7 }, root);
  // la estación: caja de hormigón a pocos metros de la calle
  R.caja = el('rect', { x: 30, y: ROOF, width: 1020, height: BOXB - ROOF + 18, fill: '#4b5058' }, root);
  el('rect', { x: 46, y: ROOF + 14, width: 988, height: BOXB - ROOF - 14, fill: '#141a22' }, root);
  el('rect', { x: 46, y: ROOF + 14, width: 988, height: 60, fill: '#fff1c9', opacity: .05 }, root);
  for (let x = 90; x < 1020; x += 96) {
    el('rect', { x, y: ROOF + 16, width: 40, height: 5, fill: '#fff4d6' }, root);
    el('ellipse', { cx: x + 20, cy: ROOF + 50, rx: 60, ry: 40, fill: `url(#${id}luz)`, opacity: .55 }, root);
  }
  for (let y = ROOF + 34; y < PLAT - 6; y += 14) el('rect', { x: 46, y, width: 988, height: 1, fill: '#ffffff', opacity: .035 }, root);
  // el tren (detrás de la gente)
  R.tren = el('g', {}, root);
  for (let c = 0; c < 2; c++) {
    const x0 = 56 + c * 320;
    el('rect', { x: x0, y: PLAT - 92, width: 312, height: 90, rx: 10, fill: '#c8cdd3' }, R.tren);
    el('rect', { x: x0, y: PLAT - 40, width: 312, height: 7, fill: '#3fb6e8' }, R.tren);
    for (let k = 0; k < 4; k++) el('rect', { x: x0 + 16 + k * 76, y: PLAT - 80, width: 52, height: 30, rx: 4, fill: '#1c2530' }, R.tren);
    for (const dx of [62, 214]) el('rect', { x: x0 + dx, y: PLAT - 86, width: 36, height: 84, rx: 3, fill: 'none', stroke: '#8a9098', 'stroke-width': 2 }, R.tren);
  }
  el('rect', { x: 46, y: PLAT, width: 988, height: 12, fill: '#6b7078' }, root);
  el('rect', { x: 46, y: PLAT, width: 988, height: 3, fill: '#e6c34a' }, root);
  el('rect', { x: 46, y: PLAT + 12, width: 988, height: BOXB - PLAT - 12, fill: '#0b0f15' }, root);
  // la escalera, de la vereda al andén
  const [[ex0, ey0], [ex1, ey1]] = ESC, sl = (ey1 - ey0) / (ex0 - ex1);
  const cx = BOCA[0] - (ROOF + 14 - Y0 - 18) / sl;
  el('path', { d: `M${BOCA[0]},${Y0 + 18} L${ex0},${ey0} L${ex1},${ey1} L640,${PLAT} L640,${ROOF + 14} L${cx},${ROOF + 14} Z`, fill: '#141a22' }, root);
  let st = `M${ex0},${ey0}`; const n = 10;
  for (let i = 0; i < n; i++) { const x = lerp(ex0, ex1, (i + 1) / n), y = lerp(ey0, ey1, (i + 1) / n); st += ` L${x + (ex0 - ex1) / n},${y} L${x},${y}`; }
  el('path', { d: st + ` L${ex1},${ey1 + 16} L${ex0},${ey0 + 16} Z`, fill: '#5d636b' }, root);
  el('path', { d: `M${BOCA[0]},${Y0 + 18} L${cx},${ROOF + 14}`, stroke: '#4b5058', 'stroke-width': 12 }, root);
  // gente en el andén; Tomás con casco y chaleco
  R.gl = el('g', {}, root);
  const xs = o.xs || [92, 128, 170, 205, 250, 292, 335, 430, 470, 512, 548, 590, 626, 664, 700];
  for (const x of xs) { const p = persona(R.gl, x, PLAT, 1.25 + r() * .15, { col: '#59626e' }); R.gente.push({ g: p, x, d: r() }); }
  R.tomas = persona(R.gl, o.tx || 384, PLAT, 1.35, { casco: true });
  R.fx = [FX, FY];
  R.top = el('g', {}, svg);                       // capa para marcas encima de todo
  return R;
}
// cámara del corte: punto del lienzo que queda en (540, 900) del cuadro, y zoom
const camCorte = (R, x, y, s = 1, dx = 0, dy = 0) => R.root.setAttribute('transform', `translate(${540 + dx} ${900 + dy}) scale(${s}) translate(${-x} ${-y})`);
// destello: halo, hongo que crece y se enfría
function explota(R, t, t0) {
  const k = P(t, t0, t0 + .25), fade = P(t, t0 + .4, t0 + 3);
  R.halo.setAttribute('opacity', (k * lerp(1, .55, fade)).toFixed(3));
  R.halo.setAttribute('r', lerp(300, 820, eo(P(t, t0, t0 + 2.5))));
  const h = R.hongo, g = P(t, t0 + .1, t0 + 7);
  h.g.setAttribute('opacity', (P(t, t0 + .1, t0 + .6)).toFixed(3));
  h.inner.setAttribute('transform', `scale(${lerp(.2, 1.05, eo(g)).toFixed(3)} ${lerp(.12, 1.05, eo(g)).toFixed(3)})`);
  h.core.setAttribute('opacity', lerp(1, .35, P(t, t0 + .5, t0 + 6)).toFixed(3));
}

// ---------- 1 · Gancho: el destello sobre Buenos Aires y el subte debajo ----------
{
  const t0 = .12, PAN = [AT('h1', 'estás') - .1, AT('h1', 'estás') + 1.6];
  const s = scene('sGancho', [-1, AT('c1', 'Este') - .05, .01, .25, 0], `<svg class="full" id="vG" viewBox="0 0 1080 1920"></svg><div id="gFlash" style="position:absolute;inset:0;background:#fff8e6;opacity:0"></div>
    <div class="lbl" id="gAca" style="left:64px;top:930px;color:var(--green);opacity:0">▼ acá abajo</div>`);
  const R = corte($('vG'), { seed: 3 });
  // marcas: halo verde sobre la estación y flechas rojas hacia la escalera
  const ok = el('rect', { x: 30, y: ROOF, width: 1020, height: BOXB - ROOF + 18, fill: 'none', stroke: '#4fc483', 'stroke-width': 6, rx: 6, opacity: 0 }, R.root);
  const arr = el('g', { opacity: 0 }, R.root);
  for (const [x, y] of [[560, PLAT - 120], [640, PLAT - 150]]) flecha(arr, x, y, x + 150, y - 100, '#e0433a', 9);
  RENDER.push(t => {
    if (!on('sGancho')) return;
    explota(R, t, t0);
    $('gFlash').style.opacity = (P(t, t0, t0 + .06) * (1 - P(t, t0 + .1, t0 + 1.2)) * .95).toFixed(3);
    const p = io(P(t, ...PAN)), [sx, sy] = shake(t, 9 * (1 - P(t, t0, t0 + 1.4)) * P(t, t0, t0 + .05));
    camCorte(R, lerp(640, 540, p), lerp(1150, Y0, p), lerp(1.32 + .06 * P(t, 0, PAN[0]), 1, p), sx, sy);
    const a = AT('h1', 'mejores');
    ok.setAttribute('opacity', (P(t, a - .2, a + .3) * (.65 + .35 * Math.sin(t * 6))).toFixed(3));
    $('gAca').style.opacity = P(t, a - .2, a + .3);
    const b = AT('h2', 'no');
    for (const p of R.gente) p.g.querySelectorAll('rect,circle').forEach(n => n.setAttribute('fill', t > b + p.d * .5 ? '#c4473f' : '#59626e'));
    arr.setAttribute('opacity', (P(t, AT('h2', 'casi'), AT('h2', 'casi') + .3) * (Math.floor(t * 3) % 2 ? .5 : 1)).toFixed(3));
  });
}

// ---------- Tomás (busto dibujado: casco blanco, chaleco naranja con bandas reflectivas) ----------
const TOMAS = `<svg viewBox="0 0 600 700" style="width:100%;height:100%">
  <defs><linearGradient id="tmGL" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
  <radialGradient id="tmGB" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#ffb23e" stop-opacity=".22"/><stop offset="1" stop-color="#ffb23e" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="300" cy="380" rx="300" ry="320" fill="url(#tmGB)"/>
  <path d="M40,700 C52,560 140,500 228,482 L372,482 C460,500 548,560 560,700 Z" fill="#1d2a3b"/>
  <path d="M80,700 C92,582 150,522 230,496 L268,566 L258,700 Z" fill="#ff7a1a"/>
  <path d="M520,700 C508,582 450,522 370,496 L332,566 L342,700 Z" fill="#ff7a1a"/>
  <path d="M86,612 L262,612 L262,634 L83,640 Z M80,660 L260,660 L259,684 L79,688 Z" fill="#e3e8ec"/>
  <path d="M514,612 L338,612 L338,634 L517,640 Z M520,660 L340,660 L341,684 L521,688 Z" fill="#e3e8ec"/>
  <path d="M140,560 C170,532 200,515 230,500 L238,514 C205,530 176,548 150,572 Z" fill="#ffa25a" opacity=".5"/>
  <path d="M238,486 L300,560 L362,486 L346,474 L300,522 L254,474 Z" fill="#2c3d55"/>
  <path d="M256,392 L256,490 C278,518 322,518 344,490 L344,392 Z" fill="#c2856a"/>
  <path d="M256,420 C280,450 320,450 344,420 L344,452 C320,470 280,470 256,452 Z" fill="#9c654f" opacity=".7"/>
  <ellipse cx="214" cy="318" rx="15" ry="26" fill="#c98b6c"/><ellipse cx="386" cy="318" rx="15" ry="26" fill="#b97c60"/>
  <path d="M216,300 C216,224 256,182 300,182 C344,182 384,224 384,300 C384,372 348,432 300,437 C252,432 216,372 216,300 Z" fill="#d79f7b"/>
  <path d="M300,182 C344,182 384,224 384,300 C384,372 348,432 300,437 C322,400 330,350 330,300 C330,240 322,200 300,182 Z" fill="#b5795c" opacity=".45"/>
  <path d="M226,360 C240,410 270,434 300,437 C330,434 360,410 374,360 C360,392 336,410 300,412 C264,410 240,392 226,360 Z" fill="#5a3a2c" opacity=".28"/>
  <path d="M220,276 C214,236 226,214 240,206 L244,262 Z M380,276 C386,236 374,214 360,206 L356,262 Z" fill="#231a15"/>
  <path d="M246,272 Q264,262 284,268" stroke="#2a1d16" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M316,268 Q336,262 354,272" stroke="#2a1d16" stroke-width="8" stroke-linecap="round" fill="none"/>
  <ellipse cx="266" cy="298" rx="8" ry="6.5" fill="#1b1410"/><ellipse cx="334" cy="298" rx="8" ry="6.5" fill="#1b1410"/>
  <circle cx="269" cy="296" r="2" fill="#fff" opacity=".8"/><circle cx="337" cy="296" r="2" fill="#fff" opacity=".8"/>
  <path d="M302,296 Q298,334 289,348 Q299,356 312,349" stroke="#a5684f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M278,386 Q300,393 322,386" stroke="#7d4636" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M198,266 C198,170 244,120 300,120 C356,120 402,170 402,266 Z" fill="#f2f4f6"/>
  <path d="M300,120 C356,120 402,170 402,266 L330,266 C340,200 330,150 300,120 Z" fill="#c9ced5" opacity=".6"/>
  <path d="M288,123 L312,123 L316,264 L284,264 Z" fill="#dde1e6"/>
  <path d="M178,262 Q300,242 422,262 L424,282 Q300,266 176,282 Z" fill="#e4e8ec"/>
  <rect x="280" y="186" width="40" height="26" rx="7" fill="#2b2f36"/><circle cx="300" cy="199" r="8" fill="#ffe9a8"/>
  <path d="M0,0 H600 V700 H0 Z" fill="url(#tmGL)" opacity=".0"/>
</svg>`;

// ---------- 2 · Tomás: nombre, edad, oficio ----------
{
  const a = S('c1');
  const s = photo('sTomas', [a - .05, AT('c1', 'la primera') - .05, .2, .25, 1.05], 'linea-a-vagon.jpg', {
    filter: 'saturate(.5) brightness(.32) blur(6px)', kb: [1.12, 1.2, 0, -30, 0, 0], credit: '',
    inner: `<div id="tmBust" style="position:absolute;left:250px;top:560px;width:560px;height:653px">${TOMAS}</div>
      <div class="card" id="tmCard" style="left:64px;top:300px;width:700px;padding:30px 36px">
        <div class="lbl" style="position:static;color:var(--amber);font-size:22px">sobreviviente · ficha</div>
        <div id="tmN" style="font:900 108px/1 'Inter Var';letter-spacing:-.02em;margin-top:10px">TOMÁS</div>
        <div id="tmE" style="font:600 40px 'Inter Var';color:#cfd3d8;margin-top:12px">28 años</div>
        <div id="tmO" style="font:500 34px 'Inter Var';color:#aab0b8;margin-top:6px">Técnico de mantenimiento</div>
        <div id="tmL" style="display:flex;align-items:center;gap:14px;margin-top:18px;font:600 30px 'Inter Var'"><span style="width:46px;height:46px;border-radius:50%;background:#4cc3f0;display:flex;align-items:center;justify-content:center;font:800 28px 'Inter Var'">A</span>Línea A · Subte de Buenos Aires</div>
      </div>`,
  });
  const it = ['tmN', 'tmE', 'tmO', 'tmL'].map($), at = [AT('c1', 'Tomás'), AT('c1', 'veintiocho'), AT('c1', 'técnico'), AT('c1', 'línea A')];
  RENDER.push(t => {
    if (!on('sTomas')) return;
    const k = eo(P(t, a, a + .7));
    $('tmBust').style.transform = `translateY(${lerp(120, 0, k)}px)`; $('tmBust').style.opacity = k;
    $('tmCard').style.opacity = eo(P(t, a + .05, a + .45)); $('tmCard').style.transform = `translateX(${lerp(-40, 0, eo(P(t, a, a + .5)))}px)`;
    it.forEach((n, i) => { const q = eo(P(t, at[i] - .1, at[i] + .25)); n.style.opacity = q; n.style.transform = `translateY(${lerp(16, 0, q)}px)`; });
  });
}
// ---------- 3 · La Línea A: 1913 ----------
{
  const a = AT('c1', 'la primera'), y = AT('c1', 'mil');
  photo('sLinea', [a - .1, S('c2') - .05, .25, .2, 1.1], 'linea-a-vagon.jpg', {
    filter: 'saturate(.75) brightness(.62) contrast(1.05)', kb: [1.05, 1.16, 0, 0, 30, -20],
    inner: `<div style="position:absolute;left:64px;top:330px;width:820px">
      <div class="lbl" id="lnK" style="position:static;color:#e8e3d8;font-size:26px">la primera línea de subte<br>de Latinoamérica</div>
      <div id="lnY" style="font:900 250px/1 'Inter Var';letter-spacing:-.03em;color:var(--amber);margin-top:16px;text-shadow:0 10px 40px rgba(0,0,0,.6)">1913</div>
      <div class="lbl" id="lnS" style="position:static;color:#cfd3d8;font-size:22px;margin-top:14px">coche de madera original · circuló hasta 2013</div></div>`,
  });
  RENDER.push(t => {
    if (!on('sLinea')) return;
    $('lnK').style.opacity = eo(P(t, a, a + .4));
    const q = P(t, y - .15, y + .2); $('lnY').style.opacity = q; $('lnY').style.transform = `scale(${lerp(1.5, 1, back(q))})`; $('lnY').style.transformOrigin = '0 60%';
    $('lnS').style.opacity = P(t, y + .5, y + 1);
  });
}
// pasajeros en sombra (vagón lleno) con celulares que se encienden
function vagon(svg, seed, cel) {
  const r = rnd(seed), d = el('defs', {}, svg), P2 = [];
  const rg = el('radialGradient', { id: svg.id + 'tel' }, d);
  el('stop', { offset: 0, 'stop-color': '#ffd9d4', 'stop-opacity': .9 }, rg); el('stop', { offset: 1, 'stop-color': '#ff3b2f', 'stop-opacity': 0 }, rg);
  const rows = [[1880, 1.9, 4], [1640, 1.45, 5], [1430, 1.1, 6], [1260, .85, 7]];
  for (const [y, s, n] of rows.reverse()) for (let i = 0; i < n; i++) {
    const x = (i + .5) * 1080 / n + (r() - .5) * 90, g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, svg);
    const tone = Math.round(10 + s * 4);
    el('path', { d: 'M-130,40 C-125,-40 -80,-70 -40,-78 L40,-78 C80,-70 125,-40 130,40 Z', fill: `rgb(${tone},${tone + 2},${tone + 6})` }, g);
    el('ellipse', { cx: 0, cy: -140, rx: 52, ry: 64, fill: `rgb(${tone + 2},${tone + 4},${tone + 8})` }, g);
    if (cel && r() < .85) {
      const ph = el('g', { transform: `translate(${(r() - .5) * 60} ${-60 + r() * 20}) rotate(${(r() - .5) * 30})` }, g);
      const glow = el('ellipse', { cx: 0, cy: -40, rx: 120, ry: 110, fill: `url(#${svg.id}tel)`, opacity: 0 }, ph);
      const scr = el('rect', { x: -18, y: -32, width: 36, height: 64, rx: 6, fill: '#101318', stroke: '#2a2f37', 'stroke-width': 3 }, ph);
      P2.push({ ph, glow, scr, d: r(), base: ph.getAttribute('transform') });
    }
  }
  return P2;
}
// ---------- 4 · Martes, 8:12, hora pico ----------
{
  const a = S('c2');
  const s = scene('sHora', [a - .1, S('c3') - .1, .2, .15, 1.05], `<div class="ph"><img src="img/linea-a-vagon.jpg" style="filter:saturate(.4) brightness(.35) blur(5px)"></div>
    <svg class="full" id="vH" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:0;right:0;top:420px;text-align:center">
      <div class="lbl" id="hrD" style="position:static;font-size:34px;color:#cfd3d8;letter-spacing:.3em">martes</div>
      <div id="hrH" class="mono" style="font-weight:500;font-size:230px;line-height:1.05;letter-spacing:-.02em">08:12</div>
      <div id="hrP" class="pill" style="background:rgba(255,178,62,.16);color:var(--amber);border:2px solid rgba(255,178,62,.5);margin-top:8px">HORA PICO</div></div>`);
  vagon($('vH'), 5, false);
  RENDER.push(t => {
    if (!on('sHora')) return;
    $('hrD').style.opacity = eo(P(t, a, a + .3));
    const h = eo(P(t, AT('c2', 'ocho') - .1, AT('c2', 'ocho') + .3)); $('hrH').style.opacity = h; $('hrH').style.transform = `scale(${lerp(1.15, 1, h)})`;
    const p = P(t, AT('c2', 'Hora') - .1, AT('c2', 'Hora') + .25); $('hrP').style.opacity = p; $('hrP').style.transform = `scale(${lerp(.6, 1, back(p))})`;
    $('vH').style.transform = `translateY(${lerp(40, 0, eo(P(t, a - .1, a + 2.5)))}px)`;
  });
}
// ---------- 5 · Todos los celulares suenan a la vez ----------
{
  const a = S('c3'), z = AT('c3', 'suenan');
  scene('sCelus', [a - .1, S('c4') - .3, .15, .15, 1.08], `<div class="ph"><img src="img/linea-a-vagon.jpg" style="filter:saturate(.3) brightness(.22) blur(3px)"></div>
    <svg class="full" id="vC" viewBox="0 0 1080 1920"></svg><div id="cRed" style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,rgba(224,67,58,.0),rgba(224,67,58,.45));opacity:0"></div>`);
  const tel = vagon($('vC'), 9, true);
  RENDER.push(t => {
    if (!on('sCelus')) return;
    for (const p of tel) {
      const k = P(t, z + p.d * .12, z + p.d * .12 + .08), blink = Math.floor((t - z) * 2.4 + p.d * 3) % 2 ? .75 : 1;
      p.glow.setAttribute('opacity', (k * blink).toFixed(3));
      p.scr.setAttribute('fill', k > .5 ? (blink > .9 ? '#ffe9e6' : '#ff5a4e') : '#101318');
      const [sx, sy] = shake(t + p.d, k * 3.5, 31);
      p.ph.setAttribute('transform', p.base + ` translate(${sx.toFixed(1)} ${sy.toFixed(1)})`);
    }
    $('cRed').style.opacity = (P(t, E('c3') - .1, E('c3') + .2) * (.6 + .4 * Math.sin(t * 13))).toFixed(3);
  });
}
// ---------- 6 · La alerta en la pantalla (recreación) ----------
{
  const a = AT('c4', 'Alerta'), l1 = AT('c4', 'Amenaza'), l2 = AT('c4', 'Busque');
  scene('sAlerta', [a - .3, S('c5') - .05, .15, .2, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#3a0b09,#0a0303 70%)"></div>
    <div id="alPh" style="position:absolute;left:250px;top:300px;width:580px;height:1140px;border-radius:70px;background:#0d0f13;border:3px solid #2c3038;box-shadow:0 40px 120px rgba(0,0,0,.7),0 0 120px rgba(224,67,58,.35)">
      <div style="position:absolute;inset:16px;border-radius:56px;overflow:hidden;background:linear-gradient(#141821,#0b0d12)">
        <div class="mono" style="position:absolute;left:0;right:0;top:120px;text-align:center;font-size:110px;color:#e8e6e1">08:13</div>
        <div class="mono" style="position:absolute;left:0;right:0;top:250px;text-align:center;font-size:24px;letter-spacing:.2em;color:#8b919a">MARTES</div>
        <div id="alN" style="position:absolute;left:24px;right:24px;top:330px;border-radius:30px;background:rgba(245,240,236,.96);color:#141414;padding:28px 30px">
          <div style="display:flex;align-items:center;gap:14px;font:800 30px 'Inter Var';color:#c62a20">
            <svg width="44" height="40" viewBox="0 0 44 40"><path d="M22,2 L42,38 L2,38 Z" fill="#d23a32"/><rect x="20" y="13" width="4" height="13" fill="#fff"/><rect x="20" y="29" width="4" height="4" fill="#fff"/></svg>
            <span>Alerta de emergencia</span></div>
          <div id="alT1" style="font:800 46px/1.12 'Inter Var';margin-top:18px">Amenaza de ataque nuclear.</div>
          <div id="alT2" style="font:600 40px/1.15 'Inter Var';margin-top:12px;color:#333">Busque refugio bajo tierra.</div>
          <div style="font:500 22px 'Inter Var';color:#777;margin-top:16px">ahora</div></div>
      </div></div>
    <div class="lbl" style="left:64px;top:1480px;color:rgba(236,235,230,.5);font-size:20px">recreación · no es un mensaje real</div>`);
  RENDER.push(t => {
    if (!on('sAlerta')) return;
    const n = back(P(t, a - .1, a + .35));
    $('alN').style.transform = `translateY(${lerp(-60, 0, n)}px) scale(${lerp(.9, 1, n)})`; $('alN').style.opacity = P(t, a - .1, a + .15);
    $('alT1').style.opacity = P(t, l1 - .1, l1 + .2); $('alT2').style.opacity = P(t, l2 - .1, l2 + .2);
    const [sx, sy] = shake(t, 4 * (Math.floor(t * 1.6) % 2 ? 1 : 0), 27);
    $('alPh').style.transform = `translate(${sx}px,${sy}px) rotate(${lerp(-4, -1.5, P(t, a, S('c5')))}deg)`;
  });
}

// ---------- 7 · Estación Perú: el tren frena y se abren las puertas ----------
{
  const a = S('c5'), pe = AT('c5', 'Perú'), ab = AT('c5', 'puertas');
  const s = photo('sPeru', [a - .05, AT('c5', 'correr') - .1, .15, .2, 1.08], 'peru.jpg', { pos: '40% 50%', filter: 'saturate(.7) brightness(.62) contrast(1.06)', kb: [1.08, 1.2, 0, 40, 0, 0],
    inner: `<svg class="full" viewBox="0 0 1080 1920"><defs><linearGradient id="pdG" x1="0" x2="1"><stop offset="0" stop-color="#5b616a"/><stop offset="1" stop-color="#3b4048"/></linearGradient></defs>
      <path id="pdL" fill-rule="evenodd" fill="url(#pdG)" d="M-20,-20 H542 V1940 H-20 Z M110,420 H470 Q500,420 500,450 V990 Q500,1020 470,1020 H110 Q80,1020 80,990 V450 Q80,420 110,420 Z"/>
      <path id="pdR" fill-rule="evenodd" fill="url(#pdG)" d="M538,-20 H1100 V1940 H538 Z M610,420 H970 Q1000,420 1000,450 V990 Q1000,1020 970,1020 H610 Q580,1020 580,990 V450 Q580,420 610,420 Z"/>
      <rect id="pdS" x="534" y="-20" width="12" height="1960" fill="#1d2026"/></svg>
      <div id="peTag" class="pill" style="position:absolute;left:64px;top:330px;background:rgba(9,12,17,.85);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:34px">
        <span style="width:46px;height:46px;border-radius:50%;background:#4cc3f0;display:flex;align-items:center;justify-content:center;font:800 28px 'Inter Var'">A</span>ESTACIÓN PERÚ</div>` });
  const img = $$('.ph img', s);
  RENDER.push(t => {
    if (!on('sPeru')) return;
    const m = 1 - eo(P(t, a, pe + .2));
    img.style.filter = `saturate(.7) brightness(.62) contrast(1.06) blur(${(m * 9).toFixed(1)}px)`;
    img.style.transform += ` translateX(${(-160 * m * m).toFixed(1)}px)`;
    const o = io(P(t, ab, ab + .8));
    $('pdL').setAttribute('transform', `translate(${-560 * o} 0)`); $('pdR').setAttribute('transform', `translate(${560 * o} 0)`);
    $('pdS').setAttribute('opacity', 1 - P(t, ab, ab + .2));
    const g = P(t, pe - .1, pe + .3); $('peTag').style.opacity = g; $('peTag').style.transform = `translateY(${lerp(-20, 0, eo(g))}px)`;
    const r = P(t, AT('c5', 'la gente') - .1, AT('c5', 'la gente') + .6);
    s.querySelector('.vig').style.background = `radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(${Math.round(4 + 90 * r)},6,9,.8) 100%),linear-gradient(rgba(6,8,11,.65),rgba(6,8,11,0) 22%,rgba(6,8,11,0) 55%,rgba(6,8,11,.85) 80%)`;
  });
}
// ---------- 8 · Todos corren a las escaleras ----------
{
  const a = AT('c5', 'correr');
  const s = photo('sEsc', [a - .1, S('c6') - .05, .15, .15, 1.1], 'escaleras.jpg', { pos: '50% 50%', filter: 'brightness(.6) contrast(1.15)', kb: [1.25, 1.1, 0, 0, 40, 0],
    inner: `<svg class="full" id="vE" viewBox="0 0 1080 1920"></svg><div style="position:absolute;inset:0;background:rgba(160,20,15,.22);mix-blend-mode:multiply"></div>
      <div id="esTag" class="pill" style="position:absolute;left:64px;top:330px;background:#c3332b;color:#fff;font-size:32px">↑ TODOS A LA CALLE</div>` });
  const ch = [];
  for (let i = 0; i < 6; i++) { const g = el('g', {}, $('vE')); el('path', { d: 'M-90,40 L0,-30 L90,40', stroke: '#ff4a40', 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); ch.push(g); }
  RENDER.push(t => {
    if (!on('sEsc')) return;
    ch.forEach((g, i) => {
      const k = ((t - a) * .9 + i / ch.length) % 1;
      g.setAttribute('transform', `translate(540 ${lerp(760, 1500, k * k)}) scale(${lerp(.35, 1.6, k * k)})`);
      g.setAttribute('opacity', (Math.min(1, k * 4) * (1 - P(k, .8, 1))).toFixed(3));
    });
    const q = P(t, a, a + .35); $('esTag').style.opacity = q; $('esTag').style.transform = `scale(${lerp(.7, 1, back(q))})`;
  });
}
// ---------- 9 · Tomás hace lo contrario; el destello y la onda expansiva ----------
{
  const a = S('c6'), b = S('c8') - .05, fl = AT('c7', 'destello'), on7 = AT('c7', 'onda'), za = AT('c7', 'Sabe');
  scene('sBaja', [a - .1, b, .15, .1, 0], `<svg class="full" id="vB" viewBox="0 0 1080 1920"></svg><div id="bFlash" style="position:absolute;inset:0;background:#fff8e6;opacity:0"></div>
    <div class="card" id="bPanel" style="left:64px;top:330px;width:740px;padding:26px 30px;opacity:0">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="lbl" style="position:static;color:var(--mut);font-size:20px">si explota una bomba</div><div id="bT" class="mono" style="font-size:40px;color:#fff">+0,0 s</div></div>
      <div style="margin-top:18px;font:700 30px 'Inter Var';color:var(--amber)">Destello <span style="font-weight:500;color:#cfd3d8;font-size:26px">· llega al instante</span></div>
      <div style="height:16px;border-radius:8px;background:rgba(255,255,255,.08);margin-top:10px"><div id="bB1" style="height:100%;width:0;border-radius:8px;background:var(--amber)"></div></div>
      <div id="bR2" style="opacity:0"><div style="margin-top:18px;font:700 30px 'Inter Var';color:#ff5a50">Onda expansiva <span style="font-weight:500;color:#cfd3d8;font-size:26px">· tarda más</span></div>
      <div style="height:16px;border-radius:8px;background:rgba(255,255,255,.08);margin-top:10px"><div id="bB2" style="height:100%;width:0;border-radius:8px;background:#e0433a"></div></div></div></div>
    <div id="bLbl" class="pill" style="position:absolute;left:64px;top:930px;background:#2f8f5b;color:#fff;font-size:30px;opacity:0">↓ TOMÁS SE QUEDA ABAJO</div>`);
  const R = corte($('vB'), { seed: 3, fx: 1060 });
  // flecha verde junto a Tomás y la onda (media cúpula desde el punto de la explosión)
  const fv = el('g', { opacity: 0 }, R.root); flecha(fv, 330, PLAT - 190, 330, PLAT - 40, '#4fc483', 12);
  const ring = el('g', { opacity: 0 }, R.root);
  const wf = el('path', { fill: 'rgba(255,150,80,.16)', stroke: '#ffe0b8', 'stroke-width': 10, 'stroke-opacity': .95 }, ring);
  const wf2 = el('path', { fill: 'none', stroke: '#ff7a3a', 'stroke-width': 22, 'stroke-opacity': .25 }, ring);
  const [FX] = R.fx, RW = r => `M${FX - r},${Y0} A${r},${r * .85} 0 0 1 ${FX + r},${Y0}`;
  const vel = 1100 / (b - on7 + .2);                 // la onda llega a la izquierda del cuadro justo cuando se corta
  const crowd = R.gente.map((p, i) => ({ ...p, t0: a - .2 + p.d * 1.2 + (700 - p.x) / 2000 }));
  for (const p of R.gente) p.g.querySelectorAll('rect,circle').forEach(n => n.setAttribute('fill', '#c4473f'));
  RENDER.push(t => {
    if (!on('sBaja')) return;
    // la gente: camina hasta la escalera y sube a la calle
    for (const p of crowd) {
      const sp = 260, d1 = Math.abs(720 - p.x), L = Math.hypot(ESC[0][0] - ESC[1][0], ESC[0][1] - ESC[1][1]);
      const s = Math.max(0, t - p.t0) * sp; let x, y;
      if (s < d1) { x = p.x + Math.sign(720 - p.x) * s; y = PLAT; }
      else { const u = clamp((s - d1) / L); x = lerp(ESC[1][0], ESC[0][0], u); y = lerp(ESC[1][1], ESC[0][1], u) + 4; if (u >= 1) x += (s - d1 - L) * .9; }
      p.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(1.3)`);
      p.g.setAttribute('opacity', (1 - P(x, 1000, 1080)).toFixed(3));
    }
    const ba = AT('c6', 'Baja');
    fv.setAttribute('opacity', P(t, ba - .1, ba + .2) * (1 - P(t, fl - 1.2, fl - .6))); $('bLbl').style.opacity = P(t, ba - .1, ba + .2) * (1 - P(t, za + .5, za + .9));
    fv.setAttribute('transform', `translate(0 ${(8 * Math.sin(t * 7)).toFixed(1)})`);
    // cámara: cerca de Tomás cuando "sabe algo", después se abre para ver el cielo
    const zin = io(P(t, za - .2, za + 1)), zout = io(P(t, fl - 1.4, fl - .2));
    const cx = lerp(lerp(540, 384, zin), 540, zout), cy = lerp(lerp(Y0 + 60, PLAT - 60, zin), Y0, zout), sc = lerp(lerp(1.12, 1.9, zin), 1, zout);
    const [sx, sy] = shake(t, 10 * P(t, fl, fl + .05) * (1 - P(t, fl, fl + 1.2)));
    camCorte(R, cx, cy, sc, sx, sy);
    if (t > fl - .05) explota(R, t, fl); else { R.halo.setAttribute('opacity', 0); R.hongo.g.setAttribute('opacity', 0); }
    $('bFlash').style.opacity = (P(t, fl, fl + .05) * (1 - P(t, fl + .1, fl + 1)) * .9).toFixed(3);
    // panel con el cronómetro
    $('bPanel').style.opacity = P(t, fl + .1, fl + .4);
    $('bT').textContent = '+' + Math.max(0, t - fl).toFixed(1).replace('.', ',') + ' s';
    $('bB1').style.width = 100 * eo(P(t, fl + .1, fl + .3)) + '%';
    $('bR2').style.opacity = P(t, on7 - .1, on7 + .2);
    const rr = Math.max(0, t - (on7 - .1)) * vel;
    $('bB2').style.width = 100 * clamp(rr / 1100) + '%';
    ring.setAttribute('opacity', rr > 0 ? 1 : 0);
    wf.setAttribute('d', RW(rr)); wf2.setAttribute('d', RW(Math.max(1, rr - 14)));
    for (const e of R.edif) {
      const pass = t - (on7 - .1) - (FX - e.x) / vel;
      const [ex, ey] = pass > 0 && pass < .6 ? shake(t + e.x, 6 * (1 - pass / .6), 23) : [0, 0];
      e.g.setAttribute('transform', `translate(${ex.toFixed(1)} ${ey.toFixed(1)})`);
    }
  });
}
// ---------- 10 · La ciudad sacudida ----------
{
  const a = S('c8'), ll = AT('c8', 'llega'), cv = AT('c8', 'cada ventana');
  const s = photo('sCiudad', [a - .05, cv - .1, .1, .15, 1.08], 'bsas-noche.jpg', { pos: '35% 50%', filter: 'saturate(.8) brightness(.7) contrast(1.1)', kb: [1.1, 1.22, 0, 0, 0, 0],
    inner: `<svg class="full" viewBox="0 0 1080 1920"><ellipse id="cRing" cx="1000" cy="900" rx="10" ry="4" fill="rgba(224,67,58,.16)" stroke="#ff6a5e" stroke-width="12" style="filter:drop-shadow(0 0 18px #ff3b2f)"/></svg><div id="cFl" style="position:absolute;inset:0;background:#ffe9c8;opacity:0"></div>` });
  RENDER.push(t => {
    if (!on('sCiudad')) return;
    const [sx, sy] = shake(t, 14 * (1 - P(t, ll, ll + 1.6)) * P(t, ll - .05, ll));
    s.firstElementChild.style.transform += ` translate(${sx}px,${sy}px)`;
    $('cFl').style.opacity = (.55 * P(t, ll - .05, ll) * (1 - P(t, ll, ll + .5))).toFixed(3);
    const r = lerp(10, 1500, eo(P(t, ll, cv + .3)));
    $('cRing').setAttribute('rx', r); $('cRing').setAttribute('ry', r * .38);
  });
}
// ---------- 11 · Cada ventana, una lluvia de vidrio ----------
{
  const a = AT('c8', 'cada ventana'), br = AT('c8', 'convierte');
  scene('sVidrio', [a - .1, S('c9') - .1, .1, .2, 1.05], `<svg class="full" id="vV" viewBox="0 0 1080 1920"></svg><div id="vR" style="position:absolute;inset:0;background:radial-gradient(ellipse,rgba(224,67,58,0) 30%,rgba(224,67,58,.5));opacity:0"></div>`);
  const svg = $('vV'), r = rnd(21), d = el('defs', {}, svg);
  const wg = el('linearGradient', { id: 'vwG', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#ffcf8a' }, wg); el('stop', { offset: 1, 'stop-color': '#c46a2a' }, wg);
  el('rect', { x: 0, y: 0, width: 1080, height: 1920, fill: '#1c2027' }, svg);
  for (let y = 300; y < 1920; y += 250) el('rect', { x: 0, y: y - 30, width: 1080, height: 14, fill: '#262b33' }, svg);
  const shards = [], wins = [];
  for (let row = 0; row < 6; row++) for (let col = 0; col < 3; col++) {
    const x = 110 + col * 300, y = 330 + row * 250, w = 240, h = 180;
    el('rect', { x: x - 10, y: y - 10, width: w + 20, height: h + 20, fill: '#11141a' }, svg);
    const lit = r() < .7;
    wins.push(el('rect', { x, y, width: w, height: h, fill: lit ? 'url(#vwG)' : '#2a3442', opacity: lit ? .85 : 1 }, svg));
    const cx = x + w * (.3 + .4 * r()), cy = y + h * (.3 + .4 * r()), pts = [];
    for (let k = 0; k < 9; k++) { const per = (k + r() * .8) / 9 * 2 * (w + h); pts.push(per < w ? [x + per, y] : per < w + h ? [x + w, y + per - w] : per < 2 * w + h ? [x + w - (per - w - h), y + h] : [x, y + h - (per - 2 * w - h)]); }
    const t0 = br + (row * .05 + col * .03) + r() * .12;
    for (let k = 0; k < pts.length; k++) {
      const p1 = pts[k], p2 = pts[(k + 1) % pts.length], mx = (cx + p1[0] + p2[0]) / 3, my = (cy + p1[1] + p2[1]) / 3;
      const g = el('g', {}, svg);
      el('path', { d: `M${cx - mx},${cy - my} L${p1[0] - mx},${p1[1] - my} L${p2[0] - mx},${p2[1] - my} Z`, fill: 'rgba(200,225,240,.35)', stroke: '#e8f4ff', 'stroke-width': 2 }, g);
      shards.push({ g, mx, my, t0, vx: (mx - cx) * 3 + (r() - .5) * 200, vy: -150 - r() * 250, va: (r() - .5) * 720 });
    }
  }
  RENDER.push(t => {
    if (!on('sVidrio')) return;
    for (const w of wins) w.setAttribute('opacity', t > br ? .12 : .85);
    for (const s of shards) {
      const u = Math.max(0, t - s.t0);
      if (t < s.t0) { s.g.setAttribute('opacity', 0); continue; }
      const x = s.mx + s.vx * u, y = s.my + s.vy * u + 900 * u * u;
      s.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(s.va * u).toFixed(1)}) scale(${(1 + u * .5).toFixed(3)})`);
      s.g.setAttribute('opacity', (1 - P(u, 1.6, 2.4)).toFixed(3));
    }
    const [sx, sy] = shake(t, 12 * P(t, br - .05, br) * (1 - P(t, br, br + 1)));
    $('vV').style.transform = `translate(${sx}px,${sy}px)`;
    $('vR').style.opacity = (P(t, br - .05, br + .1) * (1 - .5 * P(t, br + .5, br + 2))).toFixed(3);
  });
}

// ---------- 12 · La tierra como escudo: cada 9 cm, la mitad ----------
{
  const a = S('c9'), ra = AT('c10', 'radiación'), nu = AT('c10', 'cada nueve'), mi = ATE('c10', 'mitad'), me = AT('c11', 'metro'), mil = AT('c11', 'mil');
  const SUP = 520, BH = 50, NB = 11, X0 = 190, X1 = 860;
  scene('sCapas', [a - .1, S('c12') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:linear-gradient(#070a10,#0c1018 30%)"></div>
    <svg class="full" id="vK" viewBox="0 0 1080 1920"></svg>
    <div class="lbl" id="kTag" style="left:64px;top:330px;color:var(--amber);font-size:24px">blindaje · tierra compactada</div>
    <div id="kMil" class="card" style="left:150px;top:690px;width:740px;padding:26px 30px;text-align:center;opacity:0;border-color:rgba(79,196,131,.6)">
      <div style="font:600 30px 'Inter Var';color:#cfd3d8">1 metro de tierra encima</div>
      <div style="font:900 74px/1.1 'Inter Var';color:#5ee093;margin-top:6px">+1.000 veces<br>menos radiación</div></div>`);
  const svg = $('vK'), r = rnd(5), bands = [], labs = [];
  el('rect', { x: X0, y: SUP - 8, width: X1 - X0, height: 8, fill: '#3a4048' }, svg);
  for (let k = 0; k < NB; k++) {
    const g = el('g', { opacity: 0 }, svg);
    el('rect', { x: X0, y: SUP + k * BH, width: X1 - X0, height: BH - 2, fill: k % 2 ? '#3a2c21' : '#33261c' }, g);
    for (let i = 0; i < 14; i++) el('ellipse', { cx: X0 + r() * (X1 - X0), cy: SUP + k * BH + 6 + r() * (BH - 14), rx: 2 + r() * 5, ry: 1.5 + r() * 3, fill: '#4a3a2c' }, g);
    const tx = el('text', { x: X0 - 18, y: SUP + k * BH + 34, 'text-anchor': 'end', fill: '#8b919a', 'font-family': 'IBM Plex Mono', 'font-size': 22 }, g); tx.textContent = (k + 1) * 9 + ' cm';
    const pc = el('text', { x: X1 - 16, y: SUP + k * BH + 35, 'text-anchor': 'end', fill: '#ffc142', 'font-family': 'IBM Plex Mono', 'font-size': 26, 'font-weight': 500 }, g);
    const v = 100 / 2 ** (k + 1); pc.textContent = (v >= 1 ? v.toFixed(v % 1 ? 1 : 0) : v.toFixed(v >= .1 ? 1 : 2)).replace('.', ',') + ' %';
    bands.push(g); labs.push(pc);
  }
  const top = el('text', { x: X1 - 16, y: SUP - 22, 'text-anchor': 'end', fill: '#ffc142', 'font-family': 'IBM Plex Mono', 'font-size': 26, opacity: 0 }, svg); top.textContent = '100 %';
  // rayos: la cantidad que entra en cada capa se reduce a la mitad
  const NR = 32, rays = [], xs = d3.shuffle(d3.range(NR).map(i => X0 + 36 + i * (X1 - X0 - 200) / NR), r);
  for (let i = 0; i < NR; i++) {
    const depth = Math.floor(Math.log2(NR / (i + 1)));            // capas que atraviesa
    const ln = el('line', { x1: xs[i], x2: xs[i], y1: 380, y2: SUP + depth * BH + BH * .6, stroke: '#ffd23e', 'stroke-width': 6, 'stroke-dasharray': '12 18', 'stroke-linecap': 'round', opacity: 0 }, svg);
    rays.push({ ln, depth, y2: SUP + depth * BH + BH * .6 });
  }
  // Tomás debajo de todo, a salvo
  const halo = el('ellipse', { cx: 540, cy: SUP + NB * BH + 40, rx: 120, ry: 50, fill: '#4fc483', opacity: 0 }, svg);
  const tm = persona(svg, 540, SUP + NB * BH + 82, 1.05, { casco: true });
  const brk = el('g', { opacity: 0 }, svg);
  el('path', { d: `M90,${SUP} H76 V${SUP + NB * BH} H90`, stroke: '#5ee093', 'stroke-width': 5, fill: 'none' }, brk);
  const bt = el('text', { x: 58, y: SUP + NB * BH / 2, fill: '#5ee093', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 34, 'text-anchor': 'middle', transform: `rotate(-90 58 ${SUP + NB * BH / 2})` }, brk); bt.textContent = '1 METRO';
  const rev = k => k < 7 ? nu + k * (mi + .3 - nu) / 7 : mi + .3 + (k - 7) * .12;   // cuándo aparece cada porcentaje
  RENDER.push(t => {
    if (!on('sCapas')) return;
    bands.forEach((g, k) => g.setAttribute('opacity', eo(P(t, a + k * .12, a + k * .12 + .3)).toFixed(3)));
    labs.forEach((l, k) => l.setAttribute('opacity', P(t, rev(k), rev(k) + .15) * (1 - .6 * P(t, mil - .3, mil))));
    top.setAttribute('opacity', P(t, nu - .4, nu));
    tm.setAttribute('opacity', P(t, a + 1, a + 1.4)); halo.setAttribute('opacity', (.25 * P(t, a + 1.3, a + 1.8) * (.7 + .3 * Math.sin(t * 5))).toFixed(3));
    for (const q of rays) {
      const reach = q.depth === 0 ? 1 : P(t, rev(q.depth - 1), rev(q.depth - 1) + .25);
      q.ln.setAttribute('opacity', (P(t, ra - .2, ra + .3) * .9).toFixed(3));
      q.ln.setAttribute('y2', lerp(SUP + BH * .6, q.y2, reach));
      q.ln.setAttribute('stroke-dashoffset', (-t * 90).toFixed(1));
    }
    $('kTag').style.opacity = P(t, ra - .2, ra + .2);
    brk.setAttribute('opacity', P(t, me - .1, me + .2));
    const m = P(t, mil - .15, mil + .2); $('kMil').style.opacity = m; $('kMil').style.transform = `scale(${lerp(.8, 1, back(m))})`;
  });
}
// ---------- 13 · Kiev, 105 m; acá, pocos metros ----------
{
  const a = S('c12'), kv = AT('c12', 'Kiev'), pr = ATE('c12', 'profundidad'), aca = AT('c12', 'Acá');
  const SUP = 400, PXM = 6.6, KB = SUP + 105 * PXM;
  scene('sKiev', [a - .1, S('c13') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16 0,#0a0e16 ${SUP}px,#2b2018 ${SUP}px,#0d0907 1500px)"></div>
    <svg class="full" id="vKv" viewBox="0 0 1080 1920"></svg>
    <div id="kvN" class="mono" style="position:absolute;left:300px;top:${KB - 290}px;font-size:66px;color:var(--amber);opacity:0">105 m</div>
    <div id="kvL" class="lbl" style="left:150px;top:${KB - 92}px;font-size:22px;color:#cfd3d8;opacity:0">arsenalna · kiev</div>`);
  const svg = $('vKv');
  el('rect', { x: 0, y: SUP - 6, width: 1080, height: 6, fill: '#4b5058' }, svg);
  const sup = el('text', { x: 64, y: SUP - 22, fill: '#8b919a', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': 3 }, svg); sup.textContent = 'CALLE';
  // regla de profundidad
  for (let m = 25; m <= 100; m += 25) {
    el('rect', { x: 64, y: SUP + m * PXM - 1, width: 22, height: 2, fill: '#6d737c' }, svg);
    const tx = el('text', { x: 64, y: SUP + m * PXM - 10, fill: '#6d737c', 'font-family': 'IBM Plex Mono', 'font-size': 22 }, svg); tx.textContent = m + ' m';
  }
  // pozo de escaleras mecánicas y andén de Arsenalna
  const shaft = el('path', { d: `M330,${SUP} L400,${SUP} L230,${KB - 40} L160,${KB - 40} Z`, fill: '#141a22' }, svg);
  const esc = el('line', { x1: 365, y1: SUP, x2: 195, y2: KB - 40, stroke: '#8d939b', 'stroke-width': 4, 'stroke-dasharray': '8 8' }, svg);
  const box = el('rect', { x: 130, y: KB - 50, width: 330, height: 60, rx: 6, fill: '#141a22', stroke: '#ffb23e', 'stroke-width': 4 }, svg);
  const clip = el('clipPath', { id: 'kvClip' }, el('defs', {}, svg)); const cr = el('rect', { x: 0, y: SUP, width: 1080, height: 0 }, clip);
  for (const n of [shaft, esc, box]) n.setAttribute('clip-path', 'url(#kvClip)');
  // el Obelisco parado en el fondo: todavía le sobran 38 m
  const ob = el('g', { opacity: 0 }, svg), OH = 67.5 * PXM;
  el('path', { d: `M530,${KB} L560,${KB} L552,${KB - OH + 22} L545,${KB - OH} L538,${KB - OH + 22} Z`, fill: 'rgba(217,210,195,.3)', stroke: '#d9d2c3', 'stroke-width': 3 }, ob);
  const ot = el('text', { x: 578, y: KB - OH / 2, fill: '#d9d2c3', 'font-family': 'IBM Plex Mono', 'font-size': 24 }, ob); ot.textContent = 'el Obelisco: 67,5 m';
  el('path', { d: `M545,${KB - OH - 8} V${SUP + 8}`, stroke: '#ffb23e', 'stroke-width': 3, 'stroke-dasharray': '4 6' }, ob);
  const o2 = el('text', { x: 578, y: KB - OH - 24, fill: '#ffb23e', 'font-family': 'IBM Plex Mono', 'font-size': 24 }, ob); o2.textContent = '↑ y sobran 38 m';
  // la Línea A, a pocos metros de la calle
  const ba = el('g', { opacity: 0 }, svg);
  el('rect', { x: 640, y: SUP + 2 * PXM, width: 270, height: 6 * PXM, rx: 4, fill: '#141a22', stroke: '#ff5148', 'stroke-width': 4 }, ba);
  const bl = el('text', { x: 640, y: SUP + 8 * PXM + 46, fill: '#ff5148', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 34 }, ba); bl.textContent = 'LÍNEA A';
  const b2 = el('text', { x: 640, y: SUP + 8 * PXM + 84, fill: '#cfd3d8', 'font-family': 'IBM Plex Mono', 'font-size': 22 }, ba); b2.textContent = 'a pocos metros';
  RENDER.push(t => {
    if (!on('sKiev')) return;
    const d = io(P(t, kv - .1, pr - .1));
    cr.setAttribute('height', d * (KB + 20 - SUP));
    $('kvN').style.opacity = P(t, pr - .4, pr); $('kvN').textContent = Math.round(105 * d) + ' m'; $('kvL').style.opacity = P(t, pr - .2, pr + .2);
    ob.setAttribute('opacity', P(t, pr + .1, pr + .5));
    const q = P(t, aca - .1, aca + .3); ba.setAttribute('opacity', q * (Math.floor(t * 3) % 2 || t > aca + 1.2 ? 1 : .55));
  });
}
// ---------- 14 · Contra la lluvia radiactiva, una muralla; salvo impacto directo ----------
{
  const a = S('c13'), mu = AT('c13', 'esos pocos'), sv = AT('c13', 'Salvo');
  scene('sMuralla', [a - .1, S('c14') - .1, .2, .2, 0], `<svg class="full" id="vM" viewBox="0 0 1080 1920"></svg><div id="mRed" style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(224,67,58,0) 35%,rgba(224,67,58,.45));opacity:0"></div>
    <div id="mTag" class="pill" style="position:absolute;left:64px;top:330px;background:rgba(9,12,17,.85);border:1px solid rgba(217,210,138,.6);color:#e3dc94;font-size:30px;opacity:0">LLUVIA RADIACTIVA</div>
    <div id="mX" class="pill" style="position:absolute;left:64px;top:400px;background:#c3332b;color:#fff;font-size:30px;opacity:0">✕ SALVO IMPACTO DIRECTO</div>`);
  const R = corte($('vM'), { seed: 3 });
  R.hongo.g.remove(); R.halo.remove();
  const wall = el('g', { opacity: 0 }, R.root);
  el('rect', { x: 30, y: Y0 + 24, width: 1020, height: ROOF - Y0 - 26, fill: '#4fc483', opacity: .28 }, wall);
  el('rect', { x: 30, y: Y0 + 24, width: 1020, height: 5, fill: '#5ee093' }, wall);
  const wt = el('text', { x: 64, y: Y0 + 70, fill: '#5ee093', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 34 }, wall); wt.textContent = 'MURALLA';
  const r = rnd(8), dust = [];
  for (let i = 0; i < 170; i++) dust.push({ c: el('circle', { r: 2.5 + r() * 3, fill: '#e3dc94', opacity: 0 }, R.root), x: r() * 1080, y0: Y0 - 1300 - r() * 900, v: 260 + r() * 160, t0: a - 1 + r() * 2 });
  const tgt = el('g', { opacity: 0 }, R.root);
  el('circle', { cx: 540, cy: Y0 - 10, r: 90, fill: 'none', stroke: '#ff5148', 'stroke-width': 8 }, tgt);
  el('circle', { cx: 540, cy: Y0 - 10, r: 40, fill: 'none', stroke: '#ff5148', 'stroke-width': 6 }, tgt);
  for (const [x1, y1, x2, y2] of [[540, Y0 - 140, 540, Y0 - 60], [540, Y0 + 40, 540, Y0 + 120], [410, Y0 - 10, 490, Y0 - 10], [590, Y0 - 10, 670, Y0 - 10]]) el('line', { x1, y1, x2, y2, stroke: '#ff5148', 'stroke-width': 8 }, tgt);
  for (const p of R.gente) p.g.remove();
  RENDER.push(t => {
    if (!on('sMuralla')) return;
    camCorte(R, 540, lerp(Y0 - 60, Y0 + 40, io(P(t, a - .1, S('c14')))), 1.12);
    for (const d of dust) {
      const y = Math.min(Y0 - 3, d.y0 + Math.max(0, t - d.t0) * d.v);
      d.c.setAttribute('cx', d.x + 12 * Math.sin(t * 1.3 + d.x)); d.c.setAttribute('cy', y.toFixed(1));
      d.c.setAttribute('opacity', (y >= Y0 - 3 ? .95 : .7) * P(t, a - .1, a + .4));
    }
    $('mTag').style.opacity = P(t, AT('c13', 'lluvia') - .1, AT('c13', 'lluvia') + .3) * (1 - P(t, sv - .2, sv));
    wall.setAttribute('opacity', P(t, mu - .1, mu + .4) * (1 - .5 * P(t, sv, sv + .3)));
    const x = P(t, sv - .1, sv + .25);
    tgt.setAttribute('opacity', x * (Math.floor(t * 4) % 2 ? .6 : 1));
    tgt.setAttribute('transform', `translate(540 ${Y0 - 10}) scale(${lerp(1.8, 1, eo(x))}) translate(-540 ${-(Y0 - 10)})`);
    $('mRed').style.opacity = x * (.7 + .3 * Math.sin(t * 8)); $('mX').style.opacity = x;
  });
}

// ---------- 15 · El plan de Tomás (lista que se tilda) ----------
{
  const a = S('c14'), it = [AT('c15', 'Lejos'), AT('c16', 'En el medio'), AT('c16', 'Agua'), AT('c16', 'quedarse')];
  const bo = AT('c15', 'bocas'), ph = AT('c16', 'las primeras'), rs = AT('c17', 'resuelto');
  const items = ['Lejos de las escaleras', 'En el medio del andén', 'Agua', '24 horas, como mínimo'];
  scene('sPlan', [a - .1, S('c18') - .1, .2, .15, 1.04], `<div class="ph"><img src="img/peru.jpg" style="filter:saturate(.3) brightness(.22) blur(8px)"></div>
    <div id="plT" style="position:absolute;left:64px;top:318px;font:900 58px 'Inter Var';letter-spacing:-.01em">EL PLAN DE <span style="color:var(--green)">TOMÁS</span></div>
    <div class="card" id="plP" style="left:64px;top:410px;width:836px;height:440px;overflow:hidden"><svg id="vP" viewBox="0 0 836 440" style="width:836px;height:440px"></svg>
      <div id="plS" style="position:absolute;left:50%;top:50%;padding:14px 30px;border:6px solid var(--green);border-radius:16px;color:var(--green);font:900 64px 'Inter Var';background:rgba(6,20,12,.85);transform:translate(-50%,-50%) rotate(-8deg);opacity:0;white-space:nowrap">✓ PLAN LISTO</div></div>
    <div id="plL" style="position:absolute;left:64px;top:878px;width:836px">${items.map((x, i) => `<div class="pr" style="display:flex;align-items:center;gap:22px;height:66px;font:600 40px 'Inter Var';color:#6d737c">
      <span class="bx" style="width:46px;height:46px;border-radius:10px;border:3px solid #4a5059;display:flex;align-items:center;justify-content:center;font:900 34px 'Inter Var';color:#06140c"></span><span class="tx">${x}</span></div>`).join('')}</div>`);
  const svg = $('vP'), il = [0, 1, 2, 3].map(() => el('g', { opacity: 0 }, svg));
  // 1 · corte chico: la onda entra por la boca y baja por la escalera
  { const g = il[0];
    el('rect', { x: 0, y: 0, width: 836, height: 112, fill: '#0b111b' }, g); el('rect', { x: 0, y: 112, width: 836, height: 328, fill: '#2a1f17' }, g);
    el('rect', { x: 0, y: 106, width: 836, height: 8, fill: '#4b5058' }, g);
    el('rect', { x: 24, y: 200, width: 788, height: 140, fill: '#4b5058' }, g); el('rect', { x: 34, y: 210, width: 768, height: 120, fill: '#141a22' }, g);
    el('path', { d: 'M640,112 L740,112 L560,320 L470,320 L470,210 L560,210 Z', fill: '#141a22' }, g);
    let st = 'M740,112'; for (let i = 1; i <= 8; i++) st += ` L${740 - (i - 1) * 22.5 - 22.5},${112 + (i - 1) * 26} L${740 - i * 22.5},${112 + i * 26}`;
    el('path', { d: st + ' L560,336 L740,128 Z', fill: '#5d636b' }, g);
    el('rect', { x: 34, y: 318, width: 768, height: 12, fill: '#6b7078' }, g);
    for (let x = 400; x < 640; x += 18) el('line', { x1: x, y1: 318, x2: x + 26, y2: 214, stroke: '#e0433a', 'stroke-width': 3, opacity: .35 }, g);
    persona(g, 120, 318, 1.1, { casco: true });
    el('circle', { cx: 120, cy: 200, r: 26, fill: '#4fc483' }, g); el('path', { d: 'M108,200 L117,210 L134,190', stroke: '#06140c', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, g);
    const w = el('path', { d: 'M836,70 L700,94 L560,300 L420,300', stroke: '#ff5148', 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '700', 'stroke-dashoffset': 700 }, g);
    const lb = el('text', { x: 24, y: 50, fill: '#ff5148', 'font-family': 'IBM Plex Mono', 'font-size': 26 }, g); lb.textContent = 'la onda entra por las bocas';
    RENDER.push(t => { if (on('sPlan')) { w.setAttribute('stroke-dashoffset', 700 * (1 - io(P(t, bo - .7, bo + .5)))); lb.setAttribute('opacity', P(t, bo - .7, bo - .3)); } });
  }
  // 2 · el andén visto desde arriba: Tomás en el medio, lejos de las dos escaleras
  { const g = il[1];
    el('rect', { x: 0, y: 0, width: 836, height: 440, fill: '#10151d' }, g);
    for (const y of [80, 340]) { el('rect', { x: 0, y, width: 836, height: 60, fill: '#0a0d12' }, g); for (const dy of [16, 44]) el('rect', { x: 0, y: y + dy, width: 836, height: 3, fill: '#5d636b' }, g); }
    el('rect', { x: 40, y: 150, width: 756, height: 180, rx: 6, fill: '#5a6068' }, g);
    for (const x of [40, 666]) { el('rect', { x, y: 150, width: 130, height: 180, fill: '#e0433a', opacity: .45 }, g); const tx = el('text', { x: x + 65, y: 248, 'text-anchor': 'middle', fill: '#fff', 'font-family': 'IBM Plex Mono', 'font-size': 20 }, g); tx.textContent = 'ESCALERA'; }
    const ring = el('circle', { cx: 418, cy: 240, r: 40, fill: 'none', stroke: '#5ee093', 'stroke-width': 5 }, g);
    el('circle', { cx: 418, cy: 240, r: 17, fill: '#f2f4f6' }, g); el('rect', { x: 400, y: 254, width: 36, height: 12, rx: 6, fill: '#ff7a1a' }, g);
    const tx = el('text', { x: 418, y: 120 - 50, 'text-anchor': 'middle', fill: '#5ee093', 'font-family': 'IBM Plex Mono', 'font-size': 26 }, g); tx.textContent = 'medio del andén';
    RENDER.push(t => { if (on('sPlan')) ring.setAttribute('r', 34 + 10 * ((t * 1.2) % 1)); });
  }
  // 3 · agua
  { const g = il[2];
    el('rect', { x: 0, y: 0, width: 836, height: 440, fill: '#0d1622' }, g);
    for (const [x, s] of [[300, 1], [418, 1.15], [536, 1]]) {
      const b = el('g', { transform: `translate(${x} 230) scale(${s})` }, g);
      el('path', { d: 'M-12,-150 H12 V-128 C12,-118 34,-110 34,-86 V120 Q34,140 14,140 H-14 Q-34,140 -34,120 V-86 C-34,-110 -12,-118 -12,-128 Z', fill: 'rgba(94,200,240,.18)', stroke: '#8fd8f5', 'stroke-width': 4 }, b);
      el('path', { d: 'M-30,-40 Q0,-48 30,-40 V118 Q30,136 14,136 H-14 Q-30,136 -30,118 Z', fill: '#5ec8f0', opacity: .55 }, b);
      el('rect', { x: -14, y: -168, width: 28, height: 20, rx: 4, fill: '#2f8fd0' }, b);
    }
  }
  // 4 · la radiación afuera cae rápido: regla del 7-10
  { const g = il[3], X = h => 90 + h / 48 * 690, Y = v => 360 - v * 290;
    el('rect', { x: 0, y: 0, width: 836, height: 440, fill: '#0e131b' }, g);
    const sh = el('rect', { x: X(0), y: 60, width: X(24) - X(0), height: 300, fill: '#e0433a', opacity: .14 }, g);
    el('line', { x1: X(0), y1: 360, x2: X(48), y2: 360, stroke: '#6d737c', 'stroke-width': 2 }, g); el('line', { x1: X(0), y1: 60, x2: X(0), y2: 360, stroke: '#6d737c', 'stroke-width': 2 }, g);
    for (const h of [1, 7, 24, 48]) { el('line', { x1: X(h), y1: 360, x2: X(h), y2: 370, stroke: '#6d737c', 'stroke-width': 2 }, g); const tx = el('text', { x: X(h), y: 400, 'text-anchor': 'middle', fill: '#8b919a', 'font-family': 'IBM Plex Mono', 'font-size': 22 }, g); tx.textContent = h + ' h'; }
    const yl = el('text', { x: 24, y: 40, fill: '#ffc142', 'font-family': 'IBM Plex Mono', 'font-size': 24 }, g); yl.textContent = 'radiación afuera';
    let d = ''; for (let h = 1; h <= 48; h += .25) d += (d ? ' L' : 'M') + X(h).toFixed(1) + ',' + Y(Math.pow(h, -1.2)).toFixed(1);
    const cv = el('path', { d, stroke: '#ffc142', 'stroke-width': 6, fill: 'none', 'stroke-dasharray': 1400, 'stroke-dashoffset': 1400 }, g);
    const m7 = el('g', { opacity: 0 }, g); el('circle', { cx: X(7), cy: Y(Math.pow(7, -1.2)), r: 9, fill: '#ffc142' }, m7);
    const t7 = el('text', { x: X(7) + 16, y: Y(Math.pow(7, -1.2)) - 14, fill: '#ffc142', 'font-family': 'IBM Plex Mono', 'font-size': 22 }, m7); t7.textContent = '7 h: 10 veces menos';
    const m24 = el('g', { opacity: 0 }, g); el('line', { x1: X(24), y1: 60, x2: X(24), y2: 360, stroke: '#5ee093', 'stroke-width': 4, 'stroke-dasharray': '8 8' }, m24);
    const t24 = el('text', { x: X(24) + 14, y: 100, fill: '#5ee093', 'font-family': 'Inter Var', 'font-weight': 800, 'font-size': 30 }, m24); t24.textContent = '24 h adentro';
    RENDER.push(t => {
      if (!on('sPlan')) return;
      cv.setAttribute('stroke-dashoffset', 1400 * (1 - io(P(t, it[3], it[3] + 1.6))));
      m24.setAttribute('opacity', P(t, AT('c16', 'veinticuatro') - .1, AT('c16', 'veinticuatro') + .3));
      m7.setAttribute('opacity', P(t, ph - .1, ph + .3));
      sh.setAttribute('opacity', (.14 + .2 * P(t, ph, ph + .4) * (.6 + .4 * Math.sin(t * 6))).toFixed(3));
    });
  }
  const rows = [...document.querySelectorAll('#plL .pr')];
  RENDER.push(t => {
    if (!on('sPlan')) return;
    $('plT').style.opacity = P(t, a, a + .3); $('plP').style.opacity = P(t, a + .1, a + .4);
    const cur = it.reduce((c, x, i) => t >= x - .15 ? i : c, -1);
    il.forEach((g, i) => g.setAttribute('opacity', i === Math.max(0, cur) ? P(t, it[i] - .15, it[i] + .1) || (i === 0 ? 1 : 0) : 0));
    rows.forEach((r, i) => {
      r.style.opacity = P(t, a + .3 + i * .08, a + .5 + i * .08);
      const k = P(t, it[i] + .2, it[i] + .4), bx = r.querySelector('.bx');
      bx.textContent = k > 0 ? '✓' : ''; bx.style.background = k > 0 ? '#4fc483' : 'transparent'; bx.style.borderColor = k > 0 ? '#4fc483' : '#4a5059';
      bx.style.transform = `scale(${k > 0 ? lerp(1.4, 1, back(k)) : 1})`;
      r.style.color = t >= it[i] - .15 ? '#fff' : '#6d737c';
    });
    const sk = P(t, rs - .15, rs + .15); $('plS').style.opacity = sk; $('plS').style.transform = `translate(-50%,-50%) rotate(-8deg) scale(${lerp(1.8, 1, eo(sk))})`;
  });
}
// ---------- 16 · 8:20, el mensaje de la hermana ----------
{
  const a = S('c18'), h20 = AT('c18', 'ocho y veinte'), ms = AT('c18', 'mensaje'), m1 = AT('c19', 'Estoy'), m2 = AT('c19', 'Venite');
  scene('sMsj', [a - .1, S('outro') + .4, .2, .3, 0], `<div class="ph"><img src="img/peru.jpg" style="filter:saturate(.3) brightness(.2) blur(10px)"></div>
    <div id="mHb" style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(224,67,58,0) 40%,rgba(224,67,58,.35));opacity:0"></div>
    <div id="mPh" style="position:absolute;left:250px;top:330px;width:580px;height:1140px;border-radius:70px;background:#0d0f13;border:3px solid #2c3038;box-shadow:0 40px 120px rgba(0,0,0,.7)">
      <div style="position:absolute;inset:16px;border-radius:56px;overflow:hidden;background:linear-gradient(#10141c,#0a0c11)">
        <div id="mLock"><div id="mHora" class="mono" style="position:absolute;left:0;right:0;top:120px;text-align:center;font-size:110px;color:#e8e6e1">08:19</div>
          <div id="mNot" style="position:absolute;left:24px;right:24px;top:300px;border-radius:30px;background:rgba(245,240,236,.96);color:#141414;padding:24px 28px;display:flex;gap:18px;align-items:center;opacity:0">
            <div style="width:70px;height:70px;border-radius:50%;background:#7a5af5;color:#fff;display:flex;align-items:center;justify-content:center;font:800 34px 'Inter Var'">H</div>
            <div><div style="font:800 32px 'Inter Var'">Hermana</div><div style="font:500 28px 'Inter Var';color:#555">Nuevo mensaje · 08:20</div></div></div></div>
        <div id="mChat" style="position:absolute;inset:0;opacity:0;background:#0e1117">
          <div style="height:150px;padding:70px 30px 0;display:flex;align-items:center;gap:18px;border-bottom:1px solid #222831;font:700 32px 'Inter Var'">
            <div style="width:60px;height:60px;border-radius:50%;background:#7a5af5;display:flex;align-items:center;justify-content:center;font:800 28px 'Inter Var'">H</div>Hermana</div>
          <div id="mB1" style="position:absolute;left:28px;top:190px;max-width:440px;padding:20px 26px;border-radius:28px 28px 28px 8px;background:#262c36;font:600 40px/1.2 'Inter Var'">Estoy en la calle.</div>
          <div id="mB2" style="position:absolute;left:28px;top:300px;white-space:nowrap;padding:20px 26px;border-radius:28px 28px 28px 8px;background:#262c36;font:700 44px/1.2 'Inter Var';color:#fff">Venite a buscarme.</div>
          <div id="mTy" style="position:absolute;left:28px;top:190px;padding:22px 26px;border-radius:28px;background:#262c36;display:flex;gap:10px"><i></i><i></i><i></i></div>
          <div class="mono" style="position:absolute;left:40px;top:410px;font-size:22px;color:#6d737c" id="mTs">08:20</div></div>
      </div></div>`);
  addCSS('#mTy i{width:14px;height:14px;border-radius:50%;background:#8b919a;display:block}');
  const dots = [...document.querySelectorAll('#mTy i')];
  RENDER.push(t => {
    if (!on('sMsj')) return;
    $('mHora').textContent = t >= h20 ? '08:20' : '08:19'; $('mHora').style.color = t >= h20 ? '#ff6a60' : '#e8e6e1';
    const n = back(P(t, ms - .1, ms + .3)); $('mNot').style.opacity = P(t, ms - .1, ms + .1); $('mNot').style.transform = `translateY(${lerp(-50, 0, n)}px)`;
    const op = P(t, m1 - 1.1, m1 - .8); $('mChat').style.opacity = op; $('mLock').style.opacity = 1 - op;
    $('mTy').style.opacity = P(t, m1 - .8, m1 - .7) * (1 - P(t, m1 - .05, m1));
    dots.forEach((d, i) => d.style.transform = `translateY(${-8 * Math.max(0, Math.sin(t * 9 - i * .8))}px)`);
    for (const [id, x] of [['mB1', m1], ['mB2', m2]]) { const k = back(P(t, x - .05, x + .25)); $(id).style.opacity = P(t, x - .05, x + .05); $(id).style.transform = `scale(${lerp(.7, 1, k)})`; $(id).style.transformOrigin = '0 100%'; }
    $('mTs').style.opacity = P(t, m2, m2 + .3);
    const cam = $('sMsj').firstElementChild; cam.style.transformOrigin = '60% 22%';
    cam.style.transform = `scale(${lerp(1, 1.32, io(P(t, m1 - 1, m1 + .4))).toFixed(4)})`;
    const vib = (t > ms && t < ms + .8) || (t > m2 && t < m2 + .5);
    const [sx, sy] = vib ? shake(t, 5, 29) : [0, 0];
    $('mPh').style.transform = `translate(${sx}px,${sy + lerp(500, 0, eo(P(t, a - .1, a + .8)))}px)`;
    $('mHb').style.opacity = (P(t, ms, ms + .5) * (.5 + .5 * Math.pow(Math.max(0, Math.sin(t * 7.5)), 6))).toFixed(3);
  });
}
// ---------- 17 · Parte 2 ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .5, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">continúa</div>
      <div id="fP" style="font:900 190px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">PARTE <span style="color:var(--red)">2</span></div>
      <div id="fQ" style="font:700 54px/1.15 'Inter Var';margin-top:34px">¿Vos qué harías?<br><span style="color:#aab0b8;font-weight:600">¿Salís a buscarla?</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para la parte 2</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
