// Capítulo V · Los datos originales: la pregunta incómoda, los datos en bruto, el nuevo análisis y la retractación.
SETUP.push(() => {
chapterCard('h_ch5', 'cap5', 'V', 'Los datos originales', 'Julio de 2001');
// ---------- 1 · Una pregunta incómoda: ¿y las de 1999? ----------
{
  const a = S('c94'), c95 = S('c95'), b = S('c96');
  scene('h_pre', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgO"></div>
    <div id="prQ1" class="mono" style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:28px;letter-spacing:.24em;color:#8b919a;opacity:0">UNA PREGUNTA INCÓMODA</div>
    <div id="prQ2" style="position:absolute;left:0;right:0;top:210px;text-align:center;font:600 120px 'Cormorant Garamond';opacity:0">¿Y las de <span style="color:#ffc142">1999</span>?</div>
    ${[0, 1, 2].map(i => `<div id="prC${i}" class="card" style="left:${420 + i * 380}px;top:470px;width:320px;height:400px;padding:24px;opacity:0;border-color:#ffc142">
      <div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.14em">CADENA ${i + 1}</div><div class="mono" style="font-size:19px;color:#8b919a;margin-top:6px">1999</div>
      ${[118, 116, 114, 112, 110, 108, 106].map((z, k) => `<div style="position:absolute;left:${24 + k * 36}px;top:${110 + k * 36}px;width:58px;height:34px;border-radius:6px;background:${k ? '#2a3442' : '#e0a42a'};font:600 15px 'IBM Plex Mono';color:${k ? '#aab3bd' : '#2a1a00'};text-align:center;line-height:34px">${z}</div>`).join('')}
      <div style="position:absolute;right:22px;top:12px;font:900 72px 'Inter Var';color:#ffc142">?</div></div>`).join('')}`);
  RENDER.push(t => {
    if (!on('h_pre')) return;
    $('prQ1').style.opacity = P(t, a + .3, a + .8); const q = P(t, c95 - .2, c95 + .4); $('prQ2').style.opacity = q; $('prQ2').style.transform = `translateY(${lerp(20, 0, eo(q))}px)`;
    for (let i = 0; i < 3; i++) { const k = P(t, c95 + .3 + i * .2, c95 + .7 + i * .2); $('prC' + i).style.opacity = k; $('prC' + i).style.transform = `translateY(${lerp(50, 0, eo(k))}px)`; }
  });
}
// ---------- 2 · Solo Ninov trabajó con los datos en bruto ----------
{
  const a = S('c96'), un = AT('c96', 'el único'), br = AT('c96', 'en bruto'), c97 = S('c97'), b = S('c98');
  scene('h_bru', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vBu" viewBox="0 0 1920 1080"></svg>${etiq('buT', 'El experimento de 1999')}<div class="rec">Esquema</div>`);
  const svg = $('vBu'); filtroBrillo(svg, 'buGl');
  const cinta = el('g', { transform: 'translate(330 430)', opacity: 0 }, svg);
  for (const dx of [-75, 75]) { el('circle', { cx: dx, cy: 0, r: 64, fill: '#1a222c', stroke: '#8fd0ff', 'stroke-width': 5 }, cinta); el('circle', { cx: dx, cy: 0, r: 16, fill: '#8fd0ff' }, cinta); }
  el('rect', { x: -150, y: 64, width: 300, height: 10, fill: '#8fd0ff' }, cinta); etiqueta(cinta, 'DATOS EN BRUTO', 0, 130, { size: 26, w: 600, anchor: 'middle', col: '#8fd0ff' });
  const f1 = flecha(svg, 520, 430, 760, 430, '#ffc142', 12); f1.setAttribute('opacity', 0);
  const nin = el('g', { transform: 'translate(960 560) scale(.62)', opacity: 0 }, svg); silueta(nin, '#ffb23e', 'buGl');
  const lN = etiqueta(svg, 'NINOV', 960, 620, { size: 30, w: 700, anchor: 'middle', col: '#ffc142' }); lN.setAttribute('opacity', 0);
  const f2 = flecha(svg, 1160, 430, 1380, 430, '#ffc142', 12); f2.setAttribute('opacity', 0);
  const hoja = el('g', { transform: 'translate(1520 430)', opacity: 0 }, svg);
  el('rect', { x: -95, y: -120, width: 190, height: 240, rx: 10, fill: '#e9e2cf' }, hoja); etiqueta(hoja, '3 CADENAS', 0, -60, { size: 24, w: 700, anchor: 'middle', col: '#2a1a00', ls: 1 });
  for (let i = 0; i < 5; i++) el('rect', { x: -70, y: -25 + i * 30, width: 140 - (i % 2) * 40, height: 11, fill: '#b9ae96' }, hoja);
  const eq = [], li = [];
  for (let i = 0; i < 6; i++) { const x = 1180 + i * 110, g = el('g', { opacity: 0 }, svg); persona(g, x, 930, 1.5, { col: '#4a5562' }); eq.push(g); li.push(el('path', { d: `M1520,555 L${x},${930 - 125}`, stroke: '#8b919a', 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0 }, svg)); }
  const lE = etiqueta(svg, 'LOS DEMÁS CONFIABAN EN SU ANÁLISIS', 1455, 990, { size: 24, anchor: 'middle', col: '#8b919a' }); lE.setAttribute('opacity', 0);
  const halo = el('circle', { cx: 960, cy: 370, r: 190, fill: 'none', stroke: '#ff5148', 'stroke-width': 6, opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('h_bru')) return;
    $('buT').style.opacity = P(t, a, a + .5);
    cinta.setAttribute('opacity', P(t, a, a + .4)); nin.setAttribute('opacity', P(t, a + .3, a + .7)); lN.setAttribute('opacity', P(t, a + .3, a + .7));
    f1.setAttribute('opacity', P(t, br - .3, br)); halo.setAttribute('opacity', P(t, un - .1, un + .3) * (.6 + .4 * Math.sin(t * 7)));
    f2.setAttribute('opacity', P(t, c97 - .3, c97)); hoja.setAttribute('opacity', P(t, c97 - .2, c97 + .2));
    eq.forEach((g, i) => { g.setAttribute('opacity', P(t, c97 + .2 + i * .1, c97 + .5 + i * .1)); li[i].setAttribute('opacity', .7 * P(t, c97 + .5 + i * .1, c97 + .8 + i * .1)); });
    lE.setAttribute('opacity', P(t, c97 + .8, c97 + 1.2));
  });
}
// ---------- 3 · Vuelven a los archivos originales, evento por evento ----------
{
  const a = S('c98'), c99 = S('c99'), ev = AT('c99', 'evento por evento'), b = S('c100');
  scene('h_arc', [a - .1, b - .1, .6, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 22% 45%,#1a2230,#04060a 55%)"></div><svg class="full" id="vAr" viewBox="0 0 1920 1080"></svg>
    ${crtHTML('arC', 860, 150, 960, 640, 'NUEVO ANÁLISIS · DATOS ORIGINALES DE 1999', lineasDatos(260, 77))}
    <div id="arS" style="position:absolute;left:878px;top:${150 + 60 + 7 * 34}px;width:924px;height:34px;border:3px solid #8fd0ff;border-radius:6px;box-shadow:0 0 24px rgba(143,208,255,.6);opacity:0"></div>
    <div id="arB" class="card" style="left:860px;top:820px;width:960px;padding:14px 22px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em;display:flex;justify-content:space-between"><span>11 DÍAS DE DATOS DEL DETECTOR</span><span id="arD">DÍA 1</span></div>
      <div style="height:14px;background:#1a222c;border-radius:7px;margin-top:10px;overflow:hidden"><div id="arP" style="height:100%;width:0;background:#8fd0ff"></div></div></div>
    ${zocalo('arZ', 'Coordinó el nuevo análisis', 'Darleane Hoffman')}`);
  addCSS(`#arC .ln{color:#8fd0ff;text-shadow:0 0 8px rgba(120,200,255,.5)} #arC .tt{background:#8fd0ff}`);
  const svg = $('vAr');
  for (let i = 0; i < 6; i++) { const g = el('g', { transform: `translate(${250 + (i % 3) * 180} ${330 + Math.floor(i / 3) * 190})` }, svg);
    el('circle', { r: 76, fill: '#141b24', stroke: '#4a5a6c', 'stroke-width': 4 }, g); el('circle', { r: 50, fill: 'none', stroke: '#2a3442', 'stroke-width': 18 }, g); el('circle', { r: 16, fill: '#4a5a6c' }, g);
    etiqueta(g, 'DÍA ' + (i * 2 + 1), 0, 108, { size: 18, anchor: 'middle', col: '#8b919a' }); }
  RENDER.push(t => {
    if (!on('h_arc')) return;
    zocaloAnim('arZ', t, a + .3, c99);
    const k = P(t, c99 - .3, b - .1); $$('#arC .ln').style.transform = `translateY(${-34 * Math.floor(k * 240)}px)`;
    $('arC').style.opacity = P(t, a + .6, a + 1.1); $('arS').style.opacity = P(t, ev - .3, ev);
    $('arB').style.opacity = P(t, c99 - .3, c99); $('arP').style.width = (100 * k).toFixed(1) + '%'; $('arD').textContent = 'DÍA ' + Math.min(11, 1 + Math.floor(k * 11));
  });
}
// ---------- 4 · Las tres cadenas no estaban ----------
{
  const a = S('c100'), c101 = S('c101'), du = AT('c101', 'dudosas'), ma = AT('c101', 'mal interpretadas'), c102 = S('c102'), b = S('c103');
  scene('h_no3', [a - .1, b - .1, .5, .5, 1.03], `<div class="bgR"></div><svg class="full" id="vN3" viewBox="0 0 1920 1080"></svg>
    ${[0, 1, 2].map(i => `<div id="n3${i}" style="position:absolute;left:${420 + i * 380}px;top:330px;width:320px;height:400px;border:5px dashed #6b737d;border-radius:24px;opacity:0"><div class="mono" style="position:absolute;left:24px;top:20px;font-size:22px;color:#8b919a;letter-spacing:.14em">CADENA ${i + 1}</div></div>`).join('')}
    <div id="n3A" class="mono" style="position:absolute;left:420px;top:800px;font-size:34px;letter-spacing:.1em;opacity:0">¿DUDOSAS?</div>
    <div id="n3B" class="mono" style="position:absolute;left:1000px;top:800px;font-size:34px;letter-spacing:.1em;opacity:0">¿MAL INTERPRETADAS?</div>
    ${sello('n3S', 'NO ESTABAN', 560, 440, 120)}`);
  const svg = $('vN3'), X = [], tach = [];
  for (let i = 0; i < 3; i++) { const g = el('g', { opacity: 0, transform: `translate(${580 + i * 380} 530)` }, svg); el('path', { d: 'M-90,-90 L90,90 M90,-90 L-90,90', stroke: '#ff5148', 'stroke-width': 22, 'stroke-linecap': 'round' }, g); X.push(g); }
  for (const [x, w] of [[410, 220], [990, 420]]) tach.push(el('path', { d: `M${x},822 L${x + w},822`, stroke: '#ff5148', 'stroke-width': 6, pathLength: 1, 'stroke-dasharray': '0 1' }, svg));
  RENDER.push(t => {
    if (!on('h_no3')) return;
    for (let i = 0; i < 3; i++) {
      const q = P(t, a - .1 + i * .12, a + .2 + i * .12); $('n3' + i).style.opacity = q * (1 - .5 * P(t, c102, c102 + .3)); $('n3' + i).style.borderColor = t > a + .5 ? '#ff5148' : '#6b737d';
      const k = P(t, a + .5 + i * .15, a + .7 + i * .15); X[i].setAttribute('opacity', k * (1 - .5 * P(t, c102, c102 + .3))); X[i].setAttribute('transform', `translate(${580 + i * 380} 530) scale(${lerp(1.6, 1, eo(k))})`);
    }
    $('n3A').style.opacity = P(t, du - .2, du + .1); $('n3B').style.opacity = P(t, ma - .2, ma + .1);
    tach[0].style.strokeDasharray = `${P(t, du + .4, du + .8)} 1`; tach[1].style.strokeDasharray = `${P(t, ma + .5, ma + 1)} 1`;
    golpe('n3S', t, c102, -4);
  });
}
// ---------- 5 · Ningún rastro del 118, tampoco del 116 ----------
{
  const a = S('c103'), c104 = S('c104'), b = S('c105');
  scene('h_cer', [a - .1, b - .1, .5, .5, 1.03], `<div class="bgA"></div>
    <div style="position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;gap:140px">
      ${[[118, a + .4], [116, c104]].map(([z]) => `<div style="text-align:center"><div id="ce${z}" class="ptG" style="position:relative;width:330px;height:330px;border:4px dashed #ff5148;background:transparent"><b>${z}</b><i style="top:80px;font-size:140px;color:#ff5148">?</i></div>
        <div id="ceL${z}" class="mono" style="font-size:30px;letter-spacing:.14em;color:#ff8a80;margin-top:30px;opacity:0">NINGÚN RASTRO</div></div>`).join('')}</div>`);
  RENDER.push(t => {
    if (!on('h_cer')) return;
    for (const [z, tz] of [[118, a + .2], [116, c104]]) { const q = P(t, tz - .2, tz + .3); $('ce' + z).style.opacity = q; $('ce' + z).style.transform = `scale(${lerp(.7, 1, back(q))})`; $('ceL' + z).style.opacity = P(t, tz + .5, tz + .9); }
  });
}
// ---------- 6 · 27 de julio de 2001: Berkeley retira el descubrimiento ----------
{
  const a = S('c105'), re = AT('c105', 'retiró'), c106 = S('c106'), co = AT('c106', 'una conclusión'), b = S('c107');
  scene('h_ret', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>${`<div class="ptL">${tablaHTML('tR', { hasta: 112, cw: 64, gap: 5, left: (1920 - 18 * 69) / 2, top: 420 })}</div>`}
    <div id="reD" class="paper" style="left:300px;top:60px;width:1320px;padding:34px 46px;opacity:0"><h4>LABORATORIO LAWRENCE BERKELEY · 27 DE JULIO DE 2001<span>RECREACIÓN · TRADUCCIÓN</span></h4>
      <div style="font:700 50px/1.15 'Cormorant Garamond'">Se retira el anuncio de los elementos 116 y 118</div>
      <div id="reQ" style="font:500 34px/1.3 'Cormorant Garamond';margin-top:16px;opacity:0">Después de volver a analizar los datos primarios, las tres cadenas <span id="reH" style="background:linear-gradient(#ffd75a,#ffd75a) no-repeat 0 85%/0% 40%">no están en los datos de 1999</span>.</div></div>
    ${sello('reS', 'RETIRADO', 1180, 640, 80)}`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tRz' + z));
  RENDER.push(t => {
    if (!on('h_ret')) return;
    cells.forEach(c => c.style.opacity = .55);
    for (const z of [116, 118]) { const c = cells[z - 1]; c.classList.toggle('oro', t < re + .2); c.classList.toggle('roja', t >= re + .2); c.style.opacity = 1; }
    const q = P(t, a, a + .5); $('reD').style.opacity = q; $('reD').style.transform = `translateY(${lerp(-30, 0, eo(q))}px) rotate(-.6deg)`;
    golpe('reS', t, re, -10);
    $('reQ').style.opacity = P(t, c106, c106 + .5); $('reH').style.backgroundSize = `${(100 * P(t, co, co + 1.6)).toFixed(1)}% 40%`;
  });
}
// ---------- 7 · Ninov pidió que su nombre no figurara; la nota salió un año después ----------
{
  const a = S('c107'), su = AT('c107', 'su nombre'), c108 = S('c108'), un = AT('c108', 'un año después'), b = S('c109');
  const autores = ['V. Ninov', 'Autor 2', 'Autor 3', 'Autor 4', 'Autor 5', 'Autor 6', 'Autor 7', 'Autor 8'];
  scene('h_nom', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="noD" class="paper" style="left:360px;top:150px;width:760px;height:720px;opacity:0"><h4>RETRACTACIÓN · AUTORES<span>RECREACIÓN</span></h4>
      ${autores.map((n, i) => `<div class="au" style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px dashed #b9ae96;font:${i ? 400 : 600} 30px 'IBM Plex Mono';color:${i ? '#8a7f68' : '#1c1d1f'}">${i ? `<div style="height:12px;width:${180 + (i * 37) % 120}px;background:#c9c2b2"></div>` : n}</div>`).join('')}</div>
    <div id="noC" class="card" style="left:1220px;top:360px;width:420px;padding:0;overflow:hidden;opacity:0"><div style="background:#c3332b;color:#fff;font:600 24px 'IBM Plex Mono';letter-spacing:.2em;padding:12px 0;text-align:center">JULIO DE 2002</div>
      <div style="font:600 46px/1.2 'Cormorant Garamond';text-align:center;padding:24px">Nota editorial<br><span class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.12em">PHYSICAL REVIEW LETTERS</span></div></div>`);
  const pr = $$('#noD .au');
  RENDER.push(t => {
    if (!on('h_nom')) return;
    $('noD').style.opacity = P(t, a, a + .5);
    const k = P(t, su, su + 1); pr.style.opacity = 1 - .9 * k; pr.style.transform = `translateX(${-60 * k}px)`; pr.style.textDecoration = k > .1 ? 'line-through' : 'none';
    const q = P(t, un - .4, un + .2); $('noC').style.opacity = q; $('noC').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`;
  });
}
// ---------- 8 · ¿De dónde habían salido? ----------
bigText('h_don', [S('c109') - .1, S('cap6') + .2, .6, .8, 1.04], { lines: [['<span style="font-size:.6em;color:var(--mut)">Ya no era si el elemento existía.</span>', S('c109')], ['Era otra.', S('c110')], ['<span class="r">¿De dónde habían salido?</span>', AT('c111', 'de dónde')]] });
});
