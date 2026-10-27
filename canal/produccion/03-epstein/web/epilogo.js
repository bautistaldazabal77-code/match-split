// Epílogo · El mal de a poco (Baumeister), los límites cruzados sin costo, los que callaron y la pregunta final.
SETUP.push(() => {
capituloC('e_che', 'epi', '', 'EPÍLOGO');
fotoC('e_mon', [S('c162') - .1, S('c164') - .1, .4, .4], 'epstein-27.jpg', { bn: true, ret: 'izq', tinte: .3, kb: [1, 1.06, 0, 0, 0, 0],
  inner: `<div id="emoA" class="cbig" style="position:absolute;right:96px;top:300px;text-align:right;font-size:170px;opacity:0;text-shadow:0 0 30px #000">¿UN <span class="r">MONSTRUO?</span></div>
    <div id="emoB" class="osw" style="position:absolute;right:96px;top:520px;font-size:40px;letter-spacing:.2em;opacity:0">ES MÁS CÓMODO PENSARLO ASÍ</div>` });
RENDER.push(t => { if (!on('e_mon')) return; $('emoA').style.opacity = P(t, AT('c162', 'monstruo') - .1, AT('c162', 'monstruo') + .3); $('emoB').style.opacity = P(t, S('c163') - .1, S('c163') + .3); });
// la idea de Roy Baumeister: el daño crece de a poco
{
  const a = S('c164'), b = S('c165');
  const ls = [['malvado', 'CASI NADIE SE VE A SÍ MISMO COMO MALVADO'], ['de a poco', 'EL DAÑO CRECE DE A POCO'], ['no tiene costo', 'CUANDO CRUZAR UN LÍMITE <span class="r">NO TIENE COSTO</span>']];
  scene('e_bau', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#111,#050505 70%)"></div><svg class="full" id="ebaS" viewBox="0 0 1920 1080"></svg>
    <div id="ebaH" style="position:absolute;left:140px;top:140px;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">LA IDEA DEL PSICÓLOGO</div><div class="cbig" style="font-size:130px">ROY BAUMEISTER</div></div>
    <div style="position:absolute;left:140px;top:450px">${ls.map(([, s], i) => `<div id="ebaL${i}" class="cbig" style="font-size:78px;margin-bottom:28px;opacity:0">${s}</div>`).join('')}</div>`);
  const svg = $('ebaS'), esc = [];
  for (let i = 0; i < 7; i++) esc.push(el('path', { d: `M${1300 + i * 80},${300 + i * 80} h80 v80`, fill: 'none', stroke: '#ff2a2a', 'stroke-width': 6, pathLength: 1, opacity: .8 }, svg));
  RENDER.push(t => {
    if (!on('e_bau')) return;
    $('ebaH').style.opacity = P(t, a, a + .4);
    ls.forEach(([w], i) => { const ti = AT('c164', w), q = P(t, ti - .3, ti + .1); $('ebaL' + i).style.opacity = q; $('ebaL' + i).style.transform = `translateY(${lerp(20, 0, eo(q))}px)`; });
    esc.forEach((p, i) => { const k = P(t, AT('c164', 'de a poco') + i * .5, AT('c164', 'de a poco') + .5 + i * .5); p.style.strokeDasharray = `${k} 1`; });
  });
}
// cruzó un límite y no pasó nada; cruzó otro y lo premiaron
{
  const a = S('c165'), ot = S('c166'), ap = S('c167'), b = S('c168');
  const fr = [[a, 'NO PASÓ NADA'], [ot, 'LO PREMIARON'], [ap, 'LAS REGLAS ERAN <span class="r">PARA LOS DEMÁS</span>']];
  scene('e_lim', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    ${[0, 1, 2, 3].map(i => `<div style="position:absolute;left:140px;width:860px;top:${220 + i * 190}px;border-top:4px dashed #ff2a2a;opacity:.55"></div><div class="osw" style="position:absolute;left:140px;top:${180 + i * 190}px;font-size:22px;letter-spacing:.3em;color:#ff2a2a;opacity:.7">LÍMITE</div>`).join('')}
    <div id="elmP" style="position:absolute;left:520px;top:120px;width:60px;height:60px;border-radius:50%;background:#ece8e1;box-shadow:0 0 30px rgba(255,255,255,.4)"></div>
    <div style="position:absolute;left:1080px;top:300px;width:720px">${fr.map(([, s], i) => `<div id="elmT${i}" class="cbig" style="font-size:96px;margin-bottom:30px;opacity:0">${s}</div>`).join('')}</div>`);
  RENDER.push(t => {
    if (!on('e_lim')) return;
    const y = lerp(120, 300, io(P(t, a, a + .8))) + 190 * io(P(t, ot, ot + .8)) + 380 * io(P(t, ap, ap + 1.4)); $('elmP').style.top = y + 'px';
    fr.forEach(([ti], i) => { const q = P(t, ti + .3, ti + .7); $('elmT' + i).style.opacity = q; });
  });
}
// los que vieron algo y eligieron callar
{
  const a = S('c168'), ca = AT('c169', 'callar'), b = S('c170');
  scene('e_cal', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#101010,#050505 70%)"></div><svg class="full" id="ecaL" viewBox="0 0 1920 1080"></svg>
    <div id="ecl1" class="cbig" style="position:absolute;left:0;right:0;top:140px;text-align:center;font-size:110px;opacity:0">NO HABLA SOLO DE UN HOMBRE</div>
    <div id="ecl2" class="cbig" style="position:absolute;left:0;right:0;top:820px;text-align:center;font-size:96px;opacity:0">LOS QUE VIERON ALGO <span class="r">Y ELIGIERON CALLAR</span></div>`);
  const svg = $('ecaL'), fig = [];
  for (let i = 0; i < 11; i++) { const x = 260 + i * 140, g = el('g', { transform: `translate(${x} 560)`, opacity: 0 }, svg);
    el('circle', { cy: -110, r: 46, fill: '#2e2e2e' }, g); el('path', { d: 'M-70,120 Q-70,-50 0,-50 Q70,-50 70,120 Z', fill: '#2e2e2e' }, g);
    const bar = el('rect', { x: -40, y: -102, width: 80, height: 18, fill: '#ff2a2a', opacity: 0 }, g); fig.push([g, bar]); }
  RENDER.push(t => {
    if (!on('e_cal')) return;
    $('ecl1').style.opacity = P(t, a, a + .4) * (1 - P(t, S('c169') - .3, S('c169'))); $('ecl2').style.opacity = P(t, S('c169'), S('c169') + .4);
    fig.forEach(([g, bar], i) => { g.setAttribute('opacity', P(t, S('c169') - .2 + i * .06, S('c169') + .1 + i * .06)); bar.setAttribute('opacity', P(t, ca - .1 + i * .05, ca + .1 + i * .05)); });
  });
}
// más de veinte años
{
  const a = S('c170'), b = S('c171');
  scene('e_vei', [a - .1, b - .1, .4, .4, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:240px;right:240px;top:500px;height:6px;background:#333"><div id="eveB" style="position:absolute;inset:0;background:#ff2a2a;transform-origin:0 50%;transform:scaleX(0)"></div></div>
    <div class="cbig" style="position:absolute;left:200px;top:560px;font-size:90px">1996</div><div class="osw" style="position:absolute;left:204px;top:660px;font-size:24px;letter-spacing:.2em;color:#8a8a8a">PRIMERA DENUNCIA</div>
    <div class="cbig" id="eveF" style="position:absolute;right:200px;top:560px;font-size:90px;opacity:0">2019 · 2026</div>
    <div id="eveT" style="position:absolute;left:0;right:0;top:240px;text-align:center;opacity:0"><div class="cbig" style="font-size:150px">MÁS DE <span class="r">20 AÑOS</span></div><div class="osw" style="font-size:34px;letter-spacing:.3em">PARA QUE LAS VÍCTIMAS FUERAN ESCUCHADAS</div></div>`);
  RENDER.push(t => { if (!on('e_vei')) return; const k = io(P(t, a + .2, b - .8)); $('eveB').style.transform = `scaleX(${k})`; $('eveF').style.opacity = P(t, b - 1, b - .6); $('eveT').style.opacity = P(t, AT('c170', 'veinte') - .2, AT('c170', 'veinte') + .2); });
}
// la pregunta
{
  const a = S('c171'), cm = S('c172'), b = S('outro');
  scene('e_pre2', [a - .1, b + .2, .4, .6, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#2a0303,#050505 65%)"></div>
    <div id="epq" class="cbig" style="position:absolute;left:0;right:0;top:320px;text-align:center;font-size:150px;opacity:0">¿SE VA A SABER<br><span class="r">TODA LA VERDAD?</span></div>
    <div id="epc" class="osw" style="position:absolute;left:0;right:0;top:720px;text-align:center;font-size:38px;letter-spacing:.3em;opacity:0">TE LEO EN LOS COMENTARIOS</div>`);
  RENDER.push(t => { if (!on('e_pre2')) return; $('epq').style.opacity = P(t, a, a + .5); $('epc').style.opacity = P(t, cm, cm + .4); });
}
// cierre
{
  const a = S('outro'), b = E('outro');
  scene('e_out', [a + .2, b + 1, .8, .01, 1.03], `<div style="position:absolute;inset:0;background:#050505"></div>
    <div style="position:absolute;left:0;right:0;top:300px;text-align:center">
      <div id="eo1" class="cbig" style="font-size:300px;color:#ff2a2a;opacity:0">IMPUNE</div>
      <div id="eo2" class="osw" style="font-size:36px;letter-spacing:.5em;margin-right:-.5em;opacity:0">EL CASO JEFFREY EPSTEIN</div>
      <div id="eo3" class="mono" style="font-size:22px;letter-spacing:.2em;color:#8a8a8a;margin-top:70px;opacity:0">EXPEDIENTES JUDICIALES · DEPARTAMENTO DE JUSTICIA · MIAMI HERALD<br>FUENTES Y CRÉDITOS DE LAS FOTOS EN LA DESCRIPCIÓN</div></div>`);
  RENDER.push(t => { if (!on('e_out')) return; $('eo1').style.opacity = P(t, a + .4, a + 1.1); $('eo2').style.opacity = P(t, a + .9, a + 1.6); $('eo3').style.opacity = P(t, a + 1.8, a + 2.6); });
}
});
