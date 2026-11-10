// Cerrado (centro comercial) — escenas 3D + overlays. Expone window.setup(timeline) y window.renderAt(t).
import * as THREE from 'three';
import {
  W, H, $, clamp, lerp, ease, v3, lerpV, hash, mat, basic, box, add, canvasTex, plateMesh, drawNeon,
  createStage, shot, aimCamera, makeDummy, story, captions, grain, decision,
} from '../lib/motor.js';

const { renderer, scene, camera } = createStage($('gl'));
scene.fog = new THREE.FogExp2(0x06080f, 0.02);
const refs = {};

// ---------- texturas ----------
const tileTex = canvasTex(512, 512, (c, w, h) => {
  c.fillStyle = '#c9c4ba'; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { c.fillStyle = (i + j) % 2 ? '#c2bdb2' : '#cfcac0'; c.fillRect(i * 128 + 2, j * 128 + 2, 124, 124); }
}).tex;
tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping; tileTex.repeat.set(5, 40);
const shutterTex = canvasTex(256, 256, (c, w, h) => {
  for (let y = 0; y < h; y += 16) { const g = c.createLinearGradient(0, y, 0, y + 16); g.addColorStop(0, '#8b9097'); g.addColorStop(0.5, '#b9bec4'); g.addColorStop(1, '#5d6268'); c.fillStyle = g; c.fillRect(0, y, w, 16); }
}).tex;
shutterTex.wrapS = shutterTex.wrapT = THREE.RepeatWrapping; shutterTex.repeat.set(2, 4);
const gridTex = canvasTex(256, 256, (c, w, h) => {
  c.clearRect(0, 0, w, h); c.strokeStyle = '#9aa0a6'; c.lineWidth = 6;
  for (let x = 0; x <= w; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
  for (let y = 0; y <= h; y += 64) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
}).tex;
gridTex.wrapS = gridTex.wrapT = THREE.RepeatWrapping; gridTex.repeat.set(3, 3);
const spillTex = canvasTex(256, 256, (c, w, h) => {
  const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
}).tex;

// ---------- centro comercial ----------
const mall = new THREE.Group(); scene.add(mall);
const STORES = [];
(function buildMall() {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 80), new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.22, metalness: 0.05 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -30); mall.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(10, 80), mat(0x15171c, 0.9)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, 7.5, -30); mall.add(ceil);
  // claraboya
  add(mall, box(3, 0.05, 76, basic(0x0b1430)), 0, 7.45, -30);
  for (let z = 6; z > -68; z -= 3) add(mall, box(3.2, 0.12, 0.12, mat(0x2a2d33, 0.5)), 0, 7.38, z);
  // fondo detrás del inicio
  add(mall, box(10, 7.5, 0.3, mat(0x1d2027, 0.8)), 0, 3.75, 9);

  const names = [
    ['AURA', '#ff6fae'], ['ÓPTICA LUZ', '#7fd6ff'], ['ZAPATERÍA NOVA', '#ffb347'], ['CAFÉ 24', '#ffd36b'], ['DEPORTES SUR', '#59e38b'],
    ['ELECTRO MAX', '#6ea8ff'], ['LIBRERÍA PAPEL', '#ffe08a'], ['JUGUETES', '#ff7a7a'], ['FARMACIA', '#5dfc9a'],
    ['PERFUMES', '#d68bff'], ['RELOJERÍA', '#ffc46b'], ['BOUTIQUE VERA', '#ff9ad5'], ['HELADOS', '#8af0ff'], ['MÚSICA', '#ff8f5a'],
    ['CELULARES', '#7fe0ff'], ['REGALOS', '#ffd36b'],
  ];
  let k = 0;
  const pilarM = mat(0x2a2d34, 0.6), fasciaM = mat(0x111318, 0.6), wallUpM = mat(0x3a3d44, 0.85);
  for (const side of [1, -1]) {
    for (let zc = -5; zc >= -53; zc -= 6) {
      const vitrina = side === -1 && zc === -41;
      const servicio = side === -1 && zc === -5;
      const g = new THREE.Group(); g.position.set(side * 5, 0, zc); g.rotation.y = -side * Math.PI / 2; mall.add(g);
      // en coordenadas locales: +z mira al pasillo, x a lo largo del pasillo
      add(g, box(0.4, 7.5, 0.6, pilarM), 3, 3.75, 0);
      add(g, box(6, 3.1, 0.2, wallUpM), 0, 5.95, -0.1);
      add(g, box(5.6, 0.9, 0.25, fasciaM), 0, 3.85, 0.05);
      if (servicio) {
        add(g, box(5.6, 3.4, 0.2, mat(0x3c4048, 0.85)), 0, 1.7, -0.1);
        refs.serviceDoor = g;
        continue;
      }
      const [name, color] = vitrina ? ['BOUTIQUE VERA', '#ff9ad5'] : names[k++ % names.length];
      const signTex = canvasTex(1024, 160, (c, w, h) => { c.fillStyle = '#0c0d10'; c.fillRect(0, 0, w, h); drawNeon(c, w, h, name, color, true, 92, h / 2 + 4); });
      const sign = add(g, plateMesh(5.2, 0.8, signTex.tex, true), 0, 3.85, 0.19);
      const spill = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), new THREE.MeshBasicMaterial({ map: spillTex, color: new THREE.Color(color), transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending }));
      spill.rotation.x = -Math.PI / 2; spill.position.set(0, 0.015, 1.6); g.add(spill);
      if (vitrina) {
        // vidriera abierta: interior, vidrio y reja translúcida
        add(g, box(5.6, 0.1, 3.5, mat(0x2a2522, 0.6)), 0, 0.05, -1.8);
        add(g, box(5.6, 3.4, 0.1, mat(0x4a3b44, 0.8)), 0, 1.7, -3.5);
        add(g, box(0.1, 3.4, 3.5, mat(0x4a3b44, 0.8)), -2.8, 1.7, -1.8);
        add(g, box(0.1, 3.4, 3.5, mat(0x4a3b44, 0.8)), 2.8, 1.7, -1.8);
        add(g, box(4.6, 0.3, 1.4, mat(0xe8e2d8, 0.5)), 0, 0.15, -1.4); // tarima
        add(g, plateMesh(5.6, 3.3, gridTex, false, { alphaTest: 0.3, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.4 }), 0, 1.65, 0.12);
        add(g, new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.3), new THREE.MeshStandardMaterial({ color: 0x9fb4c8, transparent: true, opacity: 0.12, roughness: 0.05 })), 0, 1.65, 0.05);
        refs.vitrina = g;
      } else {
        add(g, plateMesh(5.6, 3.3, shutterTex, false, { metalness: 0.55, roughness: 0.45 }), 0, 1.65, 0.0);
      }
      STORES.push({ sign, spill, side, z: zc, vitrina });
    }
  }
  // puerta de servicio con cartel (pared izquierda, z -5)
  const sd = refs.serviceDoor;
  add(sd, box(1.1, 2.2, 0.1, mat(0x6c7178, 0.5)), 1.2, 1.1, 0.05);
  add(sd, new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(0xc9c9c9, 0.3, { metalness: 0.8 })), 0.8, 1.05, 0.12);
  const solo = canvasTex(512, 128, (c, w, h) => { c.fillStyle = '#c9302c'; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.font = '900 64px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SOLO PERSONAL', w / 2, h / 2 + 3); }).tex;
  add(sd, plateMesh(0.9, 0.22, solo), 1.2, 2.45, 0.11);
  refs.noticeTex = canvasTex(600, 860, () => {});
  const notice = add(sd, plateMesh(0.62, 0.89, refs.noticeTex.tex), -0.6, 1.55, 0.11);
  notice.rotation.z = 0.03;
  refs.noticeWorld = v3(-4.89, 1.55, -5 + 0.6);

  // escalera mecánica (centro, sube hacia -z) y puente
  const esc = new THREE.Group(); esc.position.set(-2.4, 0, -26); mall.add(esc);
  const L = Math.hypot(7, 4.5), ang = Math.atan2(4.5, 7);
  refs.stepTex = canvasTex(128, 512, (c, w, h) => { for (let y = 0; y < h; y += 32) { c.fillStyle = '#4a4e55'; c.fillRect(0, y, w, 26); c.fillStyle = '#c8a640'; c.fillRect(0, y + 26, w, 6); } });
  refs.stepTex.tex.wrapS = refs.stepTex.tex.wrapT = THREE.RepeatWrapping; refs.stepTex.tex.repeat.set(1, 6);
  const band = new THREE.Mesh(new THREE.PlaneGeometry(1.2, L), new THREE.MeshStandardMaterial({ map: refs.stepTex.tex, roughness: 0.5, metalness: 0.4 }));
  band.rotation.x = -Math.PI / 2 + ang; band.position.set(0, 2.25 + 0.12, -3.5); esc.add(band);
  for (const sx of [-0.75, 0.75]) {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, L), new THREE.MeshStandardMaterial({ color: 0xa8c8dc, transparent: true, opacity: 0.25, roughness: 0.05 }));
    side.rotation.x = ang; side.position.set(sx, 2.25 + 0.55, -3.5); esc.add(side);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, L), mat(0x111111, 0.4)); rail.rotation.x = ang; rail.position.set(sx, 2.25 + 1.02, -3.5); esc.add(rail);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, L), mat(0x8d939a, 0.35, { metalness: 0.6 })); body.rotation.x = ang; body.position.set(sx, 2.25 - 0.15, -3.5); esc.add(body);
  }
  add(esc, box(1.7, 0.2, 1.2, mat(0x8d939a, 0.35, { metalness: 0.6 })), 0, 0.1, 0.6);
  add(mall, box(10, 0.4, 6, mat(0x2a2d34, 0.7)), 0, 4.5, -36);           // puente
  add(mall, box(10, 0.06, 6, mat(0xbfb9ae, 0.3)), 0, 4.72, -36);
  for (const zz of [-33.1, -38.9]) {
    add(mall, box(10, 1.0, 0.05, new THREE.MeshStandardMaterial({ color: 0xa8c8dc, transparent: true, opacity: 0.22, roughness: 0.05 })), 0, 5.25, zz);
    add(mall, box(10, 0.08, 0.1, mat(0xb0b4b8, 0.3, { metalness: 0.7 })), 0, 5.78, zz);
  }
  // salida
  add(mall, box(10, 7.5, 0.3, mat(0x23262d, 0.7)), 0, 3.75, -60.2);
  const glassTex = canvasTex(256, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0d1b33'); g.addColorStop(1, '#05080f'); c.fillStyle = g; c.fillRect(0, 0, w, h); }).tex;
  for (const x of [-2.25, -0.75, 0.75, 2.25]) {
    add(mall, plateMesh(1.4, 2.8, glassTex, true), x, 1.4, -60.0);
    add(mall, box(0.08, 2.9, 0.1, mat(0x9a9fa5, 0.3, { metalness: 0.8 })), x + 0.72, 1.45, -59.95);
  }
  add(mall, box(6.2, 0.12, 0.12, mat(0x9a9fa5, 0.3, { metalness: 0.8 })), 0, 2.86, -59.95);
  const salidaTex = canvasTex(512, 160, (c, w, h) => { c.fillStyle = '#0a2814'; c.fillRect(0, 0, w, h); drawNeon(c, w, h, 'SALIDA', '#3dff7a', true, 110, h / 2 + 4); }).tex;
  add(mall, plateMesh(2.4, 0.75, salidaTex, true), 0, 3.6, -59.9);
  const exitL = new THREE.PointLight(0x3dff7a, 8, 14, 2); exitL.position.set(0, 3.4, -58.5); mall.add(exitL);
  // bancos y macetas
  for (const [x, z] of [[2.6, -14], [-2.6, -20], [2.6, -46], [-2.6, -52]]) {
    add(mall, box(0.6, 0.45, 2, mat(0x5b4a3a, 0.6)), x, 0.45, z);
    add(mall, box(0.1, 0.45, 0.1, mat(0x222222, 0.5)), x, 0.22, z + 0.8); add(mall, box(0.1, 0.45, 0.1, mat(0x222222, 0.5)), x, 0.22, z - 0.8);
  }
  for (const [x, z] of [[-2.8, -12], [2.8, -22], [-2.8, -48], [2.8, -54]]) {
    add(mall, new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.38, 0.8, 16), mat(0xe1ddd4, 0.5)), x, 0.4, z);
    add(mall, new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.6, 8), mat(0x1f4a2e, 0.8)), x, 1.55, z);
  }
  // parlantes de techo (uno al principio, otro cerca de la vidriera)
  refs.speakers = [];
  const grill = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#e6e6e2'; c.beginPath(); c.arc(w / 2, h / 2, w / 2, 0, 7); c.fill(); c.fillStyle = '#4a4a4a'; for (let y = 30; y < h - 20; y += 16) for (let x = 30; x < w - 20; x += 16) if (Math.hypot(x - w / 2, y - h / 2) < 100) { c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill(); } }).tex;
  for (const z of [-9, -42]) {
    const s = new THREE.Group(); s.position.set(2.7, 7.45, z); mall.add(s);
    add(s, new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 32), mat(0xd8d8d4, 0.4)), 0, 0, 0);
    const face = add(s, plateMesh(0.78, 0.78, grill), 0, -0.035, 0); face.rotation.x = Math.PI / 2;
    const led = add(s, new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), basic(0x330000)), 0.33, -0.04, 0);
    refs.speakers.push({ g: s, led, z });
  }
  // luces del pasillo (se apagan en secuencia)
  refs.corridorLights = [];
  for (const z of [-3, -13, -23, -33, -43, -53]) {
    const l = new THREE.PointLight(0xbfd2ff, 16, 18, 2); l.position.set(0, 6.6, z); mall.add(l);
    const panel = add(mall, box(1.6, 0.05, 0.6, basic(0xeaf2ff)), 0, 7.2, z);
    refs.corridorLights.push({ l, panel, z });
  }
  const vitL = new THREE.PointLight(0xffc89a, 9, 8, 2); vitL.position.set(-4.4, 3.0, -41); mall.add(vitL); refs.vitL = vitL;
  const hemi = new THREE.HemisphereLight(0x4a5c88, 0x0b0b10, 1.2); mall.add(hemi);
  refs.key = new THREE.PointLight(0xffe2c4, 3, 6, 2); scene.add(refs.key);
  refs.moon = new THREE.PointLight(0x9fb8ff, 0, 14, 2); scene.add(refs.moon);
  const escL = new THREE.PointLight(0xcfe0ff, 8, 9, 2); escL.position.set(-1.0, 4.0, -28); mall.add(escL);
})();

