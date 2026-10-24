// Capítulo III · Calle Júpiter: las cuatro cuentas, por qué Filipinas y el calendario perfecto
addCSS(`
#s3_street .lab{position:absolute;font:500 22px 'IBM Plex Mono';letter-spacing:.14em;color:#8b919a;text-align:center;opacity:0}
#s3_street .lab.r{color:var(--red)}
.acc4{position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center;gap:34px}
.acc{width:400px;height:640px;padding:30px 30px;font:400 20px 'IBM Plex Mono';position:relative;opacity:0}
.acc h5{font:500 19px 'IBM Plex Mono';letter-spacing:.18em;border-bottom:2px solid #1c1d1f;padding-bottom:12px;margin-bottom:10px;display:flex;justify-content:space-between}
.acc h5 span{color:#6d6a64;font-weight:400}
.acc .f{padding:12px 0 10px;border-bottom:1px dashed #9c978e;position:relative}
.acc .f .a{display:block;font-size:15px;letter-spacing:.14em;color:#6d6a64;margin-bottom:4px}
.acc .bar{display:inline-block;height:20px;background:#1c1d1f;vertical-align:middle}
.acc .f .hl{position:absolute;inset:-2px -12px;border:3px solid var(--red);opacity:0}
.acc .st{position:absolute;font:700 40px Inter;letter-spacing:.12em;border:5px solid;padding:4px 16px;opacity:0;mix-blend-mode:multiply}
.acc .st.fake{right:6px;top:2px;color:#c0302a;border-color:#c0302a;transform:rotate(-12deg)}
.acc .st.okk{left:50%;bottom:40px;color:#2f7d4f;border-color:#2f7d4f;transform:translateX(-50%) rotate(-4deg)}
.acc .dep{font:500 30px 'IBM Plex Mono';margin-top:18px;color:#1c1d1f;opacity:0}
#s3_dep .accs{position:absolute;left:0;right:0;top:200px;display:flex;justify-content:center;gap:40px}
#s3_dep .ac{width:360px;height:230px;border:1px solid #2a313b;background:linear-gradient(#0e1217,#0a0d11);padding:26px 28px}
#s3_dep .ac .k{font:400 19px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut)}
#s3_dep .ac .v{font:500 58px 'IBM Plex Mono';margin-top:22px}
#s3_dep .ac .z{font:400 18px 'IBM Plex Mono';letter-spacing:.2em;color:var(--dim);margin-top:16px}
#s3_dep .mos{position:absolute;left:170px;right:170px;top:600px;display:flex;gap:10px}
#s3_dep .mos div{flex:1;height:150px;border:1px solid #1d232b;background:#0b0e12;font:500 22px 'IBM Plex Mono';letter-spacing:.1em;color:#4a5059;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
#s3_dep .mos div b{font:400 16px 'IBM Plex Mono';letter-spacing:.14em;color:#2e343c}
#s3_leave .accs{position:absolute;left:0;right:0;top:300px;display:flex;justify-content:center;gap:40px}
#s3_leave .ac{width:300px;height:180px;border:1px solid #2a313b;background:#0d1116;display:flex;align-items:center;justify-content:center;font:500 46px 'IBM Plex Mono'}
.slots{position:absolute;left:0;right:0;top:50%;margin-top:-150px;display:flex;justify-content:center;gap:40px}
.slot{width:380px;height:300px;border:2px dashed #2a313b;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;font:600 34px Inter;letter-spacing:.1em}
.slot .ic{font:500 80px 'IBM Plex Mono';line-height:1}
.slot.done{border:2px solid #2d4a39;background:rgba(79,176,122,.05)}
.slot.done .ic{color:var(--green)}
#s3_timing .tl{position:absolute;left:200px;right:200px;top:560px;height:4px;background:#2a313b}
#s3_timing .mk{position:absolute;top:-14px;width:4px;height:32px;background:#e9e6df}
#s3_timing .lb{position:absolute;top:44px;font:400 22px 'IBM Plex Mono';letter-spacing:.14em;transform:translateX(-50%);white-space:nowrap;text-align:center}
#s3_timing .zone{position:absolute;top:-40px;height:84px}
#s3_timing .dot{position:absolute;top:-16px;width:36px;height:36px;margin-left:-18px;border-radius:50%;background:#ffd28a;box-shadow:0 0 30px #ffb23e}
#s3_cal .clks{position:absolute;left:0;right:0;top:80px;display:flex;justify-content:center;gap:120px}
#s3_cal .ck{text-align:center;width:300px}
#s3_cal .ck svg{width:230px;height:230px}
#s3_cal .ck .c{font:500 22px 'IBM Plex Mono';letter-spacing:.22em;margin-top:6px}
#s3_cal .ck .h{font:500 44px 'IBM Plex Mono';margin-top:4px}
#s3_cal .ck .d{font:400 18px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);margin-top:2px}
#s3_cal .grid{position:absolute;left:180px;right:180px;top:530px;display:grid;grid-template-columns:240px repeat(6,1fr);gap:8px}
#s3_cal .grid .h{font:400 20px 'IBM Plex Mono';letter-spacing:.18em;color:var(--mut);text-align:center;padding-bottom:4px}
#s3_cal .grid .rn{font:500 22px 'IBM Plex Mono';letter-spacing:.16em;display:flex;align-items:center}
#s3_cal .cell{height:118px;border:1px solid #1d232b;background:#0b0e12;position:relative;font:500 17px 'IBM Plex Mono';letter-spacing:.08em;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.35;color:#3a4049}
#s3_cal .cell i{position:absolute;inset:0;opacity:0}
#s3_cal .cell span{position:relative}
#s3_cal .band{position:absolute;height:20px;background:var(--red);box-shadow:0 0 40px rgba(210,58,50,.6);transform-origin:left;transform:scaleX(0)}
#s3_cal .bandl{position:absolute;font:600 40px 'IBM Plex Mono';color:var(--red);letter-spacing:.1em;opacity:0}
#s3_ready .three{position:absolute;left:0;right:0;top:330px;display:flex;justify-content:center;gap:90px}
#s3_ready .three div{font:600 64px 'Cormorant Garamond';opacity:0;text-align:center}
#s3_ready .three div b{display:block;font:500 46px 'IBM Plex Mono';color:var(--green);margin-bottom:10px}
#s3_ready svg{position:absolute;left:50%;top:600px;width:300px;height:300px;margin-left:-150px}
`);
const ACC = [0, 1, 2, 3];
addHTML(`
<div class="scene" id="s3_mapz"><div class="cam"><svg id="m3svg" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s3_street"><div class="cam"><svg id="stsvg3" width="1920" height="1080"></svg>
  <div class="lab" id="lb1" style="left:470px;top:330px;width:300px">HOTEL</div>
  <div class="lab r" id="lb2" style="left:810px;top:330px;width:300px">RCBC<br>SUCURSAL JUPITER</div>
  <div class="lab" id="lb3" style="left:1150px;top:330px;width:300px">CONSULTORIO<br>DENTAL</div></div>
  <div class="tag" style="left:110px;top:96px">Calle Júpiter · Makati · esquema</div></div>
<div class="scene" id="s3_acc"><div class="glow"></div><div class="cam"><div class="acc4">
  ${ACC.map((a, i) => `<div class="acc paper" id="ac${i}"><h5>FICHA DE CLIENTE<span>RCBC · MAYO 2015</span></h5>
    <div class="f"><span class="a">TITULAR</span><span class="bar" style="width:${200 + i * 23}px"></span></div>
    <div class="f"><span class="a">LICENCIA DE CONDUCIR</span>N° <span class="bar" style="width:170px"></span><div class="st fake">FALSA</div></div>
    <div class="f"><span class="a">EMPRESA</span>EMPRESA ${'ABCD'[i]} · <span class="bar" style="width:${90 + i * 31}px"></span></div>
    <div class="f"><span class="a">CARGO</span><span class="bar" style="width:240px"></span><i class="hl"></i></div>
    <div class="f"><span class="a">SALARIO MENSUAL</span>PHP <span class="bar" style="width:150px"></span><i class="hl"></i></div>
    <div class="dep">DEPÓSITO: US$ 500</div>
    <div class="st okk">APROBADA</div></div>`).join('')}</div>
  <svg id="accsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg></div>
  <div class="tag" style="left:110px;bottom:60px">Recreación · nombres y números ocultos</div></div>
<div class="scene" id="s3_dep"><div class="glow"></div><div class="cam">
  <div class="accs">${[1, 2, 3, 4].map(i => `<div class="ac"><div class="k">CUENTA ${i} · RCBC JUPITER</div><div class="v">US$ 500</div><div class="z" id="z${i}">ABIERTA · MAYO 2015</div></div>`).join('')}</div>
  <div class="mos" id="mos3">${['JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'ENE', 'FEB'].map(m => `<div>${m}<b>0 MOV.</b></div>`).join('')}</div></div></div>
<div class="scene" id="s3_leave"><div class="glow"></div><div class="cam"><div class="accs">${[1, 2, 3, 4].map(i => `<div class="ac">US$ 500</div>`).join('')}</div>
  <svg id="lvsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:620px" id="lvt">Cuentas de paso</div></div></div>
<div class="scene" id="s3_plan"><div class="glow"></div><div class="cam"><div class="slots">
  <div class="slot done" id="sl1"><div class="ic">✓</div>EL ACCESO</div><div class="slot done" id="sl2"><div class="ic">✓</div>LAS CUENTAS</div>
  <div class="slot" id="sl3"><div class="ic" id="sl3i">?</div><span id="sl3t">&nbsp;</span></div></div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:250px">La última pieza del plan</div></div></div>
<div class="scene" id="s3_timing"><div class="glow"></div><div class="cam"><div class="tl" id="ttl">
  <div class="zone" id="tz1" style="left:0;width:38%;background:rgba(79,176,122,.12);border-left:2px solid #4fb07a"></div>
  <div class="zone" id="tz2" style="left:38%;right:0;background:rgba(210,58,50,.12);border-left:2px solid #d23a32"></div>
  <div class="mk" style="left:0"></div><div class="lb" style="left:0">SE ENVÍA</div>
  <div class="lb" id="tzl1" style="left:19%;top:-110px;color:var(--green)">SE PUEDE FRENAR</div>
  <div class="lb" id="tzl2" style="left:69%;top:-110px;color:var(--red)">DEMASIADO TARDE</div>
  <div class="dot" id="tdot"></div></div>
  <div class="bigsub" style="position:absolute;left:0;right:0;top:300px">Una transferencia sospechosa</div></div></div>
<div class="scene" id="s3_cal"><div class="cam" id="s3calcam">
  <div class="clks">${[['DACA', 'c3a'], ['NUEVA YORK', 'c3b'], ['MANILA', 'c3c']].map(([n, id]) => `<div class="ck"><svg viewBox="0 0 230 230" id="${id}"></svg><div class="c">${n}</div><div class="h" id="${id}h">--:--</div><div class="d" id="${id}d">&nbsp;</div></div>`).join('')}</div>
  <div class="grid" id="g3"></div><div class="band" id="g3band"></div><div class="bandl" id="g3bl">CASI 5 DÍAS</div></div></div>
<div class="scene" id="s3_ready"><div class="glow"></div><div class="cam"><div class="three">
  <div id="r1"><b>✓</b>Las claves</div><div id="r2"><b>✓</b>Las cuentas</div><div id="r3"><b>✓</b>El reloj</div></div><svg viewBox="0 0 300 300" id="btnsvg"></svg></div></div>
`);
chapterCard('s3_card', 'ch3', 'III', 'Calle Júpiter', 'Makati, Manila · Mayo de 2015');
photo('s3_makati', [S('c77') - .4, S('c78') + .3, .7, .6], { src: 'makati-dia.jpg', kb: [1.05, 1.14, -30, 30, 0, -10], filter: 'saturate(.55) brightness(.6) contrast(1.08)', cap: ['Makati · Manila', 'El distrito financiero'] });
photo('s3_rcbc', [AT('c78', 'el Rizal') - .3, S('c79') + .2, .6, .6], { src: 'rcbc.jpg', pos: '50% 35%', kb: [1.06, 1.16, 0, 0, 30, -10], filter: 'saturate(.5) brightness(.55) contrast(1.1)', cap: ['RCBC · Rizal Commercial Banking Corporation', 'Uno de los bancos más grandes de Filipinas'] });
photo('s3_why', [S('c89') - .3, S('c91') - .1, .7, .5], { src: 'bahia-manila.jpg', kb: [1.05, 1.16, 30, -30, 0, -10], filter: 'saturate(.55) brightness(.45) contrast(1.1)',
  html: `<div class="center"><div class="big" id="s3wt" style="opacity:0">¿Por qué Filipinas?</div><div class="bigsub" id="s3ws" style="opacity:0">Una razón que va a ser decisiva</div></div>` });
