// "Pasó de verdad" · Beagle 1978, parte 2: qué decía el plan si nadie llamaba, y cómo terminó.
// Historia real. El plan sale de reconstrucciones publicadas (Clarín 1998; Madrid Murúa 2003; Arancibia Clavel y Bulnes Serrano 2004; Manfredi 2015).
// Las flechas y líneas sobre los mapas son esquemas aproximados de esos planes; fotos en ../13-beagle-1/web/img/fotos.json.

captions([
  ['h1', 'veintidós', 'r'], ['h1', 'horarios', 'a'], ['h2', 'libros', 'a'], ['h2', 'diarios', 'a'], ['c1', 'ocho', 'r'], ['c1', 'Hornos', 'a'], ['c2', 'diez', 'r'], ['c2', 'Picton', 'a'],
  ['c2', 'Lennox', 'a'], ['c3', 'medianoche', 'r'], ['c3', 'Punta', 'a'], ['c3', 'Arenas', 'a'], ['c4', 'seis', 'r'], ['c4', 'tierra', 'a'], ['c5', 'Mendoza', 'a'], ['c5', 'Menéndez', 'a'],
  ['c5', 'Santiago', 'r'], ['c5', 'Valparaíso', 'r'], ['c6', 'minado', 'r'], ['c6', 'defensa', 'a'], ['c7', 'Raúl', 'a'], ['c7', 'López', 'a'], ['c8', 'doscientos', 'r'], ['c9', 'treinta', 'r'],
  ['c9', 'cincuenta', 'r'], ['c10', 'Perú', 'a'], ['c10', 'Bolivia', 'a'], ['c10', 'Brasil', 'a'], ['c11', 'Papa', 'a'], ['c12', 'seis', 'a'], ['c12', 'ochenta', 'r'], ['c13', 'Chile', 'a'],
  ['c13', 'mar', 'a'], ['c14', 'Samoré', 'r'], ['c15', 'llamaba', 'r'], ['c15', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'PLAN', hide: S('c15') - .1,
  horas: [[2.6, '22/12/1978', true], [S('c1') - .1, '20:00 · H-2', true], [S('c2') - .1, '22:00 · H', true], [S('c3') - .1, '00:00 · H+2', true], [S('c4') - .1, '06:00 · H+8', true],
    [S('c5') - .1, 'DESPUÉS'], [S('c6') - .1, 'CHILE'], [S('c11') - .1, 'ENE 1979'], [S('c12') - .1, '1984'], [S('c14') - .1, 'HOY']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('BEAGLE<br><span class="r">1978</span>', { sup: 'PARTE 2' });

const V = (a, b, z = 1.03) => [a - .1, b - .1, .18, .18, z];
const AF = (id, f) => AT(id, f) - .15;
const ARG = '#7cc4f5', CHI = '#ff6a3d';
const LL = { picton: [-66.95, -55.03], nueva: [-66.54, -55.22], lennox: [-66.94, -55.27], hornos: [-67.27, -55.98], estados: [-64.28, -54.78], williams: [-67.61, -54.93],
  riogrande: [-67.7, -53.79], gallegos: [-69.22, -51.62], parenas: [-70.91, -53.16], natales: [-72.51, -51.73], chabunco: [-70.85, -53.0] };
const ISLAS = [['PICTON', LL.picton], ['NUEVA', LL.nueva], ['LENNOX', LL.lennox]];
const islaDe = ll => FUEGO.land.features.find(f => d3.geoContains(f, ll));
function mapaSur(sid, o) {
  const M = mapaZona($(sid), FUEGO, { titulo: o.titulo, km: o.km || 20, paso: o.paso || .5, centro: o.centro, ancho: o.ancho });
  M.isla = (ll, col) => { const f = islaDe(ll); return f ? el('path', { d: M.path(f), fill: col, stroke: '#050505', 'stroke-width': 1.5, opacity: 0 }, M.g) : el('g', {}, M.g); };
  M.lugar = (ll, txt, o2 = {}) => { const [x, y] = M.proj(ll); const m = marca(M.g, x, y, { col: o2.col || '#ece8e1' }); const r = rotulo(M.g, x + (o2.anchor === 'end' ? -24 : 24), y + 8, txt, { size: o2.size || 18, col: o2.col || '#ece8e1', anchor: o2.anchor }); return { m, r, x, y, ver(q) { m.g.setAttribute('opacity', q); r.setAttribute('opacity', q); } }; };
  M.buque = (ll, col, s = .42) => { const [x, y] = M.proj(ll); return icono(M.g, 'barco', x, y, s, col); };
  M.flecha = (a, b, col = ARG, curva) => { const p = M.proj(a), q = M.proj(b); return trazo(M.g, [p, q], { col, w: 6, punto: 10, curva: curva ? [(p[0] + q[0]) / 2 + curva[0], (p[1] + q[1]) / 2 + curva[1]] : null }); };
  M.leyenda = () => { const g = el('g', { transform: 'translate(64 1080)' }, $(sid)); [[ARG, 'ARGENTINA'], [CHI, 'CHILE']].forEach(([c, t], i) => { el('rect', { x: i * 250, y: -16, width: 22, height: 22, fill: c }, g); const tx = el('text', { x: i * 250 + 32, y: 2, fill: '#ece8e1', 'font-family': 'IBM Plex Mono', 'font-size': 20 }, g); tx.textContent = t; }); return g; };
  return M;
}
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#050505 70%)"></div>`;
const reloj = (id, h, sub) => `<div style="position:absolute;right:70px;top:930px;text-align:right;text-shadow:0 0 30px #000"><div class="cbig" id="${id}" style="font-size:140px;color:#ff2a2a">${h}</div><div class="osw" style="font-size:28px;letter-spacing:.3em">${sub}</div></div>`;

SETUP.push(() => {
// ---------- 1 · El plan, hora por hora ----------
{
  const a = 0, b = S('h2');
  const H = [['20:00', 'ISLAS DEL CABO DE HORNOS'], ['22:00', 'PICTON, NUEVA Y LENNOX'], ['00:00', 'AVANCE SOBRE PUNTA ARENAS'], ['06:00', 'ATAQUE AÉREO'], ['DESPUÉS', 'LA CORDILLERA']];
  scene('sPla', [-1, b - .1, .01, .18, 1.03], `${fondo('#160404')}
    ${H.map(([h, d], i) => `<div class="pH" data-t="${2.9 + i * .45}" style="position:absolute;left:64px;right:64px;top:${400 + i * 140}px;height:120px;border-left:8px solid #c8101b;background:rgba(20,10,10,.85);display:flex;align-items:center;gap:30px;padding:0 24px;opacity:0">
      <div class="cbig" style="font-size:84px;color:#ff2a2a;width:300px">${h}</div><div class="cbig" style="font-size:46px">${d}</div></div>`).join('')}`);
  const hs = [...document.querySelectorAll('#sPla .pH')];
  RENDER.push(t => { if (on('sPla')) hs.forEach(h => { const q = P(t, +h.dataset.t, +h.dataset.t + .25); h.style.opacity = q; h.style.transform = `translateX(${lerp(-60, 0, eo(q))}px)`; }); });
}
{
  const a = S('h2'), b = S('c1');
  const F = [['CLARÍN', 'Diario · 20 de diciembre de 1998'], ['LA ESCUADRA EN ACCIÓN', 'Libro · Chile, 2004'], ['MEMORIAL DEL EJÉRCITO DE CHILE', 'Revista · 2003'], ['MANFREDI', 'Libro · Argentina, 2015']];
  scene('sFue', V(a, b), `${fondo('#16120c')}<div class="osw" style="position:absolute;left:64px;top:390px;font-size:30px;letter-spacing:.3em;color:#8a8a8a">CÓMO SE SUPO</div>
    ${F.map(([t, d], i) => `<div class="fF" data-t="${a + .2 + i * .35}" style="position:absolute;left:${80 + (i % 2) * 40}px;right:${80 - (i % 2) * 40}px;top:${450 + i * 150}px;height:130px;background:#efe9da;color:#111;padding:18px 26px;box-shadow:0 20px 50px rgba(0,0,0,.7);transform:rotate(${i % 2 ? 1.5 : -1.5}deg);opacity:0">
      <div class="cbig" style="font-size:54px;color:#111">${t}</div><div class="mono" style="font-size:20px;color:#555">${d}</div></div>`).join('')}`);
  const fs = [...document.querySelectorAll('#sFue .fF')];
  RENDER.push(t => { if (on('sFue')) fs.forEach(f => f.style.opacity = P(t, +f.dataset.t, +f.dataset.t + .2)); });
}
// ---------- 2 · 20:00 y 22:00: las islas ----------
{
  const a = S('c1'), b = S('c2');
  scene('sH20', V(a, b, 0), `<svg class="full" id="h20S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema del plan</div>${reloj('r20', '20:00', 'H-2')}`);
  const M = mapaSur('h20S', { centro: [-66.6, -55.6], ancho: 3.6, titulo: 'H-2 · ISLAS DEL CABO DE HORNOS', km: 20, paso: .5 });
  const g = M.lugar([-67.25, -55.85], 'ISLAS DEL CABO DE HORNOS', { col: '#ff5050', anchor: 'end' }), bs = [[-65.6, -55.75], [-65.4, -55.95]].map(ll => M.buque(ll, ARG));
  const fl = [[[-65.7, -55.8], [-67.0, -55.82]], [[-65.5, -56.0], [-67.1, -55.98]]].map(([p, q]) => M.flecha(p, q, ARG, [0, 30])); M.leyenda();
  RENDER.push(t => { if (!on('sH20')) return; bs.forEach(x => x.setAttribute('opacity', 1)); fl.forEach((f, i) => f.draw(io(P(t, a + .3 + i * .3, a + 2 + i * .3)))); g.ver(P(t, AF('c1', 'Hornos'), AF('c1', 'Hornos') + .3)); g.m.pulso(t); });
}
{
  const a = S('c2'), b = S('c3');
  scene('sH22', V(a, b, 0), `<svg class="full" id="h22S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema del plan</div>${reloj('r22', '22:00', 'HORA H')}`);
  const M = mapaSur('h22S', { centro: [-66.85, -55.12], ancho: 1.8, titulo: 'HORA H · BOCA DEL BEAGLE', km: 10, paso: .25 });
  const is = ISLAS.map(([n, ll]) => ({ p: M.isla(ll, '#ff2a2a'), l: M.lugar(ll, n, { col: '#ff5050', anchor: n === 'NUEVA' ? 'start' : 'end' }), n }));
  const fl = [[[-66.1, -55.0], [-66.85, -55.03]], [[-66.0, -55.3], [-66.45, -55.23]], [[-66.2, -55.42], [-66.85, -55.3]]].map(([p, q]) => M.flecha(p, q)); M.leyenda();
  RENDER.push(t => { if (!on('sH22')) return; is.forEach((o, i) => { const w = AF('c2', o.n === 'PICTON' ? 'Picton' : o.n === 'NUEVA' ? 'Nueva' : 'Lennox'); o.p.setAttribute('opacity', P(t, w - .1, w + .2) * .8); o.l.ver(P(t, w - .1, w + .2)); o.l.m.pulso(t); fl[i].draw(io(P(t, w - .4, w + .3))); }); });
}
// ---------- 3 · 00:00 y 06:00: Punta Arenas y la aviación ----------
{
  const a = S('c3'), b = S('c4');
  scene('sH24', V(a, b, 0), `<svg class="full" id="h24S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema del plan</div>${reloj('r24', '00:00', 'H+2')}`);
  const M = mapaSur('h24S', { centro: [-70.6, -52.5], ancho: 5.5, titulo: 'H+2 · V CUERPO DE EJÉRCITO', km: 50, paso: .5 });
  const sc = M.lugar(LL.gallegos, 'SANTA CRUZ', { col: ARG }), pa = M.lugar(LL.parenas, 'PUNTA ARENAS', { col: CHI, anchor: 'end' }), pn = M.lugar(LL.natales, 'PUERTO NATALES', { col: CHI });
  const f1 = M.flecha([-69.4, -51.75], [-70.8, -53.05], ARG, [-30, -20]), f2 = M.flecha([-69.6, -51.6], [-72.3, -51.72], ARG, [0, -40]); M.leyenda();
  RENDER.push(t => { if (!on('sH24')) return; sc.ver(1); sc.m.pulso(t); pa.ver(P(t, AF('c3', 'Punta'), AF('c3', 'Punta') + .3)); pn.ver(P(t, AF('c3', 'Natales'), AF('c3', 'Natales') + .3)); f1.draw(io(P(t, AF('c3', 'avanzar'), AF('c3', 'Punta') + .4))); f2.draw(io(P(t, AF('c3', 'Natales') - .3, AF('c3', 'Natales') + .6))); });
}
{
  const a = S('c4'), b = S('c5');
  scene('sH06', V(a, b, 0), `<svg class="full" id="h06S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema del plan</div>${reloj('r06', '06:00', 'H+8')}
    <div id="h6P" class="cpill" style="position:absolute;left:64px;top:440px;opacity:0">Destruir la aviación chilena en tierra</div>`);
  const M = mapaSur('h06S', { centro: [-68.8, -53.8], ancho: 6.5, titulo: 'H+8 · FUERZA AÉREA', km: 50, paso: .5 });
  const ob = [[LL.chabunco, 'PUNTA ARENAS'], [LL.williams, 'PUERTO WILLIAMS']].map(([ll, n]) => M.lugar(ll, n, { col: CHI, anchor: 'end' }));
  const av = [[LL.riogrande, LL.williams], [LL.gallegos, LL.chabunco]].map(([p, q]) => M.flecha(p, q, ARG, [40, -30])); const pl = M.lugar(LL.riogrande, 'RÍO GRANDE', { col: ARG }); M.leyenda();
  RENDER.push(t => { if (!on('sH06')) return; pl.ver(1); ob.forEach(o => { o.ver(1); o.m.pulso(t); }); av.forEach((f, i) => f.draw(io(P(t, a + .3 + i * .3, a + 1.8 + i * .3)))); $('h6P').style.opacity = P(t, AF('c4', 'atacar'), AF('c4', 'atacar') + .3); });
}
// ---------- 4 · La cordillera ----------
textosC('sMen', V(S('c5'), AF('c5', 'iba a cruzar'), 1.05), [
  { t: AF('c5', 'Mendoza'), html: '<span style="font-size:.35em;letter-spacing:.3em;color:#8a8a8a">DESDE MENDOZA</span>', size: 100, top: 400 },
  { t: AF('c5', 'Tercer'), html: 'III CUERPO<br>DE EJÉRCITO', size: 150, top: 480 },
  { t: AF('c5', 'Luciano'), html: '<span class="r" style="font-size:.6em">LUCIANO BENJAMÍN MENÉNDEZ</span>', size: 120, top: 820 }]);
{
  const a = AF('c5', 'iba a cruzar'), b = S('c6');
  scene('sAnd', V(a, b, 0), `<svg class="full" id="anS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema del plan · tres pasos de la cordillera</div>`);
  const proj = d3.geoMercator().fitExtent([[60, 380], [1020, 1150]], { type: 'MultiPoint', coordinates: [[-75, -42], [-66, -31]] }), M = mundo($('anS'), { proj });
  M.pais('032', '#152230'); M.pais('152', '#2a1a14');
  const L = (ll, txt, col, an) => { const [x, y] = proj(ll); el('circle', { cx: x, cy: y, r: 9, fill: col, stroke: '#050505', 'stroke-width': 2 }, M.g); return rotulo(M.g, x + (an === 'end' ? -16 : 16), y + 8, txt, { size: 17, col, anchor: an }); };
  const rs = [L([-68.84, -32.89], 'MENDOZA', ARG), L([-70.65, -33.45], 'SANTIAGO', CHI, 'end'), L([-71.62, -33.05], 'VALPARAÍSO', CHI, 'end'), L([-73.13, -40.57], 'OSORNO', CHI, 'end')];
  const pasos = [[[-69.3, -32.6], [-70.07, -32.83], [-70.65, -33.45], 'LOS LIBERTADORES'], [[-69.2, -34.4], [-69.85, -34.26], [-70.6, -33.6], 'MAIPO'], [[-71.0, -40.8], [-71.95, -40.71], [-73.0, -40.6], 'PUYEHUE (HOY CARDENAL SAMORÉ)']];
  const tr = pasos.map(([p, q, r, n]) => { const t1 = trazo(M.g, [proj(p), proj(q), proj(r)], { col: ARG, w: 6, punto: 10 }); const [x, y] = proj(q); const rr = rotulo(M.g, x + 18, y + 34, 'PASO ' + n, { size: 15, col: '#ffd24a' }); return [t1, rr]; });
  RENDER.push(t => { if (!on('sAnd')) return; camMundo(M, 540, 960, 1); rs.forEach(r => r.setAttribute('opacity', 1)); tr.forEach(([t1, rr], i) => { const q = io(P(t, a + .2 + i * .6, a + 1.6 + i * .6)); t1.draw(q); rr.setAttribute('opacity', P(t, a + .6 + i * .6, a + .9 + i * .6)); }); });
}
// ---------- 5 · Lo que Chile tenía preparado ----------
{
  const a = S('c6'), b = AF('c6', 'preparado');
  scene('sMi2', V(a, b, 0), `<svg class="full" id="miS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;text-shadow:0 0 30px #000">CHILE<br><span class="r">LO ESPERABA</span></div>`);
  const proj = d3.geoMercator().fitExtent([[60, 640], [1020, 1150]], { type: 'MultiPoint', coordinates: [[-76, -55], [-62, -30]] }), M = mundo($('miS'), { proj });
  M.pais('032', '#152230'); M.pais('152', '#2a1a14');
  const r = rnd(5), minas = Array.from({ length: 34 }, (_, i) => { const lat = -31 - i * .68, lon = -70.2 + (lat < -45 ? (lat + 45) * .12 : 0) + (r() - .5) * .8; const [x, y] = proj([lon, lat]); const g = el('g', { opacity: 0 }, M.g); el('path', { d: `M${x - 7},${y - 7} L${x + 7},${y + 7} M${x + 7},${y - 7} L${x - 7},${y + 7}`, stroke: CHI, 'stroke-width': 4 }, g); return g; });
  RENDER.push(t => { if (!on('sMi2')) return; camMundo(M, 540, 960, 1); minas.forEach((m, i) => m.setAttribute('opacity', P(t, AF('c6', 'minado') + i * .03, AF('c6', 'minado') + .2 + i * .03))); });
}
{
  const a = AF('c6', 'preparado'), b = S('c7');
  scene('sLin', V(a, b, 0), `<svg class="full" id="liS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema · ubicación aproximada</div>`);
  const M = mapaSur('liS', { centro: [-70.9, -52.9], ancho: 3.2, titulo: 'DEFENSA DE PUNTA ARENAS', km: 20, paso: .5 });
  const pa = M.lugar(LL.parenas, 'PUNTA ARENAS', { col: CHI }), p1 = M.proj([-71.45, -52.62]), p2 = M.proj([-70.75, -52.72]);
  const lin = el('path', { d: `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`, stroke: CHI, 'stroke-width': 10, 'stroke-dasharray': '18 10', opacity: 0 }, M.g), rl = rotulo(M.g, p2[0] + 14, p2[1] - 14, 'LÍNEA DE DEFENSA', { size: 18, col: CHI });
  const ar = M.flecha([-70.4, -52.05], [-70.9, -52.55], ARG); M.leyenda();
  RENDER.push(t => { if (!on('sLin')) return; pa.ver(1); pa.m.pulso(t); ar.draw(io(P(t, a, a + 1))); lin.setAttribute('opacity', P(t, a + .6, a + 1)); rl.setAttribute('opacity', P(t, a + .8, a + 1.1)); });
}
{
  const a = S('c7'), b = S('c8');
  scene('sEsc', V(a, b, 0), `<svg class="full" id="esS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema · posiciones aproximadas</div>
    <div class="cpill" style="position:absolute;left:64px;top:440px">Vicealmirante Raúl López, jefe de la escuadra</div>`);
  const M = mapaSur('esS', { centro: [-67.4, -55.4], ancho: 3.6, titulo: 'ESCUADRA CHILENA · 22/12', km: 20, paso: .5 });
  const bs = [0, 1, 2, 3].map(i => M.buque([-69.0 + i * .12, -55.4 - (i % 2) * .1], CHI)), ar = [[-65.6, -55.6], [-65.4, -55.85]].map(ll => M.buque(ll, ARG)); M.leyenda();
  RENDER.push(t => { if (!on('sEsc')) return; ar.forEach(g => g.setAttribute('opacity', .8)); const k = io(P(t, a + .2, b - .2)); bs.forEach((g, i) => { const [x, y] = M.proj([lerp(-69.0, -67.2, k) + i * .12, -55.4 - (i % 2) * .1 - k * .15]); g.setAttribute('opacity', 1); g.setAttribute('transform', `translate(${x} ${y}) scale(.42)`); }); });
}
// ---------- 6 · Lo que iba a costar ----------
{
  const a = S('c8'), b = S('c9');
  scene('sHom', V(a, b), `${fondo('#0d141b')}<svg class="full" id="hoS" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:0;right:0;top:390px;text-align:center"><div class="cbig" id="hoV" style="font-size:200px">0</div><div class="osw" style="font-size:36px;letter-spacing:.3em">HOMBRES EN COMBATE</div></div>`);
  const sv = $('hoS'), ps = []; for (let i = 0; i < 200; i++) ps.push(icono(sv, 'persona', 80 + (i % 20) * 48, 720 + Math.floor(i / 20) * 42, .3, i % 2 ? ARG : CHI));
  RENDER.push(t => { if (!on('sHom')) return; const k = eo(P(t, a + .1, ATE('c8', 'hombres'))); $('hoV').textContent = fmt(200000 * k); ps.forEach((p, i) => p.setAttribute('opacity', i < 200 * k ? 1 : .06)); });
}
{
  const a = S('c9'), b = S('c10');
  scene('sMue', V(a, b, 1.05), `${fondo('#1a0303')}
    <div class="osw" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:32px;letter-spacing:.3em;color:#8a8a8a">MUERTOS ESTIMADOS</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:480px;text-align:center;font-size:170px;color:#ff2a2a"><span id="m1">0</span> — <span id="m2">0</span></div>
    <div class="mono" style="position:absolute;left:0;right:0;top:720px;text-align:center;font-size:22px;color:#8a8a8a">ESTIMACIONES CITADAS POR LA NACIÓN Y EL PAÍS</div>`);
  RENDER.push(t => { if (!on('sMue')) return; $('m1').textContent = fmt(30000 * eo(P(t, AF('c9', 'treinta'), AF('c9', 'treinta') + 1))); $('m2').textContent = fmt(50000 * eo(P(t, AF('c9', 'cincuenta'), AF('c9', 'cincuenta') + 1))); });
}
{
  const a = S('c10'), b = S('c11');
  scene('sReg', V(a, b, 0), `<svg class="full" id="rgS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>El miedo a una guerra regional</div>`);
  const proj = d3.geoMercator().fitExtent([[120, 380], [960, 1150]], { type: 'MultiPoint', coordinates: [[-82, -56], [-34, 6]] }), M = mundo($('rgS'), { proj });
  M.pais('032', '#1f3a50'); M.pais('152', '#4a2318'); const ot = [['604', 'Perú'], ['068', 'Bolivia'], ['076', 'Brasil']].map(([id, n]) => ({ p: M.pais(id, '#5a4a10'), n }));
  RENDER.push(t => { if (!on('sReg')) return; camMundo(M, 540, 960, 1); ot.forEach(o => o.p.setAttribute('opacity', P(t, AF('c10', o.n), AF('c10', o.n) + .2) * (.6 + .4 * Math.sin(t * 6)))); });
}
// ---------- 7 · La mediación y el tratado ----------
fotoR('sMed', V(S('c11'), S('c12')), 'papa.jpg', { pos: '50% 30%', bn: true, kb: [1.0, 1.1, 0, 0, 0, 0], lbl: 'Juan Pablo II, mediador entre Chile y la Argentina',
  titulo: 'LA MEDIACIÓN<br><span class="r">DEL PAPA</span>', tT: AF('c11', 'aceptaron'), size: 140, top: 420, pills: [[AF('c11', 'enero'), 'Acta de Montevideo · enero de 1979']], pTop: 720 });
{
  const a = S('c12'), b = S('c13'), ov = AF('c12', 'el ochenta');
  scene('sVot', V(a, b), `${fondo('#0d141b')}
    <div id="vA" class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:150px"><span id="vY">1979</span></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:570px;text-align:center;font-size:30px;letter-spacing:.24em;color:#8a8a8a">CONSULTA POPULAR · 25 DE NOVIEMBRE DE 1984</div>
    <div style="position:absolute;left:90px;right:90px;top:660px"><div class="cbig" style="font-size:60px">SÍ</div><div style="height:70px;background:#222"><div id="vS" style="height:100%;width:0;background:${ARG};display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font:400 56px 'Bebas Neue';color:#050505">82 %</div></div>
      <div class="cbig" style="font-size:60px;margin-top:24px">NO</div><div style="height:70px;background:#222"><div id="vN" style="height:100%;width:0;background:#666;display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font:400 56px 'Bebas Neue'">16 %</div></div></div>`);
  RENDER.push(t => { if (!on('sVot')) return; $('vY').textContent = Math.round(lerp(1979, 1984, eo(P(t, a + .2, AF('c12', 'En mil') + .6)))); $('vS').style.width = 82 * eo(P(t, ov, ov + 1)) + '%'; $('vN').style.width = 16 * eo(P(t, ov + .3, ov + 1.1)) + '%'; });
}
{
  const a = S('c13'), b = S('c14');
  scene('sTra', V(a, b, 0), `<svg class="full" id="trS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Tratado de Paz y Amistad, 1984 · esquema aproximado</div>`);
  const M = mapaSur('trS', { centro: [-66.3, -55.6], ancho: 4.5, titulo: 'TRATADO DE PAZ Y AMISTAD · 1984', km: 50, paso: .5 });
  const mar = el('path', { d: `M${M.proj([-66.25, -55.1])} L${M.proj([-64.4, -55.3])} L${M.proj([-64.4, -57.3])} L${M.proj([-66.8, -57.3])} L${M.proj([-66.6, -56.0])} Z`, fill: 'rgba(124,196,245,.25)', stroke: ARG, 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0 }, M.g);
  const is = ISLAS.map(([n, ll]) => M.isla(ll, CHI)), rm = rotulo(M.g, ...M.proj([-65.6, -56.5]), 'MAR: ARGENTINA', { size: 18, col: ARG }), ri = rotulo(M.g, ...M.proj([-67.7, -55.45]), 'ISLAS: CHILE', { size: 18, col: CHI }); M.leyenda();
  RENDER.push(t => { if (!on('sTra')) return; const q1 = P(t, AF('c13', 'islas'), AF('c13', 'islas') + .3), q2 = P(t, AF('c13', 'la Argentina'), AF('c13', 'la Argentina') + .4); is.forEach(i => i.setAttribute('opacity', q1)); ri.setAttribute('opacity', q1); mar.setAttribute('opacity', q2); rm.setAttribute('opacity', q2); });
}
// ---------- 8 · Hoy ----------
fotoR('sSam', V(S('c14'), S('c15')), 'puyehue.jpg', { pos: '50% 50%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'El paso en invierno',
  titulo: 'PASO CARDENAL<br><span class="r">SAMORÉ</span>', tT: AF('c14', 'Paso'), size: 140, top: 420, pills: [[AF('c14', 'enviado'), 'Por el enviado del Papa'], [AF('c14', 'pasos'), 'Antes, paso Puyehue']], pTop: 720 });
{
  const a = S('c15'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .18, .01], 'beagleaereo.jpg', { pos: '50% 50%', bn: true, tinte: .4, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'El canal de Beagle desde el aire',
    titulo: '¿QUÉ HABRÍA<br><span class="r">PASADO?</span>', tT: a, size: 160, top: 420, pills: [[AF('c15', 'Te leo'), 'Te leo en los comentarios']], pTop: 760, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
