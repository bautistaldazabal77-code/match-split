// Capítulo IV · La noche del jueves: las 35 órdenes, la palabra JUPITER y la letra equivocada
addCSS(`
#s4_log .lines{position:absolute;left:130px;top:110px;width:1020px;height:860px;overflow:hidden;font:400 23px 'IBM Plex Mono';color:#9fb6c8;line-height:1.75;-webkit-mask-image:linear-gradient(transparent,#000 12%,#000)}
#s4_log .ln{white-space:nowrap;opacity:0}
#s4_log .ln b{color:#e9e6df;font-weight:500}
#s4_log .ln i{font-style:normal;color:#5c7d94}
#s4_log .stat{left:auto;right:150px;text-align:right}
.clock4{position:absolute;right:120px;bottom:104px;text-align:right}
.clock4 .h{font:500 132px 'IBM Plex Mono';letter-spacing:.04em;text-shadow:0 0 40px rgba(0,0,0,.9)}
.clock4 .d{font:400 28px 'IBM Plex Mono';letter-spacing:.22em;opacity:.8;margin-top:6px}
#s4_valid .ord,.ordc{position:absolute;left:50%;top:50%;width:1000px;margin-left:-500px;padding:44px 56px;font:400 30px 'IBM Plex Mono'}
#s4_valid .ord{height:600px;margin-top:-300px}
.ordc h4{font:500 24px 'IBM Plex Mono';letter-spacing:.2em;border-bottom:2px solid #1c1d1f;padding-bottom:16px;margin-bottom:18px;display:flex;justify-content:space-between}
.ordc h4 span{color:#6d6a64;font-weight:400}
.ordc .dl{display:flex;padding:12px 0;border-bottom:1px dashed #9c978e}
.ordc .dl .a{width:300px;color:#6d6a64;flex:none}
.ordc .ck{color:#2f7d4f;margin-left:auto;opacity:0;font-weight:500}
#s4_valid .vst{position:absolute;right:60px;bottom:50px;font:700 64px Inter;letter-spacing:.14em;color:#2f7d4f;border:7px solid #2f7d4f;padding:6px 26px;transform:rotate(-6deg);opacity:0;mix-blend-mode:multiply}
#s4_filter .lst{position:absolute;right:130px;top:200px;width:560px;height:680px;border:1px solid #2a313b;background:#0b0e12;padding:28px 30px}
#s4_filter .lst .h{font:400 20px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut);margin-bottom:16px}
#s4_filter .sn{font:400 22px 'IBM Plex Mono';color:#6d737c;padding:9px 0;border-bottom:1px dashed #1d232b;letter-spacing:.06em}
#s4_filter .sn.jp{color:var(--red);font-weight:500}
#s4_filter .gate{position:absolute;left:880px;top:150px;width:10px;height:780px;background:linear-gradient(transparent,#ffb23e,transparent);opacity:.6;box-shadow:0 0 40px rgba(255,178,62,.4)}
#s4_filter .gl{position:absolute;left:800px;top:110px;width:170px;text-align:center}
#s4_filter .env4{position:absolute;width:520px;padding:18px 24px;font:400 22px 'IBM Plex Mono';color:#1c1d1f;background:var(--paper);box-shadow:0 20px 60px rgba(0,0,0,.6)}
#s4_filter .env4 .w{background:rgba(210,58,50,0);padding:0 4px}
#s4_jup .jw{font:600 260px 'IBM Plex Mono';letter-spacing:.12em;color:var(--red);text-shadow:0 0 60px rgba(210,58,50,.45);min-height:320px}
#s4_split .half{position:absolute;top:0;bottom:0;width:50%;overflow:hidden}
#s4_split .half .ph img{filter:saturate(.55) brightness(.5) contrast(1.1)}
#s4_split .lb4{position:absolute;left:0;right:0;bottom:120px;text-align:center}
#s4_split .lb4 .a{font:400 22px 'IBM Plex Mono';letter-spacing:.22em;color:var(--mut);text-transform:uppercase}
#s4_split .lb4 .b{font:600 72px 'IBM Plex Mono';letter-spacing:.1em;margin-top:8px}
#s4_split .mid{position:absolute;left:50%;top:0;bottom:0;width:2px;background:#2a313b}
#s4_split .alert{position:absolute;left:0;right:0;top:120px;margin:0 auto;width:1500px;padding:24px 0;text-align:center;font:600 40px 'IBM Plex Mono';letter-spacing:.14em;color:#fff;background:rgba(210,58,50,.88);box-shadow:0 0 80px rgba(210,58,50,.5);opacity:0}
#s4_manual .tbl{position:absolute;left:50%;top:150px;width:1500px;margin-left:-750px;columns:3;column-gap:50px;font:400 20px 'IBM Plex Mono';color:#9aa3ad}
#s4_manual .tr{display:flex;justify-content:space-between;padding:7px 4px;border-bottom:1px dashed #1d232b;break-inside:avoid}
#s4_manual .tr .bn{color:#9aa3ad}
#s4_manual .flags{position:absolute;left:0;right:0;bottom:90px;display:flex;justify-content:center;gap:40px}
#s4_manual .flags div{font:600 30px 'IBM Plex Mono';letter-spacing:.1em;color:var(--red);border:3px solid var(--red);padding:14px 26px;opacity:0;background:rgba(10,13,17,.9)}
.tiles{position:absolute;left:50%;top:50%;width:1400px;margin:-300px 0 0 -700px;display:grid;grid-template-columns:repeat(7,1fr);gap:14px}
.tiles div{height:110px;border:1px solid #2a313b;background:#10151b;position:relative;font:500 24px 'IBM Plex Mono';color:#8b919a;display:flex;align-items:center;justify-content:center}
.tiles div s{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-decoration:none;font:700 22px Inter;letter-spacing:.14em;color:#8b919a;opacity:0}
#s4_hold .stat,#s4_five .stat{left:0;right:0;bottom:70px;text-align:center}
#s4_banks .stat{left:auto;right:110px;text-align:right}
#s4_typo .fld{position:absolute;left:50%;width:1300px;margin-left:-650px;padding:32px 44px;border:1px solid #2a313b;background:#0b0e12}
#s4_typo .fld .a{font:400 20px 'IBM Plex Mono';letter-spacing:.22em;color:var(--mut)}
#s4_typo .fld .v{font:500 76px 'IBM Plex Mono';letter-spacing:.08em;margin-top:10px}
#s4_typo .fld .v b{font-weight:500}
#s4_typo .src{position:absolute;right:44px;top:30px;font:400 22px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut)}
#s4_db .bx{position:absolute;top:430px;width:400px;height:220px;border:1px solid #2a313b;background:linear-gradient(#0e1217,#0a0d11);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
#s4_db .bx .t{font:600 32px Inter;letter-spacing:.08em}
#s4_db .bx .s{font:400 19px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);margin-top:10px}
#s4_db .q{position:absolute;left:760px;top:250px;width:400px;padding:22px 28px;border:2px solid #ffb23e;background:rgba(255,178,62,.08);font:500 28px 'IBM Plex Mono';color:#ffd28a;text-align:center;opacity:0}
#s4_db .ret{position:absolute;left:0;right:0;top:760px;text-align:center;font:600 54px 'IBM Plex Mono';color:var(--green);opacity:0}
#s4_heads .np{position:absolute;padding:30px 36px;background:#d9d5cc;color:#16171a;box-shadow:0 30px 90px rgba(0,0,0,.7);font:700 46px/1.15 'Cormorant Garamond';opacity:0}
#s4_heads .np small{display:block;font:500 16px 'IBM Plex Mono';letter-spacing:.2em;color:#6d6a64;margin-bottom:10px}
#s4_bars .row{position:absolute;left:180px;right:180px}
#s4_bars .row .a{font:400 26px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut);text-transform:uppercase}
#s4_bars .row .bar{height:90px;margin-top:16px;transform-origin:left;transform:scaleX(0)}
#s4_bars .row .v{font:500 54px 'IBM Plex Mono';margin-top:12px}
#s4_two .w2{font:500 130px 'IBM Plex Mono';letter-spacing:.14em;line-height:1.3;text-align:center}
#s4_two .w2 b{color:var(--red);font-weight:500;text-shadow:0 0 30px rgba(210,58,50,.7)}
`);
const ORD = Array.from({ length: 35 }, (_, i) => i);
addHTML(`
<div class="scene" id="s4_log"><div class="cam"><div class="lines"><div id="l4"></div></div></div>
  <div class="stat"><div class="k">Órdenes enviadas · Daca → Nueva York</div><div class="v" id="l4n">00</div><div class="v" id="l4v" style="font-size:60px;color:var(--red)">US$ 0</div></div></div>
<div class="scene" id="s4_dest"><div class="cam"><svg id="m4svg" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s4_pr"><div class="cam"><svg id="pr5svg" width="1920" height="1080"></svg></div>
  <div class="tag" style="left:110px;bottom:100px">Piso 10 · jueves · 21:00</div></div>
<div class="scene" id="s4_valid"><div class="glow"></div><div class="cam"><div class="ord ordc paper"><h4>ORDEN DE PAGO · RECIBIDA EN LA FED<span>RECREACIÓN</span></h4>
  <div class="dl"><span class="a">CANAL</span><span>SWIFT</span><span class="ck">✓</span></div>
  <div class="dl"><span class="a">AUTENTICACIÓN</span><span>CLAVES VÁLIDAS</span><span class="ck">✓</span></div>
  <div class="dl"><span class="a">CUENTA</span><span>BANCO DE BANGLADÉS</span><span class="ck">✓</span></div>
  <div class="dl" style="border:0"><span class="a">FORMATO</span><span>MT103</span><span class="ck">✓</span></div>
  <div class="vst">VÁLIDA</div></div></div></div>
<div class="scene" id="s4_filter"><div class="glow"></div><div class="cam">
  <div class="gl lbl" id="fgl">Filtro de sanciones</div><div class="gate"></div>
  <div class="lst"><div class="h">LISTA DE SANCIONES DE EE. UU. · ESQUEMA</div>
    <div class="sn">██████ TRADING LLC</div><div class="sn">BUQUE · ██████ STAR</div><div class="sn">██████ SHIPPING CO.</div><div class="sn">██████ ███ BANK</div>
    <div class="sn">BUQUE · ███████</div><div class="sn jp" id="snj">BUQUE · JUPITER · IRÁN</div><div class="sn">██████ PETROCHEMICAL</div><div class="sn">██████ ███ EXCHANGE</div>
    <div class="sn">BUQUE · █████ ██</div><div class="sn">█████ INVESTMENT GROUP</div><div class="sn">██████ AVIATION</div><div class="sn">BUQUE · ██████</div></div>
  <div id="envs4"></div></div></div>
<div class="scene" id="s4_jup"><div class="cam"><div class="center"><div class="jw"><span id="j4"></span><span id="j4c" style="display:inline-block;width:.55em;height:.08em;background:var(--red);margin-left:.05em"></span></div></div></div></div>
<div class="scene" id="s4_split"><div class="cam">
  <div class="half" id="hL" style="left:0"><div class="ph"><img src="img/jupiter-cartel-2.jpg" id="hLi"></div><div class="vig"></div>
    <div class="lb4"><div class="a">Una calle en Manila</div><div class="b">JUPITER ST.</div></div><div class="credit">${CRED['jupiter-cartel-2.jpg']}</div></div>
  <div class="half" id="hR" style="left:50%"><div class="ph"><img src="img/petrolero.jpg" id="hRi"></div><div class="vig"></div>
    <div class="lb4"><div class="a">Buque iraní · sancionado</div><div class="b" style="color:var(--red)">“JUPITER”</div></div><div class="credit">Imagen ilustrativa · ${CRED['petrolero.jpg'] || ''}</div></div>
  <div class="mid"></div><div class="alert" id="al4">⚠ ALERTA · COINCIDENCIA CON LA LISTA DE SANCIONES</div></div></div>
<div class="scene" id="s4_manual"><div class="glow"></div><div class="cam"><div class="tbl" id="tb4"></div>
  <div class="flags"><div id="fl1">35 ÓRDENES</div><div id="fl2">MONTOS ENORMES</div><div id="fl3">CUENTAS DE PARTICULARES</div></div></div>
  <div class="tag" style="left:110px;top:70px">Revisión manual · recreación</div></div>
<div class="scene" id="s4_hold"><div class="glow"></div><div class="cam"><div class="tiles" id="tl4">${ORD.map(i => `<div>${String(i + 1).padStart(2, '0')}<s>RETENIDA</s></div>`).join('')}</div></div>
  <div class="stat"><div class="k">Órdenes frenadas por la Fed</div><div class="v" id="h4n">0 de 35</div></div></div>
<div class="scene" id="s4_banks"><div class="cam"><svg id="bk4" width="1920" height="1080"></svg></div>
  <div class="tag" style="left:110px;top:96px">Bancos de Manila · esquema</div>
  <div class="stat"><div class="k" id="bk4k">Sucursales bancarias</div><div class="v" id="bk4v">0</div></div></div>
<div class="scene" id="s4_five"><div class="glow"></div><div class="cam"><div class="tiles" id="tl5">${ORD.map(i => `<div>${String(i + 1).padStart(2, '0')}<s>RETENIDA</s></div>`).join('')}</div></div>
  <div class="stat"><div class="k">Pasaron</div><div class="v" id="f5v">5 órdenes</div></div></div>
<div class="scene" id="s4_sl"><div class="cam"><svg id="sl4" width="1920" height="1080"></svg></div>
  <div class="cap"><div class="k">Sri Lanka · Shalika Foundation</div><div class="v" style="color:var(--red)">US$ 20 millones</div></div></div>
<div class="scene" id="s4_typo"><div class="glow"></div><div class="cam">
  <div class="fld" id="tf0" style="top:170px"><div class="a">BENEFICIARIO · ASÍ DEBÍA DECIR</div><div class="v">SHALIKA FOUNDATION</div></div>
  <div class="fld" id="tf1" style="top:430px;opacity:0"><div class="src">SEGÚN REUTERS</div><div class="a">ASÍ DECÍA LA ORDEN</div><div class="v">SHALIKA F<b id="tb1">A</b>NDATION</div></div>
  <div class="fld" id="tf2" style="top:690px;opacity:0"><div class="src">SEGÚN LA BBC</div><div class="a">ASÍ DECÍA LA ORDEN</div><div class="v">SHALIKA F<b id="tb2">U</b>NDATION</div></div></div></div>
<div class="scene" id="s4_db"><div class="glow"></div><div class="cam">
  <div class="bx" style="left:150px"><div class="t">RESERVA FEDERAL</div><div class="s">NUEVA YORK</div></div>
  <div class="bx" id="dbx" style="left:760px"><div class="t">DEUTSCHE BANK</div><div class="s">INTERMEDIARIO</div></div>
  <div class="bx" style="right:150px"><div class="t">SHALIKA FOUNDATION</div><div class="s">SRI LANKA</div></div>
  <svg id="db4" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="q" id="dbq">¿FANDATION?<br><span style="font-size:20px;letter-spacing:.14em">PIDE ACLARACIONES</span></div>
  <div class="ret" id="dbr">US$ 20 MILLONES · DEVUELTOS</div></div></div>
<div class="scene" id="s4_heads"><div class="glow"></div><div class="cam" id="hdcam">
  <div class="np" id="np1" style="left:150px;top:150px;width:760px;transform:rotate(-3deg)"><small>TITULAR · RECREACIÓN</small>Una falta de ortografía evitó un robo de mil millones de dólares</div>
  <div class="np" id="np2" style="left:1000px;top:120px;width:740px;transform:rotate(2deg)"><small>TITULAR · RECREACIÓN</small>El error de tipeo que salvó al Banco de Bangladés</div>
  <div class="np" id="np3" style="left:330px;top:560px;width:700px;transform:rotate(1.5deg)"><small>TITULAR · RECREACIÓN</small>Hackers frenados por una sola letra</div>
  <div class="np" id="np4" style="left:1090px;top:600px;width:640px;transform:rotate(-2deg)"><small>TITULAR · RECREACIÓN</small>“Fandation”: la palabra mal escrita del robo del siglo</div></div></div>
<div class="scene" id="s4_bars"><div class="glow"></div><div class="cam">
  <div class="row" style="top:250px"><div class="a">Error de ortografía · salvó</div><div class="bar" id="bb1" style="background:#8b919a;width:${(20 / 870 * 100).toFixed(1)}%"></div><div class="v" id="bv1">US$ 20 millones</div></div>
  <div class="row" style="top:560px"><div class="a">La palabra Jupiter · frenó</div><div class="bar" id="bb2" style="background:var(--red);width:100%;box-shadow:0 0 50px rgba(210,58,50,.4)"></div><div class="v" id="bv2" style="color:var(--red)">más de US$ 850 millones</div></div></div></div>
<div class="scene" id="s4_two"><div class="glow"></div><div class="cam"><div class="center"><div class="w2"><div id="w2a">JUPITER</div><div id="w2b">F<b>A</b>NDATION</div></div>
  <div class="bigsub" id="w2s">Una palabra y una letra</div></div></div></div>
<div class="scene" id="s4_81"><div class="cam"><svg id="m81" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Llegaron a Manila</div><div class="v" id="v81" style="color:var(--red)">US$ 0</div></div></div>
`);
chapterCard('s4_card', 'ch4', 'IV', 'La noche del jueves', 'Jueves 4 de febrero de 2016 · 20:36, hora de Daca');
photo('s4_night', [S('c110') - .4, S('c111') + .3, .8, .6], { src: 'daca-noche.jpg', kb: [1.1, 1.2, 40, -20, 0, -10], filter: 'saturate(.5) brightness(.45) contrast(1.1)',
  html: `<div class="clock4"><div class="h" id="n4h">20:36</div><div class="d">JUEVES · 4 FEB 2016 · DACA</div></div>` });
