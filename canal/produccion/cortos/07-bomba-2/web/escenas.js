// "Pasó de verdad" · La bomba atómica, parte 2: Hiroshima, Nagasaki, la rendición, Oppenheimer y lo que queda hoy.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver ../07-bomba-1/web/img/fotos.json.
// No se muestran víctimas: ruinas, la nube, la sombra en la piedra y los números.

captions([
  ['h1', 'seis', 'a'], ['h1', 'agosto', 'a'], ['h1', 'Enola', 'a'], ['h1', 'Gay', 'a'], ['h1', 'Hiroshima', 'r'], ['h2', 'cuarenta', 'r'], ['h2', 'tres', 'r'],
  ['c1', 'seiscientos', 'a'], ['c1', 'Little', 'a'], ['c1', 'Boy', 'a'], ['c2', 'setenta', 'r'], ['c2', 'sombra', 'r'], ['c3', 'no', 'r'], ['c3', 'rindió', 'r'],
  ['c4', 'Kokura', 'a'], ['c4', 'nublado', 'a'], ['c4', 'Nagasaki', 'r'], ['c5', 'Fat', 'a'], ['c5', 'Man', 'a'], ['c6', 'Hirohito', 'a'], ['c6', 'voz', 'a'],
  ['c7', 'doscientas', 'r'], ['c8', 'invasión', 'a'], ['c8', 'discuten', 'a'], ['c9', 'sangre', 'r'], ['c10', 'Truman', 'a'], ['c11', 'Guerra', 'a'], ['c11', 'Fría', 'a'],
  ['c11', 'anuló', 'a'], ['c12', 'doce', 'r'], ['c12', 'nucleares', 'r'], ['c13', 'necesaria', 'r'], ['c13', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c12') - .1,
  horas: [[S('h1') - .1, '06·08·1945 · 8:15', true], [S('c4') - .1, '09·08·1945'], [S('c5') - .1, '09·08 · 11:02', true], [S('c6') - .1, '15·08·1945'], [S('c7') - .1, 'FIN DE 1945'],
    [S('c9') - .1, 'OCT 1945'], [S('c11') - .1, '1954'], [AT('c11', 'Recién') - .1, '2022'], [S('c12') - .1, 'HOY']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · El Enola Gay ----------
fotoR('sEno', [-1, S('h2') - .1, .01, .3], 'enola.jpg', { bn: true, kb: [1.2, 1.1, 0, 0, 0, 0], lbl: 'El Enola Gay · B-29',
  titulo: '6 DE AGOSTO<br><span class="r">8:15</span>', tT: .2, size: 160 });
// ---------- 2 · Cuarenta y tres segundos ----------
{
  const a = S('h2'), b = S('c1');
  scene('sCae', [a - .1, b - .1, .2, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#101418,#050505 70%)"></div><svg class="full" id="cS" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:0;right:0;top:420px;text-align:center"><div class="cbig" id="cV" style="font-size:340px;color:#ff2a2a">43</div><div class="osw" style="font-size:36px;letter-spacing:.3em">SEGUNDOS DE CAÍDA</div></div>`);
  const bomba = el('g', {}, $('cS')); el('path', { d: 'M-26,-70 L26,-70 L30,50 L0,80 L-30,50 Z', fill: '#3a3a3a' }, bomba); el('rect', { x: -40, y: -100, width: 80, height: 34, fill: '#2a2a2a' }, bomba);
  RENDER.push(t => { if (!on('sCae')) return; const k = P(t, a, b); $('cV').textContent = Math.max(0, Math.round(43 - 43 * k)); bomba.setAttribute('transform', `translate(540 ${820 + 300 * k * k}) rotate(${4 * Math.sin(t * 3)})`); });
}
fotoR('sLb', [S('c1') - .1, S('c2') - .1, .3, .3], 'littleboy.jpg', { bn: true, kb: [1.08, 1.18, 0, 0, 0, 0], lbl: 'Little Boy, antes de cargarla en el avión · Tinian',
  titulo: 'LITTLE <span class="r">BOY</span>', tT: AT('c1', 'Little Boy') - .2, size: 170, pills: [[AT('c1', 'seiscientos'), 'Explotó a 600 metros de altura']], pTop: 620 });
// ---------- 3 · Hiroshima ----------
{
  const a = S('c2'), se = AT('c2', 'setenta'), de = AT('c2', 'De algunas'), b = S('c3');
  fotoR('sHir', [a - .1, de, .2, .3], 'hiroshima-nube.jpg', { bn: true, kb: [1.05, 1.15, 0, 0, 0, 0], lbl: 'La nube sobre Hiroshima',
    inner: `<div id="hN" style="position:absolute;left:64px;top:420px;opacity:0"><div class="cbig" style="font-size:210px;color:#ff2a2a;text-shadow:0 0 30px #000" id="hV">0</div><div class="osw" style="font-size:34px;letter-spacing:.2em;text-shadow:0 0 20px #000">MUERTOS EN EL ACTO</div></div>` });
  RENDER.push(t => { if (!on('sHir')) return; $('hN').style.opacity = P(t, se - .2, se + .1); $('hV').textContent = fmt(70000 * eo(P(t, se, se + 1.2))); });
  fotoR('sSom', [de - .1, b - .1, .3, .3], 'sombra.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Una sombra en la escalinata de un banco · Hiroshima, 1945',
    titulo: 'SOLO QUEDÓ<br><span class="r">LA SOMBRA</span>', tT: AT('c2', 'sombra') - .2, size: 140 });
}
fotoR('sDom', [S('c3') - .1, S('c4') - .1, .3, .3], 'domo.jpg', { bn: true, kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Hiroshima, después de la bomba',
  sello: { t: AT('c3', 'rindió'), txt: 'JAPÓN NO SE RINDE', x: 70, y: 860, size: 100 } });
// ---------- 4 · Kokura estaba nublada ----------
docC('sMap', [S('c4') - .1, S('c5') - .1, .3, .3], 'mapa-mision.jpg', { ancho: 760, alto: 1000, y: 380, dy: -160,
  zoom: [[S('c4') - .1, 50, 45, .9], [AT('c4', 'Kokura'), 50, 40, 1.05], [AT('c4', 'Nagasaki'), 50, 50, 1.05]],
  fijo: `<div style="position:absolute;left:0;right:0;top:0;height:400px;background:linear-gradient(#050505 72%,transparent)"></div><div style="position:absolute;left:0;right:0;top:1060px;bottom:0;background:linear-gradient(transparent,#050505 14%)"></div>
    <div class="clbl" style="opacity:1"><i></i>Las dos misiones · mapa</div>
    <div id="mK" class="cpill" style="position:absolute;left:64px;top:420px;opacity:0">Objetivo: Kokura</div><div id="mN" class="cpill" style="position:absolute;left:64px;top:490px;opacity:0;background:#000;border:2px solid #ff2a2a">Nublado → Nagasaki</div>` });
RENDER.push(t => { if (!on('sMap')) return; $('mK').style.opacity = P(t, AT('c4', 'Kokura') - .2, AT('c4', 'Kokura') + .2); $('mN').style.opacity = P(t, AT('c4', 'nublado') - .2, AT('c4', 'nublado') + .2); });
fotoR('sNag', [S('c5') - .1, S('c6') - .1, .3, .3], 'nagasaki-nube.jpg', { bn: true, kb: [1.05, 1.15, 0, 0, 0, 0], lbl: 'La nube sobre Nagasaki',
  titulo: 'NAGASAKI<br><span class="r">11:02</span>', tT: S('c5'), size: 170, pills: [[AT('c5', 'Fat Man'), 'Fat Man']], pTop: 760 });
// ---------- 5 · La rendición ----------
fotoR('sRad', [S('c6') - .1, S('c7') - .1, .3, .3], 'radio.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Japoneses escuchando el mensaje del emperador',
  titulo: 'LA <span class="r">RENDICIÓN</span>', tT: AT('c6', 'rendición') - .2, size: 160, pills: [[AT('c6', 'Hirohito'), 'El emperador Hirohito, por radio'], [AT('c6', 'primera vez'), 'Nunca habían oído su voz']], pTop: 620 });
// ---------- 6 · Más de doscientas mil ----------
{
  const a = S('c7'), do2 = AT('c7', 'doscientas'), b = S('c8');
  fotoR('sTot', [a - .1, b - .1, .3, .3], 'nagasaki-antes-despues.jpg', { bn: true, kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Nagasaki, antes y después',
    inner: `<div id="tN" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0;background:rgba(5,5,5,.75);padding:20px 0"><div class="cbig" style="font-size:190px;color:#ff2a2a">+<span id="tV">0</span></div><div class="osw" style="font-size:32px;letter-spacing:.2em">MUERTOS A FIN DE 1945</div></div>` });
  RENDER.push(t => { if (!on('sTot')) return; $('tN').style.opacity = P(t, do2 - .2, do2 + .1); $('tV').textContent = fmt(200000 * eo(P(t, do2, do2 + 1.2))); });
}
textosC('sDeb', [S('c8') - .1, S('c9') - .1, .3, .3, 1.04], [
  { t: AT('c8', 'evitó'), html: '¿EVITÓ<br><span class="r">UNA INVASIÓN?</span>', size: 160, top: 420 },
  { t: AT('c8', 'historiadores'), html: '<span style="font-size:.5em">LOS HISTORIADORES TODAVÍA LO DISCUTEN</span>', size: 110, top: 800 }]);
// ---------- 7 · Oppenheimer y Truman ----------
citaR('sSan', [S('c9') - .1, S('c10') - .1, .3, .3], '«Siento que tengo las manos manchadas de sangre.»', AT('c9', 'siento'), E('c9'),
  'OPPENHEIMER AL PRESIDENTE TRUMAN', 'Octubre de 1945 · según quienes lo contaron · traducción',
  { bg: `<div class="cfoto"><img src="img/oppenheimer-1946.jpg" style="object-position:50% 25%;filter:grayscale(1) brightness(.35)"></div>` });
fotoR('sTru', [S('c10') - .1, S('c11') - .1, .3, .3], 'truman.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Harry S. Truman',
  titulo: 'HARRY <span class="r">TRUMAN</span>', tT: S('c10'), size: 150, top: 760, pills: [[AT('c10', 'no quería'), 'No quería volver a verlo']], pTop: 920 });
fotoR('sCas', [S('c11') - .1, S('c12') - .1, .3, .3], 'oppenheimer.jpg', { bn: true, pos: '50% 25%', tinte: .3, kb: [1.08, 1.16, 0, 0, 0, 0], lbl: 'J. Robert Oppenheimer',
  inner: `${selloC('cX1', '1954 · SIN ACCESO', 70, 830, 92)}${selloC('cX2', '2022 · ANULADO', 330, 990, 92)}` });
RENDER.push(t => { if (!on('sCas')) return; golpeC('cX1', t, AT('c11', 'quitaron'), -6); golpeC('cX2', t, AT('c11', 'anuló'), 4); });
// ---------- 8 · Hoy ----------
{
  const a = S('c12'), b = S('c13');
  scene('sHoy', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:64px;top:400px"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">HOY, EN EL MUNDO</div><div class="cbig" style="font-size:220px;color:#ff2a2a">+<span id="yV">0</span></div><div class="cbig" style="font-size:90px">ARMAS NUCLEARES</div></div>
    <div style="position:absolute;left:64px;top:850px;display:grid;grid-template-columns:repeat(20,40px);gap:8px">${Array.from({ length: 120 }, () => '<div class="yD" style="height:40px;border-radius:50%;background:#c8101b;opacity:0"></div>').join('')}</div>
    <div class="mono" style="position:absolute;left:64px;top:1130px;font-size:18px;color:#8a8a8a">cada punto: 100 armas · Federación de Científicos Estadounidenses, 2025</div>`);
  const ds = [...document.querySelectorAll('#sHoy .yD')];
  RENDER.push(t => { if (!on('sHoy')) return; const k = eo(P(t, AT('c12', 'doce') - .1, AT('c12', 'doce') + 1.2)); $('yV').textContent = fmt(12000 * k); ds.forEach((d, i) => d.style.opacity = i < 120 * k ? 1 : 0); });
}
// ---------- 9 · ¿Fue necesaria? ----------
{
  const a = S('c13'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'hiroshima-ruinas.jpg', { bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Hiroshima, 1945',
    titulo: '¿FUE<br><span class="r">NECESARIA?</span>', tT: a, size: 190, top: 440, pills: [[AT('c13', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 860, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
