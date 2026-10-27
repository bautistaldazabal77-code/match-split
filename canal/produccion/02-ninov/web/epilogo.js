// Epílogo · Lo que la tabla no perdona: el 116 y el 118 de verdad, las reglas nuevas y la regla de siempre.
SETUP.push(() => {
chapterCard('h_che', 'epi', '', 'Epílogo', 'Lo que la tabla no perdona');
// ---------- 1 · Existen: Dubna y Livermore, 2000 y 2002-2006 ----------
{
  const a = S('c132'), c133 = S('c133'), du = AT('c133', 'Dubna'), li = AT('c133', 'Livermore'), c134 = S('c134'), c135 = S('c135'), an = AT('c135', 'anunciados'), b = S('c136');
  scene('h_dub', [a - .1, b - .1, .6, .5, 0], `<svg class="full" id="vDu" viewBox="0 0 1920 1080"></svg>
    <div id="duX" style="position:absolute;left:0;right:0;top:400px;text-align:center;font:600 170px 'Cormorant Garamond';color:#5ee093;opacity:0">Existen.</div>
    <div id="du6" class="card" style="left:1440px;top:590px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.14em">ELEMENTO 116</div><div style="font:600 54px Inter;color:#ffc142">2000</div></div>
    <div id="du8" class="card" style="left:1440px;top:750px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.14em">ELEMENTO 118</div><div style="font:600 54px Inter;color:#ffc142">2002 y 2005</div><div class="mono" style="font-size:22px;color:#e9e6df;margin-top:6px;opacity:0" id="du8b">ANUNCIADO EN 2006</div></div>
    ${zocalo('duZ', 'Equipo ruso con científicos de Estados Unidos', 'Dubna + Livermore')}`);
  const M = mundo($('vDu'), { rotate: [42, 0] });
  const pr = M.pais('643', '#3a1f1f'), pu = M.pais('840', '#1f2c3d'); pr.setAttribute('opacity', 0); pu.setAttribute('opacity', 0);
  const D = lugar(M, LUGAR.dubna, 'DUBNA · RUSIA'), L = lugar(M, LUGAR.livermore, 'LIVERMORE · EE.UU.', { anchor: 'end' }), A = arco(M, LUGAR.livermore, LUGAR.dubna);
  RENDER.push(t => {
    if (!on('h_dub')) return;
    const x = P(t, a, a + .4) * (1 - P(t, c133 - .3, c133)); $('duX').style.opacity = x; $('duX').style.transform = `scale(${lerp(1.1, 1, eo(P(t, a, a + 1)))})`;
    M.g.setAttribute('opacity', P(t, c133 - .4, c133));
    pr.setAttribute('opacity', P(t, du - .2, du + .3)); pu.setAttribute('opacity', P(t, li - .2, li + .3));
    D.c.setAttribute('opacity', P(t, du - .2, du + .2)); L.c.setAttribute('opacity', P(t, li - .2, li + .2)); D.pulso(t); L.pulso(t, .7);
    A.draw(P(t, li, li + 1.2)); zocaloAnim('duZ', t, li + .3);
    const k = io(P(t, c133, b)); camMundo(M, 960, lerp(540, 470, k), lerp(1, 1.15, k)); D.fijo(lerp(1, 1.15, k)); L.fijo(lerp(1, 1.15, k));
    $('du6').style.opacity = P(t, c134 - .1, c134 + .3); $('du8').style.opacity = P(t, c135 - .1, c135 + .3); $('du8b').style.opacity = P(t, an - .1, an + .3);
  });
}
// ---------- 2 · Livermorio y oganesón, con otra receta ----------
{
  const a = S('c136'), lv = AT('c136', 'livermorio'), og = AT('c136', 'oganesón'), c137 = S('c137'), ot = AT('c137', 'con otra'), b = S('c138');
  scene('h_lv', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgO"></div>
    <div style="position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center;gap:200px">
      ${[['Lv', 116, 'LIVERMORIO', 'calcio + curio'], ['Og', 118, 'OGANESÓN', 'calcio + californio']].map(([s, z, n, r]) => `<div style="text-align:center"><div id="lv${z}" class="ptG oro" style="position:relative;width:340px;height:340px;opacity:0"><b>${z}</b><i style="top:84px;font-size:150px">${s}</i><u style="font-size:24px">${n}</u></div>
        <div id="lr${z}" class="mono" style="font-size:30px;color:#e9e6df;letter-spacing:.12em;margin-top:34px;opacity:0">${r}</div></div>`).join('')}</div>
    <div id="lvX" class="mono" style="position:absolute;left:0;right:0;top:860px;text-align:center;font-size:30px;letter-spacing:.14em;color:#8b919a;opacity:0"><span style="position:relative">criptón + plomo<span id="lvL" style="position:absolute;left:-10px;right:-10px;top:50%;height:4px;background:#ff5148;transform-origin:left;transform:scaleX(0)"></span></span></div>`);
  RENDER.push(t => {
    if (!on('h_lv')) return;
    for (const [z, tz] of [[116, lv], [118, og]]) { const q = P(t, tz - .1, tz + .3); $('lv' + z).style.opacity = q; $('lv' + z).style.transform = `scale(${lerp(.6, 1, back(q))})`; $('lr' + z).style.opacity = P(t, ot, ot + .4); }
    $('lvX').style.opacity = P(t, c137, c137 + .4); $('lvL').style.transform = `scaleX(${P(t, c137 + .8, c137 + 1.3)})`;
  });
}
// ---------- 3 · El caso cambió las reglas ----------
{
  const a = S('c138'), c139 = S('c139'), co = AT('c139', 'cada coautor'), c140 = S('c140'), b = S('c141');
  const items = [['Más formación en ética', c139 + .6], ['Cada coautor responde por la parte que firma', co], ['Ningún descubrimiento depende de una sola persona', c140]];
  scene('h_rgl', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="rgT" style="position:absolute;left:220px;top:150px;font:600 104px 'Cormorant Garamond';opacity:0">El caso cambió las reglas</div>
    <div id="rgS" class="mono" style="position:absolute;left:224px;top:290px;font-size:24px;letter-spacing:.18em;color:#8b919a;opacity:0">SOCIEDAD ESTADOUNIDENSE DE FÍSICA</div>
    ${items.map(([s], i) => `<div id="rg${i}" style="position:absolute;left:220px;top:${400 + i * 150}px;display:flex;align-items:center;gap:34px;opacity:0"><div style="width:76px;height:76px;border-radius:14px;border:4px solid #5ee093;position:relative"><svg viewBox="0 0 76 76" style="position:absolute;inset:0"><path d="M18,40 L32,54 L58,24" fill="none" stroke="#5ee093" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div style="font:500 52px Inter">${s}</div></div>`).join('')}`);
  RENDER.push(t => {
    if (!on('h_rgl')) return;
    $('rgT').style.opacity = P(t, a, a + .5); $('rgS').style.opacity = P(t, c139 - .2, c139 + .3);
    items.forEach(([, tz], i) => { const k = P(t, tz - .1, tz + .3); $('rg' + i).style.opacity = k; $('rg' + i).style.transform = `translateX(${lerp(-30, 0, eo(k))}px)`; });
  });
}
// ---------- 4 · Ninov siempre sostuvo que es inocente ----------
{
  const a = S('c141'), b = S('c142');
  scene('h_ino', [a - .1, b - .1, .6, .5, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 85%,#0f2230,#05080a 55%)"></div><svg class="full" id="vIo" viewBox="0 0 1920 1080"></svg>
    <div id="ioT" class="mono" style="position:absolute;left:0;right:0;top:160px;text-align:center;font-size:30px;letter-spacing:.2em;color:#8fd0ff;opacity:0">SIEMPRE SOSTUVO QUE ES INOCENTE</div>`);
  const svg = $('vIo'); filtroBrillo(svg, 'ioGl'); const s = el('g', { transform: 'translate(960 1100) scale(1.35)' }, svg); silueta(s, '#8fd0ff', 'ioGl');
  RENDER.push(t => { if (!on('h_ino')) return; $('ioT').style.opacity = P(t, a + .2, a + .8); });
}
// ---------- 5 · La regla: vale si otro, en otro lugar, con otros aparatos, puede volver a verlo ----------
{
  const a = S('c142'), c143 = S('c143'), pr = AT('c143', 'prestigioso'), re = AT('c143', 'revista'), c144 = S('c144'), ol = AT('c144', 'otro lugar'), oa = AT('c144', 'otros aparatos'), vv = AT('c144', 'volver a verlo'), b = S('c145');
  scene('h_rg2', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="r2T" style="position:absolute;left:0;right:0;top:120px;text-align:center;font:600 96px 'Cormorant Garamond';opacity:0">Una regla que no se puede esquivar</div>
    <div style="position:absolute;left:0;right:0;top:330px;display:flex;justify-content:center;gap:60px">${[['UN NOMBRE PRESTIGIOSO', 'r2A'], ['UNA REVISTA IMPORTANTE', 'r2B']].map(([s, id]) => `<div id="${id}" class="mono" style="position:relative;font-size:34px;letter-spacing:.14em;padding:22px 34px;border:2px solid #4a5059;border-radius:12px;opacity:0">${s}<span class="tc" style="position:absolute;left:-12px;right:-12px;top:50%;height:5px;background:#ff5148;transform-origin:left;transform:scaleX(0)"></span></div>`).join('')}</div>
    <div style="position:absolute;left:0;right:0;top:560px;display:flex;justify-content:center;gap:90px">${[0, 1, 2].map(i => `<div id="r2L${i}" style="width:340px;height:300px;border-radius:20px;background:#0e141c;border:2px solid #2a3442;position:relative;opacity:0">
      <div style="position:absolute;left:50%;top:60px;width:150px;height:110px;margin-left:-75px;border-radius:12px;background:#163024;border:3px solid #5ee093"></div>
      <div class="mono" style="position:absolute;left:0;right:0;bottom:30px;text-align:center;font-size:22px;letter-spacing:.14em;color:#8b919a">${['LABORATORIO 1', 'OTRO LUGAR', 'OTROS APARATOS'][i]}</div>
      <div class="r2ok" style="position:absolute;left:50%;top:84px;width:60px;height:60px;margin-left:-30px;border-radius:50%;background:#5ee093;box-shadow:0 0 30px #5ee093;opacity:0"></div></div>`).join('')}</div>`);
  RENDER.push(t => {
    if (!on('h_rg2')) return;
    $('r2T').style.opacity = P(t, a, a + .5);
    for (const [id, tz] of [['r2A', pr], ['r2B', re]]) { $(id).style.opacity = P(t, tz - .3, tz) * (1 - .5 * P(t, c144, c144 + .3)); $$('#' + id + ' .tc').style.transform = `scaleX(${P(t, tz + .5, tz + 1)})`; }
    [c144 - .2, ol, oa].forEach((tz, i) => { const n = $('r2L' + i); n.style.opacity = P(t, tz - .2, tz + .2); $$('#r2L' + i + ' .r2ok').style.opacity = P(t, vv - .1 + i * .2, vv + .2 + i * .2); });
  });
}
// ---------- 6 · Anunció dos elementos que nadie más pudo ver; la tabla se completó sin él ----------
{
  const a = S('c145'), c146 = S('c146'), si = AT('c146', 'sin él'), b = S('outro');
  scene('h_fin', [a - .1, b + .6, .6, 1, 0], `<div class="bgA"></div>${tablaGrande('tF')}
    ${casillaG('fG1', 116, '?', '', 0, 0, 'width:74px;height:74px;border-radius:8px')}${casillaG('fG2', 118, '?', '', 0, 0, 'width:74px;height:74px;border-radius:8px')}`);
  addCSS('#fG1 b,#fG2 b{font-size:13px;left:7px;top:5px} #fG1 i,#fG2 i{top:16px;font-size:36px} #h_fin .ptG u{display:none}');
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tFz' + z));
  const fant = [['fG1', 116, 0], ['fG2', 118, 0]].map(([id, z, dy]) => { const n = $(id); n.classList.add('oro'); const [x, y] = centroCasilla(z); n.style.left = x - 37 + 'px'; n.style.top = y - 37 + dy + 'px'; return n; });
  RENDER.push(t => {
    if (!on('h_fin')) return;
    cells.forEach((c, i) => { const z = i + 1, d = Math.hypot(...posTabla(z).map((v, k) => v - [7, 18][k])), k = P(t, c146 + d * .05, c146 + .3 + d * .05); c.style.opacity = .4 + .6 * k; c.classList.toggle('verde', k > 0 && z !== 116 && z !== 118); c.classList.toggle('oro', (z === 116 || z === 118) && k > 0); });
    fant.forEach((n, i) => { const q = P(t, a + .3 + i * .2, a + .8 + i * .2), f = P(t, si - .2, si + .8); n.style.opacity = q * (1 - f) * (.75 + .25 * Math.sin(t * 3 + i)); n.style.transform = `translateY(${-30 * f + 6 * Math.sin(t * 1.5 + i)}px)`; });
    camara('h_fin', 960, 540, lerp(1.25, 1, io(P(t, a, si + 1))));
  });
}
// ---------- 7 · Cierre ----------
{
  const a = S('outro'), b = E('outro');
  scene('h_out', [a + .4, b + 1, .8, .01, 1.03], `<div class="center">
    <div id="o1" style="font:500 36px Inter;letter-spacing:.55em;color:var(--mut);margin-right:-.55em">EL HOMBRE QUE</div>
    <div id="o2" style="font:600 150px 'Cormorant Garamond';line-height:1;margin-top:12px">inventó un elemento</div>
    <div id="o3" class="mono" style="font-size:24px;letter-spacing:.24em;color:var(--mut);margin-top:60px">FUENTES Y DOCUMENTOS EN LA DESCRIPCIÓN</div></div>`);
  RENDER.push(t => { if (!on('h_out')) return; $('o1').style.opacity = P(t, a + .5, a + 1.2); $('o2').style.opacity = P(t, a + .8, a + 1.6); $('o3').style.opacity = P(t, a + 1.8, a + 2.6); });
}
});
