// Capítulo I, segunda parte: qué es el Banco de Bangladés, la Fed, SWIFT y las hojas que por fin salen
addCSS(`
.stat{position:absolute;left:110px;bottom:100px}
.stat .k{font:400 24px 'IBM Plex Mono';letter-spacing:.24em;color:var(--mut);text-transform:uppercase}
.stat .v{font:500 104px 'IBM Plex Mono';letter-spacing:.02em;margin-top:4px;text-shadow:0 0 40px rgba(0,0,0,.8)}
.stat .v small{font-size:46px;color:var(--mut);margin-left:14px}
#s1_pov .people{position:absolute;left:110px;bottom:300px;display:flex;gap:34px}
#s1_pov .people svg{width:110px;height:200px}
.tri3{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:46px}
.tri3 .pn{opacity:0}
.box3{position:absolute;width:430px;height:250px;border:1px solid #2a313b;background:linear-gradient(#0e1217,#0a0d11);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.box3 .t{font:600 34px Inter;letter-spacing:.1em}
.box3 .s{font:400 20px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);margin-top:12px}
#s1_diag .env{position:absolute;width:300px;height:190px;left:810px;top:445px}
#s1_diag .head{position:absolute;left:0;right:0;top:170px;text-align:center}
#s1_net .stat{left:auto;right:110px;text-align:right}
#s1_msg .sheet{position:absolute;left:50%;top:50%;width:1180px;height:760px;margin:-380px 0 0 -590px;padding:50px 64px;font:400 27px 'IBM Plex Mono'}
#s1_msg .sheet h4{font:500 24px 'IBM Plex Mono';letter-spacing:.18em;border-bottom:2px solid #1c1d1f;padding-bottom:16px;margin-bottom:20px;display:flex;justify-content:space-between}
#s1_msg .sheet h4 span{color:#6d6a64;font-weight:400}
#s1_msg .dl{display:flex;padding:11px 0;border-bottom:1px dashed #9c978e}
#s1_msg .dl .a{width:300px;color:#6d6a64;letter-spacing:.06em;flex:none}
#s1_msg .body{margin-top:22px;line-height:1.55}
#s1_msg .ref{display:flex;justify-content:space-between;padding:6px 0;opacity:0}
#s1_msg .hl{position:absolute;border:4px solid var(--red);opacity:0}
#s1_drain .acct{position:absolute;left:200px;right:200px;top:470px;height:120px;border:2px solid #2a313b;background:#0b0e12}
#s1_drain .fill{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#3d8a5a,#4fb07a)}
#s1_drain .k{position:absolute;left:200px;top:400px}
#s1_drain .bal{position:absolute;right:200px;top:640px;font:500 54px 'IBM Plex Mono'}
#s1_951 .n{font:500 210px 'IBM Plex Mono';color:var(--red);text-shadow:0 0 70px rgba(210,58,50,.5);letter-spacing:.02em}
#s1_951 .n small{font-size:90px;color:#a8433d;margin-right:24px}
#s1_rew .date{font:500 190px 'IBM Plex Mono';letter-spacing:.06em}
#s1_rew .lines{position:absolute;inset:0;background:repeating-linear-gradient(rgba(255,255,255,.035) 0 2px,transparent 2px 7px)}
#s1_rew svg{position:absolute;left:50%;top:50%;width:520px;height:360px;margin:-180px 0 0 -260px}
`);
addHTML(`
<div class="scene" id="s1_pop"><div class="cam"><svg id="m1pop" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Habitantes · Bangladés</div><div class="v" id="popv">0</div></div></div>
<div class="scene" id="s1_res"><div class="cam"><svg id="ressvg" width="1920" height="1080"></svg></div>
  <div class="stat" style="top:110px;bottom:auto"><div class="k">Banco de Bangladés</div><div class="v" style="font:600 84px 'Cormorant Garamond'">Reservas internacionales</div></div></div>
<div class="scene" id="s1_uses"><div class="cam"><div class="tri3">
  <div class="pn" id="u1"><svg viewBox="0 0 520 640" id="shipsvg"></svg><div class="lb">IMPORTACIONES</div></div>
  <div class="pn" id="u2"><div class="ph"><img id="takaimg" src="img/taka.jpg" style="filter:saturate(.5) brightness(.55) contrast(1.1)"></div><div class="vig"></div><div class="lb">LA MONEDA</div>
    <div class="credit" style="right:14px;bottom:10px;font-size:12px">${CRED["taka.jpg"]}</div></div>
  <div class="pn" id="u3"><svg viewBox="0 0 520 640" id="crisvg"></svg><div class="lb">CRISIS</div></div></div></div></div>
<div class="scene" id="s1_map"><div class="cam"><svg id="m1ny" width="1920" height="1080"></svg></div>
  <div class="tag" style="left:110px;top:96px" id="m1nyt">Reservas del Banco de Bangladés</div></div>
<div class="scene" id="s1_diag"><div class="cam"><div class="glow"></div>
  <div class="head"><div class="lbl">SWIFT · red de mensajes entre bancos</div></div>
  <div class="box3" id="dA" style="left:150px;top:415px"><div class="t">BANCO DE BANGLADÉS</div><div class="s">DACA · ORDENANTE</div></div>
  <div class="box3" id="dB" style="right:150px;top:415px"><div class="t">RESERVA FEDERAL</div><div class="s">NUEVA YORK · CUENTA</div></div>
  <svg id="diagsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="env" id="denv"><svg viewBox="0 0 300 190" width="300" height="190"><rect x="3" y="3" width="294" height="184" rx="6" fill="#d9d5cc" stroke="#e9e6df" stroke-width="2"/><path d="M3 9 L150 110 L297 9" fill="none" stroke="#8b877f" stroke-width="3"/><text x="150" y="160" text-anchor="middle" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="#1c1d1f">ORDEN DE PAGO</text></svg></div>
</div></div>
<div class="scene" id="s1_net"><div class="cam"><svg id="m1net" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Instituciones conectadas a SWIFT</div><div class="v" id="netv">0</div></div></div>
<div class="scene" id="s1_pr"><div class="cam"><svg id="pr3svg" width="1920" height="1080"></svg></div>
  <div class="tag" style="left:110px;bottom:100px">Viernes · piso 10 · la impresora arranca</div></div>
<div class="scene" id="s1_msg"><div class="cam" id="msgcam"><div class="glow"></div>
  <div class="sheet paper" style="transform:translate(46px,30px) rotate(2.2deg);opacity:.55"></div>
  <div class="sheet paper" style="transform:translate(-30px,16px) rotate(-1.6deg);opacity:.8"></div>
  <div class="sheet paper" id="msheet"><h4>MENSAJE · RESERVA FEDERAL DE NUEVA YORK<span>RECREACIÓN</span></h4>
    <div class="dl"><span class="a">PARA</span><span>BANCO DE BANGLADÉS · DACA</span></div>
    <div class="dl"><span class="a">ASUNTO</span><span>CONSULTA · ÓRDENES DE PAGO</span></div>
    <div class="dl" id="mord"><span class="a">ORDENANTE</span><span>BANCO DE BANGLADÉS</span></div>
    <div class="body">SOLICITAMOS ACLARACIÓN SOBRE LAS ÓRDENES<br>RECIBIDAS EL 04/02/2016:
      <div id="mrefs"></div></div>
    <div class="hl" id="mhl"></div></div>
</div></div>
<div class="scene" id="s1_drain"><div class="cam"><div class="glow"></div>
  <div class="k lbl">Cuenta del Banco de Bangladés · Reserva Federal de Nueva York</div>
  <div class="acct"><div class="fill" id="dfill"></div></div>
  <div class="bal" id="dbal">SALDO</div></div></div>
<div class="scene" id="s1_951"><div class="cam"><div class="center"><div class="n" id="n951"><small>US$</small>0</div>
  <div class="bigsub" id="n951s">Pedido en una sola noche</div></div></div></div>
<div class="scene" id="s1_office"><div class="cam"><svg id="offsvg" width="1920" height="1080"></svg></div>
  <div class="tag" id="offt" style="left:110px;bottom:100px">Piso 10 · nadie había enviado esas órdenes</div></div>
<div class="scene" id="s1_rew"><div class="lines"></div><div class="cam"><div class="center"><div class="date" id="rewd">05·02·2016</div></div>
  <svg viewBox="0 0 520 360" id="envsvg"></svg></div></div>
`);
photo('s1_bank', [S('c25') - .4, S('c26') + .3, .9, .6], { src: 'banco-bangladesh.jpg', pos: '50% 28%', kb: [1.12, 1.22, 0, -20, 30, 0], filter: 'saturate(.55) brightness(.62) contrast(1.1)',
  cap: ['Bangladesh Bank', 'El banco central'] });
