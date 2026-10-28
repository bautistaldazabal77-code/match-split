// Atajos para los reels verticales en estilo "caso real" (van después de caso.js).
// La zona libre va de y = 330 (debajo de la interfaz) a y = 1150 (encima de los subtítulos).

// foto con título grande, píldoras y sello que aparecen cuando se dicen.
// o = {titulo, tT, top, size, align, pills: [[t, texto, estilo]], pTop, sello: {t, txt, x, y, size, rot}, + lo de fotoC (lbl, ev, evT, kb, bn, pos, tinte)}
function fotoR(id, w, src, o = {}) {
  const top = o.top ?? 420, pTop = o.pTop ?? top + (o.titulo ? (o.size || 150) * (o.titulo.split('<br>').length) * .95 + 30 : 0);
  const inner = (o.titulo ? `<div id="${id}T" class="cbig" style="position:absolute;left:64px;right:64px;top:${top}px;text-align:${o.align || 'left'};font-size:${o.size || 150}px;opacity:0;text-shadow:0 0 30px #000">${o.titulo}</div>` : '')
    + (o.pills || []).map(([, s, est], i) => `<div id="${id}p${i}" class="cpill" style="position:absolute;left:64px;top:${pTop + i * 72}px;opacity:0;${est || ''}">${s}</div>`).join('')
    + (o.sello ? selloC(id + 's', o.sello.txt, o.sello.x ?? 90, o.sello.y ?? 900, o.sello.size || 110) : '') + (o.inner || '');
  fotoC(id, w, src, { ...o, inner });
  RENDER.push(t => {
    if (!on(id)) return;
    if (o.titulo) { const a = o.tT ?? w[0] + .2, q = P(t, a - .1, a + .3); $(id + 'T').style.opacity = q * (o.tHasta ? 1 - P(t, o.tHasta - .3, o.tHasta) : 1); $(id + 'T').style.transform = `translateY(${lerp(24, 0, eo(q))}px)`; }
    (o.pills || []).forEach(([a], i) => { const q = P(t, a - .1, a + .25); $(id + 'p' + i).style.opacity = q; $(id + 'p' + i).style.transform = `translateX(${lerp(-30, 0, eo(q))}px)`; });
    if (o.sello) golpeC(id + 's', t, o.sello.t, o.sello.rot ?? -6);
  });
}

// cita que se escribe letra por letra, con autor y fuente; o = {bg, top}
function citaR(id, w, txt, t0, t1, autor, fuente, o = {}) {
  scene(id, [...w.slice(0, 4), 1.03], `${o.bg || '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div>'}
    <div style="position:absolute;left:110px;right:80px;top:${o.top ?? 430}px"><div id="${id}b" style="position:absolute;left:-40px;top:6px;width:8px;height:100%;background:#ff2a2a;transform-origin:top"></div>
      <div id="${id}t" style="font:italic 500 74px/1.2 'Cormorant Garamond';color:#ece8e1;min-height:200px;text-shadow:0 0 20px #000"></div>
      <div class="osw" id="${id}a" style="font-size:34px;letter-spacing:.16em;margin-top:34px;opacity:0">${autor}</div>
      <div class="mono" id="${id}f" style="font-size:20px;color:#8a8a8a;margin-top:8px;opacity:0">${fuente}</div></div>`);
  RENDER.push(t => {
    if (!on(id)) return;
    $(id + 't').textContent = typed(t, t0, t1, txt); $(id + 'b').style.transform = `scaleY(${eo(P(t, w[0], w[0] + .6))})`;
    $(id + 'a').style.opacity = P(t, w[0] + .2, w[0] + .7); $(id + 'f').style.opacity = P(t, w[0] + .5, w[0] + 1);
  });
}

