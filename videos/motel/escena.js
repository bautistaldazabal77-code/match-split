// Habitación 13 — escenas 3D low-poly + overlays. Expone window.setup(timeline) y window.renderAt(t).
import * as THREE from 'three';

const W = 1080, H = 1920;
const $ = (id) => document.getElementById(id);

// ---------- utilidades ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = (k) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(k));
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, k) => a.clone().lerp(b, k);
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function mat(color, rough = 0.7, extra = {}) { return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra }); }
function box(w, h, d, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); }
function add(parent, mesh, x = 0, y = 0, z = 0) { mesh.position.set(x, y, z); parent.add(mesh); return mesh; }

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const redraw = (fn = draw) => { ctx.clearRect(0, 0, w, h); fn(ctx, w, h); tex.needsUpdate = true; };
  redraw();
  return { tex, redraw, ctx };
}
function plateMesh(w, h, tex, basic = false) {
  const m = basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true })
                  : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, transparent: true });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
}

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ canvas: $('gl'), antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H, false);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070d);
scene.fog = new THREE.FogExp2(0x080b14, 0.028);
const camera = new THREE.PerspectiveCamera(42, W / H, 0.03, 300);

// ---------- personaje (muñeco) ----------
function makeDummy({ skin = 0xeceae4, top = 0xeceae4, vest = null, pants = 0x2e333b, cap = null, mustache = false }) {
  const g = new THREE.Group();
  const skinM = mat(skin, 0.42);
  const black = new THREE.MeshBasicMaterial({ color: 0x0b0b0d });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
  // piernas y zapatos
  for (const sx of [-0.13, 0.13]) {
    add(g, new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.62, 4, 12), mat(pants, 0.8)), sx, 0.45, 0);
    add(g, box(0.17, 0.09, 0.3, mat(0x18191c, 0.5)), sx, 0.05, 0.05);
  }
  // torso
  const torso = add(g, new THREE.Mesh(new THREE.CapsuleGeometry(0.27, 0.4, 6, 16), mat(vest ?? top, 0.75)), 0, 1.16, 0);
  torso.scale.set(1, 1, 0.72);
  if (vest) {
    add(g, box(0.1, 0.42, 0.02, mat(top, 0.6)), 0, 1.2, 0.2);
    add(g, box(0.1, 0.05, 0.02, mat(0xd8b24a, 0.3, { metalness: 0.6 })), 0.13, 1.3, 0.2);
  }
  add(g, new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.16, 12), skinM), 0, 1.52, 0);
  // brazos (dos segmentos, se ubican con IK)
  const armM = mat(top, 0.7);
  const seg = () => new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.24, 4, 10), armM);
  const arms = {};
  for (const side of ['L', 'R']) {
    const up = seg(), lo = seg(), hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 10), skinM);
    g.add(up, lo, hand);
    arms[side] = { up, lo, hand, sx: side === 'L' ? 1 : -1 };
  }
  // cabeza
  const head = new THREE.Group(); head.position.set(0, 1.9, 0); g.add(head);
  const R = 0.4;
  add(head, new THREE.Mesh(new THREE.SphereGeometry(R, 40, 28), skinM));
  const onFace = (x, y, d = 0) => { const z = Math.sqrt(Math.max(0, R * R - x * x - y * y)) + d; return v3(x, y, z); };
  const face = {};
  const eyes = [];
  for (const sx of [-1, 1]) {
    const e = new THREE.Group(); e.position.copy(onFace(0.14 * sx, 0.05, -0.01)); faceOut(e); head.add(e);
    const oval = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), black); oval.scale.set(0.062, 0.095, 0.03); e.add(oval);
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), white); hl.position.set(0.02 * sx, 0.035, 0.03); e.add(hl);
    const disc = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), white); disc.scale.set(0.105, 0.105, 0.03); e.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.009, 8, 32), black); ring.position.z = 0.012; e.add(ring);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), black); pupil.scale.set(0.026, 0.026, 0.02); pupil.position.z = 0.03; e.add(pupil);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.028, 0.03), black);
    brow.position.copy(onFace(0.15 * sx, 0.2, 0.005)); faceOut(brow); head.add(brow);
    eyes.push({ g: e, oval, hl, disc, ring, pupil, brow, sx, browBase: brow.position.clone(), browQ: brow.quaternion.clone() });
  }
  const mouthG = new THREE.Group(); mouthG.position.copy(onFace(0, -0.16, -0.005)); faceOut(mouthG); head.add(mouthG);
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.013, 8, 24, Math.PI), black); smile.rotation.z = Math.PI; smile.position.y = 0.03; mouthG.add(smile);
  const line = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.018, 0.02), black); mouthG.add(line);
  const oMouth = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), black); oMouth.scale.set(0.045, 0.06, 0.02); mouthG.add(oMouth);
  Object.assign(face, { eyes, smile, line, oMouth });
  if (mustache) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), black); m.position.copy(onFace(0, -0.09, 0)); faceOut(m); head.add(m); }
  if (cap) {
    const cm = mat(cap, 0.8);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.4), cm); dome.position.y = 0.04; head.add(dome);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24, 1, false, -Math.PI / 2, Math.PI), cm);
    brim.position.set(0, 0.2, 0.3); brim.rotation.x = 0.12; head.add(brim);
  }
  // sombra falsa
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 24), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.35, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.012; g.add(shadow);

  const api = {
    group: g, head, arms,
    hands: { L: v3(0.36, 0.86, 0.06), R: v3(-0.36, 0.86, 0.06) },
    expression(kind, blink = 0) {
      for (const e of eyes) {
        const big = kind === 'scared' || kind === 'terror';
        e.oval.visible = e.hl.visible = !big;
        e.disc.visible = e.ring.visible = e.pupil.visible = big;
        const s = kind === 'terror' ? 1.25 : 1;
        e.disc.scale.set(0.105 * s, 0.105 * s, 0.03); e.ring.scale.setScalar(s);
        e.pupil.scale.set(kind === 'terror' ? 0.018 : 0.028, kind === 'terror' ? 0.018 : 0.028, 0.02);
        e.oval.scale.y = 0.095 * (kind === 'smirk' ? 0.62 : 1) * (kind === 'blank' ? 0.5 : 1);
        e.oval.scale.x = kind === 'blank' ? 0.04 : 0.062;
        e.hl.visible = !big && kind !== 'blank';
        e.g.scale.y = 1 - 0.9 * blink;
        // cejas
        e.brow.visible = kind !== 'blank';
        e.brow.position.copy(e.browBase);
        e.brow.quaternion.copy(e.browQ);
        let lift = 0, tilt = 0;
        if (kind === 'smirk') { lift = e.sx > 0 ? 0.05 : -0.005; tilt = e.sx > 0 ? -0.15 : 0.05; }
        if (kind === 'scared') { lift = 0.05; tilt = 0.32 * e.sx; }
        if (kind === 'terror') { lift = 0.08; tilt = 0.42 * e.sx; }
        if (kind === 'worried') { lift = 0.02; tilt = 0.25 * e.sx; }
        e.brow.position.y += lift;
        e.brow.rotateZ(tilt);
      }
      smile.visible = kind === 'smirk' || kind === 'neutral';
      smile.scale.set(kind === 'neutral' ? 0.6 : 1, kind === 'neutral' ? 0.35 : 0.8, 1);
      smile.rotation.z = Math.PI + (kind === 'smirk' ? 0.25 : 0);
      line.visible = kind === 'worried';
      oMouth.visible = kind === 'scared' || kind === 'terror';
      oMouth.scale.set(kind === 'terror' ? 0.06 : 0.04, kind === 'terror' ? 0.09 : 0.05, 0.02);
    },
    // ubica los brazos según la posición de las manos (coordenadas locales)
    pose() {
      for (const side of ['L', 'R']) {
        const a = arms[side];
        const S = v3(0.34 * a.sx, 1.42, 0);
        const Hh = this.hands[side].clone();
        const la = 0.33, lb = 0.33;
        const d = clamp(Hh.distanceTo(S), 0.05, (la + lb) * 0.999);
        const dir = Hh.clone().sub(S).normalize();
        const pole = v3(0.6 * a.sx, -0.6, -0.4);
        const n = pole.sub(dir.clone().multiplyScalar(pole.dot(dir))).normalize();
        const cosA = (la * la + d * d - lb * lb) / (2 * la * d);
        const E = S.clone().add(dir.clone().multiplyScalar(la * cosA)).add(n.multiplyScalar(la * Math.sqrt(1 - cosA * cosA)));
        const Hp = S.clone().add(dir.clone().multiplyScalar(d));
        orient(a.up, S, E); orient(a.lo, E, Hp); a.hand.position.copy(Hp);
      }
    },
  };
  api.expression('neutral');
  api.pose();
  return api;
}
const UP = v3(0, 1, 0);
const FWD = v3(0, 0, 1);
function faceOut(o) { o.quaternion.setFromUnitVectors(FWD, o.position.clone().normalize()); }
function orient(mesh, a, b) {
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
}

