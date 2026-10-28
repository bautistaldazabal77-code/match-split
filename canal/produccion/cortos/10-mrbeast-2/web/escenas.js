// "Pasó de verdad" · MrBeast, parte 2: las 1.000 operaciones de cataratas y la crítica más grande que enfrentó.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre: ver ../10-mrbeast-1/web/img/fotos.json.
// Las fotos de quirófanos son ilustrativas: no son del video de MrBeast.

captions([
  ['h1', 'Mil', 'r'], ['h1', 'ciegas', 'a'], ['h1', 'video', 'a'], ['h2', 'mil', 'r'], ['h2', 'cataratas', 'a'], ['h2', 'diez', 'a'], ['h2', 'reacciones', 'a'],
  ['c1', 'millones', 'a'], ['c1', 'críticas', 'r'], ['c2', 'pobres', 'a'], ['c2', 'enfermas', 'a'], ['c2', 'pornografía', 'r'], ['c2', 'pobreza', 'r'], ['c3', 'publicidad', 'r'],
  ['c4', 'ricos', 'a'], ['c4', 'malo', 'r'], ['c5', 'ceguera', 'a'], ['c5', 'gobiernos', 'r'], ['c6', 'cien', 'r'], ['c6', 'pozos', 'a'], ['c6', 'África', 'a'],
  ['c7', 'cancelar', 'r'], ['c7', 'importa', 'a'], ['c8', 'Kenia', 'a'], ['c8', 'gobierno', 'r'], ['c9', 'problema', 'r'], ['c10', 'peor', 'r'], ['c10', 'vistas', 'a'],
  ['c11', 'mil', 'a'], ['c11', 'ver', 'a'], ['c12', 'cámara', 'a'], ['c12', 'ayudar', 'r'], ['c12', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c12') - .1,
  horas: [[2.6, 'ENE 2023'], [S('c6') - .1, 'NOV 2023', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('MR<span class="r">BEAST</span>', { sup: 'PARTE 2' });

SETUP.push(() => {
// ---------- 1 · El video ----------
fotoR('sAbre', [-1, S('h2') - .1, .01, .3], 'cirugia.jpg', { pos: '52% 50%', tinte: .4, kb: [1.2, 1.08, 0, 0, 0, 0], lbl: 'Cirugía de cataratas (foto ilustrativa)',
  titulo: '"1.000 PERSONAS CIEGAS<br><span class="r">VEN POR PRIMERA VEZ"</span>', tT: 2.8, size: 96, top: 440, pills: [[AT('h1', 'Así'), 'El video · enero de 2023']], pTop: 660 });
fotoR('sOps', [S('h2') - .1, S('c1') - .1, .3, .3], 'bedele.jpg', { pos: '62% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Cirugía de cataratas en Etiopía (foto ilustrativa)',
  pills: [[AT('h2', 'mil operaciones'), '1.000 operaciones de cataratas'], [AT('h2', 'diez minutos'), 'Unos 10 minutos cada una'], [AT('h2', 'filmó'), 'Y filmó las reacciones']], pTop: 440 });
papelesR('sVis', [S('c1') - .1, S('c2') - .1, .3, .3], { texto: 'MILLONES', tNum: AT('c1', 'decenas'), rotulo: 'DE VISTAS', cartel: [AT('c1', 'lluvia'), 'Y UNA <span class="r">LLUVIA DE CRÍTICAS</span>'] });
// ---------- 2 · La acusación ----------
textosC('sAcu', [S('c2') - .1, S('c3') - .1, .3, .3, 1.04], [
  { t: AT('c2', 'acusaron'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">LO ACUSARON DE</span>', size: 100, top: 390 },
  { t: AT('c2', 'usar'), html: 'USAR A PERSONAS<br>POBRES Y ENFERMAS', size: 120, top: 470 },
  { t: AT('c2', 'vistas'), html: '<span style="font-size:.6em">PARA CONSEGUIR VISTAS</span>', size: 120, top: 720 },
  { t: AT('c2', 'pornografía'), html: '<span class="r">"PORNOGRAFÍA<br>DE LA POBREZA"</span>', size: 110, top: 860 }]);
{
  const a = S('c3'), b = S('c4'), mi = AT('c3', 'millones');
  scene('sPub', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:32px;letter-spacing:.3em;color:#8a8a8a">LA CRÍTICA</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:460px;text-align:center;font-size:130px">CADA VIDEO<br>DE AYUDA</div>
    <div id="uF" class="cbig" style="position:absolute;left:0;right:0;top:730px;text-align:center;font-size:150px;opacity:0;color:#ff2a2a">= MILLONES</div>
    <div id="uP" class="osw" style="position:absolute;left:0;right:0;top:900px;text-align:center;font-size:40px;letter-spacing:.3em;opacity:0">EN PUBLICIDAD</div>`);
  RENDER.push(t => { if (!on('sPub')) return; $('uF').style.opacity = P(t, mi - .2, mi + .1); $('uF').style.transform = `scale(${lerp(1.3, 1, eo(P(t, mi - .2, mi + .2)))})`; $('uP').style.opacity = P(t, AT('c3', 'publicidad') - .2, AT('c3', 'publicidad') + .1); });
}
// ---------- 3 · Su respuesta ----------
citaR('sRes', [S('c4') - .1, S('c5') - .1, .3, .3], 'La gente dice que los ricos deberían ayudar con su dinero. Yo lo hago, y dicen que soy malo.', AT('c4', 'la gente'), E('c4') - .3,
  'MRBEAST', 'Su respuesta en X · enero de 2023 (paráfrasis)', { bg: '<div style="position:absolute;inset:0;background:url(img/mb2023.jpg) 45% 30%/cover;filter:grayscale(1) brightness(.22)"></div>' });
textosC('sGob', [S('c5') - .1, S('c6') - .1, .3, .3, 1.04], [
  { t: AT('c5', 'preguntó'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">Y PREGUNTÓ</span>', size: 100, top: 390 },
  { t: AT('c5', 'ceguera'), html: '¿POR QUÉ LA CEGUERA<br>CURABLE SIGUE<br>EXISTIENDO?', size: 110, top: 470 },
  { t: AT('c5', 'gobiernos'), html: '<span class="r">¿Y LOS GOBIERNOS?</span>', size: 130, top: 870 }]);
// ---------- 4 · 100 pozos de agua en África ----------
{
  const a = S('c6'), ci = AT('c6', 'cien'), b = S('c7');
  scene('sPoz', [a - .1, b - .1, .3, .3, 0], `<svg class="full" id="zS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Kenia, Camerún, Somalia, Zimbabue y Uganda</div>
    <div style="position:absolute;left:64px;top:380px"><div class="cbig" style="font-size:220px;line-height:.9"><span id="zV" class="r">0</span></div><div class="cbig" style="font-size:90px">POZOS DE AGUA</div></div>`);
  const proj = d3.geoMercator().fitExtent([[300, 560], [1040, 1130]], { type: 'MultiPoint', coordinates: [[-17, -35], [51, 37]] });
  const M = mundo($('zS'), { proj }), ps = ['404', '120', '706', '716', '800'].map(id => M.pais(id, '#c8101b'));
  RENDER.push(t => {
    if (!on('sPoz')) return; camMundo(M, 540, 960, 1);
    ps.forEach((p, i) => p.setAttribute('opacity', P(t, ci + i * .2, ci + .3 + i * .2)));
    $('zV').textContent = Math.round(100 * eo(P(t, ci - .1, ci + 1.4)));
  });
}
citaR('sCan', [S('c7') - .1, S('c8') - .1, .3, .3], 'Ya sé que me van a cancelar por ayudar a la gente, y no me importa.', AT('c7', 'ya sé'), E('c7') - .3,
  'MRBEAST', 'En X, antes de que saliera el video · noviembre de 2023 (paráfrasis)', { bg: '<div style="position:absolute;inset:0;background:url(img/mb2026.jpg) 45% 30%/cover;filter:grayscale(1) brightness(.22)"></div>' });
textosC('sKen', [S('c8') - .1, S('c9') - .1, .3, .3, 1.04], [
  { t: AT('c8', 'Kenia'), html: 'EN <span class="r">KENIA</span>', size: 190, top: 390 },
  { t: AT('c8', 'apuntaron'), html: '<span style="font-size:.5em;color:#8a8a8a">MUCHOS APUNTARON A OTRO LADO</span>', size: 110, top: 600 },
  { t: AT('c8', 'un youtuber'), html: 'UN YOUTUBER HIZO<br>LO QUE SU <span class="r">GOBIERNO</span><br>NO HACÍA', size: 110, top: 700 }]);
textosC('sPro', [S('c9') - .1, S('c10') - .1, .3, .3, 1.06], [
  { t: S('c9'), html: '¿DÓNDE ESTÁ<br><span class="r">EL PROBLEMA?</span>', size: 170, top: 520 }]);
// ---------- 5 · Las dos miradas ----------
{
  const a = S('c10'), o = S('c11'), b = S('c12');
  scene('sDos', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:#050505"></div>
    <div id="dA" style="position:absolute;left:0;right:0;top:360px;height:380px;overflow:hidden;opacity:0"><div style="position:absolute;inset:0;background:url(img/malawi.jpg) 50% 50%/cover;filter:grayscale(1) brightness(.35)"></div>
      <div style="position:absolute;left:64px;right:64px;top:40px"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#ff5050">PARA UNOS</div>
      <div class="cbig" style="font-size:72px;margin-top:10px;text-shadow:0 0 20px #000">MOSTRAR A ALGUIEN EN SU PEOR MOMENTO PARA GANAR VISTAS NO ESTÁ BIEN</div></div></div>
    <div id="dB" style="position:absolute;left:0;right:0;top:760px;height:380px;overflow:hidden;opacity:0"><div style="position:absolute;inset:0;background:url(img/antesdespues.jpg) 80% 50%/cover;filter:brightness(.4)"></div>
      <div style="position:absolute;left:64px;right:64px;top:40px"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#ff5050">PARA OTROS</div>
      <div class="cbig" style="font-size:72px;margin-top:10px;text-shadow:0 0 20px #000">1.000 PERSONAS VOLVIERON A VER. ES LO ÚNICO QUE IMPORTA</div></div></div>
    <div class="clbl" style="opacity:1"><i></i>Fotos ilustrativas: quirófano y ojo operado de cataratas</div>`);
  RENDER.push(t => {
    if (!on('sDos')) return;
    const qa = P(t, a, a + .4), qb = P(t, o - .1, o + .3);
    $('dA').style.opacity = qa * (1 - .55 * qb); $('dA').style.transform = `translateX(${lerp(-60, 0, eo(qa))}px)`;
    $('dB').style.opacity = qb; $('dB').style.transform = `translateX(${lerp(60, 0, eo(qb))}px)`;
  });
}
// ---------- 6 · La pregunta ----------
{
  const a = S('c12'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'mb2023.jpg', { pos: '45% 30%', bn: true, tinte: .4, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'MrBeast · 2023',
    titulo: '¿AYUDAR EN CÁMARA<br><span class="r">SIGUE SIENDO AYUDAR?</span>', tT: a, size: 104, top: 440, pills: [[AT('c12', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 680, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
