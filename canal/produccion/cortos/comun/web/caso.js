// Estilo "caso real" (inspirado en Detrás del Enigma): negro y rojo, fotos reales tratadas, tablero de pruebas con hilos
// rojos, documentos con marcas, cámara de seguridad, contador de impunidad y placas de capítulo. Va después de motor.js y mapas.js.
addCSS(`
:root{--neg:#060606;--rojo:#c8101b;--rojo2:#ff2a2a;--hueso:#ece8e1;--gris:#8a8a8a}
.bebas{font-family:'Bebas Neue',sans-serif;font-weight:400;letter-spacing:.02em}
.osw{font-family:Oswald,sans-serif}
.cfoto{position:absolute;inset:0;overflow:hidden;background:#000}
.cfoto img{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;transform-origin:50% 50%}
.cfoto .tin{position:absolute;inset:0;background:var(--rojo);mix-blend-mode:multiply;opacity:0}
.cfoto .osc{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 35%,rgba(0,0,0,.85) 100%),linear-gradient(rgba(0,0,0,.45),transparent 25%,transparent 70%,rgba(0,0,0,.75))}
.clbl{position:absolute;left:96px;top:84px;display:flex;align-items:center;gap:16px;font:500 24px Oswald;letter-spacing:.24em;color:var(--hueso);text-transform:uppercase}
.clbl i{width:12px;height:12px;background:var(--rojo2);box-shadow:0 0 14px var(--rojo2)}
.cev{position:absolute;left:96px;bottom:84px;padding:8px 16px;border:2px solid var(--rojo2);font:500 22px Oswald;letter-spacing:.2em;color:var(--rojo2);text-transform:uppercase;background:rgba(0,0,0,.55)}
.ccred{position:absolute;right:36px;bottom:26px;font:400 15px 'IBM Plex Mono';letter-spacing:.06em;color:rgba(236,232,225,.45)}
.cbig{font-family:'Bebas Neue';font-weight:400;line-height:.92;color:var(--hueso)}
.cbig .r{color:var(--rojo2);text-shadow:0 0 30px rgba(255,42,42,.45)}
.cpill{display:inline-block;padding:8px 18px;background:var(--rojo);color:#fff;font:500 26px Oswald;letter-spacing:.14em;text-transform:uppercase}
.csello{position:absolute;padding:10px 30px;border:8px solid var(--rojo2);color:var(--rojo2);font:400 110px 'Bebas Neue';letter-spacing:.06em;opacity:0;white-space:nowrap;background:rgba(10,0,0,.35);text-shadow:0 0 20px rgba(255,42,42,.35)}
.cpapel{position:absolute;background:#e9e4da;box-shadow:0 30px 90px rgba(0,0,0,.8);overflow:hidden}
.cpapel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 0;filter:grayscale(.3) contrast(1.05)}
.cmarca{position:absolute;border:5px solid var(--rojo2);box-shadow:0 0 0 2000px rgba(0,0,0,0);opacity:0}
.cpol{position:absolute;background:#e9e4da;padding:14px 14px 54px;box-shadow:0 20px 50px rgba(0,0,0,.7)}
.cpol .im{position:relative;width:100%;height:100%;overflow:hidden;background:#222}
.cpol img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.cpol .tx{position:absolute;left:14px;right:14px;bottom:12px;font:400 30px 'Bebas Neue';letter-spacing:.04em;color:#1a1a1a;text-align:center}
.cnota{position:absolute;background:#e9e4da;color:#1a1a1a;padding:18px 22px;font:400 40px/1 'Bebas Neue';box-shadow:0 20px 50px rgba(0,0,0,.7)}
.cfich{position:absolute;background:rgba(12,12,12,.92);border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 80px rgba(0,0,0,.7)}
.cfich .k{font:500 18px Oswald;letter-spacing:.22em;color:var(--gris);text-transform:uppercase}
.cfich .v{font:500 34px Oswald;color:var(--hueso);margin-top:2px}
#cHUD{position:absolute;right:84px;top:66px;z-index:80;text-align:right;opacity:0}
#cHUD .k{font:500 18px Oswald;letter-spacing:.3em;color:var(--hueso);opacity:.8}
#cHUD .n{font:400 92px/1 'Bebas Neue';color:var(--rojo2);text-shadow:0 0 26px rgba(255,42,42,.55)}
#cGrano{position:absolute;inset:-20%;z-index:90;pointer-events:none;opacity:.07;mix-blend-mode:screen}
`);

