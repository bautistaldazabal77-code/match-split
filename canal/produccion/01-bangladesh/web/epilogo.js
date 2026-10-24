// Epílogo · Lo que quedó: lo recuperado, la única condena, la demanda, el informe postergado y el cierre
addCSS(`
#s8_bar .bars{position:absolute;left:180px;right:180px;top:420px;height:150px;display:flex}
#s8_bar .bars div{height:100%;transform-origin:left;transform:scaleX(0);display:flex;align-items:center;justify-content:center;font:500 34px 'IBM Plex Mono';white-space:nowrap;overflow:hidden}
#s8_bar .k{position:absolute;left:180px;top:340px}
#s8_bar .lg{position:absolute;left:180px;right:180px;top:610px;display:flex;justify-content:space-between}
#s8_bar .lg div{font:400 24px 'IBM Plex Mono';letter-spacing:.14em;opacity:0}
#s8_bar .big65{position:absolute;right:180px;top:700px;text-align:right;opacity:0}
#s8_bar .big65 .v{font:500 96px 'IBM Plex Mono';color:var(--red)}
#s8_dg .court{position:absolute;left:150px;top:200px;width:620px;height:640px}
#s8_dg .txt{position:absolute;left:860px;top:230px;width:900px}
#s8_dg .txt .n{font:600 60px Inter;letter-spacing:.06em}
#s8_dg .txt .r{font:400 24px 'IBM Plex Mono';letter-spacing:.14em;color:var(--mut);margin-top:12px}
#s8_dg .txt .l{font:500 34px 'IBM Plex Mono';margin-top:30px;padding-top:24px;border-top:1px solid #2a313b;opacity:0;line-height:1.5}
#s8_dg .txt .l b{color:var(--red);font-weight:500}
#s8_delay .n{font:500 260px 'IBM Plex Mono';color:var(--red);text-shadow:0 0 60px rgba(210,58,50,.4)}
#s8_delay .dates{position:absolute;left:0;right:0;top:820px;text-align:center;font:400 26px 'IBM Plex Mono';letter-spacing:.14em;color:var(--mut)}
#s8_close .chk{position:absolute;left:0;right:0;bottom:110px;display:flex;justify-content:center;gap:60px}
#s8_close .chk div{font:500 30px 'IBM Plex Mono';letter-spacing:.12em;opacity:0}
#s8_close .chk b{color:var(--green);font-weight:500;margin-right:12px}
#s8_words .w2{font:500 140px 'IBM Plex Mono';letter-spacing:.14em;line-height:1.3;text-align:center}
#s8_words .w2 b{color:var(--red);font-weight:500;text-shadow:0 0 30px rgba(210,58,50,.7)}
#s8_cred{background:#000}
#s8_cred .roll{position:absolute;left:0;right:0;top:0;text-align:center;font:400 26px 'IBM Plex Mono';letter-spacing:.1em;color:#8b919a;line-height:1.9}
#s8_cred .roll h5{font:500 22px 'IBM Plex Mono';letter-spacing:.3em;color:#e9e6df;margin:46px 0 14px}
#s8_cred .roll .tt{font:600 72px 'Cormorant Garamond';color:#e9e6df;letter-spacing:.04em;margin-bottom:20px}
`);
addHTML(`
<div class="scene" id="s8_bar"><div class="glow"></div><div class="cam"><div class="k lbl">Los US$ 101 millones que salieron de Nueva York</div>
  <div class="bars"><div id="e1" style="width:${(20 / 101 * 100).toFixed(2)}%;background:#1f4a32;border:2px solid #4fb07a">20</div><div id="e2" style="width:${(16 / 101 * 100).toFixed(2)}%;background:#1f4a32;border:2px solid #4fb07a;border-left:0">≈ 16</div><div id="e3" style="width:${(65 / 101 * 100).toFixed(2)}%;background:#5a1e1b;border:2px solid #d23a32">≈ 65</div></div>
  <div class="lg"><div id="g1" style="color:var(--green)">RECUPERADO · SRI LANKA Y PARTE DE FILIPINAS</div><div id="g2" style="color:var(--red)">NUNCA APARECIÓ</div></div>
  <div class="big65" id="b65"><div class="lbl">Nunca aparecieron</div><div class="v">≈ US$ 65 M</div></div></div></div>
<div class="scene" id="s8_dg"><div class="glow"></div><div class="cam"><svg class="court" viewBox="0 0 620 640" id="crt8"></svg>
  <div class="txt"><div class="n">MAIA SANTOS DEGUITO</div><div class="r">Gerenta de la sucursal Jupiter · única condenada</div>
    <div class="l" id="dg1"><b>Culpable</b> de 8 cargos de lavado de dinero<br>Enero de 2019 · tribunal de Makati<br>4 a 7 años por cada cargo</div>
    <div class="l" id="dg2">Siempre sostuvo que fue un <b>chivo expiatorio</b></div>
    <div class="l" id="dg3">2023 · un tribunal de apelación <b>confirma</b> la condena</div></div></div></div>
<div class="scene" id="s8_delay"><div class="glow"></div><div class="cam"><div class="center"><div class="lbl">Informe final de la investigación · Bangladés</div><div class="n" id="dl8">0</div><div class="bigsub">Veces que se postergó su entrega</div></div>
  <div class="dates" id="dl8d"></div></div></div>
<div class="scene" id="s8_close"><div class="cam"><svg id="cl8" width="1920" height="1080"></svg></div>
  <div class="chk"><div id="k81"><b>✓</b>LAS CLAVES</div><div id="k82"><b>✓</b>LAS CUENTAS</div><div id="k83"><b>✓</b>LOS HORARIOS</div><div id="k84"><b>✓</b>LA IMPRESORA</div></div></div>
<div class="scene" id="s8_words"><div class="glow"></div><div class="cam"><div class="center"><div class="w2"><div id="x81">JUPITER</div><div id="x82">F<b>U</b>NDATION</div></div></div></div></div>
<div class="scene" id="s8_end"><div class="cam"><svg id="end8" width="1920" height="1080"></svg></div></div>
<div class="scene" id="s8_cred"><div class="roll" id="roll8"><div style="height:1080px"></div>
  <div class="tt">El robo de los mil millones</div>
  <h5>FUENTES</h5>BBC · “The Lazarus heist” (Geoff White y Jean H. Lee, 2021)<br>Reuters / CNBC (2016)<br>The Daily Star · The Business Standard<br>Kaspersky Lab · “Lazarus Under the Hood”<br>Philstar · Inquirer · Rappler<br>Podcast “The Lazarus Heist” (BBC World Service)
  <h5>IMÁGENES</h5>Fotos de Wikimedia Commons y Flickr con licencias libres<br>Autores y licencias en la descripción del video<br>Mapas: Natural Earth (dominio público)
  <h5>AVISO</h5>Corea del Norte niega su participación<br>en este y otros ataques que se le atribuyen
  <div style="height:300px"></div></div></div>
`);
chapterCard('s8_card', 'epi', '', 'Epílogo', 'Lo que quedó');
photo('s8_ny', [S('c274') - .3, S('c276') - .1, .6, .5], { src: 'tribunal-ny.jpg', kb: [1.05, 1.15, 0, -20, 0, 0], filter: 'saturate(.5) brightness(.5) contrast(1.1)',
  cap: ['Demanda contra el RCBC · Nueva York · 2019', 'Sigue abierta'] });
