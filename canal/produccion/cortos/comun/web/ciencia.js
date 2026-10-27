// Dibujos de ciencia para los cortos de Victor Ninov: tabla periódica, núcleos atómicos, pantallas de datos de la época
// y lugares de los laboratorios. Va después de mapas.js.
Object.assign(LUGAR, { darmstadt: [8.65, 49.87], berkeley: [-122.25, 37.87], wako: [139.61, 35.78], caen: [-0.37, 49.18], dubna: [37.17, 56.73], livermore: [-121.77, 37.68] });

const SIMB = ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe ' +
  'Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og').split(' ');
// fila y columna de cada elemento; lantánidos y actínidos van en las filas 9 y 10
function posTabla(z) {
  if (z === 1) return [1, 1]; if (z === 2) return [1, 18];
  for (const [a, b, f] of [[3, 10, 2], [11, 18, 3]]) if (z >= a && z <= b) return [f, z - a < 2 ? z - a + 1 : z - b + 18];
  if (z <= 36) return [4, z - 18]; if (z <= 54) return [5, z - 36];
  if (z >= 57 && z <= 71) return [9, z - 54]; if (z >= 89 && z <= 103) return [10, z - 86];
  if (z <= 56) return [6, z - 54]; if (z <= 86) return [6, z - 68];
  if (z <= 88) return [7, z - 86]; return [7, z - 100];
}
// tabla periódica en HTML; o.hasta: último elemento conocido (los siguientes quedan como casillas vacías punteadas);
// o.simb: símbolos propios para algunas casillas, p. ej. {116: '?'}. Cada casilla es #<id>z<Z>.
function tablaHTML(id, o = {}) {
  const cw = o.cw || 52, gap = o.gap || 3.5, L = o.left ?? 40, T = o.top ?? 560, hasta = o.hasta || 118, st = cw + gap;
  let h = `<div id="${id}" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px">`;
  for (let z = 1; z <= 118; z++) {
    const [f, c] = posTabla(z), y = T + (f <= 7 ? (f - 1) * st : 7 * st + 16 + (f - 9) * st), x = L + (c - 1) * st;
    const vacia = z > hasta, s = (o.simb && o.simb[z]) ?? (vacia ? '' : SIMB[z - 1]);
    h += `<div id="${id}z${z}" class="pt${vacia ? ' ptv' : ''}" style="left:${x}px;top:${y}px;width:${cw}px;height:${cw}px"><b>${z}</b><i>${s}</i></div>`;
  }
  return h + '</div>';
}
addCSS(`.pt{position:absolute;border-radius:6px;background:#121a25;border:1px solid rgba(255,255,255,.09);color:#cfd5dc;transform-origin:50% 50%}
.pt b{position:absolute;left:5px;top:3px;font:500 11px 'IBM Plex Mono';color:#7d8792}
.pt i{position:absolute;left:0;right:0;top:15px;text-align:center;font:700 22px 'Inter Var';font-style:normal}
.ptv{background:transparent;border:1.5px dashed rgba(255,255,255,.22)}
.pt.oro{background:linear-gradient(#ffcf5a,#e09a1c);border-color:#ffe08a;color:#2a1a00;box-shadow:0 0 30px rgba(255,190,60,.7)}
.pt.oro b{color:#5a3a00}
.pt.roja{background:#3a0d0b;border:1.5px solid #ff5148;color:#ff8a80;box-shadow:0 0 24px rgba(255,80,70,.5)}
.pt.verde{background:#0e3322;border-color:#5ee093;color:#bff5d6}
/* casilla grande */
.ptG{position:absolute;width:220px;height:220px;border-radius:18px;background:#121a25;border:2px solid rgba(255,255,255,.14);color:#e9edf1;transform-origin:50% 50%}
.ptG b{position:absolute;left:16px;top:10px;font:600 34px 'IBM Plex Mono';color:#8b95a1}
.ptG i{position:absolute;left:0;right:0;top:62px;text-align:center;font:800 96px 'Inter Var';font-style:normal}
.ptG u{position:absolute;left:0;right:0;bottom:12px;text-align:center;font:500 20px 'IBM Plex Mono';text-decoration:none;letter-spacing:.08em;color:#9aa3ad}
.ptG.oro{background:linear-gradient(#ffcf5a,#e09a1c);border-color:#ffe08a;color:#2a1a00;box-shadow:0 0 60px rgba(255,190,60,.6)}
.ptG.oro b,.ptG.oro u{color:#5a3a00}
/* pantalla de datos de la época */
.crt{position:absolute;border-radius:26px;background:#030a05;border:10px solid #1b1f24;box-shadow:0 0 0 2px #2a3038,0 40px 90px rgba(0,0,0,.7),inset 0 0 90px rgba(40,255,120,.12);overflow:hidden}
.crt .tt{position:absolute;left:0;right:0;top:0;padding:14px 22px;font:500 20px 'IBM Plex Mono';letter-spacing:.14em;color:#06140a;background:#4fe08a;z-index:2}
.crt .ln{position:absolute;left:22px;right:22px;top:60px;font:500 21px/34px 'IBM Plex Mono';color:#5df39a;text-shadow:0 0 8px rgba(80,255,150,.55);white-space:pre}
.crt .ln div{height:34px;padding-left:6px;border-radius:4px}
.crt .scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(rgba(0,0,0,.28) 0 2px,transparent 2px 5px)}
.crt .glo{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,.6))}
`);
const casillaG = (id, z, s, nota = '', x = 0, y = 0, extra = '') => `<div id="${id}" class="ptG" style="left:${x}px;top:${y}px;${extra}"><b>${z}</b><i>${s}</i><u>${nota}</u></div>`;

