#!/bin/bash
# Renderiza el video por capítulos (partes/NN.mp4) y los une en video_limpio.mp4.
#   ./render-capitulos.sh        → todos los capítulos que falten
#   ./render-capitulos.sh 3 5    → rehace solo los capítulos 3 y 5
set -e
mkdir -p partes
mapfile -t CORTES < <(python3 -c "
import json; tl = json.load(open('timeline.json')); C = {c['id']: c['start'] for c in tl['cues']}
b = [0] + [C[k] for k in ['chapter', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'epi']] + [tl['duration']]
for i in range(len(b) - 1): print(i, b[i], b[i + 1])")
for linea in "${CORTES[@]}"; do
  read -r n a b <<< "$linea"
  f=partes/$(printf %02d "$n").mp4
  if [ $# -gt 0 ]; then [[ " $* " == *" $n "* ]] || continue; elif [ -f "$f" ]; then continue; fi
  echo "== parte $n: $a → $b"
  node render.js "$a" "$b" "$f" 3
done
ls partes/*.mp4 | sed "s#^#file '#; s#\$#'#" > partes.txt
ffmpeg -v error -y -f concat -safe 0 -i partes.txt -c copy video_limpio.mp4
rm partes.txt
echo "listo: video_limpio.mp4"