photo('s1_pov', [S('c27') - .3, S('c28') + .2, .7, .6], { src: 'daca-pobreza.jpg', kb: [1.05, 1.15, 20, -20, 0, -10], filter: 'grayscale(1) brightness(.5) contrast(1.15)', html: `<div class="people" id="ppl"></div>
  <div class="stat"><div class="k">2016 · bajo la línea de pobreza</div><div class="v">1 <small>de cada</small> 5</div></div>` });
photo('s1_fed', [AT('c31', 'la Fed') - .4, S('c32') + .2, .7, .5], { src: 'fed-piedra.jpg', kb: [1.06, 1.18, 0, 30, 0, -10], filter: 'saturate(.4) brightness(.55) contrast(1.12)',
  cap: ['Banco de la Reserva Federal', 'Nueva York'] });
Object.assign(SCN, {
  s1_pop: [S('c26') - .3, S('c27') + .2, .6, .6],
  s1_res: [S('c28') - .3, S('c29') + .2, .5, .5],
  s1_uses: [S('c29') - .1, S('c30') + .1, .4, .5],
  s1_map: [S('c30') - .3, AT('c31', 'la Fed') + .3, .6, .6],
  s1_diag: [S('c32') - .3, AT('c33', 'más de once') + .2, .5, .5],
  s1_net: [AT('c33', 'más de once') - .2, S('c34') + .1, .5, .6],
  s1_pr: [S('c34') - .3, S('c35') + .2, .6, .5],
  s1_msg: [S('c35') - .3, S('c38') + .1, .5, .35],
  s1_drain: [S('c38') - .2, S('c39') + .05, .35, .25],
  s1_951: [S('c39') - .1, S('c40') + .1, .25, .6],
  s1_office: [S('c40') - .3, S('c41') + .2, .6, .5],
  s1_rew: [S('c41') - .2, S('ch2') + .25, .4, .6],
});
chapterCard('s2_card', 'ch2', 'II', 'Rasel Ahlam', 'Enero de 2015');
// la impresora vuelve a arrancar: hojas cada PR3GAP segundos (sonido.py usa los mismos valores)
const PR3_0 = AT('c34', 'empiezan') - .1, PR3GAP = .55;

