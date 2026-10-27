// Capítulo 4 · Palm Beach: la denuncia de 2005, el gran jurado, el FBI, el acuerdo de Acosta y la condena con salidas.
SETUP.push(() => {
capituloC('e_ch4', 'cap4', 4, 'PALM BEACH');
// mapa de Florida con Palm Beach
{
  const a = S('c81'), b = S('c82');
  scene('e_pbm', [a - .1, b - .1, .4, .4, 0], `<svg class="full" id="epmS" viewBox="0 0 1920 1080"></svg>
    <div class="clbl"><i></i>Palm Beach, Florida · marzo de 2005</div>
    <div id="epmL" class="cpill" style="position:absolute;left:1180px;top:640px;opacity:0">Una mujer llama a la policía</div>`);
  const proj = d3.geoMercator().fitExtent([[300, 120], [1620, 1000]], { type: 'MultiPoint', coordinates: [[-87.6, 24.4], [-79.8, 31.1]] });
  const M = mundo($('epmS'), { proj }); M.pais('840', '#1b1414');
  const pb = lugar(M, [-80.04, 26.71], 'PALM BEACH', { col: '#ff2a2a', dot: '#ff6060', anchor: 'end' });
  RENDER.push(t => {
    if (!on('e_pbm')) return;
    const k = io(P(t, a - .1, b)), [x, y] = pb.xy; camMundo(M, lerp(960, x, k), lerp(560, y, k), lerp(1, 2.2, k)); pb.fijo(lerp(1, 2.2, k)); pb.pulso(t); pb.c.setAttribute('opacity', P(t, a, a + .4));
    $('epmL').style.opacity = P(t, AT('c81', 'llamó') - .1, AT('c81', 'llamó') + .3);
  });
}
fotoC('e_pbc', [S('c82') - .1, S('c83') - .1, .4, .4], 'pb-casa.jpg', { lbl: 'La mansión de Palm Beach · prueba judicial', ev: 'Una chica de 14 años', evT: AT('c82', 'catorce') });
fotoC('e_pbt', [S('c83') - .1, S('c85') - .1, .4, .4], 'pb-camilla.jpg', { lbl: 'Prueba de la policía de Palm Beach', kb: [1.05, 1.2, 0, 0, 0, 0],
  inner: `<div id="ept" class="cbig" style="position:absolute;right:96px;top:380px;text-align:right;font-size:150px;opacity:0;text-shadow:0 0 30px #000">DECENAS<br><span class="r">DE CHICAS</span></div>` });
RENDER.push(t => { if (on('e_pbt')) $('ept').style.opacity = P(t, S('c84') - .1, S('c84') + .3); });
// lo que quería la policía y lo que hizo el fiscal
{
  const a = S('c85'), gj = S('c86'), un = AT('c86', 'un solo delito'), b = S('c87');
  scene('e_rei', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div class="cfich" id="erA" style="left:180px;top:250px;width:700px;height:520px;padding:40px;opacity:0"><div class="k">Policía de Palm Beach · Michael Reiter</div><div class="cbig" style="font-size:110px;margin-top:30px">ABUSO DE<br>MENORES</div><div class="osw" style="font-size:30px;color:#8a8a8a;margin-top:20px">LO QUE PEDÍA</div></div>
    <div class="cfich" id="erB" style="left:1040px;top:250px;width:700px;height:520px;padding:40px;opacity:0;border-color:#ff2a2a"><div class="k">Fiscal del estado → gran jurado</div><div class="cbig" style="font-size:110px;margin-top:30px;color:#ff2a2a">1 CARGO</div><div class="osw" style="font-size:40px;margin-top:20px">SOLICITAR PROSTITUCIÓN</div></div>`);
  RENDER.push(t => {
    if (!on('e_rei')) return;
    const q = P(t, a, a + .4); $('erA').style.opacity = q; $('erA').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`;
    const k = P(t, gj, gj + .4); $('erB').style.opacity = k; $('erB').style.transform = `translateY(${lerp(30, 0, eo(k))}px)`;
    $('erA').style.opacity = q * (t > un ? .45 : 1);
  });
}
// el FBI: más de treinta víctimas, 53 páginas
{
  const a = S('c87'), tr = AT('c88', 'treinta'), ci = AT('c88', 'cincuenta'), b = S('c89');
  scene('e_fbi', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#101418,#050505 70%)"></div>
    <div id="efbF" style="position:absolute;left:250px;top:220px;width:640px;height:660px;background:#b39a62;border-radius:8px 30px 8px 8px;box-shadow:0 30px 80px rgba(0,0,0,.7);opacity:0">
      <div style="position:absolute;left:40px;top:60px;font:400 140px 'Bebas Neue';color:#2a2210">FBI</div><div class="osw" style="position:absolute;left:44px;top:220px;font-size:26px;letter-spacing:.2em;color:#2a2210">INVESTIGACIÓN · 2006 – 2007</div>
      <div class="osw" style="position:absolute;left:44px;bottom:50px;font-size:22px;letter-spacing:.2em;color:#4a3c1e">RECREACIÓN</div></div>
    <div id="efbV" style="position:absolute;left:1010px;top:230px;opacity:0"><div class="cbig" style="font-size:230px;color:#ff2a2a">+30</div><div class="osw" style="font-size:40px;letter-spacing:.2em">VÍCTIMAS IDENTIFICADAS</div></div>
    <div id="efbP" style="position:absolute;left:1010px;top:640px;opacity:0"><div class="cbig" style="font-size:150px">53 PÁGINAS</div><div class="osw" style="font-size:30px;letter-spacing:.2em;color:#8a8a8a">BORRADOR DE ACUSACIÓN FEDERAL</div></div>`);
  RENDER.push(t => {
    if (!on('e_fbi')) return;
    $('efbF').style.opacity = P(t, a, a + .4); $('efbF').style.transform = `rotate(-3deg) scale(${lerp(1.1, 1, eo(P(t, a, a + .5)))})`;
    $('efbV').style.opacity = P(t, tr - .2, tr + .2); $('efbP').style.opacity = P(t, ci - .2, ci + .2);
  });
}
fotoC('e_aco', [S('c89') - .1, S('c90') - .1, .4, .4], 'acosta.jpg', { bn: true, ret: 'izq', lbl: 'Alexander Acosta · fiscal federal de Miami', ev: '2007 · acuerdo secreto', evT: AT('c89', 'acuerdo secreto'), kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div class="cbig" style="position:absolute;right:96px;top:380px;text-align:right;font-size:150px">ALEXANDER<br><span class="r">ACOSTA</span></div>` });
// el acuerdo de no persecución (documento real)
docC('e_npa', [S('c90') - .1, S('c95') - .1, .4, .4], 'acuerdo-2007.jpg', {
  zoom: [[S('c90') - .1, 50, 38, .95], [S('c91'), 50, 30, 1.15], [S('c92'), 50, 50, 1.2], [S('c93'), 50, 45, .95]],
  marcas: [{ t: AT('c90', 'dos delitos'), x: 15, y: 40, w: 65, h: 3.6 }, { t: S('c91'), x: 31, y: 26.5, w: 34, h: 3 }, { t: S('c92'), x: 24, y: 50.5, w: 56, h: 9.5 }],
  sello: { t: S('c93') + .2, txt: 'NADIE AVISÓ A LAS VÍCTIMAS', x: 300, y: 430, size: 96, rot: -7 },
  fijo: `<div id="enpJ" class="cpill" style="position:absolute;left:1400px;top:820px;opacity:0">Juez, 2019: violó la ley</div>` });
RENDER.push(t => { if (on('e_npa')) $('enpJ').style.opacity = P(t, S('c94'), S('c94') + .4); });
// 18 meses, 13 cumplidos, salidas de 12 horas
{
  const a = S('c95'), tr = S('c96'), sa = S('c97'), b = S('c98');
  scene('e_sen', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:200px;top:150px"><div class="osw" style="font-size:28px;letter-spacing:.3em;color:#8a8a8a">CONDENA · 2008</div>
      <div style="display:flex;gap:10px;margin-top:20px">${Array.from({ length: 18 }, (_, i) => `<div class="esm" style="width:70px;height:90px;border:2px solid #444;background:#111"></div>`).join('')}</div>
      <div class="osw" style="display:flex;justify-content:space-between;width:1440px;font-size:24px;color:#8a8a8a;margin-top:10px"><span>MES 1</span><span id="esT">18 MESES</span></div></div>
    <div id="esS" style="position:absolute;left:200px;top:470px;opacity:0"><div class="osw" style="font-size:28px;letter-spacing:.3em;color:#8a8a8a">UNA SEMANA EN LA CÁRCEL DEL CONDADO</div>
      <div style="display:flex;gap:14px;margin-top:20px">${['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((d, i) => `<div style="width:190px"><div class="osw" style="font-size:24px;text-align:center">${d}</div><div style="height:240px;border:2px solid #444;margin-top:8px;position:relative;background:#111"><div class="esd" style="position:absolute;left:0;right:0;top:${i < 6 ? 25 : 0}%;height:${i < 6 ? 50 : 0}%;background:#c8101b"></div></div></div>`).join('')}</div>
      <div class="cbig" style="font-size:80px;margin-top:20px">12 HORAS POR DÍA <span class="r">EN SU OFICINA</span></div></div>`);
  const ms = [...document.querySelectorAll('#e_sen .esm')], ds = [...document.querySelectorAll('#e_sen .esd')];
  RENDER.push(t => {
    if (!on('e_sen')) return;
    ms.forEach((m, i) => { const on1 = t > a + .2 + i * .05, cumplido = t > tr && i < 13; m.style.background = cumplido ? '#c8101b' : on1 ? '#2a2a2a' : '#111'; });
    $('esT').textContent = t > tr ? 'CUMPLIÓ 13' : '18 MESES';
    $('esS').style.opacity = P(t, sa - .2, sa + .3); ds.forEach((d, i) => d.style.transform = `scaleY(${eo(P(t, sa + .2 + i * .12, sa + .5 + i * .12))})`);
  });
}
{
  const it = [['su avión', 'AVIÓN'], ['su mansión', 'MANSIÓN'], ['su rancho', 'RANCHO'], ['isla', 'ISLA']];
  fotoC('e_reg', [S('c98') - .1, S('cap5') + .2, .4, .6], 'epstein-2013.jpg', { bn: true, ret: 'izq', lbl: 'Registro de delincuentes sexuales', kb: [1, 1.06, 0, 0, 0, 0],
    inner: `<div style="position:absolute;right:96px;top:300px;text-align:right">${it.map(([, s], i) => `<div class="cbig" id="erg${i}" style="font-size:130px;opacity:0;${i === 3 ? 'color:#ff2a2a' : ''}">${s}</div>`).join('')}</div>` });
  RENDER.push(t => { if (!on('e_reg')) return; it.forEach(([w], i) => { const ti = i < 3 ? AT('c99', w) : S('c100'); $('erg' + i).style.opacity = P(t, ti - .05, ti + .25); }); });
}
});
