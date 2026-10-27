// Apertura: el anuncio de 1999, Ninov, las casillas que se apagan y el título.
SETUP.push(() => {
// ---------- 1 · La tabla periódica de 1999 y dos casillas nuevas ----------
{
  const la = AT('c1', 'un laboratorio'), d2 = S('c2'), c3 = S('c3'), d116 = AT('c3', 'ciento dieciséis'), d118 = AT('c3', 'y el ciento dieciocho'), b = S('c4');
  scene('h_tab', [-1, b - .1, .01, .6, 0], `<div class="bgA"></div>${tablaGrande('tA', { hasta: 112 })}${etiq('aTg', 'Berkeley, California · 7 de junio de 1999')}`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tAz' + z));
  const [x116, y116] = centroCasilla(116), [x118] = centroCasilla(118);
  RENDER.push(t => {
    if (!on('h_tab')) return;
    cells.forEach((c, i) => { const q = P(t, .4 + (i + 1) * .016, .7 + (i + 1) * .016); c.style.opacity = q; c.style.transform = `scale(${lerp(.5, 1, back(q))})`; });
    const p6 = P(t, d116 - .1, d116 + .3), p8 = P(t, d118 - .1, d118 + .3), g2 = P(t, d2, d2 + .4);
    cells[115].classList.toggle('oro', t > d2 + .1); cells[117].classList.toggle('oro', t > d2 + .25);
    cells[115].style.transform = `scale(${1 + .25 * Math.sin(Math.PI * p6)})`; cells[117].style.transform = `scale(${1 + .25 * Math.sin(Math.PI * p8)})`;
    $('aTg').style.opacity = P(t, la - .2, la + .4) * (1 - P(t, c3 - .4, c3));
    camara('h_tab', (x116 + x118) / 2, y116, lerp(1, 2.1, io(P(t, c3 - .3, b))) * lerp(1, 1.03, g2));
  });
}
// ---------- 2 · Un acelerador en California ----------
function ciclotron(svg, cx, cy, R, o = {}) {           // dibujo en corte: ciclotrón, haz, blanco, separador y detector
  const d = el('defs', {}, svg), lg = el('linearGradient', { id: svg.id + 'D', x1: 0, y1: 0, x2: 1, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#3a4656' }, lg); el('stop', { offset: 1, 'stop-color': '#1b222c' }, lg);
  el('circle', { cx, cy, r: R + 16, fill: '#10161e', stroke: '#3a4656', 'stroke-width': 4 }, svg);
  el('path', { d: `M${cx - 10},${cy - R} A${R},${R} 0 0 0 ${cx - 10},${cy + R} Z`, fill: `url(#${svg.id}D)`, stroke: '#5a6878', 'stroke-width': 2 }, svg);
  el('path', { d: `M${cx + 10},${cy - R} A${R},${R} 0 0 1 ${cx + 10},${cy + R} Z`, fill: `url(#${svg.id}D)`, stroke: '#5a6878', 'stroke-width': 2 }, svg);
  let sp = ''; for (let i = 0; i <= 700; i++) { const u = i / 700, r = 8 + (R - 14) * u, th = u * 6 * 2 * Math.PI; sp += (i ? ' L' : 'M') + (cx + r * Math.cos(th)).toFixed(1) + ',' + (cy + r * Math.sin(th)).toFixed(1); }
  const tx = o.tx || cx + R + 360, sx = o.sx || tx + 260, sy = o.sy || cy + 230;
  el('path', { d: `M${cx + R - 6},${cy} L${tx - 30},${cy}`, stroke: '#2a3442', 'stroke-width': 22, 'stroke-linecap': 'round' }, svg);
  el('path', { d: sp, fill: 'none', stroke: '#ffb23e', 'stroke-opacity': .22, 'stroke-width': 2 }, svg);
  const camino = el('path', { d: sp + ` L${tx - 30},${cy}`, fill: 'none', stroke: 'none' }, svg), LT = camino.getTotalLength();
  el('circle', { cx: tx, cy, r: 44, fill: '#6d7684', stroke: '#aeb6c0', 'stroke-width': 3 }, svg);
  const sep = `M${tx},${cy} C${tx + 150},${cy} ${sx},${cy + 60} ${sx},${sy}`;
  el('path', { d: sep, fill: 'none', stroke: '#2b4a63', 'stroke-width': 56, 'stroke-linecap': 'round' }, svg);
  el('path', { d: sep, fill: 'none', stroke: '#8fd0ff', 'stroke-opacity': .3, 'stroke-width': 3 }, svg);
  const sepP = el('path', { d: sep + ` L${sx},${sy + 60}`, fill: 'none', stroke: 'none' }, svg), LS = sepP.getTotalLength();
  el('rect', { x: sx - 80, y: sy + 62, width: 160, height: 70, rx: 10, fill: '#163024', stroke: '#5ee093', 'stroke-width': 3 }, svg);
  const L = [etiqueta(svg, 'CICLOTRÓN DE 88 PULGADAS', cx, cy + R + 70, { size: 24, anchor: 'middle', col: '#aab3bd' }), etiqueta(svg, 'BLANCO DE PLOMO', tx, cy - 70, { size: 24, anchor: 'middle', col: '#aab3bd' }),
    etiqueta(svg, 'SEPARADOR DE GAS', sx + 60, cy + 120, { size: 24, col: '#8fd0ff' }), etiqueta(svg, 'DETECTOR', sx, sy + 175, { size: 24, anchor: 'middle', col: '#5ee093' })];
  const ps = []; for (let i = 0; i < 70; i++) ps.push(el('circle', { r: 5, fill: '#ffc142' }, svg));
  const pr = []; for (let i = 0; i < 5; i++) pr.push(el('circle', { r: 8, fill: '#5ee093' }, svg));
  return { L, anim(t, a, v = .55) {
    ps.forEach((c, i) => { const u = ((t - a) * v + i / 70) % 1, p = camino.getPointAtLength(u * LT); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', (.35 + .65 * u).toFixed(2)); });
    pr.forEach((c, i) => { const u = ((t - a) * .35 + i / 5) % 1, p = sepP.getPointAtLength(u * LS); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', Math.sin(Math.PI * u).toFixed(2)); });
  } };
}
window.ciclotron = ciclotron;
{
  const a = S('c4');
  scene('h_cic', [a - .1, S('c5') - .1, .6, .5, 1.05], `<div style="position:absolute;inset:0;background:#05080c"></div><svg class="full" id="vCi" viewBox="0 0 1920 1080"></svg>${etiq('ciT', 'Un acelerador de partículas · California')}<div class="rec">Esquema</div>`);
  const C1 = ciclotron($('vCi'), 560, 520, 290, { tx: 1180, sx: 1460, sy: 740 });
  RENDER.push(t => { if (!on('h_cic')) return; C1.anim(t, a); $('ciT').style.opacity = P(t, a, a + .6); });
}
// ---------- 3 · Las revistas lo celebraron; los libros se preparaban para cambiar ----------
{
  const a = S('c5'), lb = S('c6');
  const notas = [['NOTICIAS', 'Berkeley anuncia dos elementos nuevos: el 116 y el 118', -4, 150, 170], ['NEWS', 'Two new superheavy elements discovered', 3, 230, 420], ['NACHRICHTEN', 'Zwei neue Elemente entdeckt', -2, 120, 670]];
  scene('h_rev', [a - .1, S('c7') - .1, .5, .5, 1.04], `<div style="position:absolute;inset:0;background:#0a0c10"></div>
    ${notas.map(([k, h, r, x, y], i) => `<div id="hn${i}" class="paper" style="left:${x}px;top:${y}px;width:820px;padding:30px 36px;opacity:0"><div style="font:600 18px 'IBM Plex Mono';letter-spacing:.2em;color:#7a6a50">${k} · JUNIO DE 1999</div>
      <div style="font:800 46px/1.1 'Inter Var';margin-top:12px">${h}</div><div class="ln" style="width:92%"></div><div class="ln" style="width:70%"></div></div>`).join('')}
    <div id="hLb" style="position:absolute;left:1080px;top:230px;width:740px;height:560px;opacity:0"><svg viewBox="0 0 740 560" style="position:absolute;inset:0;width:100%;height:100%">
      <path d="M370,40 C280,10 120,10 20,40 L20,540 C120,510 280,510 370,540 Z" fill="#e9e2cf"/><path d="M370,40 C460,10 620,10 720,40 L720,540 C620,510 460,510 370,540 Z" fill="#f1ead8"/>
      <path d="M370,40 L370,540" stroke="#b9ae96" stroke-width="3"/></svg>
      <div style="position:absolute;left:60px;top:70px;font:700 30px 'Cormorant Garamond';color:#3a3020">La tabla periódica</div>
      <div style="position:absolute;left:60px;top:120px;width:260px">${Array.from({ length: 6 }, (_, i) => `<div style="height:9px;background:#cfc4ac;margin:13px 0;width:${90 - i * 7}%"></div>`).join('')}</div>
      <div id="hLt" style="position:absolute;left:400px;top:90px;width:300px;height:400px"></div></div>
    <div class="rec">Recreación</div>`);
  // tabla en miniatura en la página derecha del libro
  const mt = $('hLt'); let h = '';
  for (let z = 1; z <= 118; z++) { const [f, c] = posTabla(z); const y = f <= 7 ? (f - 1) * 17 : 7 * 17 + 6 + (f - 9) * 17;
    h += `<div id="hL${z}" style="position:absolute;left:${(c - 1) * 16.5}px;top:${y}px;width:14px;height:14px;border-radius:2px;background:${z > 112 ? 'transparent' : '#8a7f68'};border:${z > 112 ? '1.5px dashed #8a7f68' : 'none'}"></div>`; }
  mt.innerHTML = h;
  RENDER.push(t => {
    if (!on('h_rev')) return;
    notas.forEach((n, i) => { const q = P(t, a + i * .45, a + i * .45 + .35), d = $('hn' + i); d.style.opacity = q * (1 - .55 * P(t, lb - .2, lb + .3)); d.style.transform = `translate(${lerp(i % 2 ? 260 : -260, 0, eo(q))}px,0) rotate(${n[2]}deg) scale(${lerp(1.12, 1, eo(q))})`; });
    const k = P(t, lb - .3, lb + .3); $('hLb').style.opacity = k; $('hLb').style.transform = `translateY(${lerp(40, 0, eo(k))}px) rotate(${lerp(4, 1, eo(k))}deg)`;
    for (const [z, d] of [[116, .6], [118, 1.1]]) { const c = $('hL' + z), q = P(t, lb + d, lb + d + .4); c.style.background = q > 0 ? '#e0a42a' : 'transparent'; c.style.opacity = q > 0 ? .4 + .6 * q : 1; c.style.boxShadow = q > 0 ? `0 0 ${12 * q}px #ffb23e` : 'none'; }
  });
}
// ---------- 4 · Victor Ninov, cazador de elementos ----------
{
  const a = S('c7'), ca = AT('c7', 'cazadores'), sl = S('c8'), tira = [107, 108, 109, 110, 111, 112];
  scene('h_nin', [a - .1, S('c9') - .1, .5, .6, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 38% 75%,#0f2a1c,#05080a 60%)"></div><svg class="full" id="vNi" viewBox="0 0 1920 1080"></svg>
    ${tira.map((z, i) => `<div id="hz${z}" class="pt" style="left:${1060 + (i % 3) * 230}px;top:${200 + Math.floor(i / 3) * 230}px;width:200px;height:200px;opacity:0;border-radius:16px"><b style="font-size:24px;left:14px;top:10px">${z}</b><i style="top:62px;font-size:78px">${SIMB[z - 1]}</i></div>`).join('')}
    ${zocalo('nZ', 'Físico nuclear · nacido en Bulgaria en 1959', 'VICTOR NINOV')}`);
  const svg = $('vNi'); filtroBrillo(svg, 'niGl');
  for (const [x, y, w, h] of [[110, 520, 300, 220], [600, 500, 300, 240]]) {
    el('rect', { x, y, width: w, height: h, rx: 14, fill: '#0b2a1a', stroke: '#1f6b4a', 'stroke-width': 3 }, svg);
    for (let i = 0; i < 6; i++) el('rect', { x: x + 22, y: y + 26 + i * 32, width: w * (.35 + ((i * 37) % 5) / 10), height: 9, rx: 4, fill: '#5df39a', opacity: .45 }, svg);
  }
  const s = el('g', { transform: 'translate(500 1090) scale(1.25)' }, svg); silueta(s, '#ffb23e', 'niGl');
  const ret = el('g', { opacity: 0 }, svg);
  el('circle', { r: 120, fill: 'none', stroke: '#5ee093', 'stroke-width': 5 }, ret);
  el('path', { d: 'M-160,0 H-74 M74,0 H160 M0,-160 V-74 M0,74 V160', stroke: '#5ee093', 'stroke-width': 5 }, ret);
  const pos = tira.map((z, i) => [1160 + (i % 3) * 230, 300 + Math.floor(i / 3) * 230]);
  RENDER.push(t => {
    if (!on('h_nin')) return;
    tira.forEach((z, i) => { $('hz' + z).style.opacity = .9 * P(t, a + .3 + i * .1, a + .7 + i * .1); });
    const k = P(t, ca - .2, ca + 1.8), seg = Math.min(5, Math.floor(k * 6)), f = io(clamp(k * 6 - seg)), nx = Math.min(5, seg + 1);
    const [x, y] = [lerp(pos[seg][0], pos[nx][0], f), lerp(pos[seg][1], pos[nx][1], f)];
    ret.setAttribute('opacity', P(t, ca - .3, ca)); ret.setAttribute('transform', `translate(${x} ${y}) rotate(${t * 30 % 360})`);
    tira.forEach((z, i) => $('hz' + z).classList.toggle('verde', t > ca && i <= seg));
    zocaloAnim('nZ', t, sl - .1);
  });
}
// ---------- 5 · Dos años después: las casillas se apagan y la prueba no estaba ----------
{
  const a = S('c9'), c10 = S('c10'), nu = AT('c10', 'nunca'), c11 = S('c11'), dat = AT('c11', 'datos originales'), ta = AT('c11', 'tampoco');
  scene('h_apa', [a - .1, S('c12') - .1, .6, .5, 0], `<div class="bgA"></div>${tablaGrande('tB', { hasta: 112 })}${etiq('bTg', 'Dos años después')}
    <div id="bDim" style="position:absolute;inset:0;background:#05070a;opacity:0"></div>
    ${crtHTML('bCrt', 460, 250, 1000, 420, 'DATOS ORIGINALES DEL DETECTOR · 1999', lineasDatos(10, 3).map((l, i) => i % 3 === 1 ? '' : l))}
    ${[0, 1, 2].map(i => `<div id="bV${i}" style="position:absolute;left:476px;top:${250 + 60 + (1 + 3 * i) * 34}px;width:968px;height:34px;border:3px dashed #ff5148;border-radius:6px;opacity:0"></div>`).join('')}`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tBz' + z));
  RENDER.push(t => {
    if (!on('h_apa')) return;
    $('bTg').style.opacity = P(t, a, a + .6) * (1 - P(t, c11 - .5, c11));
    for (const [z, d] of [[116, 0], [118, .45]]) {
      const c = cells[z - 1], off = t > nu + d, fl = t > nu + d - .3 && t < nu + d && Math.floor(t * 20) % 2;
      c.classList.toggle('oro', !off && !fl); c.classList.toggle('roja', off);
    }
    const k = P(t, c11 - .2, c11 + .4); $('bDim').style.opacity = .7 * k;
    $('bCrt').style.opacity = k; $('bCrt').style.transform = `translateY(${lerp(60, 0, eo(k))}px)`;
    for (let i = 0; i < 3; i++) $('bV' + i).style.opacity = P(t, dat + i * .25, dat + .2 + i * .25) * (Math.floor(t * 3) % 2 ? .65 : 1);
    camara('h_apa', 960, 540, lerp(1, 1.06, io(P(t, a, S('c12')))));
  });
}
// ---------- 6 · Dos casillas en la tabla… y por qué no pudo ----------
{
  const a = S('c12'), dc = AT('c12', 'dos casillas'), np = S('c13'), b = S('titulo');
  scene('h_his', [a - .1, b + .3, .6, .8, 0], `<div class="bgA"></div>${tablaGrande('tC', { hasta: 112 })}
    ${casillaG('cG1', 116, '?', '', 0, 0, 'width:74px;height:74px;border-radius:8px')}${casillaG('cG2', 118, '?', '', 0, 0, 'width:74px;height:74px;border-radius:8px')}`);
  addCSS('#cG1 b,#cG2 b{font-size:13px;left:7px;top:5px} #cG1 i,#cG2 i{top:16px;font-size:36px} #h_his .ptG u{display:none}');
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tCz' + z));
  const g = [['cG1', 116, -260, -120], ['cG2', 118, 120, -220]].map(([id, z, dx, dy]) => { const n = $(id); n.classList.add('oro'); const [x, y] = centroCasilla(z); return { n, x: x - 37, y: y - 37, dx, dy }; });
  RENDER.push(t => {
    if (!on('h_his')) return;
    cells[115].classList.toggle('roja', t > dc); cells[117].classList.toggle('roja', t > dc);
    cells.forEach((c, i) => { if (i !== 115 && i !== 117) c.style.opacity = lerp(1, .35, P(t, dc - .5, dc)); });
    g.forEach((q, k) => {
      const v = P(t, dc - .1 + k * .2, dc + 1.2 + k * .2), fall = P(t, np + .2 + k * .15, np + 1.4 + k * .15);
      q.n.style.left = q.x + 'px'; q.n.style.top = q.y + 'px';
      q.n.style.opacity = P(t, dc - .2 + k * .2, dc + .1 + k * .2) * (1 - fall);
      const ox = lerp(q.dx, 0, io(v)) + (k ? 60 : -60) * fall, oy = lerp(q.dy, 0, io(v)) + 600 * fall * fall;
      // llega a su lugar, tiembla y se cae
      q.n.style.transform = `translate(${ox + (v > .85 && fall === 0 ? Math.sin(t * 60) * 4 : 0)}px,${oy - 40 * P(t, np - .3, np) * (1 - fall)}px) rotate(${(k ? 1 : -1) * 35 * fall}deg) scale(${lerp(1.6, 1, io(v))})`;
    });
    const [cx, cy] = centroCasilla(117);
    camara('h_his', cx, cy, lerp(1, 1.5, io(P(t, a, np + .5))) * lerp(1, .8, io(P(t, np + .5, b))));
    $('h_his').querySelector('.ptL').style.opacity = 1 - P(t, b - .6, b + .2);
  });
}
// ---------- 7 · Título ----------
{
  const a = S('titulo'), b = E('titulo');
  scene('h_tit', [a - .1, b + .2, .8, .6, 1.03], `<div class="center">
    <div id="t1" style="font:500 40px Inter;letter-spacing:.55em;color:var(--mut);margin-right:-.55em">EL HOMBRE QUE</div>
    <div id="t2" style="font:600 190px 'Cormorant Garamond';letter-spacing:.03em;line-height:1;margin-top:14px">inventó un elemento</div>
    <div id="tl" style="height:3px;background:var(--red);width:0;margin:34px 0 30px;box-shadow:0 0 20px rgba(210,58,50,.6)"></div>
    <div id="t3" style="font:400 28px 'IBM Plex Mono';letter-spacing:.3em;color:var(--mut)">VICTOR NINOV · BERKELEY · 1999 – 2002</div></div>`);
  RENDER.push(t => {
    if (!on('h_tit')) return;
    $('t1').style.opacity = eo(P(t, a + .1, a + 1)); $('t2').style.opacity = eo(P(t, a + .5, a + 1.6)); $('t2').style.letterSpacing = lerp(.08, .02, eo(P(t, a + .5, b))) + 'em';
    $('tl').style.width = 900 * eo(P(t, a + 1.2, a + 2.4)) + 'px'; $('t3').style.opacity = eo(P(t, a + 1.8, a + 2.8));
  });
}
});
