#!/bin/bash
# Terminación de un corto (correr en la carpeta del episodio): grano fino, viñeta y color; une el audio
# y lo lleva a -14 LUFS midiendo primero la sonoridad (dos pasadas de loudnorm).
#   ../comun/terminar.sh "Nombre.mp4"            → todo el corto
#   CRF=20 ../comun/terminar.sh "Nombre.mp4"     → más calidad (más pesado)
set -e
OUT=${1:-final.mp4}; CRF=${CRF:-19}; VID=${VIDEO:-video_limpio.mp4}
M=$(ffmpeg -hide_banner -i audio/mezcla.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python3 -c "import json,sys; print(json.load(sys.stdin)['$1'])"; }
AF="loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true"
ffmpeg -v error -y -i "$VID" -i audio/mezcla.wav -vf "eq=contrast=1.05:saturation=0.95,noise=c0s=5:c0f=t,vignette=angle=PI/4.5" -af "$AF" \
  -c:v libx264 -preset medium -crf "$CRF" -tune grain -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
echo "listo: $OUT"
