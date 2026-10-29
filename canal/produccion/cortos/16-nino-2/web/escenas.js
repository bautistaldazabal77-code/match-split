// "¿Y si…? El Niño llega a su pico" · parte 2 (ficción con datos reales). Todo animado, sin fotos.
// Lo real: gran parte de Rosario está sobre una barranca, cerca del 75 % de los granos, harinas y aceites que exporta la Argentina sale por el Gran Rosario (2025),
// los niveles de alerta y evacuación (5,00 y 5,30 m, INA) y el pronóstico de la OMM (hasta +3,8 °C). La evacuación, el corte de la ruta, el pico de 6,10 m y la bajante son ficción.

captions([
  ['h1', 'seis', 'r'], ['h1', 'metros', 'r'], ['h1', 'Elsa', 'a'], ['h1', 'no', 'r'], ['h1', 'termina', 'a'], ['h2', 'Ficción', 'a'], ['h2', 'reales', 'g'],
  ['c1', 'diecisiete', 'a'], ['c1', 'Prefectura', 'a'], ['c1', 'lancha', 'a'], ['c1', 'última', 'r'], ['c1', 'perro', 'a'], ['c1', 'papeles', 'a'],
  ['c2', 'real', 'g'], ['c2', 'barranca', 'a'], ['c2', 'islas', 'r'], ['c2', 'costa', 'r'], ['c2', 'baja', 'r'], ['c3', 'golpe', 'r'], ['c3', 'no', 'r'], ['c3', 'río', 'a'],
  ['c4', 'real', 'g'], ['c4', 'Gran', 'a'], ['c4', 'Rosario', 'a'], ['c4', 'setenta', 'r'], ['c4', 'cinco', 'r'], ['c4', 'exporta', 'a'], ['c5', 'veinte', 'a'], ['c5', 'lento', 'r'], ['c5', 'media', 'r'], ['c5', 'máquina', 'r'],
  ['c6', 'veintidós', 'a'], ['c6', 'ruta', 'a'], ['c6', 'Victoria', 'a'], ['c6', 'cortan', 'r'], ['c7', 'veinticuatro', 'a'], ['c7', 'seis', 'r'], ['c7', 'diez', 'r'], ['c7', 'pico', 'r'], ['c7', 'Litoral', 'a'],
  ['c8', 'baja', 'g'], ['c8', 'Seis', 'g'], ['c8', 'ochenta', 'g'], ['c8', 'cincuenta', 'g'], ['c9', 'cincuenta', 'a'], ['c9', 'debajo', 'g'], ['c9', 'vuelve', 'g'], ['c9', 'barro', 'a'], ['c9', 'pie', 'g'],
  ['c10', 'ochenta', 'a'], ['c10', 'nueva', 'a'], ['c10', 'veintisiete', 'a'], ['c11', 'ficción', 'a'], ['c11', 'tres', 'r'], ['c11', 'ocho', 'r'], ['c11', 'no', 'r'],
  ['c12', 'avisos', 'g'], ['c12', 'oficiales', 'g'], ['c12', 'ibas', 'a'], ['c12', 'quedabas', 'r'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 2', aviso: 'FICCIÓN · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2,
  horas: [[-1, '16', true], [S('c1') - .1, '17', true], [S('c5') - .1, '20', true], [S('c6') - .1, '22', true], [S('c7') - .1, '24', true], [S('c9') - .1, '50']] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
const esquema = (id, txt = 'ESQUEMA · NO ESTÁ A ESCALA') => `<div id="${id}" class="lbl" style="left:64px;top:1500px;font-size:20px;color:rgba(236,235,230,.45)">${txt}</div>`;
// regla grande con el número al lado (para las escenas de altura)
function escenaRegla(svg, o = {}) { el('rect', { width: 1080, height: 1920, fill: o.bg || '#081018' }, svg); return regla(svg, o.x || 130, o.y || 400, o.h || 760, { lo: o.lo ?? 4, hi: o.hi ?? 6.5 }); }
const colorNivel = v => v >= NIV.evac - .01 ? '#ff5148' : v >= NIV.alerta - .01 ? '#ffc142' : '#3fa3e6';

SETUP.push(() => {
// ---------- 1 · Gancho: el río podría pasar los seis metros, y Elsa no se quiere ir ----------
{
  const se = AT('h1', 'seis'), es = AT('h1', 'Elsa'), co = AT('h1', 'Cómo');
  scene('sRe', [-1, co - .1, .01, .1, 0], `<svg class="full" id="vRe" viewBox="0 0 1080 1920"></svg>
    <div id="reN" style="position:absolute;left:560px;top:420px;font:900 130px/1 'Inter Var';color:#ff5148">5,30 m</div>
    <div id="reP" class="pill" style="position:absolute;left:560px;top:580px;background:#c3332b;color:#fff;font-size:30px;opacity:0">PRONÓSTICO: +6 M</div>
    <div id="reB" style="position:absolute;left:600px;top:700px;width:380px;height:440px;opacity:0">${busto(ELSA)}</div>
    <div id="reE" class="pill" style="position:absolute;left:560px;top:1110px;background:rgba(9,12,17,.9);border:1px solid #8fd0ff;color:#8fd0ff;font-size:28px;opacity:0">ELSA NO SE QUIERE IR</div>`);
  const R = escenaRegla($('vRe'));
  RENDER.push(t => {
    if (!on('sRe')) return;
    const v = lerp(5.3, 5.48, P(t, 0, co)); R.set(v, t); $('reN').textContent = fmtM(v);
    aparece('reP', t, se - .2); const q = P(t, es - .2, es + .2); $('reB').style.opacity = q; $('reB').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`; aparece('reE', t, es + .3);
  });
}
// ---------- 2 · ¿Cómo termina? ----------
{
  const a = AT('h1', 'Cómo');
  scene('sQue', [a - .1, S('h2') - .1, .05, .1, 1.06], `${fondo('#0a1830')}
    <div id="quT" style="position:absolute;left:64px;top:640px;font:900 130px/1.02 'Inter Var';letter-spacing:-.025em;opacity:0">¿CÓMO<br><span style="color:#8fd0ff">TERMINA?</span></div>`);
  RENDER.push(t => { if (!on('sQue')) return; golpeT('quT', t, a, 1.3); });
}
// ---------- 3 · Parte 2 ----------
{
  const a = S('h2');
  scene('sP2', [a - .1, S('c1') - .1, .15, .2, 1.06], `${fondo('#0a1830')}
    <div style="position:absolute;left:64px;top:620px;width:860px"><div id="p2L" style="height:6px;background:#8fd0ff;width:0"></div>
    <div id="p2T" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">PARTE <span style="color:#8fd0ff">2</span></div>
    <div id="p2S" class="lbl" style="position:static;margin-top:18px;font-size:28px;color:#cfd3d8;opacity:0">ficción · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sP2')) return;
    $('p2L').style.width = 860 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('p2T').style.opacity = q; $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%';
    $('p2S').style.opacity = P(t, AT('h2', 'Ficción') - .1, AT('h2', 'Ficción') + .3);
  });
}
// ---------- 4 · Día 17: evacuación en lancha. Elsa sube a la última ----------
{
  const a = S('c1'), la = AT('c1', 'lancha'), el2 = AT('c1', 'Elsa'), pe = AT('c1', 'perro');
  scene('sLan', [a - .1, S('c2') - .1, .2, .15, 1.04], `<svg class="full" id="vLa" viewBox="0 0 1080 1920"></svg>${fic('laF')}
    <div id="laC" class="card" style="left:64px;top:410px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">ELSA LLEVA</div><div style="font:800 40px/1.25 'Inter Var'">el perro<br>y sus papeles</div></div>${esquema('laE')}`);
  const svg = $('vLa'), C = corte(svg, { cx: 930, cs: .55, cielo: '#0a1220' }), rain = lluvia(svg, [0, 300, 1080, 1500], 120, 9);
  const L = el('g', {}, svg), li = el('g', { transform: 'scale(.7)' }, L); lancha(li);
  icono(li, 'persona', -80, -110, 1.1, '#cfd2d6').setAttribute('opacity', 1); icono(li, 'persona', 10, -110, 1.1, '#ff7a1a').setAttribute('opacity', 1);
  const perro = el('path', { d: 'M-130,-40 L-100,-40 L-96,-52 L-90,-46 L-92,-30 L-96,-14 L-100,-14 L-102,-28 L-122,-28 L-124,-14 L-128,-14 Z', fill: '#c9a26b' }, li);
  RENDER.push(t => {
    if (!on('sLan')) return;
    aparece('laF', t, a); C.agua(t, 1098); rain(t, .6);
    const k = io(P(t, el2 + .3, S('c2') - .2)), x = lerp(820, 360, k), y = 1098 + 4 * Math.sin(t * 2.4);
    L.setAttribute('transform', `translate(${x} ${y}) rotate(${(1.5 * Math.sin(t * 1.8)).toFixed(2)})`); L.setAttribute('opacity', P(t, la - .5, la));
    perro.setAttribute('opacity', P(t, pe - .2, pe)); entra('laC', t, pe - .1);
  });
}
// ---------- 5 · Dato real: Rosario está arriba de una barranca; se inundan las islas y la costa baja ----------
{
  const a = S('c2'), ba = AT('c2', 'barranca'), is = AT('c2', 'islas');
  scene('sBar', [a - .1, S('c3') - .1, .15, .1, 1.04], `<svg class="full" id="vBa" viewBox="0 0 1080 1920"></svg>${real('baR')}${esquema('baE')}`);
  const svg = $('vBa'), C = corte(svg, { cx: 930, cs: .55, cielo: '#0e1a2a' });
  const fl = el('g', { opacity: 0 }, svg); el('path', { d: 'M520,900 L520,1080', stroke: '#ffc142', 'stroke-width': 4, 'marker-end': '' }, fl);
  el('path', { d: 'M506,916 L520,900 L534,916 M506,1064 L520,1080 L534,1064', stroke: '#ffc142', 'stroke-width': 4, fill: 'none' }, fl); etiqueta(fl, 'BARRANCA', 545, 990, { size: 26, w: 700, col: '#ffc142' });
  const r1 = rotulo(svg, 230, 830, 'CIUDAD', { size: 24, anchor: 'middle', col: '#cfd3d8' }), r2 = rotulo(svg, 930, 1010, 'ISLAS: SE INUNDAN PRIMERO', { size: 22, anchor: 'middle', col: '#ff5148' });
  RENDER.push(t => {
    if (!on('sBar')) return;
    aparece('baR', t, a); fl.setAttribute('opacity', P(t, ba - .2, ba + .2)); mostrar(r1, P(t, ba, ba + .3));
    C.agua(t, lerp(1110, 1072, eo(P(t, is - .5, is + .8)))); mostrar(r2, P(t, is - .1, is + .3));
  });
}
// ---------- 6 · El golpe más grande es en el río ----------
{
  const a = S('c3'), ri = AT('c3', 'Es en');
  scene('sGol', [a - .1, S('c4') - .1, .1, .1, 1.06], `${fondo('#0a1830')}
    <div id="goA" style="position:absolute;left:64px;top:560px;font:900 104px/1.03 'Inter Var';opacity:0">EL GOLPE<br>MÁS GRANDE</div>
    <div id="goB" style="position:absolute;left:64px;top:800px;font:900 120px/1 'Inter Var';color:#3fa3e6;opacity:0">ES EN EL RÍO</div>`);
  RENDER.push(t => { if (!on('sGol')) return; entra('goA', t, a); golpeT('goB', t, ri, 1.3); });
}
// ---------- 7 · Dato real: cerca del 75 % de las exportaciones de granos, harinas y aceites ----------
{
  const a = S('c4'), se = AT('c4', 'setenta'), ex = AT('c4', 'exporta');
  scene('s75', [a - .1, S('c5') - .1, .15, .15, 1.04], `${fondo('#0d1a28')}${real('75R')}<svg class="full" id="v75" viewBox="0 0 1080 1920"></svg>
    <div id="75N" style="position:absolute;left:0;width:1080px;top:690px;text-align:center;font:900 150px/1 'Inter Var'">0%</div>
    <div id="75T" class="mono" style="position:absolute;left:64px;width:952px;top:420px;font-size:28px;line-height:1.4;color:#cfd3d8;letter-spacing:.06em;opacity:0">DE LOS GRANOS, HARINAS Y ACEITES QUE EXPORTA LA ARGENTINA SALE POR EL GRAN ROSARIO</div>
    <div class="lbl" style="left:64px;top:1500px;font-size:20px;color:rgba(236,235,230,.45)">DATOS DE 2025</div>`);
  const svg = $('v75'), C = 2 * Math.PI * 250;
  el('circle', { cx: 540, cy: 770, r: 250, fill: 'none', stroke: '#1d2833', 'stroke-width': 56 }, svg);
  const fg = el('circle', { cx: 540, cy: 770, r: 250, fill: 'none', stroke: '#ffc142', 'stroke-width': 56, 'stroke-dasharray': `0 ${C}`, transform: 'rotate(-90 540 770)' }, svg);
  RENDER.push(t => {
    if (!on('s75')) return;
    aparece('75R', t, a); entra('75T', t, a + .2);
    const k = eo(P(t, se - .3, se + 1)); fg.setAttribute('stroke-dasharray', `${(C * .75 * k).toFixed(1)} ${C}`); $('75N').textContent = Math.round(75 * k) + '%';
  });
}
// ---------- 8 · Día 20: los barcos cargan más lento ----------
{
  const a = S('c5'), le = AT('c5', 'lento'), me = AT('c5', 'media');
  scene('sTer', [a - .1, S('c6') - .1, .15, .15, 1.04], `<svg class="full" id="vTe" viewBox="0 0 1080 1920"></svg>${fic('teF')}
    <div id="teC" class="card" style="left:64px;top:410px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">RITMO DE CARGA</div><div id="teN" style="font:900 80px 'Inter Var'">100%</div></div>`);
  const svg = $('vTe'), C = corte(svg, { cx: 2000, cs: .1, cielo: '#0c1420' });
  const sil = el('g', {}, svg); [[90, 600], [190, 640], [290, 600]].forEach(([x, y]) => { el('rect', { x: x - 40, y, width: 80, height: 300, fill: '#4a5562' }, sil); el('path', { d: `M${x - 40},${y} L${x},${y - 40} L${x + 40},${y} Z`, fill: '#5d6672' }, sil); });
  const cinta = el('path', { d: 'M330,700 L640,840', stroke: '#8a939e', 'stroke-width': 14 }, svg), gr = el('g', {}, svg), bs = [];
  for (let i = 0; i < 10; i++) bs.push(el('rect', { width: 14, height: 10, fill: '#e0b85a' }, gr));
  const B = el('g', { transform: 'translate(760 1100) scale(.62)' }, svg); granelero(B);
  RENDER.push(t => {
    if (!on('sTer')) return;
    aparece('teF', t, a); entra('teC', t, a + .1); C.agua(t, 1100);
    const vel = lerp(1, .45, P(t, le - .3, me + .3)); $('teN').textContent = Math.round(100 * vel) + '%'; $('teN').style.color = vel < .7 ? '#ff5148' : '#ecebe6';
    bs.forEach((b, i) => { const u = ((i / 10 + t * .35 * vel) % 1); b.setAttribute('x', lerp(330, 640, u) - 7); b.setAttribute('y', lerp(700, 840, u) - 18); });
    B.setAttribute('transform', `translate(760 ${1100 + 3 * Math.sin(t * 1.4)}) scale(.62)`);
  });
}
// ---------- 9 · Día 22: cortan la ruta Rosario-Victoria por precaución ----------
{
  const a = S('c6'), ru = AT('c6', 'ruta'), cor = AT('c6', 'cortan');
  scene('sRut', [a - .1, S('c7') - .1, .15, .15, 1.04], `<svg class="full" id="vRu" viewBox="0 0 1080 1920"></svg>${fic('ruF')}
    <div id="ruS" class="pill" style="position:absolute;left:300px;top:640px;background:#c3332b;color:#fff;font-size:44px;opacity:0">RUTA CORTADA</div>${esquema('ruE')}`);
  const svg = $('vRu'); el('rect', { width: 1080, height: 1920, fill: '#0b1626' }, svg);
  el('path', { d: 'M-100,1000 L1180,1000 L1180,1080 L-100,1080 Z', fill: '#5a4836' }, svg); el('rect', { x: -100, y: 980, width: 1280, height: 24, fill: '#2a2f36' }, svg);
  for (let x = -60; x < 1180; x += 90) el('rect', { x, y: 989, width: 50, height: 5, fill: '#e3e1db' }, svg);
  etiqueta(svg, '← ROSARIO', 80, 940, { size: 26, w: 700, col: '#cfd3d8' }); etiqueta(svg, 'VICTORIA →', 1000, 940, { size: 26, w: 700, col: '#cfd3d8', anchor: 'end' });
  const valla = el('g', { opacity: 0 }, svg); el('rect', { x: 500, y: 900, width: 160, height: 22, fill: '#ff5148' }, valla); for (let i = 0; i < 4; i++) el('rect', { x: 510 + i * 40, y: 900, width: 18, height: 22, fill: '#fff' }, valla); el('rect', { x: 515, y: 920, width: 10, height: 62, fill: '#ccc' }, valla); el('rect', { x: 635, y: 920, width: 10, height: 62, fill: '#ccc' }, valla);
  const auto = icono(svg, 'auto', 0, 0, 1, '#9fc3dc'); auto.setAttribute('opacity', 1);
  const ag = rio(svg, { op: .9 });
  RENDER.push(t => {
    if (!on('sRut')) return;
    aparece('ruF', t, a); ag(t, lerp(1150, 1012, eo(P(t, a, ru + .8))));
    const k = eo(P(t, a, cor + .4)); auto.setAttribute('transform', `translate(${lerp(-80, 420, k)} 966)`);
    valla.setAttribute('opacity', P(t, cor - .2, cor)); sello('ruS', t, cor);
  });
}
// ---------- 10 · Día 24: 6,10 m, el pico ----------
{
  const a = S('c7'), di = AT('c7', 'diez'), pi = AT('c7', 'pico'), to = AT('c7', 'Todo');
  scene('sPic', [a - .1, to - .1, .15, .1, 1.03], `<svg class="full" id="vPi" viewBox="0 0 1080 1920"></svg>${fic('piF')}
    <div id="piN" style="position:absolute;left:560px;top:520px;font:900 130px/1 'Inter Var';color:#ff5148">5,60 m</div>
    <div id="piS" class="pill" style="position:absolute;left:560px;top:700px;background:#c3332b;color:#fff;font-size:48px;opacity:0">EL PICO</div>`);
  const R = escenaRegla($('vPi'), { lo: 4.5, hi: 6.5 });
  RENDER.push(t => { if (!on('sPic')) return; aparece('piF', t, a); const v = lerp(5.6, 6.1, eo(P(t, a, di + .3))); R.set(v, t); $('piN').textContent = fmtM(v); sello('piS', t, pi); });
}
// ---------- 11 · Todo el Litoral mira el mismo número ----------
{
  const a = AT('c7', 'Todo');
  scene('sLit', [a - .1, S('c8') - .1, .1, .15, 1.05], `${fondo('#14101a')}
    <div id="liG" style="position:absolute;left:64px;top:420px;width:952px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
      ${['ROSARIO', 'SANTA FE', 'PARANÁ', 'CORRIENTES', 'RESISTENCIA', 'VICTORIA'].map(c => `<div class="lit" style="height:320px;border-radius:36px;background:#0f1419;border:6px solid #2a313b;padding:30px 18px;opacity:0">
        <div class="mono" style="font-size:18px;color:#8b919a;letter-spacing:.1em">${c}</div><div style="font:900 64px 'Inter Var';color:#ff5148;margin-top:60px">6,10</div><div class="mono" style="font-size:18px;color:#8b919a">METROS</div></div>`).join('')}</div>`);
  const ls = [...$('liG').querySelectorAll('.lit')];
  RENDER.push(t => { if (!on('sLit')) return; ls.forEach((n, i) => { const q = P(t, a + i * .12, a + .25 + i * .12); n.style.opacity = q; n.style.transform = `scale(${lerp(.85, 1, back(q))})`; }); });
}
// ---------- 12 · El número baja: 6,00 · 5,80 · 5,50 ----------
{
  const a = S('c8'), ba = AT('c8', 'baja'), s6 = AT('c8', 'Seis'), s8 = AT('c8', 'ochenta'), s5 = AT('c8', 'cincuenta');
  scene('sBaj', [a - .1, S('c9') - .1, .15, .15, 1.03], `<svg class="full" id="vBj" viewBox="0 0 1080 1920"></svg>${fic('bjF')}
    <div id="bjN" style="position:absolute;left:560px;top:520px;font:900 130px/1 'Inter Var';color:#ff5148">6,10 m</div>
    <div id="bjS" class="pill" style="position:absolute;left:560px;top:700px;background:#2f8f5b;color:#fff;font-size:44px;opacity:0">BAJA ↓</div>`);
  const R = escenaRegla($('vBj'), { lo: 4.5, hi: 6.5 });
  RENDER.push(t => {
    if (!on('sBaj')) return;
    aparece('bjF', t, a); aparece('bjS', t, ba);
    const v = t < s6 ? 6.1 : t < s8 ? lerp(6.1, 6.0, eo(P(t, s6 - .2, s6 + .2))) : t < s5 ? lerp(6.0, 5.8, eo(P(t, s8 - .3, s8 + .1))) : lerp(5.8, 5.5, eo(P(t, s5 - .3, s5 + .1)));
    R.set(v, t); $('bjN').textContent = fmtM(v); $('bjN').style.color = t > s6 - .2 ? '#5ee093' : '#ff5148';
  });
}
// ---------- 13 · Día 50: Elsa vuelve; barro, pero la casa sigue en pie ----------
{
  const a = S('c9'), vu = AT('c9', 'Elsa vuelve'), bar = AT('c9', 'barro'), pi = AT('c9', 'pie');
  scene('sVue', [a - .1, S('c10') - .1, .2, .15, 1.04], `<svg class="full" id="vVu" viewBox="0 0 1080 1920"></svg>${fic('vuF')}
    <div id="vuB" style="position:absolute;left:64px;top:420px;width:300px;height:350px;opacity:0">${busto(ELSA)}</div>
    <div id="vuP" class="pill" style="position:absolute;left:400px;top:520px;background:#2f8f5b;color:#fff;font-size:36px;opacity:0">LA CASA SIGUE EN PIE</div>${esquema('vuE')}`);
  const svg = $('vVu'), C = corte(svg, { cx: 820, cs: 1, cielo: '#22384e' });
  const barro = el('rect', { x: 500, y: 1040, width: 700, height: 50, fill: '#6b5236', opacity: 0 }, svg); el('rect', { x: 600, y: 960, width: 450, height: 14, fill: '#6b5236', opacity: .0 }, svg);
  RENDER.push(t => {
    if (!on('sVue')) return;
    aparece('vuF', t, a); C.agua(t, lerp(1100, 1130, P(t, a, vu))); barro.setAttribute('opacity', .85 * P(t, bar - .2, bar + .2));
    const q = P(t, vu - .2, vu + .2); $('vuB').style.opacity = q; aparece('vuP', t, pi - .3);
  });
}
// ---------- 14 · El poste: la marca del 83 y una nueva, 2027 ----------
{
  const a = S('c10'), oc = AT('c10', 'ochenta'), nu = AT('c10', 'nueva'), es = AT('c10', 'escribe'), ve = AT('c10', 'veintisiete');
  scene('sPos', [a - .1, S('c11') - .1, .2, .2, 1.05], `<svg class="full" id="vPo" viewBox="0 0 1080 1920"></svg>${fic('poF')}`);
  const svg = $('vPo'); el('rect', { width: 1080, height: 1920, fill: '#1c2a38' }, svg);
  const d = el('defs', {}, svg), lg = el('linearGradient', { id: 'poM', x1: 0, x2: 1 }, d); el('stop', { offset: 0, 'stop-color': '#5b3b26' }, lg); el('stop', { offset: .5, 'stop-color': '#7a5236' }, lg); el('stop', { offset: 1, 'stop-color': '#4e321f' }, lg);
  el('rect', { x: 390, y: 300, width: 300, height: 1700, fill: 'url(#poM)' }, svg);
  for (let i = 0; i < 14; i++) el('path', { d: `M${400 + i * 21},300 Q${410 + i * 21 + (i % 3) * 6},1000 ${400 + i * 21},2000`, stroke: '#000', 'stroke-opacity': .12, 'stroke-width': 3, fill: 'none' }, svg);
  el('rect', { x: 390, y: 1180, width: 300, height: 820, fill: '#4a3a28', opacity: .5 }, svg);
  const m83 = el('g', { opacity: 0 }, svg); el('line', { x1: 400, x2: 530, y1: 820, y2: 820, stroke: '#e9e6df', 'stroke-width': 6, opacity: .55 }, m83); etiqueta(m83, '1983', 465, 800, { size: 44, w: 800, anchor: 'middle', col: '#e9e6df', font: 'Inter Var', ls: 0 }).setAttribute('opacity', .55);
  const nueva = el('line', { x1: 550, x2: 550, y1: 850, y2: 850, stroke: '#ffffff', 'stroke-width': 9, 'stroke-linecap': 'round' }, svg);
  const t27 = etiqueta(svg, '', 615, 915, { anchor: 'middle', size: 48, w: 900, col: '#ffffff', font: 'Inter Var', ls: 0 });
  RENDER.push(t => {
    if (!on('sPos')) return;
    aparece('poF', t, a); m83.setAttribute('opacity', P(t, oc - .3, oc + .1));
    nueva.setAttribute('x2', lerp(550, 680, eo(P(t, nu - .1, nu + .6)))); t27.textContent = typed(t, es + .2, ve + .4, '2027');
  });
}
// ---------- 15 · Esta historia es ficción. El 3,8 del pronóstico, no ----------
{
  const a = S('c11'), tr = AT('c11', 'tres');
  scene('sFic', [a - .1, S('c12') - .1, .15, .15, 1.05], `${fondo('#1a0d0b')}
    <div id="fiA" style="position:absolute;left:64px;top:420px;font:900 96px/1.05 'Inter Var';opacity:0">ESTA HISTORIA<br>ES <span style="color:#ffc142">FICCIÓN</span></div>
    <div id="fiB" class="card" style="left:64px;top:700px;width:952px;padding:30px 36px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.14em">PRONÓSTICO REAL · OMM · OCT 2026</div>
      <div style="font:900 104px/1 'Inter Var';color:#ff5148;margin-top:14px;white-space:nowrap">HASTA +3,8 °C</div></div>`);
  RENDER.push(t => { if (!on('sFic')) return; entra('fiA', t, a); golpeT('fiB', t, tr - .1, 1.2); });
}
// ---------- 16 · Seguí los avisos oficiales. ¿Vos te ibas o te quedabas? ----------
{
  const a = S('c12'), y2 = AT('c12', 'Y contame');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cAv" class="card" style="left:64px;top:360px;width:952px;padding:26px 32px;opacity:0"><div class="mono" style="font-size:22px;color:#5ee093;letter-spacing:.14em">SI VIVÍS CERCA DEL RÍO</div>
      <div style="font:800 46px/1.2 'Inter Var';margin-top:10px">Seguí los avisos oficiales</div><div class="mono" style="font-size:22px;color:#8b919a;margin-top:10px">SMN · INA · DEFENSA CIVIL DE TU CIUDAD</div></div>
    <div id="cQ" style="position:absolute;left:64px;top:660px;font:900 84px/1.05 'Inter Var';opacity:0">¿VOS TE IBAS<br>O TE <span style="color:#ff5148">QUEDABAS</span>?</div>
    <div id="cL" style="position:absolute;left:64px;top:900px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 3; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => { if (!on('sCom')) return; entra('cAv', t, a); entra('cQ', t, y2, 20); cbs.forEach((c, i) => { const k = P(t, y2 + .5 + i * .25, y2 + .8 + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; }); });
}
// ---------- 17 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#0a1830,#030508 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción · escenario hipotético</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">¿Y SI<span style="color:var(--red)">…?</span></div>
      <div id="fQ" style="font:700 50px/1.15 'Inter Var';margin-top:34px">Próximo escenario:<br><span style="color:#aab0b8;font-weight:600">vos elegís en los comentarios</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para más</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
