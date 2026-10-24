# Muestra del video 01 (Bangladesh): cómo se fabrica

Todo es gratuito y se genera desde código.

0. **Instalación de la voz:** `pip install --no-deps kokoro misaki` y después `pip install huggingface_hub loguru transformers phonemizer-fork espeakng-loader num2words soundfile scipy`. Con el `pip install kokoro` normal falla, porque intenta compilar dependencias que no hacen falta.
1. **Voz:** `narrar.py` lee `cues.json` (frase por frase) con Kokoro, voz `em_alex` a velocidad 0,92 y con el tono bajado (versión "grave"). Genera `audio/narracion.wav` y `timeline.json`, con el momento exacto de cada frase.
2. **Música y efectos:** `sonido.py` compone el fondo musical, los golpes graves, la impresora trabada y el tecleo. Baja la música cuando habla la voz y mezcla todo en `audio/mezcla.wav`. Después se normaliza a -14 LUFS con `ffmpeg loudnorm`.
3. **Imágenes:** `web/index.html` y `web/escenas.js` dibujan cada escena en función del tiempo (mapas con d3 y Natural Earth, dibujos isométricos en SVG, ilustraciones de trazo y tipografías de Google Fonts). Para sincronizar con la voz, `AT('c5', 'feriado')` calcula en qué momento se dice una palabra dentro de una frase.
   - **Fotos reales** en `web/img/` (14 en la versión 3), de Wikimedia Commons y Flickr con licencia libre (CC0, CC BY o CC BY-SA). Se buscaron con la API de Openverse (`api.openverse.org`), filtrando por licencias que permiten uso comercial. Wikimedia bloquea muchas descargas seguidas: conviene bajar la miniatura de 1920 px (`/thumb/.../1920px-archivo.jpg`) en lugar del original. Se achicaron y se les bajó un poco el color para que combinen. Los autores y las licencias están en `web/img/CREDITOS.md`: **hay que copiarlos en la descripción del video**, y cada foto ya lleva su crédito chico en pantalla.
4. **Render:** con `python3 -m http.server 8777` corriendo en `web/`, se ejecuta `node render.js`. Captura 24 cuadros por segundo con Chromium y arma `video_limpio.mp4`.
5. **Terminación:** con ffmpeg se agrega grano fino, viñeta y color, y se une el audio:
   `eq=contrast=1.05:saturation=0.92,noise=c0s=4:c0f=t,vignette=angle=PI/4.2` con `-crf 22 -tune grain`.

Licencias: fotos según `web/img/CREDITOS.md`; Kokoro (Apache 2.0), datos de Natural Earth / world-atlas (dominio público), d3 y topojson (ISC/BSD), fuentes Cormorant Garamond, Inter e IBM Plex Mono (SIL OFL). La música y los efectos son originales, sintetizados en `sonido.py`.
