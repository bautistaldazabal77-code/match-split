// Estudio de títulos: con los datos de cada antecedente arma la cadena de dominio y marca lo que el escribano tiene que mirar.
// En esta versión los datos de cada escritura se cargan a mano (o los completa la lectura con IA de las escrituras escaneadas, en una etapa siguiente).
// Las observaciones son alertas para revisar, no un dictamen: el estudio lo firma el escribano.
(function (root) {
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  function lev(a, b) { const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]); for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  // compara dos nombres: 'igual', 'parecido' (posible error de tipeo, orden distinto o nombre incompleto) o 'distinto'
  function compararNombres(a, b) {
    const x = norm(a), y = norm(b); if (!x || !y) return 'distinto'; if (x === y) return 'igual';
    const tx = x.split(' ').sort().join(' '), ty = y.split(' ').sort().join(' '); if (tx === ty) return 'parecido';
    const sx = new Set(x.split(' ')), sy = new Set(y.split(' ')), com = [...sx].filter(t => sy.has(t)).length;
    if (com >= 2 && (com === sx.size || com === sy.size)) return 'parecido';
    const cubre = (cor, lar) => cor.length >= 2 && cor.every(t => lar.includes(t) || (t.length === 1 && lar.some(u => u[0] === t)));
    if (cubre([...sx], [...sy]) || cubre([...sy], [...sx])) return 'parecido';
    if (lev(tx, ty) <= Math.max(2, Math.round(Math.max(tx.length, ty.length) * .12))) return 'parecido';
    return 'distinto';
  }
  const personas = xs => (Array.isArray(xs) ? xs : [xs]).filter(Boolean);
  const anioDe = f => +String(f).slice(0, 4);

  // antecedentes: [{fecha:'AAAA-MM-DD', acto, transmitentes:[], adquirentes:[], escritura, registro, escribano, inscripcion:{matricula, asiento, fecha}|null,
  //   poderes:[{apoderado, poderdante, vigente:boolean}], asentimientoConyugal:boolean|null, nota}]
  // opts: {hoy, aniosRevisar: 20, titularActual}
  function estudiar(antecedentes, opts = {}) {
    const hoy = opts.hoy || new Date().toISOString().slice(0, 10), anios = opts.aniosRevisar ?? 20;
    const ant = [...antecedentes].sort((a, b) => a.fecha < b.fecha ? -1 : 1), obs = [], cadena = [];
    const add = (i, nivel, texto) => obs.push({ antecedente: i, nivel, texto });
    if (!ant.length) throw new Error('Cargá al menos un antecedente.');
    ant.forEach((a, i) => {
      const ref = `${a.acto} del ${a.fecha.split('-').reverse().join('/')}`;
      cadena.push({ ...a, ref });
      if (!a.inscripcion || !a.inscripcion.matricula) add(i, 'alta', `${ref}: no figura la inscripción en el Registro de la Propiedad.`);
      else if (a.inscripcion.fecha && a.inscripcion.fecha < a.fecha) add(i, 'media', `${ref}: la fecha de inscripción es anterior a la del acto; revisar.`);
      if (/suces|hereditari|declaratoria/i.test(a.acto) && !(a.inscripcion && a.inscripcion.matricula)) add(i, 'alta', `${ref}: transmisión hereditaria sin inscripción (falta inscribir la declaratoria o el testamento).`);
      if (/compraventa|donaci|venta/i.test(a.acto) && a.asentimientoConyugal === false) add(i, 'media', `${ref}: no consta el asentimiento conyugal (art. 470 del Código Civil y Comercial); verificar si correspondía.`);
      if (/donaci/i.test(a.acto)) add(i, 'info', `${ref}: título de origen donación; verificar si corresponde alguna observación según la fecha del acto y la Ley 27.587 (diciembre de 2020).`);
      (a.poderes || []).forEach(p => { if (p.vigente === false) add(i, 'alta', `${ref}: actuó un apoderado (${p.apoderado}) con un poder que no estaba vigente.`); });
      if (i > 0) {
        const prev = ant[i - 1], adq = personas(prev.adquirentes), tra = personas(a.transmitentes);
        tra.forEach(t => {
          const mejor = adq.map(x => ({ x, r: compararNombres(t, x) })).sort((p, q) => ['igual', 'parecido', 'distinto'].indexOf(p.r) - ['igual', 'parecido', 'distinto'].indexOf(q.r))[0];
          if (!mejor || mejor.r === 'distinto') add(i, 'alta', `${ref}: transmite ${t}, que no figura como adquirente en el antecedente anterior (${adq.join(', ') || 'sin datos'}). Posible quiebre de la cadena.`);
          else if (mejor.r === 'parecido') add(i, 'media', `${ref}: el nombre "${t}" no coincide exacto con "${mejor.x}" del antecedente anterior. Revisar si es error de tipeo o nombre incompleto.`);
        });
        adq.forEach(x => { if (!tra.some(t => compararNombres(t, x) !== 'distinto') && !/suces|hereditari|declaratoria/i.test(a.acto)) add(i, 'media', `${ref}: ${x} era cotitular y no aparece transmitiendo; verificar que se transmita el 100 %.`); });
      }
    });
    const desde = anioDe(ant[0].fecha), hasta = anioDe(hoy);
    if (hasta - desde < anios) add(0, 'media', `La cadena cargada empieza en ${desde}: cubre ${hasta - desde} años. Conviene llegar a un antecedente de hace al menos ${anios} años.`);
    const ultimo = ant[ant.length - 1], titulares = personas(ultimo.adquirentes);
    if (opts.titularActual && !titulares.some(t => compararNombres(t, opts.titularActual) !== 'distinto')) add(ant.length - 1, 'alta', `El vendedor actual (${opts.titularActual}) no coincide con el último adquirente (${titulares.join(', ')}).`);
    const orden = { alta: 0, media: 1, info: 2 }; obs.sort((a, b) => orden[a.nivel] - orden[b.nivel] || a.antecedente - b.antecedente);
    return { cadena, observaciones: obs, titulares, cubreAnios: hasta - desde, resultado: obs.some(o => o.nivel === 'alta') ? 'Con observaciones importantes' : obs.some(o => o.nivel === 'media') ? 'Revisar puntos menores' : 'Sin observaciones' };
  }

  const Titulos = { estudiar, compararNombres, norm };
  if (typeof module !== 'undefined' && module.exports) module.exports = Titulos; else root.Titulos = Titulos;
})(typeof self !== 'undefined' ? self : this);