// maniquíes de la vidriera
const MANI_COLORS = [[0x8e2b3a, 0x2e2a2e], [0x1d1d22, 0x1d1d22], [0xc9b79a, 0x5a4a3a]];
const manis = MANI_COLORS.map(([top, pants], i) => {
  const m = makeDummy({ skin: 0xdcd6cc, top, pants, shoes: 0xdcd6cc });
  m.expression('none'); m.pose(); scene.add(m.group);
  return m;
});
const maniSlots = [v3(-6.4, 0.3, -39.6), v3(-6.4, 0.3, -41), v3(-6.4, 0.3, -42.4)];

// vos
const you = makeDummy({ top: 0xc58b2a, pants: 0x2f4a6e, hood: 0xb07a22 });
scene.add(you.group);

// ---------- probador (set aparte) ----------
const PX = 200;
const prob = new THREE.Group(); prob.position.set(PX, 0, 0); scene.add(prob);
const P = (x, y, z) => v3(x + PX, y, z);
(function buildProbador() {
  const wallM = mat(0xd9cfc0, 0.85);
  add(prob, box(1.8, 0.05, 1.8, mat(0x5a4636, 0.7)), 0, 0, 0);
  add(prob, box(1.8, 2.6, 0.08, wallM), 0, 1.3, -0.9);
  add(prob, box(0.08, 2.6, 1.8, wallM), -0.9, 1.3, 0);
  add(prob, box(0.08, 2.6, 1.8, wallM), 0.9, 1.3, 0);
  const mirror = canvasTex(128, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#5d6670'); g.addColorStop(0.5, '#9aa6b2'); g.addColorStop(1, '#3d444c'); c.fillStyle = g; c.fillRect(0, 0, w, h); }).tex;
  add(prob, plateMesh(0.8, 1.7, mirror, true), 0, 1.35, -0.85);
  add(prob, new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.45, 18), mat(0x2b2b2b, 0.5)), 0, 0.225, -0.45);
  const four = canvasTex(128, 128, (c, w, h) => { c.fillStyle = '#111'; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.font = '900 96px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('4', w / 2, h / 2 + 4); }).tex;
  add(prob, plateMesh(0.22, 0.22, four), -0.85, 2.2, 0.5).rotation.y = Math.PI / 2;
  // ropa colgada
  add(prob, box(0.5, 0.7, 0.08, mat(0x355e8c, 0.8)), 0.82, 1.6, -0.4).rotation.y = Math.PI / 2;
  add(prob, box(0.45, 0.6, 0.08, mat(0x8c3535, 0.8)), 0.82, 1.65, 0.15).rotation.y = Math.PI / 2;
  // cortina
  const cur = canvasTex(256, 256, (c, w, h) => { for (let x = 0; x < w; x += 16) { const g = c.createLinearGradient(x, 0, x + 16, 0); g.addColorStop(0, '#5e1717'); g.addColorStop(0.5, '#9a2a2a'); g.addColorStop(1, '#4a1010'); c.fillStyle = g; c.fillRect(x, 0, 16, h); } }).tex;
  add(prob, plateMesh(0.45, 2.4, cur, false, { side: THREE.DoubleSide }), -0.67, 1.2, 0.9);
  const bulb = new THREE.PointLight(0xffd6a0, 2.5, 4, 2); bulb.position.set(0, 2.4, 0); prob.add(bulb);
  add(prob, new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), basic(0xfff0d0)), 0, 2.5, 0);
})();

