// Capítulo II · Rasel Ahlam: el correo, la red, la impresora intervenida y por qué esperaron un año
addCSS(`
.mon2{position:absolute;left:50%;top:50%;width:1460px;height:880px;margin:-450px 0 0 -730px}
.mon2 .bz{position:absolute;inset:0;border-radius:22px;background:linear-gradient(#16191e,#0d0f12);box-shadow:0 60px 160px rgba(0,0,0,.8),0 0 0 2px #23272e inset}
.mon2 .sc{position:absolute;left:30px;top:30px;right:30px;bottom:30px;border-radius:6px;background:#0c1116;overflow:hidden;font-family:Inter;color:#d8dde3}
.mon2 .sc:after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(rgba(255,255,255,.02) 0 2px,transparent 2px 5px);pointer-events:none}
.mon2 .rec{position:absolute;right:30px;bottom:-46px;font:400 18px 'IBM Plex Mono';letter-spacing:.2em;color:var(--dim)}
.mbar{height:56px;background:#141b23;border-bottom:1px solid #222c37;display:flex;align-items:center;padding:0 24px;font:500 19px 'IBM Plex Mono';letter-spacing:.14em;color:#8796a6}
.mbar b{margin-left:auto;font-weight:400;color:#5d6b79}
.mside{position:absolute;left:0;top:56px;bottom:0;width:260px;background:#10161d;border-right:1px solid #1d2630;padding:26px 22px;font:500 20px Inter;color:#8796a6;line-height:2.3}
.mside .on{color:#e9e6df}
.mlist{position:absolute;left:260px;right:0;top:56px;bottom:0}
.mrow{display:flex;align-items:center;gap:26px;height:92px;padding:0 34px;border-bottom:1px solid #1a222b;font-size:23px;color:#7d8996}
.mrow .f{width:300px;flex:none}
.mrow .s{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mrow .d{width:110px;text-align:right;font:400 19px 'IBM Plex Mono'}
.mrow.new{color:#e9e6df;font-weight:600;background:rgba(255,178,62,.06)}
.mrow.new .dot{width:12px;height:12px;border-radius:50%;background:#ffb23e;flex:none;box-shadow:0 0 12px #ffb23e}
.mail{position:absolute;left:260px;right:0;top:56px;bottom:0;padding:44px 70px;font-size:28px;line-height:1.6;color:#c9d0d8}
.mail h2{font:600 40px Inter;color:#e9e6df;margin-bottom:18px}
.mail .from{font:400 22px 'IBM Plex Mono';color:#8796a6;margin-bottom:34px;letter-spacing:.04em}
.mail .att{display:flex;gap:26px;margin-top:40px}
.mail .file{border:1px solid #2c3a48;background:#111a23;padding:18px 26px;font:500 22px 'IBM Plex Mono';color:#cfe3f2;display:flex;align-items:center;gap:16px}
.mail .file i{width:30px;height:38px;border:2px solid #8fb3cc;border-radius:3px;display:inline-block}
.cursor{position:absolute;width:34px;height:48px;left:0;top:0}
.dlbar{position:absolute;left:50%;top:50%;width:760px;margin:-90px 0 0 -380px;background:#111a23;border:1px solid #2c3a48;padding:30px 36px;font:500 22px 'IBM Plex Mono';color:#cfe3f2}
.dlbar .tr{height:12px;background:#1d2a36;margin-top:22px}
.dlbar .tr i{display:block;height:100%;width:0;background:#4fb07a}
#s2_ghost .px{position:absolute;left:50%;top:44%;width:520px;height:620px;margin:-310px 0 0 -260px}
#s2_ghost .nm{position:absolute;left:0;right:0;top:830px;text-align:center;font:600 64px Inter;letter-spacing:.16em}
#s2_ghost .nm s{text-decoration:none;position:relative}
#s2_ghost .nm s:after{content:'';position:absolute;left:-10px;right:-10px;top:52%;height:6px;background:var(--red);transform:scaleX(var(--k,0));transform-origin:left}
#s2_ghost .sub{position:absolute;left:0;right:0;top:920px;text-align:center}
#s2_movie .mx{position:absolute;inset:0;font:500 26px 'IBM Plex Mono';color:#2cff7a;overflow:hidden;opacity:.85}
#s2_movie .cd{position:absolute;left:0;right:0;top:400px;text-align:center;font:600 200px 'IBM Plex Mono';color:#ff4136;text-shadow:0 0 40px rgba(255,65,54,.6)}
#s2_movie .x{position:absolute;left:-200px;right:-200px;top:50%;height:12px;background:var(--red);transform-origin:50% 50%;box-shadow:0 0 40px rgba(210,58,50,.6)}
#s2_net .stat{left:auto;right:110px;text-align:right}
#s2_myth .hd{font:600 76px 'Cormorant Garamond';color:#8b919a;position:relative;display:inline-block;padding:0 20px}
#s2_myth .hd:after{content:'';position:absolute;left:0;right:0;top:55%;height:7px;background:var(--red);transform:scaleX(var(--k,0));transform-origin:left;box-shadow:0 0 30px rgba(210,58,50,.6)}
#s2_myth .src{font:400 22px 'IBM Plex Mono';letter-spacing:.2em;color:var(--dim);margin-top:18px}
#s2_myth .truth{font:600 120px 'Cormorant Garamond';margin-top:70px}
#s2_badge .bd{position:absolute;left:50%;top:50%;width:560px;height:780px;margin:-390px 0 0 -280px;border-radius:26px;background:linear-gradient(#1a2129,#11161c);border:1px solid #2c3540;box-shadow:0 50px 140px rgba(0,0,0,.8)}
#s2_badge .clip{position:absolute;left:50%;top:26px;width:120px;height:20px;margin-left:-60px;border-radius:10px;background:#0a0d11}
#s2_badge .pic{position:absolute;left:50%;top:90px;width:300px;height:340px;margin-left:-150px;background:#0c1015;border:1px solid #2a323c;overflow:hidden}
#s2_badge .pic svg{position:absolute;inset:0}
#s2_badge .who{position:absolute;left:0;right:0;top:470px;text-align:center;font:600 38px Inter;letter-spacing:.12em}
#s2_badge .org{position:absolute;left:0;right:0;top:530px;text-align:center;font:400 22px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut)}
#s2_badge .ok{position:absolute;left:60px;right:60px;top:620px;height:80px;display:flex;align-items:center;justify-content:center;gap:16px;font:500 28px 'IBM Plex Mono';letter-spacing:.2em;color:var(--green);border:1px solid rgba(79,176,122,.5);background:rgba(79,176,122,.08)}
#s2_checks .rows{position:absolute;left:50%;top:50%;width:1100px;margin:-200px 0 0 -550px}
#s2_checks .r{display:flex;align-items:center;justify-content:space-between;padding:26px 10px;border-bottom:1px dashed #2a313b;font:500 42px 'IBM Plex Mono';letter-spacing:.06em;opacity:0}
#s2_checks .r b{color:var(--green);font-weight:500}
#s2_checks .ttl{position:absolute;left:0;right:0;top:200px;text-align:center}
#s2_study .col{position:absolute;top:210px;width:520px;height:660px;border:1px solid #232a33;background:rgba(10,13,17,.86);padding:34px 34px;opacity:0}
#s2_study .col .h{font:400 22px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut);margin-bottom:26px;text-transform:uppercase}
#s2_study .ctl{display:flex;justify-content:space-between;padding:17px 4px;border-bottom:1px dashed #2a313b;font:500 25px 'IBM Plex Mono';color:#b8bec6}
#s2_study .ctl.red{color:var(--red)}
#s2_study .tpl{font:400 22px 'IBM Plex Mono';line-height:2.05;color:#9aa3ad}
#s2_study .tpl span{background:rgba(255,178,62,.18);color:#ffd28a;padding:0 6px}
#s2_hours .clk{position:absolute;right:220px;top:50%;margin-top:-210px;width:420px;text-align:center}
#s2_hours .clk svg{width:420px;height:420px}
#s2_hours .clk .v{font:500 60px 'IBM Plex Mono';margin-top:10px}
#s2_hours .led{position:absolute;left:220px;top:50%;margin-top:-330px;width:700px;height:660px;padding:40px 44px;font:400 24px 'IBM Plex Mono'}
#s2_hours .led h4{font:500 22px 'IBM Plex Mono';letter-spacing:.2em;border-bottom:2px solid #1c1d1f;padding-bottom:14px;margin-bottom:12px}
#s2_hours .lr{display:flex;justify-content:space-between;padding:10px 4px;border-bottom:1px dashed #9c978e}
#s2_hours .lr.sus{position:relative}
#s2_hours .lr.sus:after{content:'';position:absolute;inset:-3px -10px;border:4px solid var(--red);opacity:var(--k,0)}
#s2_tamper .db{position:absolute;left:44px;top:96px;right:44px}
#s2_tamper .dr{display:flex;justify-content:space-between;padding:16px 10px;border-bottom:1px solid #1a2630;font:400 24px 'IBM Plex Mono';color:#9fb6c8;position:relative;overflow:hidden}
#s2_tamper .dr.bad{color:#ff8a7e}
#s2_tamper .dr .del{position:absolute;left:0;right:0;top:50%;height:3px;background:var(--red);transform-origin:left;transform:scaleX(0)}
#s2_tamper .q{position:absolute;left:44px;bottom:40px;font:500 22px 'IBM Plex Mono';letter-spacing:.16em;color:#8fb3cc}
#s2_risk .mo{position:absolute;left:180px;right:180px;top:520px;display:flex;gap:10px}
#s2_risk .mo div{flex:1;height:120px;border:1px solid #1d232b;background:#0b0e12;position:relative}
#s2_risk .mo div i{position:absolute;left:0;right:0;bottom:0;height:0}
#s2_risk .mo div span{position:absolute;left:0;right:0;top:132px;text-align:center;font:400 18px 'IBM Plex Mono';letter-spacing:.1em;color:var(--dim)}
#s2_risk .k{position:absolute;left:180px;top:450px}
#s2_easy .two{position:absolute;left:0;right:0;bottom:150px;display:flex;justify-content:center;gap:120px}
#s2_easy .two div{text-align:center;opacity:0}
#s2_easy .two .a{font:400 26px 'IBM Plex Mono';letter-spacing:.22em;color:var(--mut)}
#s2_easy .two .b{font:600 70px 'Cormorant Garamond';margin-top:8px}
#s2_map .dist{position:absolute;font:500 40px 'IBM Plex Mono';color:var(--red);letter-spacing:.06em;text-shadow:0 0 30px rgba(0,0,0,.9)}
`);
const MON = (id, inner, bg = '') => `<div class="scene" id="${id}">${bg}<div class="cam"><div class="mon2"><div class="bz"></div><div class="sc">${inner}</div><div class="rec">RECREACIÓN</div></div></div></div>`;
const CURSOR = '<svg class="cursor" viewBox="0 0 34 48"><path d="M2 2 L2 38 L11 29 L18 45 L24 42 L17 27 L30 27 Z" fill="#fff" stroke="#000" stroke-width="2"/></svg>';
const INBOX = [['Recursos Humanos', 'Calendario de feriados 2015', '09:12'], ['Tesorería', 'Informe semanal de reservas', '08:47'], ['Sistemas', 'Actualización programada del correo', 'ayer'],
  ['Dirección', 'Reunión del comité · jueves', 'ayer'], ['Contabilidad', 'Cierre de diciembre', 'lun'], ['Biblioteca', 'Nuevas publicaciones del FMI', 'lun']];