quote('s3_quote', [S('c106') - .3, S('c108') - .1, .6, .6], 'Ahí se ve la elegancia del ataque.', 'Rakesh Asthana', 'Especialista en ciberseguridad · trabajó en el caso', { span: [S('c107') - .1, E('c107') + .3] });
Object.assign(SCN, {
  s3_mapz: [S('ch3') + 3.6, S('c77') + .1, .7, .5],
  s3_street: [S('c78') - .3, AT('c78', 'el Rizal') + .2, .5, .5],
  s3_acc: [S('c79') - .3, S('c84') + .5, .6, .5],
  s3_dep: [S('c84') + .2, S('c89') - .1, .5, .5],
  s3_leave: [S('c91') - .2, S('c92') + .1, .4, .5],
  s3_plan: [S('c92') - .2, S('c95') - .1, .5, .5],
  s3_timing: [S('c95') - .2, S('c98') - .1, .5, .5],
  s3_cal: [S('c98') - .3, S('c106') - .1, .6, .6],
  s3_ready: [S('c108') - .3, S('ch4') + .2, .5, .7],
});
// sello de "nadie lo notó" y del depósito (sonido.py usa los mismos tiempos)
const ACC_FAKE = AT('c81', 'falsas') - .1, ACC_OK = S('c83') + .1;

