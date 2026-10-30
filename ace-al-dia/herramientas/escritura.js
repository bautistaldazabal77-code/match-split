// Borrador de escritura de compraventa: arma el texto con los datos de las partes y del inmueble, marca de dónde salió cada dato
// y avisa lo que falta. leerDNI() interpreta el código PDF417 del frente del DNI argentino (formato del DNI tarjeta desde 2009)
// para cargar a cada persona sin tipear. El texto es un borrador para que el escribano lo revise y adapte a su protocolo.
(function (root) {
  const U = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
    'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const D = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const C = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  function menorMil(n) { if (n === 100) return 'cien'; const c = Math.floor(n / 100), r = n % 100; let s = C[c];
    if (r) s += (s ? ' ' : '') + (r < 30 ? U[r] : D[Math.floor(r / 10)] + (r % 10 ? ' y ' + U[r % 10] : '')); return s; }
  // número entero a letras (para precios y números de documento en el texto de la escritura)
  function enLetras(n) {
    n = Math.floor(Math.abs(n)); if (n === 0) return 'cero';
    const partes = [], mill = Math.floor(n / 1e6), miles = Math.floor(n / 1e3) % 1e3, resto = n % 1e3;
    const apoc = t => t.replace(/veintiuno$/, 'veintiún').replace(/uno$/, 'un');
    if (mill) partes.push(mill === 1 ? 'un millón' : apoc(enLetras(mill)) + ' millones');
    if (miles) partes.push(miles === 1 ? 'mil' : apoc(menorMil(miles)) + ' mil');
    if (resto) partes.push(menorMil(resto));
    return partes.join(' ');
  }
  const mayus = s => String(s || '').toUpperCase();
  const fmtDni = d => String(d).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fecha = f => { if (!f) return ''; const [y, m, d] = f.split('-').map(Number); const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']; return `${d} de ${MES[m - 1]} de ${y}`; };

  // código PDF417 del DNI: tramite@APELLIDO@NOMBRE@SEXO@DNI@EJEMPLAR@NACIMIENTO@EMISION@CUIL-ish (el formato varía según la versión del documento)
  function leerDNI(texto) {
    const p = String(texto).split('@').map(s => s.trim());
    const fechaDMY = s => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s); return m ? `${m[3]}-${m[2]}-${m[1]}` : ''; };
    if (p.length >= 8 && /^\d{8,}$/.test(p[0]) && /^\d{7,8}$/.test(p[4])) return { apellido: p[1], nombre: p[2], sexo: p[3], dni: p[4], ejemplar: p[5], nacimiento: fechaDMY(p[6]), fuente: 'DNI (código del frente)' };
    if (p.length >= 9 && p[0] === '' && /^\d{7,8}$/.test(p[1])) return { apellido: p[4], nombre: p[5], sexo: p[8], dni: p[1], ejemplar: p[2], nacimiento: fechaDMY(p[7]), fuente: 'DNI (código del dorso, versión anterior)' };
    throw new Error('El código leído no tiene el formato del DNI argentino.');
  }

  // datos: {lugar, fecha, escribano, registro, vendedores:[persona], compradores:[persona], inmueble:{calle, numero, unidad, localidad, partido, nomenclatura, matricula, partida, superficie},
  //   titulo:{acto, fecha, escribano, registro}, precio, moneda:'pesos'|'dólares estadounidenses'}
  // persona: {nombre, apellido, dni, cuit, nacimiento, nacionalidad, estadoCivil, conyuge, domicilio, fuente}
  function revisar(d) {
    const faltan = [], P = (x, pref) => { ['nombre', 'apellido', 'dni', 'estadoCivil', 'domicilio'].forEach(k => { if (!x[k]) faltan.push(`${pref}: ${k === 'estadoCivil' ? 'estado civil' : k}`); });
      if (/casad/i.test(x.estadoCivil || '') && !x.conyuge) faltan.push(`${pref}: nombre del cónyuge (para el asentimiento)`); };
    (d.vendedores || []).forEach((v, i) => P(v, `Vendedor ${i + 1}`)); (d.compradores || []).forEach((c, i) => P(c, `Comprador ${i + 1}`));
    if (!(d.vendedores || []).length) faltan.push('Al menos un vendedor'); if (!(d.compradores || []).length) faltan.push('Al menos un comprador');
    const I = d.inmueble || {}; ['calle', 'numero', 'localidad', 'matricula', 'nomenclatura'].forEach(k => { if (!I[k]) faltan.push(`Inmueble: ${k === 'nomenclatura' ? 'nomenclatura catastral' : k === 'matricula' ? 'matrícula' : k}`); });
    if (!(d.precio > 0)) faltan.push('Precio'); if (!d.titulo || !d.titulo.fecha) faltan.push('Título antecedente');
    return faltan;
  }
  // devuelve {texto, crudo (el texto con cada dato entre marcas \u0002i\u0003…\u0004, para resaltarlo en pantalla), marcas:[{dato, valor, fuente}], faltan}
  function borrador(d) {
    const marcas = [], M = (dato, valor, fuente) => { const v = valor ? String(valor) : `[${dato.toUpperCase()}]`; marcas.push({ dato, valor: valor || '', fuente: fuente || '' }); return `\u0002${marcas.length - 1}\u0003${v}\u0004`; };
    const per = (x, rol) => {
      const nom = M(`${rol}: nombre`, mayus(`${x.nombre || ''} ${x.apellido || ''}`.trim()), x.fuente);
      const dni = x.dni ? `${M(`${rol}: DNI`, fmtDni(x.dni), x.fuente)}` : M(`${rol}: DNI`, '', '');
      const cony = /casad/i.test(x.estadoCivil || '') ? ` en primeras nupcias con ${M(`${rol}: cónyuge`, mayus(x.conyuge), x.fuenteConyuge)}` : '';
      return `${nom}, ${x.nacionalidad || 'argentino/a'}, nacido/a el ${M(`${rol}: nacimiento`, fecha(x.nacimiento), x.fuente)}, titular del Documento Nacional de Identidad número ${dni}, CUIT/CUIL ${M(`${rol}: CUIT`, x.cuit, x.fuenteCuit)}, ${M(`${rol}: estado civil`, x.estadoCivil, x.fuenteEstado)}${cony}, con domicilio en ${M(`${rol}: domicilio`, x.domicilio, x.fuenteDomicilio)}`;
    };
    const I = d.inmueble || {}, t = d.titulo || {}, mon = d.moneda || 'dólares estadounidenses';
    const vend = (d.vendedores || []).map((v, i) => per(v, `Vendedor ${i + 1}`)).join('; y ');
    const comp = (d.compradores || []).map((c, i) => per(c, `Comprador ${i + 1}`)).join('; y ');
    const plural = (d.vendedores || []).length > 1;
    const crudo = `ESCRITURA NÚMERO [N.º]. COMPRAVENTA. En la ${M('Lugar', d.lugar, '')}, a ${M('Fecha', fecha(d.fecha), '')}, ante mí, ${M('Escribano', mayus(d.escribano), '')}, escribano/a titular del Registro Notarial número ${M('Registro', d.registro, '')}, COMPARECEN: por una parte ${vend}, en adelante "LA PARTE VENDEDORA"; y por la otra ${comp}, en adelante "LA PARTE COMPRADORA". Las personas comparecientes son mayores de edad y de mi conocimiento conforme al artículo 306 del Código Civil y Comercial, doy fe. Y LA PARTE VENDEDORA DICE: Que VENDE${plural ? 'N' : ''} a LA PARTE COMPRADORA el inmueble ubicado en ${M('Inmueble: calle', I.calle, I.fuente)} número ${M('Inmueble: número', I.numero, I.fuente)}${I.unidad ? `, unidad funcional ${M('Inmueble: unidad', I.unidad, I.fuente)}` : ''}, de la localidad de ${M('Inmueble: localidad', I.localidad, I.fuente)}${I.partido ? `, partido de ${M('Inmueble: partido', I.partido, I.fuente)}` : ''}, con una superficie de ${M('Inmueble: superficie', I.superficie, I.fuente)}. NOMENCLATURA CATASTRAL: ${M('Inmueble: nomenclatura', I.nomenclatura, I.fuente)}. MATRÍCULA: ${M('Inmueble: matrícula', I.matricula, I.fuente)}. PARTIDA: ${M('Inmueble: partida', I.partida, I.fuente)}. LE CORRESPONDE a LA PARTE VENDEDORA por ${M('Título: acto', t.acto, t.fuente)} otorgada el ${M('Título: fecha', fecha(t.fecha), t.fuente)} ante el/la escribano/a ${M('Título: escribano', t.escribano, t.fuente)}, Registro ${M('Título: registro', t.registro, t.fuente)}. PRECIO: La venta se realiza por el precio total de ${mon.toUpperCase()} ${M('Precio en letras', d.precio ? enLetras(d.precio).toUpperCase() : '', '')} (${mon === 'pesos' ? '$' : 'U$S'} ${M('Precio', d.precio ? d.precio.toLocaleString('es-AR') : '', '')}), que LA PARTE VENDEDORA declara recibir en este acto, en dinero efectivo, a su entera satisfacción, otorgando por el presente suficiente recibo y carta de pago. [CLÁUSULAS DE TRADICIÓN, CERTIFICADOS, IMPUESTOS Y DEMÁS CONSTANCIAS A COMPLETAR POR LA ESCRIBANÍA.]`;
    return { texto: crudo.replace(/\u0002\d+\u0003|\u0004/g, ''), crudo, marcas, faltan: revisar(d) };
  }

  const Escritura = { borrador, revisar, leerDNI, enLetras };
  if (typeof module !== 'undefined' && module.exports) module.exports = Escritura; else root.Escritura = Escritura;
})(typeof self !== 'undefined' ? self : this);
