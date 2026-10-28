// "Pasó de verdad" · MrBeast, parte 1: del chico que contó hasta 100.000 al canal más grande del mundo.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre: ver web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'dieciocho', 'a'], ['h1', 'cien', 'r'], ['h1', 'mil', 'r'], ['h2', 'cuarenta', 'a'], ['h2', 'viral', 'r'], ['c1', 'Jimmy', 'a'], ['c1', 'Donaldson', 'a'], ['c1', 'MrBeast', 'r'],
  ['c2', 'trece', 'a'], ['c2', 'universidad', 'r'], ['c3', 'retos', 'a'], ['c3', 'dinero', 'r'], ['c4', 'diez', 'a'], ['c4', 'hogar', 'a'], ['c4', 'patrocinador', 'r'],
  ['c5', 'videos', 'a'], ['c6', 'autos', 'a'], ['c6', 'casas', 'a'], ['c6', 'isla', 'r'], ['c6', 'calamar', 'r'], ['c7', 'árboles', 'a'], ['c7', 'mar', 'a'],
  ['c8', 'suscriptores', 'r'], ['c9', 'generoso', 'a'], ['c10', 'todos', 'r'], ['c10', 'dividió', 'r'], ['c11', 'crítica', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c11') - .1,
  horas: [[2.6, '2017'], [S('c2') - .1, '2012'], [S('c4') - .1, '2017'], [S('c6') - .1, '2021'], [S('c7') - .1, '2019'], [AT('c7', 'treinta millones') - .1, '2021'], [S('c8') - .1, '2024'], [S('c10') - .1, '2023', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('MR<span class="r">BEAST</span>');

SETUP.push(() => {
// ---------- 1 · Contó del 1 al 100.000 ----------
{
  const co = AT('h1', 'contando'), cm = AT('h1', 'cien mil');
  fotoR('sAbre', [-1, S('c1') - .1, .01, .3], 'mb2018.jpg', { pos: '45% 8%', tinte: .45, kb: [1.15, 1.05, 0, 0, 0, 0], lbl: 'MrBeast · 2018',
    inner: `<div id="aN" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0"><div class="osw" style="font-size:32px;letter-spacing:.3em;color:#ff5050">CONTANDO EN VOZ ALTA</div>
      <div class="cbig" id="aV" style="font-size:230px;text-shadow:0 0 40px #000">1</div><div class="osw" style="font-size:30px;letter-spacing:.24em;text-shadow:0 0 20px #000">DEL 1 AL 100.000</div></div>`,
    pills: [[AT('h2', 'cuarenta'), 'Unas 40 horas']], pTop: 800, sello: { t: AT('h2', 'viral'), txt: 'VIRAL', x: 330, y: 930, size: 150 } });
  RENDER.push(t => { if (!on('sAbre')) return; $('aN').style.opacity = P(t, 2.7, 3.1); $('aV').textContent = fmt(Math.max(1, 1e5 * Math.pow(P(t, Math.min(co, 2.8), cm + .6), 2.2))); });
}
// ---------- 2 · Jimmy Donaldson ----------
fotoR('sJim', [S('c1') - .1, S('c2') - .1, .3, .3], 'mb2023.jpg', { pos: '45% 30%', kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Jimmy Donaldson · 2023',
  titulo: 'JIMMY<br><span class="r">DONALDSON</span>', tT: AT('c1', 'Jimmy') - .2, size: 170, top: 700, pills: [[AT('c1', 'internet'), 'En internet: MrBeast']], pTop: 1030 });
textosC('sTre', [S('c2') - .1, S('c3') - .1, .3, .3, 1.04], [
  { t: AT('c2', 'trece'), html: 'DESDE LOS<br><span class="r">13 AÑOS</span>', size: 190, top: 400 },
  { t: AT('c2', 'universidad'), html: 'DEJÓ LA UNIVERSIDAD', size: 110, top: 800 },
  { t: AT('c2', 'YouTube'), html: '<span style="font-size:.5em;color:#8a8a8a;letter-spacing:.1em">PARA DEDICARSE SOLO A YOUTUBE</span>', size: 110, top: 930 }]);
// ---------- 3 · La fórmula ----------
textosC('sFor', [S('c3') - .1, S('c4') - .1, .3, .3, 1.04], [
  { t: AT('c3', 'fórmula'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#ff5050">LA FÓRMULA</span>', size: 100, top: 390 },
  { t: AT('c3', 'retos'), html: 'RETOS<br>IMPOSIBLES', size: 170, top: 470 },
  { t: AT('c3', 'dinero'), html: '<span class="r">+ DINERO</span>', size: 190, top: 790 },
  { t: AT('c3', 'Mucho'), html: '<span style="font-size:.5em">MUCHO.</span>', size: 120, top: 980 }]);
papelesR('sDon', [S('c4') - .1, S('c5') - .1, .3, .3], { num: 10000, pre: 'US$ ', tNum: AT('c4', 'diez mil'), rotulo: 'A UNA PERSONA SIN HOGAR',
  cartel: [AT('c4', 'patrocinador'), 'EL DINERO ERA DE <span class="r">UN PATROCINADOR</span>'] });
// ---------- 4 · Todo de vuelta a los videos ----------
{
  const a = S('c5'), b = S('c6');
  scene('sRei', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div><svg class="full" id="rS" viewBox="0 0 1080 1920"></svg>
    <div class="cbig" style="position:absolute;left:0;right:0;top:390px;text-align:center;font-size:120px">TODO LO QUE GANABA</div>
    <div id="rB" class="cbig" style="position:absolute;left:0;right:0;top:1000px;text-align:center;font-size:110px;opacity:0"><span class="r">VOLVÍA A LOS VIDEOS</span></div>`);
  const c = el('circle', { cx: 540, cy: 790, r: 170, fill: 'none', stroke: '#ff2a2a', 'stroke-width': 14, pathLength: 1, 'stroke-dasharray': '0 1', 'stroke-linecap': 'round', transform: 'rotate(-90 540 790)' }, $('rS'));
  const pf = el('path', { d: 'M0,-34 L40,0 L0,34 Z', fill: '#ff2a2a' }, $('rS')), dol = el('text', { x: 540, y: 850, 'text-anchor': 'middle', fill: '#ece8e1', 'font-family': 'Bebas Neue', 'font-size': 190 }, $('rS')); dol.textContent = '$';
  RENDER.push(t => {
    if (!on('sRei')) return; const k = eo(P(t, a, a + 2.2)), ang = -Math.PI / 2 + k * 2 * Math.PI * .92;
    c.style.strokeDasharray = `${(k * .92).toFixed(3)} 1`; pf.setAttribute('transform', `translate(${540 + 170 * Math.cos(ang)} ${790 + 170 * Math.sin(ang)}) rotate(${ang * 180 / Math.PI + 90})`); pf.setAttribute('opacity', k > .02 ? 1 : 0);
    $('rB').style.opacity = P(t, AT('c5', 'volvía') - .2, AT('c5', 'volvía') + .2);
  });
}
// ---------- 5 · Autos, casas, una isla ----------
fotoR('sReg', [S('c6') - .1, AT('c6', 'Recreó') - .1, .3, .3], 'vidcon.jpg', { pos: '30% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Stand de MrBeast · VidCon 2022',
  pills: [[AT('c6', 'autos'), 'Autos'], [AT('c6', 'casas'), 'Casas'], [AT('c6', 'isla'), 'Hasta una isla']], pTop: 440, pillStyle: '' });
{
  const a = AT('c6', 'Recreó'), cu = AT('c6', 'cuatrocientas'), b = S('c7');
  scene('sCal', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:110px">EL JUEGO<br><span class="r">DEL CALAMAR</span></div>
    <div class="cbig" style="position:absolute;left:64px;top:620px;font-size:90px"><span id="cV">0</span> PERSONAS</div>
    <div style="position:absolute;left:94px;top:740px;display:grid;grid-template-columns:repeat(24,34px);gap:4px">${Array.from({ length: 456 }, () => '<i class="cD" style="display:block;height:14px;border-radius:3px;background:#ece8e1;opacity:.08"></i>').join('')}</div>
    <div class="clbl" style="opacity:1"><i></i>Recreación del juego, con premio de 456.000 dólares</div>`);
  const ds = [...document.querySelectorAll('#sCal .cD')];
  RENDER.push(t => { if (!on('sCal')) return; const n = Math.round(456 * eo(P(t, cu - .3, cu + 1.6))); $('cV').textContent = n; ds.forEach((d, i) => { d.style.opacity = i < n ? 1 : .08; d.style.background = i === n - 1 ? '#ff2a2a' : '#ece8e1'; }); });
}
// ---------- 6 · Árboles y basura del mar ----------
{
  const a = S('c7'), v = AT('c7', 'veinte millones'), tr = AT('c7', 'treinta millones'), b = S('c8');
  scene('sArb', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div id="bA" style="position:absolute;left:64px;right:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">2019 · PARA PLANTAR ÁRBOLES</div>
      <div class="cbig" style="font-size:190px">US$ <span id="bV1">0</span></div><div style="height:26px;background:#222"><div id="bB1" style="height:100%;width:0;background:#ece8e1"></div></div></div>
    <div id="bM" style="position:absolute;left:64px;right:64px;top:780px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">2021 · PARA SACAR BASURA DEL MAR</div>
      <div class="cbig" style="font-size:190px;color:#ff2a2a">US$ <span id="bV2">0</span></div><div style="height:26px;background:#222"><div id="bB2" style="height:100%;width:0;background:#c8101b"></div></div></div>`);
  RENDER.push(t => {
    if (!on('sArb')) return; const k1 = eo(P(t, v - .2, v + 1.2)), k2 = eo(P(t, tr - .2, tr + 1.2));
    $('bA').style.opacity = P(t, v - .4, v - .1); $('bV1').textContent = Math.round(20 * k1) + 'M'; $('bB1').style.width = 66.6 * k1 + '%';
    $('bM').style.opacity = P(t, tr - .4, tr - .1); $('bV2').textContent = Math.round(30 * k2) + 'M'; $('bB2').style.width = 100 * k2 + '%';
  });
}
// ---------- 7 · El canal más grande del mundo ----------
fotoR('sSub', [S('c8') - .1, S('c9') - .1, .3, .3], 'mb2026.jpg', { pos: '45% 30%', kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'MrBeast · 2026',
  titulo: 'N.º 1<br><span class="r">DEL MUNDO</span>', tT: AT('c8', 'canal') - .2, size: 190, top: 700, pills: [[AT('c8', 'suscriptores'), 'El canal con más suscriptores']], pTop: 1060 });
fotoR('sGen', [S('c9') - .1, S('c10') - .1, .3, .3], 'pavos.jpg', { pos: '70% 50%', kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Beast Philanthropy reparte comida · Greenville, EE. UU.',
  titulo: 'EL MÁS<br><span class="r">GENEROSO</span>', tT: AT('c9', 'generoso') - .4, size: 170, pills: [[AT('c9', 'millones'), 'Para millones']], pTop: 760 });
// ---------- 8 · Pero no para todos ----------
textosC('sNo', [S('c10') - .1, S('c11') - .1, .3, .3, 1.04], [
  { t: S('c10'), html: 'PERO<br><span class="r">NO PARA TODOS</span>', size: 170, top: 400 },
  { t: AT('c10', 'enero'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">ENERO DE 2023 · UN VIDEO</span>', size: 100, top: 760 }],
  { inner: selloC('nX', 'DIVIDIÓ A INTERNET', 110, 880, 100) });
RENDER.push(t => { if (on('sNo')) golpeC('nX', t, AT('c10', 'dividió'), -5); });
// ---------- 9 · Parte 2 ----------
{
  const a = S('c11'), b = TL.duration;
  fotoR('sP2', [a - .1, b + 1, .3, .01], 'mb2023.jpg', { pos: '45% 30%', bn: true, tinte: .4, kb: [1.15, 1.25, 0, 0, 0, 0],
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:440px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:150px;margin-top:40px;text-shadow:0 0 30px #000">LA CRÍTICA<br><span class="r">MÁS GRANDE</span></div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, a + .2, a + .7); });
}
});