photo('s4_nyc', [S('c119') - .5, S('c120') + .2, .9, .6], { src: 'nueva-york-noche.jpg', kb: [1.05, 1.14, -30, 30, 0, 0], filter: 'saturate(.5) brightness(.55) contrast(1.1)',
  cap: ['Nueva York · jueves por la mañana', 'Llegan las órdenes'], html: '<svg id="nyenv" width="1920" height="1080" style="position:absolute;inset:0"></svg>' });
quote('s4_mal', [S('c131') - .3, S('c133') - .1, .6, .6], 'Las transacciones quedaron retenidas porque la dirección incluía la palabra “Jupiter”, que también es el nombre de un barco iraní sancionado.',
  'Carolyn Maloney', 'Congresista de EE. UU. · citando la explicación de la Fed (paráfrasis)', { span: [S('c132') - .2, E('c132') - .2] });
bigText('s4_second', [S('c143') - .2, S('c145') - .1, .5, .5], 'La segunda casualidad', { sub: 'La que se hizo famosa', subDelay: 2.4 });
bigText('s4_perera', [S('c152') - .2, S('c153') - .1, .5, .6], 'Shalika Perera', { sub: 'Fundadora · creía que el dinero era una donación legítima', subDelay: 1.6 });
Object.assign(SCN, {
  s4_log: [S('c111') - .2, S('c117') - .1, .5, .5],
  s4_dest: [S('c117') - .3, S('c118') - .1, .5, .5],
  s4_pr: [S('c118') - .2, S('c119') - .3, .5, .9],
  s4_valid: [S('c120') + .1, S('c122') + .2, .5, .5],
  s4_filter: [S('c122') + .1, E('c125') + 1.4, .5, .4],
  s4_jup: [E('c125') + 1.3, S('c127') + .1, .3, .6],
  s4_split: [S('c127') - .2, S('c131') - .1, .6, .5],
  s4_manual: [S('c133') - .2, S('c136') - .1, .5, .4],
  s4_hold: [S('c136') - .2, S('c137') - .1, .4, .5],
  s4_banks: [S('c137') - .2, S('c140') - .1, .5, .5],
  s4_five: [S('c140') - .1, S('c142') - .1, .4, .5],
  s4_sl: [S('c142') - .2, S('c143') - .1, .5, .5],
  s4_typo: [S('c145') - .2, S('c149') - .1, .5, .5],
  s4_db: [S('c149') - .2, S('c152') - .1, .5, .5],
  s4_heads: [S('c153') - .2, S('c156') - .1, .5, .5],
  s4_bars: [S('c156') - .2, S('c158') - .1, .5, .5],
  s4_two: [S('c158') - .1, S('c159') - .1, .5, .5],
  s4_81: [S('c159') - .2, S('ch5') + .2, .5, .7],
});
// la orden n sale en ORD4(n) (sonido.py usa la misma fórmula para el tecleo de cada orden)
const ORD4 = n => n < 3 ? [S('c112'), S('c113'), S('c114')][n] : lerp(S('c115'), AT('c115', 'órdenes') + .4, (n - 3) / 32);
const JUP4 = E('c125') + 1.5;   // empieza a escribirse JUPITER