// ---------- texturas ----------
function numberTex(n, { bg = '#e9e1cc', fg = '#1a1a1a', w = 256, h = 160, font = '800 112px Inter' } = {}) {
  return canvasTex(w, h, (c) => {
    c.fillStyle = bg; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 8; c.strokeRect(4, 4, w - 8, h - 8);
    c.fillStyle = fg; c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(n), w / 2, h / 2 + 6);
  }).tex;
}

function drawNeon(c, w, h, text, color, on, size, y) {
  c.font = `900 ${size}px "Inter Display", Inter`; c.textAlign = 'center'; c.textBaseline = 'middle';
  if (on) {
    c.shadowColor = color; c.shadowBlur = 40; c.fillStyle = color;
    for (let i = 0; i < 3; i++) c.fillText(text, w / 2, y);
    c.shadowBlur = 0; c.fillStyle = '#fff3f0'; c.globalAlpha = 0.85; c.fillText(text, w / 2, y); c.globalAlpha = 1;
  } else {
    c.fillStyle = 'rgba(80,30,30,.9)'; c.fillText(text, w / 2, y);
  }
}

// 7 segmentos
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
function drawDigit(c, x, y, s, d, on, off) {
  const L = s, T = s * 0.18;
  const segs = { a: [x + T, y, L, T], b: [x + L + T, y + T, T, L], c: [x + L + T, y + 2 * T + L, T, L], d: [x + T, y + 2 * L + 2 * T, L, T],
    e: [x, y + 2 * T + L, T, L], f: [x, y + T, T, L], g: [x + T, y + L + T, L, T] };
  for (const k of 'abcdefg') {
    const lit = d !== ' ' && SEG[d]?.includes(k);
    c.fillStyle = lit ? on : off; c.shadowColor = on; c.shadowBlur = lit ? 30 : 0;
    const [sx, sy, sw, sh] = segs[k];
    c.beginPath(); c.roundRect(sx, sy, sw, sh, T / 2); c.fill();
  }
  c.shadowBlur = 0;
}
function drawClock(c, w, h, text, colonOn) {
  c.fillStyle = '#0a0606'; c.fillRect(0, 0, w, h);
  const s = 78, T = s * 0.18, dw = s + 2 * T, gap = 22, colW = 50;
  const digits = text.replace(':', '').padStart(4, ' ');
  const x0 = (w - (4 * dw + 3 * gap + colW)) / 2, y0 = (h - (2 * s + 3 * T)) / 2;
  const pos = [x0, x0 + dw + gap, x0 + 2 * (dw + gap) + colW, x0 + 3 * (dw + gap) + colW];
  for (let i = 0; i < 4; i++) drawDigit(c, pos[i], y0, s, digits[i], '#ff2b1c', 'rgba(70,10,8,.55)');
  c.fillStyle = colonOn ? '#ff2b1c' : 'rgba(70,10,8,.55)'; c.shadowColor = '#ff2b1c'; c.shadowBlur = colonOn ? 25 : 0;
  const cx = x0 + 2 * dw + gap + (gap + colW) / 2;
  c.beginPath(); c.arc(cx, y0 + s * 0.6, 11, 0, 7); c.fill(); c.beginPath(); c.arc(cx, y0 + s * 1.6, 11, 0, 7); c.fill();
  c.shadowBlur = 0;
}

function drawLCD(c, w, h, l1, l2, lit) {
  c.fillStyle = lit ? '#d6e88f' : '#8f9a74'; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(0,0,0,.08)'; for (let y = 0; y < h; y += 6) c.fillRect(0, y, w, 2);
  c.fillStyle = '#1b2410'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = '700 34px "JetBrains Mono"'; c.fillText(l1, w / 2, h * 0.3);
  c.font = '800 70px "JetBrains Mono"'; c.fillText(l2, w / 2, h * 0.68);
}

const BOOK_ROWS = [
  ['6', 'L. Paredes', '14:10', '17:45'],
  ['10', 'M. y J. Ruiz', '15:30', '20:15'],
  ['2', 'T. Cano', '16:05', '21:40'],
  ['11', 'A. Benítez', '17:20', '22:05'],
];
function drawBook(c, w, h, hl) {
  // dos páginas
  const g = c.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, '#d9ceb2'); g.addColorStop(0.47, '#efe6cf'); g.addColorStop(0.5, '#a39578'); g.addColorStop(0.53, '#efe6cf'); g.addColorStop(1, '#ddd2b6');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  const page = (x0, title, rows, last) => {
    c.fillStyle = '#5b2a22'; c.font = '800 30px Inter'; c.textAlign = 'left'; c.fillText(title, x0 + 30, 62);
    c.font = '700 22px "JetBrains Mono"'; c.fillStyle = '#6d6250';
    const cols = [x0 + 30, x0 + 100, x0 + 300, x0 + 405];
    ['HAB.', 'NOMBRE', 'LLEGA', 'SALE'].forEach((t, i) => c.fillText(t, cols[i], 112));
    c.strokeStyle = 'rgba(70,90,140,.35)'; c.lineWidth = 2;
    for (let y = 130; y < h - 30; y += 62) { c.beginPath(); c.moveTo(x0 + 20, y); c.lineTo(x0 + w / 2 - 30, y); c.stroke(); }
    c.strokeStyle = 'rgba(180,60,60,.4)'; c.beginPath(); c.moveTo(x0 + 96, 90); c.lineTo(x0 + 96, h - 30); c.stroke();
    c.font = '700 40px Caveat'; c.fillStyle = '#1d2a55';
    rows.forEach((r, i) => r.forEach((t, k) => c.fillText(t, cols[k], 180 + i * 62)));
    if (last) {
      const y = 180 + rows.length * 62;
      c.fillStyle = '#3a0c0c'; c.font = '700 52px Caveat';
      c.fillText('13', cols[0], y);
      // nombre ilegible
      c.strokeStyle = '#3a0c0c'; c.lineWidth = 4; c.beginPath();
      for (let k = 0; k <= 60; k++) { const x = cols[1] + k * 3.4; const yy = y - 12 + Math.sin(k * 0.9) * 12 + Math.sin(k * 2.3) * 5; k ? c.lineTo(x, yy) : c.moveTo(x, yy); }
      c.stroke();
      c.fillText('3:07', cols[2], y);
      if (hl > 0) {
        c.strokeStyle = 'rgba(210,25,20,.9)'; c.lineWidth = 7; c.beginPath();
        const steps = Math.floor(80 * hl);
        for (let k = 0; k <= steps; k++) { const a = -Math.PI * 0.9 + (k / 80) * Math.PI * 2.15; const x = x0 + 260 + Math.cos(a) * 250; const yy = y - 14 + Math.sin(a) * 46; k ? c.lineTo(x, yy) : c.moveTo(x, yy); }
        c.stroke();
      }
    }
  };
  page(0, 'REGISTRO · 13 NOV', [['4', 'R. Medina', '12:30', '18:00'], ['15', 'C. Ortega', '13:05', '19:40'], ['1', 'P. Salas', '18:50', '—'], ['12', 'D. Ríos', '20:15', '—'], ['3', 'F. Luna', '21:00', '—']], false);
  page(w / 2, 'REGISTRO · 14 NOV', BOOK_ROWS, true);
}

