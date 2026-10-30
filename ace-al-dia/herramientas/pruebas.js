// Pruebas con datos inventados de todas las herramientas. Correr: node pruebas.js
const assert = require('assert');
const Cal = require('./calendario'), Liq = require('./liquidador'), Comp = require('./comprobantes'), Rec = require('./recoleccion'), Tit = require('./titulos'), Esc = require('./escritura');
let ok = 0; const t = (n, f) => { f(); ok++; console.log('✓', n); };

// ---------- vencimientos ----------
t('feriados y fines de semana son inhábiles', () => {
  assert.equal(Cal.esHabil(Cal.parse('2026-11-23')), false);          // Soberanía trasladado
  assert.equal(Cal.esHabil(Cal.parse('2026-11-21')), false);          // sábado
  assert.equal(Cal.esHabil(Cal.parse('2026-11-24')), true);
  assert.equal(Cal.esHabil(Cal.parse('2026-07-22')), false);          // feria de invierno
  assert.equal(Cal.esHabil(Cal.parse('2026-07-22'), { ambito: 'ninguna' }), true);
  assert.equal(Cal.esHabil(Cal.parse('2026-12-07'), { noLaborablesInhabiles: false }), true);
});
t('plazo de 5 días notificado el jueves 19/11/2026 saltea el finde y el feriado del 23/11', () => {
  const v = Cal.vencimiento('2026-11-19', 5);
  assert.equal(v.vence, '2026-11-27'); assert.equal(v.gracia, '2026-11-30');
  assert.ok(v.salteados.some(s => /Soberanía/.test(s.motivo)));
});
t('plazo de 15 días que cruza la feria de enero', () => {
  const v = Cal.vencimiento('2026-12-22', 15);
  // hábiles: 23, 24, 28, 29, 30, 31/12 (25 Navidad); enero entero de feria; 1 a 5/2, 10, 11, 12 y 15/2 (8 y 9 Carnaval)
  assert.equal(v.vence, '2027-02-15'); assert.ok(v.salteados.some(s => /Feria de enero/.test(s.motivo)));
});
t('días hábiles que faltan', () => { assert.equal(Cal.habilesHasta('2026-11-19', '2026-11-27'), 5); assert.equal(Cal.habilesHasta('2026-11-27', '2026-11-27'), 0); assert.ok(Cal.habilesHasta('2026-11-30', '2026-11-27') < 0); });
t('archivo de calendario .ics', () => { const s = Cal.ics([{ fecha: '2026-11-27', titulo: 'Vence traslado · Expte. 23.418/2025', detalle: 'Contestar demanda' }]); assert.ok(s.includes('DTSTART;VALUE=DATE:20261127')); assert.ok(s.includes('TRIGGER:-P2D')); });

// ---------- liquidador ----------
t('interés simple por tramos de tasa', () => {
  const L = Liq.liquidar({ capital: 1000000, desde: '2026-01-01', hasta: '2026-12-31', tramos: [{ desde: '2026-01-01', tasaAnual: 36.5 }, { desde: '2026-07-01', tasaAnual: 73 }] });
  // 181 días al 36,5 % = 181.000; 183 días al 73 % = 366.000
  assert.equal(L.filas[0].interes, 181000); assert.equal(L.filas[1].interes, 366000); assert.equal(L.total, 1547000);
});
t('pago a cuenta se imputa primero a intereses', () => {
  const L = Liq.liquidar({ capital: 1000000, desde: '2026-01-01', hasta: '2026-12-31', tramos: [{ desde: '2025-01-01', tasaAnual: 36.5 }], pagos: [{ fecha: '2026-07-01', monto: 500000 }] });
  // al 1/7: 181.000 de interés; el pago cancela eso y 319.000 de capital -> capital 681.000; segundo tramo: 681.000 × 36,5 % × 183/365
  assert.equal(L.capital, 681000); assert.equal(L.intereses, 124623); assert.equal(L.total, 805623);
  const e = Liq.escrito(L, { caratula: 'Pérez, Juan c/ Transportes del Sur S.A. s/ daños y perjuicios', expediente: '23.418/2025', juzgado: 'el Juzgado Nacional en lo Civil N.º 45', letrado: 'Dra. Ana Torres', tomoFolio: 'T° 120 F° 45 CPACF', parte: 'la actora', tasaDescripcion: 'tasa activa del Banco de la Nación Argentina' });
  assert.ok(e.includes('PRACTICA LIQUIDACIÓN')); assert.ok(e.includes('$ 805.623,00'));
});
t('errores claros', () => { assert.throws(() => Liq.liquidar({ capital: 1, desde: '2026-02-01', hasta: '2026-03-01', tramos: [{ desde: '2026-02-10', tasaAnual: 50 }] }), /Falta la tasa/); });

