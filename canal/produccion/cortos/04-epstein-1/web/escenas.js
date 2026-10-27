// "Pasó de verdad" · Jeffrey Epstein, parte 1: siete veces sin consecuencias (de la Dalton al acuerdo de 2008).
// Estilo caso real (caso.js) en vertical. Fotos de dominio público o con licencia libre: ver ../../../03-epstein/web/img/fotos.json.
// Los tiempos salen de timeline.js: S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase').

captions([
  ['h1', 'Jeffrey', 'a'], ['h1', 'Epstein', 'a'], ['h1', 'límite', 'r'], ['h2', 'siete', 'r'], ['h2', 'consecuencias', 'r'],
  ['c2', 'profesor', 'a'], ['c2', 'Manhattan', 'a'], ['c3', 'Nadie', 'r'], ['c3', 'nada', 'r'], ['c4', 'Wall', 'a'], ['c4', 'Street', 'a'], ['c4', 'cargos', 'r'],
  ['c5', 'piramidal', 'a'], ['c5', 'veinte', 'a'], ['c5', 'nunca', 'r'], ['c5', 'acusan', 'r'], ['c6', 'Maria', 'a'], ['c6', 'Farmer', 'a'], ['c6', 'avanza', 'r'],
  ['c7', 'desaparecieron', 'r'], ['c8', 'decenas', 'a'], ['c8', 'menores', 'r'], ['c9', 'treinta', 'a'], ['c9', 'secreto', 'r'], ['c9', 'dicen', 'r'],
  ['c10', 'dieciocho', 'a'], ['c10', 'trece', 'a'], ['c11', 'doce', 'r'], ['c11', 'horas', 'r'], ['c12', 'Siete', 'r'], ['c12', 'consecuencias', 'r'],
  ['c13', 'todo', 'a'], ['c13', 'volvió', 'a'], ['c14', 'dos', 'r'], ['c14', 'cámaras', 'r'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 1', aviso: 'CASO REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c12') - .1,
  horas: [[S('c2') - .1, '1974'], [S('c4') - .1, '1976'], [AT('c4', 'ochenta y uno') - .1, '1981'], [S('c5') - .1, '1987'], [S('c6') - .1, '1996'],
    [S('c7') - .1, '2003'], [S('c8') - .1, '2005'], [S('c9') - .1, '2007'], [S('c10') - .1, '2008', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
contador([[AT('c3', 'Nadie'), 1], [AT('c4', 'No hubo'), 2], [AT('c5', 'nunca'), 3], [AT('c6', 'no avanza'), 4], [AT('c7', 'desaparecieron'), 5], [AT('c9', 'no se lo dicen'), 6], [AT('c11', 'doce horas'), 7]],
  [[S('c1'), S('c12') - .1]]);

SETUP.push(() => {
// ---------- 1 · Jeffrey Epstein: siete veces sin consecuencias ----------
fotoC('sAbre', [-1, S('c2') - .1, .01, .4], 'epstein-2006.jpg', { bn: true, pos: '50% 30%', kb: [1.18, 1.04, 0, 0, 0, 0],
  inner: `<div id="aN" class="cbig" style="position:absolute;left:0;right:0;top:330px;text-align:center;font-size:136px;opacity:0;text-shadow:0 0 30px #000">JEFFREY <span class="r">EPSTEIN</span></div>
    <div id="aS" class="cbig" style="position:absolute;left:0;right:0;top:880px;text-align:center;font-size:120px;opacity:0;text-shadow:0 0 30px #000">7 VECES</div>
    ${selloC('aX', 'SIN CONSECUENCIAS', 110, 1000, 84)}` });
RENDER.push(t => {
  if (!on('sAbre')) return;
  $('aN').style.opacity = P(t, .2, .7); $('aS').style.opacity = P(t, AT('h2', 'siete') - .1, AT('h2', 'siete') + .2); golpeC('aX', t, AT('h2', 'consecuencias'), -5);
});
// ---------- 2 · La Dalton: nadie hizo nada ----------
fotoC('sDal', [S('c2') - .1, S('c4') - .1, .3, .3], 'dalton.jpg', { lbl: 'Dalton School · Manhattan', ev: 'Según exalumnos', evT: S('c3'), kb: [1.05, 1.18, 0, 0, 0, -30],
  inner: `<div id="dP1" class="cpill" style="position:absolute;left:64px;top:410px;opacity:0">Profesor de matemáticas</div>
    <div id="dP2" class="cpill" style="position:absolute;left:64px;top:480px;opacity:0;background:#000;border:2px solid #ff2a2a">Sin título universitario</div>
    ${selloC('dX', 'NADIE HIZO NADA', 90, 760, 104)}` });
RENDER.push(t => {
  if (!on('sDal')) return;
  $('dP1').style.opacity = P(t, AT('c2', 'profesor') - .1, AT('c2', 'profesor') + .3); $('dP2').style.opacity = P(t, AT('c2', 'Sin título') - .1, AT('c2', 'Sin título') + .3); golpeC('dX', t, AT('c3', 'Nadie'), -6);
});
// ---------- 3 · Bear Stearns: sin cargos ----------
fotoC('sBS', [S('c4') - .1, S('c5') - .1, .3, .3], 'bear-stearns.jpg', { lbl: 'Bear Stearns · Wall Street', kb: [1.05, 1.16, 0, 0, 20, -20],
  inner: `<div id="bA" style="position:absolute;left:64px;top:420px;opacity:0"><div class="cbig" style="font-size:240px;text-shadow:0 0 30px #000">1981</div><div class="osw" style="font-size:30px;letter-spacing:.2em;text-shadow:0 0 20px #000">INVESTIGACIÓN INTERNA EN EL BANCO</div></div>
    ${selloC('bX', 'SIN CARGOS', 160, 820, 130)}` });
RENDER.push(t => { if (!on('sBS')) return; const y = AT('c4', 'ochenta y uno'); $('bA').style.opacity = P(t, y - .2, y + .2); golpeC('bX', t, AT('c4', 'No hubo'), -6); });
// ---------- 4 · Towers Financial: la estafa y el socio preso ----------
{
  const a = S('c5'), es = AT('c5', 'estafa'), mi = AT('c5', 'cuatrocientos'), so = AT('c5', 'Su socio'), ep = AT('c5', 'A Epstein'), nu = AT('c5', 'nunca'), b = S('c6');
  scene('sTow', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#170404,#050505 70%)"></div><svg class="full" id="tS" viewBox="0 0 1080 1920"></svg>
    <div class="clbl" style="opacity:1"><i></i>Towers Financial · 1987</div>
    <div id="tN" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="cbig" style="font-size:150px;color:#ff2a2a">$<span id="tV">0</span></div><div class="osw" style="font-size:28px;letter-spacing:.3em">ESTAFA PIRAMIDAL</div></div>
    <div class="cpol" id="tH" style="left:70px;top:640px;width:420px;height:500px;opacity:0"><div class="im"><img src="img/hoffenberg.jpg" style="object-position:50% 25%"></div><div class="tx">S. HOFFENBERG · SOCIO</div></div>
    <div class="cpol" id="tE" style="left:590px;top:640px;width:420px;height:500px;opacity:0"><div class="im"><img src="img/epstein-27.jpg" style="object-position:50% 30%"></div><div class="tx">J. EPSTEIN</div></div>
    ${selloC('tX1', '20 AÑOS', 90, 900, 100)}${selloC('tX2', 'NUNCA ACUSADO', 560, 900, 74)}`);
  const svg = $('tS'), filas = [], cx = 540, top = 700;
  for (let f = 0; f < 5; f++) { const fila = []; for (let i = 0; i <= f; i++) { const g = el('g', { opacity: 0 }, svg);
    el('circle', { cy: -18, r: 15, fill: '#ece8e1' }, g); el('path', { d: 'M-24,30 Q-24,0 0,0 Q24,0 24,30 Z', fill: '#ece8e1' }, g); fila.push(g); } filas.push(fila); }
  RENDER.push(t => {
    if (!on('sTow')) return;
    const fuera = 1 - P(t, so - .4, so);
    filas.forEach((fila, f) => fila.forEach((g, i) => { const k = P(t, es + f * .18, es + .3 + f * .18), cae = P(t, mi + (4 - f) * .08, mi + .6 + (4 - f) * .08);
      g.setAttribute('opacity', k * (1 - .7 * cae) * fuera); g.setAttribute('transform', `translate(${cx + (i - f / 2) * 92} ${top + f * 86 + 240 * cae * cae})`); }));
    $('tN').style.opacity = P(t, mi - .3, mi + .1); $('tV').textContent = fmt(460e6 * eo(P(t, mi - .1, mi + 1.2)));
    $('tH').style.opacity = P(t, so - .2, so + .2); $('tH').style.transform = `rotate(-3deg) scale(${lerp(1.15, 1, eo(P(t, so - .2, so + .3)))})`;
    $('tE').style.opacity = P(t, ep - .2, ep + .2); $('tE').style.transform = `rotate(3deg) scale(${lerp(1.15, 1, eo(P(t, ep - .2, ep + .3)))})`;
    golpeC('tX1', t, AT('c5', 'veinte'), -8); golpeC('tX2', t, nu, -6);
  });
}
// ---------- 5 · 1996: la denuncia de Maria Farmer ----------
{
  const a = S('c6'), b = S('c7');
  scene('sFar', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="fD" style="left:90px;top:400px;width:900px;height:700px;padding:44px 50px;font:400 28px/1.6 'IBM Plex Mono';color:#1c1c1c">
      <div style="display:flex;justify-content:space-between;font:600 30px Oswald;letter-spacing:.2em;border-bottom:3px solid #1c1c1c;padding-bottom:12px"><span>DENUNCIA</span><span>1996</span></div>
      <div style="margin-top:26px">ANTE: POLICÍA DE NUEVA YORK · FBI</div><div>DENUNCIANTE: MARIA FARMER</div>
      <div style="margin-top:18px">DENUNCIADO: JEFFREY EPSTEIN</div><div>HECHO: AGRESIÓN SEXUAL</div>
      <div style="position:absolute;right:36px;bottom:26px;font-size:18px;color:#777">RECREACIÓN</div></div>
    ${selloC('fX', 'SIN AVANCES', 200, 820, 130)}`);
  RENDER.push(t => {
    if (!on('sFar')) return;
    const q = P(t, a, a + .5); $('fD').style.opacity = q; $('fD').style.transform = `rotate(1.5deg) translateY(${lerp(40, 0, eo(q))}px)`; golpeC('fX', t, AT('c6', 'no avanza'), -9);
  });
}
// ---------- 6 · 2003: el perfil de Vanity Fair sin los testimonios ----------
{
  const a = S('c7'), de = AT('c7', 'desaparecieron'), b = S('c8');
  scene('sVF', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="vD" style="left:90px;top:400px;width:900px;height:740px;padding:44px 56px;color:#1c1c1c">
      <div style="font:600 22px Oswald;letter-spacing:.3em;border-bottom:2px solid #1c1c1c;padding-bottom:10px;display:flex;justify-content:space-between"><span>REVISTA · MARZO DE 2003</span><span>RECREACIÓN</span></div>
      <div style="font:700 70px/1 'Cormorant Garamond';margin-top:22px">El talentoso<br>señor Epstein</div>
      <div style="display:flex;gap:28px;margin-top:26px">${[0, 1].map(c => `<div style="flex:1">${Array.from({ length: 10 }, (_, i) => `<div class="vfl" data-c="${c}" data-i="${i}" style="height:13px;margin:12px 0;width:${96 - (i * 7) % 20}%;background:#bdb5a6"></div>`).join('')}</div>`).join('')}</div></div>
    ${selloC('vX', 'ELIMINADOS', 250, 860, 120)}`);
  const ls = [...document.querySelectorAll('#sVF .vfl')].filter(l => +l.dataset.i >= 2 && +l.dataset.i <= 7);
  RENDER.push(t => {
    if (!on('sVF')) return;
    const q = P(t, a, a + .5); $('vD').style.opacity = q; $('vD').style.transform = `rotate(-1deg) translateY(${lerp(30, 0, eo(q))}px)`;
    ls.forEach((l, i) => { const k = P(t, de - .6 + i * .08, de - .4 + i * .08); l.style.background = k > 0 ? '#111' : '#bdb5a6'; l.style.height = (13 + 6 * k) + 'px'; });
    golpeC('vX', t, de + .2, -7);
  });
}
// ---------- 7 · Palm Beach, 2005 ----------
fotoC('sPB', [S('c8') - .1, S('c9') - .1, .3, .3], 'pb-casa.jpg', { lbl: 'Mansión de Palm Beach · prueba judicial', kb: [1.1, 1.2, 0, -40, 0, 0],
  inner: `<div id="pA" class="cbig" style="position:absolute;left:64px;top:430px;font-size:150px;opacity:0;text-shadow:0 0 30px #000">DECENAS<br><span class="r">DE CHICAS</span></div>
    <div id="pB" class="cpill" style="position:absolute;left:64px;top:740px;opacity:0">Muchas eran menores</div>` });
RENDER.push(t => { if (!on('sPB')) return; $('pA').style.opacity = P(t, AT('c8', 'decenas') - .1, AT('c8', 'decenas') + .3); $('pB').style.opacity = P(t, AT('c8', 'Muchas') - .1, AT('c8', 'Muchas') + .3); });
// ---------- 8 · El acuerdo secreto de 2007 (documento real) ----------
{
  const a = S('c9'), pe = AT('c9', 'Pero'), fi = AT('c9', 'fiscal federal'), se = AT('c9', 'acuerdo secreto'), nj = AT('c9', 'no habrá'), nd = AT('c9', 'no se lo dicen'), b = S('c10');
  docC('sNPA', [a - .1, b - .1, .3, .3], 'acuerdo-2007.jpg', { ancho: 820, alto: 1061, y: 380, dy: -220,
    zoom: [[a - .1, 50, 40, .85], [se, 50, 30, 1.1], [nj, 50, 52, 1.15], [nd, 50, 45, .9]],
    marcas: [{ t: se, x: 31, y: 26.5, w: 34, h: 3 }, { t: nj, x: 24, y: 50.5, w: 56, h: 9.5 }],
    sello: { t: nd, txt: 'NADIE AVISÓ A LAS VÍCTIMAS', x: 50, y: 860, size: 64, rot: -6 },
    fijo: `<div style="position:absolute;left:0;right:0;top:0;height:420px;background:linear-gradient(#050505 72%,transparent)"></div><div style="position:absolute;left:0;right:0;top:1060px;bottom:0;background:linear-gradient(transparent,#050505 14%)"></div><div id="nV" style="position:absolute;left:0;right:0;top:330px;bottom:0;background:radial-gradient(ellipse at 50% 30%,#170404,#050505 75%);opacity:0">
        <div style="position:absolute;left:0;right:0;top:330px;text-align:center"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">EL FBI IDENTIFICA</div><div class="cbig" style="font-size:300px;color:#ff2a2a">+30</div><div class="osw" style="font-size:40px;letter-spacing:.2em">VÍCTIMAS</div></div></div>
      <div class="cpol" id="nA" style="left:620px;top:420px;width:380px;height:470px;opacity:0"><div class="im"><img src="img/acosta.jpg" style="object-position:50% 20%"></div><div class="tx">A. ACOSTA · FISCAL FEDERAL</div></div>
      <div class="clbl" style="opacity:1"><i></i>Acuerdo de no persecución · 2007</div>` });
  RENDER.push(t => {
    if (!on('sNPA')) return;
    $('nV').style.opacity = 1 - P(t, pe - .3, pe); const q = P(t, fi - .2, fi + .2); $('nA').style.opacity = q * (1 - P(t, se + .6, se + 1));
    $('nA').style.transform = `rotate(4deg) scale(${lerp(1.15, 1, eo(q))})`;
  });
}
// ---------- 9 · La condena: 18 meses, cumple 13, sale 12 horas por día ----------
{
  const a = S('c10'), tr = AT('c10', 'trece'), sa = S('c11'), b = S('c12');
  scene('sSen', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:64px;top:390px"><div class="osw" style="font-size:28px;letter-spacing:.3em;color:#8a8a8a">CONDENA · 2008</div>
      <div style="display:grid;grid-template-columns:repeat(6,140px);gap:12px;margin-top:18px">${Array.from({ length: 18 }, () => `<div class="sm" style="height:60px;border:2px solid #444;background:#111"></div>`).join('')}</div>
      <div class="cbig" id="sT" style="font-size:80px;margin-top:14px">18 MESES</div></div>
    <div id="sS" style="position:absolute;left:64px;top:780px;opacity:0"><div class="osw" style="font-size:26px;letter-spacing:.24em;color:#8a8a8a">UNA SEMANA PRESO</div>
      <div style="display:flex;gap:10px;margin-top:14px">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => `<div style="width:126px"><div class="osw" style="font-size:24px;text-align:center">${d}</div><div style="height:250px;border:2px solid #444;margin-top:6px;position:relative;background:#111"><div class="sd" style="position:absolute;left:0;right:0;top:${i < 6 ? 25 : 0}%;height:${i < 6 ? 50 : 0}%;background:#c8101b;transform:scaleY(0)"></div></div></div>`).join('')}</div>
      <div class="cbig" style="font-size:66px;margin-top:10px">12 HORAS POR DÍA <span class="r">EN SU OFICINA</span></div></div>`);
  const ms = [...document.querySelectorAll('#sSen .sm')], ds = [...document.querySelectorAll('#sSen .sd')];
  RENDER.push(t => {
    if (!on('sSen')) return;
    ms.forEach((m, i) => { const on1 = t > a + .2 + i * .05, cumplido = t > tr && i < 13; m.style.background = cumplido ? '#c8101b' : on1 ? '#2a2a2a' : '#111'; });
    $('sT').innerHTML = t > tr ? 'CUMPLE <span class="r">13</span>' : '18 MESES';
    $('sS').style.opacity = P(t, sa - .2, sa + .3); ds.forEach((d, i) => d.style.transform = `scaleY(${eo(P(t, sa + .2 + i * .15, sa + .5 + i * .15))})`);
  });
}
// ---------- 10 · Siete veces. Once años después, todo volvió ----------
{
  const a = S('c12'), on1 = S('c13'), b = S('c14');
  scene('sSie', [a - .1, b - .1, .3, .3, 1.04], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#2a0303,#050505 65%)"></div>
    <div id="sSi" style="position:absolute;left:0;right:0;top:300px;text-align:center"><div class="cbig" style="font-size:640px;color:#ff2a2a;text-shadow:0 0 60px rgba(255,42,42,.5)">7</div>
      <div class="osw" style="font-size:40px;letter-spacing:.3em;margin-top:-30px">VECES SIN CONSECUENCIAS</div></div>
    <div id="sOn" style="position:absolute;left:0;right:0;top:440px;text-align:center;opacity:0"><div class="cbig" style="font-size:200px">2008</div><div class="cbig" style="font-size:120px;color:#8a8a8a">↓</div><div class="cbig" style="font-size:260px;color:#ff2a2a">2019</div></div>`);
  RENDER.push(t => {
    if (!on('sSie')) return;
    const q = P(t, a, a + .4), gl = t < a + .9 && Math.floor(t * 20) % 3 === 0;
    $('sSi').style.opacity = q * (1 - P(t, on1 - .3, on1)) * (gl ? .5 : 1); $('sSi').style.transform = `scale(${lerp(1.2, 1, eo(q))})`;
    $('sOn').style.opacity = P(t, on1, on1 + .4);
  });
}
// ---------- 11 · Parte 2: la noche en que fallaron las cámaras ----------
{
  const a = S('c14'), b = TL.duration;
  cctvC('sP2', [a - .1, b + 1, .3, .01], { horas: [[a - .1, '23:58:51', 1]], ruido: [[a + 1.4, a + 1.8], [S('outro') + .4, S('outro') + .7]], fecha: '10-08-2019',
    inner: `<div id="p2" style="position:absolute;left:0;right:0;top:620px;text-align:center;opacity:0"><div class="osw" style="font-size:34px;letter-spacing:.4em;color:#ff5050">PARTE 2</div>
      <div class="cbig" style="font-size:150px;margin-top:10px;text-shadow:0 0 30px #000">LA NOCHE<br>EN QUE FALLARON<br><span class="r">LAS CÁMARAS</span></div></div>` });
  RENDER.push(t => { if (on('sP2')) $('p2').style.opacity = P(t, a + .3, a + .8); });
}
});
