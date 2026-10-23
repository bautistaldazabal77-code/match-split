# Muestra del video 01 (Bangladesh): cómo se fabrica

Todo es gratuito y se genera desde código.

1. **Voz:** `narrar.py` lee `cues.json` (frase por frase) con Kokoro, voz `em_alex` a velocidad 0,92 y con el tono bajado (versión "grave"). Genera `audio/narracion.wav` y `timeline.json`, con el momento exacto de cada frase.
2. **Música y efectos:** `sonido.py` compone el fondo musical, los golpes graves, la impresora trabada y el tecleo. Baja la música cuando habla la voz y mezcla todo en `audio/mezcla.wav`. Después se normaliza a -14 LUFS con `ffmpeg loudnorm`.
3. **Imágenes:** `web/index.html` y `web/escenas.js` dibujan cada escena en función del tiempo (mapas con d3 y Natural Earth, dibujos isométricos en SVG y tipografías de Google Fonts).
4. **Render:** con `python3 -m http.server 8777` corriendo en `web/`, se ejecuta `node render.js`. Captura 24 cuadros por segundo con Chromium y arma `video_limpio.mp4`.
5. **Terminación:** con ffmpeg se agrega grano fino, viñeta y color, y se une el audio:
   `eq=contrast=1.05:saturation=0.92,noise=c0s=4:c0f=t,vignette=angle=PI/4.2` con `-crf 22 -tune grain`.

Licencias: Kokoro (Apache 2.0), datos de Natural Earth / world-atlas (dominio público), d3 y topojson (ISC/BSD), fuentes Cormorant Garamond, Inter e IBM Plex Mono (SIL OFL). La música y los efectos son originales, sintetizados en `sonido.py`.