// ---------- carteles ----------
function drawNotice(c, w, h) {
  c.fillStyle = '#f2efe6'; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(0,0,0,.05)'; c.fillRect(0, 0, w, 18);
  c.fillStyle = '#111'; c.textAlign = 'left';
  c.font = '900 50px Inter'; c.fillText('PERSONAL', 50, 110); c.fillText('NOCTURNO', 50, 168);
  c.fillStyle = '#c9302c'; c.fillRect(50, 192, 500, 8);
  c.fillStyle = '#111'; c.font = '800 44px Inter'; c.fillText('REGLA Nº 1', 50, 280);
  c.font = '600 40px Inter';
  ['Después de las 3:00,', 'NO obedezcas', 'al altavoz.'].forEach((l, i) => { c.fillStyle = i === 1 ? '#c9302c' : '#111'; c.font = i === 1 ? '900 46px Inter' : '600 40px Inter'; c.fillText(l, 50, 350 + i * 58); });
  c.font = '800 44px Inter'; c.fillStyle = '#111'; c.fillText('REGLA Nº 2', 50, 600);
  // resto arrancado
  c.fillStyle = '#0c0d10'; c.beginPath(); c.moveTo(0, 640);
  for (let x = 0; x <= w; x += 30) c.lineTo(x, 630 + (hash(x) - 0.5) * 50);
  c.lineTo(w, h); c.lineTo(0, h); c.fill();
}

