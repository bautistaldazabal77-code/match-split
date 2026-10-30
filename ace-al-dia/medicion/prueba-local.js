// Prueba de punta a punta: cuatro visitantes simulados (con distintos anuncios) recorren la web, usan herramientas y se anotan;
// después se revisa el resumen de la "planilla" y se abre el panel. Requiere: node medicion/servidor-prueba.js corriendo y Playwright.
const { chromium } = require('playwright'), assert = require('assert');
const B = 'http://127.0.0.1:8792', EJ = require('path').join(__dirname, '..', 'web', 'herramientas', 'ejemplos');
const OUT = process.argv[2] || '.';
(async () => {
  const nav = await chromium.launch(), errores = [];
  async function visitante(utm, pasos, opts = {}) {
    const ctx = await nav.newContext({ viewport: opts.movil ? { width: 390, height: 844 } : { width: 1366, height: 900 } });
    await ctx.addInitScript(cfg => { window.ACE_MEDICION = cfg; }, { ENDPOINT: B + '/exec', ...(opts.cfg || {}) });
    const p = await ctx.newPage(); p.on('pageerror', e => errores.push(e.message));
    await p.goto(B + '/' + (utm ? '?' + utm : '')); await p.waitForTimeout(400);
    for (const f of pasos) await f(p);
    await p.waitForTimeout(500); await ctx.close();
  }
  const anotar = (datos) => async p => {
    await p.fill('#f-nombre', datos.nombre); await p.selectOption('#f-prof', datos.profesion); if (datos.wa) await p.fill('#f-wa', datos.wa); if (datos.mail) await p.fill('#f-mail', datos.mail);
    await p.selectOption('#f-prov', datos.provincia); await p.selectOption('#f-tam', datos.tamano); for (const h of datos.herr || []) await p.check('#h-' + h);
    await p.click('#f-enviar'); await p.waitForSelector('#listo:not([hidden])');
  };
  // 1) contadora que viene de un anuncio de Instagram, prueba comprobantes y se anota
  await visitante('utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=contadores-feed', [
    async p => { await p.click('a[href="herramientas/index.html#comp"]'); await p.waitForLoadState(); await p.waitForTimeout(800); await p.setInputFiles('#c-files', EJ + '/factura-A-ejemplo.pdf'); await p.waitForTimeout(2500); await p.goBack(); await p.waitForTimeout(500); },
    async p => { await p.click('[data-alta="comprobantes"]'); }, anotar({ nombre: 'Carla Prueba', profesion: 'Contador/a', wa: '11 5555-0101', provincia: 'Córdoba', tamano: '2 a 5 personas', herr: ['recoleccion'] })]);
  // 2) abogado desde Facebook: usa vencimientos y se anota desde el botón general
  await visitante('utm_source=facebook&utm_medium=paid&utm_campaign=lanzamiento&utm_content=abogados-story', [
    async p => { await p.click('a[href="herramientas/index.html#venc"]'); await p.waitForLoadState(); await p.waitForTimeout(600); await p.click('#v-ej'); await p.click('[data-t="liq"]'); await p.click('#l-ej'); await p.goBack(); await p.waitForTimeout(400); },
    async p => { await p.click('.cierre [data-alta]'); }, anotar({ nombre: 'Martín Ejemplo', profesion: 'Abogado/a', mail: 'martin@ejemplo.com', provincia: 'CABA', tamano: 'Trabajo solo/a', herr: ['vencimientos', 'liquidador'] })], { movil: true });
  // 3) visita directa que mira, pide aviso de títulos y se va sin anotarse
  await visitante('', [async p => { await p.mouse.wheel(0, 4000); await p.waitForTimeout(500); await p.click('[data-alta="titulos"]'); await p.click('#f-cerrar'); }]);
  // 4) escribana desde LinkedIn, con píxeles configurados: rechaza las cookies y se anota
  await visitante('utm_source=linkedin&utm_campaign=lanzamiento&utm_content=escribanos', [
    async p => { await p.waitForSelector('.consent'); await p.click('.consent [data-c="no"]'); assert.equal(await p.evaluate(() => typeof window.clarity), 'undefined'); },
    async p => { await p.click('[data-alta="titulos"]'); }, anotar({ nombre: 'Sofía Demo', profesion: 'Escribano/a', wa: '341 555-0303', provincia: 'Santa Fe', tamano: '2 a 5 personas', herr: ['escritura'] })], { cfg: { CLARITY: 'prueba123' } });

  const r = await (await fetch(B + '/exec?clave=prueba')).json();
  console.log('totales', r.totales); console.log('demanda', r.demanda.filter(d => d.puntaje).map(d => `${d.herramienta}: ${d.puntaje} (probar ${d.probar}, avisame ${d.avisame}, usos ${d.usos}, anotados ${d.anotados})`));
  console.log('fuentes', r.fuentes); console.log('anuncios', r.anuncios); console.log('embudo', r.embudo); console.log('anotados', r.anotados.map(a => `${a.nombre} · ${a.profesion} · ${a.herramientas} · ${a.fuente}/${a.contenido}`));
  assert.equal(r.totales.anotados, 3); assert.ok(r.totales.visitantes >= 4);
  assert.ok(r.anotados.some(a => a.nombre === 'Carla Prueba' && a.fuente === 'instagram' && /Carga de comprobantes/.test(a.herramientas)));
  assert.ok(r.demanda.find(d => d.herramienta === 'Carga de comprobantes').usos >= 1); assert.ok(r.demanda.find(d => d.herramienta === 'Vencimientos').probar >= 1);
  assert.equal((await (await fetch(B + '/exec?clave=mala')).json()).ok, false);
  // panel
  const pp = await nav.newPage({ viewport: { width: 1366, height: 900 } }); pp.on('pageerror', e => errores.push('panel ' + e.message));
  await pp.goto(B + '/panel/'); await pp.fill('#l-url', B + '/exec'); await pp.fill('#l-clave', 'prueba'); await pp.click('#f-login button'); await pp.waitForSelector('#tablero:not([hidden])');
  await pp.selectOption('#dias', '0'); await pp.waitForTimeout(500); await pp.screenshot({ path: OUT + '/panel_real.jpg', type: 'jpeg', quality: 65, fullPage: true });
  console.log('errores de página:', errores.length ? errores : 'ninguno'); assert.equal(errores.length, 0); console.log('PRUEBA OK'); await nav.close();
})().catch(e => { console.error(e); process.exit(1); });