// ---------- EXTERIOR ----------
const ext = new THREE.Group(); scene.add(ext);
const refs = {};
(function buildExterior() {
  const asphalt = mat(0x15181d, 0.88);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), asphalt); ground.rotation.x = -Math.PI / 2; ext.add(ground);
  // charcos
  const puddleM = new THREE.MeshStandardMaterial({ color: 0x07080b, roughness: 0.06, metalness: 0.2 });
  [[-6, 6, 2.2, 1.1], [3, 9, 3, 1.4], [8, 5, 1.6, 0.8], [-10, 10, 2.5, 1.2], [0, 13, 3.5, 1.2]].forEach(([x, z, sx, sz]) => {
    const p = new THREE.Mesh(new THREE.CircleGeometry(1, 28), puddleM); p.rotation.x = -Math.PI / 2; p.scale.set(sx, sz, 1); p.position.set(x, 0.01, z); ext.add(p);
  });
  // ruta
  const road = new THREE.Mesh(new THREE.PlaneGeometry(220, 7), mat(0x101215, 0.7)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.005, 17); ext.add(road);
  for (let x = -60; x < 60; x += 4) add(ext, box(2, 0.01, 0.15, mat(0xb9962e, 0.5)), x, 0.012, 17);
  // líneas de estacionamiento
  const lineM = mat(0xc9c6bb, 0.6);
  for (let x = -9; x <= 9; x += 3) add(ext, box(0.1, 0.01, 4.5, lineM), x, 0.012, 6.2);
  for (let x = -7.5; x <= 7.5; x += 3) add(ext, box(1.4, 0.15, 0.25, mat(0x5a5650, 0.9)), x, 0.075, 4.1); // topes

  // edificio
  const wallM = mat(0xcbb79a, 0.85), trimM = mat(0x7d2a26, 0.7), slabM = mat(0x8c8a84, 0.9), railM = mat(0x2f4a52, 0.5);
  add(ext, box(20.6, 6.2, 4.4, wallM), 0, 3.1, -2.2);
  add(ext, box(21.2, 0.3, 7.2, mat(0x3b3b3e, 0.8)), 0, 6.3, -0.8);    // techo
  add(ext, box(21.2, 0.7, 0.15, trimM), 0, 6.1, 2.75);               // banda roja
  add(ext, box(20.6, 0.15, 2.4, slabM), 0, 0.075, 1.2);              // vereda PB
  add(ext, box(20.6, 0.25, 2.4, slabM), 0, 3.0, 1.2);                // pasillo PA
  add(ext, box(20.6, 0.12, 0.08, trimM), 0, 2.85, 2.4);
  for (let x = -10; x <= 10.01; x += 2.5) { add(ext, box(0.18, 3, 0.18, railM), x, 1.5, 2.3); add(ext, box(0.18, 3.1, 0.18, railM), x, 4.55, 2.3); }
  add(ext, box(20.6, 0.08, 0.08, railM), 0, 4.15, 2.3);
  add(ext, box(20.6, 0.06, 0.06, railM), 0, 3.65, 2.3);
  for (let x = -10; x <= 10; x += 0.5) add(ext, box(0.04, 1.0, 0.04, railM), x, 3.65, 2.3);

  const doorColors = [0x2e6a6d, 0x2e6a6d];
  const slots = [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5];
  const makeRoom = (x, floorY, num, opts = {}) => {
    const g = new THREE.Group(); g.position.set(x, floorY, 0); ext.add(g);
    if (num == null) return g;
    add(g, box(1.1, 2.3, 0.08, mat(0xe8e2d4, 0.7)), -0.55, 1.15, 0.02);          // marco
    const door = add(g, box(0.95, 2.15, 0.06, mat(doorColors[0], 0.55)), -0.55, 1.1, 0.07);
    add(g, new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat(0xc9a64a, 0.3, { metalness: 0.8 })), -0.2, 1.05, 0.13);
    const plate = add(g, plateMesh(0.44, 0.28, numberTex(num)), -0.55, 1.72, 0.105);
    // ventana con cortina
    const win = add(g, plateMesh(1.25, 0.95, opts.winTex ?? refs.curtainDark, true), 0.75, 1.55, 0.05);
    add(g, box(1.4, 0.08, 0.12, mat(0xe8e2d4, 0.7)), 0.75, 1.03, 0.08);
    add(g, box(0.75, 0.45, 0.5, mat(0x9a9890, 0.6)), 0.75, 0.6, 0.3);                // aire acondicionado
    add(g, box(0.18, 0.12, 0.1, new THREE.MeshBasicMaterial({ color: 0xffd9a0 })), 0.15, 2.75, 0.1); // aplique
    return Object.assign(g, { door, plate, win });
  };
  refs.curtainDark = canvasTex(128, 96, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, 0); for (let i = 0; i <= 8; i++) g.addColorStop(i / 8, i % 2 ? '#1c1a22' : '#26232c'); c.fillStyle = g; c.fillRect(0, 0, w, h); }).tex;
  refs.curtainLit = canvasTex(128, 96, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, 0); for (let i = 0; i <= 8; i++) g.addColorStop(i / 8, i % 2 ? '#e09a4a' : '#f2b766'); c.fillStyle = g; c.fillRect(0, 0, w, h); }).tex;
  [1, 2, 3, 4, 5, 6].forEach((n, i) => makeRoom(slots[i] + 0.3, 0.15, n));
  refs.rooms = {};
  [10, 11, 12, null, 14, 15].forEach((n, i) => { if (n) refs.rooms[n] = makeRoom(slots[i] + 0.3, 3.12, n); });
  // hueco de la 13: pared con extintor
  const blank = new THREE.Group(); blank.position.set(slots[3] + 0.3, 3.12, 0); ext.add(blank);
  add(blank, box(0.3, 0.5, 0.18, mat(0xb0221b, 0.4)), -0.1, 1.3, 0.1);
  add(blank, box(0.36, 0.08, 0.2, mat(0xe8e2d4, 0.6)), -0.1, 1.6, 0.1);
  refs.blank = blank;
  // puerta 13 (aparece en cámara)
  const r13 = new THREE.Group(); r13.position.set(slots[3] + 0.3, 3.12, 0); ext.add(r13);
  add(r13, box(1.1, 2.3, 0.08, mat(0xe8e2d4, 0.7)), -0.55, 1.15, 0.02);
  add(r13, box(0.95, 2.15, 0.02, new THREE.MeshBasicMaterial({ color: 0xffc27a })), -0.55, 1.1, 0.0); // interior iluminado
  const hinge = new THREE.Group(); hinge.position.set(-1.025, 0, 0.08); r13.add(hinge);
  add(hinge, box(0.95, 2.15, 0.06, mat(0x5b1f1c, 0.55)), 0.475, 1.1, 0);
  add(hinge, new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat(0xc9a64a, 0.3, { metalness: 0.8 })), 0.82, 1.05, 0.06);
  add(hinge, plateMesh(0.44, 0.28, numberTex(13, { bg: '#d8cfb4', fg: '#5a0d0d' })), 0.475, 1.72, 0.035);
  add(r13, plateMesh(1.25, 0.95, refs.curtainLit, true), 0.75, 1.55, 0.05);
  add(r13, box(0.18, 0.12, 0.1, new THREE.MeshBasicMaterial({ color: 0xffd9a0 })), 0.15, 2.75, 0.1);
  refs.r13 = r13; refs.hinge13 = hinge;
  const l13 = new THREE.PointLight(0xffb066, 0, 7, 2); l13.position.set(slots[3] - 0.25, 4.3, 0.9); ext.add(l13); refs.l13 = l13;
  // doble en la puerta
  const doble = makeDummy({ vest: 0x2f4f46 });
  doble.group.position.set(slots[3] - 0.25, 3.12, 0.2); doble.group.scale.setScalar(0.9); doble.expression('blank'); doble.pose(); ext.add(doble.group); refs.doble = doble;

  // escalera
  for (let i = 0; i < 12; i++) add(ext, box(0.32, 0.12, 1.5, slabM), 10.55 + i * 0.3, 2.9 - i * 0.245, 1.3);
  // oficina / recepción
  add(ext, box(5.4, 3.4, 4.2, wallM), -13.9, 1.7, -0.9);
  add(ext, box(5.8, 0.3, 4.8, mat(0x3b3b3e, 0.8)), -13.9, 3.5, -0.8);
  const officeGlow = canvasTex(256, 128, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffcf8a'); g.addColorStop(1, '#e8963f'); c.fillStyle = g; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(60,30,10,.55)'; c.fillRect(150, 50, 60, 78); c.fillRect(30, 70, 100, 58); }).tex;
  add(ext, plateMesh(3.2, 1.6, officeGlow, true), -14.4, 1.75, 1.22);
  add(ext, box(0.9, 2.1, 0.06, mat(0x2b2d33, 0.4)), -12.0, 1.05, 1.23);
  const recTex = canvasTex(512, 96, (c, w, h) => { c.fillStyle = '#121418'; c.fillRect(0, 0, w, h); drawNeon(c, w, h, 'RECEPCIÓN', '#7fd7ff', true, 62, h / 2 + 4); }).tex;
  add(ext, plateMesh(2.6, 0.48, recTex, true), -13.9, 2.85, 1.24);
  const officeLight = new THREE.PointLight(0xffb469, 6, 9, 2); officeLight.position.set(-13.9, 1.8, 2.6); ext.add(officeLight);

  // cartel de neón
  const SX = -3.6, SZ = 13;
  add(ext, new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 7.4, 12), mat(0x3a3d42, 0.5)), SX, 3.7, SZ);
  add(ext, box(4.6, 2.0, 0.4, mat(0x16181c, 0.6)), SX, 7.2, SZ);
  add(ext, box(3.4, 0.75, 0.3, mat(0x16181c, 0.6)), SX, 5.75, SZ);
  refs.neonTex = canvasTex(1024, 448, () => {});
  refs.vacTex = canvasTex(768, 168, () => {});
  add(ext, plateMesh(4.4, 1.9, refs.neonTex.tex, true), SX, 7.2, SZ + 0.21);
  add(ext, plateMesh(3.3, 0.72, refs.vacTex.tex, true), SX, 5.75, SZ + 0.16);
  const neonLight = new THREE.PointLight(0xff3326, 30, 26, 2); neonLight.position.set(SX, 6.5, SZ + 1.5); ext.add(neonLight); refs.neonLight = neonLight;
  // farol de la calle
  add(ext, new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 7, 10), mat(0x2b2e33, 0.5)), 5, 3.5, 12.5);
  add(ext, box(1.6, 0.12, 0.12, mat(0x2b2e33, 0.5)), 4.3, 6.95, 12.5);
  add(ext, box(0.6, 0.12, 0.35, new THREE.MeshBasicMaterial({ color: 0xffc070 })), 3.6, 6.86, 12.5);
  const lamp = new THREE.PointLight(0xff9a3c, 45, 22, 2); lamp.position.set(3.6, 6.5, 12.5); ext.add(lamp);
  const facade = new THREE.PointLight(0x9fb6e0, 40, 45, 1.6); facade.position.set(0, 9, 14); ext.add(facade);
  // luces del pasillo
  const porch = new THREE.PointLight(0xffd3a0, 14, 10, 2); porch.position.set(-1, 5.6, 1.6); ext.add(porch);
  const porch2 = new THREE.PointLight(0xffd3a0, 12, 10, 2); porch2.position.set(6, 2.6, 1.6); ext.add(porch2);
  const moon = new THREE.HemisphereLight(0x4a5f8a, 0x0b0c10, 1.6); ext.add(moon); refs.moon = moon;
  // árboles y cerros
  const treeM = mat(0x0c130f, 0.9);
  for (let i = 0; i < 26; i++) {
    const x = -40 + i * 3.3 + hash(i) * 2, z = -9 - hash(i + 9) * 8, h = 5 + hash(i + 3) * 5;
    add(ext, new THREE.Mesh(new THREE.ConeGeometry(1.4 + hash(i + 5), h, 7), treeM), x, h / 2, z);
  }
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.ConeGeometry(25 + hash(i) * 15, 16 + hash(i + 2) * 12, 5), mat(0x0a0d16, 1));
    m.position.set(-80 + i * 32, 6, -70 - hash(i + 4) * 20); ext.add(m);
  }
})();

