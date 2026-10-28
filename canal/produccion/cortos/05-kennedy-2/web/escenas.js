// "Pasó de verdad" · Kennedy, parte 2: ¿actuó solo? (Ruby, la Comisión Warren, la bala mágica, el comité de 1979, las teorías y los archivos).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver ../05-kennedy-1/web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'Oswald', 'a'], ['h1', 'cámaras', 'a'], ['h2', 'disparó', 'r'], ['c1', 'Jack', 'a'], ['c1', 'Ruby', 'a'], ['c1', 'viuda', 'a'], ['c2', 'Nunca', 'r'], ['c2', 'juicio', 'r'],
  ['c3', 'Earl', 'a'], ['c3', 'Warren', 'a'], ['c3', 'solo', 'r'], ['c4', 'una', 'r'], ['c4', 'sola', 'r'], ['c4', 'bala', 'r'], ['c4', 'Connally', 'a'],
  ['c5', 'mágica', 'r'], ['c6', 'montaje', 'r'], ['c6', 'auténtica', 'a'], ['c7', 'conspiración', 'r'], ['c8', 'disparos', 'r'],
  ['c9', 'mafia', 'a'], ['c9', 'CIA', 'a'], ['c9', 'Soviética', 'a'], ['c9', 'probar', 'r'], ['c10', 'páginas', 'a'], ['c10', 'tirador', 'r'],
  ['c11', 'mayoría', 'r'], ['c12', 'solo', 'r'], ['c12', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c12') - .1,
  horas: [[S('h1') - .1, '24·11·1963'], [S('c3') - .1, '1964'], [S('c7') - .1, '1979'], [S('c10') - .1, '2017 – 2025'], [S('c11') - .1, 'HOY']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · En vivo por televisión ----------
fotoR('sTv', [-1, S('h2') - .1, .01, .3], 'oswald.jpg', { bn: true, pos: '50% 25%', kb: [1.15, 1.05, 0, 0, 0, 0], lbl: 'Sótano de la policía de Dallas',
  titulo: '24 DE<br><span class="r">NOVIEMBRE</span>', tT: .2, size: 150,
  inner: `<div style="position:absolute;inset:0;background:repeating-linear-gradient(rgba(255,255,255,.05) 0 2px,transparent 2px 5px)"></div>
    <div id="tvV" style="position:absolute;right:64px;top:420px;display:flex;align-items:center;gap:12px;padding:8px 18px;background:#c8101b;font:600 30px Oswald;letter-spacing:.2em;opacity:0"><i style="width:14px;height:14px;border-radius:50%;background:#fff"></i>EN VIVO</div>` });
RENDER.push(t => { if (!on('sTv')) return; const q = P(t, AT('h1', 'cámaras') - .2, AT('h1', 'cámaras') + .2); $('tvV').style.opacity = q * (Math.floor(t * 2) % 2 ? .6 : 1); });
fotoR('sDis', [S('h2') - .1, S('c1') - .1, .3, .3], 'ruby-dispara.jpg', { bn: true, kb: [1.08, 1.22, 0, 0, 0, 0], lbl: 'Foto de Robert H. Jackson · 24 de noviembre de 1963',
  inner: `<div id="dsF" style="position:absolute;inset:0;background:#fff;opacity:0"></div>` });
RENDER.push(t => { if (!on('sDis')) return; const a = AT('h2', 'disparó'); $('dsF').style.opacity = t >= a ? .6 * (1 - P(t, a, a + .25)) : 0; });
// ---------- 2 · Jack Ruby ----------
fotoR('sRub', [S('c1') - .1, S('c2') - .1, .3, .3], 'ruby.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Foto policial · Dallas',
  titulo: 'JACK <span class="r">RUBY</span>', tT: AT('c1', 'Jack Ruby') - .2, size: 160, pills: [[AT('c1', 'club'), 'Dueño de un club nocturno'], [AT('c1', 'viuda'), 'Su versión: evitarle a la viuda un juicio']] });
fotoR('sNoj', [S('c2') - .1, S('c3') - .1, .3, .3], 'oswald.jpg', { bn: true, pos: '50% 25%', tinte: .4, kb: [1.12, 1.2, 0, 0, 0, 0],
  sello: { t: AT('c2', 'Nunca'), txt: 'NUNCA HUBO JUICIO', x: 90, y: 860, size: 96 } });
// ---------- 3 · La Comisión Warren ----------
fotoR('sWar', [S('c3') - .1, S('c4') - .1, .3, .3], 'warren.jpg', { bn: true, kb: [1.2, 1.3, 0, 0, 0, 0], lbl: 'La Comisión Warren entrega su informe · 1964',
  sello: { t: AT('c3', 'actuó solo'), txt: 'ACTUÓ SOLO', x: 220, y: 860, size: 130 } });
// ---------- 4 · Una sola bala: el esquema ----------
{
  const a = S('c4'), un = AT('c4', 'una sola bala'), co = AT('c4', 'Connally'), b = S('c5');
  scene('sBal', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#140404,#050505 70%)"></div><svg class="full" id="bS" viewBox="0 0 1080 1920"></svg>
    <div class="clbl" style="opacity:1"><i></i>La teoría de la bala única · esquema</div>
    <div id="bT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="cbig" style="font-size:150px"><span class="r">1</span> BALA</div></div>
    <div id="bK" class="cpill" style="position:absolute;left:180px;top:980px;opacity:0">Kennedy</div><div id="bC" class="cpill" style="position:absolute;left:600px;top:1040px;opacity:0;background:#000;border:2px solid #ff2a2a">Connally: 4 heridas</div>`);
  const svg = $('bS'), fig = (x, y, s) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, svg); el('circle', { cy: -150, r: 48, fill: '#3a3a3a' }, g); el('path', { d: 'M-80,120 Q-80,-90 0,-90 Q80,-90 80,120 Z', fill: '#3a3a3a' }, g); return g; };
  fig(300, 880, 1); fig(720, 940, 1);
  const tray = el('path', { d: 'M60,640 L300,770 L740,860 C760,880 700,905 760,920 C790,935 720,960 770,1000', fill: 'none', stroke: '#ff2a2a', 'stroke-width': 7, 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '0 1' }, svg);
  const heridas = [[300, 770], [740, 860], [748, 910], [770, 1000]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 14, fill: '#ff2a2a', opacity: 0 }, svg));
  RENDER.push(t => {
    if (!on('sBal')) return;
    $('bT').style.opacity = P(t, un - .1, un + .3); const k = P(t, un, co + 1); tray.style.strokeDasharray = `${io(k).toFixed(3)} 1`;
    heridas.forEach((h, i) => h.setAttribute('opacity', P(t, un + .3 + i * .6, un + .4 + i * .6)));
    $('bK').style.opacity = P(t, AT('c4', 'Kennedy') - .1, AT('c4', 'Kennedy') + .3); $('bC').style.opacity = P(t, co - .1, co + .3);
  });
}
fotoR('sMag', [S('c5') - .1, S('c6') - .1, .3, .3], 'bala.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Reconstrucción de la Comisión Warren',
  titulo: 'LA BALA<br><span class="r">MÁGICA</span>', tT: AT('c5', 'mágica') - .3, size: 170, pills: [[AT('c5', 'casi intacta'), 'Casi intacta, en una camilla']], pTop: 760 });
// ---------- 5 · ¿La foto del patio era un montaje? ----------
fotoR('sFot', [S('c6') - .1, S('c7') - .1, .3, .3], 'patio.jpg', { pos: '50% 30%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'La foto del patio',
  titulo: '¿MONTAJE?', tT: AT('c6', 'montaje') - .2, tHasta: AT('c6', 'auténtica'), size: 170, sello: { t: AT('c6', 'auténtica'), txt: 'AUTÉNTICA', x: 220, y: 760, size: 130 } });
// ---------- 6 · 1979: el comité del Congreso y la grabación ----------
{
  const a = S('c7'), co = AT('c7', 'conspiración'), gr = AT('c8', 'grabación'), no = AT('c8', 'no eran'), b = S('c9');
  scene('sHsc', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div><svg class="full" id="hS" viewBox="0 0 1080 1920"></svg>
    <div id="hT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">1979 · COMITÉ DEL CONGRESO</div><div class="cbig" style="font-size:130px;margin-top:10px">PROBABLE<br><span class="r">CONSPIRACIÓN</span></div></div>
    <div id="hG" class="osw" style="position:absolute;left:64px;top:760px;font-size:28px;letter-spacing:.24em;color:#8a8a8a;opacity:0">GRABACIÓN DE LA RADIO POLICIAL</div>
    ${selloC('hX', 'NO ERAN DISPAROS', 120, 990, 100)}`);
  const svg = $('hS'), r = rnd(4), barras = [];
  for (let i = 0; i < 60; i++) { const h = 10 + r() * 60 + ([18, 26, 33, 41].includes(i) ? 120 : 0); barras.push(el('rect', { x: 64 + i * 16, y: 900 - h / 2, width: 9, height: h, fill: [18, 26, 33, 41].includes(i) ? '#ff2a2a' : '#5a5a5a', opacity: 0 }, svg)); }
  RENDER.push(t => {
    if (!on('sHsc')) return;
    $('hT').style.opacity = P(t, a, a + .4) * (1 - .5 * P(t, gr - .3, gr)); $('hT').lastElementChild.lastElementChild.style.opacity = P(t, co - .1, co + .3);
    $('hG').style.opacity = P(t, gr - .1, gr + .3); barras.forEach((b2, i) => b2.setAttribute('opacity', P(t, gr + i * .02, gr + .1 + i * .02)));
    golpeC('hX', t, no, -5);
  });
}
// ---------- 7 · Las teorías ----------
tableroC('sTeo', [S('c9') - .1, S('c10') - .1, .3, .3], [
  { t: S('c9'), x: 340, y: 380, w: 400, h: 480, img: 'oswald.jpg', tx: 'L. H. OSWALD', rot: -2, pos: '50% 25%' },
  { t: AT('c9', 'mafia'), x: 80, y: 960, txt: 'LA MAFIA', rot: -4 },
  { t: AT('c9', 'CIA'), x: 430, y: 1000, txt: 'LA CIA', rot: 3 },
  { t: AT('c9', 'Soviética'), x: 700, y: 940, txt: 'LA URSS', rot: -3 }],
  [{ t: AT('c9', 'mafia') + .1, de: 0, a: 1 }, { t: AT('c9', 'CIA') + .1, de: 0, a: 2 }, { t: AT('c9', 'Soviética') + .1, de: 0, a: 3 }],
  { cam: [[S('c9') - .1, 540, 960, 1], [S('c10'), 540, 960, 1.04]], inner: selloC('tX', 'SIN PRUEBAS', 200, 560, 120) });
addCSS('#tX{z-index:5}');
RENDER.push(t => { if (on('sTeo')) golpeC('tX', t, AT('c9', 'Ninguna'), -6); });
// ---------- 8 · Los archivos ----------
papelesR('sArc', [S('c10') - .1, S('c11') - .1, .3, .3], { texto: '2017 – 2025', tNum: AT('c10', 'dos mil diecisiete'), rotulo: 'ARCHIVOS SECRETOS PUBLICADOS', lbl: 'Archivos del caso Kennedy',
  cartel: [AT('c10', 'No apareció'), 'NINGÚN <span class="r">SEGUNDO TIRADOR</span>'] });
// ---------- 9 · Lo que cree la gente ----------
{
  const a = S('c11'), ma = AT('c11', 'mayoría'), b = S('c12');
  scene('sEnc', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:420px"><div class="osw" style="font-size:30px;letter-spacing:.24em;color:#8a8a8a">ESTADOS UNIDOS · ENCUESTA</div>
      <div class="cbig" style="font-size:240px;color:#ff2a2a"><span id="eV">0</span>%</div><div class="cbig" style="font-size:80px">CREE QUE NO ACTUÓ SOLO</div>
      <div style="height:40px;background:#222;margin-top:40px"><div id="eB" style="height:100%;width:0;background:#c8101b"></div></div>
      <div class="mono" style="font-size:20px;color:#8a8a8a;margin-top:14px">Gallup, 2023</div></div>`);
  RENDER.push(t => { if (!on('sEnc')) return; const k = eo(P(t, ma - .2, ma + 1)); $('eV').textContent = Math.round(65 * k); $('eB').style.width = 65 * k + '%'; });
}
// ---------- 10 · ¿Actuó solo? ----------
{
  const a = S('c12'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'loma.jpg', { bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Dealey Plaza · Dallas',
    titulo: '¿ACTUÓ<br><span class="r">SOLO?</span>', tT: a, size: 200, top: 440, pills: [[AT('c12', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 860, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
