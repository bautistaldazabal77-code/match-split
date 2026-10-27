// "Pasó de verdad" · Jeffrey Epstein, parte 2: la detención de 2019, la noche del 10 de agosto, el minuto que falta y los archivos.
// Estilo caso real (caso.js) en vertical. Fotos de dominio público o con licencia libre: ver ../../../03-epstein/web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'seis', 'a'], ['h1', 'julio', 'a'], ['h1', 'Epstein', 'a'], ['h2', 'esperando', 'r'], ['c1', 'tráfico', 'r'], ['c1', 'vida', 'r'], ['c2', 'muerto', 'r'],
  ['c3', 'cuello', 'r'], ['c3', 'quitaron', 'r'], ['c4', 'Nadie', 'r'], ['c5', 'rondas', 'r'], ['c5', 'falsificado', 'r'], ['c5', 'cámaras', 'r'], ['c5', 'grabaron', 'r'],
  ['c6', 'seis', 'a'], ['c6', 'media', 'a'], ['c6', 'vida', 'r'], ['c7', 'suicidio', 'a'], ['c7', 'negligencias', 'r'], ['c8', 'minuto', 'r'], ['c8', 'medianoche', 'r'],
  ['c9', 'juicio', 'r'], ['c9', 'Maxwell', 'a'], ['c9', 'veinte', 'a'], ['c10', 'tres', 'a'], ['c10', 'millones', 'a'], ['c10', 'nombres', 'a'],
  ['c11', 'no', 'r'], ['c11', 'delito', 'r'], ['c12', 'red', 'a'], ['c12', 'demás', 'r'], ['c13', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c11') - .1,
  horas: [[S('h1') - .1, '06·07·2019'], [S('c3') - .1, '23·07·2019'], [AT('c3', 'Seis días') - .1, '29·07·2019'], [S('c4') - .1, '09·08·2019'], [S('c5') - .1, '10·08·2019', true],
    [S('c7') - .1, '2023'], [S('c8') - .1, '2025'], [S('c9') - .1, '2021'], [S('c10') - .1, '2026']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
const hh = v => [Math.floor(v / 3600) % 24, Math.floor(v / 60) % 60, Math.floor(v) % 60].map(n => String(n).padStart(2, '0')).join(':');

SETUP.push(() => {
// ---------- 1 · De París a Nueva Jersey ----------
{
  const nj = AT('h1', 'Nueva Jersey'), av = AT('h1', 'avión');
  scene('sMap', [-1, av + .2, .01, .3, 0], `<svg class="full" id="mS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>6 de julio de 2019</div>`);
  const proj = d3.geoMercator().fitExtent([[60, 520], [1020, 1100]], { type: 'MultiPoint', coordinates: [[-80, 34], [6, 54]] });
  const M = mundo($('mS'), { proj });
  const pa = lugar(M, [2.35, 48.85], 'PARÍS', { anchor: 'end' }), te = lugar(M, [-74.06, 40.85], 'NUEVA JERSEY', { col: '#ff2a2a', dot: '#ff6060' }), ar = arco(M, [2.35, 48.85], [-74.06, 40.85], '#ff2a2a', 5);
  RENDER.push(t => {
    if (!on('sMap')) return;
    camMundo(M, 540, 960, 1); pa.fijo(1); te.fijo(1); te.pulso(t);
    pa.c.setAttribute('opacity', P(t, 0, .4)); ar.draw(io(P(t, .3, nj + .2))); te.c.setAttribute('opacity', P(t, nj - .3, nj + .1));
  });
  fotoC('sTet', [av - .1, S('c1') - .1, .3, .3], 'teterboro.jpg', { lbl: 'Aeropuerto de Teterboro · Nueva Jersey', kb: [1.1, 1.22, 0, 0, 0, 0],
    inner: `<div id="tB" class="cbig" style="position:absolute;left:64px;top:430px;font-size:170px;opacity:0;text-shadow:0 0 30px #000">LO ESTABAN<br><span class="r">ESPERANDO</span></div>` });
  RENDER.push(t => { if (on('sTet')) $('tB').style.opacity = P(t, S('h2') - .1, S('h2') + .3); });
}
// ---------- 2 · La acusación (documento real) ----------
docC('sAcu', [S('c1') - .1, S('c2') - .1, .3, .3], 'acusacion-2019.jpg', { ancho: 860, alto: 1111, y: 380, dy: -220,
  zoom: [[S('c1') - .1, 50, 35, .9], [AT('c1', 'tráfico'), 50, 36, 1.3]],
  marcas: [{ t: AT('c1', 'tráfico'), x: 31, y: 34.3, w: 36, h: 4.8 }],
  sello: { t: AT('c1', 'resto'), txt: 'HASTA 45 AÑOS', x: 140, y: 880, size: 120, rot: -6 },
  fijo: `<div style="position:absolute;left:0;right:0;top:0;height:420px;background:linear-gradient(#050505 72%,transparent)"></div><div style="position:absolute;left:0;right:0;top:1060px;bottom:0;background:linear-gradient(transparent,#050505 14%)"></div><div class="clbl" style="opacity:1"><i></i>Acusación federal · julio de 2019</div>` });
// ---------- 3 · Un mes después ----------
fotoC('sMue', [S('c2') - .1, S('c3') - .1, .3, .3], 'mcc.jpg', { lbl: 'Centro Correccional Metropolitano · Manhattan', kb: [1.08, 1.2, 0, 0, 0, -30],
  inner: `<div id="uM" class="cbig" style="position:absolute;left:64px;top:430px;font-size:170px;opacity:0;text-shadow:0 0 30px #000">UN MES<br><span class="r">DESPUÉS</span></div>` });
RENDER.push(t => { if (on('sMue')) $('uM').style.opacity = P(t, S('c2'), S('c2') + .4); });
// ---------- 4 · Cronología: del 23 de julio al 9 de agosto ----------
{
  const it = [[S('c3'), '23 JUL', 'MARCAS EN EL CUELLO'], [AT('c3', 'vigilancia'), '23 JUL', 'VIGILANCIA ANTISUICIDIO'], [AT('c3', 'Seis días'), '29 JUL', 'SE LA QUITAN'],
    [S('c4'), '9 AGO', 'TRASLADAN A SU COMPAÑERO'], [AT('c4', 'Nadie'), '9 AGO', 'NADIE LO REEMPLAZA']];
  scene('sCro', [S('c3') - .1, S('c5') - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div class="clbl" style="opacity:1"><i></i>Celda del piso 9 · unidad especial</div>
    <div style="position:absolute;left:120px;top:420px;width:4px;height:700px;background:#333"></div><div id="cL" style="position:absolute;left:118px;top:420px;width:8px;height:700px;background:#ff2a2a;transform-origin:50% 0;transform:scaleY(0)"></div>
    ${it.map(([, d, s], i) => `<div id="cH${i}" style="position:absolute;left:170px;top:${400 + i * 150}px;opacity:0"><div class="cbig" style="font-size:64px;color:#ff2a2a">${d}</div><div class="osw" style="font-size:40px;letter-spacing:.04em">${s}</div></div>
      <div id="cP${i}" style="position:absolute;left:106px;top:${424 + i * 150}px;width:32px;height:32px;border-radius:50%;background:#ff2a2a;opacity:0"></div>`).join('')}`);
  RENDER.push(t => {
    if (!on('sCro')) return;
    let k = 0; it.forEach(([ti], i) => { const q = P(t, ti - .1, ti + .3); if (t > ti - .1) k = (i + .3) / it.length; $('cH' + i).style.opacity = q; $('cP' + i).style.opacity = q; $('cH' + i).style.transform = `translateX(${lerp(30, 0, eo(q))}px)`; });
    $('cL').style.transform = `scaleY(${k})`;
  });
}
// ---------- 5 · Esa noche ----------
{
  const a = S('c5'), ro = AT('c5', 'rondas'), fa = AT('c5', 'falsificado'), ca = AT('c5', 'cámaras'), ha = S('c6'), b = S('c7');
  const tags = [['RONDAS: NO REALIZADAS', ro], ['REGISTROS: FALSIFICADOS', fa], ['2 CÁMARAS: SIN GRABAR', ca]];
  cctvC('sNoc', [a - .1, b - .1, .3, .3], { horas: [[a - .1, '22:30:00', 28800 / (ha - a)], [ha - .1, '06:30:00', 1]], ruido: [[ca + .3, ca + 1], [ca + 1.4, ca + 1.7]],
    cam: 'CÁMARA · PISO 9', fecha: '10-08-2019 · RECREACIÓN',
    inner: tags.map(([s], i) => `<div class="osw" id="nT${i}" style="position:absolute;left:64px;top:${420 + i * 70}px;font-size:34px;letter-spacing:.1em;color:#ff4040;opacity:0;background:rgba(0,0,0,.65);padding:4px 14px">${s}</div>`).join('') +
      `<div id="nM" style="position:absolute;left:0;right:0;top:520px;text-align:center;opacity:0"><div class="cbig" style="font-size:260px;color:#ff2a2a;text-shadow:0 0 40px rgba(255,42,42,.6)">06:30</div><div class="osw" style="font-size:36px;letter-spacing:.24em">LO ENCUENTRAN SIN VIDA</div></div>` });
  RENDER.push(t => { if (!on('sNoc')) return; tags.forEach(([, ti], i) => $('nT' + i).style.opacity = P(t, ti, ti + .3) * (1 - P(t, ha - .3, ha))); $('nM').style.opacity = P(t, ha + .2, ha + .6); });
}
// ---------- 6 · Suicidio, y una cadena de negligencias ----------
textosC('sFor', [S('c7') - .1, S('c8') - .1, .3, .3, 1.04], [
  { t: S('c7'), html: '<span style="font-size:.3em;color:#8a8a8a;letter-spacing:.2em">LA FORENSE</span>', size: 100, top: 400 },
  { t: AT('c7', 'suicidio'), html: 'SUICIDIO', size: 230, top: 470 },
  { t: AT('c7', 'dos mil veintitrés'), html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.14em">2023 · INSPECTOR GENERAL: CONFIRMADO</span>', size: 100, top: 720 },
  { t: AT('c7', 'cadena'), html: '<span class="r">+ CADENA DE<br>NEGLIGENCIAS</span>', size: 120, top: 820 }]);
// ---------- 7 · El video del FBI y el minuto que falta ----------
{
  const a = S('c8'), mi = AT('c8', 'minuto'), b = S('c9'), salto = mi + .3, ini = 86400 - 62 - (salto - (a - .1));
  cctvC('sVid', [a - .1, b - .1, .3, .3], { horas: [[a - .1, hh(ini), 1], [salto + .7, '00:00:00', 1]], ruido: [[salto, salto + .7]], cam: 'VIDEO PUBLICADO POR EL FBI · 2025', fecha: '9-08-2019 · RECREACIÓN',
    inner: `<div style="position:absolute;left:90px;right:90px;top:1060px;height:14px;background:rgba(255,255,255,.18)"><div style="position:absolute;left:0;top:0;bottom:0;width:62%;background:#dfe6df"></div><div id="vG" style="position:absolute;left:62%;top:-8px;bottom:-8px;width:4%;background:#ff2a2a;opacity:0"></div></div>
      <div id="vF" style="position:absolute;left:0;right:0;top:470px;text-align:center;opacity:0"><div class="cbig" style="font-size:190px;color:#ff2a2a;text-shadow:0 0 40px rgba(0,0,0,.9)">FALTA<br>1 MINUTO</div><div class="osw" style="font-size:36px;letter-spacing:.2em;text-shadow:0 0 20px #000">23:58:58 → 00:00:00</div></div>` });
  RENDER.push(t => { if (!on('sVid')) return; $('vG').style.opacity = P(t, salto, salto + .3); $('vF').style.opacity = P(t, salto + .5, salto + .9); });
}
// ---------- 8 · Sin juicio; Maxwell, 20 años ----------
{
  const so = AT('c9', 'Solo');
  fotoC('sSJ', [S('c9') - .1, so, .3, .3], 'epstein-2019.jpg', { bn: true, pos: '50% 30%', kb: [1.05, 1.12, 0, 0, 0, 0], inner: selloC('jX', 'SIN JUICIO', 200, 960, 130) });
  fotoC('sGM', [so - .2, S('c10') - .1, .3, .3], 'maxwell-2020.jpg', { bn: true, pos: '50% 30%', lbl: 'Ghislaine Maxwell', kb: [1.05, 1.12, 0, 0, 0, 0],
    inner: `<div id="gP" class="cpill" style="position:absolute;left:64px;top:410px;opacity:0">Culpable · 2021</div>${selloC('gX', '20 AÑOS', 280, 950, 140)}` });
  RENDER.push(t => {
    if (on('sSJ')) golpeC('jX', t, AT('c9', 'juicio'), -6);
    if (on('sGM')) { $('gP').style.opacity = P(t, AT('c9', 'condenada') - .2, AT('c9', 'condenada') + .2); golpeC('gX', t, AT('c9', 'veinte'), -6); }
  });
}
// ---------- 9 · Tres millones de páginas ----------
{
  const a = S('c10'), tr = AT('c10', 'tres millones'), ci = AT('c10', 'cientos'), b = S('c11');
  scene('sArc', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div><div id="aP"></div>
    <div class="clbl" style="opacity:1"><i></i>Enero de 2026 · Departamento de Justicia</div>
    <div id="aN" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="cbig" id="aV" style="font-size:190px;color:#ff2a2a">0</div><div class="osw" style="font-size:36px;letter-spacing:.3em">PÁGINAS</div></div>
    <div id="aC" class="cbig" style="position:absolute;left:0;right:0;top:960px;text-align:center;font-size:110px;opacity:0;text-shadow:0 0 30px #000">CIENTOS DE NOMBRES</div>`);
  const pila = $('aP'), r = rnd(11); for (let i = 0; i < 22; i++) pila.insertAdjacentHTML('beforeend', `<div class="cpapel aH" style="left:${40 + r() * 800}px;top:${640 + r() * 420}px;width:200px;height:260px;opacity:0;padding:18px">${Array.from({ length: 8 }, (_, j) => `<div style="height:9px;margin:10px 0;width:${60 + ((i * 7 + j * 13) % 38)}%;background:${(i + j) % 3 ? '#111' : '#bdb5a6'}"></div>`).join('')}</div>`);
  const hs = [...document.querySelectorAll('#sArc .aH')];
  RENDER.push(t => {
    if (!on('sArc')) return;
    $('aN').style.opacity = P(t, tr - .2, tr + .2); $('aV').textContent = fmt(3e6 * eo(P(t, tr - .1, tr + 1.2)));
    hs.forEach((h, i) => { const k = P(t, a + .2 + i * .1, a + .5 + i * .1); h.style.opacity = k * .85; h.style.transform = `rotate(${(i % 5 - 2) * 6}deg) translateY(${lerp(-60, 0, eo(k))}px)`; });
    $('aC').style.opacity = P(t, ci - .1, ci + .3);
  });
}
// ---------- 10 · Aparecer no es delito ----------
textosC('sApa', [S('c11') - .1, S('c12') - .1, .3, .3, 1.04], [
  { t: S('c11'), html: 'APARECER', size: 230, top: 430 },
  { t: AT('c11', 'no es'), html: '<span class="r">≠ DELITO</span>', size: 230, top: 650 }]);
// ---------- 11 · ¿Dónde están los demás? ----------
{
  const a = S('c12'), q = AT('c12', 'dónde'), xs = [[150, 900], [420, 960], [690, 900], [930, 960], [280, 1040], [800, 1040]];
  tableroC('sDem', [a - .1, S('c13') - .1, .3, .3], [
    { t: a, x: 110, y: 400, w: 380, h: 470, img: 'epstein-2006.jpg', tx: 'J. EPSTEIN', rot: -3, pos: '50% 22%' },
    { t: a + .3, x: 590, y: 400, w: 380, h: 470, img: 'maxwell-2020.jpg', tx: 'G. MAXWELL', rot: 3, pos: '50% 25%' },
    ...xs.map(([x, y], i) => ({ t: q - .3 + i * .12, x: x - 60, y, txt: '?', rot: (i % 3 - 1) * 5, est: 'font-size:80px;padding:4px 30px' }))],
    xs.map((_, i) => ({ t: q + i * .12, de: i % 2, a: i + 2 })), { cam: [[a - .1, 540, 900, 1.04], [q, 540, 960, 1]] });
}
// ---------- 12 · ¿Vos qué creés? ----------
{
  const a = S('c13'), b = TL.duration;
  scene('sFin', [a - .1, b + 1, .3, .01, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#2a0303,#050505 65%)"></div>
    <div id="fQ" class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:170px;opacity:0">¿DÓNDE ESTÁN<br><span class="r">LOS DEMÁS?</span></div>
    <div id="fC" class="osw" style="position:absolute;left:0;right:0;top:820px;text-align:center;font-size:38px;letter-spacing:.24em;opacity:0">TE LEO EN LOS COMENTARIOS</div>
    <div id="fS" style="position:absolute;left:0;right:0;top:1180px;text-align:center;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.4em;color:#ff2a2a">PASÓ DE VERDAD</div><div class="osw" style="font-size:24px;letter-spacing:.24em;color:#8a8a8a;margin-top:10px">FUENTES EN LA DESCRIPCIÓN</div></div>`);
  RENDER.push(t => { if (!on('sFin')) return; $('fQ').style.opacity = P(t, a, a + .4); $('fC').style.opacity = P(t, AT('c13', 'comentarios') - .3, AT('c13', 'comentarios')); $('fS').style.opacity = P(t, S('outro') + .3, S('outro') + .9); });
}
});
