// "Pasó de verdad" · O. J. Simpson, parte 2: el guante que debía condenarlo, el veredicto y todo lo que vino después.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre o de dominio público: ver ../11-oj-1/web/img/fotos.json.

captions([
  ['h1', 'junio', 'a'], ['h1', 'fiscalía', 'a'], ['h1', 'guante', 'r'], ['h2', 'entraba', 'r'], ['c1', 'cuero', 'a'], ['c1', 'látex', 'a'], ['c1', 'pantallas', 'r'],
  ['c2', 'Cochran', 'a'], ['c2', 'entra', 'r'], ['c2', 'absolverlo', 'r'], ['c3', 'Fuhrman', 'a'], ['c3', 'racistas', 'r'], ['c3', 'mentido', 'r'], ['c4', 'duda', 'a'], ['c4', 'plantado', 'r'],
  ['c5', 'octubre', 'a'], ['c5', 'cuatro', 'a'], ['c5', 'veredicto', 'r'], ['c6', 'ciento', 'a'], ['c6', 'culpable', 'r'], ['c7', 'civil', 'a'], ['c7', 'responsable', 'r'], ['c7', 'millones', 'a'],
  ['c8', 'libro', 'a'], ['c8', 'hecho', 'r'], ['c9', 'Vegas', 'a'], ['c9', 'armados', 'r'], ['c10', 'condenaron', 'r'], ['c10', 'treinta', 'a'], ['c11', 'abril', 'a'], ['c11', 'cáncer', 'a'],
  ['c11', 'negó', 'r'], ['c12', 'guante', 'r'], ['c12', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c12') - .1,
  horas: [[2.6, '15 JUN 1995'], [S('c5') - .1, '3 OCT 1995', true], [S('c7') - .1, '1997'], [S('c8') - .1, '2007'], [S('c10') - .1, '2008'], [AT('c10', 'Salió') - .1, '2017'], [S('c11') - .1, 'ABR 2024', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('O. J.<br><span class="r">SIMPSON</span>', { sup: 'PARTE 2' });

SETUP.push(() => {
// ---------- 1 · Pruébese el guante ----------
{
  const gu = AT('h1', 'guante'), b = S('c1');
  scene('sGua', [-1, b - .1, .01, .3, 1.04], `<div style="position:absolute;inset:0;background:url(img/ficha.jpg) 50% 30%/cover;filter:grayscale(1) brightness(.5)"></div>
    <div id="gO" style="position:absolute;inset:0;background:rgba(5,5,5,.75);opacity:0"></div><svg class="full" id="gS" viewBox="0 0 1080 1920"></svg>
    <div id="gT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:32px;letter-spacing:.3em;color:#ff5050">LA FISCALÍA LE PIDIÓ</div><div class="cbig" style="font-size:130px">PRUÉBESE<br>EL GUANTE</div></div>
    ${selloC('gX', 'NO LE ENTRABA', 110, 990, 120)}<div class="clbl" style="opacity:1"><i></i>Ilustración · el juicio fue televisado</div>`);
  const g = guante($('gS'), 640, 600, 1.3), fi = AT('h1', 'fiscalía'), pr = AT('h1', 'probara');
  RENDER.push(t => {
    if (!on('sGua')) return; const q = P(t, 2.7, 3.1);
    $('gO').style.opacity = q; $('gT').style.opacity = P(t, Math.max(fi - .2, 2.8), Math.max(fi + .1, 3.1)); g.setAttribute('opacity', P(t, Math.max(pr - .2, 2.9), Math.max(pr + .2, 3.2)));
    const sq = P(t, S('h2') - .3, S('h2') + .1); g.setAttribute('transform', `translate(${640 + 6 * Math.sin(t * 40) * sq * (1 - P(t, S('h2') + .1, S('h2') + .5))} 600) scale(1.3)`);
    golpeC('gX', t, AT('h2', 'entraba'), -5);
  });
}
textosC('sExp', [S('c1') - .1, S('c2') - .1, .3, .3, 1.04], [
  { t: AT('c1', 'cuero'), html: '<span style="font-size:.6em">EL CUERO SE MOJÓ<br>Y SE SECÓ VARIAS VECES</span>', size: 130, top: 390 },
  { t: AT('c1', 'látex'), html: '<span style="font-size:.6em;color:#8a8a8a">Y TENÍA GUANTES DE LÁTEX DEBAJO</span>', size: 130, top: 600 },
  { t: AT('c1', 'Pero'), html: '<span class="r">PERO LA IMAGEN<br>YA ESTABA EN<br>TODAS LAS PANTALLAS</span>', size: 100, top: 730 }]);
// ---------- 2 · Cochran ----------
fotoR('sCoc', [S('c2') - .1, S('c3') - .1, .3, .3], 'cochran.jpg', { pos: '50% 30%', bn: true, tinte: .25, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Johnnie Cochran',
  titulo: 'JOHNNIE<br><span class="r">COCHRAN</span>', tT: AT('c2', 'Johnnie') - .2, size: 170, top: 400, tHasta: AT('c2', 'si no') - .1, pills: [[AT('c2', 'abogado'), 'Su abogado']], pTop: 740,
  inner: `<div id="cQ" style="position:absolute;left:64px;right:64px;top:400px;opacity:0"><div class="cbig" style="font-size:110px;text-shadow:0 0 30px #000">"SI NO LE ENTRA,<br><span class="r">TIENEN QUE ABSOLVERLO"</span></div>
    <div class="mono" style="font-size:26px;color:#ccc;margin-top:20px;text-shadow:0 0 10px #000">"If it doesn't fit, you must acquit"</div></div>` });
RENDER.push(t => { if (on('sCoc')) $('cQ').style.opacity = P(t, AT('c2', 'si no') - .1, AT('c2', 'si no') + .2); });
// ---------- 3 · Fuhrman ----------
fotoR('sFuh', [S('c3') - .1, S('c4') - .1, .3, .3], 'fuhrman.jpg', { pos: '40% 30%', bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Mark Fuhrman · 2008',
  titulo: 'MARK<br><span class="r">FUHRMAN</span>', tT: AT('c3', 'Mark') - .2, size: 170, top: 400,
  pills: [[AT('c3', 'detectives'), 'Uno de los detectives'], [AT('c3', 'racistas'), 'Había usado insultos racistas'], [AT('c3', 'mentido'), 'Y mintió sobre eso en el juicio']], pTop: 740 });
textosC('sDud', [S('c4') - .1, S('c5') - .1, .3, .3, 1.04], [
  { t: AT('c4', 'sembró'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">LA DEFENSA SEMBRÓ LA DUDA</span>', size: 100, top: 400 },
  { t: AT('c4', 'y si'), html: '¿Y SI LA POLICÍA<br><span class="r">HABÍA PLANTADO<br>PRUEBAS?</span>', size: 140, top: 500 }]);
// ---------- 4 · El veredicto ----------
fotoR('sVer', [S('c5') - .1, S('c6') - .1, .3, .3], 'ito.jpg', { pos: '50% 30%', bn: true, tinte: .3, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'El juez Lance Ito · octubre de 1995',
  titulo: '3 DE OCTUBRE<br><span class="r">DE 1995</span>', tT: AT('c5', 'tres de octubre') - .2, size: 140, top: 400,
  pills: [[AT('c5', 'menos de cuatro'), 'Menos de 4 horas de deliberación'], [AT('c5', 'veredicto'), 'El veredicto']], pTop: 700 });
{
  const a = S('c6'), ci = AT('c6', 'ciento'), nc = AT('c6', 'no culpable'), b = S('c7');
  scene('sNC', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:url(img/tribunal.jpg) 50% 50%/cover;filter:grayscale(1) brightness(.2)"></div>
    <div style="position:absolute;left:0;right:0;top:400px;text-align:center"><div class="cbig" id="nV" style="font-size:170px;color:#ff2a2a">0</div><div class="osw" style="font-size:32px;letter-spacing:.24em">PERSONAS LO VIERON</div></div>
    ${selloC('nX', 'NO CULPABLE', 130, 760, 170)}`);
  RENDER.push(t => { if (!on('sNC')) return; $('nV').textContent = fmt(150e6 * eo(P(t, ci - .2, ci + 1.3))); golpeC('nX', t, nc, -6); });
}
// ---------- 5 · El juicio civil ----------
{
  const a = S('c7'), re = AT('c7', 'responsable'), tr = AT('c7', 'treinta y tres'), b = S('c8');
  fotoR('sCiv', [a - .1, b - .1, .3, .3], 'civil.jpg', { pos: '50% 50%', bn: true, tinte: .35, kb: [1, 1.08, 0, 0, 0, 0], lbl: 'Simpson durante el juicio civil · 1997',
    titulo: 'JUICIO<br><span class="r">CIVIL</span>', tT: AT('c7', 'civil') - .2, size: 170, top: 400, tHasta: tr - .3, sello: { t: re, txt: 'RESPONSABLE', x: 120, y: 760, size: 120 },
    inner: `<div id="vM" style="position:absolute;left:64px;right:64px;top:400px;opacity:0"><div class="cbig" style="font-size:150px;color:#ff2a2a;text-shadow:0 0 30px #000">US$ <span id="vV">0</span></div>
      <div class="osw" style="font-size:30px;letter-spacing:.2em;text-shadow:0 0 20px #000">A PAGAR A LAS FAMILIAS</div></div>` });
  RENDER.push(t => { if (!on('sCiv')) return; $('vM').style.opacity = P(t, tr - .3, tr); $('vV').textContent = fmt(33.5e6 * eo(P(t, tr - .1, tr + 1.4))); });
}
// ---------- 6 · El libro ----------
{
  const a = S('c8'), li = AT('c8', 'libro'), si = AT('c8', 'Si yo'), b = S('c9');
  scene('sLib', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#1a0707,#050505 70%)"></div><div class="clbl" style="opacity:1"><i></i>Ilustración</div>
    <div id="bL" style="position:absolute;left:300px;top:400px;width:480px;height:620px;background:linear-gradient(90deg,#111 0 36px,#1d1d1d 36px);box-shadow:0 30px 80px rgba(0,0,0,.8);opacity:0">
      <div class="osw" style="position:absolute;left:70px;right:30px;top:50px;font-size:26px;letter-spacing:.3em;color:#bbb">O. J. SIMPSON</div>
      <div class="cbig" style="position:absolute;left:70px;right:20px;top:170px;font-size:104px;color:#fff;line-height:.95">SI YO<br>LO HUBIERA<br><span class="r">HECHO</span></div>
      <div class="mono" style="position:absolute;left:70px;bottom:40px;font-size:22px;color:#999">"If I Did It" · 2007</div></div>`);
  RENDER.push(t => { if (!on('sLib')) return; const q = P(t, li - .2, li + .4); $('bL').style.opacity = q; $('bL').style.transform = `perspective(1400px) rotateY(${lerp(-35, -10, eo(q)).toFixed(1)}deg) scale(${lerp(.9, 1, eo(P(t, si - .2, si + .6)))})`; });
}
// ---------- 7 · Las Vegas, 2007 ----------
fotoR('sVeg', [S('c9') - .1, S('c10') - .1, .3, .3], 'palace.jpg', { pos: '62% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Hotel Palace Station · Las Vegas',
  titulo: 'LAS VEGAS<br><span class="r">2007</span>', tT: AT('c9', 'Las Vegas') - .2, size: 170, top: 400,
  pills: [[AT('c9', 'armados'), 'Con hombres armados'], [AT('c9', 'recuerdos'), 'Para recuperar recuerdos deportivos']], pTop: 720 });
fotoR('sPri', [S('c10') - .1, S('c11') - .1, .3, .3], 'lovelock.jpg', { pos: '50% 50%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Prisión de Lovelock, Nevada',
  titulo: 'HASTA<br><span class="r">33 AÑOS</span>', tT: AT('c10', 'treinta y tres') - .2, size: 190, top: 400, sello: { t: AT('c10', 'condenaron'), txt: 'CULPABLE', x: 300, y: 780, size: 120 },
  pills: [[AT('c10', 'libertad'), 'Libertad condicional en 2017']], pTop: 1020 });
// ---------- 8 · 2024 ----------
fotoR('sMue', [S('c11') - .1, S('c12') - .1, .3, .3], 'oj1990.jpg', { pos: '50% 20%', bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'O. J. Simpson · 1990',
  titulo: 'ABRIL<br><span class="r">2024</span>', tT: AT('c11', 'abril') - .2, size: 190, top: 400,
  pills: [[AT('c11', 'cáncer'), 'Murió de cáncer'], [AT('c11', 'negó'), 'Siempre negó haber matado a Nicole y a Ron']], pTop: 760 });
{
  const a = S('c12'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'tribunal.jpg', { pos: '50% 50%', bn: true, tinte: .4, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Tribunal penal de Los Ángeles',
    titulo: '¿LO SALVÓ<br><span class="r">EL GUANTE?</span>', tT: a, size: 170, top: 420, pills: [[AT('c12', 'todo lo demás'), '¿O todo lo demás?'], [AT('c12', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 780, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
