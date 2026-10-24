// Captura los cuadros con Chromium y arma el video sin sonido.
//   node render.js                      → todo el video en video_limpio.mp4, repartido en varios procesos
//   node render.js 600 840              → solo de 600 s a 840 s (para revisar un capítulo)
//   node render.js 600 840 parte.mp4 1  → un solo proceso (lo usan los procesos hijos)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const FPS = 24;
const tl = require('./timeline.json');
const [a = 0, b = tl.duration, out = 'video_limpio.mp4', workers = Math.max(1, require('os').cpus().length - 1)] = process.argv.slice(2).map((x, i) => i === 2 ? x : Number(x));
const f0 = Math.round(a * FPS), f1 = Math.min(Math.ceil(tl.duration * FPS), Math.round(b * FPS));

async function one(f0, f1, out, tag = '') {
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('http://127.0.0.1:8777/index.html');
  await page.waitForFunction(() => window.READY && window.READY.then, null, { timeout: 60000 });
  await page.evaluate(() => window.READY);
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 480 === 0) console.log(`${tag}cuadro ${f - f0}/${f1 - f0} · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  if (errs.length) console.log(tag + 'errores en la página: ' + errs.join(' | '));
}

(async () => {
  const t0 = Date.now();
  if (workers <= 1) { await one(f0, f1, out); }
  else {
    // reparte los cuadros en tramos iguales, cada uno en su proceso, y después los une sin recomprimir
    const n = workers, step = Math.ceil((f1 - f0) / n), parts = [];
    const kids = [];
    for (let i = 0; i < n; i++) {
      const s = f0 + i * step, e = Math.min(f1, s + step);
      if (s >= e) break;
      const p = `parte_${i}.mp4`; parts.push(p);
      kids.push(new Promise((res, rej) => {
        const k = spawn('node', [__filename, String(s / FPS), String(e / FPS), p, '1'], { stdio: 'inherit' });
        k.on('close', c => c === 0 ? res() : rej(new Error('falló el tramo ' + i)));
      }));
    }
    await Promise.all(kids);
    fs.writeFileSync('partes.txt', parts.map(p => `file '${p}'`).join('\n') + '\n');
    await new Promise(r => spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'partes.txt', '-c', 'copy', out], { stdio: 'inherit' }).on('close', r));
    for (const p of parts) fs.unlinkSync(p);
    fs.unlinkSync('partes.txt');
  }
  console.log('listo', out, ((Date.now() - t0) / 1000).toFixed(0), 's');
})().catch(e => { console.error(e); process.exit(1); });
