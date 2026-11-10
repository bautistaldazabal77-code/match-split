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
# 2a. Voz clonada (la de nuestros videos anteriores), con Chatterbox Multilingual (MIT).
#     Necesita Python 3.11 y torch CPU:
#       uv venv -p python3.11 .venv-clon
#       uv pip install --extra-index-url https://download.pytorch.org/whl/cpu "torch==2.6.0+cpu" "torchaudio==2.6.0+cpu" \
#         chatterbox-tts==0.1.7 "setuptools<81" faster-whisper noisereduce scipy soundfile
#     Muestra de referencia (no se versiona; sale de "¿Y si? Mar de Scotia - Parte 2", 57-69 s):
.venv-clon/bin/python tools/limpiar_ref.py video_referencia.mp4 ref_narrador.wav 57 69
ENGINE=chatterbox REF_AUDIO=ref_narrador.wav .venv-clon/bin/python tools/voz.py motel/guion.json motel/out
#     Para regenerar sólo algunas líneas: SOLO=3,14 (mismo comando)
# 2b. Voz sintética de respaldo (Piper)
PIPER_BIN=.venv/bin/piper PIPER_VOICE=/ruta/es_MX-ald-medium.onnx .venv/bin/python tools/voz.py motel/guion.json motel/out

# 3. Música, ambiente y efectos (sintetizados) + mezcla con la voz
.venv/bin/python tools/sonido.py motel/out

# 4. Capturas de prueba en segundos puntuales
node tools/render.mjs motel --stills 2.5,30,60

# 5. Video final 1080x1920 30 fps
node tools/render.mjs motel --out video.mp4
```

Para usar una grabación propia o de otra herramienta: guardar cada línea como
`out/lineas/NN.wav` y correr `tools/voz.py` con `SOLO=-1` (no regenera nada y
rearma la línea de tiempo con esos audios).

## Estilo (referencias en `../contenido/referencias-y-ideas.md`)

- 2.ª persona, español neutro (tú), frases cortas, regla al principio, decisión final 1/2.
- Personajes tipo muñeco de cabeza grande, low-poly, iluminación nocturna.
- Subtítulos en mayúsculas, palabra actual en amarillo; voz de teléfono en rojo.
- Pantallas como prueba: teléfono con visor, libro de registro, reloj LED, cámara de seguridad.