// ---------- comprobantes ----------
const qr = j => 'https://www.afip.gob.ar/fe/qr/?p=' + Buffer.from(JSON.stringify(j)).toString('base64');
const cuitCon = base => { const w = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]; let s = 0; for (let i = 0; i < 10; i++) s += w[i] * +base[i]; let v = 11 - s % 11; if (v === 11) v = 0; return base + v; };
const CUIT_CLIENTE = cuitCon('2733445566'), CUIT_PROV = cuitCon('3071234567');
t('verificador de CUIT', () => { assert.ok(Comp.cuitValido(CUIT_CLIENTE)); assert.ok(!Comp.cuitValido('20123456780')); });
t('lee el QR de una factura A', () => {
  const c = Comp.desdeQR(qr({ ver: 1, fecha: '2026-10-14', cuit: +CUIT_PROV, ptoVta: 4, tipoCmp: 1, nroCmp: 12873, importe: 220704, moneda: 'PES', ctz: 1, tipoDocRec: 80, nroDocRec: +CUIT_CLIENTE, tipoCodAut: 'E', codAut: 76123456789012 }));
  assert.equal(c.tipo, 'Factura A'); assert.equal(c.comprobante, '00004-00012873'); assert.equal(c.periodo, '2026-10'); assert.equal(c.importePesos, 220704); assert.deepEqual(c.alertas, []);
  const a = Comp.asignar(c, [{ nombre: 'Marina Rodríguez', cuit: CUIT_CLIENTE }]); assert.equal(a.operacion, 'Compra'); assert.equal(a.cliente, 'Marina Rodríguez');
});
t('nota de crédito en dólares resta en el resumen', () => {
  const clientes = [{ nombre: 'Marina Rodríguez', cuit: CUIT_CLIENTE }];
  const f = Comp.asignar(Comp.desdeQR(qr({ fecha: '2026-10-02', cuit: +CUIT_CLIENTE, ptoVta: 1, tipoCmp: 11, nroCmp: 88, importe: 150000, moneda: 'PES', ctz: 1, tipoDocRec: 99, nroDocRec: 0, codAut: 1 })), clientes);
  const nc = Comp.asignar(Comp.desdeQR(qr({ fecha: '2026-10-20', cuit: +CUIT_CLIENTE, ptoVta: 1, tipoCmp: 13, nroCmp: 3, importe: 10, moneda: 'DOL', ctz: 1450, tipoDocRec: 99, nroDocRec: 0, codAut: 2 })), clientes);
  const r = Comp.resumen([f, nc]); assert.equal(r.length, 1); assert.equal(r[0].operacion, 'Venta'); assert.equal(r[0].total, 150000 - 14500);
  assert.ok(Comp.csv([f, nc]).split('\r\n').length === 3);
});
t('rechaza un QR que no es de factura', () => { assert.throws(() => Comp.desdeQR('https://example.com/?p=abc'), /no es el QR/); });

// ---------- recolección ----------
t('mensajes que suben de tono y enlace de WhatsApp', () => {
  let c = { nombre: 'Marina Rodríguez', telefono: '11 5555-1234', pedidos: { 'las facturas de compra': false, 'el resumen del banco': false, 'las ventas': true } };
  assert.equal(Rec.estado(c).texto, 'Faltan 2 de 3');
  const m0 = Rec.mensaje(c, '2026-10', { estudio: 'Estudio Gómez', vence: '2026-11-10' }); assert.ok(m0.startsWith('Hola Marina')); assert.ok(m0.includes('las facturas de compra y el resumen del banco'));
  c = Rec.registrarAviso(Rec.registrarAviso(c, '2026-11-01'), '2026-11-04'); assert.ok(Rec.mensaje(c, '2026-10', {}).includes('multas'));
  assert.ok(Rec.enlace(c, 'hola').startsWith('https://wa.me/5491155551234?text='));
  assert.equal(Rec.aEscribirHoy([c], '2026-11-05').length, 0); assert.equal(Rec.aEscribirHoy([c], '2026-11-07').length, 1);
});

