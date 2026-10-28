// "Pasó de verdad" · Cristiano Ronaldo, parte 2: lo tacharon de arrogante (del Real Madrid a los 900 goles).
// Estilo caso real (caso.js + reel.js) en vertical. Fotos con licencia libre: ver ../08-cristiano-1/web/img/fotos.json.

captions([
  ['h1', 'mejor', 'a'], ['h1', 'historia', 'a'], ['h2', 'arrogancia', 'r'], ['h2', 'trabajo', 'a'], ['c1', 'Real', 'a'], ['c1', 'Madrid', 'a'], ['c1', 'noventa', 'r'], ['c1', 'cuatro', 'r'],
  ['c2', 'cuatrocientos', 'a'], ['c2', 'cincuenta', 'a'], ['c3', 'cinco', 'a'], ['c4', 'primero', 'a'], ['c4', 'último', 'a'], ['c5', 'llorando', 'r'], ['c6', 'Portugal', 'a'],
  ['c7', 'tatuajes', 'a'], ['c7', 'sangre', 'r'], ['c8', 'banco', 'r'], ['c8', 'terminado', 'r'], ['c9', 'Arabia', 'a'], ['c10', 'novecientos', 'r'], ['c11', 'llorón', 'a'],
  ['c11', 'goleador', 'r'], ['c12', 'valía', 'a'], ['c12', 'comentarios', 'a'],
], { max: 3, chars: 14 });
hud({ serie: 'PASÓ DE VERDAD · PARTE 2', aviso: 'HISTORIA REAL · FOTOS DE ARCHIVO', dia: 'AÑO', hide: S('c12') - .1,
  horas: [[S('c1') - .1, '2009'], [S('c3') - .1, '2018'], [S('c5') - .1, '2016'], [S('c8') - .1, '2022'], [S('c9') - .1, '2023'], [S('c10') - .1, '2024', true]] });
CAPS_OFF(S('outro'), TL.duration + 1);
grano();
tituloInicio('CRISTIANO<br><span class="r">RONALDO</span>', { sup: 'PARTE 2' });

