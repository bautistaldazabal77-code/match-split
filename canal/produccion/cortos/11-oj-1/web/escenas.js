// "Pasó de verdad" · O. J. Simpson, parte 1: la persecución que vieron 95 millones y el caso que parecía fácil.
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre o de dominio público: ver web/img/fotos.json.
// Las víctimas solo se nombran: no se muestran fotos de ellas ni de la escena con ellas.

captions([
  ['h1', 'junio', 'a'], ['h1', 'noventa', 'r'], ['h1', 'millones', 'r'], ['h1', 'televisión', 'a'], ['h2', 'blanca', 'a'], ['h2', 'sesenta', 'a'], ['h2', 'patrulleros', 'r'],
  ['c1', 'Simpson', 'a'], ['c1', 'estrellas', 'a'], ['c2', 'Cinco', 'a'], ['c2', 'asesinados', 'r'], ['c2', 'Nicole', 'a'], ['c2', 'Goldman', 'a'], ['c3', 'dos', 'a'], ['c3', 'yardas', 'a'],
  ['c3', 'actor', 'a'], ['c4', 'violencia', 'r'], ['c4', 'doméstica', 'r'], ['c5', 'entregarse', 'a'], ['c5', 'apareció', 'r'], ['c6', 'arma', 'r'], ['c6', 'pasaporte', 'a'], ['c6', 'dólares', 'a'],
  ['c7', 'entregó', 'a'], ['c8', 'sangre', 'r'], ['c8', 'huellas', 'a'], ['c8', 'guantes', 'r'], ['c8', 'casa', 'a'], ['c9', 'fácil', 'a'], ['c10', 'juicio', 'r'], ['c10', 'siglo', 'r'], ['c11', 'guante', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c11') - .1,
  horas: [[2.6, '17 JUN 1994', true], [S('c2') - .1, '12 JUN 1994'], [S('c3') - .1, '1973'], [S('c4') - .1, '1989'], [S('c5') - .1, '17 JUN 1994', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('O. J.<br><span class="r">SIMPSON</span>');

SETUP.push(() => {
// ---------- 1 · 95 millones mirando lo mismo ----------
{
  const nv = AT('h1', 'noventa y cinco');
  fotoR('sAbre', [-1, S('h2') - .1, .01, .3], 'oj1990.jpg', { pos: '50% 20%', tinte: .45, kb: [1.15, 1.05, 0, 0, 0, 0], lbl: 'O. J. Simpson · 1990',
    inner: `<div id="aN" style="position:absolute;left:0;right:0;top:440px;text-align:center;opacity:0"><div class="cbig" id="aV" style="font-size:190px;color:#ff2a2a;text-shadow:0 0 40px #000">0</div>
      <div class="osw" style="font-size:34px;letter-spacing:.24em;text-shadow:0 0 20px #000">PERSONAS MIRANDO LO MISMO</div></div>` });
  RENDER.push(t => { if (!on('sAbre')) return; $('aN').style.opacity = P(t, Math.max(nv - .3, 2.8), Math.max(nv, 3.1)); $('aV').textContent = fmt(95e6 * eo(P(t, Math.max(nv - .2, 2.8), nv + 1.4))); });
}
fotoR('sBro', [S('h2') - .1, S('c1') - .1, .3, .3], 'bronco.jpg', { pos: '32% 60%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'La Ford Bronco blanca de la persecución (hoy en un museo)',
  pills: [[S('h2') + .2, 'Una camioneta blanca'], [AT('h2', 'sesenta'), 'A 60 km/h'], [AT('h2', 'patrulleros'), 'Perseguida por patrulleros']], pTop: 440 });
// ---------- 2 · Quién iba adentro ----------
fotoR('sOJ', [S('c1') - .1, S('c2') - .1, .3, .3], 'oj1967.jpg', { pos: '46% 40%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Con la prensa · 1967',
  titulo: 'O. J.<br><span class="r">SIMPSON</span>', tT: AT('c1', 'O. J.') - .2, size: 200, pills: [[AT('c1', 'estrellas'), 'Estrella del fútbol americano']], pTop: 830 });
// ---------- 3 · Cinco días antes ----------
textosC('sVic', [S('c2') - .1, S('c3') - .1, .3, .3, 1.03], [
  { t: S('c2'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#ff5050">CINCO DÍAS ANTES</span>', size: 100, top: 390 },
  { t: AT('c2', 'asesinados'), html: 'ASESINADOS', size: 170, top: 470 },
  { t: AT('c2', 'Nicole'), html: 'NICOLE BROWN SIMPSON<br><span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">SU EXESPOSA</span>', size: 100, top: 690 },
  { t: AT('c2', 'Ron'), html: 'RON GOLDMAN<br><span style="font-size:.4em;color:#8a8a8a;letter-spacing:.2em">UN AMIGO DE ELLA</span>', size: 100, top: 880 }]);
// ---------- 4 · La estrella ----------
fotoR('sCar', [S('c3') - .1, AT('c3', 'Después') - .1, .3, .3], 'oj1973.jpg', { pos: '46% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Simpson en 1973',
  titulo: '2.000<br><span class="r">YARDAS</span>', tT: AT('c3', 'dos mil') - .2, size: 220, pills: [[AT('c3', 'temporada'), 'El primero en una temporada']], pTop: 860 });
fotoR('sAct', [AT('c3', 'Después') - .1, S('c4') - .1, .3, .3], 'ojactor.jpg', { pos: '20% 40%', bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'En la serie Medical Center · 1969',
  pills: [[AT('c3', 'actor'), 'Actor'], [AT('c3', 'comentarista'), 'Comentarista']], pTop: 440 });
// ---------- 5 · 1989 ----------
textosC('sVio', [S('c4') - .1, S('c5') - .1, .3, .3, 1.04], [
  { t: AT('c4', 'mil novecientos'), html: '<span class="r">1989</span>', size: 250, top: 390 },
  { t: AT('c4', 'violencia'), html: 'VIOLENCIA<br>DOMÉSTICA', size: 150, top: 640 },
  { t: AT('c4', 'impugnado'), html: '<span style="font-size:.5em;color:#8a8a8a">NO IMPUGNÓ EL CARGO</span>', size: 120, top: 940 }]);
textosC('sNo', [S('c5') - .1, S('c6') - .1, .3, .3, 1.04], [
  { t: S('c5'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">ESA MAÑANA</span>', size: 100, top: 400 },
  { t: AT('c5', 'entregarse'), html: 'TENÍA QUE<br>ENTREGARSE', size: 170, top: 480 }], { inner: selloC('nX', 'NO APARECIÓ', 170, 860, 130) });
RENDER.push(t => { if (on('sNo')) golpeC('nX', t, AT('c5', 'apareció'), -6); });
// ---------- 6 · Lo que llevaba en la camioneta ----------
{
  const a = S('c6'), b = S('c7'), it = [['arma', 'UN ARMA'], ['pasaporte', 'SU PASAPORTE'], ['miles', 'MILES DE DÓLARES EN EFECTIVO']];
  scene('sBag', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:url(img/bronco.jpg) 32% 60%/cover;filter:grayscale(1) brightness(.2)"></div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:96px">EN LA CAMIONETA</div>
    ${it.map(([f, s], i) => `<div id="gI${i}" data-t="${AT('c6', f)}" style="position:absolute;left:64px;right:64px;top:${530 + i * 170}px;height:140px;background:#ece8e1;color:#111;opacity:0;display:flex;align-items:center;gap:26px;padding:0 26px;box-shadow:0 20px 50px rgba(0,0,0,.7)">
      <div class="osw" style="font-size:22px;letter-spacing:.2em;color:#fff;background:#c8101b;padding:10px 14px;line-height:1.2;text-align:center">EVIDENCIA<br>0${i + 1}</div><div class="cbig" style="font-size:${i === 2 ? 58 : 84}px;color:#111">${s}</div></div>`).join('')}`);
  const ns = [...document.querySelectorAll('#sBag [data-t]')];
  RENDER.push(t => { if (!on('sBag')) return; ns.forEach((n, i) => { const q = P(t, +n.dataset.t - .1, +n.dataset.t + .2); n.style.opacity = q; n.style.transform = `rotate(${(i - 1) * 1.5}deg) scale(${lerp(1.25, 1, eo(q))})`; }); });
}
fotoR('sEnt', [S('c7') - .1, S('c8') - .1, .3, .3], 'ficha.jpg', { pos: '50% 30%', kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Ficha policial · 17 de junio de 1994',
  titulo: 'SE<br><span class="r">ENTREGÓ</span>', tT: AT('c7', 'entregó') - .2, size: 200, top: 400, pills: [[AT('c7', 'casa'), 'En su casa, después de horas']], pTop: 1040 });
// ---------- 7 · Las pruebas: un guante en cada lugar ----------
{
  const a = S('c8'), gu = AT('c8', 'guantes'), un = AT('c8', 'uno en'), ot = AT('c8', 'el otro'), b = S('c9');
  scene('sPru', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div><svg class="full" id="pS" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:64px;right:64px;top:390px;display:flex;gap:14px;flex-wrap:wrap">${[['sangre', 'SANGRE'], ['huellas', 'HUELLAS'], ['guantes', 'GUANTES DE CUERO']].map(([f, s]) => `<div class="cpill" data-t="${AT('c8', f)}" style="opacity:0;font-size:30px;padding:12px 20px">${s}</div>`).join('')}</div>
    <div id="pA" class="osw" style="position:absolute;left:60px;width:440px;top:960px;text-align:center;font-size:28px;letter-spacing:.2em;opacity:0">ESCENA DEL CRIMEN</div>
    <div id="pB" class="osw" style="position:absolute;left:580px;width:440px;top:960px;text-align:center;font-size:28px;letter-spacing:.2em;opacity:0;color:#ff5050">SU CASA</div>
    <div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  const svg = $('pS'), g1 = guante(svg, 160, 580, 1.25), g2 = guante(svg, 680, 580, 1.25, { fill: '#2e1c12' }), ln = el('line', { x1: 500, y1: 760, x2: 580, y2: 760, stroke: '#ff2a2a', 'stroke-width': 4, 'stroke-dasharray': '10 8', opacity: 0 }, svg);
  const ps = [...document.querySelectorAll('#sPru [data-t]')];
  RENDER.push(t => {
    if (!on('sPru')) return;
    ps.forEach(p => { const q = P(t, +p.dataset.t - .1, +p.dataset.t + .2); p.style.opacity = q; });
    g1.setAttribute('opacity', P(t, un - .2, un + .2)); $('pA').style.opacity = P(t, un - .2, un + .2);
    g2.setAttribute('opacity', P(t, ot - .2, ot + .2)); $('pB').style.opacity = P(t, ot - .2, ot + .2); ln.setAttribute('opacity', P(t, ot + .2, ot + .6));
    g1.setAttribute('transform', `translate(160 ${580 + 6 * Math.sin(t * 2)}) scale(1.25) rotate(-8 100 130)`); g2.setAttribute('transform', `translate(680 ${580 + 6 * Math.sin(t * 2 + 1)}) scale(-1.25 1.25) translate(-200 0) rotate(-8 100 130)`);
  });
}
fotoR('sFac', [S('c9') - .1, S('c10') - .1, .3, .3], 'escena.jpg', { pos: '45% 40%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Policías en la entrada de la casa · junio de 1994',
  titulo: 'EL CASO<br><span class="r">MÁS FÁCIL</span>', tT: AT('c9', 'caso') - .2, size: 170, pills: [[AT('c9', 'Parecía'), 'Parecía']], pTop: 760 });
fotoR('sSig', [S('c10') - .1, S('c11') - .1, .3, .3], 'tribunal.jpg', { pos: '50% 50%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Tribunal penal de Los Ángeles',
  titulo: 'EL JUICIO<br><span class="r">DEL SIGLO</span>', tT: AT('c10', 'juicio') - .2, size: 190 });
// ---------- 8 · Parte 2 ----------
{
  const a = S('c11'), b = TL.duration;
  scene('sP2', [a - .1, b + 1, .3, .01, 1.04], `<div style="position:absolute;inset:0;background:url(img/ficha.jpg) 50% 30%/cover;filter:grayscale(1) brightness(.25)"></div><svg class="full" id="p2S" viewBox="0 0 1080 1920"></svg>
    <div id="p2" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:140px;margin-top:30px;text-shadow:0 0 30px #000">EL GUANTE<br><span class="r">QUE LO SALVÓ</span></div></div>`);
  const g = guante($('p2S'), 400, 780, 1.4);
  RENDER.push(t => { if (!on('sP2')) return; $('p2').style.opacity = P(t, a + .2, a + .7); g.setAttribute('opacity', P(t, a + .5, a + 1)); });
}
});