const BG_KB = '<div class="ph" style="position:absolute;inset:0"><img src="img/teclado.jpg" style="filter:blur(7px) saturate(.4) brightness(.28)"></div><div class="vig"></div>';
addHTML(
  MON('s2_inbox', `<div class="mbar">CORREO · BANCO DE BANGLADÉS<b>ENERO DE 2015</b></div>
    <div class="mside"><div class="on">Bandeja de entrada</div><div>Enviados</div><div>Borradores</div><div>Archivo</div></div>
    <div class="mlist" id="ilist"><div class="mrow new" id="inew"><span class="dot"></span><span class="f">Rasel Ahlam</span><span class="s">Solicitud de empleo · currículum adjunto</span><span class="d">10:03</span></div>
    ${INBOX.map(r => `<div class="mrow"><span class="dot" style="background:none;box-shadow:none;width:12px"></span><span class="f">${r[0]}</span><span class="s">${r[1]}</span><span class="d">${r[2]}</span></div>`).join('')}</div>${CURSOR}`, BG_KB) +
  MON('s2_mail', `<div class="mbar">CORREO · BANCO DE BANGLADÉS<b>ENERO DE 2015</b></div>
    <div class="mside"><div class="on">Bandeja de entrada</div><div>Enviados</div><div>Borradores</div><div>Archivo</div></div>
    <div class="mail"><h2>Solicitud de empleo</h2><div class="from">De: Rasel Ahlam · Para: (varios empleados del banco)</div>
      <div id="mtext"></div>
      <div class="att" id="matt"><div class="file"><i></i>Curriculum_Rasel.zip</div><div class="file"><i></i>Carta_presentacion.zip</div></div></div>${CURSOR}`, BG_KB) +
  MON('s2_dl', `<div class="mbar">CORREO · BANCO DE BANGLADÉS<b>ENERO DE 2015</b></div>
    <div class="mside"><div class="on">Bandeja de entrada</div><div>Enviados</div><div>Borradores</div><div>Archivo</div></div>
    <div class="mail" style="filter:blur(3px);opacity:.5"><h2>Solicitud de empleo</h2><div class="from">De: Rasel Ahlam</div><p>Estimados:</p><p>Mi nombre es Rasel Ahlam y me interesa mucho formar parte del Banco de Bangladés.</p></div>
    <div class="dlbar" id="dlbar"><div id="dlname">Descargando Curriculum_Rasel.zip</div><div class="tr"><i id="dli"></i></div>
      <div id="dlbtn" style="margin-top:26px;display:inline-block;border:1px solid #4fb07a;color:#4fb07a;padding:10px 30px;opacity:0">ABRIR</div></div>
    <div id="dlred" style="position:absolute;inset:0;box-shadow:inset 0 0 200px rgba(210,58,50,.0)"></div>
    <div id="dlacc" style="position:absolute;left:290px;bottom:30px;font:500 20px 'IBM Plex Mono';letter-spacing:.18em;color:#d23a32;opacity:0">● CONEXIÓN REMOTA ACTIVA</div>${CURSOR}`, BG_KB) +
  `<div class="scene" id="s2_ghost"><div class="glow"></div><div class="cam"><svg class="px" id="ghsvg" viewBox="0 0 520 620"></svg>
    <div class="nm" id="ghnm"><s>RASEL AHLAM</s></div><div class="sub lbl" id="ghsub">Identidad inventada · según el FBI</div></div></div>
  <div class="scene" id="s2_movie"><div class="cam"><div class="mx" id="mxv"></div><div class="cd" id="cdv">00:10</div><div class="x" id="mvx1"></div><div class="x" id="mvx2"></div></div>
    <div class="tag" style="left:110px;top:96px" id="mvtag">Así no fue</div></div>
  <div class="scene" id="s2_net"><div class="cam"><svg id="netsvg" width="1920" height="1080"></svg></div>
    <div class="tag" style="left:110px;top:96px">Red interna del banco · esquema</div>
    <div class="stat"><div class="k" id="netmk">Febrero de 2015</div><div class="v" id="netn" style="font-size:80px">1 equipo</div></div></div>
  <div class="scene" id="s2_myth"><div class="glow"></div><div class="cam"><div class="center">
    <div class="hd" id="myhd">“Hackers vulneraron la red SWIFT”</div><div class="src">Lo que muchos contaron</div>
    <div class="truth" id="mytr">No hackearon SWIFT.</div></div></div></div>
  <div class="scene" id="s2_intact"><div class="cam"><svg id="intsvg" width="1920" height="1080"></svg></div>
    <div class="stat"><div class="k" id="intk">Red bancaria mundial</div><div class="v" id="intv" style="font-size:72px;color:var(--green)">SIN FALLAS</div></div></div>
  <div class="scene" id="s2_badge"><div class="glow"></div><div class="cam"><div class="bd"><div class="clip"></div>
    <div class="pic"><svg viewBox="0 0 300 340" id="bdpic"></svg></div>
    <div class="who" id="bdwho">OPERADOR · PISO 10</div><div class="org">BANCO DE BANGLADÉS</div>
    <div class="ok" id="bdok">✓ CREDENCIALES VÁLIDAS</div></div></div></div>
  <div class="scene" id="s2_checks"><div class="glow"></div><div class="cam"><div class="ttl lbl">Para el sistema, cada orden era legítima</div><div class="rows">
    <div class="r"><span>DESDE EL BANCO CORRECTO</span><b>✓</b></div><div class="r"><span>DESDE LA CUENTA CORRECTA</span><b>✓</b></div><div class="r"><span>CON LAS CLAVES CORRECTAS</span><b>✓</b></div>
    <div class="r" style="border:0"><span style="color:var(--red)">ENVIADA POR UN EMPLEADO</span><b style="color:var(--red)">✗</b></div></div></div></div>
  <div class="scene" id="s2_study">${BG_KB}<div class="cam">
    <div class="col" id="st1" style="left:150px"><div class="h">A qué hora</div><svg id="stsvg" width="452" height="520"></svg></div>
    <div class="col" id="st2" style="left:700px"><div class="h">Cómo se redactaban</div><div class="tpl">:20: <span>REFERENCIA</span><br>:32A: <span>FECHA · MONEDA · MONTO</span><br>:50K: <span>ORDENANTE</span><br>:57A: <span>BANCO DESTINO</span><br>:59: <span>BENEFICIARIO</span><br>:70: <span>CONCEPTO</span><br>:71A: <span>GASTOS</span></div></div>
    <div class="col" id="st3" style="left:1250px"><div class="h">Qué controles había</div>
      <div class="ctl"><span>CLAVES DE ACCESO</span><span>✓</span></div><div class="ctl"><span>FIRMA DE MENSAJES</span><span>✓</span></div>
      <div class="ctl"><span>HORARIO DE ENVÍO</span><span>✓</span></div><div class="ctl" id="stpr"><span>REGISTRO IMPRESO</span><span>?</span></div></div></div>
    <div class="tag" style="left:110px;top:96px">Lo que estudiaron durante meses · esquema</div></div>
  <div class="scene" id="s2_pr"><div class="cam"><svg id="pr4svg" width="1920" height="1080"></svg></div></div>
  <div class="scene" id="s2_hours"><div class="cam"><div class="led paper"><h4>REGISTRO IMPRESO · 05/02/2016</h4><div id="hrows"></div></div>
    <div class="clk"><svg viewBox="0 0 420 420" id="hclk"></svg><div class="v" id="hclkv">+0 h</div><div class="lbl" style="margin-top:8px">Tiempo hasta descubrirlo</div></div></div></div>
  ` + MON('s2_tamper', `<div class="mbar">SOFTWARE DE REGISTRO DE TRANSFERENCIAS<b>ESQUEMA</b></div><div class="db" id="tdb"></div><div class="q" id="tq">COLA DE IMPRESIÓN · 3 TRABAJOS</div>`, BG_KB) +
  `<div class="scene" id="s2_risk"><div class="glow"></div><div class="cam"><div class="k lbl">Riesgo de ser descubiertos · cada mes adentro</div><div class="mo" id="rmo"></div></div></div>
  <div class="scene" id="s2_map"><div class="cam"><svg id="m2svg" width="1920" height="1080"></svg><div class="dist" id="m2d">+3.000 km</div></div></div>
`);
photo('s2_easy', [S('c72') - .3, S('c74') + .1, .6, .6], { src: 'dolares.jpg', kb: [1.1, 1.2, -30, 30, 0, 0], filter: 'saturate(.4) brightness(.45) contrast(1.12)',
  html: `<div class="two"><div id="ez1"><div class="a">Robarlo</div><div class="b">la parte fácil</div></div><div id="ez2"><div class="a" style="color:var(--red)">Hacerlo desaparecer</div><div class="b">la difícil</div></div></div>` });
