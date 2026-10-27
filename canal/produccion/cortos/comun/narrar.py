"""Narra cues.json del episodio (correr dentro de la carpeta del episodio) y calcula el momento de cada palabra.
   python3 ../comun/narrar.py            → audio/narracion.wav, timeline.json y web/timeline.js
La velocidad de los cortos es 1.0 (los videos largos usan 0.92). "say" es la escritura fonética de "text".
Los tiempos por palabra salen de transcribir la narración con Whisper y alinearla con el texto del guion.
"""
import json, os, re, sys, unicodedata, difflib
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from voz import decir, SR
from scipy.signal import resample_poly
os.makedirs('audio', exist_ok=True); os.makedirs('web', exist_ok=True)
VEL = float(os.environ.get('VELOCIDAD', '1.0'))
cues = json.load(open('cues.json'))
t = 0.0; timeline = []; track = []
for c in cues:
    if 'silence' in c:
        track.append(np.zeros(int(SR * c['silence']), np.float32))
        timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + c['silence'], 3)})
        t += c['silence']; continue
    a = decir(c.get('say', c['text']), VEL); d = len(a) / SR
    timeline.append({'id': c['id'], 'start': round(t, 3), 'end': round(t + d, 3), 'text': c['text']})
    print(c['id'], round(t, 1), flush=True)
    track.append(a); t += d
    track.append(np.zeros(int(SR * c['pause']), np.float32)); t += c['pause']
audio = np.concatenate(track)
sf.write('audio/narracion.wav', audio, SR)

# ---------- tiempos por palabra ----------
def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    return re.sub(r'[^a-z0-9ñ]', '', ''.join(ch for ch in w if unicodedata.category(ch) != 'Mn'))
from faster_whisper import WhisperModel
m = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4)
a16 = resample_poly(audio, 2, 3).astype(np.float32)
segs, _ = m.transcribe(a16, language='es', beam_size=3, word_timestamps=True)
segs = list(segs)
# lo que entendió Whisper, para buscar palabras mal pronunciadas
open('audio/oido.txt', 'w').write('\n'.join(f'{s.start:7.1f}  {s.text.strip()}' for s in segs))
heard = [(norm(w.word), w.start, w.end) for s in segs for w in s.words]
heard = [h for h in heard if h[0]]
ours = []   # (cue, índice, palabra tal como se escribe, normalizada)
for c in timeline:
    if 'text' in c:
        for i, w in enumerate(c['text'].split()):
            ours.append((c, i, w, norm(w)))
sm = difflib.SequenceMatcher(a=[o[3] for o in ours], b=[h[0] for h in heard], autojunk=False)
times = [None] * len(ours)
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        times[blk.a + k] = heard[blk.b + k][1:]
# las palabras no reconocidas se reparten entre las vecinas, dentro de su frase
for c in timeline:
    if 'text' not in c: continue
    idx = [j for j, o in enumerate(ours) if o[0] is c]
    n = len(idx)
    for k, j in enumerate(idx):
        if times[j] is None or not (c['start'] - .3 <= times[j][0] <= c['end'] + .3):
            times[j] = None
    known = [(k, times[j]) for k, j in enumerate(idx) if times[j] is not None]
    for k, j in enumerate(idx):
        if times[j] is not None: continue
        prev = max([q for q in known if q[0] < k], default=None, key=lambda q: q[0])
        nxt = min([q for q in known if q[0] > k], default=None, key=lambda q: q[0])
        a0 = prev[1][1] if prev else c['start']; a1 = nxt[1][0] if nxt else c['end']
        k0 = prev[0] if prev else -1; k1 = nxt[0] if nxt else n
        s = a0 + (a1 - a0) * (k - k0 - .5) / (k1 - k0 - 1 + 1e-9) if k1 - k0 > 1 else a0
        times[j] = (s, min(a1, s + .3))
    c['words'] = [{'w': ours[j][2], 's': round(times[j][0], 3), 'e': round(times[j][1], 3)} for j in idx]
ok = sum(1 for b in sm.get_matching_blocks() for _ in range(b.size))
print(f'palabras alineadas con Whisper: {ok} de {len(ours)}')
tl = {'duration': round(t, 3), 'cues': timeline}
json.dump(tl, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
open('web/timeline.js', 'w').write('window.TL=' + json.dumps(tl, ensure_ascii=False) + ';\n')
print('duración total', round(t, 2))
