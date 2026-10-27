// "Pasó de verdad" · Victor Ninov, parte 2. Historia real, todo animado y sin fotos.
// Se cuenta lo que concluyó la investigación del Laboratorio Lawrence Berkeley y se aclara que Ninov lo niega (ver PUBLICACION.md).
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'dos', 'a'], ['h1', 'elementos', 'a'], ['h1', 'nuevos', 'a'], ['h1', 'no', 'r'], ['h1', 'estaban', 'r'], ['h2', 'parte', 'a'], ['h2', 'dos', 'a'],
  ['c1', 'Abril', 'a'], ['c1', 'nueva', 'g'], ['c1', 'cadena', 'g'], ['c2', 'compañeros', 'a'], ['c2', 'nada', 'r'],
  ['c3', 'incómoda', 'r'], ['c3', 'tres', 'a'], ['c3', 'cadenas', 'a'], ['c4', 'único', 'r'], ['c4', 'bruto', 'a'],
  ['c5', 'originales', 'a'], ['c5', 'evento', 'a'], ['c6', 'no', 'r'], ['c6', 'estaban', 'r'], ['c7', 'retira', 'r'],
  ['c8', 'evidencia', 'r'], ['c8', 'clara', 'r'], ['c8', 'convincente', 'r'], ['c8', 'fabricados', 'r'], ['c9', 'despide', 'r'],
  ['c10', 'negó', 'g'], ['c10', 'nunca', 'g'], ['c11', 'Alemania', 'a'], ['c11', 'treinta', 'a'], ['c11', 'cuatro', 'a'], ['c11', 'tampoco', 'r'],
  ['c12', 'mantuvieron', 'g'], ['c12', 'reales', 'g'], ['c13', 'Existen', 'g'], ['c13', 'Rusia', 'a'], ['c13', 'receta', 'a'],
  ['c14', 'livermorio', 'a'], ['c14', 'oganesón', 'a'], ['c14', 'sin', 'r'], ['c15', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · RECREACIÓN ANIMADA', dia: 'AÑO', hide: S('c15') - .1,
  horas: [[S('h1') - .1, '1999'], [S('c1') - .1, '2001', true], [S('c8') - .1, '2002', true], [S('c13') - .1, '2006'], [S('c14') - .1, '2016']] });
CAPS_OFF(S('outro'), TL.duration + 1);

