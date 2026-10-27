# Voz del canal: Kokoro em_alex con el tono bajado (voz C grave) y pronunciación latinoamericana
import sys, types, os, subprocess
sys.modules.setdefault('spacy', types.ModuleType('spacy'))
import espeakng_loader
os.environ['PHONEMIZER_ESPEAK_LIBRARY'] = espeakng_loader.get_library_path()
os.environ['ESPEAK_DATA_PATH'] = espeakng_loader.get_data_path()
from phonemizer.backend.espeak.wrapper import EspeakWrapper
EspeakWrapper.set_library(espeakng_loader.get_library_path())
import numpy as np, soundfile as sf
from kokoro import KPipeline
from misaki import espeak
SR = 24000
pipe = KPipeline(lang_code='e')
# español latinoamericano (seseo y yeísmo) en vez del de España, que pronuncia la c y la z como θ
pipe.g2p = espeak.EspeakG2P(language='es-419')
def decir(texto, speed=0.92):
    parts = [a.numpy() if hasattr(a, 'numpy') else a for _, _, a in pipe(texto, voice='em_alex', speed=speed)]
    sf.write('audio/tmp.wav', np.concatenate(parts).astype(np.float32), SR)
    # versión grave: baja el tono ~1,4 semitonos sin cambiar la velocidad
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio/tmp.wav', '-af', f'asetrate={SR}*0.92,aresample={SR},atempo=1/0.92', '-ar', str(SR), 'audio/tmp2.wav'], check=True)
    a, _ = sf.read('audio/tmp2.wav', dtype='float32')
    # recorta silencios de los bordes
    nz = np.where(np.abs(a) > 0.01)[0]
    return a[max(0, nz[0] - 600): nz[-1] + 1200] if len(nz) else a
