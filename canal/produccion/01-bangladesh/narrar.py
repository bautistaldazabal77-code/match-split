import sys, types, os, json, subprocess
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
cues = json.load(open('cues.json'))
pipe = KPipeline(lang_code='e')
# español latinoamericano (seseo y yeísmo) en vez del de España, que pronuncia la c y la z como θ
pipe.g2p = espeak.EspeakG2P(language='es-419')
t = 0.0; timeline = []; track = []
def add(a):
    track.append(a)
for c in cues:
    if 'silence' in c:
        add(np.zeros(int(SR * c['silence']), np.float32))
        timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + c['silence'], 3)})
        t += c['silence']; continue
    parts = [a.numpy() if hasattr(a, 'numpy') else a for _, _, a in pipe(c.get('say', c['text']), voice='em_alex', speed=0.92)]
    raw = np.concatenate(parts).astype(np.float32)
    sf.write('audio/tmp.wav', raw, SR)
    # versión grave: baja el tono ~1,4 semitonos sin cambiar la velocidad
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio/tmp.wav', '-af', f'asetrate={SR}*0.92,aresample={SR},atempo=1/0.92', '-ar', str(SR), 'audio/tmp2.wav'], check=True)
    a, _ = sf.read('audio/tmp2.wav', dtype='float32')
    # recorta silencios de los bordes
    nz = np.where(np.abs(a) > 0.01)[0]
    a = a[max(0, nz[0] - 600): nz[-1] + 1200] if len(nz) else a
    d = len(a) / SR
    timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + d, 3), 'text': c['text']})
    print(c['id'], round(t, 1), flush=True)
    add(a); t += d
    add(np.zeros(int(SR * c['pause']), np.float32)); t += c['pause']
sf.write('audio/narracion.wav', np.concatenate(track), SR)
json.dump({'duration': round(t, 3), 'cues': timeline}, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
open('web/timeline.js', 'w').write('window.TL=' + json.dumps({'duration': round(t, 3), 'cues': timeline}, ensure_ascii=False) + ';\n')
print('duración total', round(t, 2))
