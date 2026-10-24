// Capítulo VII · Lázaro: Lazarus, Sony, Park Jin-hyok, las dudas sobre las pruebas y el porqué
addCSS(`
#s7_laz .lz{font:600 230px 'Cormorant Garamond';letter-spacing:.16em;color:var(--ink);position:relative}
#s7_laz .lz span{display:inline-block}
#s7_code .pane{position:absolute;top:170px;width:780px;height:720px;border:1px solid #232a33;background:#0a0d11;padding:26px 30px;font:400 21px 'IBM Plex Mono';color:#4a5059;line-height:1.75;overflow:hidden}
#s7_code .pane .h{font:500 20px 'IBM Plex Mono';letter-spacing:.2em;color:var(--mut);margin-bottom:14px}
#s7_code .pane .m{color:#ffd28a;background:rgba(255,178,62,.12)}
#s7_skull .scr{position:absolute;left:50%;top:50%;width:1200px;height:740px;margin:-370px 0 0 -600px;border-radius:14px;background:#120707;border:24px solid #15181d;box-shadow:0 60px 160px rgba(0,0,0,.8)}
#s7_skull svg{position:absolute;inset:0}
#s7_leak .fl{position:absolute;top:470px;width:300px;text-align:center;font:500 26px 'IBM Plex Mono';letter-spacing:.14em;opacity:0}
#s7_leak .fl svg{width:150px;height:170px;display:block;margin:0 auto 16px}
#s7_leak .off{position:absolute;left:0;right:0;top:820px;text-align:center;font:600 46px 'IBM Plex Mono';letter-spacing:.14em;color:var(--red);opacity:0}
.wanted{position:absolute;left:50%;top:50%;width:760px;height:960px;margin:-480px 0 0 -380px;padding:44px 54px;text-align:center;color:#16171a}
.wanted .w1{font:800 92px Inter;letter-spacing:.18em;border-bottom:4px solid #16171a;padding-bottom:6px}
.wanted .w2{font:500 22px 'IBM Plex Mono';letter-spacing:.16em;color:#4b4842;margin-top:12px}
.wanted .pic{width:320px;height:380px;margin:28px auto 0;background:#b7b2a8;position:relative;overflow:hidden}
.wanted .nm{font:800 60px Inter;letter-spacing:.08em;margin-top:26px}
.wanted .dt{font:400 21px 'IBM Plex Mono';letter-spacing:.06em;color:#4b4842;margin-top:14px;line-height:1.6}
.wanted .rec{position:absolute;right:20px;bottom:14px;font:400 15px 'IBM Plex Mono';letter-spacing:.14em;color:#6d6a64}
.wanted .stp{position:absolute;left:50%;top:44%;font:700 64px Inter;letter-spacing:.12em;color:#b5302a;border:8px solid #b5302a;padding:4px 24px;white-space:nowrap;transform:translate(-50%,-50%) rotate(-10deg);opacity:0;mix-blend-mode:multiply}
#s7_dn .hf{position:absolute;top:0;bottom:0;width:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}
#s7_dn .hf .a{font:600 84px 'Cormorant Garamond'}
#s7_dn .hf .b{font:400 24px 'IBM Plex Mono';letter-spacing:.2em;margin-top:16px;text-transform:uppercase}
#s7_mail .ml{position:absolute;left:50%;top:50%;width:1200px;height:640px;margin:-320px 0 0 -600px;border-radius:12px;background:#0c1116;border:1px solid #232c36;padding:36px 54px;font:400 28px Inter;color:#9aa3ad}
#s7_mail .ml .h{font:500 20px 'IBM Plex Mono';letter-spacing:.16em;color:#5d6b79;border-bottom:1px solid #1d2630;padding-bottom:18px;margin-bottom:26px;display:flex;justify-content:space-between}
#s7_mail .ml i{display:block;height:16px;background:#1d2630;margin:20px 0;border-radius:3px}
#s7_mail .ml .hl{font:italic 500 46px 'Cormorant Garamond';color:#e9e6df;margin:30px 0;opacity:0}
#s7_three .pn .ph img{filter:saturate(.6) brightness(.6)}
#s7_ev .nd{position:absolute;width:420px;padding:22px 26px;border:1px solid #2a313b;background:#0d1116;text-align:center;font:500 26px 'IBM Plex Mono';letter-spacing:.1em;opacity:0}
#s7_ev .ct{position:absolute;left:50%;top:50%;width:520px;margin:-70px 0 0 -260px;padding:30px 0;text-align:center;border:3px solid var(--red);font:600 40px 'IBM Plex Mono';letter-spacing:.1em;color:var(--red);background:rgba(10,13,17,.9);opacity:0}
#s7_fp .two{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;gap:160px}
#s7_fp .two div{text-align:center;opacity:0}
#s7_fp .two svg{width:380px;height:380px}
#s7_fp .two .t{font:500 28px 'IBM Plex Mono';letter-spacing:.16em;margin-top:20px}
#s7_fp .ne{position:absolute;left:50%;top:430px;font:500 120px 'IBM Plex Mono';color:var(--red);transform:translateX(-50%);opacity:0}
#s7_copy .cp{position:absolute;width:300px;height:180px;border:1px solid #2a313b;background:#0a0d11;padding:14px 18px;font:400 15px 'IBM Plex Mono';color:#ffd28a;line-height:1.6;opacity:0}
#s7_copy .cp b{display:block;font:500 15px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut);margin-bottom:6px}
#s7_cr .yrs{position:absolute;left:150px;right:150px;top:720px;height:4px;background:#2a313b}
#s7_cr .yr{position:absolute;top:24px;font:400 22px 'IBM Plex Mono';letter-spacing:.1em;color:var(--mut);transform:translateX(-50%)}
#s7_cr .ev{position:absolute;bottom:30px;font:500 22px 'IBM Plex Mono';letter-spacing:.1em;transform:translateX(-50%);text-align:center;white-space:nowrap;opacity:0}
#s7_cr .coin{position:absolute;width:44px;height:44px;border-radius:50%;border:3px solid #ffb23e;color:#ffb23e;font:600 24px Inter;display:flex;align-items:center;justify-content:center;opacity:0;box-shadow:0 0 18px rgba(255,178,62,.4)}
`);
const HEX = (seed, n) => { const R = rnd(seed); return Array.from({ length: n }, () => Array.from({ length: 6 }, () => Math.floor(R() * 65536).toString(16).padStart(4, '0')).join(' ')); };
const FILE = '<svg viewBox="0 0 150 170"><path d="M10 6 L100 6 L140 46 L140 164 L10 164 Z M100 6 L100 46 L140 46" fill="none" stroke="#e9e6df" stroke-width="5"/><path d="M34 80 L116 80 M34 104 L116 104 M34 128 L96 128" stroke="#8b919a" stroke-width="5"/></svg>';
addHTML(`
<div class="scene" id="s7_laz"><div class="cam"><div class="center"><div class="lz" id="lzt">${'LAZARUS'.split('').map(c => `<span>${c}</span>`).join('')}</div>
  <div class="bigsub" id="lzs">Lázaro · el que volvió de entre los muertos</div></div></div></div>
<div class="scene" id="s7_code"><div class="glow"></div><div class="cam">
  <div class="pane" style="left:150px" id="cpA"><div class="h">HERRAMIENTAS · BANGLADÉS 2016</div>${HEX(3, 22).map((l, i) => `<div class="${[4, 9, 15].includes(i) ? 'mx' : ''}">${l}</div>`).join('')}</div>
  <div class="pane" style="right:150px" id="cpB"><div class="h">HERRAMIENTAS · ATAQUES ANTERIORES</div>${HEX(3, 22).map((l, i) => `<div class="${[4, 9, 15].includes(i) ? 'mx' : ''}">${i % 3 === 1 ? HEX(9 + i, 1)[0] : l}</div>`).join('')}</div>
  <svg id="cpsvg" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="tag" style="left:110px;bottom:70px">Esquema · no es código real</div></div></div>
<div class="scene" id="s7_skull"><div class="cam"><div class="scr"><svg viewBox="0 0 1152 692" id="skl"></svg></div><div class="tag" style="left:110px;bottom:70px">Recreación</div></div></div>
<div class="scene" id="s7_leak"><div class="glow"></div><div class="cam">
  <div class="fl" id="lk1" style="left:260px">${FILE}CORREOS</div><div class="fl" id="lk2" style="left:810px">${FILE}SALARIOS</div><div class="fl" id="lk3" style="left:1360px">${FILE}PELÍCULAS</div>
  <div class="off" id="lkoff">COMPUTADORAS PARALIZADAS · SEMANAS</div></div></div>
<div class="scene" id="s7_attr"><div class="cam"><svg id="at7" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">Diciembre de 2014</div><div class="v" style="font-size:60px">EE. UU. lo atribuye a Corea del Norte</div></div></div>
<div class="scene" id="s7_wanted"><div class="glow"></div><div class="cam"><div class="wanted paper" id="wp7"><div class="w1">BUSCADO</div><div class="w2">FBI · CARGOS PRESENTADOS EN 2018</div>
  <div class="pic"><svg viewBox="0 0 320 380" width="320" height="380"><circle cx="160" cy="140" r="70" fill="#8f8a80"/><path d="M40 380 Q46 240 160 230 Q274 240 280 380 Z" fill="#8f8a80"/></svg></div>
  <div class="nm">PARK JIN HYOK</div><div class="dt">Conspiración para cometer fraude informático<br>y fraude electrónico</div><div class="rec">RECREACIÓN</div>
  <div class="stp" id="wst">NUNCA FUE DETENIDO</div></div></div></div>
<div class="scene" id="s7_dal"><div class="cam"><svg id="dl7" width="1920" height="1080"></svg></div>
  <div class="cap"><div class="k">Dalian, China</div><div class="v">Chosun Expo</div></div></div>
<div class="scene" id="s7_dn"><div class="cam"><div class="hf" id="dnA" style="left:0;background:#1c2128;color:#e9e6df"><div class="a">Programador</div><div class="b">de día</div></div>
  <div class="hf" id="dnB" style="left:50%;background:#0a0606;color:#e9e6df"><div class="a" style="color:var(--red)">Hacker</div><div class="b">de noche · según la acusación</div></div></div></div>
<div class="scene" id="s7_mail"><div class="glow"></div><div class="cam"><div class="ml"><div class="h"><span>CORREO PERSONAL · 2011</span><span>RECREACIÓN · PARÁFRASIS</span></div>
  <i style="width:84%"></i><i style="width:66%"></i><div class="hl" id="mlhl">“…quiero volver a mi país para casarme con mi prometida…”</div><i style="width:78%"></i><i style="width:52%"></i></div></div>
  <div class="tag" style="left:110px;bottom:70px">Reunido por el FBI · según la BBC</div></div>
<div class="scene" id="s7_three"><div class="cam"><div class="tri3">
  <div class="pn" id="t71"><div class="ph"><img src="img/sony.jpg"></div><div class="vig"></div><div class="lb">SONY · 2014</div></div>
  <div class="pn" id="t72"><div class="ph"><img src="img/banco-bangladesh.jpg" style="object-position:50% 20%"></div><div class="vig"></div><div class="lb">BANGLADÉS · 2016</div></div>
  <div class="pn" id="t73"><div class="ph"><img src="img/wannacry.jpg"></div><div class="vig"></div><div class="lb">WANNACRY · 2017<br><span style="font:400 20px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut)">AFECTÓ HOSPITALES DEL NHS</span></div></div></div></div>
  <div class="credit">${['sony.jpg', 'banco-bangladesh.jpg', 'wannacry.jpg'].map(f => (CRED[f] || '').replace('Foto: ', '')).join(' · ')}</div></div>
<div class="scene" id="s7_fp"><div class="glow"></div><div class="cam"><div class="two">
  <div id="fpA"><svg viewBox="0 0 380 380" id="fpsvg"></svg><div class="t">HUELLA DIGITAL</div></div>
  <div id="fpB"><svg viewBox="0 0 380 380"><path d="M90 110 L40 190 L90 270 M290 110 L340 190 L290 270 M220 80 L160 300" fill="none" stroke="#ffb23e" stroke-width="12" stroke-linecap="round"/></svg><div class="t">CÓDIGO</div></div></div>
  <div class="ne" id="fpne">≠</div></div></div>
<div class="scene" id="s7_copy"><div class="cam"><svg id="cp7" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s7_ev"><div class="glow"></div><div class="cam"><svg id="ev7" width="1920" height="1080" style="position:absolute;inset:0"></svg>
  <div class="nd" id="ev1" style="left:150px;top:200px">CÓDIGO COMPARTIDO</div><div class="nd" id="ev2" style="right:150px;top:200px">DIRECCIONES DE CORREO</div>
  <div class="nd" id="ev3" style="left:150px;bottom:200px">CUENTAS EN INTERNET</div><div class="nd" id="ev4" style="right:150px;bottom:200px">PATRONES DE CONEXIÓN</div>
  <div class="ct" id="evc">EL MISMO LUGAR<br><span style="font:400 20px 'IBM Plex Mono';letter-spacing:.16em;color:var(--mut)">SEGÚN LOS INVESTIGADORES</span></div></div></div>
<div class="scene" id="s7_bda"><div class="cam"><svg id="bd7" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k">2005 · sancionado por EE. UU.</div><div class="v" style="font-size:72px">Banco Delta Asia · Macao</div></div></div>
<div class="scene" id="s7_cr">${'<div class="ph" style="position:absolute;inset:0"><img src="img/bitcoin.jpg" id="cr7i" style="filter:saturate(.5) brightness(.32) contrast(1.1)"></div><div class="vig"></div>'}<div class="cam">
  <div class="yrs" id="cryrs">${[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((y, i) => `<div class="yr" style="left:${i * 12.5}%">${y}</div>`).join('')}
  <div class="ev" style="left:0%">BANGLADÉS</div><div class="ev" style="left:12.5%">WANNACRY</div><div class="ev" style="left:50%">CRIPTOMONEDAS</div></div>
  <div id="coins7"></div></div>
  <div class="stat" style="left:auto;right:150px;text-align:right;top:110px;bottom:auto"><div class="k">Robos atribuidos a hackers norcoreanos</div><div class="v" id="cr7v" style="font-size:66px">según distintas estimaciones</div></div>
  <div class="credit">${CRED['bitcoin.jpg'] || ''}</div></div>
`);
chapterCard('s7_card', 'ch7', 'VII', 'Lázaro');
photo('s7_la', [S('c234') - .3, S('c236') + .1, .6, .5], { src: 'sony.jpg', kb: [1.05, 1.16, -20, 20, 0, -10], filter: 'saturate(.55) brightness(.5) contrast(1.1)',
  html: `<div class="cap" id="la7"><div class="k">Noviembre de 2014 · Los Ángeles</div><div class="v">Sony Pictures</div></div>
  <div class="cap" id="la7b" style="opacity:0;left:auto;right:110px;text-align:right"><div class="k">Por estrenar</div><div class="v">“The Interview”</div></div>
` });
photo('s7_py', [S('c236') - .2, S('c237') - .1, .5, .5], { src: 'pyongyang.jpg', kb: [1.05, 1.15, 20, -20, 0, -10], filter: 'saturate(.5) brightness(.5) contrast(1.1)',
  cap: ['Pyongyang · Corea del Norte', 'Amenazó con represalias'] });
