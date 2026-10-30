# Herramientas de ACE Al Día (versión de prueba)

Funcionan en el navegador, sin servidor: los archivos no se suben a ningún lado. Para usarlas en tu computadora, corré `python3 -m http.server 8000` dentro de `ace-al-dia/web` y entrá a http://localhost:8000/herramientas/. La lógica está en `js/`.

| Herramienta | Archivo | Qué hace hoy | Qué queda para la etapa con IA o integraciones |
|---|---|---|---|
| Vencimientos | `js/calendario.js` | Vencimiento en días hábiles judiciales con feriados 2026–2027 y ferias (Nación y PBA), plazo de gracia y .ics | Leer las causas solas de los sistemas de consulta judicial |
| Liquidador | `js/liquidador.js` | Interés simple por tramos de tasa, pagos a cuenta y escrito | Cargar las tasas del BNA automáticamente |
| Comprobantes | `js/comprobantes.js` | Lee el QR de ARCA en fotos o PDF, valida el CUIT, asigna el cliente y arma resumen y CSV | Desglose de neto e IVA y comprobantes sin QR (lectura con IA) |
| Recolección | `js/recoleccion.js` | Faltantes por cliente, mensajes que suben de tono, enlace de WhatsApp y tablero | Envío automático (API de WhatsApp Business) |
| Estudio de títulos | `js/titulos.js` | Cadena de dominio y observaciones a partir de los datos cargados | Leer las escrituras escaneadas con IA |
| Borrador de escritura | `js/escritura.js` | Borrador de compraventa, lectura del código del DNI y precio en letras | Leer el boleto y el informe de dominio con IA |

- **Pruebas:** `node js/pruebas.js` (17 pruebas con datos inventados).
- **Archivos de prueba:** `python3 generar_ejemplos.py`, que arma en `ejemplos/` una factura en PDF, una foto de QR y un DNI, todos ficticios.

Pendiente: Ganancias y Bienes Personales (agregado anual). Necesita las escalas y los mínimos del período fiscal que corresponda, y se arma más cerca de la temporada.

Antes de usarlas con casos reales, revisar las acordadas de cada jurisdicción (pueden sumar días inhábiles) y que un profesional valide los textos modelo.
