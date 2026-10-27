# Video 03 (Jeffrey Epstein): cómo se fabrica

Video largo horizontal (1920x1080, 24 cuadros por segundo, sin subtítulos) en el estilo "caso real": negro y rojo, fotos reales con licencia libre, documentos, tablero de pruebas y contador de impunidad. Usa las herramientas de los cortos (`../cortos/comun/`), con `video.json` para el formato. Guion y chequeo de datos en `canal/guiones/03-jeffrey-epstein.md`.

1. **Guion a frases:** `python3 guion_a_cues.py` arma `cues.json`. `SAY` tiene la escritura fonética de los nombres en inglés ("Yéfri Épstin", "Guilén Máxuel", "efebeí"…); los reels la reutilizan.
2. **Voz:** `VELOCIDAD=0.92 python3 ../cortos/comun/narrar.py`. Genera `audio/narracion.wav`, `timeline.json` y `audio/oido.txt` (lo que entendió Whisper, para revisar nombres).
3. **Fotos:** en `web/img/`, con autor, licencia y enlace en `web/img/fotos.json` (de ahí sale `web/fotos.js`, el crédito que se ve en pantalla). Solo dominio público o licencias libres de Wikimedia Commons, más la acusación de 2019 bajada de justice.gov. Wikimedia limita las descargas desde servidores: `https://commons.wikimedia.org/w/thumb.php?f=<archivo>&w=1920` funciona cuando `upload.wikimedia.org` responde 429.
4. **Escenas:** el estilo está en `../cortos/comun/web/caso.js` (fotos tratadas, retratos a un costado, documentos con marcas y zoom, tablero, ficha, cámara de seguridad, sellos, placas de capítulo, contador y grano). Un archivo por capítulo: `cap0.js` (apertura y título) a `cap8.js` y `epilogo.js`.
   - Para revisar cuadros: con `python3 -m http.server 8778 --bind 127.0.0.1` corriendo en `canal/produccion/`, `node ../cortos/comun/shots.js 120 245.5` guarda capturas en `shots/`.
5. **Sonido:** `python3 sonido.py` (acordes oscuros por capítulo, sellos, contador, obturador en las fotos, estática en las cámaras; mezcla en `audio/mezcla.wav`).
6. **Render:** `node ../cortos/comun/render.js 0 900 video_limpio.mp4 3` (unos 35 minutos con 3 procesos).
7. **Terminación:** `CRF=22 ../cortos/comun/terminar.sh "Impune - El caso Jeffrey Epstein.mp4"`.
8. **Publicación:** título, descripción con capítulos, fuentes y créditos en `PUBLICACION.md`.
