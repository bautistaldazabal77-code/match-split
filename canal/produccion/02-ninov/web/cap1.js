// Capítulo I · El final de la tabla: cómo se fabrica un elemento, la carrera de los laboratorios y Ninov en Darmstadt.
SETUP.push(() => {
chapterCard('h_ch1', 'cap1', 'I', 'El final de la tabla', 'Cómo se fabrica un elemento');
// ---------- 1 · Unos noventa elementos naturales; después del uranio, fabricados ----------
{
  const a = S('c14'), hi = AT('c15', 'hidrógeno'), ur = AT('c15', 'uranio'), fa = S('c16'), b = S('c17');
  scene('h_nat', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>${tablaGrande('tN')}
    <div id="nL1" class="lbl" style="left:${TL_LEFT}px;top:120px;color:#8fd0ff;opacity:0">En la naturaleza · del 1 al 92</div>
    <div id="nL2" class="lbl" style="left:${TL_LEFT}px;top:960px;color:#ffc142;opacity:0">Fabricados en laboratorios · del 93 al 118</div>
    <div id="nH" class="card" style="padding:10px 18px;opacity:0;font:600 26px Inter">Hidrógeno · el más liviano</div>
    <div id="nU" class="card" style="padding:10px 18px;opacity:0;font:600 26px Inter">Uranio · el más pesado</div>`);
  const cells = []; for (let z = 1; z <= 118; z++) cells.push($('tNz' + z));
  const [hx, hy] = centroCasilla(1), [ux, uy] = centroCasilla(92);
  Object.assign($('nH').style, { left: hx + 50 + 'px', top: hy - 30 + 'px' }); Object.assign($('nU').style, { left: ux - 120 + 'px', top: uy + 50 + 'px' });
  RENDER.push(t => {
    if (!on('h_nat')) return;
    cells.forEach((c, i) => {
      const z = i + 1, nat = z <= 92, q = nat ? P(t, a + z * .012, a + .3 + z * .012) : P(t, fa + (z - 93) * .04, fa + .3 + (z - 93) * .04);
      c.style.opacity = .12 + .88 * q;
      c.style.background = nat ? '#14324a' : q > 0 ? '#3a2a0c' : '';
      c.style.borderColor = nat ? '#2f6f9e' : q > 0 ? '#ffb23e' : '';
    });
    for (const [z, tz] of [[1, hi], [92, ur]]) cells[z - 1].style.transform = `scale(${1 + .35 * Math.sin(Math.PI * P(t, tz - .1, tz + .6))})`;
    $('nL1').style.opacity = P(t, a + .5, a + 1.2); $('nL2').style.opacity = P(t, fa, fa + .5);
    $('nH').style.opacity = P(t, hi - .1, hi + .3) * (1 - P(t, fa - .3, fa)); $('nU').style.opacity = P(t, ur - .1, ur + .3) * (1 - P(t, fa - .3, fa));
  });
}
// ---------- 2 · La receta: un choque entre billones; los protones se suman ----------
{
  const a = S('c17'), c18 = S('c18'), bi = AT('c18', 'billones'), fu = AT('c18', 'se fundan'), c19 = S('c19'), su = AT('c19', 'se suma'), c20 = S('c20'), de = AT('c20', 'define'), b = S('c21');
  scene('h_col', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vCo" viewBox="0 0 1920 1080"></svg>
    <div id="coK" class="card" style="left:110px;top:110px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">CHOQUES</div><div class="mono" id="coN" style="font-size:46px;color:#ffc142">0</div></div>
    <div id="coE" style="position:absolute;left:110px;top:120px;font:600 110px 'Cormorant Garamond';opacity:0"><span style="color:#ff8f80">36</span> + <span style="color:#ff8f80">82</span> = <span style="color:#ffc142">118</span><div class="mono" style="font-size:24px;color:#8b919a;letter-spacing:.18em;margin-top:6px">PROTONES</div></div>
    ${casillaG('coC', 118, '?', 'ELEMENTO 118', 1560, 120)}`);
  const svg = $('vCo'); defsNucleo(svg);
  const d = el('defs', {}, svg), rg = el('radialGradient', { id: 'coGl' }, d);
  el('stop', { offset: 0, 'stop-color': '#ffe7a0', 'stop-opacity': .9 }, rg); el('stop', { offset: 1, 'stop-color': '#ffb23e', 'stop-opacity': 0 }, rg);
  const glow = el('circle', { cx: 1150, cy: 600, r: 380, fill: 'url(#coGl)', opacity: 0 }, svg);
  const Pb = el('g', {}, svg); nucleo(svg, Pb, 82, 126, 14, 8);
  const Fu = el('g', { opacity: 0 }, svg); nucleo(svg, Fu, 118, 175, 14, 13);
  const r = rnd(4), balas = [];
  for (let i = 0; i < 9; i++) { const g = el('g', {}, svg); nucleo(svg, g, 36, 50, 6, 20 + i); balas.push({ g, t0: c18 + .2 + i * .55 + r() * .2, dy: (r() - .5) * 560, rebota: r() > .5 }); }
  const bala = el('g', {}, svg); nucleo(svg, bala, 36, 50, 6, 4);
  RENDER.push(t => {
    if (!on('h_col')) return;
    Pb.setAttribute('transform', `translate(1150 600) scale(${lerp(.6, 1, back(P(t, a, a + .5)))})`); Pb.setAttribute('opacity', t < fu + .55 ? 1 : 0);
    for (const q of balas) {            // los que no se funden: pasan de largo o rebotan
      const k = P(t, q.t0, q.t0 + 1.1), vis = k > 0 && k < 1 && t < fu;
      const x = lerp(-80, 2000, k), y = 600 + q.dy + (q.rebota && x > 900 ? (x - 900) * Math.sign(q.dy || 1) * .8 : 0);
      q.g.setAttribute('transform', `translate(${x} ${y})`); q.g.setAttribute('opacity', vis ? 1 : 0);
    }
    const m = P(t, fu - .45, fu + .1); bala.setAttribute('transform', `translate(${lerp(-80, 1150, m * m)} 600)`); bala.setAttribute('opacity', m > 0 && t < fu + .1 ? 1 : 0);
    const w = t > fu + .1 ? Math.exp(-(t - fu - .1) * 3) : 0;
    Fu.setAttribute('opacity', t > fu + .1 ? 1 : 0); Fu.setAttribute('transform', `translate(1150 600) scale(${(1 + .1 * Math.sin((t - fu) * 26) * w).toFixed(4)},${(1 - .08 * Math.sin((t - fu) * 26) * w).toFixed(4)})`);
    glow.setAttribute('opacity', t > fu + .1 ? .2 + .7 * w : 0);
    $('coK').style.opacity = P(t, c18, c18 + .4) * (1 - P(t, c19 - .4, c19)); $('coN').textContent = fmt(Math.pow(10, 12 * eo(P(t, c18 + .2, fu))) - 1);
    $('coE').style.opacity = P(t, su - .3, su + .2);
    const k = P(t, de - .2, de + .3); $('coC').style.opacity = k; $('coC').style.transform = `scale(${lerp(.5, 1, back(k))})`; $('coC').classList.toggle('oro', k > 0);
  });
}
// ---------- 3 · Inestables: viven milésimas de segundo y se desarman ----------
{
  const a = S('c21'), mi = AT('c22', 'milésimas'), sd = AT('c22', 'se desarman'), b = S('c23');
  scene('h_ine', [a - .1, b - .1, .6, .4, 1.04], `<div class="bgA"></div><svg class="full" id="vIn" viewBox="0 0 1920 1080"></svg>
    <div id="inT" class="mono" style="position:absolute;left:110px;top:120px;font-size:30px;letter-spacing:.14em;color:#8b919a;opacity:0">VIDA: <span id="inN" style="font-size:72px;color:#ffc142">0,000</span> s</div>`);
  const svg = $('vIn'); defsNucleo(svg);
  const N = el('g', {}, svg), nu = nucleo(svg, N, 118, 175, 14, 13);
  const piezas = [];
  for (let i = 0; i < 8; i++) { const g = el('g', { opacity: 0 }, svg); nucleo(svg, g, 2 + (i % 3), 2 + (i % 2), 14, 40 + i); piezas.push({ g, a: i / 8 * Math.PI * 2 + .3 }); }
  RENDER.push(t => {
    if (!on('h_ine')) return;
    const tr = P(t, a, sd), j = 2 + 10 * tr, br = P(t, sd, sd + .8);
    N.setAttribute('transform', `translate(${960 + Math.sin(t * 37) * j} ${560 + Math.cos(t * 41) * j}) scale(${(1 + .05 * Math.sin(t * 13)) * (1 - .5 * br)})`);
    N.setAttribute('opacity', 1 - br);
    piezas.forEach(p => { p.g.setAttribute('opacity', br > 0 ? 1 - br : 0); p.g.setAttribute('transform', `translate(${960 + Math.cos(p.a) * 520 * eo(br)} ${560 + Math.sin(p.a) * 520 * eo(br)})`); });
    $('inT').style.opacity = P(t, mi - .3, mi + .1); $('inN').textContent = (Math.min(1, P(t, mi, sd)) * .001).toFixed(4).replace('.', ',');
  });
}
// ---------- 4 · La escalera: cada partícula alfa baja dos casillas ----------
function escalera(id, a, Z, sy, X, Y, size = 130) {   // casillas que caen de a una, con partículas alfa
  const html = Z.map((z, i) => `<div id="${id}${z}" class="pt${i === 0 ? ' oro' : ''}" style="left:${X(i)}px;top:${Y(i)}px;width:${size}px;height:${size}px;opacity:0;border-radius:12px"><b style="font-size:20px;left:12px;top:8px">${z}</b><i style="top:${size * .3}px;font-size:${size * .42}px">${sy[i]}</i></div>`).join('');
  return { html, setup(svg) {
    const fl = [], al = [];
    for (let i = 0; i < Z.length - 1; i++) {
      fl.push(el('path', { d: `M${X(i) + size},${Y(i) + size / 2} L${X(i + 1) + size / 2},${Y(i + 1)}`, stroke: '#ffc142', 'stroke-width': 4, 'stroke-dasharray': '9 9', fill: 'none', opacity: 0 }, svg));
      const g = el('g', { opacity: 0 }, svg);
      for (const [dx, dy, c] of [[-8, -8, '#ff6a5c'], [8, 8, '#ff6a5c'], [8, -8, '#c9d0d8'], [-8, 8, '#c9d0d8']]) el('circle', { cx: dx, cy: dy, r: 9, fill: c }, g);
      etiqueta(g, 'α', 22, -16, { size: 34, w: 700, col: '#ffc142', ls: 0 }); al.push(g);
    }
    return (t, T0) => {
      Z.forEach((z, i) => { const q = P(t, T0(i), T0(i) + .3), n = $(id + z); n.style.opacity = q; n.style.transform = `translateY(${lerp(-50, 0, eo(q))}px) scale(${lerp(.6, 1, back(q))})`; });
      for (let i = 0; i < fl.length; i++) {
        fl[i].setAttribute('opacity', P(t, T0(i + 1) - .1, T0(i + 1) + .1));
        const k = P(t, T0(i + 1) - .1, T0(i + 1) + .9); al[i].setAttribute('opacity', k > 0 && k < 1 ? 1 - k : 0);
        al[i].setAttribute('transform', `translate(${X(i) + size + 260 * eo(k)} ${Y(i) + 20 - 190 * eo(k)})`);
      }
    };
  } };
}
window.escalera = escalera;
{
  const a = S('c23'), al = AT('c23', 'partícula alfa'), c24 = S('c24'), hd = AT('c24', 'huella digital'), b = S('c25');
  const Z = [118, 116, 114, 112, 110, 108, 106], sy = ['?', '?', '?', 'Cn', 'Ds', 'Hs', 'Sg'];
  const E1 = escalera('es', a, Z, sy, i => 260 + i * 200, i => 120 + i * 118, 120);
  scene('h_esc', [a - .1, b - .1, .5, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vEs" viewBox="0 0 1920 1080"></svg>${E1.html}
    <div id="esT" style="position:absolute;right:110px;top:150px;text-align:right;opacity:0"><div style="font:600 92px 'Cormorant Garamond'">La huella digital</div><div class="mono" style="font-size:24px;letter-spacing:.18em;color:#8b919a;margin-top:6px">CADA CAÍDA: DOS CASILLAS MENOS</div></div>`);
  const anim = E1.setup($('vEs'));
  RENDER.push(t => { if (!on('h_esc')) return; anim(t, i => i === 0 ? a : al + (i - 1) * (Math.max(.35, (hd - al) / 6))); $('esT').style.opacity = P(t, hd - .2, hd + .4); });
}
// ---------- 5 · Nadie ve el átomo: se ve la cadena en un detector, con posición y tiempo ----------
{
  const a = S('c25'), c26 = S('c26'), de = AT('c26', 'detector'), po = AT('c26', 'posición'), b = S('c27');
  const filas = [['IMPLANTE', '0,000 ms'], ['α  12,04 MeV', '0,12 ms'], ['α  11,63 MeV', '1,2 ms'], ['α  11,08 MeV', '0,6 ms'], ['α  10,67 MeV', '22 ms']];
  scene('h_det', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vDe" viewBox="0 0 1920 1080"></svg>
    <div id="deF" class="card" style="left:1080px;top:300px;width:700px;padding:26px 30px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">MISMO PUNTO DEL DETECTOR · x 23 · y 41</div>
      ${filas.map((f, i) => `<div class="mono dF" style="display:flex;justify-content:space-between;font-size:30px;padding:12px 0;border-bottom:1px dashed #2a3442;opacity:0;color:${i ? '#ffc142' : '#e9e6df'}"><span>${f[0]}</span><span style="color:#8b919a">${f[1]}</span></div>`).join('')}</div>
    <div class="rec">Esquema · valores ilustrativos</div>`);
  const svg = $('vDe'), G = el('g', { transform: 'translate(260 230)' }, svg), n = 16, cs = 38;
  const cel = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cel.push(el('rect', { x: i * cs, y: j * cs, width: cs - 4, height: cs - 4, rx: 3, fill: '#101820', stroke: '#22303e' }, G));
  const lbl = etiqueta(svg, 'DETECTOR', 260, 900, { size: 24, col: '#5ee093' }); lbl.setAttribute('opacity', 0);
  const at = el('circle', { r: 26, fill: '#ffc142', opacity: 0 }, svg);
  const hit = 9 * n + 7;          // celda donde cae el átomo
  RENDER.push(t => {
    if (!on('h_det')) return;
    const fade = P(t, a + .3, a + 1.6); at.setAttribute('opacity', (1 - fade) * .9); at.setAttribute('cx', 260 + 9 * cs + 17); at.setAttribute('cy', 230 + 7 * cs + 17); at.setAttribute('r', 26 + 30 * fade);
    G.setAttribute('opacity', P(t, c26 - .5, c26)); lbl.setAttribute('opacity', P(t, de - .2, de + .2));
    const rows = [...$('deF').querySelectorAll('.dF')]; $('deF').style.opacity = P(t, po - .4, po);
    rows.forEach((r, i) => r.style.opacity = P(t, po - .2 + i * .35, po + i * .35));
    const lastHit = rows.reduce((m, r, i) => t > po - .2 + i * .35 ? i : m, -1);
    cel.forEach((c, i) => { const on1 = i === hit && lastHit >= 0, fl = on1 && t - (po - .2 + lastHit * .35) < .25; c.setAttribute('fill', on1 ? (fl ? '#fff3c4' : '#e0a42a') : '#101820'); });
  });
}
// ---------- 6 · Una carrera entre tres lugares: Berkeley, Dubna y Darmstadt ----------
{
  const a = S('c27'), be = S('c28'), du = S('c29'), da = S('c30'), gs = AT('c30', 'GSI'), b = S('c31');
  scene('h_map', [a - .1, b - .1, .6, .5, 0], `<svg class="full" id="vMp" viewBox="0 0 1920 1080"></svg>${etiq('mpT', 'La carrera de los elementos · siglo XX')}`);
  const M = mundo($('vMp'), { rotate: [-30, 0] });
  const L = [[LUGAR.berkeley, 'BERKELEY · EE.UU.', be, 'start'], [LUGAR.dubna, 'DUBNA · UNIÓN SOVIÉTICA', du, 'start'], [LUGAR.darmstadt, 'DARMSTADT · ALEMANIA', da, 'end']].map(([ll, txt, tz, an]) => ({ m: lugar(M, ll, txt, { anchor: an, dy: an === 'end' ? 40 : 8 }), tz }));
  const gsi = etiqueta(M.g, 'GSI', 0, 0, { size: 22, col: '#ffc142' });
  RENDER.push(t => {
    if (!on('h_map')) return;
    const k = io(P(t, a - .1, b)), [x, y] = M.proj([-30, 45]); camMundo(M, lerp(960, x, k), lerp(540, y, k), lerp(1, 1.5, k));
    for (const l of L) { l.m.c.setAttribute('opacity', P(t, l.tz - .2, l.tz + .2)); l.m.fijo(lerp(1, 1.5, k)); l.m.pulso(t); }
    const [gx, gy] = L[2].m.xy; gsi.setAttribute('x', gx - 70); gsi.setAttribute('y', gy - 20); gsi.setAttribute('opacity', P(t, gs - .1, gs + .2)); gsi.setAttribute('font-size', 22 / lerp(1, 1.5, k));
    $('mpT').style.opacity = P(t, a, a + .6);
  });
}
// ---------- 7 · GSI, 1994-1996: los elementos 110, 111 y 112 ----------
{
  const a = S('c31'), z0 = AT('c31', 'ciento diez'), z1 = AT('c31', 'ciento once'), z2 = AT('c31', 'ciento doce'), b = S('c32');
  scene('h_gsi', [a - .1, b - .1, .5, .5, 1.04], `<div class="bgA"></div>${etiq('gsT', 'GSI · Darmstadt, Alemania')}
    <div id="gsY" style="position:absolute;left:0;right:0;top:170px;text-align:center;font:600 90px 'Cormorant Garamond';opacity:0">1994 – 1996</div>
    <div style="position:absolute;left:0;right:0;top:340px;display:flex;justify-content:center;gap:60px">${[[110, 'Ds', 'NOVIEMBRE 1994', z0], [111, 'Rg', 'DICIEMBRE 1994', z1], [112, 'Cn', 'FEBRERO 1996', z2]].map(([z, s, f]) => `<div id="gs${z}" class="ptG" style="position:relative;width:300px;height:300px;opacity:0"><b>${z}</b><i style="top:80px;font-size:130px">${s}</i><u style="font-size:22px">${f}</u></div>`).join('')}</div>`);
  RENDER.push(t => {
    if (!on('h_gsi')) return;
    $('gsT').style.opacity = P(t, a, a + .5);
    // primero las tres casillas apagadas; se encienden cuando se nombra cada elemento
    [[110, z0], [111, z1], [112, z2]].forEach(([z, tz], i) => { const q = P(t, tz - .1, tz + .3), n = $('gs' + z); n.style.opacity = P(t, a + .3 + i * .15, a + .7 + i * .15) * (.25 + .75 * q); n.style.transform = `scale(${lerp(.9, 1, back(q))})`; n.classList.toggle('oro', t > tz && t < tz + .8); });
    $('gsY').style.opacity = P(t, a + .8, a + 1.4);
  });
}
// ---------- 8 · El joven físico búlgaro y el separador de gas ----------
{
  const a = S('c32'), c33 = S('c33'), fi = AT('c33', 'un filtro'), so = AT('c33', 'deja pasar'), c34 = S('c34'), b = S('c35');
  scene('h_sep', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div><svg class="full" id="vSe" viewBox="0 0 1920 1080"></svg>
    <div id="seL" class="lbl" style="left:820px;top:150px;color:#8fd0ff;opacity:0">Separador de gas</div>
    ${zocalo('seZ', 'Físico búlgaro · GSI, Darmstadt', 'VICTOR NINOV')}<div class="rec">Esquema</div>`);
  const svg = $('vSe'); filtroBrillo(svg, 'seGl');
  const sil = el('g', { transform: 'translate(330 1100) scale(1.15)', opacity: 0 }, svg); silueta(sil, '#ffb23e', 'seGl');
  const IM = el('g', { opacity: 0 }, svg);
  const curva = 'M800,640 C1050,640 1250,600 1400,470 S1600,260 1760,260';
  el('path', { d: curva, fill: 'none', stroke: '#2b4a63', 'stroke-width': 120, 'stroke-linecap': 'round' }, IM);
  el('path', { d: curva, fill: 'none', stroke: '#8fd0ff', 'stroke-opacity': .25, 'stroke-width': 3 }, IM);
  const cp = el('path', { d: curva, fill: 'none', stroke: 'none' }, IM), LC = cp.getTotalLength();
  el('rect', { x: 1740, y: 200, width: 60, height: 120, rx: 8, fill: '#163024', stroke: '#5ee093', 'stroke-width': 3 }, IM);
  etiqueta(IM, 'DETECTOR', 1770, 360, { size: 22, anchor: 'middle', col: '#5ee093' }); etiqueta(IM, 'DEL CHOQUE', 800, 720, { size: 22, anchor: 'middle', col: '#aab3bd' });
  const pesados = [], livianos = [], r = rnd(7);
  for (let i = 0; i < 4; i++) pesados.push(el('circle', { r: 13, fill: '#ffc142' }, IM));
  for (let i = 0; i < 26; i++) livianos.push({ c: el('circle', { r: 6, fill: '#8b95a1' }, IM), d: r(), s: .3 + r() * .5, sg: r() > .5 ? 1 : -1 });
  RENDER.push(t => {
    if (!on('h_sep')) return;
    sil.setAttribute('opacity', P(t, a, a + .8));
    IM.setAttribute('opacity', P(t, c33 - .3, c33 + .3)); $('seL').style.opacity = P(t, c33, c33 + .5);
    const go = t > fi;
    pesados.forEach((c, i) => { const u = ((t - c33) * .3 + i / 4) % 1, p = cp.getPointAtLength(u * LC); c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('opacity', go ? Math.sin(Math.PI * u) : 0); });
    livianos.forEach(q => { const u = ((t - c33) * .5 + q.d) % 1, x = 800 + u * 600 * q.s * 1.6, y = 640 + q.sg * u * u * 500 * q.s; q.c.setAttribute('cx', x); q.c.setAttribute('cy', y); q.c.setAttribute('opacity', go ? (1 - u) * .8 : 0); });
    zocaloAnim('seZ', t, c34 - .1);
  });
}
// ---------- 9 · El programa de análisis, que muy pocos sabían usar ----------
{
  const a = S('c35'), c36 = S('c36'), po = AT('c36', 'muy pocos'), b = S('c37');
  const codigo = ['C     BUSQUEDA DE CADENAS DE DESINTEGRACION', '      DO 100 I = 1, NEVT', '         IF (E(I) .GT. EMIN) THEN', '            CALL CORREL(I, X(I), Y(I), T(I))', '            IF (NALFA .GE. 3) CALL CADENA(I)', '         ENDIF', '  100 CONTINUE', 'C     VENTANA DE POSICION Y TIEMPO', '      DX = ABS(X(J) - X(I))', '      IF (DX .LT. DXMAX .AND. DT .LT. TMAX) ...'];
  scene('h_prg', [a - .1, b - .1, .6, .5, 1.03], `<div class="bgA"></div>${crtHTML('pgC', 160, 180, 1000, 560, 'PROGRAMA DE ANÁLISIS', codigo)}
    <svg class="full" id="vPg" viewBox="0 0 1920 1080"></svg><div id="pgT" class="lbl" style="left:1250px;top:300px;opacity:0;color:#e9e6df">Quiénes sabían usarlo</div><div class="rec">Recreación</div>`);
  const svg = $('vPg'), gente = [];
  for (let i = 0; i < 12; i++) { const g = el('g', { opacity: 0 }, svg); persona(g, 1280 + (i % 4) * 130, 520 + Math.floor(i / 4) * 170, 1.5, { col: '#4a5562' }); gente.push(g); }
  RENDER.push(t => {
    if (!on('h_prg')) return;
    [...$$('#pgC .ln').children].forEach((d, i) => d.style.opacity = P(t, a + i * .25, a + .1 + i * .25));
    gente.forEach((g, i) => { g.setAttribute('opacity', P(t, c36 - .3 + i * .04, c36 + i * .04) * (t > po && i !== 5 ? .25 : 1)); g.querySelectorAll('rect,circle').forEach(e => e.setAttribute('fill', t > po && i === 5 ? '#ffb23e' : '#4a5562')); });
    $('pgT').style.opacity = P(t, c36 - .3, c36);
  });
}
// ---------- 10 · Berkeley lo contrata para volver a la carrera ----------
{
  const a = S('c37'), b38 = S('c38'), c39 = S('c39'), b = S('cap2');
  scene('h_ber', [a - .1, b + .2, .6, .8, 0], `<svg class="full" id="vBe" viewBox="0 0 1920 1080"></svg>${zocalo('beZ', 'Mediados de los noventa', 'Laboratorio Nacional Lawrence Berkeley', 'California · Estados Unidos')}
    <div id="beR" style="position:absolute;right:110px;top:110px;opacity:0;text-align:right"><div class="lbl" style="position:static;color:#ffc142">Los que faltaban</div>
      <div style="display:flex;gap:10px;margin-top:14px">${[113, 114, 115, 116, 117, 118].map(z => `<div class="pt ptv" style="position:relative;width:74px;height:74px"><b style="font-size:13px">${z}</b></div>`).join('')}</div></div>`);
  const M = mundo($('vBe'), { rotate: [40, 0] });
  const D = lugar(M, LUGAR.darmstadt, 'DARMSTADT', { anchor: 'end' }), B = lugar(M, LUGAR.berkeley, 'BERKELEY'), A = arco(M, LUGAR.darmstadt, LUGAR.berkeley);
  RENDER.push(t => {
    if (!on('h_ber')) return;
    const k = io(P(t, a - .1, b38)), [x0, y0] = D.xy, [x1, y1] = B.xy, z = lerp(1.4, 2.2, io(P(t, b38, b)));
    camMundo(M, lerp(x0, x1, k), lerp(y0, y1, k), z);
    for (const p of [D, B]) { p.fijo(z); p.c.setAttribute('opacity', 1); p.pulso(t); }
    A.draw(P(t, a, a + 2)); zocaloAnim('beZ', t, a + .5, b);
    $('beR').style.opacity = P(t, b38, b38 + .5);
  });
}
});