// ---------- lluvia ----------
const RAIN_N = 3500;
const rainGeo = new THREE.BufferGeometry();
const rainPos = new Float32Array(RAIN_N * 6);
const rainSeed = Array.from({ length: RAIN_N }, (_, i) => [hash(i * 3.1), hash(i * 7.7), hash(i * 1.3), 0.8 + hash(i * 5.3) * 0.5]);
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: 0x9fb4cc, transparent: true, opacity: 0.32, fog: false }));
rain.frustumCulled = false; scene.add(rain);
function updateRain(t, center) {
  const S = 26, Hh = 16;
  for (let i = 0; i < RAIN_N; i++) {
    const [a, b, c, sp] = rainSeed[i];
    const x = center.x + (a - 0.5) * S, z = center.z + (c - 0.5) * S;
    const y = ((b * Hh - t * 14 * sp) % Hh + Hh) % Hh;
    rainPos.set([x, y, z, x + 0.03, y + 0.55, z], i * 6);
  }
  rainGeo.attributes.position.needsUpdate = true;
}

// ---------- INTERIOR (recepción) ----------
const IX = 100;
const int = new THREE.Group(); int.position.set(IX, 0, 0); scene.add(int);
const I = (x, y, z) => v3(x + IX, y, z);
(function buildInterior() {
  add(int, new THREE.Mesh(new THREE.PlaneGeometry(9, 8), mat(0x3a2f27, 0.75)), 0, 0, 0).rotation.x = -Math.PI / 2;
  const wallTex = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#3f4a3b'; c.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 32) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(x, 0, 3, h); } }).tex;
  wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(3, 1);
  const wallM = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85 });
  add(int, new THREE.Mesh(new THREE.PlaneGeometry(9, 3.2), wallM), 0, 1.6, -3);
  add(int, new THREE.Mesh(new THREE.PlaneGeometry(8, 3.2), wallM), -4.5, 1.6, 0).rotation.y = Math.PI / 2;
  add(int, new THREE.Mesh(new THREE.PlaneGeometry(8, 3.2), wallM), 4.5, 1.6, 0).rotation.y = -Math.PI / 2;
  add(int, box(9, 0.9, 0.05, mat(0x5a3b28, 0.6)), 0, 0.45, -2.97); // zócalo de madera
  add(int, new THREE.Mesh(new THREE.PlaneGeometry(9, 8), mat(0x22201d, 0.9)), 0, 3.2, 0).rotation.x = Math.PI / 2;
  add(int, box(1.6, 0.06, 0.2, new THREE.MeshBasicMaterial({ color: 0xe8f2ff })), 0, 3.15, -0.8);
  // mostrador
  add(int, box(4.2, 1.0, 0.7, mat(0x6b4a33, 0.6)), 0, 0.5, -1.0);
  add(int, box(4.4, 0.06, 0.82, mat(0xbfb7a3, 0.35)), 0, 1.03, -1.0);
  // ventana con lluvia
  refs.winTex = canvasTex(256, 384, () => {});
  add(int, plateMesh(1.8, 1.4, refs.winTex.tex, true), 4.47, 1.8, -0.5).rotation.y = -Math.PI / 2;
  // tablero de llaves
  add(int, box(0.95, 1.6, 0.05, mat(0x7a5536, 0.6)), 1.6, 1.8, -2.95);
  const lab = canvasTex(256, 64, (c, w, h) => { c.fillStyle = '#e9e1cc'; c.fillRect(0, 0, w, h); c.fillStyle = '#222'; c.font = '800 40px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('LLAVES', w / 2, h / 2 + 2); }).tex;
  add(int, plateMesh(0.5, 0.12, lab), 1.6, 2.7, -2.92);
  const fobColors = ['#b8322b', '#2c6e8f', '#3d8a4f', '#c08a26', '#7a3f8f', '#2c6e8f'];
  const rows = [[1, 2, 3, 4, 5, 6], [10, 11, 12, 14, 15]];
  rows.forEach((row, ri) => row.forEach((n, i) => {
    const x = 1.38 + ri * 0.44, y = 2.45 - i * 0.255;
    add(int, new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.06, 6), mat(0xc9a64a, 0.3, { metalness: 0.8 })), x, y, -2.9).rotation.x = Math.PI / 2;
    add(int, new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 6, 16), mat(0xc0c0c0, 0.3, { metalness: 0.9 })), x, y - 0.04, -2.88);
    const fob = add(int, plateMesh(0.11, 0.2, numberTex(n, { bg: fobColors[(n + ri) % fobColors.length], fg: '#fff', w: 110, h: 200, font: '800 70px Inter' })), x, y - 0.17, -2.89);
    fob.rotation.z = (hash(n) - 0.5) * 0.12;
    add(int, plateMesh(0.12, 0.07, numberTex(n, { w: 128, h: 80, font: '800 56px Inter' })), x - 0.14, y - 0.02, -2.92);
  }));
  // reloj digital
  add(int, box(1.0, 0.4, 0.08, mat(0x111111, 0.4)), -1.3, 2.35, -2.96);
  refs.clockTex = canvasTex(640, 256, () => {});
  add(int, plateMesh(0.92, 0.34, refs.clockTex.tex, true), -1.3, 2.35, -2.91);
  // teléfono
  const phone = new THREE.Group(); phone.position.set(-0.6, 1.06, -1.0); int.add(phone);
  const beige = mat(0xd9cfb6, 0.45);
  const base = add(phone, box(0.34, 0.09, 0.25, beige), 0, 0.045, 0); base.rotation.x = 0.08;
  const keys = canvasTex(128, 128, (c, w, h) => { c.fillStyle = '#cfc4aa'; c.fillRect(0, 0, w, h); c.fillStyle = '#3b382f'; for (let i = 0; i < 12; i++) { c.beginPath(); c.roundRect(14 + (i % 3) * 36, 10 + Math.floor(i / 3) * 29, 28, 22, 5); c.fill(); } }).tex;
  add(phone, plateMesh(0.11, 0.1, keys), 0.08, 0.098, 0.04).rotation.x = -Math.PI / 2 + 0.08;
  refs.lcd = canvasTex(320, 128, () => {});
  add(phone, plateMesh(0.13, 0.05, refs.lcd.tex, true), -0.08, 0.1, 0.06).rotation.x = -Math.PI / 2 + 0.08;
  const led = add(phone, new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 6), new THREE.MeshBasicMaterial({ color: 0x400000 })), 0.14, 0.1, 0.1);
  const handset = new THREE.Group(); int.add(handset);
  const hsM = mat(0xd9cfb6, 0.45);
  const hb = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.26, 4, 10), hsM); hb.rotation.z = Math.PI / 2; handset.add(hb);
  for (const sx of [-0.15, 0.15]) add(handset, new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.05, 14), hsM), sx, -0.03, 0);
  // nota adhesiva
  refs.noteTex = canvasTex(320, 320, (c, w, h) => {
    c.fillStyle = '#f3df6b'; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(0, 0, w, 26);
    c.fillStyle = '#1d2244'; c.font = '700 54px Caveat'; c.textAlign = 'center';
    c.fillText('Si llaman', w / 2, 95); c.fillText('de la 13...', w / 2, 150);
    c.fillStyle = '#9b1515'; c.font = '700 64px Caveat'; c.fillText('NO', w / 2, 220); c.fillText('CONTESTES', w / 2, 280);
    c.strokeStyle = '#9b1515'; c.lineWidth = 5; c.beginPath(); c.moveTo(40, 292); c.quadraticCurveTo(160, 302, 285, 288); c.stroke();
  });
  const note = add(phone, plateMesh(0.13, 0.13, refs.noteTex.tex), 0.24, 0.005, 0.03); note.rotation.set(-Math.PI / 2, 0, -0.18);
  refs.phone = { group: phone, base, led, handset };
  // libro de registro
  refs.bookTex = canvasTex(1024, 640, (c, w, h) => drawBook(c, w, h, 0));
  add(int, box(0.66, 0.03, 0.44, mat(0x5a1714, 0.6)), 0.55, 1.07, -0.95);
  const book = add(int, plateMesh(0.64, 0.4, refs.bookTex.tex), 0.55, 1.09, -0.95); book.rotation.x = -Math.PI / 2;
  // lámpara de escritorio
  add(int, new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.03, 16), mat(0x1d3b2c, 0.4)), 1.65, 1.08, -1.2);
  add(int, new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8), mat(0x1d3b2c, 0.4)), 1.65, 1.29, -1.2);
  const shade = add(int, new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.18, 20, 1, true), mat(0x1d5a3b, 0.4, { side: THREE.DoubleSide })), 1.6, 1.5, -1.15);
  add(int, new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe2b0 })), 1.6, 1.44, -1.15);
  const lampL = new THREE.PointLight(0xffb469, 5, 6, 2); lampL.position.set(1.5, 1.38, -1.0); int.add(lampL); refs.lampL = lampL;
  const ceil = new THREE.PointLight(0xcfe0ff, 8, 10, 2); ceil.position.set(0, 2.9, -0.4); int.add(ceil); refs.ceil = ceil;
  const fill = new THREE.PointLight(0x6d8cc9, 2, 8, 2); fill.position.set(2.5, 1.8, 2.5); int.add(fill);
  // timbre de mostrador y monitor
  add(int, new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xc9c9c9, 0.2, { metalness: 0.9 })), -1.5, 1.06, -0.8);
  add(int, box(0.42, 0.36, 0.38, mat(0x2a2a2c, 0.5)), -1.45, 1.24, -1.25);
  add(int, plateMesh(0.32, 0.25, canvasTex(64, 48, (c, w, h) => { c.fillStyle = '#1f3d22'; c.fillRect(0, 0, w, h); }).tex, true), -1.45, 1.26, -1.055);
  // puerta de entrada
  add(int, box(0.06, 2.2, 1.0, mat(0x2b2d33, 0.4)), -4.45, 1.1, 1.6);
  // personajes
  refs.you = makeDummy({ vest: 0x2f4f46 });
  refs.you.group.position.set(0, 0, -1.9); int.add(refs.you.group);
  refs.owner = makeDummy({ skin: 0xb9c1c9, top: 0x6b4a3a, pants: 0x3e3326, cap: 0x8e231d, mustache: true });
  refs.owner.group.position.set(-0.6, 0, 0.05); refs.owner.group.rotation.y = Math.PI; int.add(refs.owner.group);
  refs.keyring = new THREE.Group(); int.add(refs.keyring);
  add(refs.keyring, new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.006, 6, 16), mat(0xc0c0c0, 0.3, { metalness: 0.9 })));
  add(refs.keyring, box(0.04, 0.09, 0.008, mat(0xc9a64a, 0.3, { metalness: 0.8 })), 0.02, -0.06, 0);
  add(refs.keyring, box(0.04, 0.09, 0.008, mat(0xb0b0b0, 0.3, { metalness: 0.8 })), -0.02, -0.06, 0.01);
})();