photo('s7_doj', [S('c240') - .3, S('c241') - .3, .6, .5], { src: 'doj.jpg', kb: [1.05, 1.15, 0, -20, 0, 0], filter: 'saturate(.5) brightness(.5) contrast(1.1)', cap: ['2018 · Washington', 'Departamento de Justicia de EE. UU.'] });
photo('s7_dalp', [AT('c243', 'haciendo') - .3, S('c244') - .1, .5, .4], { src: 'dalian.jpg', kb: [1.05, 1.16, 30, -30, 0, 0], filter: 'saturate(.5) brightness(.5) contrast(1.1)',
  cap: ['Dalian, China', 'Programas de juegos y apuestas en línea'] });
photo('s7_school', [S('c246') - .3, S('c247') - .1, .6, .5], { src: 'escuela-pyongyang.jpg', kb: [1.05, 1.18, 0, 0, 0, -20], filter: 'saturate(.5) brightness(.5) contrast(1.1)', ilus: true,
  cap: ['Seleccionados desde niños · según la BBC', 'Algunos con apenas 12 años'] });
photo('s7_emb', [S('c254') - .3, S('c256') - .1, .6, .5], { src: 'embajada-londres.jpg', kb: [1.05, 1.14, 0, -20, 0, 0], filter: 'saturate(.5) brightness(.45) contrast(1.1)',
  html: `<div class="center"><div class="big" id="emb7" style="font-style:italic;opacity:0">“Una farsa.”</div><div class="bigsub" id="emb7s" style="opacity:0">Embajador de Corea del Norte en Londres · a la BBC</div></div>` });