photo('s2_jup', [AT('c75', 'casualmente') - .5, S('ch3') + .3, .7, .9], { src: 'jupiter-cartel.jpg', pos: '50% 22%', kb: [1.08, 1.2, 0, 0, 30, 60], filter: 'saturate(.6) brightness(.62) contrast(1.1)',
  cap: ['Makati · Manila', 'Calle Júpiter'] });
bigText('s2_pat', [S('c53') - .2, S('c54') + .1, .6, .6], 'Paciencia.', { sub: 'Meses dentro de la red' });
bigText('s2_why', [S('c69') - .2, S('c71') + .1, .6, .5], '¿Por qué esperar un año?', { delay: .5 });
Object.assign(SCN, {
  s2_inbox: [S('c43') - .2, S('c45') + .4, .7, .5],
  s2_mail: [S('c45') + .1, S('c47') - .2, .4, .6],
  s2_ghost: [S('c47') - .4, S('c49') + .1, .6, .5],
  s2_dl: [S('c49') - .1, S('c51') - .1, .5, .6],
  s2_movie: [S('c51') - .2, S('c53') - .1, .4, .5],
  s2_net: [S('c54') - .3, S('c56') + .1, .6, .5],
  s2_myth: [S('c56') - .2, S('c58') + .2, .5, .5],
  s2_intact: [S('c58') - .2, S('c60') - .1, .5, .5],
  s2_badge: [S('c60') - .3, S('c61') + .2, .6, .5],
  s2_checks: [S('c61') - .1, S('c62') + .1, .4, .5],
  s2_study: [S('c62') - .2, S('c64') - .1, .6, .4],
  s2_pr: [S('c64') - .2, S('c65') + .2, .4, .5],
  s2_hours: [S('c65') - .1, S('c66') + .2, .4, .5],
  s2_tamper: [S('c66') - .1, S('c69') - .2, .5, .6],
  s2_risk: [S('c71') - .2, S('c72') + .1, .4, .5],
  s2_map: [S('c74') - .3, AT('c75', 'casualmente') - .1, .6, .6],
});
// la descarga y el clic (sonido.py usa los mismos tiempos)
const MAILCLICK = AT('c49', 'descargó') - .2, ENTRY = AT('c50', 'clic');