// ---------- estado de la historia ----------
let TL = null, SEGS = [], CHUNKS = [], T = {};
const L = (name, k = 0) => TL.lines.filter(l => l.escena === name)[k];

function buildSegments() {
  SEGS = [];
  for (const l of TL.lines) {
    const last = SEGS[SEGS.length - 1];
    if (last && last.name === l.escena) continue;
    SEGS.push({ name: l.escena, start: SEGS.length ? l.start : 0, k: SEGS.filter(s => s.name === l.escena).length });
  }
  SEGS.forEach((s, i) => s.end = i + 1 < SEGS.length ? SEGS[i + 1].start : TL.duration);
  // subtítulos
  const byChunk = new Map();
  for (const l of TL.lines) for (const c of l.caps) {
    if (!byChunk.has(c.chunk)) byChunk.set(c.chunk, { words: [], tel: l.voz === 'telefono', lineEnd: l.end });
    byChunk.get(c.chunk).words.push(c);
  }
  CHUNKS = [...byChunk.values()];
  CHUNKS.forEach((ch) => { ch.s = ch.words[0].s; ch.e = ch.words[ch.words.length - 1].e; });
  CHUNKS.forEach((ch, i) => {
    const next = CHUNKS[i + 1];
    ch.hide = next ? Math.min(next.s, ch.e + 0.6) : ch.e + 1.0;
  });
  const rings = TL.lines.filter(l => l.sfx === 'ring');
  T.ring1 = [rings[0].start + 0.6, L('telefono_mudo').start + 0.35];
  T.ring2 = [rings[1].start + 0.5, L('contesta').start + 0.9];
  T.pick = L('contesta').start + 1.0;
  T.r306 = L('reloj_306').start; T.r307 = L('reloj_307').start;
  T.lluvia = L('exterior_lluvia').start; T.libro = L('libro').start;
  T.stinger = TL.lines.find(l => l.sfx === 'stinger').end - 0.15;
}
function ringOn(t) {
  for (const [a, b] of [T.ring1, T.ring2]) {
    if (t >= a && t < b) { const k = (t - a) % 3.0; return k < 0.4 || (k >= 0.6 && k < 1.0); }
  }
  return false;
}
const ringing = (t) => (t >= T.ring1[0] && t < T.ring1[1]) || (t >= T.ring2[0] && t < T.ring2[1]);
function clockText(t) {
  if (t < T.lluvia) return '10:02';
  if (t < T.libro) return '3:01';
  if (t < T.r306) return '3:05';
  if (t < T.r307 + 0.15) return '3:06';
  return '3:07';
}

