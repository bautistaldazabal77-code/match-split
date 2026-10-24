#!/bin/bash
# Terminación: grano, viñeta y color sobre video_limpio.mp4, más el audio llevado a -14 LUFS.
#   ./terminar.sh salida.mp4                 → todo el video
#   ./terminar.sh avance.mp4 0 581.7 veryfast → solo un tramo (para revisar), con un preset más rápido
set -e
OUT=${1:-final.mp4}; A=${2:-0}; B=${3:-}; PRESET=${4:-medium}; VID=${VIDEO:-video_limpio.mp4}
RANGO=(-ss "$A"); [ -n "$B" ] && RANGO+=(-to "$B")
# primera pasada: medir la sonoridad del tramo
M=$(ffmpeg -hide_banner "${RANGO[@]}" -i audio/mezcla.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$M" | python3 -c "import sys, json; print(json.load(sys.stdin)['$1'])"; }
AF="loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true"
ffmpeg -v error -y "${RANGO[@]}" -i "$VID" "${RANGO[@]}" -i audio/mezcla.wav \
  -vf "eq=contrast=1.05:saturation=0.92,noise=c0s=4:c0f=t,vignette=angle=PI/4.2" -af "$AF" \
  -c:v libx264 -preset "$PRESET" -crf 22 -tune grain -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT"
