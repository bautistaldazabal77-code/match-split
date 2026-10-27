// "¿Y si…? La crisis del Mar de Scotia" · parte 1 (ficción política). Todo animado, sin fotos.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').
// Todas las escenas se arman en SETUP (después de cargar los mapas) y en orden, así las posteriores quedan encima.

captions([
  ['h1', 'submarino', 'r'], ['h1', 'hundiera', 'r'], ['h1', 'guerra', 'r'], ['h2', 'primera', 'a'], ['h2', 'mapa', 'a'],
  ['c1', 'ficción', 'r'], ['c1', 'política', 'r'], ['c1', 'real', 'g'],
  ['c2', 'mil', 'a'], ['c2', 'novecientos', 'a'], ['c2', 'ochenta', 'a'], ['c2', 'dos', 'a'], ['c2', 'Conqueror', 'r'], ['c2', 'Belgrano', 'a'],
  ['c3', 'fuera', 'r'], ['c3', 'trescientos', 'r'], ['c3', 'veintitrés', 'r'],
  ['c5', 'veinticuatro', 'a'], ['c5', 'F-16', 'a'], ['c5', 'Dinamarca', 'a'], ['c5', 'Washington', 'a'],
  ['c6', 'Trump', 'a'], ['c6', 'Milei', 'a'], ['c6', 'aliados', 'g'], ['c7', 'vigilancia', 'a'], ['c8', 'amenaza', 'r'], ['c8', 'Malvinas', 'a'],
  ['c9', 'detonante', 'r'], ['c10', 'ilegal', 'r'], ['c10', 'doscientas', 'a'], ['c10', 'millas', 'a'],
  ['c11', 'Lucas', 'a'], ['c11', 'veintitrés', 'a'], ['c12', 'Tres', 'a'], ['c12', 'diez', 'a'], ['c12', 'rápido', 'r'],
  ['c13', 'torpedo', 'r'], ['c14', 'Impacta', 'r'], ['c14', 'hunde', 'r'], ['c15', 'internacionales', 'a'], ['c15', 'Cientos', 'a'],
  ['c16', 'Nadie', 'r'], ['c17', 'Casa', 'a'], ['c17', 'Rosada', 'a'], ['c17', 'Washington', 'a'], ['c18', 'todo', 'r'],
], { max: 3, chars: 15 });
hud({
  serie: '¿Y SI…? · PARTE 1', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'HORA', hide: S('outro') + .2,
  horas: [[S('c12') - .1, '03:10'], [S('c17') - .1, '03:52', true]],
});
CAPS_OFF(S('outro'), TL.duration + 1);

