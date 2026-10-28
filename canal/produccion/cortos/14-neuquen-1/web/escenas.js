// "¿Y si…? La antena china de Neuquén" · parte 1 (ficción política con datos reales). Todo animado, sin fotos.
// Lo real: Chequeado; Ámbito (12/8/2026, pedido de equipos e informe de la Fuerza Aérea); Infobae (14/10/2025, Bessent); Buenos Aires Herald (13/8/2026).
// Sofía, el satélite, el archivo, el pedido de Washington y la respuesta de Pekín son ficción. Los tiempos salen de timeline.js.

captions([
  ['h1', 'Patagonia', 'a'], ['h1', 'treinta', 'a'], ['h1', 'cinco', 'a'], ['h1', 'metros', 'a'], ['h1', 'China', 'r'], ['h1', 'cincuenta', 'r'], ['h1', 'años', 'r'],
  ['h2', 'Washington', 'a'], ['h2', 'cerrarla', 'r'], ['h2', 'ficción', 'r'], ['h2', 'reales', 'g'], ['c1', 'real', 'g'], ['c1', 'Bajada', 'a'], ['c1', 'Agrio', 'a'], ['c1', 'Neuquén', 'a'],
  ['c1', 'doscientas', 'a'], ['c2', 'Ejército', 'r'], ['c2', 'Popular', 'r'], ['c2', 'Liberación', 'r'], ['c2', 'ciencia', 'g'], ['c2', 'Luna', 'a'], ['c2', 'Marte', 'a'],
  ['c3', 'nadie', 'g'], ['c3', 'leyes', 'r'], ['c3', 'laborales', 'r'], ['c3', 'diez', 'a'], ['c3', 'ciento', 'a'], ['c4', 'agosto', 'a'], ['c4', 'equipos', 'a'], ['c4', 'Fuerza', 'a'],
  ['c4', 'Aérea', 'a'], ['c4', 'sensibles', 'r'], ['c5', 'ficción', 'r'], ['c6', 'Sofía', 'a'], ['c6', 'radioastrónoma', 'a'], ['c7', 'raro', 'r'], ['c7', 'Luna', 'a'], ['c7', 'satélite', 'r'],
  ['c7', 'Atlántico', 'a'], ['c8', 'copia', 'a'], ['c8', 'Washington', 'r'], ['c9', 'veinte', 'a'], ['c9', 'Tesoro', 'a'], ['c9', 'bases', 'r'], ['c9', 'observación', 'r'],
  ['c10', 'cerrar', 'r'], ['c10', 'Neuquén', 'r'], ['c11', 'presiona', 'r'], ['c11', 'dieciocho', 'a'], ['c11', 'carne', 'a'], ['c12', 'Pekín', 'r'], ['c12', 'todo', 'r'],
  ['c13', 'Cierra', 'r'], ['c13', 'mantiene', 'g'], ['c13', 'decisión', 'a'], ['c14', 'harías', 'a'], ['c14', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 1', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2,
  horas: [[S('c6') - .1, '1'], [AT('c8', 'Tres') - .1, '3'], [S('c12') - .1, '5', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const grande = (id, html, top = 560, size = 120) => `<div id="${id}" style="position:absolute;left:64px;right:64px;top:${top}px;font:900 ${size}px/1.02 'Inter Var';letter-spacing:-.02em;opacity:0">${html}</div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };

SETUP.push(() => {
// ---------- 1 · Gancho: una antena de 35 metros en el desierto ----------
{
  const tr = AT('h1', 'treinta'), b = AT('h1', 'Es de China');
  scene('sAbre', [-1, b - .1, .01, .15, 1.06], `<svg class="full" id="vAb" viewBox="0 0 1080 1920"></svg>
    <div id="abT" style="position:absolute;left:64px;top:330px;font:900 116px/1 'Inter Var';letter-spacing:-.025em">LA ANTENA<br><span style="color:#ff5148">CHINA</span> DE<br>NEUQUÉN</div>`);
  const svg = $('vAb'), cielo = desierto(svg, { hor: 1140, seed: 3 });
  const A = antena(el('g', { transform: 'translate(770 860) scale(1.05)' }, svg));
  const cota = el('g', { opacity: 0 }, svg);
  el('path', { d: 'M570,1460 L970,1460 M570,1440 L570,1480 M970,1440 L970,1480', stroke: '#ffc142', 'stroke-width': 4 }, cota);
  etiqueta(cota, '35 METROS', 770, 1530, { anchor: 'middle', col: '#ffc142', size: 40, w: 600 });
  RENDER.push(t => {
    if (!on('sAbre')) return;
    cielo(t); A.apuntar(-25 + 10 * Math.sin(t * .4)); A.haz.setAttribute('opacity', (.07 + .04 * Math.sin(t * 2)).toFixed(3));
    $('abT').style.transform = `scale(${lerp(1.04, 1, P(t, 0, 1))})`; $('abT').style.transformOrigin = '0 0';
    cota.setAttribute('opacity', P(t, tr - .1, tr + .2));
  });
}
// ---------- 2 · Es de China, contrato por 50 años ----------
{
  const a = AT('h1', 'Es de China'), ci = AT('h1', 'cincuenta');
  scene('sChi', [a - .1, S('h2') - .1, .1, .15, 1.05], `${fondo('#3a0806')}<svg class="full" id="vCh" viewBox="0 0 1080 1920"></svg>
    <div id="chN" style="position:absolute;left:0;right:0;top:780px;text-align:center;font:900 240px/1 'Inter Var';color:#ffde00;opacity:0"><span id="chC">0</span></div>
    <div id="chS" class="lbl" style="left:0;right:0;top:1030px;text-align:center;font-size:34px;color:#e9e6df;opacity:0">AÑOS DE CONTRATO</div>`);
  const fl = el('g', {}, $('vCh')); banderaCN(fl, 520);
  RENDER.push(t => {
    if (!on('sChi')) return;
    const q = eo(P(t, a - .1, a + .3)); fl.setAttribute('transform', `translate(280 ${lerp(420, 360, q)}) scale(${lerp(.8, 1, q)}) skewY(${(2 * Math.sin(t * 3)).toFixed(2)})`); fl.setAttribute('opacity', q);
    const k = P(t, ci - .4, ci + .5); $('chN').style.opacity = P(t, ci - .5, ci - .2); $('chC').textContent = Math.round(50 * eo(k)); $('chS').style.opacity = P(t, ci, ci + .3);
  });
}
// ---------- 3 · ¿Y si Washington pidiera cerrarla? ----------
{
  const a = S('h2'), fi = AT('h2', 'ficción');
  scene('sYsi', [a - .1, S('c1') - .1, .15, .2, 1.06], `${fondo('#1a0706')}
    <div style="position:absolute;left:64px;top:560px;width:900px"><div id="ysL" style="height:6px;background:#e0433a;width:0"></div>
    <div id="ysT" style="font:900 150px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">¿Y SI<span style="color:#ff5148">…?</span></div>
    <div id="ysQ" style="font:800 64px/1.1 'Inter Var';margin-top:24px;color:#cfd3d8;opacity:0">Washington pide<br><span style="color:#ff5148">cerrarla</span></div>
    <div id="ysS" class="lbl" style="position:static;margin-top:30px;font-size:28px;color:#ffc142;opacity:0">ficción política · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sYsi')) return;
    $('ysL').style.width = 900 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('ysT').style.opacity = q; $('ysT').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('ysT').style.transformOrigin = '0 50%';
    entra('ysQ', t, AT('h2', 'Washington')); $('ysS').style.opacity = P(t, fi - .1, fi + .3);
  });
}
// ---------- 4 · Dónde está: el globo baja hasta Neuquén ----------
{
  const a = S('c1'), b = AT('c1', 'doscientas'), ba = AT('c1', 'Bajada');
  scene('sGlo', [a - .1, b - .1, .2, .15, 0], `<svg class="full" id="vGl" viewBox="0 0 1080 1920"></svg>${real('glR')}`);
  const G = globo($('vGl'), { r: 520, cy: 1000, paises: { '032': '#24384d' } });
  const nq = PATA.prov.features.filter(f => f.properties.name === 'Neuquén'), np = nq.map(() => el('path', { fill: '#ff5148', 'fill-opacity': .5, stroke: '#ff8a80', 'stroke-width': 2 }, G.top));
  const pt = el('g', {}, G.top); el('circle', { r: 10, fill: '#ffde00' }, pt); const ring = el('circle', { r: 10, fill: 'none', stroke: '#ffde00', 'stroke-width': 3 }, pt);
  const lb = etiqueta(pt, 'BAJADA DEL AGRIO', 22, 10, { size: 26, w: 600, col: '#ffde00' });
  RENDER.push(t => {
    if (!on('sGlo')) return;
    const k = io(P(t, a - .1, b));
    G.update([-lerp(-30, -69, k), -lerp(10, -38, k), 0], lerp(520, 2600, io(P(t, a + .6, b))));
    nq.forEach((f, i) => { np[i].setAttribute('d', G.path(f) || ''); np[i].setAttribute('opacity', P(t, ba - .8, ba)); });
    const xy = G.xy(NQ.estacion); pt.setAttribute('opacity', xy ? P(t, ba - .2, ba + .2) : 0); if (xy) pt.setAttribute('transform', `translate(${xy[0]} ${xy[1]})`);
    ring.setAttribute('r', 10 + 30 * ((t * 1.2) % 1)); ring.setAttribute('opacity', 1 - ((t * 1.2) % 1)); lb.setAttribute('opacity', P(t, ba, ba + .3));
    aparece('glR', t, a + .2);
  });
}
// ---------- 5 · La carta: 200 hectáreas, funciona desde 2018 ----------
{
  const a = AT('c1', 'doscientas'), fu = AT('c1', 'Funciona');
  scene('sCar', [a - .1, S('c2') - .1, .15, .2, 0], `<svg class="full" id="vCa" viewBox="0 0 1080 1920"></svg>
    <div id="caH" class="card" style="left:64px;top:1420px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">PREDIO</div><div style="font:900 64px 'Inter Var'"><span id="caN">0</span> ha</div></div>
    <div id="caY" class="card" style="left:560px;top:1420px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">FUNCIONA DESDE</div><div style="font:900 64px 'Inter Var';color:#ffc142">2018</div></div>`);
  const M = cartaNeuquen($('vCa'), { centro: [-69.6, -38.3], ancho: 6, titulo: 'ESTACIÓN DE ESPACIO LEJANO · NEUQUÉN' });
  M.resaltar('Neuquén');
  const es = M.punto(NQ.estacion, 'ESTACIÓN CHINA', { col: '#ff5148', size: 22 }), nc = M.punto(NQ.neuquen, 'NEUQUÉN', { col: '#ece8e1', anchor: 'end' }), za = M.punto(NQ.zapala, 'ZAPALA', { col: '#9fb0c0', anchor: 'end', dy: 34 });
  const chi = M.texto([-71.9, -38.9], 'CHILE'), mz = M.texto([-68.6, -36.3], 'MENDOZA'), rn = M.texto([-67.6, -39.8], 'RÍO NEGRO');
  RENDER.push(t => {
    if (!on('sCar')) return;
    M.g.setAttribute('transform', `translate(540 740) scale(${lerp(1, 1.18, P(t, a, S('c2')))}) translate(-540 -740)`);
    es.ver(P(t, a, a + .3), t); nc.ver(P(t, a + .3, a + .6), t); za.ver(P(t, a + .5, a + .8), t);
    $('caH').style.opacity = P(t, a - .1, a + .2); $('caN').textContent = Math.round(200 * eo(P(t, a, a + .8)));
    aparece('caY', t, fu);
  });
}
// ---------- 6 · La opera una agencia vinculada al Ejército Popular de Liberación ----------
{
  const a = S('c2'), ej = AT('c2', 'Ejército');
  scene('sOpe', [a - .1, AT('c2', 'China dice') - .1, .2, .2, 1.05], `<svg class="full" id="vOp" viewBox="0 0 1080 1920"></svg>${real('opR')}
    <div id="opC" class="card" style="left:64px;top:420px;width:950px;padding:24px 30px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">LA OPERA</div>
      <div style="font:900 70px 'Inter Var';margin-top:4px">CLTC</div><div style="font:500 26px 'Inter Var';color:#cfd3d8">China Satellite Launch and Tracking Control General</div></div>
    <div id="opE" class="pill" style="position:absolute;left:64px;top:700px;background:#c3332b;color:#fff;font-size:32px;opacity:0">VINCULADA AL EJÉRCITO POPULAR DE LIBERACIÓN</div>`);
  const svg = $('vOp'), cielo = desierto(svg, { hor: 1500, seed: 11 });
  const A = antena(el('g', { transform: 'translate(780 1260) scale(.9)' }, svg)), fl = el('g', { transform: 'translate(150 1010)' }, svg); banderaCN(fl, 220);
  RENDER.push(t => {
    if (!on('sOpe')) return;
    cielo(t); A.apuntar(-35 + 6 * Math.sin(t * .5));
    aparece('opR', t, a); entra('opC', t, a + .2); aparece('opE', t, ej);
  });
}
// ---------- 7 · China dice que es solo ciencia: la Luna y Marte ----------
{
  const a = AT('c2', 'China dice'), lu = AT('c2', 'Luna'), ma = AT('c2', 'Marte');
  scene('sLun', [a - .1, S('c3') - .1, .2, .2, 0], `<div style="position:absolute;inset:0;background:#02040a"></div><svg class="full" id="vLu" viewBox="0 0 1080 1920"></svg>
    ${pill('luS', 'SEGÚN CHINA: SOLO CIENCIA', 330, 'rgba(9,12,17,.85)', 'border:1px solid #5ee093;color:#5ee093;font-size:28px')}`);
  const svg = $('vLu'), r = rnd(4);
  for (let i = 0; i < 220; i++) el('circle', { cx: r() * 1080, cy: r() * 1920, r: .5 + r() * 1.5, fill: '#fff', opacity: .3 + r() * .6 }, svg);
  const tierra = el('g', { transform: 'translate(200 1700)' }, svg); el('circle', { r: 360, fill: '#13283b' }, tierra); el('circle', { r: 360, fill: 'none', stroke: '#3fa0e0', 'stroke-width': 4, opacity: .5 }, tierra);
  const luna = el('g', { transform: 'translate(820 760)', opacity: 0 }, svg); el('circle', { r: 90, fill: '#c9ced4' }, luna); for (const [x, y, rr] of [[-30, -20, 18], [25, 30, 12], [35, -35, 9], [-10, 40, 8]]) el('circle', { cx: x, cy: y, r: rr, fill: '#9aa3ad' }, luna);
  etiqueta(luna, 'LUNA', 0, 140, { anchor: 'middle', size: 30, w: 600 });
  const marte = el('g', { transform: 'translate(560 480)', opacity: 0 }, svg); el('circle', { r: 50, fill: '#c4562f' }, marte); el('circle', { cx: -14, cy: -10, r: 10, fill: '#9c3f20' }, marte);
  etiqueta(marte, 'MARTE', 0, 92, { anchor: 'middle', size: 28, w: 600 });
  const ant = [500, 1370], h1 = el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 4, 'stroke-dasharray': '14 12' }, svg), h2 = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 4, 'stroke-dasharray': '14 12' }, svg);
  const A = antena(el('g', { transform: `translate(${ant[0]} ${ant[1]}) scale(.35)` }, svg));
  RENDER.push(t => {
    if (!on('sLun')) return;
    A.apuntar(lerp(30, 20, P(t, lu, ma)));
    luna.setAttribute('opacity', P(t, lu - .3, lu)); marte.setAttribute('opacity', P(t, ma - .3, ma));
    const k1 = eo(P(t, lu - .2, lu + .5)), k2 = eo(P(t, ma - .2, ma + .5));
    h1.setAttribute('d', `M${ant[0]},${ant[1] - 60} L${lerp(ant[0], 820, k1)},${lerp(ant[1] - 60, 760, k1)}`); h1.setAttribute('stroke-dashoffset', -t * 60);
    h2.setAttribute('d', `M${ant[0]},${ant[1] - 60} L${lerp(ant[0], 560, k2)},${lerp(ant[1] - 60, 480, k2)}`); h2.setAttribute('stroke-dashoffset', -t * 60);
    aparece('luS', t, a + .3);
  });
}
// ---------- 8 · Un dato que casi nadie conoce ----------
{
  const a = S('c3');
  scene('sDat', [a - .1, AT('c3', 'los trabajadores') - .1, .1, .15, 1.08], `${fondo('#0a2015')}${grande('daT', 'UN DATO QUE<br><span style="color:#5ee093">CASI NADIE</span><br>CONOCE', 600, 128)}`);
  RENDER.push(t => { if (!on('sDat')) return; const q = P(t, a - .1, a + .2); $('daT').style.opacity = q; $('daT').style.transform = `scale(${lerp(1.3, 1, eo(q))})`; $('daT').style.transformOrigin = '0 50%'; });
}
// ---------- 9 · Los trabajadores chinos se rigen por las leyes laborales de China ----------
{
  const a = AT('c3', 'los trabajadores'), le = AT('c3', 'leyes');
  scene('sLey', [a - .1, AT('c3', 'y la Argentina') - .1, .15, .15, 1.04], `${fondo('#1a0a08')}<svg class="full" id="vLe" viewBox="0 0 1080 1920"></svg>${real('leR')}
    <div id="leC" class="card" style="left:64px;top:440px;width:950px;padding:24px 30px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">TRABAJADORES CHINOS DE LA BASE</div>
      <div style="font:800 58px/1.1 'Inter Var';margin-top:8px">Se rigen por la <span style="color:#ff5148">legislación laboral china</span></div></div>`);
  const svg = $('vLe'), gente = [];
  for (let i = 0; i < 7; i++) gente.push(icono(svg, 'persona', 170 + i * 125, 1020, 1.6, '#cfd3d8'));
  const fl = el('g', { transform: 'translate(800 1440)', opacity: 0 }, svg); banderaCN(fl, 200);
  RENDER.push(t => {
    if (!on('sLey')) return;
    aparece('leR', t, a); entra('leC', t, a + .1);
    gente.forEach((g, i) => { const q = P(t, a + .1 + i * .08, a + .35 + i * .08); g.setAttribute('opacity', q); g.setAttribute('transform', `translate(${170 + i * 125} ${lerp(1060, 1020, eo(q))}) scale(1.6)`); g.setAttribute('fill', '#cfd3d8'); });
    if (t > le) gente.forEach(g => [...g.children].forEach(c => c.setAttribute('fill', '#ff8a80')));
    else gente.forEach(g => [...g.children].forEach(c => c.setAttribute('fill', '#cfd3d8')));
    fl.setAttribute('opacity', P(t, le, le + .3));
  });
}
// ---------- 10 · La Argentina solo usa el 10 % del tiempo de la antena ----------
{
  const a = AT('c3', 'y la Argentina'), di = AT('c3', 'diez');
  scene('sDie', [a - .1, S('c4') - .1, .15, .2, 1.04], `${fondo('#0d141b')}<svg class="full" id="vDi" viewBox="0 0 1080 1920"></svg>
    <div class="mono" style="position:absolute;left:0;right:0;top:360px;text-align:center;font-size:30px;letter-spacing:.24em;color:#8b919a">TIEMPO DE USO DE LA ANTENA</div>
    <div id="diN" style="position:absolute;left:0;right:0;top:690px;text-align:center;font:900 190px/1 'Inter Var';color:#8fd0ff;opacity:0">10 %</div>
    <div id="diA" class="lbl" style="left:0;right:0;top:900px;text-align:center;font-size:30px;color:#8fd0ff;opacity:0">ARGENTINA (CONAE)</div>
    <div id="diC" class="lbl" style="left:0;right:0;top:1420px;text-align:center;font-size:30px;color:#ff8a80;opacity:0">90 % · CHINA</div>`);
  const svg = $('vDi'), uc = dona(svg, 540, 800, 330, 70, .9, '#c3332b', '#2a3542'), ua = el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 70 }, svg);
  RENDER.push(t => {
    if (!on('sDie')) return;
    uc(eo(P(t, a, a + .9))); $('diC').style.opacity = P(t, a + .5, a + .9);
    const k = eo(P(t, di - .1, di + .5)), a0 = -Math.PI / 2 + 2 * Math.PI * .9, a1 = a0 + 2 * Math.PI * .1 * k;
    ua.setAttribute('d', k > 0 ? `M${540 + 330 * Math.cos(a0)},${800 + 330 * Math.sin(a0)} A330,330 0 0 1 ${540 + 330 * Math.cos(a1)},${800 + 330 * Math.sin(a1)}` : '');
    const q = P(t, di, di + .3); $('diN').style.opacity = q; $('diN').style.transform = `scale(${lerp(1.4, 1, eo(q))})`; $('diA').style.opacity = q;
  });
}
// ---------- 11 · Agosto de 2026: China pidió sumar equipos ----------
{
  const a = S('c4'), eq = AT('c4', 'equipos');
  const items = ['RECEPTORES CRIOGÉNICOS', 'CONVERTIDORES DE BANDA KA', 'ANALIZADORES DE ESPECTRO', 'PROCESAMIENTO DE ALTA VELOCIDAD', 'ALMACENAMIENTO MASIVO'];
  scene('sEqu', [a - .1, AT('c4', 'La Fuerza') - .1, .15, .15, 1.03], `${fondo('#0d141b')}${real('eqR')}
    <div id="eqF" class="card" style="left:64px;top:420px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">PEDIDO DE CHINA</div><div style="font:900 64px 'Inter Var'">AGOSTO 2026</div></div>
    <div id="eqL" style="position:absolute;left:64px;top:640px;width:950px">${items.map(x => `<div class="eqI mono" style="font-size:34px;padding:18px 24px;margin-bottom:14px;border-left:6px solid #ffc142;background:rgba(20,26,34,.9);opacity:0">+ ${x}</div>`).join('')}</div>`);
  const its = [...document.querySelectorAll('#sEqu .eqI')];
  RENDER.push(t => {
    if (!on('sEqu')) return;
    aparece('eqR', t, a); entra('eqF', t, a + .1);
    its.forEach((n, i) => { const q = P(t, eq - .3 + i * .28, eq - .1 + i * .28); n.style.opacity = q; n.style.transform = `translateX(${lerp(-60, 0, eo(q))}px)`; });
  });
}
// ---------- 12 · La advertencia de la Fuerza Aérea ----------
{
  const a = AT('c4', 'La Fuerza'), q0 = AT('c4', 'aunque'), se = AT('c4', 'sensibles');
  const cita = '«Que no exista evidencia de una nueva antena no significa que no exista un incremento de capacidades sensibles».';
  scene('sFAA', [a - .1, S('c5') - .1, .15, .1, 1.03], `${fondo('#14100a')}${real('faR')}
    <div id="faC" class="card" style="left:64px;top:420px;width:950px;padding:30px 34px;opacity:0;border-color:#ffc142">
      <div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.18em">FUERZA AÉREA ARGENTINA · INFORME TÉCNICO · 2026</div>
      <div id="faT" style="font:700 50px/1.22 'Inter Var';margin-top:20px;min-height:430px"></div>
      <div class="mono" style="font-size:20px;color:#8b919a;margin-top:12px">Fuente: Ámbito, 12/8/2026</div></div>`);
  RENDER.push(t => {
    if (!on('sFAA')) return;
    aparece('faR', t, a); entra('faC', t, a + .1);
    const s = typed(t, q0 - .3, se + .2, cita), i = s.indexOf('capacidades sensibles');
    $('faT').innerHTML = i < 0 ? s : s.slice(0, i) + `<span style="color:#ff5148">${s.slice(i)}</span>`;
  });
}
// ---------- 13 · Desde acá, ficción ----------
{
  const a = S('c5');
  scene('sFic', [a - .1, S('c6') - .1, .05, .15, 1.1], `<div style="position:absolute;inset:0;background:#080202"></div>
    <div id="fiT" style="position:absolute;left:64px;right:64px;top:700px;font:900 150px/1 'Inter Var';letter-spacing:-.03em">DESDE ACÁ,<br><span style="color:#ff5148">FICCIÓN</span></div>
    <div id="fiL" style="position:absolute;left:0;top:640px;height:8px;background:#ff5148;width:0"></div>`);
  RENDER.push(t => {
    if (!on('sFic')) return;
    const [x, y] = shake(t, 10 * (1 - P(t, a, a + .5))); $('fiT').style.transform = `translate(${x}px,${y}px)`;
    $('fiL').style.width = 1080 * eo(P(t, a - .1, a + .4)) + 'px';
  });
}
// ---------- 14 · Sofía, 26 años, radioastrónoma de la CONAE ----------
{
  const a = S('c6'), ra = AT('c6', 'radioastrónoma'), di = AT('c6', 'diez');
  scene('sSof', [a - .1, S('c7') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#06101a,#03060a)"></div>
    ${fic('soF', 330, 'PERSONAJE DE FICCIÓN')}
    <div id="soB" style="position:absolute;left:250px;top:520px;width:560px;height:653px">${busto({ ropa: '#2a3a4f', pelo: '#3a2418', barba: 0, piel: '#e0ad8a', halo: '#8fd0ff' })}</div>
    <div id="soN" class="card" style="left:64px;top:1420px;padding:20px 28px;opacity:0"><div style="font:900 64px 'Inter Var'">Sofía, 26</div>
      <div class="mono" style="font-size:24px;color:#8fd0ff;letter-spacing:.12em;margin-top:4px">RADIOASTRÓNOMA · CONAE</div></div>
    <div id="soD" class="pill" style="position:absolute;left:640px;top:1440px;background:#1f5f8a;color:#fff;font-size:34px;opacity:0">SU TURNO: EL 10 %</div>`);
  RENDER.push(t => {
    if (!on('sSof')) return;
    aparece('soF', t, a);
    const q = P(t, a - .1, a + .4); $('soB').style.opacity = q; $('soB').style.transform = `translateY(${lerp(40, 0, eo(q))}px)`;
    entra('soN', t, ra - .3); aparece('soD', t, di);
  });
}
// ---------- 15 · Una noche, en su turno, ve algo raro en los registros ----------
{
  const a = S('c7'), ra = AT('c7', 'raro');
  const lineas = ['02:41:07  AZ 041.2  EL 38.7  OBJ LUNA      OK', '02:42:07  AZ 041.6  EL 38.9  OBJ LUNA      OK', '02:43:07  AZ 041.9  EL 39.2  OBJ LUNA      OK',
    '02:44:07  AZ 097.4  EL 22.1  OBJ ---       ??', '02:45:07  AZ 101.8  EL 20.6  OBJ NO REGISTRADO', '02:46:07  AZ 106.3  EL 19.0  OBJ NO REGISTRADO'];
  scene('sReg', [a - .1, AT('c7', 'La antena') - .1, .2, .15, 1.04], `<div style="position:absolute;inset:0;background:#030806"></div>${fic('reF')}
    <div class="card" style="left:44px;top:420px;width:992px;height:700px;padding:26px;background:#04100b;border-color:#1f5a3a">
      <div class="mono" style="font-size:22px;color:#5ee093;letter-spacing:.16em">REGISTRO DE APUNTAMIENTO · TURNO CONAE</div>
      <div id="reL" class="mono" style="font-size:29px;line-height:1.75;margin-top:22px;color:#7fd8a4;white-space:pre"></div></div>`);
  RENDER.push(t => {
    if (!on('sReg')) return;
    aparece('reF', t, a);
    const n = Math.floor(clamp((t - a) / (ra - a + .3)) * lineas.length);
    $('reL').innerHTML = lineas.slice(0, Math.max(1, n + (t > ra ? 6 : 0))).map((l, i) => i >= 3 ? `<span style="color:#ff5148;${i >= 3 && Math.floor(t * 3) % 2 ? 'opacity:.6' : ''}">${l}</span>` : l).join('\n');
  });
}
// ---------- 16 · No apunta a la Luna: sigue a un satélite sobre el Atlántico Sur ----------
{
  const a = AT('c7', 'La antena'), lu = AT('c7', 'Luna'), sa = AT('c7', 'satélite');
  scene('sSat', [a - .1, S('c8') - .1, .15, .2, 0], `<svg class="full" id="vSa" viewBox="0 0 1080 1920"></svg>${fic('saF')}
    <div id="saL" class="pill" style="position:absolute;left:64px;top:400px;background:#222a34;color:#cfd3d8;font-size:30px;opacity:0">OBJETIVO: LUNA <span style="color:#ff5148">✕</span></div>
    <div id="saS" class="pill" style="position:absolute;left:64px;top:470px;background:#c3332b;color:#fff;font-size:30px;opacity:0">SIGUE A UN SATÉLITE</div>`);
  const G = globo($('vSa'), { r: 600, cy: 1150, paises: { '032': '#24384d' } });
  const haz = el('path', { fill: '#ff5148', opacity: 0 }, G.root), sat = el('g', {}, G.root), si = el('g', { transform: 'scale(1.7)' }, sat);
  el('rect', { x: -12, y: -8, width: 24, height: 16, fill: '#d9dde2' }, si); el('rect', { x: -44, y: -5, width: 28, height: 10, fill: '#3fa0e0' }, si); el('rect', { x: 16, y: -5, width: 28, height: 10, fill: '#3fa0e0' }, si);
  const traza = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '8 8' }, G.top);
  const nqp = el('g', {}, G.top); el('circle', { r: 9, fill: '#ffde00' }, nqp);
  const s0 = [-62, -18], s1 = [-30, -55], it = d3.geoInterpolate(s0, s1);
  RENDER.push(t => {
    if (!on('sSat')) return;
    G.update([50, 40, 0]);
    const u = P(t, a - .2, S('c8') + .3), ll = it(u), g = G.xy(ll), n = G.xy(NQ.estacion);
    traza.setAttribute('d', arcoGeo(G.path, s0, s1, 1)); traza.setAttribute('stroke-dashoffset', -t * 30);
    if (n) nqp.setAttribute('transform', `translate(${n[0]} ${n[1]})`);
    if (g) { const dx = g[0] - 540, dy = g[1] - 1150, f = 1.12; const sx = 540 + dx * f, sy = 1150 + dy * f; sat.setAttribute('transform', `translate(${sx} ${sy}) rotate(${t * 20})`);
      if (n) { const L = Math.hypot(sx - n[0], sy - n[1]) || 1, nx = -(sy - n[1]) / L * 30, ny = (sx - n[0]) / L * 30; haz.setAttribute('d', `M${n[0]},${n[1]} L${sx + nx},${sy + ny} L${sx - nx},${sy - ny} Z`); } }
    haz.setAttribute('opacity', ((.45 + .15 * Math.sin(t * 8)) * P(t, sa - .1, sa + .3)).toFixed(2)); sat.setAttribute('opacity', g ? 1 : 0);
    aparece('saF', t, a); aparece('saL', t, lu); aparece('saS', t, sa);
  });
}
// ---------- 17 · Sofía guarda una copia; tres días después, el archivo está en Washington ----------
{
  const a = S('c8'), tr = AT('c8', 'Tres'), wa = AT('c8', 'Washington');
  scene('sCop', [a - .1, S('c9') - .1, .2, .2, 0], `<svg class="full" id="vCo" viewBox="0 0 1080 1920"></svg>${fic('coF')}
    <div id="coA" class="card mono" style="left:64px;top:400px;padding:16px 24px;font-size:28px;color:#ffc142;opacity:0">registro_0244.dat · copia</div>`);
  const G = globo($('vCo'), { r: 560, cy: 1100, paises: { '032': '#24384d', '840': '#2f4a66' } });
  const arc = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 5 }, G.top), doc = el('g', {}, G.top); archivo(doc);
  const dcp = el('g', {}, G.top); el('circle', { r: 10, fill: '#8fd0ff' }, dcp); etiqueta(dcp, 'WASHINGTON', 18, 8, { size: 26, w: 600, col: '#8fd0ff' });
  RENDER.push(t => {
    if (!on('sCop')) return;
    const k = io(P(t, a, S('c9'))); G.update([-lerp(-68, -72, k), -lerp(-25, 5, k), 0]);
    const u = io(P(t, tr - .3, wa + .2)); arc.setAttribute('d', arcoGeo(G.path, NQ.estacion, LUGAR.dc, u) || '');
    const p = G.xy(d3.geoInterpolate(NQ.estacion, LUGAR.dc)(u)); doc.setAttribute('opacity', p && t > a + .3 ? 1 : 0); if (p) doc.setAttribute('transform', `translate(${p[0]} ${p[1] - 40}) scale(.8)`);
    const w = G.xy(LUGAR.dc); dcp.setAttribute('opacity', w ? P(t, wa - .4, wa) : 0); if (w) dcp.setAttribute('transform', `translate(${w[0]} ${w[1]})`);
    aparece('coF', t, a); entra('coA', t, a + .2);
  });
}
// ---------- 18 · Lo real: el swap de EE. UU. de 2025 ----------
{
  const a = S('c9'), ve = AT('c9', 'veinte');
  scene('sSwU', [a - .1, AT('c9', 'el secretario') - .1, .15, .15, 1.04], `${fondo('#0a1424')}<svg class="full" id="vSu" viewBox="0 0 1080 1920"></svg>${real('suR')}
    <div class="mono" style="position:absolute;left:64px;top:430px;font-size:30px;letter-spacing:.2em;color:#8b919a">OCTUBRE 2025 · TESORO DE EE.UU.</div>
    <div id="suN" style="position:absolute;left:64px;top:500px;font:900 150px/1 'Inter Var';color:#8fd0ff;opacity:0">US$ <span id="suC">0</span> M</div>
    <div id="suS" class="lbl" style="left:64px;top:680px;font-size:32px;color:#e9e6df;opacity:0">SWAP CON EL BANCO CENTRAL ARGENTINO</div>`);
  const fl = el('g', { transform: 'translate(64 840)' }, $('vSu')); banderaUS(fl, 300);
  RENDER.push(t => {
    if (!on('sSwU')) return;
    aparece('suR', t, a); fl.setAttribute('opacity', P(t, a, a + .3));
    $('suN').style.opacity = P(t, ve - .4, ve - .1); $('suC').textContent = fmt(20000 * eo(P(t, ve - .3, ve + .9))); $('suS').style.opacity = P(t, ve + .3, ve + .6);
  });
}
// ---------- 19 · El secretario del Tesoro habló de las bases y los centros de observación chinos ----------
{
  const a = AT('c9', 'el secretario'), ba = AT('c9', 'bases'), ob = AT('c9', 'observación');
  scene('sBes', [a - .1, S('c10') - .1, .15, .2, 0], `<svg class="full" id="vBe" viewBox="0 0 1080 1920"></svg>${real('beR')}
    <div id="beC" class="card" style="left:64px;top:420px;width:950px;padding:22px 28px;opacity:0"><div class="mono" style="font-size:21px;color:#8b919a;letter-spacing:.14em">SCOTT BESSENT · SECRETARIO DEL TESORO · OCT. 2025</div>
      <div style="font:700 44px/1.2 'Inter Var';margin-top:10px">Habló de los <span style="color:#ff5148">puertos, bases militares y centros de observación</span> que China construyó en la Argentina</div>
      <div class="mono" style="font-size:19px;color:#8b919a;margin-top:12px">Fuente: Infobae, 14/10/2025</div></div>`);
  const M = cartaNeuquen($('vBe'), { centro: [-69.4, -37.8], ancho: 9, caja: [40, 900, 1040, 1700], titulo: 'NEUQUÉN' });
  M.resaltar('Neuquén');
  const es = M.punto(NQ.estacion, 'ESTACIÓN DE ESPACIO LEJANO', { col: '#ff5148', size: 22 });
  RENDER.push(t => {
    if (!on('sBes')) return;
    aparece('beR', t, a); entra('beC', t, a + .1); es.ver(P(t, ob - .2, ob + .2), t);
    M.resaltar('Neuquén', '#ff5148', P(t, ba - .2, ba + .3));
  });
}
// ---------- 20 · En esta historia, el pedido es directo: cerrar la estación ----------
{
  const a = S('c10'), ce = AT('c10', 'cerrar');
  scene('sPed', [a - .1, S('c11') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#050a12,#0c1420)"></div><svg class="full" id="vPe" viewBox="0 0 1080 1920"></svg>${fic('peF')}
    <div id="peS" style="position:absolute;left:150px;top:1360px;padding:18px 34px;border:8px solid #ff5148;color:#ff5148;font:900 70px/1 'Inter Var';opacity:0">CERRAR LA<br>ESTACIÓN</div>`);
  const svg = $('vPe');
  const cb = el('g', { transform: 'translate(330 720) scale(.5)' }, svg); casaBlanca(cb);
  const crs = el('g', { transform: 'translate(720 1180) scale(.45)' }, svg); casaRosada(crs);
  etiqueta(svg, 'WASHINGTON', 330, 770, { anchor: 'middle', col: '#cfd3d8' }); etiqueta(svg, 'BUENOS AIRES', 720, 1220, { anchor: 'middle', col: '#cfd3d8' });
  const cab = el('path', { d: 'M400,640 C620,700 760,820 730,960', fill: 'none', stroke: '#ffc142', 'stroke-width': 7 }, svg), L = cab.getTotalLength(), doc = el('g', {}, svg); archivo(doc);
  RENDER.push(t => {
    if (!on('sPed')) return;
    aparece('peF', t, a);
    const u = io(P(t, a + .2, ce)), p = cab.getPointAtLength(L * u); doc.setAttribute('transform', `translate(${p.x} ${p.y - 30})`); doc.setAttribute('opacity', P(t, a + .1, a + .3));
    cab.style.strokeDasharray = `${L * u} ${L}`; sello('peS', t, ce);
  });
}
// ---------- 21 · Pero China también presiona: el swap chino ----------
{
  const a = S('c11'), di = AT('c11', 'dieciocho');
  scene('sSwC', [a - .1, AT('c11', 'y es la') - .1, .15, .15, 1.04], `${fondo('#2a0606')}<svg class="full" id="vSc" viewBox="0 0 1080 1920"></svg>${real('scR')}
    <div class="mono" style="position:absolute;left:64px;top:430px;font-size:30px;letter-spacing:.2em;color:#8b919a">SWAP CHINO · BANCO CENTRAL</div>
    <div id="scN" style="position:absolute;left:64px;top:500px;font:900 150px/1 'Inter Var';color:#ffde00;opacity:0">US$ <span id="scC">0</span> M</div>
    <div class="lbl" style="left:64px;top:680px;font-size:26px;color:#8b919a">APROXIMADO · RENOVADO EN 2026</div>`);
  const fl = el('g', { transform: 'translate(64 840)' }, $('vSc')); banderaCN(fl, 300);
  RENDER.push(t => {
    if (!on('sSwC')) return;
    aparece('scR', t, a); fl.setAttribute('opacity', P(t, a, a + .3));
    $('scN').style.opacity = P(t, di - .4, di - .1); $('scC').textContent = fmt(18000 * eo(P(t, di - .3, di + .9)));
  });
}
// ---------- 22 · Y es la principal compradora de carne argentina ----------
{
  const a = AT('c11', 'y es la'), ca = AT('c11', 'carne');
  scene('sCar2', [a - .1, S('c12') - .1, .15, .2, 0], `<svg class="full" id="vCr" viewBox="0 0 1080 1920"></svg>${real('crR')}
    <div id="crC" class="card" style="left:64px;top:400px;width:950px;padding:20px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">CARNE VACUNA ARGENTINA</div>
      <div style="font:800 52px/1.15 'Inter Var';margin-top:6px">China es el <span style="color:#ffde00">principal destino</span></div></div>`);
  const G = globo($('vCr'), { r: 540, cy: 1180, paises: { '032': '#3d6f9e', '156': '#a8322a' } });
  const rutas = [0, 1, 2].map(() => ({ p: el('path', { fill: 'none', stroke: '#ffde00', 'stroke-width': 4, 'stroke-dasharray': '10 10' }, G.top), b: (() => { const g = el('g', {}, G.top); iconoBarco(g, '#ffde00', 1.8); return g; })() }));
  const ruta = [[-58.4, -34.6], [18, -36], [80, -8], [121.5, 31.2]], tramo = u => { u = clamp(u); const n = ruta.length - 1, i = Math.min(n - 1, Math.floor(u * n)), f = u * n - i; return d3.geoInterpolate(ruta[i], ruta[i + 1])(f); };
  RENDER.push(t => {
    if (!on('sCar2')) return;
    const k = io(P(t, a - .1, S('c12'))); G.update([-lerp(-40, 60, k), -lerp(-25, 0, k), 0]);
    rutas.forEach((r, i) => {
      const pts = []; for (let j = 0; j <= 60; j++) pts.push(tramo(j / 60)); r.p.setAttribute('d', G.path({ type: 'LineString', coordinates: pts }) || ''); r.p.setAttribute('opacity', P(t, ca - .5, ca));
      const u = (((t - a) * .12 + i / 3) % 1 + 1) % 1, xy = G.xy(tramo(u)); r.b.setAttribute('opacity', xy && t > ca - .4 ? 1 : 0); if (xy) r.b.setAttribute('transform', `translate(${xy[0]} ${xy[1]})`);
    });
    aparece('crR', t, a); entra('crC', t, ca - .4);
  });
}
// ---------- 23 · Pekín avisa: si se rompe el contrato, revisa todo lo demás ----------
{
  const a = S('c12'), to = AT('c12', 'todo');
  scene('sPek', [a - .1, S('c13') - .1, .2, .2, 0], `<svg class="full" id="vPk" viewBox="0 0 1080 1920"></svg>${fic('pkF')}
    <div id="pkS" style="position:absolute;left:120px;top:1420px;padding:18px 34px;border:8px solid #ff5148;color:#ff5148;font:900 74px/1 'Inter Var';opacity:0">SE REVISA<br>TODO</div>`);
  const G = globo($('vPk'), { r: 560, cy: 1000, paises: { '032': '#3d6f9e', '156': '#a8322a' } });
  const arc = el('path', { fill: 'none', stroke: '#ff5148', 'stroke-width': 6 }, G.top);
  const pk = el('g', {}, G.top); el('circle', { r: 10, fill: '#ff5148' }, pk); etiqueta(pk, 'PEKÍN', 18, 8, { size: 28, w: 600, col: '#ff8a80' });
  RENDER.push(t => {
    if (!on('sPek')) return;
    const k = io(P(t, a - .1, S('c13'))); G.update([-lerp(116, -10, k), -lerp(20, -10, k), 0]);
    arc.setAttribute('d', arcoGeo(G.path, NQ.pekin, LUGAR.ba, io(P(t, a + .2, to))) || '');
    const p = G.xy(NQ.pekin); pk.setAttribute('opacity', p ? 1 : 0); if (p) pk.setAttribute('transform', `translate(${p[0]} ${p[1]})`);
    aparece('pkF', t, a); sello('pkS', t, to);
  });
}
// ---------- 24 · La Argentina, en el medio ----------
{
  const a = S('c13'), ci = AT('c13', 'Cierra'), ma = AT('c13', 'mantiene');
  scene('sMed', [a - .1, AT('c13', 'En la parte') - .1, .2, .15, 1.04], `${fondo('#121820')}<svg class="full" id="vMd" viewBox="0 0 1080 1920"></svg>
    <div id="mdQ" style="position:absolute;left:64px;top:360px;font:900 92px/1.05 'Inter Var';opacity:0">¿<span style="color:#ff5148">CIERRA</span><br>O <span style="color:#5ee093">MANTIENE</span>?</div>`);
  const svg = $('vMd'), soga = el('path', { fill: 'none', stroke: '#c9a26a', 'stroke-width': 10 }, svg);
  const us = el('g', {}, svg); banderaUS(us, 220); const cn = el('g', {}, svg); banderaCN(cn, 220);
  const ar = el('g', {}, svg); banderaAR(ar, 240); const ant = antena(el('g', {}, svg)); ant.g.setAttribute('transform', 'translate(540 690) scale(.5)');
  etiqueta(svg, 'EE.UU.', 160, 650, { anchor: 'middle', size: 30, w: 600 }); etiqueta(svg, 'CHINA', 920, 650, { anchor: 'middle', size: 30, w: 600 });
  RENDER.push(t => {
    if (!on('sMed')) return;
    const tir = 22 * Math.sin(t * 2.2) * P(t, a, a + .5);
    soga.setAttribute('d', `M${160 + tir},860 Q540,${880 + 10 * Math.sin(t * 5)} ${920 + tir},860`);
    us.setAttribute('transform', `translate(${50 + tir} 700)`); cn.setAttribute('transform', `translate(${810 + tir} 700)`); ar.setAttribute('transform', `translate(${420 + tir * .6} 930)`);
    ant.apuntar(tir); $('mdQ').style.opacity = P(t, ci - .3, ci);
  });
}
// ---------- 25 · En la parte 2, la decisión ----------
{
  const a = AT('c13', 'En la parte');
  scene('sPa2', [a - .1, S('c14') - .1, .1, .15, 1.06], `${fondo('#1a0706')}
    <div style="position:absolute;left:64px;top:640px;width:900px"><div id="p2L" style="height:6px;background:#e0433a;width:0"></div>
    <div id="p2T" style="font:900 160px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px">PARTE <span style="color:#ff5148">2</span></div>
    <div class="lbl" style="position:static;margin-top:18px;font-size:34px;color:#cfd3d8">la decisión</div></div>`);
  RENDER.push(t => { if (!on('sPa2')) return; $('p2L').style.width = 900 * eo(P(t, a - .1, a + .4)) + 'px'; const q = P(t, a, a + .3); $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%'; });
}
// ---------- 26 · ¿Vos qué harías? ----------
{
  const a = S('c14'), co = AT('c14', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 100px/1.05 'Inter Var';opacity:0">¿VOS QUÉ<br><span style="color:#ffc142">HARÍAS?</span></div>
    <div id="cO" style="position:absolute;left:64px;top:620px;display:flex;gap:24px;opacity:0"><div class="pill" style="background:#c3332b;color:#fff;font-size:36px">CERRARLA</div><div class="pill" style="background:#2f8f5b;color:#fff;font-size:36px">MANTENERLA</div></div>
    <div id="cL" style="position:absolute;left:64px;top:760px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 4; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => {
    if (!on('sCom')) return;
    entra('cQ', t, a, 20); $('cO').style.opacity = P(t, a + .4, a + .7);
    cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; });
  });
}
// ---------- 27 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción política · escenario hipotético</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">¿Y SI<span style="color:var(--red)">…?</span></div>
      <div id="fQ" style="font:700 50px/1.15 'Inter Var';margin-top:34px">Parte 2:<br><span style="color:#aab0b8;font-weight:600">la decisión</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para no perdértela</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