// ---------- estado y tomas ----------
let TL, S, CAP;
const T = {};
const drawGrain = grain($('grain'));
function youZ(t) {
  const a = T.camina, b = T.miran;
  if (t < a) return -7.5;
  if (t < b) return lerp(-7.5, -40.2, clamp((t - a) / (b - a)));
  return -40.2;
}
const youPos = (t) => v3(t >= T.camina ? 0.9 : 0.6, 0, youZ(t));
const SHOTS = {
  intro_altavoz: shot(v3(0, 2.6, 7), v3(0, 2.3, 3), v3(0, 3.2, -40), v3(0, 2.8, -40), 46),
  intro_tu: shot(v3(2.4, 3.4, -1.6), v3(2.1, 3.1, -2.6), v3(0.5, 1.3, -7.5), v3(0.5, 1.4, -7.5), 46),
  probador: shot(P(0.08, 1.85, 1.95), P(0.05, 1.76, 1.65), P(0, 1.15, -0.45), P(0, 1.22, -0.45), 52, 'prob'),
  celular: (p) => ({ pos: P(0.05, 1.76, 1.65), look: P(0, 1.22, -0.45), fov: 52, mode: 'prob', blur: true }),
  rejas: shot(v3(2.2, 1.8, -1), v3(2.4, 1.8, -12), v3(5, 1.7, -6), v3(5, 1.7, -17), 50),
  cartel: shot(v3(-1.6, 1.8, -2.4), v3(-2.2, 1.7, -3.2), v3(-5, 1.5, -4.6), v3(-5, 1.5, -4.5), 46),
  cartel_regla: shot(v3(-3.25, 1.6, -4.42), v3(-3.45, 1.58, -4.42), v3(-4.9, 1.56, -4.42), v3(-4.9, 1.56, -4.42), 40),
  parlante: shot(v3(1.2, 4.4, -6.4), v3(1.5, 4.9, -7.0), v3(2.7, 7.4, -9), v3(2.7, 7.4, -9), 42),
  parlante_habla: shot(v3(2.1, 5.7, -7.6), v3(2.2, 5.9, -7.9), v3(2.7, 7.4, -9), v3(2.7, 7.4, -9), 40),
  salida: shot(v3(0.9, 1.7, -9.5), v3(0.9, 1.7, -11.5), v3(0.2, 2.4, -60), v3(0.2, 2.4, -60), 30),
  camina: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x + 1.1, 2.3, y.z + 3.4), look: v3(y.x - 0.2, 1.4, y.z - 5), fov: 46, mode: 'int' }; },
  escalera: shot(v3(1.6, 1.8, -24.2), v3(1.4, 2.1, -25.0), v3(-2.4, 2.2, -29.5), v3(-2.4, 3.0, -30.5), 46),
  luces: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x + 0.9, 1.95, y.z - 3.3), look: v3(y.x - 0.6, 2.3, y.z + 16), fov: 50, mode: 'int' }; },
  luces_cerca: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x - 0.35, 2.05, y.z - 1.9), look: v3(y.x, 1.9, y.z), fov: 42, mode: 'int' }; },
  vidriera: shot(v3(1.6, 1.8, -35.5), v3(1.2, 1.8, -36.8), v3(-6, 1.7, -41.5), v3(-6, 1.7, -41.5), 44),
  vidriera_miran: (p, lt, d, t) => { const k = clamp((t - T.stinger) / 0.3); return { pos: lerpV(v3(-1.3, 1.75, -38.2), v3(-2.4, 1.75, -39.2), ease(p * 0.5) + 0.3 * ease(k)), look: v3(-6.4, 1.8, -41), fov: lerp(42, 34, ease(k)), mode: 'int' }; },
  parlante_nombre: shot(v3(1.3, 5.0, -39.6), v3(1.6, 5.5, -40.3), v3(2.7, 7.4, -42), v3(2.7, 7.4, -42), 42),
  cara_miedo: (p, lt, d, t) => { const y = youPos(t); return { pos: lerpV(v3(y.x + 0.45, 2.0, y.z - 2.4), v3(y.x + 0.35, 1.95, y.z - 2.0), ease(p)), look: v3(y.x, 1.85, y.z), fov: 42, mode: 'int' }; },
  paso: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x - 0.9, 0.32, y.z - 0.5), look: v3(0.3, 1.0, y.z + 14), fov: 46, mode: 'int' }; },
  paso_otro: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x - 0.9, 0.32, y.z - 0.5), look: v3(0.3, 1.0, y.z + 14), fov: 46, mode: 'int' }; },
  vidriera_vacia: shot(v3(-1.6, 1.75, -38.6), v3(-2.2, 1.75, -39.3), v3(-6.4, 1.6, -41), v3(-6.4, 1.6, -41), 40),
  decision: (p, lt, d, t) => { const y = youPos(t); return { pos: v3(y.x + 0.2, 1.7, y.z - 1.2), look: v3(0.2, 2.2, -60), fov: 40, mode: 'int', blur: 'dec' }; },
  loop: shot(v3(1.8, 5.3, -40.2), v3(2.0, 5.8, -40.8), v3(2.7, 7.4, -42), v3(2.7, 7.4, -42), 40),
};
SHOTS.decision_1 = SHOTS.decision_2 = SHOTS.decision_final = SHOTS.decision;

