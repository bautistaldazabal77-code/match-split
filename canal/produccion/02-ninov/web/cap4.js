// Capítulo IV · Nadie más: Alemania, Japón y Francia no lo repiten; Berkeley tampoco; la cadena de 2001 que no estaba.
SETUP.push(() => {
chapterCard('h_ch4', 'cap4', 'IV', 'Nadie más', '1999 – 2001');
// ---------- 1 · GSI, RIKEN y GANIL intentan repetirlo: cero ----------
{
  const a = S('c77'), c78 = S('c78'), c79 = S('c79'), c80 = S('c80'), b = S('c81');
  scene('h_rep', [a - .1, b - .1, .6, .5, 0], `<svg class="full" id="vRp" viewBox="0 0 1920 1080"></svg>${etiq('rpT', 'Intentan repetir el experimento · 1999 – 2000')}<div class="rec">Ubicaciones aproximadas</div>`);
  const M = mundo($('vRp'), { rotate: [-10, 0] });
  const B = lugar(M, LUGAR.berkeley, 'BERKELEY');
  const sitios = [[LUGAR.darmstadt, 'GSI · ALEMANIA', a + .6, c78, 'start', -40], [LUGAR.wako, 'RIKEN · JAPÓN', c79, c79 + .9, 'end', 46], [LUGAR.caen, 'GANIL · FRANCIA', c80, c80 + .9, 'end', 46]].map(([ll, txt, t0, t1, an, dy]) => {
    const m = lugar(M, ll, txt, { anchor: an, dy }), A = arco(M, LUGAR.berkeley, ll, '#8fd0ff', 2.5);
    const z = el('g', { opacity: 0 }, m.inner), [bx, by] = an === 'end' ? [-46 - txt.length * 17.6, dy - 8] : [46 + txt.length * 17.6, dy - 8];
    el('circle', { cx: bx, cy: by, r: 24, fill: '#c3332b' }, z); etiqueta(z, '0', bx, by + 10, { size: 28, w: 800, anchor: 'middle', col: '#fff', font: 'Inter Var', ls: 0 });
    return { m, A, z, t0, t1 };
  });
  RENDER.push(t => {
    if (!on('h_rep')) return;
    const k = io(P(t, a - .1, b)), [cx, cy] = M.proj([40, 40]); camMundo(M, lerp(960, cx, k * .6), lerp(540, cy, k * .6), lerp(1, 1.35, k));
    B.c.setAttribute('opacity', 1); B.fijo(lerp(1, 1.35, k)); B.pulso(t); $('rpT').style.opacity = P(t, a, a + .5);
    for (const s of sitios) { s.A.draw(P(t, s.t0 - .6, s.t0)); s.m.c.setAttribute('opacity', P(t, s.t0 - .2, s.t0 + .2)); s.m.fijo(lerp(1, 1.35, k)); s.z.setAttribute('opacity', P(t, s.t1, s.t1 + .2)); }
  });
}
// ---------- 2 · Al principio no era tan raro: es dificilísimo ----------
{
  const a = S('c81'), c82 = S('c82'), ha = AT('c82', 'el haz'), de = AT('c82', 'el detector'), b = S('c83');
  scene('h_rar', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vRr" viewBox="0 0 1920 1080"></svg>
    <div id="rrN" style="position:absolute;left:0;right:0;top:140px;text-align:center;font:600 92px 'Cormorant Garamond';opacity:0">3 átomos en 11 días</div>
    <div id="rrS" class="mono" style="position:absolute;left:0;right:0;top:260px;text-align:center;font-size:24px;letter-spacing:.2em;color:#8b919a;opacity:0">CUALQUIER DIFERENCIA PUEDE CAMBIAR EL RESULTADO</div>`);
  const svg = $('vRr');
  const dial = (x, txt) => { const g = el('g', { transform: `translate(${x} 680)`, opacity: 0 }, svg);
    el('path', { d: 'M-200,0 A200,200 0 0 1 200,0', fill: 'none', stroke: '#2a3442', 'stroke-width': 26 }, g);
    for (let i = 0; i <= 10; i++) { const an = Math.PI + i / 10 * Math.PI; el('path', { d: `M${Math.cos(an) * 170},${Math.sin(an) * 170} L${Math.cos(an) * 150},${Math.sin(an) * 150}`, stroke: '#8b919a', 'stroke-width': 3 }, g); }
    const ag = el('path', { d: 'M0,0 L0,-160', stroke: '#ffc142', 'stroke-width': 7, 'stroke-linecap': 'round' }, g); el('circle', { r: 16, fill: '#ffc142' }, g);
    etiqueta(g, txt, 0, 70, { size: 28, w: 600, anchor: 'middle', col: '#e9e6df' }); return { g, ag }; };
  const D = [dial(640, 'HAZ'), dial(1280, 'DETECTOR')];
  RENDER.push(t => {
    if (!on('h_rar')) return;
    $('rrN').style.opacity = P(t, a, a + .5); $('rrS').style.opacity = P(t, c82 + .5, c82 + 1);
    D.forEach((d, i) => { const t0 = i ? de : ha; d.g.setAttribute('opacity', P(t, t0 - .4, t0)); d.ag.setAttribute('transform', `rotate(${-20 + 30 * Math.sin(t * (2.1 + i)) + 12 * Math.sin(t * 7.3 + i)})`); });
  });
}
// ---------- 3 · 2000: Berkeley repite su experimento y no encuentra nada ----------
{
  const a = S('c83'), mi = AT('c83', 'mismo acelerador'), c84 = S('c84'), b = S('c85');
  scene('h_ba2', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vB2" viewBox="0 0 1920 1080"></svg>
    <div id="b2C" class="lbl" style="left:110px;top:110px;opacity:0;color:#e9e6df">Berkeley repite su experimento · mismo acelerador · mismo método</div>`);
  const svg = $('vB2'), base = 860;
  el('path', { d: `M500,${base} H1420`, stroke: '#4a5059', 'stroke-width': 3 }, svg);
  const bl = [0, 1, 2].map(i => { const g = el('g', { opacity: 0 }, svg); el('rect', { x: 570, y: base - 150 * (i + 1), width: 300, height: 136, rx: 12, fill: '#e0a42a', stroke: '#ffe08a', 'stroke-width': 2 }, g);
    etiqueta(g, 'CADENA ' + (i + 1), 720, base - 150 * (i + 1) + 80, { size: 30, w: 700, col: '#2a1a00', anchor: 'middle' }); return g; });
  const hu = el('rect', { x: 1050, y: base - 450, width: 300, height: 436, rx: 12, fill: 'none', stroke: '#8b919a', 'stroke-width': 3, 'stroke-dasharray': '14 12', opacity: 0 }, svg);
  const ce = etiqueta(svg, '0', 1200, base - 160, { size: 220, w: 900, anchor: 'middle', col: '#ff5148', font: 'Inter Var', ls: 0 }); ce.setAttribute('opacity', 0);
  etiqueta(svg, '1999', 720, base + 56, { size: 36, w: 600, anchor: 'middle' }); const y2 = etiqueta(svg, '2000', 1200, base + 56, { size: 36, w: 600, anchor: 'middle' });
  RENDER.push(t => {
    if (!on('h_ba2')) return;
    $('b2C').style.opacity = P(t, mi - .3, mi + .2);
    bl.forEach((g, i) => g.setAttribute('opacity', P(t, a + .2 + i * .2, a + .5 + i * .2)));
    hu.setAttribute('opacity', P(t, a + 1, a + 1.4)); y2.setAttribute('opacity', P(t, a + 1, a + 1.4)); hu.setAttribute('stroke', t > c84 ? '#ff5148' : '#8b919a');
    const q = P(t, c84 + .3, c84 + .6); ce.setAttribute('opacity', q);
  });
}
// ---------- 4 · Revisaron el equipo, cambiaron detalles, siguieron midiendo ----------
{
  const T3 = [S('c85'), S('c86'), S('c87')], b = S('c88');
  const txt = ['Revisaron el equipo', 'Cambiaron detalles', 'Siguieron midiendo'];
  scene('h_r3', [T3[0] - .1, b - .1, .5, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vR3" viewBox="0 0 1920 1080"></svg>
    ${txt.map((s, i) => `<div id="r3${i}" style="position:absolute;left:${180 + i * 560}px;top:720px;width:440px;text-align:center;font:600 54px 'Cormorant Garamond';opacity:0">${s}</div>`).join('')}`);
  const svg = $('vR3'), ic = [];
  // llave, perillas y un gráfico que sigue
  const g0 = el('g', { transform: 'translate(400 470)', opacity: 0 }, svg);
  el('path', { d: 'M-90,90 L40,-40 M40,-40 A60,60 0 1 1 90,-90 L60,-60 L80,-20 L120,-40', fill: 'none', stroke: '#e9e6df', 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g0);
  const g1 = el('g', { transform: 'translate(960 470)', opacity: 0 }, svg), per = [];
  for (let i = 0; i < 3; i++) { el('path', { d: `M${-100 + i * 100},-110 V110`, stroke: '#4a5059', 'stroke-width': 10, 'stroke-linecap': 'round' }, g1); per.push(el('circle', { cx: -100 + i * 100, cy: 0, r: 24, fill: '#ffc142' }, g1)); }
  const g2 = el('g', { transform: 'translate(1520 470)', opacity: 0 }, svg), li = el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 7, 'stroke-linejoin': 'round' }, g2);
  el('path', { d: 'M-140,110 H140 M-140,110 V-110', stroke: '#4a5059', 'stroke-width': 5 }, g2);
  ic.push(g0, g1, g2);
  RENDER.push(t => {
    if (!on('h_r3')) return;
    ic.forEach((g, i) => { const k = P(t, T3[i] - .1, T3[i] + .4); g.setAttribute('opacity', k); $('r3' + i).style.opacity = k; });
    g0.setAttribute('transform', `translate(400 470) rotate(${12 * Math.sin(t * 4)})`);
    per.forEach((c, i) => c.setAttribute('cy', 70 * Math.sin(t * (1.6 + i * .7) + i)));
    let d = ''; const n = Math.floor(40 * P(t, T3[2], b)); for (let i = 0; i <= n; i++) d += (d ? ' L' : 'M') + (-130 + i * 6.5) + ',' + (70 + 25 * Math.sin(i * 1.7) * Math.cos(i * .4)).toFixed(1); li.setAttribute('d', d);
  });
}
// ---------- 5 · Abril de 2001: el programa de Ninov encuentra otra cadena ----------
{
  const a = S('c88'), c89 = S('c89'), nc = AT('c89', 'nueva cadena'), b = S('c90');
  scene('h_c01', [a - .1, b - .1, .6, .5, 1.03], `<div style="position:absolute;inset:0;background:#040605"></div>${crtHTML('c1C', 260, 120, 1400, 840, 'PROGRAMA DE ANÁLISIS DE NINOV · ABRIL DE 2001', lineasDatos(220, 23))}
    ${pill('c1P', 'CADENA 118', 0, '#5ee093', 'color:#06140a;font-size:24px;padding:4px 16px;left:1380px')}<div class="rec">Recreación</div>`);
  RENDER.push(t => {
    if (!on('h_c01')) return;
    const vi = crtScroll('c1C', t, a - .1, nc - .05, 900) / 34;
    marcarLinea('c1C', vi + 11, t > nc, '#5ee093', '#06140a'); $('c1P').style.top = (120 + 60 + 11 * 34 - 2) + 'px'; aparece('c1P', t, nc + .05);
  });
}
// ---------- 6 · Otros programas, el mismo archivo: no estaba ----------
{
  const a = S('c90'), c91 = S('c91'), c92 = S('c92'), ne = S('c93'), b = S('cap5');
  const L = lineasDatos(12, 41), LB = L.map((l, i) => i === 6 ? '' : l), Y0 = 260 + 60;
  scene('h_otr', [a - .1, b + .2, .6, .8, 0], `<div style="position:absolute;inset:0;background:#040605"></div>
    ${crtHTML('o1', 90, 260, 850, 560, 'PROGRAMA DE NINOV', L)}${crtHTML('o2', 980, 260, 850, 560, 'OTRO PROGRAMA · MISMO ARCHIVO', LB)}
    ${pill('o1P', 'CADENA 118', 260 + 60 + 6 * 34 - 2, '#5ee093', 'color:#06140a;font-size:22px;padding:4px 14px;left:760px')}
    <div id="oS" style="position:absolute;left:1000px;width:810px;height:4px;background:#8fd0ff;box-shadow:0 0 22px #8fd0ff;opacity:0"></div>
    <div id="oV" style="position:absolute;left:996px;top:${Y0 + 6 * 34}px;width:818px;height:34px;border:3px dashed #ff5148;border-radius:6px;opacity:0"></div>
    ${sello('oN', 'NO ESTABA', 1060, 470, 96)}<div class="rec">Recreación</div>`);
  addCSS(`#o2 .ln{color:#8fd0ff;text-shadow:0 0 8px rgba(120,200,255,.5)} #o2 .tt{background:#8fd0ff}`);
  marcarLinea('o1', 6, true, '#5ee093', '#06140a');
  RENDER.push(t => {
    if (!on('h_otr')) return;
    const q = P(t, c91 - .1, c91 + .4); $('o2').style.opacity = q; $('o2').style.transform = `translateX(${lerp(80, 0, eo(q))}px)`;
    const k = P(t, c92 - .1, ne - .1); $('oS').style.top = (Y0 + 4 + k * (6 * 34 + 13)) + 'px'; $('oS').style.opacity = P(t, c92 - .2, c92) * (1 - P(t, ne + .2, ne + .5));
    $('oV').style.opacity = P(t, ne - .2, ne) * (Math.floor(t * 4) % 2 ? .6 : 1);
    golpe('oN', t, ne + .1, -6);
    const [sx, sy] = shake(t, t > ne + .1 ? 10 * (1 - P(t, ne + .1, ne + .5)) : 0);
    camara('h_otr', 1400, 540, lerp(1, 1.08, io(P(t, c92, ne + 1))), sx, sy);
  });
}
});
