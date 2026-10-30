# ACE Al Día

Herramientas para Abogados, Contadores y Escribanos. Es una web estática (HTML, CSS y JS sin compilación) y se publica subiendo la carpeta `web/` a cualquier hosting (Netlify, Vercel o GitHub Pages).

- `web/index.html`: la landing con las tres profesiones, las herramientas, las preguntas frecuentes y el formulario de anotados.
- `web/herramientas/index.html`: las seis herramientas funcionando. Todo se procesa en el navegador.
- `web/assets/estilos.css`: el sistema visual compartido. Base en blanco y negro; el color marca la profesión (amarillo, verde y rosa).
- `web/herramientas/js/`: la lógica de cada herramienta y `pruebas.js` (`node web/herramientas/js/pruebas.js`).
- `web/herramientas/ejemplos/`: factura, foto de QR y DNI, todos ficticios. Se regeneran con `python3 web/herramientas/generar_ejemplos.py`.
- `pagina.html`: la primera maqueta, que queda como referencia.
- `PEDIDO-VSCODE.md`: el pedido original para el asistente de VS Code (la web final ya está hecha en `web/`).

## Para ver la web en tu computadora

```
cd ace-al-dia/web
python3 -m http.server 8000
```
Después abrí http://localhost:8000.

## Para publicarla y juntar anotados

1. **Dónde guardar los anotados.** Crear un formulario en Formspree (o un script de Google Apps Script que escriba en una planilla) y pegar su URL en `CONFIG.ENVIO`, al final de `web/index.html`. Sin esa URL, el formulario funciona en modo de prueba y no guarda nada.
2. **Publicar.** Subir la carpeta `web/` a Netlify o Vercel (se puede arrastrar la carpeta en Netlify) y conectar el dominio.
3. **Antes de lanzar:** chequear la marca en el INPI y el dominio, sumar términos de uso y política de privacidad, y que un abogado y un escribano revisen los textos modelo de las herramientas.
