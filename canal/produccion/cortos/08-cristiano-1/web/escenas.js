// "Pasó de verdad" · Cristiano Ronaldo, parte 1: el chico al que le decían llorón (de Madeira al primer Balón de Oro).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre: ver web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'madre', 'a'], ['h1', 'no', 'r'], ['h1', 'tenerlo', 'r'], ['h2', 'Cristiano', 'a'], ['h2', 'Ronaldo', 'a'], ['c1', 'Madeira', 'a'], ['c1', 'humilde', 'a'],
  ['c2', 'alcohol', 'r'], ['c3', 'doce', 'a'], ['c3', 'solo', 'r'], ['c4', 'acento', 'a'], ['c4', 'llorón', 'r'], ['c5', 'corazón', 'r'], ['c5', 'entrenando', 'a'],
  ['c6', 'Manchester', 'a'], ['c6', 'United', 'a'], ['c7', 'siete', 'r'], ['c8', 'egoísta', 'r'], ['c9', 'padre', 'r'], ['c9', 'alcohol', 'r'],
  ['c10', 'Balón', 'a'], ['c10', 'Oro', 'a'], ['c10', 'arrogante', 'r'], ['c11', 'dos', 'r'], ['c11', 'importó', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c11') - .1,
  horas: [[S('c1') - .1, '1985'], [S('c3') - .1, '1997'], [S('c5') - .1, '2000'], [S('c6') - .1, '2003'], [S('c9') - .1, '2005'], [S('c10') - .1, '2008', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('CRISTIANO<br><span class="r">RONALDO</span>');

SETUP.push(() => {
// ---------- 1 · Su madre pensó en no tenerlo ----------
fotoR('sAbre', [-1, S('c1') - .1, .01, .3], 'cr2026.jpg', { pos: '50% 25%', tinte: .3, kb: [1.15, 1.05, 0, 0, 0, 0], lbl: 'Cristiano Ronaldo · 2026',
  pills: [[AT('h1', 'pensó'), 'Su madre pensó en no tenerlo']], pTop: 980 });
// ---------- 2 · Madeira, 1985 ----------
fotoR('sIsl', [S('c1') - .1, S('c2') - .1, .3, .3], 'madeira.jpg', { kb: [1.1, 1.22, 0, -40, 0, 0], lbl: 'Funchal, Madeira',
  titulo: 'MADEIRA<br><span class="r">1985</span>', tT: AT('c1', 'Madeira') - .2, size: 170, pills: [[AT('c1', 'humilde'), 'Una casa humilde']], pTop: 800 });
textosC('sPad', [S('c2') - .1, S('c3') - .1, .3, .3, 1.04], [
  { t: S('c2'), html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">SU PADRE</span>', size: 100, top: 420 },
  { t: AT('c2', 'utilero'), html: 'UTILERO<br>DE UN CLUB', size: 160, top: 500 },
  { t: AT('c2', 'alcohol'), html: '<span class="r">Y EL ALCOHOL</span>', size: 140, top: 840 }]);
// ---------- 3 · A los 12, solo, a Lisboa ----------
{
  const a = S('c3'), li = AT('c3', 'Lisboa'), so = AT('c3', 'solo'), b = S('c4');
  scene('sLis', [a - .1, b - .1, .3, .3, 0], `<svg class="full" id="lS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>De Madeira a Lisboa</div>
    <div id="lT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="cbig" style="font-size:150px">12 AÑOS<br><span class="r">SOLO</span></div></div>
    <div id="lK" class="cpill" style="position:absolute;left:64px;top:730px;opacity:0">Casi 1.000 kilómetros</div>`);
  const proj = d3.geoMercator().fitExtent([[80, 640], [1000, 1120]], { type: 'MultiPoint', coordinates: [[-17.5, 32.3], [-8.5, 39.5]] });
  const M = mundo($('lS'), { proj }), md = lugar(M, [-16.92, 32.65], 'MADEIRA', { anchor: 'start' }), lb = lugar(M, [-9.14, 38.72], 'LISBOA', { col: '#ff2a2a', dot: '#ff6060', anchor: 'end' }), ar = arco(M, [-16.92, 32.65], [-9.14, 38.72], '#ff2a2a', 5);
  RENDER.push(t => {
    if (!on('sLis')) return;
    camMundo(M, 540, 960, 1); md.fijo(1); lb.fijo(1); lb.pulso(t); md.c.setAttribute('opacity', P(t, a, a + .4)); ar.draw(io(P(t, li - .6, li + .4))); lb.c.setAttribute('opacity', P(t, li - .2, li + .2));
    $('lT').style.opacity = P(t, so - .3, so + .1); $('lK').style.opacity = P(t, AT('c3', 'mil kilómetros') - .3, AT('c3', 'mil kilómetros'));
  });
}
textosC('sLlo', [S('c4') - .1, S('c5') - .1, .3, .3, 1.04], [
  { t: AT('c4', 'acento'), html: '<span style="font-size:.5em">SE BURLABAN DE SU ACENTO</span>', size: 130, top: 420 },
  { t: AT('c4', 'Lloraba'), html: 'LLORABA<br>CASI TODOS LOS DÍAS', size: 140, top: 540 }], { inner: selloC('lX', 'EL LLORÓN', 230, 900, 130) });
RENDER.push(t => { if (on('sLlo')) golpeC('lX', t, AT('c4', 'llorón'), -6); });
// ---------- 4 · El corazón ----------
{
  const a = S('c5'), op = AT('c5', 'operaron'), b = S('c6');
  scene('sCor', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div><svg class="full" id="cS" viewBox="0 0 1080 1920"></svg>
    <div id="cT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">A LOS 15 AÑOS</div><div class="cbig" style="font-size:140px">EL CORAZÓN<br><span class="r">DEMASIADO RÁPIDO</span></div></div>
    <div id="cP" class="cpill" style="position:absolute;left:64px;top:1060px;opacity:0">Operado · a los pocos días, entrenando</div>`);
  const pts = []; for (let x = 0; x <= 1080; x += 6) { const ph = (x % 90); pts.push(`${x},${880 + (ph > 40 && ph < 50 ? -120 : ph > 50 && ph < 56 ? 70 : 0)}`); }
  const lin = el('polyline', { points: pts.join(' '), fill: 'none', stroke: '#ff2a2a', 'stroke-width': 6, pathLength: 1, 'stroke-dasharray': '0 1' }, $('cS'));
  RENDER.push(t => { if (!on('sCor')) return; $('cT').style.opacity = P(t, a, a + .4); lin.style.strokeDasharray = `${P(t, a, b - .2).toFixed(3)} 1`; lin.setAttribute('stroke', t > op ? '#ece8e1' : '#ff2a2a'); $('cP').style.opacity = P(t, op - .1, op + .3); });
}
// ---------- 5 · Manchester United y la número 7 ----------
fotoR('sMU', [S('c6') - .1, S('c8') - .1, .3, .3], 'united.jpg', { kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Manchester United',
  titulo: 'MANCHESTER<br><span class="r">UNITED</span>', tT: AT('c6', 'Manchester United') - .2, size: 150, pills: [[AT('c6', 'dieciocho'), '18 años'], [AT('c7', 'siete'), 'La camiseta número 7']], pTop: 760 });
fotoR('sEgo', [S('c8') - .1, S('c9') - .1, .3, .3], 'united2007.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Cristiano Ronaldo · 2007',
  titulo: '¿EGOÍSTA?', tT: AT('c8', 'egoísta') - .2, size: 190, pills: [[AT('c8', 'adornarse'), 'Lo acusaban de adornarse con la pelota']], pTop: 640 });
// ---------- 6 · 2005: muere su padre ----------
textosC('sPap', [S('c9') - .1, S('c10') - .1, .3, .3, 1.04], [
  { t: S('c9'), html: '<span class="r">2005</span>', size: 260, top: 400 },
  { t: AT('c9', 'murió'), html: 'MUERE SU PADRE', size: 120, top: 660 },
  { t: AT('c9', 'veinte'), html: '<span style="font-size:.5em;color:#8a8a8a">CRISTIANO TENÍA 20 AÑOS</span>', size: 120, top: 790 },
  { t: AT('c9', 'casi no toma'), html: '<span style="font-size:.5em">CASI NO TOMA ALCOHOL</span>', size: 120, top: 870 }]);
// ---------- 7 · El primer Balón de Oro y la palabra "arrogante" ----------
fotoR('sBal', [S('c10') - .1, S('c11') - .1, .3, .3], 'balon.jpg', { kb: [1.05, 1.15, 0, 0, 0, 0], lbl: 'Con el Balón de Oro',
  titulo: 'BALÓN<br><span class="r">DE ORO</span>', tT: AT('c10', 'Balón de Oro') - .2, size: 170, tHasta: AT('c10', 'arrogante') - .1,
  sello: { t: AT('c10', 'arrogante'), txt: '¿ARROGANTE?', x: 200, y: 600, size: 140 } });
// ---------- 8 · Parte 2 ----------
{
  const a = S('c11'), b = TL.duration;
  fotoR('sP2', [a - .1, b + 1, .3, .01], 'siu.jpg', { pos: '67% 40%', bn: true, tinte: .35, kb: [1.2, 1.3, 0, 0, 0, 0],
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:440px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:150px;margin-top:40px;text-shadow:0 0 30px #000">POR QUÉ<br><span class="r">NO LE IMPORTÓ</span></div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, a + .2, a + .7); });
}
});
