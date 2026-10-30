// "Si una tormenta te atrapa en el Aconcagua" · parte 1 (historia de ficción, formato reglas y supervivencia). Todo animado.
// La pista para los comentarios: a medianoche la radio se queda sin batería (pantalla negra), y a las 3:14 "habla" igual.

captions([
  ['h1', 'tormenta', 'a'], ['h1', 'seis', 'r'], ['h1', 'mil', 'r'], ['h1', 'Aconcagua', 'a'], ['h1', 'creerle', 'a'], ['h1', 'mal', 'r'], ['h1', 'bajás', 'r'],
  ['c1', 'Berlín', 'a'], ['c1', 'Treinta', 'r'], ['c1', 'dos', 'r'], ['c1', 'Lucas', 'a'], ['c1', 'viento', 'a'], ['c1', 'blanco', 'a'],
  ['c2', 'nueve', 'a'], ['c2', 'radio', 'g'], ['c2', 'patrulla', 'a'], ['c2', 'responde', 'r'], ['c2', 'tres', 'r'], ['c2', 'reglas', 'r'],
  ['c3', 'uno', 'r'], ['c3', 'nadie', 'r'], ['c3', 'golpea', 'r'], ['c3', 'no', 'r'], ['c4', 'dos', 'r'], ['c4', 'calentador', 'a'], ['c5', 'tres', 'r'], ['c5', 'nombre', 'a'], ['c5', 'contesten', 'r'],
  ['c6', 'Medianoche', 'a'], ['c6', 'batería', 'a'], ['c6', 'negra', 'a'], ['c6', 'Vos', 'r'], ['c6', 'no', 'r'],
  ['c7', 'catorce', 'r'], ['c7', 'radio', 'g'], ['c7', 'nunca', 'r'], ['c7', 'falsas', 'r'], ['c7', 'Ábranles', 'r'],
  ['c8', 'golpean', 'r'], ['c8', 'Patrulla', 'a'], ['c8', 'alud', 'r'], ['c8', 'nombre', 'r'],
  ['c9', 'reglas', 'a'], ['c9', 'abrís', 'r'], ['c9', 'pista', 'g'], ['c9', 'comentarios', 'g'], ['c9', 'dos', 'a'], ['c9', 'perfil', 'a'],
], { max: 3, chars: 15 });
hud({ serie: 'HISTORIA DE FICCIÓN · PARTE 1', aviso: 'ACONCAGUA · REFUGIO BERLÍN · −32 °C', dia: 'HORA', hide: S('outro') + .2,
  horas: [[S('c2') - .1, '21:00'], [S('c6') - .1, '00:00'], [S('c7') - .1, '03:14', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);

const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
const escribe = (id, t, a, b, txt) => { $(id).querySelector('i').textContent = typed(t, a, b, txt); };
const LUCAS = { ropa: '#c0392b', capucha: '#a5301f', barba: .5, piel: '#e2b394', halo: '#ffb35c' };
// escena de interior con cámara (zoom hacia un punto)
function escenaInterior(id, ventana, extra = '') {
  scene(id, ventana, `<svg class="full" id="v${id}" viewBox="0 0 1080 1920"></svg>${extra}`);
  const svg = $('v' + id), cam = el('g', {}, svg), I = interior(cam);
  I.cam = (z, cx, cy) => cam.setAttribute('transform', `translate(${540 - cx * z} ${960 - cy * z}) scale(${z})`);
  return I;
}

SETUP.push(() => {
// ---------- 1 · Gancho: el Aconcagua de noche, con viento blanco ----------
{
  const a = 0, vas = AT('h1', 'vas');
  scene('sAbre', [-1, vas - .1, .01, .1, 0], `<svg class="full" id="vAb" viewBox="0 0 1080 1920"></svg>
    <div id="abT" class="lbl" style="left:64px;top:330px;color:#cfe0f0;font-size:28px">ACONCAGUA · 6.961 m</div>`);
  const svg = $('vAb'), cam = el('g', {}, svg), M = montana(cam, { base: 1280 }), R = el('g', { transform: 'translate(560 1235) scale(.16)' }, cam), ref = refugioExt(R), V = viento(svg, 260);
  RENDER.push(t => { if (!on('sAbre')) return; const k = P(t, a, vas); cam.setAttribute('transform', `translate(540 1180) scale(${lerp(1, 1.5, io(k))}) translate(-560 -1180)`);
    M.estrellas(t, 1 - .6 * k); V(t, lerp(.4, 1, k)); ref.ventana(.7 + .3 * Math.sin(t * 7)); $('abT').style.opacity = P(t, 0, .5); });
}
// ---------- 2 · Vas a tener que elegir a quién creerle ----------
{
  const a = AT('h1', 'vas'), mal = AT('h1', 'Y si');
  scene('sElige', [a - .1, S('c1') - .1, .05, .15, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#1d2a44,#03050a 70%)"></div><svg class="full" id="vEl" viewBox="0 0 1080 1920"></svg>
    <div id="elA" style="position:absolute;left:64px;top:560px;font:900 128px/1 'Inter Var';letter-spacing:-.03em;opacity:0">¿A QUIÉN<br>LE <span style="color:#ffc142">CREÉS?</span></div>
    <div id="elB" class="pill" style="position:absolute;left:64px;top:860px;background:#c3332b;color:#fff;font-size:40px;opacity:0">SI ELEGÍS MAL, NO BAJÁS</div>`);
  const V = viento($('vEl'), 140, 3);
  RENDER.push(t => { if (!on('sElige')) return; V(t, .6); golpeT('elA', t, a, 1.3); golpeT('elB', t, mal + .2, 1.5); });
}
// ---------- 3 · Refugio Berlín, −32 °C ----------
{
  const a = S('c1'), vos = AT('c1', 'Vos');
  scene('sRef', [a - .1, vos - .1, .15, .1, 1.05], `<svg class="full" id="vRf" viewBox="0 0 1080 1920"></svg>
    <div id="rfA" class="pill" style="position:absolute;left:64px;top:330px;background:#f2f2f2;color:#111;font-size:30px;opacity:0">REFUGIO BERLÍN · CASI 6.000 m</div>
    <div id="rfB" style="position:absolute;left:64px;top:410px;font:900 150px/1 'Inter Var';color:#8fd0ff;opacity:0">−32 °C</div>`);
  const svg = $('vRf'); el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: '#0c1830' }, svg);
  el('path', { d: 'M-100,1300 C300,1220 700,1260 1180,1200 L1180,2100 L-100,2100 Z', fill: '#d8e4f0' }, svg);
  const R = el('g', { transform: 'translate(540 1290) scale(1.3)' }, svg), ref = refugioExt(R), V = viento(svg, 280, 9);
  RENDER.push(t => { if (!on('sRef')) return; V(t, 1); ref.ventana(.8 + .2 * Math.sin(t * 9)); golpeT('rfA', t, a, 1.2); golpeT('rfB', t, AT('c1', 'Treinta'), 1.4); });
}
// ---------- 4 · Vos y Lucas, adentro ----------
{
  const a = AT('c1', 'Vos');
  const I = escenaInterior('sLuc', [a - .1, S('c2') - .1, .1, .1, 1], `<div id="luB" style="position:absolute;left:520px;top:520px;width:520px;height:600px;opacity:0">${busto(LUCAS)}</div>
    <div id="luN" class="card" style="left:64px;top:330px;padding:16px 24px;opacity:0"><div style="font:900 56px 'Inter Var'">LUCAS · 29</div><div class="mono" style="font-size:22px;color:#ffc142;letter-spacing:.12em">TU COMPAÑERO DE CORDADA</div></div>`);
  RENDER.push(t => { if (!on('sLuc')) return; I.cam(1.15, 540, 1100); I.llama(t, 1); I.pantalla('on', t); I.ventana(t, 1); I.lucas(0); entra('luN', t, a + .3);
    const q = P(t, AT('c1', 'Lucas') - .2, AT('c1', 'Lucas') + .2); $('luB').style.opacity = q; $('luB').style.transform = `translateY(${lerp(40, 0, eo(q))}px)`; });
}
// ---------- 5 · 21:00, la radio ----------
{
  const a = S('c2'), ha = AT('c2', 'habla'), msg = '"Refugio Berlín, acá Plaza de Mulas. La patrulla que subió esta tarde no responde. Hasta que pase la tormenta, tres reglas."';
  const I = escenaInterior('sRad', [a - .1, S('c3') - .1, .15, .1, 1], `<div id="raV" class="voz" style="top:360px;opacity:0"><small>RADIO · PLAZA DE MULAS · CANAL 3</small><i></i></div>`);
  RENDER.push(t => { if (!on('sRad')) return; const k = io(P(t, a, ha + .4)); I.cam(lerp(1.1, 2.2, k), lerp(540, 270, k), lerp(1100, 755, k)); I.llama(t, 1); I.pantalla('on', t); I.ventana(t, 1); I.lucas(0);
    entra('raV', t, ha); escribe('raV', t, ha, S('c3') - .3, msg); });
}
// ---------- 6 · Las tres reglas ----------
{
  const r1 = S('c3'), r2 = S('c4'), r3 = S('c5');
  scene('sReg', [r1 - .1, S('c6') - .1, .15, .15, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#2a1a10,#050302 72%)"></div><svg class="full" id="vRg" viewBox="0 0 1080 1920"></svg>
    ${reglaHTML('rg1', 1, 'Nadie sube de noche con viento blanco.', 'Si alguien golpea la puerta, no es la patrulla.', 330)}
    ${reglaHTML('rg2', 2, 'Que no se apague el calentador.', '', 610)}
    ${reglaHTML('rg3', 3, 'Si escuchan su nombre desde afuera, no contesten.', '', 820)}`);
  const V = viento($('vRg'), 80, 4);
  RENDER.push(t => { if (!on('sReg')) return; V(t, .3); [['rg1', r1], ['rg2', r2], ['rg3', r3]].forEach(([id, a], i, arr) => { const q = P(t, a - .1, a + .25), nxt = arr[i + 1];
    $(id).style.opacity = q * (nxt ? 1 - .45 * P(t, nxt[1], nxt[1] + .3) : 1); $(id).style.transform = `scale(${lerp(1.15, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; }); });
}
// ---------- 7 · Medianoche: la batería se muere (la pista) ----------
{
  const a = S('c6'), bat = AT('c6', 'batería'), duerme = AT('c6', 'Lucas');
  const I = escenaInterior('sMed', [a - .1, S('c7') - .1, .15, .1, 1], `<div id="meB" class="pill" style="position:absolute;left:64px;top:330px;background:#c3332b;color:#fff;font-size:28px;opacity:0">BATERÍA 0 %</div>`);
  RENDER.push(t => { if (!on('sMed')) return; const k = io(P(t, a, bat + .3)), k2 = io(P(t, duerme - .5, duerme + .6));
    I.cam(lerp(1.15, 1.9, k) - .7 * k2, lerp(540, 270, k) + 270 * k2, lerp(1100, 760, k) + 340 * k2); I.llama(t, .85); I.ventana(t, 1);
    const off = t > bat + .5; I.pantalla(off ? 'off' : 'on', t); I.lucas(P(t, duerme, duerme + .6)); $('meB').style.opacity = P(t, bat + .4, bat + .6) * (1 - P(t, duerme, duerme + .3)); });
}
// ---------- 8 · 3:14: la radio "vuelve a hablar" (con la pantalla negra) ----------
{
  const a = S('c7'), hab = AT('c7', 'vuelve'), msg = '"Refugio Berlín, nunca mandamos ningún mensaje. Las reglas son falsas. La patrulla está en su puerta. Ábranles ya."';
  const I = escenaInterior('sVoz', [a - .1, S('c8') - .1, .15, .05, 1], `<div id="voV" class="voz" style="top:360px;opacity:0"><small>RADIO · ???</small><i></i></div>`);
  RENDER.push(t => { if (!on('sVoz')) return; const k = io(P(t, a, hab + .5)); I.cam(lerp(1.2, 2.2, k), lerp(540, 270, k), lerp(1100, 755, k)); I.llama(t, .6); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1);
    entra('voV', t, hab + .2); escribe('voV', t, hab + .3, S('c8') - .3, msg); });
}
// ---------- 9 · Golpean la puerta ----------
{
  const a = S('c8'), gol = AT('c8', 'golpean'), pat = AT('c8', 'Patrulla'), nom = AT('c8', 'Y escuchás');
  const I = escenaInterior('sGol', [a - .1, S('c9') - .1, .05, .15, 1], `<div id="goA" style="position:absolute;left:64px;top:330px;font:900 92px/1.02 'Inter Var';opacity:0">«¡PATRULLA<br>DE <span style="color:#ff4a3d">RESCATE!</span>»</div>
    <div id="goB" class="voz" style="top:560px;border-color:#ff4a3d;color:#ffd0cc;opacity:0"><small style="color:#ff4a3d">DESDE AFUERA</small>«…[tu nombre]… abrí…»</div>`);
  const golpes = [gol, gol + .35, gol + .7, pat - .1, pat + .3];
  RENDER.push(t => { if (!on('sGol')) return; I.cam(1.12, 800, 1000); I.llama(t, .55); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1);
    const g = Math.max(0, ...golpes.map(x => 1 - P(t, x, x + .25)).map((v, i) => t >= golpes[i] ? v : 0)); I.puerta(g, t);
    golpeT('goA', t, pat - .1, 1.3); $('goA').style.opacity = P(t, pat - .1, pat + .1) * (1 - .6 * P(t, nom, nom + .3)); entra('goB', t, nom + .1, 20); });
}
// ---------- 10 · ¿Seguís las reglas o abrís? ----------
{
  const a = S('c9'), pi = AT('c9', 'Hay una'), pa = AT('c9', 'La parte');
  scene('sPreg', [a - .1, S('outro') + .1, .1, .2, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#22140c,#030202 72%)"></div>
    <div id="pgA" style="position:absolute;left:64px;top:340px;font:900 96px/1.02 'Inter Var';opacity:0">¿QUÉ<br>HACÉS?</div>
    <div id="pgB" class="card" style="left:64px;top:620px;width:450px;padding:34px 24px;text-align:center;opacity:0"><div style="font:900 46px/1.1 'Inter Var'">SEGUIR LAS<br>REGLAS</div></div>
    <div id="pgC" class="card" style="left:566px;top:620px;width:450px;padding:34px 24px;text-align:center;border-color:#ff4a3d;opacity:0"><div style="font:900 46px/1.1 'Inter Var';color:#ff4a3d">ABRIR LA<br>PUERTA</div></div>
    <div id="pgD" class="pill" style="position:absolute;left:64px;top:880px;background:#ffc142;color:#111;font-size:36px;opacity:0">HAY UNA PISTA. ¿LA VISTE?</div>
    <div id="pgE" class="pill" style="position:absolute;left:64px;top:980px;background:#2f8f5b;color:#fff;font-size:36px;opacity:0">PARTE 2 EN MI PERFIL →</div>`);
  RENDER.push(t => { if (!on('sPreg')) return; golpeT('pgA', t, a, 1.3); entra('pgB', t, a + .5); entra('pgC', t, a + .8); aparece('pgD', t, pi); aparece('pgE', t, pa); });
}
// ---------- 11 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a2440,#030508 70%)"></div>
    <div style="position:absolute;left:64px;top:600px;width:900px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">historia de ficción · parte 1</div>
      <div id="fP" style="font:900 120px/1 'Inter Var';letter-spacing:-.03em;margin-top:14px">¿Seguís las reglas<span style="color:var(--red)">?</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para la parte 2</div></div>`);
  RENDER.push(t => { if (!on('sFin')) return; $('fK').style.opacity = P(t, a, a + .3); const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.2, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%'; $('fS').style.opacity = P(t, a + 1, a + 1.4); });
}
});
