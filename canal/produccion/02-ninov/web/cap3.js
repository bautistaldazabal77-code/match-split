// Capítulo III · La isla: la isla de estabilidad, el anuncio, la publicación y lo único que faltaba.
SETUP.push(() => {
chapterCard('h_ch3', 'cap3', 'III', 'La isla', 'El anuncio · junio de 1999');
// mar de inestabilidad con tierra firme a la izquierda y la isla a la derecha
function marIsla(svg, HZ = 640) {
  const d = el('defs', {}, svg), rg = el('radialGradient', { id: svg.id + 'G' }, d);
  el('stop', { offset: 0, 'stop-color': '#5ee093', 'stop-opacity': .5 }, rg); el('stop', { offset: 1, 'stop-color': '#5ee093', 'stop-opacity': 0 }, rg);
  el('rect', { x: -50, y: HZ, width: 2100, height: 600, fill: '#081320' }, svg);
  const glow = el('ellipse', { cx: 1560, cy: HZ - 40, rx: 420, ry: 240, fill: `url(#${svg.id}G)`, opacity: 0 }, svg);
  el('path', { d: `M-40,${HZ - 50} L330,${HZ - 70} L400,${HZ} L-40,${HZ + 14} Z`, fill: '#1c2633', stroke: '#3a4a5c', 'stroke-width': 2 }, svg);
  for (let i = 0; i < 8; i++) el('rect', { x: 20 + i * 40, y: HZ - 120 - (i % 3) * 16, width: 34, height: 34, rx: 5, fill: '#2a3646', stroke: '#4a5a6c' }, svg);
  const isla = el('path', { d: `M1350,${HZ} Q1470,${HZ - 150} 1560,${HZ - 140} Q1660,${HZ - 155} 1770,${HZ} Z`, fill: '#1d3a2c', stroke: '#5ee093', 'stroke-width': 3, opacity: 0 }, svg);
  const olas = []; for (let i = 0; i < 8; i++) olas.push(el('path', { fill: 'none', stroke: '#ff6a5c', 'stroke-opacity': .6 - i * .06, 'stroke-width': 3 }, svg));
  return { glow, isla, anim(t, amp = 1) {
    olas.forEach((o, i) => { let p = ''; for (let x = 400; x <= 1350; x += 14) { const e = Math.sin(Math.PI * (x - 400) / 950); p += (p ? ' L' : 'M') + x + ',' + (HZ + 26 + i * 30 + e * 22 * amp * Math.sin(x / 31 + t * (4 + i) + i)).toFixed(1); } o.setAttribute('d', p); });
  } };
}
window.marIsla = marIsla;
// ---------- 1 · La isla de estabilidad ----------
{
  const a = S('c63'), is = AT('c63', 'la isla'), c64 = S('c64'), re = AT('c64', 'una región'), c65 = S('c65'), mi = AT('c65', 'minutos'), di = AT('c65', 'días'), an = AT('c65', 'años'), c66 = S('c66'), b = S('c67');
  scene('h_isl', [a - .1, b - .1, .6, .5, 1.03], `<div style="position:absolute;inset:0;background:linear-gradient(#04070c,#0b1624 58%,#04070c)"></div><svg class="full" id="vIs" viewBox="0 0 1920 1080"></svg>
    <div id="isT" style="position:absolute;left:110px;top:110px;font:600 100px 'Cormorant Garamond';opacity:0">La isla de estabilidad</div>
    <div class="rec">Esquema</div>`);
  const svg = $('vIs'), MI = marIsla(svg);
  const t1 = etiqueta(svg, 'ELEMENTOS CONOCIDOS', 20, 470, { size: 22, col: '#8b95a1' });
  const tM = etiqueta(svg, 'NÚCLEOS QUE SE DESARMAN AL INSTANTE', 875, 960, { size: 26, w: 600, col: '#ff8a80', anchor: 'middle' });
  const tI = etiqueta(svg, 'NÚCLEOS MÁS ESTABLES', 1560, 440, { size: 26, w: 600, col: '#7af0aa', anchor: 'middle' });
  const vid = ['¿MINUTOS?', '¿DÍAS?', '¿AÑOS?'].map((s, i) => etiqueta(svg, s, 1400 + i * 160, 380, { size: 26, w: 700, col: '#e9e6df', anchor: 'middle' }));
  const salto = el('path', { d: 'M360,570 Q900,120 1550,500', fill: 'none', stroke: '#ffc142', 'stroke-width': 6, 'stroke-dasharray': '4 16', 'stroke-linecap': 'round', opacity: 0 }, svg), LJ = salto.getTotalLength();
  const bola = el('circle', { r: 20, fill: '#ffc142', opacity: 0 }, svg);
  const tB = etiqueta(svg, 'BERKELEY · 1999', 900, 260, { size: 26, w: 600, col: '#ffc142', anchor: 'middle' });
  RENDER.push(t => {
    if (!on('h_isl')) return;
    MI.anim(t); $('isT').style.opacity = P(t, is - .2, is + .4);
    tM.setAttribute('opacity', P(t, c64, c64 + .5));
    const k = P(t, re - .2, re + .5); MI.isla.setAttribute('opacity', k); MI.glow.setAttribute('opacity', k * (.7 + .3 * Math.sin(t * 2.5))); tI.setAttribute('opacity', k);
    vid.forEach((v, i) => v.setAttribute('opacity', P(t, [mi, di, an][i] - .1, [mi, di, an][i] + .2)));
    t1.setAttribute('opacity', P(t, a, a + .5));
    const j = io(P(t, c66, c66 + 2.4)), p = salto.getPointAtLength(j * LJ);
    salto.setAttribute('opacity', P(t, c66, c66 + .3)); bola.setAttribute('cx', p.x); bola.setAttribute('cy', p.y); bola.setAttribute('opacity', P(t, c66, c66 + .2)); tB.setAttribute('opacity', P(t, c66 + .4, c66 + .8));
  });
}
// ---------- 2 · El anuncio fue un acontecimiento ----------
{
  const a = S('c67'), b = S('c69');
  const notas = [['NOTICIAS', 'Berkeley anuncia los elementos 116 y 118', -4, 160, 160], ['NEWS', 'Element 118 found: island of stability within reach', 3, 980, 230], ['NACHRICHTEN', 'Berkeley meldet die Elemente 116 und 118', -2, 300, 560], ['NOTÍCIAS', 'Dois novos elementos químicos', 2, 1040, 610]];
  scene('h_anu', [a - .1, b - .1, .6, .5, 1.04], `<div style="position:absolute;inset:0;background:#0a0c10"></div>
    ${notas.map(([k, h, r, x, y], i) => `<div id="an${i}" class="paper" style="left:${x}px;top:${y}px;width:720px;padding:28px 34px;opacity:0"><div style="font:600 17px 'IBM Plex Mono';letter-spacing:.2em;color:#7a6a50">${k} · JUNIO DE 1999</div>
      <div style="font:800 42px/1.1 'Inter Var';margin-top:10px">${h}</div><div class="ln" style="width:92%"></div><div class="ln" style="width:66%"></div></div>`).join('')}<div class="rec">Recreación</div>`);
  RENDER.push(t => {
    if (!on('h_anu')) return;
    notas.forEach((n, i) => { const q = P(t, a + i * .5, a + i * .5 + .35), d = $('an' + i); d.style.opacity = q; d.style.transform = `translateY(${lerp(-60, 0, eo(q))}px) rotate(${n[2]}deg) scale(${lerp(1.15, 1, eo(q))})`; });
  });
}
// ---------- 3 · La frase de Ninov ----------
quote('h_q1', [S('c69') - .3, S('c70') - .1, .6, .5, 1.03], 'Saltamos por encima de un mar de inestabilidad, hasta una isla de estabilidad.', 'Victor Ninov', 'Berkeley · junio de 1999 · traducción', [S('c69'), E('c69') - .2]);
// ---------- 4 · Darleane Hoffman: treinta años de búsqueda ----------
{
  const a = S('c70'), tr = AT('c70', 'treinta años'), b = S('c71');
  scene('h_hof', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="hoB" style="position:absolute;left:260px;right:260px;top:420px;opacity:0"><div class="mono" style="display:flex;justify-content:space-between;font-size:30px;color:#8b919a"><span>1969</span><span style="color:#ffc142">1999</span></div>
      <div style="height:22px;background:#1a222c;border-radius:11px;margin-top:14px;overflow:hidden"><div id="hoP" style="height:100%;width:0;background:linear-gradient(90deg,#3a2a0c,#ffb23e)"></div></div>
      <div style="font:600 84px 'Cormorant Garamond';margin-top:34px;text-align:center">Treinta años de búsqueda</div></div>
    ${zocalo('hoZ', 'Química nuclear · Berkeley', 'Darleane Hoffman')}`);
  RENDER.push(t => {
    if (!on('h_hof')) return;
    zocaloAnim('hoZ', t, a); $('hoB').style.opacity = P(t, tr - .5, tr); $('hoP').style.width = (100 * io(P(t, tr - .3, tr + 2))) + '%';
  });
}
// ---------- 5 · Albert Ghiorso, codescubridor de doce elementos ----------
{
  const a = S('c71'), le = AT('c71', 'doce elementos'), jo = AT('c71', 'más joven'), b = S('c72');
  scene('h_ghi', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>${tablaGrande('tG', { top: 120 })}${zocalo('ghZ', 'Codescubridor de 12 elementos · del 95 al 106', 'Albert Ghiorso')}`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tGz' + z));
  RENDER.push(t => {
    if (!on('h_ghi')) return;
    zocaloAnim('ghZ', t, a + .2);
    cells.forEach((c, i) => { const z = i + 1, s = z >= 95 && z <= 106, k = s ? P(t, le - .3 + (z - 95) * .1, le + (z - 95) * .1) : 0; c.style.opacity = s ? 1 : .35; c.classList.toggle('oro', k > 0); c.style.transform = `scale(${1 + .2 * Math.sin(Math.PI * k)})`; });
  });
}
// ---------- 6 · Physical Review Letters y las charlas ----------
{
  const a = S('c72'), c73 = S('c73'), b = S('c74');
  scene('h_prl', [a - .1, b - .1, .6, .5, 0], `<svg class="full" id="vPl" viewBox="0 0 1920 1080"></svg>
    <div id="plD" class="paper" style="left:420px;top:110px;width:1080px;height:860px;opacity:0"><h4>PHYSICAL REVIEW LETTERS · VOLUMEN 83 · AGOSTO DE 1999<span>RECREACIÓN</span></h4>
      <div style="font:700 50px/1.15 'Cormorant Garamond';margin-top:20px">Observation of Superheavy Nuclei Produced in the Reaction of <sup>86</sup>Kr with <sup>208</sup>Pb</div>
      <div class="mono" style="font-size:24px;margin-top:22px;color:#3a3020">V. Ninov <span style="color:#7a6a50">(primer autor)</span> y otros</div>
      ${Array.from({ length: 9 }, (_, i) => `<div class="ln" style="width:${96 - (i % 3) * 9}%"></div>`).join('')}
      <div style="display:flex;gap:24px;margin-top:26px">${[0, 1].map(() => `<div style="flex:1">${Array.from({ length: 7 }, (_, i) => `<div class="ln" style="width:${94 - (i % 4) * 8}%"></div>`).join('')}</div>`).join('')}</div></div>
    ${etiq('plT', 'Charlas en otros laboratorios', 'left:110px')}`);
  const M = mundo($('vPl'), { rotate: [30, 0] });
  const B = lugar(M, LUGAR.berkeley, 'BERKELEY'), otros = [[2.35, 48.86], [8.65, 49.87], [139.6, 35.7], [12.5, 41.9], [-0.37, 49.18], [37.17, 56.73], [-71.1, 42.36], [-87.6, 41.9]].map(ll => ({ ll, A: arco(M, LUGAR.berkeley, ll, '#ffc142', 2.5), m: lugar(M, ll, '', { col: '#8fd0ff' }) }));
  M.g.setAttribute('opacity', 0);
  RENDER.push(t => {
    if (!on('h_prl')) return;
    const q = P(t, a, a + .5); $('plD').style.opacity = q * (1 - P(t, c73 - .4, c73)); $('plD').style.transform = `translateY(${lerp(40, 0, eo(q))}px) rotate(-1deg)`;
    M.g.setAttribute('opacity', P(t, c73 - .4, c73)); $('plT').style.opacity = P(t, c73, c73 + .4);
    B.c.setAttribute('opacity', 1); B.pulso(t);
    otros.forEach((o, i) => { const k = P(t, c73 + .1 + i * .2, c73 + .8 + i * .2); o.A.draw(k); o.m.c.setAttribute('opacity', P(t, c73 + .7 + i * .2, c73 + .9 + i * .2)); });
  });
}
// ---------- 7 · Solo faltaba una cosa: que alguien más lo repitiera ----------
bigText('h_fal', [S('c74') - .1, S('cap4') + .2, .6, .8, 1.04], { lines: [['Solo faltaba una cosa.', S('c74')], ['<span style="font-size:.6em;color:var(--mut)">La que siempre falta en ciencia.</span>', S('c75')], ['<span class="a">Que alguien más lo repitiera.</span>', S('c76')]] });
});
