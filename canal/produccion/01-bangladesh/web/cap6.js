// Capítulo VI · La mesa de bacará: Solaire y Midas, Xu Weikang, por qué casinos y la pared
addCSS(`
#s6_split .bx,#s6_wong .bx{position:absolute;height:120px;display:flex;align-items:center;justify-content:center;font:500 46px 'IBM Plex Mono';transform-origin:left}
#s6_split .lb,#s6_wong .lb{position:absolute;font:400 22px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);text-transform:uppercase}
#s6_xu .sil{position:absolute;left:50%;top:150px;width:460px;height:620px;margin-left:-230px}
#s6_xu .nm{position:absolute;left:0;right:0;top:800px;text-align:center;font:600 64px Inter;letter-spacing:.14em}
#s6_xu .sb{position:absolute;left:0;right:0;top:890px;text-align:center}
.flow6{position:absolute;left:0;right:0;top:330px;display:flex;justify-content:center;gap:70px}
.flow6 div{width:250px;text-align:center;opacity:0}
.flow6 svg{width:250px;height:250px}
.flow6 .t{font:500 24px 'IBM Plex Mono';letter-spacing:.14em;margin-top:10px}
#s6_cyc .trail{position:absolute;left:160px;right:160px;top:700px;height:6px}
#s6_vip .room{position:absolute;top:220px;width:700px;height:560px;border:3px solid #2a313b}
#s6_vip .room .t{position:absolute;left:0;right:0;top:-56px;text-align:center;font:500 28px 'IBM Plex Mono';letter-spacing:.16em}
#s6_bac .zone{position:absolute;font:600 40px 'IBM Plex Mono';letter-spacing:.14em;text-align:center;opacity:0;color:#e9e6df;text-shadow:0 0 20px rgba(0,0,0,.8)}
#s6_bac .meter{position:absolute;left:280px;right:280px;top:910px;height:40px;border:2px solid #2a313b;background:#0b0e12}
#s6_bac .meter i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#3d8a5a,#4fb07a)}
#s6_bac .meter b{position:absolute;top:-52px;font:500 30px 'IBM Plex Mono';color:var(--green);transform:translateX(-50%)}
#s6_fee .row{font:500 150px 'IBM Plex Mono';letter-spacing:.02em;text-align:center}
#s6_fee .row s{text-decoration:none;color:var(--mut)}
#s6_fee .row b{color:var(--red);font-weight:500}
#s6_wall .nd6{position:absolute;top:460px;font:500 26px 'IBM Plex Mono';letter-spacing:.14em;text-align:center;width:240px;opacity:0}
#s6_wall .nd6 i{display:block;width:22px;height:22px;border-radius:50%;background:#ffb23e;margin:0 auto 18px;box-shadow:0 0 20px #ffb23e}
#s6_tv .grid{position:absolute;left:50%;top:50%;width:1600px;height:900px;margin:-450px 0 0 -800px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
#s6_tv .tv{position:relative;border:8px solid #15191e;border-radius:10px;background:#0b0e12;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6)}
#s6_tv .tv canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.5}
#s6_tv .tv .live{position:absolute;left:14px;top:12px;font:600 15px 'IBM Plex Mono';letter-spacing:.16em;color:#fff;background:#b5302a;padding:3px 10px}
#s6_tv .tv svg{position:absolute;inset:0;width:100%;height:100%}
#s6_tv .l3{position:absolute;left:0;right:0;bottom:70px;margin:0 auto;width:1300px;padding:22px 34px;background:rgba(10,13,17,.92);border-left:8px solid var(--red);opacity:0}
#s6_tv .l3 .a{font:600 44px Inter;letter-spacing:.06em}
#s6_tv .l3 .b{font:400 22px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut);margin-top:8px}
#s6_qq .q1{font:600 100px 'Cormorant Garamond';color:#8b919a;position:relative;display:inline-block}
#s6_qq .q1:after{content:'';position:absolute;left:-10px;right:-10px;top:55%;height:7px;background:var(--red);transform:scaleX(var(--k,0));transform-origin:left}
#s6_qq .q2{font:600 140px 'Cormorant Garamond';margin-top:50px}
`);
const BILLS = 'M20 60 L230 60 L230 170 L20 170 Z M45 85 L205 85 M45 145 L205 145 M125 95 a20 20 0 1 0 .1 0';
const CHIPS = 'M125 70 a60 22 0 1 0 .1 0 M65 92 L65 160 M185 92 L185 160 M65 160 a60 22 0 0 0 120 0 M65 115 a60 22 0 0 0 120 0 M65 138 a60 22 0 0 0 120 0';
const TABLE = 'M25 125 Q25 50 125 50 Q225 50 225 125 Q225 190 125 190 Q25 190 25 125 Z M95 95 L120 95 L120 130 L95 130 Z M130 95 L155 95 L155 130 L130 130 Z';
addHTML(`
<div class="scene" id="s6_asia"><div class="cam"><svg id="a6svg" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">China continental</div><div class="v" style="font-size:64px">El juego está prohibido</div></div></div>
<div class="scene" id="s6_split"><div class="glow"></div><div class="cam">
  <div class="lb" style="left:200px;top:240px">Lo que pasó por el RCBC</div><div class="bx" id="b81" style="left:200px;top:290px;width:1520px;background:#5a1e1b;border:2px solid #d23a32">US$ 81 MILLONES</div>
  <div class="lb" style="left:200px;top:540px" id="l50">Casinos · Solaire y Midas</div><div class="bx" id="b50" style="left:200px;top:590px;width:${(50 / 81 * 1520).toFixed(0)}px;background:#3a2a12;border:2px solid #ffb23e">US$ 50 M</div>
  <div class="lb" style="left:${(200 + 50 / 81 * 1520 + 20).toFixed(0)}px;top:540px" id="l31">Xu Weikang</div><div class="bx" id="b31" style="left:${(200 + 50 / 81 * 1520 + 20).toFixed(0)}px;top:590px;width:${(31 / 81 * 1520 - 20).toFixed(0)}px;background:#1d232b;border:2px solid #8b919a">US$ 31 M</div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:800px;font-size:44px;color:#e9e6df" id="q31">¿Y los otros 31?</div></div></div>
<div class="scene" id="s6_xu"><div class="glow"></div><div class="cam"><svg class="sil" viewBox="0 0 460 620" id="xusvg"></svg>
  <div class="nm" id="xunm">XU WEIKANG</div><div class="sb lbl" id="xusb">Ciudadano chino · recibió US$ 31 millones, según el Senado filipino</div></div></div>
<div class="scene" id="s6_cyc"><div class="glow"></div><div class="cam"><div class="flow6">
  <div id="cy0"><svg viewBox="0 0 250 250"><path d="${BILLS}" fill="none" stroke="#e9e6df" stroke-width="5"/></svg><div class="t">DINERO</div></div>
  <div id="cy1"><svg viewBox="0 0 250 250"><path d="${CHIPS}" fill="none" stroke="#ffb23e" stroke-width="5"/></svg><div class="t">FICHAS</div></div>
  <div id="cy2"><svg viewBox="0 0 250 250"><path d="${TABLE}" fill="none" stroke="#4fb07a" stroke-width="5"/></svg><div class="t">LA MESA</div></div>
  <div id="cy3"><svg viewBox="0 0 250 250"><path d="${CHIPS}" fill="none" stroke="#ffb23e" stroke-width="5"/></svg><div class="t">FICHAS</div></div>
  <div id="cy4"><svg viewBox="0 0 250 250"><path d="${BILLS}" fill="none" stroke="#e9e6df" stroke-width="5"/></svg><div class="t">DINERO</div></div></div>
  <svg class="trail" id="cytr" viewBox="0 0 1600 6" preserveAspectRatio="none"><line x1="0" y1="3" x2="1600" y2="3" stroke="#d23a32" stroke-width="6" id="cyl1"/></svg>
  <div class="lbl" style="position:absolute;left:0;right:0;top:760px;text-align:center" id="cyt">El rastro</div></div></div>
<div class="scene" id="s6_vip"><div class="glow"></div><div class="cam"><svg id="vipsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="room" style="left:200px" id="rm1"><div class="t">SALA PÚBLICA</div></div>
  <div class="room" style="right:200px;border-color:#5a1e1b" id="rm2"><div class="t" style="color:var(--red)">SALÓN PRIVADO</div></div></div></div>
<div class="scene" id="s6_bac"><div class="cam"><svg id="bacsvg" width="1920" height="1080"></svg>
  <div class="zone" id="z1" style="left:470px;top:560px;width:300px">JUGADOR</div><div class="zone" id="z2" style="left:810px;top:610px;width:300px">EMPATE</div><div class="zone" id="z3" style="left:1150px;top:560px;width:300px">BANCA</div>
  <div class="meter" id="m6"><i id="m6i"></i><b id="m6b">100 %</b></div>
  <div class="lbl" style="position:absolute;left:280px;top:970px">Lo que recupera un jugador con experiencia</div></div></div>
<div class="scene" id="s6_fee"><div class="glow"></div><div class="cam"><div class="center"><div class="row"><s>US$ 1,00</s> → <span id="fe90">US$ 1,00</span></div>
  <div class="bigsub" id="feb" style="font-size:40px;color:var(--red);letter-spacing:.14em">Comisión de lavado · 10 %</div></div></div></div>
<div class="scene" id="s6_hands"><div class="cam"><svg id="hdsvg" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Mano tras mano · semanas</div><div class="v" id="hdv" style="font-size:80px">US$ 0</div></div>
  <div class="tag" style="left:110px;top:96px">Salón privado · recreación</div></div>
<div class="scene" id="s6_wall"><div class="glow"></div><div class="cam"><svg id="wlsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="nd6" id="w60" style="left:100px"><i></i>DACA</div><div class="nd6" id="w61" style="left:440px"><i></i>NUEVA YORK</div>
  <div class="nd6" id="w62" style="left:780px"><i></i>RCBC · MANILA</div><div class="nd6" id="w63" style="left:1120px"><i style="background:#d23a32;box-shadow:0 0 20px #d23a32"></i>CASINOS</div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:800px" id="wlt">Hasta las puertas de los casinos</div></div></div>
<div class="scene" id="s6_wong"><div class="glow"></div><div class="cam">
  <div class="lb" style="left:200px;top:300px">Lo que entró a los casinos</div>
  <div class="bx" id="wg50" style="left:200px;top:350px;width:1520px;background:#3a2a12;border:2px solid #ffb23e"></div>
  <div class="bx" id="wg16" style="left:200px;top:350px;width:${(16 / 50 * 1520).toFixed(0)}px;background:#1f4a32;border:2px solid #4fb07a;font-size:36px">RECUPERADO · US$ 16 M</div>
  <div style="position:absolute;left:200px;top:540px"><div style="font:600 54px Inter;letter-spacing:.08em">KIM WONG</div><div class="lbl" style="margin-top:10px">Organizador de viajes de juego · casino Midas</div></div>
  <div id="wgst" style="position:absolute;left:200px;top:720px;font:600 40px 'IBM Plex Mono';letter-spacing:.12em;opacity:0">ACUSADO <span id="wgx" style="color:var(--red);opacity:0">→ CARGOS RETIRADOS</span></div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:880px;font-size:40px;color:var(--red)" id="wgr">El resto se fue</div></div></div>
<div class="scene" id="s6_mac"><div class="cam"><svg id="mc6" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s6_nk"><div class="cam"><svg id="nk6" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s6_tv"><div class="cam"><div class="grid" id="tvg"></div></div>
  <div class="l3" id="tvl3"><div class="a">MAIA SANTOS DEGUITO</div><div class="b">GERENTA DE LA SUCURSAL JUPITER DEL RCBC · NEGÓ HABER HECHO ALGO MALO</div></div></div>
<div class="scene" id="s6_law2"><div class="glow"></div><div class="cam"><div class="lw" style="position:absolute;left:50%;top:50%;width:900px;margin:-260px 0 0 -450px">
  <div class="lbl" style="margin-bottom:26px">Ley contra el lavado de dinero · Filipinas</div>
  <div style="display:flex;justify-content:space-between;padding:22px 8px;border-bottom:1px dashed #2a313b;font:500 40px 'IBM Plex Mono'"><span>BANCOS</span><b style="color:var(--green);font-weight:500">✓</b></div>
  <div style="display:flex;justify-content:space-between;padding:22px 8px;border-bottom:1px dashed #2a313b;font:500 40px 'IBM Plex Mono'"><span>CASAS DE CAMBIO</span><b style="color:var(--green);font-weight:500">✓</b></div>
  <div style="display:flex;justify-content:space-between;padding:22px 8px;font:500 40px 'IBM Plex Mono'" id="lw6"><span>CASINOS</span><b id="lw6b" style="font-weight:500">✗</b></div>
  <div class="bigsub" id="lw6y" style="text-align:left;color:var(--amber)">2017 · reforma de la ley</div></div></div></div>
<div class="scene" id="s6_qq"><div class="glow"></div><div class="cam"><div class="center"><div class="q1" id="q6a">¿Dónde está el dinero?</div><div class="q2" id="q6b">¿Quién lo robó?</div></div></div></div>
`);
chapterCard('s6_card', 'ch6', 'VI', 'La mesa de bacará');
photo('s6_bay', [S('c194') - .3, AT('c194', 'sobre todo') + .2, .8, .6], { src: 'bahia-manila.jpg', kb: [1.06, 1.16, -20, 20, 0, -10], filter: 'saturate(.65) brightness(.55) contrast(1.1)',
  cap: ['Bahía de Manila', 'Un destino del juego en Asia'] });