// líneas de datos inventadas pero verosímiles (evento, energía, tiempo, posición en el detector), siempre las mismas
function lineasDatos(n, seed = 7) {
  const r = rnd(seed), out = [];
  for (let i = 0; i < n; i++) {
    const ev = String(4180000 + Math.floor(r() * 90000) + i * 97).padStart(8, '0');
    out.push(`EVT ${ev}  E=${(1 + r() * 14).toFixed(2).padStart(5)} MeV  t=${(r() * 9).toFixed(5)} s  x=${(r() * 60).toFixed(1).padStart(4)}`);
  }
  return out;
}
// pantalla de datos (HTML); las líneas se mueven con scroll(t) desde escenas.js
function crtHTML(id, x, y, w, h, titulo, lineas) {
  return `<div id="${id}" class="crt" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="tt">${titulo}</div>
    <div class="ln">${lineas.map(l => `<div>${l}</div>`).join('')}</div><div class="scan"></div><div class="glo"></div></div>`;
}

// pantallas de datos: las líneas suben hasta "stop" y frenan alineadas; devuelve cuánto subieron
function crtScroll(id, t, a, stop, vel = 900) {
  const S0 = vel * (stop - a), S1 = 34 * Math.round(S0 / 34), s = t < stop ? S1 * clamp((t - a) / (stop - a)) : S1;
  $$('#' + id + ' .ln').style.transform = `translateY(${-s.toFixed(1)}px)`;
  return S1;
}
function marcarLinea(id, idx, on, bg = '#ffc142', fg = '#1a1000') {
  const d = $$('#' + id + ' .ln').children[idx];
  d.style.background = on ? bg : 'transparent'; d.style.color = on ? fg : ''; d.style.textShadow = on ? 'none' : '';
}

// ---------- Núcleo atómico: esferas rojas (protones) y grises (neutrones) ----------
function defsNucleo(svg) {
  const d = el('defs', {}, svg), id = svg.id;
  const g = (n, c0, c1) => { const rg = el('radialGradient', { id: id + n, cx: .35, cy: .32, r: .7 }, d); el('stop', { offset: 0, 'stop-color': c0 }, rg); el('stop', { offset: 1, 'stop-color': c1 }, rg); };
  g('P', '#ff8f80', '#b0261e'); g('N', '#d3d9e0', '#5d6670'); g('O', '#ffe7a0', '#d48a12');
}
// devuelve un <g> centrado en el origen; s = radio de cada esfera. Las esferas quedan en g.bolas por si hay que animarlas.
function nucleo(svg, parent, Z, N, s = 11, seed = 3, oro = false) {
  const g = el('g', {}, parent), r = rnd(seed), A = Z + N, id = svg.id, tipos = [];
  for (let i = 0; i < A; i++) tipos.push(i < Z ? 'P' : 'N');
  for (let i = A - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [tipos[i], tipos[j]] = [tipos[j], tipos[i]]; }
  const c = s * 1.02, bolas = [];
  for (let i = A - 1; i >= 0; i--) {                         // de afuera hacia adentro: las del centro quedan arriba
    const rr = c * Math.sqrt(i + .5), th = i * 2.39996;
    bolas.push(el('circle', { cx: (rr * Math.cos(th)).toFixed(1), cy: (rr * Math.sin(th)).toFixed(1), r: s, fill: `url(#${id}${oro ? 'O' : tipos[i]})` }, g));
  }
  g.radio = c * Math.sqrt(A) + s; g.bolas = bolas;
  return g;
}

// silueta sin rasgos (cabeza y hombros) en un <g>, con borde de luz; mide unos 380 x 420 y apoya en y = 0
function silueta(parent, col = '#ffb23e', fid = 'slGl') {
  const g = el('g', {}, parent), d = 'M0,-415 C62,-415 102,-365 102,-300 C102,-245 74,-205 47,-190 L47,-165 C162,-145 252,-95 282,0 L-282,0 C-252,-95 -162,-145 -47,-165 L-47,-190 C-74,-205 -102,-245 -102,-300 C-102,-365 -62,-415 0,-415 Z';
  el('path', { d, fill: 'none', stroke: col, 'stroke-width': 12, opacity: .55, filter: `url(#${fid})` }, g);
  el('path', { d, fill: '#05070a' }, g);
  return g;
}
function filtroBrillo(svg, id = 'slGl') { const f = el('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, el('defs', {}, svg)); el('feGaussianBlur', { stdDeviation: 9 }, f); }
