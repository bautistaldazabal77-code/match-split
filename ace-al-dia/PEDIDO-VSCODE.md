# Pedido para el asistente de VS Code: ACE Al Día

> **Nota:** la web final ya quedó hecha en `web/` (landing y herramientas). Este pedido sirve solo si querés que el asistente de VS Code la rehaga o la mejore. En ese caso, las herramientas ahora están en `web/herramientas/js/` y las pruebas se corren con `node web/herramientas/js/pruebas.js`.

Copiá desde "Contexto" hasta el final y pegalo en el chat del asistente de VS Code, con la carpeta `ace-al-dia/` del repositorio abierta.

---

## Contexto

Vamos a construir **ACE Al Día**, una web de herramientas para **Abogados, Contadores y Escribanos** de la Argentina. El lema es "Que en el estudio nada se te pase". La IA hace el trabajo de escritorio y el profesional revisa y firma.

**Olvidate de todas las webs que hicimos antes en este proyecto.** No reutilices nada de diseños, componentes, estilos ni código de webs anteriores. La única referencia es lo que está en esta carpeta.

## Qué hay en la carpeta

- `pagina.html`: la maqueta de la landing. Es la referencia de **contenido, estructura y tono**: secciones, textos, herramientas, preguntas frecuentes y formulario de anotados. Replicala completa y mejorala.
- `herramientas/`: las herramientas **ya funcionando y probadas**. Es la lógica de negocio y no hay que reescribirla:
  - `calendario.js`: feriados 2026–2027, ferias judiciales, vencimientos en días hábiles, plazo de gracia y archivo .ics.
  - `liquidador.js`: capital e intereses por tramos de tasa, pagos a cuenta y escrito de liquidación.
  - `comprobantes.js`: lectura del QR de ARCA en fotos o PDF de facturas, verificación de CUIT, asignación a clientes, resumen por mes y CSV.
  - `recoleccion.js`: faltantes por cliente, mensajes que suben de tono, enlace de WhatsApp y tablero.
  - `titulos.js`: cadena de dominio y observaciones (quiebres, nombres que no coinciden, falta de inscripción, años sin cubrir).
  - `escritura.js`: borrador de compraventa, lectura del código PDF417 del DNI y números en letras.
  - `index.html`: una interfaz de prueba que usa esos módulos. Sirve de referencia de **cómo se usan**, no de diseño.
  - `pruebas.js`: 17 pruebas con datos inventados (`node herramientas/pruebas.js`).
  - `ejemplos/`: factura en PDF, foto de QR y DNI, todos ficticios, para probar.

## Qué quiero

1. **Landing nueva** (`/`), igual en contenido a `pagina.html` pero con mucha más calidad visual, que se vea como un producto profesional y confiable para estudios jurídicos y contables.
2. **App de herramientas** (`/herramientas`) con las 6 herramientas funcionando, usando los módulos de `herramientas/*.js` tal como están. Si necesitás convertirlos a módulos ES o TypeScript, hacelo sin cambiar su comportamiento, y que `pruebas.js` siga pasando.
3. **Formulario de anotados** de la landing: tiene que mandar los datos a la URL configurable (`CONFIG.ENVIO`, para Formspree o Google Apps Script), con validación y mensajes claros.

## Dirección de diseño

- **Base en blanco y negro.** Fondo blanco (o casi), texto negro y grises neutros, mucho aire, tipografía fuerte. Que parezca papelería de estudio de alta gama, no una plantilla de startup.
- **El color solo como acento,** con significado: cada profesión tiene su color de "resaltador".
  - Abogados: amarillo `#F6E45C`.
  - Contadores: verde `#8FE0A8`.
  - Escribanos: rosa `#F5A9C8`.
  - Rojo `#C4321F` solo para urgente o error, y verde `#1F7A45` para "ok".
- **Tipografía:** un display con carácter para los títulos (en la maqueta, Bricolage Grotesque), una sans muy legible para el texto (IBM Plex Sans) y una mono para números, expedientes y CUIT (IBM Plex Mono). Podés proponer otra combinación si queda mejor, pero nada genérico.
- **Detalles del rubro:** números de expediente, CUIT, fojas, sellos, resaltador sobre texto y el formato "Hoy:… / Con ACE:…".
- **Modo oscuro** con la misma lógica: negro y blanco invertidos, con los mismos acentos.
- **Responsive impecable** en celular (la mayoría va a entrar desde el teléfono) y **accesible:** foco visible, contraste AA, `prefers-reduced-motion`.
- **Animaciones sobrias:** una sola animación protagonista en la portada (el aviso de vencimiento que entra) y micro-interacciones en los botones. Nada recargado.

## Calidad que espero

- Código limpio y ordenado. Si usás un framework, que sea simple de publicar como sitio estático (por ejemplo, Vite o Astro); si preferís HTML, CSS y JS sin framework, también está bien.
- Lighthouse de 90 o más en rendimiento y accesibilidad.
- Todo el texto en español rioplatense, con voseo, como en la maqueta.
- Los datos de ejemplo tienen que verse **marcados como ejemplo**.
- Cada herramienta mantiene el aviso de que propone y el profesional revisa y firma.
- Las herramientas procesan todo **en el navegador**: los archivos no se suben a ningún servidor. Mantenelo así y decilo en la interfaz.

## Cómo comprobar que quedó bien

- `node herramientas/pruebas.js` da 17 pruebas OK.
- En `/herramientas`:
  - **Comprobantes:** subir `ejemplos/factura-A-ejemplo.pdf` lee la Factura A 00004-00012873 por $ 220.704,00, y subir `ejemplos/dni-ejemplo.png` muestra un error claro.
  - **Borrador de escritura:** "Escanear DNI" con `ejemplos/dni-ejemplo.png` completa GOMEZ, LAURA BEATRIZ y 28456112.
  - **Vencimientos:** notificado el 19/11/2026 con 5 días vence el viernes 27/11/2026, salteando el feriado del 23/11.
- La landing se ve bien a 375 px, 768 px y 1440 px de ancho, en claro y en oscuro.
