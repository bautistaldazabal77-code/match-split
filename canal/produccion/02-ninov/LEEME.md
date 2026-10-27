# Video 02 (Victor Ninov): cómo se fabrica

Video largo horizontal (1920x1080, 24 cuadros por segundo, sin subtítulos) hecho con las mismas herramientas que los cortos (`../cortos/comun/`); `video.json` les indica el formato. Guion en `canal/guiones/02-victor-ninov.md`.

1. **Guion a frases:** `python3 guion_a_cues.py` arma `cues.json` desde el guion por párrafos. Ahí está `SAY`, con la escritura fonética de los nombres que la voz lee mal ("Bérkli", "Smolánchuk", "Rójus Fogt"…).
2. **Voz:** `VELOCIDAD=0.92 python3 ../cortos/comun/narrar.py` (unos 15 minutos). Genera `audio/narracion.wav`, `timeline.json` con el momento de cada palabra y `audio/oido.txt` con lo que entendió Whisper, para revisar nombres.
3. **Escenas:** `web/plantillas.js` (placas de capítulo, texto grande, citas, zócalos, mapas del mundo, tabla periódica grande) y un archivo por capítulo: `cap0.js` (apertura y título) a `cap6.js` y `epilogo.js`.
   - Para revisar cuadros: con `python3 -m http.server 8778 --bind 127.0.0.1` corriendo en `canal/produccion/`, `node ../cortos/comun/shots.js 120 245.5` guarda capturas en `shots/`.
4. **Sonido:** `python3 sonido.py` (un acorde por capítulo, efectos y mezcla en `audio/mezcla.wav`).
5. **Render:** `node ../cortos/comun/render.js 0 800 video_limpio.mp4 3` (unos 30 minutos con 3 procesos).
6. **Terminación:** `CRF=22 ../cortos/comun/terminar.sh "El hombre que inventó un elemento.mp4"`.
7. **Publicación:** título, descripción con capítulos y fuentes en `PUBLICACION.md`.