photo('s6_sol', [S('c195') - .3, AT('c195', 'un salón de juego') - .1, .6, .5], { src: 'solaire.jpg', kb: [1.05, 1.15, 0, -30, 0, 0], filter: 'saturate(.7) brightness(.6) contrast(1.08)',
  cap: ['Solaire Resort & Casino', 'Bahía de Manila'] });
photo('s6_floor', [AT('c195', 'un salón de juego') - .3, S('c196') + .1, .5, .5], { src: 'tragamonedas.jpg', kb: [1.08, 1.2, 30, -30, 0, 0], filter: 'saturate(.7) brightness(.5) contrast(1.12)', ilus: true,
  cap: ['Cientos de mesas', 'miles de tragamonedas'] });
photo('s6_jet', [S('c199') - .3, S('c201') - .3, .6, 1.0], { src: 'jet.jpg', kb: [1.06, 1.18, 0, 40, 0, -20], filter: 'saturate(.5) brightness(.75) contrast(1.15)', ilus: true,
  cap: ['Se cree que salió del país', 'en un avión privado'] });
bigText('s6_why', [S('c201') - .3, S('c202') - .1, .5, .5], '¿Por qué casinos?');
photo('s6_law', [S('c202') - .2, S('c204') - .1, .5, .5], { src: 'fichas.jpg', kb: [1.06, 1.16, 20, -20, 0, 0], filter: 'saturate(.5) brightness(.42) contrast(1.12)',
  html: `<div class="center"><div class="big" style="font-size:84px" id="lw6a">Fuera de la ley antilavado</div><div class="bigsub" id="lw6c">Para el casino: dinero de jugadores</div></div>` });