bigText('s7_warn', [S('c256') - .2, S('c257') - .1, .4, .4], 'Una advertencia sobre las pruebas');
bigText('s7_why', [S('c260') - .2, S('c261') - .2, .4, .5], '¿Por qué un país haría algo así?');
photo('s7_night', [S('c261') - .2, S('c263') - .1, .6, .5], { src: 'corea-noche.jpg', kb: [1.04, 1.16, 0, 0, 0, 20], filter: 'saturate(.6) brightness(.85) contrast(1.15)',
  cap: ['Corea del Norte de noche', 'Pobre, aislada y bajo sanciones'] });
Object.assign(SCN, {
  s7_laz: [S('c229') - .3, S('c232') - .1, .6, .5],
  s7_code: [S('c232') - .2, S('c234') - .3, .5, .5],
  s7_skull: [S('c237') - .2, S('c238') - .1, .3, .4],
  s7_leak: [S('c238') - .2, S('c239') - .1, .4, .5],
  s7_attr: [S('c239') - .2, S('c240') - .3, .5, .5],
  s7_wanted: [S('c241') - .5, S('c243') - .1, .5, .5],
  s7_dal: [S('c243') - .2, AT('c243', 'haciendo') + .1, .5, .4],
  s7_dn: [S('c244') - .2, S('c246') - .3, .4, .5],
  s7_mail: [S('c247') - .2, S('c250') - .1, .5, .5],
  s7_three: [S('c250') - .2, S('c251') - .1, .5, .5],
  s7_fp: [S('c257') - .2, S('c258') - .1, .5, .5],
  s7_copy: [S('c258') - .2, S('c259') - .1, .5, .5],
  s7_ev: [S('c259') - .2, S('c260') - .2, .5, .5],
  s7_bda: [S('c263') - .2, S('c265') - .1, .5, .5],
  s7_cr: [S('c265') - .2, S('epi') + .2, .5, .7],
});
// Park sigue libre: vuelve a Corea del Norte
addHTML(`<div class="scene" id="s7_free"><div class="glow"></div><div class="cam"><svg id="fr7" width="1920" height="1080"></svg></div>
  <div class="stat"><div class="k" id="fr7k">Park Jin Hyok</div><div class="v" id="fr7v" style="font-size:70px">Nunca fue detenido</div></div></div>`);
