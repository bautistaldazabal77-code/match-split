// "Pasó de verdad" · Adolf Eichmann, parte 1: quién era, cómo llegó a la Argentina y qué lo delató.
// Historia real. Fotos de dominio público o con licencia libre (web/img/fotos.json); mapas de Natural Earth y OpenStreetMap (tactico.js).
// Cortes rápidos: una imagen nueva cada 2 a 4 segundos. Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase').

captions([
  ['h1', 'San', 'a'], ['h1', 'Fernando', 'a'], ['h1', 'Ricardo', 'r'], ['h1', 'Klement', 'r'], ['h2', 'fábrica', 'a'], ['h2', 'colectivo', 'a'], ['h2', 'nombre', 'r'],
  ['c1', 'Adolf', 'r'], ['c1', 'Eichmann', 'r'], ['c1', 'Holocausto', 'r'], ['c2', 'Gestapo', 'a'], ['c2', 'trenes', 'r'], ['c2', 'exterminio', 'r'], ['c3', 'Wannsee', 'a'],
  ['c3', 'final', 'r'], ['c3', 'acta', 'a'], ['c4', 'Hungría', 'a'], ['c4', 'Auschwitz', 'r'], ['c4', 'treinta', 'r'], ['c5', 'estadounidenses', 'a'], ['c5', 'Otto', 'r'],
  ['c5', 'Eckmann', 'r'], ['c6', 'escapó', 'r'], ['c6', 'bosque', 'a'], ['c7', 'obispo', 'a'], ['c7', 'Roma', 'a'], ['c7', 'Cruz', 'r'], ['c7', 'Roja', 'r'], ['c8', 'Buenos', 'a'],
  ['c8', 'Aires', 'a'], ['c8', 'Tucumán', 'a'], ['c8', 'Mercedes-Benz', 'r'], ['c9', 'esposa', 'a'], ['c10', 'noviazgo', 'r'], ['c11', 'Lothar', 'a'], ['c11', 'Hermann', 'a'],
  ['c11', 'ciego', 'a'], ['c11', 'real', 'r'], ['c11', 'guerra', 'r'], ['c12', 'Fritz', 'a'], ['c12', 'Bauer', 'a'], ['c12', 'exnazis', 'r'], ['c12', 'secreto', 'r'], ['c12', 'Israel', 'a'],
  ['c13', 'Mossad', 'r'], ['c13', 'Garibaldi', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c13') - .1,
  horas: [[2.6, '1960', true], [S('c2') - .1, '1939'], [S('c3') - .1, '1942'], [S('c4') - .1, '1944'], [S('c5') - .1, '1945'], [S('c6') - .1, '1946'], [S('c7') - .1, '1950'],
    [S('c9') - .1, '1952'], [S('c11') - .1, '1957'], [S('c13') - .1, '1960', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('ADOLF<br><span class="r">EICHMANN</span>');

const V = (a, b, z = 1.03) => [a - .1, b - .1, .18, .18, z];   // corte rápido
const AF = (id, f) => AT(id, f) - .15;                          // un poco antes de que se diga
// mapa del mundo encuadrado en una caja de coordenadas (lon/lat) para mapas de Europa y del Atlántico
function mapaGeo(sid, caja, ext = [[40, 340], [1040, 1140]]) {
  const proj = d3.geoMercator().fitExtent(ext, { type: 'MultiPoint', coordinates: caja });
  const M = mundo($(sid), { proj }); return M;
}

SETUP.push(() => {
// ---------- 1 · San Fernando, 1960 ----------
{
  const a = 0, b = AF('h1', 'vivía');
  scene('sMapa', [-1, b, .01, .18, 0], `<svg class="full" id="mS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaBsAs($('mS'), { centro: [-58.5, -34.55], ancho: .55, titulo: 'BUENOS AIRES · 1960', paso: .1, km: 5 });
  const [sx, sy] = M.proj([-58.596, -34.474]), [bx, by] = M.proj([-58.38, -34.60]);
  const m1 = marca(M.g, sx, sy), r1 = rotulo(M.g, sx + 30, sy + 8, 'SAN FERNANDO', { col: '#ff5050' }), r2 = rotulo(M.g, bx + 20, by + 8, 'CIUDAD DE BUENOS AIRES', { size: 18, col: '#8fa2b4' });
  el('circle', { cx: bx, cy: by, r: 8, fill: '#8fa2b4' }, M.g);
  RENDER.push(t => {
    if (!on('sMapa')) return; const z = lerp(1, 1.5, io(P(t, 2.4, b)));
    M.g.setAttribute('transform', `translate(${sx} ${sy}) scale(${z}) translate(${-sx} ${-sy})`);
    m1.g.setAttribute('opacity', P(t, .2, .6)); m1.pulso(t); r1.setAttribute('opacity', P(t, AF('h1', 'San Fernando'), AF('h1', 'San Fernando') + .3)); r2.setAttribute('opacity', P(t, AF('h1', 'Buenos'), AF('h1', 'Buenos') + .3));
  });
}
// ---------- 2 · Ricardo Klement ----------
{
  const a = AF('h1', 'vivía'), b = S('h2');
  scene('sKle', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#16120c,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:420px;height:560px;background:#e9e2d0;color:#1b1b1b;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(-1.5deg)">
      <div style="position:absolute;left:0;right:0;top:0;height:60px;background:#2b3a4a;color:#e9e2d0;font:500 24px Oswald;letter-spacing:.3em;display:flex;align-items:center;padding-left:28px">DOCUMENTO DE IDENTIDAD</div>
      <div style="position:absolute;left:30px;top:94px;width:300px;height:400px;background:url(img/klement.jpg) 50% 40%/cover;filter:grayscale(1) contrast(1.1);border:2px solid #555"></div>
      <div style="position:absolute;left:360px;top:100px;right:24px;font-family:'IBM Plex Mono';font-size:22px;color:#555">NOMBRE</div>
      <div id="kN" class="cbig" style="position:absolute;left:360px;top:130px;right:20px;font-size:92px;line-height:.9;color:#111"></div>
      <div style="position:absolute;left:360px;top:340px;right:24px;font-family:'IBM Plex Mono';font-size:22px;color:#555">VIVE EN</div>
      <div id="kV" style="position:absolute;left:360px;top:372px;right:20px;font:500 34px Oswald;color:#111;opacity:0">SAN FERNANDO<br>BUENOS AIRES</div></div>
    <div class="clbl" style="opacity:1"><i></i>Foto del pasaporte que usó (1950)</div>`);
  RENDER.push(t => { if (!on('sKle')) return; $('kN').innerHTML = typed(t, AF('h1', 'Ricardo'), AF('h1', 'Ricardo') + .8, 'RICARDO KLEMENT').replace(' ', '<br>'); $('kV').style.opacity = P(t, a + .9, a + 1.2); });
}
// ---------- 3 · Una vida común ----------
{
  const a = S('h2'), b = AF('h2', 'Pero');
  scene('sVida', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#121820,#050505 70%)"></div><svg class="full" id="vS" viewBox="0 0 1080 1920"></svg>
    ${[['fábrica', 'UNA FÁBRICA', 200], ['cuatro hijos', '4 HIJOS', 540], ['colectivo', 'EL COLECTIVO', 880]].map(([f, s, x], i) => `<div class="osw" id="vT${i}" data-t="${AF('h2', f)}" style="position:absolute;left:${x - 170}px;width:340px;top:860px;text-align:center;font-size:34px;letter-spacing:.14em;opacity:0">${s}</div>`).join('')}`);
  const sv = $('vS'), ic = [icono(sv, 'fabrica', 200, 720, 1.5), el('g', { opacity: 0 }, sv), icono(sv, 'colectivo', 880, 720, 1.3)];
  [[-54, 0], [-18, 10], [18, 10], [54, 0]].forEach(([dx, dy]) => { const c = icono(ic[1], 'chico', 540 + dx, 720 + dy, 1.4); c.setAttribute('opacity', 1); });
  const ts = [...document.querySelectorAll('#sVida [data-t]')];
  RENDER.push(t => { if (!on('sVida')) return; ts.forEach((n, i) => { const q = P(t, +n.dataset.t, +n.dataset.t + .25); n.style.opacity = q; ic[i].setAttribute('opacity', q); }); });
}
{
  const a = AF('h2', 'Pero'), b = S('c1');
  scene('sFalso', V(a, b, 1.05), `<div style="position:absolute;inset:0;background:#050505"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:520px;text-align:center;font-size:170px;color:#ece8e1">RICARDO<br>KLEMENT</div>
    <div id="fL" style="position:absolute;left:90px;right:90px;top:680px;height:16px;background:#ff2a2a;transform-origin:left;transform:scaleX(0) rotate(-4deg)"></div>
    ${selloC('fX', 'NOMBRE FALSO', 190, 900, 120)}`);
  RENDER.push(t => { if (!on('sFalso')) return; $('fL').style.transform = `rotate(-4deg) scaleX(${eo(P(t, AF('h2', 'no era'), AF('h2', 'no era') + .4))})`; golpeC('fX', t, AF('h2', 'nombre'), -6); });
}
// ---------- 4 · Era Adolf Eichmann ----------
fotoR('sRev', V(S('c1'), S('c2'), 0), 'eich1942.jpg', { pos: '50% 20%', bn: true, kb: [1.25, 1.08, 0, 0, 0, 0], lbl: 'Adolf Eichmann, oficial de las SS · 1942',
  titulo: 'ADOLF<br><span class="r">EICHMANN</span>', tT: AF('c1', 'Adolf'), size: 200, top: 700, pills: [[AF('c1', 'organizadores'), 'Uno de los organizadores del Holocausto']], pTop: 1060 });
RENDER.push(t => { const n = $('sRev'); if (n && on('sRev')) n.style.filter = t < S('c1') + .25 ? `brightness(${lerp(3, 1, P(t, S('c1') - .1, S('c1') + .25))})` : 'none'; });
// ---------- 5 · La oficina y los trenes ----------
fotoR('sOfi', V(S('c2'), AF('c2', 'trenes')), 'ivb4.jpg', { pos: '60% 50%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Berlín: donde estaba su oficina (hoy, un memorial)',
  pills: [[S('c2') + .1, 'Oficina de "asuntos judíos"'], [AF('c2', 'Gestapo'), 'Gestapo · Berlín']], pTop: 440 });
{
  const a = AF('c2', 'trenes'), b = S('c3');
  scene('sTren', V(a, b, 0), `<svg class="full" id="tS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Algunas de las rutas de deportación</div>
    <div id="tT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;opacity:0;text-shadow:0 0 30px #000">LOS<br><span class="r">TRENES</span></div>
    <div id="tP" class="cpill" style="position:absolute;left:64px;top:1080px;opacity:0">Hacia los campos de exterminio</div>`);
  const M = mapaGeo('tS', [[-2, 40], [27, 56]], [[20, 600], [1060, 1140]]);
  ['616', '276', '040', '203', '348'].forEach(c => M.pais(c, '#1c232c'));
  const campos = { AUSCHWITZ: [19.2, 50.03], TREBLINKA: [22.05, 52.63], SOBIBOR: [23.6, 51.45], BELZEC: [23.46, 50.37] };
  const origen = [[[4.9, 52.37], 'SOBIBOR'], [[2.35, 48.86], 'AUSCHWITZ'], [[13.4, 52.52], 'AUSCHWITZ'], [[16.37, 48.21], 'AUSCHWITZ'], [[14.42, 50.08], 'AUSCHWITZ'], [[19.04, 47.5], 'AUSCHWITZ'],
    [[21.01, 52.23], 'TREBLINKA'], [[12.5, 41.9], 'AUSCHWITZ'], [[22.94, 40.64], 'AUSCHWITZ'], [[24.03, 49.84], 'BELZEC']];
  const lin = origen.map(([o, c]) => { const p1 = M.proj(o), p2 = M.proj(campos[c]); return trazo(M.g, [p1, p2], { curva: [(p1[0] + p2[0]) / 2, Math.min(p1[1], p2[1]) - 60], col: '#ff2a2a', w: 3, punto: 7 }); });
  const cs = Object.entries(campos).map(([n, ll]) => { const [x, y] = M.proj(ll); el('circle', { cx: x, cy: y, r: 9, fill: '#ff2a2a', stroke: '#050505', 'stroke-width': 2 }, M.g); return rotulo(M.g, x + 14, y - 10, n, { size: 16, col: '#ff5050' }); });
  RENDER.push(t => {
    if (!on('sTren')) return; camMundo(M, 540, 960, lerp(1, 1.08, P(t, a, b)));
    lin.forEach((l, i) => l.draw(io(P(t, a + i * .12, a + 1.2 + i * .12)))); cs.forEach(r => r.setAttribute('opacity', P(t, a + .4, a + .8)));
    $('tT').style.opacity = P(t, a, a + .3); $('tP').style.opacity = P(t, AF('c2', 'campos'), AF('c2', 'campos') + .3);
  });
}
// ---------- 6 · Wannsee ----------
fotoR('sWan', V(S('c3'), AF('c3', 'solución')), 'wannsee.jpg', { pos: '50% 50%', kb: [1.15, 1.3, 0, 0, 0, 0], lbl: 'La villa de Wannsee, en Berlín',
  titulo: 'WANNSEE<br><span class="r">20·01·1942</span>', tT: AF('c3', 'Wannsee'), size: 170 });
fotoR('sSala', V(AF('c3', 'solución'), AF('c3', 'Él preparó')), 'wannseesala.jpg', { pos: '50% 50%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'La sala de la conferencia (hoy, un museo)',
  pills: [[AF('c3', 'solución'), '"La solución final"'], [AF('c3', 'final') + .4, '15 jerarcas nazis en una mesa']], pTop: 440 });
fotoR('sActa', V(AF('c3', 'Él preparó'), S('c4')), 'wannseelista.jpg', { pos: '50% 100%', bn: true, tinte: .15, kb: [1.4, 1.6, 0, 0, -20, 40], lbl: 'Su lista para la conferencia: "más de 11.000.000"',
  sello: { t: AF('c3', 'acta'), txt: 'EL ACTA: EICHMANN', x: 90, y: 560, size: 100 } });
// ---------- 7 · Hungría, 1944 ----------
{
  const a = S('c4'), b = AF('c4', 'En menos');
  scene('sHun', V(a, b, 0), `<svg class="full" id="hS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Hungría, 1944</div>
    <div id="hT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:150px;opacity:0;text-shadow:0 0 30px #000"><span class="r">4</span> TRENES<br>POR DÍA</div>`);
  const M = mapaGeo('hS', [[15, 45.4], [24.5, 51]], [[20, 680], [1060, 1140]]);
  M.pais('348', '#3a1010'); M.pais('616', '#1c232c');
  const [bx, by] = M.proj([19.04, 47.5]), [ax, ay] = M.proj([19.2, 50.03]);
  el('circle', { cx: bx, cy: by, r: 10, fill: '#ece8e1' }, M.g); el('circle', { cx: ax, cy: ay, r: 12, fill: '#ff2a2a' }, M.g);
  const rb = rotulo(M.g, bx + 18, by + 8, 'BUDAPEST', { size: 18 }), ra = rotulo(M.g, ax + 18, ay + 8, 'AUSCHWITZ', { size: 18, col: '#ff5050' });
  const tr = [0, 1, 2, 3].map(i => trazo(M.g, [[bx, by], [ax, ay]], { curva: [bx + 120 - i * 60, (by + ay) / 2], col: '#ff2a2a', w: 3, punto: 9 }));
  RENDER.push(t => {
    if (!on('sHun')) return; camMundo(M, 540, 960, 1);
    rb.setAttribute('opacity', P(t, a, a + .3)); ra.setAttribute('opacity', P(t, AF('c4', 'Auschwitz'), AF('c4', 'Auschwitz') + .3));
    $('hT').style.opacity = P(t, AF('c4', 'cuatro trenes'), AF('c4', 'cuatro trenes') + .3);
    tr.forEach((l, i) => { const t0 = AF('c4', 'cuatro trenes') + i * .35; l.draw(t < t0 ? 0 : ((t - t0) / 1.6) % 1); });
  });
}
{
  const a = AF('c4', 'En menos'), b = S('c5');
  scene('sNum', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#160404,#050505 70%)"></div>
    <div style="position:absolute;left:0;right:0;top:420px;text-align:center"><div class="osw" style="font-size:32px;letter-spacing:.3em;color:#8a8a8a">EN MENOS DE DOS MESES</div>
      <div class="cbig" style="font-size:210px;color:#ff2a2a">+<span id="nV">0</span></div><div class="osw" style="font-size:36px;letter-spacing:.2em">JUDÍOS DEPORTADOS DE HUNGRÍA</div></div>
    <div style="position:absolute;left:90px;right:90px;top:860px;display:grid;grid-template-columns:repeat(8,1fr);gap:10px">${Array.from({ length: 8 }, (_, i) => `<div class="nW" style="height:110px;border:2px solid #3a3a3a;font:400 30px 'Bebas Neue';color:#8a8a8a;padding:6px">S${i + 1}</div>`).join('')}</div>
    <div class="osw" style="position:absolute;left:90px;top:990px;font-size:22px;letter-spacing:.2em;color:#8a8a8a">MAYO — JULIO DE 1944 · LA MAYORÍA, ASESINADOS EN AUSCHWITZ</div>`);
  const ws = [...document.querySelectorAll('#sNum .nW')];
  RENDER.push(t => { if (!on('sNum')) return; const k = eo(P(t, a + .1, ATE('c4', 'judíos'))); $('nV').textContent = fmt(430000 * k); ws.forEach((w, i) => { const on1 = k * 8 > i; w.style.background = on1 ? '#7a0c0c' : 'transparent'; w.style.color = on1 ? '#fff' : '#8a8a8a'; }); });
}
// ---------- 8 · 1945: Otto Eckmann ----------
textosC('sRin', V(S('c5'), AF('c5', 'capturaron')), [
  { t: S('c5'), html: '<span class="r">MAYO 1945</span>', size: 200, top: 440 }, { t: AF('c5', 'rindió'), html: 'ALEMANIA SE RINDE', size: 120, top: 680 }]);
{
  const a = AF('c5', 'capturaron'), b = S('c6');
  scene('sOtto', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#141810,#050505 70%)"></div>
    <div style="position:absolute;left:80px;right:80px;top:420px;height:500px;background:#d8d2bc;color:#1b1b1b;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(1.5deg);padding:30px 36px">
      <div style="font:500 26px Oswald;letter-spacing:.24em;border-bottom:3px solid #1b1b1b;padding-bottom:12px">PRISIONERO DE GUERRA · EJÉRCITO DE EE. UU.</div>
      <div style="font-family:'IBM Plex Mono';font-size:22px;color:#555;margin-top:40px">NOMBRE DECLARADO</div><div id="oN" class="cbig" style="font-size:120px;color:#111;min-height:120px"></div>
      <div style="font-family:'IBM Plex Mono';font-size:22px;color:#555;margin-top:20px">IDENTIDAD REAL</div><div class="cbig" style="font-size:80px;color:#999">DESCONOCIDA</div></div>
    ${selloC('oX', 'NOMBRE FALSO', 230, 960, 110)}<div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  RENDER.push(t => { if (!on('sOtto')) return; $('oN').textContent = typed(t, AF('c5', 'Otto'), AF('c5', 'Otto') + .7, 'OTTO ECKMANN'); golpeC('oX', t, ATE('c5', 'Eckmann') + .1, -5); });
}
// ---------- 9 · Escondido en Alemania ----------
{
  const a = S('c6'), b = AF('c6', 'cuatro años');
  scene('sHuye', V(a, b, 0), `<svg class="full" id="gS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Alemania, 1946</div>
    <div id="gT" class="cbig" style="position:absolute;left:64px;top:380px;font-size:150px;text-shadow:0 0 30px #000">SE<br><span class="r">ESCAPA</span></div>`);
  const M = mapaGeo('gS', [[5.5, 47.2], [15.2, 55]], [[60, 640], [1020, 1140]]); M.pais('276', '#1c232c');
  const p1 = M.proj([12.66, 49.22]), p2 = M.proj([10.2, 52.7]), tr = trazo(M.g, [p1, p2], { curva: [p1[0] - 160, (p1[1] + p2[1]) / 2], w: 5, punto: 10 });
  const r1 = rotulo(M.g, p1[0] + 16, p1[1] + 8, 'CHAM: SE FUGA', { size: 18 }), r2 = rotulo(M.g, p2[0] + 16, p2[1] + 8, 'BREZAL DE LÜNEBURG', { size: 18, col: '#ff5050' });
  RENDER.push(t => { if (!on('sHuye')) return; camMundo(M, 540, 960, 1); tr.draw(io(P(t, a + .2, b - .2))); r1.setAttribute('opacity', P(t, a, a + .3)); r2.setAttribute('opacity', P(t, b - .6, b - .3)); });
}
{
  const a = AF('c6', 'cuatro años'), b = S('c7');
  scene('sBos', V(a, b, 1.05), `<div style="position:absolute;inset:0;background:linear-gradient(#050807,#0b1410 60%,#050505)"></div><svg class="full" id="bS" viewBox="0 0 1080 1920"></svg>
    <div class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:190px">4 AÑOS</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:580px;text-align:center;font-size:110px;color:#ff2a2a">ESCONDIDO</div>
    <div id="bP" class="cpill" style="position:absolute;left:64px;top:1060px;opacity:0">Otro nombre falso: Otto Henninger</div>`);
  const r = rnd(4); for (let i = 0; i < 26; i++) { const x = r() * 1120 - 20, h = 260 + r() * 300, y = 1150; el('path', { d: `M${x},${y} L${x - h * .18},${y} L${x},${y - h} L${x + h * .18},${y} Z`, fill: i % 2 ? '#0f1d16' : '#132219', opacity: .9 }, $('bS')); }
  RENDER.push(t => { if (on('sBos')) $('bP').style.opacity = P(t, AF('c6', 'bosque'), AF('c6', 'bosque') + .3); });
}
// ---------- 10 · 1950: la ruta de las ratas ----------
{
  const a = S('c7'), b = AF('c7', 'pasaporte');
  scene('sRata', V(a, b, 0), `<svg class="full" id="rS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>La huida de nazis por Italia</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;text-shadow:0 0 30px #000">LA RUTA DE<br><span class="r">LAS RATAS</span></div>
    <div id="rP" class="cpill" style="position:absolute;left:64px;top:1060px;opacity:0">Una red ligada al obispo Alois Hudal, en Roma</div>`);
  const M = mapaGeo('rS', [[6, 40.5], [14.5, 54]], [[140, 640], [940, 1150]]); M.pais('380', '#1c232c'); M.pais('276', '#141a21');
  const pL = M.proj([10.2, 52.7]), pR = M.proj([12.5, 41.9]), pG = M.proj([8.93, 44.41]);
  const t1 = trazo(M.g, [pL, pR], { curva: [pL[0] + 220, (pL[1] + pR[1]) / 2], w: 4, punto: 9, col: '#ece8e1' }), t2 = trazo(M.g, [pR, pG], { curva: [(pR[0] + pG[0]) / 2 + 60, pR[1] - 80], w: 4, punto: 9 });
  const rR = rotulo(M.g, pR[0] + 16, pR[1] + 8, 'ROMA', { size: 18 }), rG = rotulo(M.g, pG[0] - 16, pG[1] + 8, 'GÉNOVA', { size: 18, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => {
    if (!on('sRata')) return; camMundo(M, 540, 960, 1); t1.draw(io(P(t, a + .1, AF('c7', 'Roma')))); rR.setAttribute('opacity', P(t, AF('c7', 'Roma') - .2, AF('c7', 'Roma')));
    t2.draw(io(P(t, AF('c7', 'papeles'), b - .1))); rG.setAttribute('opacity', P(t, b - .5, b - .2)); $('rP').style.opacity = P(t, AF('c7', 'obispo'), AF('c7', 'obispo') + .3);
  });
}
fotoR('sPas', V(AF('c7', 'pasaporte'), S('c8'), 0), 'pasaporte.jpg', { pos: '50% 50%', kb: [1, 1.35, 0, -120, 0, -330], lbl: 'Su pasaporte de la Cruz Roja (1950)',
  pills: [[AF('c7', 'Ricardo'), 'Nombre: Ricardo Klement']], pTop: 440, sello: { t: AF('c7', 'Ricardo') + .5, txt: 'IDENTIDAD FALSA', x: 120, y: 600, size: 100 } });
// ---------- 11 · A la Argentina ----------
{
  const a = S('c8'), b = AF('c8', 'Trabajó');
  scene('sBarco', V(a, b, 0), `<svg class="full" id="oS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>De Génova a Buenos Aires, 1950</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:140px;text-shadow:0 0 30px #000">27 DÍAS<br><span class="r">EN BARCO</span></div>`);
  const proj = d3.geoNaturalEarth1().fitExtent([[60, 640], [1020, 1150]], { type: 'MultiPoint', coordinates: [[-62, -38], [12, 46]] }), M = mundo($('oS'), { proj });
  M.pais('032', '#3a1010'); M.pais('380', '#1c232c');
  const pG = proj([8.93, 44.41]), pB = proj([-58.38, -34.6]), tr = trazo(M.g, [pG, pB], { curva: [pG[0] - 260, (pG[1] + pB[1]) / 2 + 60], w: 4 });
  const barco = icono(M.g, 'barco', 0, 0, .55, '#ece8e1'), rG = rotulo(M.g, pG[0] + 14, pG[1] - 6, 'GÉNOVA · 17/6', { size: 16 }), rB = rotulo(M.g, pB[0] + 14, pB[1] + 8, 'BUENOS AIRES · 14/7', { size: 16, col: '#ff5050' });
  RENDER.push(t => {
    if (!on('sBarco')) return; camMundo(M, 540, 960, 1); const k = io(P(t, a + .1, b - .2)); tr.draw(k); const q = tr.p.getPointAtLength(tr.p.getTotalLength() * k);
    barco.setAttribute('transform', `translate(${q.x} ${q.y - 14}) scale(.55)`); barco.setAttribute('opacity', 1); rG.setAttribute('opacity', P(t, a, a + .3)); rB.setAttribute('opacity', P(t, b - .5, b - .2));
  });
}
{
  const a = AF('c8', 'Trabajó'), b = S('c9');
  scene('sArg', V(a, b, 0), `<svg class="full" id="aS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Argentina</div>
    <div id="aP0" class="cpill" style="position:absolute;left:64px;top:440px;opacity:0">Primero, Tucumán</div>
    <div id="aP1" class="cpill" style="position:absolute;left:64px;top:512px;opacity:0">Después, Mercedes-Benz: llegó a jefe</div>`);
  const proj = d3.geoMercator().fitExtent([[160, 600], [920, 1150]], { type: 'MultiPoint', coordinates: [[-68, -36], [-56, -24]] }), M = mundo($('aS'), { proj }); M.pais('032', '#1c232c');
  const pT = proj([-65.2, -26.8]), pB = proj([-58.68, -34.875]), tr = trazo(M.g, [pT, pB], { curva: [pT[0] + 200, (pT[1] + pB[1]) / 2 - 40], w: 4, punto: 9 });
  const mT = marca(M.g, ...pT, { col: '#ece8e1' }), mB = marca(M.g, ...pB), rT = rotulo(M.g, pT[0] + 24, pT[1] + 8, 'TUCUMÁN', { size: 18 }), rB = rotulo(M.g, pB[0] - 24, pB[1] + 8, 'MERCEDES-BENZ', { size: 18, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => {
    if (!on('sArg')) return; camMundo(M, 540, 960, 1); const tu = AF('c8', 'Tucumán'), me = AF('c8', 'Mercedes-Benz');
    mT.g.setAttribute('opacity', P(t, tu - .2, tu)); mT.pulso(t); rT.setAttribute('opacity', P(t, tu - .2, tu)); $('aP0').style.opacity = P(t, tu - .2, tu + .1);
    tr.draw(io(P(t, tu + .3, me))); mB.g.setAttribute('opacity', P(t, me - .2, me)); mB.pulso(t); rB.setAttribute('opacity', P(t, me - .2, me)); $('aP1').style.opacity = P(t, me - .2, me + .1);
  });
}
// ---------- 12 · La familia ----------
{
  const a = S('c9'), b = S('c10');
  scene('sFam', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#121820,#050505 70%)"></div><svg class="full" id="fS" viewBox="0 0 1080 1920"></svg>
    <div class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:220px;color:#ff2a2a">1952</div>
    <div id="fP" class="cpill" style="position:absolute;left:64px;top:1060px;opacity:0">Su esposa, Vera, y sus tres hijos</div>`);
  const sv = $('fS'), gs = [icono(sv, 'persona', 330, 880, 2.2), icono(sv, 'chico', 530, 900, 2), icono(sv, 'chico', 690, 900, 2), icono(sv, 'chico', 850, 900, 2)];
  RENDER.push(t => { if (!on('sFam')) return; gs.forEach((g, i) => mostrar(g, P(t, AF('c9', i ? 'hijos' : 'esposa') + i * .12, AF('c9', i ? 'hijos' : 'esposa') + .3 + i * .12))); $('fP').style.opacity = P(t, AF('c9', 'esposa'), AF('c9', 'esposa') + .3); });
}
// ---------- 13 · Lo delató un noviazgo ----------
{
  const a = S('c10'), b = S('c11');
  scene('sNov', V(a, b, 1.08), `<div style="position:absolute;inset:0;background:#050505"></div>
    <div id="nT" class="cbig" style="position:absolute;left:0;right:0;top:560px;text-align:center;font-size:170px">LO DELATÓ<br><span class="r">UN NOVIAZGO</span></div>`);
  RENDER.push(t => { if (!on('sNov')) return; const g = Math.floor(t * 24) % 4 === 0 && t < a + .6; $('nT').style.textShadow = g ? '-10px 0 rgba(255,42,42,.8),10px 0 rgba(0,200,255,.4)' : '0 0 30px #000'; });
}
{
  const a = S('c11'), b = AF('c11', 'El chico');
  scene('sRed', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#16120c,#050505 70%)"></div><svg class="full" id="eS" viewBox="0 0 1080 1920"></svg>
    ${[['hijos', 64, 760, 'UNO DE SUS HIJOS', 'Hijo de Eichmann'], ['hija', 576, 760, 'SILVIA HERMANN', 'Su novia'], ['Lothar', 576, 420, 'LOTHAR HERMANN', 'Judío alemán, ciego']].map(([f, x, y, n, d], i) => `<div class="ctarj" data-t="${AF('c11', f)}" style="position:absolute;left:${x}px;top:${y}px;width:440px;height:200px;background:#e9e2d0;color:#111;padding:20px 24px;opacity:0;box-shadow:0 20px 50px rgba(0,0,0,.7)">
      <div class="osw" style="font-size:20px;letter-spacing:.2em;color:${i === 2 ? '#7a0c0c' : '#555'}">${i === 2 ? 'EL PADRE DE ELLA' : i ? 'ELLA' : 'ÉL'}</div><div class="cbig" style="font-size:58px;line-height:1;margin-top:8px;color:#111;text-shadow:none">${n}</div><div style="font:400 24px Inter;color:#444;margin-top:6px">${d}</div></div>`).join('')}`);
  const sv = $('eS'), l1 = trazo(sv, [[504, 860], [576, 860]], { w: 6 }), l2 = trazo(sv, [[796, 620], [796, 760]], { w: 6, col: '#ece8e1' });
  const ts = [...document.querySelectorAll('#sRed .ctarj')];
  RENDER.push(t => { if (!on('sRed')) return; ts.forEach(n => { const q = P(t, +n.dataset.t, +n.dataset.t + .25); n.style.opacity = q; n.style.transform = `translateY(${lerp(20, 0, eo(q))}px) rotate(${n.style.left === '64px' ? -1 : 1}deg)`; });
    l1.draw(P(t, AF('c11', 'hija'), AF('c11', 'hija') + .3)); l2.draw(P(t, AF('c11', 'Lothar'), AF('c11', 'Lothar') + .3)); });
}
{
  const a = AF('c11', 'El chico'), b = S('c12');
  scene('sApe', V(a, b, 1.05), `<div style="position:absolute;inset:0;background:#050505"></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:34px;letter-spacing:.3em;color:#8a8a8a">EL CHICO USABA EL APELLIDO REAL</div>
    <div id="pE" class="cbig" style="position:absolute;left:0;right:0;top:500px;text-align:center;font-size:200px;color:#ff2a2a">EICHMANN</div>
    <div id="pP" class="cpill" style="position:absolute;left:64px;top:1020px;opacity:0">Hablaba de lo que hizo su padre en la guerra</div>`);
  RENDER.push(t => { if (!on('sApe')) return; const q = P(t, AF('c11', 'apellido'), AF('c11', 'apellido') + .3); $('pE').style.transform = `scale(${lerp(1.4, 1, eo(q))})`; $('pE').style.opacity = q; $('pP').style.opacity = P(t, AF('c11', 'hablaba'), AF('c11', 'hablaba') + .3); });
}
// ---------- 14 · La carta ----------
{
  const a = S('c12'), b = AF('c12', 'Bauer no');
  scene('sCar', V(a, b, 0), `<svg class="full" id="cS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Una carta de la Argentina a Alemania</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:130px;text-shadow:0 0 30px #000">LA <span class="r">CARTA</span></div>`);
  const proj = d3.geoNaturalEarth1().fitExtent([[40, 600], [1040, 1150]], { type: 'MultiPoint', coordinates: [[-62, -38], [25, 55]] }), M = mundo($('cS'), { proj });
  M.pais('032', '#1c232c'); M.pais('276', '#3a1010');
  const pA = proj([-62.0, -37.5]), pF = proj([8.68, 50.11]), tr = trazo(M.g, [pA, pF], { curva: [pA[0] + 60, pF[1] + 120], w: 4 }), sobre = icono(M.g, 'carta', 0, 0, .6);
  const rF = rotulo(M.g, pF[0] + 16, pF[1] + 8, 'FRANKFURT', { size: 18, col: '#ff5050' });
  RENDER.push(t => { if (!on('sCar')) return; camMundo(M, 540, 960, 1); const k = io(P(t, a + .1, b - .2)); tr.draw(k); const q = tr.p.getPointAtLength(tr.p.getTotalLength() * k); sobre.setAttribute('transform', `translate(${q.x} ${q.y}) scale(.6)`); sobre.setAttribute('opacity', 1); rF.setAttribute('opacity', P(t, b - .5, b - .2)); });
}
fotoR('sBau', V(AF('c12', 'Bauer no'), AF('c12', 'y le pasó')), 'bauer.jpg', { pos: '50% 30%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Fritz Bauer, fiscal general de Hesse',
  titulo: 'FRITZ<br><span class="r">BAUER</span>', tT: AF('c12', 'Bauer no') - .3, size: 190, top: 700, pills: [[AF('c12', 'exnazis'), 'Desconfiaba: había exnazis en la justicia']], pTop: 1060 });
{
  const a = AF('c12', 'y le pasó'), b = S('c13');
  scene('sIsr', V(a, b, 0), `<svg class="full" id="iS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>De Alemania a Israel</div>${selloC('iX', 'SECRETO', 300, 420, 150)}`);
  const proj = d3.geoMercator().fitExtent([[60, 620], [1020, 1150]], { type: 'MultiPoint', coordinates: [[4, 30], [37, 53]] }), M = mundo($('iS'), { proj }); M.pais('276', '#1c232c'); M.pais('376', '#3a1010');
  const pF = proj([8.68, 50.11]), pI = proj([34.8, 32.08]), tr = trazo(M.g, [pF, pI], { curva: [pF[0] + 300, pF[1] + 40], w: 5, punto: 10 }), rI = rotulo(M.g, pI[0] - 16, pI[1] + 8, 'ISRAEL', { size: 18, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => { if (!on('sIsr')) return; camMundo(M, 540, 960, 1); tr.draw(io(P(t, a + .1, a + 1.3))); rI.setAttribute('opacity', P(t, a + 1, a + 1.3)); golpeC('iX', t, AF('c12', 'secreto'), -8); });
}
// ---------- 15 · Parte 2 ----------
{
  const a = S('c13'), b = TL.duration;
  scene('sP2', [a - .1, b + 1, .18, .01, 0], `<svg class="full" id="pS" viewBox="0 0 1080 1920"></svg>
    <div id="p2" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:150px;margin-top:20px;text-shadow:0 0 30px #000">EL <span class="r">MOSSAD</span></div></div>
    <div id="pR" class="cbig" style="position:absolute;right:70px;top:960px;font-size:120px;color:#ff2a2a;opacity:0;text-shadow:0 0 30px #000">19:40</div>`);
  const M = mapaCalle($('pS'), { centro: [-58.5962, -34.4733], ancho: .014, titulo: 'SAN FERNANDO · CALLE GARIBALDI' });
  const [hx, hy] = M.proj([-58.5958, -34.4739]), mk = marca(M.g, hx, hy);
  RENDER.push(t => { if (!on('sP2')) return; const z = lerp(1, 1.35, io(P(t, a, b))); M.g.setAttribute('transform', `translate(${hx} ${hy}) scale(${z}) translate(${-hx} ${-hy})`); mk.g.setAttribute('opacity', P(t, a + .4, a + .8)); mk.pulso(t);
    $('p2').style.opacity = P(t, a + .1, a + .5); $('pR').style.opacity = P(t, AF('c13', 'colectivo'), AF('c13', 'colectivo') + .3) * (Math.floor(t * 2) % 2 ? 1 : .55); });
}
});