let noticeDrawn = false;
function renderAt(t) {
  const frame = Math.round(t * 30);
  const seg = S.segAt(t);
  const dur = seg.end - seg.start, lt = t - seg.start, p = clamp(lt / dur);
  const sh = SHOTS[seg.name](p, lt, dur, t);
  const blink = (k) => { const ph = (t + k) % 3.7; return ph < 0.12 ? Math.sin(ph / 0.12 * Math.PI) : 0; };

  // --- vos ---
  const inProb = t >= T.probador && t < T.celularEnd;
  if (inProb) {
    you.group.position.set(PX, -0.45, -0.45); you.group.rotation.set(0, 0, 0);
    const wake = clamp((t - T.probador - 1.2) / 0.8);
    you.head.rotation.set(lerp(0.55, 0.05, ease(wake)), 0, lerp(0.15, 0, ease(wake)));
    you.legs[0].rotation.x = you.legs[1].rotation.x = -1.2;
    you.hands.L = v3(0.3, 0.95, 0.4); you.hands.R = v3(-0.3, 0.95, 0.4);
    you.expression(wake < 0.3 ? 'sleep' : 'worried', wake < 0.3 ? 0 : blink(0.4));
  } else {
    const y = youPos(t);
    you.group.position.copy(y);
    const walking = t >= T.camina && t < T.miran;
    const turnBack = t >= T.pasoStart && !S.segAt(t).name.startsWith('decision') ? 1 : 0;
    you.group.rotation.set(0, Math.PI + turnBack * 0.0, 0); // mira hacia la salida (-z)
    you.legs[0].rotation.x = you.legs[1].rotation.x = 0;
    if (walking) you.walk((t - T.camina) * 6.2, 1); else { you.walk(0, 0); you.hands.L = v3(0.36, 0.86, 0.06); you.hands.R = v3(-0.36, 0.86, 0.06); }
    let ex = 'worried';
    if (t >= T.lucesCerca) ex = 'scared';
    if (t >= T.stinger) ex = 'terror';
    you.expression(ex, ex === 'terror' ? 0 : blink(0.2));
    // mira por encima del hombro cuando se apagan las luces
    const look = seg.name.startsWith('luces') ? 0.6 * ease(clamp(lt / 0.8)) : seg.name === 'cara_miedo' ? 0.2 : 0;
    you.head.rotation.set(0.05, look, 0);
    if (seg.name === 'vidriera') you.head.rotation.set(0, -0.9 * ease(clamp(lt / 1.2)), 0);
  }
  you.pose();

  // --- maniquíes ---
  const miran = t >= T.miran;
  const fuera = t >= T.pasoStart;
  manis.forEach((m, i) => {
    m.group.visible = true;
    if (!fuera) {
      m.group.position.copy(maniSlots[i]);
      m.group.rotation.set(0, miran ? Math.PI / 2 : -Math.PI / 2, 0);
      m.expression(miran ? 'blank' : 'none');
      m.head.rotation.set(0, miran ? (i - 1) * -0.25 : 0, 0);
    } else {
      const y = youPos(t);
      const close = t >= T.pasoOtro;
      // en el pasillo, detrás de ti; con el segundo paso, más cerca
      const dz = close ? [6.5, 9.5, 12][i] : [14, 17, 20][i];
      m.group.position.set([0.2, -1.4, 1.6][i], 0, y.z + dz);
      m.group.rotation.set(0, Math.PI, 0);
      m.expression('blank');
      m.head.rotation.set(0, 0, 0);
      m.group.visible = !seg.name.startsWith('vidriera_vacia') || true;
    }
    const pose = miran ? v3(0.36 * (i % 2 ? 1 : -1) * 0, 0, 0) : null;
    m.hands.L = v3(0.38, 0.9, 0.08); m.hands.R = v3(-0.38, 0.9, 0.08);
    m.pose();
  });

  // --- apagón progresivo ---
  const offAt = (z) => {
    // locales detrás de ti se apagan desde el más lejano (z ~ 0) hasta tu posición
    const start = T.luces + 0.3, end = T.lucesCerca + 1.2;
    const reach = lerp(2, -34.5, clamp((t - start) / (end - start)));
    return t >= start && z > reach;
  };
  for (const s of STORES) {
    const off = offAt(s.z) || (t >= T.pasoStart && s.z > -46);
    const flick = !off && hash(Math.floor(t * 10) + s.z) > 0.985;
    s.sign.material.color.setScalar(off ? 0.06 : flick ? 0.4 : 1);
    s.spill.material.opacity = off ? 0 : 0.32;
  }
  for (const c of refs.corridorLights) {
    const off = offAt(c.z) || (t >= T.pasoStart && c.z > -46);
    c.l.intensity = off ? 0 : 16;
    c.panel.material.color.setScalar(off ? 0.05 : 1);
  }
  refs.vitL.intensity = t >= T.pasoStart ? 4 : 9;
  { const y = youPos(t); refs.moon.position.set(0.2, 6.2, y.z + 9); refs.moon.intensity = t >= T.pasoStart ? 10 : 0; }
  // escalera: escalones que suben
  refs.stepTex.tex.offset.y = t >= T.escalera ? -(t - T.escalera) * 0.35 : 0;
  // parlantes: LED cuando habla el altavoz o suena la campana
  const speaking = TL.lines.some(l => l.voz === 'altavoz' && t >= l.start - 0.9 && t <= l.end + 0.2) || t >= T.loopDing;
  for (const s of refs.speakers) s.led.material.color.setHex(speaking ? 0xff2a1a : 0x330000);
  // cartel
  if (!noticeDrawn) { refs.noticeTex.redraw(drawNotice); noticeDrawn = true; }
  // luz de relleno que sigue a la cámara
  refs.key.position.copy(sh.pos).add(v3(0.6, 0.6, 0));
  refs.key.intensity = sh.mode === 'prob' ? 1.8 : 2.2;

  // --- cámara ---
  const sting = t >= T.stinger && t < T.stinger + 0.4 ? 0.02 * (1 - (t - T.stinger) / 0.4) : 0;
  aimCamera(camera, sh, t, 0.0018 + sting);
  mall.visible = sh.mode !== 'prob'; prob.visible = sh.mode === 'prob';
  manis.forEach(m => m.group.visible = m.group.visible && mall.visible && !(seg.name === 'vidriera_vacia'));
  renderer.toneMappingExposure = sh.mode === 'prob' ? 1.3 : 1.7;
  scene.fog.density = sh.mode === 'prob' ? 0 : 0.02;
  const gl = $('gl');
  gl.style.filter = sh.blur === true ? 'blur(10px) brightness(.45)' : sh.blur === 'dec' ? 'blur(7px) brightness(.5) saturate(.8)' : 'none';
  $('phone').style.display = seg.name === 'celular' ? 'block' : 'none';
  if (seg.name === 'celular') {
    const k = ease(lt / 0.35);
    $('phone').style.transform = `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * -4}deg)`;
    $('phone').style.opacity = k;
  }
  $('decision').style.display = seg.name.startsWith('decision') ? 'block' : 'none';
  if (seg.name.startsWith('decision')) decision(t, S.L('decision').start, S.L('decision_1').start, S.L('decision_2').start, S.L('decision_final').start);
  drawGrain(frame);
  $('flash').style.opacity = t >= T.stinger && t < T.stinger + 0.25 ? 0.45 * (1 - (t - T.stinger) / 0.25) : 0;
  // fundido de entrada corto y negro al final (empalma con el inicio)
  $('black').style.opacity = t < 0.3 ? 1 - t / 0.3 : (t > TL.duration - 0.25 ? clamp((t - (TL.duration - 0.25)) / 0.2) : 0);
  CAP(t);
  renderer.render(scene, camera);
}

window.setup = async (timeline) => {
  TL = timeline; S = story(TL);
  CAP = captions($('caps'), TL);
  await document.fonts.load('900 80px "Inter Display"');
  await document.fonts.load('700 30px Inter');
  T.probador = S.L('probador').start;
  T.celularEnd = S.L('rejas').start;
  T.camina = S.L('camina').start;
  T.escalera = S.L('escalera').start;
  T.luces = S.L('luces').start;
  T.lucesCerca = S.L('luces_cerca').start;
  T.miran = S.L('vidriera_miran').start;
  T.stinger = S.L('vidriera_miran').start + 0.05;
  T.pasoStart = S.L('paso').start;
  T.pasoOtro = S.L('paso_otro').start;
  T.loopDing = S.L('loop').end + 0.1;
  for (const s of S.segs) renderAt(s.start + 0.01);
  return true;
};
window.renderAt = renderAt;
window.__three = { camera, renderer, scene };