// grano de película: una textura de ruido que se mueve a saltos (se dibuja una sola vez)
function grano() {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), im = x.createImageData(256, 256), r = rnd(11);
  for (let i = 0; i < im.data.length; i += 4) { const v = r() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  x.putImageData(im, 0, 0);
  addHTML(`<div id="cGrano" style="background:url(${c.toDataURL()})"></div>`, document.body);
  RENDER.push(t => { const k = Math.floor(t * 12), r2 = rnd(k + 3); $('cGrano').style.transform = `translate(${(r2() * 120 - 60).toFixed(0)}px,${(r2() * 120 - 60).toFixed(0)}px)`; });
}
// contador "SIN CONSECUENCIAS": pasos [[t, n]], visible en ventanas [[a, b]]
function contador(pasos, ventanas, rotulo = 'SIN CONSECUENCIAS') {
  addHTML(`<div id="cHUD"><div class="k">${rotulo}</div><div class="n">00</div></div>`, document.body);
  const box = $('cHUD'), n = $$('#cHUD .n');
  RENDER.push(t => {
    const v = Math.max(0, ...ventanas.map(([a, b]) => Math.min(P(t, a, a + .5), 1 - P(t, b - .5, b))));
    box.style.opacity = v;
    let cur = 0, t0 = -9; for (const [ti, k] of pasos) if (t >= ti) { cur = k; t0 = ti; }
    n.textContent = String(cur).padStart(2, '0');
    const f = 1 - P(t, t0, t0 + .7), g = f > 0 && Math.floor(t * 30) % 3 === 0;
    box.style.transform = `scale(${1 + .35 * f}) translateX(${g ? 6 : 0}px)`; box.style.transformOrigin = '100% 0';
    n.style.color = f > .5 ? '#fff' : '';
  });
}
// foto real tratada; o = {bn, tinte, kb:[s0,s1,x0,x1,y0,y1], pos, ret, lbl, ev, inner, z}
function fotoC(id, w, src, o = {}) {
  const filtro = o.bn ? 'grayscale(1) contrast(1.15) brightness(.82)' : 'saturate(.45) contrast(1.08) brightness(.72)';
  // o.ret ('izq' | 'der' | 'centro'): retrato vertical entero a un costado, sobre la misma foto desenfocada
  const ret = o.ret ? `<img src="img/${src}" style="filter:${filtro} blur(36px) brightness(.45);transform:scale(1.25)"><img class="cret" src="img/${src}" style="width:auto;height:100%;${o.ret === 'izq' ? 'left:120px' : o.ret === 'der' ? 'left:auto;right:120px' : 'left:50%;margin-left:-405px'};object-fit:contain;filter:${filtro};-webkit-mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent)">` : '';
  scene(id, [...w.slice(0, 4), 0], `<div class="cfoto">${ret || `<img src="img/${src}" style="object-position:${o.pos || '50% 50%'};filter:${filtro}">`}<div class="tin" style="opacity:${o.tinte ?? (o.bn ? .22 : .12)}"></div><div class="osc"></div></div>${o.inner || ''}
    ${o.lbl ? `<div class="clbl" id="${id}L" style="opacity:0"><i></i>${o.lbl}</div>` : ''}${o.ev ? `<div class="cev" id="${id}E" style="opacity:0">${o.ev}</div>` : ''}
    <div class="ccred">${o.cred ?? CRED[src] ?? ''}</div>`);
  const img = $$(`#${id} .cfoto ${o.ret ? '.cret' : 'img'}`), k = o.kb || [1.05, 1.16, 0, 0, 0, 0], [a, b] = w;
  RENDER.push(t => {
    if (!on(id)) return;
    kb(img, io(P(t, a, b)), ...k);
    if (o.lbl) $(id + 'L').style.opacity = P(t, a + .3, a + .9);
    if (o.ev) $(id + 'E').style.opacity = P(t, o.evT ?? a + .8, (o.evT ?? a + .8) + .4);
  });
  return $(id);
}
// placa de capítulo sobre un silencio del guion
function capituloC(id, cue, num, titulo) {
  const a = S(cue), b = E(cue);
  scene(id, [a + .1, b + .1, .5, .5, 1.03], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,#1a0303,#050505 65%)"></div>
    <div style="position:absolute;left:0;right:0;top:330px;text-align:center"><div class="osw" id="${id}n" style="font-size:30px;letter-spacing:.5em;color:var(--rojo2);margin-right:-.5em">${num === '' ? '' : 'CAPÍTULO ' + num}</div>
    <div class="cbig" id="${id}t" style="font-size:${Math.min(230, Math.floor(W * .86 / (titulo.length * .44)))}px;margin-top:20px;position:relative">${titulo}</div>
    <div id="${id}l" style="height:5px;background:var(--rojo2);width:0;margin:28px auto 0;box-shadow:0 0 20px var(--rojo2)"></div></div>`);
  RENDER.push(t => {
    if (!on(id)) return;
    $(id + 'n').style.opacity = P(t, a + .2, a + .8);
    const q = P(t, a + .5, a + 1.2), gl = t > a + .5 && t < a + 1.6 && Math.floor(t * 24) % 4 === 0;
    $(id + 't').style.opacity = q * (gl ? .55 : 1); $(id + 't').style.transform = `translateX(${gl ? 10 : 0}px) scale(${lerp(1.06, 1, eo(q))})`;
    $(id + 't').style.textShadow = gl ? '-8px 0 rgba(255,42,42,.8), 8px 0 rgba(0,200,255,.4)' : 'none';
    $(id + 'l').style.width = 700 * eo(P(t, a + 1, a + 2)) + 'px';
  });
}
// frases grandes que aparecen cuando se dicen: items [{t, html, size, top, left, align}]
function textosC(id, w, items, o = {}) {
  scene(id, w, `${o.bg ?? '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#140404,#050505 70%)"></div>'}${o.inner || ''}
    ${items.map((it, i) => `<div class="cbig" id="${id}x${i}" style="position:absolute;left:${it.left ?? 0}px;right:${it.left != null ? 'auto' : 0}px;top:${it.top}px;text-align:${it.align || 'center'};font-size:${it.size || 140}px;opacity:0">${it.html}</div>`).join('')}`);
  RENDER.push(t => {
    if (!on(id)) return;
    items.forEach((it, i) => { const q = P(t, it.t - .1, it.t + .35), n = $(id + 'x' + i); n.style.opacity = q * (it.hasta ? 1 - P(t, it.hasta - .3, it.hasta) : 1); n.style.transform = `translateY(${lerp(24, 0, eo(q))}px)`; });
  });
}
// sello rojo que cae con golpe (HTML) y su animación
const selloC = (id, txt, x, y, size = 110) => `<div class="csello" id="${id}" style="left:${x}px;top:${y}px;font-size:${size}px">${txt}</div>`;
const golpeC = (id, t, a, rot = -6) => { const s = P(t, a - .05, a + .18), n = $(id); n.style.opacity = s; n.style.transform = `rotate(${rot}deg) scale(${lerp(1.8, 1, eo(s)).toFixed(3)})`; return s; };
// documento real sobre fondo oscuro, con zoom a una zona y marcas rojas: o = {marcas:[{t,x,y,w,h}] en % de la hoja, zoom:[[t,cx,cy,z]], sello, fijo, dx, ancho, alto}
// el sello y o.fijo quedan fijos en pantalla; o.inner se mueve con la hoja; o.dx y o.dy corren la hoja
function docC(id, w, src, o = {}) {
  const AW = o.ancho || 900, AH = o.alto || 1160, X0 = (W - AW) / 2, Y0 = o.y ?? 60;
  scene(id, [...w.slice(0, 4), 0], `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#1d1b18,#060606 70%)"></div>
    <div class="cpapel" id="${id}p" style="left:${X0}px;top:${Y0}px;width:${AW}px;height:${AH}px"><img src="img/${src}">
    ${(o.marcas || []).map((m, i) => `<div class="cmarca" id="${id}m${i}" style="left:${m.x}%;top:${m.y}%;width:${m.w}%;height:${m.h}%"></div>`).join('')}</div>
    ${o.inner || ''}`);
  // lo fijo en pantalla (no se mueve con el zoom): sello, o.fijo y crédito
  addHTML(`${o.sello ? selloC(id + 's', o.sello.txt, o.sello.x ?? 1100, o.sello.y ?? 420, o.sello.size || 120) : ''}${o.fijo || ''}
    <div class="ccred">${o.cred ?? CRED[src] ?? ''}</div>`, $(id));
  const cam = $$(`#${id} .cam`), [a, b] = w, zs = o.zoom || [[a, 50, 30, 1]];
  RENDER.push(t => {
    if (!on(id)) return;
    // cámara: interpola entre los puntos de zoom
    let z = zs[0]; for (let i = 0; i < zs.length; i++) if (t >= zs[i][0]) z = zs[i];
    const i = zs.indexOf(z), nx = zs[i + 1], k = nx ? io(P(t, z[0], nx[0])) : 0, cur = nx ? z.map((v, j) => j ? lerp(v, nx[j], k) : v) : z;
    const px = X0 + AW * cur[1] / 100, py = Y0 + AH * cur[2] / 100;
    cam.style.transformOrigin = '0 0'; cam.style.transform = `translate(${W / 2 + (o.dx || 0)}px,${H / 2 + (o.dy || 0)}px) scale(${cur[3]}) translate(${-px}px,${-py}px)`;
    (o.marcas || []).forEach((m, j) => { const q = P(t, m.t, m.t + .3), n = $(id + 'm' + j); n.style.opacity = q; n.style.boxShadow = q > 0 ? `0 0 0 2000px rgba(0,0,0,${.45 * q})` : 'none'; });
    if (o.sello) golpeC(id + 's', t, o.sello.t, o.sello.rot ?? -8);
  });
}
// tablero de pruebas: items [{t, x, y, w, h, img|txt|html, rot, tx}] e hilos [{t, de, a}] (índices); o.cam: [[t, cx, cy, z]]
function tableroC(id, w, items, hilos = [], o = {}) {
  scene(id, [...w.slice(0, 4), 0], `<div style="position:absolute;inset:-10%;background:radial-gradient(ellipse at 50% 45%,#2a1d16,#0d0907 75%)"></div>
    <div style="position:absolute;inset:-10%;opacity:.25;background:repeating-radial-gradient(circle at 30% 40%,rgba(0,0,0,.25) 0 2px,transparent 2px 7px)"></div>
    <svg class="full" id="${id}h" viewBox="0 0 ${W} ${H}" style="z-index:3;pointer-events:none"></svg>
    ${items.map((it, i) => it.img ? `<div class="cpol" id="${id}i${i}" style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${it.h}px;opacity:0;z-index:2"><div class="im"><img src="img/${it.img}" style="object-position:${it.pos || '50% 30%'}"></div><div class="tx">${it.tx || ''}</div></div>`
      : `<div class="cnota" id="${id}i${i}" style="left:${it.x}px;top:${it.y}px;${it.w ? `width:${it.w}px;` : ''}opacity:0;z-index:2;${it.est || ''}">${it.txt}</div>`).join('')}
    ${o.inner || ''}`);
  const svg = $(id + 'h'), cam = $$(`#${id} .cam`), [a, b] = w;
  const cen = i => { const it = items[i]; return [it.x + (it.w || 240) / 2, it.y + 22]; };
  const hs = hilos.map(h => { const p = el('path', { fill: 'none', stroke: '#d81a1a', 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': '0 1', filter: 'drop-shadow(0 3px 2px rgba(0,0,0,.6))' }, svg);
    const [x1, y1] = cen(h.de), [x2, y2] = cen(h.a); p.setAttribute('d', `M${x1},${y1} Q${(x1 + x2) / 2},${Math.max(y1, y2) + 60} ${x2},${y2}`); return { p, h }; });
  const chinches = items.map((it, i) => { const [x, y] = cen(i); return el('circle', { cx: x, cy: y, r: 9, fill: '#b81414', stroke: '#000', 'stroke-width': 2, opacity: 0 }, svg); });
  const zs = o.cam || [[a, W / 2, H / 2, 1], [b, W / 2, H / 2, 1.06]];
  RENDER.push(t => {
    if (!on(id)) return;
    let z = zs[0]; for (const q of zs) if (t >= q[0]) z = q;
    const i = zs.indexOf(z), nx = zs[i + 1], k = nx ? io(P(t, z[0], nx[0])) : 0, cur = nx ? z.map((v, j) => j ? lerp(v, nx[j], k) : v) : z;
    cam.style.transformOrigin = '0 0'; cam.style.transform = `translate(${W / 2}px,${H / 2}px) scale(${cur[3]}) translate(${-cur[1]}px,${-cur[2]}px)`;
    items.forEach((it, j) => { const q = P(t, it.t, it.t + .35), n = $(id + 'i' + j); n.style.opacity = q; n.style.transform = `rotate(${it.rot ?? 0}deg) scale(${lerp(1.25, 1, eo(q))})`; chinches[j].setAttribute('opacity', P(t, it.t + .25, it.t + .35)); });
    hs.forEach(({ p, h }) => p.style.strokeDasharray = `${eo(P(t, h.t, h.t + .8)).toFixed(3)} 1`);
  });
}
// ficha (expediente): foto + campos que se escriben; campos [{t, k, v}]
function fichaC(id, w, src, campos, o = {}) {
  scene(id, w, `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 40% 45%,#160505,#050505 70%)"></div>
    <div class="cfich" style="left:${o.x ?? 260}px;top:${o.y ?? 170}px;width:${o.w ?? 1400}px;height:${o.h ?? 740}px">
      <div style="position:absolute;left:0;top:0;right:0;height:54px;background:var(--rojo);display:flex;align-items:center;padding:0 28px;font:500 22px Oswald;letter-spacing:.3em;color:#fff">${o.titulo || 'EXPEDIENTE'}</div>
      <div style="position:absolute;left:40px;top:94px;width:${o.fw ?? 470}px;height:${(o.h ?? 740) - 134}px;overflow:hidden;background:#111"><img src="img/${src}" style="width:100%;height:100%;object-fit:cover;object-position:${o.pos || '50% 25%'};filter:grayscale(1) contrast(1.15)"></div>
      <div style="position:absolute;left:${(o.fw ?? 470) + 90}px;top:104px;right:40px">${campos.map((c, i) => `<div id="${id}c${i}" style="margin-bottom:30px;opacity:0"><div class="k">${c.k}</div><div class="v" id="${id}v${i}"></div></div>`).join('')}</div></div>
    <div class="ccred">${o.cred ?? CRED[src] ?? ''}</div>`);
  RENDER.push(t => {
    if (!on(id)) return;
    campos.forEach((c, i) => { $(id + 'c' + i).style.opacity = P(t, c.t - .1, c.t + .1); $(id + 'v' + i).innerHTML = typed(t, c.t, c.t + Math.min(1.2, c.v.length * .04), c.v); });
  });
}
// cámara de seguridad: pasillo dibujado, hora que corre, REC y ruido; o.horas: [[t, 'HH:MM:SS']] (la hora avanza sola entre pasos)
function cctvC(id, w, o = {}) {
  scene(id, [...w.slice(0, 4), 0], `<svg class="full" id="${id}s" viewBox="0 0 ${W} ${H}"></svg>
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(rgba(255,255,255,.04) 0 2px,transparent 2px 4px);pointer-events:none"></div>
    <div class="mono" style="position:absolute;left:70px;top:56px;font-size:30px;color:#dfe6df;letter-spacing:.08em">${o.cam || 'CAM 02 · PISO 9 SUR'}</div>
    <div class="mono" id="${id}h" style="position:absolute;right:70px;top:56px;font-size:36px;color:#dfe6df;letter-spacing:.06em"></div>
    <div class="mono" style="position:absolute;left:70px;bottom:56px;font-size:30px;color:#ff4040;display:flex;align-items:center;gap:12px"><i id="${id}r" style="width:18px;height:18px;border-radius:50%;background:#ff3030;display:inline-block"></i>REC</div>
    <div class="mono" style="position:absolute;right:70px;bottom:56px;font-size:24px;color:#9aa49a">${o.fecha || '10-08-2019'}</div>
    <div id="${id}n" style="position:absolute;inset:0;opacity:0;background:#777"></div>${o.inner || ''}`);
  const svg = $(id + 's'), g = el('g', {}, svg);
  el('rect', { x: 0, y: 0, width: W, height: H, fill: '#0d110d' }, g);
  const VP = [W / 2, H * .44];   // punto de fuga del pasillo
  const P2 = (x, y, d) => [VP[0] + (x - VP[0]) * d, VP[1] + (y - VP[1]) * d];
  for (const s of [-1, 1]) {
    for (let k = 0; k < 6; k++) {   // puertas de celdas a cada lado
      const d0 = 1 / (1 + k * .55), d1 = 1 / (1 + (k + .6) * .55), x = s < 0 ? -40 : W + 40;
      const [ax, ay] = P2(x, -60, d0), [bx, by] = P2(x, H + 60, d0), [cx, cy] = P2(x, H + 60, d1), [dx, dy] = P2(x, -60, d1);
      el('path', { d: `M${ax},${ay} L${bx},${by} L${cx},${cy} L${dx},${dy} Z`, fill: k % 2 ? '#1c241c' : '#222b22', stroke: '#3b473b', 'stroke-width': 3 }, g);
    }
  }
  const [fx, fy] = P2(-40, H + 60, .12), [gx, gy] = P2(W + 40, -60, .12);
  el('rect', { x: fx, y: gy, width: gx - fx, height: fy - gy, fill: '#2e3a2e' }, g);
  el('path', { d: `M${P2(-40, H + 60, 1)[0]},${H + 60} L${fx},${fy} L${P2(W + 40, H + 60, .12)[0]},${fy} L${P2(W + 40, H + 60, 1)[0]},${H + 60} Z`, fill: '#151b15' }, g);
  const hs = o.horas || [[w[0], '00:00:00']], seg = s => { const [h, m, x] = s.split(':').map(Number); return h * 3600 + m * 60 + x; }, fmtH = v => [Math.floor(v / 3600) % 24, Math.floor(v / 60) % 60, Math.floor(v) % 60].map(n => String(n).padStart(2, '0')).join(':');
  RENDER.push(t => {
    if (!on(id)) return;
    let cur = hs[0]; for (const h of hs) if (t >= h[0]) cur = h;
    $(id + 'h').textContent = fmtH(seg(cur[1]) + (t - cur[0]) * (cur[2] ?? 1));
    $(id + 'r').style.opacity = Math.floor(t * 2) % 2 ? .25 : 1;
    const nz = (o.ruido || []).some(([a, b]) => t >= a && t < b); $(id + 'n').style.opacity = nz ? .35 + .3 * rnd(Math.floor(t * 30) + 7)() : 0;
    $(id).style.filter = `contrast(1.1) brightness(${.9 + .05 * Math.sin(t * 40)})`;
  });
  return { svg, VP, P2 };
}
