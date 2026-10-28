// "¿Y si…? La antena china de Neuquén" · parte 2 (ficción política con datos reales). Todo animado, sin fotos.
// Lo real: acuerdo de 2016 (uso civil), inspección de abril de 2024 (Ámbito, 12/8/2026), estación de la ESA en Malargüe (Chequeado).
// La inspección total, la respuesta de China, las ofertas y Sofía son ficción. Los tiempos salen de timeline.js.

captions([
  ['h1', 'Washington', 'a'], ['h1', 'cerrar', 'r'], ['h1', 'Pekín', 'r'], ['h1', 'amenaza', 'r'], ['h1', 'Argentina', 'a'], ['h2', 'Ficción', 'r'], ['h2', 'reales', 'g'],
  ['c1', 'Sofía', 'a'], ['c1', 'declarar', 'r'], ['c1', 'registros', 'a'], ['c2', 'real', 'g'], ['c2', 'dieciséis', 'a'], ['c2', 'civil', 'g'], ['c3', 'militar', 'r'], ['c3', 'probarlo', 'r'],
  ['c4', 'inspección', 'a'], ['c4', 'abril', 'a'], ['c4', 'Cancillería', 'a'], ['c4', 'ENACOM', 'a'], ['c4', 'CONAE', 'a'], ['c4', 'pacíficos', 'g'], ['c5', 'total', 'r'], ['c5', 'inteligencia', 'r'],
  ['c6', 'medias', 'a'], ['c6', 'control', 'g'], ['c6', 'servidores', 'r'], ['c7', 'real', 'g'], ['c7', 'nadie', 'g'], ['c8', 'Malargüe', 'a'], ['c8', 'Mendoza', 'a'], ['c8', 'Europea', 'a'],
  ['c8', 'cincuenta', 'a'], ['c8', 'diez', 'a'], ['c9', 'quién', 'r'], ['c9', 'opera', 'r'], ['c10', 'veinte', 'a'], ['c10', 'inversiones', 'g'], ['c10', 'argentino', 'a'],
  ['c11', 'contrario', 'r'], ['c11', 'compras', 'a'], ['c11', 'swap', 'a'], ['c12', 'Sofía', 'a'], ['c12', 'potencias', 'r'], ['c13', 'existe', 'g'], ['c13', 'Washington', 'a'],
  ['c14', 'cerrarías', 'r'], ['c14', 'dejarías', 'g'], ['c14', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 2', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2,
  horas: [[S('c1') - .1, '6'], [S('c5') - .1, '8'], [S('c10') - .1, '20', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
// plano de la base vista desde arriba (esquema): predio, antena y edificios; devuelve los edificios por nombre
function planoBase(svg, o = {}) {
  const g = el('g', { transform: o.tr || '' }, svg), E = {};
  el('rect', { x: 120, y: 520, width: 840, height: 600, fill: '#141a14', stroke: '#5d6e5d', 'stroke-width': 4, 'stroke-dasharray': '16 10' }, g);
  etiqueta(g, 'PREDIO · 200 HA (ESQUEMA)', 140, 556, { size: 20, col: '#8a9a8a' });
  el('path', { d: 'M540,1120 L540,1200', stroke: '#5d6e5d', 'stroke-width': 18 }, g);
  el('circle', { cx: 380, cy: 760, r: 130, fill: '#1d2530', stroke: '#cfd3d8', 'stroke-width': 6 }, g); el('circle', { cx: 380, cy: 760, r: 24, fill: '#cfd3d8' }, g);
  etiqueta(g, 'ANTENA 35 M', 380, 930, { anchor: 'middle', size: 22, col: '#cfd3d8' });
  for (const [k, x, y, w, h, txt] of [['ctrl', 620, 640, 280, 150, 'SALA DE CONTROL'], ['serv', 620, 840, 280, 150, 'SERVIDORES'], ['aloj', 190, 980, 300, 100, 'ALOJAMIENTO']]) {
    const b = el('g', {}, g); E[k] = { g: b, r: el('rect', { x, y, width: w, height: h, fill: '#232b36', stroke: '#5d6672', 'stroke-width': 4 }, b) };
    etiqueta(b, txt, x + w / 2, y + h / 2 + 8, { anchor: 'middle', size: 22, col: '#e9e6df' });
  }
  return { g, E };
}

SETUP.push(() => {
// ---------- 1 · Gancho: Washington pide cerrarla, Pekín amenaza, ¿qué hace la Argentina? ----------
{
  const pk = AT('h1', 'Pekín'), qu = AT('h1', 'Qué');
  scene('sRe1', [-1, pk - .1, .01, .1, 1.06], `<svg class="full" id="vR1" viewBox="0 0 1080 1920"></svg>
    <div id="r1T" style="position:absolute;left:64px;top:330px;font:900 116px/1 'Inter Var';letter-spacing:-.025em">WASHINGTON<br>PIDE <span style="color:#ff5148">CERRARLA</span></div>
    <div id="r1S" style="position:absolute;left:520px;top:1420px;padding:16px 30px;border:8px solid #ff5148;color:#ff5148;font:900 64px/1 'Inter Var';opacity:0">CERRAR</div>`);
  const svg = $('vR1'), cielo = desierto(svg, { hor: 1140, seed: 5 }), A = antena(el('g', { transform: 'translate(770 860) scale(1.05)' }, svg));
  const alerta = el('rect', { x: 0, y: 0, width: 1080, height: 1920, fill: '#ff2a2a', opacity: 0 }, svg);
  RENDER.push(t => {
    if (!on('sRe1')) return;
    cielo(t); A.apuntar(-25 + 6 * Math.sin(t * .6)); alerta.setAttribute('opacity', (.08 * (Math.floor(t * 2.5) % 2)).toFixed(2));
    sello('r1S', t, AT('h1', 'cerrar'));
  });
  scene('sRe2', [pk - .1, qu - .1, .05, .1, 1.08], `${fondo('#3a0806')}<svg class="full" id="vR2" viewBox="0 0 1080 1920"></svg>
    <div id="r2T" style="position:absolute;left:64px;top:780px;font:900 130px/1 'Inter Var';letter-spacing:-.025em">PEKÍN<br><span style="color:#ff5148">AMENAZA</span></div>`);
  const fc = el('g', { transform: 'translate(64 380)' }, $('vR2')); banderaCN(fc, 520);
  RENDER.push(t => { if (!on('sRe2')) return; golpeT('r2T', t, pk); fc.setAttribute('transform', `translate(64 380) skewY(${(2 * Math.sin(t * 3)).toFixed(2)})`); });
  scene('sRe3', [qu - .1, S('h2') - .1, .05, .15, 1.06], `${fondo('#0a1830')}<svg class="full" id="vR3" viewBox="0 0 1080 1920"></svg>
    <div id="r3T" style="position:absolute;left:64px;top:780px;font:900 112px/1.02 'Inter Var';letter-spacing:-.025em">¿QUÉ HACE LA<br><span style="color:#8fd0ff">ARGENTINA?</span></div>`);
  const fa = el('g', { transform: 'translate(64 380)' }, $('vR3')); banderaAR(fa, 520);
  RENDER.push(t => { if (!on('sRe3')) return; golpeT('r3T', t, qu); fa.setAttribute('transform', `translate(64 380) skewY(${(2 * Math.sin(t * 3)).toFixed(2)})`); });
}
// ---------- 2 · Parte 2 ----------
{
  const a = S('h2');
  scene('sP2', [a - .1, S('c1') - .1, .15, .2, 1.06], `${fondo('#1a0706')}
    <div style="position:absolute;left:64px;top:620px;width:860px"><div id="p2L" style="height:6px;background:#e0433a;width:0"></div>
    <div id="p2T" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">PARTE <span style="color:#ff5148">2</span></div>
    <div id="p2S" class="lbl" style="position:static;margin-top:18px;font-size:28px;color:#cfd3d8;opacity:0">ficción política · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sP2')) return;
    $('p2L').style.width = 860 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('p2T').style.opacity = q; $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%';
    $('p2S').style.opacity = P(t, AT('h2', 'Ficción') - .1, AT('h2', 'Ficción') + .3);
  });
}
// ---------- 3 · Sofía declara: su copia es lo que todos quieren ver ----------
{
  const a = S('c1'), de = AT('c1', 'declarar'), re = AT('c1', 'registros');
  scene('sSof', [a - .1, S('c2') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:linear-gradient(#06101a,#03060a)"></div>${fic('soF')}
    <div id="soB" style="position:absolute;left:60px;top:470px;width:520px;height:606px">${busto({ ropa: '#2a3a4f', pelo: '#3a2418', barba: 0, piel: '#e0ad8a', halo: '#ffc142' })}</div>
    <svg class="full" id="vSo" viewBox="0 0 1080 1920"></svg>
    <div id="soD" class="pill" style="position:absolute;left:64px;top:400px;background:#c3332b;color:#fff;font-size:30px;opacity:0">CITADA A DECLARAR</div>`);
  const doc = el('g', { opacity: 0 }, $('vSo')); archivo(doc, '#ffc142');
  const ojos = [0, 1, 2].map(i => { const g = el('g', { opacity: 0 }, $('vSo')); el('ellipse', { rx: 34, ry: 18, fill: '#e9e6df' }, g); el('circle', { r: 11, fill: '#0b1015' }, g); return g; });
  RENDER.push(t => {
    if (!on('sSof')) return;
    aparece('soF', t, a); aparece('soD', t, de);
    const q = P(t, a - .1, a + .4); $('soB').style.opacity = q;
    const k = eo(P(t, re - .4, re + .2)); doc.setAttribute('opacity', k); doc.setAttribute('transform', `translate(${lerp(500, 760, k)} ${lerp(900, 780, k)}) scale(${lerp(.8, 1.8, k)}) rotate(${4 * Math.sin(t * 2)})`);
    ojos.forEach((o, i) => { const x = 700 + Math.cos(i * 2.1 + 1) * 230, y = 780 + Math.sin(i * 2.1 + 1) * 230; o.setAttribute('opacity', P(t, re + .2 + i * .15, re + .4 + i * .15)); o.setAttribute('transform', `translate(${x} ${y})`); });
  });
}
// ---------- 4 · Dato real: en 2016 firmaron que la estación es solo para uso civil ----------
{
  const a = S('c2'), ci = AT('c2', 'civil');
  scene('s2016', [a - .1, S('c3') - .1, .2, .2, 1.04], `${fondo('#0a1a12')}${real('16R')}
    <div id="16C" class="card" style="left:64px;top:430px;width:950px;padding:30px 34px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">ACUERDO ARGENTINA–CHINA · 2016 (EN RESUMEN)</div>
      <div id="16T" style="font:800 64px/1.15 'Inter Var';margin-top:16px;min-height:230px"></div></div>
    <div id="16S" style="position:absolute;left:520px;top:1440px;padding:16px 30px;border:8px solid #5ee093;color:#5ee093;font:900 64px/1 'Inter Var';opacity:0">USO CIVIL</div>`);
  RENDER.push(t => {
    if (!on('s2016')) return;
    aparece('16R', t, a); entra('16C', t, a + .1);
    $('16T').textContent = typed(t, AT('c2', 'dieciséis'), ci, 'La estación no puede usarse con fines militares.');
    sello('16S', t, ci + .1);
  });
}
// ---------- 5 · Si se probara un uso militar… el problema es probarlo ----------
{
  const a = S('c3'), pr = AT('c3', 'probarlo');
  scene('sPro', [a - .1, S('c4') - .1, .2, .2, 1.04], `<svg class="full" id="vPr" viewBox="0 0 1080 1920"></svg>
    <div id="prQ" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';opacity:0">¿USO<br><span style="color:#ff5148">MILITAR?</span></div>
    <div id="prP" class="pill" style="position:absolute;left:64px;top:1440px;background:#c3332b;color:#fff;font-size:40px;opacity:0">EL PROBLEMA: PROBARLO</div>`);
  const svg = $('vPr'), cielo = desierto(svg, { hor: 1160, seed: 9 }), A = antena(el('g', { transform: 'translate(540 900) scale(.9)' }, svg));
  const lupa = el('g', {}, svg); el('circle', { r: 120, fill: '#8fd0ff', 'fill-opacity': .08, stroke: '#e9e6df', 'stroke-width': 14 }, lupa); el('rect', { x: 80, y: 80, width: 40, height: 170, rx: 14, fill: '#e9e6df', transform: 'rotate(-45)' }, lupa);
  RENDER.push(t => {
    if (!on('sPro')) return;
    cielo(t); A.apuntar(-20 + 8 * Math.sin(t * .7));
    const u = (t - a) * .9; lupa.setAttribute('transform', `translate(${540 + 220 * Math.sin(u)} ${860 + 120 * Math.sin(u * 1.7)})`);
    entra('prQ', t, a); aparece('prP', t, pr);
  });
}
// ---------- 6 · Dato real: la inspección de abril de 2024 ----------
{
  const a = S('c4'), ca = AT('c4', 'Cancillería'), en = AT('c4', 'ENACOM'), co = AT('c4', 'CONAE'), re = AT('c4', 'recorrieron');
  scene('sI24', [a - .1, AT('c4', 'y concluyeron') - .1, .2, .15, 0], `<svg class="full" id="vI2" viewBox="0 0 1080 1920"></svg>${real('i2R')}
    <div id="i2C" class="card" style="left:64px;top:410px;padding:18px 26px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">INSPECCIÓN</div><div style="font:900 64px 'Inter Var'">ABRIL 2024</div></div>
    <div style="position:absolute;left:64px;top:600px;display:flex;gap:16px">${['CANCILLERÍA', 'ENACOM', 'CONAE'].map((x, i) => `<div id="i2P${i}" class="pill" style="background:#1f5f8a;color:#fff;font-size:30px;opacity:0">${x}</div>`).join('')}</div>`);
  const M = cartaNeuquen($('vI2'), { centro: [-69.9, -38.3], ancho: 3.2, caja: [40, 720, 1040, 1700], titulo: 'BAJADA DEL AGRIO · NEUQUÉN', km: 50, paso: .5 });
  M.resaltar('Neuquén', '#ff5148', .5);
  const es = M.punto(NQ.estacion, 'ESTACIÓN', { col: '#ff5148' }), za = M.punto(NQ.zapala, 'ZAPALA', { col: '#9fb0c0', anchor: 'end' });
  const [zx, zy] = M.proj(NQ.zapala), [ex, ey] = M.proj(NQ.estacion), ruta = trazo(M.g, [[zx, zy], [ex, ey]], { col: '#8fd0ff', w: 6, punto: 10, curva: [(zx + ex) / 2 + 60, (zy + ey) / 2] });
  RENDER.push(t => {
    if (!on('sI24')) return;
    aparece('i2R', t, a); entra('i2C', t, a + .1);
    [ca, en, co].forEach((w, i) => aparece('i2P' + i, t, w));
    es.ver(1, t); za.ver(P(t, a, a + .3), t); ruta.draw(io(P(t, re - .5, re + .6)));
  });
}
// ---------- 7 · Concluyeron que se cumplían los fines pacíficos ----------
{
  const a = AT('c4', 'y concluyeron'), pa = AT('c4', 'pacíficos');
  scene('sPac', [a - .1, S('c5') - .1, .1, .2, 1.05], `${fondo('#0a2015')}${real('paR')}
    <div id="paV" style="position:absolute;left:64px;top:560px;width:180px;height:180px;border-radius:50%;background:#2f8f5b;display:flex;align-items:center;justify-content:center;font:900 120px 'Inter Var';opacity:0">✓</div>
    <div id="paT" style="position:absolute;left:64px;top:790px;font:900 104px/1.02 'Inter Var';opacity:0">SE CUMPLÍAN<br>LOS FINES<br><span style="color:#5ee093">PACÍFICOS</span></div>
    <div class="mono" style="position:absolute;left:64px;top:1440px;font-size:24px;color:#8b919a">Conclusión de la Cancillería · Fuente: Ámbito, 12/8/2026</div>`);
  RENDER.push(t => {
    if (!on('sPac')) return;
    aparece('paR', t, a); const q = P(t, a, a + .3); $('paV').style.opacity = q; $('paV').style.transform = `scale(${lerp(.4, 1, back(q))})`;
    golpeT('paT', t, pa - .3, 1.15);
  });
}
// ---------- 8 · En esta historia: una inspección total ----------
{
  const a = S('c5'), fu = AT('c5', 'Fuerza'), co = AT('c5', 'CONAE'), it = AT('c5', 'inteligencia');
  scene('sTot', [a - .1, S('c6') - .1, .2, .1, 0], `<div style="position:absolute;inset:0;background:#0a0f0a"></div><svg class="full" id="vTo" viewBox="0 0 1080 1920"></svg>${fic('toF')}
    <div id="toT" class="pill" style="position:absolute;left:64px;top:400px;background:#c3332b;color:#fff;font-size:32px;opacity:0">INSPECCIÓN TOTAL</div>
    <div style="position:absolute;left:64px;top:1440px;display:flex;gap:14px;flex-wrap:wrap;width:950px">${['FUERZA AÉREA', 'CONAE', 'INTELIGENCIA'].map((x, i) => `<div id="toP${i}" class="pill" style="background:#222a34;border:1px solid #8fd0ff;color:#8fd0ff;font-size:30px;opacity:0">${x}</div>`).join('')}</div>`);
  const B = planoBase($('vTo')), ins = [];
  for (let i = 0; i < 9; i++) ins.push(icono($('vTo'), 'persona', 0, 0, .9, ['#8fd0ff', '#ffc142', '#ff8a80'][i % 3]));
  RENDER.push(t => {
    if (!on('sTot')) return;
    aparece('toF', t, a); aparece('toT', t, a + .4);
    [fu, co, it].forEach((w, i) => aparece('toP' + i, t, w));
    ins.forEach((p, i) => {
      const t0 = [fu, co, it][i % 3] - .2 + Math.floor(i / 3) * .25, k = eo(P(t, t0, t0 + 1.4)), dest = [[760, 715], [760, 915], [380, 760]][Math.floor(i / 3)];
      const x = lerp(540 + (i % 3 - 1) * 40, dest[0] + (i % 3 - 1) * 46, k), y = lerp(1260, dest[1] + 40, k);
      p.setAttribute('opacity', P(t, t0, t0 + .2)); p.setAttribute('transform', `translate(${x} ${y}) scale(.9)`);
    });
  });
}
// ---------- 9 · China acepta a medias: control sí, servidores no ----------
{
  const a = S('c6'), sc = AT('c6', 'sala'), se = AT('c6', 'servidores');
  scene('sMed', [a - .1, S('c7') - .1, .1, .15, 0], `<div style="position:absolute;inset:0;background:#0a0f0a"></div><svg class="full" id="vMe" viewBox="0 0 1080 1920"></svg>${fic('meF')}
    <div id="meA" class="pill" style="position:absolute;left:64px;top:400px;background:#8a5a12;color:#fff;font-size:32px;opacity:0">CHINA ACEPTA A MEDIAS</div>
    <div id="meO" class="pill" style="position:absolute;left:64px;top:1440px;background:#2f8f5b;color:#fff;font-size:32px;opacity:0">✓ CONTROL: ABIERTO</div>
    <div id="meX" class="pill" style="position:absolute;left:64px;top:1510px;background:#c3332b;color:#fff;font-size:32px;opacity:0">✕ SERVIDORES: CERRADO</div>`);
  const B = planoBase($('vMe'));
  const cand = el('g', { opacity: 0, transform: 'translate(760 915)' }, $('vMe')); el('rect', { x: -40, y: -20, width: 80, height: 66, rx: 10, fill: '#ff5148' }, cand); el('path', { d: 'M-24,-20 L-24,-44 A24,24 0 0 1 24,-44 L24,-20', fill: 'none', stroke: '#ff5148', 'stroke-width': 12 }, cand);
  RENDER.push(t => {
    if (!on('sMed')) return;
    aparece('meF', t, a); aparece('meA', t, a + .2);
    const q1 = P(t, sc - .1, sc + .3); B.E.ctrl.r.setAttribute('fill', q1 > .5 ? '#1f4a33' : '#232b36'); B.E.ctrl.r.setAttribute('stroke', q1 > .5 ? '#5ee093' : '#5d6672'); aparece('meO', t, sc);
    const q2 = P(t, se - .1, se + .3); B.E.serv.r.setAttribute('fill', q2 > .5 ? '#4a1a18' : '#232b36'); B.E.serv.r.setAttribute('stroke', q2 > .5 ? '#ff5148' : '#5d6672'); aparece('meX', t, se);
    cand.setAttribute('opacity', q2); cand.setAttribute('transform', `translate(760 ${lerp(860, 915, eo(q2))})`);
    B.g.setAttribute('transform', `translate(540 800) scale(${lerp(1, 1.15, P(t, a, S('c7')))}) translate(-540 -800)`);
  });
}
// ---------- 10 · Otro dato real que casi nadie conoce ----------
{
  const a = S('c7');
  scene('sOtr', [a - .1, S('c8') - .1, .1, .15, 1.08], `${fondo('#0a2015')}
    <div id="otT" style="position:absolute;left:64px;right:64px;top:560px;font:900 120px/1.02 'Inter Var';letter-spacing:-.02em;opacity:0">OTRO DATO<br><span style="color:#5ee093">REAL</span> QUE CASI<br>NADIE CONOCE</div>`);
  RENDER.push(t => { if (!on('sOtr')) return; golpeT('otT', t, a, 1.3); });
}
// ---------- 11 · En Malargüe hay otra antena de 35 metros ----------
{
  const a = S('c8'), ma = AT('c8', 'Malargüe'), tr = AT('c8', 'treinta');
  scene('sMal', [a - .1, AT('c8', 'Es de la') - .1, .15, .15, 0], `<svg class="full" id="vMa" viewBox="0 0 1080 1920"></svg>${real('maR')}`);
  const M = cartaNeuquen($('vMa'), { centro: [-69.8, -37.0], ancho: 6, caja: [40, 400, 1040, 1150], titulo: 'NEUQUÉN Y MENDOZA', km: 100, paso: 1 });
  const ml = M.punto(NQ.malargue, 'MALARGÜE · ESA', { col: '#8fd0ff', size: 22 }), nq = M.punto(NQ.estacion, 'BAJADA DEL AGRIO · CHINA', { col: '#ff5148', size: 22 });
  const [x1, y1] = M.proj(NQ.estacion), [x2, y2] = M.proj(NQ.malargue), lin = trazo(M.g, [[x1, y1], [x2, y2]], { col: '#ffc142', w: 4 });
  const dist = rotulo(M.g, (x1 + x2) / 2 + 24, (y1 + y2) / 2, '≈ 280 KM', { col: '#ffc142', size: 20 });
  const c1 = rotulo(M.g, x2 + 26, y2 + 48, '35 M', { col: '#8fd0ff', size: 22 }), c2 = rotulo(M.g, x1 + 26, y1 + 48, '35 M', { col: '#ff5148', size: 22 });
  RENDER.push(t => {
    if (!on('sMal')) return;
    aparece('maR', t, a); nq.ver(P(t, a, a + .3), t); M.resaltar('Mendoza', '#8fd0ff', P(t, AT('c8', 'Mendoza') - .2, AT('c8', 'Mendoza') + .2)); M.resaltar('Neuquén', '#ff5148', .6);
    ml.ver(P(t, ma - .2, ma + .2), t); lin.draw(io(P(t, ma, ma + .8))); dist.setAttribute('opacity', P(t, ma + .6, ma + .9));
    c1.setAttribute('opacity', P(t, tr, tr + .3)); c2.setAttribute('opacity', P(t, tr + .2, tr + .5));
  });
}
// ---------- 12 · Las dos antenas, lado a lado ----------
{
  const a = AT('c8', 'Es de la'), ci = AT('c8', 'cincuenta'), di = AT('c8', 'diez');
  const filas = [['ANTENA', '35 M', '35 M', a + .3], ['ACUERDO', '50 AÑOS', '50 AÑOS', ci], ['PARA LA ARGENTINA', 'HASTA 10 %', '10 %', di]];
  scene('sCmp', [a - .1, S('c9') - .1, .15, .15, 1.03], `${fondo('#0d141b')}<svg class="full" id="vCm" viewBox="0 0 1080 1920"></svg>${real('cmR')}
    <div style="position:absolute;left:64px;right:64px;top:660px">${filas.map((f, i) => `<div id="cmF${i}" style="display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:16px;align-items:center;margin-bottom:22px;opacity:0">
      <div class="mono" style="font-size:24px;color:#8b919a;letter-spacing:.1em">${f[0]}</div><div style="font:900 50px 'Inter Var';color:#8fd0ff">${f[1]}</div><div style="font:900 50px 'Inter Var';color:#ff8a80">${f[2]}</div></div>`).join('')}</div>`);
  const svg = $('vCm'), fe = el('g', { transform: 'translate(430 440)' }, svg), fc = el('g', { transform: 'translate(745 440)' }, svg); banderaEU(fe, 190); banderaCN(fc, 190);
  etiqueta(svg, 'MALARGÜE', 525, 610, { anchor: 'middle', size: 24, w: 600, col: '#8fd0ff' }); etiqueta(svg, 'NEUQUÉN', 840, 610, { anchor: 'middle', size: 24, w: 600, col: '#ff8a80' });
  RENDER.push(t => {
    if (!on('sCmp')) return;
    aparece('cmR', t, a);
    filas.forEach((f, i) => { const q = P(t, f[3] - .1, f[3] + .25); $('cmF' + i).style.opacity = q; $('cmF' + i).style.transform = `translateX(${lerp(-40, 0, eo(q))}px)`; });
  });
}
// ---------- 13 · La diferencia no es la antena: es quién la opera ----------
{
  const a = S('c9'), qu = AT('c9', 'quién');
  scene('sDif', [a - .1, S('c10') - .1, .1, .2, 1.05], `<div style="position:absolute;inset:0;background:#050304"></div>
    <div id="dfA" style="position:absolute;left:64px;top:560px;font:900 92px/1.05 'Inter Var';color:#cfd3d8;opacity:0">LA DIFERENCIA<br>NO ES LA ANTENA.</div>
    <div id="dfB" style="position:absolute;left:64px;top:820px;font:900 130px/1 'Inter Var';color:#ff5148;opacity:0">ES QUIÉN<br>LA OPERA.</div>`);
  RENDER.push(t => { if (!on('sDif')) return; entra('dfA', t, a); golpeT('dfB', t, qu, 1.5); });
}
// ---------- 14 · Día 20: Washington ofrece inversiones si pasa a control argentino ----------
{
  const a = S('c10'), inv = AT('c10', 'inversiones'), ar = AT('c10', 'argentino');
  scene('sOfU', [a - .1, S('c11') - .1, .2, .2, 1.04], `${fondo('#0a1424')}<svg class="full" id="vOu" viewBox="0 0 1080 1920"></svg>${fic('ouF')}
    <div id="ouT" class="pill" style="position:absolute;left:64px;top:400px;background:#1f5f8a;color:#fff;font-size:32px;opacity:0">OFERTA DE WASHINGTON: INVERSIONES</div>
    <div id="ouC" class="pill" style="position:absolute;left:64px;top:1440px;background:#2f8f5b;color:#fff;font-size:34px;opacity:0">SI PASA A CONTROL ARGENTINO</div>`);
  const svg = $('vOu'), fu = el('g', { transform: 'translate(64 500)' }, svg); banderaUS(fu, 240);
  const A = antena(el('g', { transform: 'translate(560 900) scale(.85)' }, svg)), fl = el('g', {}, svg), fA = el('g', {}, fl), fC = el('g', {}, fl); banderaCN(fC, 150); banderaAR(fA, 150);
  const mon = []; for (let i = 0; i < 10; i++) { const g = el('g', { opacity: 0 }, svg); el('circle', { r: 24, fill: '#ffc142', stroke: '#8a6a12', 'stroke-width': 4 }, g); etiqueta(g, '$', 0, 10, { anchor: 'middle', size: 30, w: 800, col: '#5a4410', ls: 0 }); mon.push(g); }
  RENDER.push(t => {
    if (!on('sOfU')) return;
    aparece('ouF', t, a); aparece('ouT', t, inv - .2); aparece('ouC', t, ar - .3);
    A.apuntar(-20 + 6 * Math.sin(t)); const k = eo(P(t, ar - .2, ar + .4));
    fl.setAttribute('transform', 'translate(700 640)'); fC.setAttribute('opacity', 1 - k); fA.setAttribute('opacity', k); fA.setAttribute('transform', `translate(0 ${lerp(-40, 0, k)})`);
    mon.forEach((m, i) => { const u = ((t - inv) * .8 + i / 10) % 1; m.setAttribute('opacity', t > inv - .1 ? 1 - u : 0); m.setAttribute('transform', `translate(${200 + (i * 97) % 700} ${lerp(560, 1120, u)}) rotate(${u * 200})`); });
  });
}
// ---------- 15 · Pekín ofrece lo contrario: más compras y el swap renovado ----------
{
  const a = S('c11'), co = AT('c11', 'compras'), sw = AT('c11', 'swap'), ig = AT('c11', 'igual');
  scene('sOfC', [a - .1, S('c12') - .1, .2, .2, 1.04], `${fondo('#2a0606')}<svg class="full" id="vOc" viewBox="0 0 1080 1920"></svg>${fic('ocF')}
    <div style="position:absolute;left:64px;top:860px;display:flex;flex-direction:column;gap:20px">
      <div id="ocA" class="pill" style="background:#a8322a;color:#fff;font-size:40px;opacity:0">+ MÁS COMPRAS</div><div id="ocB" class="pill" style="background:#a8322a;color:#fff;font-size:40px;opacity:0">+ SWAP RENOVADO</div></div>
    <div id="ocC" class="pill" style="position:absolute;left:64px;top:1440px;background:#222a34;border:1px solid #ffc142;color:#ffc142;font-size:34px;opacity:0">SI TODO SIGUE IGUAL</div>`);
  const fc = el('g', { transform: 'translate(64 420)' }, $('vOc')); banderaCN(fc, 360);
  RENDER.push(t => { if (!on('sOfC')) return; aparece('ocF', t, a); fc.setAttribute('opacity', P(t, a, a + .3)); aparece('ocA', t, co); aparece('ocB', t, sw); aparece('ocC', t, ig - .3); });
}
// ---------- 16 · Sofía vuelve a su turno: dos potencias miran la misma pantalla ----------
{
  const a = S('c12'), po = AT('c12', 'potencias');
  scene('sTur', [a - .1, S('c13') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:#030806"></div>${fic('tuF')}
    <div class="card" style="left:64px;top:430px;width:950px;height:560px;padding:26px;background:#04100b;border-color:#1f5a3a">
      <div class="mono" style="font-size:22px;color:#5ee093;letter-spacing:.16em">REGISTRO DE APUNTAMIENTO · TURNO CONAE</div>
      <div id="tuL" class="mono" style="font-size:28px;line-height:1.75;margin-top:20px;color:#7fd8a4;white-space:pre"></div></div>
    <div id="tuU" class="pill" style="position:absolute;left:64px;top:1440px;background:#1f5f8a;color:#fff;font-size:30px;opacity:0">EE.UU. TAMBIÉN MIRA</div>
    <div id="tuC" class="pill" style="position:absolute;left:64px;top:1510px;background:#a8322a;color:#fff;font-size:30px;opacity:0">CHINA TAMBIÉN MIRA</div>`);
  const L = ['03:10:00  AZ 041.2  EL 38.7  OBJ LUNA  OK', '03:11:00  AZ 041.6  EL 38.9  OBJ LUNA  OK', '03:12:00  AZ 041.9  EL 39.2  OBJ LUNA  OK', '03:13:00  AZ 042.3  EL 39.5  OBJ LUNA  OK', '03:14:00  AZ 042.6  EL 39.8  OBJ LUNA  OK'];
  RENDER.push(t => {
    if (!on('sTur')) return;
    aparece('tuF', t, a); $('tuL').textContent = L.slice(0, 1 + Math.floor(clamp((t - a) / 3) * 4)).join('\n');
    aparece('tuU', t, po - .2); aparece('tuC', t, po + .1);
  });
}
// ---------- 17 · ¿Podría pasar? Cada pieza ya existe ----------
{
  const a = S('c13'), an = AT('c13', 'La antena'), pe = AT('c13', 'El pedido'), pr = AT('c13', 'presión');
  scene('sTab', [a - .1, S('c14') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#14202c,#05080c 70%)"></div>
    <div style="position:absolute;left:90px;top:640px;width:900px;height:900px;perspective:1300px"><div id="tbB" style="position:absolute;inset:0;transform:rotateX(60deg);display:grid;grid-template-columns:repeat(6,1fr);border:6px solid #2a3542">
      ${Array.from({ length: 36 }, (_, i) => `<div style="background:${(i + Math.floor(i / 6)) % 2 ? '#162230' : '#0c141d'}"></div>`).join('')}</div></div>
    <svg class="full" id="vTb" viewBox="0 0 1080 1920"></svg>
    <div id="tbQ" style="position:absolute;left:64px;top:330px;font:900 100px/1 'Inter Var';opacity:0">¿PODRÍA<br><span style="color:#ffc142">PASAR?</span></div>`);
  const svg = $('vTb'), piezas = [];
  [[280, 1040, 'antena', an], [540, 990, 'archivo', pe], [800, 1040, 'US', pr]].forEach(([x, y, k, w]) => {
    const g = el('g', { transform: `translate(${x} ${y})` }, svg);
    el('ellipse', { rx: 80, ry: 20, fill: '#000', opacity: .45 }, g);
    if (k === 'antena') antena(el('g', { transform: 'translate(0 -110) scale(.4)' }, g));
    if (k === 'archivo') archivo(el('g', { transform: 'translate(0 -70) scale(1.3)' }, g), '#ffc142');
    if (k === 'US') { el('rect', { x: -3, y: -150, width: 6, height: 150, fill: '#c9ced4' }, g); banderaUS(el('g', { transform: 'translate(3 -150)' }, g), 120); }
    const ok = el('g', { opacity: 0 }, g); el('circle', { cx: 0, cy: -200, r: 28, fill: '#4fc483' }, ok); el('path', { d: 'M-13,-200 L-3,-189 L15,-211', stroke: '#06140c', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, ok);
    const lb = etiqueta(g, { antena: 'LA ANTENA', archivo: 'EL PEDIDO', US: 'LA PRESIÓN' }[k], 0, 60, { anchor: 'middle', size: 22, col: '#cfd3d8' }); lb.setAttribute('opacity', 0);
    piezas.push({ ok, lb, w });
  });
  RENDER.push(t => {
    if (!on('sTab')) return;
    $('tbB').style.transform = `rotateX(60deg) rotateZ(${lerp(8, -8, P(t, a, S('c14')))}deg)`; entra('tbQ', t, a, 20);
    for (const p of piezas) { const k = P(t, p.w + .2, p.w + .45); p.ok.setAttribute('opacity', k); p.ok.setAttribute('transform', `scale(${lerp(.5, 1, back(k))})`); p.lb.setAttribute('opacity', k); }
  });
}
// ---------- 18 · ¿Vos la cerrarías o la dejarías? ----------
{
  const a = S('c14'), co = AT('c14', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 92px/1.05 'Inter Var';opacity:0">¿LA <span style="color:#ff5148">CERRARÍAS</span><br>O LA <span style="color:#5ee093">DEJARÍAS</span>?</div>
    <div id="cL" style="position:absolute;left:64px;top:640px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 4; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => {
    if (!on('sCom')) return;
    entra('cQ', t, a, 20);
    cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; });
  });
}
// ---------- 19 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a0706,#050304 70%)"></div>
    <div style="position:absolute;left:64px;top:560px;width:840px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">ficción política · escenario hipotético</div>
      <div id="fP" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:10px">¿Y SI<span style="color:var(--red)">…?</span></div>
      <div id="fQ" style="font:700 50px/1.15 'Inter Var';margin-top:34px">Próximo escenario:<br><span style="color:#aab0b8;font-weight:600">vos elegís en los comentarios</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para más</div></div>`);
  RENDER.push(t => {
    if (!on('sFin')) return;
    $('fK').style.opacity = P(t, a, a + .3);
    const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.25, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%';
    $('fQ').style.opacity = P(t, a + .7, a + 1.1); $('fS').style.opacity = P(t, a + 1.3, a + 1.6);
  });
}
});