bigText('s6_risk', [S('c206') - .2, S('c208') - .1, .5, .5], '¿Cómo no perder el botín?', { delay: AT('c207', 'Cómo') - S('c206') + .1, bg: '<div class="glow" style="background:radial-gradient(ellipse at 50% 60%,rgba(40,110,70,.25),transparent 65%)"></div>', sub: 'Apostar es arriesgado' , subDelay: -1.6 });
photo('s6_lisboa', [AT('c221', 'Macao') - .3, S('c222') + .1, .6, .6], { src: 'macao-lisboa.jpg', kb: [1.06, 1.18, 0, 0, 0, -20], filter: 'saturate(.75) brightness(.55) contrast(1.1)',
  cap: ['Macao', 'El enclave de los casinos'] });
Object.assign(SCN, {
  s6_asia: [AT('c194', 'sobre todo') - .2, S('c195') - .1, .5, .5],
  s6_split: [S('c196') - .2, S('c198') - .1, .5, .5],
  s6_xu: [S('c198') - .2, S('c199') - .1, .5, .5],
  s6_cyc: [S('c204') - .2, S('c206') - .1, .5, .5],
  s6_vip: [S('c208') - .2, S('c210') - .1, .5, .5],
  s6_bac: [S('c210') - .2, S('c213') - .1, .5, .5],
  s6_fee: [S('c213') - .2, S('c215') - .1, .5, .5],
  s6_hands: [S('c215') - .2, S('c216') - .1, .6, .6],
  s6_wall: [S('c216') - .2, S('c218') - .1, .5, .5],
  s6_wong: [S('c218') - .2, S('c221') - .1, .5, .5],
  s6_mac: [S('c221') - .2, AT('c221', 'Macao') + .1, .5, .5],
  s6_nk: [S('c222') - .2, S('c223') - .1, .5, .6],
  s6_tv: [S('c223') - .2, S('c226') - .1, .5, .5],
  s6_law2: [S('c226') - .2, S('c227') - .1, .5, .5],
  s6_qq: [S('c227') - .2, S('ch7') + .2, .5, .7],
});
// la pared del final del rastro (sonido.py usa el mismo momento)
const WALL6 = AT('c217', 'una pared') - .1;

