// Capítulo 8 · La lista: Maxwell condenada, "¿dónde están los demás?", el memo de 2025, la ley, los archivos de 2026, Giuffre, Andrés y Maxwell.
SETUP.push(() => {
capituloC('e_ch8', 'cap8', 8, 'LA LISTA');
fotoC('e_sju', [S('c145') - .1, S('c146') - .1, .4, .3], 'epstein-2019.jpg', { bn: true, ret: 'izq', kb: [1, 1.06, 0, 0, 0, 0], inner: selloC('esjS', 'SIN JUICIO', 1080, 460, 150) });
RENDER.push(t => { if (on('e_sju')) golpeC('esjS', t, AT('c145', 'juicio'), -7); });
{
  const it = [[S('c147'), '2020', 'DETENIDA'], [S('c148'), '2021', 'CULPABLE'], [S('c149'), '20', 'AÑOS DE PRISIÓN']];
  fotoC('e_gm2', [S('c146') - .1, S('c151') - .1, .4, .4], 'maxwell-2020.jpg', { bn: true, ret: 'izq', lbl: 'Ghislaine Maxwell · 2020', kb: [1, 1.06, 0, 0, 0, 0],
    inner: `<div style="position:absolute;right:96px;top:220px;text-align:right">${it.map(([, y, s], i) => `<div id="eg2H${i}" style="display:flex;justify-content:flex-end;align-items:baseline;gap:22px;margin-top:10px;opacity:0"><span class="osw" style="font-size:36px;letter-spacing:.14em">${s}</span><span class="cbig" style="font-size:130px;color:#ff2a2a">${y}</span></div>`).join('')}</div>
      <div id="eg2U" class="cpill" style="position:absolute;right:96px;top:780px;opacity:0;background:#000;border:2px solid #ff2a2a">La única otra persona condenada</div>` });
  RENDER.push(t => { if (!on('e_gm2')) return; it.forEach(([ti], i) => { const q = P(t, ti - .1, ti + .3); $('eg2H' + i).style.opacity = q; $('eg2H' + i).style.transform = `translateX(${lerp(30, 0, eo(q))}px)`; });
    $('eg2U').style.opacity = P(t, S('c150'), S('c150') + .4); });
}
// ¿dónde están los demás?
{
  const a = S('c151'), q = AT('c151', 'dónde'), xs = [[300, 560], [560, 760], [860, 640], [1120, 780], [1380, 560], [1620, 740], [420, 820], [1500, 860]];
  tableroC('e_dem', [a - .1, S('c152') - .1, .4, .4], [
    { t: a, x: 620, y: 110, w: 300, h: 380, img: 'epstein-2006.jpg', tx: 'J. EPSTEIN', rot: -3, pos: '50% 22%' },
    { t: a + .3, x: 1000, y: 110, w: 300, h: 380, img: 'maxwell-2020.jpg', tx: 'G. MAXWELL', rot: 3, pos: '50% 25%' },
    ...xs.map(([x, y], i) => ({ t: q - .3 + i * .12, x: x - 70, y: y - 30, txt: '?', rot: (i % 3 - 1) * 5, est: 'font-size:80px;padding:6px 34px' }))],
    xs.map((_, i) => ({ t: q + i * .12, de: i % 2, a: i + 2 })),
    { cam: [[a - .1, 960, 480, 1.1], [q, 960, 560, .95]] });
  addHTML(`<div id="edmT" class="cbig" style="position:absolute;left:0;right:0;top:960px;text-align:center;font-size:90px;opacity:0;text-shadow:0 0 30px #000">¿DÓNDE ESTÁN <span class="r">LOS DEMÁS?</span></div>`, $$('#e_dem .cam'));
  RENDER.push(t => { if (on('e_dem')) $('edmT').style.opacity = P(t, q, q + .4); });
}
// el memo de julio de 2025 (recreación)
{
  const a = S('c152'), no = AT('c152', 'no existía'), b = S('c153');
  scene('e_doj', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="edjD" style="left:430px;top:90px;width:1060px;height:900px;padding:56px 70px;font:400 28px/1.6 'IBM Plex Mono';color:#1c1c1c">
      <div style="display:flex;justify-content:space-between;font:600 28px Oswald;letter-spacing:.2em;border-bottom:3px solid #1c1c1c;padding-bottom:14px"><span>DEPARTAMENTO DE JUSTICIA · FBI</span><span>JULIO 2025</span></div>
      <div style="font:600 40px Oswald;letter-spacing:.14em;margin-top:30px">MEMORANDO · CONCLUSIONES</div>
      <div style="margin-top:34px" id="edj1">1. No se encontró una "lista de clientes".</div>
      <div style="margin-top:18px">2. No hay pruebas para acusar a terceros no imputados.</div>
      <div style="margin-top:18px">3. La muerte fue un suicidio.</div>
      <div style="position:absolute;right:40px;bottom:30px;font-size:18px;color:#777">RECREACIÓN · RESUMEN</div></div>`);
  RENDER.push(t => {
    if (!on('e_doj')) return;
    const k = P(t, a, a + .5); $('edjD').style.opacity = k; $('edjD').style.transform = `rotate(-1deg) translateY(${lerp(40, 0, eo(k))}px)`;
    $('edj1').style.background = `rgba(255,42,42,${(.32 * P(t, no - .1, no + .4)).toFixed(2)})`;
  });
}
fotoC('e_pro', [S('c153') - .1, AT('c153', 'Congreso') - .1, .4, .3], 'protesta.jpg', { lbl: 'Manifestación · 2025', kb: [1.05, 1.15, 0, 0, 0, 0] });
fotoC('e_vot', [AT('c153', 'Congreso') - .1, S('c154') - .1, .3, .4], 'votacion.jpg', { lbl: 'Cámara de Representantes · noviembre de 2025', kb: [1.05, 1.15, 0, 0, 0, 0],
  inner: `<div id="evoN" class="cpill" style="position:absolute;right:96px;top:880px;opacity:0">Ley para publicar todos los archivos · 427 a 1</div>` });
RENDER.push(t => { if (on('e_vot')) $('evoN').style.opacity = P(t, AT('c153', 'unanimidad') - .2, AT('c153', 'unanimidad') + .2); });
// enero de 2026: los archivos
{
  const a = S('c154'), b = S('c155');
  const nums = [['tres millones', 3e6, 'PÁGINAS'], ['dos mil', 2e3, 'VIDEOS'], ['ciento ochenta', 18e4, 'IMÁGENES']];
  scene('e_arc', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div><div id="earP"></div>
    <div class="clbl" style="opacity:1"><i></i>Enero de 2026 · Departamento de Justicia</div>
    <div style="position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;gap:90px">${nums.map(([, , s], i) => `<div id="earN${i}" style="text-align:center;opacity:0"><div class="cbig" id="earV${i}" style="font-size:150px;${i ? '' : 'color:#ff2a2a'}">0</div><div class="osw" style="font-size:34px;letter-spacing:.3em">${s}</div></div>`).join('')}</div>`);
  const pila = $('earP'), r = rnd(11); for (let i = 0; i < 26; i++) pila.insertAdjacentHTML('beforeend', `<div class="cpapel earH" style="left:${100 + r() * 1580}px;top:${560 + r() * 360}px;width:220px;height:280px;opacity:0;padding:20px">${Array.from({ length: 8 }, (_, j) => `<div style="height:9px;margin:11px 0;width:${60 + ((i * 7 + j * 13) % 38)}%;background:${(i + j) % 3 ? '#111' : '#bdb5a6'}"></div>`).join('')}</div>`);
  const hs = [...document.querySelectorAll('#e_arc .earH')];
  RENDER.push(t => {
    if (!on('e_arc')) return;
    nums.forEach(([w, n], i) => { const ti = AT('c154', w), k = P(t, ti - .1, ti + 1); $('earN' + i).style.opacity = P(t, ti - .2, ti + .2); $('earV' + i).textContent = fmt(n * eo(k)); });
    hs.forEach((h, i) => { const k = P(t, a + .2 + i * .1, a + .5 + i * .1); h.style.opacity = k * .85; h.style.transform = `rotate(${(i % 5 - 2) * 6}deg) translateY(${lerp(-60, 0, eo(k))}px)`; });
  });
}
{
  const pal = [['políticos', 'POLÍTICOS'], ['millonarios', 'MILLONARIOS'], ['científicos', 'CIENTÍFICOS'], ['príncipes', 'PRÍNCIPES']];
  addCSS('#e_age .cpapel img{filter:grayscale(1) blur(4px)}');   // los nombres de la agenda no se leen: no hace falta señalar a nadie
docC('e_age', [S('c155') - .1, S('c156') - .1, .4, .4], 'agenda.jpg', { dx: 380, ancho: 1000, alto: 773, y: 150, zoom: [[S('c155') - .1, 50, 50, .95], [S('c156'), 50, 50, 1.05]],
    fijo: `<div style="position:absolute;left:96px;top:300px">${pal.map(([, s], i) => `<div class="cbig" id="eag${i}" style="font-size:110px;opacity:0;text-shadow:0 0 30px #000;${i % 2 ? 'color:#ff2a2a' : ''}">${s}</div>`).join('')}</div>
      <div class="clbl" style="opacity:1"><i></i>Agenda de contactos · publicada con tachaduras</div>` });
  RENDER.push(t => { if (on('e_age')) pal.forEach(([w], i) => { const q = P(t, AT('c155', w) - .05, AT('c155', w) + .2); $('eag' + i).style.opacity = q; $('eag' + i).style.transform = `translateX(${lerp(-40, 0, eo(q))}px)`; }); });
}
textosC('e_apa', [S('c156') - .1, S('c158') - .1, .4, .4, 1.04], [
  { t: S('c156'), html: 'APARECER <span class="r">≠</span> DELITO', size: 220, top: 250 },
  { t: S('c157'), html: '<span style="color:#8a8a8a">CONTACTOS · CORREOS · INVITACIONES</span>', size: 90, top: 560 }]);
// Virginia Giuffre (sin foto libre: tarjeta)
{
  const a = S('c158'), mu = S('c159'), b = S('c160');
  scene('e_vg2', [a - .1, b - .1, .5, .4, 1.03], `<div style="position:absolute;inset:0;background:#050505"></div>
    <div id="ev2" style="position:absolute;left:0;right:0;top:300px;text-align:center;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.4em;color:#8a8a8a">LA VOZ QUE EXPUSO EL CASO</div>
      <div class="cbig" style="font-size:180px;margin-top:20px">VIRGINIA GIUFFRE</div>
      <div style="width:520px;height:3px;background:#ff2a2a;margin:30px auto" id="ev2L"></div>
      <div class="osw" id="ev2D" style="font-size:44px;letter-spacing:.3em;opacity:0">1983 – 2025</div></div>`);
  RENDER.push(t => { if (!on('e_vg2')) return; $('ev2').style.opacity = P(t, a, a + .6); $('ev2L').style.transform = `scaleX(${eo(P(t, a + .3, a + 1.3))})`; $('ev2D').style.opacity = P(t, mu, mu + .5); });
}
fotoC('e_an2', [S('c160') - .1, S('c161') - .1, .4, .4], 'andres.jpg', { bn: true, ret: 'izq', lbl: 'Andrés, hermano del rey Carlos III', kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="ea2M" class="cpill" style="position:absolute;right:96px;top:250px;opacity:0">Octubre de 2025 · se publican sus memorias</div>${selloC('ea2X', 'YA NO ES PRÍNCIPE', 1000, 560, 120)}` });
RENDER.push(t => { if (!on('e_an2')) return; $('ea2M').style.opacity = P(t, AT('c160', 'memorias') - .2, AT('c160', 'memorias') + .2); golpeC('ea2X', t, AT('c160', 'quitó'), -6); });
fotoC('e_gm3', [S('c161') - .1, S('epi') + .2, .4, .6], 'maxwell-2020.jpg', { bn: true, ret: 'izq', tinte: .35, kb: [1.04, 1.1, 0, 0, 0, 0],
  inner: `<div id="eg3" style="position:absolute;right:96px;top:300px;text-align:right;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">MAXWELL · 2025</div><div class="cbig" style="font-size:150px">CÁRCEL DE<br><span class="r">MÍNIMA SEGURIDAD</span></div></div>` });
RENDER.push(t => { if (on('e_gm3')) $('eg3').style.opacity = P(t, AT('c161', 'trasladaron'), AT('c161', 'trasladaron') + .4); });
});
