// Plantillas del video largo (1920x1080, sin subtítulos, estilo documental): placa de capítulo, texto grande, cita,
// zócalo con nombre y cargo, sello y tabla periódica grande. Usan scene() del motor de los cortos.
addCSS(`.ptL .pt{border-radius:8px}.ptL .pt b{font-size:13px;left:7px;top:5px}.ptL .pt i{top:22px;font-size:31px}`);

// placa de capítulo sobre un silencio del guion
function chapterCard(id, cue, num, title, sub = '') {
  const a = S(cue), b = E(cue);
  scene(id, [a + .15, b + .1, .8, .6, 1.04], `<div class="center"><div class="chn">${num}</div><div class="cht">${title}</div>${sub ? `<div class="chd">${sub}</div>` : ''}</div>`);
  const s = $(id), [n, ti, d] = ['.chn', '.cht', '.chd'].map(q => s.querySelector(q));
  RENDER.push(t => {
    if (!on(id)) return;
    n.style.opacity = eo(P(t, a + .3, a + 1.3)); ti.style.opacity = eo(P(t, a + .8, a + 1.8));
    ti.style.letterSpacing = lerp(.06, .01, eo(P(t, a + .8, a + 3.5))) + 'em'; if (d) d.style.opacity = eo(P(t, a + 1.4, a + 2.3));
  });
}
// texto grande al centro; o.lines: [[html, t], …] para que cada renglón aparezca cuando se dice
function bigText(id, w, o) {
  scene(id, w, `${o.bg || '<div class="glow"></div>'}<div class="center"><div class="big">${o.lines.map((l, i) => `<div class="bl" data-i="${i}">${l[0]}</div>`).join('')}</div>${o.sub ? `<div class="bigsub">${o.sub}</div>` : ''}</div>`);
  const ls = [...$(id).querySelectorAll('.bl')], sub = $(id).querySelector('.bigsub');
  RENDER.push(t => {
    if (!on(id)) return;
    ls.forEach((l, i) => { const k = eo(P(t, o.lines[i][1] - .15, o.lines[i][1] + .7)); l.style.opacity = k; l.style.transform = `translateY(${lerp(16, 0, k)}px)`; });
    if (sub) sub.style.opacity = eo(P(t, o.subAt, o.subAt + .8));
  });
}
// cita que se escribe letra por letra, con nombre y cargo
function quote(id, w, text, who, role, span, o = {}) {
  scene(id, w, `${o.bg || '<div class="glow"></div>'}<div class="qwrap"><div class="qbar"></div><div class="qtext"><span class="qt"></span><span class="qc"></span></div>
    <div class="qwho">${who}</div><div class="qrole">${role}</div></div>${o.rec ? `<div class="rec">${o.rec}</div>` : ''}`);
  const s = $(id), q = '«' + text + '»', qt = s.querySelector('.qt'), qc = s.querySelector('.qc'), bar = s.querySelector('.qbar'), wh = s.querySelector('.qwho'), ro = s.querySelector('.qrole');
  const [t0, t1] = span;
  RENDER.push(t => {
    if (!on(id)) return;
    qt.textContent = typed(t, t0, t1, q); qc.style.opacity = (Math.floor(t * 2.2) % 2 === 0 || t < t1) ? 1 : 0;
    bar.style.transform = `scaleY(${eo(P(t, w[0], w[0] + .8))})`;
    wh.style.opacity = P(t, t1 - .2, t1 + .5); ro.style.opacity = P(t, t1 + .2, t1 + .9);
  });
}
// zócalo (abajo a la izquierda): devuelve el HTML; se anima con zocaloAnim
const zocalo = (id, k, v, s = '') => `<div class="lt" id="${id}" style="opacity:0"><div class="k">${k}</div><div class="v">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;
function zocaloAnim(id, t, a, b = 1e9) { const n = $(id), k = eo(P(t, a, a + .6)) * (1 - P(t, b - .4, b)); n.style.opacity = k; n.style.transform = `translateX(${lerp(-30, 0, k)}px)`; }
const etiq = (id, txt, extra = '') => `<div class="tag" id="${id}" style="opacity:0;${extra}">${txt}</div>`;
const sello = (id, txt, x, y, size = 110) => `<div class="sello" id="${id}" style="left:${x}px;top:${y}px;font-size:${size}px">${txt}</div>`;
const golpe = (id, t, a, rot = -6) => { const s = P(t, a - .05, a + .2), n = $(id); n.style.opacity = s; n.style.transform = `rotate(${rot}deg) scale(${lerp(1.7, 1, eo(s)).toFixed(3)})`; return s; };
// tabla periódica grande y centrada (casillas de 74 px); id de cada casilla: <id>z<Z>
const TL_CW = 74, TL_GAP = 5, TL_LEFT = (1920 - 18 * (TL_CW + TL_GAP)) / 2, TL_TOP = 176;
const tablaGrande = (id, o = {}) => `<div class="ptL">${tablaHTML(id, { cw: TL_CW, gap: TL_GAP, left: TL_LEFT, top: o.top ?? TL_TOP, ...o })}</div>`;
// centro de una casilla de la tabla grande (para cámaras y flechas)
function centroCasilla(z, top = TL_TOP) { const [f, c] = posTabla(z), st = TL_CW + TL_GAP; return [TL_LEFT + (c - 1) * st + TL_CW / 2, top + (f <= 7 ? (f - 1) * st : 7 * st + 16 + (f - 9) * st) + TL_CW / 2]; }
// cámara libre: acerca la escena a un punto (x, y) con zoom z
const camara = (id, x, y, z, dx = 0, dy = 0) => { const c = $$('#' + id + ' .cam'); c.style.transformOrigin = `${x}px ${y}px`; c.style.transform = `translate(${dx}px,${dy}px) scale(${z.toFixed(4)})`; };
