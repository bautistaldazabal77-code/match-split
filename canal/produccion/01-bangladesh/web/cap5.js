// Capítulo V · Cinco días: el dinero se mueve, nadie atiende, el secreto y la pelea por las culpas
addCSS(`
#s5_wake .accs{position:absolute;left:0;right:0;top:420px;display:flex;justify-content:center;gap:40px}
#s5_wake .ac{width:360px;height:230px;border:1px solid #2a313b;background:linear-gradient(#0e1217,#0a0d11);padding:26px 28px;transition:none}
#s5_wake .ac .k{font:400 19px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut)}
#s5_wake .ac .v{font:500 50px 'IBM Plex Mono';margin-top:22px}
#s5_wake .ac .z{font:500 18px 'IBM Plex Mono';letter-spacing:.2em;color:var(--dim);margin-top:16px}
#s5_wake .top{position:absolute;left:0;right:0;top:170px;text-align:center}
#s5_wake .top .h{font:500 110px 'IBM Plex Mono'}
#s5_flow .nd{position:absolute;width:300px;padding:20px 22px;border:1px solid #2a313b;background:#0d1116;text-align:center;opacity:0}
#s5_flow .nd .t{font:600 26px Inter;letter-spacing:.08em}
#s5_flow .nd .s{font:400 17px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut);margin-top:8px}
#s5_flow .nd .st{position:absolute;left:50%;top:50%;font:700 30px Inter;letter-spacing:.12em;color:var(--red);border:4px solid var(--red);padding:2px 12px;white-space:nowrap;transform:translate(-50%,-50%) rotate(-8deg);opacity:0;background:rgba(10,13,17,.85)}
#s5_phone .ph5{position:absolute;left:180px;top:250px;width:620px;height:580px}
#s5_phone .lb{position:absolute;left:180px;top:850px;width:620px;text-align:center}
#s5_phone .ny{position:absolute;right:120px;top:180px;width:860px;height:720px;overflow:hidden;border:1px solid #2a313b}
#s5_phone .ny .st{position:absolute;left:0;right:0;bottom:50px;text-align:center;font:600 56px 'IBM Plex Mono';letter-spacing:.12em;color:#8fb3cc;opacity:0}
#s5_late .accs{position:absolute;left:0;right:0;top:330px;display:flex;justify-content:center;gap:40px}
#s5_late .ac{width:340px;height:420px;border:1px solid #2a313b;background:#0b0e12;position:relative}
#s5_late .ac i{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#4fb07a,#2f7d4f)}
#s5_late .ac span{position:absolute;left:0;right:0;top:-44px;text-align:center;font:400 20px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut)}
#s5_late .fax{position:absolute;left:50%;top:120px;width:760px;margin-left:-380px;padding:20px 30px;font:500 26px 'IBM Plex Mono';letter-spacing:.08em;opacity:0;text-align:center}
#s5_secret .fold{position:absolute;left:50%;top:50%;width:900px;height:620px;margin:-310px 0 0 -450px;background:#c9b98a;border-radius:6px 30px 6px 6px;box-shadow:0 40px 120px rgba(0,0,0,.7);padding:70px 70px;color:#2a2416}
#s5_secret .fold h3{font:600 54px 'Cormorant Garamond'}
#s5_secret .fold p{font:400 24px 'IBM Plex Mono';letter-spacing:.14em;margin-top:20px;color:#5a4f33}
#s5_secret .stp{position:absolute;right:70px;bottom:90px;font:700 72px Inter;letter-spacing:.14em;color:#b5302a;border:8px solid #b5302a;padding:4px 26px;transform:rotate(-8deg);opacity:0;mix-blend-mode:multiply}
#s5_secret .no{position:absolute;left:0;right:0;bottom:70px;display:flex;justify-content:center;gap:80px}
#s5_secret .no div{font:600 36px 'IBM Plex Mono';letter-spacing:.12em;opacity:0}
#s5_secret .no b{color:var(--red);font-weight:600}
#s5_call .nm{position:absolute;top:470px;width:600px;text-align:center}
#s5_call .nm .a{font:600 50px Inter;letter-spacing:.08em}
#s5_call .nm .b{font:400 22px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);margin-top:12px}
#s5_doc .dd{position:absolute;left:50%;top:50%;width:1000px;height:760px;margin:-380px 0 0 -500px;padding:60px 70px;font:400 26px 'IBM Plex Mono'}
#s5_doc .dd h4{font:600 46px 'Cormorant Garamond';text-align:center;margin-bottom:8px}
#s5_doc .dd .c{text-align:center;font:400 20px 'IBM Plex Mono';letter-spacing:.18em;color:#6d6a64;border-bottom:2px solid #1c1d1f;padding-bottom:20px;margin-bottom:26px}
#s5_doc .dd i{display:block;height:14px;background:#b7b2a8;margin:18px 0;border-radius:2px}
#s5_doc .pub{position:absolute;left:50%;top:60%;font:700 120px Inter;letter-spacing:.16em;color:#b5302a;border:10px solid #b5302a;padding:6px 40px;transform:translate(-50%,-50%) rotate(-9deg);opacity:0;mix-blend-mode:multiply}
#s5_blame .lg{position:absolute;top:330px;width:440px;height:200px;border:2px solid #2a313b;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#0b0e12}
#s5_blame .lg .t{font:600 38px Inter;letter-spacing:.1em}
#s5_blame .lg .s{font:400 18px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut);margin-top:10px}
#s5_blame .say{position:absolute;top:580px;width:440px;text-align:center;font:500 22px 'IBM Plex Mono';letter-spacing:.08em;line-height:1.5;opacity:0}
#s5_blame .ok{position:absolute;top:250px;width:440px;text-align:center;font:500 60px 'IBM Plex Mono';color:var(--green);opacity:0}
#s5_blame .q{position:absolute;left:0;right:0;top:800px;text-align:center;font:italic 500 46px 'Cormorant Garamond';color:#c9c4ba;opacity:0}
#s5_law .lw{position:absolute;left:50%;top:50%;width:900px;margin:-330px 0 0 -450px}
#s5_law .lw .h{font:400 22px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut);margin-bottom:26px;text-transform:uppercase}
#s5_law .lw .r{display:flex;justify-content:space-between;padding:22px 8px;border-bottom:1px dashed #2a313b;font:500 40px 'IBM Plex Mono';letter-spacing:.06em;opacity:0}
#s5_law .lw .r b{color:var(--green);font-weight:500}
#s5_law .lw .r.no{color:var(--red)}
#s5_law .lw .r.no b{color:var(--red)}
`);
addHTML(`
<div class="scene" id="s5_wake"><div class="glow"></div><div class="cam"><div class="top"><div class="lbl">Manila</div><div class="h" id="w5h">VIERNES 5</div></div>
  <div class="accs">${[1, 2, 3, 4].map(i => `<div class="ac" id="wa${i}"><div class="k">CUENTA ${i} · RCBC JUPITER</div><div class="v" id="wv${i}">US$ 500</div><div class="z" id="wz${i}">SIN MOVIMIENTOS</div></div>`).join('')}</div></div></div>
<div class="scene" id="s5_flow"><div class="cam" id="f5cam"><svg id="f5svg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="nd" id="n5a" style="left:120px;top:230px"><div class="t">4 CUENTAS</div><div class="s">RCBC · CALLE JÚPITER</div></div>
  <div class="nd" id="n5b" style="left:810px;top:110px"><div class="t">PHILREM</div><div class="s">CASA DE CAMBIO</div></div>
  <div class="nd" id="n5c" style="left:1500px;top:110px"><div class="t">PESOS FILIPINOS</div><div class="s">CONVERTIDOS</div></div>
  <div class="nd" id="n5d" style="left:810px;top:470px"><div class="t">EFECTIVO</div><div class="s">RETIROS</div></div>
  <div class="nd" id="n5e" style="left:810px;top:820px"><div class="t">WILLIAM GO</div><div class="s">CUENTA A SU NOMBRE</div><div class="st" id="n5st">FIRMAS FALSAS</div></div>
  <div class="nd" id="n5f" style="left:1500px;top:600px;opacity:0"><div class="t">?</div><div class="s">EL RASTRO</div></div></div>
  <div class="tag" style="left:110px;bottom:60px">Recorrido del dinero · esquema simplificado</div></div>
<div class="scene" id="s5_phone"><div class="glow"></div><div class="cam"><svg class="ph5" viewBox="0 0 620 580" id="ph5"></svg><div class="lb lbl" id="ph5l">Daca · llamando a la Fed</div>
  <div class="ny"><div class="ph"><img src="img/fed-nueva-york.jpg" id="ph5i" style="filter:saturate(.4) brightness(.38) contrast(1.1)"></div><div class="vig"></div><div class="st" id="ph5s">FIN DE SEMANA</div>
    <div class="credit" style="right:14px;bottom:10px;font-size:12px">${CRED['fed-nueva-york.jpg']}</div></div></div></div>
<div class="scene" id="s5_clk"><div class="glow"></div><div class="cam"><div class="clks" style="position:absolute;left:0;right:0;top:300px;display:flex;justify-content:center;gap:120px">
  ${['DACA', 'NUEVA YORK', 'MANILA'].map((n, i) => `<div style="text-align:center"><svg viewBox="0 0 230 230" id="k5${i}" style="width:320px;height:320px"></svg><div class="lbl" style="margin-top:14px">${n}</div></div>`).join('')}</div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:800px" id="k5s">El reloj de los atacantes</div></div></div>
<div class="scene" id="s5_late"><div class="glow"></div><div class="cam"><div class="fax paper" id="fx5">PEDIDO DE BLOQUEO · LLEGA A RCBC JUPITER</div>
  <div class="accs">${[1, 2, 3, 4].map(i => `<div class="ac"><span>CUENTA ${i}</span><i id="lb5${i}"></i></div>`).join('')}</div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:820px" id="lt5">Buena parte del dinero ya no está</div></div></div>
<div class="scene" id="s5_secret"><div class="glow"></div><div class="cam"><div class="fold"><h3>Robo de las reservas</h3><p>INFORME INTERNO · FEBRERO DE 2016</p><p style="margin-top:60px">██████████████████<br>████████████<br>████████████████</p><div class="stp" id="sp5">SECRETO</div></div></div>
  <div class="no"><div id="no1">EL PÚBLICO <b>✗</b></div><div id="no2">EL GOBIERNO <b>✗</b></div></div></div>
<div class="scene" id="s5_call"><div class="glow"></div><div class="cam"><svg id="cl5" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="nm" style="left:120px"><div class="a">ATIUR RAHMAN</div><div class="b">GOBERNADOR · BANCO DE BANGLADÉS</div></div>
  <div class="nm" style="right:120px"><div class="a">RAKESH ASTHANA</div><div class="b">ESPECIALISTA EN CIBERSEGURIDAD</div></div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:760px" id="cl5t">Recuperarlo sin escándalo</div></div></div>
<div class="scene" id="s5_doc"><div class="glow"></div><div class="cam"><div class="dd paper"><h4>Orden judicial</h4><div class="c">TRIBUNAL · FILIPINAS · 2016 · RECREACIÓN</div>
  <i style="width:90%"></i><i style="width:76%"></i><i style="width:84%"></i><i style="width:60%"></i><i style="width:88%"></i><i style="width:70%"></i><i style="width:80%"></i>
  <div class="pub" id="pb5">PÚBLICO</div></div></div></div>
<div class="scene" id="s5_world"><div class="cam"><svg id="w5svg" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Fines de febrero de 2016</div><div class="v" style="font-size:70px">La noticia explota</div></div></div>
<div class="scene" id="s5_blame"><div class="glow"></div><div class="cam"><svg id="bl5" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="lg" id="lgA" style="left:150px"><div class="t">BANCO DE BANGLADÉS</div><div class="s">DACA</div></div>
  <div class="lg" id="lgB" style="left:740px"><div class="t">RESERVA FEDERAL</div><div class="s">NUEVA YORK</div></div>
  <div class="lg" id="lgC" style="left:1330px"><div class="t">SWIFT</div><div class="s">RED DE MENSAJES</div></div>
  <div class="say" id="syA" style="left:150px">“¿CÓMO ACEPTARON<br>VACIAR LA CUENTA?”</div>
  <div class="say" id="syB" style="left:740px">“NUESTROS SISTEMAS<br>NO FUERON VULNERADOS”</div>
  <div class="say" id="syC" style="left:1330px">“NUESTRA RED NO FUE HACKEADA.<br>EL PROBLEMA ESTABA EN EL BANCO”</div>
  <div class="ok" id="okA" style="left:150px">✓</div><div class="ok" id="okB" style="left:740px">✓</div><div class="ok" id="okC" style="left:1330px">✓</div>
  <div class="q" id="bq5">Cada eslabón hizo lo que tenía que hacer</div></div></div>
<div class="scene" id="s5_law"><div class="glow"></div><div class="cam"><div class="lw"><div class="h">Ley contra el lavado de dinero · Filipinas · 2016</div>
  <div class="r"><span>BANCOS</span><b>✓</b></div><div class="r"><span>CASAS DE CAMBIO</span><b>✓</b></div><div class="r"><span>ASEGURADORAS</span><b>✓</b></div><div class="r no" id="lw5"><span>CASINOS</span><b>✗</b></div></div></div></div>
`);
chapterCard('s5_card', 'ch5', 'V', 'Cinco días');
photo('s5_cny', [S('c170') - .3, S('c172') - .1, .6, .5], { src: 'anio-nuevo-chino.jpg', pos: '60% 50%', kb: [1.05, 1.16, 20, -20, 0, 0], filter: 'saturate(.6) brightness(.5) contrast(1.1)',
  cap: ['Lunes 8 · Año Nuevo Lunar', 'Bancos cerrados en Manila'] });
