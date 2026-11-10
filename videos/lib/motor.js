// Motor compartido para los videos: utilidades 3D, personaje, subtítulos y línea de tiempo.
import * as THREE from 'three';

export const W = 1080, H = 1920;
export const $ = (id) => document.getElementById(id);
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const ease = (k) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(k));
export const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
export const lerpV = (a, b, k) => a.clone().lerp(b, k);
export function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
export function mat(color, rough = 0.7, extra = {}) { return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra }); }
export function basic(color, extra = {}) { return new THREE.MeshBasicMaterial({ color, ...extra }); }
export function box(w, h, d, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); }
export function add(parent, mesh, x = 0, y = 0, z = 0) { mesh.position.set(x, y, z); parent.add(mesh); return mesh; }

export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const redraw = (fn = draw) => { ctx.clearRect(0, 0, w, h); fn(ctx, w, h); tex.needsUpdate = true; };
  redraw();
  return { tex, redraw, ctx };
}
export function plateMesh(w, h, tex, isBasic = false, extra = {}) {
  const m = isBasic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true, ...extra })
                    : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, transparent: true, ...extra });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
}
export function drawNeon(c, w, h, text, color, on, size, y, font = '"Inter Display", Inter', weight = 900) {
  c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  if (on) {
    c.shadowColor = color; c.shadowBlur = size * 0.35; c.fillStyle = color;
    for (let i = 0; i < 3; i++) c.fillText(text, w / 2, y);
    c.shadowBlur = 0; c.fillStyle = '#ffffff'; c.globalAlpha = 0.8; c.fillText(text, w / 2, y); c.globalAlpha = 1;
  } else {
    c.fillStyle = 'rgba(60,60,66,.9)'; c.fillText(text, w / 2, y);
  }
}

// ---------- escenario ----------
export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070d);
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.03, 300);
  return { renderer, scene, camera };
}
export const shot = (a, b, la, lb, fov = 40, mode = 'int', extra = {}) => (p) => ({ pos: lerpV(a, b, ease(p)), look: lerpV(la, lb, ease(p)), fov, mode, ...extra });
export function aimCamera(camera, sh, t, shakeAmt = 0.0015) {
  camera.position.copy(sh.pos).add(v3(Math.sin(t * 1.3) * shakeAmt, Math.sin(t * 1.7 + 1) * shakeAmt, 0));
  camera.fov = sh.fov; camera.updateProjectionMatrix();
  camera.lookAt(sh.look.clone().add(v3(Math.sin(t * 0.9) * shakeAmt * 2, Math.cos(t * 1.1) * shakeAmt * 2, 0)));
}

