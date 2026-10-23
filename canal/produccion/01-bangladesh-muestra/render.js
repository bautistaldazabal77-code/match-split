const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const FPS = 24;
(async () => {
  const tl = require('./timeline.json');
  const total = Math.ceil(tl.duration * FPS);
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', 'video_limpio.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://127.0.0.1:8777/index.html');
  await page.evaluate(() => window.READY);
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 240 === 0) console.log(`cuadro ${f}/${total} · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('listo', ((Date.now() - t0) / 1000).toFixed(0), 's');
})().catch(e => { console.error(e); process.exit(1); });
