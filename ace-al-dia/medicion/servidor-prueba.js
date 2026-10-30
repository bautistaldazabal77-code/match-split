// Servidor local que imita la aplicación de Apps Script (mismas columnas y el mismo resumen) y sirve la web.
// Uso: node medicion/servidor-prueba.js  ->  web en http://127.0.0.1:8792/  ·  "planilla" en http://127.0.0.1:8792/exec (clave: prueba)
const http = require('http'), fs = require('fs'), path = require('path');
const cargarGs = () => { const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(__dirname, 'apps-script.gs'), 'utf8'))(m, m.exports); return m.exports; };
const { resumir, HOJAS } = cargarGs();
const WEB = path.join(__dirname, '..', 'web'), PUERTO = +process.env.PUERTO || 8792, CLAVE = 'prueba';
const hojas = { Eventos: [], Anotados: [] };
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'), cors = { 'Access-Control-Allow-Origin': '*' };
  if (u.pathname === '/exec' && req.method === 'POST') {
    let b = ''; req.on('data', c => b += c); req.on('end', () => { try { const d = JSON.parse(b), n = d.tipo === 'evento' ? 'Eventos' : d.tipo === 'anotado' ? 'Anotados' : null;
      if (n) { if (n === 'Anotados') d.estado = 'nuevo'; hojas[n].push(Object.fromEntries(HOJAS[n].map(k => [k, Array.isArray(d[k]) ? d[k].join(', ') : d[k] ?? '']))); } } catch (e) {}
      res.writeHead(200, { ...cors, 'Content-Type': 'application/json' }); res.end('{"ok":true}'); }); return;
  }
  if (u.pathname === '/exec') { res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(u.searchParams.get('clave') !== CLAVE ? { ok: false, error: 'Clave incorrecta.' } : { ok: true, ...resumir(hojas.Eventos, hojas.Anotados, { dias: +u.searchParams.get('dias') || 0 }) })); return; }
  if (u.pathname === '/_hojas') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(hojas)); return; }
  let f = path.join(WEB, decodeURIComponent(u.pathname)); if (!f.startsWith(WEB)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  fs.readFile(f, (e, data) => { if (e) { res.writeHead(404); return res.end('no encontrado'); } res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' }); res.end(data); });
}).listen(PUERTO, '127.0.0.1', () => console.log(`web: http://127.0.0.1:${PUERTO}/  ·  planilla de prueba: http://127.0.0.1:${PUERTO}/exec (clave: ${CLAVE})`));