// hojas que caen y un número que cuenta (o un texto fijo); o = {num | texto, tNum, pre, suf, rotulo, lbl, cartel: [t, html]}
function papelesR(id, w, o = {}) {
  const [a] = w;
  scene(id, [...w.slice(0, 4), 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#140404,#050505 70%)"></div><div id="${id}P"></div>
    ${o.lbl ? `<div class="clbl" style="opacity:1"><i></i>${o.lbl}</div>` : ''}
    <div id="${id}N" style="position:absolute;left:0;right:0;top:400px;text-align:center;opacity:0"><div class="cbig" id="${id}V" style="font-size:180px;color:#ff2a2a">0</div><div class="osw" style="font-size:34px;letter-spacing:.24em">${o.rotulo || ''}</div></div>
    ${o.cartel ? `<div id="${id}C" class="cbig" style="position:absolute;left:0;right:0;top:960px;padding:14px 30px;text-align:center;font-size:96px;opacity:0;background:rgba(5,5,5,.88)">${o.cartel[1]}</div>` : ''}`);
  const pila = $(id + 'P'), r = rnd(11); for (let i = 0; i < 22; i++) pila.insertAdjacentHTML('beforeend', `<div class="cpapel ${id}H" style="left:${40 + r() * 800}px;top:${640 + r() * 420}px;width:200px;height:260px;opacity:0;padding:18px">${Array.from({ length: 8 }, (_, j) => `<div style="height:9px;margin:10px 0;width:${60 + ((i * 7 + j * 13) % 38)}%;background:${(i + j) % 3 ? '#111' : '#bdb5a6'}"></div>`).join('')}</div>`);
  const hs = [...document.querySelectorAll(`#${id} .${id}H`)], tn = o.tNum ?? a + .3;
  RENDER.push(t => {
    if (!on(id)) return;
    $(id + 'N').style.opacity = P(t, tn - .2, tn + .2); $(id + 'V').textContent = o.texto ?? (o.pre || '') + fmt((o.num || 0) * eo(P(t, tn - .1, tn + 1.2))) + (o.suf || '');
    hs.forEach((h, i) => { const k = P(t, a + .2 + i * .1, a + .5 + i * .1); h.style.opacity = k * .85; h.style.transform = `rotate(${(i % 5 - 2) * 6}deg) translateY(${lerp(-60, 0, eo(k))}px)`; });
    if (o.cartel) $(id + 'C').style.opacity = P(t, o.cartel[0] - .1, o.cartel[0] + .3);
  });
}

// cierre de serie sobre una escena final: "PASÓ DE VERDAD · FUENTES EN LA DESCRIPCIÓN"
const cierreR = `<div id="cierreR" style="position:absolute;left:0;right:0;top:1180px;text-align:center;opacity:0"><div class="osw" style="font-size:30px;letter-spacing:.4em;color:#ff2a2a">PASÓ DE VERDAD</div><div class="osw" style="font-size:24px;letter-spacing:.24em;color:#8a8a8a;margin-top:10px">FUENTES EN LA DESCRIPCIÓN</div></div>`;
function cierreAnim(t) { const n = $('cierreR'); if (n) n.style.opacity = P(t, S('outro') + .3, S('outro') + .9); }

// título de apertura: el nombre del protagonista enorme desde el primer cuadro (retención de los primeros segundos).
// html: 'CRISTIANO<br><span class="r">RONALDO</span>'; o = {sup: texto chico arriba, hasta: segundo en que se va (por defecto, antes de la segunda frase), top}
function tituloInicio(html, o = {}) {
  const lineas = html.split('<br>').map(l => l.replace(/<[^>]+>/g, '')), largo = Math.max(...lineas.map(l => l.length));
  const size = o.size || Math.min(330, Math.floor(950 / (largo * .43))), hasta = o.hasta ?? Math.min(S('h2'), 2.8), top = o.top ?? 560;
  addHTML(`<div id="tiR" style="position:absolute;inset:0;z-index:75;pointer-events:none">
    <div style="position:absolute;left:0;right:0;top:${top - 220}px;height:${size * lineas.length + 460}px;background:radial-gradient(ellipse at 50% 50%,rgba(5,5,5,.78),rgba(5,5,5,0) 70%)"></div>
    <div id="tiS" class="osw" style="position:absolute;left:0;right:0;top:${top - 70}px;text-align:center;font-size:34px;letter-spacing:.45em;color:#ff2a2a">${o.sup || 'HISTORIA REAL'}</div>
    <div id="tiN" class="cbig" style="position:absolute;left:0;right:0;top:${top}px;text-align:center;font-size:${size}px;line-height:.88;text-shadow:0 0 40px rgba(0,0,0,.9),0 10px 0 rgba(0,0,0,.6)">${html}</div></div>`, document.body);
  const box = $('tiR'), n = $('tiN');
  RENDER.push(t => {
    const sal = P(t, hasta - .35, hasta), gl = t < .5 && Math.floor(t * 24) % 5 === 0;
    box.style.opacity = 1 - sal; box.style.display = t > hasta + .1 ? 'none' : 'block';
    n.style.transform = `scale(${(lerp(1.06, 1, eo(P(t, 0, .6))) + .12 * sal).toFixed(3)}) translateX(${gl ? 8 : 0}px)`;
    n.style.filter = sal > 0 ? `blur(${(8 * sal).toFixed(1)}px)` : 'none';
    n.style.textShadow = gl ? '-8px 0 rgba(255,42,42,.8), 8px 0 rgba(0,200,255,.4)' : '0 0 40px rgba(0,0,0,.9),0 10px 0 rgba(0,0,0,.6)';
  });
}

// calendario de un mes con días marcados que caen cuando se nombran; o = {mes, primero (0 = lunes), dias, top, t0, bg, inner, marcas: [{d, t, txt, col}]}
function calendarioR(id, w, o = {}) {
  const c = 130, h = 104, x0 = 85, top = o.top ?? 380, y0 = top + 150, pri = o.primero ?? 0, n = o.dias ?? 31;
  const xy = d => { const k = d - 1 + pri; return [x0 + (k % 7) * c, y0 + 50 + Math.floor(k / 7) * h]; };
  const cel = Array.from({ length: n }, (_, i) => { const [x, y] = xy(i + 1);
    return `<div id="${id}d${i + 1}" style="position:absolute;left:${x}px;top:${y}px;width:${c}px;height:${h}px;border:1px solid #2a2a2a;font:400 54px 'Bebas Neue';color:#8a8a8a;padding:8px 12px;box-sizing:border-box;background:rgba(5,5,5,.6);opacity:0">${i + 1}</div>`; }).join('');
  const marcas = (o.marcas || []).map((m, j) => { const [x, y] = xy(m.d);
    return `<div id="${id}m${j}" style="position:absolute;left:${x}px;top:${y}px;width:${c}px;height:${h}px;background:${m.col || '#c8101b'};opacity:0;display:flex;flex-direction:column;justify-content:space-between;padding:8px 10px;box-sizing:border-box;box-shadow:0 0 40px rgba(0,0,0,.8)"><span style="font:400 54px/1 'Bebas Neue';color:#fff">${m.d}</span><span class="osw" style="font-size:16px;letter-spacing:.04em;color:#fff;white-space:nowrap">${m.txt}</span></div>`; }).join('');
  scene(id, [...w.slice(0, 4), 1.03], `${o.bg || ''}<div id="${id}O" style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(20,4,4,.8),rgba(5,5,5,.95) 70%)"></div>
    <div id="${id}T" class="cbig" style="position:absolute;left:${x0}px;top:${top}px;font-size:110px;opacity:0">${o.mes}</div>
    ${['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((d, i) => `<div class="osw" id="${id}w${i}" style="position:absolute;left:${x0 + i * c + 12}px;top:${y0}px;font-size:24px;letter-spacing:.2em;color:#ff5050;opacity:0">${d}</div>`).join('')}
    ${cel}${marcas}${o.inner || ''}`);
  RENDER.push(t => {
    if (!on(id)) return; const a = o.t0 ?? w[0] + .1;
    $(id + 'O').style.opacity = lerp(.45, 1, P(t, a - .3, a + .3)); $(id + 'T').style.opacity = P(t, a, a + .3); for (let i = 0; i < 7; i++) $(id + 'w' + i).style.opacity = P(t, a + .1, a + .4);
    for (let i = 1; i <= n; i++) $(id + 'd' + i).style.opacity = P(t, a + i * .015, a + .25 + i * .015);
    (o.marcas || []).forEach((m, j) => { const q = P(t, m.t - .1, m.t + .2), e = $(id + 'm' + j); e.style.opacity = q; e.style.transform = `scale(${lerp(1.6, 1, eo(q)).toFixed(3)})`; });
  });
}

// guante de cuero dibujado (caso O. J. Simpson); devuelve el <g> para moverlo o escalarlo
function guante(parent, x, y, s = 1, o = {}) {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, parent), f = o.fill || '#3b2416', st = o.stroke || '#7a5232';
  const r = (a) => el('rect', { ...a, fill: f, stroke: st, 'stroke-width': 3 }, g);
  [[32, 18], [66, 0], [100, 6], [134, 26]].forEach(([fx, fy]) => r({ x: fx, y: fy, width: 32, height: 130, rx: 16 }));
  el('rect', { x: 150, y: 100, width: 36, height: 96, rx: 18, fill: f, stroke: st, 'stroke-width': 3, transform: 'rotate(-38 168 148)' }, g);
  r({ x: 28, y: 92, width: 146, height: 130, rx: 34 }); r({ x: 42, y: 206, width: 118, height: 60, rx: 8 });
  [60, 100, 140].forEach(px => el('line', { x1: px - 14, y1: 120, x2: px + 4, y2: 190, stroke: st, 'stroke-width': 2, opacity: .7 }, g));
  return g;
}
