// "¿Y si…? El Niño llega a su pico" · parte 1 (ficción con datos reales). Todo animado, sin fotos.
// Lo real: pronóstico de la OMM (octubre de 2026, hasta +3,8 °C en el Pacífico entre noviembre y enero; récord anterior +2,6 °C en 2015-16), frase de Celeste Saulo,
// el Paraná en Rosario cerca de 5,5 m en enero de 2016, la crecida de 1983 y la caída del Puente Colgante de Santa Fe, el tiempo de viaje de una crecida (estimación)
// y los niveles de alerta (5,00 m) y evacuación (5,30 m) de Rosario. Bruno, Elsa, las lluvias, los días y las alturas de la historia son ficción.

captions([
  ['h1', 'Diciembre', 'a'], ['h1', 'tres', 'r'], ['h1', 'coma', 'r'], ['h1', 'ocho', 'r'], ['h1', 'Nunca', 'r'], ['h1', 'Rosario', 'a'], ['h2', 'pico', 'r'], ['h2', 'Ficción', 'a'], ['h2', 'reales', 'g'],
  ['c1', 'real', 'g'], ['c1', 'Organización', 'a'], ['c1', 'Meteorológica', 'a'], ['c1', 'Mundial', 'a'], ['c1', 'tres', 'r'], ['c1', 'ocho', 'r'], ['c2', 'argentina', 'a'], ['c2', 'Celeste', 'a'], ['c2', 'Saulo', 'a'],
  ['c2', 'nunca', 'r'], ['c2', 'récord', 'a'], ['c2', 'dos', 'a'], ['c2', 'seis', 'a'], ['c3', 'acá', 'r'], ['c3', 'Paraná', 'a'], ['c3', 'Rosario', 'a'], ['c3', 'cinco', 'r'], ['c3', 'medio', 'r'],
  ['c4', 'ficción', 'a'], ['c4', 'Bruno', 'a'], ['c4', 'granos', 'a'], ['c4', 'Elsa', 'a'], ['c4', 'isla', 'a'], ['c5', 'uno', 'a'], ['c5', 'Brasil', 'a'], ['c5', 'llueve', 'r'], ['c5', 'Paraná', 'a'],
  ['c6', 'real', 'g'], ['c6', 'dieciocho', 'a'], ['c6', 'Iguazú', 'a'], ['c6', 'Delta', 'a'], ['c6', 'venir', 'r'], ['c7', 'nueve', 'a'], ['c7', 'cuatro', 'a'], ['c7', 'medio', 'a'], ['c7', 'serio', 'r'], ['c7', 'ochenta', 'a'],
  ['c8', 'real', 'g'], ['c8', 'ochenta', 'a'], ['c8', 'meses', 'r'], ['c8', 'cayó', 'r'], ['c8', 'Puente', 'a'], ['c8', 'Colgante', 'a'], ['c9', 'catorce', 'a'], ['c9', 'alerta', 'a'], ['c9', 'dieciséis', 'r'],
  ['c9', 'evacuación', 'r'], ['c10', 'reales', 'g'], ['c10', 'Rosario', 'a'], ['c11', 'nadie', 'r'], ['c11', 'pico', 'r'], ['c11', 'no', 'r'], ['c11', 'seis', 'r'], ['c11', 'metros', 'r'],
  ['c12', 'Elsa', 'a'], ['c12', 'no', 'r'], ['c12', 'isla', 'a'], ['c12', 'harías', 'a'], ['c12', 'dos', 'g'], ['c12', 'perfil', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 1', aviso: 'FICCIÓN · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2,
  horas: [[S('c5') - .1, '1'], [S('c7') - .1, '9'], [S('c9') - .1, '14'], [AT('c9', 'dieciséis') - .1, '16', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
SETUP.push(() => {
// ---------- 1 · Gancho: el Pacífico, +3,8 °C ----------
{
  const a = 0, tr = AT('h1', 'tres'), nu = AT('h1', 'Nunca');
  scene('sAbre', [-1, nu - .1, .01, .1, 0], `<svg class="full" id="vAb" viewBox="0 0 1080 1920"></svg>
    <div id="abD" class="lbl" style="left:64px;top:330px;color:#cfd3d8;font-size:30px">DICIEMBRE 2026 · PACÍFICO ECUATORIAL</div>
    <div id="abN" style="position:absolute;left:64px;top:380px;font:900 210px/1 'Inter Var';letter-spacing:-.04em;color:#ff5148">+0,0°</div>`);
  const svg = $('vAb'), G = globo(svg, { r: 560, cy: 1000, paises: { '032': '#3d6f9e' } }), bl = filtroBlur(svg, 'abBl', 18);
  const an = el('path', { fill: '#ff3b2f', opacity: .75, filter: bl }, G.top), nu2 = el('path', { fill: '#ffb03b', opacity: .6, filter: bl }, G.top);
  RENDER.push(t => {
    if (!on('sAbre')) return;
    G.update([lerp(118, 100, P(t, 0, nu)), 6, 0]);
    const s = eo(P(t, a + .1, tr + .4)); an.setAttribute('d', G.path(anomaliaGeo(s)) || ''); nu2.setAttribute('d', G.path(anomaliaGeo(s * .45)) || '');
    an.setAttribute('opacity', .55 + .2 * Math.sin(t * 3));
    $('abN').textContent = '+' + (3.8 * s).toFixed(1).replace('.', ',') + '°';
    $('abD').style.opacity = P(t, 0, .4);
  });
}
// ---------- 2 · Nunca había pasado ----------
{
  const a = AT('h1', 'Nunca');
  scene('sNun', [a - .1, AT('h1', 'Qué') - .1, .05, .1, 1.06], `${fondo('#3a0d0b')}
    <div id="nuT" style="position:absolute;left:64px;top:560px;font:900 150px/1 'Inter Var';letter-spacing:-.03em;opacity:0">NUNCA<br>HABÍA<br><span style="color:#ff5148">PASADO</span></div>`);
  RENDER.push(t => { if (!on('sNun')) return; golpeT('nuT', t, a, 1.35); });
}
// ---------- 3 · ¿Qué le pasa a Rosario? ----------
{
  const a = AT('h1', 'Qué'), ro = AT('h1', 'Rosario');
  scene('sRos', [a - .1, S('h2') - .1, .05, .1, 1.08], `<svg class="full" id="vRo" viewBox="0 0 1080 1920"></svg>
    <div id="roT" style="position:absolute;left:64px;top:330px;font:900 96px/1.02 'Inter Var';opacity:0">¿Y <span style="color:#ffc142">ROSARIO</span>?</div>`);
  const M = cartaCuenca($('vRo'), { centro: [-60.2, -32.6], ancho: 3.2, titulo: 'GRAN ROSARIO', km: 20, paso: .5, caja: [40, 480, 1040, 1150] }), p = M.punto(NI.rosario, 'ROSARIO', { col: AMBAR, size: 26 });
  M.punto(NI.victoria, 'VICTORIA', { size: 20 }).ver(1);
  RENDER.push(t => { if (!on('sRos')) return; p.ver(P(t, ro - .3, ro), t); M.onda(1, t, 0); entra('roT', t, a, 20); });
}
// ---------- 4 · ¿Y si El Niño llega a su pico? ----------
{
  const a = S('h2'), fi = AT('h2', 'Ficción');
  scene('sYsi', [a - .1, S('c1') - .1, .1, .2, 1.06], `${fondo('#2a0d0b')}
    <div style="position:absolute;left:64px;top:520px;width:900px">
      <div id="ysA" style="font:900 140px/1 'Inter Var';letter-spacing:-.03em;opacity:0">¿Y SI<span style="color:#ff5148">…?</span></div>
      <div id="ysB" style="font:800 74px/1.06 'Inter Var';margin-top:26px;opacity:0">El Niño llega<br>a su <span style="color:#ff5148">pico</span></div>
      <div id="ysC" class="lbl" style="position:static;margin-top:30px;font-size:28px;color:#ffc142;opacity:0">ficción · con datos reales</div></div>`);
  RENDER.push(t => { if (!on('sYsi')) return; golpeT('ysA', t, a, 1.3); entra('ysB', t, a + .35); entra('ysC', t, fi); });
}
// ---------- 5 · La OMM: hasta +3,8 °C entre noviembre y enero ----------
{
  const a = S('c1'), or = AT('c1', 'Organización'), tr = AT('c1', 'tres'), no = AT('c1', 'noviembre');
  scene('sOMM', [a - .1, S('c2') - .1, .2, .15, 1.04], `${fondo('#0d1a28')}${real('omR')}
    <div id="omC" class="card" style="left:64px;top:430px;width:952px;padding:34px 40px;opacity:0">
      <div class="mono" style="font-size:22px;letter-spacing:.16em;color:#8b919a">ORGANIZACIÓN METEOROLÓGICA MUNDIAL · OCT 2026</div>
      <div style="font:800 44px 'Inter Var';margin-top:12px">Pacífico tropical, anomalía de temperatura</div>
      <div style="display:flex;align-items:baseline;gap:20px;margin-top:20px"><span style="font:700 40px 'Inter Var';color:#cfd3d8">hasta</span><span id="omN" style="font:900 150px/1 'Inter Var';color:#ff5148">+0,0 °C</span></div>
      <div id="omF" class="mono" style="font-size:28px;color:#ffc142;margin-top:10px;opacity:0">NOVIEMBRE 2026 → ENERO 2027</div></div>
    <svg class="full" id="vOm" viewBox="0 0 1080 1920"></svg>`);
  const svg = $('vOm'), bar = el('rect', { x: 104, y: 960, height: 34, rx: 17, fill: '#ff5148' }, svg);
  el('rect', { x: 104, y: 960, width: 872, height: 34, rx: 17, fill: 'none', stroke: '#3a4652', 'stroke-width': 3 }, svg);
  [0, 1, 2, 3, 4].forEach(v => etiqueta(svg, `+${v}`, 104 + v / 4 * 872, 1040, { size: 24, anchor: 'middle', col: '#8b919a' }));
  RENDER.push(t => {
    if (!on('sOMM')) return;
    aparece('omR', t, a); entra('omC', t, or - .2);
    const k = eo(P(t, tr - .4, tr + .5)); $('omN').textContent = '+' + (3.8 * k).toFixed(1).replace('.', ',') + ' °C'; bar.setAttribute('width', 872 * 3.8 / 4 * k);
    $('omF').style.opacity = P(t, no - .2, no + .2);
  });
}
// ---------- 6 · Celeste Saulo: nunca se registró un 3,8 ----------
{
  const a = S('c2'), nu = AT('c2', 'nunca'), re = AT('c2', 'El récord');
  scene('sSau', [a - .1, re - .1, .2, .1, 1.04], `${fondo('#0d1a28')}${real('saR')}
    <div id="saQ" style="position:absolute;left:64px;top:450px;width:952px;opacity:0">
      <div style="font:900 200px/.6 'Inter Var';color:#ffc142">“</div>
      <div style="font:800 76px/1.08 'Inter Var'">Nunca hemos registrado un valor de <span style="color:#ff5148">3,8</span> en el pasado.</div>
      <div style="height:5px;width:120px;background:#ffc142;margin:34px 0 18px"></div>
      <div style="font:700 36px 'Inter Var'">Celeste Saulo</div><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.1em;margin-top:6px">SECRETARIA GENERAL DE LA OMM · OCT 2026</div></div>`);
  RENDER.push(t => { if (!on('sSau')) return; aparece('saR', t, a); entra('saQ', t, nu - .3); });
}
// ---------- 7 · El récord anterior: +2,6 en 2015 ----------
{
  const a = AT('c2', 'El récord'), ds = AT('c2', 'dos mil');
  scene('sRec', [a - .1, S('c3') - .1, .1, .15, 1.04], `${fondo('#0d1a28')}${real('rcR')}<svg class="full" id="vRc" viewBox="0 0 1080 1920"></svg>
    <div id="rcT" style="position:absolute;left:64px;top:400px;font:900 80px/1.05 'Inter Var';opacity:0">EL RÉCORD<br>ANTERIOR</div>`);
  const svg = $('vRc'), base = 1120, esc = 150;
  el('line', { x1: 80, x2: 1000, y1: base, y2: base, stroke: '#3a4652', 'stroke-width': 3 }, svg);
  const b1 = el('rect', { x: 170, width: 300, fill: '#c9ced4' }, svg), b2 = el('rect', { x: 610, width: 300, fill: 'rgba(255,81,72,.25)', stroke: '#ff5148', 'stroke-width': 5, 'stroke-dasharray': '16 10' }, svg);
  const l1 = etiqueta(svg, '+2,6 °C', 320, 0, { size: 52, w: 900, anchor: 'middle', ls: 0 }), l2 = etiqueta(svg, '+3,8 °C', 760, 0, { size: 52, w: 900, anchor: 'middle', col: '#ff5148', ls: 0 });
  etiqueta(svg, '2015-16 · RÉCORD', 320, base + 50, { size: 24, anchor: 'middle', col: '#cfd3d8' }); const p2 = etiqueta(svg, '2026-27 · PRONÓSTICO', 760, base + 50, { size: 24, anchor: 'middle', col: '#ff5148' });
  RENDER.push(t => {
    if (!on('sRec')) return;
    entra('rcT', t, a, 20); aparece('rcR', t, a);
    const k1 = eo(P(t, a, ds + .3)), k2 = eo(P(t, ds + .1, ds + 1)), h1 = 2.6 * esc * k1, h2 = 3.8 * esc * k2;
    b1.setAttribute('y', base - h1); b1.setAttribute('height', h1); l1.setAttribute('y', base - h1 - 20); l1.setAttribute('opacity', k1);
    b2.setAttribute('y', base - h2); b2.setAttribute('height', h2); l2.setAttribute('y', base - h2 - 20); l2.setAttribute('opacity', k2); p2.setAttribute('opacity', k2);
  });
}
// ---------- 8 · Enero de 2016: el Paraná en Rosario rozó los 5,5 m ----------
{
  const a = S('c3'), en = AT('c3', 'enero'), ci = AT('c3', 'cinco');
  scene('s2016', [a - .1, S('c4') - .1, .2, .2, 1.04], `<svg class="full" id="v16" viewBox="0 0 1080 1920"></svg>${real('r6R')}
    <div id="r6T" style="position:absolute;left:600px;top:430px;width:440px;opacity:0"><div class="mono" style="font-size:26px;color:#8b919a;letter-spacing:.14em">PUERTO DE ROSARIO</div>
      <div style="font:900 96px/1 'Inter Var';margin-top:8px">ENERO<br>2016</div><div id="r6N" style="font:900 120px/1 'Inter Var';color:#3fa3e6;margin-top:24px">3,00 m</div>
      <div class="mono" style="font-size:22px;color:#8b919a;margin-top:10px">ALTURA APROXIMADA</div></div>`);
  const svg = $('v16'); el('rect', { width: 1080, height: 1920, fill: '#081018' }, svg); const R = regla(svg, 150, 420, 700, { lo: 3, hi: 6.5 });
  RENDER.push(t => {
    if (!on('s2016')) return;
    aparece('r6R', t, a); entra('r6T', t, en - .2);
    const v = lerp(3.4, 5.5, eo(P(t, en, ci + .6))); R.set(v, t); $('r6N').textContent = fmtM(v);
  });
}
// ---------- 9 · La ficción: Bruno ----------
{
  const a = S('c4'), br = AT('c4', 'Bruno'), te = AT('c4', 'terminal');
  scene('sBru', [a - .1, AT('c4', 'Su abuela') - .1, .2, .1, 1.04], `${fondo('#1f1a0c')}${fic('bfF', 330, 'FICCIÓN · PERSONAJE INVENTADO')}
    <div id="bfB" style="position:absolute;left:190px;top:420px;width:700px;height:760px;opacity:0">${busto(BRUNO)}</div>
    <div id="bfN" class="card" style="left:64px;top:980px;padding:18px 28px;opacity:0"><div style="font:900 64px 'Inter Var'">BRUNO, 29</div><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.12em">TERMINAL DE GRANOS · GRAN ROSARIO</div></div>`);
  RENDER.push(t => { if (!on('sBru')) return; aparece('bfF', t, a); const q = P(t, br - .3, br + .2); $('bfB').style.opacity = q; $('bfB').style.transform = `translateY(${lerp(40, 0, eo(q))}px)`; entra('bfN', t, te - .2); });
}
// ---------- 10 · Elsa vive en una isla, justo enfrente ----------
{
  const a = AT('c4', 'Su abuela'), is = AT('c4', 'isla');
  scene('sEls', [a - .1, S('c5') - .1, .1, .2, 1.04], `<svg class="full" id="vEl" viewBox="0 0 1080 1920"></svg>${fic('elF')}
    <div id="elB" style="position:absolute;left:600px;top:400px;width:400px;height:460px;opacity:0">${busto(ELSA)}</div>
    <div id="elN" class="card" style="left:64px;top:430px;padding:16px 26px;opacity:0"><div style="font:900 60px 'Inter Var'">ELSA</div><div class="mono" style="font-size:22px;color:#8fd0ff;letter-spacing:.12em">SU ABUELA · VIVE EN LA ISLA</div></div>
    <div id="elE" class="lbl" style="left:64px;top:1500px;font-size:20px;color:rgba(236,235,230,.45)">ESQUEMA · NO ESTÁ A ESCALA</div>`);
  const C = corte($('vEl'), { cx: 960, cs: .5 }), svg = $('vEl');
  etiqueta(svg, 'ROSARIO', 200, 1000, { size: 28, w: 700, anchor: 'middle', col: '#cfd3d8' }); const ti = etiqueta(svg, 'ISLA', 960, 1060, { size: 26, w: 700, anchor: 'middle', col: '#8fd0ff' }); etiqueta(svg, 'RÍO PARANÁ', 640, 1190, { size: 24, anchor: 'middle', col: '#7fc0ea' });
  RENDER.push(t => { if (!on('sEls')) return; C.agua(t, 1120); const q = P(t, a - .1, a + .3); $('elB').style.opacity = q; entra('elN', t, a + .1); aparece('elF', t, a); ti.setAttribute('opacity', P(t, is - .2, is + .2)); });
}
// ---------- 11 · Día 1: llueve dos semanas en el sur de Brasil ----------
{
  const a = S('c5'), ll = AT('c5', 'llueve'), ba = AT('c5', 'baja');
  scene('sBra', [a - .1, S('c6') - .1, .2, .15, 1.04], `<svg class="full" id="vBr" viewBox="0 0 1080 1920"></svg>${fic('brF')}
    <div id="brC" class="card" style="left:620px;top:400px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">LLUVIA SEGUIDA</div><div id="brN" style="font:900 60px 'Inter Var'">0 DÍAS</div></div>`);
  const M = cartaCuenca($('vBr'), { centro: [-54, -27.2], ancho: 15, caja: [40, 480, 1040, 1150] }), est = ['Paraná', 'Santa Catarina', 'Rio Grande do Sul', 'São Paulo', 'Mato Grosso do Sul'];
  const [x0, y0] = M.proj([-56, -21.5]), [x1, y1] = M.proj([-48, -29.5]), rain = lluvia($('vBr'), [x0, Math.max(500, y0), x1, y1], 220);
  const nub = el('g', { opacity: 0 }, $('vBr')); for (let i = 0; i < 7; i++) el('ellipse', { cx: x0 + 60 + i * (x1 - x0 - 120) / 6, cy: Math.max(500, y0) + 20 + (i % 2) * 30, rx: 120, ry: 50, fill: '#5d6672', opacity: .55 }, nub);
  const ig = M.punto(NI.iguazu, 'IGUAZÚ', { size: 20 }), ro = M.punto(NI.rosario, 'ROSARIO', { col: AMBAR }), kI = M.kDe(NI.iguazu);
  RENDER.push(t => {
    if (!on('sBra')) return;
    aparece('brF', t, a); entra('brC', t, ll - .2); $('brN').textContent = Math.round(14 * P(t, ll, ba)) + ' DÍAS';
    const q = P(t, a, ll); rain(t, q); nub.setAttribute('opacity', q);
    est.forEach((n, i) => M.resaltar(n, CELESTE, P(t, ll + i * .15, ll + .5 + i * .15)));
    M.onda(io(P(t, ba - .2, S('c6'))) * kI, t, P(t, ba - .3, ba)); ig.ver(1, t); ro.ver(1, t);
  });
}
// ---------- 12 · Dato real: una crecida tarda unos 18 días de Iguazú al Delta ----------
{
  const a = S('c6'), di = AT('c6', 'dieciocho'), ve = AT('c6', 'venir');
  scene('sOnd', [a - .1, S('c7') - .1, .15, .15, 1.04], `<svg class="full" id="vOn" viewBox="0 0 1080 1920"></svg>${real('onR')}${pill('onE', 'ESTIMACIÓN', 400, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:24px')}
    <div id="onC" class="card" style="left:640px;top:330px;padding:16px 26px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">VIAJE DE LA CRECIDA</div><div id="onN" style="font:900 72px 'Inter Var'">DÍA 0</div></div>`);
  const M = cartaCuenca($('vOn'), { centro: [-58, -29.9], ancho: 16, caja: [40, 480, 1040, 1150], km: 100, paso: 1 }), k0 = M.kDe(NI.iguazu);
  const pts = [[NI.iguazu, 'IGUAZÚ', 'start'], [NI.corrientes, 'CORRIENTES', 'end'], [NI.santafe, 'SANTA FE', 'end'], [NI.rosario, 'ROSARIO', 'end'], [NI.delta, 'DELTA', 'start']].map(([ll, n, an]) => M.punto(ll, n, { anchor: an, col: n === 'ROSARIO' ? AMBAR : undefined, size: 20 }));
  RENDER.push(t => {
    if (!on('sOnd')) return;
    aparece('onR', t, a); aparece('onE', t, a + .2); entra('onC', t, a + .1);
    const k = io(P(t, a + .2, ve)); M.onda(lerp(k0, 1, k), t); $('onN').textContent = 'DÍA ' + Math.round(18 * k);
    pts.forEach(p => p.ver(1, t));
  });
}
// ---------- 13 · Día 9: 4,50 m. El chat de Bruno y Elsa ----------
{
  const a = S('c7'), es = AT('c7', 'escribe'), co = AT('c7', 'contesta');
  scene('sCha', [a - .1, S('c8') - .1, .2, .15, 1.03], `<svg class="full" id="vCh" viewBox="0 0 1080 1920"></svg>${fic('chF')}
    <div id="chP" style="position:absolute;left:470px;top:400px;width:540px;height:740px;border-radius:56px;background:#0f1419;border:10px solid #2a313b;box-shadow:0 30px 80px rgba(0,0,0,.6);overflow:hidden;opacity:0">
      <div style="height:110px;background:#18202a;display:flex;align-items:center;gap:18px;padding:30px 30px 0"><div style="width:56px;height:56px;border-radius:50%;background:#4f6a8c"></div><div style="font:700 32px 'Inter Var'">Abu Elsa</div></div>
      <div id="chM1" style="position:absolute;right:26px;top:180px;max-width:400px;background:#2f6d4f;border-radius:26px 26px 6px 26px;padding:20px 24px;font:600 36px/1.2 'Inter Var';opacity:0">Abu, esto viene en serio</div>
      <div id="chM2" style="position:absolute;left:26px;top:360px;max-width:400px;background:#262e38;border-radius:26px 26px 26px 6px;padding:20px 24px;font:600 36px/1.2 'Inter Var';opacity:0">Ya lo vi en el 83</div></div>`);
  const svg = $('vCh'); el('rect', { width: 1080, height: 1920, fill: '#081018' }, svg); const R = regla(svg, 120, 540, 620, { lo: 3, hi: 6.5, w: 100 });
  R.alerta.setAttribute('opacity', 0); R.evac.setAttribute('opacity', 0);
  const lab = etiqueta(svg, '4,50 m', 170, 500, { size: 40, w: 900, anchor: 'middle', col: '#3fa3e6', ls: 0 });
  RENDER.push(t => {
    if (!on('sCha')) return;
    aparece('chF', t, a); const v = lerp(4.1, 4.5, eo(P(t, a, a + 1.6))); R.set(v, t); lab.textContent = fmtM(v);
    entra('chP', t, es - .5); entra('chM1', t, es + .2, 20); entra('chM2', t, co + .3, 20);
  });
}
// ---------- 14 · Dato real: 1983, el Puente Colgante de Santa Fe ----------
{
  const a = S('c8'), me = AT('c8', 'meses'), ca = AT('c8', 'cayó');
  scene('s83', [a - .1, S('c9') - .1, .2, .15, 1.04], `<svg class="full" id="v83" viewBox="0 0 1080 1920"></svg>${real('83R')}
    <div id="83T" style="position:absolute;left:64px;top:410px;font:900 120px/1 'Inter Var';opacity:0">1983</div>
    <div id="83S" class="mono" style="position:absolute;left:64px;top:540px;font-size:26px;color:#ffc142;letter-spacing:.14em;opacity:0">SANTA FE · PUENTE COLGANTE</div>
    <div class="lbl" style="left:64px;top:1500px;font-size:20px;color:rgba(236,235,230,.45)">ILUSTRACIÓN</div>`);
  const svg = $('v83'); el('rect', { width: 1080, height: 1920, fill: '#0a1018' }, svg);
  const pu = puenteColgante(el('g', { transform: 'translate(540 960) scale(1.05)' }, svg)), ag = rio(svg, { op: .85 });
  RENDER.push(t => {
    if (!on('s83')) return;
    aparece('83R', t, a); golpeT('83T', t, a + .1); $('83S').style.opacity = P(t, a + .4, a + .8);
    ag(t, lerp(1120, 1030, eo(P(t, a, me + .5)))); pu.caer(P(t, ca - .1, ca + 1.1));
  });
}
// ---------- 15 · Día 14: alerta. Día 16: evacuación ----------
{
  const a = S('c9'), ci = AT('c9', 'Cinco metros'), al = AT('c9', 'alerta'), di = AT('c9', 'dieciséis'), ev = AT('c9', 'evacuación');
  scene('sAle', [a - .1, S('c10') - .1, .2, .1, 1.03], `<svg class="full" id="vAl" viewBox="0 0 1080 1920"></svg>${fic('alF')}
    <div id="alN" style="position:absolute;left:560px;top:520px;font:900 130px/1 'Inter Var';color:#3fa3e6">4,60 m</div>
    <div id="alS1" class="pill" style="position:absolute;left:560px;top:700px;background:#b8860b;color:#fff;font-size:40px;opacity:0">ALERTA</div>
    <div id="alS2" class="pill" style="position:absolute;left:560px;top:800px;background:#c3332b;color:#fff;font-size:40px;opacity:0">EVACUACIÓN</div>`);
  const svg = $('vAl'); el('rect', { width: 1080, height: 1920, fill: '#081018' }, svg); const R = regla(svg, 130, 400, 760, { lo: 3.5, hi: 6.5 });
  R.alerta.querySelector('text').setAttribute('opacity', 0); R.evac.querySelector('text').setAttribute('opacity', 0);
  RENDER.push(t => {
    if (!on('sAle')) return;
    aparece('alF', t, a);
    const v = t < di ? lerp(4.6, 5.0, eo(P(t, a, ci + .4))) : lerp(5.0, 5.3, eo(P(t, di - .1, ev + .3))); R.set(v, t); $('alN').textContent = fmtM(v);
    $('alN').style.color = v >= 5.29 ? '#ff5148' : v >= 4.99 ? '#ffc142' : '#3fa3e6';
    sello('alS1', t, al); sello('alS2', t, ev);
  });
}
// ---------- 16 · Dato real: los niveles de Rosario ----------
{
  const a = S('c10');
  scene('sNiv', [a - .1, S('c11') - .1, .1, .15, 1.04], `${fondo('#0d1a28')}${real('nvR')}
    <div id="nvC" class="card" style="left:64px;top:440px;width:952px;padding:34px 40px;opacity:0">
      <div class="mono" style="font-size:24px;letter-spacing:.16em;color:#8b919a">RÍO PARANÁ · PUERTO DE ROSARIO</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:30px;border-bottom:1px solid #2a313b;padding-bottom:22px"><span style="font:800 54px 'Inter Var';color:#ffc142">ALERTA</span><span style="font:900 80px 'Inter Var'">5,00 m</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:22px"><span style="font:800 54px 'Inter Var';color:#ff5148">EVACUACIÓN</span><span style="font:900 80px 'Inter Var'">5,30 m</span></div>
      <div class="mono" style="font-size:20px;color:#8b919a;margin-top:26px">FUENTE: INSTITUTO NACIONAL DEL AGUA (INA)</div></div>`);
  RENDER.push(t => { if (!on('sNiv')) return; aparece('nvR', t, a); entra('nvC', t, a); });
}
// ---------- 17 · El pronóstico: el pico todavía no llegó ----------
{
  const a = S('c11'), pr = AT('c11', 'pronóstico'), pi = AT('c11', 'pico'), se = AT('c11', 'seis');
  scene('sPro', [a - .1, S('c12') - .1, .15, .15, 1.03], `<svg class="full" id="vPr" viewBox="0 0 1080 1920"></svg>${fic('prF', 330, 'FICCIÓN · PRONÓSTICO INVENTADO')}
    <div id="prT" style="position:absolute;left:64px;top:410px;font:900 76px/1.05 'Inter Var';opacity:0">EL PICO<br><span style="color:#ff5148">TODAVÍA NO LLEGÓ</span></div>`);
  const svg = $('vPr'); el('rect', { width: 1080, height: 1920, fill: '#081018' }, svg);
  const X = d => 140 + d / 30 * 860, Y = h => 1120 - (h - 3.5) / 3 * 470;
  for (let h = 4; h <= 6.5; h += .5) { el('line', { x1: 140, x2: 1000, y1: Y(h), y2: Y(h), stroke: '#1d2833', 'stroke-width': 2 }, svg); etiqueta(svg, h.toFixed(1).replace('.', ','), 120, Y(h) + 8, { size: 22, anchor: 'end', col: '#5d6e7e', ls: 0 }); }
  [[5, AMBAR, 'ALERTA'], [5.3, ROJO, 'EVACUACIÓN']].forEach(([h, c, n]) => { el('line', { x1: 140, x2: 1000, y1: Y(h), y2: Y(h), stroke: c, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, svg); etiqueta(svg, n, 990, Y(h) - 10, { size: 20, anchor: 'end', col: c }); });
  for (let d = 0; d <= 30; d += 10) etiqueta(svg, 'DÍA ' + d, X(d), 1160, { size: 20, anchor: 'middle', col: '#5d6e7e' });
  const obs = d3.range(1, 17).map(d => [d, 3.7 + 1.6 * Math.pow((d - 1) / 15, 1.25)]), prev = d3.range(16, 31).map(d => [d, 5.3 + .9 * Math.sin(Math.min(1, (d - 16) / 8) * Math.PI / 2) - .5 * Math.max(0, d - 24) / 6]);
  const ln = d3.line().x(p => X(p[0])).y(p => Y(p[1])).curve(d3.curveMonotoneX);
  const banda = el('path', { d: d3.area().x(p => X(p[0])).y0(p => Y(p[1] - .25 * (p[0] - 16) / 14)).y1(p => Y(p[1] + .3 * (p[0] - 16) / 14)).curve(d3.curveMonotoneX)(prev), fill: '#ff5148', opacity: 0 }, svg);
  const lo = el('path', { d: ln(obs), fill: 'none', stroke: '#3fa3e6', 'stroke-width': 7, pathLength: 1, 'stroke-dasharray': '0 1' }, svg);
  const lp = el('path', { d: ln(prev), fill: 'none', stroke: '#ff5148', 'stroke-width': 6, 'stroke-dasharray': '14 10', opacity: 0 }, svg);
  const l6 = el('line', { x1: 140, x2: 1000, y1: Y(6), y2: Y(6), stroke: '#ff5148', 'stroke-width': 4, opacity: 0 }, svg), t6 = etiqueta(svg, 'MÁS DE 6 M', 150, Y(6) - 14, { size: 26, w: 800, col: '#ff5148' });
  RENDER.push(t => {
    if (!on('sPro')) return;
    aparece('prF', t, a); lo.style.strokeDasharray = `${eo(P(t, a, pr)).toFixed(3)} 1`;
    const q = P(t, pr, pr + .8); lp.setAttribute('opacity', q); lp.style.clipPath = `inset(0 ${(100 * (1 - q)).toFixed(1)}% 0 0)`; banda.setAttribute('opacity', .18 * q);
    entra('prT', t, pi - .2); l6.setAttribute('opacity', P(t, se - .2, se + .2)); t6.setAttribute('opacity', P(t, se - .2, se + .2));
  });
}
// ---------- 18 · Elsa no se quiere ir de la isla ----------
{
  const a = S('c12'), vo = AT('c12', 'Vos');
  scene('sQue', [a - .1, vo - .1, .2, .1, 1.05], `<svg class="full" id="vQu" viewBox="0 0 1080 1920"></svg>${fic('quF')}
    <div id="quT" style="position:absolute;left:64px;top:410px;font:900 84px/1.05 'Inter Var';opacity:0">ELSA <span style="color:#ff5148">NO SE<br>QUIERE IR</span></div>`);
  const svg = $('vQu'), C = corte(svg, { cx: 820, cs: 1, cielo: '#05080e' }), rain = lluvia(svg, [0, 300, 1080, 1500], 200, 3);
  RENDER.push(t => { if (!on('sQue')) return; aparece('quF', t, a); C.agua(t, lerp(1110, 1085, P(t, a, vo))); rain(t, .8); golpeT('quT', t, a + .2, 1.2); });
}
// ---------- 19 · ¿Vos qué harías? Parte 2 en mi perfil ----------
{
  const a = AT('c12', 'Vos'), pa = AT('c12', 'La parte');
  scene('sCom', [a - .1, S('outro') + .1, .1, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:360px;font:900 110px/1.02 'Inter Var';opacity:0">¿VOS QUÉ<br><span style="color:#ffc142">HARÍAS?</span></div>
    <div id="cA" class="card" style="left:64px;top:700px;width:450px;padding:40px 30px;text-align:center;opacity:0"><div style="font:900 64px 'Inter Var'">ME VOY</div></div>
    <div id="cB" class="card" style="left:566px;top:700px;width:450px;padding:40px 30px;text-align:center;opacity:0"><div style="font:900 64px 'Inter Var';color:#ff5148">ME QUEDO</div></div>
    <div id="cP" class="pill" style="position:absolute;left:64px;top:960px;background:#2f8f5b;color:#fff;font-size:40px;opacity:0">PARTE 2 EN MI PERFIL →</div>`);
  RENDER.push(t => { if (!on('sCom')) return; golpeT('cQ', t, a, 1.2); entra('cA', t, a + .4); entra('cB', t, a + .6); aparece('cP', t, pa); });
}
// ---------- 20 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#0a1830,#030508 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción · escenario hipotético</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">¿Y SI<span style="color:var(--red)">…?</span></div>
      <div id="fQ" style="font:700 50px/1.15 'Inter Var';margin-top:34px">Parte 2:<br><span style="color:#aab0b8;font-weight:600">¿cómo termina la crecida?</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para verla</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
