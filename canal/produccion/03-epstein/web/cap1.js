// Capítulo 1 · El profesor: Brooklyn, la Dalton, Bear Stearns, la consultora, el pasaporte y Towers Financial.
SETUP.push(() => {
capituloC('e_ch1', 'cap1', 1, 'EL PROFESOR');
fotoC('e_bk', [S('c14') - .1, S('c17') - .1, .5, .4], 'brooklyn.jpg', { lbl: 'Brooklyn, Nueva York · 1953', kb: [1.05, 1.18, 0, -40, 0, 20] });
fichaC('e_fi', [S('c17') - .1, S('c21') - .1, .4, .4, 1.03], 'epstein-27.jpg', [
  { t: S('c17') + .2, k: 'Nacimiento', v: '20 de enero de 1953 · Brooklyn' },
  { t: AT('c17', 'muy bueno'), k: 'En la escuela', v: 'Tranquilo · muy bueno en matemáticas' },
  { t: S('c18'), k: 'Secundaria', v: 'Terminada a los 16 años' },
  { t: S('c19'), k: 'Universidad', v: 'Cooper Union · NYU' },
  { t: S('c20'), k: 'Título', v: '<span style="color:#ff2a2a">Ninguno</span>' }], { titulo: 'EXPEDIENTE · JEFFREY EDWARD EPSTEIN', pos: '50% 30%' });
fotoC('e_dal', [S('c21') - .1, S('c24') - .1, .4, .4], 'dalton.jpg', { lbl: 'Dalton School · Manhattan · 1974', ev: 'Según exalumnos', evT: S('c22'),
  inner: `<div id="edP" class="cpill" style="position:absolute;left:96px;top:150px;opacity:0">Profesor de matemáticas · 21 años</div>` });
RENDER.push(t => { if (on('e_dal')) $('edP').style.opacity = P(t, AT('c21', 'profesor'), AT('c21', 'profesor') + .4); });
{
  const hitos = [[S('c25'), '1976', 'ENTRA A BEAR STEARNS'], [S('c27'), '1980', 'SOCIO'], [S('c28'), '$', 'MENOS IMPUESTOS PARA MILLONARIOS']];
  fotoC('e_bs', [S('c24') - .1, S('c29') - .1, .4, .4], 'bear-stearns.jpg', { lbl: 'Bear Stearns · Wall Street', kb: [1.05, 1.15, 0, 0, -20, 20],
    inner: `<div style="position:absolute;left:96px;top:620px">${hitos.map(([, y, s], i) => `<div id="ebH${i}" style="display:flex;align-items:baseline;gap:22px;margin-top:14px;opacity:0"><span class="cbig" style="font-size:96px;color:#ff2a2a">${y}</span><span class="osw" style="font-size:34px;letter-spacing:.14em">${s}</span></div>`).join('')}</div>` });
  RENDER.push(t => { if (on('e_bs')) hitos.forEach(([ti], i) => { const q = P(t, ti - .1, ti + .3); $('ebH' + i).style.opacity = q; $('ebH' + i).style.transform = `translateX(${lerp(-30, 0, eo(q))}px)`; }); });
}
// 1981: se va del banco en medio de una investigación interna; sin cargos
textosC('e_81', [S('c29') - .1, S('c31') - .1, .3, .4, 1.03], [
  { t: S('c29'), html: '1981', size: 300, top: 180 },
  { t: AT('c29', 'investigación interna'), html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.1em">INVESTIGACIÓN INTERNA EN EL BANCO</span>', size: 150, top: 520 }],
  { inner: selloC('e81s', 'SIN CARGOS', 600, 660, 150) });
RENDER.push(t => { if (on('e_81')) golpeC('e81s', t, S('c30'), -6); });
fotoC('e_kh', [S('c31') - .1, S('c34') - .1, .4, .4], 'khashoggi.jpg', { bn: true, ret: 'izq', kb: [1, 1.06, 0, 0, 0, 0], lbl: 'Adnan Khashoggi · traficante de armas', ev: 'Cliente, según el propio Epstein', evT: AT('c33', 'Adnan'),
  inner: `<div id="ekP" style="position:absolute;right:96px;top:170px;text-align:right;opacity:0"><div class="cpill">1981 · Consultora propia</div><div class="osw" style="font-size:30px;letter-spacing:.12em;margin-top:14px">"Recuperar dinero robado"</div></div>
    <div id="ekI" class="cpill" style="position:absolute;right:96px;bottom:150px;opacity:0;background:#000;border:2px solid #ff2a2a">Escándalo Irán-Contra</div>` });
RENDER.push(t => { if (!on('e_kh')) return; $('ekP').style.opacity = P(t, S('c31') - .1, S('c31') + .3) * (1 - P(t, AT('c33', 'Adnan') - .3, AT('c33', 'Adnan'))); $('ekI').style.opacity = P(t, AT('c33', 'Irán-Contra'), AT('c33', 'Irán-Contra') + .3); });
// el pasaporte falso y la teoría del espía
{
  const a = S('c34'), te = S('c35'), mo = AT('c36', 'Mossad'), np = S('c37'), b = S('c38');
  scene('e_pas', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 50%,#1b1512,#050505 70%)"></div>
    <div id="epP" style="position:absolute;left:330px;top:200px;width:980px;height:640px;opacity:0">
      <div style="position:absolute;left:0;top:0;width:470px;height:640px;background:#5a0f17;border-radius:14px 0 0 14px;box-shadow:inset -10px 0 20px rgba(0,0,0,.4)">
        <div style="position:absolute;left:0;right:0;top:120px;text-align:center;font:600 30px Oswald;letter-spacing:.2em;color:#d9b45a">REPUBLIK ÖSTERREICH</div>
        <div style="position:absolute;left:175px;top:220px;width:120px;height:140px;border:4px solid #d9b45a;border-radius:50% 50% 40% 40%"></div>
        <div style="position:absolute;left:0;right:0;top:420px;text-align:center;font:600 44px Oswald;letter-spacing:.3em;color:#d9b45a">REISEPASS</div></div>
      <div style="position:absolute;left:470px;top:0;width:510px;height:640px;background:#e8e1d2;border-radius:0 14px 14px 0;padding:40px;color:#222;font:500 22px 'IBM Plex Mono'">
        <div style="width:170px;height:220px;background:#999;position:relative;overflow:hidden"><svg viewBox="-300 -430 600 440" style="position:absolute;inset:0;width:100%;height:100%"><rect x="-300" y="-430" width="600" height="440" fill="#bbb"/><path d="M0,-415 C62,-415 102,-365 102,-300 C102,-245 74,-205 47,-190 L47,-165 C162,-145 252,-95 282,0 L-282,0 C-252,-95 -162,-145 -47,-165 L-47,-190 C-74,-205 -102,-245 -102,-300 C-102,-365 -62,-415 0,-415 Z" fill="#444"/></svg></div>
        <div style="margin-top:28px">NOMBRE: <span style="background:#222;color:#222">XXXXXXXXXX</span></div>
        <div style="margin-top:14px">EMISIÓN: AÑOS 80</div>
        <div style="margin-top:14px" id="epR">RESIDENCIA: ARABIA SAUDITA</div>
        <div style="margin-top:40px;font-size:16px;color:#777">RECREACIÓN</div></div></div>
    <div id="epT" style="position:absolute;right:120px;top:260px;text-align:right;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">TEORÍA</div><div class="cbig" style="font-size:150px">¿ESPÍA?</div><div class="cbig" id="epM" style="font-size:110px;color:#ff2a2a;opacity:0">MOSSAD</div></div>
    ${selloC('epS', 'SIN PRUEBAS', 1180, 700, 120)}`);
  RENDER.push(t => {
    if (!on('e_pas')) return;
    const q = P(t, a, a + .5); $('epP').style.opacity = q * (1 - .65 * P(t, te - .3, te)); $('epP').style.transform = `rotate(-4deg) scale(${lerp(.9, 1, eo(q))})`;
    $('epR').style.background = t > AT('c34', 'Arabia') ? 'rgba(255,42,42,.35)' : 'none';
    $('epT').style.opacity = P(t, te, te + .4); $('epM').style.opacity = P(t, mo - .1, mo + .3); golpeC('epS', t, np, -8);
  });
}
// Towers Financial: una estafa piramidal
{
  const a = S('c38'), pi = S('c39'), mi = AT('c40', 'cuatrocientos'), ho = S('c41'), ep = S('c42'), na = S('c43'), b = S('cap2');
  scene('e_tow', [a - .1, b + .2, .4, .6, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,#160404,#050505 70%)"></div><svg class="full" id="etwS" viewBox="0 0 1920 1080"></svg>
    <div class="clbl" style="opacity:1"><i></i>Towers Financial · 1987</div>
    <div id="etwN" style="position:absolute;left:0;right:0;top:120px;text-align:center;opacity:0"><div class="cbig" style="font-size:150px;color:#ff2a2a">$<span id="etwV">0</span></div><div class="osw" style="font-size:28px;letter-spacing:.3em">DE DÓLARES PERDIDOS</div></div>
    <div class="cpol" id="etwH" style="left:150px;top:330px;width:330px;height:420px;opacity:0"><div class="im"><img src="img/hoffenberg.jpg" style="object-position:50% 25%"></div><div class="tx">S. HOFFENBERG</div></div>
    <div class="cpol" id="etwE" style="left:1440px;top:330px;width:330px;height:420px;opacity:0"><div class="im"><img src="img/epstein-27.jpg" style="object-position:50% 30%"></div><div class="tx">J. EPSTEIN</div></div>
    ${selloC('etwS1', '20 AÑOS', 120, 620, 110)}${selloC('etwS2', 'NUNCA ACUSADO', 1330, 620, 90)}`);
  const svg = $('etwS'), filas = [], cx = 960, top = 420;
  for (let f = 0; f < 6; f++) { const n = f + 1, fila = []; for (let i = 0; i < n; i++) { const x = cx + (i - (n - 1) / 2) * 92, y = top + f * 92; const g = el('g', { opacity: 0, transform: `translate(${x} ${y})` }, svg);
    el('circle', { cy: -18, r: 15, fill: '#ece8e1' }, g); el('path', { d: 'M-24,30 Q-24,0 0,0 Q24,0 24,30 Z', fill: '#ece8e1' }, g); fila.push(g); } filas.push(fila); }
  const flechas = []; for (let f = 1; f < 6; f++) flechas.push(el('path', { d: `M${cx},${top + f * 92 - 40} L${cx},${top + (f - 1) * 92 + 40}`, stroke: '#ff2a2a', 'stroke-width': 6, 'marker-end': '', opacity: 0 }, svg));
  RENDER.push(t => {
    if (!on('e_tow')) return;
    filas.forEach((fila, f) => fila.forEach((g, i) => { const k = P(t, a + .3 + f * .25, a + .6 + f * .25), cae = P(t, mi - .2 + (5 - f) * .08, mi + .5 + (5 - f) * .08);
      g.setAttribute('opacity', k * (1 - .7 * cae)); g.setAttribute('transform', `translate(${cx + (i - f / 2) * 92} ${top + f * 92 + 260 * cae * cae})`); }));
    flechas.forEach((p, i) => p.setAttribute('opacity', P(t, pi + i * .15, pi + .3 + i * .15) * (1 - P(t, mi, mi + .4))));
    $('etwN').style.opacity = P(t, mi - .2, mi + .2); $('etwV').textContent = fmt(460e6 * eo(P(t, mi - .1, mi + 1.2)));
    $('etwH').style.opacity = P(t, a + .2, a + .6); $('etwE').style.opacity = P(t, ep - .3, ep + .1);
    golpeC('etwS1', t, ho + .3, -8); golpeC('etwS2', t, na, -6);
  });
}
});