// ---------- estudio de títulos ----------
t('detecta quiebre de cadena, nombre mal escrito y falta de inscripción', () => {
  const r = Tit.estudiar([
    { fecha: '1994-05-12', acto: 'Compraventa', transmitentes: ['Roberto Pérez'], adquirentes: ['Carlos Alberto Gómez'], escritura: '211', registro: '1520', inscripcion: { matricula: 'FR 45-1234', fecha: '1994-07-01' } },
    { fecha: '2009-03-20', acto: 'Donación', transmitentes: ['Carlos Alberto Gomes'], adquirentes: ['Laura Beatriz Gómez'], escritura: '88', registro: '433', inscripcion: { matricula: 'FR 45-1234', fecha: '2009-05-02' } },
    { fecha: '2018-09-03', acto: 'Adjudicación por sucesión', transmitentes: ['Laura Beatriz Gómez'], adquirentes: ['Laura Beatriz Gómez', 'Pedro Gómez'], inscripcion: null },
  ], { hoy: '2026-10-30', titularActual: 'Laura B. Gómez' });
  const txt = r.observaciones.map(o => o.texto).join('\n');
  assert.ok(/Gomes.*no coincide exacto/.test(txt)); assert.ok(/sin inscripción/.test(txt)); assert.equal(r.resultado, 'Con observaciones importantes');
  assert.equal(Tit.compararNombres('GÓMEZ, Laura Beatriz', 'Laura Beatriz Gomez'), 'parecido'); assert.equal(Tit.compararNombres('Juan Pérez', 'María López'), 'distinto'); assert.equal(Tit.compararNombres('Laura B. Gómez', 'Laura Beatriz Gómez'), 'parecido'); assert.equal(Tit.compararNombres('Laura Beatriz Gómez', 'Laura B. Gómez'), 'parecido');
});

// ---------- borrador de escritura ----------
t('números en letras', () => { assert.equal(Esc.enLetras(95000), 'noventa y cinco mil'); assert.equal(Esc.enLetras(21500), 'veintiún mil quinientos'); assert.equal(Esc.enLetras(1250000), 'un millón doscientos cincuenta mil'); assert.equal(Esc.enLetras(31000000), 'treinta y un millones'); });
t('lee el código del DNI', () => {
  const p = Esc.leerDNI('00512345678@GOMEZ@LAURA BEATRIZ@F@28456112@B@14/02/1981@10/05/2019@200');
  assert.equal(p.apellido, 'GOMEZ'); assert.equal(p.dni, '28456112'); assert.equal(p.nacimiento, '1981-02-14');
  assert.throws(() => Esc.leerDNI('hola'), /formato del DNI/);
});
t('borrador con datos y faltantes marcados', () => {
  const v = { ...Esc.leerDNI('00512345678@GOMEZ@LAURA BEATRIZ@F@28456112@B@14/02/1981@10/05/2019@200'), estadoCivil: 'soltera', domicilio: 'Av. Pellegrini 1500, Rosario', cuit: '27-28456112-6' };
  const b = Esc.borrador({ lugar: 'ciudad de Rosario, provincia de Santa Fe', fecha: '2026-11-20', escribano: 'Sofía Martínez', registro: '210', vendedores: [v],
    compradores: [{ nombre: 'Martín Alejandro', apellido: 'Ríos', dni: '31902774', estadoCivil: 'casado', domicilio: 'Mendoza 900, Rosario' }],
    inmueble: { calle: 'Corrientes', numero: '1234', unidad: '3 B', localidad: 'Rosario', matricula: '16-12345/3', nomenclatura: 'Secc. 1 Manz. 45 Gráf. 12', superficie: '68 m²' },
    titulo: { acto: 'adjudicación por sucesión', fecha: '2018-09-03', escribano: 'Juan Paz', registro: '15' }, precio: 95000 });
  assert.ok(b.texto.includes('LAURA BEATRIZ GOMEZ')); assert.ok(b.texto.includes('28.456.112')); assert.ok(b.texto.includes('NOVENTA Y CINCO MIL'));
  assert.ok(b.faltan.includes('Comprador 1: nombre del cónyuge (para el asentimiento)'));
  assert.ok(b.marcas.find(m => m.dato === 'Vendedor 1: DNI').fuente.startsWith('DNI'));
});

console.log(`\n${ok} pruebas OK`);
