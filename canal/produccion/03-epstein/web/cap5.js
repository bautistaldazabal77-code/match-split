// Capítulo 5 · La isla: Little Saint James, los registros de vuelo (con las aclaraciones), Virginia Giuffre y el príncipe Andrés.
SETUP.push(() => {
capituloC('e_ch5', 'cap5', 5, 'LA ISLA');
{
  const a = S('c101'), b = S('c103');
  scene('e_imap', [a - .1, AT('c102', 'Islas Vírgenes') + .2, .4, .4, 0], `<svg class="full" id="eimS" viewBox="0 0 1920 1080"></svg>
    <div class="clbl"><i></i>Islas Vírgenes de Estados Unidos</div>`);
  const proj = d3.geoMercator().fitExtent([[100, 100], [1820, 980]], { type: 'MultiPoint', coordinates: [[-82, 17], [-60, 28]] });
  const M = mundo($('eimS'), { proj });
  const ls = lugar(M, [-64.825, 18.3], 'LITTLE SAINT JAMES', { col: '#ff2a2a', dot: '#ff6060' }), ny = lugar(M, [-80.04, 26.71], 'PALM BEACH', { anchor: 'end' });
  RENDER.push(t => {
    if (!on('e_imap')) return;
    const k = io(P(t, a, AT('c102', 'Islas Vírgenes'))), [x, y] = ls.xy; camMundo(M, lerp(960, x, k), lerp(540, y, k), lerp(1, 5, k));
    ls.fijo(lerp(1, 5, k)); ny.fijo(lerp(1, 5, k)); ls.pulso(t); ls.c.setAttribute('opacity', P(t, a, a + .4)); ny.c.setAttribute('opacity', P(t, a, a + .4) * (1 - k));
  });
  fotoC('e_isla', [AT('c102', 'Islas Vírgenes'), AT('c102', 'compró') + .2, .5, .4], 'isla-aerea.jpg', { lbl: 'Little Saint James', ev: 'Unas 30 hectáreas', evT: AT('c102', 'treinta'), kb: [1.05, 1.2, 0, -60, 0, 0] });
  fotoC('e_ist', [AT('c102', 'compró') - .2, b - .1, .4, .4], 'isla-templo.jpg', { lbl: 'El "templo" de la isla · foto del FBI', ev: 'Comprada en 1998', evT: AT('c102', 'compró') + .3, kb: [1.05, 1.16, 0, 0, 0, -20] });
}
// registros de vuelo (recreación)
{
  const a = S('c103'), re = S('c104'), cl = AT('c104', 'Bill Clinton'), tr = AT('c104', 'Donald Trump'), ac = AT('c104', 'actores'), b = S('c105');
  const filas = [['1997', 'PALM BEACH → NUEVA YORK', 'D. TRUMP', 'tr'], ['1998', 'NUEVA YORK → ISLAS VÍRGENES', '██████ ██████', ''], ['2001', 'PALM BEACH → ISLAS VÍRGENES', '██████ ██████', ''],
    ['2002', 'NUEVA YORK → ÁFRICA (VIAJE DE FUNDACIÓN)', 'B. CLINTON', 'cl'], ['2002', 'ÁFRICA → EUROPA', 'B. CLINTON · ACTORES', 'cl'], ['2003', 'NUEVA YORK → PALM BEACH', '██████ ██████', ''], ['2004', 'NUEVA YORK → NUEVO MÉXICO', '██████ ██████', '']];
  scene('e_vue', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="evuD" style="left:260px;top:110px;width:1400px;height:860px;padding:44px 54px;font:400 27px 'IBM Plex Mono';color:#1c1c1c">
      <div style="display:flex;justify-content:space-between;font:600 28px Oswald;letter-spacing:.2em;border-bottom:3px solid #1c1c1c;padding-bottom:12px"><span>REGISTRO DE VUELOS · N908JE</span><span style="color:#777;font-weight:400">RECREACIÓN · EJEMPLOS</span></div>
      <div style="display:grid;grid-template-columns:120px 1fr 360px;font:600 22px Oswald;letter-spacing:.14em;color:#666;margin-top:18px"><span>AÑO</span><span>RUTA</span><span>PASAJEROS</span></div>
      ${filas.map(([y, r, p, k], i) => `<div class="evuF" data-k="${k}" style="display:grid;grid-template-columns:120px 1fr 360px;padding:14px 6px;border-bottom:1px dashed #a39b8c;opacity:0"><span>${y}</span><span>${r}</span><span>${p}</span></div>`).join('')}
      <div class="osw" style="position:absolute;left:54px;bottom:34px;font-size:22px;letter-spacing:.1em;color:#555">Los registros reales están en los documentos judiciales del juicio a Maxwell (2021) y en los archivos publicados.</div></div>`);
  const fs = [...document.querySelectorAll('#e_vue .evuF')];
  RENDER.push(t => {
    if (!on('e_vue')) return;
    $('evuD').style.opacity = P(t, a, a + .4);
    fs.forEach((f, i) => { f.style.opacity = P(t, a + .3 + i * .18, a + .5 + i * .18); const k = f.dataset.k, on1 = (k === 'cl' && t > cl) || (k === 'tr' && t > tr); f.style.background = on1 ? 'rgba(255,42,42,.28)' : 'transparent'; });
  });
}
// la aclaración: aparecer no es delito
{
  const a = S('c105'), cl = S('c106'), tr = S('c107'), ni = S('c108'), b = S('c109');
  scene('e_acl', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#101010,#050505 70%)"></div>
    <div id="eaT" class="cbig" style="position:absolute;left:0;right:0;top:120px;text-align:center;font-size:150px;opacity:0">APARECER <span class="r">NO</span> ES UN DELITO</div>
    <div class="cfich" id="eaC" style="left:200px;top:400px;width:720px;height:420px;padding:36px;opacity:0"><div class="k">Bill Clinton</div><div class="osw" style="font-size:44px;margin-top:20px;line-height:1.25">"Nunca pisé la isla"</div><div class="osw" style="font-size:26px;color:#8a8a8a;margin-top:18px">Volaba en viajes de su fundación</div></div>
    <div class="cfich" id="eaR" style="left:1000px;top:400px;width:720px;height:420px;padding:36px;opacity:0"><div class="k">Donald Trump</div><div class="osw" style="font-size:44px;margin-top:20px;line-height:1.25">"Me alejé de él y lo eché de mi club"</div><div class="osw" style="font-size:26px;color:#8a8a8a;margin-top:18px">Vuelos en los años noventa</div></div>
    ${selloC('eaS', 'NINGUNO FUE ACUSADO', 470, 860, 100)}`);
  RENDER.push(t => {
    if (!on('e_acl')) return;
    $('eaT').style.opacity = P(t, a, a + .4); $('eaC').style.opacity = P(t, cl - .1, cl + .3); $('eaR').style.opacity = P(t, tr - .1, tr + .3); golpeC('eaS', t, ni, -3);
  });
}
fotoC('e_vg', [S('c109') - .1, S('c111') - .1, .4, .4], 'mar-a-lago.jpg', { lbl: 'Mar-a-Lago · Palm Beach', ev: 'Reclutada a los 16 años', evT: AT('c110', 'dieciséis'),
  inner: `<div id="evgN" style="position:absolute;right:96px;top:250px;text-align:right;opacity:0"><div class="osw" style="font-size:28px;letter-spacing:.3em;color:#8a8a8a">LA VOZ QUE EXPUSO EL CASO</div><div class="cbig" style="font-size:150px">VIRGINIA<br><span class="r">GIUFFRE</span></div></div>` });
RENDER.push(t => { if (on('e_vg')) $('evgN').style.opacity = P(t, AT('c109', 'Virginia') - .1, AT('c109', 'Virginia') + .3); });
fotoC('e_and', [S('c111') - .1, S('cap6') + .2, .4, .6], 'andres.jpg', { bn: true, ret: 'izq', lbl: 'Príncipe Andrés de Inglaterra', kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="eanN" class="cpill" style="position:absolute;right:96px;top:300px;opacity:0">Siempre lo negó</div>${selloC('eanS', 'ACUERDO · 2022', 1080, 620, 120)}
    <div id="eanX" class="osw" style="position:absolute;right:96px;top:860px;font-size:30px;letter-spacing:.2em;opacity:0">SIN ADMITIR NADA</div>` });
RENDER.push(t => { if (!on('e_and')) return; $('eanN').style.opacity = P(t, S('c112') - .1, S('c112') + .3); golpeC('eanS', t, S('c113'), -6); $('eanX').style.opacity = P(t, AT('c113', 'sin que'), AT('c113', 'sin que') + .4); });
});
