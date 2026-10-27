// "¿Y si…? La crisis del Mar de Scotia" · parte 2 (ficción política). Todo animado, sin fotos.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'submarino', 'r'], ['h1', 'hundió', 'r'], ['h1', 'internacionales', 'a'], ['h1', 'después', 'a'], ['h2', 'Ficción', 'r'], ['h2', 'reales', 'g'],
  ['c1', 'Lucas', 'a'], ['c1', 'once', 'a'], ['c1', 'horas', 'a'], ['c1', 'sobrevivientes', 'g'],
  ['c2', 'británico', 'r'], ['c2', 'Astute', 'r'], ['c3', 'teoría', 'a'], ['c3', 'romper', 'r'], ['c3', 'alianza', 'r'],
  ['c4', 'falla', 'g'], ['c4', 'directamente', 'g'], ['c5', 'Cuarta', 'a'], ['c5', 'Flota', 'a'], ['c5', 'sur', 'a'],
  ['c6', 'satelitales', 'a'], ['c6', 'tiempo', 'a'], ['c6', 'real', 'a'], ['c7', 'desembarco', 'g'], ['c7', 'bloqueo', 'r'],
  ['c8', 'rodean', 'r'], ['c8', 'interceptado', 'r'], ['c8', 'volver', 'r'], ['c9', 'OTAN', 'a'], ['c9', 'real', 'g'],
  ['c10', 'no', 'r'], ['c10', 'Malvinas', 'r'], ['c10', 'Trópico', 'a'], ['c10', 'Cáncer', 'a'],
  ['c11', 'mil', 'a'], ['c11', 'novecientos', 'a'], ['c11', 'ochenta', 'a'], ['c11', 'dos', 'a'], ['c11', 'tampoco', 'r'],
  ['c12', 'negociar', 'a'], ['c13', 'no', 'r'], ['c13', 'existe', 'g'], ['c14', 'Londres', 'a'], ['c14', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 2', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2, horas: [[S('c1') - .1, '1'], [S('c5') - .1, '3'], [S('c7') - .1, '9'], [S('c12') - .1, '40']] });
CAPS_OFF(S('outro'), TL.duration + 1);

SETUP.push(() => {
// ---------- 1 · Recapitulación: la fragata hundida ----------
{
  const q = AT('h1', 'Qué'), YS = 160;
  scene('sRe', [-1, S('h2') - .1, .01, .2, 1.06], `<svg class="full" id="vR" viewBox="0 0 1080 1920"></svg>
    <div id="rQ" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';letter-spacing:-.02em;opacity:0">¿QUÉ PASA<br><span style="color:#ff5148">DESPUÉS?</span></div>`);
  const svg = $('vR'), mar = marCostado(svg, YS, { seed: 21 });
  const d = el('defs', {}, svg);
  const cl = el('clipPath', { id: 'rL' }, d); el('rect', { x: -400, y: -400, width: 400, height: 800 }, cl);
  const cr = el('clipPath', { id: 'rR' }, d); el('rect', { x: 0, y: -400, width: 400, height: 800 }, cr);
  const L = el('g', {}, svg), R = el('g', {}, svg);
  fragata(el('g', { 'clip-path': 'url(#rL)' }, L)); fragata(el('g', { 'clip-path': 'url(#rR)' }, R));
  const bl = el('g', {}, svg), bub = burbujas(bl, 70, 31);
  const velo = el('rect', { x: -100, y: 0, width: 1300, height: 2000, fill: '#03101a', opacity: .35 }, svg);
  RENDER.push(t => {
    if (!on('sRe')) return;
    mar(t);
    const k = P(t, -1, S('h2'));
    L.setAttribute('transform', `translate(${470 - 40 * k} ${820 + 380 * k}) rotate(${-22 - 8 * k}) scale(.9)`);
    R.setAttribute('transform', `translate(${610 + 40 * k} ${860 + 420 * k}) rotate(${28 + 10 * k}) scale(.9)`);
    bub(u => [540 + Math.sin(u * 40) * 80, 900 + 300 * k - u * 900], (t * .3) % 1 + .4, .4);
    const qq = P(t, q - .15, q + .2); $('rQ').style.opacity = qq; $('rQ').style.transform = `translateY(${lerp(30, 0, eo(qq))}px)`;
  });
}
// ---------- 2 · Parte 2 ----------
{
  const a = S('h2');
  scene('sP2', [a - .1, S('c1') - .1, .15, .2, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:620px;width:860px"><div id="p2L" style="height:6px;background:#e0433a;width:0"></div>
    <div id="p2T" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">PARTE <span style="color:#ff5148">2</span></div>
    <div id="p2S" class="lbl" style="position:static;margin-top:18px;font-size:28px;color:#cfd3d8;opacity:0">ficción política · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sP2')) return;
    $('p2L').style.width = 860 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('p2T').style.opacity = q; $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%';
    $('p2S').style.opacity = P(t, AT('h2', 'Ficción') - .1, AT('h2', 'Ficción') + .3);
  });
}
// ---------- 3 · Lucas, rescatado después de 11 horas ----------
{
  const a = S('c1'), re = AT('c1', 'rescatan'), oh = AT('c1', 'once'), so = AT('c1', 'sobrevivientes'), YS = 980;
  scene('sBal', [a - .1, S('c2') - .1, .2, .2, 1.05], `<svg class="full" id="vBa" viewBox="0 0 1080 1920"></svg>
    <div id="bH" class="card" style="left:64px;top:330px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">EN LA BALSA</div><div class="mono" style="font-size:72px;line-height:1.05"><span id="bN">0</span> h</div></div>
    ${pill('bS', '✓ LUCAS SOBREVIVE', 520, '#2f8f5b')}`);
  const svg = $('vBa'), mar = marCostado(svg, YS, { seed: 5, alba: true });
  const balsa = el('g', {}, svg);
  el('ellipse', { cx: 0, cy: 0, rx: 120, ry: 34, fill: '#ff7a1a' }, balsa); el('ellipse', { cx: 0, cy: -6, rx: 96, ry: 22, fill: '#c4561a' }, balsa);
  el('path', { d: 'M-90,-10 Q0,-120 90,-10', fill: '#ff8a2a', opacity: .9 }, balsa);
  for (const x of [-40, 10, 50]) persona(balsa, x, -14, .8, { col: '#2b3440' });
  const buque = el('g', {}, svg); fragata(buque, { luces: true, num: '19', gris: '#4a535e' });
  const haz = el('path', { fill: '#fff6d0', opacity: 0 }, svg);
  const agua = el('rect', { x: -100, y: YS + 8, width: 1300, height: 1000, fill: '#0e3147', opacity: .55 }, svg);
  RENDER.push(t => {
    if (!on('sBal')) return;
    mar(t);
    const bx = 540, by = YS + 6 * Math.sin(t * 1.4);
    balsa.setAttribute('transform', `translate(${bx} ${by}) rotate(${(4 * Math.sin(t * 1.1)).toFixed(2)})`);
    const k = P(t, re - .3, so + .5);
    buque.setAttribute('transform', `translate(${lerp(1300, 860, eo(k))} ${YS - 30}) scale(${lerp(.25, .45, k)})`);
    const hx = lerp(1300, 860, eo(k)) - 40 * lerp(.25, .45, k), hy = YS - 30 - 110 * lerp(.25, .45, k);
    haz.setAttribute('d', `M${hx},${hy} L${bx - 140},${by - 30} L${bx + 120},${by + 30} Z`); haz.setAttribute('opacity', (.22 * P(t, re, re + .6)).toFixed(3));
    $('bH').style.opacity = P(t, oh - .3, oh); $('bN').textContent = Math.round(11 * eo(P(t, oh - .3, oh + .6)));
    aparece('bS', t, so);
  });
}
// ---------- 4 · Las sospechas: un submarino nuclear británico clase Astute ----------
{
  const a = S('c2'), br = AT('c2', 'británico'), cl = AT('c2', 'clase');
  scene('sAst', [a - .1, S('c3') - .1, .2, .2, 1.05], `<svg class="full" id="vAs" viewBox="0 0 1080 1920"></svg>
    ${pill('aS', 'SOSPECHA', 330)}<div id="aN" class="card" style="left:64px;top:410px;padding:20px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">SUBMARINO NUCLEAR</div>
    <div style="font:900 64px 'Inter Var';margin-top:4px">Clase Astute</div><div style="font:500 26px 'Inter Var';color:#cfd3d8">Reino Unido</div></div>`);
  const svg = $('vAs'), mar = marCostado(svg, 120, { seed: 13 });
  const sub = el('g', {}, svg); submarino(sub, { col: '#28323d', borde: '#ff5148' });
  const scan = el('rect', { x: -330, y: -120, width: 14, height: 240, fill: '#ff5148', opacity: .6 }, sub);
  const fl = el('g', { opacity: 0 }, svg); banderaUK(fl, 140);
  RENDER.push(t => {
    if (!on('sAst')) return;
    mar(t);
    sub.setAttribute('transform', `translate(${lerp(620, 520, P(t, a, S('c3')))} 960) scale(1.45)`);
    scan.setAttribute('x', lerp(-320, 300, (t * .7) % 1));
    aparece('aS', t, a + .2);
    $('aN').style.opacity = P(t, cl - .2, cl + .2);
    fl.setAttribute('opacity', P(t, br - .1, br + .3)); fl.setAttribute('transform', 'translate(800 420)');
  });
}
// ---------- 5 · Una teoría: alguien quiso romper la alianza; 6 · el plan falla ----------
{
  const a = S('c3'), ro = AT('c3', 'romper'), fa = AT('c4', 'falla'), ll = AT('c4', 'llama');
  scene('sTeo', [a - .1, S('c5') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#050a12,#0c1420)"></div><svg class="full" id="vTe" viewBox="0 0 1080 1920"></svg>
    ${pill('tT', 'UNA TEORÍA · DENTRO DE LA FICCIÓN', 330, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px')}
    ${pill('tF', '✕ EL PLAN FALLA', 400, '#2f8f5b')}`);
  const svg = $('vTe');
  const cb = el('g', { transform: 'translate(330 640) scale(.5)' }, svg); casaBlanca(cb);
  const crs = el('g', { transform: 'translate(720 1120) scale(.45)' }, svg); casaRosada(crs);
  etiqueta(svg, 'WASHINGTON', 330, 690, { anchor: 'middle', col: '#cfd3d8' }); etiqueta(svg, 'BUENOS AIRES', 720, 1160, { anchor: 'middle', col: '#cfd3d8' });
  const cable = el('path', { d: 'M400,560 C620,640 740,780 720,880', fill: 'none', stroke: '#5ee093', 'stroke-width': 8 }, svg);
  const L = cable.getTotalLength(), mid = cable.getPointAtLength(L * .5);
  const tij = el('g', { opacity: 0 }, svg);
  const h1 = el('g', {}, tij), h2 = el('g', {}, tij);
  for (const h of [h1, h2]) { el('path', { d: 'M0,0 L150,-12 L150,12 Z', fill: '#c9ced4' }, h); el('circle', { cx: -40, cy: 0, r: 26, fill: 'none', stroke: '#ff5148', 'stroke-width': 10 }, h); }
  const chispas = []; for (let i = 0; i < 14; i++) chispas.push({ c: el('circle', { r: 4, fill: '#ffd25a', opacity: 0 }, svg), a: i / 14 * 6.28, v: 80 + (i * 37 % 60) });
  const pulsos = []; for (let i = 0; i < 4; i++) pulsos.push(el('circle', { r: 12, fill: '#ffffff', opacity: 0 }, svg));
  RENDER.push(t => {
    if (!on('sTeo')) return;
    aparece('tT', t, AT('c3', 'teoría') - .2);
    // las tijeras se acercan al cable, intentan cortarlo y rebotan
    const ap = io(P(t, ro - 1.4, ro)), cierra = P(t, ro, ro + .35), rebota = io(P(t, fa - .2, fa + .6));
    const tx = lerp(1150, mid.x + 40, ap) + 300 * rebota, ty = lerp(420, mid.y - 20, ap) - 200 * rebota;
    tij.setAttribute('opacity', P(t, ro - 1.4, ro - 1.1) * (1 - P(t, fa + .4, fa + .8)));
    tij.setAttribute('transform', `translate(${tx} ${ty}) rotate(${200 + 120 * rebota})`);
    const ang = lerp(28, 6, cierra) * (1 - rebota) + 28 * rebota;
    h1.setAttribute('transform', `rotate(${ang})`); h2.setAttribute('transform', `rotate(${-ang})`);
    const tension = P(t, ro, ro + .3) * (1 - P(t, fa, fa + .3));
    cable.setAttribute('stroke', tension > .3 ? '#ffc142' : '#5ee093'); cable.setAttribute('stroke-width', 8 + 6 * P(t, fa, fa + .4));
    for (const c of chispas) { const u = P(t, ro + .2, ro + .9); c.c.setAttribute('cx', mid.x + Math.cos(c.a) * c.v * u); c.c.setAttribute('cy', mid.y + Math.sin(c.a) * c.v * u + 60 * u * u); c.c.setAttribute('opacity', u > 0 && u < 1 ? 1 - u : 0); }
    aparece('tF', t, fa);
    pulsos.forEach((p, i) => { const u = ((t - ll) * .8 + i / 4) % 1, q = cable.getPointAtLength(L * u); p.setAttribute('cx', q.x); p.setAttribute('cy', q.y); p.setAttribute('opacity', t > ll - .2 ? 1 : 0); });
  });
}
// ---------- 7 · La Cuarta Flota pone rumbo al sur ----------
{
  const a = S('c5'), ru = AT('c5', 'rutas');
  scene('sFlo', [a - .1, S('c6') - .1, .2, .2, 0], `<svg class="full" id="vFl" viewBox="0 0 1080 1920"></svg>
    ${pill('flT', 'CUARTA FLOTA DE EE.UU. · EXISTE', 330, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:26px')}
    ${pill('flR', 'RUTAS COMERCIALES', 400, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px')}`);
  const G = globo($('vFl'), { r: 500, cy: 980, paises: { '840': '#2f5a7a', '032': '#3d6f9e', '238': '#7a4a4a' } });
  const destino = [-52, -46], it = d3.geoInterpolate(LUGAR.mayport, [-34, -8]), it2 = d3.geoInterpolate([-34, -8], destino);
  const ruta = u => u < .5 ? it(u * 2) : it2(u * 2 - 1);
  const barcos = []; for (let i = 0; i < 6; i++) { const g = el('g', {}, G.top); iconoBarco(g, '#8fd0ff', 1.6); barcos.push({ g, d: i * .045 }); }
  const estela = el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 3, 'stroke-dasharray': '6 8', opacity: .7 }, G.top);
  const rutas = [[[-40, 10], [5, -35]], [[-60, -38], [18, -34]], [[-48, -26], [-75, 10]]].map(r => ({ r, p: el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 2.5, 'stroke-dasharray': '10 8', opacity: 0 }, G.top) }));
  RENDER.push(t => {
    if (!on('sFlo')) return;
    const k = io(P(t, a - .1, S('c6')));
    G.update([-lerp(-75, -50, k), -lerp(20, -25, k), 0]);
    aparece('flT', t, a);
    const u = P(t, a, S('c6') + .2);
    const pts = []; for (let i = 0; i <= 40 * u; i++) pts.push(ruta(i / 40));
    estela.setAttribute('d', pts.length > 1 ? G.path({ type: 'LineString', coordinates: pts }) || '' : '');
    for (const b of barcos) {
      const v = clamp(u - b.d), p = G.xy(ruta(v)), p2 = G.xy(ruta(Math.min(1, v + .01)));
      if (!p || !p2) { b.g.setAttribute('opacity', 0); continue; }
      b.g.setAttribute('opacity', P(t, a + b.d * 4, a + b.d * 4 + .3)); b.g.setAttribute('transform', `translate(${p[0]} ${p[1]}) rotate(${Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 180 / Math.PI})`);
    }
    for (const r of rutas) { r.p.setAttribute('d', arcoGeo(G.path, r.r[0], r.r[1], P(t, ru - .2, ru + .8)) || ''); r.p.setAttribute('opacity', P(t, ru - .2, ru + .1)); r.p.setAttribute('stroke-dashoffset', -t * 30); }
    aparece('flR', t, ru);
  });
}
// ---------- 8 · Imágenes satelitales en tiempo real ----------
{
  const a = S('c6'), im = AT('c6', 'imágenes');
  scene('sSat', [a - .1, S('c7') - .1, .2, .2, 0], `<svg class="full" id="vSa" viewBox="0 0 1080 1920"></svg>
    <div id="saP" class="card" style="left:120px;top:330px;width:700px;height:520px;overflow:hidden;opacity:0;border-color:#ff5148">
      <svg id="vSaP" viewBox="0 0 700 520" style="width:700px;height:520px"></svg>
      <div class="mono" style="position:absolute;left:20px;top:16px;font-size:22px;color:#ff6a60;display:flex;align-items:center;gap:10px"><i style="width:14px;height:14px;border-radius:50%;background:#ff5148;display:block"></i>EN VIVO</div>
      <div class="mono" id="saC" style="position:absolute;right:20px;bottom:14px;font-size:20px;color:#8fd0ff">51°41′S 57°51′O</div></div>`);
  const G = globo($('vSa'), { r: 470, cy: 1060, paises: { '032': '#3d6f9e', '238': '#c26a5a' } });
  const sats = [0, 1, 2].map(i => { const g = el('g', {}, G.root); el('rect', { x: -10, y: -7, width: 20, height: 14, fill: '#d9dde2' }, g); el('rect', { x: -34, y: -4, width: 20, height: 8, fill: '#3fa0e0' }, g); el('rect', { x: 14, y: -4, width: 20, height: 8, fill: '#3fa0e0' }, g); const beam = el('path', { fill: '#8fd0ff', opacity: .12 }, G.root); return { g, beam, i }; });
  // vista satelital: contorno de las islas y recuadros sobre puertos y pistas
  const pv = $('vSaP'), pr = d3.geoMercator().center([-59.2, -51.75]).scale(7200).translate([350, 260]), pp = d3.geoPath(pr);
  el('rect', { width: 700, height: 520, fill: '#0b1d2a' }, pv);
  el('path', { d: pp(MAPDATA.countries.features.find(f => f.id === '238')), fill: '#3a4a3a', stroke: '#9fb59f', 'stroke-width': 1.5 }, pv);
  const boxes = [[-58.45, -51.82], [-57.85, -51.69], [-60.4, -51.4], [-58.9, -52.2]].map(ll => { const [x, y] = pr(ll); return el('rect', { x: x - 22, y: y - 22, width: 44, height: 44, fill: 'none', stroke: '#ff5148', 'stroke-width': 3, opacity: 0 }, pv); });
  const scan = el('rect', { x: 0, width: 700, height: 4, fill: '#8fd0ff', opacity: .5 }, pv);
  RENDER.push(t => {
    if (!on('sSat')) return;
    const k = io(P(t, a - .1, S('c7')));
    G.update([-lerp(-45, -59, k), -lerp(-25, -48, k), 0]);
    const mv = G.xy(LUGAR.stanley);
    for (const s of sats) {
      const ang = t * .9 + s.i * 2.1, R = 540 + s.i * 40, x = 540 + Math.cos(ang) * R, y = 1060 + Math.sin(ang) * R * .35 - 200 + s.i * 60;
      s.g.setAttribute('transform', `translate(${x} ${y}) rotate(${(ang * 20) % 360})`);
      s.beam.setAttribute('d', mv ? `M${x},${y} L${mv[0] - 40},${mv[1]} L${mv[0] + 40},${mv[1]} Z` : ''); s.beam.setAttribute('opacity', mv && t > a + .5 ? .14 : 0);
    }
    const q = P(t, im - .15, im + .3); $('saP').style.opacity = q; $('saP').style.transform = `scale(${lerp(.85, 1, back(q))})`;
    boxes.forEach((b, i) => b.setAttribute('opacity', P(t, im + .4 + i * .3, im + .5 + i * .3) * (Math.floor(t * 3 + i) % 2 ? .6 : 1)));
    scan.setAttribute('y', (t * 300) % 520);
  });
}
// ---------- 9 · No hay desembarco: hay bloqueo ----------
{
  const a = S('c7'), hb = AT('c7', 'Hay bloqueo');
  scene('sBlq', [a - .1, S('c8') - .1, .1, .15, 1.06], `<div style="position:absolute;inset:0;background:#050304"></div>
    <div style="position:absolute;left:64px;top:620px;width:900px"><div id="bq1" style="position:relative;font:900 92px/1.05 'Inter Var';color:#cfd3d8;opacity:0">NO HAY<br>DESEMBARCO<div id="bqX" style="position:absolute;left:-10px;top:26%;height:12px;background:#ff5148;width:0"></div><div id="bqX2" style="position:absolute;left:-10px;top:74%;height:12px;background:#ff5148;width:0"></div></div>
    <div id="bq2" style="font:900 150px/1 'Inter Var';color:#ff5148;margin-top:40px;opacity:0">BLOQUEO</div></div>`);
  RENDER.push(t => {
    if (!on('sBlq')) return;
    $('bq1').style.opacity = P(t, a - .1, a + .2); const sx = eo(P(t, AT('c7', 'desembarco') + .2, AT('c7', 'desembarco') + .7)); $('bqX').style.width = 360 * clamp(sx * 2) + 'px'; $('bqX2').style.width = 640 * clamp(sx * 2 - 1) + 'px';
    const q = P(t, hb - .1, hb + .2); $('bq2').style.opacity = q; $('bq2').style.transform = `scale(${lerp(1.6, 1, eo(q))})`; $('bq2').style.transformOrigin = '0 50%';
  });
}
// ---------- 10 · Rodean las islas; cada reabastecimiento es interceptado ----------
{
  const a = S('c8'), ro = AT('c8', 'rodean'), ca = AT('c8', 'Cada'), it = AT('c8', 'interceptado'), vo = AT('c8', 'volver');
  scene('sAnillo', [a - .1, S('c9') - .1, .2, .2, 0], `<svg class="full" id="vAn" viewBox="0 0 1080 1920"></svg>${pill('anI', 'INTERCEPTADO', 330)}${pill('anV', '↩ OBLIGADO A VOLVER', 400, '#8a5a12')}`);
  const M = mapaSur($('vAn')), C0 = [-59.1, -51.7];
  const anillo = circuloGeo(M, C0, 2.1, { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 3, 'stroke-dasharray': '10 10', opacity: 0 }, M.top);
  const N = 12, piezas = [];
  for (let i = 0; i < N; i++) { const m = marca(M, C0); (i % 3 ? iconoBarco : iconoAvion)(m.inner, '#8fd0ff', 2.2); piezas.push({ m, i }); }
  const sup = marca(M, [-50, -46]); iconoAvion(sup.inner, '#ff8a80', 2.6); const sl = etiqueta(sup.inner, 'REABASTECIMIENTO', 0, -36, { anchor: 'middle', col: '#ff8a80', size: 20 });
  const sub2 = marca(M, [-52, -44.5]); iconoBarco(sub2.inner, '#ff8a80', 2.4);
  const caz = [0, 1].map(() => { const m = marca(M, C0); iconoAvion(m.inner, '#5ee093', 2.4); return m; });
  const R = 2.1;
  RENDER.push(t => {
    if (!on('sAnillo')) return;
    camMapa(M, -58.6, -50.6, lerp(1.6, 2.1, io(P(t, a, S('c9')))), -120);
    anillo.setAttribute('opacity', P(t, ro, ro + .4));
    for (const p of piezas) {
      const ang = p.i / N * 6.283 + t * .12, f = eo(P(t, ro - .3 + p.i * .05, ro + .6 + p.i * .05));
      const ll = [C0[0] + Math.cos(ang) * R * f / Math.cos(51.7 * Math.PI / 180), C0[1] + Math.sin(ang) * R * f];
      const [x, y] = M.proj(ll); p.m.g.setAttribute('transform', `translate(${x} ${y})`); fijo(M, p.m, `rotate(${(ang * 180 / Math.PI + 90).toFixed(1)})`);
      p.m.g.setAttribute('opacity', P(t, ro - .3 + p.i * .05, ro + p.i * .05));
    }
    // el avión de reabastecimiento llega desde el noreste, lo interceptan y vuelve
    const ida = io(P(t, ca - .6, it)), vuelta = io(P(t, it + .3, vo + .6));
    const s0 = [-50.5, -46.2], s1 = [-55.6, -49.4], sp = [lerp(lerp(s0[0], s1[0], ida), s0[0] + 2, vuelta), lerp(lerp(s0[1], s1[1], ida), s0[1] + 1.4, vuelta)];
    const [x, y] = M.proj(sp); sup.g.setAttribute('transform', `translate(${x} ${y})`);
    fijo(M, sup, `rotate(${vuelta > .05 ? -30 : 150})`); sup.g.setAttribute('opacity', P(t, ca - .6, ca - .3) * (1 - P(t, vo + .3, vo + .7)));
    sl.setAttribute('transform', `rotate(${vuelta > .05 ? 30 : -150})`);
    const b0 = [-52, -44.8], b1 = [-55.8, -48.4], bp = [lerp(lerp(b0[0], b1[0], ida), b0[0], vuelta), lerp(lerp(b0[1], b1[1], ida), b0[1], vuelta)];
    const [bx, by] = M.proj(bp); sub2.g.setAttribute('transform', `translate(${bx} ${by})`); fijo(M, sub2, `rotate(${vuelta > .05 ? -45 : 135})`); sub2.g.setAttribute('opacity', P(t, ca - .3, ca) * (1 - P(t, vo + .3, vo + .7)));
    caz.forEach((c, i) => {
      const k = io(P(t, it - .8, it)), from = M.proj([C0[0] + 2.6, C0[1] + 1.2 + i * .6]), to = [x + (i ? 50 : -50) / (M.z || 1), y + (i ? -30 : 30) / (M.z || 1)];
      c.g.setAttribute('transform', `translate(${lerp(from[0], to[0], k)} ${lerp(from[1], to[1], k)})`); fijo(M, c, 'rotate(-35)'); c.g.setAttribute('opacity', P(t, it - .8, it - .5) * (1 - P(t, vo + .4, vo + .8)));
    });
    aparece('anI', t, it); aparece('anV', t, vo - .3);
  });
}
// ---------- 11 · Londres pide ayuda a la OTAN ----------
{
  const a = S('c9'), dr = AT('c9', 'dato real');
  scene('sOtan', [a - .1, S('c10') - .1, .2, .2, 0], `<svg class="full" id="vOt" viewBox="0 0 1080 1920"></svg>
    ${pill('otA', 'LONDRES → OTAN: AYUDA', 330, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:26px')}${pill('otD', 'DATO REAL', 400, '#2f8f5b')}`);
  const G = globo($('vOt'), { r: 520, cy: 1000, paises: { '826': '#3a5a8a', '056': '#2f5a7a' } });
  const arc = el('path', { fill: 'none', stroke: '#8fd0ff', 'stroke-width': 5 }, G.top);
  const pts = ['londres', 'bruselas'].map(k => { const g = el('g', {}, G.top); el('circle', { r: 9, fill: '#ffd28a' }, g); etiqueta(g, k === 'londres' ? 'LONDRES' : 'BRUSELAS (OTAN)', 16, k === 'londres' ? -10 : 30, { size: 24 }); return { g, k }; });
  RENDER.push(t => {
    if (!on('sOtan')) return;
    const k = io(P(t, a - .1, S('c10')));
    G.update([-lerp(-20, 2, k), -lerp(30, 50, k), 0], lerp(520, 1500, io(P(t, a, a + 2))));
    for (const p of pts) { const xy = G.xy(LUGAR[p.k]); p.g.setAttribute('opacity', xy ? 1 : 0); if (xy) p.g.setAttribute('transform', `translate(${xy[0]} ${xy[1]})`); }
    arc.setAttribute('d', arcoGeo(G.path, LUGAR.londres, LUGAR.bruselas, P(t, a + .4, a + 1.4)) || '');
    aparece('otA', t, a); aparece('otD', t, dr);
  });
}
// ---------- 12 · La OTAN no cubre las Malvinas: solo al norte del Trópico de Cáncer ----------
{
  const a = S('c10'), nc = AT('c10', 'no cubre'), so = AT('c10', 'Solo'), tr = AT('c10', 'Trópico'), y82 = AT('c11', 'mil'), ta = AT('c11', 'tampoco');
  scene('sTro', [a - .1, S('c12') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:#05090f"></div><svg class="full" id="vTr" viewBox="0 0 1080 1920"></svg>
    <div class="card" id="trA" style="left:64px;top:310px;width:820px;padding:20px 26px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">TRATADO DEL ATLÁNTICO NORTE · ARTÍCULO 6</div>
      <div style="font:600 30px/1.25 'Inter Var';margin-top:8px">La defensa mutua cubre territorios al <span style="color:#8fd0ff">norte del Trópico de Cáncer</span></div></div>
    <div id="tr82" class="pill" style="position:absolute;left:64px;top:1020px;background:#c3332b;color:#fff;font-size:34px;opacity:0">1982 · OTAN NO OBLIGADA</div>
    <div id="trHoy" class="pill" style="position:absolute;left:64px;top:1090px;background:#c3332b;color:#fff;font-size:34px;opacity:0">HOY · TAMPOCO</div>`);
  const svg = $('vTr'), proj = d3.geoNaturalEarth1().rotate([30, 0]).fitExtent([[30, 470], [1050, 1000]], { type: 'Sphere' }), path = d3.geoPath(proj);
  el('path', { d: path({ type: 'Sphere' }), fill: '#0a1622', stroke: '#2f4b66', 'stroke-width': 1.5 }, svg);
  el('path', { d: path(d3.geoGraticule().step([30, 30])()), fill: 'none', stroke: '#8fb3cc', 'stroke-opacity': .08 }, svg);
  el('path', { d: path(MAPDATA.land), fill: '#1a222c' }, svg);
  const OTAN = ['008', '056', '100', '124', '191', '203', '208', '233', '246', '250', '276', '300', '348', '352', '380', '428', '440', '442', '499', '528', '807', '578', '616', '620', '642', '703', '705', '724', '752', '792', '826', '840'];
  const og = el('g', { opacity: 0 }, svg);
  for (const f of MAPDATA.countries.features) if (OTAN.includes(f.id)) el('path', { d: path(f), fill: '#2f6f9e' }, og);
  const zona = el('path', { d: path({ type: 'Polygon', coordinates: [[[-179.9, 23.44], [179.9, 23.44], [179.9, 89], [-179.9, 89], [-179.9, 23.44]].reverse()] }), fill: '#3fa0e0', opacity: 0 }, svg);
  const lineaPts = d3.range(-180, 181, 2).map(x => [x, 23.44]);
  const linea = el('path', { d: path({ type: 'LineString', coordinates: lineaPts }), fill: 'none', stroke: '#ffc142', 'stroke-width': 4, 'stroke-dasharray': '2000', 'stroke-dashoffset': 2000 }, svg);
  const [tx, ty] = proj([-120, 23.44]); const tl = etiqueta(svg, 'TRÓPICO DE CÁNCER', tx, ty - 14, { col: '#ffc142', size: 22 }); tl.setAttribute('opacity', 0);
  const [mx, my] = proj(LUGAR.stanley), mal = el('g', { transform: `translate(${mx} ${my})`, opacity: 0 }, svg);
  el('circle', { r: 14, fill: '#ff5148' }, mal); const mr = el('circle', { r: 14, fill: 'none', stroke: '#ff5148', 'stroke-width': 4 }, mal);
  etiqueta(mal, 'MALVINAS: AFUERA', 26, 8, { col: '#ff8a80', size: 26, w: 600 });
  RENDER.push(t => {
    if (!on('sTro')) return;
    $('trA').style.opacity = P(t, so - .2, so + .2);
    og.setAttribute('opacity', P(t, a, a + .5));
    mal.setAttribute('opacity', P(t, nc - .1, nc + .2)); mr.setAttribute('r', 14 + 40 * ((t * 1.1) % 1)); mr.setAttribute('opacity', 1 - ((t * 1.1) % 1));
    linea.setAttribute('stroke-dashoffset', 2000 * (1 - io(P(t, tr - .4, tr + .6)))); tl.setAttribute('opacity', P(t, tr, tr + .3));
    zona.setAttribute('opacity', (.16 * P(t, so, so + .6)).toFixed(3));
    aparece('tr82', t, y82); aparece('trHoy', t, ta);
  });
}
// ---------- 13 · Londres tiene que sentarse a negociar ----------
{
  const a = S('c12'), ne = AT('c12', 'negociar');
  scene('sMesa', [a - .1, S('c13') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1d1712,#060504 70%)"></div><svg class="full" id="vMe" viewBox="0 0 1080 1920"></svg>
    ${pill('meT', 'MESA DE NEGOCIACIÓN', 330, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px')}`);
  const svg = $('vMe');
  el('ellipse', { cx: 540, cy: 860, rx: 330, ry: 400, fill: '#3a2a1e', stroke: '#5a4430', 'stroke-width': 10 }, svg);
  el('ellipse', { cx: 540, cy: 860, rx: 290, ry: 360, fill: 'none', stroke: '#000', 'stroke-opacity': .2, 'stroke-width': 4 }, svg);
  const sillas = [[540, 420], [540, 1300], [180, 860], [900, 860]].map(([x, y]) => el('rect', { x: x - 60, y: y - 40, width: 120, height: 80, rx: 18, fill: '#1a1410', stroke: '#2e241c', 'stroke-width': 4 }, svg));
  const fUK = el('g', {}, svg); banderaUK(fUK, 130); const fAR = el('g', {}, svg); banderaAR(fAR, 130); const fUS = el('g', {}, svg); banderaUS(fUS, 110);
  const papeles = [0, 1, 2].map(i => el('rect', { width: 110, height: 150, fill: '#e9e6df', opacity: 0, transform: `rotate(${(i - 1) * 8})` }, svg));
  RENDER.push(t => {
    if (!on('sMesa')) return;
    aparece('meT', t, a);
    const k = (d) => eo(P(t, a + d, a + d + .5));
    fUK.setAttribute('transform', `translate(475 ${lerp(300, 520, k(.1))})`); fUK.setAttribute('opacity', k(.1));
    fAR.setAttribute('transform', `translate(475 ${lerp(1400, 1120, k(.3))})`); fAR.setAttribute('opacity', k(.3));
    fUS.setAttribute('transform', `translate(${lerp(1100, 760, k(.6))} 830)`); fUS.setAttribute('opacity', k(.6));
    papeles.forEach((p, i) => { const q = eo(P(t, ne - .4 + i * .15, ne + i * .15)); p.setAttribute('opacity', q); p.setAttribute('x', lerp(540, 430 + i * 70, q)); p.setAttribute('y', lerp(400, 780, q)); });
  });
}
// ---------- 14 · ¿Podría pasar? Hoy, no. Pero cada pieza ya existe ----------
{
  const a = S('c13'), ho = AT('c13', 'Hoy'), pz = AT('c13', 'cada pieza');
  scene('sTab2', [a - .1, S('c14') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#14202c,#05080c 70%)"></div>
    <div style="position:absolute;left:90px;top:640px;width:900px;height:900px;perspective:1300px"><div id="t2B" style="position:absolute;inset:0;transform:rotateX(60deg);display:grid;grid-template-columns:repeat(6,1fr);border:6px solid #2a3542">
      ${Array.from({ length: 36 }, (_, i) => `<div style="background:${(i + Math.floor(i / 6)) % 2 ? '#162230' : '#0c141d'}"></div>`).join('')}</div></div>
    <svg class="full" id="vT2" viewBox="0 0 1080 1920"></svg>
    <div id="t2N" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';opacity:0">HOY, <span style="color:#ff5148">NO</span></div>`);
  const svg = $('vT2'), piezas = [];
  [[300, 1010, 'sub'], [520, 960, 'barco'], [760, 1010, 'avion'], [380, 1150, 'AR'], [640, 1130, 'UK'], [860, 1170, 'US']].forEach(([x, y, k], i) => {
    const g = el('g', { transform: `translate(${x} ${y})` }, svg), inner = el('g', {}, g);
    el('ellipse', { rx: 70, ry: 18, fill: '#000', opacity: .45 }, g);
    if (k === 'sub') submarino(el('g', { transform: 'translate(0 -40) scale(.32)' }, inner), { borde: '#5d8ab0' });
    if (k === 'barco') fragata(el('g', { transform: 'translate(0 -30) scale(.28)' }, inner));
    if (k === 'avion') caza(el('g', { transform: 'translate(0 -50) scale(.5)' }, inner));
    const fl = { AR: banderaAR, UK: banderaUK, US: banderaUS }[k];
    if (fl) { el('rect', { x: -3, y: -150, width: 6, height: 150, fill: '#c9ced4' }, inner); fl(el('g', { transform: 'translate(3 -150)' }, inner), 120); }
    const ok = el('g', { opacity: 0 }, g); el('circle', { cx: 0, cy: -190, r: 26, fill: '#4fc483' }, ok); el('path', { d: 'M-12,-190 L-3,-180 L14,-200', stroke: '#06140c', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, ok);
    piezas.push({ ok, t: pz + i * .18 });
  });
  RENDER.push(t => {
    if (!on('sTab2')) return;
    $('t2B').style.transform = `rotateX(60deg) rotateZ(${lerp(8, -8, P(t, a, S('c14')))}deg)`;
    const q = P(t, ho - .1, ho + .2); $('t2N').style.opacity = q * (1 - .5 * P(t, pz - .2, pz + .2));
    for (const p of piezas) { const k = P(t, p.t, p.t + .25); p.ok.setAttribute('opacity', k); p.ok.setAttribute('transform', `scale(${lerp(.5, 1, back(k))})`); }
  });
}
// ---------- 15 · ¿Vos qué creés que haría Londres? ----------
{
  const a = S('c14'), co = AT('c14', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 96px/1.05 'Inter Var';opacity:0">¿QUÉ HARÍA<br><span style="color:#ffc142">LONDRES?</span></div>
    <div id="cL" style="position:absolute;left:64px;top:620px;width:820px"></div>`);
  const L = $('cL'), burb = [];
  for (let i = 0; i < 4; i++) {
    L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  }
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => {
    if (!on('sCom')) return;
    const q = P(t, a, a + .3); $('cQ').style.opacity = q; $('cQ').style.transform = `translateY(${lerp(20, 0, eo(q))}px)`;
    cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; });
  });
}
// ---------- 16 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción política · escenario hipotético</div>
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