// ---------- tomas ----------
// Cada toma: (p, lt, dur, t) => { pos, look, fov, mode }
const shot = (a, b, la, lb, fov = 40, mode = 'int') => (p) => ({ pos: lerpV(a, b, ease(p)), look: lerpV(la, lb, ease(p)), fov, mode });
const youHead = () => I(0, 1.9, -1.9);
const SHOTS = {
  exterior: shot(v3(-2.2, 1.5, 30), v3(-2.4, 2.3, 23), v3(-3.4, 4.7, 2), v3(-3.0, 4.4, 2), 50, 'ext'),
  recepcion_dueno: shot(I(2.5, 1.95, 3.3), I(2.1, 1.88, 2.8), I(-0.3, 1.45, -0.9), I(-0.3, 1.5, -0.95), 48),
  nota: shot(I(-0.3, 1.66, -0.5), I(-0.32, 1.5, -0.66), I(-0.35, 1.06, -0.86), I(-0.35, 1.06, -0.88), 34),
  recepcion_sonrie: shot(I(0.55, 2.0, 0.2), I(0.45, 1.97, -0.1), I(0, 1.85, -1.9), I(0, 1.88, -1.9), 34),
  llaves: shot(I(1.68, 2.4, -1.55), I(1.7, 1.75, -1.55), I(1.66, 2.3, -2.95), I(1.7, 1.55, -2.95), 36),
  pasillo_puertas: shot(v3(-7, 4.65, 2.05), v3(-1.2, 4.65, 2.05), v3(-2.2, 4.3, -0.3), v3(3.6, 4.3, -0.3), 52, 'ext'),
  exterior_lluvia: shot(v3(9, 7.5, 22), v3(8, 6.8, 19), v3(-2, 1.2, 3), v3(-2, 1.4, 3), 52, 'ext'),
  telefono: shot(I(-0.15, 1.42, -0.42), I(-0.25, 1.36, -0.55), I(-0.6, 1.1, -1.0), I(-0.6, 1.1, -1.0), 36),
  telefono_pantalla: shot(I(-0.68, 1.52, -0.7), I(-0.68, 1.45, -0.76), I(-0.68, 1.16, -0.94), I(-0.68, 1.16, -0.94), 38),
  cara_miedo: shot(I(-0.6, 1.98, 0.4), I(-0.5, 1.95, 0.1), I(0, 1.82, -1.9), I(0, 1.82, -1.9), 42),
  telefono_cuenta: shot(I(-1.1, 1.3, 0.1), I(-1.0, 1.32, -0.05), I(-0.4, 1.45, -1.6), I(-0.4, 1.5, -1.6), 40),
  telefono_mudo: shot(I(-0.2, 1.45, -0.4), I(-0.32, 1.32, -0.62), I(-0.6, 1.1, -1.0), I(-0.6, 1.1, -1.0), 36),
  libro: shot(I(0.55, 1.82, -0.55), I(0.62, 1.62, -0.72), I(0.5, 1.08, -0.98), I(0.66, 1.08, -1.0), 34),
  libro_linea: shot(I(0.68, 1.74, -0.66), I(0.68, 1.62, -0.72), I(0.68, 1.09, -0.86), I(0.68, 1.09, -0.86), 44),
  reloj_306: shot(I(-1.3, 2.25, -0.2), I(-1.3, 2.3, -0.6), I(-1.3, 2.35, -2.95), I(-1.3, 2.35, -2.95), 38),
  reloj_307: shot(I(-1.3, 2.33, -0.5), I(-1.3, 2.34, -0.65), I(-1.3, 2.35, -2.95), I(-1.3, 2.35, -2.95), 40),
  camara: (p) => ({ pos: v3(-9.4, 5.75, 1.95), look: v3(4, 3.9, -0.6), fov: 64, mode: 'cctv', zoom: 1 }),
  camara_zoom: (p) => ({ pos: v3(-9.4, 5.75, 1.95), look: lerpV(v3(4, 3.9, -0.6), v3(1.0, 4.2, 0), ease(p * 1.8)), fov: lerp(64, 20, ease(p * 1.8)), mode: 'cctv', zoom: lerp(1, 3.2, ease(p * 1.8)) }),
  camara_puerta: (p) => ({ pos: v3(1.3, 6.4, 9.5), look: v3(1.3, 4.15, 0), fov: 30, mode: 'cctv', zoom: 1.6, cam: 'CAM 03 · PATIO' }),
  contesta: shot(I(1.0, 1.75, 0.55), I(0.8, 1.72, 0.25), I(-0.25, 1.55, -1.7), I(-0.2, 1.65, -1.8), 40),
  llamada: (p, lt, dur, t) => {
    const k = clamp((t - T.stinger) / 0.25);
    return { pos: lerpV(I(0.55, 1.98, 0.5), I(0.4, 1.95, 0.15), ease(p)), look: I(0, 1.84, -1.9), fov: lerp(42, 26, ease(k)), mode: 'int' };
  },
  llamada_voz: () => ({ pos: I(0.4, 1.95, 0.15), look: I(0, 1.84, -1.9), fov: 26, mode: 'black' }),
  decision: shot(v3(14.5, 1.3, 4.2), v3(14.0, 1.5, 3.6), v3(4, 4.4, 0.5), v3(3.5, 4.4, 0.5), 44, 'decision'),
};
SHOTS.decision_1 = SHOTS.decision_2 = SHOTS.decision_final = (p, lt, dur, t) => SHOTS.decision(clamp((t - L('decision').start) / 8));