const C3 = {};
function clockFace(svg) {
  el('circle', { cx: 115, cy: 115, r: 104, fill: '#0b0e12', stroke: '#2a313b', 'stroke-width': 3 }, svg);
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; el('line', { x1: 115 + Math.sin(a) * 88, y1: 115 - Math.cos(a) * 88, x2: 115 + Math.sin(a) * 98, y2: 115 - Math.cos(a) * 98, stroke: '#8b919a', 'stroke-width': i % 3 ? 2 : 4 }, svg); }
  const hh = el('line', { x1: 115, y1: 115, x2: 115, y2: 62, stroke: '#e9e6df', 'stroke-width': 7, 'stroke-linecap': 'round' }, svg);
  const mh = el('line', { x1: 115, y1: 115, x2: 115, y2: 34, stroke: '#d23a32', 'stroke-width': 4, 'stroke-linecap': 'round' }, svg);
  el('circle', { cx: 115, cy: 115, r: 7, fill: '#e9e6df' }, svg);
  return { hh, mh, set(min) { hh.setAttribute('transform', `rotate(${(min / 720) * 360} 115 115)`); mh.setAttribute('transform', `rotate(${(min % 60) * 6} 115 115)`); } };
}
SETUP.push(function setupCap3() {
  // calle Júpiter: esquema de manzanas
  const s = $('stsvg3');
  C3.street = [
    el('rect', { x: 0, y: 470, width: 1920, height: 110, fill: '#141a21' }, s),
    el('rect', { x: 1500, y: 0, width: 110, height: 1080, fill: '#141a21' }, s),
  ];
  const tx = (x, y, txt, sz = 26, col = '#4a5059', rot = 0) => { const t = el('text', { x, y, fill: col, 'font-family': 'IBM Plex Mono', 'font-size': sz, 'letter-spacing': 8, 'text-anchor': 'middle', transform: rot ? `rotate(${rot} ${x} ${y})` : '' }, s); t.textContent = txt; return t; };
  tx(760, 536, 'JUPITER STREET', 28, '#8b919a'); tx(1556, 250, 'MAKATI AVENUE', 24, '#4a5059', 90);
  for (let k = 0; k < 4; k++) el('rect', { x: 120 + k * 340, y: 600, width: 300, height: 260, fill: '#0e1318', stroke: '#1f2731' }, s);
  C3.blocks = [470, 810, 1150].map((x, i) => el('rect', { x, y: 180, width: 300, height: 260, fill: i === 1 ? '#2a1414' : '#11171e', stroke: i === 1 ? '#d23a32' : '#28313c', 'stroke-width': i === 1 ? 3 : 1.5, opacity: 0 }, s));
  for (let k = 0; k < 2; k++) el('rect', { x: 120 + k * 1180 - (k ? 0 : 0), y: 180, width: k ? 160 : 300, height: 260, fill: '#0e1318', stroke: '#1f2731' }, s);
  C3.pin = el('g', { opacity: 0 }, s);
  el('path', { d: 'M0 0 C-30 -40 -30 -80 0 -80 C30 -80 30 -40 0 0 Z', fill: '#d23a32' }, C3.pin);
  el('circle', { cx: 0, cy: -55, r: 10, fill: '#2a1414' }, C3.pin);
  // conexiones entre las fichas (mismo cargo y salario)
  C3.links = [];
  // botón
  const b = $('btnsvg');
  C3.btnring = el('circle', { cx: 150, cy: 150, r: 110, fill: 'none', stroke: '#2a313b', 'stroke-width': 6 }, b);
  C3.btn = el('circle', { cx: 150, cy: 150, r: 84, fill: '#5a1e1b', stroke: '#d23a32', 'stroke-width': 4 }, b);
  C3.btnglow = el('circle', { cx: 150, cy: 150, r: 130, fill: 'none', stroke: '#d23a32', 'stroke-width': 2, opacity: 0 }, b);
  // salida del dinero de las cuentas
  const lv = $('lvsvg'), R = rnd(91);
  C3.flows = Array.from({ length: 36 }, (_, i) => {
    const x0 = 680 + (i % 4) * 340 - 340 + 130 + (R() - .5) * 120, y0 = 470;
    const ang = -Math.PI / 2 + (R() - .5) * 2.4, len = 500 + R() * 400;
    return { p: el('path', { d: `M${x0} ${y0} L${x0 + Math.cos(ang) * len} ${y0 - Math.abs(Math.sin(ang)) * len * .2 + 400}`, stroke: '#d23a32', 'stroke-width': 2, fill: 'none', 'stroke-dasharray': '10 16', opacity: 0 }, lv), r: R() };
  });
  // calendario de tres países
  const days = ['JUE 4', 'VIE 5', 'SÁB 6', 'DOM 7', 'LUN 8', 'MAR 9'];
  const rows = ['DACA', 'NUEVA YORK', 'MANILA'];
  let h = '<div></div>' + days.map(d => `<div class="h">${d}</div>`).join('');
  rows.forEach((r, i) => { h += `<div class="rn">${r}</div>` + days.map((d, j) => `<div class="cell" id="g3_${i}_${j}"><i></i><span></span></div>`).join(''); });
  $('g3').innerHTML = h;
  C3.clk = ['c3a', 'c3b', 'c3c'].map(id => clockFace($(id)));
});
MAPSETUP.push(function mapsCap3() {
  const s = $('m3svg'); defs(s);
  C3.m = regionMap(s, [[116, 4.5], [127, 21]], [[300, 60], [W - 300, H - 60]]);
  el('path', { d: C3.m.path(country('608')), fill: '#1b222b', stroke: '#8b919a', 'stroke-width': 2 }, C3.m.g);
  C3.mc = city(C3.m.g, C3.m.proj(cities.manila), 'MANILA');
  const t = el('text', { x: C3.m.proj([123.5, 11.5])[0], y: C3.m.proj([123.5, 11.5])[1], fill: '#4a5059', 'font-family': 'IBM Plex Mono', 'font-size': 30, 'letter-spacing': 10, 'text-anchor': 'middle' }, C3.m.g); t.textContent = 'FILIPINAS';
});

