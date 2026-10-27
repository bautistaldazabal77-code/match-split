// Apertura: la noche en la cárcel, quién era, el contador de impunidad, las tres preguntas y el título.
grano();
// el contador sube en cada "sin consecuencias" del guion y se ve en la apertura, los capítulos 1 a 4 y el final
contador([[AT('c23', 'Nadie hizo nada'), 1], [S('c30'), 2], [S('c43'), 3], [S('c71'), 4], [ATE('c80', 'sacaran'), 5], [AT('c94', 'violó la ley'), 6], [AT('c97', 'doce horas'), 7]],
  [[S('c10'), S('titulo') - .3], [S('c14'), S('cap2')], [S('c44'), S('cap3')], [S('c62'), S('cap4')], [S('c81'), S('cap5')], [S('c165'), E('c172') + .5]]);
SETUP.push(() => {
// ---------- 1 · La cámara del pasillo, la noche del 10 de agosto ----------
{
  const c2 = S('c2'), c3 = S('c3'), c4 = S('c4'), c5 = S('c5'), b = S('c6');
  const tags = [['CENTRO CORRECCIONAL METROPOLITANO · NUEVA YORK', S('c1') + .5, '#dfe6df'], ['COMPAÑERO DE CELDA: TRASLADADO', c2, '#ff5050'], ['RONDAS CADA 30 MINUTOS: NO SE HICIERON', c3, '#ff5050'], ['2 CÁMARAS: SIN GRABACIÓN', c4, '#ff5050']];
  cctvC('e_cctv', [-1, b - .1, .01, .4], { horas: [[-1, '03:41:12', 60], [c5 - .2, '06:30:04', 1]], ruido: [[c4 + .2, c4 + .9], [c4 + 1.3, c4 + 1.6]],
    inner: tags.map(([s, t, col], i) => `<div class="osw" id="ecT${i}" style="position:absolute;left:70px;top:${600 + i * 66}px;font-size:30px;letter-spacing:.12em;color:${col};opacity:0;background:rgba(0,0,0,.55);padding:4px 14px">${s}</div>`).join('') +
      `<div id="ecM" style="position:absolute;left:0;right:0;top:300px;text-align:center;opacity:0"><div class="cbig" style="font-size:200px;color:#ff2a2a;text-shadow:0 0 40px rgba(255,42,42,.6)">06:33</div><div class="osw" style="font-size:34px;letter-spacing:.3em">HALLADO SIN VIDA</div></div>` });
  RENDER.push(t => {
    if (!on('e_cctv')) return;
    tags.forEach(([, ti], i) => $('ecT' + i).style.opacity = P(t, ti, ti + .3) * (1 - P(t, c5 - .3, c5)));
    $('ecM').style.opacity = P(t, c5 + .3, c5 + .6);
  });
}
// ---------- 2 · Se llamaba Jeffrey Epstein ----------
fotoC('e_mug', [S('c6') - .1, S('c8') - .1, .3, .4], 'epstein-2006.jpg', { bn: true, ret: 'der', kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="emN" style="position:absolute;left:96px;bottom:150px;opacity:0"><div class="cbig" style="font-size:190px">JEFFREY <span class="r">EPSTEIN</span></div><div class="osw" id="emA" style="font-size:34px;letter-spacing:.4em;opacity:0">1953 – 2019</div></div>` });
RENDER.push(t => { if (!on('e_mug')) return; const a = S('c6'); $('emN').style.opacity = P(t, a, a + .4); $('emA').style.opacity = P(t, S('c7'), S('c7') + .5); });
// ---------- 3 · Cada vez que cruzó un límite… vamos a contarlas ----------
textosC('e_cont', [S('c8') - .1, S('c11') - .1, .4, .4, 1.03], [
  { t: S('c8'), html: 'CADA LÍMITE QUE CRUZÓ', size: 150, top: 300 },
  { t: S('c9'), html: '<span class="r">SALIÓ CASI SIN CASTIGO</span>', size: 150, top: 470 },
  { t: S('c10'), html: '<span style="font-size:.45em;color:#8a8a8a">VAMOS A CONTARLAS ↗</span>', size: 150, top: 690 }]);
// ---------- 4 · Tres preguntas ----------
tableroC('e_pre', [S('c11') - .1, S('titulo') + .1, .4, .5], [
  { t: S('c11') - .3, x: 760, y: 250, w: 400, h: 500, img: 'epstein-2006.jpg', tx: 'J. EPSTEIN', rot: -2, pos: '50% 20%' },
  { t: S('c11'), x: 180, y: 220, txt: '¿DE DÓNDE SALIÓ<br>SU FORTUNA?', rot: -4 },
  { t: S('c12'), x: 1330, y: 260, txt: '¿POR QUÉ LO RODEABAN<br>TANTOS PODEROSOS?', rot: 3 },
  { t: S('c13'), x: 600, y: 820, txt: '¿QUÉ HAY EN <span style="color:#b81414">LA LISTA</span>?', rot: -1 }],
  [{ t: S('c11') + .2, de: 0, a: 1 }, { t: S('c12') + .2, de: 0, a: 2 }, { t: S('c13') + .2, de: 0, a: 3 }],
  { cam: [[S('c11') - .1, 960, 520, 1], [S('titulo'), 960, 540, 1.1]] });
// ---------- 5 · Título ----------
{
  const a = S('titulo'), b = E('titulo');
  scene('e_tit', [a - .1, b + .2, .3, .6, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#2a0303,#050505 65%)"></div>
    <div style="position:absolute;left:0;right:0;top:250px;text-align:center"><div class="cbig" id="etI" style="font-size:420px;color:#ff2a2a;text-shadow:0 0 60px rgba(255,42,42,.5)">IMPUNE</div>
    <div class="osw" id="etS" style="font-size:40px;letter-spacing:.5em;margin-right:-.5em;opacity:0">EL CASO JEFFREY EPSTEIN</div></div>`);
  RENDER.push(t => {
    if (!on('e_tit')) return;
    const q = P(t, a + .1, a + .6), gl = t < a + 1.4 && Math.floor(t * 20) % 3 === 0;
    $('etI').style.opacity = q * (gl ? .5 : 1); $('etI').style.transform = `scale(${lerp(1.15, 1, eo(q))}) translateX(${gl ? 14 : 0}px)`;
    $('etI').style.textShadow = gl ? '-12px 0 rgba(255,42,42,.9), 12px 0 rgba(0,220,255,.45)' : '0 0 60px rgba(255,42,42,.5)';
    $('etS').style.opacity = P(t, a + 1.2, a + 2);
  });
}
});
