// "Pasó de verdad" · Beagle 1978, parte 1: la guerra con Chile que se frenó horas antes (Operativo Soberanía).
// Historia real. Fotos libres (web/img/fotos.json); mapas de Natural Earth 10 m (web/fuego.js, comun/web/tactico.js).
// Los movimientos de las flotas sobre el mapa son esquemáticos, a partir de las reconstrucciones publicadas.

captions([
  ['h1', 'Mundial', 'a'], ['h1', 'Chile', 'a'], ['h1', 'guerra', 'r'], ['h2', 'veintidós', 'r'], ['h2', 'diez', 'r'], ['c1', 'Beagle', 'a'], ['c1', 'Picton', 'r'], ['c1', 'Nueva', 'r'],
  ['c1', 'Lennox', 'r'], ['c2', 'mar', 'a'], ['c2', 'Antártida', 'a'], ['c3', 'británica', 'a'], ['c3', 'Chile', 'r'], ['c4', 'nulo', 'r'], ['c5', 'Pinochet', 'a'], ['c5', 'minó', 'r'],
  ['c5', 'escuadra', 'a'], ['c6', 'Videla', 'a'], ['c6', 'Soberanía', 'r'], ['c7', 'portaaviones', 'a'], ['c7', 'Belgrano', 'a'], ['c7', 'infantes', 'r'], ['c8', 'chilena', 'a'],
  ['c8', 'avión', 'r'], ['c9', 'temporal', 'r'], ['c9', 'doce', 'r'], ['c10', 'Juan', 'a'], ['c10', 'Pablo', 'a'], ['c10', 'enviado', 'r'], ['c11', 'aceptó', 'r'], ['c12', 'vuelta', 'r'],
  ['c13', 'disparó', 'r'], ['c13', 'llamaba', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c13') - .1,
  horas: [[2.6, 'DIC 1978', true], [S('c3') - .1, '1971'], [AT('c3', 'En mayo') - .2, '2/5/1977'], [S('c4') - .1, '25/1/1978'], [S('c6') - .1, 'DIC 1978'], [S('c10') - .1, '22/12 · MAÑANA', true],
    [S('c12') - .1, '22/12 · 18:30', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('BEAGLE<br><span class="r">1978</span>');

const V = (a, b, z = 1.03) => [a - .1, b - .1, .18, .18, z];
const AF = (id, f) => AT(id, f) - .15;
const ARG = '#7cc4f5', CHI = '#ff6a3d';
const LL = { ushuaia: [-68.3, -54.8], williams: [-67.61, -54.93], picton: [-66.95, -55.03], nueva: [-66.54, -55.22], lennox: [-66.94, -55.27], hornos: [-67.27, -55.98],
  estados: [-64.28, -54.78], riogrande: [-67.7, -53.79], parenas: [-70.91, -53.16], hoste: [-68.9, -55.25] };
const ISLAS = [['PICTON', LL.picton], ['NUEVA', LL.nueva], ['LENNOX', LL.lennox]];
// polígono de una isla del mapa que contiene el punto
const islaDe = ll => FUEGO.land.features.find(f => d3.geoContains(f, ll));
// mapa táctico del sur con islas resaltables; o = {centro, ancho, titulo, km}
function mapaSur(sid, o) {
  const M = mapaZona($(sid), FUEGO, { titulo: o.titulo, km: o.km || 20, paso: o.paso || .5, centro: o.centro, ancho: o.ancho });
  const P_ = ll => M.proj(ll);
  M.isla = (ll, col) => { const f = islaDe(ll); return f ? el('path', { d: M.path(f), fill: col, stroke: '#050505', 'stroke-width': 1.5, opacity: 0 }, M.g) : el('g', {}, M.g); };
  M.lugar = (ll, txt, o2 = {}) => { const [x, y] = P_(ll); const m = marca(M.g, x, y, { col: o2.col || '#ece8e1' }); const r = rotulo(M.g, x + (o2.anchor === 'end' ? -24 : 24), y + 8, txt, { size: o2.size || 18, col: o2.col || '#ece8e1', anchor: o2.anchor }); return { m, r, x, y }; };
  M.buque = (ll, col, s = .42) => { const [x, y] = P_(ll); return icono(M.g, 'barco', x, y, s, col); };
  M.leyenda = () => { const g = el('g', { transform: 'translate(64 1080)' }, $(sid)); [[ARG, 'ARGENTINA'], [CHI, 'CHILE']].forEach(([c, t], i) => { el('rect', { x: i * 250, y: -16, width: 22, height: 22, fill: c }, g); const tx = el('text', { x: i * 250 + 32, y: 2, fill: '#ece8e1', 'font-family': 'IBM Plex Mono', 'font-size': 20 }, g); tx.textContent = t; }); return g; };
  return M;
}
// documento sobre fondo oscuro
const papel = (html, o = {}) => `<div style="position:absolute;left:${o.l ?? 80}px;right:${o.r ?? 80}px;top:${o.top ?? 420}px;height:${o.h ?? 520}px;background:#efe9da;color:#1b1b1b;padding:34px 38px;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(${o.rot ?? -1}deg)">${html}</div>`;
const fondo = (c = '#0d141b') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#050505 70%)"></div>`;

SETUP.push(() => {
// ---------- 1 · A horas de una guerra ----------
{
  scene('sAbre', [-1, 3.2, .01, .18, 0], `<svg class="full" id="aS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaSur('aS', { centro: [-68, -54.6], ancho: 7.5, titulo: 'CANAL DE BEAGLE · 1978', km: 50, paso: 1 });
  RENDER.push(t => { if (on('sAbre')) M.g.setAttribute('transform', `translate(540 740) scale(${lerp(1, 1.12, P(t, 0, 3.2)).toFixed(3)}) translate(-540 -740)`); });
}
fotoR('sMun', V(3.2, AF('h1', 'estuvieron')), 'mundial.jpg', { pos: '50% 35%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Videla saluda a Tarantini en el Mundial 78',
  titulo: 'MUNDIAL <span class="r">78</span>', tT: 3.2, size: 170, top: 420, pills: [[3.6, 'Seis meses después…']], pTop: 620 });
{
  const a = AF('h1', 'estuvieron'), b = S('h2');
  scene('sBan', V(a, b, 1.05), `<div style="position:absolute;left:0;top:0;width:50%;height:100%;background:linear-gradient(#75b6e6 0 33%,#f2f2f2 33% 66%,#75b6e6 66%);opacity:.22"></div>
    <div style="position:absolute;right:0;top:0;width:50%;height:100%;background:linear-gradient(#f2f2f2 0 50%,#d52b1e 50%);opacity:.18"></div><div style="position:absolute;right:0;top:0;width:18%;height:50%;background:#0039a6;opacity:.18"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(5,5,5,.3),#050505 78%)"></div>
    <div class="cbig" style="position:absolute;left:0;width:50%;top:440px;text-align:center;font-size:110px;color:${ARG}">ARGENTINA</div><div class="cbig" style="position:absolute;right:0;width:50%;top:440px;text-align:center;font-size:110px;color:${CHI}">CHILE</div>
    <div id="bT" class="cbig" style="position:absolute;left:0;right:0;top:640px;text-align:center;font-size:150px;opacity:0">A HORAS DE<br><span class="r">UNA GUERRA</span></div>`);
  RENDER.push(t => { if (on('sBan')) $('bT').style.opacity = P(t, AF('h1', 'a horas'), AF('h1', 'a horas') + .3); });
}
{
  const a = S('h2'), b = S('c1');
  scene('sHor', V(a, b, 1.06), `${fondo('#160404')}
    <div class="osw" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:32px;letter-spacing:.3em;color:#8a8a8a">EL PLAN TENÍA FECHA Y HORA</div>
    <div class="cbig" id="hD" style="position:absolute;left:0;right:0;top:480px;text-align:center;font-size:190px;opacity:0">22·12·1978</div>
    <div class="cbig" id="hH" style="position:absolute;left:0;right:0;top:690px;text-align:center;font-size:260px;color:#ff2a2a;opacity:0">22:00</div>
    <div class="osw" id="hL" style="position:absolute;left:0;right:0;top:960px;text-align:center;font-size:40px;letter-spacing:.4em;opacity:0">HORA H</div>`);
  RENDER.push(t => { if (!on('sHor')) return; $('hD').style.opacity = P(t, AF('h2', 'veintidós'), AF('h2', 'veintidós') + .3); const q = P(t, AF('h2', 'diez'), AF('h2', 'diez') + .3); $('hH').style.opacity = q; $('hH').style.transform = `scale(${lerp(1.3, 1, eo(q))})`; $('hL').style.opacity = q; });
}
// ---------- 2 · Tres islas en el fin del mundo ----------
fotoR('sCan', V(S('c1'), AF('c1', 'Picton')), 'beagle.jpg', { pos: '45% 50%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'El canal de Beagle, visto desde Puerto Williams',
  titulo: 'CANAL DE<br><span class="r">BEAGLE</span>', tT: AF('c1', 'Beagle'), size: 170, top: 420 });
{
  const a = AF('c1', 'Picton'), b = S('c2');
  scene('sIsl', V(a, b, 0), `<svg class="full" id="iS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaSur('iS', { centro: [-66.95, -55.1], ancho: 1.5, titulo: 'BOCA ORIENTAL DEL CANAL DE BEAGLE', km: 10, paso: .25 });
  const is = ISLAS.map(([n, ll]) => ({ p: M.isla(ll, '#ff2a2a'), l: M.lugar(ll, n, { col: '#ff5050', size: 22, anchor: n === 'NUEVA' ? 'start' : 'end' }), n }));
  const nv = M.lugar([-67.6, -54.97], 'NAVARINO', { col: '#8fa2b4', size: 16 }), tf = M.lugar([-67.25, -54.75], 'TIERRA DEL FUEGO', { col: '#8fa2b4', size: 16 });
  RENDER.push(t => { if (!on('sIsl')) return; [nv, tf].forEach(o => { o.r.setAttribute('opacity', 1); });
    is.forEach(o => { const w = AF('c1', o.n === 'PICTON' ? 'Picton' : o.n === 'NUEVA' ? 'Nueva' : 'Lennox'), q = P(t, w - .1, w + .2); o.p.setAttribute('opacity', q * (.7 + .3 * Math.sin(t * 6))); o.l.r.setAttribute('opacity', q); o.l.m.g.setAttribute('opacity', q); o.l.m.pulso(t); }); });
}
{
  const a = S('c2'), b = S('c3');
  scene('sMar', V(a, b, 0), `<svg class="full" id="mS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema aproximado</div>
    <div id="mT" class="cbig" style="position:absolute;left:64px;top:900px;font-size:100px;opacity:0;text-shadow:0 0 30px #000">UNA ENORME<br><span class="r">PORCIÓN DE MAR</span></div>`);
  const M = mapaSur('mS', { centro: [-65.6, -55.9], ancho: 6.5, titulo: 'PROYECCIÓN MARÍTIMA', km: 50, paso: .5 });
  const p0 = M.proj([-66.7, -55.2]), cuña = el('path', { d: `M${p0[0]},${p0[1]} L${M.proj([-63.8, -55.0])} L${M.proj([-64.0, -57.1])} L${M.proj([-66.9, -57.1])} Z`, fill: 'rgba(255,42,42,.22)', stroke: '#ff2a2a', 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0 }, M.g);
  const fl = trazo(M.g, [M.proj([-63.0, -56.0]), M.proj([-63.0, -57.3])], { w: 5, col: '#ece8e1' }), ra = rotulo(M.g, ...M.proj([-63.15, -57.15]), 'HACIA LA ANTÁRTIDA', { size: 18, anchor: 'end' });
  ISLAS.forEach(([n, ll]) => M.isla(ll, '#ff2a2a').setAttribute('opacity', 1));
  RENDER.push(t => { if (!on('sMar')) return; $('mT').style.opacity = P(t, AF('c2', 'enorme'), AF('c2', 'enorme') + .3); cuña.setAttribute('opacity', P(t, AF('c2', 'reclamar'), AF('c2', 'reclamar') + .5)); fl.draw(io(P(t, AF('c2', 'camino'), AF('c2', 'camino') + .8))); ra.setAttribute('opacity', P(t, AF('c2', 'Antártida'), AF('c2', 'Antártida') + .2)); });
}
// ---------- 3 · El fallo de 1977 ----------
{
  const a = S('c3'), b = AF('c3', 'En mayo');
  scene('sCor', V(a, b), `${fondo('#16120c')}<svg class="full" id="cS" viewBox="0 0 1080 1920"></svg>
    <div class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:120px">ARBITRAJE</div>
    <div class="osw" style="position:absolute;left:0;right:0;top:540px;text-align:center;font-size:32px;letter-spacing:.24em;color:#8a8a8a">BAJO LA CORONA BRITÁNICA · 1971</div>
    <div class="osw" style="position:absolute;left:0;right:0;top:1000px;text-align:center;font-size:30px;letter-spacing:.24em">CINCO JUECES</div>`);
  const sv = $('cS'), js = [0, 1, 2, 3, 4].map(i => icono(sv, 'persona', 220 + i * 160, 800, 2));
  RENDER.push(t => { if (on('sCor')) js.forEach((j, i) => mostrar(j, P(t, a + .2 + i * .15, a + .5 + i * .15))); });
}
{
  const a = AF('c3', 'En mayo'), b = S('c4');
  scene('sFal', V(a, b, 0), `<svg class="full" id="fS" viewBox="0 0 1080 1920"></svg>${selloC('fX', 'PARA CHILE', 200, 420, 130)}`);
  const M = mapaSur('fS', { centro: [-66.95, -55.1], ancho: 1.5, titulo: 'FALLO ARBITRAL · 2/5/1977', km: 10, paso: .25 });
  const is = ISLAS.map(([n, ll]) => ({ p: M.isla(ll, CHI), l: M.lugar(ll, n, { col: CHI, size: 20, anchor: n === 'NUEVA' ? 'start' : 'end' }) })); M.leyenda();
  RENDER.push(t => { if (!on('sFal')) return; is.forEach(o => { o.p.setAttribute('opacity', P(t, AF('c3', 'tres islas'), AF('c3', 'tres islas') + .4)); o.l.r.setAttribute('opacity', 1); o.l.m.g.setAttribute('opacity', 1); o.l.m.pulso(t); }); golpeC('fX', t, AF('c3', 'Chile'), -6); });
}
{
  const a = S('c4'), b = S('c5');
  scene('sNul', V(a, b), `${fondo('#16120c')}${papel(`<div class="mono" style="font-size:20px;color:#555">CORTE ARBITRAL · CANAL DE BEAGLE</div>
    <div class="cbig" style="font-size:96px;color:#111;margin-top:12px">LAUDO ARBITRAL</div><div class="osw" style="font-size:26px;letter-spacing:.2em;color:#555">2 DE MAYO DE 1977</div>
    <div style="font:500 40px/1.35 'Cormorant Garamond';margin-top:24px">…las islas Picton, Nueva y Lennox pertenecen a la República de Chile…</div>`)}
    ${selloC('nX', 'NULO', 330, 760, 200)}<div class="clbl" style="opacity:1"><i></i>Ilustración · la Argentina lo rechazó el 25 de enero de 1978</div>`);
  RENDER.push(t => { if (on('sNul')) golpeC('nX', t, AF('c4', 'nulo'), -8); });
}
// ---------- 4 · Pinochet, minas y la escuadra ----------
fotoR('sPin', V(S('c5'), AF('c5', 'Chile minó')), 'pinochet.jpg', { pos: '50% 25%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Augusto Pinochet',
  titulo: 'AUGUSTO<br><span class="r">PINOCHET</span>', tT: AF('c5', 'Pinochet') - .3, size: 180, top: 640 });
fotoR('sMin', V(AF('c5', 'Chile minó'), AF('c5', 'preparó')), 'minas.jpg', { pos: '50% 50%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Campo minado en Tierra del Fuego, Chile (foto de 2006)',
  pills: [[AF('c5', 'minó'), 'Chile minó sus fronteras']], pTop: 440 });
{
  const a = AF('c5', 'preparó'), b = S('c6');
  scene('sEs0', V(a, b, 0), `<svg class="full" id="eS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema</div>`);
  const M = mapaSur('eS', { centro: [-67.6, -55.2], ancho: 3.2, titulo: 'ESCUADRA CHILENA', km: 20, paso: .5 });
  const bs = [[-68.2, -55.35], [-67.95, -55.45], [-68.45, -55.5], [-67.7, -55.55]].map(ll => M.buque(ll, CHI)); M.leyenda();
  RENDER.push(t => { if (on('sEs0')) bs.forEach((g, i) => g.setAttribute('opacity', P(t, a + i * .15, a + .3 + i * .15))); });
}
// ---------- 5 · Videla y el Operativo Soberanía ----------
fotoR('sVid', V(S('c6'), AF('c6', 'Se llamó')), 'videla.jpg', { pos: '50% 25%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Jorge Rafael Videla, 1978',
  titulo: 'JORGE RAFAEL<br><span class="r">VIDELA</span>', tT: AF('c6', 'Videla') - .3, size: 150, top: 700 });
{
  const a = AF('c6', 'Se llamó'), b = S('c7');
  scene('sOpe', V(a, b, 1.05), `${fondo('#160404')}${papel(`<div class="mono" style="font-size:20px;color:#555">JUNTA MILITAR · DICIEMBRE DE 1978</div>
    <div class="cbig" style="font-size:104px;color:#111;margin-top:16px;line-height:.95">OPERATIVO<br>SOBERANÍA</div>
    <div style="margin-top:30px;height:12px;background:#222;width:80%"></div><div style="margin-top:12px;height:12px;background:#222;width:65%"></div><div style="margin-top:12px;height:12px;background:#222;width:72%"></div>`, { h: 480 })}
    ${selloC('oX', 'SECRETO', 330, 820, 140)}<div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  RENDER.push(t => { if (on('sOpe')) golpeC('oX', t, AF('c6', 'Soberanía') + .2, -6); });
}
// ---------- 6 · La flota ----------
fotoR('sPA', V(S('c7'), AF('c7', 'el crucero')), 'portaaviones.jpg', { pos: '50% 50%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'El portaaviones ARA Veinticinco de Mayo, entre 1978 y 1980',
  titulo: 'PORTAAVIONES<br><span class="r">25 DE MAYO</span>', tT: AF('c7', 'portaaviones'), size: 130, top: 420 });
fotoR('sBel', V(AF('c7', 'el crucero'), AF('c7', 'destructores')), 'belgrano.jpg', { pos: '50% 50%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'El crucero ARA General Belgrano',
  titulo: 'CRUCERO<br><span class="r">GENERAL BELGRANO</span>', tT: AF('c7', 'crucero'), size: 130, top: 420 });
{
  const a = AF('c7', 'destructores'), b = S('c8');
  const G = [['GRUPO 1', 'Portaaviones 25 de Mayo · destructor Hércules · corbetas Drummond y Guerrico'], ['GRUPO 2', 'Crucero Belgrano · destructores Rosales, Bouchard y Piedra Buena · buques de desembarco con infantes de marina'], ['GRUPO 3', 'Destructores Py, Seguí, Storni y Domecq García']];
  scene('sOrd', V(a, b), `${fondo()}<div class="osw" style="position:absolute;left:64px;right:64px;top:385px;font-size:24px;letter-spacing:.16em;color:#8fa2b4">FLOTA DE MAR · CONTRAALMIRANTE HUMBERTO BARBUZZI</div>
    ${G.map(([g, d], i) => `<div class="oG" data-t="${a + .2 + i * .5}" style="position:absolute;left:64px;right:64px;top:${450 + i * 200}px;height:180px;border-left:8px solid ${ARG};background:rgba(20,30,40,.85);padding:16px 24px;opacity:0">
      <div class="cbig" style="font-size:60px;color:${ARG}">${g}</div><div style="font:500 28px/1.3 Inter;color:#dfe6ec">${d}</div></div>`).join('')}
    <div class="clbl" style="opacity:1"><i></i>Según las reconstrucciones publicadas</div>`);
  const gs = [...document.querySelectorAll('#sOrd .oG')];
  RENDER.push(t => { if (on('sOrd')) gs.forEach(g => { const q = P(t, +g.dataset.t, +g.dataset.t + .25); g.style.opacity = q; g.style.transform = `translateX(${lerp(-40, 0, eo(q))}px)`; }); });
}
// ---------- 7 · Las dos flotas y el avión ----------
function mapaFlotas(sid, o = {}) {
  const M = mapaSur(sid, { centro: [-66.6, -55.6], ancho: 5.2, titulo: o.titulo || 'EL SUR · 22 DE DICIEMBRE', km: 50, paso: .5 });
  const ar = [[-65.0, -55.6], [-65.3, -55.9], [-64.8, -56.0], [-65.6, -56.2]].map(ll => M.buque(ll, ARG)), ch = [[-67.9, -55.35], [-67.6, -55.5], [-68.2, -55.55]].map(ll => M.buque(ll, CHI));
  const rh = M.lugar(LL.hornos, 'CABO DE HORNOS', { size: 16, anchor: 'end' }), re = M.lugar(LL.estados, 'ISLA DE LOS ESTADOS', { size: 16, anchor: 'end' });
  ISLAS.forEach(([n, ll]) => M.isla(ll, '#7a2a1a').setAttribute('opacity', 1)); M.leyenda();
  return { M, ar, ch, rh, re };
}
{
  const a = S('c8'), b = AF('c8', 'Según');
  scene('sFl', V(a, b, 0), `<svg class="full" id="flS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema · posiciones aproximadas</div>`);
  const F = mapaFlotas('flS');
  RENDER.push(t => { if (!on('sFl')) return; [F.rh.r, F.rh.m.g, F.re.r, F.re.m.g].forEach(n => n.setAttribute('opacity', 1)); F.ar.forEach(g => g.setAttribute('opacity', 1)); F.ch.forEach((g, i) => g.setAttribute('opacity', P(t, a + .2 + i * .15, a + .5 + i * .15))); });
}
{
  const a = AF('c8', 'Según'), b = S('c9');
  scene('sAv', V(a, b, 0), `<svg class="full" id="avS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Según fuentes chilenas · esquema</div>
    <div class="cpill" style="position:absolute;left:64px;top:440px">Flota argentina ubicada</div>`);
  const F = mapaFlotas('avS', { titulo: 'RECONOCIMIENTO AÉREO' }), [px, py] = F.M.proj([-66.2, -55.0]), av = icono(F.M.g, 'avion', px, py, .35, CHI);
  const ondas = [0, 1, 2].map(() => el('circle', { cx: px, cy: py, r: 10, fill: 'none', stroke: CHI, 'stroke-width': 3 }, F.M.g));
  RENDER.push(t => { if (!on('sAv')) return; [F.rh.r, F.rh.m.g, F.re.r, F.re.m.g, av].forEach(n => n.setAttribute('opacity', 1)); F.ar.forEach(g => g.setAttribute('opacity', .5 + .5 * Math.sin(t * 8))); F.ch.forEach(g => g.setAttribute('opacity', 1));
    ondas.forEach((c, i) => { const p = (t * .8 + i / 3) % 1; c.setAttribute('r', 10 + p * 260); c.setAttribute('opacity', 1 - p); }); });
}
// ---------- 8 · El temporal ----------
{
  const a = S('c9'), b = S('c10');
  fotoR('sTem', V(a, b, 0), 'tormenta.jpg', { pos: '50% 50%', bn: true, tinte: .35, kb: [1.2, 1.35, -20, 20, 0, 0], lbl: 'Temporal en el cabo de Hornos (foto antigua, ilustrativa)',
    pills: [[AF('c9', 'vientos'), 'Vientos huracanados'], [AF('c9', 'olas'), 'Olas de más de 12 metros']], pTop: 440,
    inner: '<canvas id="tC" width="1080" height="1920" style="position:absolute;inset:0;opacity:.55"></canvas>' });
  const cv = $('tC').getContext('2d'), r = rnd(3), gotas = Array.from({ length: 260 }, () => [r() * 1300, r() * 1920, 20 + r() * 40]);
  RENDER.push(t => { if (!on('sTem')) return; cv.clearRect(0, 0, 1080, 1920); cv.strokeStyle = 'rgba(220,230,240,.7)'; cv.lineWidth = 2; cv.beginPath();
    gotas.forEach(([x, y, l]) => { const yy = (y + t * 1800) % 1920, xx = (x - t * 700) % 1300; cv.moveTo(xx, yy); cv.lineTo(xx - l * .4, yy + l); }); cv.stroke(); });
}
// ---------- 9 · El Papa ----------
fotoR('sPap', V(S('c10'), AF('c10', 'iba a mandar')), 'papa.jpg', { pos: '50% 25%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Juan Pablo II',
  titulo: 'JUAN<br><span class="r">PABLO II</span>', tT: AF('c10', 'Juan'), size: 190, top: 640, pills: [[AF('c10', 'se comunicó'), 'Llama a los dos gobiernos']], pTop: 1020 });
textosC('sEnv', V(AF('c10', 'iba a mandar'), S('c11'), 1.05), [
  { t: AF('c10', 'iba a mandar'), html: 'UN ENVIADO<br><span class="r">PERSONAL</span>', size: 170, top: 480 },
  { t: AF('c10', 'personal') + .2, html: '<span style="font-size:.3em;letter-spacing:.24em;color:#8a8a8a">EL CARDENAL ANTONIO SAMORÉ</span>', size: 110, top: 840 }]);
// ---------- 10 · La junta discute ----------
{
  const a = S('c11'), b = S('c12');
  scene('sJun', V(a, b), `${fondo('#160404')}<svg class="full" id="jS" viewBox="0 0 1080 1920"></svg>
    <div class="osw" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:34px;letter-spacing:.3em">LA JUNTA MILITAR DISCUTE</div>
    <div class="cbig" id="jM" style="position:absolute;left:0;right:0;top:960px;text-align:center;font-size:90px;color:#ff2a2a">0 MIN</div>${selloC('jX', 'ACEPTA', 300, 1000, 150)}`);
  const sv = $('jS'); el('circle', { cx: 540, cy: 720, r: 190, fill: 'none', stroke: '#3a3a3a', 'stroke-width': 14 }, sv);
  const arco = el('circle', { cx: 540, cy: 720, r: 190, fill: 'none', stroke: '#ff2a2a', 'stroke-width': 14, pathLength: 1, 'stroke-dasharray': '0 1', transform: 'rotate(-90 540 720)' }, sv);
  RENDER.push(t => { if (!on('sJun')) return; const k = P(t, a, AF('c11', 'Y aceptó')); arco.style.strokeDasharray = `${k.toFixed(3)} 1`; $('jM').textContent = `${Math.round(60 * k)} MIN`; $('jM').style.opacity = 1 - P(t, AF('c11', 'Y aceptó'), AF('c11', 'Y aceptó') + .2); golpeC('jX', t, AF('c11', 'aceptó'), -6); });
}
// ---------- 11 · La flota da la vuelta ----------
{
  const a = S('c12'), b = S('c13');
  scene('sVue', V(a, b, 0), `<svg class="full" id="vS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Esquema · posiciones aproximadas</div>
    <div class="cbig" style="position:absolute;right:70px;top:960px;font-size:120px;color:#ff2a2a;text-shadow:0 0 30px #000">18:30</div>`);
  const F = mapaFlotas('vS', { titulo: 'CONTRAMARCHA · 22/12 · 18:30' }), p0 = F.M.proj([-65.2, -55.9]), p1 = F.M.proj([-64.5, -55.0]);
  const tr = trazo(F.M.g, [p0, p1], { curva: [p0[0] + 160, p0[1] - 20], w: 4, col: ARG });
  RENDER.push(t => { if (!on('sVue')) return; [F.rh.r, F.rh.m.g, F.re.r, F.re.m.g].forEach(n => n.setAttribute('opacity', 1)); F.ch.forEach(g => g.setAttribute('opacity', 1)); const k = io(P(t, a + .2, b - .3)); tr.draw(k);
    const q = tr.p.getPointAtLength(tr.p.getTotalLength() * k); F.ar.forEach((g, i) => { g.setAttribute('opacity', 1); g.setAttribute('transform', `translate(${q.x + (i % 2) * 40 - 20} ${q.y + Math.floor(i / 2) * 36 - 18}) scale(.42)`); }); });
}
// ---------- 12 · Parte 2 ----------
{
  const a = S('c13'), b = TL.duration;
  scene('sP2', [a - .1, b + 1, .18, .01, 0], `<svg class="full" id="pS" viewBox="0 0 1080 1920"></svg>
    <div id="p2" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:130px;margin-top:20px;text-shadow:0 0 30px #000">SI NADIE<br><span class="r">LLAMABA</span></div></div>`);
  const proj = d3.geoMercator().fitExtent([[140, 560], [940, 1180]], { type: 'MultiPoint', coordinates: [[-76, -56], [-56, -30]] }), M = mundo($('pS'), { proj });
  M.pais('032', '#1a2a36'); M.pais('152', '#2a1a14');
  const fl = [[[-68.8, -32.9], [-70.65, -33.45]], [[-69.2, -51.6], [-70.9, -53.15]], [[-70.0, -40.6], [-72.5, -40.6]]].map(([p, q]) => trazo(M.g, [proj(p), proj(q)], { w: 6, col: '#ff2a2a' }));
  RENDER.push(t => { if (!on('sP2')) return; camMundo(M, 540, 960, 1); $('p2').style.opacity = P(t, a + .2, a + .6); fl.forEach((f, i) => f.draw(io(P(t, AF('c13', 'el plan') + i * .3, AF('c13', 'el plan') + 1 + i * .3)))); });
}
});
