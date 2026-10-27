// Capítulo 3 · El sistema: cómo atraían a las chicas, la denuncia de 1996, las cámaras y Vanity Fair.
SETUP.push(() => {
capituloC('e_ch3', 'cap3', 3, 'EL SISTEMA');
// el método, dibujado: siluetas que se suman con "$" (sin mostrar a ninguna víctima)
{
  const a = S('c62'), vu = S('c63'), of = S('c64'), ma = S('c65'), tr = S('c66'), b = S('c67');
  scene('e_sis', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#170404,#050505 70%)"></div><svg class="full" id="esiS" viewBox="0 0 1920 1080"></svg>
    <div class="clbl"><i></i>Según testimonios en los tribunales</div>
    <div id="esiT" style="position:absolute;left:0;right:0;top:150px;text-align:center"></div>`);
  const svg = $('esiS'), fig = [], r = rnd(5);
  for (let i = 0; i < 18; i++) { const x = 360 + (i % 9) * 150, y = 560 + Math.floor(i / 9) * 230, g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, svg);
    el('circle', { cy: -70, r: 26, fill: '#3a3a3a' }, g); el('path', { d: 'M-40,40 Q-40,-30 0,-30 Q40,-30 40,40 Z', fill: '#3a3a3a' }, g); fig.push({ g, d: r() }); }
  const usd = []; for (let i = 0; i < 6; i++) usd.push(etiqueta(svg, '$', 0, 0, { size: 60, w: 700, col: '#ff2a2a', font: 'Bebas Neue', ls: 0 }));
  const frases = [[vu, 'LAS MÁS VULNERABLES'], [of, 'TRABAJO · MODA'], [ma, '"MASAJES"'], [tr, 'MÁS DINERO SI TRAÍAN A OTRAS']];
  $('esiT').innerHTML = frases.map(([, s], i) => `<div class="cbig" id="esiF${i}" style="font-size:110px;position:absolute;left:0;right:0;opacity:0">${s}</div>`).join('');
  RENDER.push(t => {
    if (!on('e_sis')) return;
    frases.forEach(([ti], i) => { const nx = frases[i + 1] ? frases[i + 1][0] : b; $('esiF' + i).style.opacity = P(t, ti - .1, ti + .3) * (1 - P(t, nx - .3, nx)); });
    fig.forEach((f, i) => { const k = i < 6 ? P(t, a + .2 + i * .1, a + .5 + i * .1) : P(t, tr + (i - 6) * .12, tr + .3 + (i - 6) * .12); f.g.setAttribute('opacity', k);
      f.g.querySelectorAll('circle,path').forEach(e => e.setAttribute('fill', t > vu && i < 6 ? '#8a1818' : '#3a3a3a')); });
    usd.forEach((u, i) => { const k = ((t - ma) * .6 + i / 6) % 1; u.setAttribute('x', 360 + i * 230); u.setAttribute('y', 500 - k * 160); u.setAttribute('opacity', t > ma ? Math.sin(Math.PI * k) : 0); });
  });
}
textosC('e_edad', [S('c67') - .1, S('c69') - .1, .3, .4, 1.04], [
  { t: S('c67'), html: 'MUCHAS ERAN MENORES', size: 130, top: 260 },
  { t: S('c68'), html: '<span class="r">14 AÑOS</span>', size: 320, top: 430 }]);
// la denuncia de 1996
{
  const a = S('c69'), he = S('c70'), na = S('c71'), b = S('c72');
  scene('e_fa', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="efaD" style="left:420px;top:110px;width:1080px;height:860px;padding:54px 64px;font:400 28px/1.6 'IBM Plex Mono';color:#1c1c1c">
      <div style="display:flex;justify-content:space-between;font:600 30px Oswald;letter-spacing:.2em;border-bottom:3px solid #1c1c1c;padding-bottom:14px"><span>DENUNCIA</span><span>1996</span></div>
      <div style="margin-top:30px">ANTE: POLICÍA DE NUEVA YORK · FBI</div><div>DENUNCIANTE: MARIA FARMER, ARTISTA</div>
      <div style="margin-top:20px">DENUNCIADOS: J. EPSTEIN · G. MAXWELL</div><div>HECHO: AGRESIÓN SEXUAL</div>
      <div id="efaH" style="margin-top:20px;opacity:0">TAMBIÉN: SU HERMANA, DE 16 AÑOS</div>
      <div style="position:absolute;right:40px;bottom:30px;font-size:18px;color:#777">RECREACIÓN</div></div>
    ${selloC('efaS', 'SIN AVANCES', 760, 640, 150)}`);
  RENDER.push(t => {
    if (!on('e_fa')) return;
    const q = P(t, a, a + .5); $('efaD').style.opacity = q; $('efaD').style.transform = `rotate(1.5deg) translateY(${lerp(40, 0, eo(q))}px)`;
    $('efaH').style.opacity = P(t, he, he + .4); golpeC('efaS', t, na, -10);
  });
}
// la casa llena de cámaras y la teoría del chantaje
{
  const a = S('c72'), te = S('c73'), es = S('c74'), fb = S('c75'), cr = S('c76'), b = S('c77');
  fotoC('e_cam', [a - .1, b - .1, .4, .4], 'mansion-spa.jpg', { lbl: 'Mansión de Manhattan · foto del FBI', kb: [1.48, 1.56, -400, -430, 0, 0],
    inner: `<svg class="full" id="ecaS" viewBox="0 0 1920 1080"></svg>
      <div id="ecaT" style="position:absolute;right:96px;top:170px;text-align:right;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">TEORÍA</div><div class="cbig" style="font-size:150px">CHANTAJE</div></div>
      <div id="ecaF" style="position:absolute;right:96px;top:480px;text-align:right;opacity:0"><div class="cpill">FBI · 2025: SIN PRUEBAS DE CHANTAJE</div></div>
      <div id="ecaC" class="osw" style="position:absolute;right:96px;top:570px;font-size:34px;letter-spacing:.14em;opacity:0">MUCHOS NO LE CREYERON</div>` });
  const svg = $('ecaS'), cams = [[420, 260], [1220, 220], [760, 640], [1520, 600], [300, 760]].map(([x, y]) => { const g = el('g', { transform: `translate(${x} ${y})`, opacity: 0 }, svg);
    el('rect', { x: -34, y: -22, width: 52, height: 44, rx: 6, fill: '#111', stroke: '#ff2a2a', 'stroke-width': 3 }, g); el('path', { d: 'M18,-12 L44,-26 L44,26 L18,12 Z', fill: '#111', stroke: '#ff2a2a', 'stroke-width': 3 }, g);
    el('circle', { cx: -22, cy: -10, r: 6, fill: '#ff2a2a' }, g); return g; });
  RENDER.push(t => {
    if (!on('e_cam')) return;
    cams.forEach((g, i) => { const k = P(t, AT('c72', 'cámaras') + i * .15, AT('c72', 'cámaras') + .25 + i * .15); g.setAttribute('opacity', k * (Math.floor(t * 2 + i) % 2 ? .7 : 1)); g.setAttribute('transform', g.getAttribute('transform').replace(/ scale\([^)]*\)/, '') + ` scale(${lerp(1.6, 1, eo(k))})`); });
    $('ecaT').style.opacity = P(t, te, te + .4); $('ecaF').style.opacity = P(t, fb, fb + .4); $('ecaC').style.opacity = P(t, cr, cr + .4);
  });
}
// Vanity Fair, 2003: los testimonios que desaparecieron
{
  const a = S('c77'), wa = S('c78'), sa = S('c79'), pr = S('c80'), b = S('cap4');
  scene('e_vf', [a - .1, b + .2, .4, .6, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="evfD" style="left:460px;top:80px;width:1000px;height:920px;padding:50px 64px;color:#1c1c1c">
      <div style="font:600 24px Oswald;letter-spacing:.3em;border-bottom:2px solid #1c1c1c;padding-bottom:12px;display:flex;justify-content:space-between"><span>REVISTA · MARZO DE 2003</span><span>RECREACIÓN</span></div>
      <div style="font:700 74px/1 'Cormorant Garamond';margin-top:26px">El talentoso<br>señor Epstein</div>
      <div style="font:500 22px Oswald;letter-spacing:.14em;margin-top:14px;color:#555">POR VICKY WARD</div>
      <div style="display:flex;gap:30px;margin-top:30px">${[0, 1].map(c => `<div style="flex:1">${Array.from({ length: 11 }, (_, i) => `<div class="vfl" data-c="${c}" data-i="${i}" style="height:14px;margin:13px 0;width:${96 - (i * 7) % 20}%;background:#bdb5a6;position:relative"></div>`).join('')}</div>`).join('')}</div></div>
    <div id="evfX" class="cpill" style="position:absolute;left:1500px;top:520px;opacity:0;width:340px;white-space:normal">TESTIMONIOS DE LAS HERMANAS FARMER: <b>ELIMINADOS</b></div>`);
  const ls = [...document.querySelectorAll('#e_vf .vfl')].filter(l => l.dataset.c === '1' && +l.dataset.i >= 3 && +l.dataset.i <= 8);
  RENDER.push(t => {
    if (!on('e_vf')) return;
    const q = P(t, a, a + .5); $('evfD').style.opacity = q; $('evfD').style.transform = `rotate(-1deg) translateY(${lerp(30, 0, eo(q))}px)`;
    ls.forEach((l, i) => { const k = P(t, sa + i * .12, sa + .2 + i * .12); l.style.background = k > 0 ? '#111' : '#bdb5a6'; l.style.height = (14 + 6 * k) + 'px'; });
    $('evfX').style.opacity = P(t, sa + .6, sa + 1); $('evfX').style.transform = `translateX(${lerp(40, 0, eo(P(t, sa + .6, sa + 1)))}px)`;
  });
}
});