// estado de cada celda del calendario: [fila, col, texto, color de fondo, color de texto, momento]
const CAL3 = () => [
  [0, 0, 'NOCHE<br>EL ATAQUE', 'rgba(210,58,50,.22)', '#ff8a7e', AT('c99', 'a la noche') - .3],
  [1, 0, 'ABIERTA<br>PROCESA PAGOS', 'rgba(79,176,122,.16)', '#7fd3a2', AT('c100', 'abierta') - .3],
  [0, 1, 'FIN DE<br>SEMANA', 'rgba(80,120,160,.18)', '#8fb3cc', AT('c101', 'fin de semana') - .3],
  [0, 2, 'FIN DE<br>SEMANA', 'rgba(80,120,160,.18)', '#8fb3cc', AT('c101', 'fin de semana') - .1],
  [0, 3, 'VUELVEN A<br>BUSCAR', 'rgba(255,255,255,.04)', '#8b919a', AT('c102', 'vuelve a buscar') - .2],
  [1, 2, 'CERRADA', 'rgba(80,120,160,.18)', '#8fb3cc', AT('c102', 'ya es sábado') - .1],
  [1, 3, 'CERRADA', 'rgba(80,120,160,.18)', '#8fb3cc', AT('c102', 'domingo') - .1],
  [1, 1, 'ABIERTA', 'rgba(79,176,122,.1)', '#5c9a77', AT('c102', 'La Fed') - .2],
  [2, 4, 'FERIADO<br>AÑO NUEVO', 'rgba(255,178,62,.2)', '#ffd28a', AT('c103', 'feriado') - .3],
  [2, 0, 'ABIERTO', 'rgba(255,255,255,.04)', '#8b919a', AT('c103', 'Los bancos') - .1],
  [2, 1, 'ABIERTO', 'rgba(255,255,255,.04)', '#8b919a', AT('c103', 'Los bancos')],
  [1, 4, 'ABIERTA', 'rgba(79,176,122,.1)', '#5c9a77', S('c104')],
];
RENDER.push(function cap3(t) {
  // zoom a Manila
  if (C3.m && on('s3_mapz')) {
    const k = io(K('s3_mapz', t)), [mx, my] = C3.m.proj(cities.manila), s = lerp(1, 2.6, k);
    mapCam(C3.m, lerp(W / 2, mx, k), lerp(H / 2, my, k), s);
    C3.mc.inner.setAttribute('transform', `scale(${1 / s})`); C3.mc.c.setAttribute('opacity', P(t, S('c76') - .3, S('c76') + .2)); pulse(C3.mc, t);
  }
  // la calle: hotel, RCBC, consultorio
  if (on('s3_street')) {
    const m = [AT('c78', 'un hotel'), AT('c78', 'sucursal'), AT('c78', 'consultorio')];
    [1, 2, 3].forEach((n, i) => { const k = eo(P(t, m[i === 1 ? 2 : i === 2 ? 1 : 0] - .3, m[i === 1 ? 2 : i === 2 ? 1 : 0] + .2)); });
    const kH = eo(P(t, m[0] - .3, m[0] + .2)), kD = eo(P(t, m[2] - .3, m[2] + .2)), kR = eo(P(t, m[1] - .2, m[1] + .3));
    C3.blocks[0].setAttribute('opacity', kH); $('lb1').style.opacity = kH;
    C3.blocks[2].setAttribute('opacity', kD); $('lb3').style.opacity = kD;
    C3.blocks[1].setAttribute('opacity', kR); $('lb2').style.opacity = kR;
    C3.pin.setAttribute('opacity', kR); C3.pin.setAttribute('transform', `translate(960 ${lerp(120, 170, eo(kR))})`);
    $('s3_street').querySelector('.cam').style.transform += ` scale(${lerp(1, 1.12, io(P(t, m[1], SCN.s3_street[1])))})`;
  }
  // las cuatro fichas
  if (on('s3_acc')) {
    const a = AT('c79', 'cuatro cuentas') - .5;
    for (let i = 0; i < 4; i++) {
      const c = $('ac' + i), k = eo(P(t, a + i * .2, a + .5 + i * .2));
      c.style.opacity = k * lerp(1, .5, P(t, S('c83'), S('c83') + .5)) + P(t, S('c83'), S('c83') + .5) * .5 * k;
      c.style.transform = `translateY(${lerp(50, 0, k)}px) rotate(${(i - 1.5) * lerp(2, .6, k)}deg)`;
      const fk = P(t, ACC_FAKE + i * .15, ACC_FAKE + .12 + i * .15);
      const st = c.querySelector('.st.fake'); st.style.opacity = fk > 0 ? .9 : 0; st.style.transform = `rotate(-12deg) scale(${lerp(1.8, 1, eo(fk))})`;
      const hl = c.querySelectorAll('.hl'), h1 = eo(P(t, AT('c82', 'mismo cargo') - .2 + i * .08, AT('c82', 'mismo cargo') + .2 + i * .08)), h2 = eo(P(t, AT('c82', 'mismo salario') - .2 + i * .08, AT('c82', 'mismo salario') + .2 + i * .08));
      hl[0].style.opacity = h1; hl[1].style.opacity = h2;
      const ok = P(t, ACC_OK + i * .12, ACC_OK + .1 + i * .12);
      const so = c.querySelector('.st.okk'); so.style.opacity = ok > 0 ? .85 : 0; so.style.transform = `translateX(-50%) rotate(-4deg) scale(${lerp(1.8, 1, eo(ok))})`;
      const dp = c.querySelector('.dep'); dp.style.opacity = P(t, S('c84') - .1 + i * .15, S('c84') + .2 + i * .15);
    }
    $('s3_acc').querySelector('.cam').style.transform += ` translateY(${lerp(0, -20, io(K('s3_acc', t)))}px)`;
  }
  // nueve meses dormidas
  if (on('s3_dep')) {
    const a = S('c86') - .2, ms = $('mos3').children;
    for (let i = 0; i < ms.length; i++) {
      const k = P(t, a + i * .5, a + .3 + i * .5);
      ms[i].style.borderColor = k > .5 ? '#3a4553' : '#1d232b'; ms[i].style.color = k > .5 ? '#e9e6df' : '#4a5059';
      ms[i].querySelector('b').style.color = k > .5 ? '#8b919a' : '#2e343c';
    }
    for (let i = 1; i <= 4; i++) $('z' + i).textContent = t > S('c87') ? 'SIN MOVIMIENTOS' : 'ABIERTA · MAYO 2015';
    const dim = P(t, S('c88') - .2, S('c88') + .8);
    $('s3_dep').querySelector('.accs').style.opacity = lerp(1, .55, dim);
  }
  // ¿por qué Filipinas?
  if (on('s3_why')) {
    const k = eo(P(t, S('c89') - .1, S('c89') + .6));
    $('s3wt').style.opacity = k; $('s3wt').style.letterSpacing = lerp(.08, .02, eo(P(t, S('c89'), S('c89') + 3))) + 'em';
    $('s3ws').style.opacity = P(t, AT('c90', 'decisivo') - .3, AT('c90', 'decisivo') + .4);
  }
  // el dinero no se iba a quedar
  if (on('s3_leave')) {
    const a = AT('c91', 'el dinero') - .2;
    C3.flows.forEach(f => { const k = P(t, a + f.r * 1.2, a + .3 + f.r * 1.2); f.p.setAttribute('opacity', k * .8); f.p.setAttribute('stroke-dashoffset', -t * 120); });
    $('lvt').style.opacity = P(t, a + 1, a + 1.6);
  }
  // la última pieza
  if (on('s3_plan')) {
    const k = eo(P(t, S('c94') - .1, S('c94') + .4));
    $('sl3').classList.toggle('done', k > .5);
    $('sl3').style.borderColor = k > .5 ? '#d23a32' : ''; $('sl3').style.background = k > .5 ? 'rgba(210,58,50,.08)' : '';
    $('sl3i').textContent = k > .5 ? '◷' : '?'; $('sl3i').style.color = k > .5 ? '#d23a32' : '';
    $('sl3t').textContent = k > .5 ? 'EL CALENDARIO' : ' ';
    $('sl3').style.transform = `scale(${1 + .08 * Math.sin(Math.PI * k)})`;
    ['sl1', 'sl2'].forEach((id, i) => { const q = eo(P(t, S('c92') + i * .3, S('c92') + .4 + i * .3)); $(id).style.opacity = q; });
  }
  // detectarla a tiempo… o demasiado tarde
  if (on('s3_timing')) {
    const d = io(P(t, S('c95') + .3, E('c97')));
    $('tdot').style.left = (d * 92) + '%';
    $('tdot').style.background = d > .41 ? '#ff8a7e' : '#ffd28a'; $('tdot').style.boxShadow = d > .41 ? '0 0 30px #d23a32' : '0 0 30px #ffb23e';
    $('tzl1').style.opacity = P(t, AT('c95', 'a tiempo') - .4, AT('c95', 'a tiempo'));
    $('tzl2').style.opacity = P(t, AT('c97', 'demasiado') - .3, AT('c97', 'demasiado') + .1);
    $('tz2').style.opacity = lerp(.3, 1, P(t, AT('c97', 'demasiado') - .3, AT('c97', 'demasiado') + .1));
  }
  // tres relojes, tres calendarios
  if (on('s3_cal')) {
    // hora de Daca según el momento del relato
    const steps = [[S('c98'), 20 * 60 + 36, 'JUE 4'], [AT('c101', 'El viernes'), 10 * 60 + 0, 'VIE 5'], [AT('c102', 'sábado'), 19 * 60, 'SÁB 6'], [AT('c103', 'el lunes'), 8 * 60 + 30, 'LUN 8']];
    let mins = steps[0][1], day = 0;
    for (let i = 1; i < steps.length; i++) { const k = io(P(t, steps[i][0] - .6, steps[i][0] + .6)); if (k > 0) { mins = lerp(mins, steps[i][1] + (i === 1 ? 24 * 60 : i === 2 ? 2 * 24 * 60 : 4 * 24 * 60) - (i === 1 ? 0 : i === 2 ? 0 : 0), k); day = i; } }
    // reloj absoluto en minutos desde el jueves 00:00 hora de Daca
    const base = [20 * 60 + 36, 24 * 60 + 10 * 60, 2 * 24 * 60 + 19 * 60, 4 * 24 * 60 + 8 * 60 + 30];
    let abs = base[0];
    for (let i = 1; i < 4; i++) abs = lerp(abs, base[i], io(P(t, steps[i][0] - .7, steps[i][0] + .7)));
    const DN = ['JUE', 'VIE', 'SÁB', 'DOM', 'LUN', 'MAR'];
    [0, -11 * 60, 2 * 60].forEach((off, i) => {
      const m = abs + off, dd = Math.floor(m / 1440), hm = ((m % 1440) + 1440) % 1440;
      C3.clk[i].set(hm);
      $(['c3a', 'c3b', 'c3c'][i] + 'h').textContent = String(Math.floor(hm / 60)).padStart(2, '0') + ':' + String(Math.floor(hm % 60)).padStart(2, '0');
      $(['c3a', 'c3b', 'c3c'][i] + 'd').textContent = DN[Math.max(0, dd)] + ' ' + (4 + Math.max(0, dd)) + ' FEB';
    });
    CAL3().forEach(([r, c, txt, bg, col, at]) => {
      const cell = $(`g3_${r}_${c}`), k = eo(P(t, at, at + .4));
      cell.querySelector('i').style.background = bg; cell.querySelector('i').style.opacity = k;
      cell.querySelector('span').innerHTML = k > 0 ? txt : '';
      cell.querySelector('span').style.opacity = k; cell.style.color = col;
    });
    // fila activa
    const rowK = [P(t, S('c99'), S('c99') + .3) * (1 - P(t, S('c100'), S('c100') + .3)) + P(t, S('c101'), S('c101') + .3) * (1 - P(t, S('c102'), S('c102') + .3)),
      P(t, S('c100'), S('c100') + .3) * (1 - P(t, S('c101'), S('c101') + .3)) + P(t, AT('c102', 'en Nueva York'), AT('c102', 'en Nueva York') + .3) * (1 - P(t, S('c103'), S('c103') + .3)),
      P(t, S('c103'), S('c103') + .3) * (1 - P(t, S('c104'), S('c104') + .3))];
    document.querySelectorAll('#g3 .rn').forEach((e, i) => { e.style.color = rowK[i] > .5 || t > S('c104') ? '#e9e6df' : '#4a5059'; });
    // la franja roja de casi cinco días
    const b0 = $('g3_0_0'), b1 = $('g3_2_4');
    if (b0 && b1) {
      const g = $('g3').getBoundingClientRect(), x0 = b0.offsetLeft + b0.offsetWidth * .55, x1 = b1.offsetLeft + b1.offsetWidth * .9;
      const band = $('g3band'); band.style.left = (180 + x0) + 'px'; band.style.width = (x1 - x0) + 'px'; band.style.top = (530 + $('g3').offsetHeight + 26) + 'px';
      const bk = io(P(t, AT('c105', 'una ventana') - .2, AT('c105', 'cinco días') + .4));
      band.style.transform = `scaleX(${bk})`;
      $('g3bl').style.left = (180 + x0) + 'px'; $('g3bl').style.top = (530 + $('g3').offsetHeight + 60) + 'px';
      $('g3bl').style.opacity = P(t, AT('c105', 'cinco días') - .1, AT('c105', 'cinco días') + .4);
    }
    $('s3calcam').style.transform = `scale(${lerp(1, .97, io(P(t, S('c104'), S('c105'))))})`;
  }
  // claves, cuentas, reloj… y el botón
  if (on('s3_ready')) {
    const m = [S('c108'), AT('c108', 'Ya tenían las cuentas'), AT('c108', 'Ya tenían el reloj')];
    ['r1', 'r2', 'r3'].forEach((id, i) => { const k = eo(P(t, m[i] - .1, m[i] + .4)); $(id).style.opacity = k * lerp(1, .4, P(t, S('c109'), S('c109') + .5)); $(id).style.transform = `translateY(${lerp(20, 0, k)}px)`; });
    const bk = eo(P(t, S('c109') - .1, AT('c109', 'apretar') + .2));
    $('btnsvg').style.opacity = bk;
    const pr = AT('c109', 'el botón') + .2;
    C3.btn.setAttribute('r', t > pr ? 78 : 84);
    C3.btn.setAttribute('fill', t > pr ? '#d23a32' : '#5a1e1b');
    C3.btnglow.setAttribute('opacity', t > pr ? Math.exp(-(t - pr) * 2) : 0);
    C3.btnglow.setAttribute('r', t > pr ? 130 + (t - pr) * 120 : 130);
  }
});