SETUP.push(() => {
fotoR('sAbre', [-1, S('c1') - .1, .01, .3], 'siu.jpg', { pos: '67% 40%', tinte: .3, kb: [1.2, 1.08, 0, 0, 0, 0], lbl: 'El festejo "Siu"',
  pills: [[Math.max(AT('h1', 'mejor'), 2.9), '¿El mejor de la historia? Sí'], [AT('h2', 'arrogancia'), 'Para muchos: arrogancia'], [AT('h2', 'trabajo'), 'Para él: trabajo']], pTop: 860 });
// ---------- 1 · Real Madrid: 94 millones ----------
{
  const a = S('c1'), nv = AT('c1', 'noventa'), b = S('c2');
  fotoR('sMad', [a - .1, b - .1, .3, .3], 'madrid.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Real Madrid',
    inner: `<div id="mN" style="position:absolute;left:64px;top:420px;opacity:0"><div class="cbig" style="font-size:170px;color:#ff2a2a;text-shadow:0 0 30px #000">€<span id="mV">0</span></div><div class="osw" style="font-size:32px;letter-spacing:.2em;text-shadow:0 0 20px #000">EL FICHAJE MÁS CARO DE LA HISTORIA · 2009</div></div>` });
  RENDER.push(t => { if (!on('sMad')) return; $('mN').style.opacity = P(t, nv - .2, nv + .1); $('mV').textContent = fmt(94e6 * eo(P(t, nv, nv + 1.2))); });
}
// ---------- 2 · 450 goles en 438 partidos ----------
{
  const a = S('c2'), cu = AT('c2', 'cuatrocientos'), b = S('c3');
  scene('sGol', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:64px;right:64px;top:420px"><div class="osw" style="font-size:30px;letter-spacing:.3em;color:#8a8a8a">REAL MADRID · 9 TEMPORADAS</div>
      <div class="cbig" style="font-size:110px;margin-top:30px">GOLES</div><div style="height:70px;background:#222"><div id="gG" style="height:100%;width:0;background:#c8101b;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:400 60px 'Bebas Neue'">450</div></div>
      <div class="cbig" style="font-size:110px;margin-top:30px;color:#8a8a8a">PARTIDOS</div><div style="height:70px;background:#222"><div id="gP" style="height:100%;width:0;background:#555;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:400 60px 'Bebas Neue'">438</div></div></div>`);
  RENDER.push(t => { if (!on('sGol')) return; $('gG').style.width = 100 * eo(P(t, cu - .1, cu + 1)) + '%'; $('gP').style.width = 97.3 * eo(P(t, cu + .4, cu + 1.4)) + '%'; });
}
fotoR('sTit', [S('c3') - .1, S('c4') - .1, .3, .3], 'final2018.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Final de la Champions League · 2018',
  titulo: '5 CHAMPIONS<br><span class="r">5 BALONES DE ORO</span>', tT: S('c3'), size: 130 });
fotoR('sTra', [S('c4') - .1, S('c5') - .1, .3, .3], 'portugal2012.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Con Portugal · 2012',
  pills: [[AT('c4', 'primero'), 'El primero en llegar'], [AT('c4', 'último'), 'El último en irse']], pTop: 440 });
// ---------- 3 · La Eurocopa de 2016 ----------
fotoR('sEur', [S('c5') - .1, S('c7') - .1, .3, .3], 'euro2016.jpg', { kb: [1.1, 1.22, 0, 0, 0, 0], lbl: 'Eurocopa 2016',
  pills: [[AT('c5', 'final'), 'La final'], [AT('c5', 'lesionó'), 'Se lesiona y sale llorando'], [AT('c6', 'indicaciones'), 'Dirige desde el costado']], pTop: 440,
  sello: { t: AT('c6', 'ganó'), txt: 'CAMPEONES', x: 230, y: 860, size: 130 } });
textosC('sTat', [S('c7') - .1, S('c8') - .1, .3, .3, 1.04], [
  { t: AT('c7', 'tatuajes'), html: 'SIN TATUAJES', size: 190, top: 440 },
  { t: AT('c7', 'donar'), html: '<span class="r">PARA DONAR SANGRE</span>', size: 120, top: 680 }]);
// ---------- 4 · 2022: en el banco ----------
fotoR('sBan', [S('c8') - .1, S('c9') - .1, .3, .3], 'mundial2022.jpg', { bn: true, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Mundial 2022',
  pills: [[AT('c8', 'treinta y siete'), '37 años'], [AT('c8', 'terminado'), '¿Terminado?']], pTop: 440, sello: { t: AT('c8', 'banco'), txt: 'AL BANCO', x: 260, y: 820, size: 130 } });
fotoR('sAra', [S('c9') - .1, S('c10') - .1, .3, .3], 'alnassr.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Al-Nassr · 2023',
  titulo: 'ARABIA<br><span class="r">SAUDITA</span>', tT: AT('c9', 'Arabia') - .2, size: 160, pills: [[AT('c9', 'siguió'), 'Y siguió haciendo goles']], pTop: 800 });
// ---------- 5 · 900 goles ----------
{
  const a = S('c10'), nv = AT('c10', 'novecientos'), b = S('c11');
  scene('sNov', [a - .1, b - .1, .3, .3, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>
    <div style="position:absolute;left:64px;top:400px"><div class="cbig" style="font-size:240px;color:#ff2a2a"><span id="nV">0</span></div><div class="cbig" style="font-size:90px">GOLES OFICIALES</div></div>
    <div style="position:absolute;left:90px;top:760px;display:grid;grid-template-columns:repeat(45,18px);gap:2px">${Array.from({ length: 900 }, () => '<i class="nD" style="display:block;height:18px;border-radius:50%;background:#ece8e1;opacity:.08"></i>').join('')}</div>`);
  const ds = [...document.querySelectorAll('#sNov .nD')];
  RENDER.push(t => { if (!on('sNov')) return; const k = eo(P(t, nv - .2, nv + 1.6)), n = Math.round(900 * k); $('nV').textContent = n; ds.forEach((d, i) => d.style.opacity = i < n ? 1 : .08); });
}
fotoR('sEst', [S('c11') - .1, S('c12') - .1, .3, .3], 'estatua.jpg', { kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Su estatua en Funchal, Madeira',
  titulo: 'DE LLORÓN<br><span class="r">A MÁXIMO GOLEADOR</span>', tT: AT('c11', 'llorón') - .2, size: 130 });
{
  const a = S('c12'), b = TL.duration;
  fotoR('sFin', [a - .1, b + 1, .3, .01], 'cr2026b.jpg', { bn: true, tinte: .35, kb: [1.1, 1.2, 0, 0, 0, 0], lbl: 'Mundial 2026',
    titulo: '¿ARROGANTE<br><span class="r">O SEGURO?</span>', tT: a, size: 170, top: 440, pills: [[AT('c12', 'comentarios') - .3, 'Te leo en los comentarios']], pTop: 820, inner: cierreR });
  RENDER.push(cierreAnim);
}
});
