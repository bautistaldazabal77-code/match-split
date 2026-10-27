// Capítulo 2 · El hombre de Wexner: la firma, el poder legal, la mansión, el nuevo mundo, la cita de 2002 y Ghislaine Maxwell.
SETUP.push(() => {
capituloC('e_ch2', 'cap2', 2, 'EL HOMBRE DE WEXNER');
tableroC('e_fir', [S('c44') - .1, S('c47') - .1, .4, .4], [
  { t: S('c44'), x: 140, y: 400, txt: 'J. EPSTEIN & CO.<br><span style="font-size:.6em">1988</span>', rot: -3 },
  { t: S('c45'), x: 620, y: 160, txt: 'CLIENTES CON<br>MÁS DE $1.000 MILLONES', rot: 2 },
  { t: S('c45') + .5, x: 640, y: 560, txt: '¿?', rot: -2, est: 'font-size:90px;padding:10px 40px' },
  { t: S('c45') + .7, x: 900, y: 700, txt: '¿?', rot: 4, est: 'font-size:90px;padding:10px 40px' },
  { t: S('c45') + .9, x: 1120, y: 500, txt: '¿?', rot: -5, est: 'font-size:90px;padding:10px 40px' },
  { t: AT('c46', 'Leslie Wexner'), x: 1380, y: 150, w: 400, h: 500, img: 'wexner.jpg', tx: 'LESLIE WEXNER', rot: 3, pos: '50% 25%' },
  { t: AT('c46', "Victoria's"), x: 1380, y: 720, txt: "DUEÑO DE VICTORIA'S SECRET", rot: -2 }],
  [{ t: S('c45') + .2, de: 0, a: 1 }, { t: AT('c46', 'Leslie Wexner') + .3, de: 0, a: 5 }],
  { cam: [[S('c44') - .1, 960, 540, 1], [AT('c46', 'Leslie Wexner'), 1000, 520, 1.04]] });
// el poder legal de 1991
{
  const a = S('c47'), fi = S('c48'), b = S('c49');
  scene('e_pod', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="epoD" style="left:460px;top:90px;width:1000px;height:900px;padding:60px 70px;font:400 30px/1.6 'IBM Plex Mono';color:#1c1c1c">
      <div style="font:600 46px Oswald;letter-spacing:.2em;text-align:center;border-bottom:3px solid #1c1c1c;padding-bottom:16px">PODER GENERAL</div>
      <div style="margin-top:34px">FECHA: 1991</div><div>OTORGANTE: LESLIE H. WEXNER</div><div>APODERADO: JEFFREY E. EPSTEIN</div>
      <div id="epoF" style="margin-top:26px;padding:6px 10px">FACULTADES: firmar cheques, comprar y vender bienes, contratar préstamos y administrar su patrimonio en su nombre.</div>
      <div style="margin-top:80px;display:flex;justify-content:space-between"><span>__________________</span><span>__________________</span></div>
      <div style="position:absolute;right:40px;bottom:30px;font-size:18px;color:#777">RECREACIÓN</div></div>`);
  RENDER.push(t => {
    if (!on('e_pod')) return;
    const q = P(t, a, a + .5); $('epoD').style.opacity = q; $('epoD').style.transform = `rotate(${lerp(-3, -1, eo(q))}deg) translateY(${lerp(40, 0, eo(q))}px)`;
    $('epoF').style.background = `rgba(255,42,42,${(.3 * P(t, fi, fi + .5)).toFixed(2)})`;
  });
}
fotoC('e_man1', [S('c49') - .1, AT('c50', 'Años') - .1, .4, .4], 'mansion-nyc.jpg', { lbl: '9 East 71st Street · Manhattan', ev: 'Siete pisos', evT: AT('c49', 'siete pisos'), kb: [1.04, 1.16, 0, 0, 30, -20] });
fotoC('e_man2', [AT('c50', 'Años') - .2, S('c51') - .1, .4, .4], 'mansion-biblioteca.jpg', { lbl: 'Dentro de la mansión · foto del FBI',
  inner: `<div id="em2N" style="position:absolute;left:0;right:0;top:330px;text-align:center;opacity:0"><div class="cbig" style="font-size:200px;color:#ff2a2a;text-shadow:0 0 40px rgba(0,0,0,.9)">$46.000.000</div><div class="osw" style="font-size:32px;letter-spacing:.3em;text-shadow:0 0 20px #000">SEGÚN WEXNER, SE LOS QUEDÓ EPSTEIN</div></div>` });
RENDER.push(t => { if (on('e_man2')) $('em2N').style.opacity = P(t, AT('c50', 'cuarenta') - .2, AT('c50', 'cuarenta') + .3); });
{
  const pal = [['aviones privados', 'AVIONES PRIVADOS'], ['desfiles', 'DESFILES'], ['fiestas', 'FIESTAS'], ['políticos', 'POLÍTICOS'], ['millonarios', 'MILLONARIOS'], ['príncipes', 'PRÍNCIPES']];
  fotoC('e_mun', [S('c51') - .1, S('c52') - .1, .4, .4], 'mansion-pasillo.jpg', { lbl: 'Otro mundo', kb: [1.05, 1.2, 0, 0, 0, 0],
    inner: `<div style="position:absolute;left:96px;top:250px">${pal.map(([, s], i) => `<div class="cbig" id="emw${i}" style="font-size:96px;opacity:0;${i % 2 ? 'color:#ff2a2a' : ''}">${s}</div>`).join('')}</div>` });
  RENDER.push(t => { if (on('e_mun')) pal.forEach(([w], i) => { const q = P(t, AT('c51', w) - .05, AT('c51', w) + .2); $('emw' + i).style.opacity = q; $('emw' + i).style.transform = `translateX(${lerp(-40, 0, eo(q))}px)`; }); });
}
// la cita de 2002
{
  const a = S('c52'), q1 = S('c53'), q2 = S('c54'), b = S('c55');
  const txt = '«Es un tipo fantástico. Se dice que le gustan las mujeres hermosas tanto como a mí, y muchas de ellas son bastante jóvenes.»';
  scene('e_tru', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:220px;right:220px;top:250px"><div style="position:absolute;left:-60px;top:6px;width:8px;height:100%;background:#ff2a2a" id="etrB"></div>
      <div id="etrT" style="font:italic 500 66px/1.25 'Cormorant Garamond';min-height:330px"></div>
      <div class="osw" id="etrW" style="font-size:36px;letter-spacing:.2em;margin-top:40px;opacity:0">DONALD TRUMP, SOBRE EPSTEIN</div>
      <div class="mono" id="etrR" style="font-size:22px;color:#8a8a8a;margin-top:10px;opacity:0">New York Magazine · 2002 · traducción</div></div>`);
  RENDER.push(t => {
    if (!on('e_tru')) return;
    $('etrT').textContent = typed(t, q1, E('c54'), txt); $('etrB').style.transform = `scaleY(${eo(P(t, a, a + .6))})`; $('etrB').style.transformOrigin = 'top';
    $('etrW').style.opacity = P(t, a + .2, a + .7); $('etrR').style.opacity = P(t, a + .5, a + 1);
  });
}
fotoC('e_gm', [S('c55') - .1, S('c56') - .1, .4, .4], 'maxwell-1993.jpg', { bn: true, ret: 'der', kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="egmN" class="cbig" style="position:absolute;left:96px;bottom:140px;font-size:170px;opacity:0">GHISLAINE <span class="r">MAXWELL</span></div>` });
RENDER.push(t => { if (on('e_gm')) $('egmN').style.opacity = P(t, AT('c55', 'Ghislaine'), AT('c55', 'Ghislaine') + .4); });
fotoC('e_rm', [S('c56') - .1, S('c58') - .1, .4, .4], 'robert-maxwell.jpg', { bn: true, ret: 'izq', kb: [1, 1.06, 0, 0, 0, 0], lbl: 'Robert Maxwell · magnate de la prensa británica', ev: '1991 · muere al caer de su yate', evT: AT('c56', 'murió'),
  inner: `<div id="ermN" style="position:absolute;right:96px;top:300px;text-align:right;opacity:0"><div class="cbig" style="font-size:150px;color:#ff2a2a">£ CIENTOS DE<br>MILLONES</div><div class="osw" style="font-size:32px;letter-spacing:.2em">DE LOS FONDOS DE PENSIÓN DE SUS EMPLEADOS</div></div>` });
RENDER.push(t => { if (on('e_rm')) $('ermN').style.opacity = P(t, AT('c57', 'robado') - .1, AT('c57', 'robado') + .3); });
{
  const ch = [[S('c60'), 'PAREJA'], [AT('c60', 'socios'), 'SOCIOS'], [S('c61'), 'CASAS · FIESTAS · CONTACTOS']];
  fotoC('e_par', [S('c58') - .1, S('cap3') + .2, .4, .6], 'maxwell-epstein-1993.jpg', { bn: true, pos: '50% 30%', lbl: 'Maxwell y Epstein · 1993', kb: [1.05, 1.15, 0, 0, 0, 0],
    inner: `<div style="position:absolute;right:96px;bottom:150px;text-align:right">${ch.map(([, s], i) => `<div class="cpill" id="epc${i}" style="display:block;margin-top:14px;opacity:0;${i === 2 ? 'background:#000;border:2px solid #ff2a2a' : ''}">${s}</div>`).join('')}</div>` });
  RENDER.push(t => { if (on('e_par')) ch.forEach(([ti], i) => $('epc' + i).style.opacity = P(t, ti - .1, ti + .3)); });
}
});