const C2 = {};
SETUP.push(function setupCap2() {
  // texto del correo
  $('mtext').innerHTML = `<p id="mp1">Estimados:</p><p id="mp2">Mi nombre es Rasel Ahlam y me interesa mucho formar parte del Banco de Bangladés. Les envío mi currículum y mi carta de presentación.</p><p id="mp3">Pueden descargarlos desde el enlace de abajo. Muchas gracias por su tiempo.</p>`;
  // silueta de píxeles que se desarma
  const gs = $('ghsvg'), R = rnd(31); C2.px = [];
  for (let y = 0; y < 31; y++) for (let x = 0; x < 26; x++) {
    const cx = x * 20 + 10, cy = y * 20 + 10;
    const head = Math.hypot(cx - 260, cy - 170) < 110, body = cy > 300 && Math.abs(cx - 260) < 40 + (cy - 300) * .75 && cy < 620;
    if (!head && !body) continue;
    C2.px.push({ e: el('rect', { x: cx - 9, y: cy - 9, width: 18, height: 18, fill: '#e9e6df', opacity: .9 }, gs), x: cx, y: cy, r: R(), a: R() * 6.28, d: 60 + R() * 260 });
  }
  // lluvia "de película"
  const R2 = rnd(41), cols = 64;
  C2.rain = Array.from({ length: cols }, (_, i) => ({ x: i * 30, sp: 200 + R2() * 500, off: R2() * 1000, txt: Array.from({ length: 40 }, () => String.fromCharCode(0x30A0 + Math.floor(R2() * 90))).join('<br>') }));
  $('mxv').innerHTML = C2.rain.map(c => `<div style="position:absolute;left:${c.x}px;top:0;line-height:28px;width:28px">${c.txt}</div>`).join('');
  C2.rainEls = [...$('mxv').children];
  // red interna: computadoras como nodos
  const ns = $('netsvg'); C2.nodes = [];
  const R3 = rnd(57);
  const groups = [[420, 360, 9], [520, 760, 8], [880, 300, 10], [960, 700, 9], [1300, 420, 9], [1320, 800, 7]];
  groups.forEach(([gx, gy, n], gi) => { for (let i = 0; i < n; i++) C2.nodes.push({ x: gx + (R3() - .5) * 240, y: gy + (R3() - .5) * 200, g: gi }); });
  C2.swift = [[1640, 560], [1700, 640], [1620, 700]].map(([x, y]) => ({ x, y, g: 9, swift: true }));
  C2.nodes.push(...C2.swift);
  const edges = [];
  C2.nodes.forEach((a, i) => {
    const near = C2.nodes.map((b, j) => [Math.hypot(a.x - b.x, a.y - b.y), j]).filter(([d, j]) => j !== i).sort((p, q) => p[0] - q[0]).slice(0, 2);
    near.forEach(([d, j]) => { if (!edges.some(e => (e[0] === j && e[1] === i))) edges.push([i, j]); });
  });
  C2.edges = edges.map(([i, j]) => ({ i, j, e: el('line', { x1: C2.nodes[i].x, y1: C2.nodes[i].y, x2: C2.nodes[j].x, y2: C2.nodes[j].y, stroke: '#1f2833', 'stroke-width': 2 }, ns) }));
  C2.nodes.forEach(n => {
    n.e = el('rect', { x: n.x - 14, y: n.y - 10, width: 28, height: 20, rx: 3, fill: n.swift ? '#2a2210' : '#141a21', stroke: n.swift ? '#ffb23e' : '#3a4553', 'stroke-width': 2 }, ns);
  });
  const sl = el('text', { x: 1660, y: 780, fill: '#ffb23e', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'letter-spacing': 4, 'text-anchor': 'middle' }, ns); sl.textContent = 'TERMINALES SWIFT';
  // orden de infección: búsqueda en anchura desde el primer equipo hasta las terminales SWIFT
  const adj = C2.nodes.map(() => []); C2.edges.forEach(({ i, j }) => { adj[i].push(j); adj[j].push(i); });
  const start = 0, dist = C2.nodes.map(() => Infinity); dist[start] = 0; const q = [start];
  while (q.length) { const u = q.shift(); for (const v of adj[u]) if (dist[v] === Infinity) { dist[v] = dist[u] + 1; q.push(v); } }
  // nodos sin conexión: se les asigna un paso tardío
  const maxd = Math.max(...dist.filter(isFinite));
  C2.nodes.forEach((n, i) => { n.d = isFinite(dist[i]) ? dist[i] : maxd; });
  C2.maxd = maxd;
  // credencial: silueta que cambia
  const bp = $('bdpic');
  C2.emp = el('path', { d: 'M150 70 a52 52 0 1 0 .1 0 Z M60 340 L66 230 Q72 170 150 168 Q228 170 234 230 L240 340 Z', fill: '#59636f' }, bp);
  C2.hk = el('path', { d: 'M150 64 Q206 64 210 130 Q212 168 190 186 L196 196 Q236 206 240 250 L246 340 L54 340 L60 250 Q64 206 104 196 L110 186 Q88 168 90 130 Q94 64 150 64 Z', fill: '#d23a32', opacity: 0 }, bp);
  // estudio: pagos por hora
  const st = $('stsvg');
  const hist = [0, 0, 0, 0, 0, 0, 0, 1, 4, 9, 12, 11, 7, 10, 12, 9, 6, 2, 1, 0, 0, 0, 0, 0];
  C2.bars = hist.map((v, h) => el('rect', { x: 10 + h * 18, y: 460 - v * 30, width: 13, height: v * 30, fill: '#8fb3cc', opacity: 0 }, st));
  [0, 6, 12, 18, 24].forEach(h => { const t = el('text', { x: 10 + h * 18, y: 500, fill: '#4a5059', 'font-family': 'IBM Plex Mono', 'font-size': 18, 'text-anchor': 'middle' }, st); t.textContent = String(h).padStart(2, '0'); });
  // la impresora del piso 10, con luz roja
  const p4 = $('pr4svg'); lightDefs(p4); C2.pr = drawPrinter(p4);
  // registro impreso con una línea sospechosa
  const rows = [['MT103', '2.400.000'], ['MT202', '15.000.000'], ['MT103', '870.500'], ['MT103', '6.125.000'], ['MT103', '20.000.000', 1], ['MT202', '40.000.000'], ['MT103', '1.310.250'], ['MT103', '9.900.000'], ['MT202', '22.750.000']];
  $('hrows').innerHTML = rows.map(r => `<div class="lr${r[2] ? ' sus' : ''}"><span>${r[0]}</span><span>USD ${r[1]}</span></div>`).join('');
  const hc = $('hclk');
  el('circle', { cx: 210, cy: 210, r: 190, fill: '#0b0e12', stroke: '#2a313b', 'stroke-width': 3 }, hc);
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; el('line', { x1: 210 + Math.sin(a) * 165, y1: 210 - Math.cos(a) * 165, x2: 210 + Math.sin(a) * 180, y2: 210 - Math.cos(a) * 180, stroke: '#8b919a', 'stroke-width': i % 3 ? 2 : 5 }, hc); }
  C2.harc = el('path', { d: '', fill: 'rgba(210,58,50,.25)' }, hc);
  C2.hh = el('line', { x1: 210, y1: 210, x2: 210, y2: 110, stroke: '#e9e6df', 'stroke-width': 9, 'stroke-linecap': 'round' }, hc);
  el('circle', { cx: 210, cy: 210, r: 9, fill: '#e9e6df' }, hc);
  // base de datos que borra filas
  const db = [['FT16035000001', 'BANCO DE BANGLADÉS → RCBC MANILA', 1], ['FT16035000002', 'BANCO DE BANGLADÉS → RCBC MANILA', 1], ['FT16035000003', 'PAGO DE IMPORTACIONES · TOKIO', 0], ['FT16035000004', 'BANCO DE BANGLADÉS → SRI LANKA', 1], ['FT16035000005', 'APORTE A ORGANISMO · GINEBRA', 0], ['FT16035000006', 'BANCO DE BANGLADÉS → RCBC MANILA', 1], ['FT16035000007', 'PAGO DE IMPORTACIONES · SINGAPUR', 0]];
  $('tdb').innerHTML = db.map(r => `<div class="dr${r[2] ? ' bad' : ''}"><span>${r[0]}</span><span>${r[1]}</span><i class="del"></i></div>`).join('');
  C2.drows = [...document.querySelectorAll('#tdb .dr')].map((e, i) => ({ e, bad: db[i][2] }));
  // meses de riesgo
  const ms = ['FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'ENE'];
  $('rmo').innerHTML = ms.map(m => `<div><i></i><span>${m}</span></div>`).join('');
  C2.months = [...document.querySelectorAll('#rmo i')];
});
MAPSETUP.push(function mapsCap2() {
  const s = $('m2svg'); defs(s);
  C2.m = regionMap(s, [[84, 4], [127, 30]], [[60, 60], [W - 60, H - 60]]);
  C2.mc = { daca: city(C2.m.g, C2.m.proj(cities.daca), 'DACA'), manila: city(C2.m.g, C2.m.proj(cities.manila), 'MANILA', 'end') };
  C2.ma = arc(C2.m, cities.daca, cities.manila, '#d23a32', 4, { 'stroke-dasharray': '1 0' });
  C2.ma.pth.setAttribute('stroke-dasharray', C2.ma.L);
  // destinos posibles que se descartan
  const R = rnd(77);
  C2.cands = [[100.5, 13.75], [103.8, 1.35], [106.7, 10.8], [114.2, 22.3], [96.2, 16.8], [101.7, 3.1], [113.5, 22.2]].map(c => {
    const p = C2.m.proj(c);
    const t = el('text', { x: p[0], y: p[1] + 12, fill: '#8b919a', 'font-family': 'Cormorant Garamond', 'font-size': 46, 'text-anchor': 'middle', opacity: 0 }, C2.m.g); t.textContent = '?';
    return { t, r: R() };
  });
  for (const k in C2.mc) C2.m.g.appendChild(C2.mc[k].c);
  // la red mundial intacta: copia del mapa de SWIFT del capítulo I
  const is = $('intsvg'); defs(is);
  C2.ig = C1.mw.g.cloneNode(true); is.appendChild(C2.ig);
  C2.ig.querySelectorAll('circle').forEach(c => c.setAttribute('opacity', .75));
  C2.ig.querySelectorAll('path[pathLength]').forEach(p => { p.setAttribute('stroke-dashoffset', 0); p.setAttribute('opacity', .28); });
  C2.idaca = city(C2.ig, C1.mw.proj(cities.daca), 'BANCO DE BANGLADÉS'); redCity(C2.idaca);
});

