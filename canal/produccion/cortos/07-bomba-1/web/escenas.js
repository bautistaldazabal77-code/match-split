// "Pasó de verdad" · La bomba atómica, parte 1: la carrera (de la fisión en Berlín a la prueba Trinity).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'Berlín', 'a'], ['h1', 'uranio', 'a'], ['h2', 'energía', 'r'], ['c1', 'bomba', 'r'], ['c2', 'Hitler', 'r'], ['c2', 'Werner', 'a'], ['c2', 'Heisenberg', 'a'],
  ['c3', 'Leo', 'a'], ['c3', 'Szilard', 'a'], ['c3', 'Roosevelt', 'a'], ['c3', 'Albert', 'a'], ['c3', 'Einstein', 'a'], ['c4', 'puerto', 'r'], ['c5', 'Manhattan', 'a'],
  ['c5', 'Groves', 'a'], ['c5', 'Oppenheimer', 'a'], ['c6', 'Álamos', 'a'], ['c6', 'mapa', 'r'], ['c7', 'ninguna', 'r'], ['c8', 'Trinity', 'a'], ['c9', 'atmósfera', 'r'],
  ['c10', 'vidrio', 'a'], ['c11', 'muerte', 'r'], ['c11', 'mundos', 'r'], ['c12', 'rendido', 'r'], ['c12', 'rival', 'r'], ['c13', 'Hiroshima', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c13') - .1,
  horas: [[S('h1') - .1, 'DIC 1938'], [S('c3') - .1, 'AGO 1939'], [S('c5') - .1, '1942'], [S('c6') - .1, '1943'], [S('c8') - .1, '16·07·1945', true], [S('c12') - .1, 'MAYO 1945']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · Berlín, 1938: un átomo partido en dos ----------
{
  const pa = AT('h1', 'partieron'), en = AT('h2', 'energía');
  fotoR('sFis', [-1, S('c1') - .1, .01, .3], 'mesa-fision.jpg', { bn: true, tinte: .3, kb: [1.2, 1.1, 0, 0, 0, 0], lbl: 'La mesa del experimento · Deutsches Museum',
    titulo: 'BERLÍN<br><span class="r">1938</span>', tT: .2, size: 170,
    inner: `<svg class="full" id="fS" viewBox="0 0 1080 1920"></svg><div id="fG" style="position:absolute;left:0;right:0;top:600px;height:700px;background:radial-gradient(circle at 50% 50%,rgba(255,240,200,.95),rgba(255,120,40,.5) 30%,transparent 65%);opacity:0"></div>` });
  const svg = $('fS'), nu = el('g', { transform: 'translate(540 920)' }, svg), a1 = el('circle', { r: 90, fill: '#c8101b', opacity: 0 }, nu), a2 = el('circle', { r: 90, fill: '#c8101b', opacity: 0 }, nu);
  const neu = [0, 1, 2].map(() => el('circle', { r: 16, fill: '#ece8e1', opacity: 0 }, nu));
  RENDER.push(t => {
    if (!on('sFis')) return;
    const q = P(t, .5, 1), k = eo(P(t, pa, pa + .7)); a1.setAttribute('opacity', q); a2.setAttribute('opacity', q);
    a1.setAttribute('cx', -k * 170); a2.setAttribute('cx', k * 170); a1.setAttribute('r', 90 - 25 * k); a2.setAttribute('r', 90 - 25 * k);
    neu.forEach((n, i) => { const d = k * (260 + i * 60), an = -1.2 + i * 1.2; n.setAttribute('cx', Math.cos(an) * d); n.setAttribute('cy', Math.sin(an) * d - 40); n.setAttribute('opacity', k > 0 ? 1 - P(t, pa + 1.2, pa + 2) : 0); });
    $('fG').style.opacity = t >= en - .1 ? (1 - P(t, en, en + 1.2)) : 0;
  });
}
textosC('sBom', [S('c1') - .1, S('c2') - .1, .3, .3, 1.04], [
  { t: S('c1') + .2, html: '<span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">LOS FÍSICOS ENTENDIERON</span>', size: 100, top: 420 },
  { t: AT('c1', 'fabricar'), html: 'SE PODÍA FABRICAR<br><span class="r">UNA BOMBA</span>', size: 150, top: 520 }]);
// ---------- 2 · ¿Hitler primero? ----------
fotoR('sHei', [S('c2') - .1, S('c3') - .1, .3, .3], 'heisenberg.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Werner Heisenberg · físico alemán',
  titulo: '¿HITLER<br><span class="r">PRIMERO?</span>', tT: AT('c2', 'Hitler') - .2, size: 160, pills: [[AT('c2', 'Werner'), 'Werner Heisenberg, en Alemania']], pTop: 760 });
// ---------- 3 · La carta de Einstein ----------
docC('sCar', [S('c3') - .1, S('c5') - .1, .3, .3], 'carta.jpg', { ancho: 1000, alto: 588, y: 520, dy: -120,
  zoom: [[S('c3') - .1, 50, 40, .95], [S('c4'), 30, 82, 1.5], [S('c5'), 30, 82, 1.5]],
  marcas: [{ t: S('c4') + .2, x: 2, y: 78, w: 56, h: 14 }],
  sello: { t: AT('c4', 'puerto'), txt: 'UN PUERTO ENTERO', x: 120, y: 1000, size: 100, rot: -5 },
  fijo: `<div class="clbl" style="opacity:1"><i></i>La carta a Roosevelt · agosto de 1939</div>
    <div class="cpol" id="cE" style="left:640px;top:380px;width:360px;height:440px;opacity:0;z-index:4"><div class="im"><img src="img/einstein.jpg" style="object-position:50% 25%"></div><div class="tx">FIRMA: A. EINSTEIN</div></div>` });
RENDER.push(t => { if (!on('sCar')) return; const q = P(t, AT('c3', 'Albert Einstein') - .2, AT('c3', 'Albert Einstein') + .2) * (1 - P(t, S('c4') + .2, S('c4') + .6)); $('cE').style.opacity = q; $('cE').style.transform = `rotate(4deg) scale(${lerp(1.15, 1, eo(q))})`; });
// ---------- 4 · El Proyecto Manhattan ----------
fotoR('sMan', [S('c5') - .1, S('c6') - .1, .3, .3], 'groves-oppenheimer.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.15, 0, 0, 0, 0], lbl: 'Groves y Oppenheimer',
  titulo: 'PROYECTO<br><span class="r">MANHATTAN</span>', tT: AT('c5', 'Proyecto Manhattan') - .2, size: 150, top: 700,
  pills: [[AT('c5', 'Leslie Groves'), 'General Leslie Groves'], [AT('c5', 'Robert Oppenheimer'), 'Físico Robert Oppenheimer']], pTop: 980 });
