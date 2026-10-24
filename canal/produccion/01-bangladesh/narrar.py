import json
import numpy as np, soundfile as sf
from narrar_base import decir, SR
# narra cues.json frase por frase; "say" (si está) es la escritura fonética de "text"
cues = json.load(open('cues.json'))
t = 0.0; timeline = []; track = []
for c in cues:
    if 'silence' in c:
        track.append(np.zeros(int(SR * c['silence']), np.float32))
        timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + c['silence'], 3)})
        t += c['silence']; continue
    a = decir(c.get('say', c['text']))
    d = len(a) / SR
    timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + d, 3), 'text': c['text']})
    print(c['id'], round(t, 1), flush=True)
    track.append(a); t += d
    track.append(np.zeros(int(SR * c['pause']), np.float32)); t += c['pause']
sf.write('audio/narracion.wav', np.concatenate(track), SR)
json.dump({'duration': round(t, 3), 'cues': timeline}, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
open('web/timeline.js', 'w').write('window.TL=' + json.dumps({'duration': round(t, 3), 'cues': timeline}, ensure_ascii=False) + ';\n')
print('duración total', round(t, 2))