RENDER.push(function cap2(t) {
  const cur = (id, x, y) => { const c = document.querySelector(`#${id} .cursor`); c.style.transform = `translate(${x}px,${y}px)`; };
  // bandeja de entrada: llega el correo
  if (on('s2_inbox')) {
    const a = AT('c43', 'reciben') - .2, k = eo(P(t, a, a + .5));
    const nw = $('inew'); nw.style.marginTop = lerp(-92, 0, k) + 'px'; nw.style.opacity = k;
    nw.style.background = `rgba(255,178,62,${(.06 + .1 * Math.max(0, Math.sin((t - a) * 5)) * (1 - P(t, a + 1.5, a + 2.5))).toFixed(3)})`;
    const m = io(P(t, AT('c44', 'postulación') - .3, S('c45') + .2));
    cur(`s2_inbox`, lerp(900, 640, m), lerp(560, 92, m));
    $('s2_inbox').querySelector('.mon2').style.transform = `scale(${lerp(.92, 1, io(K('s2_inbox', t)))})`;
  }
  // el correo abierto
  if (on('s2_mail')) {
    const a = S('c45');
    ['mp1', 'mp2', 'mp3'].forEach((id, i) => { $(id).style.opacity = P(t, a + i * 1.6, a + .5 + i * 1.6); });
    $('matt').style.opacity = P(t, AT('c45', 'descargar') - .3, AT('c45', 'descargar') + .2);
    const m = io(P(t, AT('c46', 'cualquiera') - .5, AT('c46', 'abriría') + .2));
    cur('s2_mail', lerp(1100, 470, m), lerp(700, 650, m));
    const files = document.querySelectorAll('#matt .file');
    files[0].style.borderColor = m > .95 ? '#ffb23e' : ''; files[0].style.boxShadow = m > .95 ? '0 0 30px rgba(255,178,62,.25)' : 'none';
    $('s2_mail').querySelector('.mon2').style.transform = `scale(${lerp(1, 1.06, io(K('s2_mail', t)))})`;
  }
  // Rasel no existía
  if (on('s2_ghost')) {
    const a = AT('c47', 'no existía') - .1;
    C2.px.forEach(p => {
      const k = io(P(t, a + p.r * 1.4, a + .8 + p.r * 1.4));
      p.e.setAttribute('x', (p.x - 9 + Math.cos(p.a) * p.d * k).toFixed(1)); p.e.setAttribute('y', (p.y - 9 + Math.sin(p.a) * p.d * k - 40 * k).toFixed(1));
      p.e.setAttribute('opacity', (.9 * (1 - k)).toFixed(3));
      p.e.setAttribute('fill', k > 0 ? '#d23a32' : '#e9e6df');
    });
    $('ghnm').style.setProperty('--k', eo(P(t, a + .5, a + 1.1)));
    $('ghsub').style.opacity = P(t, S('c48') - .1, S('c48') + .5);
  }
  // la descarga y el clic
  if (on('s2_dl')) {
    const d = io(P(t, MAILCLICK, AT('c49', 'documentos') + .4));
    $('dli').style.width = (100 * d) + '%';
    $('dlname').textContent = d < 1 ? 'Descargando Curriculum_Rasel.zip · ' + Math.round(100 * d) + ' %' : 'Curriculum_Rasel.zip · descarga completa';
    $('dlbtn').style.opacity = P(t, AT('c49', 'documentos') + .3, AT('c49', 'documentos') + .6);
    const m = io(P(t, E('c49') - .2, ENTRY - .15));
    cur('s2_dl', lerp(1200, 790, m), lerp(760, 600, m));
    const hit = t > ENTRY;
    $('dlbtn').style.background = hit ? 'rgba(79,176,122,.25)' : 'none';
    const r = hit ? Math.exp(-(t - ENTRY) * 1.5) : 0;
    $('dlred').style.boxShadow = `inset 0 0 ${200 + 200 * r}px rgba(210,58,50,${(.15 + .45 * r).toFixed(3)})`;
    if (!hit) $('dlred').style.boxShadow = 'none';
    $('dlacc').style.opacity = hit ? (Math.floor((t - ENTRY) * 2) % 2 ? .5 : 1) * P(t, ENTRY + .5, ENTRY + .8) : 0;
    $('s2_dl').querySelector('.mon2').style.transform = `scale(${lerp(1, 1.1, io(K('s2_dl', t)))})`;
  }
  // películas: lluvia verde y cuenta regresiva, tachadas
  if (on('s2_movie')) {
    C2.rainEls.forEach((e, i) => { const c = C2.rain[i]; e.style.transform = `translateY(${(((t * c.sp + c.off) % 1400) - 1120).toFixed(0)}px)`; });
    const a = S('c51');
    const n = Math.max(0, 10 - Math.floor((t - a) * 3));
    $('cdv').textContent = '00:' + String(n).padStart(2, '0');
    $('cdv').style.opacity = P(t, AT('c52', 'cuentas') - .3, AT('c52', 'cuentas'));
    $('mxv').style.opacity = .85 * P(t, a - .2, a + .3);
    $('mvx1').style.transform = `rotate(-14deg) scaleX(${eo(P(t, AT('c52', 'No hubo') - .1, AT('c52', 'No hubo') + .25))})`;
    $('mvx2').style.transform = `rotate(14deg) scaleX(${eo(P(t, E('c52') - .3, E('c52') + .05))})`;
    const dim = P(t, E('c52'), E('c52') + .4);
    $('mxv').style.filter = `grayscale(${dim})`; $('cdv').style.filter = `grayscale(${dim})`;
  }
  // la red: el rojo salta de equipo en equipo durante meses
  if (on('s2_net')) {
    const a = S('c54') - .1, b = AT('c55', 'las terminales') + .3;
    const k = P(t, a, b), step = k * (C2.maxd + .999);
    C2.nodes.forEach(n => {
      const inf = n.d <= step, fresh = inf && n.d > step - 1;
      n.e.setAttribute('fill', inf ? (n.swift ? '#d23a32' : '#5a1e1b') : (n.swift ? '#2a2210' : '#141a21'));
      n.e.setAttribute('stroke', inf ? '#d23a32' : (n.swift ? '#ffb23e' : '#3a4553'));
      n.e.setAttribute('stroke-width', fresh ? 4 : 2);
    });
    C2.edges.forEach(({ i, j, e }) => { const inf = C2.nodes[i].d <= step && C2.nodes[j].d <= step; e.setAttribute('stroke', inf ? '#6b2420' : '#1f2833'); });
    const mons = ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $('netmk').textContent = mons[Math.min(10, Math.floor(k * 11))] + ' de 2015';
    const ninf = C2.nodes.filter(n => n.d <= step).length;
    $('netn').textContent = ninf === 1 ? '1 equipo' : ninf + ' equipos';
    const sw = P(t, b - .2, b + .5);
    C2.swift.forEach(n => n.e.setAttribute('filter', ''));
    $('s2_net').querySelector('.cam').style.transform += ` translateX(${lerp(0, -60, io(K('s2_net', t)))}px)`;
  }
  // el mito
  if (on('s2_myth')) {
    $('myhd').style.setProperty('--k', eo(P(t, S('c57') - .1, S('c57') + .4)));
    $('myhd').style.opacity = lerp(1, .55, P(t, S('c57'), S('c57') + .6));
    $('mytr').style.opacity = eo(P(t, S('c57') + .1, S('c57') + .7));
    $('mytr').style.transform = `translateY(${lerp(20, 0, eo(P(t, S('c57') + .1, S('c57') + .7)))}px)`;
  }
  // la red mundial no tenía fallas; el problema estaba adentro del banco
  if (C2.ig && on('s2_intact')) {
    const z = io(P(t, S('c59') - .2, E('c59') + .6)), [dx, dy] = C1.mw.proj(cities.daca), s = lerp(1.02, 3.4, z);
    C2.ig.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-lerp(W / 2, dx, z)} ${-lerp(H / 2, dy, z)})`);
    C2.idaca.inner.setAttribute('transform', `scale(${1 / s})`);
    C2.idaca.c.setAttribute('opacity', P(t, S('c59') - .1, S('c59') + .3)); pulse(C2.idaca, t, 1.1);
    const sw = P(t, S('c59'), S('c59') + .3);
    $('intk').textContent = sw > .5 ? 'El problema' : 'Red bancaria mundial';
    $('intv').textContent = sw > .5 ? 'ESTABA ADENTRO' : 'SIN FALLAS';
    $('intv').style.color = sw > .5 ? '#d23a32' : '#4fb07a';
  }
  // credenciales: el empleado y el intruso
  if (on('s2_badge')) {
    const k = eo(P(t, AT('c60', 'para el sistema') - .2, AT('c60', 'para el sistema') + .6));
    C2.hk.setAttribute('opacity', k); C2.emp.setAttribute('opacity', 1 - k * .9);
    $('bdok').style.opacity = P(t, AT('c60', 'credenciales') - .2, AT('c60', 'credenciales') + .3);
    $('s2_badge').querySelector('.bd').style.transform = `rotateY(${lerp(-12, 6, io(K('s2_badge', t)))}deg)`;
  }
  // todo correcto, salvo quién la envía
  if (on('s2_checks')) {
    const marks = [S('c61') + .3, AT('c61', 'lugar correcto'), AT('c61', 'claves correctas'), E('c61') + .2];
    document.querySelectorAll('#s2_checks .r').forEach((r, i) => { const k = eo(P(t, marks[i], marks[i] + .35)); r.style.opacity = k; r.style.transform = `translateX(${lerp(-30, 0, k)}px)`; });
  }
  // lo que estudiaron
  if (on('s2_study')) {
    const m = [AT('c62', 'a qué hora'), AT('c62', 'cómo se redactaban'), AT('c62', 'qué controles')];
    ['st1', 'st2', 'st3'].forEach((id, i) => { const k = eo(P(t, m[i] - .3, m[i] + .3)); $(id).style.opacity = k; $(id).style.transform = `translateY(${lerp(30, 0, k)}px)`; });
    C2.bars.forEach((b, i) => b.setAttribute('opacity', P(t, m[0] + i * .04, m[0] + .2 + i * .04)));
    const r = P(t, AT('c63', 'un control') - .1, AT('c63', 'un control') + .4);
    $('stpr').classList.toggle('red', r > .5);
    $('stpr').lastChild.textContent = r > .5 ? '!' : '?';
    $('stpr').style.transform = `scale(${1 + .06 * r})`;
    ['st1', 'st2'].forEach(id => { $(id).style.opacity = parseFloat($(id).style.opacity) * lerp(1, .35, r); });
  }
  // la impresora
  if (on('s2_pr')) {
    const z = io(K('s2_pr', t));
    C2.pr.g.setAttribute('transform', `translate(${lerp(700, 640, z)} ${lerp(360, 300, z)}) scale(${lerp(1.7, 2.3, z)})`);
    C2.pr.led.setAttribute('fill', '#d23a32'); C2.pr.halo.setAttribute('opacity', .5 + .5 * Math.sin(t * 6));
  }
  // en cuestión de horas
  if (on('s2_hours')) {
    const a = S('c65');
    document.querySelectorAll('#hrows .lr').forEach((r, i) => { r.style.opacity = P(t, a - .2 + i * .12, a + i * .12); });
    const sus = document.querySelector('#hrows .sus'), hk = eo(P(t, AT('c65', 'el robo') - .1, AT('c65', 'el robo') + .3));
    sus.style.setProperty('--k', hk); sus.style.color = hk > .5 ? '#b5302a' : '';
    const h = 3 * io(P(t, AT('c65', 'en cuestión') - .3, E('c65') + .2));
    C2.hh.setAttribute('transform', `rotate(${h * 30} 210 210)`);
    const ang = h * 30 * Math.PI / 180;
    C2.harc.setAttribute('d', h > .01 ? `M210 210 L210 30 A180 180 0 ${ang > Math.PI ? 1 : 0} 1 ${210 + Math.sin(ang) * 180} ${210 - Math.cos(ang) * 180} Z` : '');
    $('hclkv').textContent = '+' + Math.round(h) + ' h';
  }
  // intervienen el software: se borran las filas y la cola de impresión queda vacía
  if (on('s2_tamper')) {
    const a = AT('c67', 'manipularon') - .2, b = AT('c68', 'borraban') - .2;
    let i = 0;
    C2.drows.forEach(r => {
      if (!r.bad) { r.e.style.opacity = 1; r.e.style.height = ''; return; }
      const k = eo(P(t, b + i * .35, b + .35 + i * .35)), g = P(t, b + .35 + i * .35, b + .8 + i * .35); i++;
      r.e.querySelector('.del').style.transform = `scaleX(${k})`;
      r.e.style.opacity = 1 - g; r.e.style.maxHeight = lerp(70, 0, g) + 'px'; r.e.style.paddingTop = r.e.style.paddingBottom = lerp(16, 0, g) + 'px';
    });
    C2.drows.forEach(r => r.e.classList.toggle('bad', r.bad && t > a));
    const q = P(t, AT('c68', 'confirmación'), AT('c68', 'confirmación') + 1.2);
    $('tq').textContent = 'COLA DE IMPRESIÓN · ' + Math.round(3 * (1 - q)) + ' TRABAJOS';
    $('tq').style.color = q >= 1 ? '#d23a32' : '#8fb3cc';
    $('s2_tamper').querySelector('.mon2').style.transform = `scale(${lerp(.95, 1.02, io(K('s2_tamper', t)))})`;
  }
  // el riesgo de esperar
  if (on('s2_risk')) {
    const a = S('c71');
    C2.months.forEach((m, i) => { const k = eo(P(t, a + i * .3, a + .4 + i * .3)), lv = (i + 1) / 12; m.style.height = (k * lv * 100) + '%'; m.style.background = `rgba(210,58,50,${.25 + .75 * lv})`; });
  }
  // fácil y difícil
  if (on('s2_easy')) {
    $('ez1').style.opacity = eo(P(t, S('c72') + .3, S('c72') + .9)) * lerp(1, .45, P(t, S('c73'), S('c73') + .5));
    $('ez2').style.opacity = eo(P(t, S('c73') - .1, S('c73') + .5));
    const img = $('s2_easy').querySelector('.ph img');
    const v = P(t, AT('c73', 'desaparecer') - .2, E('c73') + 1);
    img.style.filter = `saturate(.4) brightness(${lerp(.45, .12, v)}) contrast(1.12) blur(${lerp(0, 6, v)}px)`;
  }
  // ¿adónde mandarlo? Manila
  if (C2.m && on('s2_map')) {
    const a = S('c74');
    C2.mc.daca.c.setAttribute('opacity', P(t, a - .2, a + .3));
    C2.cands.forEach(c => { const k = P(t, AT('c74', 'un lugar') - .4 + c.r * .6, AT('c74', 'un lugar') + c.r * .6); c.t.setAttribute('opacity', k * (1 - P(t, S('c75') - .2, S('c75') + .3)) * .8); });
    const ar = io(P(t, AT('c75', 'más de tres') - .3, AT('c75', 'Daca') + .3));
    C2.ma.draw(ar);
    C2.mc.manila.c.setAttribute('opacity', P(t, AT('c75', 'Manila') - .3, AT('c75', 'Manila') + .2)); redCity(C2.mc.manila);
    pulse(C2.mc.daca, t); pulse(C2.mc.manila, t, .9, .3);
    const [dx, dy] = C2.m.proj(cities.daca), [mx, my] = C2.m.proj(cities.manila);
    const mid = C2.m.path.centroid({ type: 'LineString', coordinates: [cities.daca, cities.manila] });
    $('m2d').style.left = (mid[0] - 90) + 'px'; $('m2d').style.top = (mid[1] - 80) + 'px';
    $('m2d').style.opacity = P(t, AT('c75', 'kilómetros') - .2, AT('c75', 'kilómetros') + .3);
    const z = io(P(t, AT('c75', 'en una calle') - .3, AT('c75', 'casualmente')));
    mapCam(C2.m, lerp(W / 2, mx, z), lerp(H / 2, my, z), lerp(1, 3.2, z));
    for (const k in C2.mc) C2.mc[k].inner.setAttribute('transform', `scale(${1 / lerp(1, 3.2, z)})`);
    C2.ma.pth.setAttribute('stroke-width', 4 / lerp(1, 3.2, z));
    $('m2d').style.opacity = parseFloat($('m2d').style.opacity) * (1 - z);
  }
});
