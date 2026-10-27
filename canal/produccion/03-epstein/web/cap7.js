// Capítulo 7 · La noche del 10 de agosto: la cárcel, la cronología, las fallas, las dos autopsias, el informe de 2023 y el minuto que falta.
SETUP.push(() => {
capituloC('e_ch7', 'cap7', 7, 'LA NOCHE DEL 10 DE AGOSTO');
fotoC('e_mcc', [S('c127') - .1, S('c128') - .1, .4, .4], 'mcc.jpg', { lbl: 'Centro Correccional Metropolitano · Manhattan', ev: 'Julio de 2019', evT: AT('c127', 'preso'), kb: [1.05, 1.18, 0, 0, 0, -20] });
// cronología del 23 de julio al 9 de agosto
{
  const a = S('c128'), b = S('c134');
  const hitos = [[S('c128'), '23 JUL', 'MARCAS EN EL CUELLO'], [S('c129'), '23 JUL', 'VIGILANCIA ANTISUICIDIO'], [S('c130'), '29 JUL', 'SE LA QUITAN'],
    [S('c131'), '8 AGO', 'FIRMA UN TESTAMENTO'], [S('c132'), '9 AGO', 'SE LLEVAN A SU COMPAÑERO'], [S('c133'), '9 AGO', 'NADIE LO REEMPLAZA']];
  const xs = hitos.map((_, i) => 200 + i * 304);
  scene('e_cro', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div class="clbl" style="opacity:1"><i></i>Celda del piso 9 · unidad especial</div>
    <div style="position:absolute;left:200px;top:538px;width:1520px;height:4px;background:#333"></div>
    <div id="ecrL" style="position:absolute;left:200px;top:536px;width:1520px;height:8px;background:#ff2a2a;transform-origin:0 50%;transform:scaleX(0)"></div>
    ${hitos.map(([, d, s], i) => `<div id="ecrH${i}" style="position:absolute;left:${xs[i] - 140}px;width:280px;top:${i % 2 ? 580 : 260}px;text-align:center;opacity:0">
      ${i % 2 ? '' : `<div class="cbig" style="font-size:70px;color:#ff2a2a">${d}</div>`}<div class="osw" style="font-size:30px;letter-spacing:.06em;line-height:1.2;${i % 2 ? '' : 'min-height:150px;'}">${s}</div>${i % 2 ? `<div class="cbig" style="font-size:70px;color:#ff2a2a">${d}</div>` : ''}</div>
      <div id="ecrP${i}" style="position:absolute;left:${xs[i] - 14}px;top:526px;width:28px;height:28px;border-radius:50%;background:#ff2a2a;opacity:0"></div>`).join('')}`);
  RENDER.push(t => {
    if (!on('e_cro')) return;
    let k = 0; hitos.forEach(([ti], i) => { const q = P(t, ti - .1, ti + .3); if (t > ti - .3) k = i / (hitos.length - 1); $('ecrH' + i).style.opacity = q; $('ecrP' + i).style.opacity = q;
      $('ecrH' + i).style.transform = `translateY(${lerp(i % 2 ? -20 : 20, 0, eo(q))}px)`; });
    $('ecrL').style.transform = `scaleX(${k})`;
  });
}
// esa noche: rondas, registros, cámaras
{
  const a = S('c134'), re = S('c135'), ca = S('c136'), ha = S('c137'), b = S('c138');
  const tags = [['RONDAS: NO REALIZADAS', a + .4], ['REGISTROS: FALSIFICADOS', re], ['2 CÁMARAS: SIN GRABAR', ca]];
  cctvC('e_noc', [a - .1, b - .1, .4, .4], { horas: [[a - .1, '22:30:00', 28800 / (ha - a)], [ha - .1, '06:30:00', 1]], ruido: [[ca + .3, ca + 1.1], [ca + 1.6, ca + 2]],
    cam: 'CÁMARA · PISO 9 · UNIDAD ESPECIAL', fecha: '9/10-08-2019 · RECREACIÓN',
    inner: tags.map(([s], i) => `<div class="osw" id="enT${i}" style="position:absolute;left:70px;top:${600 + i * 66}px;font-size:30px;letter-spacing:.12em;color:#ff4040;opacity:0;background:rgba(0,0,0,.6);padding:4px 14px">${s}</div>`).join('') +
      `<div id="enM" style="position:absolute;left:0;right:0;top:300px;text-align:center;opacity:0"><div class="cbig" style="font-size:200px;color:#ff2a2a;text-shadow:0 0 40px rgba(255,42,42,.6)">06:30</div><div class="osw" style="font-size:34px;letter-spacing:.3em">LO ENCUENTRAN SIN VIDA</div></div>` });
  RENDER.push(t => {
    if (!on('e_noc')) return;
    tags.forEach(([, ti], i) => $('enT' + i).style.opacity = P(t, ti, ti + .3) * (1 - P(t, ha - .3, ha)));
    $('enM').style.opacity = P(t, ha + .2, ha + .6);
  });
}
// dos conclusiones: la forense y Michael Baden
{
  const a = S('c138'), ba = S('c139'), es = AT('c139', 'estrangulación'), b = S('c140');
  scene('e_for', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#111,#050505 70%)"></div>
    <div style="position:absolute;left:959px;top:120px;width:2px;height:840px;background:#2a2a2a"></div>
    <div id="efoA" style="position:absolute;left:120px;top:220px;width:720px;opacity:0"><div class="osw" style="font-size:28px;letter-spacing:.3em;color:#8a8a8a">MÉDICA FORENSE DE NUEVA YORK</div>
      <div class="cbig" style="font-size:150px;margin-top:30px">SUICIDIO</div><div class="osw" style="font-size:34px;letter-spacing:.14em">POR AHORCAMIENTO</div></div>
    <div class="cpol" id="efoP" style="left:1060px;top:170px;width:320px;height:410px;opacity:0"><div class="im"><img src="img/baden.jpg" style="object-position:50% 25%"></div><div class="tx">MICHAEL BADEN</div></div>
    <div id="efoB" style="position:absolute;left:1440px;top:200px;width:400px;opacity:0"><div class="osw" style="font-size:26px;letter-spacing:.2em;color:#8a8a8a;line-height:1.4">PATÓLOGO<br>CONTRATADO POR EL HERMANO DE EPSTEIN</div></div>
    <div id="efoE" style="position:absolute;left:1060px;top:640px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.1em">LAS FRACTURAS DEL CUELLO…</div><div class="cbig" style="font-size:120px;color:#ff2a2a">¿ESTRANGULACIÓN?</div></div>
    <div class="ccred">${CRED['baden.jpg'] || ''}</div>`);
  RENDER.push(t => {
    if (!on('e_for')) return;
    $('efoA').style.opacity = P(t, a, a + .4) * (t > ba ? .5 : 1); $('efoP').style.opacity = P(t, ba - .1, ba + .3); $('efoP').style.transform = `rotate(-3deg) scale(${lerp(1.1, 1, eo(P(t, ba - .1, ba + .4)))})`;
    $('efoB').style.opacity = P(t, AT('c139', 'contratado') - .1, AT('c139', 'contratado') + .3); $('efoE').style.opacity = P(t, AT('c139', 'fracturas') - .1, AT('c139', 'fracturas') + .3);
    $('efoE').lastElementChild.style.opacity = P(t, es - .1, es + .2);
  });
}
// 2023: el inspector general
textosC('e_oig', [S('c140') - .1, S('c141') - .1, .4, .4, 1.04], [
  { t: S('c140'), html: '<span style="font-size:.3em;color:#8a8a8a;letter-spacing:.2em">2023 · INSPECTOR GENERAL · DEPARTAMENTO DE JUSTICIA</span>', size: 100, top: 220 },
  { t: AT('c140', 'confirmó'), html: 'SUICIDIO', size: 220, top: 330 },
  { t: AT('c140', 'cadena'), html: '<span class="r">+ UNA CADENA DE NEGLIGENCIAS</span>', size: 110, top: 600 }]);
// 2025: el video del pasillo y el minuto que falta
{
  const a = S('c141'), mi = AT('c142', 'minuto'), co = S('c143'), pm = S('c144'), b = S('cap8');
  const salto = mi + .3, ini = 86400 - 62 - (salto - (a - .1)), hh = v => [Math.floor(v / 3600) % 24, Math.floor(v / 60) % 60, Math.floor(v) % 60].map(n => String(n).padStart(2, '0')).join(':');
  cctvC('e_vid', [a - .1, b + .2, .4, .6], { horas: [[a - .1, hh(ini), 1], [salto + .7, '00:00:00', 1]], ruido: [[salto, salto + .7]],
    cam: 'VIDEO PUBLICADO POR EL FBI · 2025', fecha: '9-08-2019 · RECREACIÓN',
    inner: `<div id="evdBar" style="position:absolute;left:220px;right:220px;bottom:140px;height:14px;background:rgba(255,255,255,.18);opacity:0">
        <div style="position:absolute;left:0;top:0;bottom:0;width:62%;background:#dfe6df"></div><div id="evdG" style="position:absolute;left:62%;top:-8px;bottom:-8px;width:3%;background:#ff2a2a;opacity:0"></div></div>
      <div id="evdF" style="position:absolute;left:0;right:0;top:260px;text-align:center;opacity:0"><div class="cbig" style="font-size:180px;color:#ff2a2a;text-shadow:0 0 40px rgba(0,0,0,.9)">FALTA 1 MINUTO</div><div class="osw" style="font-size:34px;letter-spacing:.2em;text-shadow:0 0 20px #000">23:58:58 → 00:00:00</div></div>
      <div id="evdC" class="cpill" style="position:absolute;left:0;right:0;margin:auto;width:fit-content;top:600px;opacity:0">Según el gobierno: un corte técnico de todas las noches</div>
      <div id="evdX" style="position:absolute;inset:0;background:rgba(0,0,0,.8);opacity:0"><div class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:140px">PARA MUCHOS, <span class="r">NO CERRÓ NADA</span></div></div>` });
  RENDER.push(t => {
    if (!on('e_vid')) return;
    $('evdBar').style.opacity = P(t, a, a + .4); $('evdG').style.opacity = P(t, salto, salto + .3);
    $('evdF').style.opacity = P(t, salto + .5, salto + .9) * (1 - P(t, co - .3, co)); $('evdC').style.opacity = P(t, co, co + .4) * (1 - P(t, pm - .3, pm));
    $('evdX').style.opacity = P(t, pm - .1, pm + .4);
  });
}
});