// ---------- personaje (muñeco de cabeza grande) ----------
const UP = v3(0, 1, 0), FWD = v3(0, 0, 1);
function faceOut(o) { o.quaternion.setFromUnitVectors(FWD, o.position.clone().normalize()); }
export function orient(mesh, a, b) {
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
}
export function makeDummy({ skin = 0xeceae4, top = 0xeceae4, vest = null, pants = 0x2e333b, shoes = 0x18191c, cap = null, mustache = false, hood = null } = {}) {
  const g = new THREE.Group();
  const skinM = mat(skin, 0.42);
  const black = basic(0x0b0b0d), white = basic(0xffffff);
  // piernas con cadera articulada
  const legs = [];
  for (const sx of [-0.13, 0.13]) {
    const hip = new THREE.Group(); hip.position.set(sx, 0.86, 0); g.add(hip);
    add(hip, new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.62, 4, 12), mat(pants, 0.8)), 0, -0.41, 0);
    add(hip, box(0.17, 0.09, 0.3, mat(shoes, 0.5)), 0, -0.81, 0.05);
    legs.push(hip);
  }
  const torso = add(g, new THREE.Mesh(new THREE.CapsuleGeometry(0.27, 0.4, 6, 16), mat(vest ?? top, 0.75)), 0, 1.16, 0);
  torso.scale.set(1, 1, 0.72);
  if (vest) {
    add(g, box(0.1, 0.42, 0.02, mat(top, 0.6)), 0, 1.2, 0.2);
    add(g, box(0.1, 0.05, 0.02, mat(0xd8b24a, 0.3, { metalness: 0.6 })), 0.13, 1.3, 0.2);
  }
  if (hood) { const hm = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 10, 20), mat(hood, 0.85)); hm.rotation.x = Math.PI / 2 - 0.25; hm.position.set(0, 1.5, -0.08); g.add(hm); }
  add(g, new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.16, 12), skinM), 0, 1.52, 0);
  const armM = mat(top, 0.7);
  const seg = () => new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.24, 4, 10), armM);
  const arms = {};
  for (const side of ['L', 'R']) {
    const up = seg(), lo = seg(), hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 10), skinM);
    g.add(up, lo, hand);
    arms[side] = { up, lo, hand, sx: side === 'L' ? 1 : -1 };
  }
  const head = new THREE.Group(); head.position.set(0, 1.9, 0); g.add(head);
  const R = 0.4;
  add(head, new THREE.Mesh(new THREE.SphereGeometry(R, 40, 28), skinM));
  const onFace = (x, y, d = 0) => v3(x, y, Math.sqrt(Math.max(0, R * R - x * x - y * y)) + d);
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
  if (mustache) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), black); m.position.copy(onFace(0, -0.09, 0)); faceOut(m); head.add(m); }
  if (cap) {
    const cm = mat(cap, 0.8);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.4), cm); dome.position.y = 0.04; head.add(dome);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24, 1, false, -Math.PI / 2, Math.PI), cm);
    brim.position.set(0, 0.2, 0.3); brim.rotation.x = 0.12; head.add(brim);
  }
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 24), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.35, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.012; g.add(shadow);

  const api = {
    group: g, head, arms, legs, shadow,
    hands: { L: v3(0.36, 0.86, 0.06), R: v3(-0.36, 0.86, 0.06) },
    expression(kind, blink = 0) {
      for (const e of eyes) {
        const big = kind === 'scared' || kind === 'terror';
        const none = kind === 'none';
        e.oval.visible = !big && !none; e.hl.visible = !big && !none && kind !== 'blank' && kind !== 'sleep';
        e.disc.visible = e.ring.visible = e.pupil.visible = big;
        const s = kind === 'terror' ? 1.25 : 1;
        e.disc.scale.set(0.105 * s, 0.105 * s, 0.03); e.ring.scale.setScalar(s);
        e.pupil.scale.set(kind === 'terror' ? 0.018 : 0.028, kind === 'terror' ? 0.018 : 0.028, 0.02);
        e.oval.scale.set(kind === 'blank' ? 0.035 : 0.062, 0.095 * (kind === 'smirk' ? 0.62 : 1) * (kind === 'blank' ? 0.4 : 1) * (kind === 'sleep' ? 0.12 : 1), 0.03);
        e.g.scale.y = 1 - 0.9 * blink;
        e.brow.visible = !['blank', 'none'].includes(kind);
        e.brow.position.copy(e.browBase); e.brow.quaternion.copy(e.browQ);
        let lift = 0, tilt = 0;
        if (kind === 'smirk') { lift = e.sx > 0 ? 0.05 : -0.005; tilt = e.sx > 0 ? -0.15 : 0.05; }
        if (kind === 'scared') { lift = 0.05; tilt = 0.32 * e.sx; }
        if (kind === 'terror') { lift = 0.08; tilt = 0.42 * e.sx; }
        if (kind === 'worried') { lift = 0.02; tilt = 0.25 * e.sx; }
        if (kind === 'sleep') { lift = -0.02; }
        e.brow.position.y += lift; e.brow.rotateZ(tilt);
      }
      smile.visible = kind === 'smirk' || kind === 'neutral';
      smile.scale.set(kind === 'neutral' ? 0.6 : 1, kind === 'neutral' ? 0.35 : 0.8, 1);
      smile.rotation.z = Math.PI + (kind === 'smirk' ? 0.25 : 0);
      line.visible = kind === 'worried' || kind === 'sleep';
      oMouth.visible = kind === 'scared' || kind === 'terror';
      oMouth.scale.set(kind === 'terror' ? 0.06 : 0.04, kind === 'terror' ? 0.09 : 0.05, 0.02);
    },
    // fase de caminata: piernas y brazos alternados
    walk(phase, amount = 1) {
      const s = Math.sin(phase) * 0.45 * amount;
      legs[0].rotation.x = s; legs[1].rotation.x = -s;
      this.hands.L = v3(0.36, 0.88, 0.06 - s * 0.35); this.hands.R = v3(-0.36, 0.88, 0.06 + s * 0.35);
      g.position.y = Math.abs(Math.cos(phase)) * 0.03 * amount;
    },
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

// ---------- línea de tiempo ----------
export function story(TL) {
  const segs = [];
  for (const l of TL.lines) {
    const last = segs[segs.length - 1];
    if (last && last.name === l.escena) continue;
    segs.push({ name: l.escena, start: segs.length ? l.start : 0 });
  }
  segs.forEach((s, i) => s.end = i + 1 < segs.length ? segs[i + 1].start : TL.duration);
  return {
    segs,
    L: (name, k = 0) => TL.lines.filter(l => l.escena === name)[k],
    segAt: (t) => segs.find(s => t >= s.start && t < s.end) || segs[segs.length - 1],
    sfx: (name) => TL.lines.filter(l => l.sfx === name),
  };
}

// ---------- subtítulos palabra por palabra ----------
export function captions(el, TL) {
  const byChunk = new Map();
  for (const l of TL.lines) l.caps.forEach((c, i) => {
    const q = l.voz !== 'narrador';
    const w = { ...c, open: q && i === 0, close: q && i === l.caps.length - 1 };
    if (!byChunk.has(c.chunk)) byChunk.set(c.chunk, { words: [], voz: l.voz });
    byChunk.get(c.chunk).words.push(w);
  });
  const chunks = [...byChunk.values()];
  chunks.forEach(ch => { ch.s = ch.words[0].s; ch.e = ch.words[ch.words.length - 1].e; });
  chunks.forEach((ch, i) => { const n = chunks[i + 1]; ch.hide = n ? Math.min(n.s, ch.e + 0.6) : ch.e + 1.0; });
  let lastKey = '';
  return (t) => {
    const ch = chunks.find(c => t >= c.s - 0.02 && t < c.hide);
    if (!ch) { if (lastKey) { el.innerHTML = ''; lastKey = ''; } return; }
    const shown = ch.words.filter(w => w.s <= t + 0.02);
    const key = ch.s + ':' + shown.length;
    if (key !== lastKey) {
      el.className = ch.voz === 'narrador' ? '' : ch.voz;
      el.innerHTML = shown.map((w, i) => `<span class="w${i === shown.length - 1 ? ' cur' : ''}">${w.open ? '«' : ''}${w.text}${w.close ? '»' : ''}</span>`).join(' ');
      lastKey = key;
    }
    el.style.transform = `scale(${0.9 + 0.1 * ease(clamp((t - ch.s) / 0.09))})`;
  };
}

// ---------- grano de película ----------
export function grain(canvas) {
  const x = canvas.getContext('2d');
  const img = x.createImageData(canvas.width, canvas.height);
  return (frame) => {
    const d = img.data; let s = frame * 9301 + 49297;
    for (let i = 0; i < d.length; i += 4) { s = (s * 1103515245 + 12345) & 0x7fffffff; const v = s >> 23; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    x.putImageData(img, 0, 0);
  };
}

// ---------- pantalla de decisión (ids: o1, o2, dq, cta) ----------
export function decision(t, d0, d1, d2, df) {
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
