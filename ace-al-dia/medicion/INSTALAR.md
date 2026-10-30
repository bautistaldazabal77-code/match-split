# Cómo dejar funcionando la medición y los anotados

Lleva unos 20 minutos. Todo es gratis.

## 1. La planilla de anotados y clics (obligatorio)

Ahí se guarda cada anotado (nombre, contacto, profesión, provincia, qué herramientas le interesan y de qué anuncio vino) y cada clic o uso de herramienta (anónimo).

1. Entrá a [sheets.new](https://sheets.new) con tu cuenta de Google y ponele de nombre **ACE Al Día · Medición**.
2. Andá a **Extensiones → Apps Script**. Borrá lo que haya y pegá todo el contenido de `medicion/apps-script.gs`. Guardá.
3. En el menú de la izquierda, entrá a **Configuración del proyecto** (el engranaje). Abajo, en **Propiedades de la secuencia de comandos**, agregá:
   - Propiedad: `CLAVE_PANEL`
   - Valor: una clave larga que solo sepas vos (por ejemplo, 4 palabras al azar).
4. Arriba a la derecha, tocá **Implementar → Nueva implementación** y completá:
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
   - Tocá **Implementar** y autorizá los permisos (es tu propio script).
5. Copiá la **URL de la aplicación web** (termina en `/exec`).
6. Pegala en `web/assets/medicion.js`, en `ENDPOINT: ""`, entre las comillas.

Las hojas **Eventos** y **Anotados** se crean solas con la primera visita. En la hoja Anotados tenés las columnas `estado` y `notas` para hacer el seguimiento de cada potencial cliente (por ejemplo: nuevo, contactado, demo, cliente).

**Si cambiás el script más adelante:** andá a **Implementar → Administrar implementaciones → editar → Versión: nueva** para que tome los cambios sin cambiar la URL.

## 2. El panel

Abrí `tu-sitio/panel/` (no figura en ningún menú) y pegá la URL `/exec` y tu `CLAVE_PANEL`. Vas a ver:

- **Qué herramienta pide más la gente:** clics en "Probar", pedidos de aviso, usos dentro de la app y elecciones al anotarse.
- **El embudo:** visitantes, vieron herramientas, hicieron clic, abrieron el formulario y se anotaron.
- **De qué red y de qué anuncio** viene cada persona y cuántos se anotan de cada uno.
- **Los botones más tocados.**
- **La lista de anotados** con WhatsApp para escribirles y descarga en CSV.

Para ver cómo se ve antes de tener datos, tocá "Ver con datos de ejemplo".

## 3. Mapa de calor: dónde hace clic la gente (recomendado)

1. Creá una cuenta gratis en [clarity.microsoft.com](https://clarity.microsoft.com) y agregá un proyecto con la dirección de tu web.
2. En **Configuración → Código de instalación** vas a ver un código de 10 letras y números (el "Project ID").
3. Pegalo en `CLARITY: ""` en `web/assets/medicion.js`.

Clarity te muestra el mapa de calor de clics y de desplazamiento, y grabaciones de cómo navega la gente. Solo se activa si la persona acepta las cookies.

## 4. Píxeles para los anuncios (cuando vayas a pautar)

- **Meta (Instagram y Facebook):** en el Administrador de eventos, creá un conjunto de datos (píxel) y copiá su número en `META_PIXEL`. La web avisa a Meta cada vez que alguien se anota (evento **Lead**), así podés optimizar las campañas para conseguir anotados.
- **Google Analytics 4:** creá una propiedad y copiá el ID `G-…` en `GA4`. El anotado se registra como **generate_lead**.
- **TikTok:** copiá el ID del píxel en `TIKTOK_PIXEL`. El anotado se registra como **SubmitForm**.

Con cualquiera de estos completado, la web muestra el aviso de cookies y solo los carga si la persona acepta.

## 5. Probar que todo anda

1. Abrí tu web con un link de prueba, por ejemplo `tu-sitio/?utm_source=prueba&utm_campaign=test&utm_content=yo`.
2. Tocá un par de botones y anotate con datos de prueba.
3. En la planilla tienen que aparecer filas nuevas en **Eventos** y en **Anotados**, y en el panel, la fuente `prueba`.
4. Borrá esas filas de prueba de la planilla.

## Para probar en tu computadora sin Google

```
node medicion/servidor-prueba.js
```
Después abrí http://127.0.0.1:8792. En el panel usá la URL `http://127.0.0.1:8792/exec` y la clave `prueba`.

Con el servidor andando, `node medicion/prueba-local.js` simula 4 visitantes y comprueba todo el circuito (necesita Playwright).