Object.assign(SCN, {
  s8_bar: [S('c268') - .2, S('c270') - .2, .5, .5],
  s8_dg: [S('c270') - .2, S('c274') - .1, .5, .5],
  s8_delay: [S('c276') - .2, S('c278') - .2, .5, .5],
  s8_close: [S('c278') - .3, S('c283') - .1, .8, .5],
  s8_words: [S('c283') - .2, S('c286') - .3, .5, .7],
  s8_end: [S('c286') - .4, E('c288') + 2.2, .8, 1.6],
  s8_cred: [E('c288') + 2.0, TL.duration, 1.2, .01],
});
// las luces del final se apagan en estos momentos (sonido.py usa los mismos)
const END8 = [AT('c287', 'lo único') - .2, AT('c287', 'casi mil'), AT('c287', 'del mundo') + .2];

const C8 = {};
SETUP.push(function setupEpi() {
  // tribunal
  const c = $('crt8');
  C8.court = [stroke(c, 'M60 220 L310 90 L560 220 Z', { 'stroke-width': 6 }), stroke(c, 'M80 240 L540 240 M80 560 L540 560 M60 600 L560 600', { 'stroke-width': 6 }),
    ...[0, 1, 2, 3, 4].map(i => stroke(c, `M${120 + i * 95} 260 L${120 + i * 95} 540`, { 'stroke-width': 10 }))];
  // la oficina final: tres luces que se apagan
  const svg = $('end8'); lightDefs(svg);
  C8.pr = drawPrinter(svg);
  C8.pools = [-420, 0, 420].map(dx => el('ellipse', { cx: dx + 170, cy: 60, rx: 380, ry: 210, fill: 'url(#warm)' }, C8.pr.g));
  C8.dark = el('rect', { x: -4000, y: -4000, width: 8000, height: 8000, fill: '#020304', opacity: 0 }, C8.pr.g);
  C8.pr.g.appendChild(C8.pr.led); C8.pr.g.appendChild(C8.pr.halo);
  const bd = el('defs', {}, svg), beam = el('linearGradient', { id: 'beam8', x1: 0, y1: 0, x2: 0, y2: 1 }, bd);
  el('stop', { offset: '0%', 'stop-color': '#fff1d6', 'stop-opacity': .16 }, beam); el('stop', { offset: '100%', 'stop-color': '#fff1d6', 'stop-opacity': 0 }, beam);
  C8.lamps = [480, 960, 1440].map(x => {
    const lg = el('g', {}, svg);
    const glow = el('polygon', { points: `${x - 150},70 ${x + 150},70 ${x + 430},1080 ${x - 430},1080`, fill: 'url(#beam8)' }, lg);
    el('rect', { x: x - 180, y: 30, width: 360, height: 30, rx: 3, fill: '#1c2026' }, lg);
    const bar = el('rect', { x: x - 165, y: 56, width: 330, height: 10, rx: 2, fill: '#f3ead8' }, lg);
    return { glow, bar };
  });
  C8.black = el('rect', { x: 0, y: 0, width: W, height: H, fill: '#000', opacity: 0 }, svg);
});
MAPSETUP.push(function mapsEpi() {
  const s = $('cl8'); defs(s);
  C8.m = worldMap(s, [-30, 0]);
  C8.c = { daca: city(C8.m.g, C8.m.proj(cities.daca), 'DACA', 'end'), ny: city(C8.m.g, C8.m.proj(cities.ny), 'NUEVA YORK'), manila: city(C8.m.g, C8.m.proj(cities.manila), 'MANILA') };
});

