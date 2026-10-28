// "Pasó de verdad" · Adolf Eichmann, parte 3: la reacción argentina, la ONU, el juicio en Jerusalén y el final.
// Historia real. Fotos libres (../12-eichmann-1/web/img/fotos.json); mapas de Natural Earth (../12-eichmann-1/web/tactico.js).

captions([
  ['h1', 'veintitrés', 'a'], ['h1', 'mundo', 'a'], ['h1', 'preso', 'r'], ['h1', 'Israel', 'r'], ['h2', 'estalló', 'r'], ['c1', 'soberanía', 'r'], ['c1', 'secuestrado', 'r'],
  ['c2', 'voluntarios', 'a'], ['c2', 'pesar', 'a'], ['c2', 'ONU', 'r'], ['c3', 'Consejo', 'a'], ['c3', 'reparación', 'r'], ['c4', 'expulsó', 'r'], ['c4', 'embajador', 'a'],
  ['c4', 'terminado', 'a'], ['c5', 'juicio', 'r'], ['c5', 'Jerusalén', 'a'], ['c5', 'vidrio', 'a'], ['c5', 'blindado', 'a'], ['c6', 'seis', 'r'], ['c6', 'millones', 'r'],
  ['c7', 'ciento', 'a'], ['c7', 'doce', 'a'], ['c7', 'desmayó', 'r'], ['c8', 'órdenes', 'r'], ['c9', 'Hannah', 'a'], ['c9', 'Arendt', 'a'], ['c9', 'banalidad', 'r'], ['c9', 'mal', 'r'],
  ['c10', 'muerte', 'r'], ['c10', 'única', 'a'], ['c10', 'civil', 'a'], ['c11', 'Ramla', 'a'], ['c11', 'medianoche', 'r'], ['c12', 'Alemania', 'a'], ['c12', 'Argentina', 'r'],
  ['c12', 'Austria', 'a'], ['c13', 'cenizas', 'a'], ['c13', 'mar', 'a'], ['c13', 'tumba', 'r'], ['c14', 'Mengele', 'r'], ['c14', 'Auschwitz', 'a'], ['c15', 'Paraguay', 'a'],
  ['c15', 'Brasil', 'a'], ['c15', 'juzgado', 'r'], ['c16', 'razón', 'a'], ['c16', 'justicia', 'r'], ['c16', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 3', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'FECHA', hide: S('c16') - .1,
  horas: [[2.6, '23/5/1960', true], [S('c2') - .1, '3/6/1960'], [S('c3') - .1, '23/6/1960'], [S('c4') - .1, '22/7/1960'], [AT('c4', 'En agosto') - .2, '3/8/1960'],
    [S('c5') - .1, '11/4/1961'], [S('c10') - .1, '15/12/1961', true], [S('c11') - .1, '1/6/1962', true], [S('c14') - .1, '1960'], [S('c15') - .1, '1979']] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('ADOLF<br><span class="r">EICHMANN</span>', { sup: 'PARTE 3' });

const V = (a, b, z = 1.03) => [a - .1, b - .1, .18, .18, z];
const AF = (id, f) => AT(id, f) - .15;
const fondo = (c = '#140404') => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,${c},#050505 70%)"></div>`;
const papel = (html, o = {}) => `<div style="position:absolute;left:${o.l ?? 80}px;right:${o.r ?? 80}px;top:${o.top ?? 420}px;height:${o.h ?? 520}px;background:#efe9da;color:#1b1b1b;padding:34px 38px;box-shadow:0 30px 80px rgba(0,0,0,.8);transform:rotate(${o.rot ?? -1}deg)">${html}</div>`;

SETUP.push(() => {
// ---------- 1 · El mundo se entera ----------
{
  const a = 0, b = AF('h1', 'Adolf');
  scene('sDia', [-1, b, .01, .18, 1.04], `${fondo('#16120c')}
    ${[[-6, 120, 470], [4, 300, 560], [-2, 170, 650]].map(([r, x, y], i) => `<div class="dD" style="position:absolute;left:${x - 60}px;top:${y}px;width:760px;height:420px;background:#e8e2d2;color:#111;padding:24px 30px;transform:rotate(${r}deg);box-shadow:0 20px 60px rgba(0,0,0,.8);opacity:0">
      <div style="font:700 50px 'Cormorant Garamond';border-bottom:4px double #111;padding-bottom:6px">${['DIARIO', 'THE DAILY', 'ZEITUNG'][i]}</div>
      <div class="cbig" style="font-size:${i === 2 ? 92 : 70}px;line-height:.95;margin-top:16px;color:#111">${['CAPTURARON A EICHMANN', 'EICHMANN CAPTURED', 'EICHMANN IN ISRAEL'][i]}</div>
      <div style="margin-top:14px;height:10px;background:#bbb;width:90%"></div><div style="margin-top:10px;height:10px;background:#bbb;width:80%"></div><div style="margin-top:10px;height:10px;background:#bbb;width:85%"></div></div>`).join('')}
    <div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  const ds = [...document.querySelectorAll('#sDia .dD')];
  RENDER.push(t => { if (!on('sDia')) return; ds.forEach((d, i) => { const q = P(t, 2.7 + i * .35, 2.95 + i * .35); d.style.opacity = q; d.style.transform = `rotate(${[-6, 4, -2][i]}deg) scale(${lerp(1.3, 1, eo(q))})`; }); });
}
fotoR('sPre', V(AF('h1', 'Adolf'), S('h2')), 'ramla.jpg', { pos: '55% 40%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Eichmann en el patio de la cárcel de Ramla, 1961',
  titulo: 'PRESO EN<br><span class="r">ISRAEL</span>', tT: AF('h1', 'preso'), size: 170, top: 420 });
textosC('sEst', V(S('h2'), S('c1'), 1.08), [{ t: S('h2'), html: 'Y LA ARGENTINA<br><span class="r">ESTALLÓ</span>', size: 170, top: 560 }], { bg: fondo('#1a0303') });
RENDER.push(t => { const n = $('sEst'); if (n && on('sEst')) n.style.transform = t < AF('h2', 'estalló') + .4 && t > AF('h2', 'estalló') ? `translate(${(Math.sin(t * 90) * 8).toFixed(1)}px,0)` : 'none'; });
// ---------- 2 · Soberanía violada ----------
{
  const a = S('c1'), b = AF('c1', 'habían secuestrado');
  scene('sSob', V(a, b, 0), `<svg class="full" id="sS" viewBox="0 0 1080 1920"></svg>${selloC('sX', 'SOBERANÍA VIOLADA', 70, 420, 100)}`);
  const proj = d3.geoMercator().fitExtent([[200, 560], [880, 1150]], { type: 'MultiPoint', coordinates: [[-73, -55], [-53, -22]] }), M = mundo($('sS'), { proj }), ar = M.pais('032', '#3a1010');
  RENDER.push(t => { if (!on('sSob')) return; camMundo(M, 540, 960, 1); ar.setAttribute('fill', Math.floor(t * 3) % 2 ? '#5a1414' : '#3a1010'); golpeC('sX', t, AF('c1', 'soberanía'), -5); });
}
{
  const a = AF('c1', 'habían secuestrado'), b = S('c2');
  scene('sSec', V(a, b, 0), `<svg class="full" id="kS" viewBox="0 0 1080 1920"></svg>`);
  const M = mapaBsAs($('kS'), { centro: [-58.56, -34.64], ancho: .5, titulo: 'EL RECORRIDO DEL SECUESTRO', km: 5 });
  const pG = M.proj([-58.5958, -34.4739]), pE = M.proj([-58.5474, -34.8168]), tr = trazo(M.g, [pG, pE], { curva: [pG[0] - 160, (pG[1] + pE[1]) / 2], w: 5, punto: 10 });
  const mG = marca(M.g, ...pG), mE = marca(M.g, ...pE, { col: '#ece8e1' }), rG = rotulo(M.g, pG[0] + 26, pG[1] + 8, 'SAN FERNANDO · 11/5', { size: 18, col: '#ff5050' }), rE = rotulo(M.g, pE[0] + 26, pE[1] + 8, 'EZEIZA · 20/5', { size: 18 });
  RENDER.push(t => { if (!on('sSec')) return; [mG.g, rG].forEach(n => n.setAttribute('opacity', 1)); mG.pulso(t); tr.draw(io(P(t, a + .1, b - .4))); [mE.g, rE].forEach(n => n.setAttribute('opacity', P(t, b - .6, b - .3))); mE.pulso(t); });
}
// ---------- 3 · La nota de Israel y la ONU ----------
{
  const a = S('c2'), b = AF('c2', 'La Argentina');
  scene('sNot', V(a, b), `${fondo('#0d141b')}${papel(`<div class="mono" style="font-size:20px;color:#555">NOTA DE ISRAEL A LA ARGENTINA · 3 DE JUNIO DE 1960</div>
    <div style="font:500 44px/1.35 'Cormorant Garamond';margin-top:30px">…un grupo de <span id="nV" style="padding:0 6px">voluntarios</span>…<br><br>…expresa su <span id="nP" style="padding:0 6px">pesar</span>…</div>`)}
    <div class="clbl" style="opacity:1"><i></i>Fragmentos de la respuesta (traducción)</div>`);
  RENDER.push(t => { if (!on('sNot')) return; $('nV').style.background = t > AF('c2', 'voluntarios') ? '#ffd24a' : 'transparent'; $('nP').style.background = t > AF('c2', 'pesar') ? '#ffd24a' : 'transparent'; });
}
{
  const a = AF('c2', 'La Argentina'), b = S('c3');
  scene('sOnu', V(a, b, 1.05), `${fondo('#0d141b')}<svg class="full" id="uS" viewBox="0 0 1080 1920"></svg>
    <div class="cbig" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:200px;color:#8fc8ee">LA ONU</div>
    <div class="osw" style="position:absolute;left:0;right:0;top:600px;text-align:center;font-size:36px;letter-spacing:.24em">CONSEJO DE SEGURIDAD · NUEVA YORK</div>`);
  const sv = $('uS'); el('path', { d: 'M240,1080 A300,300 0 1,1 840,1080', fill: 'none', stroke: '#8fc8ee', 'stroke-width': 26, opacity: .5 }, sv);
  for (let i = 0; i < 11; i++) { const an = Math.PI + i * Math.PI / 10, x = 540 + 360 * Math.cos(an), y = 1080 + 360 * Math.sin(an); el('circle', { cx: x, cy: y, r: 16, fill: '#ece8e1', opacity: .8 }, sv); }
}
// ---------- 4 · Resolución 138 ----------
{
  const a = S('c3'), b = S('c4');
  scene('sRes', V(a, b), `${fondo('#0d141b')}${papel(`<div class="mono" style="font-size:20px;color:#555">NACIONES UNIDAS · CONSEJO DE SEGURIDAD</div>
    <div class="cbig" style="font-size:96px;color:#111;margin-top:10px">RESOLUCIÓN 138</div><div class="osw" style="font-size:26px;letter-spacing:.2em;color:#555">23 DE JUNIO DE 1960</div>
    <div style="font:500 40px/1.3 'Cormorant Garamond';margin-top:24px">…pide al Gobierno de Israel que haga una <span id="rR" style="padding:0 6px">reparación adecuada</span>…</div>
    <div id="rV" style="display:flex;gap:12px;margin-top:30px">${Array.from({ length: 10 }, (_, i) => `<i style="display:block;width:44px;height:44px;border-radius:50%;background:${i < 8 ? '#2d6a3e' : '#999'};opacity:0"></i>`).join('')}</div>
    <div class="mono" style="font-size:20px;color:#333;margin-top:12px">8 A FAVOR · 0 EN CONTRA · 2 ABSTENCIONES (URSS Y POLONIA)<br>LA ARGENTINA, COMO PARTE, NO VOTÓ</div>`, { h: 640, top: 400 })}`);
  const vs = [...document.querySelectorAll('#rV i')];
  RENDER.push(t => { if (!on('sRes')) return; $('rR').style.background = t > AF('c3', 'reparación') ? '#ffd24a' : 'transparent'; vs.forEach((v, i) => v.style.opacity = P(t, a + .4 + i * .12, a + .6 + i * .12)); });
}
{
  const a = S('c4'), b = AF('c4', 'En agosto');
  scene('sExp', V(a, b), `${fondo('#16120c')}${papel(`<div class="mono" style="font-size:20px;color:#555">MINISTERIO DE RELACIONES EXTERIORES · JULIO DE 1960</div>
    <div class="osw" style="font-size:26px;letter-spacing:.2em;color:#555;margin-top:30px">EMBAJADOR DE ISRAEL</div><div class="cbig" style="font-size:110px;color:#111">ARIEH LEVAVI</div>`, { h: 420 })}
    ${selloC('eX', 'PERSONA NON GRATA', 90, 760, 100)}<div class="clbl" style="opacity:1"><i></i>Ilustración</div>`);
  RENDER.push(t => { if (on('sExp')) golpeC('eX', t, AF('c4', 'expulsó'), -6); });
}
{
  const a = AF('c4', 'En agosto'), b = S('c5');
  scene('sAgo', V(a, b), `<div style="position:absolute;left:0;top:0;width:50%;height:100%;background:linear-gradient(#5fa8d8 0 33%,#f2f2f2 33% 66%,#5fa8d8 66%);opacity:.14"></div>
    <div style="position:absolute;right:0;top:0;width:50%;height:100%;background:linear-gradient(#f2f2f2 0 18%,#2a5bb8 18% 26%,#f2f2f2 26% 74%,#2a5bb8 74% 82%,#f2f2f2 82%);opacity:.12"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(5,5,5,.2),#050505 75%)"></div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:440px;text-align:center;font-size:120px;color:#8fc8ee">3 DE AGOSTO</div>
    <div class="cbig" style="position:absolute;left:0;right:0;top:600px;text-align:center;font-size:150px">CONFLICTO<br><span class="r">TERMINADO</span></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:940px;text-align:center;font-size:30px;letter-spacing:.2em">DECLARACIÓN CONJUNTA · ARGENTINA E ISRAEL</div>`);
}
// ---------- 5 · El juicio ----------
fotoR('sJui', V(S('c5'), AF('c5', 'Eichmann declaró')), 'jueces.jpg', { pos: '50% 50%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Los tres jueces del tribunal, Jerusalén',
  titulo: '11·04·<span class="r">1961</span>', tT: S('c5'), size: 170, top: 420, pills: [[AF('c5', 'Jerusalén'), 'Empieza el juicio en Jerusalén']], pTop: 620 });
fotoR('sCab', V(AF('c5', 'Eichmann declaró'), S('c6')), 'juicio2.jpg', { pos: '45% 15%', kb: [1.15, 1.35, 0, 0, 0, 0], lbl: 'El juicio, 1961: Eichmann, en la cabina de vidrio',
  pills: [[AF('c5', 'cabina'), 'Una cabina de vidrio blindado']], pTop: 1000 });
fotoR('sFis', V(S('c6'), AF('c6', 'seis millones')), 'juicio2.jpg', { pos: '70% 90%', bn: true, kb: [1.3, 1.45, 0, 0, 0, 0], lbl: 'El fiscal, Gideon Hausner (de pie)',
  pills: [[AF('c6', 'fiscal'), 'El fiscal: "No estoy solo"']], pTop: 440 });
{
  const a = AF('c6', 'seis millones'), b = S('c7');
  scene('sSei', V(a, b), `${fondo()}<canvas id="sC" width="1080" height="1920" style="position:absolute;inset:0"></canvas>
    <div style="position:absolute;left:0;right:0;top:400px;text-align:center;text-shadow:0 0 30px #000"><div class="cbig" style="font-size:190px;color:#ff2a2a" id="sV">0</div><div class="osw" style="font-size:40px;letter-spacing:.3em">ACUSADORES</div></div>`);
  const cv = $('sC').getContext('2d'), r = rnd(7), pts = Array.from({ length: 6000 }, () => [40 + r() * 1000, 660 + r() * 480]);
  RENDER.push(t => { if (!on('sSei')) return; const k = eo(P(t, a, ATE('c6', 'acusadores'))); $('sV').textContent = fmt(6e6 * k); cv.clearRect(0, 0, 1080, 1920); cv.fillStyle = 'rgba(236,232,225,.75)'; const n = Math.floor(6000 * k); for (let i = 0; i < n; i++) cv.fillRect(pts[i][0], pts[i][1], 3, 3); });
}
// ---------- 6 · Testigos y "solo cumplía órdenes" ----------
{
  const a = S('c7'), b = AF('c7', 'Uno de ellos');
  scene('sTes', V(a, b), `${fondo('#0d141b')}<svg class="full" id="tS" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;left:0;right:0;top:390px;text-align:center"><div class="cbig" style="font-size:200px" id="tV">0</div><div class="osw" style="font-size:36px;letter-spacing:.3em">TESTIGOS</div></div>`);
  const sv = $('tS'), ps = []; for (let i = 0; i < 112; i++) { const g = icono(sv, 'persona', 100 + (i % 16) * 58, 730 + Math.floor(i / 16) * 62, .42, '#ece8e1'); ps.push(g); }
  RENDER.push(t => { if (!on('sTes')) return; const n = Math.round(112 * eo(P(t, a + .1, ATE('c7', 'testigos')))); $('tV').textContent = n; ps.forEach((g, i) => g.setAttribute('opacity', i < n ? 1 : .08)); });
}
fotoR('sDen', V(AF('c7', 'Uno de ellos'), S('c8')), 'denur.jpg', { pos: '45% 40%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Yehiel De-Nur, sobreviviente de Auschwitz, se desmaya al declarar',
  pills: [[AF('c7', 'sobreviviente'), 'Sobreviviente de Auschwitz'], [AF('c7', 'desmayó'), 'Se desmayó frente al tribunal']], pTop: 440 });
fotoR('sOrd', V(S('c8'), S('c9')), 'juicio.jpg', { pos: '45% 30%', kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Eichmann durante el juicio, 1961',
  titulo: '"SOLO CUMPLÍA<br><span class="r">ÓRDENES"</span>', tT: AF('c8', 'solo'), size: 150, top: 760 });
// ---------- 7 · Hannah Arendt ----------
fotoR('sAre', V(S('c9'), AF('c9', 'De ahí')), 'arendt.jpg', { pos: '55% 30%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Hannah Arendt, 1955',
  titulo: 'HANNAH<br><span class="r">ARENDT</span>', tT: AF('c9', 'Hannah'), size: 180, top: 640, pills: [[AF('c9', 'burócrata'), 'Vio a "un burócrata común"']], pTop: 1000 });
textosC('sBan', V(AF('c9', 'De ahí'), S('c10'), 1.05), [
  { t: AF('c9', 'banalidad'), html: 'LA BANALIDAD<br><span class="r">DEL MAL</span>', size: 170, top: 480 },
  { t: AF('c9', 'banalidad') + .5, html: '<span style="font-size:.3em;letter-spacing:.2em;color:#8a8a8a">"EICHMANN EN JERUSALÉN" · 1963</span>', size: 110, top: 830 }]);
// ---------- 8 · La condena ----------
fotoR('sCon', V(S('c10'), AF('c10', 'Es la única')), 'actas.jpg', { pos: '45% 50%', bn: true, kb: [1.1, 1.25, 0, 0, 0, 0], lbl: 'Las actas del juicio, en la biblioteca de la Corte Suprema de Israel',
  titulo: '15·12·<span class="r">1961</span>', tT: S('c10'), size: 170, top: 420, sello: { t: AF('c10', 'muerte'), txt: 'CONDENADO A MUERTE', x: 70, y: 700, size: 92 } });
textosC('sUni', V(AF('c10', 'Es la única'), S('c11'), 1.04), [
  { t: AF('c10', 'Es la única'), html: '<span class="r">LA ÚNICA</span>', size: 200, top: 420 },
  { t: AF('c10', 'tribunal'), html: 'EJECUCIÓN DE UN<br>TRIBUNAL CIVIL<br>EN ISRAEL', size: 110, top: 640 },
  { t: AF('c10', 'historia'), html: '<span style="font-size:.3em;letter-spacing:.1em;color:#8a8a8a">LA OTRA, EN 1948, LA ORDENÓ UN TRIBUNAL MILITAR</span>', size: 110, top: 1000 }]);
// ---------- 9 · Ramla, pasada la medianoche ----------
{
  const a = S('c11'), b = S('c12');
  scene('sRam', V(a, b, 0), `<svg class="full" id="rS" viewBox="0 0 1080 1920"></svg>
    <div style="position:absolute;right:64px;top:400px;text-align:right;text-shadow:0 0 30px #000"><div class="cbig" style="font-size:150px;color:#ff2a2a" id="rC">23:5</div><div class="osw" style="font-size:28px;letter-spacing:.2em" id="rD">31 DE MAYO DE 1962</div></div>`);
  const proj = d3.geoMercator().fitExtent([[120, 640], [960, 1150]], { type: 'MultiPoint', coordinates: [[33.9, 29.5], [36.2, 33.4]] }), M = mundo($('rS'), { proj }); M.pais('376', '#1c232c');
  const [x, y] = proj([34.87, 31.93]), m = marca(M.g, x, y), r = rotulo(M.g, x + 26, y + 8, 'CÁRCEL DE RAMLA', { size: 20, col: '#ff5050' });
  RENDER.push(t => { if (!on('sRam')) return; camMundo(M, 540, 960, 1); m.g.setAttribute('opacity', 1); m.pulso(t); r.setAttribute('opacity', P(t, AF('c11', 'Ramla'), AF('c11', 'Ramla') + .3));
    const md = AF('c11', 'medianoche'), min = Math.floor(lerp(57, 62, P(t, a, md + 1))); $('rC').textContent = min < 60 ? `23:${min}` : `00:0${min - 60}`; $('rD').textContent = min < 60 ? '31 DE MAYO DE 1962' : '1 DE JUNIO DE 1962'; });
}
// ---------- 10 · Sus últimas palabras ----------
{
  const a = S('c12'), b = S('c13');
  scene('sUlt', V(a, b, 1.04), `${fondo('#0d0d0d')}<div style="position:absolute;inset:0;background:url(img/juicio.jpg) 45% 30%/cover;filter:grayscale(1) brightness(.18)"></div>
    <div class="osw" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:30px;letter-spacing:.3em;color:#8a8a8a">SUS ÚLTIMAS PALABRAS</div>
    ${[['viva Alemania', 'VIVA ALEMANIA.', ''], ['viva Argentina', 'VIVA ARGENTINA.', 'r'], ['viva Austria', 'VIVA AUSTRIA.', '']].map(([f, s, c], i) => `<div class="cbig uL" data-t="${AF('c12', f)}" style="position:absolute;left:0;right:0;top:${480 + i * 170}px;text-align:center;font-size:140px;opacity:0"><span class="${c}">"${s}"</span></div>`).join('')}`);
  const ls = [...document.querySelectorAll('#sUlt .uL')];
  RENDER.push(t => { if (!on('sUlt')) return; ls.forEach(l => { const q = P(t, +l.dataset.t, +l.dataset.t + .25); l.style.opacity = q; l.style.transform = `scale(${lerp(1.3, 1, eo(q))})`; }); });
}
// ---------- 11 · Las cenizas ----------
{
  const a = S('c13'), b = AF('c13', 'No tiene');
  scene('sMar', V(a, b, 0), `<svg class="full" id="mS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>Mar Mediterráneo · esquema aproximado</div>
    <div class="cbig" style="position:absolute;left:64px;top:380px;font-size:120px;text-shadow:0 0 30px #000">LAS<br><span class="r">CENIZAS</span></div>`);
  const proj = d3.geoMercator().fitExtent([[60, 640], [1020, 1150]], { type: 'MultiPoint', coordinates: [[32.2, 30.8], [35.6, 33.2]] }), M = mundo($('mS'), { proj }); M.pais('376', '#1c232c');
  const costa = [[34.2, 31.3], [34.5, 31.6], [34.75, 32.0], [34.85, 32.4], [34.95, 32.8], [35.1, 33.1]].map(p => proj([p[0] - .28, p[1] + .04]));
  const lim = el('path', { d: 'M' + costa.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), fill: 'none', stroke: '#8fc8ee', 'stroke-width': 3, 'stroke-dasharray': '12 10' }, M.g);
  const rl = rotulo(M.g, costa[3][0] - 20, costa[3][1], 'AGUAS DE ISRAEL', { size: 16, col: '#8fc8ee', anchor: 'end' });
  const [bx, by] = proj([33.6, 32.1]), barco = icono(M.g, 'barco', bx, by, .5), cen = Array.from({ length: 40 }, () => el('circle', { cx: bx, cy: by, r: 3, fill: '#bbb', opacity: 0 }, M.g)), rr = rnd(9);
  const dir = cen.map(() => [rr() * 2 - 1, rr() * 2 - 1]);
  RENDER.push(t => { if (!on('sMar')) return; camMundo(M, 540, 960, 1); rl.setAttribute('opacity', 1); barco.setAttribute('opacity', P(t, a, a + .3)); const k = P(t, AF('c13', 'cenizas'), b);
    cen.forEach((c, i) => { c.setAttribute('cx', bx + dir[i][0] * 120 * k); c.setAttribute('cy', by + 30 + dir[i][1] * 60 * k); c.setAttribute('opacity', k > 0 ? (1 - k) * .9 : 0); }); });
}
textosC('sTum', V(AF('c13', 'No tiene'), S('c14'), 1.06), [{ t: AF('c13', 'No tiene'), html: 'NO TIENE<br><span class="r">TUMBA</span>', size: 220, top: 520 }]);
// ---------- 12 · Mengele ----------
fotoR('sMen', V(S('c14'), AF('c14', 'No lo')), 'mengele.jpg', { pos: '50% 30%', bn: true, kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Josef Mengele en 1956, cuando vivía en la Argentina',
  titulo: 'JOSEF<br><span class="r">MENGELE</span>', tT: AF('c14', 'Josef'), size: 180, top: 640, pills: [[AF('c14', 'médico'), 'El médico de Auschwitz']], pTop: 1000 });
textosC('sNoA', V(AF('c14', 'No lo'), S('c15'), 1.05), [{ t: AF('c14', 'No lo'), html: 'NO LO<br><span class="r">ATRAPARON</span>', size: 210, top: 520 }]);
{
  const a = S('c15'), b = S('c16');
  scene('sRut', V(a, b, 0), `<svg class="full" id="mgS" viewBox="0 0 1080 1920"></svg><div class="clbl" style="opacity:1"><i></i>La huida de Mengele</div>${selloC('uX', 'SIN JUICIO', 300, 420, 140)}`);
  const proj = d3.geoMercator().fitExtent([[120, 620], [960, 1150]], { type: 'MultiPoint', coordinates: [[-66, -37], [-42, -18]] }), M = mundo($('mgS'), { proj });
  M.pais('032', '#1c232c'); M.pais('600', '#1c232c'); M.pais('076', '#1c232c');
  const pB = proj([-58.38, -34.6]), pA = proj([-57.58, -25.28]), pS = proj([-46.14, -23.85]);
  const t1 = trazo(M.g, [pB, pA], { curva: [pB[0] - 80, (pB[1] + pA[1]) / 2], w: 4, punto: 9 }), t2 = trazo(M.g, [pA, pS], { curva: [(pA[0] + pS[0]) / 2, pA[1] - 80], w: 4, punto: 9 });
  const rA = rotulo(M.g, pA[0] - 18, pA[1] - 14, 'PARAGUAY', { size: 18, anchor: 'end' }), rS = rotulo(M.g, pS[0] - 18, pS[1] + 36, 'BRASIL · 1979', { size: 18, col: '#ff5050', anchor: 'end' });
  RENDER.push(t => { if (!on('sRut')) return; camMundo(M, 540, 960, 1); const pa = AF('c15', 'Paraguay'), br = AF('c15', 'Brasil'); t1.draw(io(P(t, a, pa + .2))); rA.setAttribute('opacity', P(t, pa - .1, pa + .2)); t2.draw(io(P(t, pa + .3, br + .4))); rS.setAttribute('opacity', P(t, br, br + .3)); golpeC('uX', t, AF('c15', 'juzgado'), -6); });
}
// ---------- 13 · La pregunta ----------
{
  const a = S('c16'), b = TL.duration;
  scene('sFin', [a - .1, b + 1, .18, .01, 1.04], `<div style="position:absolute;left:0;top:0;right:0;height:50%;background:linear-gradient(90deg,#5fa8d8,#f2f2f2 50%,#5fa8d8);opacity:.12"></div>
    <div style="position:absolute;left:0;bottom:0;right:0;height:50%;background:linear-gradient(90deg,#2a5bb8,#f2f2f2 50%,#2a5bb8);opacity:.1"></div><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(5,5,5,.3),#050505 80%)"></div>
    <div id="f1" class="cbig" style="position:absolute;left:0;right:0;top:420px;text-align:center;font-size:120px;opacity:0">¿LA ARGENTINA<br>TENÍA RAZÓN…</div>
    <div id="f2" class="cbig" style="position:absolute;left:0;right:0;top:700px;text-align:center;font-size:120px;opacity:0">…O ISRAEL<br><span class="r">HIZO JUSTICIA?</span></div>
    <div id="f3" class="cpill" style="position:absolute;left:64px;top:1000px;opacity:0">Te leo en los comentarios</div>${cierreR}`);
  RENDER.push(t => { if (!on('sFin')) return; $('f1').style.opacity = P(t, a, a + .3); $('f2').style.opacity = P(t, AF('c16', 'o Israel'), AF('c16', 'o Israel') + .3); $('f3').style.opacity = P(t, AF('c16', 'Te leo'), AF('c16', 'Te leo') + .3); });
  RENDER.push(cierreAnim);
}
});
