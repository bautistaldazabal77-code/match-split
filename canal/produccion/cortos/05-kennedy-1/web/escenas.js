// "Pasó de verdad" · Kennedy, parte 1: el hombre del rifle (del rifle por correo al arresto en el cine).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'rifle', 'r'], ['h1', 'falso', 'r'], ['h2', 'presidente', 'r'], ['c1', 'Lee', 'a'], ['c1', 'Harvey', 'a'], ['c1', 'Oswald', 'a'], ['c1', 'Soviética', 'a'],
  ['c2', 'Marina', 'a'], ['c2', 'rifle', 'r'], ['c3', 'Edwin', 'a'], ['c3', 'Walker', 'a'], ['c3', 'Nadie', 'r'], ['c4', 'Kennedy', 'a'], ['c4', 'Dallas', 'a'],
  ['c5', 'Elm', 'a'], ['c5', 'Oswald', 'a'], ['c6', 'sexto', 'r'], ['c6', 'tres', 'r'], ['c6', 'disparos', 'r'], ['c7', 'cuello', 'r'], ['c7', 'cabeza', 'r'],
  ['c8', 'murió', 'r'], ['c8', 'Parkland', 'a'], ['c9', 'caminando', 'a'], ['c10', 'Tippit', 'a'], ['c10', 'mató', 'r'], ['c11', 'cine', 'a'],
  ['c12', 'chivo', 'r'], ['c12', 'expiatorio', 'r'], ['c13', 'nada', 'r'], ['c14', 'dos', 'r'], ['c14', 'solo', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c14') - .1,
  horas: [[S('h1') - .1, 'MARZO 1963'], [S('c3') - .1, 'ABRIL 1963'], [S('c4') - .1, '22·11·1963'], [S('c5') - .1, '12:30', true], [S('c8') - .1, '13:00', true],
    [S('c10') - .1, '13:15', true], [S('c11') - .1, '13:50', true], [S('c12') - .1, 'ESA NOCHE']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · El rifle que llegó por correo ----------
fotoR('sRif', [-1, S('h2') - .1, .01, .3], 'rifle.jpg', { bn: true, kb: [1.25, 1.1, 0, 0, 0, 0], lbl: 'El rifle · Archivos Nacionales de EE. UU.',
  titulo: 'POR <span class="r">CORREO</span>', tT: .3, top: 420,
  inner: `<div class="cpol" id="rH" style="left:560px;top:700px;width:440px;height:330px;opacity:0"><div class="im"><img src="img/hidell.jpg" style="object-position:50% 50%"></div><div class="tx">NOMBRE FALSO: A. HIDELL</div></div>` });
RENDER.push(t => { if (!on('sRif')) return; const a = AT('h1', 'nombre falso'), q = P(t, a - .2, a + .2); $('rH').style.opacity = q; $('rH').style.transform = `rotate(4deg) scale(${lerp(1.2, 1, eo(q))})`; });
fotoR('sJfk', [S('h2') - .1, S('c1') - .1, .3, .3], 'jfk.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0],
  titulo: '8 MESES<br><span class="r">DESPUÉS</span>', tT: AT('h2', 'ocho meses'), pills: [[S('h2'), 'Según la investigación oficial']] });
// ---------- 2 · Lee Harvey Oswald ----------
fotoR('sOsw', [S('c1') - .1, S('c2') - .1, .3, .3], 'oswald.jpg', { pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Foto policial · 22 de noviembre de 1963',
  titulo: 'LEE HARVEY<br><span class="r">OSWALD</span>', tT: AT('c1', 'Lee Harvey'), size: 140, top: 700,
  pills: [[AT('c1', 'Unión Soviética'), 'Vivió en la Unión Soviética'], [AT('c1', 'casado'), 'Volvió casado con una rusa']] });
// ---------- 3 · La foto del patio ----------
fotoR('sPat', [S('c2') - .1, S('c3') - .1, .3, .3], 'patio.jpg', { pos: '50% 30%', kb: [1.0, 1.08, 0, 0, 0, 0], lbl: 'La foto del patio · marzo de 1963',
  pills: [[AT('c2', 'rifle'), 'El rifle', 'position:absolute;left:640px;top:520px'], [AT('c2', 'diarios'), 'Diarios de izquierda', 'position:absolute;left:520px;top:900px']] });
// ---------- 4 · Abril: el intento contra el general Walker ----------
{
  const a = S('c3'), ma = AT('c3', 'marco'), na = AT('c3', 'Nadie'), b = S('c4');
  scene('sWal', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <svg class="full" id="wS" viewBox="0 0 1080 1920"></svg>
    <div id="wT" style="position:absolute;left:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">10 DE ABRIL DE 1963 · DALLAS</div><div class="cbig" style="font-size:120px;margin-top:10px">GENERAL<br><span class="r">EDWIN WALKER</span></div></div>
    ${selloC('wX1', 'FALLÓ', 600, 840, 120)}${selloC('wX2', 'NADIE SUPO QUE FUE ÉL', 70, 1010, 70)}`);
  const svg = $('wS'), g = el('g', { opacity: 0 }, svg);
  el('rect', { x: 150, y: 720, width: 380, height: 340, fill: '#0d1418', stroke: '#6b5a40', 'stroke-width': 18 }, g);
  el('line', { x1: 340, y1: 720, x2: 340, y2: 1060, stroke: '#6b5a40', 'stroke-width': 12 }, g); el('line', { x1: 150, y1: 890, x2: 530, y2: 890, stroke: '#6b5a40', 'stroke-width': 12 }, g);
  const grieta = el('path', { d: 'M340,880 L300,840 M340,880 L390,830 M340,880 L370,950 M340,880 L280,910 M340,880 L350,800', stroke: '#e9e4da', 'stroke-width': 4, fill: 'none', pathLength: 1, 'stroke-dasharray': '0 1' }, g);
  el('circle', { cx: 340, cy: 880, r: 12, fill: '#ff2a2a' }, g);
  RENDER.push(t => {
    if (!on('sWal')) return;
    $('wT').style.opacity = P(t, a, a + .4); g.setAttribute('opacity', P(t, a + .3, a + .7));
    grieta.style.strokeDasharray = `${eo(P(t, ma - .2, ma + .3))} 1`; golpeC('wX1', t, ma + .1, -8); golpeC('wX2', t, na, -4);
  });
}
// ---------- 5 · 22 de noviembre: Kennedy llega a Dallas ----------
fotoR('sLle', [S('c4') - .1, S('c5') - .1, .3, .3], 'llegada.jpg', { kb: [1.15, 1.25, 0, -40, 0, 0], lbl: 'Aeropuerto Love Field · Dallas',
  titulo: 'DALLAS', tT: AT('c4', 'Dallas') - .2, size: 200, ev: '11:40 de la mañana', evT: S('c4') + .4 });
fotoR('sCar', [S('c5') - .1, S('c6') - .1, .3, .3], 'caravana.jpg', { kb: [1.15, 1.25, 0, 0, 0, 0], lbl: 'La caravana presidencial · Dallas',
  pills: [[AT('c5', 'descapotable'), 'Auto descapotable'], [AT('c5', 'calle Elm'), 'Calle Elm · 12:30'], [AT('c5', 'depósito'), 'Frente al depósito de libros']], pTop: 420 });
// ---------- 6 · Tres disparos desde el sexto piso ----------
{
  const a = S('c6'), tr = AT('c6', 'tres'), b = S('c7');
  fotoR('sSex', [a - .1, b - .1, .3, .3], 'vista.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Vista desde la ventana del sexto piso · Comisión Warren',
    titulo: 'SEXTO PISO', tT: AT('c6', 'sexto'), size: 150, top: 410,
    inner: `<div id="dF" style="position:absolute;inset:0;background:#fff;opacity:0"></div><div id="dN" style="position:absolute;left:64px;top:600px;display:flex;gap:30px">${[1, 2, 3].map(n => `<div class="cbig dN" style="font-size:220px;color:#ff2a2a;opacity:0;text-shadow:0 0 40px #000">${n}</div>`).join('')}</div>` });
  const ns = [...document.querySelectorAll('#sSex .dN')];
  RENDER.push(t => {
    if (!on('sSex')) return;
    let fl = 0; ns.forEach((n, i) => { const ti = tr + i * .45; n.style.opacity = P(t, ti, ti + .05); if (t >= ti) fl = Math.max(fl, 1 - P(t, ti, ti + .18)); });
    $('dF').style.opacity = .35 * fl;
  });
}
// ---------- 7 · El cuello y la cabeza ----------
fotoR('sCab', [S('c7') - .1, S('c8') - .1, .3, .3], 'elm.jpg', { bn: true, kb: [1.2, 1.3, 0, 0, 0, 0], lbl: 'El auto en la calle Elm · foto de Robert Croft',
  pills: [[AT('c7', 'cuello'), 'Un disparo: el cuello'], [AT('c7', 'cabeza'), 'Otro: la cabeza']], pTop: 430 });
// ---------- 8 · 13:00, hospital Parkland ----------
textosC('sPar', [S('c8') - .1, S('c9') - .1, .3, .3, 1.04], [
  { t: S('c8'), html: '<span class="r">13:00</span>', size: 300, top: 420 },
  { t: AT('c8', 'Parkland') - .3, html: '<span style="font-size:.4em;letter-spacing:.1em">HOSPITAL PARKLAND</span>', size: 120, top: 760 },
  { t: AT('c8', 'murió'), html: 'KENNEDY MUERE', size: 110, top: 880 }]);
// ---------- 9 · Oswald sale caminando ----------
fotoR('sSal', [S('c9') - .1, S('c10') - .1, .3, .3], 'deposito.jpg', { kb: [1.15, 1.25, 0, 0, 0, 0], lbl: 'El depósito de libros escolares · hoy',
  titulo: 'SALE<br><span class="r">CAMINANDO</span>', tT: AT('c9', 'caminando') - .2, size: 160, ev: 'Unos 3 minutos después de los disparos', evT: S('c9') + .5 });
// ---------- 10 · El policía J. D. Tippit ----------
fotoR('sTip', [S('c10') - .1, S('c11') - .1, .3, .3], 'tippit.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Policía de Dallas',
  titulo: 'J. D. <span class="r">TIPPIT</span>', tT: AT('c10', 'Tippit') - .2, size: 150, top: 400, sello: { t: AT('c10', 'mató'), txt: 'ASESINADO · 13:15', x: 80, y: 900, size: 90 } });
// ---------- 11 · Detenido en un cine ----------
{
  const a = S('c11'), b = S('c12');
  scene('sCin', [a - .1, b - .1, .3, .3, 1.04], `<div style="position:absolute;inset:0;background:#050505"></div><svg class="full" id="cS" viewBox="0 0 1080 1920"></svg>
    <div class="clbl" style="opacity:1"><i></i>Texas Theatre · Dallas</div>
    <div id="cT" style="position:absolute;left:0;right:0;top:880px;text-align:center;opacity:0"><div class="cbig" style="font-size:150px;color:#ff2a2a;text-shadow:0 0 30px #000">DETENIDO</div><div class="osw" style="font-size:32px;letter-spacing:.24em">EN PLENA PELÍCULA</div></div>`);
  const svg = $('cS'), pant = el('rect', { x: 120, y: 420, width: 840, height: 360, fill: '#cfd8e0', opacity: .0 }, svg);
  for (let f = 0; f < 4; f++) for (let i = 0; i < 9; i++) { const x = 110 + i * 108 + (f % 2) * 30, y = 900 + f * 70; el('circle', { cx: x, cy: y, r: 26, fill: '#0e0e0e', stroke: '#1d1d1d' }, svg); el('rect', { x: x - 40, y: y + 20, width: 80, height: 60, rx: 10, fill: '#0b0b0b' }, svg); }
  const luz = el('path', { d: 'M540,1920 L120,780 L960,780 Z', fill: 'url(#cG)', opacity: .25 }, svg);
  svg.insertAdjacentHTML('afterbegin', '<defs><linearGradient id="cG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#cfd8e0" stop-opacity=".5"/></linearGradient></defs>');
  RENDER.push(t => { if (!on('sCin')) return; const fl = .55 + .15 * Math.sin(t * 9) + .1 * Math.sin(t * 23); pant.setAttribute('opacity', fl); luz.setAttribute('opacity', .18 * fl); $('cT').style.opacity = P(t, AT('c11', 'detuvieron'), AT('c11', 'detuvieron') + .4); });
}
// ---------- 12 · "Soy solo un chivo expiatorio" ----------
citaR('sChi', [S('c12') - .1, S('c13') - .1, .3, .3], '«Soy solo un chivo expiatorio.»', AT('c12', 'soy'), E('c12'), 'LEE HARVEY OSWALD, A LOS PERIODISTAS', '22 de noviembre de 1963 · traducción',
  { bg: `<div class="cfoto"><img src="img/oswald.jpg" style="object-position:50% 25%;filter:grayscale(1) brightness(.35) blur(2px)"></div>` });
// ---------- 13 · Dos días después ----------
{
  const a = S('c13'), b = S('c14');
  scene('sDos', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:#050505"></div><svg class="full" id="dS" viewBox="0 0 1080 1920"></svg>
    <div id="dT" class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:160px;opacity:0">DOS DÍAS<br><span class="r">DESPUÉS</span></div>`);
  const pts = []; for (let x = 0; x <= 1080; x += 10) { const k = x / 1080, beat = k < .6 ? Math.exp(-Math.pow(((x % 270) - 135) / 12, 2)) * (x % 540 < 270 ? -140 : 90) : 0; pts.push(`${x},${940 + beat}`); }
  const lin = el('polyline', { points: pts.join(' '), fill: 'none', stroke: '#ff2a2a', 'stroke-width': 6, pathLength: 1, 'stroke-dasharray': '0 1' }, $('dS'));
  RENDER.push(t => { if (!on('sDos')) return; $('dT').style.opacity = P(t, a, a + .4); lin.style.strokeDasharray = `${P(t, a + .2, b - .3).toFixed(3)} 1`; });
}
// ---------- 14 · Parte 2 ----------
{
  const a = S('c14'), b = TL.duration;
  fotoR('sP2', [a - .1, b + 1, .3, .01], 'ruby-dispara.jpg', { bn: true, tinte: .4, kb: [1.2, 1.3, 0, 0, 0, 0],
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:170px;margin-top:40px;text-shadow:0 0 30px #000">¿ACTUÓ<br><span class="r">SOLO?</span></div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, AT('c14', 'pregunta'), AT('c14', 'pregunta') + .5); });
}
});