const C6 = {};
SETUP.push(function setupCap6() {
  // silueta de Xu Weikang
  const xs = $('xusvg');
  C6.xu = [stroke(xs, 'M230 70 Q300 70 304 150 Q306 210 270 236 L276 250 Q356 270 370 330 L390 600 L70 600 L90 330 Q104 270 184 250 L190 236 Q154 210 156 150 Q160 70 230 70 Z', { 'stroke-width': 5 })];
  C6.xuq = el('text', { x: 230, y: 200, fill: '#d23a32', 'font-family': 'Cormorant Garamond', 'font-size': 140, 'text-anchor': 'middle', opacity: 0 }, xs); C6.xuq.textContent = '?';
  // salones: sala pública y salón privado
  const vs = $('vipsvg'), R = rnd(151);
  C6.pub = []; C6.priv = [];
  for (let i = 0; i < 26; i++) C6.pub.push(el('circle', { cx: 230 + R() * 640, cy: 260 + R() * 480, r: 14, fill: ['#8fb3cc', '#e9e6df', '#ffb23e', '#4fb07a'][i % 4], opacity: 0 }, vs));
  el('ellipse', { cx: 1370, cy: 500, rx: 210, ry: 120, fill: '#13301f', stroke: '#2f7d4f', 'stroke-width': 3 }, vs);
  for (let i = 0; i < 9; i++) { const a = Math.PI * (.15 + i * .0875) * 2; C6.priv.push(el('circle', { cx: 1370 + Math.cos(a) * 270, cy: 500 + Math.sin(a) * 175, r: 18, fill: '#d23a32', opacity: 0 }, vs)); }
  // mesa de bacará vista desde arriba
  const bs = $('bacsvg');
  const gd = el('defs', {}, bs), rg = el('radialGradient', { id: 'felt' }, gd);
  el('stop', { offset: '0%', 'stop-color': '#1d4a32' }, rg); el('stop', { offset: '100%', 'stop-color': '#0a1a12' }, rg);
  const lg = el('radialGradient', { id: 'lamp6' }, gd);
  el('stop', { offset: '0%', 'stop-color': '#ffd9a0', 'stop-opacity': .22 }, lg); el('stop', { offset: '100%', 'stop-color': '#ffd9a0', 'stop-opacity': 0 }, lg);
  el('path', { d: 'M260 420 Q260 200 960 200 Q1660 200 1660 420 L1660 520 Q1660 860 960 860 Q260 860 260 520 Z', fill: 'url(#felt)', stroke: '#3b2a17', 'stroke-width': 26 }, bs);
  el('ellipse', { cx: 960, cy: 480, rx: 820, ry: 420, fill: 'url(#lamp6)' }, bs);
  C6.zones = [[620, 520, 170], [960, 570, 150], [1300, 520, 170]].map(([x, y, r], i) => el('ellipse', { cx: x, cy: y, rx: r, ry: r * .45, fill: 'none', stroke: '#c9b98a', 'stroke-width': 3, opacity: 0 }, bs));
  // manos de bacará: cartas que se reparten
  const hs = $('hdsvg');
  const gd2 = el('defs', {}, hs), rg2 = el('radialGradient', { id: 'felt2' }, gd2);
  el('stop', { offset: '0%', 'stop-color': '#1a4029' }, rg2); el('stop', { offset: '100%', 'stop-color': '#050c08' }, rg2);
  el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#felt2)' }, hs);
  C6.cards = Array.from({ length: 6 }, (_, i) => {
    const g = el('g', { opacity: 0 }, hs);
    el('rect', { x: -70, y: -100, width: 140, height: 200, rx: 10, fill: '#efeae0', stroke: '#b7b2a8', 'stroke-width': 2 }, g);
    const tx = el('text', { x: 0, y: 26, 'text-anchor': 'middle', 'font-family': 'Cormorant Garamond', 'font-size': 90, fill: i % 2 ? '#b5302a' : '#16171a' }, g);
    tx.textContent = ['9', 'K', '7', '3', 'Q', '8'][i];
    const back = el('rect', { x: -70, y: -100, width: 140, height: 200, rx: 10, fill: '#5a1e1b', stroke: '#c9b98a', 'stroke-width': 3 }, g);
    return { g, back, x: 600 + (i % 3) * 180 + (i > 2 ? 360 : 0) - (i > 2 ? 360 : 0), side: i < 3 ? 0 : 1 };
  });
  C6.chips = Array.from({ length: 12 }, (_, i) => el('ellipse', { cx: 820 + (i % 6) * 50, cy: 820 - Math.floor(i / 6) * 14, rx: 34, ry: 12, fill: ['#d23a32', '#e9e6df', '#ffb23e'][i % 3], stroke: '#000', 'stroke-width': 1, opacity: 0 }, hs));
  // pared de ladrillos
  const ws = $('wlsvg');
  C6.trail = el('path', { d: 'M211 471 L551 471 L891 471 L1231 471 L1440 471', fill: 'none', stroke: '#ffb23e', 'stroke-width': 4, 'stroke-dasharray': '14 10', pathLength: 1 }, ws);
  C6.bricks = [];
  for (let r = 0; r < 12; r++) for (let c = 0; c < 4; c++) C6.bricks.push(el('rect', { x: 1450 + c * 84 + (r % 2) * 42, y: 230 + r * 44, width: 78, height: 38, fill: '#6b3a30', stroke: '#2a1612', 'stroke-width': 3, opacity: 0 }, ws));
  // televisores del Senado
  $('tvg').innerHTML = Array.from({ length: 9 }, (_, i) => `<div class="tv"><canvas width="160" height="90"></canvas><svg viewBox="0 0 500 280"></svg><div class="live">EN VIVO · SENADO</div></div>`).join('');
  C6.tvs = [...document.querySelectorAll('#tvg .tv')].map((tv, i) => {
    const sv = tv.querySelector('svg');
    // estrado y siluetas
    el('rect', { x: 40, y: 150, width: 420, height: 60, fill: '#1d232b' }, sv);
    for (let k = 0; k < 5; k++) { el('circle', { cx: 90 + k * 80, cy: 118, r: 18, fill: '#2e3640' }, sv); el('path', { d: `M${62 + k * 80} 150 Q${90 + k * 80} 128 ${118 + k * 80} 150 Z`, fill: '#2e3640' }, sv); }
    if (i === 4) { el('circle', { cx: 250, cy: 236, r: 22, fill: '#5a1e1b' }, sv); el('path', { d: 'M214 280 Q250 250 286 280 Z', fill: '#5a1e1b' }, sv); }
    return { cv: tv.querySelector('canvas'), ctx: tv.querySelector('canvas').getContext('2d'), seed: i * 97 };
  });
});
MAPSETUP.push(function mapsCap6() {
  // China → Manila
  const s = $('a6svg'); defs(s);
  C6.am = regionMap(s, [[95, 8], [135, 42]], [[100, 60], [W - 100, H - 60]]);
  C6.cn = el('path', { d: C6.am.path(country('156')), fill: '#2a1414', stroke: '#d23a32', 'stroke-width': 1.5, opacity: .9 }, C6.am.g);
  el('path', { d: C6.am.path(country('608')), fill: '#1b222b', stroke: '#8b919a', 'stroke-width': 1.5 }, C6.am.g);
  C6.amc = city(C6.am.g, C6.am.proj(cities.manila), 'MANILA');
  C6.aarcs = [[116.4, 39.9], [121.5, 31.2], [113.3, 23.1], [104.1, 30.7], [114.3, 30.6]].map(c => arc(C6.am, c, cities.manila, '#ffb23e', 2.5));
  // Manila → Macao y, más lejos, Corea del Norte
  const s2 = $('mc6'); defs(s2);
  C6.mm = regionMap(s2, [[100, 5], [140, 45]], [[100, 60], [W - 100, H - 60]]);
  C6.nk = el('path', { d: C6.mm.path(country('408')), fill: '#2a1414', stroke: '#d23a32', 'stroke-width': 2, opacity: 0 }, C6.mm.g);
  C6.mmc = { manila: city(C6.mm.g, C6.mm.proj(cities.manila), 'MANILA'), macao: city(C6.mm.g, C6.mm.proj(cities.macao), 'MACAO', 'end') };
  redCity(C6.mmc.macao);
  C6.ma = arc(C6.mm, cities.manila, cities.macao, '#d23a32', 3, { 'stroke-dasharray': '10 10' });
  // copia del mapa para "un país en particular"
  const s3 = $('nk6'); defs(s3);
  C6.ng = C6.mm.g.cloneNode(true); s3.appendChild(C6.ng);
  C6.ng.querySelectorAll('g[opacity]').forEach(g => g.setAttribute('opacity', 1));
  C6.nkp = el('path', { d: C6.mm.path(country('408')), fill: '#5a1e1b', stroke: '#d23a32', 'stroke-width': 2, opacity: 0 }, C6.ng);
  C6.nkq = el('text', { x: C6.mm.proj([127, 40.3])[0] + 40, y: C6.mm.proj([127, 40.3])[1], fill: '#d23a32', 'font-family': 'Cormorant Garamond', 'font-size': 110, opacity: 0 }, C6.ng); C6.nkq.textContent = '?';
});

