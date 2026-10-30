// Liquidador de juicios: capital + intereses por tramos de tasa (interés simple, días corridos sobre año de 365), y el escrito de liquidación.
// Las tasas las carga el usuario (por ejemplo, la tasa activa del Banco Nación de cada período): la herramienta no inventa tasas.
(function (root) {
  const DIA = 864e5;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  const dmy = s => s.split('-').reverse().join('/');
  const pesos = n => '$ ' + n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const r2 = n => Math.round(n * 100) / 100;

  // datos: {capital, desde, hasta, tramos:[{desde, tasaAnual}] (tasa en %), pagos:[{fecha, monto}] (a cuenta, se imputan primero a intereses)}
  function liquidar(datos) {
    const { capital, desde, hasta } = datos; const tramos = [...(datos.tramos || [])].sort((a, b) => a.desde < b.desde ? -1 : 1);
    if (!(capital > 0)) throw new Error('Cargá el capital de condena.');
    if (!desde || !hasta || parse(hasta) <= parse(desde)) throw new Error('La fecha final tiene que ser posterior a la de inicio.');
    if (!tramos.length || tramos[0].desde > desde) throw new Error('Falta la tasa para el inicio del período: el primer tramo tiene que empezar el ' + dmy(desde) + ' o antes.');
    const pagos = [...(datos.pagos || [])].filter(p => p.monto > 0).sort((a, b) => a.fecha < b.fecha ? -1 : 1);
    for (const p of pagos) if (p.fecha <= desde || p.fecha > hasta) throw new Error('Hay un pago fuera del período liquidado (' + dmy(p.fecha) + ').');
    // cortes del período: inicio, cambios de tasa y pagos
    const cortes = new Set([desde, hasta]); tramos.forEach(t => { if (t.desde > desde && t.desde < hasta) cortes.add(t.desde); }); pagos.forEach(p => cortes.add(p.fecha));
    const fechas = [...cortes].sort();
    let cap = capital, intAcum = 0; const filas = [];
    for (let i = 0; i < fechas.length - 1; i++) {
      const a = fechas[i], b = fechas[i + 1], dias = Math.round((parse(b) - parse(a)) / DIA);
      const tasa = tramos.filter(t => t.desde <= a).pop().tasaAnual, int = r2(cap * tasa / 100 * dias / 365);
      intAcum = r2(intAcum + int); filas.push({ desde: a, hasta: b, dias, tasaAnual: tasa, base: cap, interes: int });
      for (const p of pagos.filter(p => p.fecha === b)) {
        const aInt = Math.min(p.monto, intAcum), aCap = r2(p.monto - aInt); intAcum = r2(intAcum - aInt); cap = r2(Math.max(0, cap - aCap));
        filas.push({ pago: true, fecha: b, monto: p.monto, aIntereses: aInt, aCapital: aCap, capitalRestante: cap });
      }
    }
    const interesesTotales = r2(filas.filter(f => !f.pago).reduce((s, f) => s + f.interes, 0));
    return { capitalOriginal: capital, capital: cap, intereses: intAcum, interesesDevengados: interesesTotales, total: r2(cap + intAcum), filas, desde, hasta };
  }

  // texto del escrito; d = {caratula, expediente, juzgado, letrado, tomoFolio, parte, tasaDescripcion}
  function escrito(liq, d = {}) {
    const lineas = liq.filas.map(f => f.pago
      ? `   Pago a cuenta del ${dmy(f.fecha)}: ${pesos(f.monto)} (imputado ${pesos(f.aIntereses)} a intereses y ${pesos(f.aCapital)} a capital).`
      : `   Del ${dmy(f.desde)} al ${dmy(f.hasta)}: ${f.dias} días al ${f.tasaAnual.toLocaleString('es-AR')} % anual sobre ${pesos(f.base)} = ${pesos(f.interes)}.`);
    return `PRACTICA LIQUIDACIÓN

Señor Juez:

${d.letrado || '[LETRADO]'}, abogado, ${d.tomoFolio || '[T° y F°]'}, por la representación de ${d.parte || '[PARTE]'} en los autos caratulados "${d.caratula || '[CARÁTULA]'}" (Expte. ${d.expediente || '[N°]'}), que tramitan ante ${d.juzgado || '[JUZGADO]'}, a V.S. respetuosamente digo:

I. OBJETO
Que vengo a practicar liquidación de capital e intereses conforme lo resuelto en autos, al ${dmy(liq.hasta)}.

II. LIQUIDACIÓN
1. Capital de condena: ${pesos(liq.capitalOriginal)}.
2. Intereses ${d.tasaDescripcion ? 'a la ' + d.tasaDescripcion : 'a la tasa fijada en la sentencia'}, desde el ${dmy(liq.desde)} hasta el ${dmy(liq.hasta)}:
${lineas.join('\n')}
   Total de intereses: ${pesos(liq.intereses)}.
3. Capital adeudado: ${pesos(liq.capital)}.

TOTAL ADEUDADO AL ${dmy(liq.hasta)}: ${pesos(liq.total)}.

III. PETITORIO
Por lo expuesto, a V.S. solicito:
a) Se tenga por practicada la presente liquidación.
b) Se corra traslado a la contraria y, oportunamente, se la apruebe.

Proveer de conformidad,
SERÁ JUSTICIA.`;
  }

  const Liquidador = { liquidar, escrito, pesos, dmy };
  if (typeof module !== 'undefined' && module.exports) module.exports = Liquidador; else root.Liquidador = Liquidador;
})(typeof self !== 'undefined' ? self : this);