fotoR('sAla', [S('c6') - .1, S('c7') - .1, .3, .3], 'credencial.jpg', { pos: '50% 30%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Credencial de Oppenheimer en Los Álamos',
  titulo: 'LOS <span class="r">ÁLAMOS</span>', tT: AT('c6', 'Los Álamos') - .2, size: 160, top: 760, pills: [[AT('c6', 'ningún mapa'), 'No figuraba en ningún mapa']], pTop: 940 });
// ---------- 5 · 130.000 personas que no sabían ----------
{
  const a = S('c7'), ci = AT('c7', 'ciento treinta'), b = S('c8');
  fotoR('sSec', [a - .1, b - .1, .3, .3], 'secreto.jpg', { bn: true, tinte: .3, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Cartel en Oak Ridge: lo que se ve acá, se queda acá',
    inner: `<div id="sN" style="position:absolute;left:64px;top:420px;opacity:0"><div class="cbig" style="font-size:210px;color:#ff2a2a;text-shadow:0 0 30px #000" id="sV">0</div><div class="osw" style="font-size:34px;letter-spacing:.2em;text-shadow:0 0 20px #000">PERSONAS TRABAJANDO</div></div>`,
    pills: [[AT('c7', 'ninguna'), 'Casi ninguna sabía qué construía']], pTop: 760 });
  RENDER.push(t => { if (!on('sSec')) return; $('sN').style.opacity = P(t, ci - .2, ci + .1); $('sV').textContent = fmt(130000 * eo(P(t, ci, ci + 1.2))); });
}
// ---------- 6 · Trinity ----------
fotoR('sTri', [S('c8') - .1, S('c9') - .1, .3, .3], 'torre.jpg', { bn: true, kb: [1.05, 1.15, 0, 0, 0, -30], lbl: 'La torre de la prueba · Nuevo México',
  titulo: '<span class="r">TRINITY</span>', tT: AT('c8', 'Trinity') - .3, size: 200, pills: [[AT('c8', 'cinco y veintinueve'), '16 de julio de 1945 · 5:29'], [AT('c8', 'primera bomba'), 'La primera bomba atómica']], pTop: 700 });
