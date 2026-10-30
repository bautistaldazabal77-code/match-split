# ACE Al Día · web de validación

Página para medir qué herramientas piden los abogados, contadores y escribanos antes de construirlas. Cada herramienta tiene un botón "Quiero probarla" que abre el formulario de anotados.

- `pagina.html`: la página (se edita acá). También es la vista previa publicada como Artifact.
- `index.html`: la página completa para subir a cualquier hosting. Se genera con `python3 armar.py`.

## Para publicarla y juntar anotados

1. **Dónde guardar los anotados.** Crear un formulario en Formspree (o un script de Google Apps Script que escriba en una planilla) y pegar su URL en `CONFIG.ENVIO`, al final de `pagina.html`. El formulario manda por POST un JSON con nombre, profesión, WhatsApp, email, provincia, tamaño del estudio, herramientas elegidas y fecha.
2. **WhatsApp del proyecto (opcional).** Poner el número en `CONFIG.WHATSAPP` (con código de país, sin signos).
3. Correr `python3 armar.py` y subir `index.html` a un hosting estático (Netlify, Vercel o GitHub Pages) con el dominio elegido.

Sin `CONFIG.ENVIO`, el formulario se valida pero no guarda nada (así está la vista previa).

Antes de lanzar: chequear la marca en el INPI y el dominio, y sumar términos de uso y política de privacidad.
