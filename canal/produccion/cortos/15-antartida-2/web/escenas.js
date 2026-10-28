// "¿Y si…? La Antártida en 2048" · parte 2 (ficción política con datos reales). Todo animado, sin fotos.
// Lo real: Tratado Antártico (arts. I y IV), Protocolo de Madrid (art. 25: revisión desde 2048, ratificación de los 26 consultivos de 1991, salida a los 3 años),
// Patrulla Antártica Naval Combinada (Argentina y Chile, desde 1998), rompehielos ARA Almirante Irízar. La alianza, la votación y la salida son ficción.

captions([
  ['h1', 'sísmico', 'r'], ['h1', 'tres', 'a'], ['h1', 'después', 'a'], ['h2', 'Ficción', 'r'], ['h2', 'reales', 'g'], ['c1', 'Valentina', 'a'], ['c1', 'hora', 'a'], ['c1', 'rompehielos', 'a'],
  ['c1', 'Irízar', 'a'], ['c2', 'real', 'g'], ['c2', 'prohibido', 'r'], ['c2', 'militar', 'r'], ['c2', 'armas', 'r'], ['c3', 'ciencia', 'g'], ['c3', 'Fuerzas', 'a'], ['c3', 'Armadas', 'a'],
  ['c4', 'nada', 'r'], ['c4', 'reclamo', 'r'], ['c4', 'bebés', 'a'], ['c5', 'quince', 'a'], ['c5', 'inesperado', 'g'], ['c5', 'acuerdo', 'g'], ['c5', 'pierden', 'r'],
  ['c6', 'patrullan', 'a'], ['c6', 'juntos', 'g'], ['c6', 'noventa', 'a'], ['c7', 'define', 'r'], ['c7', 'votación', 'a'], ['c8', 'cada', 'r'], ['c8', 'veintiséis', 'a'],
  ['c8', 'Argentina', 'a'], ['c8', 'Chile', 'a'], ['c8', 'Reino', 'a'], ['c9', 'cualquiera', 'r'], ['c9', 'frenarlo', 'r'], ['c10', 'cuarenta', 'a'], ['c10', 'aprueba', 'g'],
  ['c10', 'no', 'r'], ['c10', 'sigue', 'g'], ['c11', 'salida', 'r'], ['c11', 'tres', 'a'], ['c11', 'irse', 'r'], ['c12', 'después', 'a'], ['c12', 'se', 'r'], ['c12', 'va', 'r'],
  ['c13', 'no', 'r'], ['c13', 'existen', 'g'], ['c14', 'cuarenta', 'a'], ['c14', 'ocho', 'a'], ['c14', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: '¿Y SI…? · PARTE 2', aviso: 'FICCIÓN POLÍTICA · ESCENARIO HIPOTÉTICO', dia: 'DÍA', hide: S('outro') + .2,
  horas: [[S('c1') - .1, '9'], [S('c5') - .1, '15'], [S('c10') - .1, '40'], [S('c12') - .1, '1.135', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const real = (id, top = 330) => pill(id, 'DATO REAL', top, '#2f8f5b');
const fic = (id, top = 330, txt = 'FICCIÓN') => pill(id, txt, top, 'rgba(9,12,17,.85)', 'border:1px solid #ffc142;color:#ffc142;font-size:26px');
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#04060a 72%)"></div>`;
const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
const cruz = (parent, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})`, opacity: 0 }, parent); el('circle', { r: 56, fill: 'none', stroke: '#ff5148', 'stroke-width': 10 }, g); el('path', { d: 'M-40,40 L40,-40', stroke: '#ff5148', 'stroke-width': 10 }, g); return g; };
const PAISES26 = ['ARGENTINA', 'AUSTRALIA', 'BÉLGICA', 'BRASIL', 'CHILE', 'CHINA', 'ECUADOR', 'ESPAÑA', 'EE.UU.', 'FINLANDIA', 'FRANCIA', 'INDIA', 'ITALIA', 'JAPÓN', 'NORUEGA', 'N. ZELANDA',
  'P. BAJOS', 'PERÚ', 'POLONIA', 'REINO UNIDO', 'COREA DEL SUR', 'SUDÁFRICA', 'SUECIA', 'URUGUAY', 'URSS', 'ALEMANIA'];

SETUP.push(() => {
// ---------- 1 · Gancho: 2048, un buque sísmico en el mar que reclaman tres países ----------
{
  const bu = AT('h1', 'buque'), tr = AT('h1', 'tres'), qu = AT('h1', 'Qué');
  scene('sRe', [-1, qu - .1, .01, .1, 0], `<svg class="full" id="vRe" viewBox="0 0 1080 1920"></svg>
    <div id="reY" style="position:absolute;left:64px;top:320px;font:900 200px/1 'Inter Var';letter-spacing:-.04em">20<span style="color:#8fd0ff">48</span></div>
    <div id="reB" class="pill" style="position:absolute;left:64px;top:540px;background:#c3332b;color:#fff;font-size:32px;opacity:0">BUQUE SÍSMICO EN ZONA RECLAMADA</div>`);
  const svg = $('vRe'), M = mapaPolo(svg, { cy: 1100, scale: 1300 }), ss = ['UK', 'CL', 'AR'].map(k => M.sector(k));
  const bl = el('g', {}, M.top), bi = el('g', {}, bl); el('circle', { r: 14, fill: '#ff5148' }, bi); const br = el('circle', { r: 14, fill: 'none', stroke: '#ff5148', 'stroke-width': 4 }, bi);
  const [bx, by] = M.proj([-38, -70]); bl.setAttribute('transform', `translate(${bx} ${by})`);
  const scr = el('g', {}, svg), sweep = radar(scr, 540, 1100, 470);
  RENDER.push(t => {
    if (!on('sRe')) return;
    M.cam(-45, -72, 1.5, 0); sweep(t); bi.setAttribute('transform', `scale(${1 / M.z})`);
    bl.setAttribute('opacity', P(t, bu - .3, bu) * (.6 + .4 * Math.sin(t * 6))); br.setAttribute('r', 14 + 30 * ((t * 1.2) % 1)); br.setAttribute('opacity', 1 - ((t * 1.2) % 1));
    ss.forEach((s, i) => s.setAttribute('opacity', .7 * P(t, tr - .2 + i * .15, tr + i * .15)));
    aparece('reB', t, bu);
  });
}
// ---------- 2 · ¿Qué pasa después? ----------
{
  const a = AT('h1', 'Qué');
  scene('sQue', [a - .1, S('h2') - .1, .05, .1, 1.06], `${fondo('#0a1830')}
    <div id="quT" style="position:absolute;left:64px;top:640px;font:900 130px/1.02 'Inter Var';letter-spacing:-.025em;opacity:0">¿QUÉ PASA<br><span style="color:#8fd0ff">DESPUÉS?</span></div>`);
  RENDER.push(t => { if (!on('sQue')) return; golpeT('quT', t, a, 1.3); });
}
// ---------- 3 · Parte 2 ----------
{
  const a = S('h2');
  scene('sP2', [a - .1, S('c1') - .1, .15, .2, 1.06], `${fondo('#0a1830')}
    <div style="position:absolute;left:64px;top:620px;width:860px"><div id="p2L" style="height:6px;background:#8fd0ff;width:0"></div>
    <div id="p2T" style="font:900 170px/1 'Inter Var';letter-spacing:-.03em;margin-top:26px;opacity:0">PARTE <span style="color:#8fd0ff">2</span></div>
    <div id="p2S" class="lbl" style="position:static;margin-top:18px;font-size:28px;color:#cfd3d8;opacity:0">ficción política · datos reales</div></div>`);
  RENDER.push(t => {
    if (!on('sP2')) return;
    $('p2L').style.width = 860 * eo(P(t, a - .1, a + .4)) + 'px';
    const q = P(t, a, a + .3); $('p2T').style.opacity = q; $('p2T').style.transform = `scale(${lerp(1.2, 1, eo(q))})`; $('p2T').style.transformOrigin = '0 50%';
    $('p2S').style.opacity = P(t, AT('h2', 'Ficción') - .1, AT('h2', 'Ficción') + .3);
  });
}
// ---------- 4 · El reporte de Valentina llega a Buenos Aires en una hora ----------
{
  const a = S('c1'), ho = AT('c1', 'hora');
  scene('sRep', [a - .1, AT('c1', 'y la Argentina') - .1, .2, .15, 0], `<svg class="full" id="vRp" viewBox="0 0 1080 1920"></svg>${fic('rpF')}
    <div id="rpB" style="position:absolute;left:64px;top:400px;width:300px;height:350px;opacity:0">${busto({ ropa: '#c8341f', capucha: '#b02a18', pelo: '#5a3a22', barba: 0, piel: '#e6b796', halo: '#8fd0ff' })}</div>
    <div id="rpH" class="card" style="left:620px;top:420px;padding:16px 24px;opacity:0"><div class="mono" style="font-size:20px;color:#8b919a;letter-spacing:.16em">REPORTE</div><div style="font:900 56px 'Inter Var'">1 HORA</div></div>`);
  const G = globo($('vRp'), { r: 520, cy: 1250, paises: { '032': '#3d6f9e', '010': '#c9d6e2' } });
  const arc = el('path', { fill: 'none', stroke: '#ffc142', 'stroke-width': 5 }, G.top), doc = el('g', {}, G.top); archivoA(doc);
  RENDER.push(t => {
    if (!on('sRep')) return;
    G.update([60, 52, 0]);
    const u = io(P(t, a + .4, ho + .3)); arc.setAttribute('d', arcoGeo(G.path, ANT.marambio, LUGAR.ba, u) || '');
    const p = G.xy(d3.geoInterpolate(ANT.marambio, LUGAR.ba)(u)); doc.setAttribute('opacity', p && t > a + .3 ? 1 : 0); if (p) doc.setAttribute('transform', `translate(${p[0]} ${p[1] - 40}) scale(.8)`);
    aparece('rpF', t, a); $('rpB').style.opacity = P(t, a - .1, a + .3); entra('rpH', t, ho - .3);
  });
}
// ---------- 5 · La Argentina manda al rompehielos Almirante Irízar ----------
{
  const a = AT('c1', 'y la Argentina'), ir = AT('c1', 'Irízar');
  scene('sIri', [a - .1, S('c2') - .1, .15, .2, 1.03], `<svg class="full" id="vIr" viewBox="0 0 1080 1920"></svg>
    <div id="irP" class="pill" style="position:absolute;left:64px;top:400px;background:#2f8f5b;color:#fff;font-size:28px;opacity:0">ROMPEHIELOS ARA ALMIRANTE IRÍZAR · EXISTE</div>`);
  const svg = $('vIr'), d = el('defs', {}, svg), lg = el('linearGradient', { id: 'irC', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#1d3346' }, lg); el('stop', { offset: 1, 'stop-color': '#7d95a8' }, lg);
  el('rect', { x: 0, y: 0, width: 1080, height: 980, fill: 'url(#irC)' }, svg); el('rect', { x: 0, y: 980, width: 1080, height: 940, fill: '#0e2a3c' }, svg);
  const nv = nieve(svg, 120, 13), hielos = [];
  for (let i = 0; i < 9; i++) hielos.push(el('path', { d: `M0,0 L${120 + (i * 37) % 80},-6 L${150 + (i * 23) % 60},14 L10,22 Z`, fill: '#e6eef4', stroke: '#9fb6c9', 'stroke-width': 2 }, svg));
  const bq = el('g', {}, svg); rompehielos(bq);
  RENDER.push(t => {
    if (!on('sIri')) return;
    nv(t); const x = lerp(1250, 520, eo(P(t, a - .1, S('c2') + .2)));
    bq.setAttribute('transform', `translate(${x} ${980 + 4 * Math.sin(t * 1.4)}) scale(-1.1 1.1)`);
    hielos.forEach((h, i) => { const hx = 60 + i * 115, roto = hx > x - 360 && hx < x + 380; h.setAttribute('transform', `translate(${hx + (roto ? (hx < x ? -40 : 40) : 0)} ${984 + (roto ? 18 : 0)}) rotate(${roto ? (i % 2 ? 14 : -12) : 0})`); });
    aparece('irP', t, ir - .4);
  });
}
// ---------- 6 · Dato real: en la Antártida está prohibido todo lo militar ----------
{
  const a = S('c2'), ba = AT('c2', 'bases'), ma = AT('c2', 'maniobras'), ar = AT('c2', 'armas');
  scene('sArt1', [a - .1, S('c3') - .1, .2, .2, 1.03], `${fondo('#0d141b')}<svg class="full" id="vA1" viewBox="0 0 1080 1920"></svg>${real('a1R')}
    <div id="a1C" class="card" style="left:64px;top:420px;width:950px;padding:24px 30px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">TRATADO ANTÁRTICO · ARTÍCULO I</div>
      <div style="font:800 56px/1.15 'Inter Var';margin-top:8px">Solo fines pacíficos: <span style="color:#ff5148">prohibido todo lo militar</span></div></div>`);
  const svg = $('vA1'), its = [];
  [['BASES MILITARES', ba, 'fabrica'], ['MANIOBRAS', ma, 'barco'], ['PRUEBAS DE ARMAS', ar, 'avion']].forEach(([n, w, ic], i) => {
    const x = 200 + i * 340, g = el('g', { opacity: 0 }, svg), ico = icono(g, ic, x, 860, 1.6, '#cfd3d8'); ico.setAttribute('opacity', 1);
    etiqueta(g, n, x, 1000, { anchor: 'middle', size: 22, w: 600 }); its.push({ g, x: cruz(svg, x, 850, 1.5), w });
  });
  RENDER.push(t => {
    if (!on('sArt1')) return;
    aparece('a1R', t, a); entra('a1C', t, a + .1);
    its.forEach(it => { it.g.setAttribute('opacity', P(t, it.w - .4, it.w - .1)); it.x.setAttribute('opacity', P(t, it.w, it.w + .15)); });
  });
}
// ---------- 7 · Se permite usar militares para la ciencia ----------
{
  const a = S('c3'), ci = AT('c3', 'ciencia'), fa = AT('c3', 'Fuerzas');
  scene('sCie', [a - .1, S('c4') - .1, .2, .2, 1.03], `<svg class="full" id="vCi" viewBox="0 0 1080 1920"></svg>${real('ciR')}
    <div id="ciT" class="pill" style="position:absolute;left:64px;top:400px;background:#2f8f5b;color:#fff;font-size:34px;opacity:0">✓ MILITARES PARA LA CIENCIA</div>
    <div id="ciF" class="card" style="left:64px;top:1420px;width:950px;padding:18px 26px;opacity:0"><div style="font:700 38px/1.2 'Inter Var'">La logística de las bases argentinas la hacen las <span style="color:#8fd0ff">Fuerzas Armadas</span></div></div>`);
  const svg = $('vCi'), d = el('defs', {}, svg), lg = el('linearGradient', { id: 'ciC', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  el('stop', { offset: 0, 'stop-color': '#1d3346' }, lg); el('stop', { offset: 1, 'stop-color': '#9fb6c9' }, lg);
  el('rect', { x: 0, y: 0, width: 1080, height: 1100, fill: 'url(#ciC)' }, svg);
  el('path', { d: 'M0,1100 C200,1060 420,1090 600,1070 C800,1050 960,1080 1080,1070 L1080,1920 L0,1920 Z', fill: '#5d7387' }, svg);
  el('path', { d: 'M0,1100 C200,1060 420,1090 600,1070 C800,1050 960,1080 1080,1070 L1080,1120 L0,1140 Z', fill: '#c9d6e2' }, svg);
  el('rect', { x: 120, y: 1105, width: 840, height: 26, fill: '#8a98a6' }, svg);
  for (let i = 0; i < 4; i++) { const b = el('g', { transform: `translate(${220 + i * 120} 1060)` }, svg); el('rect', { x: -40, y: -50, width: 80, height: 50, fill: '#d9a441' }, b); el('path', { d: 'M-46,-50 L0,-80 L46,-50 Z', fill: '#b5843a' }, b); }
  const av = el('g', {}, svg); icono(av, 'avion', 0, 0, 2.2, '#5d6b78').setAttribute('opacity', 1);
  const nv = nieve(svg, 90, 31);
  RENDER.push(t => {
    if (!on('sCie')) return;
    nv(t); const k = io(P(t, a - .1, S('c4'))); av.setAttribute('transform', `translate(${lerp(-200, 980, k)} ${lerp(760, 1060, k * k)}) rotate(${lerp(8, 2, k)})`);
    aparece('ciR', t, a); aparece('ciT', t, ci - .3); entra('ciF', t, fa - .3);
  });
}
// ---------- 8 · Artículo IV: nada de lo que se haga sirve para reforzar un reclamo ----------
{
  const a = S('c4'), na = AT('c4', 'nada'), ba = AT('c4', 'bases'), be = AT('c4', 'bebés');
  scene('sArt4', [a - .1, S('c5') - .1, .2, .2, 1.03], `${fondo('#14100a')}<svg class="full" id="vA4" viewBox="0 0 1080 1920"></svg>${real('a4R')}
    <div id="a4C" class="card" style="left:64px;top:420px;width:950px;padding:24px 30px;opacity:0;border-color:#ffc142"><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.16em">TRATADO ANTÁRTICO · ARTÍCULO IV (EN RESUMEN)</div>
      <div id="a4T" style="font:800 54px/1.16 'Inter Var';margin-top:10px;min-height:190px"></div></div>`);
  const svg = $('vA4'), b1 = el('g', { opacity: 0 }, svg), b2 = el('g', { opacity: 0 }, svg);
  icono(b1, 'fabrica', 330, 900, 2, '#cfd3d8').setAttribute('opacity', 1); etiqueta(b1, 'LAS BASES', 330, 1010, { anchor: 'middle', size: 24, w: 600 });
  el('circle', { cx: 750, cy: 840, r: 34, fill: '#e6b796' }, b2); el('path', { d: 'M690,960 Q690,890 750,885 Q810,890 810,960 Z', fill: '#f2d1d6' }, b2); etiqueta(b2, 'LOS BEBÉS', 750, 1010, { anchor: 'middle', size: 24, w: 600 });
  const x1 = cruz(svg, 330, 880, 1.6), x2 = cruz(svg, 750, 900, 1.6);
  RENDER.push(t => {
    if (!on('sArt4')) return;
    aparece('a4R', t, a); entra('a4C', t, a + .1);
    $('a4T').textContent = typed(t, na - .2, AT('c4', 'reclamo') + .2, 'Nada de lo que se haga mientras rige sirve para reforzar un reclamo.');
    b1.setAttribute('opacity', P(t, ba - .3, ba)); x1.setAttribute('opacity', P(t, ba + .1, ba + .25)); b2.setAttribute('opacity', P(t, be - .3, be)); x2.setAttribute('opacity', P(t, be + .1, be + .25));
  });
}
// ---------- 9 · Día 15: la Argentina, Chile y el Reino Unido se ponen de acuerdo ----------
{
  const a = S('c5'), ac = AT('c5', 'acuerdo');
  scene('sAli', [a - .1, AT('c5', 'Si se abre') - .1, .2, .15, 0], `<svg class="full" id="vAl" viewBox="0 0 1080 1920"></svg>${fic('alF')}
    <div id="alT" class="pill" style="position:absolute;left:64px;top:400px;background:#8a5a12;color:#fff;font-size:32px;opacity:0">ALIANZA INESPERADA</div>`);
  const M = mapaPolo($('vAl'), { cy: 1150, scale: 1300 }), sA = M.sector('AR', { opacity: 1 }), sC = M.sector('CL', { opacity: 1 }), sU = M.sector('UK', { opacity: 1 });
  const uni = el('path', { d: M.path(sectorGeo(-90, -20)), fill: '#ffc142', 'fill-opacity': .25, stroke: '#ffc142', 'stroke-width': 5, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, M.sec);
  RENDER.push(t => {
    if (!on('sAli')) return;
    M.cam(-55, -78, 1.25, 120);
    const k = eo(P(t, ac - .4, ac + .4));
    [[sA, '#74acdf'], [sC, '#e0433a'], [sU, '#3a5fb0']].forEach(([s]) => s.setAttribute('opacity', 1 - .8 * k));
    uni.setAttribute('opacity', k);
    aparece('alF', t, a); aparece('alT', t, AT('c5', 'inesperado'));
  });
}
// ---------- 10 · Si se abre la minería, los tres pierden ----------
{
  const a = AT('c5', 'Si se abre'), pi = AT('c5', 'pierden');
  scene('sPie', [a - .1, S('c6') - .1, .1, .2, 1.04], `${fondo('#1a0a08')}<svg class="full" id="vPi" viewBox="0 0 1080 1920"></svg>
    <div id="piT" style="position:absolute;left:64px;top:330px;font:900 92px/1.05 'Inter Var';opacity:0">SI SE ABRE<br>LA MINERÍA…</div>
    <div id="piP" style="position:absolute;left:64px;top:1440px;font:900 100px/1 'Inter Var';color:#ff5148;opacity:0">LOS TRES PIERDEN</div>`);
  const svg = $('vPi'), fs = [banderaAR, banderaCL, banderaUK].map((f, i) => { const g = el('g', {}, svg); f(g, 260); const fl = el('path', { d: 'M130,250 L130,400 M90,360 L130,400 L170,360', stroke: '#ff5148', 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round', opacity: 0 }, g); return { g, fl, i }; });
  RENDER.push(t => {
    if (!on('sPie')) return;
    entra('piT', t, a); golpeT('piP', t, pi, 1.3);
    fs.forEach(f => { f.g.setAttribute('transform', `translate(${64 + f.i * 340} ${700 + 60 * eo(P(t, pi, pi + .5))})`); f.fl.setAttribute('opacity', P(t, pi - .2, pi + .1)); });
  });
}
// ---------- 11 · Dato real: la Patrulla Antártica Naval Combinada, desde 1998 ----------
{
  const a = S('c6'), no = AT('c6', 'noventa');
  scene('sPan', [a - .1, S('c7') - .1, .2, .2, 0], `<svg class="full" id="vPa" viewBox="0 0 1080 1920"></svg>${real('paR')}
    <div id="paC" class="card" style="left:64px;top:400px;width:950px;padding:20px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#8b919a;letter-spacing:.16em">ARGENTINA Y CHILE · CADA VERANO · <span id="paY">1998</span></div>
      <div style="font:800 50px/1.15 'Inter Var';margin-top:6px">Patrulla Antártica Naval Combinada</div></div>`);
  const M = mapaPolo($('vPa'), { cy: 1150, scale: 1300 });
  const ruta = [[-56.6, -62.4], [-58.5, -62.6], [-61, -63.5], [-64, -64.8], [-66.5, -66.5], [-63.5, -66], [-60.5, -64.9], [-57.5, -63.9], [-56, -63], [-56.6, -62.4]];
  const lin = el('path', { d: M.path({ type: 'LineString', coordinates: ruta }), fill: 'none', stroke: '#ffc142', 'stroke-width': 3, 'stroke-dasharray': '10 8', 'vector-effect': 'non-scaling-stroke' }, M.top);
  const L = lin.getTotalLength(), bAR = el('g', {}, M.top), bCL = el('g', {}, M.top); iconoBarco(bAR, '#74acdf', 2.4); iconoBarco(bCL, '#e0433a', 2.4);
  RENDER.push(t => {
    if (!on('sPan')) return;
    M.cam(-60, -64.4, 5.2, -260);
    [[bAR, 0], [bCL, .5]].forEach(([b, o]) => { const u = ((t - a) * .08 + o) % 1, p = lin.getPointAtLength(L * u), q = lin.getPointAtLength(L * Math.min(1, u + .01)); b.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${1 / M.z}) rotate(${Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI})`); });
    aparece('paR', t, a); entra('paC', t, a + .2); lin.setAttribute('stroke-dashoffset', -t * 20 / M.z);
  });
}
// ---------- 12 · El dato que define todo ----------
{
  const a = S('c7');
  scene('sDef', [a - .1, AT('c7', 'Para levantar') - .1, .1, .15, 1.08], `${fondo('#0a2015')}
    <div id="deT" style="position:absolute;left:64px;right:64px;top:600px;font:900 128px/1.02 'Inter Var';letter-spacing:-.02em;opacity:0">EL DATO QUE<br><span style="color:#5ee093">DEFINE</span><br>TODO</div>`);
  RENDER.push(t => { if (!on('sDef')) return; golpeT('deT', t, a, 1.3); });
}
// ---------- 13 · No alcanza con una votación ----------
{
  const a = AT('c7', 'Para levantar'), vo = AT('c7', 'votación');
  scene('sVot', [a - .1, S('c8') - .1, .15, .15, 1.04], `${fondo('#0d141b')}<svg class="full" id="vVo" viewBox="0 0 1080 1920"></svg>
    <div id="voT" style="position:absolute;left:64px;top:330px;font:900 92px/1.05 'Inter Var';opacity:0">LEVANTAR LA<br><span style="color:#ff5148">PROHIBICIÓN</span></div>
    <div id="voN" class="pill" style="position:absolute;left:64px;top:1440px;background:#c3332b;color:#fff;font-size:38px;opacity:0">UNA VOTACIÓN NO ALCANZA</div>`);
  const svg = $('vVo'), urna = el('g', { transform: 'translate(540 900)' }, svg);
  el('rect', { x: -170, y: -110, width: 340, height: 260, rx: 16, fill: '#1d2530', stroke: '#8fd0ff', 'stroke-width': 6 }, urna); el('rect', { x: -90, y: -122, width: 180, height: 20, rx: 6, fill: '#05080c' }, urna);
  etiqueta(urna, 'VOTO', 0, 40, { anchor: 'middle', size: 40, w: 800, col: '#8fd0ff' });
  const pap = el('rect', { x: -60, y: -260, width: 120, height: 150, fill: '#e9e6df' }, urna);
  RENDER.push(t => {
    if (!on('sVot')) return;
    entra('voT', t, a); const k = eo(P(t, a + .3, vo)); pap.setAttribute('y', lerp(-300, -140, k)); pap.setAttribute('opacity', 1 - P(t, vo, vo + .2));
    aparece('voN', t, vo);
  });
}
// ---------- 14 · Lo tienen que ratificar los 26 países con voto en 1991 ----------
{
  const a = S('c8'), vs = AT('c8', 'veintiséis'), en = AT('c8', 'Entre');
  scene('s26', [a - .1, S('c9') - .1, .2, .2, 1.03], `${fondo('#0d141b')}${real('26R')}
    <div class="mono" style="position:absolute;left:64px;top:400px;font-size:26px;letter-spacing:.16em;color:#8b919a">PROTOCOLO DE MADRID · ARTÍCULO 25</div>
    <div id="26N" style="position:absolute;left:64px;top:440px;font:900 70px/1.05 'Inter Var';opacity:0"><span id="26C" style="color:#ffc142">0</span> PAÍSES<br>CON VOTO EN 1991</div>
    <div style="position:absolute;left:64px;right:64px;top:630px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">${PAISES26.map((p, i) => `<div class="p26 mono" style="font-size:19px;padding:12px 8px;text-align:center;border-radius:8px;background:#1a202a;color:#cfd3d8;opacity:0">${p}</div>`).join('')}</div>`);
  const ps = [...document.querySelectorAll('#s26 .p26')], AR = ['ARGENTINA', 'CHILE', 'REINO UNIDO'];
  RENDER.push(t => {
    if (!on('s26')) return;
    aparece('26R', t, a); $('26N').style.opacity = P(t, a + .2, a + .5);
    const k = P(t, a + .4, vs + .3); $('26C').textContent = Math.round(26 * k);
    ps.forEach((p, i) => { p.style.opacity = P(t, a + .4 + i * (vs - a) / 26, a + .6 + i * (vs - a) / 26); const hi = AR.includes(PAISES26[i]) && t > en; p.style.background = hi ? '#c3332b' : '#1a202a'; p.style.color = hi ? '#fff' : '#cfd3d8'; p.style.transform = hi ? 'scale(1.08)' : ''; });
  });
}
// ---------- 15 · Cualquiera de los tres puede frenarlo ----------
{
  const a = S('c9');
  scene('sFre', [a - .1, S('c10') - .1, .1, .15, 1.05], `${fondo('#1a0a08')}<svg class="full" id="vFr" viewBox="0 0 1080 1920"></svg>
    <div id="frT" style="position:absolute;left:64px;top:330px;font:900 92px/1.05 'Inter Var';opacity:0">CUALQUIERA<br>PUEDE <span style="color:#ff5148">FRENARLO</span></div>`);
  const svg = $('vFr'), fs = [banderaAR, banderaCL, banderaUK].map((f, i) => { const g = el('g', { opacity: 0 }, svg); f(g, 260); const s = el('g', { transform: 'translate(130 270)' }, g);
    el('polygon', { points: '-50,-20 -20,-50 20,-50 50,-20 50,20 20,50 -20,50 -50,20', fill: '#c3332b', stroke: '#fff', 'stroke-width': 5 }, s); etiqueta(s, 'NO', 0, 12, { anchor: 'middle', size: 34, w: 900, ls: 0 }); return { g, i }; });
  RENDER.push(t => { if (!on('sFre')) return; entra('frT', t, a); fs.forEach(f => { const q = P(t, a + f.i * .2, a + .25 + f.i * .2); f.g.setAttribute('opacity', q); f.g.setAttribute('transform', `translate(${64 + f.i * 340} ${lerp(760, 700, eo(q))})`); }); });
}
// ---------- 16 · Día 40: se aprueba, la Argentina no ratifica, la prohibición sigue ----------
{
  const a = S('c10'), ap = AT('c10', 'aprueba'), ra = AT('c10', 'ratifica'), si = AT('c10', 'sigue');
  scene('s40', [a - .1, S('c11') - .1, .2, .2, 1.03], `${fondo('#0d141b')}${fic('40F')}
    <div style="position:absolute;left:64px;top:460px;width:950px;display:flex;flex-direction:column;gap:22px">
      <div id="40A" class="card" style="position:static;padding:22px 28px;font:800 48px 'Inter Var';opacity:0"><span style="color:#5ee093">✓</span> CAMBIO APROBADO</div>
      <div id="40B" class="card" style="position:static;padding:22px 28px;font:800 48px 'Inter Var';opacity:0"><span style="color:#ff5148">✕</span> RATIFICACIÓN ARGENTINA</div></div>
    <div id="40S" style="position:absolute;left:300px;top:1440px;padding:16px 30px;border:8px solid #5ee093;color:#5ee093;font:900 60px/1 'Inter Var';opacity:0">LA PROHIBICIÓN SIGUE</div>`);
  RENDER.push(t => { if (!on('s40')) return; aparece('40F', t, a); entra('40A', t, ap - .2); entra('40B', t, ra - .3); sello('40S', t, si); });
}
// ---------- 17 · Dato real: la salida del protocolo a los tres años ----------
{
  const a = S('c11'), sa = AT('c11', 'salida'), tr = AT('c11', 'tres'), ir = AT('c11', 'irse');
  scene('sSal', [a - .1, S('c12') - .1, .2, .2, 1.03], `${fondo('#14100a')}<svg class="full" id="vSa" viewBox="0 0 1080 1920"></svg>${real('saR')}
    <div id="saC" class="card" style="left:64px;top:400px;width:950px;padding:22px 28px;opacity:0;border-color:#ffc142"><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.16em">ARTÍCULO 25 · LA SALIDA</div>
      <div style="font:800 46px/1.18 'Inter Var';margin-top:8px">Si el cambio no entra en vigor en <span style="color:#ffc142">3 años</span>, cualquier país puede <span style="color:#ff5148">retirarse</span></div></div>`);
  const svg = $('vSa'), barra = el('rect', { x: 120, y: 960, width: 0, height: 22, rx: 11, fill: '#ffc142' }, svg); el('rect', { x: 120, y: 960, width: 600, height: 22, rx: 11, fill: 'none', stroke: '#5d6672', 'stroke-width': 3 }, svg);
  [0, 1, 2, 3].forEach(i => etiqueta(svg, i ? `AÑO ${i}` : 'HOY', 120 + i * 200, 1030, { anchor: 'middle', size: 20, col: '#8b919a' }));
  const pu = el('g', { transform: 'translate(860 870)', opacity: 0 }, svg); el('rect', { x: -70, y: -150, width: 140, height: 300, fill: '#0b1a12', stroke: '#5ee093', 'stroke-width': 6 }, pu);
  const hoja = el('rect', { x: -70, y: -150, width: 140, height: 300, fill: '#2f8f5b' }, pu); etiqueta(pu, 'SALIDA', 0, -170, { anchor: 'middle', size: 26, w: 800, col: '#5ee093' });
  RENDER.push(t => {
    if (!on('sSal')) return;
    aparece('saR', t, a); entra('saC', t, a + .1); barra.setAttribute('width', 600 * io(P(t, tr - .3, ir - .3)));
    pu.setAttribute('opacity', P(t, sa - .2, sa + .2)); hoja.setAttribute('transform', `scale(${lerp(1, .25, eo(P(t, ir - .2, ir + .4)))} 1)`);
  });
}
// ---------- 18 · Tres años después, el primero en irse es el que pidió la conferencia ----------
{
  const a = S('c12'), pr = AT('c12', 'primero'), va = AT('c12', 'va');
  scene('sVa', [a - .1, S('c13') - .1, .2, .2, 0], `<svg class="full" id="vVa" viewBox="0 0 1080 1920"></svg>${fic('vaF')}
    <div id="vaT" class="pill" style="position:absolute;left:64px;top:400px;background:#c3332b;color:#fff;font-size:32px;opacity:0">EL QUE PIDIÓ LA REVISIÓN SE VA DEL PROTOCOLO</div>`);
  const M = mapaPolo($('vVa'), { cy: 1050, scale: 1250 }), ss = ['UK', 'CL', 'AR'].map(k => M.sector(k, { opacity: .5 }));
  const bq = el('g', {}, M.top), bi = el('g', {}, bq); iconoBarco(bi, '#ff5148', 3); const est = el('path', { fill: 'none', stroke: '#ff5148', 'stroke-width': 3, 'stroke-dasharray': '8 8', 'vector-effect': 'non-scaling-stroke' }, M.top);
  const r0 = [-38, -70], r1 = [-10, -55];
  RENDER.push(t => {
    if (!on('sVa')) return;
    M.cam(-35, -68, 1.5, 0);
    const k = io(P(t, pr - .3, S('c13'))), ll = d3.geoInterpolate(r0, r1)(k), [x, y] = M.proj(ll), [x2, y2] = M.proj(d3.geoInterpolate(r0, r1)(Math.min(1, k + .02)));
    bq.setAttribute('transform', `translate(${x} ${y})`); bi.setAttribute('transform', `scale(${1 / M.z}) rotate(${Math.atan2(y2 - y, x2 - x) * 180 / Math.PI})`);
    est.setAttribute('d', arcoGeo(M.path, r0, ll, 1) || '');
    aparece('vaF', t, a); aparece('vaT', t, va - .3);
  });
}
// ---------- 19 · ¿Podría pasar? Hoy, no. Pero la fecha, los reclamos y los barcos ya existen ----------
{
  const a = S('c13'), ho = AT('c13', 'Hoy'), fe = AT('c13', 'fecha'), re = AT('c13', 'reclamos'), ba = AT('c13', 'barcos');
  scene('sTab', [a - .1, S('c14') - .1, .2, .2, 1.05], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#14202c,#05080c 70%)"></div>
    <div style="position:absolute;left:90px;top:640px;width:900px;height:900px;perspective:1300px"><div id="tbB" style="position:absolute;inset:0;transform:rotateX(60deg);display:grid;grid-template-columns:repeat(6,1fr);border:6px solid #2a3542">
      ${Array.from({ length: 36 }, (_, i) => `<div style="background:${(i + Math.floor(i / 6)) % 2 ? '#162230' : '#0c141d'}"></div>`).join('')}</div></div>
    <svg class="full" id="vTb" viewBox="0 0 1080 1920"></svg>
    <div id="tbN" style="position:absolute;left:64px;top:330px;font:900 110px/1 'Inter Var';opacity:0">HOY, <span style="color:#ff5148">NO</span></div>`);
  const svg = $('vTb'), piezas = [];
  [[280, 1040, 'fecha', fe], [540, 990, 'reclamos', re], [800, 1040, 'barcos', ba]].forEach(([x, y, k, w]) => {
    const g = el('g', { transform: `translate(${x} ${y})` }, svg);
    el('ellipse', { rx: 80, ry: 20, fill: '#000', opacity: .45 }, g);
    if (k === 'fecha') { el('rect', { x: -60, y: -150, width: 120, height: 120, rx: 10, fill: '#e9e6df' }, g); el('rect', { x: -60, y: -150, width: 120, height: 34, rx: 10, fill: '#c3332b' }, g); etiqueta(g, '2048', 0, -58, { anchor: 'middle', size: 34, w: 900, col: '#0b1015', ls: 0 }); }
    if (k === 'reclamos') { banderaAR(el('g', { transform: 'translate(-70 -170) scale(.5)' }, g), 140); banderaCL(el('g', { transform: 'translate(-20 -130) scale(.5)' }, g), 140); banderaUK(el('g', { transform: 'translate(-60 -90) scale(.5)' }, g), 140); }
    if (k === 'barcos') buqueSismico(el('g', { transform: 'translate(0 -40) scale(.32)' }, g));
    const ok = el('g', { opacity: 0 }, g); el('circle', { cx: 0, cy: -210, r: 28, fill: '#4fc483' }, ok); el('path', { d: 'M-13,-210 L-3,-199 L15,-221', stroke: '#06140c', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, ok);
    const lb = etiqueta(g, { fecha: 'LA FECHA', reclamos: 'LOS RECLAMOS', barcos: 'LOS BARCOS' }[k], 0, 60, { anchor: 'middle', size: 22, col: '#cfd3d8' }); lb.setAttribute('opacity', 0);
    piezas.push({ ok, lb, w });
  });
  RENDER.push(t => {
    if (!on('sTab')) return;
    $('tbB').style.transform = `rotateX(60deg) rotateZ(${lerp(8, -8, P(t, a, S('c14')))}deg)`;
    const q = P(t, ho - .1, ho + .2); $('tbN').style.opacity = q * (1 - .5 * P(t, fe - .2, fe + .2));
    for (const p of piezas) { const k = P(t, p.w, p.w + .25); p.ok.setAttribute('opacity', k); p.ok.setAttribute('transform', `scale(${lerp(.5, 1, back(k))})`); p.lb.setAttribute('opacity', k); }
  });
}
// ---------- 20 · ¿Qué creés que pasa en 2048? ----------
{
  const a = S('c14'), co = AT('c14', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .2, .2, 1.04], `<div style="position:absolute;inset:0;background:linear-gradient(#0a0e16,#05070a)"></div>
    <div id="cQ" style="position:absolute;left:64px;top:330px;font:900 92px/1.05 'Inter Var';opacity:0">¿QUÉ PASA<br>EN <span style="color:#8fd0ff">2048</span>?</div>
    <div id="cL" style="position:absolute;left:64px;top:640px;width:820px"></div>`);
  const L = $('cL');
  for (let i = 0; i < 4; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b', '#3fa0e0'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => { if (!on('sCom')) return; entra('cQ', t, a, 20); cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; }); });
}
// ---------- 21 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#0a1830,#030508 70%)"></div>
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