photo('s5_gov', [S('c174') - .3, S('c175') - .1, .6, .5], { src: 'atiur-rahman.jpg', pos: '50% 6%', kb: [1.06, 1.16, 0, 0, 20, -10], filter: 'grayscale(.6) brightness(.5) contrast(1.1)',
  cap: ['Gobernador del Banco de Bangladés', 'Atiur Rahman'] });
bigText('s5_resign', [S('c181') - .2, S('c182') - .1, .5, .5], 'Marzo de 2016', { sub: 'Renuncia el gobernador', subDelay: 1.2 });
photo('s5_neon', [S('c193') - .7, S('ch6') + .3, .6, .9], { src: 'tragamonedas.jpg', kb: [1.1, 1.22, 0, 0, 0, -20], filter: 'saturate(.8) brightness(.55) contrast(1.15)', ilus: true });
Object.assign(SCN, {
  s5_wake: [S('c160') - .3, S('c162') - .1, .6, .5],
  s5_flow: [S('c162') - .2, S('c168') - .1, .5, .6],
  s5_phone: [S('c168') - .2, S('c170') - .1, .5, .5],
  s5_clk: [S('c172') - .2, S('c173') - .1, .4, .5],
  s5_late: [S('c173') - .2, S('c174') - .1, .5, .6],
  s5_secret: [S('c175') - .3, S('c177') - .1, .4, .5],
  s5_call: [S('c177') - .2, S('c179') - .2, .5, .6],
  s5_doc: [S('c179') - .2, S('c180') - .1, .5, .4],
  s5_world: [S('c180') - .2, S('c181') - .1, .4, .5],
  s5_blame: [S('c182') - .2, S('c191') - .1, .5, .6],
  s5_law: [S('c191') - .2, S('c193') - .5, .5, .5],
});
const C5 = {};
SETUP.push(function setupCap5() {
  // flujo del dinero
  const s = $('f5svg');
  const P2 = (a, b) => { const p = el('path', { d: `M${a[0]} ${a[1]} C${(a[0] + b[0]) / 2} ${a[1]} ${(a[0] + b[0]) / 2} ${b[1]} ${b[0]} ${b[1]}`, fill: 'none', stroke: '#d23a32', 'stroke-width': 3, 'stroke-dasharray': '12 14', opacity: 0 }, s); return p; };
  C5.f = { b: P2([420, 280], [810, 160]), c: P2([1110, 160], [1500, 160]), d: P2([420, 300], [810, 520]), e: P2([420, 320], [810, 870]), f: P2([1110, 870], [1500, 650]), g: P2([1110, 520], [1500, 650]), h: P2([1800, 160], [1650, 600]) };
  // remolinos entre las cuatro cuentas
  C5.loop = el('path', { d: 'M180 380 C120 450 380 450 330 380 C290 330 220 330 180 380 Z', fill: 'none', stroke: '#d23a32', 'stroke-width': 3, 'stroke-dasharray': '10 12', opacity: 0 }, s);
  // teléfono que suena
  const ph = $('ph5');
  C5.phone = [stroke(ph, 'M190 250 Q190 170 310 170 Q430 170 430 250 L400 280 L350 250 L350 215 Q310 200 270 215 L270 250 L220 280 Z', { 'stroke-width': 7 }),
    stroke(ph, 'M210 290 L410 290 L440 430 L180 430 Z', { 'stroke-width': 7 })];
  C5.waves = [0, 1, 2].map(i => el('path', { d: `M${470 + i * 34} ${200 - i * 30} Q${520 + i * 44} 260 ${470 + i * 34} ${320 + i * 30}`, fill: 'none', stroke: '#ffb23e', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }, ph));
  C5.wavesL = [0, 1, 2].map(i => el('path', { d: `M${150 - i * 34} ${200 - i * 30} Q${100 - i * 44} 260 ${150 - i * 34} ${320 + i * 30}`, fill: 'none', stroke: '#ffb23e', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }, ph));
  // relojes que giran
  C5.clk = [0, 1, 2].map(i => clockFace($('k5' + i)));
  // llamada
  const cl = $('cl5');
  C5.line = el('path', { d: 'M720 520 Q960 380 1200 520', fill: 'none', stroke: '#8fb3cc', 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, cl);
  C5.cut = el('path', { d: 'M930 400 L990 480', stroke: '#d23a32', 'stroke-width': 8, 'stroke-linecap': 'round', opacity: 0 }, cl);
  // culpas cruzadas
  const bl = $('bl5');
  const ar = (d, col = '#d23a32') => el('path', { d, fill: 'none', stroke: col, 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1, 'marker-end': 'url(#ah5)' }, bl);
  const df = el('defs', {}, bl), mk = el('marker', { id: 'ah5', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, df);
  el('path', { d: 'M0 0 L10 5 L0 10 Z', fill: '#d23a32' }, mk);
  C5.arAB = ar('M500 320 Q745 200 900 315');
  C5.arCA = ar('M1500 320 Q1000 140 420 315');
  C5.arBA = ar('M820 545 Q600 640 420 545');
});
MAPSETUP.push(function mapsCap5() {
  const s = $('w5svg'); defs(s);
  C5.m = worldMap(s, [-30, 0]);
  const R = rnd(131);
  const spots = [[-74, 40.7], [-0.1, 51.5], [2.35, 48.85], [139.7, 35.7], [103.8, 1.35], [114.2, 22.3], [77.2, 28.6], [90.41, 23.81], [120.98, 14.6], [151.2, -33.9], [-43.2, -22.9], [-58.4, -34.6], [-99.1, 19.4], [13.4, 52.5], [37.6, 55.75], [28, -26.2], [55.3, 25.2], [126.98, 37.57], [116.4, 39.9], [-79.4, 43.7], [-122.4, 37.8], [18.06, 59.33], [-3.7, 40.4], [12.5, 41.9], [31.2, 30.0], [3.4, 6.5], [36.8, -1.3], [100.5, 13.75], [106.8, -6.2], [174.8, -36.8]];
  C5.news = spots.map(c => { const [x, y] = C5.m.proj(c); return { r: R(), e: el('circle', { cx: x, cy: y, r: 6, fill: '#d23a32', opacity: 0 }, C5.m.g), ring: el('circle', { cx: x, cy: y, r: 6, fill: 'none', stroke: '#d23a32', 'stroke-width': 2, opacity: 0 }, C5.m.g) }; });
});

RENDER.push(function cap5(t) {
  // las cuentas se despiertan
  if (on('s5_wake')) {
    const a = AT('c161', 'se despiertan') - .4;
    for (let i = 1; i <= 4; i++) {
      const k = eo(P(t, a + i * .15, a + .4 + i * .15)), ac = $('wa' + i);
      ac.style.borderColor = k > .5 ? '#2f7d4f' : '#2a313b'; ac.style.boxShadow = `0 0 ${60 * k}px rgba(79,176,122,${.25 * k})`;
      $('wz' + i).textContent = k > .5 ? 'ACTIVA' : 'SIN MOVIMIENTOS'; $('wz' + i).style.color = k > .5 ? '#4fb07a' : '';
      $('wv' + i).textContent = k > .5 ? 'US$ ██.███.███' : 'US$ 500';
    }
    $('w5h').style.opacity = eo(P(t, S('c160') - .2, S('c160') + .5));
  }
  // el recorrido del dinero
  if (on('s5_flow')) {
    const show = (id, a) => { const k = eo(P(t, a - .3, a + .2)); $(id).style.opacity = k; $(id).style.transform = `translateY(${lerp(16, 0, k)}px)`; return k; };
    const flow = (p, a) => { const k = P(t, a - .3, a + .2); p.setAttribute('opacity', k * .85); p.setAttribute('stroke-dashoffset', -t * 70); };
    show('n5a', S('c162') - .2); flow(C5.loop, S('c162') + .3);
    show('n5b', AT('c163', 'casa de cambio')); flow(C5.f.b, AT('c163', 'casa de cambio'));
    show('n5c', AT('c163', 'pesos filipinos')); flow(C5.f.c, AT('c163', 'pesos filipinos'));
    show('n5d', AT('c164', 'efectivo')); flow(C5.f.d, AT('c164', 'efectivo'));
    show('n5e', AT('c165', 'William Go')); flow(C5.f.e, AT('c165', 'William Go'));
    const st = P(t, AT('c166', 'falsificadas') - .3, AT('c166', 'falsificadas') - .1);
    $('n5st').style.opacity = st > 0 ? 1 : 0; $('n5st').style.transform = `translate(-50%,-50%) rotate(-8deg) scale(${lerp(1.8, 1, eo(st))})`;
    // el rastro se vuelve turbio
    const tb = P(t, AT('c167', 'el rastro') - .5, E('c167') + .5);
    show('n5f', AT('c167', 'el rastro')); flow(C5.f.f, AT('c167', 'el rastro')); flow(C5.f.g, AT('c167', 'el rastro')); flow(C5.f.h, AT('c167', 'turbio'));
    $('f5svg').style.filter = `blur(${(tb * 3).toFixed(2)}px)`;
    ['n5b', 'n5c', 'n5d', 'n5e'].forEach(id => { $(id).style.filter = `blur(${(tb * 4).toFixed(2)}px)`; });
    $('f5cam').style.transform = `scale(${lerp(1, 1.05, io(K('s5_flow', t)))})`;
  }
  // el teléfono suena y nadie atiende
  if (on('s5_phone')) {
    C5.phone.forEach((p, i) => drawK(p, io(P(t, S('c168') - .2 + i * .2, S('c168') + .6 + i * .2))));
    const ring = (Math.floor((t - S('c168')) * 1.25) % 2 === 0) && t > S('c168') + .6;
    [...C5.waves, ...C5.wavesL].forEach((w, i) => w.setAttribute('opacity', ring ? (.35 + .6 * Math.max(0, Math.sin(t * 18 + (i % 3)))) : 0));
    const ny = eo(P(t, AT('c169', 'fin de semana') - .3, AT('c169', 'fin de semana') + .2));
    $('ph5s').style.opacity = ny; kb($('ph5i'), K('s5_phone', t), 1.05, 1.15, 0, -20, 0, 0);
    $('ph5l').textContent = t > E('c169') ? 'Sin respuesta' : 'Daca · llamando a la Fed';
  }
  // el reloj de los atacantes
  if (on('s5_clk')) {
    const sp = io(P(t, S('c172') - .2, E('c172'))) * 4 * 1440;
    [0, -11 * 60, 2 * 60].forEach((off, i) => C5.clk[i].set(20 * 60 + 36 + off + sp));
  }
  // demasiado tarde: las cuentas se vacían
  if (on('s5_late')) {
    const fx = eo(P(t, AT('c173', 'llegan') - .3, AT('c173', 'llegan') + .3));
    $('fx5').style.opacity = fx; $('fx5').style.transform = `translateY(${lerp(-40, 0, fx)}px)`;
    const d = io(P(t, S('c173') - .2, AT('c173', 'ya no está') + .2));
    [1, 2, 3, 4].forEach(i => { const lv = [.03, .01, .05, .02][i - 1]; $('lb5' + i).style.height = lerp(100, lv * 100, d) + '%'; $('lb5' + i).style.background = d > .5 ? 'linear-gradient(#d23a32,#8a2b25)' : ''; });
    $('lt5').style.opacity = P(t, AT('c173', 'buena parte') - .2, AT('c173', 'buena parte') + .4);
  }
  // el secreto
  if (on('s5_secret')) {
    const st = P(t, AT('c175', 'secreto') - .2, AT('c175', 'secreto'));
    $('sp5').style.opacity = st > 0 ? .9 : 0; $('sp5').style.transform = `rotate(-8deg) scale(${lerp(2, 1, eo(st))})`;
    $('no1').style.opacity = eo(P(t, AT('c176', 'público') - .2, AT('c176', 'público') + .3));
    $('no2').style.opacity = eo(P(t, AT('c176', 'gobierno') - .2, AT('c176', 'gobierno') + .3));
  }
  // la llamada… y no puede
  if (on('s5_call')) {
    drawK(C5.line, io(P(t, S('c177') + .2, AT('c177', 'convencido'))));
    C5.line.setAttribute('stroke', t > S('c178') ? '#4a5059' : '#8fb3cc');
    const c = P(t, S('c178') - .1, S('c178') + .1);
    C5.cut.setAttribute('opacity', c);
    $('cl5t').style.opacity = P(t, AT('c177', 'sin escándalo') - .4, AT('c177', 'sin escándalo')) * (1 - P(t, S('c178'), S('c178') + .3));
  }
  // la orden judicial es pública
  if (on('s5_doc')) {
    const p = P(t, AT('c179', 'son públicas') - .2, AT('c179', 'son públicas'));
    $('pb5').style.opacity = p > 0 ? .9 : 0; $('pb5').style.transform = `translate(-50%,-50%) rotate(-9deg) scale(${lerp(2.2, 1, eo(p))})`;
  }
  // la noticia explota en el mundo
  if (C5.m && on('s5_world')) {
    const a = AT('c180', 'sale a la luz') - .3;
    C5.news.forEach(n => {
      const k = P(t, a + n.r * 2.2, a + .3 + n.r * 2.2);
      n.e.setAttribute('opacity', k * .9);
      const q = ((((t - a - n.r * 2.2) * .9) % 1) + 1) % 1;
      n.ring.setAttribute('r', 6 + q * 40); n.ring.setAttribute('opacity', k > 0 ? (1 - q) * .8 : 0);
    });
    mapCam(C5.m, W / 2, H / 2, lerp(1, 1.06, io(K('s5_world', t))));
  }
  // la pelea por las culpas
  if (on('s5_blame')) {
    const b = [S('c182'), S('c182') + .3, S('c182') + .6];
    ['lgA', 'lgB', 'lgC'].forEach((id, i) => { const k = eo(P(t, b[i] - .2, b[i] + .3)); $(id).style.opacity = k; $(id).style.transform = `translateY(${lerp(30, 0, k)}px)`; });
    drawK(C5.arAB, io(P(t, AT('c183', 'demandar') - .4, AT('c183', 'demandar') + .5)));
    $('syA').style.opacity = P(t, AT('c184', 'Cómo') - .3, AT('c184', 'Cómo') + .2);
    $('syB').style.opacity = P(t, AT('c185', 'nunca fueron') - .5, AT('c185', 'nunca fueron'));
    drawK(C5.arBA, io(P(t, AT('c185', 'las órdenes') - .3, AT('c185', 'las órdenes') + .6)));
    $('syC').style.opacity = P(t, S('c186') - .2, S('c186') + .3);
    drawK(C5.arCA, io(P(t, AT('c186', 'el problema') - .4, AT('c186', 'el problema') + .7)));
    const ok = P(t, AT('c187', 'todos tienen razón') - .2, AT('c187', 'todos tienen razón') + .3);
    ['okA', 'okB', 'okC'].forEach((id, i) => { const k = eo(P(t, AT('c187', 'todos') + i * .25, AT('c187', 'todos') + .3 + i * .25)); $(id).style.opacity = k; });
    $('bq5').style.opacity = P(t, S('c189') - .2, S('c189') + .4);
    const gone = P(t, AT('c190', 'el dinero se fue') - .2, AT('c190', 'el dinero se fue') + .4);
    ['okA', 'okB', 'okC'].forEach(id => { $(id).style.color = gone > .5 ? '#d23a32' : ''; $(id).textContent = gone > .5 ? '✗' : '✓'; });
    [C5.arAB, C5.arBA, C5.arCA].forEach(a => a.setAttribute('opacity', lerp(1, .25, ok)));
    ['syA', 'syB', 'syC'].forEach(id => { $(id).style.opacity = parseFloat($(id).style.opacity || 0) * lerp(1, .45, ok); });
  }
  // la ley no llegaba a los casinos
  if (on('s5_law')) {
    document.querySelectorAll('#s5_law .r').forEach((r, i) => { const a = i < 3 ? S('c192') - .2 + i * .35 : AT('c192', 'no llegaba') - .1; const k = eo(P(t, a, a + .3)); r.style.opacity = k; r.style.transform = `translateX(${lerp(-30, 0, k)}px)`; });
    $('lw5').style.textShadow = t > AT('c192', 'no llegaba') + .3 ? '0 0 30px rgba(210,58,50,.6)' : 'none';
  }
  // neón
  if (on('s5_neon')) {
    const k = P(t, S('c193') - .7, S('c193') + .5);
    $('s5_neon').querySelector('.ph img').style.filter = `saturate(${lerp(1.2, .8, k)}) brightness(${lerp(.3, .58, k)}) contrast(1.15) blur(${lerp(14, 0, eo(k)).toFixed(1)}px)`;
  }
});
