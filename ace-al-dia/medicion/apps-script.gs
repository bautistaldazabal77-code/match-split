/**
 * ACE Al Día · receptor de medición y anotados en Google Sheets (Google Apps Script).
 * Instalación (5 minutos, ver medicion/INSTALAR.md):
 *   1. Crear una planilla de Google nueva > Extensiones > Apps Script > pegar este archivo entero.
 *   2. Configuración del proyecto > Propiedades de la secuencia de comandos > agregar CLAVE_PANEL con una clave larga (la vas a usar para entrar al panel).
 *   3. Implementar > Nueva implementación > Aplicación web > Ejecutar como: yo · Quién tiene acceso: cualquier usuario > Implementar.
 *   4. Copiar la URL que termina en /exec y pegarla en ENDPOINT (web/assets/medicion.js) y en el panel.
 * La web manda eventos anónimos (visitas, clics, uso de herramientas) y los anotados del formulario.
 * El panel pide el resumen con ?accion=resumen&clave=TU_CLAVE. Sin la clave correcta no devuelve nada.
 */
const HOJAS = {
  Eventos: ['fecha', 'evento', 'elemento', 'seccion', 'herramienta', 'pagina', 'url', 'fuente', 'medio', 'campana', 'contenido', 'primera_fuente', 'visitante', 'sesion', 'ancho', 'x', 'y', 'porcentaje', 'respuesta', 'referencia'],
  Anotados: ['fecha', 'nombre', 'profesion', 'whatsapp', 'email', 'provincia', 'tamano', 'herramientas', 'fuente', 'medio', 'campana', 'contenido', 'primera_fuente', 'visitante', 'origen', 'primer_origen', 'ancho', 'estado', 'notas'],
};
const MAX_CAMPO = 300;

function hoja_(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(nombre);
  if (!h) { h = ss.insertSheet(nombre); h.appendRow(HOJAS[nombre]); h.setFrozenRows(1); h.getRange(1, 1, 1, HOJAS[nombre].length).setFontWeight('bold'); }
  return h;
}
function limpiar_(v) {
  if (Array.isArray(v)) v = v.join(', ');
  v = v === undefined || v === null ? '' : String(v).slice(0, MAX_CAMPO);
  return /^[=+\-@]/.test(v) ? "'" + v : v;        // evita que un texto se interprete como fórmula
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.tipo !== 'evento' && d.tipo !== 'anotado') return salida_({ ok: false, error: 'tipo desconocido' });
    if (d.tipo === 'anotado' && !String(d.nombre || '').trim()) return salida_({ ok: false, error: 'falta el nombre' });
    const nombre = d.tipo === 'evento' ? 'Eventos' : 'Anotados';
    if (d.tipo === 'anotado') d.estado = 'nuevo';
    lock.waitLock(10000);
    hoja_(nombre).appendRow(HOJAS[nombre].map(k => limpiar_(d[k])));
    return salida_({ ok: true });
  } catch (err) {
    return salida_({ ok: false, error: String(err) });
  } finally { try { lock.releaseLock(); } catch (x) {} }
}

function doGet(e) {
  const clave = PropertiesService.getScriptProperties().getProperty('CLAVE_PANEL');
  if (!clave || (e.parameter.clave || '') !== clave) return salida_({ ok: false, error: 'Clave incorrecta.' });
  const filas = n => { const v = hoja_(n).getDataRange().getValues(), c = v.shift(); return v.map(r => Object.fromEntries(c.map((k, i) => [k, r[i] instanceof Date ? r[i].toISOString() : r[i]]))); };
  const dias = Number(e.parameter.dias || 0);
  return salida_({ ok: true, ...resumir(filas('Eventos'), filas('Anotados'), { dias, hoy: new Date().toISOString() }) });
}
function salida_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* ---------- resumen (función pura: también la usan las pruebas locales) ---------- */
const HERRAMIENTAS = { venc: 'Vencimientos', vencimientos: 'Vencimientos', liq: 'Liquidador de juicios', liquidador: 'Liquidador de juicios', comp: 'Carga de comprobantes', comprobantes: 'Carga de comprobantes',
  rec: 'Recolección de documentación', recoleccion: 'Recolección de documentación', tit: 'Estudio de títulos', titulos: 'Estudio de títulos', esc: 'Borrador de escritura', escritura: 'Borrador de escritura', ganancias: 'Ganancias y Bienes Personales' };
const PROFESION_DE = { 'Vencimientos': 'Abogados', 'Liquidador de juicios': 'Abogados', 'Carga de comprobantes': 'Contadores', 'Recolección de documentación': 'Contadores', 'Ganancias y Bienes Personales': 'Contadores', 'Estudio de títulos': 'Escribanos', 'Borrador de escritura': 'Escribanos' };

