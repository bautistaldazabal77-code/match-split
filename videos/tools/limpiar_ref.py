"""Extrae una muestra de voz limpia de un video propio para usarla como referencia de clonación.

Uso:
  python limpiar_ref.py <video_o_audio> <salida.wav> <inicio_s> <fin_s>

Pasos: filtro de banda de voz + reducción de ruido no estacionaria (noisereduce)
para bajar la música de fondo, y recorte del tramo indicado (ideal: 8-15 s de
habla continua, sin efectos). La muestra no se versiona: el repo es público.
"""
import subprocess
import sys
import tempfile

import noisereduce as nr
import numpy as np
import soundfile as sf
from scipy import signal


def main():
    src, out, s, e = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vn", "-ac", "1", "-ar", "44100", tmp.name], check=True)
        a, sr = sf.read(tmp.name)
    a = signal.sosfilt(signal.butter(4, [90, 9000], btype="band", fs=sr, output="sos"), a)
    y = nr.reduce_noise(y=a, sr=sr, stationary=False, prop_decrease=0.85, time_constant_s=1.5, n_fft=2048)
    y = y[int(s * sr):int(e * sr)]
    sf.write(out, y / np.abs(y).max() * 0.9, sr)
    print(f"{out}: {e - s:.1f} s")


if __name__ == "__main__":
    main()
