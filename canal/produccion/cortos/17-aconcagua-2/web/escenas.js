// "Si una tormenta te atrapa en el Aconcagua" · parte 2 (historia de ficción). Revela la pista y cierra la historia.

captions([
  ['h1', 'catorce', 'r'], ['h1', 'radio', 'g'], ['h1', 'abras', 'r'], ['h1', 'reglas', 'a'], ['h1', 'no', 'r'], ['h1', 'miente', 'r'],
  ['c1', 'pista', 'a'], ['c1', 'Medianoche', 'a'], ['c1', 'batería', 'r'], ['c1', 'negra', 'r'], ['c2', 'sin', 'r'], ['c2', 'batería', 'r'], ['c2', 'nada', 'r'], ['c2', 'no', 'r'], ['c2', 'salió', 'r'],
  ['c3', 'despacio', 'a'], ['c3', 'aparato', 'a'], ['c3', 'rendija', 'r'], ['c3', 'puerta', 'r'], ['c4', 'Lucas', 'a'], ['c4', 'Ninguno', 'r'], ['c4', 'golpes', 'r'], ['c4', 'rasguños', 'r'], ['c4', 'nombre', 'r'], ['c4', 'mamá', 'r'],
  ['c5', 'dos', 'a'], ['c5', 'último', 'r'], ['c5', 'tiembla', 'a'], ['c5', 'apaga', 'g'], ['c6', 'silencio', 'a'], ['c6', 'sol', 'g'],
  ['c7', 'verdad', 'g'], ['c7', 'cueva', 'a'], ['c7', 'bien', 'g'], ['c8', 'huellas', 'r'], ['c8', 'no', 'r'], ['c8', 'bajan', 'r'], ['c8', 'Suben', 'r'], ['c8', 'cumbre', 'r'],
  ['c9', 'abierto', 'a'], ['c9', 'otro', 'r'], ['c9', 'lado', 'r'], ['c9', 'comentarios', 'g'],
], { max: 3, chars: 15 });
hud({ serie: 'HISTORIA DE FICCIÓN · PARTE 2', aviso: 'ACONCAGUA · REFUGIO BERLÍN · −32 °C', dia: 'HORA', hide: S('outro') + .2,
  horas: [[-1, '03:14', true], [S('c6') - .1, '05:30'], [AT('c6', 'A las siete') - .1, '07:00'], [S('c7') - .1, '09:00']] });
CAPS_OFF(S('outro'), TL.duration + 1);

const entra = (id, t, a, dy = 30) => { const q = P(t, a - .1, a + .25); $(id).style.opacity = q; $(id).style.transform = `translateY(${lerp(dy, 0, eo(q))}px)`; return q; };
const golpeT = (id, t, a, s0 = 1.4) => { const q = P(t, a - .1, a + .2); $(id).style.opacity = q; $(id).style.transform = `scale(${lerp(s0, 1, eo(q))})`; $(id).style.transformOrigin = '0 50%'; };
function escenaInterior(id, ventana, extra = '') {
  scene(id, ventana, `<svg class="full" id="v${id}" viewBox="0 0 1080 1920"></svg>${extra}`);
  const svg = $('v' + id), cam = el('g', {}, svg), I = interior(cam);
  I.cam = (z, cx, cy) => cam.setAttribute('transform', `translate(${540 - cx * z} ${960 - cy * z}) scale(${z})`);
  return I;
}
// exterior de día: cielo que amanece, nieve, refugio
function exterior(svg) {
  const d = el('defs', {}, svg), lg = el('linearGradient', { id: svg.id + 'am', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
  const s0 = el('stop', { offset: 0 }, lg), s1 = el('stop', { offset: 1 }, lg);
  el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: `url(#${svg.id}am)` }, svg);
  const sol = el('circle', { cx: 860, r: 90, fill: '#ffd27a' }, svg);
  el('path', { d: 'M-100,1100 L250,760 L430,900 L620,700 L860,950 L1180,820 L1180,2100 L-100,2100 Z', fill: '#8fa5bd' }, svg);
  el('path', { d: 'M-100,1330 C300,1250 700,1290 1180,1230 L1180,2100 L-100,2100 Z', fill: '#eef3f8' }, svg);
  const R = el('g', { transform: 'translate(540 1320) scale(1.3)' }, svg), ref = refugioExt(R);
  const mezcla = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
  return { ref, R, amanecer(k) { s0.setAttribute('stop-color', mezcla('#050a16', '#7fb2e5', k)); s1.setAttribute('stop-color', mezcla('#132341', '#ffd9a8', k)); sol.setAttribute('cy', lerp(1250, 640, k)); sol.setAttribute('opacity', P(k, .2, .5)); ref.ventana(1 - k); } };
}