RENDER.push(function cap6(t) {
  if (C6.am && on('s6_asia')) {
    C6.amc.c.setAttribute('opacity', 1); pulse(C6.amc, t);
    C6.aarcs.forEach((a, i) => { a.draw(io(P(t, AT('c194', 'jugadores') - .5 + i * .2, AT('c194', 'jugadores') + .8 + i * .2))); a.pth.setAttribute('stroke-dasharray', a.L); });
    C6.cn.setAttribute('opacity', .4 + .5 * P(t, AT('c194', 'prohibido') - .3, AT('c194', 'prohibido')));
    mapCam(C6.am, W / 2, H / 2, lerp(1, 1.06, io(K('s6_asia', t))));
  }
  // 81 = 50 + 31
  if (on('s6_split')) {
    $('b81').style.transform = `scaleX(${eo(P(t, S('c196') - .1, S('c196') + .6))})`;
    $('b50').style.transform = `scaleX(${eo(P(t, AT('c196', 'unos cincuenta') - .2, AT('c196', 'unos cincuenta') + .5))})`;
    $('l50').style.opacity = P(t, AT('c196', 'dos casinos') - .2, AT('c196', 'dos casinos') + .3);
    const q = P(t, S('c197') - .2, S('c197') + .3);
    $('b31').style.transform = `scaleX(${eo(q)})`; $('l31').style.opacity = P(t, S('c198') - .5, S('c198'));
    $('b31').style.borderColor = q > .5 ? '#d23a32' : ''; $('q31').style.opacity = q;
    $('b31').textContent = t > S('c198') - .5 ? 'US$ 31 M' : '?';
  }
  // Xu Weikang
  if (on('s6_xu')) {
    drawK(C6.xu[0], io(P(t, S('c198') + .2, AT('c198', 'Xu Weikang'))));
    C6.xuq.setAttribute('opacity', P(t, AT('c198', 'Xu Weikang') - .3, AT('c198', 'Xu Weikang')));
    $('xunm').style.opacity = P(t, AT('c198', 'Xu Weikang') - .2, AT('c198', 'Xu Weikang') + .3);
    $('xusb').style.opacity = P(t, AT('c198', 'Xu Weikang') + .3, AT('c198', 'Xu Weikang') + .9);
  }
  if (on('s6_jet')) {
    const g = P(t, S('c200'), E('c200') + 1.2);
    $('s6_jet').querySelector('.ph img').style.filter = `saturate(.5) brightness(${lerp(.75, .08, g)}) contrast(1.15)`;
  }
  // fuera de la ley
  if (on('s6_law')) {
    $('lw6a').style.opacity = eo(P(t, S('c202') + .3, S('c202') + 1.0));
    $('lw6c').style.opacity = P(t, AT('c203', 'jugadores') - .3, AT('c203', 'jugadores') + .3);
  }
  // dinero → fichas → mesa → fichas → dinero; el rastro se corta en la mesa
  if (on('s6_cyc')) {
    const m = [S('c204') + .1, AT('c204', 'en fichas'), AT('c204', 'jugarlo'), AT('c204', 'volver a cambiarlo'), AT('c204', 'volver a cambiarlo') + .5];
    for (let i = 0; i < 5; i++) { const k = eo(P(t, m[i] - .2, m[i] + .3)); $('cy' + i).style.opacity = k; $('cy' + i).style.transform = `translateY(${lerp(30, 0, k)}px)`; }
    const tr = P(t, m[0], m[4] + .4), cut = P(t, S('c205') - .1, S('c205') + .6);
    $('cyl1').setAttribute('x2', 1600 * tr);
    $('cyl1').setAttribute('stroke-dasharray', cut > 0 ? `${640} ${320 * cut} 2000` : '');
    $('cyt').textContent = cut > .5 ? 'El rastro se corta' : 'El rastro';
    $('cyt').style.color = cut > .5 ? '#d23a32' : '';
  }
  // sala pública o salón privado
  if (on('s6_vip')) {
    C6.pub.forEach((c, i) => c.setAttribute('opacity', P(t, S('c208') - .2 + i * .02, S('c208') + i * .02) * lerp(1, .3, P(t, AT('c208', 'públicas'), AT('c208', 'públicas') + .4))));
    $('rm1').style.opacity = lerp(1, .4, P(t, AT('c208', 'públicas'), AT('c208', 'públicas') + .4));
    C6.priv.forEach((c, i) => c.setAttribute('opacity', P(t, AT('c209', 'los llenaban') - .3 + i * .08, AT('c209', 'los llenaban') + i * .08)));
    $('rm2').style.opacity = eo(P(t, S('c209') - .2, S('c209') + .4)); $('rm2').style.boxShadow = `0 0 ${60 * P(t, S('c209'), S('c209') + .5)}px rgba(210,58,50,.2)`;
  }
  // bacará: tres apuestas y 90 %
  if (on('s6_bac')) {
    const tz = AT('c211', 'tres apuestas');
    C6.zones.forEach((z, i) => { const k = P(t, tz - .2 + i * .25, tz + .1 + i * .25); z.setAttribute('opacity', k); $('z' + (i + 1)).style.opacity = k; });
    const r = io(P(t, AT('c212', 'noventa') - .5, AT('c212', 'noventa') + .5));
    $('m6i').style.width = lerp(100, 90, r) + '%'; $('m6b').style.left = lerp(100, 90, r) + '%';
    $('m6b').textContent = Math.round(lerp(100, 90, r)) + ' %';
    $('m6').style.opacity = P(t, S('c212') - .2, S('c212') + .3); $('m6b').style.opacity = $('m6').style.opacity;
  }
  // diez centavos por dólar
  if (on('s6_fee')) {
    const k = io(P(t, AT('c213', 'perder diez') - .2, AT('c213', 'dólar') + .3));
    $('fe90').textContent = 'US$ ' + lerp(1, .9, k).toFixed(2).replace('.', ',');
    $('fe90').style.color = k > .5 ? '#e9e6df' : '';
    $('feb').style.opacity = P(t, S('c214') - .2, S('c214') + .4);
  }
  // mano tras mano
  if (on('s6_hands')) {
    const per = 2.2, a = S('c215') - .2, n = Math.floor((t - a) / per), u = ((t - a) / per) % 1;
    C6.cards.forEach((c, i) => {
      const d = (i % 3) * .12 + c.side * .06, k = eo(P(u, d, d + .18)), flip = P(u, .45 + d, .55 + d);
      const x = c.side ? 1180 + (i % 3) * 170 : 400 + (i % 3) * 170, y = 470;
      c.g.setAttribute('opacity', (n >= 0 ? 1 : 0) * k * (1 - P(u, .9, 1)));
      c.g.setAttribute('transform', `translate(${lerp(960, x, k)} ${lerp(140, y, k)}) rotate(${(i - 2.5) * 3}) scale(${Math.abs(1 - 2 * flip) * .9 + .1} 1)`);
      c.back.setAttribute('opacity', flip < .5 ? 1 : 0);
    });
    C6.chips.forEach((c, i) => c.setAttribute('opacity', u > .25 && u < .9 ? 1 : 0));
    $('hdv').textContent = 'US$ ' + fmt(50e6 * io(P(t, a, E('c215'))));
  }
  // la pared
  if (on('s6_wall')) {
    for (let i = 0; i < 4; i++) $('w6' + i).style.opacity = eo(P(t, S('c216') + i * .5, S('c216') + .4 + i * .5));
    const tr = P(t, S('c216'), AT('c216', 'las puertas') + .3);
    C6.trail.setAttribute('stroke-dasharray', `${tr} 1`); C6.trail.setAttribute('stroke-dashoffset', 0);
    C6.bricks.forEach((b, i) => b.setAttribute('opacity', P(t, WALL6 + i * .012, WALL6 + .08 + i * .012)));
    $('wlt').textContent = t > WALL6 ? 'Una pared' : 'Hasta las puertas de los casinos';
    $('wlt').style.color = t > WALL6 ? '#d23a32' : '';
  }
  // Kim Wong y lo recuperado
  if (on('s6_wong')) {
    $('wg50').style.transform = `scaleX(${eo(P(t, S('c218') - .1, S('c218') + .5))})`;
    $('wg16').style.transform = `scaleX(${eo(P(t, AT('c218', 'dieciséis') - .2, AT('c218', 'dieciséis') + .6))})`;
    $('wgst').style.opacity = P(t, S('c219') - .1, S('c219') + .3);
    $('wgx').style.opacity = P(t, AT('c219', 'los cargos') - .2, AT('c219', 'los cargos') + .3);
    const gone = P(t, S('c220') - .1, E('c220') + .4);
    $('wg50').style.opacity = lerp(1, .15, gone); $('wgr').style.opacity = gone;
  }
  // Manila → Macao; y un país en particular
  if (C6.mm && on('s6_mac')) {
    for (const k in C6.mmc) { C6.mmc[k].c.setAttribute('opacity', 1); pulse(C6.mmc[k], t); }
    C6.ma.draw(io(P(t, S('c221'), AT('c221', 'Macao'))));
    C6.ma.pth.setAttribute('stroke-dasharray', '10 10');
    mapCam(C6.mm, W / 2, H / 2, lerp(1, 1.08, io(K('s6_mac', t))));
  }
  // un país en particular
  if (C6.ng && on('s6_nk')) {
    const k = io(P(t, S('c222') - .2, E('c222') + 1)), [mx, my] = C6.mm.proj(cities.macao), [nx, ny] = C6.mm.proj([127, 40]);
    C6.ng.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${lerp(1.08, 1.25, k)}) translate(${-lerp(mx, (mx + nx) / 2, k)} ${-lerp(my, (my + ny) / 2, k)})`);
    C6.nkp.setAttribute('opacity', P(t, AT('c222', 'un país') - .2, AT('c222', 'un país') + .4));
    C6.nkq.setAttribute('opacity', P(t, AT('c222', 'particular') - .1, AT('c222', 'particular') + .5));
  }
  // audiencias por televisión
  if (on('s6_tv')) {
    C6.tvs.forEach((tv, i) => {
      const k = P(t, S('c223') + i * .12, S('c223') + .3 + i * .12);
      tv.cv.parentElement.style.opacity = k * (i === 4 || t < S('c224') ? 1 : lerp(1, .35, P(t, S('c224'), S('c224') + .5)));
      const R = rnd(tv.seed + Math.floor(t * 24)), img = tv.ctx.createImageData(160, 90);
      for (let p = 0; p < img.data.length; p += 4) { const v = R() * 120; img.data[p] = img.data[p + 1] = img.data[p + 2] = v; img.data[p + 3] = 255; }
      tv.ctx.putImageData(img, 0, 0);
    });
    const l3 = eo(P(t, AT('c224', 'Maia') - .3, AT('c224', 'Maia') + .3));
    $('tvl3').style.opacity = l3; $('tvl3').style.transform = `translateY(${lerp(30, 0, l3)}px)`;
    const z = io(P(t, AT('c224', 'Maia') - .5, E('c225')));
    $('tvg').style.transform = `scale(${lerp(1, 2.6, z)})`; $('tvg').style.transformOrigin = '50% 50%';
  }
  // 2017: los casinos entran en la ley
  if (on('s6_law2')) {
    const k = P(t, AT('c226', 'incluir') - .3, AT('c226', 'incluir'));
    $('lw6b').textContent = k > .5 ? '✓' : '✗'; $('lw6b').style.color = k > .5 ? '#ffb23e' : '#d23a32';
    $('lw6y').style.opacity = P(t, S('c226'), S('c226') + .5);
  }
  // la pregunta cambia
  if (on('s6_qq')) {
    $('q6a').style.setProperty('--k', eo(P(t, S('c228') - .3, S('c228') + .1)));
    $('q6a').style.opacity = lerp(1, .5, P(t, S('c228'), S('c228') + .4));
    $('q6b').style.opacity = eo(P(t, S('c228') - .1, S('c228') + .5));
  }
});
