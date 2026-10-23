const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const times = process.argv.slice(2).map(Number);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto('http://127.0.0.1:8777/index.html');
  await page.waitForFunction(() => window.READY && window.READY.then, null, { timeout: 30000 });
  await page.evaluate(() => window.READY);
  for (const t of times) {
    await page.evaluate(t => window.render(t), t);
    await page.screenshot({ path: `shots/t${String(t).padStart(6, '0')}.jpg`, type: 'jpeg', quality: 80 });
  }
  console.log('errores:', errs.length ? errs.join(' | ') : 'ninguno');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
