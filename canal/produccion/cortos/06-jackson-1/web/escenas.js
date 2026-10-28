// "Pasó de verdad" · Michael Jackson, parte 1: el niño que no podía equivocarse (de Gary a Neverland).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos de dominio público o con licencia libre: ver web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'cinturón', 'r'], ['h2', 'pegaba', 'r'], ['c1', 'Michael', 'a'], ['c1', 'Jackson', 'a'], ['c1', 'Gary', 'a'], ['c1', 'once', 'a'], ['c2', 'Joe', 'a'],
  ['c2', 'Jackson', 'a'], ['c2', 'Five', 'a'], ['c3', 'seis', 'a'], ['c3', 'cuatro', 'a'], ['c4', 'lloraba', 'r'], ['c5', 'nariz', 'r'], ['c5', 'espejo', 'r'],
  ['c6', 'Thriller', 'a'], ['c6', 'historia', 'a'], ['c7', 'ocho', 'a'], ['c7', 'Grammy', 'a'], ['c8', 'fuego', 'r'], ['c8', 'calmantes', 'r'],
  ['c9', 'vitiligo', 'a'], ['c10', 'famoso', 'a'], ['c10', 'solos', 'r'], ['c11', 'Neverland', 'a'], ['c11', 'nunca', 'a'], ['c11', 'crecen', 'a'],
  ['c12', 'siempre', 'r'], ['c13', 'dos', 'r'], ['c13', 'dosis', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c13') - .1,
  horas: [[S('c1') - .1, '1958'], [S('c3') - .1, '1964'], [AT('c3', 'A los once') - .1, '1969'], [S('c6') - .1, '1982'], [S('c7') - .1, '1984'],
    [S('c9') - .1, '1986'], [S('c11') - .1, '1988'], [S('c12') - .1, '1993', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();

SETUP.push(() => {
// ---------- 1 · El cinturón ----------
fotoR('sCin', [-1, S('c1') - .1, .01, .3], 'joe.jpg', { bn: true, pos: '50% 25%', tinte: .35, kb: [1.2, 1.08, 0, 0, 0, 0], lbl: 'Joe Jackson, su padre',
  titulo: 'LOS ENSAYOS', tT: .2, size: 150, pills: [[AT('h1', 'cinturón'), 'Con un cinturón en la mano'], [AT('h2', 'contó'), 'Lo contó Michael, años después']],
  sello: { t: AT('h2', 'pegaba'), txt: 'LES PEGABA', x: 200, y: 880, size: 130 } });
// ---------- 2 · Gary, Indiana ----------
fotoR('sCas', [S('c1') - .1, S('c2') - .1, .3, .3], 'casa.jpg', { kb: [1.1, 1.22, 0, -40, 0, 0], lbl: 'La casa de la familia · Gary, Indiana',
  titulo: '1958', tT: AT('c1', 'mil novecientos') , size: 230, pills: [[AT('c1', 'dos cuartos'), '2 cuartos'], [AT('c1', 'once'), '11 personas']] });
// ---------- 3 · Los Jackson Five ----------
fotoR('sJ5', [S('c2') - .1, S('c4') - .1, .3, .3], 'j5-1969.jpg', { kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'The Jackson 5 · 1969',
  titulo: 'JACKSON <span class="r">FIVE</span>', tT: AT('c2', 'Jackson Five') - .2, size: 150,
  pills: [[AT('c2', 'acería'), 'Joe: obrero de una acería'], [AT('c3', 'seis años'), 'Michael empieza a los 6'], [AT('c3', 'cuatro'), '4 números uno seguidos']], pTop: 600 });
// ---------- 4 · La infancia que no tuvo ----------
textosC('sInf', [S('c4') - .1, S('c5') - .1, .3, .3, 1.04], [
  { t: AT('c4', 'estudios'), html: 'ESTUDIOS', size: 150, top: 400 },
  { t: AT('c4', 'giras'), html: 'GIRAS', size: 150, top: 540 },
  { t: AT('c4', 'hoteles'), html: '<span class="r">HOTELES</span>', size: 150, top: 680 },
  { t: AT('c4', 'lloraba'), html: '<span style="font-size:.42em;letter-spacing:.06em">LLORABA AL VER A OTROS CHICOS JUGAR</span>', size: 150, top: 900 }]);
// ---------- 5 · El espejo ----------
{
  const a = S('c5'), na = AT('c5', 'nariz'), es = AT('c5', 'espejo'), b = S('c6');
  scene('sEsp', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1a1a1a,#050505 70%)"></div><svg class="full" id="eS" viewBox="0 0 1080 1920"></svg>
    <div id="eT" class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:110px;opacity:0">SE BURLABA<br><span class="r">DE SU NARIZ</span></div>
    <div id="eE" class="osw" style="position:absolute;left:0;right:0;top:1060px;text-align:center;font-size:34px;letter-spacing:.2em;opacity:0">NO PODÍA MIRARSE AL ESPEJO</div>`);
  const svg = $('eS'), g = el('g', { opacity: 0 }, svg);
  el('ellipse', { cx: 540, cy: 820, rx: 190, ry: 230, fill: '#1c2228', stroke: '#8a7a5a', 'stroke-width': 14 }, g);
  el('ellipse', { cx: 500, cy: 760, rx: 60, ry: 120, fill: 'rgba(255,255,255,.06)' }, g);
  const gr = el('path', { d: 'M540,820 L470,700 M540,820 L620,690 M540,820 L650,900 M540,820 L430,930 M540,820 L560,1040 M540,820 L400,800', stroke: '#e9e4da', 'stroke-width': 4, fill: 'none', pathLength: 1, 'stroke-dasharray': '0 1' }, g);
  RENDER.push(t => { if (!on('sEsp')) return; $('eT').style.opacity = P(t, na - .3, na + .1); g.setAttribute('opacity', P(t, a + .2, a + .6)); gr.style.strokeDasharray = `${eo(P(t, es - .4, es + .2))} 1`; $('eE').style.opacity = P(t, es - .2, es + .2); });
}
// ---------- 6 · Thriller ----------
fotoR('sThr', [S('c6') - .1, S('c7') - .1, .3, .3], 'mj1983.jpg', { bn: true, pos: '50% 25%', kb: [1.05, 1.12, 0, 0, 0, 0], lbl: 'Michael Jackson · 1983',
  titulo: '<span class="r">THRILLER</span>', tT: AT('c6', 'Thriller') - .2, size: 200, top: 700, pills: [[AT('c6', 'más vendido'), 'El disco más vendido de la historia']], pTop: 900 });
// ---------- 7 · Ocho Grammy ----------
{
  const a = S('c7'), oc = AT('c7', 'ocho'), b = S('c8');
  fotoR('sGra', [a - .1, b - .1, .3, .3], 'grammy.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Premios Grammy · 1984',
    inner: `<div id="gN" style="position:absolute;left:64px;top:400px;opacity:0"><div class="cbig" style="font-size:300px;color:#ff2a2a;text-shadow:0 0 40px #000"><span id="gV">0</span></div><div class="cbig" style="font-size:90px;text-shadow:0 0 30px #000">GRAMMY EN UNA NOCHE</div></div>`,
    pills: [[AT('c7', 'récord'), 'Récord']], pTop: 860 });
  RENDER.push(t => { if (!on('sGra')) return; $('gN').style.opacity = P(t, oc - .2, oc + .1); $('gV').textContent = Math.round(8 * eo(P(t, oc, oc + 1))); });
}
// ---------- 8 · El fuego ----------
{
  const a = S('c8'), fu = AT('c8', 'fuego'), ca = AT('c8', 'calmantes'), b = S('c9');
  scene('sFue', [a - .1, b - .1, .3, .3, 1.04], `<div style="position:absolute;inset:0;background:#050505"></div><div id="fF" style="position:absolute;left:-10%;right:-10%;top:500px;height:900px;background:radial-gradient(ellipse at 50% 70%,rgba(255,140,30,.9),rgba(200,16,27,.6) 35%,transparent 70%);opacity:0;filter:blur(10px)"></div>
    <div id="fT" style="position:absolute;left:64px;right:64px;top:400px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">1984 · GRABANDO UN COMERCIAL</div><div class="cbig" style="font-size:130px;margin-top:10px">SE LE PRENDIÓ<br><span class="r">FUEGO EL PELO</span></div></div>
    <div id="fC" class="cpill" style="position:absolute;left:64px;top:880px;opacity:0">Desde entonces: calmantes</div>`);
  RENDER.push(t => { if (!on('sFue')) return; $('fT').style.opacity = P(t, a, a + .4); const k = P(t, fu - .2, fu + .4); $('fF').style.opacity = k * (.75 + .25 * Math.sin(t * 13) * Math.sin(t * 7.3)); $('fF').style.transform = `scaleY(${1 + .08 * Math.sin(t * 9)})`; $('fC').style.opacity = P(t, ca - .2, ca + .2); });
}
// ---------- 9 · La piel: vitiligo ----------
fotoR('sVit', [S('c9') - .1, S('c10') - .1, .3, .3], 'gira1988.jpg', { kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'En concierto · Viena, 1988',
  titulo: 'SU PIEL<br>CAMBIABA', tT: AT('c9', 'piel') - .2, size: 140, pills: [[AT('c9', 'Muchos'), '¿Se la aclaraba a propósito?'], [AT('c9', 'autopsia'), 'La autopsia: vitiligo']], pTop: 700,
  sello: { t: AT('c9', 'vitiligo'), txt: 'VITILIGO', x: 300, y: 900, size: 130 } });
// ---------- 10 · El más famoso, el más solo ----------
fotoR('sSol', [S('c10') - .1, S('c11') - .1, .3, .3], '1992.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Gira Dangerous · 1992',
  titulo: 'EL MÁS<br><span class="r">FAMOSO</span>', tT: AT('c10', 'famoso') - .3, size: 160, pills: [[AT('c10', 'solos'), 'Y uno de los hombres más solos']], pTop: 760 });
// ---------- 11 · Neverland ----------
fotoR('sNev', [S('c11') - .1, S('c12') - .1, .3, .3], 'neverland.jpg', { kb: [1.15, 1.28, 0, -30, 0, 0], lbl: 'Rancho Neverland · California',
  titulo: '<span class="r">NEVERLAND</span>', tT: AT('c11', 'Neverland') - .2, size: 170, pills: [[AT('c11', 'Peter Pan'), 'Como la isla de Peter Pan'], [AT('c11', 'nunca crecen'), 'Donde los niños nunca crecen']], pTop: 600 });
fotoR('sCin5', [S('c12') - .1, S('c13') - .1, .3, .3], 'portones.jpg', { bn: true, tinte: .35, kb: [1.1, 1.18, 0, 0, 0, 0], lbl: 'Los portones de Neverland',
  titulo: '5 AÑOS<br><span class="r">DESPUÉS</span>', tT: S('c12'), size: 170 });
// ---------- 12 · Parte 2 ----------
{
  const a = S('c13'), b = TL.duration;
  fotoR('sP2', [a - .1, b + 1, .3, .01], 'propofol.jpg', { bn: true, tinte: .4, kb: [1.2, 1.3, 0, 0, 0, 0],
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:120px;margin-top:40px;text-shadow:0 0 30px #000">LAS ACUSACIONES<br>EL JUICIO<br><span class="r">LA ÚLTIMA DOSIS</span></div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, a + .2, a + .7); });
}
});
