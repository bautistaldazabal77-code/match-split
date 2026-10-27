// Capítulo VI · La investigación: los comités, el informe, el despido, la versión de Ninov y lo que apareció en Darmstadt.
SETUP.push(() => {
chapterCard('h_ch6', 'cap6', 'VI', 'La investigación', '2001 – 2002');
// ---------- 1 · Dos comités: uno técnico y uno formal, presidido por Rochus Vogt ----------
{
  const a = S('c112'), cu = AT('c112', 'cuatro meses'), c113 = S('c113'), no = AT('c113', 'noviembre'), vo = AT('c113', 'Rochus Vogt'), b = S('c114');
  const meses = ['JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY'], X = i => 220 + i * 148;
  scene('h_com', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vCm" viewBox="0 0 1920 1080"></svg>
    ${zocalo('cmZ', 'Presidente del comité de investigación', 'Rochus Vogt', 'Instituto de Tecnología de California')}`);
  const svg = $('vCm');
  el('path', { d: `M${X(0) - 40},560 H${X(10) + 40}`, stroke: '#4a5059', 'stroke-width': 3 }, svg);
  meses.forEach((m, i) => { el('path', { d: `M${X(i)},550 V570`, stroke: '#4a5059', 'stroke-width': 3 }, svg); etiqueta(svg, m, X(i), 610, { size: 22, anchor: 'middle', col: '#8b919a' }); });
  etiqueta(svg, '2001', X(0), 660, { size: 26, w: 600, col: '#e9e6df' }); etiqueta(svg, '2002', X(6), 660, { size: 26, w: 600, col: '#e9e6df' });
  const barra = (i0, i1, y, col, txt) => { const g = el('g', { opacity: 0 }, svg), r = el('rect', { x: X(i0), y, width: 0, height: 64, rx: 10, fill: col }, g); etiqueta(g, txt, X(i0) + 18, y + 42, { size: 24, w: 600, col: '#06080b' }); return { g, r, w: X(i1) - X(i0) }; };
  const B1 = barra(0, 4, 430, '#8fd0ff', 'COMITÉ TÉCNICO · UNOS 4 MESES'), B2 = barra(4, 8, 340, '#ffc142', 'COMITÉ DE INVESTIGACIÓN');
  RENDER.push(t => {
    if (!on('h_com')) return;
    B1.g.setAttribute('opacity', P(t, a, a + .3)); B1.r.setAttribute('width', B1.w * io(P(t, a + .2, cu + .5)));
    B2.g.setAttribute('opacity', P(t, no - .3, no)); B2.r.setAttribute('width', B2.w * io(P(t, no, no + 1.5)));
    zocaloAnim('cmZ', t, vo);
  });
}
// ---------- 2 · El informe: evidencia clara y convincente ----------
{
  const a = S('c114'), c115 = S('c115'), cl = AT('c115', 'clara'), co = ATE('c115', 'convincente'), fa = AT('c115', 'fabricados'), c116 = S('c116'), c117 = S('c117'), cr = AT('c117', 'criticó'), b = S('c118');
  scene('h_inf', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>
    <div id="ifD" class="paper" style="left:380px;top:110px;width:1160px;height:850px;opacity:0"><h4>INFORME DEL COMITÉ DE INVESTIGACIÓN · MARZO DE 2002<span>RECREACIÓN · TRADUCCIÓN</span></h4>
      <div class="ln" style="width:94%"></div><div class="ln" style="width:86%"></div>
      <div style="font:600 50px/1.3 'Cormorant Garamond';margin-top:26px">Hay <span id="ifH" style="background:linear-gradient(#ffd75a,#ffd75a) no-repeat 0 85%/0% 40%">evidencia clara y convincente</span> de que los datos de 1999 <span id="ifF" style="background:linear-gradient(#ff8a80,#ff8a80) no-repeat 0 85%/0% 40%">fueron fabricados</span>.</div>
      <div id="ifR" style="font:600 46px/1.3 'Cormorant Garamond';margin-top:24px;opacity:0">Responsable: <span style="color:#b3221a">Victor Ninov</span>.</div>
      <div class="ln" style="width:90%;margin-top:30px"></div>
      <div id="ifE" style="font:500 38px/1.3 'Cormorant Garamond';margin-top:20px;color:#3a3020;opacity:0">El resto del equipo: <span id="ifEh" style="background:linear-gradient(#8fd0ff,#8fd0ff) no-repeat 0 85%/0% 40%">nadie más revisó los datos originales</span>.</div>
      <div class="ln" style="width:70%;margin-top:26px"></div></div>`);
  RENDER.push(t => {
    if (!on('h_inf')) return;
    const q = P(t, a, a + .5); $('ifD').style.opacity = q; $('ifD').style.transform = `translateY(${lerp(50, 0, eo(q))}px) rotate(.6deg)`;
    $('ifH').style.backgroundSize = `${(100 * P(t, cl - .1, co)).toFixed(1)}% 40%`; $('ifF').style.backgroundSize = `${(100 * P(t, fa - .1, fa + .6)).toFixed(1)}% 40%`;
    $('ifR').style.opacity = P(t, c116 - .1, c116 + .4);
    $('ifE').style.opacity = P(t, c117 - .1, c117 + .4); $('ifEh').style.backgroundSize = `${(100 * P(t, cr, cr + 1.5)).toFixed(1)}% 40%`;
  });
}
// ---------- 3 · Mayo de 2002: lo despiden ----------
{
  const a = S('c118'), de = AT('c118', 'despidió'), b = S('c119');
  scene('h_des', [a - .1, b - .1, .5, .5, 1.04], `<div class="bgA"></div>
    <div class="card" id="dsK" style="left:330px;top:300px;width:380px;padding:0;overflow:hidden;opacity:0"><div style="background:#c3332b;color:#fff;font:700 26px 'IBM Plex Mono';letter-spacing:.2em;padding:14px 0;text-align:center">MAYO</div><div style="font:600 150px/1.25 'Cormorant Garamond';text-align:center">2002</div></div>
    <div class="card" id="dsC" style="left:820px;top:290px;width:760px;height:430px;padding:34px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">CREDENCIAL DEL LABORATORIO</div>
      <div style="display:flex;gap:30px;margin-top:28px;align-items:center"><div style="width:180px;height:220px;border-radius:12px;background:#1a222c;position:relative;overflow:hidden"><svg viewBox="-300 -430 600 440" style="position:absolute;inset:0;width:100%;height:100%"><path d="M0,-415 C62,-415 102,-365 102,-300 C102,-245 74,-205 47,-190 L47,-165 C162,-145 252,-95 282,0 L-282,0 C-252,-95 -162,-145 -47,-165 L-47,-190 C-74,-205 -102,-245 -102,-300 C-102,-365 -62,-415 0,-415 Z" fill="#3a4656"/></svg></div>
      <div><div style="font:800 60px/1.05 'Inter Var'">VICTOR<br>NINOV</div><div class="mono" style="font-size:22px;color:#8b919a;margin-top:14px">Física nuclear</div></div></div></div>
    ${sello('dsS', 'DESPEDIDO', 900, 440, 100)}`);
  RENDER.push(t => {
    if (!on('h_des')) return;
    const q = P(t, a, a + .4); $('dsK').style.opacity = q; $('dsK').style.transform = `rotateX(${lerp(80, 0, eo(q))}deg)`;
    const k = P(t, a + .3, a + .7); $('dsC').style.opacity = k; $('dsC').style.transform = `translateY(${lerp(40, 0, eo(k))}px)`;
    golpe('dsS', t, de, -8); $('dsC').style.filter = `grayscale(${P(t, de, de + .3)}) brightness(${1 - .35 * P(t, de, de + .3)})`;
  });
}
// ---------- 4 · Su versión: nunca aceptó la acusación ----------
{
  const a = S('c119'), c120 = S('c120'), c121 = S('c121'), b = S('c122');
  scene('h_nie', [a - .1, b - .1, .6, .5, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 25% 80%,#0f2230,#05080a 55%)"></div><svg class="full" id="vNe" viewBox="0 0 1920 1080"></svg>
    <div id="neT" class="pill" style="position:absolute;left:820px;top:200px;background:#2f8f5b;color:#fff;opacity:0">SU VERSIÓN</div>
    <div id="neQ" class="card" style="left:820px;top:290px;width:960px;padding:34px 40px;opacity:0;border-color:#5ee093"><div style="font:italic 500 50px/1.22 'Cormorant Garamond'">«En ningún momento participé, a sabiendas, en ninguna forma de tergiversación de datos ni de mala conducta científica.»</div>
      <div class="mono" style="font-size:20px;color:#8b919a;margin-top:18px;letter-spacing:.12em">VICTOR NINOV · 2002 · TRADUCCIÓN</div></div>
    <div id="neR" class="pill" style="position:absolute;left:820px;top:720px;background:rgba(9,12,17,.85);border:1px solid #8fd0ff;color:#8fd0ff;opacity:0">INICIA UN RECLAMO FORMAL CONTRA EL DESPIDO</div>`);
  const svg = $('vNe'); filtroBrillo(svg, 'neGl');
  const s = el('g', { transform: 'translate(400 1100) scale(1.3)' }, svg); silueta(s, '#8fd0ff', 'neGl');
  RENDER.push(t => {
    if (!on('h_nie')) return;
    $('neT').style.opacity = P(t, a, a + .4);
    const q = P(t, c120 - .3, c120 + .2); $('neQ').style.opacity = q; $('neQ').style.transform = `translateY(${lerp(30, 0, eo(q))}px)`;
    $('neR').style.opacity = P(t, c121 - .2, c121 + .2);
  });
}
// ---------- 5 · "Una vez que te marcan como falsificador, empieza la avalancha" ----------
quote('h_q2', [S('c122') - .1, S('c124') - .1, .6, .5, 1.03], 'Una vez que te marcan como falsificador, empieza la avalancha.', 'Victor Ninov', 'Traducción', [S('c123'), E('c123') - .1]);
// ---------- 6 · Darmstadt revisa sus propios datos: 34 cadenas, dos no estaban ----------
{
  const a = S('c124'), c125 = S('c125'), c126 = S('c126'), c127 = S('c127'), d110 = AT('c127', 'ciento diez'), d112 = AT('c127', 'del ciento doce'), c128 = S('c128'), c129 = S('c129'), c130 = S('c130'), c131 = S('c131'), b = S('epi');
  const malas = { 3: ['110 · 1994', d110], 24: ['112 · 1996', d112] };
  scene('h_gs2', [a - .1, b + .2, .6, .8, 1.03], `<div class="bgA"></div>${etiq('g2T', 'GSI · Darmstadt, Alemania')}
    <div id="g2H" style="position:absolute;left:110px;top:150px;font:600 84px 'Cormorant Garamond';opacity:0">Revisan sus propios datos</div>
    <div id="g2N" class="mono" style="position:absolute;left:110px;top:270px;font-size:30px;color:#ffc142;letter-spacing:.12em;opacity:0">34 CADENAS</div>
    ${Array.from({ length: 34 }, (_, i) => `<div id="g2k${i}" style="position:absolute;left:${110 + (i % 7) * 136}px;top:${330 + Math.floor(i / 7) * 92}px;width:120px;height:76px;border-radius:12px;background:#1a2430;border:2px solid #34414f;opacity:0;font:600 17px 'IBM Plex Mono';color:transparent;text-align:center;line-height:72px">${malas[i] ? malas[i][0] : ''}</div>`).join('')}
    <div id="g2E" class="pill" style="position:absolute;left:110px;top:820px;background:#c3332b;color:#fff;font-size:26px;opacity:0">NO ES UN ERROR SIMPLE</div>
    <div id="g2A" class="pill" style="position:absolute;left:110px;top:900px;background:rgba(9,12,17,.85);border:1px solid #ff8a80;color:#ff8a80;font-size:26px;opacity:0">ANÁLISIS EN LOS QUE HABÍA TRABAJADO NINOV</div>
    <div style="position:absolute;left:1180px;top:360px;display:flex;gap:30px">${[[110, 'Ds', '1994'], [111, 'Rg', '1994'], [112, 'Cn', '1996']].map(([z, s, y]) => `<div id="g2z${z}" class="ptG" style="position:relative;width:190px;height:190px;opacity:0"><b style="font-size:26px">${z}</b><i style="top:48px;font-size:84px">${s}</i><u style="font-size:16px">${y}</u></div>`).join('')}</div>`);
  RENDER.push(t => {
    if (!on('h_gs2')) return;
    $('g2T').style.opacity = P(t, a, a + .4); $('g2H').style.opacity = P(t, a + .4, a + 1);
    [110, 111, 112].forEach((z, i) => { const n = $('g2z' + z), k = P(t, c125 + i * .2, c125 + .4 + i * .2), ok = P(t, c130 + i * .15, c130 + .3 + i * .15);
      n.style.opacity = k; n.style.borderColor = ok > 0 ? '#5ee093' : 'rgba(255,255,255,.14)'; n.querySelector('u').textContent = ok > 0 ? 'SE MANTIENE' : ['1994', '1994', '1996'][i]; n.querySelector('u').style.color = ok > 0 ? '#5ee093' : ''; n.style.transform = `scale(${lerp(.85, 1, back(ok))})`; });
    $('g2N').style.opacity = P(t, c126 - .1, c126 + .3);
    for (let i = 0; i < 34; i++) {
      const n = $('g2k' + i), q = P(t, c126 - .1 + i * .03, c126 + .15 + i * .03), m = malas[i], roja = m && t > m[1], verde = !m && t > c130 + i * .015;
      n.style.opacity = q * (t > c129 && !m ? .55 + .45 * P(t, c130, c130 + .3) : 1); n.style.transform = `scale(${lerp(.4, 1, back(q))})`;
      n.style.background = roja ? '#5a1210' : verde ? '#123a26' : '#1a2430'; n.style.borderColor = roja ? '#ff5148' : verde ? '#5ee093' : '#34414f'; n.style.color = roja ? '#ffb0a8' : 'transparent';
      if (m && t > c131) n.style.boxShadow = `0 0 ${18 + 12 * Math.sin(t * 6)}px rgba(255,80,70,.7)`; else n.style.boxShadow = 'none';
    }
    aparece('g2E', t, c128); aparece('g2A', t, c129);
  });
}
});