// silueta sin rasgos (cabeza y hombros) en un <g>, con borde de luz; mide unos 380 x 420 y apoya en y = 0
function silueta(parent, col = '#ffb23e', fid = 'slGl') {
  const g = el('g', {}, parent), d = 'M0,-415 C62,-415 102,-365 102,-300 C102,-245 74,-205 47,-190 L47,-165 C162,-145 252,-95 282,0 L-282,0 C-252,-95 -162,-145 -47,-165 L-47,-190 C-74,-205 -102,-245 -102,-300 C-102,-365 -62,-415 0,-415 Z';
  el('path', { d, fill: 'none', stroke: col, 'stroke-width': 12, opacity: .55, filter: `url(#${fid})` }, g);
  el('path', { d, fill: '#05070a' }, g);
  return g;
}
function filtroBrillo(svg, id = 'slGl') { const f = el('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, el('defs', {}, svg)); el('feGaussianBlur', { stdDeviation: 9 }, f); }
const sello = (id, txt, x, y, size = 92, extra = '') => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;padding:14px 30px;border:9px solid #ff5148;border-radius:16px;color:#ff5148;font:900 ${size}px/1 'Inter Var';text-align:center;opacity:0;background:rgba(24,4,4,.85);${extra}">${txt}</div>`;
const golpe = (id, t, a, rot = -6) => { const s = P(t, a - .05, a + .2), n = $(id); n.style.opacity = s; n.style.transform = `rotate(${rot}deg) scale(${lerp(1.7, 1, eo(s)).toFixed(3)})`; return s; };

SETUP.push(() => {
// ---------- 1 · Recapitulación: dos elementos nuevos que no estaban en los datos ----------
{
  const re = AT('h1', 'Cuando revisaron'), ne = AT('h1', 'no estaban');
  scene('sRec', [-1, S('h2') - .1, .01, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 35%,#1d1606,#05070a 65%)"></div>
    ${casillaG('rG1', 116, '?', 'NUEVO', 190, 360)}${casillaG('rG2', 118, '?', 'NUEVO', 600, 360)}
    ${crtHTML('rC', 64, 680, 850, 400, 'DATOS DEL DETECTOR · 1999', lineasDatos(9, 3).map((l, i) => i % 3 === 1 ? '' : l))}
    ${[0, 1, 2].map(i => `<div id="rV${i}" style="position:absolute;left:80px;top:${680 + 60 + (1 + 3 * i) * 34}px;width:818px;height:34px;border:3px dashed #ff5148;border-radius:6px;opacity:0"></div>`).join('')}
    ${sello('rS', 'NO ESTABAN', 220, 790)}`);
  ['rG1', 'rG2'].forEach(id => $(id).classList.add('oro'));
  RENDER.push(t => {
    if (!on('sRec')) return;
    ['rG1', 'rG2'].forEach((id, k) => { const q = P(t, .1 + k * .15, .4 + k * .15), n = $(id); n.style.opacity = q * (1 - .6 * P(t, ne, ne + .4)); n.style.transform = `scale(${lerp(.6, 1, back(q))})`; n.style.filter = `grayscale(${P(t, ne, ne + .4)})`; });
    const q = P(t, re - .3, re + .1); $('rC').style.opacity = q; $('rC').style.transform = `translateY(${lerp(80, 0, eo(q))}px)`;
    for (let i = 0; i < 3; i++) $('rV' + i).style.opacity = P(t, re + .3 + i * .2, re + .45 + i * .2) * q;
    golpe('rS', t, ne);
  });
}
// ---------- 2 · Parte 2 ----------
{
  const a = S('h2');
  scene('sP2', [a - .1, S('c1') - .1, .15, .2, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:620px;width:860px"><div id="p2L" style="height:6px;background:#e0433a;width:0"></div>
    <div id="p2T" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">PARTE <span style="color:#ff5148">2</span></div>
    <div id="p2S" class="lbl" style="position:static;margin-top:18px;font-size:28px;color:#cfd3d8;opacity:0">la cadena que solo él veía</div></div>`);
  RENDER.push(t => {
    if (!on('sP2')) return;
    $('p2L').style.width = 860 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('p2T').style.opacity = q; $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%';
    $('p2S').style.opacity = P(t, a + .4, a + .8);
  });
}
// ---------- 3 · Abril de 2001: el programa de Ninov encuentra una cadena; los demás, nada ----------
{
  const a = S('c1'), ca = AT('c1', 'nueva cadena'), b = S('c2'), co = AT('c2', 'compañeros'), na = AT('c2', 'nada');
  const L = lineasDatos(9, 41), LB = L.map((l, i) => i === 4 ? '' : l), Y0 = 740 + 60;
  scene('sOtr', [a - .1, S('c3') - .1, .2, .2, 0], `<div style="position:absolute;inset:0;background:#040605"></div>
    ${crtHTML('o3', 64, 330, 850, 380, 'PROGRAMA DE NINOV · ABRIL DE 2001', L)}${crtHTML('o4', 64, 740, 850, 380, 'PROGRAMAS DE SUS COMPAÑEROS · MISMO ARCHIVO', LB)}
    ${pill('o3P', 'CADENA 118', 330 + 60 + 4 * 34 - 2, '#5ee093', 'color:#06140a;font-size:22px;padding:4px 14px;left:720px')}
    <div id="oS" style="position:absolute;left:84px;width:810px;height:4px;background:#8fd0ff;box-shadow:0 0 22px #8fd0ff;opacity:0"></div>
    <div id="oV" style="position:absolute;left:80px;top:${Y0 + 4 * 34}px;width:818px;height:34px;border:3px dashed #ff5148;border-radius:6px;opacity:0"></div>
    ${sello('oN', 'NADA', 330, 860, 110)}`);
  addCSS(`#o4 .ln{color:#8fd0ff;text-shadow:0 0 8px rgba(120,200,255,.5)} #o4 .tt{background:#8fd0ff} #o4{box-shadow:0 0 0 2px #2a3038,0 40px 90px rgba(0,0,0,.7),inset 0 0 90px rgba(120,200,255,.12)}`);
  const cam = $$('#sOtr .cam');
  RENDER.push(t => {
    if (!on('sOtr')) return;
    [...$$('#o3 .ln').children].forEach((d, i) => d.style.opacity = P(t, a - .1 + i * .3, a + i * .3));
    marcarLinea('o3', 4, t > ca + .1, '#5ee093', '#06140a'); aparece('o3P', t, ca + .15);
    const q = P(t, b - .15, b + .25); $('o4').style.opacity = q; $('o4').style.transform = `translateY(${lerp(60, 0, eo(q))}px)`;
    const k = P(t, co - .2, na - .1); $('oS').style.top = (Y0 + 4 + k * (4 * 34 + 13)) + 'px'; $('oS').style.opacity = P(t, co - .3, co - .1) * (1 - P(t, na, na + .3));
    $('oV').style.opacity = P(t, na - .15, na) * (Math.floor(t * 4) % 2 ? .6 : 1);
    golpe('oN', t, na);
    const [sx, sy] = shake(t, t > na ? 10 * (1 - P(t, na, na + .4)) : 0);
    cam.style.transform = `translate(${sx}px,${sy}px) scale(${lerp(1, 1.04, io(P(t, a, S('c3'))))})`;
  });
}
// ---------- 4 · ¿Y las tres cadenas de 1999? ----------
{
  const a = S('c3'), pr = AT('c3', 'pregunta'), tr = AT('c3', 'tres cadenas'), y99 = AT('c3', 'mil novecientos');
  scene('sPre', [a - .1, S('c4') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#1a1508,#05070a 65%)"></div>
    <div id="pQ" style="position:absolute;left:64px;top:340px;font:900 110px/1.02 'Inter Var';letter-spacing:-.02em;opacity:0">¿Y LAS<br>DE <span id="pQ99">1999</span>?</div>
    ${[0, 1, 2].map(i => `<div id="pC${i}" class="card" style="left:${64 + i * 285}px;top:700px;width:255px;height:330px;padding:22px;opacity:0;border-color:#ffc142">
      <div class="mono" style="font-size:20px;color:#ffc142;letter-spacing:.14em">CADENA ${i + 1}</div><div class="mono" style="font-size:18px;color:#8b919a;margin-top:6px">1999</div>
      ${[118, 116, 114, 112, 110, 108, 106].map((z, k) => `<div style="position:absolute;left:${22 + k * 26}px;top:${100 + k * 28}px;width:44px;height:28px;border-radius:5px;background:${k ? '#2a3442' : '#e0a42a'};font:600 13px 'IBM Plex Mono';color:${k ? '#aab3bd' : '#2a1a00'};text-align:center;line-height:28px">${z}</div>`).join('')}
      <div class="pq" style="position:absolute;right:18px;top:12px;font:900 64px 'Inter Var';color:#ffc142">?</div></div>`).join('')}`);
  RENDER.push(t => {
    if (!on('sPre')) return;
    const q = P(t, pr - .2, pr + .2); $('pQ').style.opacity = q; $('pQ99').style.color = t > y99 - .1 ? '#ffc142' : '#ecebe6'; $('pQ').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`;
    for (let i = 0; i < 3; i++) { const k = P(t, tr - .2 + i * .18, tr + .1 + i * .18), n = $('pC' + i); n.style.opacity = k; n.style.transform = `translateY(${lerp(60, 0, eo(k))}px) rotate(${(i - 1) * 2 * Math.sin(t * 2 + i)}deg)`; }
  });
}
// ---------- 5 · Solo Ninov trabajó con los datos en bruto ----------
{
  const a = S('c4'), un = AT('c4', 'único'), br = AT('c4', 'bruto');
  scene('sBru', [a - .1, S('c5') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:#06080b"></div><svg class="full" id="vBr" viewBox="0 0 1080 1920"></svg>
    ${pill('bT', 'EXPERIMENTO DE 1999', 330, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px')}`);
  const svg = $('vBr'); filtroBrillo(svg, 'brGl');
  // cinta de datos → Ninov → resultado → el resto del equipo
  const cinta = el('g', { transform: 'translate(170 560)', opacity: 0 }, svg);
  for (const dx of [-55, 55]) { el('circle', { cx: dx, cy: 0, r: 48, fill: '#1a222c', stroke: '#8fd0ff', 'stroke-width': 4 }, cinta); el('circle', { cx: dx, cy: 0, r: 12, fill: '#8fd0ff' }, cinta); }
  el('rect', { x: -110, y: 48, width: 220, height: 8, fill: '#8fd0ff' }, cinta);
  etiqueta(cinta, 'DATOS EN BRUTO', 0, 100, { size: 24, w: 600, anchor: 'middle', col: '#8fd0ff' });
  const fl1 = flecha(svg, 300, 560, 420, 560, '#ffc142', 10); fl1.setAttribute('opacity', 0);
  const nin = el('g', { transform: 'translate(540 650) scale(.42)', opacity: 0 }, svg); silueta(nin, '#ffb23e', 'brGl');
  const lN = etiqueta(svg, 'NINOV', 540, 700, { size: 28, w: 700, anchor: 'middle', col: '#ffc142' }); lN.setAttribute('opacity', 0);
  const fl2 = flecha(svg, 660, 560, 760, 560, '#ffc142', 10); fl2.setAttribute('opacity', 0);
  const hoja = el('g', { transform: 'translate(840 560)', opacity: 0 }, svg);
  el('rect', { x: -70, y: -90, width: 140, height: 180, rx: 8, fill: '#e9e2cf' }, hoja);
  etiqueta(hoja, '3 CADENAS', 0, -45, { size: 20, w: 700, anchor: 'middle', col: '#2a1a00', ls: 1 });
  for (let i = 0; i < 4; i++) el('rect', { x: -50, y: -20 + i * 24, width: 100 - (i % 2) * 30, height: 9, fill: '#b9ae96' }, hoja);
  const equipo = [], ys = 930;
  for (let i = 0; i < 5; i++) { const g = el('g', { opacity: 0 }, svg); persona(g, 220 + i * 160, ys, 1.6, { col: '#4a5562' }); equipo.push(g); }
  const lE = etiqueta(svg, 'EL RESTO DEL EQUIPO: CONFIABA EN SU ANÁLISIS', 540, 990, { size: 22, anchor: 'middle', col: '#8b919a' }); lE.setAttribute('opacity', 0);
  const lin = []; for (let i = 0; i < 5; i++) lin.push(el('path', { d: `M840,650 L${220 + i * 160},${ys - 130}`, stroke: '#8b919a', 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0 }, svg));
  const halo = el('circle', { cx: 540, cy: 520, r: 130, fill: 'none', stroke: '#ff5148', 'stroke-width': 5, opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('sBru')) return;
    aparece('bT', t, a);
    cinta.setAttribute('opacity', P(t, a, a + .3)); nin.setAttribute('opacity', P(t, a + .3, a + .6)); lN.setAttribute('opacity', P(t, a + .3, a + .6));
    fl1.setAttribute('opacity', P(t, br - .3, br)); fl2.setAttribute('opacity', P(t, a + .9, a + 1.2)); hoja.setAttribute('opacity', P(t, a + 1, a + 1.3));
    equipo.forEach((g, i) => g.setAttribute('opacity', P(t, a + 1.2 + i * .1, a + 1.5 + i * .1)));
    lin.forEach((l, i) => l.setAttribute('opacity', .7 * P(t, a + 1.5 + i * .1, a + 1.8 + i * .1))); lE.setAttribute('opacity', P(t, a + 1.6, a + 2));
    halo.setAttribute('opacity', P(t, un - .1, un + .2) * (.6 + .4 * Math.sin(t * 8)));
  });
}
// ---------- 6 · Vuelven a los archivos originales, evento por evento ----------
{
  const a = S('c5'), ev = AT('c5', 'evento por evento'), ot = AT('c5', 'otros programas');
  scene('sRev', [a - .1, S('c6') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:#04060a"></div>
    ${crtHTML('rv', 64, 330, 850, 640, 'NUEVO ANÁLISIS · DATOS ORIGINALES DE 1999', lineasDatos(200, 77))}
    <div id="rvS" style="position:absolute;left:84px;top:${330 + 60 + 5 * 34}px;width:810px;height:34px;border:3px solid #8fd0ff;border-radius:6px;box-shadow:0 0 24px rgba(143,208,255,.6);opacity:0"></div>
    <div class="card" id="rvB" style="left:64px;top:1000px;width:850px;padding:16px 22px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em;display:flex;justify-content:space-between"><span>11 DÍAS DE DATOS</span><span id="rvD">DÍA 1</span></div>
      <div style="height:16px;background:#1a222c;border-radius:8px;margin-top:10px;overflow:hidden"><div id="rvP" style="height:100%;width:0;background:#8fd0ff"></div></div></div>`);
  addCSS(`#rv .ln{color:#8fd0ff;text-shadow:0 0 8px rgba(120,200,255,.5)} #rv .tt{background:#8fd0ff}`);
  RENDER.push(t => {
    if (!on('sRev')) return;
    const k = P(t, a, S('c6') - .1), s = 34 * Math.floor(k * 180);
    $$('#rv .ln').style.transform = `translateY(${-s}px)`;
    $('rvS').style.opacity = P(t, ev - .3, ev);
    $('rvB').style.opacity = P(t, a + .2, a + .5); $('rvP').style.width = (100 * k).toFixed(1) + '%'; $('rvD').textContent = 'DÍA ' + Math.min(11, 1 + Math.floor(k * 11));
  });
}
// ---------- 7 · Las tres cadenas no estaban ----------
{
  const a = S('c6'), ne = AT('c6', 'no estaban');
  scene('sNo3', [a - .1, S('c7') - .1, .15, .2, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1e0605,#050304 70%)"></div><svg class="full" id="vN3" viewBox="0 0 1080 1920"></svg>
    ${[0, 1, 2].map(i => `<div id="nC${i}" style="position:absolute;left:${64 + i * 285}px;top:520px;width:255px;height:330px;border:4px dashed #6b737d;border-radius:22px;opacity:0">
      <div class="mono" style="position:absolute;left:22px;top:20px;font-size:20px;color:#8b919a;letter-spacing:.14em">CADENA ${i + 1}</div></div>`).join('')}
    ${sello('nS', 'NO ESTABAN', 210, 340, 100)}`);
  const svg = $('vN3'), X = [];
  for (let i = 0; i < 3; i++) { const g = el('g', { opacity: 0, transform: `translate(${191 + i * 285} 700)` }, svg); el('path', { d: 'M-70,-70 L70,70 M70,-70 L-70,70', stroke: '#ff5148', 'stroke-width': 18, 'stroke-linecap': 'round' }, g); X.push(g); }
  RENDER.push(t => {
    if (!on('sNo3')) return;
    for (let i = 0; i < 3; i++) {
      const q = P(t, a + i * .12, a + .25 + i * .12); $('nC' + i).style.opacity = q; $('nC' + i).style.borderColor = t > ne ? '#ff5148' : '#6b737d';
      const k = P(t, ne - .05 + i * .12, ne + .15 + i * .12); X[i].setAttribute('opacity', k); X[i].setAttribute('transform', `translate(${191 + i * 285} 700) scale(${lerp(1.6, 1, eo(k))})`);
    }
    golpe('nS', t, ne + .4, -4);
  });
}
// ---------- 8 · Julio de 2001: Berkeley retira el descubrimiento ----------
{
  const a = S('c7'), re = AT('c7', 'retira');
  scene('sRet', [a - .1, S('c8') - .1, .2, .2, 1.04], tablaHTML('tR', { hasta: 112, top: 610, simb: { 116: '?', 118: '?' } }) +
    `<div id="rD" style="position:absolute;left:84px;top:340px;width:760px;padding:26px 30px;background:#ece6d6;color:#16120c;border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,.6);opacity:0">
      <div style="font:600 18px 'IBM Plex Mono';letter-spacing:.18em;color:#7a6a50">LABORATORIO BERKELEY · 27 DE JULIO DE 2001</div>
      <div style="font:800 44px/1.1 'Inter Var';margin-top:12px">Se retira el anuncio de los elementos 116 y 118</div>
      <div style="height:12px;background:#cfc4ac;margin-top:16px;width:90%"></div><div style="height:12px;background:#cfc4ac;margin-top:10px;width:70%"></div>
      <div class="mono" style="font-size:16px;color:#8a7a60;margin-top:14px;letter-spacing:.12em">RECREACIÓN</div></div>
    ${sello('rtS', 'RETIRADO', 470, 430, 70)}`);
  RENDER.push(t => {
    if (!on('sRet')) return;
    for (let z = 1; z <= 118; z++) $('tRz' + z).style.opacity = .85;
    for (const z of [116, 118]) { const c = $('tRz' + z); c.classList.toggle('oro', t < re + .1); c.style.opacity = t < re + .1 ? 1 : .35; }
    const q = P(t, a, a + .35); $('rD').style.opacity = q; $('rD').style.transform = `rotate(-2deg) translateY(${lerp(40, 0, eo(q))}px)`;
    golpe('rtS', t, re, -10);
  });
}
// ---------- 9 · El informe: "evidencia clara y convincente" ----------
{
  const a = S('c8'), cl = AT('c8', 'clara'), co = ATE('c8', 'convincente'), fa = AT('c8', 'fabricados'), rs = AT('c8', 'responsable');
  scene('sInf', [a - .1, S('c9') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:#08090c"></div><svg class="full" id="vIn" viewBox="0 0 1080 1920"></svg>
    <div id="iD" style="position:absolute;left:84px;top:340px;width:780px;padding:30px 34px;background:#f0ebdf;color:#16120c;border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,.6);opacity:0">
      <div style="font:600 18px 'IBM Plex Mono';letter-spacing:.18em;color:#7a6a50">INFORME DEL COMITÉ DE INVESTIGACIÓN · MARZO DE 2002</div>
      <div style="height:11px;background:#d4cab3;margin-top:22px;width:94%"></div><div style="height:11px;background:#d4cab3;margin-top:10px;width:86%"></div>
      <div style="font:700 40px/1.3 'Inter Var';margin-top:22px">Hay <span id="iH" style="background:linear-gradient(#ffd75a,#ffd75a) no-repeat 0 85%/0% 40%">evidencia clara y convincente</span> de que los datos de 1999 <span id="iF" style="background:linear-gradient(#ff8a80,#ff8a80) no-repeat 0 85%/0% 40%">fueron fabricados</span>.</div>
      <div id="iR" style="font:700 34px/1.3 'Inter Var';margin-top:18px;opacity:0">Responsable, según el informe: <span style="color:#b3221a">Victor Ninov</span>.</div>
      <div style="height:11px;background:#d4cab3;margin-top:22px;width:80%"></div>
      <div class="mono" style="font-size:16px;color:#8a7a60;margin-top:16px;letter-spacing:.12em">RECREACIÓN · TRADUCCIÓN</div></div>`);
  RENDER.push(t => {
    if (!on('sInf')) return;
    const q = P(t, a, a + .35); $('iD').style.opacity = q; $('iD').style.transform = `translateY(${lerp(50, 0, eo(q))}px) rotate(1deg)`;
    $('iH').style.backgroundSize = `${(100 * P(t, cl - .1, co)).toFixed(1)}% 40%`;
    $('iF').style.backgroundSize = `${(100 * P(t, fa - .1, fa + .5)).toFixed(1)}% 40%`;
    $('iR').style.opacity = P(t, rs - .1, rs + .2);
  });
}
// ---------- 10 · Mayo de 2002: lo despiden ----------
{
  const a = S('c9'), de = AT('c9', 'despide');
  scene('sDes', [a - .1, S('c10') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:#06080b"></div>
    <div class="card" id="dK" style="left:64px;top:340px;width:340px;padding:0;overflow:hidden;opacity:0"><div style="background:#c3332b;color:#fff;font:700 24px 'IBM Plex Mono';letter-spacing:.2em;padding:12px 0;text-align:center">MAYO</div>
      <div style="font:900 120px/1.2 'Inter Var';text-align:center">2002</div></div>
    <div class="card" id="dC" style="left:180px;top:620px;width:620px;height:370px;padding:28px;opacity:0">
      <div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">CREDENCIAL DEL LABORATORIO</div>
      <div style="display:flex;gap:26px;margin-top:22px;align-items:center"><div style="width:150px;height:180px;border-radius:12px;background:#1a222c;position:relative;overflow:hidden"><svg viewBox="-300 -430 600 440" style="position:absolute;inset:0;width:100%;height:100%"><path d="M0,-415 C62,-415 102,-365 102,-300 C102,-245 74,-205 47,-190 L47,-165 C162,-145 252,-95 282,0 L-282,0 C-252,-95 -162,-145 -47,-165 L-47,-190 C-74,-205 -102,-245 -102,-300 C-102,-365 -62,-415 0,-415 Z" fill="#3a4656"/></svg></div>
      <div><div style="font:800 46px/1.05 'Inter Var'">VICTOR<br>NINOV</div><div class="mono" style="font-size:20px;color:#8b919a;margin-top:12px">Física nuclear</div></div></div></div>
    ${sello('dS', 'DESPEDIDO', 250, 760, 92)}`);
  RENDER.push(t => {
    if (!on('sDes')) return;
    const q = P(t, a, a + .3); $('dK').style.opacity = q; $('dK').style.transform = `rotateX(${lerp(80, 0, eo(q))}deg)`;
    const k = P(t, a + .3, a + .6); $('dC').style.opacity = k; $('dC').style.transform = `translateY(${lerp(40, 0, eo(k))}px)`;
    golpe('dS', t, de, -8); $('dC').style.filter = `grayscale(${P(t, de, de + .3)}) brightness(${1 - .35 * P(t, de, de + .3)})`;
  });
}
// ---------- 11 · Su versión: siempre lo negó ----------
{
  const a = S('c10'), di = AT('c10', 'Dijo');
  scene('sNie', [a - .1, S('c11') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 75%,#0f2230,#05080a 62%)"></div><svg class="full" id="vNe" viewBox="0 0 1080 1920"></svg>
    ${pill('neT', 'SU VERSIÓN', 330, '#2f8f5b')}
    <div id="neQ" class="card" style="left:64px;top:400px;width:820px;padding:24px 30px;opacity:0;border-color:#5ee093"><div style="font:700 42px/1.22 'Inter Var'">«En ningún momento participé, a sabiendas, en ninguna forma de tergiversación de datos.»</div>
      <div class="mono" style="font-size:19px;color:#8b919a;margin-top:14px;letter-spacing:.12em">VICTOR NINOV · 2002 · TRADUCCIÓN</div></div>`);
  const svg = $('vNe'); filtroBrillo(svg, 'neGl');
  const s = el('g', { transform: 'translate(540 1215) scale(.95)' }, svg); silueta(s, '#8fd0ff', 'neGl');
  RENDER.push(t => {
    if (!on('sNie')) return;
    aparece('neT', t, a);
    const q = P(t, di - .3, di + .1); $('neQ').style.opacity = q; $('neQ').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`;
  });
}
// ---------- 12 · Alemania revisa sus propios datos: 34 cadenas, dos no estaban ----------
{
  const a = S('c11'), rv = AT('c11', 'revisaron'), pd = AT('c11', 'descubrimientos'), tc = AT('c11', 'treinta y cuatro'), dt = AT('c11', 'dos tampoco'), an = AT('c12', 'análisis'), ma = AT('c12', 'mantuvieron'), rl = AT('c12', 'reales');
  const malas = { 3: '110 · 1994', 24: '112 · 1996' };
  scene('sGSI', [a - .1, S('c13') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:#05080c"></div>
    ${pill('gT', 'GSI · DARMSTADT, ALEMANIA', 330, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:26px')}
    <div id="gH" style="position:absolute;left:64px;top:430px;font:900 76px/1.05 'Inter Var';opacity:0">Revisan sus<br><span style="color:#8fd0ff">propios datos</span></div>
    <div id="gN" class="mono" style="position:absolute;left:640px;top:336px;font-size:30px;color:#ffc142;opacity:0">34 CADENAS</div>
    ${Array.from({ length: 34 }, (_, i) => `<div id="gk${i}" style="position:absolute;left:${64 + (i % 7) * 116}px;top:${410 + Math.floor(i / 7) * 80}px;width:102px;height:66px;border-radius:10px;background:#1a2430;border:2px solid #34414f;opacity:0;font:600 15px 'IBM Plex Mono';color:#fff;text-align:center;line-height:62px">${malas[i] || ''}</div>`).join('')}
    ${pill('gA', 'ANÁLISIS EN LOS QUE TRABAJÓ NINOV', 830, '#c3332b', 'font-size:24px')}
    <div id="gE" style="position:absolute;left:0;top:0;opacity:0">${casillaG('gz110', 110, 'Ds', '1994', 64, 900)}${casillaG('gz111', 111, 'Rg', '1994', 314, 900)}${casillaG('gz112', 112, 'Cn', '1996', 564, 900)}</div>`);
  addCSS('#sGSI .ptG{height:200px} #sGSI .ptG i{top:52px;font-size:88px}');
  RENDER.push(t => {
    if (!on('sGSI')) return;
    aparece('gT', t, a);
    $('gN').style.opacity = P(t, tc - .1, tc + .2);
    for (let i = 0; i < 34; i++) {
      const n = $('gk' + i), q = P(t, tc - .3 + i * .025, tc - .1 + i * .025), mala = i in malas;
      n.style.opacity = q * (t > an && !mala ? .55 + .45 * P(t, ma, ma + .3) : 1);
      n.style.transform = `scale(${lerp(.4, 1, back(q))})`;
      const roja = mala && t > dt, verde = !mala && t > ma + i * .015;
      n.style.background = roja ? '#5a1210' : verde ? '#123a26' : '#1a2430'; n.style.borderColor = roja ? '#ff5148' : verde ? '#5ee093' : '#34414f';
      n.style.color = roja ? '#ffb0a8' : 'transparent';
    }
    aparece('gA', t, an); $('gA').style.opacity = P(t, an - .05, an + .3) * (1 - P(t, ma - .3, ma));
    $('gH').style.opacity = P(t, rv - .2, rv + .1) * (1 - P(t, tc - .5, tc - .2));
    $('gE').style.opacity = P(t, pd - .2, pd + .1);
    ['gz110', 'gz111', 'gz112'].forEach((id, i) => { const n = $(id), k = P(t, ma + i * .12, ma + .3 + i * .12); n.style.borderColor = k > 0 ? '#5ee093' : 'rgba(255,255,255,.14)';
      n.style.transform = `scale(${lerp(.85, 1, back(k))})`; n.querySelector('u').textContent = k > 0 ? 'SE MANTIENE' : ['1994', '1994', '1996'][i]; n.querySelector('u').style.color = k > 0 ? '#5ee093' : ''; });
  });
}
// ---------- 13 · El 116 y el 118 existen: Dubna, con científicos de Estados Unidos ----------
{
  const a = S('c13'), ex = AT('c13', 'Existen'), ru = AT('c13', 'Rusia'), eu = AT('c13', 'Estados Unidos'), rc = AT('c13', 'otra receta');
  scene('sDub', [a - .1, AT('c14', 'livermorio') - .4, .2, .2, 0], `<svg class="full" id="vDu" viewBox="0 0 1080 1920"></svg>
    <div id="dDim" style="position:absolute;inset:0;background:#05070a;opacity:0"></div>
    <div id="dR" style="position:absolute;inset:0;opacity:0"><div class="lbl" style="left:64px;top:330px;color:#5ee093">LA RECETA QUE SÍ FUNCIONÓ</div>
      <div style="position:absolute;left:64px;top:390px;display:flex;align-items:center;gap:22px;font:900 80px 'Inter Var'">
        <div class="ptG" style="position:relative;width:200px;height:200px"><b>20</b><i style="top:50px;font-size:84px">Ca</i><u>CALCIO</u></div>+
        <div class="ptG" style="position:relative;width:200px;height:200px"><b>98</b><i style="top:50px;font-size:84px">Cf</i><u>CALIFORNIO</u></div>
        <span style="color:#ffc142">= 118</span></div></div>`);
  const G = globo($('vDu'), { r: 520, cy: 1000, paises: { '643': '#7a3a3a', '840': '#2f4f7a' } });
  const arc = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 5, 'stroke-dasharray': '14 10' }, G.top);
  const pin = (txt, an = 'start') => { const g = el('g', {}, G.top); el('circle', { r: 11, fill: '#ffc142' }, g); etiqueta(g, txt, an === 'end' ? -24 : 24, -22, { size: 28, w: 600, col: '#ffe2a0', anchor: an }); return g; };
  const pD = pin('DUBNA · RUSIA', 'end'), pL = pin('LIVERMORE · EE.UU.');
  const big = el('g', { opacity: 0 }, $('vDu')); etiqueta(big, 'EXISTEN', 64, 470, { size: 120, w: 900, col: '#5ee093', font: 'Inter Var', ls: 0 });
  RENDER.push(t => {
    if (!on('sDub')) return;
    const k1 = io(P(t, a - .1, ru + .3)), k2 = io(P(t, ru + .3, eu + .4));
    // primero Dubna de cerca; después se aleja hacia el polo norte para que entren Dubna y Livermore
    const lam = t < ru + .3 ? lerp(-10, -37.17, k1) : lerp(-37.17, 40, k2), phi = t < ru + .3 ? lerp(-20, -56.73, k1) : lerp(-56.73, -62, k2);
    G.update([lam, phi, 0], t < ru + .3 ? lerp(560, 1300, k1) : lerp(1300, 600, k2));
    for (const [p, k] of [[pD, 'dubna'], [pL, 'livermore']]) { const xy = G.xy(LUGAR[k]); p.setAttribute('opacity', xy ? 1 : 0); if (xy) p.setAttribute('transform', `translate(${xy[0]} ${xy[1]})`); }
    arc.setAttribute('d', t > eu - .4 ? arcoGeo(G.path, LUGAR.livermore, LUGAR.dubna, P(t, eu - .4, eu + .6)) || '' : ''); arc.setAttribute('opacity', 1 - P(t, rc - .3, rc));
    big.setAttribute('opacity', P(t, ex - .1, ex + .15) * (1 - P(t, ru - .2, ru)));
    $('dDim').style.opacity = .6 * P(t, rc - .3, rc); $('dR').style.opacity = P(t, rc - .2, rc + .1);
  });
}
// ---------- 14 · Livermorio y oganesón: la tabla se completó sin él ----------
{
  const a = S('c14'), lv = AT('c14', 'livermorio'), og = AT('c14', 'oganesón'), co = AT('c14', 'se completó'), si = AT('c14', 'sin él');
  scene('sTab', [lv - .5, S('c15') - .1, .2, .2, 1.04], tablaHTML('tT', { top: 690, cw: 46, gap: 3, left: 64 }) +
    `${casillaG('tLv', 116, 'Lv', 'LIVERMORIO', 120, 370)}${casillaG('tOg', 118, 'Og', 'OGANESÓN', 600, 370)}
    <div id="tC" class="lbl" style="left:64px;top:630px;color:#5ee093;font-size:26px;opacity:0">118 DE 118</div>`);
  ['tLv', 'tOg'].forEach(id => $(id).classList.add('oro'));
  RENDER.push(t => {
    if (!on('sTab')) return;
    for (let z = 1; z <= 118; z++) {
      const c = $('tTz' + z), d = Math.hypot(...posTabla(z).map((v, i) => v - [7, 18][i]));
      c.style.opacity = .55 + .45 * P(t, co + d * .05, co + .2 + d * .05);
      c.classList.toggle('oro', (z === 116 && t > lv) || (z === 118 && t > og));
      c.classList.toggle('verde', z !== 116 && z !== 118 && t > co + d * .05);
    }
    for (const [id, tz] of [['tLv', lv], ['tOg', og]]) { const q = P(t, tz - .1, tz + .25); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(.5, 1, back(q))})`; }
    $('tC').style.opacity = P(t, co, co + .3);
  });
}
// ---------- 15 · ¿Vos le creés? ----------
{
  const a = S('c15'), co = AT('c15', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 110px/1.02 'Inter Var';opacity:0">¿VOS LE<br><span style="color:#ffc142">CREÉS?</span></div>
    <div id="cL" style="position:absolute;left:64px;top:620px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 4; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
    <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => {
    if (!on('sCom')) return;
    const q = P(t, a, a + .3); $('cQ').style.opacity = q; $('cQ').style.transform = `translateY(${lerp(20, 0, eo(q))}px)`;
    cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; });
  });
}
// ---------- 16 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a1306,#050403 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">historias reales · todo animado</div>
      <div id="fP" style="font:900 150px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">PASÓ DE<br><span style="color:var(--amber)">VERDAD</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para más</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.2, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fS').style.opacity = P(t, a + .9, a + 1.2);
  });
}
});
