"""Vuelve a narrar solo algunas frases (por ejemplo, después de corregir una pronunciación en cues.json)
y las reemplaza en audio/narracion.wav, corriendo los tiempos de todo lo que viene después.
   python3 retocar_voz.py c106 c177 c241
"""
import sys, json, numpy as np, soundfile as sf
import narrar_base as nb
cues = {c['id']: c for c in json.load(open('cues.json'))}
tl = json.load(open('timeline.json'))
a, SR = sf.read('audio/narracion.wav', dtype='float32')
for cid in sorted(sys.argv[1:], key=lambda k: -next(i for i, c in enumerate(tl['cues']) if c['id'] == k)):
    i = next(i for i, c in enumerate(tl['cues']) if c['id'] == cid)
    c = tl['cues'][i]
    new = nb.decir(cues[cid].get('say', cues[cid]['text']))
    s0, s1 = round(c['start'] * SR), round(c['end'] * SR)
    a = np.concatenate([a[:s0], new, a[s1:]])
    d = round(len(new) / SR - (c['end'] - c['start']), 3)
    c['end'] = round(c['start'] + len(new) / SR, 3)
    for k in tl['cues'][i + 1:]: k['start'] = round(k['start'] + d, 3); k['end'] = round(k['end'] + d, 3)
    tl['duration'] = round(tl['duration'] + d, 3)
    print(cid, 'cambia', d, 's')
sf.write('audio/narracion.wav', a, SR)
json.dump(tl, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
open('web/timeline.js', 'w').write('window.TL=' + json.dumps(tl, ensure_ascii=False) + ';\n')
print('duración total', tl['duration'])