const C1 = {};
// silueta de persona para el "1 de cada 5"
const personSVG = col => `<svg viewBox="0 0 110 200"><circle cx="55" cy="38" r="26" fill="${col}"/><path d="M14 196 L18 110 Q20 76 55 74 Q90 76 92 110 L96 196 Z" fill="${col}"/></svg>`;
SETUP.push(function setupCap1() {
  $('ppl').innerHTML = [0, 1, 2, 3, 4].map(i => personSVG(i === 2 ? '#d23a32' : 'rgba(233,230,223,.28)')).join('');
  C1.ppl = [...$('ppl').children];
  // fajos de billetes en isométrico: el colchón de reservas
  const rs = $('ressvg'); lightDefs(rs);
  const g = el('g', {}, rs); C1.resg = g;
  poly(g, [[-900, -900, 0], [1300, -900, 0], [1300, 1300, 0], [-900, 1300, 0]], '#090c10');
  el('ellipse', { cx: iso(200, 200, 0)[0], cy: iso(200, 200, 0)[1], rx: 700, ry: 380, fill: 'url(#spotg)' }, g);
  C1.bundles = [];
  for (let z = 0; z < 7; z++) for (let y = 0; y < 5; y++) for (let x = 0; x < 6; x++) {
    const b = box(g, x * 70, y * 34, z * 16, 64, 30, 14, ['#56684f', '#3b4a37', '#2f3b2c'], '#24301f');
    const band = poly(g, [[x * 70 + 26, y * 34 + 30.2, z * 16], [x * 70 + 38, y * 34 + 30.2, z * 16], [x * 70 + 38, y * 34 + 30.2, z * 16 + 14], [x * 70 + 26, y * 34 + 30.2, z * 16 + 14]], '#c9b98a');
    const parts = [b.top, b.left, b.right, band];
    parts.forEach(p => p.setAttribute('opacity', 0));
    C1.bundles.push({ parts, i: z * 30 + y * 6 + x, z });
  }
  // barco portacontenedores, gráfico de crisis
  const sh = $('shipsvg');
  C1.ship = [stroke(sh, 'M70 360 L450 360 L410 430 L110 430 Z', { 'stroke-width': 6 }), stroke(sh, 'M360 360 L360 290 L420 290 L420 360', { 'stroke-width': 4 }),
    ...[0, 1, 2, 3].map(i => stroke(sh, `M${100 + i * 62} 360 L${100 + i * 62} 300 L${156 + i * 62} 300 L${156 + i * 62} 360`, { 'stroke-width': 4, stroke: i % 2 ? '#d23a32' : '#ffb23e' })),
    stroke(sh, 'M40 470 Q120 455 200 470 T360 470 T520 470', { 'stroke-width': 3, stroke: '#4a5059' })];
  const cr = $('crisvg');
  el('line', { x1: 60, y1: 470, x2: 470, y2: 470, stroke: '#2a313b', 'stroke-width': 2 }, cr);
  C1.crisis = stroke(cr, 'M60 230 L130 250 L190 220 L240 260 L270 420 L300 400 L340 330 L400 300 L470 280', { 'stroke-width': 6 });
  C1.cshield = stroke(cr, 'M260 300 L300 315 Q300 360 260 390 Q220 360 220 315 Z', { 'stroke-width': 4, stroke: '#4fb07a' });
  // oficina vacía del piso 10
  const os = $('offsvg'); lightDefs(os);
  const og = el('g', {}, os); C1.offg = og;
  poly(og, [[-900, -900, 0], [1300, -900, 0], [1300, 1300, 0], [-900, 1300, 0]], '#0a0d11');
  el('ellipse', { cx: iso(250, 250, 0)[0], cy: iso(250, 250, 0)[1], rx: 800, ry: 420, fill: 'url(#spotg)' }, og);
  el('ellipse', { cx: iso(250, 250, 0)[0], cy: iso(250, 250, 0)[1], rx: 500, ry: 260, fill: 'url(#spotg)' }, og);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
    const x = i * 230, y = j * 260;
    box(og, x, y, 0, 170, 90, 52, ['#262e38', '#1a2028', '#13181e'], '#2f3843');                // escritorio
    box(og, x + 50, y + 20, 52, 70, 8, 46, ['#11151a', '#0b0e12', '#090b0e'], '#232a33');       // monitor apagado
    box(og, x + 60, y + 130, 0, 50, 50, 26, ['#181d23', '#11151a', '#0d1014'], '#20262e');      // silla
    box(og, x + 60, y + 172, 26, 50, 8, 40, ['#181d23', '#11151a', '#0d1014'], '#20262e');
  }
  C1.offpr = drawPrinter(os, { floor: false }); C1.offpr.g.setAttribute('transform', 'translate(1500 640) scale(.55)');
  // red SWIFT: puntos sobre tierra firme
  // impresora que imprime
  const ps = $('pr3svg'); lightDefs(ps);
  C1.pr = drawPrinter(ps, { stack: 12 });
  // sobre del correo (fin del capítulo)
  const es = $('envsvg');
  C1.env = [stroke(es, 'M20 40 L500 40 L500 320 L20 320 Z', { 'stroke-width': 6 }), stroke(es, 'M20 40 L260 200 L500 40', { 'stroke-width': 6 }),
    stroke(es, 'M20 320 L200 170 M500 320 L320 170', { 'stroke-width': 4, stroke: '#8b919a' })];
  // referencias de las órdenes en el mensaje
  $('mrefs').innerHTML = ['FT16035000001 · USD ██.███.███', 'FT16035000002 · USD ██.███.███', 'FT16035000003 · USD ██.███.███', 'FT16035000004 · USD ██.███.███'].map(r => `<div class="ref"><span>${r.split(' · ')[0]}</span><span>${r.split(' · ')[1]}</span></div>`).join('');
  // diagrama: flechas
  const ds = $('diagsvg');
  C1.arrA = stroke(ds, 'M590 540 L800 540', { 'stroke-width': 4, stroke: '#8b919a' });
  C1.arrB = stroke(ds, 'M1120 540 L1330 540', { 'stroke-width': 4, stroke: '#8b919a' });
});
MAPSETUP.push(function mapsCap1() {
  // Bangladés lleno de puntos (población)
  const s = $('m1pop'); defs(s);
  const bd = country('050');
  C1.mp = regionMap(s, [[86.5, 20.3], [93.6, 26.9]], [[460, 80], [1460, 1000]]);
  el('path', { d: C1.mp.path(bd), fill: '#141a21', stroke: '#8b919a', 'stroke-width': 2 }, C1.mp.g);
  const R = rnd(11), b = C1.mp.path.bounds(bd); C1.dots = [];
  while (C1.dots.length < 1600) {
    const x = lerp(b[0][0], b[1][0], R()), y = lerp(b[0][1], b[1][1], R());
    if (!d3.geoContains(bd, C1.mp.proj.invert([x, y]))) continue;
    C1.dots.push(el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 2.2, fill: '#ffb23e', opacity: 0 }, C1.mp.g));
  }
  C1.mpc = city(C1.mp.g, C1.mp.proj(cities.daca), 'DACA');
  // Daca → Nueva York
  const s2 = $('m1ny'); defs(s2);
  C1.mn = worldMap(s2, [8, 0]);
  C1.mnA = arc(C1.mn, cities.daca, cities.ny, '#e9e6df', 3);
  C1.mnc = { daca: city(C1.mn.g, C1.mn.proj(cities.daca), 'DACA', 'start'), ny: city(C1.mn.g, C1.mn.proj(cities.ny), 'NUEVA YORK · LA FED', 'end') };
  // red mundial de bancos: puntos sobre tierra firme (se muestrea un lienzo con el mapa)
  const s3 = $('m1net'); defs(s3);
  C1.mw = worldMap(s3, [-10, 0]);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.beginPath(); d3.geoPath(C1.mw.proj, cx)(MAPDATA.land); cx.fill();
  const px = cx.getImageData(0, 0, W, H).data, R2 = rnd(23);
  // más densidad cerca de los grandes centros financieros
  const hubs = [[-74, 40.7], [-0.1, 51.5], [8.7, 50.1], [139.7, 35.7], [103.8, 1.35], [114.2, 22.3], [2.35, 48.85], [-46.6, -23.5], [72.8, 19.1], [55.3, 25.2], [151.2, -33.9], [37.6, 55.75], [-99.1, 19.4], [-58.4, -34.6], [28, -26.2], [121.5, 31.2]].map(h => C1.mw.proj(h));
  C1.nodes = [];
  while (C1.nodes.length < 900) {
    let x, y;
    if (R2() < .55) { const h = hubs[Math.floor(R2() * hubs.length)]; x = h[0] + (R2() - .5) * 160; y = h[1] + (R2() - .5) * 110; }
    else { x = R2() * W; y = R2() * H; }
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= W || y >= H || px[(y * W + x) * 4 + 3] < 128) continue;
    C1.nodes.push({ x, y, e: el('circle', { cx: x, cy: y, r: 1.8, fill: '#ffb23e', opacity: 0 }, C1.mw.g), k: R2() });
  }
  C1.links = Array.from({ length: 70 }, (_, i) => {
    const a = C1.nodes[Math.floor(R2() * C1.nodes.length)], b = hubs[i % hubs.length];
    const mx = (a.x + b[0]) / 2, my = (a.y + b[1]) / 2 - Math.hypot(b[0] - a.x, b[1] - a.y) * .22;
    return { p: el('path', { d: `M${a.x} ${a.y} Q${mx} ${my} ${b[0]} ${b[1]}`, fill: 'none', stroke: '#ffb23e', 'stroke-width': 1, opacity: 0, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, C1.mw.g), k: R2() };
  });
});

