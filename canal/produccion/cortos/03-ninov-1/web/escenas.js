// "Pasó de verdad" · Victor Ninov, parte 1. Historia real, todo animado y sin fotos.
// Los datos salen de los comunicados del Laboratorio Lawrence Berkeley y de la investigación publicada (ver PUBLICACION.md).
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'físico', 'a'], ['h1', 'dos', 'a'], ['h1', 'elementos', 'a'], ['h1', 'nuevos', 'a'], ['h2', 'Ninguno', 'r'], ['h2', 'existía', 'r'],
  ['c1', 'Victor', 'a'], ['c1', 'Ninov', 'a'], ['c1', 'cazadores', 'g'], ['c2', 'Alemania', 'a'], ['c2', 'diez', 'a'], ['c2', 'once', 'a'], ['c2', 'doce', 'a'],
  ['c3', 'Berkeley', 'a'], ['c3', 'receta', 'g'], ['c3', 'criptón', 'a'], ['c3', 'plomo', 'a'],
  ['c4', 'treinta', 'a'], ['c4', 'seis', 'a'], ['c4', 'ochenta', 'a'], ['c4', 'dos', 'a'], ['c4', 'dieciocho', 'g'],
  ['c5', 'once', 'a'], ['c5', 'días', 'a'], ['c5', 'billones', 'a'], ['c6', 'tres', 'g'], ['c6', 'dieciocho', 'g'], ['c6', 'dieciséis', 'g'],
  ['c7', 'mundo', 'a'], ['c7', 'isla', 'g'], ['c7', 'estabilidad', 'g'], ['c8', 'repetirlo', 'a'],
  ['c9', 'Nada', 'r'], ['c10', 'Tampoco', 'r'], ['c10', 'nada', 'r'], ['c11', 'cadena', 'g'], ['c12', 'otros', 'a'], ['c12', 'programas', 'a'],
  ['c13', 'no', 'r'], ['c13', 'estaba', 'r'], ['c14', 'parte', 'a'], ['c14', 'dos', 'a'],
], { max: 3, chars: 15 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · RECREACIÓN ANIMADA', dia: 'AÑO', hide: S('c14') - .1,
  horas: [[S('h1') - .1, '1999'], [S('c2') - .1, '1994'], [AT('c2', 'ciento doce') - .05, '1996'], [S('c3') - .1, '1999'], [S('c10') - .1, '2000'], [S('c11') - .1, '2001', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

SETUP.push(() => {
// ---------- 1 · La tabla periódica de 1999 y dos casillas nuevas que nunca existieron ----------
{
  const an = AT('h1', 'anunció'), de = AT('h1', 'dos elementos'), ni = S('h2'), ex = AT('h2', 'existía');
  scene('sAbre', [-1, S('c1') - .1, .01, .25, 0], tablaHTML('tA', { hasta: 112, top: 650 }) +
    `<div id="aP" class="pill" style="position:absolute;left:64px;top:330px;background:rgba(9,12,17,.85);border:1px solid #ffc142;color:#ffc142;font-size:26px;opacity:0">BERKELEY · 7 DE JUNIO DE 1999</div>
     ${casillaG('aG1', 116, '?', 'NUEVO', 190, 400)}${casillaG('aG2', 118, '?', 'NUEVO', 600, 400)}
     <div id="aS" style="position:absolute;left:230px;top:420px;padding:16px 34px;border:9px solid #ff5148;border-radius:18px;color:#ff5148;font:900 92px/1 'Inter Var';text-align:center;opacity:0;background:rgba(24,4,4,.82)">NUNCA<br>EXISTIERON</div>`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tAz' + z));
  const big = ['aG1', 'aG2'].map(id => { const n = $(id); n.classList.add('oro');
    n.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 220 220" style="position:absolute;inset:0;overflow:visible"><path d="M118,-4 L100,48 L128,92 L94,140 L122,182 L104,224" fill="none" stroke="#ff2a1e" stroke-width="8" stroke-linejoin="round" stroke-dasharray="300" stroke-dashoffset="300"/></svg>`);
    return { n, g: n.querySelector('path') }; });
  const cam = $$('#sAbre .cam');
  RENDER.push(t => {
    if (!on('sAbre')) return;
    cells.forEach((c, i) => { const q = P(t, .05 + (i + 1) * .021, .3 + (i + 1) * .021); c.style.opacity = q; c.style.transform = `scale(${lerp(.4, 1, back(q))})`; });
    for (const z of [116, 118]) { const c = cells[z - 1]; c.classList.toggle('oro', t >= de - .1 && t < ni + .1); c.classList.toggle('roja', t >= ni + .1); }
    big.forEach(({ n, g }, k) => {
      const q = P(t, de + k * .15 - .05, de + k * .15 + .3), fall = P(t, ex + k * .08, ex + .8 + k * .08);
      n.style.opacity = q * (1 - fall);
      n.style.transform = `translateY(${(lerp(90, 0, eo(q)) + 700 * fall * fall).toFixed(1)}px) rotate(${((k ? 1 : -1) * 30 * fall * fall).toFixed(2)}deg) scale(${lerp(.6, 1, back(q)).toFixed(3)})`;
      g.setAttribute('stroke-dashoffset', 300 * (1 - P(t, ni + k * .14, ni + .3 + k * .14)));
    });
    aparece('aP', t, an);
    const s = P(t, ex - .05, ex + .22); $('aS').style.opacity = s; $('aS').style.transform = `rotate(-7deg) scale(${lerp(1.7, 1, eo(s)).toFixed(3)})`;
    const [sx, sy] = shake(t, 9 * (1 - P(t, ni, ni + .5)) * (t > ni ? 1 : 0)), [ex2, ey2] = shake(t, 12 * (1 - P(t, ex, ex + .4)) * (t > ex ? 1 : 0), 31);
    cam.style.transform = `translate(${sx + ex2}px,${sy + ey2}px) scale(${lerp(1, 1.05, io(P(t, 0, S('c1')))).toFixed(4)})`;
  });
}
// ---------- 2 · Victor Ninov, cazador de elementos ----------
{
  const a = S('c1'), vn = AT('c1', 'Victor'), ca = AT('c1', 'cazadores'), tira = [107, 108, 109, 110, 111, 112];
  scene('sNin', [a - .1, S('c2') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 72%,#0f2a1c,#05080a 62%)"></div>
    <svg class="full" id="vNi" viewBox="0 0 1080 1920"></svg>
    <div id="nC" class="card" style="left:64px;top:330px;width:700px;padding:22px 28px;opacity:0">
      <div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.18em">FÍSICO NUCLEAR</div>
      <div style="font:900 74px/1 'Inter Var';margin-top:8px">VICTOR NINOV</div>
      <div class="mono" style="font-size:22px;color:#cfd5dc;margin-top:12px">Nacido en Bulgaria en 1959</div></div>
    ${tira.map((z, i) => `<div id="nz${z}" class="pt" style="left:${64 + i * 140}px;top:${640}px;width:110px;height:110px;opacity:0"><b style="font-size:16px">${z}</b><i style="top:34px;font-size:40px">${SIMB[z - 1]}</i></div>`).join('')}
    ${pill('nTag', 'CAZADOR DE ELEMENTOS', 570, '#2f8f5b')}`);
  const svg = $('vNi'), d = el('defs', {}, svg), f = el('filter', { id: 'nGl', x: '-30%', y: '-30%', width: '160%', height: '160%' }, d);
  el('feGaussianBlur', { stdDeviation: 9 }, f);
  for (const [x, y, w, h] of [[90, 860, 300, 220], [690, 840, 300, 240]]) {
    el('rect', { x, y, width: w, height: h, rx: 14, fill: '#0b2a1a', stroke: '#1f6b4a', 'stroke-width': 3 }, svg);
    for (let i = 0; i < 6; i++) el('rect', { x: x + 22, y: y + 26 + i * 32, width: w * (.35 + ((i * 37) % 5) / 10), height: 9, rx: 4, fill: '#5df39a', opacity: .45 }, svg);
  }
  const sil = 'M540,800 C602,800 642,850 642,915 C642,970 614,1010 587,1025 L587,1050 C702,1070 792,1120 822,1215 L258,1215 C288,1120 378,1070 493,1050 L493,1025 C466,1010 438,970 438,915 C438,850 478,800 540,800 Z';
  el('path', { d: sil, fill: 'none', stroke: '#ffb23e', 'stroke-width': 12, opacity: .6, filter: 'url(#nGl)' }, svg);
  el('path', { d: sil, fill: '#05070a' }, svg);
  const ret = el('g', { opacity: 0 }, svg);
  el('circle', { r: 72, fill: 'none', stroke: '#5ee093', 'stroke-width': 4 }, ret);
  el('path', { d: 'M-98,0 H-44 M44,0 H98 M0,-98 V-44 M0,44 V98', stroke: '#5ee093', 'stroke-width': 4 }, ret);
  RENDER.push(t => {
    if (!on('sNin')) return;
    const q = P(t, vn - .15, vn + .2); $('nC').style.opacity = q; $('nC').style.transform = `translateY(${lerp(24, 0, eo(q))}px)`;
    tira.forEach((z, i) => { const k = P(t, a + .2 + i * .08, a + .5 + i * .08); $('nz' + z).style.opacity = k * .9; });
    const k = io(P(t, ca - .1, ca + 1.3)), x = lerp(119, 819, k);
    ret.setAttribute('opacity', P(t, ca - .2, ca)); ret.setAttribute('transform', `translate(${x} 695) rotate(${t * 40 % 360})`);
    tira.forEach((z, i) => $('nz' + z).classList.toggle('verde', t > ca - .1 && x >= 119 + i * 140 - 10));
    aparece('nTag', t, ca);
  });
}
// ---------- 3 · Darmstadt (110, 111, 112) y el salto a Berkeley con la receta nueva ----------
{
  const a = S('c2'), b = S('c3'), z10 = AT('c2', 'ciento diez'), z11 = AT('c2', 'ciento once'), z12 = AT('c2', 'ciento doce');
  const ca = AT('c3', 'California'), re = AT('c3', 'receta'), kr = AT('c3', 'criptón'), pb = AT('c3', 'plomo'), di = AT('c3', 'disparar');
  scene('sGlo', [a - .1, S('c4') - .1, .2, .2, 0], `<svg class="full" id="vGl" viewBox="0 0 1080 1920"></svg>
    <div id="gDim" style="position:absolute;inset:0;background:#05070a;opacity:0"></div>
    ${pill('gGSI', 'GSI · DARMSTADT · 1994-1996', 330, 'rgba(9,12,17,.85)', 'border:1px solid #8fd0ff;color:#8fd0ff;font-size:26px')}
    ${casillaG('g110', 110, 'Ds', '1994', 64, 400)}${casillaG('g111', 111, 'Rg', '1994', 314, 400)}${casillaG('g112', 112, 'Cn', '1996', 564, 400)}
    <div id="gR" style="position:absolute;inset:0;opacity:0"><div class="lbl" style="left:64px;top:330px;color:#5ee093">RECETA NUEVA · BERKELEY</div>
      ${casillaG('gKr', 36, 'Kr', 'CRIPTÓN', 64, 400)}${casillaG('gPb', 82, 'Pb', 'PLOMO', 660, 400)}</div>
    <svg class="full" id="vGb" viewBox="0 0 1080 1920"></svg>`);
  const G = globo($('vGl'), { r: 520, cy: 1000, paises: { '276': '#3a5a8a', '840': '#2f4f7a' } });
  const arc = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 5, 'stroke-dasharray': '14 10' }, G.top);
  const pin = txt => { const g = el('g', {}, G.top); const r = el('circle', { r: 30, fill: 'none', stroke: '#ffc142', 'stroke-width': 3 }, g); el('circle', { r: 11, fill: '#ffc142' }, g);
    etiqueta(g, txt, 24, -22, { size: 28, w: 600, col: '#ffe2a0' }); g.r = r; return g; };
  const pD = pin('DARMSTADT · GSI'), pB = pin('BERKELEY LAB');
  const haz = el('g', {}, $('vGb')), bolas = [];
  for (let i = 0; i < 14; i++) bolas.push(el('circle', { r: 7, fill: '#ff8f80' }, haz));
  RENDER.push(t => {
    if (!on('sGlo')) return;
    const k1 = io(P(t, a - .1, a + 1.4)), k2 = io(P(t, b - .1, ca + .4));
    const lam = t < b - .1 ? lerp(20, -8.65, k1) : lerp(-8.65, 122.25, k2), phi = t < b - .1 ? lerp(-30, -49.87, k1) : lerp(-49.87, -37.87, k2);
    const sc = t < b - .1 ? lerp(560, 1500, k1) : lerp(1500, 1500, k2) - 860 * Math.sin(Math.PI * k2);
    G.update([lam, phi, 0], sc);
    for (const [p, k] of [[pD, 'darmstadt'], [pB, 'berkeley']]) { const xy = G.xy(LUGAR[k]); p.setAttribute('opacity', xy ? 1 : 0); if (xy) p.setAttribute('transform', `translate(${xy[0]} ${xy[1]})`); p.r.setAttribute('r', 14 + 30 * ((t * 1.2) % 1)); p.r.setAttribute('opacity', 1 - (t * 1.2) % 1); }
    arc.setAttribute('d', t > b - .1 ? arcoGeo(G.path, LUGAR.darmstadt, LUGAR.berkeley, P(t, b, ca + .3)) || '' : ''); arc.setAttribute('opacity', 1 - P(t, re - .3, re));
    const fuera = 1 - P(t, b - .3, b);
    $('gGSI').style.opacity = P(t, a + .2, a + .5) * fuera;
    [[110, z10], [111, z11], [112, z12]].forEach(([z, tz]) => { const q = P(t, tz - .05, tz + .25), n = $('g' + z); n.style.opacity = q * fuera; n.style.transform = `scale(${lerp(.5, 1, back(q))})`; n.classList.toggle('oro', t > tz && t < tz + .6); });
    $('gDim').style.opacity = .55 * P(t, re - .2, re + .2);
    $('gR').style.opacity = P(t, re - .2, re + .1);
    for (const [id, tz] of [['gKr', kr], ['gPb', pb]]) { const q = P(t, tz - .1, tz + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(.5, 1, back(q))})`; }
    bolas.forEach((c, i) => { const u = ((t - di) * 1.6 + i / 14) % 1; c.setAttribute('cx', lerp(300, 650, u)); c.setAttribute('cy', 510 + Math.sin(i * 2.1) * 10); c.setAttribute('opacity', t > di ? .9 * Math.sin(Math.PI * u) : 0); });
  });
}
// ---------- 4 · 36 + 82 = 118: los dos núcleos se funden ----------
{
  const a = S('c4'), t36 = AT('c4', 'treinta'), t82 = AT('c4', 'ochenta'), fu = AT('c4', 'Si se funden'), t118 = AT('c4', 'ciento dieciocho'), hit = fu + .5;
  scene('sFus', [a - .1, S('c5') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#141d2a,#05070a 70%)"></div><svg class="full" id="vFu" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:64px;top:330px;font:900 112px/1 'Inter Var';letter-spacing:-.02em;white-space:nowrap"><span id="fA" style="color:#ff6a5c;opacity:0">36</span><span id="fB" style="opacity:0"> + <span style="color:#ff6a5c">82</span></span><span id="fC" style="color:#ffc142;opacity:0"> = 118</span></div>`);
  const svg = $('vFu'); defsNucleo(svg);
  const d = el('defs', {}, svg), rg = el('radialGradient', { id: 'fuGl' }, d);
  el('stop', { offset: 0, 'stop-color': '#ffe7a0', 'stop-opacity': .9 }, rg); el('stop', { offset: 1, 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const glow = el('circle', { cx: 540, cy: 800, r: 300, fill: 'url(#fuGl)', opacity: 0 }, svg);
  const estelas = el('g', {}, svg); for (let i = 0; i < 4; i++) el('rect', { x: -260, y: -60 + i * 40, width: 200, height: 6, rx: 3, fill: '#ff8f80', opacity: .5 }, estelas);
  const Kr = el('g', {}, svg), Pb = el('g', {}, svg), Fu = el('g', { opacity: 0 }, svg);
  nucleo(svg, Kr, 36, 50, 12, 4); nucleo(svg, Pb, 82, 126, 12, 8); const fu118 = nucleo(svg, Fu, 118, 175, 12, 13);
  const lab = (txt, x, col) => { const t = etiqueta(svg, txt, x, 1075, { size: 30, w: 600, col, anchor: 'middle' }); t.setAttribute('opacity', 0); return t; };
  const lKr = lab('Kr · 36 PROTONES', 250, '#ff8f80'), lPb = lab('Pb · 82 PROTONES', 730, '#ff8f80'), lFu = lab('¿ELEMENTO 118?', 540, '#ffc142');
  RENDER.push(t => {
    if (!on('sFus')) return;
    const m = P(t, fu, hit), mm = m * m;
    const xk = lerp(250, 540, mm), xp = lerp(730, 560, mm), vis = t < hit ? 1 : 0;
    Kr.setAttribute('transform', `translate(${xk} ${800 + 4 * Math.sin(t * 7)}) scale(${lerp(.6, 1, back(P(t, a - .1, a + .3)))})`); Kr.setAttribute('opacity', vis);
    Pb.setAttribute('transform', `translate(${xp} ${800 + 4 * Math.sin(t * 5 + 1)}) scale(${lerp(.6, 1, back(P(t, a + .1, a + .5)))})`); Pb.setAttribute('opacity', vis);
    estelas.setAttribute('transform', `translate(${xk} 800)`); estelas.setAttribute('opacity', m > 0 && m < 1 ? .8 : 0);
    const w = t > hit ? Math.exp(-(t - hit) * 3) : 0;
    Fu.setAttribute('opacity', t >= hit ? 1 : 0);
    Fu.setAttribute('transform', `translate(540 800) scale(${(1 + .1 * Math.sin((t - hit) * 26) * w).toFixed(4)}, ${(1 - .08 * Math.sin((t - hit) * 26) * w).toFixed(4)})`);
    glow.setAttribute('opacity', t > hit ? .25 + .7 * w : 0);
    $('fA').style.opacity = P(t, t36 - .1, t36 + .15); $('fB').style.opacity = P(t, t82 - .1, t82 + .15); $('fC').style.opacity = P(t, t118 - .1, t118 + .15);
    lKr.setAttribute('opacity', P(t, t36, t36 + .2) * vis); lPb.setAttribute('opacity', P(t, t82, t82 + .2) * vis); lFu.setAttribute('opacity', P(t, t118, t118 + .2));
  });
}
// ---------- 5 · Once días de acelerador: dos billones de átomos por segundo ----------
{
  const a = S('c5'), ac = AT('c5', 'acelerador'), bi = AT('c5', 'billones');
  scene('sHaz', [a - .1, S('c6') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:#05080c"></div><svg class="full" id="vHz" viewBox="0 0 1080 1920"></svg>
    <div class="card" style="left:64px;top:330px;padding:16px 24px"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">EXPERIMENTO</div><div class="mono" style="font-size:56px">DÍA <span id="hDn" style="color:#ffc142">1</span>/11</div></div>
    <div id="hB" class="card" style="left:410px;top:330px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:19px;color:#8b919a;letter-spacing:.12em">ÁTOMOS DE CRIPTÓN POR SEGUNDO</div><div class="mono" id="hBn" style="font-size:46px;color:#ffc142;margin-top:6px">0</div></div>`);
  const svg = $('vHz'), cx = 290, cy = 760;
  const d = el('defs', {}, svg), lg = el('linearGradient', { id: 'hzD', x1: 0, y1: 0, x2: 1, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#3a4656' }, lg); el('stop', { offset: 1, 'stop-color': '#1b222c' }, lg);
  el('circle', { cx, cy, r: 205, fill: '#10161e', stroke: '#3a4656', 'stroke-width': 4 }, svg);
  el('path', { d: `M${cx - 8},${cy - 188} A188,188 0 0 0 ${cx - 8},${cy + 188} Z`, fill: 'url(#hzD)', stroke: '#5a6878', 'stroke-width': 2 }, svg);
  el('path', { d: `M${cx + 8},${cy - 188} A188,188 0 0 1 ${cx + 8},${cy + 188} Z`, fill: 'url(#hzD)', stroke: '#5a6878', 'stroke-width': 2 }, svg);
  let sp = '';
  for (let i = 0; i <= 600; i++) { const u = i / 600, r = 6 + 172 * u, th = u * 6 * 2 * Math.PI; sp += (i ? ' L' : 'M') + (cx + r * Math.cos(th)).toFixed(1) + ',' + (cy + r * Math.sin(th)).toFixed(1); }
  el('path', { d: `M${cx + 178},${cy} L640,${cy}`, stroke: '#2a3442', 'stroke-width': 18, 'stroke-linecap': 'round' }, svg);
  el('path', { d: sp, fill: 'none', stroke: '#ffb23e', 'stroke-opacity': .25, 'stroke-width': 2 }, svg);
  const camino = el('path', { d: sp + ` L640,${cy}`, fill: 'none', stroke: 'none' }, svg), LT = camino.getTotalLength();
  el('circle', { cx: 660, cy, r: 34, fill: '#6d7684', stroke: '#aeb6c0', 'stroke-width': 3 }, svg);
  const sep = `M660,${cy} C770,${cy} 800,${cy + 60} 800,${cy + 170}`;
  el('path', { d: sep, fill: 'none', stroke: '#2b4a63', 'stroke-width': 44, 'stroke-linecap': 'round' }, svg);
  el('path', { d: sep, fill: 'none', stroke: '#8fd0ff', 'stroke-opacity': .3, 'stroke-width': 3 }, svg);
  const sepP = el('path', { d: sep + ` L800,${cy + 220}`, fill: 'none', stroke: 'none' }, svg), LS = sepP.getTotalLength();
  el('rect', { x: 735, y: cy + 222, width: 130, height: 60, rx: 8, fill: '#163024', stroke: '#5ee093', 'stroke-width': 3 }, svg);
  etiqueta(svg, 'CICLOTRÓN DE 88 PULGADAS', cx, cy + 250, { size: 22, anchor: 'middle', col: '#aab3bd' });
  etiqueta(svg, 'BLANCO DE PLOMO', 660, cy - 60, { size: 22, anchor: 'middle', col: '#aab3bd' });
  etiqueta(svg, 'SEPARADOR', 715, cy + 120, { size: 22, anchor: 'end', col: '#8fd0ff' });
  etiqueta(svg, 'DETECTOR', 800, cy + 320, { size: 22, anchor: 'middle', col: '#5ee093' });
  const ps = []; for (let i = 0; i < 60; i++) ps.push(el('circle', { r: 4.5, fill: '#ffc142' }, svg));
  const pr = []; for (let i = 0; i < 5; i++) pr.push(el('circle', { r: 7, fill: '#5ee093' }, svg));
  RENDER.push(t => {
    if (!on('sHaz')) return;
    ps.forEach((c, i) => { const u = ((t - a) * .55 + i / 60) % 1, p = camino.getPointAtLength(u * LT); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', (.4 + .6 * u).toFixed(2)); });
    pr.forEach((c, i) => { const u = ((t - a) * .35 + i / 5) % 1, p = sepP.getPointAtLength(u * LS); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', Math.sin(Math.PI * u).toFixed(2)); });
    $('hDn').textContent = 1 + Math.floor(10 * P(t, a, ac));
    const q = P(t, bi - .9, bi + .2); $('hB').style.opacity = P(t, bi - 1, bi - .8);
    $('hBn').textContent = fmt(2e12 * eo(q));
  });
}
// ---------- 6 · Ninov encuentra tres cadenas ----------
{
  const a = S('c6'), en = AT('c6', 'encontró'), ta = AT('c6', 'Tres átomos'), stop = en + .35;
  scene('sCrt', [a - .1, ta - .05, .2, .15, 1.04], `<div style="position:absolute;inset:0;background:#040605"></div>${crtHTML('cr1', 64, 340, 850, 760, 'ANÁLISIS DE DATOS · BERKELEY · 1999', lineasDatos(160, 11))}
    ${[1, 2, 3].map(i => pill('crP' + i, 'CADENA ' + i, 0, '#ffc142', 'color:#1a1000;font-size:22px;padding:4px 14px;left:740px')).join('')}`);
  RENDER.push(t => {
    if (!on('sCrt')) return;
    const s = crtScroll('cr1', t, a - .1, stop), vi = s / 34;
    [4, 10, 16].forEach((d, k) => {
      const tk = stop + .1 + k * .22, onk = t >= tk;
      marcarLinea('cr1', vi + d, onk);
      const p = $('crP' + (k + 1)); p.style.top = (340 + 60 + d * 34 - 2) + 'px'; aparece('crP' + (k + 1), t, tk);
    });
  });
}
// ---------- 7 · La escalera: 118 → 116 → … seis caídas en menos de un segundo ----------
{
  const ta = AT('c6', 'Tres átomos'), d16 = AT('c6', 'dieciséis');
  const Z = [118, 116, 114, 112, 110, 108, 106], sy = ['?', '?', '?', 'Cn', 'Ds', 'Hs', 'Sg'], X = i => 70 + i * 120, Y = i => 430 + i * 100;
  scene('sEsc', [ta - .05, S('c7') - .1, .15, .2, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 40% 40%,#14202c,#05070a 70%)"></div><svg class="full" id="vEs" viewBox="0 0 1080 1920"></svg>
    ${pill('eT', 'LA HUELLA: 6 CAÍDAS EN MENOS DE 1 SEGUNDO', 330, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:24px')}
    ${Z.map((z, i) => `<div id="es${z}" class="pt${i === 0 ? ' oro' : ''}" style="left:${X(i)}px;top:${Y(i)}px;width:100px;height:100px;opacity:0"><b style="font-size:16px">${z}</b><i style="top:30px;font-size:42px">${sy[i]}</i></div>`).join('')}`);
  const svg = $('vEs'), T0 = i => ta + .15 + i * .4;
  const flechas = [], alfas = [];
  for (let i = 0; i < 6; i++) {
    flechas.push(el('path', { d: `M${X(i) + 100},${Y(i) + 50} L${X(i + 1) + 50},${Y(i + 1)}`, stroke: '#ffc142', 'stroke-width': 4, 'stroke-dasharray': '8 8', fill: 'none', opacity: 0 }, svg));
    const g = el('g', { opacity: 0 }, svg);
    for (const [dx, dy, c] of [[-7, -7, '#ff6a5c'], [7, 7, '#ff6a5c'], [7, -7, '#c9d0d8'], [-7, 7, '#c9d0d8']]) el('circle', { cx: dx, cy: dy, r: 8, fill: c }, g);
    etiqueta(g, 'α', 18, -14, { size: 30, w: 700, col: '#ffc142', ls: 0 });
    alfas.push(g);
  }
  const ring = el('rect', { x: X(1) - 12, y: Y(1) - 12, width: 124, height: 124, rx: 14, fill: 'none', stroke: '#5ee093', 'stroke-width': 5, opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('sEsc')) return;
    aparece('eT', t, ta + .1);
    Z.forEach((z, i) => { const q = P(t, T0(i), T0(i) + .25), n = $('es' + z); n.style.opacity = q; n.style.transform = `translateY(${lerp(-40, 0, eo(q))}px) scale(${lerp(.6, 1, back(q))})`; });
    for (let i = 0; i < 6; i++) {
      flechas[i].setAttribute('opacity', P(t, T0(i + 1) - .1, T0(i + 1) + .1));
      const k = P(t, T0(i + 1) - .1, T0(i + 1) + .7);
      alfas[i].setAttribute('opacity', k > 0 && k < 1 ? 1 - k : 0);
      alfas[i].setAttribute('transform', `translate(${X(i) + 100 + 220 * eo(k)} ${Y(i) + 20 - 160 * eo(k)})`);
    }
    const r = P(t, d16 - .1, d16 + .2); ring.setAttribute('opacity', r * (.6 + .4 * Math.sin(t * 9)));
  });
}
// ---------- 8 · El anuncio al mundo ----------
{
  const a = S('c7'), nd = AT('c7', 'Ninov dijo');
  const notas = [['NOTICIAS', 'Berkeley anuncia los elementos 116 y 118', '#efe6d2', -4, 360], ['NEWS', 'Berkeley announces elements 116 and 118', '#e9e2cf', 3, 570], ['NACHRICHTEN', 'Berkeley meldet die Elemente 116 und 118', '#f1ead8', -2, 780]];
  scene('sAnu', [a - .1, nd, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:#0a0c10"></div>
    ${notas.map(([k, h, c, r, y], i) => `<div id="an${i}" style="position:absolute;left:${84 + i * 30}px;top:${y}px;width:760px;padding:26px 30px;background:${c};color:#16120c;border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,.6);opacity:0" data-r="${r}">
      <div style="font:600 18px 'IBM Plex Mono';letter-spacing:.2em;color:#7a6a50">${k} · JUNIO DE 1999</div><div style="font:800 46px/1.08 'Inter Var';margin-top:10px">${h}</div>
      <div style="height:12px;background:#cfc4ac;margin-top:16px;width:92%"></div><div style="height:12px;background:#cfc4ac;margin-top:10px;width:78%"></div></div>`).join('')}
    <div class="lbl" style="left:64px;top:1070px;font-size:20px;color:#6b737d">RECREACIÓN</div>`);
  RENDER.push(t => {
    if (!on('sAnu')) return;
    notas.forEach((n, i) => { const q = P(t, a + i * .4, a + i * .4 + .3), d = $('an' + i); d.style.opacity = q; d.style.transform = `translate(${lerp(i % 2 ? 300 : -300, 0, eo(q))}px,0) rotate(${n[3]}deg) scale(${lerp(1.15, 1, eo(q))})`; });
  });
}
// ---------- 9 · "Saltamos un mar de inestabilidad hasta una isla de estabilidad" ----------
{
  const nd = AT('c7', 'Ninov dijo'), ma = AT('c7', 'mar'), is = AT('c7', 'isla');
  scene('sIsla', [nd - .1, S('c8') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#04070c,#0b1624 55%,#04070c)"></div><svg class="full" id="vIs" viewBox="0 0 1080 1920"></svg>
    <div id="iQ" class="card" style="left:64px;top:330px;width:820px;padding:22px 28px;opacity:0"><div style="font:700 40px/1.2 'Inter Var'">«Saltamos por encima de un <span style="color:#ff6a5c">mar de inestabilidad</span>, hasta una <span style="color:#5ee093">isla de estabilidad</span>.»</div>
      <div class="mono" style="font-size:19px;color:#8b919a;margin-top:12px;letter-spacing:.12em">VICTOR NINOV · JUNIO DE 1999 · TRADUCCIÓN</div></div>`);
  const svg = $('vIs'), d = el('defs', {}, svg), rg = el('radialGradient', { id: 'isGl' }, d);
  el('stop', { offset: 0, 'stop-color': '#5ee093', 'stop-opacity': .55 }, rg); el('stop', { offset: 1, 'stop-color': '#5ee093', 'stop-opacity': 0 }, rg);
  const HZ = 985;
  el('rect', { x: -50, y: HZ, width: 1200, height: 400, fill: '#081320' }, svg);
  const glow = el('ellipse', { cx: 760, cy: 900, rx: 260, ry: 170, fill: 'url(#isGl)', opacity: 0 }, svg);
  el('path', { d: `M-30,${HZ - 30} L170,${HZ - 48} L215,${HZ} L-30,${HZ + 10} Z`, fill: '#1c2633', stroke: '#3a4a5c', 'stroke-width': 2 }, svg);
  for (let i = 0; i < 5; i++) el('rect', { x: 10 + i * 34, y: HZ - 80 - (i % 2) * 14, width: 28, height: 28, rx: 4, fill: '#2a3646', stroke: '#4a5a6c' }, svg);
  const isla = el('path', { d: `M610,${HZ} Q690,${HZ - 110} 760,${HZ - 100} Q830,${HZ - 112} 905,${HZ} Z`, fill: '#1d3a2c', stroke: '#5ee093', 'stroke-width': 3, opacity: 0 }, svg);
  const olas = []; for (let i = 0; i < 6; i++) olas.push(el('path', { fill: 'none', stroke: '#ff6a5c', 'stroke-opacity': .55 - i * .07, 'stroke-width': 3 }, svg));
  etiqueta(svg, 'ELEMENTOS CONOCIDOS', 20, HZ - 110, { size: 20, col: '#8b95a1' });
  const lM = etiqueta(svg, 'MAR DE INESTABILIDAD', 410, HZ + 130, { size: 26, w: 600, col: '#ff8a80', anchor: 'middle' }), lI = etiqueta(svg, 'ISLA DE ESTABILIDAD', 760, HZ - 130, { size: 26, w: 600, col: '#7af0aa', anchor: 'middle' });
  const salto = el('path', { d: `M175,${HZ - 70} Q450,${HZ - 470} 750,${HZ - 115}`, fill: 'none', stroke: '#ffc142', 'stroke-width': 5, 'stroke-dasharray': '4 14', 'stroke-linecap': 'round' }, svg), LJ = salto.getTotalLength();
  const bola = el('circle', { r: 16, fill: '#ffc142' }, svg);
  RENDER.push(t => {
    if (!on('sIsla')) return;
    const q = P(t, nd - .1, nd + .25); $('iQ').style.opacity = q; $('iQ').style.transform = `translateY(${lerp(24, 0, eo(q))}px)`;
    olas.forEach((o, i) => { let p = ''; for (let x = 200; x <= 640; x += 12) { const env = Math.sin(Math.PI * (x - 200) / 440); p += (p ? ' L' : 'M') + x + ',' + (HZ + 20 + i * 24 + env * 16 * Math.sin(x / 23 + t * (4 + i) + i)).toFixed(1); } o.setAttribute('d', p); });
    lM.setAttribute('opacity', P(t, ma - .1, ma + .2));
    const j = io(P(t, ma, is + .2)), pt = salto.getPointAtLength(j * LJ);
    salto.setAttribute('opacity', P(t, ma, ma + .2));
    bola.setAttribute('cx', pt.x.toFixed(1)); bola.setAttribute('cy', pt.y.toFixed(1)); bola.setAttribute('opacity', P(t, ma - .1, ma + .1));
    const k = P(t, is - .2, is + .3); isla.setAttribute('opacity', k); glow.setAttribute('opacity', k * (.7 + .3 * Math.sin(t * 3))); lI.setAttribute('opacity', k);
  });
}
// ---------- 10 · Un resultado vale solo si otro puede repetirlo ----------
{
  const a = S('c8'), va = AT('c8', 'vale'), ot = AT('c8', 'otro'), re = AT('c8', 'repetirlo');
  scene('sRep', [a - .1, S('c9') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:#06080b"></div>
    <div style="position:absolute;left:64px;top:340px;font:900 84px/1.04 'Inter Var';letter-spacing:-.02em"><div id="rL1">UN RESULTADO</div><div id="rL2">VALE SOLO SI</div><div id="rL3" style="color:#ffc142">OTRO PUEDE</div><div id="rL4" style="color:#ffc142">REPETIRLO</div></div>
    <div style="position:absolute;left:64px;top:790px;width:820px;display:flex;align-items:center;gap:26px">
      <div id="rA" class="card" style="position:relative;flex:1;height:250px;padding:22px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">BERKELEY · 1999</div><div style="font:900 120px/1.1 'Inter Var';color:#5ee093">3</div><div class="mono" style="font-size:22px;color:#cfd5dc">cadenas</div></div>
      <div style="font:900 70px 'Inter Var';color:#8b919a">=</div>
      <div id="rB" class="card" style="position:relative;flex:1;height:250px;padding:22px;opacity:0;border-color:#ffc142"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.14em">OTRO LABORATORIO</div><div id="rQ" style="font:900 120px/1.1 'Inter Var';color:#ffc142">?</div><div class="mono" style="font-size:22px;color:#cfd5dc">cadenas</div></div></div>`);
  RENDER.push(t => {
    if (!on('sRep')) return;
    [[1, a], [2, va], [3, ot], [4, re]].forEach(([i, ti]) => { const q = P(t, ti - .12, ti + .15); $('rL' + i).style.opacity = q; $('rL' + i).style.transform = `translateX(${lerp(-30, 0, eo(q))}px)`; });
    $('rA').style.opacity = P(t, a + .3, a + .6); $('rB').style.opacity = P(t, ot - .1, ot + .2);
    $('rQ').style.transform = `scale(${1 + .08 * Math.sin(t * 6)})`; $('rQ').style.transformOrigin = '20% 50%';
  });
}
// ---------- 11 · Alemania, Japón, Francia: nada ----------
{
  const a = S('c9'), na = AT('c9', 'Nada');
  scene('sMun', [a - .1, S('c10') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:#05090f"></div><svg class="full" id="vMu" viewBox="0 0 1080 1920"></svg>
    <div id="mN" style="position:absolute;left:64px;top:330px;font:900 130px/1 'Inter Var';color:#ff5148;opacity:0">0 <span style="font-size:58px;color:#ecebe6;letter-spacing:.02em">CADENAS</span></div>`);
  const svg = $('vMu'), proj = d3.geoMercator().center([69.6, 45]).scale(295).translate([540, 800]), path = d3.geoPath(proj);
  el('path', { d: path(d3.geoGraticule().step([15, 15])()), fill: 'none', stroke: '#8fb3cc', 'stroke-opacity': .07 }, svg);
  el('path', { d: path(MAPDATA.land), fill: '#1a222c', stroke: '#33404e', 'stroke-width': 1 }, svg);
  const paises = {}; for (const cid of ['276', '392', '250']) paises[cid] = el('path', { d: path(MAPDATA.countries.features.find(f => f.id === cid)), fill: '#2f4f7a', stroke: '#06080b' }, svg);
  const sitios = [['darmstadt', 'GSI · ALEMANIA', AT('c9', 'Alemania'), -20, -44, 'start', '276'], ['wako', 'RIKEN · JAPÓN', AT('c9', 'Japón'), -24, 60, 'end', '392'], ['caen', 'GANIL · FRANCIA', AT('c9', 'Francia'), -150, 66, 'start', '250']];
  const S2 = sitios.map(([k, txt, tk, dx, dy, an, cid]) => {
    const [x, y] = proj(LUGAR[k]), g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, svg);
    el('circle', { r: 10, fill: '#ffc142' }, g);
    const lab = etiqueta(g, txt, dx, dy, { size: 25, w: 600, col: '#ffe2a0', anchor: an });
    const w = txt.length * 18.2, bx = an === 'end' ? dx - w - 34 : dx + w + 34;
    const b = el('g', { transform: `translate(${bx} ${dy - 9})`, opacity: 0 }, g);
    el('circle', { r: 26, fill: '#c3332b' }, b); etiqueta(b, '0', 0, 11, { size: 32, w: 800, col: '#fff', anchor: 'middle', font: 'Inter Var', ls: 0 });
    return { g, b, tk, cid };
  });
  RENDER.push(t => {
    if (!on('sMun')) return;
    for (const s of S2) {
      s.g.setAttribute('opacity', P(t, s.tk - .15, s.tk + .1));
      const k = P(t, s.tk + .25, s.tk + .5); s.b.setAttribute('opacity', k); s.b.firstChild.setAttribute('r', 26 * lerp(.5, 1, back(k)));
      paises[s.cid].setAttribute('fill', t > na ? '#5a2020' : t > s.tk ? '#3a5a8a' : '#2f4f7a');
    }
    const q = P(t, na - .1, na + .2); $('mN').style.opacity = q; $('mN').style.transform = `scale(${lerp(1.5, 1, eo(q))})`; $('mN').style.transformOrigin = '0 50%';
  });
}
// ---------- 12 · Año 2000: Berkeley repite el experimento y no encuentra nada ----------
{
  const a = S('c10'), ex = AT('c10', 'experimento'), ta = AT('c10', 'Tampoco');
  scene('sBar', [a - .1, S('c11') - .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:#06080b"></div><svg class="full" id="vBr" viewBox="0 0 1080 1920"></svg>
    <div class="card" id="bC" style="left:64px;top:330px;width:820px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">BERKELEY REPITE SU EXPERIMENTO</div><div style="font:700 38px 'Inter Var';margin-top:6px">Mismo acelerador · mismo método</div></div>`);
  const svg = $('vBr'), base = 1090;
  el('path', { d: `M110,${base} H880`, stroke: '#4a5059', 'stroke-width': 3 }, svg);
  const bloques = [0, 1, 2].map(i => { const g = el('g', { opacity: 0 }, svg); el('rect', { x: 180, y: base - 118 * (i + 1), width: 270, height: 106, rx: 10, fill: '#e0a42a', stroke: '#ffe08a', 'stroke-width': 2 }, g);
    etiqueta(g, 'CADENA ' + (i + 1), 315, base - 118 * (i + 1) + 64, { size: 26, w: 700, col: '#2a1a00', anchor: 'middle' }); return g; });
  const hueco = el('rect', { x: 580, y: base - 354, width: 270, height: 342, rx: 10, fill: 'none', stroke: '#8b919a', 'stroke-width': 3, 'stroke-dasharray': '12 10', opacity: 0 }, svg);
  const cero = etiqueta(svg, '0', 715, base - 130, { size: 190, w: 900, col: '#ff5148', anchor: 'middle', font: 'Inter Var', ls: 0 }); cero.setAttribute('opacity', 0);
  const y1 = etiqueta(svg, '1999', 315, base + 50, { size: 34, w: 600, anchor: 'middle' }), y2 = etiqueta(svg, '2000', 715, base + 50, { size: 34, w: 600, anchor: 'middle' }); y2.setAttribute('opacity', 0);
  RENDER.push(t => {
    if (!on('sBar')) return;
    $('bC').style.opacity = P(t, a, a + .3);
    bloques.forEach((g, i) => { const q = P(t, a + .1 + i * .15, a + .35 + i * .15); g.setAttribute('opacity', q); g.setAttribute('transform', `translate(0 ${lerp(-40, 0, eo(q))})`); });
    hueco.setAttribute('opacity', P(t, ex - .2, ex + .1)); y2.setAttribute('opacity', P(t, ex - .2, ex + .1));
    hueco.setAttribute('stroke', t > ta ? '#ff5148' : '#8b919a');
    const q = P(t, ta - .05, ta + .2); cero.setAttribute('opacity', q); cero.setAttribute('transform', `translate(715 ${base - 190}) scale(${lerp(1.6, 1, eo(q))}) translate(-715 ${-(base - 190)})`);
  });
}
// ---------- 13 · 2001: el programa de Ninov encuentra otra cadena ----------
{
  const a = S('c11'), ca = AT('c11', 'cadena'), stop = ca - .05;
  scene('sC01', [a - .1, S('c12') - .1, .2, .2, 1.03], `<div style="position:absolute;inset:0;background:#040605"></div>${crtHTML('cr2', 64, 340, 850, 760, 'PROGRAMA DE ANÁLISIS DE NINOV · 2001', lineasDatos(160, 23))}
    ${pill('c2P', 'CADENA 118', 0, '#5ee093', 'color:#06140a;font-size:22px;padding:4px 14px;left:720px')}`);
  RENDER.push(t => {
    if (!on('sC01')) return;
    const vi = crtScroll('cr2', t, a - .1, stop, 1100) / 34;
    marcarLinea('cr2', vi + 9, t > stop + .05, '#5ee093', '#06140a');
    $('c2P').style.top = (340 + 60 + 9 * 34 - 2) + 'px'; aparece('c2P', t, stop + .1);
  });
}
// ---------- 14 · Otros programas, el mismo archivo: la cadena no estaba ----------
{
  const a = S('c12'), ot = AT('c12', 'otros'), c13 = S('c13'), ne = AT('c13', 'no estaba');
  const L = lineasDatos(9, 41), LB = L.map((l, i) => i === 4 ? '' : l), Y0 = 740 + 60;
  scene('sOtr', [a - .1, S('c14') - .1, .2, .2, 0], `<div style="position:absolute;inset:0;background:#040605"></div>
    ${crtHTML('cr3', 64, 330, 850, 380, 'PROGRAMA DE NINOV', L)}${crtHTML('cr4', 64, 740, 850, 380, 'OTRO PROGRAMA · MISMO ARCHIVO', LB)}
    ${pill('o3P', 'CADENA 118', 330 + 60 + 4 * 34 - 2, '#5ee093', 'color:#06140a;font-size:22px;padding:4px 14px;left:720px;opacity:1')}
    <div id="oS" style="position:absolute;left:84px;width:810px;height:4px;background:#8fd0ff;box-shadow:0 0 22px #8fd0ff;opacity:0"></div>
    <div id="oV" style="position:absolute;left:80px;top:${Y0 + 4 * 34}px;width:818px;height:34px;border:3px dashed #ff5148;border-radius:6px;opacity:0"></div>
    <div id="oN" style="position:absolute;left:220px;top:860px;padding:14px 30px;border:9px solid #ff5148;border-radius:16px;color:#ff5148;font:900 96px/1 'Inter Var';opacity:0;background:rgba(24,4,4,.85)">NO ESTABA</div>`);
  addCSS(`#cr4 .ln{color:#8fd0ff;text-shadow:0 0 8px rgba(120,200,255,.5)} #cr4 .tt{background:#8fd0ff} #cr4{box-shadow:0 0 0 2px #2a3038,0 40px 90px rgba(0,0,0,.7),inset 0 0 90px rgba(120,200,255,.12)}`);
  marcarLinea('cr3', 4, true, '#5ee093', '#06140a');
  const cam = $$('#sOtr .cam');
  RENDER.push(t => {
    if (!on('sOtr')) return;
    const q = P(t, ot - .15, ot + .25); $('cr4').style.opacity = q; $('cr4').style.transform = `translateY(${lerp(60, 0, eo(q))}px)`;
    const k = P(t, ot + .3, c13 + .1), y = Y0 + 4 + k * (4 * 34 + 13);
    $('oS').style.top = y + 'px'; $('oS').style.opacity = P(t, ot + .2, ot + .4) * (1 - P(t, c13 + .2, c13 + .5));
    $('oV').style.opacity = P(t, c13 + .1, c13 + .3) * (Math.floor(t * 4) % 2 ? .6 : 1);
    const s = P(t, ne - .05, ne + .2); $('oN').style.opacity = s; $('oN').style.transform = `rotate(-6deg) scale(${lerp(1.7, 1, eo(s)).toFixed(3)})`;
    const [sx, sy] = shake(t, t > ne ? 12 * (1 - P(t, ne, ne + .45)) : 0);
    cam.style.transform = `translate(${sx}px,${sy}px) scale(${lerp(1, 1.04, io(P(t, a, S('c14'))))})`;
  });
}
// ---------- 15 · Parte 2 ----------
{
  const a = S('c14'), da = AT('c14', 'datos');
  scene('sFin', [a - .1, TL.duration + 1, .3, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:470px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">pasó de verdad · victor ninov</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">PARTE <span style="color:var(--red)">2</span></div>
      <div id="fQ" style="font:700 54px/1.15 'Inter Var';margin-top:30px">Qué había en los<br>datos de <span style="color:#ffc142">1999</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para verla</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, da - .3, da + .1); $('fS').style.opacity = P(t, S('outro'), S('outro') + .3);
  });
}
});
