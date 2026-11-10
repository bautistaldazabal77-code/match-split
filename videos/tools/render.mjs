// Renderiza una escena HTML cuadro por cuadro con Playwright y la codifica con ffmpeg.
//
// Uso:
//   node tools/render.mjs <proyecto> [--stills 1.5,10,20] [--from 0] [--to 96] [--fps 30] [--out video.mp4]
//
// <proyecto> es una carpeta dentro de videos/ con escena.html y out/timeline.json (+ out/mezcla.wav).
// La página debe exponer window.setup(timeline) (async) y window.renderAt(t).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const project = args[0];
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const fps = Number(opt('fps', 30));
const outDir = join(ROOT, project, 'out');
const timeline = JSON.parse(readFileSync(join(outDir, 'timeline.json'), 'utf8'));
const from = Number(opt('from', 0));
const to = Number(opt('to', timeline.duration));
const W = 1080, H = 1920;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css' };
const server = createServer(async (req, res) => {
  try {
    const p = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(ROOT)) throw new Error('fuera de raíz');
    const body = await readFile(p);
    res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--disable-gpu-vsync'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.text()); });
page.on('pageerror', e => console.log('[page error]', e.message));
await page.goto(`http://127.0.0.1:${port}/${project}/escena.html`);
await page.waitForFunction(() => typeof window.setup === 'function');
await page.evaluate(tl => window.setup(tl), timeline);

const stills = opt('stills', null);
if (stills) {
  const dir = join(outDir, 'stills');
  mkdirSync(dir, { recursive: true });
  for (const s of stills.split(',').map(Number)) {
    await page.evaluate(t => window.renderAt(t), s);
    await page.screenshot({ path: join(dir, `t${s.toFixed(2).padStart(6, '0')}.png`) });
    console.log('still', s);
  }
} else {
  const outFile = join(outDir, opt('out', 'video.mp4'));
  const audio = join(outDir, 'mezcla.wav');
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    ...(existsSync(audio) ? ['-ss', String(from), '-t', String(to - from), '-i', audio] : []),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round((to - from) * fps);
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const t = from + i / fps;
    await page.evaluate(tt => window.renderAt(tt), t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) {
      const el = (Date.now() - t0) / 1000;
      console.log(`cuadro ${i}/${n}  t=${t.toFixed(1)}s  ${(el / (i + 1) * 1000).toFixed(0)} ms/cuadro  quedan ~${Math.round(el / (i + 1) * (n - i) / 60)} min`);
    }
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  console.log('listo:', outFile);
}
await browser.close();
server.close();
