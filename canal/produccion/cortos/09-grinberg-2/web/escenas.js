// "Pasó de verdad" · Jacobo Grinberg, parte 2: las pistas, las teorías y la pregunta abierta.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de la UNAM con licencia libre: ver ../09-grinberg-1/web/img/fotos.json.

captions([
  ['h1', 'doce', 'a'], ['h1', 'Grinberg', 'a'], ['h1', 'cuarenta', 'r'], ['h1', 'ocho', 'r'], ['h2', 'Nunca', 'r'], ['h2', 'llegó', 'r'], ['c1', 'India', 'a'],
  ['c2', 'registro', 'r'], ['c2', 'México', 'a'], ['c3', 'esposa', 'a'], ['c3', 'Teresa', 'a'], ['c3', 'desapareció', 'r'], ['c4', 'teorías', 'a'], ['c5', 'chamanes', 'a'],
  ['c6', 'CIA', 'a'], ['c6', 'prueba', 'r'], ['c7', 'cercano', 'a'], ['c8', 'realidad', 'r'], ['c9', 'Ninguna', 'r'], ['c10', 'treinta', 'r'], ['c10', 'cuerpo', 'a'],
  ['c10', 'culpables', 'r'], ['c11', 'libros', 'a'], ['c11', 'nunca', 'r'], ['c12', 'Grinberg', 'a'], ['c12', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'CASO', hide: S('c12') - .1,
  horas: [[2.6, 'DIC 1994', true], [S('c10') - .1, '2026']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('JACOBO<br><span class="r">GRINBERG</span>', { sup: 'PARTE 2' });

SETUP.push(() => {
// ---------- 1 · El 12 de diciembre cumplía 48 ----------
calendarioR('sCal', [-1, S('c1') - .1, .01, .3], { mes: 'DICIEMBRE <span class="r">1994</span>', primero: 3, t0: 2.5,
  bg: '<div style="position:absolute;inset:0;background:url(img/biblioteca.jpg) 26% 50%/cover;filter:grayscale(1) brightness(.6)"></div>',
  marcas: [{ d: 8, t: 2.9, txt: 'DESAPARECE', col: '#3a3a3a' }, { d: 12, t: AT('h1', 'cuarenta y ocho'), txt: 'CUMPLE 48' }],
  inner: selloC('cX', 'NUNCA LLEGÓ', 170, 960, 120) });
RENDER.push(t => { if (on('sCal')) golpeC('cX', t, AT('h2', 'Nunca'), -5); });
// ---------- 2 · ¿La India? Sin registro de salida ----------
{
  const a = S('c1'), ind = AT('c1', 'India'), re = AT('c2', 'registro'), b = S('c3');
  scene('sInd', [a - .1, b - .1, .3, .3, 0], `<svg class="full" id="iS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>De México a la India</div>
    <div id="iT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:150px;opacity:0;text-shadow:0 0 30px #000">¿LA <span class="r">INDIA</span>?</div>
    <div id="iP0" class="cpill" style="position:absolute;left:64px;top:560px;opacity:0">Según su familia: esperaba una invitación</div>
    <div id="iP1" class="cpill" style="position:absolute;left:64px;top:632px;opacity:0;background:#ece8e1;color:#111">Según la investigación</div>
    ${selloC('iX', 'SIN REGISTRO DE SALIDA', 80, 1040, 84)}`);
  const proj = d3.geoNaturalEarth1().fitExtent([[120, 790], [960, 1060]], { type: 'MultiPoint', coordinates: [[-99.13, 19.43], [77.2, 28.6]] });
  const M = mundo($('iS'), { proj }), mx = lugar(M, [-99.13, 19.43], 'MÉXICO', { col: '#ff2a2a', dot: '#ff6060', anchor: 'middle', dy: 52 }), id = lugar(M, [77.2, 28.6], 'INDIA', { anchor: 'middle', dy: 52 });
  const [p1, p2] = [proj([-99.13, 19.43]), proj([77.2, 28.6])];
  const ar = el('path', { d: `M${p1[0]},${p1[1]} Q${(p1[0] + p2[0]) / 2},${Math.min(p1[1], p2[1]) - 150} ${p2[0]},${p2[1]}`, fill: 'none', stroke: '#ff2a2a', 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1 }, M.g);
  RENDER.push(t => {
    if (!on('sInd')) return;
    camMundo(M, 540, 960, 1); mx.fijo(1); id.fijo(1); mx.pulso(t);
    mx.c.setAttribute('opacity', P(t, a, a + .4)); id.c.setAttribute('opacity', P(t, ind - .3, ind));
    ar.style.strokeDasharray = `${io(P(t, ind - .4, ind + 1)).toFixed(4)} 1`; ar.setAttribute('opacity', 1 - .75 * P(t, re - .2, re + .4));
    $('iT').style.opacity = P(t, ind - .4, ind); $('iP0').style.opacity = P(t, a + .1, a + .4); $('iP1').style.opacity = P(t, S('c2') - .1, S('c2') + .25);
    golpeC('iX', t, re, -4);
  });
}
// ---------- 3 · Su esposa, Teresa, también ----------
textosC('sTer', [S('c3') - .1, S('c4') - .1, .3, .3, 1.04], [
  { t: AT('c3', 'otro detalle'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">OTRO DETALLE</span>', size: 100, top: 400 },
  { t: AT('c3', 'esposa'), html: 'SU ESPOSA,<br>TERESA', size: 170, top: 480 },
  { t: AT('c3', 'también'), html: '<span class="r">TAMBIÉN DESAPARECIÓ</span>', size: 100, top: 820 }],
  { inner: selloC('tX', 'NO LA ENCONTRARON', 110, 960, 90) });
RENDER.push(t => { if (on('sTer')) golpeC('tX', t, AT('c3', 'Tampoco'), -5); });
// ---------- 4 · Las teorías ----------
{
  const a = S('c4'), b = S('c10');
  const T = [[S('c5'), 'SE FUE POR SU CUENTA', 'A vivir lejos de todos'], [S('c6'), 'SE LO LLEVARON', 'Hubo quienes señalaron a la CIA: sin ninguna prueba'],
    [S('c7'), 'ALGUIEN CERCANO SABE MÁS', 'Que le pasó algo'], [S('c8'), 'OTRA REALIDAD', 'La más fantástica']];
  scene('sTeo', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:url(img/cu.jpg) 36% 50%/cover;filter:grayscale(1) brightness(.22)"></div>
    <div id="eT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:140px;opacity:0">LAS <span class="r">TEORÍAS</span></div>
    ${T.map(([, s, d], i) => `<div id="eC${i}" style="position:absolute;left:64px;right:64px;top:${560 + i * 104}px;height:92px;padding:10px 22px;box-sizing:border-box;background:#141414;border-left:8px solid #c8101b;opacity:0">
      <div class="cbig" style="font-size:50px;line-height:1"><span style="color:#ff5050">${i + 1}</span> · ${s}</div><div class="osw" style="font-size:20px;letter-spacing:.06em;color:#bbb;margin-top:4px">${d}</div></div>`).join('')}
    ${selloC('eX', 'NINGUNA PROBADA', 120, 990, 110)}`);
  RENDER.push(t => {
    if (!on('sTeo')) return;
    $('eT').style.opacity = P(t, a - .1, a + .3);
    T.forEach(([c], i) => { const q = P(t, c - .1, c + .3), act = t >= c && (i === 3 || t < T[i + 1][0]) && t < S('c9'), n = $('eC' + i);
      n.style.opacity = q * (act || t >= S('c9') ? 1 : .45); n.style.background = act ? '#c8101b' : '#141414'; n.style.transform = `translateX(${lerp(-40, 0, eo(q))}px) scale(${act ? 1.03 : 1})`; });
    golpeC('eX', t, S('c9'), -6);
  });
}
// ---------- 5 · Más de 30 años ----------
{
  const a = S('c10'), b = S('c11');
  scene('sAno', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:0;right:0;top:380px;text-align:center"><div class="cbig" id="aV" style="font-size:230px;color:#ff2a2a">1994</div><div class="osw" style="font-size:34px;letter-spacing:.3em">MÁS DE 30 AÑOS</div></div>
    ${[['cuerpo', 'NO HAY CUERPO'], ['pistas', 'NO HAY PISTAS FIRMES'], ['culpables', 'NO HAY CULPABLES']].map(([f, s], i) => `<div class="cbig" id="aL${i}" data-t="${AT('c10', f)}" style="position:absolute;left:0;right:0;top:${760 + i * 110}px;text-align:center;font-size:96px;opacity:0">${s}</div>`).join('')}`);
  const ls = [...document.querySelectorAll('#sAno [data-t]')];
  RENDER.push(t => {
    if (!on('sAno')) return;
    $('aV').textContent = Math.round(lerp(1994, 2026, eo(P(t, a, a + 1.6))));
    ls.forEach(l => { const q = P(t, +l.dataset.t - .1, +l.dataset.t + .25); l.style.opacity = q; l.style.transform = `translateY(${lerp(20, 0, eo(q))}px)`; });
  });
}
// ---------- 6 · Sus libros ----------
papelesR('sLib', [S('c11') - .1, S('c12') - .1, .3, .3], { texto: 'SUS LIBROS', tNum: S('c11'), rotulo: 'JACOBO GRINBERG', cartel: [AT('c11', 'más que nunca'), 'SE VENDEN <span class="r">MÁS QUE NUNCA</span>'] });
// ---------- 7 · La pregunta ----------
{
  const a = S('c12'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'biblioteca.jpg', { pos: '26% 50%', bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Biblioteca Central · UNAM',
    titulo: '¿QUÉ LE<br><span class="r">PASÓ?</span>', tT: a, size: 200, top: 420, pills: [[AT('c12', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 840, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
