// Calendario judicial argentino: feriados nacionales, días no laborables y ferias, y cómputo de plazos en días hábiles.
// Fuentes 2026: Ley 27.399 y Resolución 164/2025 de Jefatura de Gabinete (no laborables turísticos: 23/3, 10/7 y 7/12);
// feria de invierno 20 al 31/7/2026 (CSJN, Acordada 11/2026; SCBA, Acuerdo 4229). 2027 es provisorio (traslados calculados con la regla de la ley).
(function (root) {
  const FERIADOS = [
    // 2026
    ['2026-01-01', 'Año Nuevo', 'inamovible'], ['2026-02-16', 'Carnaval', 'inamovible'], ['2026-02-17', 'Carnaval', 'inamovible'],
    ['2026-03-23', 'Día no laborable con fines turísticos', 'no_laborable'], ['2026-03-24', 'Día Nacional de la Memoria por la Verdad y la Justicia', 'inamovible'],
    ['2026-04-02', 'Día del Veterano y de los Caídos en la Guerra de Malvinas · Jueves Santo', 'inamovible'], ['2026-04-03', 'Viernes Santo', 'inamovible'],
    ['2026-05-01', 'Día del Trabajador', 'inamovible'], ['2026-05-25', 'Día de la Revolución de Mayo', 'inamovible'],
    ['2026-06-15', 'Paso a la Inmortalidad del Gral. Martín Miguel de Güemes (trasladado del 17/6)', 'trasladable'],
    ['2026-06-20', 'Paso a la Inmortalidad del Gral. Manuel Belgrano', 'inamovible'], ['2026-07-09', 'Día de la Independencia', 'inamovible'],
    ['2026-07-10', 'Día no laborable con fines turísticos', 'no_laborable'], ['2026-08-17', 'Paso a la Inmortalidad del Gral. José de San Martín', 'trasladable'],
    ['2026-10-12', 'Día del Respeto a la Diversidad Cultural', 'trasladable'], ['2026-11-23', 'Día de la Soberanía Nacional (trasladado del 20/11)', 'trasladable'],
    ['2026-12-07', 'Día no laborable con fines turísticos', 'no_laborable'], ['2026-12-08', 'Inmaculada Concepción de María', 'inamovible'], ['2026-12-25', 'Navidad', 'inamovible'],
    // 2027 (provisorio)
    ['2027-01-01', 'Año Nuevo', 'inamovible'], ['2027-02-08', 'Carnaval', 'inamovible'], ['2027-02-09', 'Carnaval', 'inamovible'],
    ['2027-03-24', 'Día Nacional de la Memoria por la Verdad y la Justicia', 'inamovible'], ['2027-03-25', 'Jueves Santo', 'no_laborable'], ['2027-03-26', 'Viernes Santo', 'inamovible'],
    ['2027-04-02', 'Día del Veterano y de los Caídos en la Guerra de Malvinas', 'inamovible'], ['2027-05-01', 'Día del Trabajador', 'inamovible'], ['2027-05-25', 'Día de la Revolución de Mayo', 'inamovible'],
    ['2027-06-20', 'Paso a la Inmortalidad del Gral. Manuel Belgrano', 'inamovible'], ['2027-06-21', 'Paso a la Inmortalidad del Gral. Güemes (trasladado del 17/6)', 'trasladable'],
    ['2027-07-09', 'Día de la Independencia', 'inamovible'], ['2027-08-16', 'Paso a la Inmortalidad del Gral. San Martín (trasladado del 17/8)', 'trasladable'],
    ['2027-10-11', 'Día del Respeto a la Diversidad Cultural (trasladado del 12/10)', 'trasladable'], ['2027-11-20', 'Día de la Soberanía Nacional', 'trasladable'],
    ['2027-12-08', 'Inmaculada Concepción de María', 'inamovible'], ['2027-12-25', 'Navidad', 'inamovible'],
  ].map(([fecha, nombre, tipo]) => ({ fecha, nombre, tipo }));

  // ferias judiciales por ámbito (ambas fechas inclusive)
  const FERIAS = {
    nacion: [['2026-01-01', '2026-01-31', 'Feria de enero'], ['2026-07-20', '2026-07-31', 'Feria de invierno (Acordada 11/2026)'], ['2027-01-01', '2027-01-31', 'Feria de enero']],
    pba: [['2026-01-01', '2026-01-31', 'Feria de enero'], ['2026-07-20', '2026-07-31', 'Feria de invierno (Acuerdo 4229)'], ['2027-01-01', '2027-01-31', 'Feria de enero']],
    ninguna: [],
  };
  const ANIOS = [2026, 2027];

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  const sumarDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const fmt = d => `${DIAS[d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

  // motivo por el que un día es inhábil, o null si es hábil. opts: {ambito, noLaborablesInhabiles, extras:[{fecha, nombre}]}
  function motivoInhabil(d, opts = {}) {
    const s = iso(d), dow = d.getDay();
    if (dow === 0 || dow === 6) return dow === 0 ? 'domingo' : 'sábado';
    const f = FERIADOS.find(x => x.fecha === s);
    if (f && (f.tipo !== 'no_laborable' || opts.noLaborablesInhabiles !== false)) return f.nombre;
    const ex = (opts.extras || []).find(x => x.fecha === s); if (ex) return ex.nombre || 'día inhábil';
    const fe = (FERIAS[opts.ambito || 'nacion'] || []).find(([a, b]) => s >= a && s <= b); if (fe) return fe[2];
    return null;
  }
  const esHabil = (d, opts) => motivoInhabil(d, opts) === null;

  // plazo procesal: se cuenta desde el día hábil siguiente a la notificación y vence al terminar el último día hábil
  // (CPCCN, art. 156). Devuelve también el plazo de gracia: las dos primeras horas hábiles del día hábil siguiente (art. 124).
  function vencimiento(fechaNotif, dias, opts = {}) {
    if (!(dias > 0)) throw new Error('El plazo tiene que ser de al menos un día.');
    const ini = typeof fechaNotif === 'string' ? parse(fechaNotif) : fechaNotif;
    const anio = ini.getFullYear(); if (!ANIOS.includes(anio)) throw new Error(`No tengo cargado el calendario de ${anio}.`);
    let d = ini, n = 0; const salteados = [];
    while (n < dias) { d = sumarDias(d, 1); const m = motivoInhabil(d, opts); if (m) { if (!/sábado|domingo/.test(m)) salteados.push({ fecha: iso(d), motivo: m }); } else n++; if (!ANIOS.includes(d.getFullYear())) throw new Error('El vencimiento cae fuera del calendario cargado.'); }
    let g = d; do g = sumarDias(g, 1); while (!esHabil(g, opts));
    const sal = []; for (const s of salteados) if (!sal.some(x => x.motivo === s.motivo)) sal.push(s);
    return { vence: iso(d), venceTexto: fmt(d), gracia: iso(g), graciaTexto: fmt(g), salteados: sal };
  }
  // días hábiles que faltan desde hoy hasta una fecha (0 si vence hoy, negativo si ya venció)
  function habilesHasta(hoy, fecha, opts = {}) {
    let a = typeof hoy === 'string' ? parse(hoy) : hoy, b = parse(fecha);
    if (iso(a) === iso(b)) return 0;
    const sgn = b > a ? 1 : -1; let n = 0, d = a;
    while (iso(d) !== iso(b)) { d = sumarDias(d, sgn); if (esHabil(d, opts)) n += sgn; }
    return n;
  }
  // archivo .ics para agendar un vencimiento en el calendario del celular o de la compu
  function ics(eventos) {
    const esc = s => String(s).replace(/[\\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
    const out = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ACE Al Dia//Vencimientos//ES'];
    eventos.forEach((e, i) => { const d = e.fecha.replace(/-/g, ''), dn = iso(sumarDias(parse(e.fecha), 1)).replace(/-/g, '');
      out.push('BEGIN:VEVENT', `UID:ace-${d}-${i}@acealdia`, `DTSTAMP:${d}T090000`, `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${dn}`, `SUMMARY:${esc(e.titulo)}`, `DESCRIPTION:${esc(e.detalle || '')}`,
        'BEGIN:VALARM', 'TRIGGER:-P2D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.titulo)}`, 'END:VALARM', 'END:VEVENT'); });
    out.push('END:VCALENDAR'); return out.join('\r\n');
  }

  const Calendario = { FERIADOS, FERIAS, ANIOS, iso, parse, fmt, motivoInhabil, esHabil, vencimiento, habilesHasta, ics };
  if (typeof module !== 'undefined' && module.exports) module.exports = Calendario; else root.Calendario = Calendario;
})(typeof self !== 'undefined' ? self : this);