RENDER.push(function cap1(t) {
  // Bangladés: 160 millones
  if (C1.mp && on('s1_pop')) {
    const a = S('c26'), k = io(K('s1_pop', t));
    const [dx, dy] = C1.mp.proj(cities.daca);
    mapCam(C1.mp, lerp(W / 2, dx, k * .5), lerp(H / 2, dy, k * .5), lerp(1, 1.18, k));
    C1.mpc.inner.setAttribute('transform', `scale(${1 / lerp(1, 1.18, k)})`);
    C1.mpc.c.setAttribute('opacity', P(t, a - .2, a + .4)); pulse(C1.mpc, t);
    const f = eo(P(t, AT('c26', 'más de') - .3, E('c26') + .2));
    const n = Math.floor(f * C1.dots.length);
    C1.dots.forEach((d, i) => d.setAttribute('opacity', i < n ? .75 : 0));
    $('popv').textContent = (f > .999 ? '+ ' : '') + fmt(160e6 * f);
  }
  // una de cada cinco
  if (on('s1_pov')) {
    const a = AT('c27', 'una de cada');
    C1.ppl.forEach((p, i) => { const k = eo(P(t, a - .4 + i * .12, a + i * .12)); p.style.opacity = k; p.style.transform = `translateY(${lerp(20, 0, k)}px)`; });
  }
  // el colchón de reservas: los fajos se apilan
  if (C1.resg && on('s1_res')) {
    const k = eo(P(t, S('c28') - .1, AT('c28', 'reservas') + .9));
    const n = Math.floor(k * C1.bundles.length);
    C1.bundles.forEach(b => b.parts.forEach(p => p.setAttribute('opacity', b.i < n ? 1 : 0)));
    const z = io(K('s1_res', t));
    C1.resg.setAttribute('transform', `translate(${lerp(1050, 1010, z)} ${lerp(560, 590, z)}) scale(${lerp(1.05, 1.2, z)})`);
  }
  // para qué sirven las reservas
  if (on('s1_uses')) {
    const marks = [AT('c29', 'pagar'), AT('c29', 'sostener'), AT('c29', 'responder')];
    ['u1', 'u2', 'u3'].forEach((id, i) => {
      const k = eo(P(t, marks[i] - .3, marks[i] + .2)), p = $(id);
      p.style.opacity = k * lerp(1, .5, P(t, (marks[i + 1] || 1e9) - .1, (marks[i + 1] || 1e9) + .4));
      p.style.transform = `translateY(${lerp(40, 0, k)}px)`;
    });
    C1.ship.forEach((s, i) => drawK(s, io(P(t, marks[0] - .3 + i * .08, marks[0] + .6 + i * .08))));
    kb($('takaimg'), P(t, marks[1] - .3, SCN.s1_uses[1]), 1.05, 1.18, 0, -20, 0, 0);
    drawK(C1.crisis, io(P(t, marks[2] - .3, marks[2] + 1.1)));
    drawK(C1.cshield, eo(P(t, marks[2] + .9, marks[2] + 1.5)));
  }
  // una parte de las reservas está en Nueva York
  if (C1.mn && on('s1_map')) {
    const a = S('c30'), k = io(K('s1_map', t));
    C1.mnc.daca.c.setAttribute('opacity', P(t, a - .2, a + .3));
    C1.mnc.ny.c.setAttribute('opacity', P(t, S('c31') - .2, S('c31') + .4));
    C1.mnA.draw(io(P(t, a + .4, S('c31') + .3)));
    pulse(C1.mnc.daca, t); pulse(C1.mnc.ny, t, .8, .4);
    const [nx, ny] = C1.mn.proj(cities.ny);
    const s = lerp(1, 2.1, io(P(t, S('c31'), AT('c31', 'la Fed') + .3)));
    mapCam(C1.mn, lerp(W / 2, nx, io(P(t, S('c31'), AT('c31', 'la Fed') + .3))), lerp(H / 2, ny, io(P(t, S('c31'), AT('c31', 'la Fed') + .3))), s * lerp(1, 1.03, k));
    for (const c of Object.values(C1.mnc)) c.inner.setAttribute('transform', `scale(${1 / s})`);
    C1.mnA.pth.setAttribute('stroke-width', 3 / s);
  }
  // diagrama SWIFT
  if (on('s1_diag')) {
    const a = S('c32');
    $('dA').style.opacity = eo(P(t, a - .3, a + .2)); $('dB').style.opacity = eo(P(t, a + .1, a + .6));
    drawK(C1.arrA, io(P(t, a + .3, a + .9))); drawK(C1.arrB, io(P(t, a + 1.5, a + 2.1)));
    const m = io(P(t, a + .6, AT('c32', 'SWIFT') + .4));
    const ev = $('denv'); ev.style.opacity = eo(P(t, a + .5, a + .8));
    ev.style.transform = `translateX(${lerp(-130, 0, m)}px)`;
    const m2 = io(P(t, AT('c33', 'se envían') - .4, AT('c33', 'se envían') + .8));
    ev.style.transform = `translateX(${lerp(-130, 0, m) + lerp(0, 330, m2)}px) scale(${lerp(1, .55, m2)})`;
    ev.style.opacity = eo(P(t, a + .5, a + .8)) * (1 - P(t, AT('c33', 'se envían') + .6, AT('c33', 'se envían') + .9));
    $('dB').style.boxShadow = `0 0 ${60 * P(t, AT('c33', 'se envían') + .5, AT('c33', 'se envían') + .9)}px rgba(255,178,62,.3)`;
  }
  // más de 11.000 instituciones
  if (C1.mw && on('s1_net')) {
    const a = AT('c33', 'más de once') - .1, k = eo(P(t, a, a + 2.4));
    C1.nodes.forEach(n => n.e.setAttribute('opacity', n.k < k ? .8 : 0));
    C1.links.forEach(l => { const q = P(t, a + .4 + l.k * 2.2, a + 1.2 + l.k * 2.2); drawK(l.p, io(q)); l.p.setAttribute('opacity', q > 0 ? .35 : 0); });
    $('netv').textContent = '+ ' + fmt(11000 * k);
    mapCam(C1.mw, W / 2, H / 2, lerp(1, 1.06, io(K('s1_net', t))));
  }
  // la impresora arranca y saca hojas
  if (C1.pr.g && on('s1_pr')) {
    printSheets(C1.pr, t, PR3_0, PR3GAP);
    const ok = t > PR3_0 - .5;
    C1.pr.led.setAttribute('fill', ok ? '#4fb07a' : '#ffb23e'); C1.pr.halo.setAttribute('opacity', ok ? .3 : (Math.floor(t * 1.6) % 2 ? .05 : 1));
    const z = io(K('s1_pr', t));
    C1.pr.g.setAttribute('transform', `translate(${lerp(600, 560, z)} ${lerp(330, 300, z)}) scale(${lerp(1.5, 1.85, z)})`);
  }
  // los mensajes de la Fed
  if (on('s1_msg')) {
    const a = S('c35'), k = eo(P(t, a - .3, a + .4));
    $('msheet').style.transform = `translateY(${lerp(60, 0, k)}px)`;
    document.querySelectorAll('#mrefs .ref').forEach((r, i) => { r.style.opacity = P(t, AT('c36', 'órdenes') + i * .25, AT('c36', 'órdenes') + .2 + i * .25); });
    const h = eo(P(t, AT('c37', 'salieron') - .2, AT('c37', 'salieron') + .2)), m = $('mord');
    const hl = $('mhl'); hl.style.opacity = h;
    hl.style.left = (m.offsetLeft - 14) + 'px'; hl.style.top = (m.offsetTop - 4) + 'px'; hl.style.width = (m.offsetWidth + 28) + 'px'; hl.style.height = (m.offsetHeight + 8) + 'px';
    hl.style.transform = `scale(${lerp(1.15, 1, h)})`;
    m.style.color = h > .5 ? '#b5302a' : '';
    const z = io(K('s1_msg', t));
    $('msgcam').style.transform = `scale(${lerp(1, 1.12, z)}) translateY(${lerp(0, 40, z)}px)`;
  }
  // vaciar la cuenta
  if (on('s1_drain')) {
    const a = S('c38'), k = io(P(t, a + .1, E('c38') + .5));
    $('dfill').style.width = lerp(100, 1.5, k) + '%';
    $('dfill').style.background = k > .3 ? 'linear-gradient(90deg,#8a2b25,#d23a32)' : '';
    $('dbal').textContent = 'SALDO · ' + Math.round(lerp(100, 1, k)) + ' %';
    $('dbal').style.color = k > .3 ? '#d23a32' : '#e9e6df';
  }
  // casi mil millones
  if (on('s1_951')) {
    const a = S('c39') - .05;
    $('n951').innerHTML = '<small>US$</small>' + fmt(951e6 * eo(P(t, a, a + 1.6)));
    $('n951s').style.opacity = P(t, E('c39') - .2, E('c39') + .5);
  }
  // oficina vacía
  if (C1.offg && on('s1_office')) {
    const z = io(K('s1_office', t));
    C1.offg.setAttribute('transform', `translate(${lerp(820, 780, z)} ${lerp(330, 300, z)}) scale(${lerp(1.25, 1.42, z)})`);
    blinkLed(C1.offpr, t);
    $('offt').style.opacity = P(t, S('c40') + .3, S('c40') + 1.0);
  }
  // retroceder más de un año
  if (on('s1_rew')) {
    const a = AT('c41', 'retroceder') - .2, k = io(P(t, a, a + 2.2));
    const d0 = new Date(2016, 1, 5), d1 = new Date(2015, 0, 12);
    const d = new Date(lerp(d0.getTime(), d1.getTime(), k));
    const p2 = n => String(n).padStart(2, '0');
    $('rewd').textContent = `${p2(d.getDate())}·${p2(d.getMonth() + 1)}·${d.getFullYear()}`;
    $('rewd').style.color = k > 0 && k < 1 ? '#8b919a' : '#e9e6df';
    $('rewd').style.opacity = 1 - P(t, S('c42') - .3, S('c42') + .2);
    $('s1_rew').querySelector('.lines').style.transform = `translateY(${(t * 400) % 7}px)`;
    $('s1_rew').querySelector('.lines').style.opacity = k > 0 && k < 1 ? 1 : .3;
    C1.env.forEach((p, i) => drawK(p, io(P(t, S('c42') - .1 + i * .2, S('c42') + .9 + i * .2))));
  }
});
