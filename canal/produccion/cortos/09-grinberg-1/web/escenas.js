// "Pasó de verdad" · Jacobo Grinberg, parte 1: el científico que estudiaba la conciencia (hasta que dejó de aparecer).
// Estilo caso real (caso.js + reel.js) en vertical. No hay fotos libres de Grinberg: van fotos de la UNAM (ver web/img/fotos.json) y dibujos.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'diciembre', 'a'], ['h1', 'científico', 'a'], ['h1', 'desapareció', 'r'], ['h1', 'cumpleaños', 'a'], ['h2', 'Nunca', 'r'], ['c1', 'Jacobo', 'a'], ['c1', 'Grinberg', 'a'],
  ['c1', 'UNAM', 'a'], ['c2', 'Nueva', 'a'], ['c2', 'York', 'a'], ['c2', 'cincuenta', 'r'], ['c3', 'conciencia', 'r'], ['c4', 'meditaban', 'a'], ['c4', 'aislados', 'a'],
  ['c4', 'parecidos', 'r'], ['c5', 'sintérgica', 'r'], ['c5', 'antena', 'a'], ['c6', 'nunca', 'r'], ['c7', 'chamanes', 'a'], ['c7', 'curanderos', 'a'], ['c8', 'Pachita', 'r'],
  ['c8', 'cuchillo', 'r'], ['c8', 'anestesia', 'r'], ['c9', 'explicación', 'a'], ['c10', 'desconfianza', 'r'], ['c11', 'aparecer', 'r'], ['c12', 'dos', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'CASO', hide: S('c12') - .1,
  horas: [[2.6, 'DIC 1994', true], [S('c1') - .1, 'MÉXICO'], [S('c11') - .1, 'DIC 1994', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('JACOBO<br><span class="r">GRINBERG</span>');

SETUP.push(() => {
// ---------- 1 · Diciembre de 1994: cuatro días antes de su cumpleaños ----------
calendarioR('sCal', [-1, S('c1') - .1, .01, .3], { mes: 'DICIEMBRE <span class="r">1994</span>', primero: 3, t0: 2.5,
  bg: '<div style="position:absolute;inset:0;background:url(img/medicina.jpg) 70% 50%/cover;filter:grayscale(1) brightness(.5)"></div>',
  marcas: [{ d: 8, t: AT('h1', 'desapareció'), txt: 'DESAPARECE' }, { d: 12, t: AT('h1', 'cumpleaños'), txt: 'CUMPLEAÑOS', col: '#3a3a3a' }],
  inner: selloC('cX', 'NUNCA APARECIÓ', 120, 960, 110) });
RENDER.push(t => { if (on('sCal')) golpeC('cX', t, S('h2'), -5); });
// ---------- 2 · Quién era ----------
fotoR('sUna', [S('c1') - .1, S('c2') - .1, .3, .3], 'biblioteca.jpg', { pos: '26% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Biblioteca Central · UNAM, Ciudad de México',
  titulo: 'JACOBO<br><span class="r">GRINBERG</span>', tT: AT('c1', 'Jacobo') - .2, size: 170,
  pills: [[AT('c1', 'neurofisiólogo'), 'Neurofisiólogo'], [AT('c1', 'UNAM'), 'Investigador de la UNAM']] });
papelesR('sLib', [S('c2') - .1, S('c3') - .1, .3, .3], { num: 50, pre: '+', tNum: AT('c2', 'cincuenta'), rotulo: 'LIBROS',
  cartel: [AT('c2', 'Nueva York'), 'DOCTORADO EN <span class="r">NUEVA YORK</span>'] });
// ---------- 3 · La conciencia: ondas del cerebro ----------
{
  const a = S('c3'), co = AT('c3', 'conciencia'), b = S('c4');
  scene('sCon', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div><svg class="full" id="coS" viewBox="0 0 1080 1920"></svg>
    <div id="coT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:150px;opacity:0">LA<br><span class="r">CONCIENCIA</span></div>
    <div style="position:absolute;left:64px;right:64px;top:1030px;display:flex;gap:16px">${[['pensamos', 'PENSAR'], ['meditamos', 'MEDITAR'], ['conectamos', 'CONECTARSE']].map(([f, s], i) => `<div id="coP${i}" class="cpill" style="opacity:0" data-t="${AT('c3', f)}">${s}</div>`).join('')}</div>`);
  const r = rnd(5), ch = Array.from({ length: 6 }, (_, i) => ({ y: 700 + i * 52, f: [.02 + r() * .02, .05 + r() * .05, .11 + r() * .08], ph: [r() * 6, r() * 6, r() * 6],
    l: el('polyline', { fill: 'none', stroke: i % 2 ? '#ece8e1' : '#ff2a2a', 'stroke-width': 3, opacity: .85 }, $('coS')) }));
  const ps = [...document.querySelectorAll('#sCon .cpill')];
  RENDER.push(t => {
    if (!on('sCon')) return;
    $('coT').style.opacity = P(t, co - .3, co + .1);
    const k = P(t, a, a + 1);
    ch.forEach(c => { const pts = []; for (let x = 0; x <= 1080 * k; x += 8) pts.push(`${x},${(c.y + 14 * Math.sin(x * c.f[0] + t * 3 + c.ph[0]) + 9 * Math.sin(x * c.f[1] - t * 5 + c.ph[1]) + 5 * Math.sin(x * c.f[2] + t * 9 + c.ph[2])).toFixed(1)}`); c.l.setAttribute('points', pts.join(' ')); });
    ps.forEach(p => { const q = P(t, +p.dataset.t - .1, +p.dataset.t + .25); p.style.opacity = q; p.style.transform = `translateY(${lerp(20, 0, eo(q))}px)`; });
  });
}
// ---------- 4 · Parejas que meditaban en cuartos aislados ----------
{
  const a = S('c4'), ai = AT('c4', 'aislados'), pa = AT('c4', 'patrones'), b = S('c5');
  scene('sPar', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div id="pT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:110px;opacity:0">PAREJAS QUE<br><span class="r">MEDITABAN JUNTAS</span></div>
    ${[64, 566].map((x, i) => `<div style="position:absolute;left:${x}px;top:620px;width:450px;height:330px;border:3px solid #3a3a3a;background:#0b0b0b"><div class="osw" style="position:absolute;left:18px;top:12px;font-size:24px;letter-spacing:.24em;color:#8a8a8a">CUARTO ${'AB'[i]}</div></div>`).join('')}
    <div id="pM" style="position:absolute;left:528px;top:600px;width:24px;height:370px;background:#c8101b;transform-origin:top;transform:scaleY(0)"></div>
    <div id="pA" class="osw" style="position:absolute;left:0;right:0;top:970px;text-align:center;font-size:30px;letter-spacing:.3em;opacity:0">AISLADOS</div>
    <svg class="full" id="pS" viewBox="0 0 1080 1920"></svg>
    <div id="pP" class="cpill" style="position:absolute;left:64px;top:1030px;opacity:0">Según él: patrones parecidos</div>
    <div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  const ln = [0, 1].map(i => el('polyline', { fill: 'none', stroke: i ? '#ece8e1' : '#ff2a2a', 'stroke-width': 4 }, $('pS')));
  RENDER.push(t => {
    if (!on('sPar')) return;
    $('pT').style.opacity = P(t, a, a + .4); $('pM').style.transform = `scaleY(${eo(P(t, ai - .3, ai + .2))})`; $('pA').style.opacity = P(t, ai - .2, ai + .2); $('pP').style.opacity = P(t, pa - .1, pa + .25);
    const s = eo(P(t, pa - .4, pa + .8));
    ln.forEach((l, i) => { const x0 = i ? 590 : 88, pts = []; for (let x = 0; x <= 400; x += 6) { const u = x + t * 120, f = i ? lerp(.047, .03, s) : .03, ph = i ? lerp(2.2, 0, s) : 0;
      pts.push(`${x0 + x},${(800 + 34 * Math.sin(u * f + ph) + lerp(i ? 22 : 14, 6, s) * Math.sin(u * (i ? .13 : .09) + ph)).toFixed(1)}`); } l.setAttribute('points', pts.join(' ')); });
  });
}
// ---------- 5 · La teoría sintérgica ----------
{
  const a = S('c5'), b = S('c7');
  scene('sSin', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,#160606,#050505 70%)"></div><svg class="full" id="sS" viewBox="0 0 1080 1920"></svg>
    <div class="clbl" style="opacity:1"><i></i>Ilustración</div>
    <div id="sT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:140px;opacity:0;text-shadow:0 0 30px #000">TEORÍA<br><span class="r">SINTÉRGICA</span></div>
    <div id="sP0" class="cpill" style="position:absolute;left:64px;top:660px;opacity:0">La realidad: un campo de información</div>
    <div id="sP1" class="cpill" style="position:absolute;left:64px;top:732px;opacity:0">El cerebro: una antena</div>
    ${selloC('sX', 'NO ACEPTADA', 150, 900, 120)}`);
  const svg = $('sS'), gl = el('g', { opacity: .55 }, svg), hl = [], vl = [];
  for (let i = 0; i < 15; i++) hl.push(el('polyline', { fill: 'none', stroke: '#5a1a1a', 'stroke-width': 2 }, gl));
  for (let i = 0; i < 13; i++) vl.push(el('polyline', { fill: 'none', stroke: '#5a1a1a', 'stroke-width': 2 }, gl));
  const an = [0, 1, 2].map(() => el('circle', { cx: 540, cy: 900, r: 0, fill: 'none', stroke: '#ff2a2a', 'stroke-width': 3 }, svg));
  el('circle', { cx: 540, cy: 900, r: 16, fill: '#ff2a2a' }, svg);
  const fx = (x, y, t) => [x + 10 * Math.sin(y * .012 + t * 1.6), y + 10 * Math.sin(x * .012 + t * 1.3)];
  RENDER.push(t => {
    if (!on('sSin')) return;
    hl.forEach((l, i) => { const y = 560 + i * 48, pts = []; for (let x = 20; x <= 1060; x += 30) pts.push(fx(x, y, t).map(v => v.toFixed(1)).join(',')); l.setAttribute('points', pts.join(' ')); });
    vl.forEach((l, i) => { const x = 60 + i * 80, pts = []; for (let y = 560; y <= 1232; y += 30) pts.push(fx(x, y, t).map(v => v.toFixed(1)).join(',')); l.setAttribute('points', pts.join(' ')); });
    const ka = P(t, AT('c5', 'antena') - .2, AT('c5', 'antena') + .2);
    an.forEach((c, i) => { const p = (t * .7 + i / 3) % 1; c.setAttribute('r', 20 + p * 300); c.setAttribute('opacity', (1 - p) * ka); });
    $('sT').style.opacity = P(t, AT('c5', 'sintérgica') - .3, AT('c5', 'sintérgica') + .1);
    $('sP0').style.opacity = P(t, AT('c5', 'campo') - .1, AT('c5', 'campo') + .25); $('sP1').style.opacity = P(t, AT('c5', 'antena') - .1, AT('c5', 'antena') + .25);
    golpeC('sX', t, AT('c6', 'nunca'), -6);
  });
}
// ---------- 6 · Chamanes y curanderos de México ----------
{
  const a = S('c7'), b = S('c8');
  scene('sMex', [a - .1, b - .1, .3, .3, 0], `<svg class="full" id="mS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>México</div>
    <div id="mT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;opacity:0;text-shadow:0 0 30px #000">CHAMANES Y<br><span class="r">CURANDEROS</span></div>
    <div id="mK" class="cpill" style="position:absolute;left:64px;top:1060px;opacity:0">Años de viajes y estudio</div>`);
  const proj = d3.geoMercator().fitExtent([[60, 640], [1020, 1100]], { type: 'MultiPoint', coordinates: [[-117, 14.5], [-86.7, 32.7]] });
  const M = mundo($('mS'), { proj }), mx = M.pais('484', '#3a1010'), cd = lugar(M, [-99.13, 19.43], 'CIUDAD DE MÉXICO', { col: '#ff2a2a', dot: '#ff6060', anchor: 'start' });
  RENDER.push(t => {
    if (!on('sMex')) return;
    camMundo(M, 540, 870, lerp(1, 1.08, P(t, a, b))); cd.fijo(lerp(1, 1.08, P(t, a, b))); cd.pulso(t);
    mx.setAttribute('opacity', P(t, a, a + .5)); cd.c.setAttribute('opacity', P(t, a + .3, a + .6));
    $('mT').style.opacity = P(t, AT('c7', 'chamanes') - .3, AT('c7', 'chamanes') + .1); $('mK').style.opacity = P(t, AT('c7', 'años') - .1, AT('c7', 'años') + .25);
  });
}
// ---------- 7 · Pachita ----------
textosC('sPac', [S('c8') - .1, S('c9') - .1, .3, .3, 1.04], [
  { t: AT('c8', 'Pachita'), html: 'PACHITA', size: 230, top: 380 },
  { t: AT('c8', 'curandera'), html: '<span style="font-size:.5em;color:#8a8a8a;letter-spacing:.1em">UNA CURANDERA</span>', size: 120, top: 620 },
  { t: AT('c8', 'cuchillo'), html: '<span class="r">OPERABA CON UN CUCHILLO</span>', size: 96, top: 730 },
  { t: AT('c8', 'anestesia'), html: 'Y SIN ANESTESIA', size: 120, top: 840 },
  { t: AT('c8', 'según él'), html: '<span style="font-size:.4em;letter-spacing:.3em;color:#ff5050">SEGÚN GRINBERG</span>', size: 100, top: 1010 }]);
// ---------- 8 · El libro ----------
{
  const a = S('c9'), ex = AT('c9', 'explicación'), b = S('c10');
  scene('sLibro', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#1a0707,#050505 70%)"></div><div class="clbl" style="opacity:1"><i></i>Ilustración</div>
    <div id="bL" style="position:absolute;left:310px;top:400px;width:460px;height:600px;background:linear-gradient(90deg,#4a0b0b 0 36px,#7a1414 36px);box-shadow:0 30px 80px rgba(0,0,0,.8),inset -8px 0 20px rgba(0,0,0,.4);opacity:0">
      <div class="osw" style="position:absolute;left:70px;right:30px;top:60px;font-size:26px;letter-spacing:.3em;color:#e8c9c9">J. GRINBERG</div>
      <div class="cbig" style="position:absolute;left:70px;right:20px;top:200px;font-size:120px;color:#fff">PACHITA</div>
      <div style="position:absolute;left:70px;right:40px;top:350px;height:4px;background:#e8c9c9"></div></div>
    <div id="bQ" class="cpill" style="position:absolute;left:64px;top:1040px;opacity:0">"No tenía explicación"</div>`);
  RENDER.push(t => {
    if (!on('sLibro')) return; const q = P(t, a, a + .5);
    $('bL').style.opacity = q; $('bL').style.transform = `perspective(1400px) rotateY(${lerp(-35, -12, eo(q)).toFixed(1)}deg) translateY(${lerp(40, 0, eo(q))}px)`;
    $('bQ').style.opacity = P(t, ex - .3, ex);
  });
}
// ---------- 9 · Desconfianza ----------
fotoR('sDes', [S('c10') - .1, S('c11') - .1, .3, .3], 'cu.jpg', { pos: '36% 50%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Ciudad Universitaria · UNAM',
  titulo: 'DESCON<br><span class="r">FIANZA</span>', tT: AT('c10', 'desconfianza') - .2, size: 200, pills: [[AT('c10', 'colegas'), 'Muchos colegas']], pTop: 800 });
// ---------- 10 · Dejó de aparecer ----------
fotoR('sFal', [S('c11') - .1, S('c12') - .1, .3, .3], 'mural.jpg', { bn: true, tinte: .45, kb: [1.15, 1.3, 0, 0, 0, 0], lbl: 'Mural de José Chávez Morado · UNAM',
  titulo: 'DEJÓ DE<br><span class="r">APARECER</span>', tT: AT('c11', 'dejó') - .2, size: 170, pills: [[AT('c11', 'diciembre'), 'Diciembre de 1994']], pTop: 800 });
// ---------- 11 · Parte 2 ----------
{
  const a = S('c12'), b = TL.duration;
  textosC('sP2', [a - .1, b + 1, .3, .01, 1.04], [
    { t: a + .2, html: '<span style="font-size:.3em;letter-spacing:.4em;color:#ff5050">PARTE 2</span>', size: 120, top: 400 },
    { t: AT('c12', 'pistas'), html: 'LAS PISTAS', size: 170, top: 500 },
    { t: AT('c12', 'teorías'), html: 'LAS TEORÍAS', size: 170, top: 660 },
    { t: AT('c12', 'pregunta'), html: '<span class="r">¿QUÉ LE PASÓ?</span>', size: 150, top: 840 }],
    { bg: '<div style="position:absolute;inset:0;background:url(img/biblioteca.jpg) 26% 50%/cover;filter:grayscale(1) brightness(.25)"></div>', inner: cierreR });
  RENDER.push(cierreAnim);
}
});
