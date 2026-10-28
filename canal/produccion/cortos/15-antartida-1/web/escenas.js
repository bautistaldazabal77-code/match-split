// "¿Y si…? La Antártida en 2048" · parte 1 (ficción política con datos reales). Todo animado, sin fotos.
// Lo real: Tratado Antártico (1959, art. IV), Protocolo de Madrid (1991, arts. 7 y 25), sectores de cada país, base Orcadas (1904), Emilio Palma (1978),
// relevamientos rusos y la estimación de 2020 de Rosgeologia (S&P Global, 29/5/2024). Valentina, el pedido de revisión y el buque son ficción.

captions([
  ['h1', 'dos', 'a'], ['h1', 'cuarenta', 'a'], ['h1', 'ocho', 'a'], ['h1', 'termina', 'r'], ['h1', 'mentira', 'g'], ['h2', 'algo', 'r'], ['h2', 'ficción', 'r'], ['h2', 'reales', 'g'],
  ['c1', 'real', 'g'], ['c1', 'doce', 'a'], ['c1', 'Argentina', 'a'], ['c1', 'congelaron', 'a'], ['c2', 'Argentina', 'a'], ['c2', 'Chile', 'r'], ['c2', 'Reino', 'a'], ['c2', 'Unido', 'a'],
  ['c2', 'pisan', 'r'], ['c3', 'cuatro', 'a'], ['c3', 'Orcadas', 'a'], ['c3', 'antigua', 'g'], ['c4', 'nadie', 'g'], ['c5', 'Madrid', 'a'], ['c5', 'minería', 'r'], ['c5', 'revisarlo', 'r'],
  ['c6', 'rusos', 'r'], ['c6', 'sísmicos', 'a'], ['c6', 'quinientos', 'a'], ['c6', 'once', 'a'], ['c6', 'petróleo', 'a'], ['c6', 'ciencia', 'g'], ['c7', 'ficción', 'r'],
  ['c8', 'Valentina', 'a'], ['c8', 'Esperanza', 'a'], ['c8', 'Emilio', 'a'], ['c8', 'Palma', 'a'], ['c9', 'Marambio', 'a'], ['c9', 'Rusia', 'r'], ['c9', 'prohibición', 'r'],
  ['c10', 'radar', 'a'], ['c10', 'sísmico', 'r'], ['c10', 'Weddell', 'a'], ['c11', 'Ninguno', 'r'], ['c11', 'invitó', 'r'], ['c12', 'Santiago', 'r'], ['c12', 'Londres', 'a'],
  ['c12', 'qué', 'a'], ['c13', 'harías', 'a'], ['c13', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 1', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2, horas: [[S('c9') - .1, '1'], [S('c10') - .1, '9', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };

SETUP.push(() => {
// ---------- 1 · Gancho: dicen que en 2048 se termina el tratado. Es mentira ----------
{
  const me = AT('h1', 'mentira');
  scene('sAbre', [-1, S('h2') - .1, .01, .15, 1.05], `<svg class="full" id="vAb" viewBox="0 0 1080 1920"></svg>
    <div id="abY" style="position:absolute;left:64px;top:320px;font:900 230px/1 'Inter Var';letter-spacing:-.04em">20<span style="color:#8fd0ff">48</span></div>
    <div id="abS" style="position:absolute;left:64px;top:560px;font:800 54px/1.12 'Inter Var';color:#cfd3d8">¿SE TERMINA EL<br>TRATADO ANTÁRTICO?</div>
    <div id="abM" style="position:absolute;left:560px;top:1440px;padding:16px 30px;border:8px solid #5ee093;color:#5ee093;font:900 72px/1 'Inter Var';opacity:0">MITO</div>`);
  const svg = $('vAb'), G = globo(svg, { r: 400, cy: 1000, paises: { '010': '#c9d6e2' } }), nv = nieve(svg, 90, 4);
  RENDER.push(t => {
    if (!on('sAbre')) return;
    G.update([t * 6, 72, 0]); nv(t);
    $('abY').style.transform = `scale(${lerp(1.06, 1, P(t, 0, 1))})`; $('abY').style.transformOrigin = '0 0';
    sello('abM', t, me);
  });
}
// ---------- 2 · Pero ese año sí puede pasar algo ----------
{
  const a = S('h2'), fi = AT('h2', 'ficción');
  scene('sYsi', [a - .1, S('c1') - .1, .15, .2, 1.06], `${fondo('#0a1830')}
    <div style="position:absolute;left:64px;top:560px;width:900px"><div id="ysL" style="height:6px;background:#8fd0ff;width:0"></div>
    <div id="ysQ" style="font:800 64px/1.1 'Inter Var';margin-top:24px;color:#cfd3d8;opacity:0">Pero ese año<br><span style="color:#ff5148">sí puede pasar algo</span></div>
    <div id="ysT" style="font:900 150px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">¿Y SI<span style="color:#ff5148">…?</span></div>
    <div id="ysS" class="lbl" style="position:static;margin-top:30px;font-size:28px;color:#ffc142;opacity:0">ficción política · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sYsi')) return;
    $('ysL').style.width = 900 * eo(P(t, a - .1, a + .4)) + 'px'; entra('ysQ', t, a);
    const q = P(t, fi - .4, fi - .1); $('ysT').style.opacity = q; $('ysT').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('ysT').style.transformOrigin = '0 50%';
    $('ysS').style.opacity = P(t, fi, fi + .3);
  });
}
// ---------- 3 · 1959: doce países firman el Tratado Antártico ----------
{
  const a = S('c1'), dz = AT('c1', 'doce'), ar = AT('c1', 'Argentina'), fi = AT('c1', 'firmaron');
  const D12 = ['032', '036', '056', '152', '250', '392', '554', '578', '710', '643', '826', '840'];
  scene('s1959', [a - .1, AT('c1', 'congelaron') - .1, .2, .15, 0], `<div style="position:absolute;inset:0;background:#05090f"></div><svg class="full" id="v59" viewBox="0 0 1080 1920"></svg>${real('59R')}
    <div class="mono" style="position:absolute;left:64px;top:400px;font-size:30px;letter-spacing:.2em;color:#8b919a">WASHINGTON · 1 DE DICIEMBRE DE 1959</div>
    <div id="59N" style="position:absolute;left:64px;top:450px;font:900 120px/1 'Inter Var';opacity:0"><span id="59C">0</span> PAÍSES</div>
    <div id="59T" class="pill" style="position:absolute;left:64px;top:1440px;background:#1f5f8a;color:#fff;font-size:34px;opacity:0">FIRMAN EL TRATADO ANTÁRTICO</div>`);
  const svg = $('v59'), proj = d3.geoNaturalEarth1().rotate([-10, 0]).fitExtent([[30, 640], [1050, 1150]], { type: 'Sphere' }), path = d3.geoPath(proj);
  el('path', { d: path({ type: 'Sphere' }), fill: '#0a1622', stroke: '#2f4b66', 'stroke-width': 1.5 }, svg);
  el('path', { d: path(MAPDATA.land), fill: '#1a222c' }, svg);
  const ps = D12.map(id => el('path', { d: path(MAPDATA.countries.features.find(f => f.id === id)), fill: id === '032' ? '#74acdf' : '#2f6f9e', opacity: 0 }, svg));
  RENDER.push(t => {
    if (!on('s1959')) return;
    aparece('59R', t, a);
    const k = P(t, dz - .3, fi); $('59N').style.opacity = P(t, dz - .3, dz); $('59C').textContent = Math.round(12 * k);
    ps.forEach((p, i) => p.setAttribute('opacity', i === 0 ? P(t, ar - .2, ar + .2) : P(t, dz - .3 + i * .1, dz - .1 + i * .1)));
    aparece('59T', t, fi);
  });
}
// ---------- 4 · Congelaron los reclamos ----------
{
  const a = AT('c1', 'congelaron');
  scene('sHie', [a - .1, S('c2') - .1, .1, .15, 1.05], `<svg class="full" id="vHi" viewBox="0 0 1080 1920"></svg>
    <div id="hiT" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';opacity:0">RECLAMOS<br><span style="color:#8fd0ff">CONGELADOS</span></div>`);
  const svg = $('vHi'), M = mapaPolo(svg, { cy: 1050, scale: 1250 }), ss = ['UK', 'CL', 'AR'].map(k => M.sector(k)), nv = nieve(svg, 140, 9);
  const escarcha = el('rect', { x: 0, y: 0, width: 1080, height: 1920, fill: '#cfe8ff', opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('sHie')) return;
    M.cam(0, -90, 1); nv(t); golpeT('hiT', t, a, 1.2);
    const f = P(t, a, a + 1.2); ss.forEach(s => { s.setAttribute('opacity', .8); s.setAttribute('fill', '#9fb6c9'); s.setAttribute('stroke', '#dfeefa'); });
    escarcha.setAttribute('opacity', (.12 * f).toFixed(3));
  });
}
// ---------- 5 · Los sectores: la Argentina, Chile y el Reino Unido ----------
{
  const a = S('c2'), ar = AT('c2', 'Argentina'), ch = AT('c2', 'Chile'), uk = AT('c2', 'Reino');
  scene('sSec', [a - .1, AT('c2', 'Los tres') - .1, .2, .1, 0], `<svg class="full" id="vSe" viewBox="0 0 1080 1920"></svg>${real('seR')}
    <div style="position:absolute;left:64px;top:400px;display:flex;flex-direction:column;gap:12px">
      <div id="seA" class="pill" style="background:#2c5a80;color:#fff;font-size:28px;opacity:0">ARGENTINA · 25° A 74° O</div>
      <div id="seC" class="pill" style="background:#9c2f28;color:#fff;font-size:28px;opacity:0">CHILE · 53° A 90° O</div>
      <div id="seU" class="pill" style="background:#2a4580;color:#fff;font-size:28px;opacity:0">REINO UNIDO · 20° A 80° O</div></div>`);
  const M = mapaPolo($('vSe'), { cy: 1150, scale: 1300 }), sA = M.sector('AR'), sC = M.sector('CL'), sU = M.sector('UK');
  RENDER.push(t => {
    if (!on('sSec')) return;
    M.cam(-55, -78, lerp(1.05, 1.35, io(P(t, a, S('c3')))), 120);
    sA.setAttribute('opacity', P(t, ar - .1, ar + .3)); sC.setAttribute('opacity', P(t, ch - .1, ch + .3)); sU.setAttribute('opacity', P(t, uk - .1, uk + .3));
    aparece('seR', t, a); aparece('seA', t, ar); aparece('seC', t, ch); aparece('seU', t, uk);
  });
}
// ---------- 6 · Los tres se pisan ----------
{
  const a = AT('c2', 'Los tres'), pi = AT('c2', 'pisan');
  scene('sPis', [a - .1, S('c3') - .1, .1, .2, 0], `<svg class="full" id="vPi" viewBox="0 0 1080 1920"></svg>
    <div id="piT" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';opacity:0">LOS TRES<br><span style="color:#ff5148">SE PISAN</span></div>`);
  const M = mapaPolo($('vPi'), { cy: 1150, scale: 1300 }); ['UK', 'CL', 'AR'].forEach(k => M.sector(k, { opacity: .9 }));
  const d = el('defs', {}, $('vPi')), pat = el('pattern', { id: 'rayas', width: 14, height: 14, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, d); el('rect', { width: 7, height: 14, fill: '#ff5148' }, pat);
  const ov = el('path', { d: M.path(sectorGeo(-74, -53)), fill: 'url(#rayas)', stroke: '#ff5148', 'stroke-width': 4, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, M.sec);
  RENDER.push(t => {
    if (!on('sPis')) return;
    M.cam(-60, -76, lerp(1.4, 1.8, io(P(t, a, S('c3')))), 120);
    ov.setAttribute('opacity', P(t, a, a + .3) * (.75 + .25 * Math.sin(t * 8))); golpeT('piT', t, pi - .3, 1.3);
  });
}
// ---------- 7 · Base Orcadas, desde 1904 ----------
{
  const a = S('c3'), cu = AT('c3', 'cuatro'), or = AT('c3', 'Orcadas'), an = AT('c3', 'antigua');
  scene('sOrc', [a - .1, S('c4') - .1, .2, .2, 0], `<svg class="full" id="vOr" viewBox="0 0 1080 1920"></svg>${real('orR')}
    <div id="orN" style="position:absolute;left:64px;top:400px;font:900 170px/1 'Inter Var';color:#74acdf;opacity:0"><span id="orC">1900</span></div>
    <div id="orP" class="pill" style="position:absolute;left:64px;top:1440px;background:#2f8f5b;color:#fff;font-size:30px;opacity:0">LA BASE MÁS ANTIGUA QUE SIGUE HABITADA</div>`);
  const M = mapaPolo($('vOr'), { cy: 1000, scale: 1300 }), b = M.base(ANT.orcadas, 'BASE ORCADAS', { col: '#ffde00' }), sA = M.sector('AR', { opacity: .5 });
  RENDER.push(t => {
    if (!on('sOrc')) return;
    M.cam(lerp(-55, -45, io(P(t, a, or))), lerp(-75, -61.5, io(P(t, a, or))), lerp(1, 4.5, io(P(t, a, or + .3))), 0);
    b.ver(P(t, or - .3, or), t); aparece('orR', t, a);
    $('orN').style.opacity = P(t, a, a + .3); $('orC').textContent = Math.round(lerp(1900, 1904, eo(P(t, a + .2, cu + .2))));
    aparece('orP', t, an - .2);
  });
}
// ---------- 8 · El dato que casi nadie conoce ----------
{
  const a = S('c4');
  scene('sDat', [a - .1, S('c5') - .1, .1, .15, 1.08], `${fondo('#0a2015')}
    <div id="daT" style="position:absolute;left:64px;right:64px;top:600px;font:900 128px/1.02 'Inter Var';letter-spacing:-.02em;opacity:0">EL DATO QUE<br><span style="color:#5ee093">CASI NADIE</span><br>CONOCE</div>`);
  RENDER.push(t => { if (!on('sDat')) return; golpeT('daT', t, a, 1.3); });
}
// ---------- 9 · Protocolo de Madrid, 1991: prohíbe la minería ----------
{
  const a = S('c5'), mi = AT('c5', 'minería');
  const art = '«Cualquier actividad relacionada con los recursos minerales, salvo la investigación científica, estará prohibida».';
  scene('sMad', [a - .1, AT('c5', 'Desde') - .1, .2, .15, 1.03], `${fondo('#0d141b')}${real('maR')}
    <div id="maC" class="card" style="left:64px;top:420px;width:950px;padding:30px 34px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">PROTOCOLO DE MADRID · 1991 · ARTÍCULO 7</div>
      <div id="maT" style="font:700 50px/1.22 'Inter Var';margin-top:18px;min-height:380px"></div></div>
    <div id="maS" style="position:absolute;left:520px;top:1440px;padding:16px 30px;border:8px solid #ff5148;color:#ff5148;font:900 64px/1 'Inter Var';opacity:0">PROHIBIDA</div>`);
  RENDER.push(t => {
    if (!on('sMad')) return;
    aparece('maR', t, a); entra('maC', t, a + .1);
    const s = typed(t, a + .4, mi + .6, art), i = s.indexOf('estará prohibida');
    $('maT').innerHTML = i < 0 ? s : s.slice(0, i) + `<span style="color:#ff5148">${s.slice(i)}</span>`;
    sello('maS', t, mi + .3);
  });
}
// ---------- 10 · Desde 2048 cualquiera de los países con voto puede pedir revisarlo ----------
{
  const a = AT('c5', 'Desde'), vo = AT('c5', 'voto'), re = AT('c5', 'revisarlo');
  scene('sLin', [a - .1, S('c6') - .1, .15, .2, 1.03], `${fondo('#0d141b')}${real('liR')}
    <div style="position:absolute;left:64px;top:560px;width:950px">
      <div style="display:flex;justify-content:space-between" class="mono"><div style="font-size:34px;color:#cfd3d8">1998</div><div style="font-size:34px;color:#ffc142">2048</div></div>
      <div style="height:26px;background:#222a34;border-radius:13px;margin-top:14px;overflow:hidden"><div id="liB" style="height:100%;width:0;background:linear-gradient(90deg,#2f6f9e,#ffc142)"></div></div>
      <div style="display:flex;justify-content:space-between;margin-top:12px" class="mono"><div style="font-size:22px;color:#8b919a">ENTRA EN VIGOR</div><div style="font-size:22px;color:#8b919a"><span id="liN">0</span> AÑOS</div></div></div>
    <div id="liC" class="card" style="left:64px;top:860px;width:950px;padding:24px 30px;opacity:0;border-color:#ffc142"><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.14em">ARTÍCULO 25</div>
      <div style="font:800 48px/1.18 'Inter Var';margin-top:8px">Cualquier país <span style="color:#ffc142">con voto</span> puede pedir una <span style="color:#ff5148">conferencia de revisión</span></div></div>`);
  RENDER.push(t => {
    if (!on('sLin')) return;
    aparece('liR', t, a); const k = io(P(t, a, vo)); $('liB').style.width = 100 * k + '%'; $('liN').textContent = Math.round(50 * k);
    entra('liC', t, vo - .1);
  });
}
// ---------- 11 · Barcos rusos hicieron estudios sísmicos ----------
{
  const a = S('c6'), si = AT('c6', 'sísmicos');
  scene('sSis', [a - .1, AT('c6', 'una estimación') - .1, .2, .15, 1.03], `<svg class="full" id="vSi" viewBox="0 0 1080 1920"></svg>${real('siR')}
    <div id="siT" class="pill" style="position:absolute;left:64px;top:400px;background:#222a34;border:1px solid #ff8a80;color:#ff8a80;font-size:30px;opacity:0">RELEVAMIENTOS SÍSMICOS RUSOS</div>`);
  const svg = $('vSi'), d = el('defs', {}, svg), lg = el('linearGradient', { id: 'siMar', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#0e3147' }, lg); el('stop', { offset: 1, 'stop-color': '#04121c' }, lg);
  el('rect', { x: 0, y: 0, width: 1080, height: 620, fill: '#0a0f16' }, svg); el('rect', { x: 0, y: 620, width: 1080, height: 520, fill: 'url(#siMar)' }, svg);
  const capas = [['#2a2218', 1140], ['#3a2e20', 1230], ['#2a241c', 1330], ['#1c1812', 1440]];
  capas.forEach(([c, y], i) => el('path', { d: `M0,${y} C300,${y - 30 + i * 8} 700,${y + 30} 1080,${y - 10} L1080,1920 L0,1920 Z`, fill: c }, svg));
  el('path', { d: 'M520,1500 C600,1440 760,1450 820,1500 C780,1540 600,1550 520,1500 Z', fill: '#090706', stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, svg);
  const bq = el('g', {}, svg); buqueSismico(bq); const fl = el('g', { transform: 'translate(-60 -250)' }, bq); banderaRU(fl, 90);
  const ondas = [0, 1, 2, 3, 4].map(() => el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 3 }, svg));
  const cable = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 3 }, svg);
  RENDER.push(t => {
    if (!on('sSis')) return;
    const x = lerp(700, 560, P(t, a, S('c7'))); bq.setAttribute('transform', `translate(${x} ${620 + 4 * Math.sin(t * 1.5)}) scale(.9)`);
    cable.setAttribute('d', `M${x - 190},630 Q${x - 320},660 ${x - 480},650`);
    ondas.forEach((o, i) => { const u = ((t - a) * .6 + i / 5) % 1, r = 60 + u * 900; o.setAttribute('d', `M${x - 480 - r},${650 + r * .05} A${r},${r * .8} 0 0 0 ${x - 480 + r},${650 + r * .05}`); o.setAttribute('opacity', t > si - .5 ? (1 - u) * .7 : 0); });
    aparece('siR', t, a); aparece('siT', t, AT('c6', 'rusos'));
  });
}
// ---------- 12 · Una estimación rusa: 511.000 millones de barriles. Rusia dice que es ciencia ----------
{
  const a = AT('c6', 'una estimación'), qu = AT('c6', 'quinientos'), ru = AT('c6', 'Rusia dice');
  scene('sBar', [a - .1, S('c7') - .1, .1, .1, 1.04], `${fondo('#1a1208')}<svg class="full" id="vBa" viewBox="0 0 1080 1920"></svg>${real('baR')}
    <div class="mono" style="position:absolute;left:64px;top:420px;font-size:28px;letter-spacing:.18em;color:#8b919a">ESTIMACIÓN RUSA (2020)</div>
    <div id="baN" style="position:absolute;left:64px;top:470px;font:900 140px/1 'Inter Var';color:#ffc142;opacity:0"><span id="baC">0</span></div>
    <div class="lbl" style="left:64px;top:640px;font-size:32px;color:#e9e6df">MILLONES DE BARRILES</div>
    <div id="baP" class="pill" style="position:absolute;left:64px;top:1440px;background:#222a34;border:1px solid #5ee093;color:#5ee093;font-size:32px;opacity:0">RUSIA: ES INVESTIGACIÓN CIENTÍFICA</div>`);
  const svg = $('vBa'), barr = [];
  for (let i = 0; i < 24; i++) { const g = el('g', { opacity: 0 }, svg); el('rect', { x: -26, y: -36, width: 52, height: 72, rx: 8, fill: '#2a2a2a', stroke: '#ffc142', 'stroke-width': 3 }, g); el('path', { d: 'M-26,-12 H26 M-26,12 H26', stroke: '#ffc142', 'stroke-width': 3 }, g); barr.push(g); }
  RENDER.push(t => {
    if (!on('sBar')) return;
    aparece('baR', t, a); $('baN').style.opacity = P(t, qu - .3, qu); $('baC').textContent = fmt(511000 * eo(P(t, qu - .2, qu + 1.2)));
    barr.forEach((g, i) => { const t0 = qu + i * .05, q = eo(P(t, t0, t0 + .3)); g.setAttribute('opacity', q); g.setAttribute('transform', `translate(${130 + (i % 8) * 116} ${lerp(700, 800 + Math.floor(i / 8) * 90, q)})`); });
    aparece('baP', t, ru);
  });
}
// ---------- 13 · Desde acá, ficción ----------
{
  const a = S('c7');
  scene('sFic', [a - .1, S('c8') - .1, .05, .15, 1.1], `<div style="position:absolute;inset:0;background:#080202"></div>
    <div id="fiT" style="position:absolute;left:64px;right:64px;top:700px;font:900 150px/1 'Inter Var';letter-spacing:-.03em">DESDE ACÁ,<br><span style="color:#ff5148">FICCIÓN</span></div>
    <div id="fiL" style="position:absolute;left:0;top:640px;height:8px;background:#ff5148;width:0"></div>`);
  RENDER.push(t => { if (!on('sFic')) return; const [x, y] = shake(t, 10 * (1 - P(t, a, a + .5))); $('fiT').style.transform = `translate(${x}px,${y}px)`; $('fiL').style.width = 1080 * eo(P(t, a - .1, a + .4)) + 'px'; });
}
// ---------- 14 · Valentina, 23 años, nacida en la base Esperanza ----------
{
  const a = S('c8'), es = AT('c8', 'Esperanza');
  scene('sVal', [a - .1, AT('c8', 'como Emilio') - .1, .2, .15, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#0a1420,#04070b)"></div><svg class="full" id="vVa" viewBox="0 0 1080 1920"></svg>
    ${fic('vaF', 330, 'PERSONAJE DE FICCIÓN')}
    <div id="vaB" style="position:absolute;left:250px;top:520px;width:560px;height:653px">${busto({ ropa: '#c8341f', capucha: '#b02a18', pelo: '#5a3a22', barba: 0, piel: '#e6b796', halo: '#8fd0ff' })}</div>
    <div id="vaN" class="card" style="left:64px;top:1420px;padding:20px 28px;opacity:0"><div style="font:900 64px 'Inter Var'">Valentina, 23</div>
      <div class="mono" style="font-size:24px;color:#8fd0ff;letter-spacing:.12em;margin-top:4px">NACIDA EN LA BASE ESPERANZA</div></div>`);
  const nv = nieve($('vVa'), 100, 21);
  RENDER.push(t => {
    if (!on('sVal')) return;
    nv(t); aparece('vaF', t, a);
    const q = P(t, a - .1, a + .4); $('vaB').style.opacity = q; $('vaB').style.transform = `translateY(${lerp(40, 0, eo(q))}px)`;
    entra('vaN', t, es - .4);
  });
}
// ---------- 15 · Dato real: Emilio Palma, el primer bebé nacido en la Antártida (1978) ----------
{
  const a = AT('c8', 'como Emilio'), pr = AT('c8', 'primer');
  scene('sPal', [a - .1, S('c9') - .1, .15, .2, 0], `<svg class="full" id="vPa" viewBox="0 0 1080 1920"></svg>${real('paR')}
    <div id="paC" class="card" style="left:64px;top:400px;width:950px;padding:22px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">7 DE ENERO DE 1978 · BASE ESPERANZA</div>
      <div style="font:800 54px/1.15 'Inter Var';margin-top:6px">Emilio Marcos Palma, <span style="color:#74acdf">el primer bebé nacido en la Antártida</span></div></div>`);
  const M = mapaPolo($('vPa'), { cy: 1100, scale: 1300 }), b = M.base(ANT.esperanza, 'BASE ESPERANZA', { col: '#ffde00' });
  RENDER.push(t => {
    if (!on('sPal')) return;
    M.cam(-57, -63.6, lerp(3, 5, io(P(t, a, S('c9')))), -300); b.ver(P(t, a, a + .3), t);
    aparece('paR', t, a); entra('paC', t, pr - .5);
  });
}
// ---------- 16 · Enero de 2048: Valentina trabaja en la base Marambio ----------
{
  const a = S('c9'), ma = AT('c9', 'Marambio');
  scene('sMar', [a - .1, AT('c9', 'cuando llega') - .1, .15, .15, 0], `<svg class="full" id="vMa" viewBox="0 0 1080 1920"></svg>${fic('mrF')}
    <div id="mrY" class="card" style="left:64px;top:400px;padding:16px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">FECHA</div><div style="font:900 64px 'Inter Var'">ENERO 2048</div></div>`);
  const M = mapaPolo($('vMa'), { cy: 1150, scale: 1300 }), bm = M.base(ANT.marambio, 'BASE MARAMBIO', { col: '#ffde00' }), be = M.base(ANT.esperanza, 'ESPERANZA', { col: '#9fb0c0', anchor: 'end', size: 20 });
  RENDER.push(t => {
    if (!on('sMar')) return;
    M.cam(-57, -64, lerp(5, 6, P(t, a, AT('c9', 'cuando llega'))), -350); bm.ver(P(t, ma - .3, ma), t); be.ver(P(t, a, a + .3), t);
    aparece('mrF', t, a); entra('mrY', t, a + .1);
  });
}
// ---------- 17 · La noticia: un grupo de países, encabezado por Rusia, pide revisar la prohibición ----------
{
  const a = AT('c9', 'cuando llega'), ru = AT('c9', 'Rusia'), pr = AT('c9', 'prohibición');
  scene('sNot', [a - .1, S('c10') - .1, .15, .2, 1.04], `${fondo('#1a0a08')}${fic('noF')}
    <div id="noC" class="card" style="left:64px;top:430px;width:950px;padding:28px 32px;opacity:0;border-color:#ff5148">
      <div style="display:flex;align-items:center;gap:14px"><i style="width:18px;height:18px;border-radius:50%;background:#ff5148;display:block"></i><div class="mono" style="font-size:24px;color:#ff6a60;letter-spacing:.18em">URGENTE · ENERO 2048</div></div>
      <div style="font:800 56px/1.15 'Inter Var';margin-top:16px">Un grupo de países, encabezado por <span style="color:#ff5148">Rusia</span>, pide revisar la <span style="color:#ffc142">prohibición de la minería</span></div></div>
    <svg class="full" id="vNo" viewBox="0 0 1080 1920"></svg>`);
  const fl = el('g', { transform: 'translate(64 1440)', opacity: 0 }, $('vNo')); banderaRU(fl, 200);
  RENDER.push(t => {
    if (!on('sNot')) return;
    aparece('noF', t, a); const q = P(t, a - .1, a + .2); $('noC').style.opacity = q; const [x, y] = shake(t, 6 * (1 - P(t, a, a + .4))); $('noC').style.transform = `translate(${x}px,${y}px)`;
    fl.setAttribute('opacity', P(t, ru - .2, ru + .2));
  });
}
// ---------- 18 · Nueve días después: el radar muestra un buque sísmico en el mar de Weddell ----------
{
  const a = S('c10'), bu = AT('c10', 'buque'), we = AT('c10', 'Weddell'), zo = AT('c10', 'zona');
  scene('sRad', [a - .1, S('c11') - .1, .15, .15, 0], `<svg class="full" id="vRa" viewBox="0 0 1080 1920"></svg>${fic('raF')}
    <div id="raB" class="pill" style="position:absolute;left:64px;top:400px;background:#c3332b;color:#fff;font-size:30px;opacity:0">BUQUE SÍSMICO · NO IDENTIFICADO</div>`);
  const svg = $('vRa'), M = mapaPolo(svg, { cy: 1000, scale: 1300 }), ss = ['UK', 'CL', 'AR'].map(k => M.sector(k));
  const bl = el('g', {}, M.top), bi = el('g', {}, bl); el('circle', { r: 14, fill: '#ff5148' }, bi); const br = el('circle', { r: 14, fill: 'none', stroke: '#ff5148', 'stroke-width': 4 }, bi);
  const [bx, by] = M.proj([-38, -70]); bl.setAttribute('transform', `translate(${bx} ${by})`);
  const lw = etiqueta(M.top, 'MAR DE WEDDELL', ...M.proj([-42, -67.5]), { size: 26, col: '#8fd0ff', anchor: 'middle' });
  const scr = el('g', {}, svg), sweep = radar(scr, 540, 1000, 470);
  const mask = el('path', { d: 'M0,0 H1080 V1920 H0 Z M540,530 A470,470 0 1 0 540.1,530 Z', fill: '#04060a', 'fill-rule': 'evenodd' }, svg);
  RENDER.push(t => {
    if (!on('sRad')) return;
    M.cam(-45, -72, 1.6, 0); sweep(t); bi.setAttribute('transform', `scale(${1 / M.z})`);
    bl.setAttribute('opacity', P(t, bu - .2, bu + .1) * (.6 + .4 * Math.sin(t * 6))); br.setAttribute('r', 14 + 30 * ((t * 1.2) % 1)); br.setAttribute('opacity', 1 - ((t * 1.2) % 1));
    lw.setAttribute('opacity', P(t, we - .3, we)); lw.setAttribute('font-size', 26 / M.z);
    ss.forEach(s => s.setAttribute('opacity', .6 * P(t, zo - .2, zo + .3)));
    aparece('raF', t, a); aparece('raB', t, bu);
  });
}
// ---------- 19 · Ninguno de los tres lo invitó ----------
{
  const a = S('c11');
  scene('sNin', [a - .1, S('c12') - .1, .1, .15, 1.04], `${fondo('#121820')}<svg class="full" id="vNi" viewBox="0 0 1080 1920"></svg>
    <div id="niT" style="position:absolute;left:64px;top:330px;font:900 96px/1.05 'Inter Var';opacity:0">NINGUNO<br>LO <span style="color:#ff5148">INVITÓ</span></div>`);
  const svg = $('vNi'), fs = [[banderaAR, 'ARGENTINA'], [banderaCL, 'CHILE'], [banderaUK, 'REINO UNIDO']].map(([f, n], i) => {
    const g = el('g', { opacity: 0 }, svg); f(g, 260); etiqueta(g, n, 130, 220, { anchor: 'middle', size: 24, w: 600 });
    const x = el('path', { d: 'M20,10 L240,150 M240,10 L20,150', stroke: '#ff5148', 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0 }, g); return { g, x, i };
  });
  RENDER.push(t => {
    if (!on('sNin')) return;
    golpeT('niT', t, a, 1.2);
    fs.forEach(f => { const q = P(t, a + f.i * .2, a + .2 + f.i * .2); f.g.setAttribute('opacity', q); f.g.setAttribute('transform', `translate(${64 + f.i * 340} ${lerp(720, 680, eo(q))})`); f.x.setAttribute('opacity', P(t, a + .6 + f.i * .2, a + .7 + f.i * .2)); });
  });
}
// ---------- 20 · ¿A quién llama primero la Argentina: a Santiago o a Londres? ----------
{
  const a = S('c12'), sa = AT('c12', 'Santiago'), lo = AT('c12', 'Londres');
  scene('sLla', [a - .1, AT('c12', 'En la parte') - .1, .15, .15, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#0f1a28,#040608 70%)"></div>
    <div id="llQ" style="position:absolute;left:64px;top:330px;font:900 84px/1.05 'Inter Var';opacity:0">¿A QUIÉN<br>LLAMA <span style="color:#ffc142">PRIMERO?</span></div>
    <div style="position:absolute;left:250px;top:580px;width:580px;height:560px;border-radius:50px;background:#0b0f15;border:6px solid #2a3542;padding:40px 36px">
      <div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">CASA ROSADA · LLAMADA</div>
      <div id="llS" style="margin-top:30px;padding:22px;border-radius:20px;background:#1a202a;display:flex;align-items:center;gap:20px;font:800 44px 'Inter Var';opacity:.25"><svg width="90" height="60" id="llFS"></svg>SANTIAGO</div>
      <div id="llL" style="margin-top:20px;padding:22px;border-radius:20px;background:#1a202a;display:flex;align-items:center;gap:20px;font:800 44px 'Inter Var';opacity:.25"><svg width="90" height="60" id="llFL"></svg>LONDRES</div></div>`);
  banderaCL($('llFS'), 90); banderaUK($('llFL'), 90);
  RENDER.push(t => {
    if (!on('sLla')) return;
    entra('llQ', t, a);
    const s = P(t, sa - .2, sa + .1) * (1 - P(t, lo - .2, lo)), l = P(t, lo - .2, lo + .1);
    $('llS').style.opacity = .25 + .75 * s; $('llS').style.background = s > .5 ? '#2f8f5b' : '#1a202a';
    $('llL').style.opacity = .25 + .75 * l; $('llL').style.background = l > .5 ? '#2f8f5b' : '#1a202a';
  });
}
// ---------- 21 · En la parte 2: quién se queda con qué ----------
{
  const a = AT('c12', 'En la parte');
  scene('sPa2', [a - .1, S('c13') - .1, .1, .15, 1.06], `${fondo('#0a1830')}
    <div style="position:absolute;left:64px;top:620px;width:900px"><div id="p2L" style="height:6px;background:#8fd0ff;width:0"></div>
    <div id="p2T" style="font:900 160px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px">PARTE <span style="color:#8fd0ff">2</span></div>
    <div class="lbl" style="position:static;margin-top:18px;font-size:34px;color:#cfd3d8">quién se queda con qué</div></div>`);
  RENDER.push(t => { if (!on('sPa2')) return; $('p2L').style.width = 900 * eo(P(t, a - .1, a + .4)) + 'px'; const q = P(t, a, a + .3); $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%'; });
}
// ---------- 22 · ¿Vos qué harías? ----------
{
  const a = S('c13'), co = AT('c13', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 100px/1.05 'Inter Var';opacity:0">¿VOS QUÉ<br><span style="color:#ffc142">HARÍAS?</span></div>
    <div id="cL" style="position:absolute;left:64px;top:640px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 4; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => { if (!on('sCom')) return; entra('cQ', t, a, 20); cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; }); });
}
// ---------- 23 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#0a1830,#030508 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción política · escenario hipotético</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">¿Y SI<span style="color:var(--red)">…?</span></div>
      <div id="fQ" style="font:700 50px/1.15 'Inter Var';margin-top:34px">Parte 2:<br><span style="color:#aab0b8;font-weight:600">quién se queda con qué</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para no perdértela</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
