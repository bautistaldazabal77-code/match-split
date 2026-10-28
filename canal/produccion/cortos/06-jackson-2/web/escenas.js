// "Pasó de verdad" · Michael Jackson, parte 2: las acusaciones, el juicio de 2005 (absuelto), la noche del propofol y lo que quedó.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver ../06-jackson-1/web/img/fotos.json.
// Cuidado: fue absuelto de todos los cargos; las acusaciones se cuentan como acusaciones y con su negativa. No se nombra ni se muestra a ningún menor.

captions([
  ['h1', 'trece', 'a'], ['h1', 'Michael', 'a'], ['h1', 'Jackson', 'a'], ['h2', 'negó', 'a'], ['h2', 'cargos', 'r'], ['c1', 'culpa', 'a'], ['c2', 'documental', 'a'],
  ['c3', 'arrestaron', 'r'], ['c4', 'no', 'a'], ['c4', 'culpable', 'a'], ['c4', 'catorce', 'a'], ['c5', 'absolvieron', 'a'], ['c6', 'cincuenta', 'a'], ['c6', 'Londres', 'a'],
  ['c6', 'deuda', 'r'], ['c7', 'Conrad', 'a'], ['c7', 'Murray', 'a'], ['c7', 'propofol', 'r'], ['c8', 'dosis', 'r'], ['c9', 'respiraba', 'r'], ['c9', 'Murió', 'r'],
  ['c10', 'condenado', 'r'], ['c11', 'niega', 'a'], ['c11', 'condena', 'a'], ['c12', 'genio', 'a'], ['c12', 'cuentas', 'r'], ['c13', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c12') - .1,
  horas: [[S('h1') - .1, '1993'], [S('c1') - .1, '1994'], [S('c2') - .1, '2003'], [S('c4') - .1, '2005'], [S('c6') - .1, '2009'], [S('c8') - .1, '25·06·2009', true],
    [S('c10') - .1, '2011'], [S('c11') - .1, '2019']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · 1993: la primera acusación ----------
fotoR('sAcu', [-1, S('c1') - .1, .01, .3], 'portones.jpg', { bn: true, tinte: .3, kb: [1.2, 1.08, 0, 0, 0, 0], lbl: 'Rancho Neverland',
  titulo: 'AGOSTO<br><span class="r">1993</span>', tT: .2, size: 170, pills: [[AT('h1', 'acusó'), 'Una acusación de abuso'], [AT('h2', 'negó'), 'Él lo negó'], [AT('h2', 'registró'), 'La policía registró el rancho']], pTop: 760,
  sello: { t: AT('h2', 'No hubo'), txt: 'SIN CARGOS', x: 240, y: 1000, size: 110 } });
// ---------- 2 · 1994: el acuerdo ----------
textosC('sAcd', [S('c1') - .1, S('c2') - .1, .3, .3, 1.04], [
  { t: S('c1'), html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">1994 · DEMANDA CIVIL</span>', size: 90, top: 400 },
  { t: AT('c1', 'acuerdo millonario'), html: 'ACUERDO<br><span class="r">MILLONARIO</span>', size: 170, top: 470 },
  { t: AT('c1', 'sin admitir'), html: '<span style="font-size:.5em">SIN ADMITIR CULPA</span>', size: 120, top: 840 }]);
// ---------- 3 · 2003: el documental ----------
{
  const a = S('c2'), b = S('c3');
  scene('sDoc', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#141414,#050505 70%)"></div>
    <div id="dV" style="position:absolute;left:90px;top:420px;width:900px;height:560px;border:14px solid #1d1d1d;border-radius:24px;background:#0b0f14;box-shadow:0 30px 80px rgba(0,0,0,.7);overflow:hidden;opacity:0">
      <div style="position:absolute;inset:0;background:repeating-linear-gradient(rgba(255,255,255,.05) 0 2px,transparent 2px 5px)"></div>
      <div style="position:absolute;left:40px;top:34px;font:500 24px Oswald;letter-spacing:.24em;color:#8a8a8a">DOCUMENTAL DE TELEVISIÓN · 2003</div>
      <div class="cbig" style="position:absolute;left:40px;right:40px;top:150px;font-size:96px">COMPARTÍA SU CAMA<br><span class="r">CON NIÑOS</span></div>
      <div id="dQ" class="osw" style="position:absolute;left:40px;top:430px;font-size:36px;letter-spacing:.06em;opacity:0">Dijo: no hay nada sexual</div></div>`);
  RENDER.push(t => { if (!on('sDoc')) return; const q = P(t, a, a + .4); $('dV').style.opacity = q; $('dV').style.transform = `scale(${lerp(.94, 1, eo(q))})`; $('dQ').style.opacity = P(t, AT('c2', 'nada sexual') - .2, AT('c2', 'nada sexual') + .2); });
}
// ---------- 4 · El arresto ----------
fotoR('sArr', [S('c3') - .1, S('c4') - .1, .3, .3], 'mug2003.jpg', { bn: true, pos: '76% 40%', kb: [1.0, 1.06, 0, 0, 0, 0], lbl: 'Foto policial · noviembre de 2003',
  pills: [[AT('c3', 'denunció'), 'Otra familia lo denuncia']], pTop: 420, sello: { t: AT('c3', 'arrestaron'), txt: 'ARRESTADO', x: 240, y: 940, size: 120 } });
// ---------- 5 · 2005: catorce cargos, catorce "no culpable" ----------
{
  const a = S('c4'), nc = AT('c4', 'no culpable'), b = S('c5');
  scene('sJui', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#141414,#050505 70%)"></div>
    <div id="jT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">2005 · TRIBUNAL DE SANTA BÁRBARA</div><div class="cbig" style="font-size:120px">EL VEREDICTO</div></div>
    <div style="position:absolute;left:64px;top:600px;display:grid;grid-template-columns:repeat(2,466px);gap:14px">${Array.from({ length: 14 }, (_, i) => `<div class="jC" style="height:52px;border:2px solid #333;background:#101010;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:500 24px Oswald;letter-spacing:.12em;color:#8a8a8a"><span>CARGO ${i + 1}</span><b style="color:#ece8e1;opacity:0">NO CULPABLE</b></div>`).join('')}</div>`);
  const cs = [...document.querySelectorAll('#sJui .jC')];
  RENDER.push(t => { if (!on('sJui')) return; $('jT').style.opacity = P(t, a, a + .4); cs.forEach((c, i) => { const q = P(t, nc + i * .1, nc + .15 + i * .1); c.lastElementChild.style.opacity = q; c.style.borderColor = q > .5 ? '#ece8e1' : '#333'; }); });
}
fotoR('sAbs', [S('c5') - .1, S('c6') - .1, .3, .3], 'vegas2003.jpg', { bn: true, tinte: .3, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Michael Jackson · 2003',
  titulo: '<span class="r">ABSUELTO</span>', tT: AT('c5', 'absolvieron') - .2, size: 190, pills: [[AT('c5', 'nunca volvió'), 'Nunca volvió a ser el mismo'], [AT('c5', 'Se fue'), 'Se fue de Estados Unidos']], pTop: 640 });
// ---------- 6 · 2009: cincuenta conciertos ----------
{
  const a = S('c6'), ci = AT('c6', 'cincuenta conciertos'), de = AT('c6', 'deuda'), b = S('c7');
  scene('sLon', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div id="lT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">LONDRES · 2009</div><div class="cbig" style="font-size:140px"><span class="r">50</span> CONCIERTOS</div></div>
    <div style="position:absolute;left:64px;top:620px;display:grid;grid-template-columns:repeat(10,84px);gap:10px">${Array.from({ length: 50 }, () => `<div class="lC" style="height:40px;background:#c8101b;opacity:0"></div>`).join('')}</div>
    <div id="lD" class="cpill" style="position:absolute;left:64px;top:900px;opacity:0;background:#000;border:2px solid #ff2a2a">Tenía 50 años y una deuda enorme</div>`);
  const cs = [...document.querySelectorAll('#sLon .lC')];
  RENDER.push(t => { if (!on('sLon')) return; $('lT').style.opacity = P(t, a, a + .4); cs.forEach((c, i) => c.style.opacity = P(t, ci + i * .025, ci + .1 + i * .025)); $('lD').style.opacity = P(t, de - .3, de); });
}
// ---------- 7 · El propofol y el médico ----------
fotoR('sPro', [S('c7') - .1, S('c8') - .1, .3, .3], 'propofol.jpg', { kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Una ampolla de propofol',
  titulo: '<span class="r">PROPOFOL</span>', tT: AT('c7', 'propofol') - .2, size: 170, top: 420, pills: [[AT('c7', 'anestésico'), 'Un anestésico de quirófano']], pTop: 600,
  inner: `<div class="cpol" id="pM" style="left:600px;top:720px;width:380px;height:440px;opacity:0"><div class="im"><img src="img/murray.jpg" style="object-position:50% 25%"></div><div class="tx">CONRAD MURRAY</div></div>` });
RENDER.push(t => { if (!on('sPro')) return; const q = P(t, AT('c7', 'Conrad Murray') - .2, AT('c7', 'Conrad Murray') + .2); $('pM').style.opacity = q; $('pM').style.transform = `rotate(4deg) scale(${lerp(1.15, 1, eo(q))})`; });
// ---------- 8 · La noche del 25 de junio ----------
{
  const a = S('c8'), un = AT('c8', 'una dosis'), sa = AT('c8', 'salió'), b = S('c9');
  scene('sNoc', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#0f1218,#050505 70%)"></div><svg class="full" id="nS" viewBox="0 0 1080 1920"></svg>
    <div id="nT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">25 DE JUNIO DE 2009 · LOS ÁNGELES</div><div class="cbig" style="font-size:130px">UNA DOSIS <span class="r">MÁS</span></div></div>
    <div id="nX" class="cpill" style="position:absolute;left:64px;top:1040px;opacity:0">El médico sale de la habitación</div>`);
  const svg = $('nS'), g = el('g', { transform: 'translate(540 820)', opacity: 0 }, svg);
  el('circle', { r: 160, fill: 'none', stroke: '#8a8a8a', 'stroke-width': 8 }, g);
  for (let i = 0; i < 12; i++) el('line', { x1: 0, y1: -140, x2: 0, y2: -124, stroke: '#8a8a8a', 'stroke-width': 6, transform: `rotate(${i * 30})` }, g);
  const hm = el('line', { x1: 0, y1: 0, x2: 0, y2: -120, stroke: '#ece8e1', 'stroke-width': 8, 'stroke-linecap': 'round' }, g), hh = el('line', { x1: 0, y1: 0, x2: 0, y2: -80, stroke: '#ff2a2a', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  RENDER.push(t => { if (!on('sNoc')) return; $('nT').style.opacity = Math.max(P(t, a, a + .4) * .6, P(t, un - .2, un + .2));
    g.setAttribute('opacity', P(t, a + .2, a + .6)); const m = (t - a) * 90; hm.setAttribute('transform', `rotate(${m})`); hh.setAttribute('transform', `rotate(${300 + m / 12})`); $('nX').style.opacity = P(t, sa - .2, sa + .2); });
}
// ---------- 9 · Murió a los 50 ----------
fotoR('sMue', [S('c9') - .1, S('c10') - .1, .3, .3], 'ucla.jpg', { bn: true, tinte: .3, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Centro Médico UCLA · Los Ángeles',
  titulo: 'NO<br><span class="r">RESPIRABA</span>', tT: AT('c9', 'respiraba') - .3, size: 170, pills: [[AT('c9', 'Murió'), 'Murió a los 50 años']], pTop: 780 });
// ---------- 10 · El médico, condenado ----------
fotoR('sMur', [S('c10') - .1, S('c11') - .1, .3, .3], 'murray.jpg', { bn: true, pos: '50% 22%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Conrad Murray · foto policial',
  pills: [[AT('c10', 'homicidio'), 'Homicidio involuntario'], [AT('c10', 'menos de dos'), 'Menos de 2 años preso']], pTop: 420,
  sello: { t: AT('c10', 'condenado'), txt: 'CONDENADO · 2011', x: 120, y: 1010, size: 96 } });
// ---------- 11 · 2019 ----------
textosC('sD19', [S('c11') - .1, S('c12') - .1, .3, .3, 1.04], [
  { t: S('c11'), html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">2019 · UN DOCUMENTAL</span>', size: 90, top: 400 },
  { t: AT('c11', 'dos hombres'), html: 'NUEVAS<br><span class="r">ACUSACIONES</span>', size: 150, top: 470 },
  { t: AT('c11', 'niega'), html: '<span style="font-size:.5em">SU FAMILIA LO NIEGA</span>', size: 120, top: 790 },
  { t: AT('c11', 'Nunca'), html: '<span style="font-size:.5em" class="r">NUNCA HUBO CONDENA</span>', size: 120, top: 880 }]);
// ---------- 12 · Dos miradas ----------
fotoR('sDos', [S('c12') - .1, S('c13') - .1, .3, .3], 'estrella.jpg', { tinte: .25, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Su estrella en Hollywood · junio de 2009',
  titulo: 'UN GENIO<br>VÍCTIMA DE TODOS', tT: AT('c12', 'genio') - .3, size: 120, top: 420, pills: [[AT('c12', 'Para otros'), 'O alguien que nunca rindió cuentas', 'font-size:34px']], pTop: 720 });
// ---------- 13 · ¿Y vos? ----------
{
  const a = S('c13'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'memorial.jpg', { bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Homenaje · julio de 2009',
    titulo: '¿Y VOS<br><span class="r">QUÉ PENSÁS?</span>', tT: a, size: 170, top: 440, pills: [[AT('c13', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 820, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
