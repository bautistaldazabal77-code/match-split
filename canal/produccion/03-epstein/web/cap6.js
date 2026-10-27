// Capítulo 6 · Perversión de la justicia: el Miami Herald, el arresto de 2019, la caja fuerte, la renuncia de Acosta y la fianza.
SETUP.push(() => {
capituloC('e_ch6', 'cap6', 6, 'PERVERSIÓN DE LA JUSTICIA');
// diez años sin nada, y una periodista que salió a buscar a las víctimas
{
  const a = S('c114'), jb = S('c115'), oc = S('c116'), ne = S('c117'), b = S('c118');
  scene('e_her', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div><svg class="full" id="ehrS" viewBox="0 0 1920 1080"></svg>
    <div id="ehrY" style="position:absolute;left:0;right:0;top:330px;text-align:center"><div class="cbig" id="ehrV" style="font-size:300px">2008</div><div class="osw" style="font-size:34px;letter-spacing:.3em;color:#8a8a8a">NADA SE MOVIÓ</div></div>
    <div id="ehrJ" style="position:absolute;left:150px;top:150px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">PERIODISTA · MIAMI HERALD</div><div class="cbig" style="font-size:150px">JULIE K. <span class="r">BROWN</span></div></div>
    <div id="ehrN" style="position:absolute;right:150px;top:150px;text-align:right;opacity:0"><div class="cbig" style="font-size:230px;color:#ff2a2a" id="ehrC">0</div><div class="osw" style="font-size:32px;letter-spacing:.2em">VÍCTIMAS LOCALIZADAS</div></div>
    <div id="ehrX" class="cpill" style="position:absolute;left:0;right:0;margin:auto;width:fit-content;top:930px;opacity:0">Muchas nunca habían sido escuchadas</div>`);
  const svg = $('ehrS'), fig = [];
  for (let i = 0; i < 80; i++) { const x = 230 + (i % 20) * 77, y = 560 + Math.floor(i / 20) * 88, g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, svg);
    el('circle', { cy: -22, r: 13, fill: '#8a1818' }, g); el('path', { d: 'M-20,24 Q-20,-6 0,-6 Q20,-6 20,24 Z', fill: '#8a1818' }, g); fig.push(g); }
  RENDER.push(t => {
    if (!on('e_her')) return;
    const y = Math.floor(lerp(2008, 2018, P(t, a + .2, jb - .3))); $('ehrV').textContent = y; $('ehrY').style.opacity = 1 - P(t, jb - .3, jb);
    $('ehrJ').style.opacity = P(t, jb, jb + .4);
    const k = P(t, oc - .1, oc + 1.6); $('ehrN').style.opacity = P(t, oc - .2, oc + .2); $('ehrC').textContent = Math.round(80 * eo(k));
    fig.forEach((g, i) => g.setAttribute('opacity', i < 80 * eo(k) ? (t > ne && i % 3 ? .45 : 1) : 0));
    $('ehrX').style.opacity = P(t, ne, ne + .4);
  });
}
// la serie de noviembre de 2018 (recreación)
{
  const a = S('c118'), np = S('c119'), b = S('c120');
  scene('e_per', [a - .1, b - .1, .4, .4, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div id="epeB"></div>
    <div class="cpapel" id="epeD" style="left:410px;top:70px;width:1100px;height:940px;padding:40px 60px;color:#1c1c1c">
      <div style="text-align:center;font:700 64px 'Cormorant Garamond';border-bottom:3px double #1c1c1c;padding-bottom:10px">Miami Herald</div>
      <div style="display:flex;justify-content:space-between;font:500 20px Oswald;letter-spacing:.2em;margin-top:8px;color:#555"><span>28 DE NOVIEMBRE DE 2018</span><span>RECREACIÓN</span></div>
      <div style="font:700 104px/1 'Cormorant Garamond';margin-top:40px">Perversion<br>of Justice</div>
      <div style="font:500 30px Oswald;letter-spacing:.06em;margin-top:22px;color:#333">Cómo un futuro miembro del gabinete de Trump le dio a un abusador serial el acuerdo de su vida</div>
      <div style="font:500 22px Oswald;letter-spacing:.2em;margin-top:18px;color:#777">POR JULIE K. BROWN</div>
      <div style="display:flex;gap:30px;margin-top:30px">${[0, 1, 2].map(() => `<div style="flex:1">${Array.from({ length: 9 }, (_, i) => `<div style="height:12px;margin:12px 0;width:${96 - (i * 9) % 22}%;background:#bdb5a6"></div>`).join('')}</div>`).join('')}</div></div>`);
  const pila = $('epeB'); for (let i = 0; i < 7; i++) pila.insertAdjacentHTML('beforeend', `<div class="cpapel epeP" style="left:${[90, 1430, 140, 1380, 60, 1490, 300][i]}px;top:${[120, 160, 560, 600, 340, 380, 760][i]}px;width:380px;height:300px;opacity:0;padding:24px"><div style="font:700 34px 'Cormorant Garamond'">Perversion of Justice</div>${Array.from({ length: 6 }, (_, j) => `<div style="height:10px;margin:12px 0;width:${90 - j * 7}%;background:#bdb5a6"></div>`).join('')}</div>`);
  const ps = [...document.querySelectorAll('#e_per .epeP')];
  RENDER.push(t => {
    if (!on('e_per')) return;
    const q = P(t, a, a + .5); $('epeD').style.opacity = q; $('epeD').style.transform = `rotate(-1.5deg) scale(${lerp(1.06, 1, eo(q)) * lerp(1, .78, eo(P(t, np, np + .8)))})`;
    ps.forEach((p, i) => { const k = P(t, np + .2 + i * .15, np + .5 + i * .15); p.style.opacity = k; p.style.transform = `rotate(${(i % 2 ? 1 : -1) * (4 + i)}deg) scale(${lerp(1.3, 1, eo(k))})`; });
  });
}
// 6 de julio de 2019: de París a Teterboro
{
  const a = S('c120'), nj = AT('c120', 'Nueva Jersey'), av = AT('c120', 'avión'), es = S('c121'), b = S('c122');
  scene('e_ter', [a - .1, av + .2, .4, .4, 0], `<svg class="full" id="etrS" viewBox="0 0 1920 1080"></svg>
    <div class="clbl"><i></i>6 de julio de 2019</div>`);
  const proj = d3.geoMercator().fitExtent([[160, 140], [1760, 960]], { type: 'MultiPoint', coordinates: [[-80, 35], [8, 55]] });
  const M = mundo($('etrS'), { proj });
  const pa = lugar(M, [2.35, 48.85], 'PARÍS'), te = lugar(M, [-74.06, 40.85], 'NUEVA JERSEY', { col: '#ff2a2a', dot: '#ff6060', anchor: 'end' }), ar = arco(M, [2.35, 48.85], [-74.06, 40.85], '#ff2a2a', 4);
  RENDER.push(t => {
    if (!on('e_ter')) return;
    camMundo(M, 960, 540, 1); pa.fijo(1); te.fijo(1); te.pulso(t);
    pa.c.setAttribute('opacity', P(t, a, a + .4)); ar.draw(io(P(t, a + .3, nj + .3))); te.c.setAttribute('opacity', P(t, nj - .2, nj + .2));
  });
  fotoC('e_tet', [av, b - .1, .4, .4], 'teterboro.jpg', { lbl: 'Aeropuerto de Teterboro · Nueva Jersey', kb: [1.05, 1.2, 0, 0, 0, 0],
    inner: `<div id="etB" class="cbig" style="position:absolute;right:96px;top:380px;text-align:right;font-size:150px;opacity:0;text-shadow:0 0 30px #000">LO ESTABAN<br><span class="r">ESPERANDO</span></div>` });
  RENDER.push(t => { if (on('e_tet')) $('etB').style.opacity = P(t, es - .1, es + .3); });
}
// la acusación de 2019 (documento real)
docC('e_acu', [S('c122') - .1, S('c124') - .1, .4, .4], 'acusacion-2019.jpg', {
  zoom: [[S('c122') - .1, 50, 35, .95], [S('c122') + 1, 50, 38, 1.3]],
  marcas: [{ t: AT('c122', 'tráfico'), x: 31, y: 34.3, w: 36, h: 4.8 }, { t: S('c123'), x: 9, y: 50, w: 78, h: 8.5 }],
  sello: { t: S('c123') + .3, txt: 'HASTA 45 AÑOS', x: 1240, y: 760, size: 100, rot: -7 },
  fijo: `<div class="clbl" style="opacity:1"><i></i>Acusación federal · Nueva York · julio de 2019</div>` });
// la caja fuerte
{
  const a = S('c124'), b = S('c125');
  const cosas = [['discos', 'DISCOS CON FOTOS'], ['setenta mil', '$70.000 EN EFECTIVO'], ['cuarenta y ocho', '48 DIAMANTES'], ['pasaporte', 'EL PASAPORTE FALSO']];
  scene('e_caj', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 35% 50%,#1a1a1a,#050505 70%)"></div>
    <div style="position:absolute;left:180px;top:200px;width:620px;height:680px;background:#1d1d1d;border:6px solid #3a3a3a;border-radius:10px;box-shadow:inset 0 0 60px #000">
      <div style="position:absolute;inset:30px;background:#0b0b0b"></div></div>
    <div id="ecjP" style="position:absolute;left:180px;top:200px;width:620px;height:680px;background:linear-gradient(135deg,#4a4a4a,#2a2a2a);border:6px solid #555;border-radius:10px;transform-origin:0 50%;box-shadow:0 20px 60px rgba(0,0,0,.6)">
      <div style="position:absolute;left:220px;top:250px;width:180px;height:180px;border-radius:50%;border:12px solid #777;background:#333"></div>
      <div style="position:absolute;left:500px;top:300px;width:30px;height:90px;background:#777;border-radius:6px"></div></div>
    <div style="position:absolute;left:920px;top:220px">${cosas.map(([, s], i) => `<div id="ecjI${i}" class="cbig" style="font-size:100px;margin-bottom:20px;opacity:0;${i === 3 ? 'color:#ff2a2a' : ''}">${s}</div>`).join('')}</div>
    <div class="clbl" style="opacity:1"><i></i>La caja fuerte de la mansión · según la fiscalía</div>`);
  RENDER.push(t => {
    if (!on('e_caj')) return;
    const k = io(P(t, a + .1, a + 1.4)); $('ecjP').style.transform = `perspective(1400px) rotateY(${-100 * k}deg)`;
    cosas.forEach(([w], i) => { const ti = AT('c124', w), q = P(t, ti - .1, ti + .3); $('ecjI' + i).style.opacity = q; $('ecjI' + i).style.transform = `translateX(${lerp(40, 0, eo(q))}px)`; });
  });
}
fotoC('e_ac2', [S('c125') - .1, S('c126') - .1, .4, .4], 'acosta.jpg', { bn: true, ret: 'izq', lbl: 'Alexander Acosta · secretario de Trabajo', ev: '12 de julio de 2019', evT: AT('c125', 'renunció') - .2, kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="ea2P" class="cpill" style="position:absolute;right:96px;top:250px;opacity:0">El fiscal del acuerdo de 2007</div>${selloC('ea2S', 'RENUNCIÓ', 1150, 520, 150)}` });
RENDER.push(t => { if (!on('e_ac2')) return; $('ea2P').style.opacity = P(t, AT('c125', 'fiscal'), AT('c125', 'fiscal') + .4); golpeC('ea2S', t, AT('c125', 'renunció'), -8); });
docC('e_fia', [S('c126') - .1, S('cap7') + .2, .4, .6], 'fianza.jpg', {
  zoom: [[S('c126') - .1, 50, 35, .95], [S('cap7'), 50, 35, 1.08]],
  sello: { t: AT('c126', 'negó'), txt: 'FIANZA DENEGADA', x: 1060, y: 780, size: 100, rot: -8 } });
});