const C4 = {};
SETUP.push(function setupCap4() {
  const R = rnd(101);
  const dests = ['RCBC · MANILA', 'RCBC · MANILA', 'RCBC · MANILA', 'SRI LANKA', 'RCBC · MANILA'];
  C4.amts = ORD.map(i => i === 3 ? 20e6 : 0);
  // 35 montos que suman 951 millones
  let rest = 951e6 - 20e6; const raw = ORD.map(i => i === 3 ? 0 : .5 + R());
  const sum = raw.reduce((a, b) => a + b, 0);
  C4.amts = raw.map((r, i) => i === 3 ? 20e6 : Math.round(r / sum * rest / 1e5) * 1e5);
  C4.amts[34] += 951e6 - C4.amts.reduce((a, b) => a + b, 0);
  $('l4').innerHTML = ORD.map(i => `<div class="ln"><i>20:${String(36 + Math.floor(i / 6)).padStart(2, '0')}:${String((i * 17) % 60).padStart(2, '0')}</i>  <b>ORDEN ${String(i + 1).padStart(2, '0')}</b>  → FED NY → ${dests[i % 5]}  USD ${fmt(C4.amts[i])}</div>`).join('');
  C4.lines = [...document.querySelectorAll('#l4 .ln')];
  C4.cum = []; C4.amts.reduce((a, b, i) => (C4.cum[i] = a + b), 0);
  // impresora a oscuras
  const ps = $('pr5svg'); lightDefs(ps); C4.pr = drawPrinter(ps);
  C4.dark = el('rect', { x: -4000, y: -4000, width: 8000, height: 8000, fill: '#020304', opacity: .55 }, C4.pr.g);
  C4.pr.g.appendChild(C4.pr.led); C4.pr.g.appendChild(C4.pr.halo);
  // sobres que llegan a Nueva York
  const ne = $('nyenv');
  C4.envs = Array.from({ length: 14 }, (_, i) => {
    const g = el('g', { opacity: 0 }, ne);
    el('rect', { x: -34, y: -22, width: 68, height: 44, rx: 3, fill: '#d9d5cc' }, g);
    el('path', { d: 'M-34 -22 L0 4 L34 -22', fill: 'none', stroke: '#8b877f', 'stroke-width': 2 }, g);
    return { g, r: R(), y: 200 + R() * 500 };
  });
  // sobres que pasan por el filtro
  $('envs4').innerHTML = [0, 1, 2, 3].map(i => `<div class="env4" id="e4${i}">BENEFICIARIO · ${i === 2 ? 'CUENTA EN RCBC' : 'CUENTA EN RCBC'}<br>DIRECCIÓN · ${i === 2 ? '<span class="w" id="e4w">JUPITER</span> STREET, MAKATI' : 'MAKATI AVENUE, MAKATI'}</div>`).join('');
  // tabla de 35 órdenes para la revisión manual
  $('tb4').innerHTML = ORD.map(i => `<div class="tr"><span>${String(i + 1).padStart(2, '0')} · <span class="bn">${i === 3 ? 'FUNDACIÓN' : 'PERSONA FÍSICA'}</span></span><span class="am">USD ${fmt(C4.amts[i])}</span></div>`).join('');
  // bancos de Manila: muchos puntos, uno rojo
  const bs = $('bk4');
  el('path', { d: 'M0 0 L620 0 Q560 300 640 520 Q700 760 560 1080 L0 1080 Z', fill: '#070a0d' }, bs);
  const t = el('text', { x: 260, y: 560, fill: '#1d252f', 'font-family': 'IBM Plex Mono', 'font-size': 28, 'letter-spacing': 10 }, bs); t.textContent = 'BAHÍA DE MANILA';
  C4.banks = [];
  while (C4.banks.length < 420) {
    const x = 640 + R() * 1200, y = 60 + R() * 960;
    if (Math.hypot(x - 1250, y - 560) > 560 + 80 * Math.sin(x / 90)) continue;
    C4.banks.push({ e: el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 4, fill: '#8fb3cc', opacity: 0 }, bs), r: R(), x, y });
  }
  C4.jb = el('g', { opacity: 0, transform: 'translate(1330 610)' }, bs);
  el('circle', { r: 40, fill: 'none', stroke: '#d23a32', 'stroke-width': 3 }, C4.jb);
  el('circle', { r: 9, fill: '#d23a32' }, C4.jb);
  const jt = el('text', { x: 56, y: 10, fill: '#ff8a7e', 'font-family': 'IBM Plex Mono', 'font-size': 26, 'letter-spacing': 4 }, C4.jb); jt.textContent = 'RCBC · JUPITER ST.';
  // Deutsche Bank: flechas
  const ds = $('db4');
  C4.da = stroke(ds, 'M550 540 L760 540', { 'stroke-width': 4, stroke: '#8b919a' });
  C4.db = stroke(ds, 'M1160 540 L1370 540', { 'stroke-width': 4, stroke: '#8b919a', 'stroke-dasharray': '1' });
  C4.dret = stroke(ds, 'M960 650 Q960 760 560 700', { 'stroke-width': 4, stroke: '#4fb07a' });
});
MAPSETUP.push(function mapsCap4() {
  const s = $('m4svg'); defs(s);
  C4.m = worldMap(s, [74, 0]);
  const p = k => C4.m.proj(cities[k]);
  C4.mc = { daca: city(C4.m.g, p('daca'), 'DACA', 'end'), ny: city(C4.m.g, p('ny'), 'NUEVA YORK · FED', 'start'), manila: city(C4.m.g, p('manila'), 'MANILA · CALLE JÚPITER', 'start'), colombo: city(C4.m.g, p('colombo'), 'SRI LANKA · FUNDACIÓN', 'end') };
  C4.ma = [arc(C4.m, cities.daca, cities.ny, '#e9e6df', 3), arc(C4.m, cities.ny, cities.manila, '#d23a32', 3), arc(C4.m, cities.ny, cities.colombo, '#d23a32', 2.5)];
  for (const k in C4.mc) C4.m.g.appendChild(C4.mc[k].c);
  redCity(C4.mc.manila); redCity(C4.mc.colombo);
  // Sri Lanka
  const s2 = $('sl4'); defs(s2);
  C4.sm = regionMap(s2, [[72, 2], [92, 16]], [[300, 100], [W - 300, H - 100]]);
  el('path', { d: C4.sm.path(country('144')), fill: '#1b222b', stroke: '#8b919a', 'stroke-width': 2 }, C4.sm.g);
  C4.sc = city(C4.sm.g, C4.sm.proj(cities.colombo), 'COLOMBO'); redCity(C4.sc);
  C4.sa = arc(C4.sm, [86, 15.5], cities.colombo, '#d23a32', 4);
  // 81 millones a Manila
  const s3 = $('m81'); defs(s3);
  C4.m81 = regionMap(s3, [[100, 2], [140, 30]], [[100, 60], [W - 100, H - 60]]);
  el('path', { d: C4.m81.path(country('608')), fill: '#1b222b', stroke: '#8b919a', 'stroke-width': 1.5 }, C4.m81.g);
  C4.c81 = city(C4.m81.g, C4.m81.proj(cities.manila), 'MANILA'); redCity(C4.c81);
  C4.a81 = arc(C4.m81, [140, 28], cities.manila, '#d23a32', 5);
  const lb = el('text', { x: C4.m81.proj([139, 29])[0] - 20, y: C4.m81.proj([139, 29])[1] - 20, fill: '#8b919a', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': 4, 'text-anchor': 'end' }, C4.m81.g); lb.textContent = 'DESDE NUEVA YORK →';
});

RENDER.push(function cap4(t) {
  if (on('s4_night')) {
    const m = Math.floor(lerp(0, 1.4, P(t, S('c110') + 2, SCN.s4_night[1])) * 60);
    $('n4h').textContent = '20:36';
  }
  // el registro de órdenes
  if (on('s4_log')) {
    let n = 0;
    C4.lines.forEach((l, i) => { const a = ORD4(i), k = P(t, a - .05, a + .1); l.style.opacity = k * (i < 3 ? 1 : .9); if (t > a) n = i + 1; });
    const scroll = Math.max(0, n - 19) * 40.25;
    $('l4').style.transform = `translateY(${-scroll}px)`;
    $('l4n').textContent = String(n).padStart(2, '0') + (n === 1 ? ' orden' : ' órdenes');
    $('l4v').textContent = 'US$ ' + fmt(n ? C4.cum[n - 1] : 0);
    const end = P(t, AT('c116', 'Suman') - .2, AT('c116', 'Suman') + .4);
    $('l4v').style.transform = `scale(${1 + .12 * Math.sin(Math.PI * end)})`;
  }
  // los destinos
  if (C4.m && on('s4_dest')) {
    const a = S('c117');
    C4.mc.daca.c.setAttribute('opacity', 1); C4.mc.ny.c.setAttribute('opacity', 1);
    C4.ma[0].draw(1);
    C4.ma[1].draw(io(P(t, AT('c117', 'calle Júpiter') - .5, AT('c117', 'en Manila') + .2)));
    C4.mc.manila.c.setAttribute('opacity', P(t, AT('c117', 'en Manila') - .2, AT('c117', 'en Manila') + .2));
    C4.ma[2].draw(io(P(t, AT('c117', 'una fundación') - .4, AT('c117', 'Sri Lanka') + .2)));
    C4.mc.colombo.c.setAttribute('opacity', P(t, AT('c117', 'Sri Lanka') - .2, AT('c117', 'Sri Lanka') + .2));
    for (const k in C4.mc) pulse(C4.mc[k], t, .8, k.length * .2);
    mapCam(C4.m, W / 2, H / 2, lerp(1, 1.05, io(K('s4_dest', t))));
  }
  // la impresora quieta
  if (C4.pr.g && on('s4_pr')) {
    blinkLed(C4.pr, t);
    const z = io(K('s4_pr', t));
    C4.pr.g.setAttribute('transform', `translate(${lerp(820, 780, z)} ${lerp(420, 380, z)}) scale(${lerp(1.5, 1.7, z)})`);
  }
  // llegan las órdenes a Nueva York
  if (on('s4_nyc')) {
    C4.envs.forEach((e, i) => {
      const a = S('c119') + e.r * 3.2, k = P(t, a, a + 1.6);
      e.g.setAttribute('opacity', k > 0 && k < 1 ? Math.sin(Math.PI * k) : 0);
      e.g.setAttribute('transform', `translate(${lerp(2000, 1250, eo(k))} ${e.y + lerp(-60, 0, k)}) scale(${lerp(1.1, .5, k)})`);
    });
  }
  // la orden es válida
  if (on('s4_valid')) {
    const m = [AT('c120', 'SWIFT'), AT('c120', 'autenticadas'), AT('c120', 'desde la cuenta'), S('c121') + .3];
    document.querySelectorAll('#s4_valid .ck').forEach((c, i) => { c.style.opacity = P(t, m[i], m[i] + .25); });
    const v = P(t, AT('c121', 'perfectamente') - .1, AT('c121', 'perfectamente') + .1);
    const st = document.querySelector('#s4_valid .vst'); st.style.opacity = v > 0 ? .9 : 0; st.style.transform = `rotate(-6deg) scale(${lerp(1.8, 1, eo(v))})`;
    const o = document.querySelector('#s4_valid .ord'); o.style.transform = `translateY(${lerp(30, 0, eo(K('s4_valid', t) * 4))}px)`;
    o.style.opacity = lerp(1, .5, P(t, S('c122'), S('c122') + .4));
  }
  // el filtro de sanciones
  if (on('s4_filter')) {
    const a = S('c123') - .3, word = AT('c125', 'una palabra');
    [0, 1, 2, 3].forEach(i => {
      const e = $('e4' + i), a0 = a + i * 3.4, k = P(t, a0, a0 + 3.2);
      const stop = i === 2 && t > a0 + 1.6;
      const x = stop ? lerp(-560, 330, eo(P(t, a0, a0 + 1.6))) : lerp(-560, 1150, k);
      e.style.left = x + 'px'; e.style.top = (330 + (i % 2) * 240) + 'px';
      e.style.opacity = i === 2 ? (k > 0 ? 1 : 0) : (k > 0 && k < 1 ? 1 - P(x, 700, 1150) : 0);
    });
    const hw = eo(P(t, word - .2, word + .3));
    $('e4w').style.background = `rgba(210,58,50,${(.85 * hw).toFixed(2)})`; $('e4w').style.color = hw > .5 ? '#fff' : '';
    $('snj').style.opacity = lerp(.25, 1, P(t, AT('c124', 'listas de sanciones') - .2, AT('c124', 'listas de sanciones') + .3));
    document.querySelectorAll('#s4_filter .sn').forEach(s => { if (s.id !== 'snj') s.style.opacity = P(t, AT('c124', 'compara') - .3, AT('c124', 'compara') + .5); });
    document.querySelector('#s4_filter .gate').style.opacity = .3 + .3 * Math.sin(t * 4);
  }
  // JUPITER en rojo, letra por letra, en silencio
  if (on('s4_jup')) {
    const n = clamp(Math.floor((t - JUP4) / .14) + 1, 0, 7);
    $('j4').textContent = 'JUPITER'.slice(0, t < JUP4 ? 0 : n);
    $('j4c').style.opacity = (Math.floor(t * 2.4) % 2 === 0 || n < 7) ? 1 : 0;
  }
  // calle y barco
  if (on('s4_split')) {
    const k = K('s4_split', t);
    kb($('hLi'), k, 1.1, 1.18, 0, 0, 0, -10); kb($('hRi'), k, 1.1, 1.2, 0, -20, 0, 0);
    $('hR').style.clipPath = `inset(0 0 0 ${lerp(100, 0, eo(P(t, AT('c127', 'Júpiter era') - .3, AT('c127', 'Júpiter era') + .4)))}%)`;
    const dimL = P(t, S('c128'), S('c128') + .6) * (1 - P(t, S('c129'), S('c129') + .4));
    $('hL').style.filter = `brightness(${lerp(1, .35, dimL)})`;
    const al = P(t, AT('c130', 'alerta') - .3, AT('c130', 'alerta'));
    $('al4').style.opacity = al > 0 ? (Math.floor((t - AT('c130', 'alerta')) * 3) % 2 && t < AT('c130', 'alerta') + 1.4 ? .6 : 1) * al : 0;
  }
  // revisión a mano
  if (on('s4_manual')) {
    const rows = document.querySelectorAll('#tb4 .tr');
    rows.forEach((r, i) => { r.style.opacity = P(t, S('c133') + i * .03, S('c133') + .2 + i * .03); });
    const f = [AT('c135', 'demasiadas órdenes'), AT('c135', 'demasiado grandes'), AT('c135', 'cuentas de particulares')];
    ['fl1', 'fl2', 'fl3'].forEach((id, i) => { const k = eo(P(t, f[i] - .1, f[i] + .3)); $(id).style.opacity = k; $(id).style.transform = `scale(${lerp(1.3, 1, k)})`; });
    const am = P(t, f[1], f[1] + .3), bn = P(t, f[2], f[2] + .3);
    rows.forEach(r => { r.querySelector('.am').style.color = am > .5 ? '#d23a32' : ''; r.querySelector('.bn').style.color = bn > .5 ? '#d23a32' : ''; });
    document.querySelector('#tb4').style.transform = `scale(${lerp(.98, 1.03, io(K('s4_manual', t)))})`;
  }
  // 30 de 35 retenidas
  if (on('s4_hold')) {
    const a = AT('c136', 'frenó') - .2, tiles = $('tl4').children;
    let n = 0;
    for (let i = 0; i < 35; i++) {
      const keep = [4, 11, 18, 23, 30].includes(i);   // las cinco que pasan
      const k = keep ? 0 : P(t, a + (n++) * .05, a + .1 + (n - 1) * .05);
      tiles[i].style.background = k > .5 ? '#0b0e12' : '#10151b'; tiles[i].style.color = k > .5 ? '#3a4049' : '#8b919a';
      tiles[i].querySelector('s').style.opacity = k;
    }
    $('h4n').textContent = Math.round(30 * eo(P(t, a, a + 1.6))) + ' de 35';
  }
  // cientos de bancos, eligieron uno
  if (on('s4_banks')) {
    const a = S('c137') - .1;
    C4.banks.forEach(b => b.e.setAttribute('opacity', P(t, a + b.r * 1.4, a + .2 + b.r * 1.4) * lerp(.7, .25, P(t, AT('c138', 'una sucursal') - .2, AT('c138', 'una sucursal') + .4))));
    const j = eo(P(t, AT('c138', 'una sucursal') - .2, AT('c138', 'una sucursal') + .4));
    C4.jb.setAttribute('opacity', j); C4.jb.setAttribute('transform', `translate(1330 610) scale(${lerp(1.6, 1, j)})`);
    $('bk4v').textContent = t < S('c139') - .2 ? fmt(Math.round(420 * P(t, a, a + 1.6))) : 'US$ ' + fmt(850e6 * eo(P(t, AT('c139', 'más de') - .2, E('c139'))));
    $('bk4k').textContent = t < S('c139') - .2 ? 'Bancos y sucursales · esquema' : 'Lo que les costó la calle Júpiter';
    $('bk4v').style.color = t < S('c139') - .2 ? '' : '#d23a32';
  }
  // cinco órdenes pasaron
  if (on('s4_five')) {
    const tiles = $('tl5').children, a = S('c140');
    for (let i = 0; i < 35; i++) {
      const keep = [4, 11, 18, 23, 30].includes(i);
      tiles[i].querySelector('s').style.opacity = keep ? 0 : 1;
      tiles[i].style.color = keep ? '#e9e6df' : '#3a4049'; tiles[i].style.background = keep ? `rgba(210,58,50,${.3 * eo(P(t, a, a + .5))})` : '#0b0e12';
      tiles[i].style.borderColor = keep && t > a ? '#d23a32' : '#2a313b';
    }
    $('f5v').textContent = t < AT('c141', 'Ciento') ? '5 órdenes' : 'US$ ' + fmt(101e6 * eo(P(t, AT('c141', 'Ciento') - .1, AT('c141', 'millones') + .3)));
  }
  // Sri Lanka
  if (C4.sm && on('s4_sl')) {
    C4.sa.draw(io(P(t, S('c142'), AT('c142', 'Sri Lanka') + .3)));
    C4.sc.c.setAttribute('opacity', P(t, AT('c142', 'Sri Lanka') - .2, AT('c142', 'Sri Lanka') + .2)); pulse(C4.sc, t);
    const [x, y] = C4.sm.proj(cities.colombo); mapCam(C4.sm, lerp(W / 2, x, .3), lerp(H / 2, y, .3), lerp(1, 1.3, io(K('s4_sl', t))));
  }
  // la letra
  if (on('s4_typo')) {
    const r = P(t, AT('c146', 'Fandation') - .3, AT('c146', 'Fandation') + .1), b = P(t, AT('c147', 'Fundation') - .3, AT('c147', 'Fundation') + .1);
    $('tf1').style.opacity = eo(r); $('tf2').style.opacity = eo(b);
    const blink = (Math.floor(t * 2.5) % 2 === 0);
    const one = P(t, AT('c148', 'una sola letra') - .2, AT('c148', 'una sola letra') + .2);
    [$('tb1'), $('tb2')].forEach(x => { x.style.color = '#d23a32'; x.style.textShadow = blink || one > .5 ? '0 0 30px rgba(210,58,50,.8)' : 'none'; x.style.fontSize = one > .5 ? '1.15em' : ''; });
    $('tf0').style.opacity = lerp(1, .55, P(t, AT('c145', 'mal escrita') - .2, AT('c145', 'mal escrita') + .4));
  }
  // Deutsche Bank pide aclaraciones; vuelven los 20 millones
  if (on('s4_db')) {
    drawK(C4.da, io(P(t, S('c149'), S('c149') + .8)));
    drawK(C4.db, io(P(t, S('c149') + .8, S('c149') + 1.6)) * (1 - P(t, AT('c150', 'pidió') - .2, AT('c150', 'pidió') + .3)) * .55);
    const q = eo(P(t, AT('c150', 'pidió') - .3, AT('c150', 'pidió') + .2));
    $('dbq').style.opacity = q; $('dbq').style.transform = `translateY(${lerp(20, 0, q)}px)`;
    $('dbx').style.borderColor = q > .5 ? '#ffb23e' : '';
    drawK(C4.dret, io(P(t, AT('c151', 'volvieron') - .6, AT('c151', 'volvieron') + .4)));
    $('dbr').style.opacity = P(t, AT('c151', 'volvieron') - .1, AT('c151', 'volvieron') + .4);
  }
  // titulares
  if (on('s4_heads')) {
    ['np1', 'np2', 'np3', 'np4'].forEach((id, i) => {
      const a = AT('c153', 'los titulares') - .5 + i * .55, k = eo(P(t, a, a + .5));
      const e = $(id); e.style.opacity = k * lerp(1, .5, P(t, S('c155'), S('c155') + .6));
      e.style.filter = `grayscale(${P(t, S('c155'), S('c155') + .6)}) brightness(${lerp(1, .55, P(t, S('c155'), S('c155') + .6))})`;
      e.style.marginTop = lerp(40, 0, k) + 'px';
    });
    $('hdcam').style.transform = `scale(${lerp(1.06, 1, io(K('s4_heads', t)))})`;
  }
  // 20 millones contra 850
  if (on('s4_bars')) {
    $('bb1').style.transform = `scaleX(${eo(P(t, S('c156'), S('c156') + .8))})`;
    $('bb2').style.transform = `scaleX(${io(P(t, AT('c157', 'ochocientos') - .5, AT('c157', 'ochocientos') + 1.4))})`;
    $('bv2').style.opacity = P(t, AT('c157', 'ochocientos') - .2, AT('c157', 'ochocientos') + .5);
  }
  // una palabra y una letra
  if (on('s4_two')) {
    $('w2a').style.opacity = eo(P(t, AT('c158', 'una palabra') - .2, AT('c158', 'una palabra') + .3));
    $('w2b').style.opacity = eo(P(t, AT('c158', 'una letra') - .2, AT('c158', 'una letra') + .3));
    $('w2s').style.opacity = P(t, AT('c158', 'arruinaron') - .3, AT('c158', 'arruinaron') + .4);
  }
  // 81 millones llegan a Manila
  if (C4.m81 && on('s4_81')) {
    C4.a81.draw(io(P(t, S('c159') - .2, AT('c159', 'llegaron') + .3)));
    C4.c81.c.setAttribute('opacity', P(t, AT('c159', 'Manila') - .4, AT('c159', 'Manila'))); pulse(C4.c81, t);
    $('v81').textContent = 'US$ ' + fmt(81e6 * eo(P(t, AT('c159', 'ochenta') - .2, AT('c159', 'llegaron') + .4)));
    const [x, y] = C4.m81.proj(cities.manila); const z = io(K('s4_81', t));
    mapCam(C4.m81, lerp(W / 2, x, z * .6), lerp(H / 2, y, z * .6), lerp(1, 1.6, z));
    C4.c81.inner.setAttribute('transform', `scale(${1 / lerp(1, 1.6, z)})`);
  }
});