RENDER.push(function epi(t) {
  // lo recuperado y lo perdido
  if (on('s8_bar')) {
    const m = [AT('c268', 'los veinte') - .2, AT('c268', 'una parte') - .1, S('c269') - .1];
    ['e1', 'e2', 'e3'].forEach((id, i) => { $(id).style.transform = `scaleX(${eo(P(t, m[i], m[i] + .6))})`; });
    $('g1').style.opacity = P(t, m[1], m[1] + .5); $('g2').style.opacity = P(t, m[2], m[2] + .5);
    $('b65').style.opacity = eo(P(t, AT('c269', 'nunca') - .2, AT('c269', 'nunca') + .4));
  }
  // la única condena
  if (on('s8_dg')) {
    C8.court.forEach((p, i) => drawK(p, io(P(t, S('c270') - .2 + i * .1, S('c270') + .6 + i * .1))));
    $('dg1').style.opacity = eo(P(t, AT('c271', 'culpable') - .3, AT('c271', 'culpable') + .3));
    $('dg2').style.opacity = eo(P(t, AT('c272', 'chivo') - .4, AT('c272', 'chivo') + .2));
    $('dg3').style.opacity = eo(P(t, AT('c273', 'confirmó') - .3, AT('c273', 'confirmó') + .3));
  }
  // más de ochenta postergaciones
  if (on('s8_delay')) {
    const k = io(P(t, AT('c277', 'se postergó') - .4, E('c277') + .3)), n = Math.round(87 * k);
    $('dl8').textContent = n;
    const y = 2016 + Math.floor(k * 7.5), mo = ['ENE', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'][Math.floor(k * 45) % 6];
    $('dl8d').textContent = n ? `NUEVA FECHA · ${mo} ${Math.min(y, 2023)}` : '';
  }
  // el mapa del principio
  if (C8.m && on('s8_close')) {
    for (const k in C8.c) { C8.c[k].c.setAttribute('opacity', P(t, S('c278') + (k === 'daca' ? 0 : k === 'ny' ? .4 : .8), S('c278') + .6 + (k === 'daca' ? 0 : k === 'ny' ? .4 : .8))); pulse(C8.c[k], t, .7, k.length * .3); }
    const m = [S('c280'), AT('c280', 'las cuentas'), AT('c281', 'zonas horarias'), AT('c282', 'impresora')];
    m.forEach((a, i) => { $('k8' + (i + 1)).style.opacity = eo(P(t, a - .2, a + .3)); });
    mapCam(C8.m, W / 2, H / 2, lerp(1.0, 1.08, io(K('s8_close', t))));
  }
  // la palabra y la letra
  if (on('s8_words')) {
    $('x81').style.opacity = eo(P(t, AT('c284', 'una calle') - .2, AT('c284', 'una calle') + .4));
    $('x82').style.opacity = eo(P(t, AT('c285', 'una letra') - .2, AT('c285', 'una letra') + .4));
  }
  // la impresora a oscuras; se apaga la pantalla
  if (C8.pr.g && on('s8_end')) {
    const k = io(K('s8_end', t));
    C8.pr.g.setAttribute('transform', `translate(${860} ${520}) scale(${lerp(.95, 1.15, k)})`);
    blinkLed(C8.pr, t);
    let dark = 0;
    C8.lamps.forEach((l, i) => { const off = t > END8[i]; l.bar.setAttribute('fill', off ? '#1a1e24' : '#f3ead8'); l.glow.setAttribute('opacity', off ? 0 : 1); C8.pools[i].setAttribute('opacity', off ? 0 : 1); if (off) dark++; });
    C8.dark.setAttribute('opacity', [0, .25, .45, .62][dark]);
    C8.black.setAttribute('opacity', P(t, E('c288') + .2, E('c288') + 2.0));
  }
  // créditos
  if (on('s8_cred')) {
    const k = P(t, SCN.s8_cred[0], TL.duration);
    $('roll8').style.transform = `translateY(${-lerp(0, $('roll8').scrollHeight - 300, k)}px)`;
  }
});
