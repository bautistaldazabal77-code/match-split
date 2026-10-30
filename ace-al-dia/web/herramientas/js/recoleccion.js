// Recolección de documentación: qué le falta a cada cliente en el período, el mensaje que corresponde según cuántas veces se le pidió
// (el tono sube de a poco) y el enlace de WhatsApp para mandarlo con un toque. El envío automático necesita la API de WhatsApp Business
// (etapa siguiente); acá el estudio manda cada mensaje con un clic y la herramienta lleva la cuenta.
(function (root) {
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const mesDe = periodo => { const [y, m] = periodo.split('-').map(Number); return `${MESES[m - 1]} ${y}`; };
  const lista = xs => xs.length === 1 ? xs[0] : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];
  const nombre = c => (c.nombre || '').trim().split(/\s+/)[0] || 'cómo estás';

  // cliente: {nombre, telefono, pedidos:{[doc]: true si ya lo mandó}, avisos: veces que ya se le escribió, ultimoAviso: 'AAAA-MM-DD'}
  function faltantes(c) { return Object.entries(c.pedidos || {}).filter(([, ok]) => !ok).map(([d]) => d); }
  function estado(c) { const f = faltantes(c), tot = Object.keys(c.pedidos || {}).length;
    if (!tot) return { clave: 'sin_pedido', texto: 'Sin pedidos' }; if (!f.length) return { clave: 'completo', texto: 'Completo' };
    if (f.length < tot) return { clave: 'parcial', texto: `Faltan ${f.length} de ${tot}` }; return { clave: 'pendiente', texto: 'No mandó nada' }; }

  // mensaje según el número de aviso (0 = primero); vence = día límite del estudio para recibir todo
  function mensaje(c, periodo, opts = {}) {
    const f = faltantes(c); if (!f.length) return null;
    const n = c.avisos || 0, est = opts.estudio || 'el estudio', vence = opts.vence ? ` antes del ${opts.vence.split('-').reverse().slice(0, 2).join('/')}` : '';
    const docs = lista(f), mes = mesDe(periodo);
    if (n === 0) return `Hola ${nombre(c)}, ¿cómo estás? Te escribimos de ${est} para cerrar ${mes}. Necesitamos ${docs}. Nos lo podés mandar por acá (foto o PDF)${vence}. ¡Gracias!`;
    if (n === 1) return `Hola ${nombre(c)}, te recordamos que para cerrar ${mes} todavía nos falta ${docs}. Si ya lo mandaste por otro lado, avisanos y lo buscamos. ¡Gracias!`;
    if (n === 2) return `${nombre(c)}, seguimos esperando ${docs} de ${mes}. Sin eso no podemos presentar a tiempo${vence}, y podrían correr multas o intereses. ¿Nos lo mandás hoy?`;
    return `${nombre(c)}, es el último aviso para ${mes}: si no recibimos ${docs}${vence}, vamos a tener que presentar sin esos datos o fuera de término. Llamanos si necesitás ayuda para conseguirlos.`;
  }
  const telWa = t => { let s = String(t).replace(/\D/g, ''); if (s.startsWith('0')) s = s.slice(1); if (!s.startsWith('54')) s = '549' + s.replace(/^15/, ''); return s; };
  const enlace = (c, texto) => `https://wa.me/${telWa(c.telefono)}?text=${encodeURIComponent(texto)}`;
  // marca que se mandó un aviso
  const registrarAviso = (c, hoy) => ({ ...c, avisos: (c.avisos || 0) + 1, ultimoAviso: hoy });
  // a quién toca escribirle hoy: pendientes cuyo último aviso fue hace al menos `cada` días
  function aEscribirHoy(clientes, hoy, cada = 3) {
    const d = s => Date.parse(s + 'T12:00:00');
    return clientes.filter(c => faltantes(c).length && (!c.ultimoAviso || (d(hoy) - d(c.ultimoAviso)) / 864e5 >= cada));
  }
  function tablero(clientes) {
    const t = { completo: 0, parcial: 0, pendiente: 0, sin_pedido: 0 }; clientes.forEach(c => t[estado(c).clave]++);
    t.total = clientes.length; t.porcentaje = t.total ? Math.round(100 * t.completo / t.total) : 0; return t;
  }

  const Recoleccion = { faltantes, estado, mensaje, enlace, telWa, registrarAviso, aEscribirHoy, tablero, mesDe };
  if (typeof module !== 'undefined' && module.exports) module.exports = Recoleccion; else root.Recoleccion = Recoleccion;
})(typeof self !== 'undefined' ? self : this);
