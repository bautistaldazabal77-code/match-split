// Genera las imágenes de los anuncios en anuncios/imagenes y la imagen para compartir (web/assets/compartir.png). Uso: node anuncios/generar.js
const { chromium } = require('playwright'), path = require('path');
const T = 'file://' + path.join(__dirname, 'plantilla.html'), OUT = path.join(__dirname, 'imagenes');
const TAM = { feed: [1080, 1350], story: [1080, 1920], og: [1200, 630] };
(async () => {
  const b = await chromium.launch();
  const tirar = async (pieza, formato, archivo) => { const [w, h] = TAM[formato], p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(`${T}?pieza=${pieza}&formato=${formato}`); await p.waitForTimeout(900); await p.screenshot({ path: archivo, clip: { x: 0, y: 0, width: w, height: h } }); await p.close(); console.log('✓', path.basename(archivo)); };
  for (const pieza of ['general', 'abogados', 'contadores', 'escribanos']) for (const f of ['feed', 'story']) await tirar(pieza, f, path.join(OUT, `${pieza}-${f}.png`));
  await tirar('general', 'og', path.join(__dirname, '..', 'web', 'assets', 'compartir.png'));
  await b.close();
})();
