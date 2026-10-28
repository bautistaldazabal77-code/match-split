// "Pasó de verdad" · Adolf Eichmann, parte 2: la operación del Mossad, del dato a Israel (1959-1960).
// Historia real. Fotos libres (../12-eichmann-1/web/img/fotos.json); mapas de Natural Earth y OpenStreetMap (../12-eichmann-1/web/tactico.js).
// Los recorridos sobre el mapa de la calle Garibaldi son una reconstrucción aproximada sobre el mapa actual.

captions([
  ['h1', 'Mossad', 'r'], ['h1', 'Olivos', 'a'], ['h1', 'pobre', 'a'], ['h2', 'volvió', 'r'], ['c1', 'Garibaldi', 'a'], ['c1', 'Fichmann', 'r'], ['c1', 'letra', 'r'], ['c2', 'Zvi', 'a'],
  ['c2', 'Aharoni', 'a'], ['c2', 'vigilarlo', 'r'], ['c3', 'veintiuno', 'a'], ['c3', 'plata', 'a'], ['c3', 'coincidía', 'r'], ['c3', 'él', 'r'], ['c4', 'Isser', 'a'], ['c4', 'Harel', 'a'],
  ['c4', 'patentes', 'r'], ['c4', 'esposas', 'r'], ['c5', 'Once', 'r'], ['c5', 'mayo', 'r'], ['c5', 'capó', 'a'], ['c6', 'siete', 'a'], ['c6', 'cuarenta', 'a'], ['c6', 'bajó', 'r'],
  ['c7', 'ocho', 'a'], ['c7', 'cinco', 'a'], ['c7', 'él', 'r'], ['c8', 'Peter', 'a'], ['c8', 'Malkin', 'a'], ['c8', 'momentito', 'r'], ['c8', 'veinte', 'r'], ['c9', 'cicatrices', 'a'],
  ['c9', 'él', 'r'], ['c10', 'nueve', 'a'], ['c10', 'SS', 'r'], ['c10', 'juzgado', 'r'], ['c11', 'excusa', 'r'], ['c11', 'ciento', 'a'], ['c11', 'Mayo', 'a'], ['c11', 'El', 'a'], ['c11', 'Al', 'a'],
  ['c12', 'drogaron', 'r'], ['c12', 'tripulante', 'a'], ['c12', 'Ezeiza', 'a'], ['c12', 'mal', 'r'], ['c13', 'medianoche', 'a'], ['c13', 'Dakar', 'a'], ['c13', 'Israel', 'r'],
  ['c14', 'Ben-Gurion', 'a'], ['c14', 'Parlamento', 'a'], ['c14', 'Israel', 'r'], ['c15', 'tres', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c15') - .1,
  horas: [[2.6, '1958'], [S('h2') - .1, '1959'], [S('c2') - .1, 'FEB 1960'], [S('c3') - .1, '21 MAR'], [S('c4') - .1, 'ABR 1960'], [S('c5') - .1, '11 MAY', true], [S('c6') - .1, '19:40', true],
    [S('c7') - .1, '20:05', true], [S('c10') - .1, '11-20 MAY'], [S('c12') - .1, '20 MAY', true], [S('c13') - .1, '21 MAY'], [S('c14') - .1, '23 MAY']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('ADOLF<br><span class="r">EICHMANN</span>', { sup: 'PARTE 2' });

const V = (a, b, z = 1.03) => [a - .1, b - .1, .18, .18, z];
const AF = (id, f) => AT(id, f) - .15;
const OLI = [-58.5059, -34.5021], GAR = [-58.5958, -34.4739], EZE = [-58.5474, -34.8168];
// reconstrucción aproximada sobre el mapa actual: parada en la esquina de Garibaldi y la avenida, casa unos metros adentro
const ESQ = [-58.5975, -34.4737], AV0 = [-58.5959, -34.4667], AU1 = [-58.5968, -34.47375], AU2 = [-58.5950, -34.47405];

SETUP.push(() => {
// ---------- 1 · Olivos: la pista descartada ----------
{
  const a = 0, b = AF('h1', 'descartó');
  scene('sOli', [-1, b, .01, .18, 0], `<svg class="full" id="oS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaBsAs($('oS'), { centro: [-58.53, -34.5], ancho: .3, titulo: 'OLIVOS · 1958', km: 2, paso: .05 });
  const [x, y] = M.proj(OLI), m = marca(M.g, x, y, { col: '#ece8e1' }), r = rotulo(M.g, x + 30, y + 8, 'CALLE CHACABUCO, OLIVOS', { size: 20 });
  RENDER.push(t => { if (!on('sOli')) return; m.g.setAttribute('opacity', P(t, .2, .5)); m.pulso(t); r.setAttribute('opacity', P(t, AF('h1', 'Olivos') - .2, AF('h1', 'Olivos'))); });
}
{
  const a = AF('h1', 'descartó'), b = S('h2');
  scene('sDes', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#141414,#050505 70%)"></div>
    <div style="position:absolute;left:80px;right:80px;top:420px;height:480px;background:#e9e2d0;color:#1b1b1b;padding:30px 36px;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(-1deg)">
      <div style="font:500 24px Oswald;letter-spacing:.3em;border-bottom:3px solid #1b1b1b;padding-bottom:10px">INFORME · OLIVOS</div>
      <div style="font-family:'IBM Plex Mono';font-size:28px;line-height:1.6;margin-top:26px">CASA: <b>MUY HUMILDE</b><br>¿UN ALTO JEFE NAZI? <b>NO PARECE</b><br>CONCLUSIÓN:</div></div>
    ${selloC('dX', 'DESCARTADO', 230, 800, 130)}<div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  RENDER.push(t => { if (on('sDes')) golpeC('dX', t, AF('h1', 'pobre'), -6); });
}
{
  const a = S('h2'), b = S('c1');
  scene('sVol', V(a, b, 1.06), `<div style="position:absolute;inset:0;background:#050505"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:260px;color:#ff2a2a">1959</div>
    <div id="vT" class="cbig" style="position:absolute;left:0;right:0;top:720px;text-align:center;font-size:150px;opacity:0">EL DATO<br>VUELVE</div>`);
  RENDER.push(t => { if (!on('sVol')) return; const q = P(t, AF('h2', 'dato'), AF('h2', 'dato') + .3); $('vT').style.opacity = q; $('vT').style.textShadow = Math.floor(t * 24) % 5 === 0 && q < 1 ? '-10px 0 rgba(255,42,42,.8),10px 0 rgba(0,200,255,.4)' : '0 0 30px #000'; });
}
// ---------- 2 · La calle Garibaldi ----------
{
  const a = S('c1'), b = AF('c1', 'a una casa');
  scene('sMud', V(a, b, 0), `<svg class="full" id="uS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaBsAs($('uS'), { centro: [-58.55, -34.49], ancho: .2, titulo: 'LA MUDANZA', km: 2, paso: .05 });
  const pO = M.proj(OLI), pG = M.proj(GAR), tr = trazo(M.g, [pO, pG], { curva: [(pO[0] + pG[0]) / 2 + 60, Math.min(pO[1], pG[1]) - 60], w: 5, punto: 10 });
  const mO = marca(M.g, ...pO, { col: '#8fa2b4' }), mG = marca(M.g, ...pG), rO = rotulo(M.g, pO[0] + 26, pO[1] + 8, 'OLIVOS', { size: 18, col: '#8fa2b4' }), rG = rotulo(M.g, pG[0] - 26, pG[1] + 8, 'CALLE GARIBALDI', { size: 20, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => { if (!on('sMud')) return; mO.g.setAttribute('opacity', 1); rO.setAttribute('opacity', 1); tr.draw(io(P(t, a + .2, AF('c1', 'Garibaldi') + .3))); const q = P(t, AF('c1', 'Garibaldi'), AF('c1', 'Garibaldi') + .3); mG.g.setAttribute('opacity', q); mG.pulso(t); rG.setAttribute('opacity', q); });
}
{
  const a = AF('c1', 'a una casa'), b = S('c2');
  scene('sNom', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#16120c,#050505 70%)"></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:30px;letter-spacing:.3em;color:#8a8a8a">LA CASA ESTABA A NOMBRE DE</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:480px;text-align:center;font-size:96px;line-height:1">VERÓNICA LIEBL<br>DE <span id="nF">F</span>ICHMANN</div>
    <div id="nE" style="position:absolute;left:0;right:0;top:760px;text-align:center;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">SU ESPOSA ERA</div>
      <div class="cbig" style="font-size:96px;line-height:1;margin-top:10px">VERA LIEBL<br>DE <span class="r">E</span>ICHMANN</div></div>`);
  RENDER.push(t => { if (!on('sNom')) return; const q = P(t, AF('c1', 'Una letra'), AF('c1', 'Una letra') + .3); $('nE').style.opacity = q; $('nF').style.color = q > 0 ? '#ff2a2a' : '#ece8e1'; $('nF').style.textShadow = q > 0 ? '0 0 30px #ff2a2a' : 'none'; });
}
// ---------- 3 · Zvi Aharoni vigila ----------
{
  const a = S('c2'), b = AF('c2', 'a vigilarlo');
  scene('sAha', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#0d141b,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:420px;border:2px solid #3b4a5a;background:rgba(8,12,16,.9);padding:30px">
      <div class="mono" style="font-size:22px;color:#8fa2b4;letter-spacing:.2em">LLEGADA · BUENOS AIRES</div>
      <div class="cbig" style="font-size:120px;line-height:1;margin-top:16px">ZVI<br><span class="r">AHARONI</span></div>
      <div class="mono" id="aD" style="font-size:26px;line-height:1.7;margin-top:20px;color:#cfd8e0"></div></div>`);
  const txt = 'INVESTIGADOR · SERVICIO SECRETO DE ISRAEL\nFECHA: FINES DE FEBRERO DE 1960\nMISIÓN: CONFIRMAR QUIÉN ES "KLEMENT"';
  RENDER.push(t => { if (on('sAha')) $('aD').innerHTML = typed(t, a + .3, b - .2, txt).replace(/\n/g, '<br>'); });
}
{
  const a = AF('c2', 'a vigilarlo'), b = S('c3');
  scene('sVig', V(a, b, 0), `<svg class="full" id="gS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Reconstrucción aproximada · mapa actual</div>`);
  const M = mapaCalle($('gS'), { centro: [-58.5958, -34.4733], ancho: .009, titulo: 'VIGILANCIA · CALLE GARIBALDI', km: .1, paso: .002 });
  const [hx, hy] = M.proj(GAR), [ox, oy] = M.proj([-58.5932, -34.4752]), casa = marca(M.g, hx, hy), rc = rotulo(M.g, hx + 26, hy - 18, 'CASA DE "KLEMENT" (APROX.)', { size: 18, col: '#ff5050' });
  const cono = el('path', { d: `M${ox},${oy} L${hx - 40},${hy - 30} L${hx + 40},${hy + 30} Z`, fill: 'rgba(255,42,42,.18)', stroke: '#ff2a2a', 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0 }, M.g);
  const ojo = icono(M.g, 'persona', ox, oy, .5, '#8fa2b4');
  RENDER.push(t => { if (!on('sVig')) return; casa.g.setAttribute('opacity', 1); casa.pulso(t); rc.setAttribute('opacity', P(t, a + .2, a + .5)); ojo.setAttribute('opacity', 1); cono.setAttribute('opacity', P(t, a + .3, a + .6) * (.6 + .4 * Math.sin(t * 6))); });
}
// ---------- 4 · 21 de marzo: las bodas de plata ----------
calendarioR('sFes', V(S('c3'), AF('c3', 'La fecha')), { mes: 'MARZO <span class="r">1960</span>', primero: 1, t0: S('c3') + .05,
  marcas: [{ d: 21, t: AF('c3', 'festejo'), txt: 'FESTEJO EN LA CASA' }] });
{
  const a = AF('c3', 'La fecha'), b = S('c4');
  scene('sCoi', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#16120c,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:420px">
      <div class="osw" style="font-size:28px;letter-spacing:.24em;color:#8a8a8a">21 DE MARZO DE 1935</div><div class="cbig" style="font-size:80px">SE CASAN ADOLF Y VERA EICHMANN</div>
      <div class="osw" style="font-size:28px;letter-spacing:.24em;color:#8a8a8a;margin-top:40px">21 DE MARZO DE 1960</div><div class="cbig" style="font-size:80px"><span class="r">25 AÑOS DESPUÉS:</span> FESTEJO EN LA CASA DE "KLEMENT"</div></div>
    ${selloC('cX', 'ES ÉL', 330, 940, 150)}`);
  RENDER.push(t => { if (on('sCoi')) golpeC('cX', t, AF('c3', 'Era él'), -6); });
}
// ---------- 5 · Isser Harel y el equipo ----------
fotoR('sHar', V(S('c4'), AF('c4', 'Mandaron')), 'harel.jpg', { pos: '50% 25%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Isser Harel',
  titulo: 'ISSER<br><span class="r">HAREL</span>', tT: AF('c4', 'Isser'), size: 180, top: 630, pills: [[AF('c4', 'jefe'), 'El jefe del Mossad'], [AF('c4', 'viajó'), 'Viajó él mismo a Buenos Aires']], pTop: 990 });
{
  const a = AF('c4', 'Mandaron'), b = S('c5');
  const it = [['radios', '8', 'RADIOS'], ['binoculares', '4', 'BINOCULARES'], ['patentes', '12', 'PATENTES FALSAS'], ['esposas', '3', 'PARES DE ESPOSAS'], ['maquillaje', '1', 'EQUIPO DE MAQUILLAJE']];
  scene('sKit', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#0d141b,#050505 70%)"></div>
    <div class="osw" style="position:absolute;left:64px;top:390px;font-size:30px;letter-spacing:.3em;color:#8fa2b4">EQUIPO ENVIADO A BUENOS AIRES</div>
    ${it.map(([f, n, s], i) => `<div class="kI" data-t="${AF('c4', f)}" style="position:absolute;left:64px;right:64px;top:${450 + i * 128}px;height:112px;border-bottom:2px solid #2b3744;display:flex;align-items:center;gap:30px;opacity:.15">
      <div style="width:56px;height:56px;border:3px solid #ece8e1;display:flex;align-items:center;justify-content:center;font:700 40px Inter;color:#ff2a2a" class="kC"></div>
      <div class="cbig" style="font-size:96px;width:120px;color:#ff2a2a">${n}</div><div class="cbig" style="font-size:66px">${s}</div></div>`).join('')}`);
  const ns = [...document.querySelectorAll('#sKit .kI')];
  RENDER.push(t => { if (!on('sKit')) return; ns.forEach(n => { const q = P(t, +n.dataset.t - .05, +n.dataset.t + .15); n.style.opacity = lerp(.15, 1, q); n.querySelector('.kC').textContent = q > .5 ? '✓' : ''; }); });
}
// ---------- 6 · 11 de mayo ----------
textosC('sOnc', V(S('c5'), AF('c5', 'Dos autos'), 1.06), [
  { t: S('c5'), html: '<span class="r">11·05·1960</span>', size: 210, top: 470 }, { t: S('c5') + .4, html: '<span style="font-size:.4em;letter-spacing:.3em;color:#8a8a8a">EL DÍA DE LA CAPTURA</span>', size: 110, top: 700 }]);
// mapa de la calle con los autos, el colectivo y el recorrido (reconstrucción aproximada)
function calleCaptura(sid, o = {}) {
  const M = mapaCalle($(sid), { centro: [-58.5963, -34.4722], ancho: .0075, titulo: o.titulo || 'CALLE GARIBALDI · 11/5/1960', km: .1, paso: .002 });
  const P_ = ll => M.proj(ll), [hx, hy] = P_(GAR), [ex, ey] = P_(ESQ);
  const casa = marca(M.g, hx, hy, { col: '#ff2a2a' }), rc = rotulo(M.g, hx + 24, hy + 40, 'CASA (APROX.)', { size: 16, col: '#ff5050' });
  const parada = el('g', { opacity: 0 }, M.g); el('rect', { x: ex - 14, y: ey - 14, width: 28, height: 28, fill: '#ffd24a', stroke: '#050505', 'stroke-width': 3 }, parada); const rp = rotulo(M.g, ex - 24, ey - 16, 'PARADA (APROX.)', { size: 16, col: '#ffd24a', anchor: 'end' });
  const [a1x, a1y] = P_(AU1), [a2x, a2y] = P_(AU2), au1 = icono(M.g, 'auto', a1x, a1y - 26, .55, '#8fd0ff'), au2 = icono(M.g, 'auto', a2x, a2y - 26, .55, '#8fd0ff');
  const r1 = rotulo(M.g, a1x - 10, a1y + 60, 'AUTO 1 · CAPÓ ABIERTO', { size: 15, col: '#8fd0ff', anchor: 'end' }), r2 = rotulo(M.g, a2x + 10, a2y + 60, 'AUTO 2', { size: 15, col: '#8fd0ff' });
  const [vx, vy] = P_(AV0), bus = icono(M.g, 'colectivo', vx, vy, .5, '#ffd24a'), pers = el('circle', { r: 11, fill: '#ece8e1', stroke: '#050505', 'stroke-width': 3, opacity: 0 }, M.g);
  return { M, casa, rc, parada, rp, au1, au2, r1, r2, bus, pers, ex, ey, vx, vy, hx, hy, a1x, a1y };
}
{
  const a = AF('c5', 'Dos autos'), b = S('c6');
  scene('sAut', V(a, b, 0), `<svg class="full" id="aS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Reconstrucción aproximada · mapa actual</div>`);
  const K = calleCaptura('aS');
  RENDER.push(t => { if (!on('sAut')) return; K.casa.g.setAttribute('opacity', 1); K.casa.pulso(t); K.rc.setAttribute('opacity', 1);
    [K.au1, K.r1].forEach(n => n.setAttribute('opacity', P(t, AF('c5', 'Uno') - .2, AF('c5', 'Uno') + .1))); [K.au2, K.r2].forEach(n => n.setAttribute('opacity', P(t, a + .2, a + .5)));
    K.au1.setAttribute('opacity', P(t, a, a + .3)); });
}
// ---------- 7 · 19:40 y 20:05 ----------
{
  const a = S('c6'), b = AF('c6', 'Ese día');
  scene('sB1', V(a, b, 0), `<svg class="full" id="b1S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Reconstrucción aproximada · mapa actual</div>
    <div class="cbig" style="position:absolute;right:80px;top:960px;font-size:130px;color:#ffd24a;text-shadow:0 0 30px #000">19:40</div>`);
  const K = calleCaptura('b1S');
  RENDER.push(t => { if (!on('sB1')) return; [K.casa.g, K.rc, K.au1, K.au2, K.parada, K.rp].forEach(n => n.setAttribute('opacity', 1)); K.casa.pulso(t);
    const k = io(P(t, a + .2, b - .2)); K.bus.setAttribute('opacity', 1); K.bus.setAttribute('transform', `translate(${lerp(K.vx, K.ex, k)} ${lerp(K.vy, K.ey, k) - 30}) scale(.5)`); });
}
{
  const a = AF('c6', 'Ese día'), b = S('c7');
  scene('sNoB', V(a, b, 1.06), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#160404,#050505 70%)"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:170px;color:#8a8a8a">19:40</div>
    <div style="position:absolute;left:250px;right:250px;top:520px;height:14px;background:#ff2a2a;transform:rotate(-6deg)"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:640px;text-align:center;font-size:190px">NO BAJÓ</div>
    <div id="nP" class="cpill" style="position:absolute;left:64px;top:1020px;opacity:0">Casi suspenden toda la operación</div>`);
  RENDER.push(t => { if (on('sNoB')) $('nP').style.opacity = P(t, AF('c6', 'Casi'), AF('c6', 'Casi') + .3); });
}
{
  const a = S('c7'), b = S('c8');
  scene('sB2', V(a, b, 0), `<svg class="full" id="b2S" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Reconstrucción aproximada · mapa actual</div>
    <div class="cbig" style="position:absolute;right:80px;top:960px;font-size:130px;color:#ff2a2a;text-shadow:0 0 30px #000">20:05</div>`);
  const K = calleCaptura('b2S');
  RENDER.push(t => { if (!on('sB2')) return; [K.casa.g, K.rc, K.au1, K.au2, K.parada].forEach(n => n.setAttribute('opacity', 1)); K.casa.pulso(t);
    const k = io(P(t, a, AF('c7', 'Y bajó'))); K.bus.setAttribute('opacity', 1); K.bus.setAttribute('transform', `translate(${lerp(K.vx, K.ex, k)} ${lerp(K.vy, K.ey, k) - 30}) scale(.5)`);
    const w = P(t, AF('c7', 'Y bajó'), b - .1); K.pers.setAttribute('opacity', w > 0 ? 1 : 0); K.pers.setAttribute('cx', lerp(K.ex, K.a1x, w)); K.pers.setAttribute('cy', lerp(K.ey, K.a1y, w)); });
}
// ---------- 8 · "Un momentito, señor" ----------
fotoR('sMal', V(S('c8'), AF('c8', 'En veinte')), 'malkin.jpg', { pos: '50% 35%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Peter Malkin, en 1960',
  titulo: 'PETER<br><span class="r">MALKIN</span>', tT: AF('c8', 'Peter'), size: 190, top: 420, pills: [[AF('c8', 'un momentito'), '"Un momentito, señor"']], pTop: 780 });
{
  const a = AF('c8', 'En veinte'), b = S('c9');
  scene('sVei', V(a, b, 0), `<svg class="full" id="vS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Reconstrucción aproximada · mapa actual</div>
    <div style="position:absolute;right:80px;top:940px;text-align:right;text-shadow:0 0 30px #000"><div class="cbig" style="font-size:150px;color:#ff2a2a"><span id="vN">0</span> s</div></div>`);
  const K = calleCaptura('vS', { titulo: 'LA CAPTURA · 20:05' });
  RENDER.push(t => { if (!on('sVei')) return; [K.casa.g, K.rc, K.au1, K.au2, K.parada].forEach(n => n.setAttribute('opacity', 1)); K.casa.pulso(t);
    const k = P(t, a, b - .2); $('vN').textContent = Math.round(20 * k); K.pers.setAttribute('opacity', k < .7 ? 1 : 0); K.pers.setAttribute('cx', K.a1x); K.pers.setAttribute('cy', K.a1y);
    K.au1.setAttribute('transform', `translate(${K.a1x + lerp(0, 160, io(P(t, b - .9, b - .1)))} ${K.a1y - 26}) scale(.55)`); });
}
// ---------- 9 · Las cicatrices ----------
fotoR('sCic', V(S('c9'), S('c10')), 'lebenslauf.jpg', { pos: '30% 30%', bn: true, tinte: .2, kb: [1.3, 1.5, 0, 0, 0, 0], lbl: 'Documento de su legajo en las SS',
  pills: [[AF('c9', 'cicatrices'), 'Le revisaron las cicatrices']], pTop: 440, sello: { t: AF('c9', 'Era él'), txt: 'ES ÉL', x: 330, y: 760, size: 160 } });
// ---------- 10 · Nueve días, los números y la firma ----------
calendarioR('sNue', V(S('c10'), AF('c10', 'Dijo')), { mes: 'MAYO <span class="r">1960</span>', primero: 6, t0: S('c10'),
  marcas: Array.from({ length: 10 }, (_, i) => ({ d: 11 + i, t: AF('c10', 'nueve') + i * .12, txt: i ? (i === 9 ? 'SALE' : '') : 'CAPTURA', col: i === 0 || i === 9 ? '#c8101b' : '#5a1010' })),
  inner: '<div class="cpill" style="position:absolute;right:64px;top:410px">Casa segura · lugar no revelado</div>' });
{
  const a = AF('c10', 'Dijo'), b = AF('c10', 'firmó');
  scene('sNum', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#141414,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:430px">
      <div class="mono" style="font-size:26px;color:#8a8a8a">SS N.º</div><div id="n1" class="cbig" style="font-size:150px;color:#ff2a2a"></div>
      <div class="mono" style="font-size:26px;color:#8a8a8a;margin-top:20px">PARTIDO NAZI N.º</div><div id="n2" class="cbig" style="font-size:150px"></div></div>`);
  RENDER.push(t => { if (!on('sNum')) return; $('n1').textContent = typed(t, a + .1, a + .7, '45326'); $('n2').textContent = typed(t, a + .7, a + 1.4, '889895'); });
}
{
  const a = AF('c10', 'firmó'), b = S('c11');
  scene('sFir', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#16120c,#050505 70%)"></div>
    <div style="position:absolute;left:70px;right:70px;top:420px;height:600px;background:#efe9da;color:#1b1b1b;padding:44px 40px;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(-1deg)">
      <div class="mono" style="font-size:22px;color:#555">BUENOS AIRES, MAYO DE 1960</div>
      <div id="fT" style="font:italic 500 46px/1.3 'Cormorant Garamond';margin-top:26px;min-height:300px"></div>
      <svg width="400" height="90" style="position:absolute;left:60px;bottom:40px"><path id="fF" d="M10,60 C40,10 60,80 90,40 S140,20 160,55 S210,70 240,30 S300,50 380,40" fill="none" stroke="#1b1b1b" stroke-width="4" pathLength="1" stroke-dasharray="0 1"/></svg></div>
    <div class="clbl" style="opacity:1"><i></i>Comienzo de la declaración que firmó (traducción)</div>`);
  RENDER.push(t => { if (!on('sFir')) return; $('fT').textContent = typed(t, a + .1, b - .9, '"Yo, el abajo firmante, Adolf Eichmann, declaro voluntariamente…" que acepta ir a juicio en Israel.'); $('fF').style.strokeDasharray = `${P(t, b - .9, b - .2).toFixed(3)} 1`; });
}
// ---------- 11 · La excusa: los 150 años de Mayo ----------
textosC('sExc', V(S('c11'), AF('c11', 'la Argentina'), 1.06), [{ t: S('c11'), html: 'LA EXCUSA<br><span class="r">PERFECTA</span>', size: 200, top: 520 }]);
{
  const a = AF('c11', 'la Argentina'), b = AF('c11', 'e Israel');
  scene('sMay', V(a, b), `<div style="position:absolute;inset:0;background:linear-gradient(#5fa8d8 0 33%,#f2f2f2 33% 66%,#5fa8d8 66%);opacity:.18"></div><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(5,5,5,.3),#050505 75%)"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:110px;color:#8fc8ee">1810 — 1960</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:560px;text-align:center;font-size:250px">150 AÑOS</div>
    <div class="osw" style="position:absolute;left:0;right:0;top:850px;text-align:center;font-size:40px;letter-spacing:.2em">DE LA REVOLUCIÓN DE MAYO</div>`);
}
fotoR('sAvi', V(AF('c11', 'e Israel'), S('c12')), 'britannia.jpg', { pos: '45% 50%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Un Bristol Britannia, el mismo modelo del avión de El Al',
  pills: [[AF('c11', 'delegación'), 'Una delegación oficial de Israel'], [AF('c11', 'avión'), 'En un avión de El Al']], pTop: 440 });
// ---------- 12 · El disfraz y Ezeiza ----------
textosC('sDro', V(S('c12'), AF('c12', 'lo vistieron'), 1.05), [
  { t: S('c12'), html: '<span class="r">20 DE MAYO</span>', size: 170, top: 460 }, { t: AF('c12', 'drogaron'), html: 'LO DROGARON', size: 150, top: 660 }]);
{
  const a = AF('c12', 'lo vistieron'), b = AF('c12', 'Ezeiza');
  scene('sDis', V(a, b), `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#0d141b,#050505 70%)"></div>
    <div style="position:absolute;left:90px;right:90px;top:420px;height:520px;background:#e9e2d0;color:#111;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(1.2deg)">
      <div style="height:70px;background:#1f3b73;color:#fff;font:500 28px Oswald;letter-spacing:.3em;display:flex;align-items:center;padding-left:30px">EL AL · TRIPULACIÓN</div>
      <div style="position:absolute;left:30px;top:100px;width:260px;height:340px;background:url(img/klement.jpg) 50% 40%/cover;filter:grayscale(1) blur(1px)"></div>
      <div style="position:absolute;left:320px;top:110px;right:20px;font-family:'IBM Plex Mono';font-size:24px;line-height:1.8;color:#333">PUESTO: TRIPULANTE<br>ESTADO: "SE SINTIÓ MAL"<br>DOCUMENTO: FALSO</div></div>
    ${selloC('dX', 'PASAPORTE FALSO', 140, 900, 100)}<div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  RENDER.push(t => { if (on('sDis')) golpeC('dX', t, AF('c12', 'tripulante') + .4, -5); });
}
fotoR('sEze', V(AF('c12', 'Ezeiza'), S('c13')), 'ezeiza.jpg', { pos: '40% 45%', kb: [1.3, 1.6, 0, 0, 0, 0], lbl: 'Aeropuerto de Ezeiza (imagen satelital actual)',
  pills: [[AF('c12', 'Ezeiza'), 'Pasaron el control de Ezeiza'], [AF('c12', 'sentido'), 'Un alta médica falsa: "puede volar"']], pTop: 440 });
// ---------- 13 · El vuelo ----------
{
  const a = S('c13'), b = S('c14');
  scene('sVue', V(a, b, 0), `<svg class="full" id="wS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Buenos Aires — Dakar — Israel</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;text-shadow:0 0 30px #000">MEDIA<span class="r">NOCHE</span></div>`);
  const proj = d3.geoNaturalEarth1().fitExtent([[40, 600], [1040, 1150]], { type: 'MultiPoint', coordinates: [[-62, -38], [40, 36]] }), M = mundo($('wS'), { proj });
  M.pais('032', '#1c232c'); M.pais('376', '#3a1010'); M.pais('686', '#1c232c');
  const pB = proj([-58.54, -34.82]), pD = proj([-17.47, 14.72]), pI = proj([34.88, 32.0]);
  const t1 = trazo(M.g, [pB, pD], { curva: [pB[0] + 120, (pB[1] + pD[1]) / 2], w: 4 }), t2 = trazo(M.g, [pD, pI], { curva: [(pD[0] + pI[0]) / 2, pD[1] - 120], w: 4 });
  const avion = icono(M.g, 'avion', 0, 0, .4), rD = rotulo(M.g, pD[0] - 14, pD[1] + 8, 'DAKAR', { size: 16, anchor: 'end' }), rI = rotulo(M.g, pI[0] - 14, pI[1] - 14, 'ISRAEL · 22/5', { size: 16, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => {
    if (!on('sVue')) return; camMundo(M, 540, 960, 1); const d = AF('c13', 'Dakar'), i = AF('c13', 'Israel'), k1 = io(P(t, a, d + .2)), k2 = io(P(t, d + .2, i + .3));
    t1.draw(k1); t2.draw(k2); const pa = k2 > 0 ? t2.p : t1.p, kk = k2 > 0 ? k2 : k1, q = pa.getPointAtLength(pa.getTotalLength() * kk), q2 = pa.getPointAtLength(Math.min(pa.getTotalLength(), pa.getTotalLength() * kk + 2));
    avion.setAttribute('transform', `translate(${q.x} ${q.y}) rotate(${Math.atan2(q2.y - q.y, q2.x - q.x) * 180 / Math.PI}) scale(.4)`); avion.setAttribute('opacity', 1);
    rD.setAttribute('opacity', P(t, d - .2, d)); rI.setAttribute('opacity', P(t, i - .2, i));
  });
}
// ---------- 14 · El anuncio ----------
fotoR('sTel', V(S('c14'), AF('c14', 'Parlamento')), 'teletipo.jpg', { pos: '50% 40%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'El teletipo que transmitió los mensajes sobre la captura',
  titulo: '23·05·<span class="r">1960</span>', tT: S('c14'), size: 170, top: 420 });
fotoR('sBG', V(AF('c14', 'Parlamento'), S('c15')), 'equipo.jpg', { pos: '60% 40%', kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Ben-Gurion con integrantes de la operación',
  pills: [[AF('c14', 'Parlamento'), 'Ben-Gurion, en el Parlamento:'], [AF('c14', 'Eichmann estaba'), '"Eichmann está en Israel"']], pTop: 440 });
// ---------- 15 · Parte 3 ----------
{
  const a = S('c15'), b = TL.duration;
  fotoR('sP3', [a - .1, b + 1, .18, .01], 'juicio2.jpg', { pos: '40% 30%', bn: true, tinte: .4, kb: [1.15, 1.3, 0, 0, 0, 0],
    inner: `<div id="p3" style="position:absolute;left:0;right:0;top:420px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 3</div>
      <div class="cbig" style="font-size:130px;margin-top:20px;text-shadow:0 0 30px #000">LA FURIA DE<br>LA ARGENTINA<br><span class="r">Y EL JUICIO</span></div></div>` });
  RENDER.push(t => { if (on('sP3')) $('p3').style.opacity = P(t, a + .2, a + .7); });
}
});
