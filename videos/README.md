# Videos

Cada video vive en su propia carpeta (por ejemplo `motel/`) con:

- `guion.json`: líneas del guion. `say` es lo que dice la voz (números en letras),
  `cap` el subtítulo si difiere (`3:07.|3` = el token ocupa 3 palabras habladas),
  `escena` el plano, `pausa` el silencio posterior, `voz` (`narrador` | `telefono`)
  y `sfx` (efectos que dispara `tools/sonido.py`).
- `escena.html` + `escena.js`: escenas 3D (three.js) + interfaz y subtítulos en HTML.
  La página expone `window.setup(timeline)` y `window.renderAt(t)`.
- `out/` (no se versiona): locución, mezcla, línea de tiempo, capturas y el mp4.

## Cómo se arma

```bash
# 1. Dependencias (una vez)
cd videos && npm install
python3 -m venv .venv && .venv/bin/pip install piper-tts faster-whisper scipy soundfile
# voz provisoria: es_MX-ald-medium de rhasspy/piper-voices (Hugging Face)

# 2. Voz + línea de tiempo con marcas por palabra
PIPER_BIN=.venv/bin/piper PIPER_VOICE=/ruta/es_MX-ald-medium.onnx .venv/bin/python tools/voz.py motel/guion.json motel/out

# 3. Música, ambiente y efectos (sintetizados) + mezcla con la voz
.venv/bin/python tools/sonido.py motel/out

# 4. Capturas de prueba en segundos puntuales
node tools/render.mjs motel --stills 2.5,30,60

# 5. Video final 1080x1920 30 fps
node tools/render.mjs motel --out video.mp4
```

Para cambiar la voz por una grabación propia o de otra herramienta: reemplazar
`out/lineas/NN.wav` y `out/voz.wav` respetando la línea de tiempo, o adaptar
`tools/voz.py` para que lea los audios en lugar de generarlos.

## Estilo (referencias en `../contenido/referencias-y-ideas.md`)

- 2.ª persona, español neutro (tú), frases cortas, regla al principio, decisión final 1/2.
- Personajes tipo muñeco de cabeza grande, low-poly, iluminación nocturna.
- Subtítulos en mayúsculas, palabra actual en amarillo; voz de teléfono en rojo.
- Pantallas como prueba: teléfono con visor, libro de registro, reloj LED, cámara de seguridad.
