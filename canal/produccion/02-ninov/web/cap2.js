// Capítulo II · La receta: la predicción de Smolańczuk, criptón contra plomo, once días de acelerador y tres cadenas.
SETUP.push(() => {
chapterCard('h_ch2', 'cap2', 'II', 'La receta', 'Berkeley, California · 1999');
// gráfico esquemático: cuanto más pesado el elemento, menos probable el choque
function grafico(svg, x0, y0, w, h) {
  const g = el('g', {}, svg);
  el('path', { d: `M${x0},${y0} V${y0 + h} H${x0 + w}`, stroke: '#4a5059', 'stroke-width': 3, fill: 'none' }, g);
  etiqueta(g, 'PROBABILIDAD DE QUE EL CHOQUE FUNCIONE', x0, y0 - 24, { size: 20, col: '#8b919a' });
  etiqueta(g, 'ELEMENTO', x0 + w, y0 + h + 70, { size: 20, col: '#8b919a', anchor: 'end' });
  const X = z => x0 + (z - 100) / 18 * w, Y = z => y0 + 30 + (h - 60) * (1 - Math.exp(-(z - 100) / 5.5)) * 1.0;
  for (const z of [100, 104, 108, 112, 116, 118]) etiqueta(g, z, X(z), y0 + h + 34, { size: 22, anchor: 'middle', col: '#aab3bd' });
  let d = ''; for (let z = 100; z <= 118.01; z += .25) d += (d ? ' L' : 'M') + X(z).toFixed(1) + ',' + Y(z).toFixed(1);
  const curva = el('path', { d, fill: 'none', stroke: '#ff6a5c', 'stroke-width': 5, pathLength: 1, 'stroke-dasharray': '0 1' }, g);
  return { g, X, Y, curva };
}
// ---------- 1 · Cuanto más arriba en la tabla, menos probable ----------
{
  const a = S('c40'), c41 = S('c41'), c42 = S('c42'), se = AT('c42', 'semanas'), un = AT('c42', 'uno o dos'), b = S('c43');
  scene('h_pro', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vPr" viewBox="0 0 1920 1080"></svg>
    <div id="prC" class="card" style="left:1230px;top:300px;width:580px;padding:26px 30px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">LOS ÚLTIMOS ELEMENTOS</div>
      <div style="font:600 46px Inter;margin-top:8px">Semanas de choques</div><div style="display:flex;gap:8px;margin-top:22px">${Array.from({ length: 21 }, (_, i) => `<div class="prD" style="flex:1;height:44px;border-radius:5px;background:#1a222c"></div>`).join('')}</div>
      <div class="mono" style="display:flex;justify-content:space-between;font-size:18px;color:#8b919a;margin-top:8px"><span>SEMANA 1</span><span>SEMANA 3</span></div>
      <div id="prA" style="font:600 40px Inter;margin-top:20px;color:#ffc142;opacity:0">1 o 2 átomos</div></div><div class="rec">Esquema</div>`);
  const G = grafico($('vPr'), 160, 200, 940, 640);
  RENDER.push(t => {
    if (!on('h_pro')) return;
    G.g.setAttribute('opacity', P(t, a, a + .6)); G.curva.style.strokeDasharray = `${io(P(t, c41 - .2, c42)).toFixed(4)} 1`;
    $('prC').style.opacity = P(t, c42 - .2, c42 + .3);
    [...document.querySelectorAll('.prD')].forEach((d, i) => { const on1 = t > se + i * .07; d.style.background = on1 ? (i === 9 || i === 17 ? '#e0a42a' : '#2a3442') : '#1a222c'; });
    $('prA').style.opacity = P(t, un - .1, un + .3);
  });
}
// ---------- 2 · Smolańczuk y su cálculo: criptón contra plomo ----------
{
  const a = S('c43'), cs = AT('c43', 'cálculo'), c44 = S('c44'), kr = AT('c44', 'criptón'), ma = AT('c44', 'mucho más alta'), b = S('c45');
  scene('h_smo', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="smB" style="position:absolute;left:110px;top:150px;width:860px;height:560px;border-radius:10px;background:#16261f;border:14px solid #3a2c1e;box-shadow:0 40px 100px rgba(0,0,0,.6);opacity:0">
      <div id="smE" style="position:absolute;left:50px;top:70px;font:500 66px 'Cormorant Garamond';color:#e8efe9;white-space:nowrap"></div>
      <div id="smE2" style="position:absolute;left:50px;top:190px;font:500 40px 'Cormorant Garamond';color:#cfe0d4;opacity:.8;white-space:nowrap"></div>
      <div id="smE3" style="position:absolute;left:50px;top:270px;font:500 40px 'Cormorant Garamond';color:#cfe0d4;opacity:.8;white-space:nowrap"></div></div>
    <svg class="full" id="vSm" viewBox="0 0 1920 1080"></svg>
    ${zocalo('smZ', 'Físico teórico · Polonia', 'Robert Smolańczuk', 'Becario Fulbright en Berkeley')}<div class="rec">Esquema</div>`);
  const G = grafico($('vSm'), 1080, 240, 700, 480); G.curva.style.strokeDasharray = '1 1';
  const pt = el('g', { opacity: 0 }, G.g), [px, py] = [G.X(118), G.Y(118)];
  el('circle', { cx: 0, cy: 0, r: 16, fill: '#ffc142' }, pt); etiqueta(pt, 'Kr + Pb', -24, -30, { size: 26, w: 600, col: '#ffc142', anchor: 'end' });
  const lin = el('path', { d: `M${px},${py} L${px},${py}`, stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '6 6' }, G.g);
  const E1 = 'Kr-86 + Pb-208  →  118 + n', E2 = 'barrera de fusión  ·  probabilidad', E3 = 'probabilidad del 118  ≫  lo esperado';
  RENDER.push(t => {
    if (!on('h_smo')) return;
    $('smB').style.opacity = P(t, a, a + .5);
    $('smE').textContent = typed(t, cs, cs + 1.6, E1); $('smE2').textContent = typed(t, cs + 1.4, cs + 2.6, E2); $('smE3').textContent = typed(t, ma - .4, ma + .6, E3);
    zocaloAnim('smZ', t, a + .6, c44 + .5);
    G.g.setAttribute('opacity', P(t, c44 - .3, c44 + .2));
    const k = back(P(t, ma - .3, ma + .4)), y = lerp(py, 330, k);
    pt.setAttribute('opacity', P(t, kr - .2, kr + .2)); pt.setAttribute('transform', `translate(${px} ${y})`); lin.setAttribute('d', `M${px},${py} L${px},${y}`);
  });
}
// ---------- 3 · 36 + 82 = 118 ----------
{
  const a = S('c45'), c46 = S('c46'), c47 = S('c47'), b = S('c48');
  scene('h_sum', [a - .1, b - .1, .5, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vSu" viewBox="0 0 1920 1080"></svg>
    <div style="position:absolute;left:0;right:0;top:110px;text-align:center;font:600 120px 'Cormorant Garamond'"><span id="su1" style="color:#ff8f80;opacity:0">36</span><span id="su2" style="opacity:0"> + <span style="color:#ff8f80">82</span></span><span id="su3" style="color:#ffc142;opacity:0"> = 118</span></div>`);
  const svg = $('vSu'); defsNucleo(svg);
  const Kr = el('g', {}, svg), Pb = el('g', {}, svg), Fu = el('g', { opacity: 0 }, svg);
  nucleo(svg, Kr, 36, 50, 13, 4); nucleo(svg, Pb, 82, 126, 13, 8); nucleo(svg, Fu, 118, 175, 13, 13);
  const lab = (txt, x, tz) => { const e = etiqueta(svg, txt, x, 900, { size: 30, w: 600, col: '#ff8f80', anchor: 'middle' }); return [e, tz]; };
  const L = [lab('CRIPTÓN · 36 PROTONES', 560, a), lab('PLOMO · 82 PROTONES', 1360, c46)];
  RENDER.push(t => {
    if (!on('h_sum')) return;
    const m = P(t, c47 - .5, c47 + .05), mm = m * m, hit = c47 + .05;
    Kr.setAttribute('transform', `translate(${lerp(560, 960, mm)} 600) scale(${lerp(.5, 1, back(P(t, a, a + .4)))})`); Pb.setAttribute('transform', `translate(${lerp(1360, 980, mm)} 600) scale(${lerp(.5, 1, back(P(t, c46 - .2, c46 + .3)))})`);
    Kr.setAttribute('opacity', t < hit ? 1 : 0); Pb.setAttribute('opacity', t < hit ? P(t, c46 - .3, c46) : 0);
    const w = t > hit ? Math.exp(-(t - hit) * 3) : 0;
    Fu.setAttribute('opacity', t > hit ? 1 : 0); Fu.setAttribute('transform', `translate(960 600) scale(${1 + .1 * Math.sin((t - hit) * 26) * w},${1 - .08 * Math.sin((t - hit) * 26) * w})`);
    for (const [e, tz] of L) e.setAttribute('opacity', P(t, tz, tz + .3) * (t < hit ? 1 : 0));
    $('su1').style.opacity = P(t, a, a + .3); $('su2').style.opacity = P(t, c46, c46 + .3); $('su3').style.opacity = P(t, c47, c47 + .3);
  });
}
// ---------- 4 · Una idea polémica ----------
{
  const a = S('c48'), c49 = S('c49'), b = S('c50');
  scene('h_pol', [a - .1, b - .1, .5, .5, 1.04], `<div class="bgA"></div><svg class="full" id="vPo" viewBox="0 0 1920 1080"></svg>
    <div id="poT" style="position:absolute;left:110px;top:110px;font:600 96px 'Cormorant Garamond';opacity:0">Una idea polémica</div>`);
  const svg = $('vPo'), G = [];
  for (let i = 0; i < 7; i++) {
    const x = 300 + i * 220, g = el('g', { opacity: 0 }, svg); persona(g, x, 820, 2.4, { col: '#4a5562' });
    const bu = el('g', { opacity: 0 }, svg); el('rect', { x: x - 40, y: 500, width: 80, height: 76, rx: 18, fill: '#1a202a', stroke: '#3a4350' }, bu);
    el('path', { d: `M${x - 10},576 L${x},596 L${x + 8},576 Z`, fill: '#1a202a' }, bu); etiqueta(bu, '?', x, 556, { size: 46, w: 700, anchor: 'middle', col: '#ffc142', font: 'Inter Var', ls: 0 });
    G.push({ g, bu });
  }
  RENDER.push(t => {
    if (!on('h_pol')) return;
    $('poT').style.opacity = P(t, a, a + .5);
    G.forEach((q, i) => { q.g.setAttribute('opacity', P(t, a + i * .08, a + .3 + i * .08)); const k = P(t, c49 + i * .12, c49 + .25 + i * .12); q.bu.setAttribute('opacity', i % 3 === 1 ? 0 : k); q.bu.setAttribute('transform', `translate(0 ${lerp(20, 0, eo(k))})`); });
  });
}
// ---------- 5 · Decidieron probarla: el acelerador, el separador nuevo y su experto ----------
{
  const a = S('c50'), c51 = S('c51'), sg = AT('c51', 'separador de gas'), c52 = S('c52'), b = S('c53');
  scene('h_lab', [a - .1, b - .1, .6, .5, 1.03], `<div style="position:absolute;inset:0;background:#05080c"></div><svg class="full" id="vLa" viewBox="0 0 1920 1080"></svg>
    ${etiq('laT', 'Laboratorio Lawrence Berkeley · 1999')}<div id="laN" class="pill" style="position:absolute;left:1380px;top:640px;background:#2f8f5b;color:#fff;opacity:0">RECIÉN INSTALADO</div>
    ${zocalo('laZ', 'El experto en el separador', 'Victor Ninov')}<div class="rec">Esquema</div>`);
  const svg = $('vLa'), C1 = ciclotron(svg, 520, 500, 270, { tx: 1100, sx: 1340, sy: 700 });
  const hl = el('path', { d: 'M1100,500 C1250,500 1340,560 1340,700', fill: 'none', stroke: '#8fd0ff', 'stroke-width': 80, 'stroke-linecap': 'round', opacity: 0 }, svg);
  filtroBrillo(svg, 'laGl'); const sil = el('g', { transform: 'translate(1640 1090) scale(.7)', opacity: 0 }, svg); silueta(sil, '#ffb23e', 'laGl');
  RENDER.push(t => {
    if (!on('h_lab')) return;
    C1.anim(t, a); $('laT').style.opacity = P(t, a, a + .5);
    hl.setAttribute('opacity', .25 * P(t, sg - .2, sg + .3) * (.6 + .4 * Math.sin(t * 5))); $('laN').style.opacity = P(t, sg, sg + .3);
    sil.setAttribute('opacity', P(t, c52 - .3, c52 + .3)); zocaloAnim('laZ', t, c52);
  });
}
// ---------- 6 · Primavera de 1999: once días, dos billones de átomos por segundo ----------
{
  const a = S('c53'), c54 = S('c54'), bi = AT('c54', 'dos billones'), la = AT('c54', 'láminas'), c55 = S('c55'), b = S('c56');
  scene('h_exp', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vEx" viewBox="0 0 1920 1080"></svg>
    <div id="exC" style="position:absolute;left:110px;top:150px;opacity:0"><div class="lbl" style="position:static">Primavera de 1999 · el experimento</div>
      <div style="display:grid;grid-template-columns:repeat(6,110px);gap:10px;margin-top:20px">${Array.from({ length: 11 }, (_, i) => `<div class="exD mono" style="height:110px;border-radius:10px;border:1px solid #2a313b;background:#0b0e12;font-size:30px;color:#6d737c;padding:10px 14px">${i + 1}</div>`).join('')}</div></div>
    <div id="exB" class="card" style="left:110px;top:560px;padding:20px 28px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">ÁTOMOS DE CRIPTÓN POR SEGUNDO</div><div class="mono" id="exN" style="font-size:66px;color:#ffc142;margin-top:4px">0</div></div>
    <div id="exL" class="lbl" style="left:1220px;top:860px;opacity:0">Láminas finísimas de plomo, en una rueda que gira</div>`);
  const svg = $('vEx'), W1 = el('g', { opacity: 0 }, svg);
  el('circle', { cx: 0, cy: 0, r: 230, fill: '#1a222c', stroke: '#3a4656', 'stroke-width': 4 }, W1);
  for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2; el('path', { d: `M${Math.cos(an) * 70},${Math.sin(an) * 70} L${Math.cos(an - .3) * 215},${Math.sin(an - .3) * 215} A215,215 0 0 1 ${Math.cos(an + .3) * 215},${Math.sin(an + .3) * 215} Z`, fill: '#8a93a0', opacity: .75, stroke: '#c9d0d8', 'stroke-width': 2 }, W1); }
  el('circle', { r: 40, fill: '#2a3442' }, W1);
  const haz = []; for (let i = 0; i < 40; i++) haz.push(el('circle', { r: 4, fill: '#ffc142' }, svg));
  RENDER.push(t => {
    if (!on('h_exp')) return;
    $('exC').style.opacity = P(t, a, a + .5);
    [...document.querySelectorAll('.exD')].forEach((d, i) => { const on1 = t > a + .5 + i * (c55 + .8 - a - .5) / 11; d.style.background = on1 ? '#3a2a0c' : '#0b0e12'; d.style.borderColor = on1 ? '#ffb23e' : '#2a313b'; d.style.color = on1 ? '#ffc142' : '#6d737c'; });
    $('exB').style.opacity = P(t, bi - .6, bi - .3); $('exN').textContent = fmt(2e12 * eo(P(t, bi - .4, bi + .8)));
    W1.setAttribute('opacity', P(t, c54 - .2, c54 + .4)); W1.setAttribute('transform', `translate(1460 520) rotate(${t * 90 % 360})`);
    haz.forEach((c, i) => { const u = ((t - a) * 1.4 + i / 40) % 1; c.setAttribute('cx', lerp(1000, 1440, u)); c.setAttribute('cy', 520 + Math.sin(i * 2.3) * 8); c.setAttribute('opacity', P(t, c54, c54 + .3) * Math.sin(Math.PI * u)); });
    $('exL').style.opacity = P(t, la - .2, la + .3);
  });
}
// ---------- 7 · Ninov encontró algo: tres cadenas ----------
{
  const a = S('c56'), c57 = S('c57'), b = S('c58'), stop = a + 1.4;
  scene('h_enc', [a - .1, b - .1, .5, .4, 1.04], `<div style="position:absolute;inset:0;background:#040605"></div>${crtHTML('enC', 260, 120, 1400, 840, 'ANÁLISIS DE DATOS · BERKELEY · 1999', lineasDatos(220, 11))}
    ${[1, 2, 3].map(i => pill('enP' + i, 'CADENA ' + i, 0, '#ffc142', 'color:#1a1000;font-size:24px;padding:4px 16px;left:1380px')).join('')}<div class="rec">Recreación</div>`);
  RENDER.push(t => {
    if (!on('h_enc')) return;
    const vi = crtScroll('enC', t, a - .1, stop, 1300) / 34;
    [5, 11, 18].forEach((d, k) => { const tk = c57 + k * .3; marcarLinea('enC', vi + d, t >= tk); const p = $('enP' + (k + 1)); p.style.top = (120 + 60 + d * 34 - 2) + 'px'; aparece('enP' + (k + 1), t, tk); });
  });
}
// ---------- 8 · Un átomo que se clava y seis caídas en menos de un segundo ----------
{
  const a = S('c58'), cl = AT('c58', 'se clavaba'), se = AT('c58', 'seis'), c59 = S('c59'), c60 = S('c60'), es = AT('c60', 'ciento dieciséis'), b = S('c61');
  const Z = [118, 116, 114, 112, 110, 108, 106], sy = ['?', '?', '?', 'Cn', 'Ds', 'Hs', 'Sg'];
  const E2 = escalera('ec', a, Z, sy, i => 360 + i * 190, i => 160 + i * 112, 116);
  scene('h_ec', [a - .1, b - .1, .5, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vEc" viewBox="0 0 1920 1080"></svg>${E2.html}
    <div id="ecT" class="card" style="left:110px;top:110px;padding:14px 22px;opacity:0"><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.12em">6 DESINTEGRACIONES · MENOS DE 1 SEGUNDO</div></div>`);
  const svg = $('vEc'), anim = E2.setup(svg);
  const ring = el('rect', { x: 360 + 190 - 14, y: 160 + 112 - 14, width: 144, height: 144, rx: 16, fill: 'none', stroke: '#5ee093', 'stroke-width': 6, opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('h_ec')) return;
    anim(t, i => i === 0 ? cl - .2 : se + (i - 1) * .32);
    $('ecT').style.opacity = P(t, se, se + .4);
    ring.setAttribute('opacity', P(t, es - .1, es + .3) * (.6 + .4 * Math.sin(t * 8)));
  });
}
// ---------- 9 · Tres átomos que nadie había visto jamás, como en la predicción ----------
{
  const a = S('c61'), c62 = S('c62'), b = S('cap3');
  scene('h_tre', [a - .1, b + .2, .6, .8, 1.04], `<div class="bgO"></div><svg class="full" id="vTr" viewBox="0 0 1920 1080"></svg>
    <div id="trT" style="position:absolute;left:0;right:0;top:150px;text-align:center;font:600 100px 'Cormorant Garamond';opacity:0">Tres átomos</div>
    <div id="trP" class="mono" style="position:absolute;left:0;right:0;top:820px;text-align:center;font-size:28px;letter-spacing:.2em;color:#ffc142;opacity:0">CASI EXACTAMENTE LO QUE PREDECÍA EL CÁLCULO</div>`);
  const svg = $('vTr'), d = el('defs', {}, svg), rg = el('radialGradient', { id: 'trG' }, d);
  el('stop', { offset: 0, 'stop-color': '#fff1c0' }, rg); el('stop', { offset: .35, 'stop-color': '#ffb23e', 'stop-opacity': .8 }, rg); el('stop', { offset: 1, 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const at = [0, 1, 2].map(i => el('circle', { r: 110, fill: 'url(#trG)', opacity: 0 }, svg));
  RENDER.push(t => {
    if (!on('h_tre')) return;
    $('trT').style.opacity = P(t, a, a + .6);
    at.forEach((c, i) => { c.setAttribute('cx', 560 + i * 400 + 12 * Math.sin(t * 1.3 + i)); c.setAttribute('cy', 540 + 14 * Math.cos(t * 1.1 + i * 2)); c.setAttribute('opacity', P(t, a + .3 + i * .3, a + .8 + i * .3) * (.8 + .2 * Math.sin(t * 4 + i))); });
    $('trP').style.opacity = P(t, c62, c62 + .5);
  });
}
});