SCN.s7_free = [S('c251') - .2, S('c254') - .3, .5, .5];
const SKULL7 = AT('c237', 'esqueleto') - .2;

const C7 = {};
SETUP.push(function setupCap7() {
  // esqueleto rojo estilizado (recreación)
  const s = $('skl');
  C7.sk = [
    stroke(s, 'M576 120 Q700 120 704 250 Q706 330 650 360 L650 420 L502 420 L502 360 Q446 330 448 250 Q452 120 576 120 Z', { stroke: '#ff3b30', 'stroke-width': 8 }),
    stroke(s, 'M520 250 a32 36 0 1 0 .1 0 M632 250 a32 36 0 1 0 .1 0', { stroke: '#ff3b30', 'stroke-width': 8 }),
    stroke(s, 'M576 300 L560 336 L592 336 Z', { stroke: '#ff3b30', 'stroke-width': 6 }),
    stroke(s, 'M520 390 L520 420 M550 390 L550 420 M580 390 L580 420 M610 390 L610 420 M640 390 L640 420', { stroke: '#ff3b30', 'stroke-width': 6 }),
    stroke(s, 'M450 460 Q576 440 702 460 M440 500 Q576 480 712 500 M450 540 Q576 520 702 540 M576 430 L576 600', { stroke: '#ff3b30', 'stroke-width': 6 }),
    stroke(s, 'M300 500 L440 470 M712 470 L852 500', { stroke: '#ff3b30', 'stroke-width': 8 }),
  ];
  // fragmentos que coinciden
  const cs = $('cpsvg');
  C7.links = [4, 9, 15].map(i => el('path', { d: `M930 ${232 + 14 + i * 36.75} L990 ${232 + 14 + i * 36.75}`, stroke: '#ffb23e', 'stroke-width': 3, fill: 'none', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, cs));
  // huella digital
  const fp = $('fpsvg');
  C7.fp = Array.from({ length: 9 }, (_, i) => stroke(fp, `M${190 - 20 - i * 16} ${200 + i * 8} Q${190 - 20 - i * 16} ${80 - i * 10} 190 ${80 - i * 10} Q${190 + 20 + i * 16} ${80 - i * 10} ${190 + 20 + i * 16} ${200 + i * 8}`, { 'stroke-width': 5, stroke: '#8fb3cc' }));
  // monedas
  const R = rnd(171);
  $('coins7').innerHTML = Array.from({ length: 40 }, () => '<div class="coin">₿</div>').join('');
  C7.coins = [...$('coins7').children].map((c, i) => { const yr = 2 + R() * 6; c.style.left = (150 + (yr / 8) * 1620 - 22) + 'px'; c.style.top = (640 - 60 - R() * 420) + 'px'; return { e: c, yr }; });
  // evidencias que convergen
  const es = $('ev7');
  C7.evl = [[360, 250], [1560, 250], [360, 830], [1560, 830]].map(([x, y]) => el('path', { d: `M${x} ${y} L960 540`, stroke: '#d23a32', 'stroke-width': 3, fill: 'none', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, es));
});
MAPSETUP.push(function mapsCap7() {
  // atribución: Corea del Norte → Los Ángeles
  const s = $('at7'); defs(s);
  C7.am = worldMap(s, [-160, 0]);
  el('path', { d: C7.am.path(country('408')), fill: '#5a1e1b', stroke: '#d23a32', 'stroke-width': 1.5 }, C7.am.g);
  C7.ac = { la: city(C7.am.g, C7.am.proj(cities.la), 'LOS ÁNGELES · SONY', 'end'), py: city(C7.am.g, C7.am.proj(cities.pyongyang), 'COREA DEL NORTE') };
  redCity(C7.ac.py);
  C7.aa = arc(C7.am, cities.pyongyang, cities.la, '#d23a32', 3);
  // Dalian
  const s2 = $('dl7'); defs(s2);
  C7.dm = regionMap(s2, [[115, 33], [131, 44]], [[200, 80], [W - 200, H - 80]]);
  el('path', { d: C7.dm.path(country('408')), fill: '#2a1414', stroke: '#d23a32', 'stroke-width': 1.5 }, C7.dm.g);
  C7.dc = { dl: city(C7.dm.g, C7.dm.proj(cities.dalian), 'DALIAN · CHOSUN EXPO'), py: city(C7.dm.g, C7.dm.proj(cities.pyongyang), 'PYONGYANG') };
  redCity(C7.dc.py);
  // vuelve a Corea del Norte
  const s3 = $('fr7'); defs(s3);
  C7.fm = regionMap(s3, [[110, 28], [135, 45]], [[200, 80], [W - 200, H - 80]]);
  el('path', { d: C7.fm.path(country('408')), fill: '#2a1414', stroke: '#d23a32', 'stroke-width': 2 }, C7.fm.g);
  C7.fc = { dl: city(C7.fm.g, C7.fm.proj(cities.dalian), 'DALIAN', 'end'), py: city(C7.fm.g, C7.fm.proj(cities.pyongyang), 'PYONGYANG') };
  redCity(C7.fc.py);
  C7.fa = arc(C7.fm, cities.dalian, cities.pyongyang, '#d23a32', 4);
  // el código se puede copiar: mapa con copias
  const s4 = $('cp7'); defs(s4);
  C7.cm = worldMap(s4, [-20, 0]);
  const R = rnd(181);
  C7.copies = [[-74, 40.7], [-0.1, 51.5], [37.6, 55.75], [139.7, 35.7], [-46.6, -23.5], [77.2, 28.6], [116.4, 39.9], [151.2, -33.9], [28, -26.2], [2.35, 48.85], [-99.1, 19.4], [103.8, 1.35]].map(c => {
    const [x, y] = C7.cm.proj(c);
    const g = el('g', { opacity: 0, transform: `translate(${x} ${y})` }, C7.cm.g);
    el('rect', { x: -26, y: -18, width: 52, height: 36, rx: 3, fill: '#2a2210', stroke: '#ffb23e', 'stroke-width': 2 }, g);
    const t = el('text', { x: 0, y: 7, 'text-anchor': 'middle', fill: '#ffb23e', 'font-family': 'IBM Plex Mono', 'font-size': 18 }, g); t.textContent = '</>';
    return { g, r: R() };
  });
  // Macao → Pyongyang (Banco Delta Asia)
  const s5 = $('bd7'); defs(s5);
  C7.bm = regionMap(s5, [[105, 18], [132, 44]], [[200, 80], [W - 200, H - 80]]);
  el('path', { d: C7.bm.path(country('408')), fill: '#2a1414', stroke: '#d23a32', 'stroke-width': 1.5 }, C7.bm.g);
  C7.bc = { mo: city(C7.bm.g, C7.bm.proj(cities.macao), 'MACAO'), py: city(C7.bm.g, C7.bm.proj(cities.pyongyang), 'PYONGYANG') };
  redCity(C7.bc.py);
  C7.ba = arc(C7.bm, cities.macao, cities.pyongyang, '#d23a32', 3, {});
});

RENDER.push(function cap7(t) {
  // LAZARUS: se borra y vuelve
  if (on('s7_laz')) {
    const spans = $('lzt').children, a = S('c229');
    const del = P(t, AT('c231', 'difíciles') - .4, AT('c231', 'eliminar')), back = P(t, AT('c231', 'eliminar') + .2, AT('c231', 'eliminar') + .9);
    for (let i = 0; i < 7; i++) {
      const k = eo(P(t, AT('c229', 'Lazarus') - .3 + i * .07, AT('c229', 'Lazarus') + .1 + i * .07));
      const gone = P(del, i / 7, (i + 1) / 7), ret = P(back, (6 - i) / 7, (7 - i) / 7);
      spans[i].style.opacity = k * (1 - gone + ret);
      spans[i].style.color = gone > 0 && ret < 1 ? '#d23a32' : '';
    }
    $('lzs').style.opacity = P(t, S('c230') - .2, S('c230') + .5);
  }
  // fragmentos que coinciden
  if (on('s7_code')) {
    const m = AT('c232', 'similitudes') - .2;
    ['cpA', 'cpB'].forEach((id, i) => { $(id).style.opacity = eo(P(t, S('c232') + i * .4, S('c232') + .5 + i * .4)); });
    document.querySelectorAll('#s7_code .mx').forEach(e => e.classList.toggle('m', t > m));
    C7.links.forEach((l, i) => drawK(l, io(P(t, m + i * .2, m + .5 + i * .2))));
  }
  // el esqueleto
  if (on('s7_skull')) {
    C7.sk.forEach((p, i) => drawK(p, io(P(t, SKULL7 + i * .12, SKULL7 + .6 + i * .12))));
    const fl = t > SKULL7 ? Math.max(0, Math.sin((t - SKULL7) * 23)) * Math.exp(-(t - SKULL7) * 1.4) : 0;
    $('s7_skull').querySelector('.scr').style.background = `rgb(${18 + 60 * fl},${7 + 4 * fl},${7 + 4 * fl})`;
  }
  // la filtración
  if (on('s7_leak')) {
    const m = [AT('c238', 'correos'), AT('c238', 'salarios'), AT('c238', 'películas')];
    ['lk1', 'lk2', 'lk3'].forEach((id, i) => { const k = eo(P(t, m[i] - .2, m[i] + .3)); $(id).style.opacity = k * lerp(1, .25, P(t, AT('c238', 'paralizadas') - .2, AT('c238', 'paralizadas') + .3)); $(id).style.transform = `translateY(${lerp(60, 0, k)}px)`; });
    $('lkoff').style.opacity = P(t, AT('c238', 'paralizadas') - .2, AT('c238', 'paralizadas') + .3);
  }
  // atribución
  if (C7.am && on('s7_attr')) {
    for (const k in C7.ac) { C7.ac[k].c.setAttribute('opacity', 1); pulse(C7.ac[k], t); }
    C7.aa.draw(io(P(t, S('c239') - .1, AT('c239', 'Corea') + .3)));
    mapCam(C7.am, W / 2, H / 2, lerp(1, 1.06, io(K('s7_attr', t))));
  }
  // Sony
  if (on('s7_la')) {
    $('la7').style.opacity = P(t, S('c234') - .2, S('c234') + .4);
    $('la7b').style.opacity = P(t, AT('c235', 'The Interview') - .3, AT('c235', 'The Interview') + .2);
  }
  // el afiche
  if (on('s7_wanted')) {
    const k = eo(P(t, S('c241') - .4, S('c241') + .3));
    $('wp7').style.transform = `translateY(${lerp(80, 0, k)}px) rotate(${lerp(3, -1, k)}deg) scale(${lerp(1, 1.04, io(K('s7_wanted', t)))})`;
  }
  // Dalian
  if (C7.dm && on('s7_dal')) {
    for (const k in C7.dc) { C7.dc[k].c.setAttribute('opacity', P(t, S('c243') + (k === 'dl' ? .3 : 0), S('c243') + .6)); pulse(C7.dc[k], t); }
    const [x, y] = C7.dm.proj(cities.dalian), z = io(K('s7_dal', t));
    mapCam(C7.dm, lerp(W / 2, x, z * .5), lerp(H / 2, y, z * .5), lerp(1, 1.4, z));
    for (const k in C7.dc) C7.dc[k].inner.setAttribute('transform', `scale(${1 / lerp(1, 1.4, z)})`);
  }
  // de día y de noche
  if (on('s7_dn')) {
    const a = eo(P(t, S('c244') - .2, S('c244') + .3)), b = eo(P(t, S('c245') - .2, S('c245') + .3));
    $('dnA').style.opacity = a * lerp(1, .5, b); $('dnB').style.opacity = b;
    $('dnB').style.clipPath = `inset(0 ${lerp(100, 0, b)}% 0 0)`;
  }
  // el correo de 2011
  if (on('s7_mail')) $('mlhl').style.opacity = eo(P(t, AT('c248', 'quiere volver') - .3, AT('c248', 'quiere volver') + .4));
  // Sony, Bangladés, WannaCry
  if (on('s7_three')) {
    const m = [AT('c250', 'Sony'), AT('c250', 'Banco de Bangladés'), AT('c250', 'WannaCry')];
    ['t71', 't72', 't73'].forEach((id, i) => { const k = eo(P(t, m[i] - .3, m[i] + .2)); $(id).style.opacity = k; $(id).style.transform = `translateY(${lerp(40, 0, k)}px)`; kb($(id).querySelector('.ph img'), K('s7_three', t), 1.08, 1.18, 0, 0, 0, -10); });
  }
  // nunca fue detenido; otros dos acusados
  if (C7.fm && on('s7_free')) {
    for (const k in C7.fc) { C7.fc[k].c.setAttribute('opacity', 1); pulse(C7.fc[k], t); }
    C7.fa.draw(io(P(t, AT('c252', 'había vuelto') - .3, AT('c252', 'Corea') + .3)));
    const t53 = t > S('c253') - .2;
    $('fr7k').textContent = t53 ? '2021 · justicia de EE. UU.' : 'Park Jin Hyok';
    $('fr7v').textContent = t53 ? 'Otros dos acusados' : 'Nunca fue detenido';
    const [x, y] = C7.fm.proj(cities.pyongyang), z = io(K('s7_free', t));
    mapCam(C7.fm, lerp(W / 2, x, z * .4), lerp(H / 2, y, z * .4), lerp(1, 1.3, z));
  }
  // "una farsa"
  if (on('s7_emb')) {
    $('emb7').style.opacity = eo(P(t, AT('c255', 'farsa') - .3, AT('c255', 'farsa') + .2));
    $('emb7s').style.opacity = P(t, AT('c255', 'farsa'), AT('c255', 'farsa') + .6);
  }
  // huella digital y código
  if (on('s7_fp')) {
    $('fpA').style.opacity = eo(P(t, AT('c257', 'huellas') - .3, AT('c257', 'huellas') + .2));
    C7.fp.forEach((p, i) => drawK(p, io(P(t, AT('c257', 'huellas') - .2 + i * .05, AT('c257', 'huellas') + .6 + i * .05))));
    $('fpB').style.opacity = eo(P(t, S('c257') - .1, S('c257') + .4));
    $('fpne').style.opacity = P(t, AT('c257', 'escena') - .2, AT('c257', 'escena') + .3);
  }
  // el código se puede copiar
  if (C7.cm && on('s7_copy')) {
    C7.copies.forEach(c => c.g.setAttribute('opacity', P(t, S('c258') + .8 + c.r * 7.5, S('c258') + 1.1 + c.r * 7.5)));
    mapCam(C7.cm, W / 2, H / 2, lerp(1, 1.05, io(K('s7_copy', t))));
  }
  // cruce de pruebas
  if (on('s7_ev')) {
    const m = [AT('c259', 'código compartido'), AT('c259', 'direcciones'), AT('c259', 'cuentas en internet'), AT('c259', 'patrones')];
    m.forEach((a, i) => { const k = eo(P(t, a - .2, a + .3)); $('ev' + (i + 1)).style.opacity = k; drawK(C7.evl[i], io(P(t, AT('c259', 'terminan') - .4 + i * .1, AT('c259', 'terminan') + .4 + i * .1))); });
    $('evc').style.opacity = eo(P(t, AT('c259', 'mismo lugar') - .3, AT('c259', 'mismo lugar') + .2));
  }
  // Macao y Pyongyang
  if (C7.bm && on('s7_bda')) {
    for (const k in C7.bc) { C7.bc[k].c.setAttribute('opacity', 1); pulse(C7.bc[k], t); }
    C7.ba.draw(io(P(t, AT('c264', 'sancionó') - .3, AT('c264', 'Pyongyang') + .2)));
    mapCam(C7.bm, W / 2, H / 2, lerp(1, 1.08, io(K('s7_bda', t))));
  }
  // criptomonedas
  if (on('s7_cr')) {
    const evs = document.querySelectorAll('#s7_cr .ev');
    evs[0].style.opacity = P(t, S('c265') - .1, S('c265') + .4); evs[1].style.opacity = P(t, S('c265') + .5, S('c265') + .9);
    evs[2].style.opacity = P(t, AT('c266', 'criptomonedas') - .3, AT('c266', 'criptomonedas') + .2);
    const k = P(t, AT('c266', 'criptomonedas') - .3, AT('c267', 'miles de millones') + .5);
    C7.coins.forEach(c => { const v = P(k * 8, c.yr - .3, c.yr); c.e.style.opacity = v; c.e.style.transform = `scale(${lerp(.4, 1, eo(v))})`; });
    $('cr7v').style.opacity = P(t, AT('c267', 'miles de millones') - .3, AT('c267', 'miles de millones') + .3);
    $('cr7v').textContent = 'Miles de millones de dólares';
    kb($('cr7i'), K('s7_cr', t), 1.05, 1.15, 0, -30, 0, 0);
  }
});
