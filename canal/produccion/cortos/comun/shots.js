// Capturas sueltas para revisar: node ../comun/shots.js 0.5 4 12.3  (desde la carpeta del episodio, con el servidor en canal/produccion/)
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const cfg = fs.existsSync('video.json') ? JSON.parse(fs.readFileSync('video.json')) : {};
const URL_EP = `http://127.0.0.1:${process.env.PUERTO || 8778}/${path.relative(path.resolve(__dirname, '..', '..'), process.cwd()).split(path.sep).join('/')}/web/index.html`;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: cfg.ancho || 1080, height: cfg.alto || 1920 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(URL_EP);
  await page.waitForFunction(() => window.READY && window.READY.then, null, { timeout: 60000 });
  await page.evaluate(() => window.READY);
  fs.mkdirSync('shots', { recursive: true });
  for (const t of process.argv.slice(2).map(Number)) {
    await page.evaluate(t => window.render(t), t);
    await page.screenshot({ path: `shots/${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 85 });
  }
  await browser.close();
  if (errs.length) console.log('errores: ' + errs.join(' | '));
})();
