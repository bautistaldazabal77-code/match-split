// Carga de comprobantes: lee el código QR que ARCA (ex AFIP) exige en toda factura electrónica (RG 4291) y saca los datos del comprobante.
// El QR trae una URL https://www.afip.gob.ar/fe/qr/?p=<JSON en base64> con: fecha, CUIT emisor, punto de venta, tipo y número, importe total,
// moneda, cotización, documento del receptor y CAE. No trae el desglose de neto e IVA: eso queda para la lectura con IA de una etapa siguiente.
// En el navegador, leerArchivo(file) busca el QR en una foto o en un PDF (usa jsQR y pdf.js si están cargados).
(function (root) {
  const TIPOS = { 1: 'Factura A', 2: 'Nota de débito A', 3: 'Nota de crédito A', 4: 'Recibo A', 6: 'Factura B', 7: 'Nota de débito B', 8: 'Nota de crédito B', 9: 'Recibo B',
    11: 'Factura C', 12: 'Nota de débito C', 13: 'Nota de crédito C', 15: 'Recibo C', 19: 'Factura E', 20: 'Nota de débito E', 21: 'Nota de crédito E',
    51: 'Factura M', 52: 'Nota de débito M', 53: 'Nota de crédito M', 81: 'Tique factura A', 82: 'Tique factura B', 83: 'Tique',
    201: 'Factura de crédito electrónica A', 202: 'Nota de débito FCE A', 203: 'Nota de crédito FCE A', 206: 'Factura de crédito electrónica B', 207: 'Nota de débito FCE B',
    208: 'Nota de crédito FCE B', 211: 'Factura de crédito electrónica C', 212: 'Nota de débito FCE C', 213: 'Nota de crédito FCE C' };
  const DOCS = { 80: 'CUIT', 86: 'CUIL', 96: 'DNI', 99: 'Consumidor final' };
  const MONEDAS = { PES: 'Pesos', DOL: 'Dólares', '060': 'Euros' };

  function cuitValido(c) {
    const s = String(c).replace(/\D/g, ''); if (s.length !== 11) return false;
    const w = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]; let t = 0; for (let i = 0; i < 10; i++) t += w[i] * +s[i];
    let v = 11 - (t % 11); if (v === 11) v = 0; if (v === 10) return false; return v === +s[10];
  }
  const fmtCuit = c => { const s = String(c).replace(/\D/g, ''); return s.length === 11 ? `${s.slice(0, 2)}-${s.slice(2, 10)}-${s.slice(10)}` : s; };
  const b64 = s => { s = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''); while (s.length % 4) s += '=';
    if (typeof atob === 'function') return decodeURIComponent(escape(atob(s))); return Buffer.from(s, 'base64').toString('utf8'); };

  // texto leído del QR -> comprobante normalizado (lanza error con un mensaje claro si no es un QR de factura)
  function desdeQR(texto) {
    const m = String(texto).match(/[?&]p=([^&#\s]+)/);
    if (!m || !/afip\.gob\.ar|arca\.gob\.ar/i.test(texto)) throw new Error('El código no es el QR de una factura electrónica de ARCA.');
    let j; try { j = JSON.parse(b64(decodeURIComponent(m[1]))); } catch { throw new Error('El QR está dañado o incompleto: no se pudo leer su contenido.'); }
    const faltan = ['fecha', 'cuit', 'ptoVta', 'tipoCmp', 'nroCmp', 'importe'].filter(k => j[k] === undefined || j[k] === '');
    if (faltan.length) throw new Error('Al QR le faltan datos: ' + faltan.join(', ') + '.');
    const c = {
      fecha: String(j.fecha).slice(0, 10), periodo: String(j.fecha).slice(0, 7), cuitEmisor: fmtCuit(j.cuit), cuitEmisorValido: cuitValido(j.cuit),
      tipoCodigo: +j.tipoCmp, tipo: TIPOS[+j.tipoCmp] || `Tipo ${j.tipoCmp}`, puntoVenta: +j.ptoVta, numero: +j.nroCmp,
      comprobante: `${String(j.ptoVta).padStart(5, '0')}-${String(j.nroCmp).padStart(8, '0')}`, importe: +j.importe, moneda: MONEDAS[j.moneda] || j.moneda || 'Pesos', cotizacion: +(j.ctz || 1),
      receptorTipoDoc: DOCS[+j.tipoDocRec] || (j.tipoDocRec ? `Doc. ${j.tipoDocRec}` : ''), receptorDoc: +j.tipoDocRec === 80 || +j.tipoDocRec === 86 ? fmtCuit(j.nroDocRec) : String(j.nroDocRec || ''),
      autorizacion: j.tipoCodAut === 'A' ? 'CAEA' : 'CAE', codigoAutorizacion: String(j.codAut || ''),
    };
    c.esNotaCredito = /crédito/i.test(c.tipo) && !/^Factura/.test(c.tipo);
    c.importePesos = Math.round(c.importe * (c.moneda === 'Pesos' ? 1 : c.cotizacion) * 100) / 100;
    c.alertas = [];
    if (!c.cuitEmisorValido) c.alertas.push('El CUIT del emisor no pasa la verificación del dígito.');
    if (!c.codigoAutorizacion) c.alertas.push('No tiene código de autorización (CAE).');
    return c;
  }

  // ubica cada comprobante en un cliente del estudio: venta si el cliente lo emitió, compra si lo recibió
  function asignar(comp, clientes) {
    const n = s => String(s).replace(/\D/g, '');
    const em = clientes.find(c => n(c.cuit) === n(comp.cuitEmisor)); if (em) return { ...comp, cliente: em.nombre, operacion: 'Venta' };
    const re = clientes.find(c => n(c.cuit) === n(comp.receptorDoc)); if (re) return { ...comp, cliente: re.nombre, operacion: 'Compra' };
    return { ...comp, cliente: '', operacion: 'Sin asignar' };
  }
  // resumen por cliente y período
  function resumen(comps) {
    const g = {};
    for (const c of comps) { const k = (c.cliente || 'Sin asignar') + '|' + c.periodo + '|' + c.operacion; const s = c.esNotaCredito ? -1 : 1;
      g[k] = g[k] || { cliente: c.cliente || 'Sin asignar', periodo: c.periodo, operacion: c.operacion, cantidad: 0, total: 0 }; g[k].cantidad++; g[k].total = Math.round((g[k].total + s * c.importePesos) * 100) / 100; }
    return Object.values(g).sort((a, b) => (a.cliente + a.periodo).localeCompare(b.cliente + b.periodo));
  }
  // CSV con punto y coma (lo abre bien Excel en español)
  function csv(comps) {
    const cols = [['cliente', 'Cliente'], ['operacion', 'Operación'], ['periodo', 'Período'], ['fecha', 'Fecha'], ['tipo', 'Tipo'], ['comprobante', 'Número'], ['cuitEmisor', 'CUIT emisor'],
      ['receptorTipoDoc', 'Doc. receptor'], ['receptorDoc', 'N.º doc. receptor'], ['moneda', 'Moneda'], ['importe', 'Importe'], ['importePesos', 'Importe en pesos'], ['codigoAutorizacion', 'CAE']];
    const q = v => { const s = typeof v === 'number' ? v.toLocaleString('es-AR', { useGrouping: false, maximumFractionDigits: 2 }) : String(v ?? ''); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    return '﻿' + [cols.map(c => c[1]).join(';'), ...comps.map(c => cols.map(([k]) => q(c[k])).join(';'))].join('\r\n');
  }

  // ---- navegador: buscar el QR en una imagen o un PDF ----
  function qrEnCanvas(cv) {
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    for (const s of [1, .5, .75, 1.5]) {
      let c = cv; if (s !== 1) { c = document.createElement('canvas'); c.width = Math.round(cv.width * s); c.height = Math.round(cv.height * s); c.getContext('2d').drawImage(cv, 0, 0, c.width, c.height); }
      const im = c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height), r = root.jsQR(im.data, im.width, im.height, { inversionAttempts: 'attemptBoth' });
      if (r && r.data) return r.data;
    }
    return null;
  }
  async function leerArchivo(file) {
    if (!root.jsQR) throw new Error('No se pudo cargar el lector de códigos QR.');
    if (/pdf/i.test(file.type) || /\.pdf$/i.test(file.name)) {
      if (!root.pdfjsLib) throw new Error('No se pudo cargar el lector de PDF.');
      const pdf = await root.pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      for (let p = 1; p <= Math.min(pdf.numPages, 3); p++) {
        const page = await pdf.getPage(p);
        for (const scale of [2.5, 4]) { const vp = page.getViewport({ scale }), cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height;
          await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise; const t = qrEnCanvas(cv); if (t) return desdeQR(t); }
      }
      throw new Error('No encontré el código QR en el PDF. ¿Es una factura electrónica?');
    }
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((ok, mal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => mal(new Error('No se pudo abrir la imagen.')); i.src = url; });
      const k = Math.min(1, 2000 / Math.max(img.width, img.height)), cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); const t = qrEnCanvas(cv);
      if (!t) throw new Error('No encontré el código QR en la foto. Probá con una foto más cerca y derecha.'); return desdeQR(t);
    } finally { URL.revokeObjectURL(url); }
  }

  const Comprobantes = { TIPOS, cuitValido, fmtCuit, desdeQR, asignar, resumen, csv, leerArchivo };
  if (typeof module !== 'undefined' && module.exports) module.exports = Comprobantes; else root.Comprobantes = Comprobantes;
})(typeof self !== 'undefined' ? self : this);