SETUP.push(() => {
// ---------- 1 · Gancho: el submarino dispara a la fragata ----------
{
  const t1 = AT('h1', 'hundiera'), imp = AT('h1', 'guerra') + .15, YS = 470;
  scene('sAbre', [-1, AT('h2', 'No') - .05, .01, .15, 1.06], `<svg class="full" id="vA" viewBox="0 0 1080 1920"></svg><div id="aFl" style="position:absolute;inset:0;background:#fff6dd;opacity:0"></div>`);
  const svg = $('vA'), mar = marCostado(svg, YS, { seed: 2 });
  const fr = el('g', {}, svg); fragata(fr, { luces: true });
  const sub = el('g', {}, svg); submarino(sub, { col: '#26313d', borde: '#5d8ab0' });
  const trail = el('g', {}, svg), tor = el('g', {}, svg); torpedo(tor); const bub = burbujas(trail, 50);
  const ex = el('g', {}, svg), boom = explosionAgua(ex);
  const A = [700, 1020], B = [600, YS + 40];
  const ruta = u => [lerp(A[0], B[0], u), lerp(A[1], B[1], u) + Math.sin(u * 3) * 30];
  RENDER.push(t => {
    if (!on('sAbre')) return;
    mar(t);
    const hit = P(t, imp, imp + 2.2), [sx, sy] = shake(t, 14 * P(t, imp, imp + .05) * (1 - P(t, imp, imp + 1)));
    fr.setAttribute('transform', `translate(${560 + sx} ${YS + 3 * Math.sin(t * 1.6) - 30 * Math.sin(Math.PI * clamp(hit * 2)) + sy}) rotate(${(-1.5 * Math.sin(t * 1.2) + 6 * hit).toFixed(2)}) scale(.82)`);
    sub.setAttribute('transform', `translate(${lerp(260, 330, P(t, 0, 4))} 1020) scale(.95)`);
    const u = io(P(t, t1, imp));
    const [x, y] = ruta(u), [x2, y2] = ruta(Math.min(1, u + .01));
    tor.setAttribute('transform', `translate(${x} ${y}) rotate(${(Math.atan2(y2 - y, x2 - x) * 180 / Math.PI).toFixed(1)}) scale(1.3)`);
    tor.setAttribute('opacity', t > t1 && t < imp ? 1 : 0);
    bub(ruta, t < imp ? u : 1, .3);
    trail.setAttribute('opacity', 1 - P(t, imp, imp + 1));
    ex.setAttribute('transform', `translate(${B[0]} ${YS + 10})`); boom(P(t, imp, imp + 1.8));
    $('aFl').style.opacity = (.85 * P(t, imp, imp + .04) * (1 - P(t, imp + .05, imp + .7))).toFixed(3);
  });
}
// ---------- 2 · 1982 ----------
{
  const a = AT('h2', 'No'), b = AT('h2', 'Y esta');
  scene('s1982', [a - .05, b - .05, .1, .15, 1.08], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#2a0a08,#060304 70%)"></div>
    <div style="position:absolute;left:0;right:0;top:520px;text-align:center"><div id="yN" style="font:900 300px/1 'Inter Var';letter-spacing:-.04em;color:#ff5148">1982</div>
    <div id="yS" class="lbl" style="position:static;margin-top:20px;font-size:30px;color:#e9e6df">no sería la primera vez</div></div>`);
  RENDER.push(t => { if (!on('s1982')) return; const q = P(t, a - .1, a + .15); $('yN').style.opacity = q; $('yN').style.transform = `scale(${lerp(1.6, 1, eo(q))})`; $('yS').style.opacity = P(t, a + .4, a + .7); });
}
// ---------- 3 · El mapa del Atlántico Sur ----------
{
  const a = AT('h2', 'Y esta'), m = AT('h2', 'mapa');
  scene('sMapa0', [a - .1, S('c1') - .1, .2, .2, 0], `<svg class="full" id="vM0" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaSur($('vM0')), mv = marca(M, LUGAR.stanley);
  el('circle', { r: 30, fill: 'none', stroke: '#ff5148', 'stroke-width': 4 }, mv.inner); etiqueta(mv.inner, 'MALVINAS', 44, 10, { col: '#ff8a80' });
  const ar = marca(M, [-66, -38]); etiqueta(ar.inner, 'ARGENTINA', 0, 0, { col: '#8fb3cc', size: 30, anchor: 'middle', ls: 8 });
  const at = marca(M, [-52, -42]); etiqueta(at.inner, 'ATLÁNTICO SUR', 0, 0, { col: '#5d7d99', size: 28, anchor: 'middle', ls: 8 });
  const scan = el('rect', { x: -2000, y: 0, width: 5000, height: 8, fill: '#ffc142', opacity: 0 }, M.top);
  RENDER.push(t => {
    if (!on('sMapa0')) return;
    const k = io(P(t, a - .1, S('c1')));
    camMapa(M, lerp(-60, -58, k), lerp(-49, -46, k), lerp(1.6, .8, k));
    for (const x of [mv, ar, at]) fijo(M, x);
    mv.inner.firstChild.setAttribute('r', 22 + 14 * ((t * 1.3) % 1));
    const s = P(t, m - .2, m + 1.2); scan.setAttribute('opacity', s > 0 && s < 1 ? .5 : 0);
    const [, y0] = M.proj([-60, -32]), [, y1] = M.proj([-60, -58]); scan.setAttribute('y', lerp(y0, y1, s)); scan.setAttribute('height', 8 / (M.z || 1));
  });
}
// ---------- 4 · Ficción política, pero cada pieza es real: el tablero ----------
{
  const a = S('c1'), pz = AT('c1', 'cada pieza');
  scene('sTab', [a - .1, S('c2') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#14202c,#05080c 70%)"></div>
    <div style="position:absolute;left:90px;top:640px;width:900px;height:900px;perspective:1300px"><div id="tbB" style="position:absolute;inset:0;transform:rotateX(60deg) rotateZ(0deg);transform-origin:50% 50%;display:grid;grid-template-columns:repeat(6,1fr);border:6px solid #2a3542;box-shadow:0 0 120px rgba(80,140,200,.2)">
      ${Array.from({ length: 36 }, (_, i) => `<div style="background:${(i + Math.floor(i / 6)) % 2 ? '#162230' : '#0c141d'}"></div>`).join('')}</div></div>
    <svg class="full" id="vT" viewBox="0 0 1080 1920"></svg>
    <div id="tbF" style="position:absolute;left:0;right:0;top:330px;text-align:center;font:900 92px/1 'Inter Var';color:#ff5148;letter-spacing:.02em;opacity:0">FICCIÓN<br>POLÍTICA</div>`);
  const svg = $('vT'), piezas = [];
  const P0 = [[300, 1010, 'sub'], [520, 960, 'barco'], [760, 1010, 'avion'], [380, 1150, 'AR'], [640, 1130, 'UK'], [860, 1170, 'US']];
  P0.forEach(([x, y, k], i) => {
    const g = el('g', {}, svg), inner = el('g', {}, g);
    el('ellipse', { cx: 0, cy: 0, rx: 70, ry: 18, fill: '#000', opacity: .45 }, g);
    if (k === 'sub') { const s = el('g', { transform: 'translate(0 -40) scale(.32)' }, inner); submarino(s, { borde: '#5d8ab0' }); }
    if (k === 'barco') { const s = el('g', { transform: 'translate(0 -30) scale(.28)' }, inner); fragata(s); }
    if (k === 'avion') { const s = el('g', { transform: 'translate(0 -50) scale(.5)' }, inner); caza(s); }
    if (k === 'AR') { el('rect', { x: -3, y: -150, width: 6, height: 150, fill: '#c9ced4' }, inner); const f = el('g', { transform: 'translate(3 -150)' }, inner); banderaAR(f, 120); }
    if (k === 'UK') { el('rect', { x: -3, y: -150, width: 6, height: 150, fill: '#c9ced4' }, inner); const f = el('g', { transform: 'translate(3 -150)' }, inner); banderaUK(f, 120); }
    if (k === 'US') { el('rect', { x: -3, y: -150, width: 6, height: 150, fill: '#c9ced4' }, inner); const f = el('g', { transform: 'translate(3 -150)' }, inner); banderaUS(f, 120); }
    piezas.push({ g, inner, x, y, t: pz + i * .22 });
  });
  RENDER.push(t => {
    if (!on('sTab')) return;
    $('tbB').style.transform = `rotateX(60deg) rotateZ(${lerp(-8, 8, P(t, a, S('c2')))}deg)`;
    const f = P(t, AT('c1', 'ficción') - .05, AT('c1', 'ficción') + .2); $('tbF').style.opacity = f * (1 - .6 * P(t, pz - .3, pz)); $('tbF').style.transform = `scale(${lerp(1.5, 1, eo(f))})`;
    for (const p of piezas) {
      const k = P(t, p.t, p.t + .35);
      p.g.setAttribute('transform', `translate(${p.x} ${p.y})`); p.g.setAttribute('opacity', k > 0 ? 1 : 0);
      p.inner.setAttribute('transform', `translate(0 ${(-500 * (1 - k * k)).toFixed(1)})`);
    }
  });
}
// ---------- 5 · El Belgrano: 1982, fuera de la zona de exclusión ----------
{
  const a = S('c2'), tp = AT('c2', 'torpedea'), zo = AT('c3', 'zona'), fu = AT('c3', 'Estaba'), b = AT('c3', 'Murieron') - .1;
  scene('sBel', [a - .1, b, .2, .2, 0], `<svg class="full" id="vB" viewBox="0 0 1080 1920"></svg>
    <div id="bF" class="card" style="left:64px;top:330px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">2 DE MAYO DE 1982</div><div style="font:800 40px 'Inter Var';margin-top:6px">Crucero General Belgrano</div></div>
    ${pill('bX', 'FUERA DE LA ZONA', 470)}`);
  const M = mapaSur($('vB'));
  const tez = circuloGeo(M, LUGAR.tez, MN200, { fill: 'rgba(224,67,58,.10)', stroke: '#ff5148', 'stroke-width': 3, 'stroke-dasharray': '12 9', opacity: 0 });
  const tl = marca(M, [-59.5, -48.2]); etiqueta(tl.inner, 'ZONA DE EXCLUSIÓN · 200 MILLAS', 0, 0, { col: '#ff8a80', size: 22, anchor: 'middle' });
  const bel = marca(M, [-62.7, -55.0]), con = marca(M, [-63.6, -55.6]);
  iconoBarco(bel.inner, '#c9ced4', 2.4); iconoSub(con.inner, '#ff5148', 2.1);
  const bl = el('text', { x: 0, y: -26, fill: '#c9ced4', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'text-anchor': 'middle' }, bel.inner); bl.textContent = 'BELGRANO';
  const cl = el('text', { x: -40, y: 8, fill: '#ff8a80', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'text-anchor': 'end' }, con.inner); cl.textContent = 'CONQUEROR';
  const tr = el('line', { stroke: '#ff5148', 'stroke-width': 3, 'stroke-dasharray': '8 6', 'vector-effect': 'non-scaling-stroke' }, M.top);
  const ring = el('circle', { r: 0, fill: 'none', stroke: '#ffc142', 'stroke-width': 4 }, bel.inner);
  const pB = (t) => { const k = P(t, a, tp + .4); return [lerp(-63.4, LUGAR.belgrano[0], k), lerp(-54.6, LUGAR.belgrano[1], k)]; };
  const pC = (t) => { const k = P(t, a, tp); return [lerp(-64.6, -62.6, k), lerp(-55.5, -55.75, k)]; };
  RENDER.push(t => {
    if (!on('sBel')) return;
    const z = io(P(t, fu - .4, zo + .6));
    camMapa(M, lerp(-62.4, -60.3, z), lerp(-55.3, -52.0, z), lerp(2.6, 1.45, z), -160);
    const b0 = M.proj(pB(t)), c0 = M.proj(pC(t));
    bel.g.setAttribute('transform', `translate(${b0[0]} ${b0[1]})`); con.g.setAttribute('transform', `translate(${c0[0]} ${c0[1]})`);
    fijo(M, bel); fijo(M, con); fijo(M, tl);
    const ti = P(t, tp, tp + .7);
    tr.setAttribute('x1', c0[0]); tr.setAttribute('y1', c0[1]); tr.setAttribute('x2', lerp(c0[0], b0[0], ti)); tr.setAttribute('y2', lerp(c0[1], b0[1], ti)); tr.setAttribute('opacity', ti > 0 ? 1 - P(t, tp + 2, tp + 3) : 0);
    const h = P(t, tp + .7, tp + 2.2); ring.setAttribute('r', 10 + 60 * h); ring.setAttribute('opacity', h > 0 && h < 1 ? 1 - h : 0);
    $('bF').style.opacity = P(t, a, a + .3) * (1 - P(t, zo - .5, zo - .2));
    tez.setAttribute('opacity', P(t, zo - .3, zo + .3)); tl.g.setAttribute('opacity', P(t, zo, zo + .3));
    aparece('bX', t, AT('c3', 'fuera'));
  });
}
// ---------- 6 · 323 ----------
{
  const a = AT('c3', 'Murieron'), n = AT('c3', 'veintitrés');
  scene('s323', [a - .1, S('c4') - .1, .2, .25, 1.04], `<svg class="full" id="v323" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:0;right:0;top:330px;text-align:center"><div id="nN" class="mono" style="font-size:190px;line-height:1;color:#fff">0</div>
    <div class="lbl" style="position:static;margin-top:10px;color:#cfd3d8;font-size:26px">argentinos muertos</div></div>`);
  const svg = $('v323'), mar = marCostado(svg, 900, { seed: 7, alba: true }), cr = el('g', {}, svg); crucero(cr);
  el('rect', { x: -100, y: 908, width: 1300, height: 1100, fill: '#0b2738', opacity: .82 }, svg);
  RENDER.push(t => {
    if (!on('s323')) return;
    mar(t);
    const k = P(t, a - .1, S('c4') + .5);
    cr.setAttribute('transform', `translate(${540 - 40 * k} ${900 + 160 * k * k}) rotate(${(-4 - 14 * k).toFixed(2)}) scale(.95)`);
    $('nN').textContent = Math.round(323 * eo(P(t, a, n + .3)));
  });
}
// ---------- 7 · Hoy: 24 F-16 de Dinamarca, con la aprobación de Washington ----------
{
  const a = S('c4'), co = AT('c5', 'compró'), vt = AT('c5', 'veinticuatro'), ap = AT('c5', 'con la aprobación');
  scene('sF16', [a - .1, S('c6') - .1, .2, .2, 0], `<svg class="full" id="vF" viewBox="0 0 1080 1920"></svg>
    <div id="fH" style="position:absolute;left:64px;top:320px;font:900 120px/1 'Inter Var';color:#fff;opacity:0">HOY</div>
    <div id="fC" class="card" style="left:64px;top:320px;width:620px;padding:22px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.18em">2024 · DINAMARCA → ARGENTINA</div>
      <div style="font:900 64px 'Inter Var';margin-top:4px"><span id="fN">0</span> × F-16</div><div id="fA" style="font:600 28px 'Inter Var';color:#5ee093;margin-top:4px;opacity:0">✓ con la aprobación de EE.UU.</div></div>
    <svg id="vJet" viewBox="-170 -70 340 120" style="position:absolute;left:640px;top:330px;width:380px;opacity:0"></svg>`);
  caza($('vJet'));
  const G = globo($('vF'), { r: 470, cy: 1000, paises: { '208': '#c9a227', '032': '#3d6f9e', '840': '#2f5a7a' } });
  const arc = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 4 }, G.top), arc2 = el('path', { fill: 'none', stroke: '#5ee093', 'stroke-width': 3, 'stroke-dasharray': '8 8' }, G.top);
  const jets = []; for (let i = 0; i < 8; i++) { const g = el('g', {}, G.top); iconoAvion(g, '#ffc142', 1.1); jets.push(g); }
  const it = d3.geoInterpolate(LUGAR.copenhague, LUGAR.ba);
  RENDER.push(t => {
    if (!on('sF16')) return;
    const k = io(P(t, a, S('c6')));
    G.update([-lerp(5, -50, k), -lerp(45, -5, k), 0]);
    $('fH').style.opacity = P(t, a, a + .2) * (1 - P(t, co - .5, co - .2));
    $('fC').style.opacity = P(t, co - .3, co); $('fN').textContent = Math.round(24 * P(t, vt, vt + .8));
    $('vJet').style.opacity = P(t, AT('c5', 'cazas') - .1, AT('c5', 'cazas') + .3); $('vJet').style.transform = `translateX(${lerp(60, 0, eo(P(t, AT('c5', 'cazas'), AT('c5', 'cazas') + .6)))}px)`;
    $('fA').style.opacity = P(t, ap, ap + .3);
    arc.setAttribute('d', arcoGeo(G.path, LUGAR.copenhague, LUGAR.ba, P(t, co, co + 1.6)));
    arc2.setAttribute('d', ap < t ? arcoGeo(G.path, LUGAR.dc, it(.55), P(t, ap, ap + 1)) : '');
    jets.forEach((g, i) => {
      const u = ((t - co) * .25 + i / jets.length) % 1, ll = it(u), p = G.xy(ll), p2 = G.xy(it(Math.min(1, u + .01)));
      if (!p || !p2 || t < co + .4) { g.setAttribute('opacity', 0); return; }
      g.setAttribute('opacity', 1); g.setAttribute('transform', `translate(${p[0]} ${p[1]}) rotate(${Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 180 / Math.PI})`);
    });
  });
}
// ---------- 8 · Aliados: Washington y Buenos Aires ----------
{
  const a = S('c6');
  scene('sAli', [a - .1, S('c7') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#050a12,#0c1420)"></div><svg class="full" id="vAl" viewBox="0 0 1080 1920"></svg>`);
  const svg = $('vAl');
  const cb = el('g', { transform: 'translate(330 640) scale(.62)' }, svg); casaBlanca(cb);
  const cr = el('g', { transform: 'translate(700 1110) scale(.52)' }, svg); casaRosada(cr);
  const fu = el('g', { transform: 'translate(230 380)' }, svg); banderaUS(fu, 120);
  const fa = el('g', { transform: 'translate(800 830)' }, svg); banderaAR(fa, 120);
  etiqueta(svg, 'TRUMP · WASHINGTON', 330, 700, { anchor: 'middle', col: '#cfd3d8' }); etiqueta(svg, 'MILEI · BUENOS AIRES', 700, 1160, { anchor: 'middle', col: '#cfd3d8' });
  const lk = el('path', { d: 'M420,560 C700,620 760,760 700,900', fill: 'none', stroke: '#5ee093', 'stroke-width': 6, 'stroke-dasharray': '700', 'stroke-dashoffset': 700 }, svg);
  const dots = []; for (let i = 0; i < 5; i++) dots.push(el('circle', { r: 7, fill: '#9cf5c0' }, svg));
  RENDER.push(t => {
    if (!on('sAli')) return;
    lk.setAttribute('stroke-dashoffset', 700 * (1 - io(P(t, AT('c6', 'aliados') - .5, AT('c6', 'aliados') + .3))));
    const L = lk.getTotalLength();
    dots.forEach((d, i) => { const u = ((t * .5 + i / 5) % 1), p = lk.getPointAtLength(u * L); d.setAttribute('cx', p.x); d.setAttribute('cy', p.y); d.setAttribute('opacity', P(t, AT('c6', 'aliados'), AT('c6', 'aliados') + .3)); });
  });
}
// ---------- 9 · Imaginemos: EE.UU. le confía a la Argentina la vigilancia del Atlántico Sur ----------
{
  const a = S('c7'), cf = AT('c7', 'Estados Unidos');
  scene('sVig', [a - .1, S('c8') - .1, .2, .2, 0], `<svg class="full" id="vV" viewBox="0 0 1080 1920"></svg>${pill('vI', 'IMAGINEMOS · FICCIÓN', 330)}
    <div id="vL" class="lbl" style="left:64px;top:400px;color:#8fd0ff;font-size:24px;opacity:0">vigilancia del atlántico sur</div>`);
  const M = mapaSur($('vV'));
  const clip = el('clipPath', { id: 'vigClip' }, el('defs', {}, $('vV'))), cc = el('circle', { r: 0 }, clip);
  const [ox, oy] = M.proj([-64, -44]); cc.setAttribute('cx', ox); cc.setAttribute('cy', oy);
  const zona = el('path', { d: M.path({ type: 'Polygon', coordinates: [[[-67, -35], [-30, -35], [-30, -62], [-70, -62], [-67, -35]].reverse()] }), fill: '#3fa0e0', opacity: .22, 'clip-path': 'url(#vigClip)' }, M.capa);
  const pat = []; const r = rnd(4);
  for (let i = 0; i < 9; i++) { const m = marca(M, [-56 + r() * 18, -40 - r() * 18]); (i % 2 ? iconoBarco : iconoAvion)(m.inner, '#8fd0ff', 2.1); pat.push({ m, ll: m.xy, a: r() * 6, R: 30 + r() * 50 }); }
  RENDER.push(t => {
    if (!on('sVig')) return;
    camMapa(M, -55, -48, lerp(.95, .8, P(t, a, S('c8'))));
    aparece('vI', t, a); $('vL').style.opacity = P(t, cf + .4, cf + .8);
    cc.setAttribute('r', 2600 * io(P(t, cf, AT('c7', 'Atlántico') + .5)));
    for (const p of pat) {
      const ang = p.a + t * .6, x = p.ll[0] + Math.cos(ang) * p.R, y = p.ll[1] + Math.sin(ang) * p.R;
      p.m.g.setAttribute('transform', `translate(${x} ${y})`); fijo(M, p.m, `rotate(${(ang * 180 / Math.PI + 90).toFixed(1)})`);
      p.m.g.setAttribute('opacity', P(t, cf + .6, cf + 1));
    }
  });
}
// ---------- 10 · En Londres, eso suena a amenaza sobre las Malvinas ----------
{
  const a = S('c8'), am = AT('c8', 'amenaza');
  scene('sLon', [a - .1, S('c9') - .1, .2, .2, 0], `<svg class="full" id="vL2" viewBox="0 0 1080 1920"></svg>${pill('lA', '⚠ AMENAZA', 330)}`);
  const M = mapaSur($('vL2'));
  const st = marca(M, LUGAR.stanley); const f = el('g', { transform: 'translate(-60 -120)' }, st.inner);
  el('rect', { x: 0, y: 0, width: 4, height: 90, fill: '#c9ced4', transform: 'translate(-4 0)' }, f); banderaUK(f, 110);
  const rings = [0, 1, 2].map(() => el('circle', { r: 0, fill: 'none', stroke: '#ff5148', 'stroke-width': 4 }, st.inner));
  etiqueta(st.inner, 'MALVINAS', 0, 70, { anchor: 'middle', col: '#ff8a80', size: 30 });
  const ar = []; const r = rnd(6);
  for (let i = 0; i < 6; i++) { const m = marca(M, [-62 + r() * 3, -49 - r() * 5]); iconoBarco(m.inner, '#8fd0ff', 1.3); ar.push(m); }
  RENDER.push(t => {
    if (!on('sLon')) return;
    camMapa(M, lerp(-60.5, -59, P(t, a, S('c9'))), -51.5, lerp(2.2, 2.8, io(P(t, a, S('c9')))));
    fijo(M, st); ar.forEach(m => fijo(M, m, 'rotate(0)'));
    rings.forEach((c, i) => { const u = ((t - am) * .8 + i / 3) % 1; c.setAttribute('r', 20 + u * 120); c.setAttribute('opacity', t > am - .2 ? (1 - u) : 0); });
    aparece('lA', t, am);
  });
}
// ---------- 11 · El detonante ----------
{
  const a = S('c9');
  scene('sDet', [a - .1, S('c10') - .1, .15, .2, 1.08], `<div style="position:absolute;inset:0;background:#050304"></div>
    <div style="position:absolute;left:64px;top:700px;width:860px"><div id="dL" style="height:6px;background:#e0433a;width:0"></div>
    <div id="dT" style="font:900 120px/1 'Inter Var';margin-top:30px;letter-spacing:-.02em;opacity:0">EL<br><span style="color:#ff5148">DETONANTE</span></div></div>`);
  RENDER.push(t => { if (!on('sDet')) return; $('dL').style.width = 860 * eo(P(t, a, a + .5)) + 'px'; const q = P(t, AT('c9', 'detonante') - .2, AT('c9', 'detonante') + .2); $('dT').style.opacity = q; $('dT').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`; });
}
// ---------- 12 · La fragata patrulla en el borde de las 200 millas ----------
{
  const a = S('c10'), pe = AT('c10', 'pesca'), zo = AT('c10', 'zona'), dm = AT('c10', 'doscientas');
  scene('sPat', [a - .1, S('c11') - .1, .2, .2, 0], `<svg class="full" id="vP" viewBox="0 0 1080 1920"></svg>
    ${pill('pF', 'FRAGATA ARGENTINA · FICTICIA', 330, 'rgba(9,12,17,.85)', 'border:1px solid #4a6a8a;font-size:26px')}
    ${pill('pP', 'PESQUEROS ILEGALES', 400, '#8a5a12', 'font-size:26px')}`);
  const M = mapaSur($('vP'));
  const iy = M.borde.findIndex(p => p[1] <= -42.6), PT = M.borde[iy];
  const luces = []; const r = rnd(12);
  for (let i = 0; i < 70; i++) { const p = M.borde[Math.floor(iy - 20 + r() * 40)]; const m = marca(M, [p[0] + .25 + r() * 1.1, p[1] + (r() - .5) * .2]); el('circle', { r: 3.5, fill: '#ffe08a' }, m.inner); luces.push({ m, d: r() }); }
  const fr = marca(M, PT); iconoBarco(fr.inner, '#8fd0ff', 2);
  const son = el('circle', { r: 0, fill: 'none', stroke: '#8fd0ff', 'stroke-width': 3 }, fr.inner);
  const [cx, cy] = M.proj([-63.6, -42.7]), [ex, ey] = M.proj(PT);
  const reg = el('g', { opacity: 0 }, M.top); const rl = el('line', { x1: cx, y1: cy, x2: ex, y2: ey, stroke: '#ffc142', 'stroke-width': 3, 'vector-effect': 'non-scaling-stroke' }, reg);
  const rt = marca(M, [(-63.6 + PT[0]) / 2, -42.2]); etiqueta(rt.inner, '200 MILLAS', 0, 0, { anchor: 'middle', col: '#ffc142', size: 28, w: 600 });
  RENDER.push(t => {
    if (!on('sPat')) return;
    camMapa(M, lerp(-61, -60.4, P(t, a, S('c11'))), lerp(-44.5, -43, P(t, a, S('c11'))), lerp(1.7, 2.4, io(P(t, a, S('c11')))));
    M.zee.setAttribute('opacity', P(t, zo - .2, zo + .4));
    const u = P(t, a - .2, S('c11') + .5), i = Math.round(lerp(iy + 14, iy, u)), p = M.borde[Math.max(0, i)], p2 = M.borde[Math.max(0, i - 1)];
    const [x, y] = M.proj([p[0] - .12, p[1]]), [x2, y2] = M.proj([p2[0] - .12, p2[1]]);
    fr.g.setAttribute('transform', `translate(${x} ${y})`); fijo(M, fr, `rotate(${Math.atan2(y2 - y, x2 - x) * 180 / Math.PI})`);
    son.setAttribute('r', 10 + 50 * ((t * .9) % 1)); son.setAttribute('opacity', 1 - ((t * .9) % 1));
    for (const l of luces) { fijo(M, l.m); l.m.g.setAttribute('opacity', (P(t, pe - .2 + l.d * .5, pe + l.d * .5) * (.6 + .4 * Math.sin(t * 5 + l.d * 20))).toFixed(3)); }
    aparece('pF', t, AT('c10', 'fragata')); aparece('pP', t, pe);
    reg.setAttribute('opacity', P(t, dm - .1, dm + .3)); fijo(M, rt); rt.g.setAttribute('opacity', P(t, dm, dm + .3));
  });
}
// ---------- 13 · Lucas ----------
{
  const a = S('c11');
  scene('sLuc', [a - .1, S('c12') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#1a0606,#080304)"></div>
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 160px,rgba(255,80,60,.05) 160px 170px)"></div>
    <div id="lB" style="position:absolute;left:250px;top:560px;width:560px;height:653px">${busto({ ropa: '#1d2c47', gorro: '#13161c', parche: true, barba: .12, halo: '#ff5148' })}</div>
    <div class="card" id="lC" style="left:64px;top:300px;width:700px;padding:28px 34px">
      <div class="lbl" style="position:static;color:var(--amber);font-size:22px">personaje ficticio · a bordo</div>
      <div id="lN" style="font:900 108px/1 'Inter Var';letter-spacing:-.02em;margin-top:10px">LUCAS</div>
      <div id="lE" style="font:600 40px 'Inter Var';color:#cfd3d8;margin-top:12px">23 años · cabo de la Armada</div>
      <div id="lP" class="pill" style="margin-top:16px;background:rgba(255,178,62,.16);color:var(--amber);border:2px solid rgba(255,178,62,.5);font-size:28px">PRIMERA PATRULLA</div></div>`);
  const at = [AT('c11', 'Lucas'), AT('c11', 'veintitrés'), AT('c11', 'primera')];
  RENDER.push(t => {
    if (!on('sLuc')) return;
    const k = eo(P(t, a, a + .7)); $('lB').style.transform = `translateY(${lerp(120, 0, k)}px)`; $('lB').style.opacity = k;
    $('lC').style.opacity = P(t, a, a + .4);
    ['lN', 'lE', 'lP'].forEach((id, i) => { const q = eo(P(t, at[i] - .1, at[i] + .25)); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(16, 0, q)}px)`; });
  });
}
// ---------- 14 · 3:10, el sonar detecta algo ----------
{
  const a = S('c12'), de = AT('c12', 'detecta'), ra = AT('c12', 'rápido');
  scene('sSon', [a - .1, S('c13') - .1, .2, .1, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#08140f,#020504 70%)"></div>
    <div style="position:absolute;left:160px;top:340px">${sonarHTML('sonar')}</div>${pill('sC', 'CONTACTO · SE ACERCA RÁPIDO', 1110, '#c3332b', 'font-size:28px')}`);
  const sw = $$('#sonar .sw'), bl = $$('#sonar .bl');
  RENDER.push(t => {
    if (!on('sSon')) return;
    sw.style.transform = `rotate(${(t * 220) % 360}deg)`;
    const u = P(t, de, S('c13') + .2), ang = -40 * Math.PI / 180, R = lerp(360, 60, u * u);
    bl.style.left = (380 + Math.cos(ang) * R) + 'px'; bl.style.top = (380 + Math.sin(ang) * R) + 'px';
    bl.style.opacity = t > de ? (Math.floor(t * 4) % 2 ? .55 : 1) : 0;
    aparece('sC', t, ra);
    const [sx, sy] = shake(t, 3 * P(t, ra, ra + .3), 20); $('sonar').style.transform = `translate(${sx}px,${sy}px)`;
  });
}
// ---------- 15 · Un torpedo pesado ----------
{
  const a = S('c13');
  scene('sTor', [a - .1, S('c14') - .05, .15, .1, 0], `<svg class="full" id="vTo" viewBox="0 0 1080 1920"></svg>${pill('tT', 'TORPEDO PESADO', 330)}`);
  const svg = $('vTo'), mar = marCostado(svg, 380, { seed: 9 });
  const fr = el('g', {}, svg); fragata(fr, { luces: true });
  const trail = el('g', {}, svg), tor = el('g', {}, svg); torpedo(tor); const bub = burbujas(trail, 60, 8);
  const lines = []; for (let i = 0; i < 14; i++) lines.push(el('rect', { height: 3, width: 120, fill: '#cfeaff', opacity: .25 }, svg));
  RENDER.push(t => {
    if (!on('sTor')) return;
    mar(t);
    fr.setAttribute('transform', `translate(${lerp(820, 760, P(t, a, S('c14')))} ${380 + 3 * Math.sin(t * 1.6)}) scale(1.1)`);
    const u = P(t, a - .2, S('c14') + .1), ruta = v => [lerp(-80, 700, v), lerp(1100, 470, v)];
    const [x, y] = ruta(u); tor.setAttribute('transform', `translate(${x} ${y}) rotate(-39) scale(2.6)`);
    bub(ruta, u, .25);
    lines.forEach((l, i) => { const k = ((t * 2.5 + i / 14) % 1); l.setAttribute('x', lerp(900, -200, k)); l.setAttribute('y', 600 + i * 50); l.setAttribute('transform', 'rotate(-39 540 900)'); });
    aparece('tT', t, AT('c13', 'torpedo'));
  });
}
// ---------- 16 · Impacto: la fragata se parte y se hunde ----------
{
  const a = S('c14'), hu = AT('c14', 'hunde'), mi = AT('c14', 'minutos');
  scene('sImp', [a - .05, S('c15') - .1, .05, .25, 0], `<svg class="full" id="vImp" viewBox="0 0 1080 1920"></svg><div id="iFl" style="position:absolute;inset:0;background:#fff3d6;opacity:0"></div>${pill('iM', 'EN MINUTOS', 330)}`);
  const svg = $('vImp'), YS = 760, mar = marCostado(svg, YS, { seed: 4 });
  const d = el('defs', {}, svg);
  const cl = el('clipPath', { id: 'iL' }, d); el('rect', { x: -400, y: -400, width: 400, height: 800 }, cl);
  const cr = el('clipPath', { id: 'iR' }, d); el('rect', { x: 0, y: -400, width: 400, height: 800 }, cr);
  const L = el('g', {}, svg), R = el('g', {}, svg);
  const Li = el('g', { 'clip-path': 'url(#iL)' }, L), Ri = el('g', { 'clip-path': 'url(#iR)' }, R); fragata(Li, { luces: true }); fragata(Ri, { luces: true });
  const fuego = el('g', { opacity: 0 }, svg); const r = rnd(3), llamas = [];
  for (let i = 0; i < 18; i++) llamas.push({ c: el('circle', { r: 10 + r() * 22, fill: i % 3 ? '#ff8a2a' : '#ffd25a', opacity: .8 }, fuego), x: (r() - .5) * 80, s: r() });
  const humo = []; for (let i = 0; i < 16; i++) humo.push({ c: el('circle', { r: 20, fill: '#2a2d33', opacity: 0 }, svg), d: r(), x: (r() - .5) * 60 });
  const ex = el('g', { transform: `translate(540 ${YS + 20})` }, svg), boom = explosionAgua(ex);
  const agua = el('rect', { x: -100, y: YS + 6, width: 1300, height: 1200, fill: '#08202f', opacity: .55 }, svg);
  RENDER.push(t => {
    if (!on('sImp')) return;
    mar(t);
    const k = P(t, a + .05, hu + .6), lift = Math.sin(Math.PI * clamp(P(t, a, a + .8))) * 40, br = eo(P(t, a + .3, a + 2));
    const sink = io(P(t, mi - .5, hu + .6));
    const [sx, sy] = shake(t, 16 * P(t, a, a + .05) * (1 - P(t, a, a + 1.2)));
    L.setAttribute('transform', `translate(${540 - 30 * br + sx} ${YS - lift + 260 * sink + sy}) rotate(${(-10 * br - 14 * sink).toFixed(2)}) scale(.95)`);
    R.setAttribute('transform', `translate(${540 + 30 * br + sx} ${YS - lift + 300 * sink + sy}) rotate(${(12 * br + 20 * sink).toFixed(2)}) scale(.95)`);
    boom(P(t, a, a + 1.8));
    $('iFl').style.opacity = (.9 * P(t, a, a + .04) * (1 - P(t, a + .05, a + .6))).toFixed(3);
    fuego.setAttribute('opacity', P(t, a + .4, a + .9) * (1 - P(t, hu, hu + .8))); fuego.setAttribute('transform', `translate(540 ${YS - 40 + 260 * sink})`);
    for (const l of llamas) { const f = (t * 1.5 + l.s) % 1; l.c.setAttribute('cx', l.x); l.c.setAttribute('cy', -f * 90); l.c.setAttribute('opacity', (.85 * (1 - f)).toFixed(3)); }
    for (const h of humo) { const f = ((t - a) * .35 + h.d) % 1; h.c.setAttribute('cx', 540 + h.x + f * 120); h.c.setAttribute('cy', YS - 80 - f * 600); h.c.setAttribute('r', 20 + f * 90); h.c.setAttribute('opacity', t > a + .5 ? (.5 * (1 - f)).toFixed(3) : 0); }
    aparece('iM', t, mi);
  });
}
// ---------- 17 · Aguas internacionales, lejos de cualquier zona de exclusión ----------
{
  const a = S('c15'), ci = AT('c15', 'Cientos');
  scene('sAgu', [a - .1, S('c16') - .1, .2, .2, 0], `<svg class="full" id="vAg" viewBox="0 0 1080 1920"></svg>${pill('aI', 'AGUAS INTERNACIONALES', 330, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142')}`);
  const M = mapaSur($('vAg')); M.zee.setAttribute('opacity', 1);
  const PT = M.borde.find(p => p[1] <= -42.6), PX = [PT[0] + .35, PT[1]];
  const tez = circuloGeo(M, LUGAR.tez, MN200, { fill: 'rgba(224,67,58,.08)', stroke: '#ff5148', 'stroke-width': 3, 'stroke-dasharray': '12 9' });
  const tl = marca(M, [-59.5, -55.6]); etiqueta(tl.inner, 'ZONA DE EXCLUSIÓN DE 1982', 0, 0, { anchor: 'middle', col: '#ff8a80', size: 22 });
  const x = marca(M, PX); el('path', { d: 'M-16,-16 L16,16 M16,-16 L-16,16', stroke: '#ff5148', 'stroke-width': 7 }, x.inner);
  const xr = el('circle', { r: 0, fill: 'none', stroke: '#ff5148', 'stroke-width': 3 }, x.inner);
  const edge = [LUGAR.tez[0], LUGAR.tez[1] + MN200], dist = Math.round((d3.geoDistance(PX, LUGAR.tez) * 180 / Math.PI - MN200) * 111.2 / 1.852 / 10) * 10;
  const ln = el('path', { d: M.path({ type: 'LineString', coordinates: [PX, edge] }), stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '8 6', fill: 'none', 'vector-effect': 'non-scaling-stroke' }, M.top);
  const dl = marca(M, [-58.2, (PX[1] + edge[1]) / 2]); etiqueta(dl.inner, `≈ ${dist} MILLAS`, 16, 0, { col: '#ffc142', size: 30, w: 600 });
  RENDER.push(t => {
    if (!on('sAgu')) return;
    camMapa(M, -59.5, lerp(-44, -47.5, io(P(t, a, ci + .5))), lerp(1.8, 1.05, io(P(t, a, ci + .5))));
    fijo(M, x); fijo(M, tl); fijo(M, dl);
    xr.setAttribute('r', 16 + 40 * ((t * .9) % 1)); xr.setAttribute('opacity', 1 - ((t * .9) % 1));
    aparece('aI', t, a);
    const k = P(t, ci - .2, ci + .8); ln.setAttribute('stroke-dasharray', k < 1 ? `${2000 * k} 4000` : '8 6'); dl.g.setAttribute('opacity', P(t, ci + .3, ci + .7));
  });
}
// ---------- 18 · Nadie se atribuye el ataque ----------
{
  const a = S('c16');
  scene('sNad', [a - .1, S('c17') - .1, .2, .2, 1.06], `<svg class="full" id="vN" viewBox="0 0 1080 1920"></svg>
    <div id="nQ" style="position:absolute;left:0;right:0;top:300px;text-align:center;font:900 420px/1 'Inter Var';color:#ff5148;opacity:0;text-shadow:0 0 80px rgba(224,67,58,.5)">?</div>`);
  const svg = $('vN'), mar = marCostado(svg, 120, { seed: 11 }), sub = el('g', {}, svg); submarino(sub, { borde: '#2a4a63' });
  RENDER.push(t => {
    if (!on('sNad')) return;
    mar(t);
    sub.setAttribute('transform', `translate(${lerp(-300, 1300, P(t, a - .5, S('c17') + 1))} 1000) scale(1.2)`); sub.setAttribute('opacity', .8);
    const q = P(t, AT('c16', 'Nadie') - .1, AT('c16', 'Nadie') + .3); $('nQ').style.opacity = q; $('nQ').style.transform = `scale(${lerp(.6, 1, back(q))})`;
  });
}
// ---------- 19 · Suena un teléfono en la Casa Rosada; llaman desde Washington ----------
{
  const a = S('c17'), su = AT('c17', 'suena'), ll = AT('c17', 'Llaman');
  scene('sCR', [a - .1, S('c18') - .1, .2, .2, 1.06], `<div style="position:absolute;inset:0;background:linear-gradient(#03060c,#0b1220 70%,#11161d)"></div>
    <svg class="full" id="vCR" viewBox="0 0 1080 1920"></svg>${pill('cW', 'LLAMADA DESDE WASHINGTON', 330, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:28px')}`);
  const svg = $('vCR'), g = el('g', { transform: 'translate(540 1100) scale(1.05)' }, svg), C = casaRosada(g);
  el('rect', { x: -2000, y: 1100, width: 5000, height: 900, fill: '#0c1016' }, svg);
  const vl = C.vent[7], ondas = [0, 1, 2].map(() => el('path', { fill: 'none', stroke: '#ffd890', 'stroke-width': 5 }, svg));
  const arc = el('path', { d: 'M1000,120 C900,400 700,600 610,810', fill: 'none', stroke: '#8fd0ff', 'stroke-width': 5, 'stroke-dasharray': '900', 'stroke-dashoffset': 900 }, svg);
  RENDER.push(t => {
    if (!on('sCR')) return;
    vl.setAttribute('fill', t > su ? '#ffd890' : '#2a1b1b');
    ondas.forEach((o, i) => { const u = ((t - su) * 1.4 + i / 3) % 1, R = 30 + u * 90; o.setAttribute('d', `M${620 - R * .7},${840 - R * .7} A${R},${R} 0 0 1 ${620 + R * .7},${840 - R * .7}`); o.setAttribute('opacity', t > su ? (1 - u) : 0); });
    arc.setAttribute('stroke-dashoffset', 900 * (1 - io(P(t, ll - .2, ll + .8))));
    aparece('cW', t, ll);
  });
}
// ---------- 20 · La llamada ----------
{
  const a = S('c18'), to = AT('c18', 'lo cambia');
  scene('sTel', [a - .1, S('outro') + .1, .2, .1, 0], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#0f1a28,#040608 70%)"></div>
    <div id="tPh" style="position:absolute;left:250px;top:330px;width:580px;height:1140px;border-radius:70px;background:#0d0f13;border:3px solid #2c3038;box-shadow:0 40px 120px rgba(0,0,0,.7)">
      <div style="position:absolute;inset:16px;border-radius:56px;overflow:hidden;background:linear-gradient(#162336,#0a0d12)">
        <div class="mono" style="position:absolute;left:0;right:0;top:130px;text-align:center;font-size:24px;letter-spacing:.2em;color:#8fd0ff">LLAMADA ENTRANTE</div>
        <div style="position:absolute;left:0;right:0;top:180px;text-align:center;font:800 54px 'Inter Var'">Washington</div>
        <div class="mono" style="position:absolute;left:0;right:0;top:260px;text-align:center;font-size:22px;color:#8b919a">línea segura · 03:52</div>
        <div id="tR" style="position:absolute;left:50%;top:560px;width:200px;height:200px;margin-left:-100px;border-radius:50%;border:4px solid #5ee093"></div>
        <div style="position:absolute;left:50%;top:600px;width:120px;height:120px;margin-left:-60px;border-radius:50%;background:#2f8f5b;display:flex;align-items:center;justify-content:center;font:900 54px 'Inter Var'">✆</div>
      </div></div><div id="tK" style="position:absolute;inset:0;background:#000;opacity:0"></div>`);
  RENDER.push(t => {
    if (!on('sTel')) return;
    const u = (t * 1.2) % 1; $('tR').style.transform = `scale(${1 + u * .8})`; $('tR').style.opacity = 1 - u;
    const [sx, sy] = Math.floor(t * 1.4) % 2 ? shake(t, 4, 29) : [0, 0];
    $('tPh').style.transform = `translate(${sx}px,${sy + lerp(400, 0, eo(P(t, a - .1, a + .7)))}px) scale(${lerp(1, 1.12, P(t, a, to + 1))})`;
    $('tK').style.opacity = P(t, to + .3, S('outro') + .1);
  });
}
// ---------- 21 · Parte 2 ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">continúa</div>
      <div id="fP" style="font:900 190px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">PARTE <span style="color:var(--red)">2</span></div>
      <div id="fQ" style="font:700 54px/1.15 'Inter Var';margin-top:34px">¿Qué se decide<br><span style="color:#aab0b8;font-weight:600">en esa llamada?</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para la parte 2</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