// ---------- overlays ----------
const grainC = $('grain'), grainX = grainC.getContext('2d');
const gImg = grainX.createImageData(270, 480);
function drawGrain(frame) {
  const d = gImg.data; let s = frame * 9301 + 49297;
  for (let i = 0; i < d.length; i += 4) { s = (s * 1103515245 + 12345) & 0x7fffffff; const v = s >> 23; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
  grainX.putImageData(gImg, 0, 0);
}
let lastCapKey = '';
function updateCaptions(t) {
  const el = $('caps');
  const ch = CHUNKS.find(c => t >= c.s - 0.02 && t < c.hide);
  if (!ch) { if (lastCapKey) { el.innerHTML = ''; lastCapKey = ''; } return; }
  const shown = ch.words.filter(w => w.s <= t + 0.02);
  const key = ch.s + ':' + shown.length;
  if (key !== lastCapKey) {
    el.className = ch.tel ? 'tel' : '';
    el.innerHTML = shown.map((w, i) => `<span class="w${i === shown.length - 1 ? ' cur' : ''}">${ch.tel && i === 0 ? '«' : ''}${w.text}${ch.tel && i === ch.words.length - 1 ? '»' : ''}</span>`).join(' ');
    lastCapKey = key;
  }
  const k = clamp((t - ch.s) / 0.09);
  el.style.transform = `scale(${0.9 + 0.1 * ease(k)})`;
}
const waveBars = [];
for (let i = 0; i < 31; i++) { const b = document.createElement('i'); $('call-wave').appendChild(b); waveBars.push(b); }
function fmt2(n) { return String(Math.floor(n)).padStart(2, '0'); }

// ---------- render de un instante ----------
let neonState = null, vacState = null, clockState = '', lcdState = '', bookState = -1;
function renderAt(t) {
  const frame = Math.round(t * 30);
  const seg = SEGS.find(s => t >= s.start && t < s.end) || SEGS[SEGS.length - 1];
  const dur = seg.end - seg.start, lt = t - seg.start, p = clamp(lt / dur);
  const tt = seg.name.startsWith('camara') ? Math.floor(t * 12) / 12 : t; // la cámara de seguridad va a saltos
  const sh = SHOTS[seg.name](p, lt, dur, tt);

  // --- estado de objetos ---
  const you = refs.you, owner = refs.owner;
  const blink = (k) => { const ph = (t + k) % 3.7; return ph < 0.12 ? Math.sin(ph / 0.12 * Math.PI) : 0; };
  // dueño: entrega las llaves y se va
  const dueno = L('recepcion_dueno');
  owner.group.visible = t < dueno.end + 0.3 + 0.2;
  const give = clamp((t - dueno.start) / 2.2);
  const leave = clamp((t - dueno.start - 2.6) / 1.2);
  owner.hands.R = lerpV(v3(-0.36, 0.86, 0.06), v3(-0.15, 1.22, 0.62), Math.sin(Math.PI * clamp(give * 1.15)) * 0.999 + (give >= 0.87 ? 0 : 0));
  owner.hands.L = v3(0.36, 0.86, 0.06);
  owner.group.rotation.y = Math.PI + leave * 2.0;
  owner.group.position.set(-0.6 - leave * 0.6, 0, 0.05 + leave * 0.3);
  owner.expression('worried', blink(1.1)); owner.pose();
  // llavero: en la mano del dueño y luego sobre el mostrador
  if (give < 0.5) { owner.group.updateMatrixWorld(); refs.keyring.position.copy(owner.group.localToWorld(owner.hands.R.clone().add(v3(0, -0.05, 0.05)))).sub(int.position); }
  else refs.keyring.position.set(0.05, 1.09, -0.75);
  refs.keyring.rotation.set(give < 0.5 ? 0 : -Math.PI / 2, 0, 0);

  // vos
  let expr = 'neutral';
  if (t >= L('recepcion_sonrie').start && t < L('llaves').start) expr = 'smirk';
  if (t >= L('telefono').start) expr = 'worried';
  if (t >= L('cara_miedo').start) expr = 'scared';
  if (t >= L('libro').start && t < L('reloj_306').start) expr = 'worried';
  if (t >= L('reloj_306').start) expr = 'scared';
  if (t >= T.stinger) expr = 'terror';
  you.expression(expr, expr === 'terror' ? 0 : blink(0.3));
  const rest = { L: v3(0.3, 1.08, 0.58), R: v3(-0.3, 1.08, 0.58) };
  you.hands.L = rest.L.clone(); you.hands.R = rest.R.clone();
  you.head.rotation.set(0, 0, 0);
  if (t >= L('telefono').start && t < L('libro').start) you.head.rotation.set(0.25, -0.35, 0);
  if (t >= L('libro').start && t < L('reloj_306').start) { you.head.rotation.set(0.45, 0.15, 0); you.hands.L = v3(0.45, 1.1, 0.75); }
  if (t >= L('reloj_306').start && t < L('contesta').start) you.head.rotation.set(-0.15, 0.2, 0);
  const cont = L('contesta');
  const phoneLocal = v3(-0.6, 1.16, 0.88), ear = v3(-0.37, 1.86, 0.1);
  if (t >= cont.start) {
    const reach = clamp((t - cont.start) / 0.9), lift = clamp((t - T.pick) / 0.6);
    you.hands.R = t < T.pick ? lerpV(rest.R, phoneLocal, ease(reach)) : lerpV(phoneLocal, ear, ease(lift));
    you.head.rotation.set(0.05, -0.15 * lift, 0.12 * lift);
  }
  you.pose();
  // auricular
  const hs = refs.phone.handset;
  if (t < T.pick) { hs.position.set(-0.6, 1.2, -0.97); hs.rotation.set(0, 0, 0); hs.position.y += ringOn(t) ? 0.004 * Math.sin(t * 90) : 0; }
  else {
    you.group.updateMatrixWorld();
    const hw = you.group.localToWorld(you.hands.R.clone()).sub(int.position);
    hs.position.copy(hw).add(v3(0, 0.02, 0.06));
    const lift = clamp((t - T.pick) / 0.6);
    hs.rotation.set(0, Math.PI / 2 * lift, (Math.PI / 2 - 0.3) * lift);
  }
  // teléfono: vibración, LED y pantalla
  const on = ringOn(t);
  refs.phone.group.position.set(-0.6 + (on ? 0.003 * Math.sin(t * 140) : 0), 1.06, -1.0);
  refs.phone.led.material.color.setHex(on ? 0xff2a1a : (t > T.ring1[1] && t < T.r306 ? (Math.floor(t * 2) % 2 ? 0xff2a1a : 0x400000) : 0x400000));
  let lcd = ['RECEPCIÓN', '--:--'];
  if (ringing(t)) lcd = ['LLAMADA', Math.floor(t * 2.5) % 2 ? 'HAB.13' : 'HAB 13'];
  else if (t >= T.ring1[1] && t < T.ring2[0]) lcd = ['PERDIDA x10', 'HAB.13'];
  else if (t >= T.pick) lcd = ['EN LINEA', 'HAB.13'];
  const lcdKey = lcd.join('|') + ringing(t);
  if (lcdKey !== lcdState) { refs.lcd.redraw((c, w, h) => drawLCD(c, w, h, lcd[0], lcd[1], ringing(t) || t >= T.pick)); lcdState = lcdKey; }
  // reloj
  const ct = clockText(t), colon = Math.floor(t * 2) % 2 === 0;
  if (ct + colon !== clockState) { refs.clockTex.redraw((c, w, h) => drawClock(c, w, h, ct, colon)); clockState = ct + colon; }
  // libro (resaltado)
  const ll = L('libro_linea');
  const bk = t < ll.start ? 0 : Math.round(clamp((t - ll.start - 0.2) / 1.0) * 40) / 40;
  if (bk !== bookState) { refs.bookTex.redraw((c, w, h) => drawBook(c, w, h, bk)); bookState = bk; }
  // luces interiores
  const dark = t >= T.pick ? 0.35 : 1;
  refs.lampL.intensity = 5 * dark * (seg.name === 'telefono_mudo' && hash(frame) > 0.85 ? 0.4 : 1);
  refs.ceil.intensity = (seg.name.startsWith('llamada') ? 0.8 : 8) * (seg.name === 'telefono_mudo' && hash(frame * 3) > 0.8 ? 0.2 : 1);
  // ventana con lluvia
  refs.winTex.redraw((c, w, h) => {
    c.fillStyle = '#0d1424'; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(160,190,230,.35)'; c.lineWidth = 2;
    for (let i = 0; i < 60; i++) { const x = hash(i) * w, y = ((hash(i + 50) * h + t * 500 * (0.7 + hash(i + 9))) % (h + 60)) - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 4, y + 40); c.stroke(); }
    c.fillStyle = '#2a2e36'; c.fillRect(w / 2 - 4, 0, 8, h); c.fillRect(0, h / 2 - 4, w, 8);
  });
  // neón (parpadeo)
  const n1 = !(hash(Math.floor(t * 8)) > 0.93), n2 = Math.sin(t * 1.7) > -0.2 && hash(Math.floor(t * 12) + 7) > 0.25;
  if (n1 !== neonState) { refs.neonTex.redraw((c, w, h) => { c.fillStyle = '#0d0f12'; c.fillRect(0, 0, w, h); drawNeon(c, w, h, 'EL DESCANSO', '#ffb347', n1, 70, 90); drawNeon(c, w, h, 'MOTEL', '#ff3b2f', n1, 230, 290); }); neonState = n1; }
  if (n2 !== vacState) { refs.vacTex.redraw((c, w, h) => { c.fillStyle = '#0d0f12'; c.fillRect(0, 0, w, h); drawNeon(c, w, h, 'VACANTES', '#3dff8a', n2, 110, h / 2 + 4); }); vacState = n2; }
  refs.neonLight.intensity = n1 ? 18 : 2;
  // relámpago en la toma de la lluvia
  const ll2 = L('exterior_lluvia');
  const fl = t - (ll2.start + 2.1);
  const lightning = (fl > 0 && fl < 0.08) || (fl > 0.16 && fl < 0.3) ? 1 : 0;
  refs.moon.intensity = 1.6 + lightning * 14;
  // puerta 13: sólo existe en la cámara (y después)
  const exists13 = seg.name.startsWith('camara') || seg.name.startsWith('decision');
  refs.r13.visible = exists13; refs.blank.visible = !exists13;
  const cp = L('camara_puerta');
  const open = seg.name.startsWith('decision') ? 1 : clamp((tt - cp.start - 1.1) / 2.4);
  refs.hinge13.rotation.y = ease(open) * 1.65;
  refs.l13.intensity = exists13 ? 4 + open * 20 : 0;
  refs.doble.group.visible = exists13 && open > 0.05;

  // --- cámara ---
  const shakeAmt = (sh.mode === 'int' && ringing(t) ? 0.004 : 0.0015) + (t >= T.stinger && t < T.stinger + 0.4 ? 0.02 * (1 - (t - T.stinger) / 0.4) : 0);
  camera.position.copy(sh.pos).add(v3(Math.sin(t * 1.3) * shakeAmt, Math.sin(t * 1.7 + 1) * shakeAmt, 0));
  camera.fov = sh.fov; camera.updateProjectionMatrix();
  camera.lookAt(sh.look.clone().add(v3(Math.sin(t * 0.9) * shakeAmt * 2, Math.cos(t * 1.1) * shakeAmt * 2, 0)));
  ext.visible = sh.mode !== 'int' && sh.mode !== 'black';
  int.visible = sh.mode === 'int';
  rain.visible = ext.visible;
  if (rain.visible) updateRain(t, camera.position.clone().add(camera.getWorldDirection(v3(0, 0, 0)).multiplyScalar(8)));
  renderer.toneMappingExposure = sh.mode === 'cctv' ? 2.4 : sh.mode === 'int' ? 1.25 : 1.5;
  scene.fog.density = sh.mode === 'int' ? 0.0 : (sh.mode === 'cctv' ? 0.012 : 0.028);
  scene.background.setHex(sh.mode === 'black' ? 0x000000 : 0x05070d);

  // filtros CSS por modo
  const gl = $('gl');
  gl.style.filter = sh.mode === 'cctv' ? 'grayscale(1) sepia(1) hue-rotate(55deg) saturate(2.6) contrast(1.25) brightness(1.05)'
    : sh.mode === 'decision' ? 'blur(7px) brightness(.45) saturate(.8)' : 'none';
  gl.style.transform = sh.mode === 'cctv' ? `scale(${1 + (hash(frame) > 0.97 ? 0.01 : 0)})` : 'none';
  $('cctv').style.display = sh.mode === 'cctv' ? 'block' : 'none';
  $('call').style.display = sh.mode === 'black' ? 'block' : 'none';
  $('decision').style.display = sh.mode === 'decision' ? 'block' : 'none';
  $('grain').style.opacity = sh.mode === 'cctv' ? 0.32 : 0.07;
  drawGrain(sh.mode === 'cctv' ? Math.floor(t * 12) : frame);

  if (sh.mode === 'cctv') {
    const base = seg.name === 'camara_puerta' ? 3 * 3600 + 7 * 60 + 2 + (tt - T.r307) : 3 * 3600 + 6 * 60 + 38 + (tt - L('camara').start);
    $('cctv-time').textContent = `14/11 ${fmt2(base / 3600)}:${fmt2(base / 60 % 60)}:${fmt2(base % 60)}`;
    $('cctv-zoom').textContent = (sh.zoom ?? 1) > 1.05 ? `ZOOM ${sh.zoom.toFixed(1)}x` : '';
    $('cctv-cam').textContent = sh.cam ?? 'CAM 02 · PISO 2';
  }
  if (sh.mode === 'black') {
    const el = t - T.pick;
    $('call-timer').textContent = `EN LLAMADA · 00:${fmt2(el + 3)}`;
    const voiceLine = TL.lines.find(l => l.voz === 'telefono');
    const speaking = t >= voiceLine.start && t <= voiceLine.end;
    waveBars.forEach((b, i) => {
      const a = speaking ? 0.25 + 0.75 * Math.abs(Math.sin(t * 11 + i * 0.7) * Math.sin(t * 5.3 + i * 0.31)) : 0.08 + 0.05 * Math.sin(t * 2 + i);
      const env = 1 - Math.abs(i - 15) / 17;
      b.style.height = `${Math.max(12, 190 * a * env)}px`;
    });
  }
  if (sh.mode === 'decision') {
    const d0 = L('decision').start, d1 = L('decision_1').start, d2 = L('decision_2').start, df = L('decision_final').start;
    const o1 = $('o1'), o2 = $('o2');
    const appear = (el, at) => { const k = ease((t - at) / 0.35); el.style.opacity = k; return k; };
    const k1 = appear(o1, d0 + 0.3), k2 = appear(o2, d0 + 0.55);
    const hi1 = t >= d1 && t < d2 ? 1 : 0, hi2 = t >= d2 && t < df ? 1 : 0;
    o1.style.transform = `translateY(${(1 - k1) * 40}px) scale(${1 + 0.06 * hi1})`;
    o2.style.transform = `translateY(${(1 - k2) * 40}px) scale(${1 + 0.06 * hi2})`;
    o1.style.filter = hi2 ? 'brightness(.55)' : 'none';
    o2.style.filter = hi1 ? 'brightness(.55)' : 'none';
    const kq = ease((t - df) / 0.3);
    $('dq').style.opacity = kq; $('dq').style.transform = `scale(${0.85 + 0.15 * kq})`;
    $('cta').style.opacity = ease((t - df - 0.6) / 0.4) * (0.75 + 0.25 * Math.sin(t * 6));
  }
  // flash del golpe y fundido inicial
  $('flash').style.opacity = t >= T.stinger && t < T.stinger + 0.25 ? 0.5 * (1 - (t - T.stinger) / 0.25) : (lightning && sh.mode === 'ext' ? 0.25 : 0);
  $('black').style.opacity = t < 0.35 ? 1 - t / 0.35 : 0;
  updateCaptions(t);
  renderer.render(scene, camera);
}

window.setup = async (timeline) => {
  TL = timeline;
  await document.fonts.load('700 50px Caveat');
  await document.fonts.load('900 80px "Inter Display"');
  await document.fonts.load('700 30px "JetBrains Mono"');
  refs.noteTex.redraw();
  refs.bookTex.redraw((c, w, h) => drawBook(c, w, h, 0));
  buildSegments();
  // precalienta los shaders de cada modo
  for (const s of SEGS) renderAt(s.start + 0.01);
  return true;
};
window.renderAt = renderAt;
window.__refs = refs;
window.__three = { camera, renderer, scene, ext, int };