function resumir(eventos, anotados, opts) {
  opts = opts || {};
  if (opts.dias) { const desde = new Date(Date.parse(opts.hoy || new Date().toISOString()) - opts.dias * 864e5).toISOString(); eventos = eventos.filter(x => String(x.fecha) >= desde); anotados = anotados.filter(x => String(x.fecha) >= desde); }
  const cuenta = (arr, f) => { const m = {}; arr.forEach(x => { const k = f(x); if (k !== null && k !== undefined && k !== '') m[k] = (m[k] || 0) + 1; }); return m; };
  const orden = m => Object.entries(m).sort((a, b) => b[1] - a[1]);
  const unicos = (arr, k) => new Set(arr.map(x => x[k]).filter(Boolean)).size;
  const visitas = eventos.filter(x => x.evento === 'visita'), clics = eventos.filter(x => x.evento === 'clic'), usos = eventos.filter(x => x.evento === 'uso');

  // demanda por herramienta: clics en "Probar", pedidos de aviso, aperturas y usos dentro de la app, y elecciones en el formulario
  const dem = {}; Object.values(HERRAMIENTAS).forEach(n => dem[n] = { herramienta: n, profesion: PROFESION_DE[n], probar: 0, avisame: 0, abrir: 0, usos: 0, anotados: 0, visitantes: {} });
  const sumar = (key, campo, vis) => { const n = HERRAMIENTAS[key]; if (!n) return; dem[n][campo]++; if (vis) dem[n].visitantes[vis] = 1; };
  clics.forEach(c => { const [tipo, key] = String(c.elemento || '').split(':'); if (tipo === 'probar') sumar(key, 'probar', c.visitante); if (tipo === 'avisame') sumar(key, 'avisame', c.visitante); if (tipo === 'abrir') sumar(key, 'abrir', c.visitante); });
  usos.forEach(u => sumar(u.herramienta, 'usos', u.visitante));
  anotados.forEach(a => String(a.herramientas || '').split(',').map(s => s.trim()).filter(Boolean).forEach(k => sumar(k, 'anotados')));
  const demanda = Object.values(dem).map(d => ({ ...d, visitantes: Object.keys(d.visitantes).length, puntaje: d.probar + 2 * d.avisame + d.usos + 5 * d.anotados }))
    .sort((a, b) => b.puntaje - a.puntaje);

  // origen: visitas, anotados y conversión por fuente y por anuncio
  const porPersona = (arr, f) => { const m = {}; arr.forEach(x => { const k = f(x); if (k) (m[k] = m[k] || new Set()).add(x.visitante || x.sesion || Math.random()); }); Object.keys(m).forEach(k => m[k] = m[k].size); return m; };
  const visPorFuente = porPersona(visitas, x => x.fuente || 'directo'), anoPorFuente = cuenta(anotados, x => x.fuente || 'directo');
  const fuentes = Object.keys({ ...visPorFuente, ...anoPorFuente }).map(f => ({ fuente: f, visitas: visPorFuente[f] || 0, anotados: anoPorFuente[f] || 0, conversion: visPorFuente[f] ? Math.round(1000 * (anoPorFuente[f] || 0) / visPorFuente[f]) / 10 : null }))
    .sort((a, b) => b.visitas - a.visitas);
  const clave = x => [x.campana || '(sin campaña)', x.contenido || '(sin anuncio)'].join(' · ');
  const visPorAnuncio = porPersona(visitas.filter(x => x.campana || x.contenido), clave), anoPorAnuncio = cuenta(anotados.filter(x => x.campana || x.contenido), clave);
  const anuncios = Object.keys({ ...visPorAnuncio, ...anoPorAnuncio }).map(k => ({ anuncio: k, visitas: visPorAnuncio[k] || 0, anotados: anoPorAnuncio[k] || 0 })).sort((a, b) => b.anotados - a.anotados || b.visitas - a.visitas);

  // embudo
  const vis = unicos(visitas, 'visitante');
  const vieronHerr = unicos(eventos.filter(x => (x.evento === 'seccion_vista' && /abogados|contadores|escribanos/.test(x.seccion)) || x.pagina === 'herramientas'), 'visitante');
  const interes = unicos(clics.filter(c => /^(probar|avisame|abrir):/.test(c.elemento)), 'visitante');
  const abrieron = unicos(clics.filter(c => /^(anotarme|avisame:)/.test(c.elemento)), 'visitante');
  const embudo = [['Visitantes', vis], ['Vieron las herramientas', vieronHerr], ['Hicieron clic en una herramienta', interes], ['Abrieron el formulario', abrieron], ['Se anotaron', unicos(anotados, 'visitante') || anotados.length]];

  // por día (para el gráfico)
  const dia = x => String(x.fecha).slice(0, 10), vd = cuenta(visitas, dia), ad = cuenta(anotados, dia);
  const porDia = Object.keys({ ...vd, ...ad }).sort().map(d => ({ dia: d, visitas: vd[d] || 0, anotados: ad[d] || 0 }));

  return {
    generado: opts.hoy || new Date().toISOString(),
    totales: { visitas: visitas.length, visitantes: vis, clics: clics.length, anotados: anotados.length, conversion: vis ? Math.round(1000 * anotados.length / vis) / 10 : 0,
      celular: visitas.length ? Math.round(100 * visitas.filter(x => Number(x.ancho) < 700).length / visitas.length) : 0 },
    demanda, profesiones: orden(cuenta(anotados, x => x.profesion || '(sin dato)')), provincias: orden(cuenta(anotados, x => x.provincia || '(sin dato)')),
    fuentes, anuncios, embudo, porDia,
    clicsPorElemento: orden(cuenta(clics, x => x.elemento)).slice(0, 25), clicsPorSeccion: orden(cuenta(clics, x => x.seccion)),
    anotados: anotados.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).map(a => ({ fecha: a.fecha, nombre: a.nombre, profesion: a.profesion, whatsapp: a.whatsapp, email: a.email,
      provincia: a.provincia, tamano: a.tamano, herramientas: String(a.herramientas || '').split(',').map(s => HERRAMIENTAS[s.trim()] || s.trim()).filter(Boolean).join(', '), fuente: a.fuente, campana: a.campana, contenido: a.contenido, estado: a.estado })),
  };
}
if (typeof module !== 'undefined') module.exports = { resumir, HOJAS, HERRAMIENTAS };