textosC('sAtm', [S('c9') - .1, S('c10') - .1, .3, .3, 1.04], [
  { t: AT('c9', 'incendiar'), html: '¿INCENDIAR<br><span class="r">LA ATMÓSFERA?</span>', size: 150, top: 400 },
  { t: AT('c9', 'Concluyeron'), html: '<span style="font-size:.5em">LOS CÁLCULOS DECÍAN QUE NO</span>', size: 120, top: 740 },
  { t: AT('c9', 'nadie'), html: '<span style="font-size:.5em" class="r">NADIE ESTABA DEL TODO SEGURO</span>', size: 120, top: 830 }],
  { bg: '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 70%,#3a0a04,#050505 70%)"></div>' });
// ---------- 7 · El destello y el vidrio ----------
{
  const a = S('c10'), ar = AT('c10', 'arena'), b = S('c11');
  fotoR('sBol', [a - .1, ar, .05, .3], 'bola.jpg', { kb: [1.0, 1.15, 0, 0, 0, 0], lbl: 'La bola de fuego, 16 milésimas después',
    inner: `<div id="bF" style="position:absolute;inset:0;background:#fff;opacity:0"></div>`, pills: [[AT('c10', 'cientos'), 'Se vio a cientos de kilómetros']], pTop: 420 });
  RENDER.push(t => { if (on('sBol')) $('bF').style.opacity = 1 - P(t, a - .1, a + .6); });
  fotoR('sVid', [ar - .1, b - .1, .3, .3], 'trinitita.jpg', { kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Trinitita: arena convertida en vidrio',
    titulo: 'LA ARENA<br><span class="r">SE HIZO VIDRIO</span>', tT: ar, size: 140 });
}
// ---------- 8 · "Ahora me he convertido en la Muerte" ----------
citaR('sCit', [S('c11') - .1, S('c12') - .1, .3, .3], '«Ahora me he convertido en la Muerte, el destructor de mundos.»', AT('c11', 'ahora'), E('c11'),
  'J. ROBERT OPPENHEIMER', 'Del Bhagavad Gita · lo contó en una entrevista de 1965 · traducción',
  { bg: `<div class="cfoto"><img src="img/oppenheimer.jpg" style="object-position:50% 25%;filter:grayscale(1) brightness(.35)"></div>` });
// ---------- 9 · Alemania ya se había rendido ----------
fotoR('sAle', [S('c12') - .1, S('c13') - .1, .3, .3], 'alemania.jpg', { bn: true, tinte: .3, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Reactor alemán capturado · abril de 1945',
  titulo: 'ALEMANIA<br>SE HABÍA <span class="r">RENDIDO</span>', tT: AT('c12', 'Alemania') - .2, size: 140, pills: [[AT('c12', 'dos meses'), '8 de mayo de 1945']], pTop: 760,
  sello: { t: AT('c12', 'rival'), txt: 'SIN RIVAL', x: 280, y: 920, size: 130 } });
// ---------- 10 · Parte 2 ----------
{
  const a = S('c13'), b = TL.duration;
  fotoR('sP2', [a - .1, b + 1, .3, .01], 'trinity-color.jpg', { tinte: .35, kb: [1.15, 1.3, 0, 0, 0, 0],
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:200px;margin-top:40px;text-shadow:0 0 30px #000">HIROSHIMA</div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, AT('c13', 'parte dos'), AT('c13', 'parte dos') + .5); });
}
});
