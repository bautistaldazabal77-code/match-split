// Arma web/panel/demo.json: un resumen con datos INVENTADOS para ver cómo se va a ver el panel. Uso: node medicion/generar-demo.js
const fs = require('fs'), path = require('path');
const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(__dirname, 'apps-script.gs'), 'utf8'))(m, m.exports);
let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647, elegir = a => a[Math.floor(r() * a.length)];
const HOY = Date.parse('2026-10-30T12:00:00Z'), eventos = [], anotados = [];
const ANUNCIOS = [['instagram', 'paid', 'lanzamiento', 'contadores-feed', 'c'], ['instagram', 'paid', 'lanzamiento', 'abogados-story', 'a'], ['facebook', 'paid', 'lanzamiento', 'contadores-story', 'c'],
  ['facebook', 'paid', 'lanzamiento', 'escribanos-feed', 'e'], ['linkedin', 'paid', 'lanzamiento', 'estudios', ''], ['google', 'organic', '', '', ''], ['directo', '', '', '', '']];
const HERR = { a: ['venc', 'liq'], c: ['comp', 'rec'], e: ['tit', 'esc'] }, LARGO = { venc: 'vencimientos', liq: 'liquidador', comp: 'comprobantes', rec: 'recoleccion', tit: 'titulos', esc: 'escritura' };
const PROF = { a: 'Abogado/a', c: 'Contador/a', e: 'Escribano/a' }, PROV = ['CABA', 'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Entre Ríos', 'Neuquén'];
const NOMBRES = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Facundo', 'Gabriela', 'Hernán', 'Inés', 'Julián', 'Lucía', 'Martín', 'Natalia', 'Pablo', 'Romina', 'Sergio', 'Valeria'];
for (let i = 0; i < 640; i++) {
  const [fuente, medio, campana, contenido, p0] = elegir([...ANUNCIOS, ANUNCIOS[0], ANUNCIOS[0], ANUNCIOS[2], ANUNCIOS[1]]), prof = p0 || elegir(['a', 'c', 'c', 'e']);
  const t = HOY - Math.floor(r() * 21) * 864e5 - Math.floor(r() * 864e5 * .6), v = 'v' + i, b = { visitante: v, sesion: v, fuente, medio, campana, contenido, ancho: r() < .74 ? 390 : 1366 };
  const ev = (evento, extra = {}, dt = 0) => eventos.push({ ...b, evento, pagina: 'landing', fecha: new Date(t + dt).toISOString(), ...extra });
  ev('visita'); if (r() < .7) ev('seccion_vista', { seccion: { a: 'abogados', c: 'contadores', e: 'escribanos' }[prof] }, 5e3);
  if (r() < .4) { const h = elegir(HERR[prof]); ev('clic', { elemento: 'probar:' + h, seccion: 'x' }, 9e3); ev('visita', { pagina: 'herramientas' }, 1e4); if (r() < .75) ev('uso', { herramienta: h, pagina: 'herramientas' }, 3e4); }
  if (r() < .22) { const h = elegir(HERR[prof]); ev('clic', { elemento: 'avisame:' + LARGO[h], seccion: 'x' }, 6e4); }
  if (r() < .1) ev('clic', { elemento: 'anotarme', seccion: 'header' }, 7e4);
  if (r() < (prof === 'c' ? .11 : .065)) { const herr = [...new Set([elegir(HERR[prof]), ...(r() < .5 ? HERR[prof] : [])])].map(h => LARGO[h]);
    anotados.push({ fecha: new Date(t + 9e4).toISOString(), nombre: `${elegir(NOMBRES)} Ejemplo ${anotados.length + 1}`, profesion: PROF[prof], whatsapp: r() < .8 ? `11 5555-${String(1000 + anotados.length).slice(-4)}` : '',
      email: `persona${anotados.length + 1}@ejemplo.com`, provincia: elegir(PROV), tamano: elegir(['Trabajo solo/a', '2 a 5 personas', '2 a 5 personas', '6 a 20 personas']), herramientas: herr.join(', '), fuente, medio, campana, contenido, visitante: v, estado: 'nuevo' }); }
}
const out = { ok: true, demo: true, ...m.exports.resumir(eventos, anotados, { hoy: new Date(HOY).toISOString() }) };
fs.writeFileSync(path.join(__dirname, '..', 'web', 'panel', 'demo.json'), JSON.stringify(out));
console.log('demo.json:', out.totales, out.demanda.slice(0, 3).map(d => d.herramienta + ' ' + d.puntaje));