SETUP.push(() => {
// ---------- 1 · ¿Quién miente? ----------
{
  const qu = AT('h1', 'Quién');
  const I = escenaInterior('sRe', [-1, S('c1') - .1, .01, .15, 1], `<div id="reA" style="position:absolute;left:64px;top:340px;font:900 120px/1 'Inter Var';letter-spacing:-.03em;opacity:0">¿QUIÉN<br><span style="color:#ff4a3d">MIENTE?</span></div>`);
  RENDER.push(t => { if (!on('sRe')) return; I.cam(lerp(1.1, 1.3, P(t, 0, qu)), 700, 1050); I.llama(t, .55); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1); I.puerta(.4 * Math.max(0, Math.sin(t * 2.2)) ** 6, t); golpeT('reA', t, qu, 1.4); });
}
// ---------- 2 · La pista: la batería se murió a medianoche ----------
{
  const a = S('c1'), bat = AT('c1', 'batería');
  const I = escenaInterior('sPis', [a - .1, S('c2') - .1, .15, .1, 1], `<div id="piA" class="pill" style="position:absolute;left:64px;top:330px;background:#ffc142;color:#111;font-size:34px;opacity:0">LA PISTA</div>
    <div id="piB" class="voz" style="top:420px;border-color:#ff4a3d;color:#ffd0cc;opacity:0"><small style="color:#ff4a3d">RADIO</small>BATERÍA 0 % DESDE LAS 00:00</div>`);
  RENDER.push(t => { if (!on('sPis')) return; const k = io(P(t, a, bat)); I.cam(lerp(1.2, 2.6, k), lerp(600, 330, k), lerp(1050, 760, k)); I.llama(t, .55); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1); aparece('piA', t, a); entra('piB', t, bat); });
}
// ---------- 3 · Una radio sin batería no recibe nada ----------
{
  const a = S('c2'), esa = AT('c2', 'Esa');
  scene('sSin', [a - .1, S('c3') - .1, .1, .1, 1.06], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#141a22,#030405 70%)"></div>
    <div id="siA" style="position:absolute;left:64px;top:520px;font:900 84px/1.05 'Inter Var';opacity:0">UNA RADIO<br>SIN BATERÍA<br>NO RECIBE NADA.</div>
    <div id="siB" style="position:absolute;left:64px;top:860px;font:900 84px/1.05 'Inter Var';color:#ff4a3d;opacity:0">ESA VOZ NO SALIÓ<br>DE LA RADIO.</div>`);
  RENDER.push(t => { if (!on('sSin')) return; entra('siA', t, a); golpeT('siB', t, esa, 1.3); });
}
// ---------- 4 · La voz viene de la rendija de la puerta ----------
{
  const a = S('c3'), ren = AT('c3', 'rendija');
  const I = escenaInterior('sRen', [a - .1, S('c4') - .1, .1, .1, 1], `<div id="rnA" class="voz" style="top:360px;border-color:#9fc6ef;color:#dcecff;opacity:0"><small style="color:#9fc6ef">DESDE LA RENDIJA</small>«…ábranles ya…»</div>`);
  RENDER.push(t => { if (!on('sRen')) return; const k = io(P(t, a, ren + .3)); I.cam(lerp(1.2, 2.6, k), lerp(540, 880, k), lerp(1050, 1335, k)); I.llama(t, .5); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1);
    I.rendija.setAttribute('opacity', (.6 + .4 * Math.sin(t * 5)).toFixed(2)); entra('rnA', t, ren); });
}
// ---------- 5 · Despertás a Lucas; golpes, rasguños, tu nombre ----------
{
  const a = S('c4'), gol = AT('c4', 'golpes'), ras = AT('c4', 'rasguños'), nom = AT('c4', 'tu nombre');
  const I = escenaInterior('sNo', [a - .1, S('c5') - .1, .1, .1, 1], `<div id="noA" class="pill" style="position:absolute;left:64px;top:330px;background:#1b1b1b;color:#fff;border:1px solid #fff;font-size:30px;opacity:0">NINGUNO CONTESTA</div>
    <div id="noB" style="position:absolute;left:64px;top:420px;font:900 70px/1 'Inter Var';color:#c9c2b8;letter-spacing:.06em;opacity:0">*RASGUÑOS*</div>
    <div id="noC" class="voz" style="top:540px;border-color:#ff4a3d;color:#ffd0cc;opacity:0"><small style="color:#ff4a3d">DESDE AFUERA · CON LA VOZ DE TU MAMÁ</small>«…[tu nombre], soy mamá. Abrime.»</div>`);
  RENDER.push(t => { if (!on('sNo')) return; I.cam(1.1, 640, 1150); I.llama(t, .5); I.pantalla('off', t); I.ventana(t, 1); I.lucas(1 - P(t, a, a + .6));
    const g = t > gol && t < ras ? Math.max(0, Math.sin((t - gol) * 9)) : 0; I.puerta(g, t);
    aparece('noA', t, AT('c4', 'Ninguno')); $('noB').style.opacity = P(t, ras - .1, ras + .2) * (.7 + .3 * Math.sin(t * 20)); entra('noC', t, nom); });
}
// ---------- 6 · Regla dos: el calentador no se apaga ----------
{
  const a = S('c5'), tie = AT('c5', 'tiembla'), noap = AT('c5', 'pero');
  const I = escenaInterior('sLla', [a - .1, S('c6') - .1, .1, .15, 1], `<div id="llA" class="regla" style="top:330px;opacity:0"><span>REGLA #2</span><b>Que no se apague el calentador.</b><small></small></div>`);
  RENDER.push(t => { if (!on('sLla')) return; const k = io(P(t, a, a + 1)); I.cam(lerp(1.2, 2.2, k), lerp(600, 560, k), lerp(1100, 1290, k));
    const q = t < tie ? .5 : t < noap + .3 ? .18 + .12 * Math.abs(Math.sin(t * 13)) : lerp(.3, .9, P(t, noap + .3, noap + 1.5)); I.llama(t, q); I.pantalla('off', t); I.ventana(t, 1); I.lucas(0); entra('llA', t, a); });
}
// ---------- 7 · Silencio; sale el sol ----------
{
  const a = S('c6'), sol = AT('c6', 'A las siete');
  scene('sSol', [a - .1, S('c7') - .1, .2, .1, 1.04], `<svg class="full" id="vSo" viewBox="0 0 1080 1920"></svg><div id="soA" style="position:absolute;left:64px;top:340px;font:900 110px/1 'Inter Var';opacity:0">SILENCIO.</div>`);
  const svg = $('vSo'), X = exterior(svg), V = viento(svg, 140, 6);
  RENDER.push(t => { if (!on('sSol')) return; const k = P(t, sol - .3, S('c7') - .2); X.amanecer(io(k)); V(t, .4 * (1 - k)); $('soA').style.opacity = P(t, a, a + .3) * (1 - P(t, sol - .2, sol)); });
}
// ---------- 8 · Llega la patrulla de verdad ----------
{
  const a = S('c7'), cue = AT('c7', 'cueva');
  scene('sPat', [a - .1, S('c8') - .1, .1, .1, 1.04], `<svg class="full" id="vPa" viewBox="0 0 1080 1920"></svg>
    <div id="paA" class="card" style="left:64px;top:330px;width:952px;padding:22px 28px;opacity:0"><div class="mono" style="font-size:22px;color:#2f8f5b;letter-spacing:.14em">09:00 · PATRULLA DE RESCATE</div>
      <div style="font:800 46px/1.15 'Inter Var';margin-top:8px">Pasaron la noche en una cueva de nieve. <span style="color:#2f8f5b">Todos bien.</span></div></div>`);
  const svg = $('vPa'), X = exterior(svg); X.amanecer(1);
  const fila = el('g', {}, svg), pers = [0, 1, 2, 3].map(i => { const p = icono(fila, 'persona', 0, 0, 1.6, '#ff7a1a'); p.setAttribute('opacity', 1); return p; });
  RENDER.push(t => { if (!on('sPat')) return; const k = eo(P(t, a, a + 3)); pers.forEach((p, i) => p.setAttribute('transform', `translate(${lerp(-80 - i * 90, 240 - i * 90, k)} ${1500 + i * 18 + 6 * Math.sin(t * 7 + i)}) scale(1.6)`)); entra('paA', t, cue - .3); });
}
// ---------- 9 · Las huellas suben hacia la cumbre ----------
{
  const a = S('c8'), sub = AT('c8', 'Suben');
  scene('sHue', [a - .1, S('c9') - .1, .1, .1, 1.04], `<svg class="full" id="vHu" viewBox="0 0 1080 1920"></svg>
    <div id="huA" class="pill" style="position:absolute;left:64px;top:1500px;background:#1b1b1b;color:#fff;font-size:28px;opacity:0">↓ PLAZA DE MULAS</div>
    <div id="huB" class="pill" style="position:absolute;left:64px;top:330px;background:#c3332b;color:#fff;font-size:30px;opacity:0">↑ HACIA LA CUMBRE</div>`);
  const svg = $('vHu'); el('rect', { x: -100, y: -100, width: 1300, height: 2200, fill: '#eef3f8' }, svg);
  for (let i = 0; i < 40; i++) el('ellipse', { cx: (i * 137) % 1080, cy: (i * 311) % 1920, rx: 60, ry: 8, fill: '#dfe7f0' }, svg);
  el('rect', { x: 700, y: 1500, width: 380, height: 500, fill: '#4c3020' }, svg); el('rect', { x: 700, y: 1500, width: 380, height: 18, fill: '#2e1c10' }, svg);
  const hs = []; for (let i = 0; i < 9; i++) { const y = 1460 - i * 130, x = 620 - i * 28 + (i % 2 ? 46 : -10);
    const h = el('g', { transform: `translate(${x} ${y}) rotate(${-8 + (i % 2 ? 6 : -6)})`, opacity: 0 }, svg);
    el('ellipse', { rx: 26, ry: 52, fill: '#9fb2c6' }, h); [-20, -7, 7, 20].forEach(dx => el('path', { d: `M${dx},-48 L${dx * 1.3},-84`, stroke: '#9fb2c6', 'stroke-width': 7, 'stroke-linecap': 'round' }, h)); hs.push(h); }
  RENDER.push(t => { if (!on('sHue')) return; hs.forEach((h, i) => h.setAttribute('opacity', P(t, a + .3 + i * .22, a + .5 + i * .22))); aparece('huA', t, AT('c8', 'Pero') - .2); aparece('huB', t, sub); });
}
// ---------- 10 · ¿Qué había del otro lado? ----------
{
  const a = S('c9'), co = AT('c9', 'comentarios');
  scene('sCom', [a - .1, S('outro') + .1, .1, .2, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1a2440,#030508 72%)"></div>
    <div id="cmA" style="position:absolute;left:64px;top:360px;font:900 88px/1.03 'Inter Var';opacity:0">SI HUBIERAS<br>ABIERTO…<br><span style="color:#ff4a3d">¿QUÉ HABÍA<br>DEL OTRO LADO?</span></div>
    <div id="cmL" style="position:absolute;left:64px;top:900px;width:820px"></div>`);
  const L = $('cmL');
  for (let i = 0; i < 3; i++) L.insertAdjacentHTML('beforeend', `<div class="cb" style="display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;opacity:0"><div style="width:58px;height:58px;border-radius:50%;background:${['#7a5af5', '#2f8f5b', '#c3332b'][i]}"></div>
      <div style="flex:1;background:#1a202a;border-radius:20px;padding:18px 22px"><div style="height:14px;width:${120 + i * 40}px;background:#3a4350;border-radius:7px"></div><div style="height:14px;width:${420 - i * 50}px;background:#2a313c;border-radius:7px;margin-top:12px"></div></div></div>`);
  const cbs = [...L.querySelectorAll('.cb')];
  RENDER.push(t => { if (!on('sCom')) return; golpeT('cmA', t, a, 1.2); cbs.forEach((c, i) => { const k = P(t, co - .3 + i * .25, co + i * .25); c.style.opacity = k; c.style.transform = `translateY(${lerp(30, 0, eo(k))}px)`; }); });
}
// ---------- 11 · Cierre ----------
{
  const a = S('outro');
  scene('sFin', [a - .2, TL.duration + 1, .4, .01, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 45% 42%,#1a2440,#030508 70%)"></div>
    <div style="position:absolute;left:64px;top:600px;width:900px">
      <div id="fK" class="lbl" style="position:static;color:var(--amber);font-size:26px">historia de ficción</div>
      <div id="fP" style="font:900 110px/1 'Inter Var';letter-spacing:-.03em;margin-top:14px">Próxima historia:<br><span style="color:#aab0b8;font-size:60px">vos elegís dónde</span></div>
      <div id="fS" class="pill" style="margin-top:44px;background:#e0433a;color:#fff;font-size:34px">Seguime para más</div></div>`);
  RENDER.push(t => { if (!on('sFin')) return; $('fK').style.opacity = P(t, a, a + .3); const p = P(t, a + .1, a + .5); $('fP').style.opacity = p; $('fP').style.transform = `scale(${lerp(1.2, 1, eo(p))})`; $('fP').style.transformOrigin = '0 50%'; $('fS').style.opacity = P(t, a + 1, a + 1.4); });
}
});
