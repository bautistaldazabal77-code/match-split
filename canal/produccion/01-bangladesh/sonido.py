"""Música, efectos y mezcla del video completo.

Todo se sintetiza: un colchón grave que cambia de acorde en cada capítulo, pulsos de tensión,
golpes, relojes, teléfonos, tecleo e impresoras. Los momentos salen de timeline.json con la misma
fórmula AT() que usa web/motor.js, así cada efecto cae sobre su animación.
"""
import json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, oaconvolve, resample_poly
SR = 44100
rng = np.random.default_rng(7)
tl = json.load(open('timeline.json')); C = {c['id']: c for c in tl['cues']}
S = lambda i: C[i]['start']
E = lambda i: C[i]['end']
def AT(cid, frase):  # misma fórmula que AT() en motor.js
    c = C[cid]; return c['start'] + (c['end'] - c['start']) * c['text'].index(frase) / len(c['text'])
D = tl['duration']; N = int(D * SR) + SR
F32 = np.float32

def lp(x, f, o=4): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x).astype(F32)
def hp(x, f, o=4): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x).astype(F32)
def bp(x, a, b, o=4): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x).astype(F32)
def tt(dur): return (np.arange(int(dur * SR)) / SR).astype(F32)
def place(dst, src, t0, g=1.0):
    i = int(t0 * SR)
    if i < 0: src = src[-i:]; i = 0
    j = min(len(dst), i + len(src))
    if i < len(dst): dst[i:j] += (g * src[:j - i]).astype(F32)
def reverb(x, dur=2.5, decay=0.6, mix=0.3):
    t = tt(dur); ir = (rng.standard_normal(len(t)) * np.exp(-t / decay)).astype(F32) * 0.02
    w = oaconvolve(x, ir)[:len(x)].astype(F32)
    w = lp(w, 6000); w /= (np.max(np.abs(w)) + 1e-9)
    return ((1 - mix) * x + mix * w * np.max(np.abs(x))).astype(F32)
def norm(x, peak): return (x / (np.max(np.abs(x)) + 1e-9) * peak).astype(F32)

# ---------- Música: un colchón por capítulo, con fundidos entre uno y otro ----------
NOTE = {'D1': 36.71, 'F1': 43.65, 'G1': 49.0, 'A1': 55.0, 'Bb1': 58.27, 'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.0, 'A2': 110.0,
        'Bb2': 116.54, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.0, 'A3': 220.0, 'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'A4': 440.0}
def voice(t, f, amp, harm=6, det=0.0025):
    out = np.zeros(len(t), F32)
    vib = 0.15 * np.sin(2 * np.pi * 0.07 * t + rng.uniform(0, 6))
    for k in range(1, harm + 1):
        a = amp / k ** 1.6
        out += a * np.sin(2 * np.pi * f * k * t + vib * k + rng.uniform(0, 6)).astype(F32)
        out += a * np.sin(2 * np.pi * f * k * (1 + det) * t + rng.uniform(0, 6)).astype(F32)
    return out
def pad(dur, notes, bright=700, breath=17.0):
    t = tt(dur)
    amps = [0.9, 0.7, 0.45, 0.28, 0.16, 0.1]
    x = sum(voice(t, NOTE[n], amps[min(i, 5)], 3 if i == 0 else 6) for i, n in enumerate(notes))
    x *= (0.6 + 0.4 * np.sin(2 * np.pi * t / breath) ** 2).astype(F32)
    return lp(x, bright)
def arp(dur, notes, step=0.5, g=0.12, seed=1):
    """notas sueltas tipo campana, suaves (capítulos de redes y computadoras)"""
    r = np.random.default_rng(seed); out = np.zeros(int(dur * SR), F32); t1 = tt(1.6)
    for k in range(int(dur / step)):
        f = NOTE[notes[r.integers(len(notes))]] * 2
        n = (np.sin(2 * np.pi * f * t1) + 0.3 * np.sin(2 * np.pi * 2 * f * t1)) * np.exp(-t1 * 3.2) * np.minimum(1, t1 / 0.01)
        place(out, n.astype(F32), k * step + r.uniform(0, 0.04), g * (0.6 + 0.4 * r.random()))
    return hp(out, 300)

# secciones: (inicio, fin, notas, brillo, ganancia, arpegio)
SEC = [
    (0, S('title'), ['D1', 'D2', 'A2', 'F3', 'A3'], 700, 1.0, None),
    (S('title'), S('ch2'), ['D1', 'D2', 'A2', 'F3', 'A3'], 650, 0.9, None),
    (S('ch2'), S('ch3'), ['A1', 'A2', 'E3', 'C4', 'E4'], 800, 0.85, ['A2', 'C3', 'E3', 'A3', 'E4']),
    (S('ch3'), S('ch4'), ['F1', 'F2', 'C3', 'A3', 'D4'], 750, 0.85, None),
    (S('ch4'), AT('c125', 'una palabra'), ['D1', 'D2', 'A2', 'Bb2', 'F3'], 600, 1.0, None),
    (AT('c125', 'una palabra'), S('ch5'), ['D1', 'D2', 'A2', 'F3', 'D4'], 700, 0.95, None),
    (S('ch5'), S('ch6'), ['G1', 'G2', 'D3', 'Bb3', 'D4'], 650, 0.85, None),
    (S('ch6'), S('ch7'), ['C2', 'C3', 'G3', 'E4', 'Bb3'], 800, 0.8, None),
    (S('ch7'), S('epi'), ['Bb1', 'Bb2', 'F3', 'D4', 'A3'], 700, 0.9, ['Bb2', 'D3', 'F3', 'A3', 'C4']),
    (S('epi'), D + 1, ['D1', 'D2', 'A2', 'F3', 'A3'], 700, 0.95, None),
]
music = np.zeros(N, F32)
XF = 3.0
for i, (a, b, notes, br, g, ap) in enumerate(SEC):
    a0, b0 = max(0, a - XF / 2), min(D + 1, b + XF / 2)
    x = pad(b0 - a0, notes, br)
    if ap: x += arp(b0 - a0, ap, seed=i)
    n = len(x); fade = np.ones(n, F32); k = int(XF * SR)
    fade[:k] = np.linspace(0, 1, k) if i else 1; fade[-k:] = np.minimum(fade[-k:], np.linspace(1, 0, k))
    place(music, x * fade * g, a0)
T = (np.arange(N) / SR).astype(F32)
air = (lp(hp(rng.standard_normal(N).astype(F32), 2500), 7000) * 0.05 * (0.5 + 0.5 * np.sin(2 * np.pi * T / 11))).astype(F32)
music += air
# brillo agudo que crece antes del título (como en la muestra)
sh = pad(S('title') - 40, ['A4'], 3000) * np.linspace(0, 1.4, int((S('title') - 40) * SR)).astype(F32)
place(music, sh * 0.05, 40)

# curva general: sube en los momentos clave, se apaga antes de JUPITER, cierra en negro
title, chap = S('title'), S('chapter'); jw = E('c125') + 1.5
env_pts = [(0, 0.0), (2.6, 0.35), (27, 0.5), (43, 0.55), (60, 0.95), (title - 0.05, 1.1), (title, 0.55), (title + 4.5, 0.7), (chap, 0.35), (chap + 3, 0.5),
           (S('c38'), 0.55), (S('c39'), 0.9), (E('c39') + 1.5, 0.5),
           (S('ch2'), 0.5), (S('c54'), 0.5), (E('c55'), 0.65), (S('c56'), 0.45),
           (S('ch3'), 0.5), (S('c98'), 0.5), (S('c105'), 0.75), (E('c107'), 0.5), (S('c109'), 0.7), (S('ch4') - .1, 0.8),
           (S('ch4'), 0.5), (S('c111'), 0.6), (E('c116'), 0.75), (S('c122'), 0.55), (E('c125'), 0.8), (E('c125') + .6, 0.0), (jw + 0.6, 0.0), (jw + 1.2, 0.9), (S('c127'), 0.55),
           (S('c136'), 0.65), (E('c139'), 0.7), (S('c140'), 0.5), (S('c156'), 0.6), (E('c158'), 0.8), (S('ch5') - .1, 0.6),
           (S('ch5'), 0.45), (S('c172'), 0.6), (E('c173'), 0.5), (S('c178'), 0.3), (S('c182'), 0.5), (E('c190'), 0.65), (S('c193'), 0.85), (S('ch6') - .1, 0.6),
           (S('ch6'), 0.5), (S('c215'), 0.6), (E('c217'), 0.5), (S('c228'), 0.75), (S('ch7') - .1, 0.6),
           (S('ch7'), 0.5), (S('c237'), 0.6), (E('c239'), 0.5), (S('c256'), 0.4), (S('c265'), 0.55), (E('c267'), 0.75),
           (S('epi'), 0.5), (S('c278'), 0.55), (S('c283'), 0.75), (S('c286'), 0.6), (E('c288'), 0.9), (E('c288') + 2.5, 0.55), (D - 1, 0.25), (D + 1, 0)]
p = np.array(env_pts, float); music *= np.interp(T, p[:, 0], p[:, 1]).astype(F32)

# ---------- Pulsos de tensión (latido grave) ----------
pulse = np.zeros(N, F32)
def beat(g=1.0):
    t = tt(0.5); return (np.sin(2 * np.pi * (48 + 12 * np.exp(-t * 20)) * t) * np.exp(-t * 7) * g).astype(F32)
def pulses(a, b, period=1.25, accel=1.0, g=0.5):
    t = a; per = period
    while t < b:
        place(pulse, beat(), t, g); t += per; per = max(0.45, per * accel)
pulses(S('c21'), E('c23'), 1.25)                            # bandeja vacía
pulses(S('c54'), E('c55'), 1.1)                             # el rojo salta en la red
pulses(S('c111'), E('c116'), 0.9)                           # salen las órdenes
pulses(S('c123'), E('c125') + .3, 1.0, 0.94)                # el filtro, cada vez más rápido
pulses(S('c172'), E('c173'), 1.0)                           # el reloj de los atacantes
pulses(S('c215'), E('c215'), 1.1)                           # mano tras mano
pulses(S('c258'), E('c259'), 1.2)                           # las pruebas

# ---------- Efectos ----------
sfx = np.zeros(N, F32)
def boom(g=1.0, dur=4.0):
    t = tt(dur); f = 32 + 40 * np.exp(-t * 3)
    b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.3)
    b += lp(rng.standard_normal(len(t)).astype(F32), 180) * np.exp(-t * 9) * 0.8
    return reverb(b.astype(F32), 3, 0.9, 0.35) * g
def whoosh(dur=1.6, g=0.5):
    t = tt(dur); n = rng.standard_normal(len(t)).astype(F32); out = np.zeros_like(n)
    for i, (a, b) in enumerate([(300, 900), (600, 1800), (1200, 3600)]):
        out += bp(n, a, b) * np.sin(np.pi * np.clip(t / dur, 0, 1)) ** (2 + i)
    return out * g
def click(g=1.0):
    t = tt(0.012); return bp(rng.standard_normal(len(t)).astype(F32), 1800, 6500) * np.exp(-t * 500) * g
def thud(g=1.0):
    t = tt(0.18); return ((np.sin(2 * np.pi * 85 * t) * np.exp(-t * 35) + lp(rng.standard_normal(len(t)).astype(F32), 400) * np.exp(-t * 60) * 0.6) * g).astype(F32)
def stamp(g=1.0):
    x = thud(g * 1.2); x[:int(0.012 * SR)] += click(g * 0.6); return x
def motor(dur, f0=95, jam=False):
    t = tt(dur); f = f0 * (1 + 0.04 * np.sin(2 * np.pi * 7 * t))
    if jam: f *= np.clip(1 - 0.5 * (t / dur) ** 2, 0.4, 1) * (1 + 0.08 * rng.standard_normal(len(t)).cumsum() / np.sqrt(np.arange(1, len(t) + 1)))
    ph = 2 * np.pi * np.cumsum(f) / SR; saw = (2 * ((ph / (2 * np.pi)) % 1) - 1).astype(F32)
    s = bp(saw, 150, 2500) * np.minimum(1, t / 0.08)
    if jam: s *= (0.6 + 0.4 * (rng.random(len(t)) > 0.12)).astype(F32)
    return s * 0.35
def beep(f, dur=0.09, g=0.3):
    t = tt(dur); return (np.sin(2 * np.pi * f * t) * np.minimum(1, t / 0.004) * np.exp(-t * 18) * g).astype(F32)
def chime(g=0.3):
    t = tt(1.2); return ((np.sin(2 * np.pi * 880 * t) + .5 * np.sin(2 * np.pi * 1320 * t)) * np.exp(-t * 4) * np.minimum(1, t / .005) * g).astype(F32)
def ring(dur=2.0, g=0.25):   # tono de llamada (dos frecuencias)
    t = tt(dur); x = (np.sin(2 * np.pi * 440 * t) + np.sin(2 * np.pi * 480 * t)) * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .02)
    return bp(x.astype(F32), 300, 3400) * g
def tick(g=0.35):
    t = tt(0.03); return bp(rng.standard_normal(len(t)).astype(F32), 2500, 8000) * np.exp(-t * 300) * g
def static(dur, g=0.15): return (hp(rng.standard_normal(int(dur * SR)).astype(F32), 800) * g).astype(F32)
def flip(g=0.4):
    t = tt(0.07); return bp(rng.standard_normal(len(t)).astype(F32), 1200, 5000) * np.exp(-t * 60) * g
def alarm(dur=1.4, g=0.22):
    t = tt(dur); f = np.where((t * 4).astype(int) % 2 == 0, 880, 660); x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.minimum(1, (dur - t) / .05)
    return lp(x.astype(F32), 2500) * g
def glitch(dur=0.6, g=0.3):
    n = rng.standard_normal(int(dur * SR)).astype(F32); gate = (rng.random(int(dur * 40)) > .5).repeat(int(SR / 40) + 1)[:len(n)]
    return bp(n * gate, 400, 6000) * g
def typing(dst, a, b, cps=11, g=0.45):
    t = a
    while t < b: place(dst, click(g * (0.6 + 0.4 * rng.random())), t); t += rng.uniform(0.6, 1.4) / cps

# --- apertura y capítulo I (como en la muestra) ---
place(sfx, motor(0.9), 0.25); place(sfx, motor(0.35, jam=True), 1.15)
for tc in [0.32, 0.47, 0.66, 0.81, 1.02, 1.21, 1.33]: place(sfx, click(0.7), tc)
place(sfx, thud(0.9), 1.52); place(sfx, motor(0.45, 88), 1.85); place(sfx, motor(0.25, 80, jam=True), 2.28)
for tc in [1.9, 2.05, 2.31]: place(sfx, click(0.6), tc)
place(sfx, thud(0.8), 2.55)
place(sfx, boom(0.55, 3.5), S('c6') - 0.05)
place(sfx, boom(0.45, 3.0), E('c10') + 0.25)
place(sfx, boom(1.0, 5.0), title)
place(sfx, whoosh(1.4, 0.35), S('c12') - 0.6)
place(sfx, click(0.5), S('c21') + 0.4); place(sfx, click(0.4), S('c21') + 1.6)
q = C['c23']; quote = '“' + q['text'] + '”'; ts, te = q['start'] - 0.2, q['end'] - 0.3
for i, ch in enumerate(quote):
    if ch.strip(): place(sfx, click(0.55 + 0.25 * rng.random()), ts + (te - ts) * i / len(quote))
for i in range(7): place(sfx, click(0.8), E('c10') + 0.25 + i * 0.11)
s3, s4 = S('c3'), S('c4')
for i in range(11): place(sfx, click(0.45 + 0.2 * rng.random()), s3 - 0.3 + i * 0.045)
for i in range(10): place(sfx, click(0.55 + 0.2 * rng.random()), s3 + 0.25 + i * 0.085)
place(sfx, beep(660), AT('c3', 'correctas')); place(sfx, beep(990), AT('c3', 'correctas') + 0.1)
place(sfx, beep(520, 0.06, 0.18), s4 + 0.2); place(sfx, beep(780, 0.08, 0.22), AT('c4', 'sistema'))
place(sfx, click(0.8), AT('c5', 'el día') - 0.15)
hr = AT('c5', 'la hora')
for i in range(9): place(sfx, click(0.35), hr - 0.25 + i * 0.09)
for i in range(4): place(sfx, click(0.6), AT('c5', 'feriado') - 0.45 + i * 0.14)
place(sfx, thud(1.1), S('c6') + 0.02)
for c in ['c7', 'c8', 'c9']: place(sfx, whoosh(0.4, 0.28), E(c) - 0.3)
place(sfx, click(0.7), AT('c10', 'palabra') - 0.1)
place(sfx, whoosh(1.2, 0.22), S('c2') - 0.6)
place(sfx, whoosh(1.3, 0.25), S('c17') - 0.5)
t0, gap = AT('c18', 'Su única') + 0.1, 0.8                     # PRINT0, PRINTGAP (cap0.js)
for i in range(9):
    place(sfx, motor(0.5, 118) * 0.55, t0 + i * gap)
    for k in range(3): place(sfx, click(0.3), t0 + i * gap + 0.1 + k * 0.13)
place(sfx, whoosh(1.0, 0.18), S('c20') - 0.5)
for d in [0.35, 1.05, 1.75]:                                    # LIGHTS_OFF (cap0.js)
    tc = AT('c24', 'La impresora') + d; place(sfx, click(1.0), tc); place(sfx, thud(0.4), tc + 0.01)
t0, gap = AT('c34', 'empiezan') - 0.1, 0.55                     # PR3_0, PR3GAP (cap1.js)
place(sfx, motor(0.6, 90, jam=True), t0 - 1.2)
for i in range(12):
    place(sfx, motor(0.35, 118) * 0.5, t0 + i * gap)
    for k in range(2): place(sfx, click(0.25), t0 + i * gap + 0.08 + k * 0.12)
place(sfx, stamp(0.7), AT('c37', 'salieron'))
place(sfx, boom(0.6, 3.5), S('c39') - 0.05)
place(sfx, whoosh(2.2, 0.3), AT('c41', 'retroceder') - 0.2)

# placas de capítulo
for ch in ['chapter', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'epi']:
    place(sfx, whoosh(1.8, 0.45), S(ch) - 0.4); place(sfx, boom(0.35, 3.5), S(ch) + 0.3)

# --- capítulo II ---
place(sfx, chime(0.25), AT('c43', 'reciben') - 0.1)
place(sfx, click(0.6), S('c45') + 0.15)
place(sfx, click(0.8), AT('c49', 'descargó') - 0.2)
place(sfx, beep(520, 0.12, 0.2), AT('c49', 'documentos') + 0.4)
ENTRY = AT('c50', 'clic'); place(sfx, click(1.0), ENTRY); place(sfx, boom(0.4, 3.0), ENTRY + 0.05); place(sfx, glitch(0.5, 0.2), ENTRY + 0.1)
place(sfx, glitch(1.2, 0.08), S('c51') - 0.2)
place(sfx, whoosh(0.5, 0.3), AT('c52', 'No hubo')); place(sfx, whoosh(0.5, 0.3), E('c52') - 0.3)
place(sfx, stamp(0.5), S('c57') - 0.1)
for i, k in enumerate([S('c61') + .3, AT('c61', 'lugar correcto'), AT('c61', 'claves correctas')]): place(sfx, beep(660 + 110 * i, 0.08, 0.2), k)
place(sfx, beep(220, 0.25, 0.25), E('c61') + 0.2)
place(sfx, stamp(0.6), AT('c63', 'un control'))
for i in range(3): place(sfx, click(0.7), AT('c68', 'borraban') - .2 + i * .35)
place(sfx, boom(0.4, 3.0), AT('c75', 'casualmente'))

# --- capítulo III ---
ACC_FAKE, ACC_OK = AT('c81', 'falsas') - .1, S('c83') + .1     # cap3.js
for i in range(4): place(sfx, stamp(0.6), ACC_FAKE + i * .15); place(sfx, stamp(0.5), ACC_OK + i * .12)
for i in range(9): place(sfx, tick(0.4), S('c86') - .2 + i * .5)
for tc in np.arange(S('c98'), S('c106') - .5, 0.5): place(sfx, tick(0.3), tc)    # el calendario
place(sfx, boom(0.5, 3.5), AT('c105', 'cinco días'))
place(sfx, click(1.0), AT('c109', 'el botón') + .2); place(sfx, boom(0.7, 4.0), AT('c109', 'el botón') + .25)

# --- capítulo IV ---
def ORD4(n): return [S('c112'), S('c113'), S('c114')][n] if n < 3 else S('c115') + (AT('c115', 'órdenes') + .4 - S('c115')) * (n - 3) / 32
for n in range(35):
    place(sfx, beep(1200 if n < 3 else 1000, 0.05, 0.16 if n < 3 else 0.08), ORD4(n))
    if n < 3: typing(sfx, ORD4(n) - .35, ORD4(n) - .05, 18, 0.35)
place(sfx, boom(0.45, 3.0), AT('c116', 'Suman') - .1)
for i in range(4): place(sfx, beep(880, .06, .15), [AT('c120', 'SWIFT'), AT('c120', 'autenticadas'), AT('c120', 'desde la cuenta'), S('c121') + .3][i])
place(sfx, stamp(0.7), AT('c121', 'perfectamente'))
place(sfx, beep(330, 0.3, 0.2), AT('c125', 'una palabra'))
for i in range(7): place(sfx, click(0.9), jw + i * 0.14)
place(sfx, boom(1.0, 5.0), jw + 7 * 0.14 + .1)
place(sfx, alarm(1.6, 0.18), AT('c130', 'alerta') - .1)
for i in range(30): place(sfx, stamp(0.25), AT('c136', 'frenó') - .2 + i * .05)
place(sfx, boom(0.5, 3.0), AT('c139', 'más de'))
place(sfx, boom(0.4, 3.0), S('c143'))
place(sfx, click(0.8), AT('c146', 'Fandation') - .3); place(sfx, click(0.8), AT('c147', 'Fundation') - .3)
place(sfx, whoosh(1.2, 0.25), AT('c151', 'volvieron') - .6)
for i in range(4): place(sfx, whoosh(0.5, 0.18), AT('c153', 'los titulares') - .5 + i * .55)
place(sfx, boom(0.6, 4.0), AT('c157', 'ochocientos') - .4)
place(sfx, boom(0.5, 3.5), S('c159') - .1)

# --- capítulo V ---
for tc in np.arange(S('c168') + .6, E('c169') + .5, 4.0): place(sfx, ring(2.0, 0.12), tc)
place(sfx, stamp(0.7), AT('c166', 'falsificadas') - .3)
for tc in np.arange(S('c172') - .2, E('c172'), 0.12): place(sfx, tick(0.25), tc)
place(sfx, whoosh(0.8, 0.25), AT('c173', 'llegan') - .3)
place(sfx, stamp(0.8), AT('c175', 'secreto') - .2)
place(sfx, beep(400, 0.5, 0.15), S('c178') - .1); place(sfx, click(0.8), S('c178'))
place(sfx, stamp(0.9), AT('c179', 'son públicas') - .2)
place(sfx, boom(0.5, 3.5), AT('c180', 'explota'))
place(sfx, boom(0.4, 3.0), AT('c190', 'el dinero se fue'))
place(sfx, stamp(0.5), AT('c192', 'no llegaba') - .1)
place(sfx, boom(0.6, 4.0), S('c193') - .1)

# --- capítulo VI ---
place(sfx, whoosh(1.4, 0.3), AT('c199', 'avión') - .5)
per = 2.2; a = S('c215') - .2
for k in range(int((E('c215') - a) / per) + 1):
    for i in range(6): place(sfx, flip(0.3), a + k * per + per * ((i % 3) * .12 + (i // 3) * .06))
    for i in range(6): place(sfx, click(0.25), a + k * per + per * .3 + i * .03)
WALL6 = AT('c217', 'una pared') - .1
place(sfx, thud(1.4), WALL6); place(sfx, boom(0.5, 3.0), WALL6 + .05)
place(sfx, stamp(0.5), S('c219')); place(sfx, stamp(0.5), AT('c219', 'los cargos'))
place(sfx, static(E('c225') - S('c223'), 0.035), S('c223'))
place(sfx, stamp(0.5), AT('c226', 'incluir'))
place(sfx, whoosh(0.6, 0.3), S('c228') - .3)

# --- capítulo VII ---
place(sfx, glitch(1.0, 0.18), AT('c231', 'difíciles') - .4); place(sfx, glitch(0.6, 0.15), AT('c231', 'eliminar') + .2)
SKULL7 = AT('c237', 'esqueleto') - .2
place(sfx, glitch(1.6, 0.25), SKULL7); place(sfx, boom(0.5, 3.5), SKULL7)
for w in ['correos', 'salarios', 'películas']: place(sfx, whoosh(0.5, 0.2), AT('c238', w) - .2)
place(sfx, thud(0.8), AT('c238', 'paralizadas'))
place(sfx, stamp(0.6), S('c241') - .3)
place(sfx, boom(0.4, 3.0), AT('c255', 'farsa'))
for i in range(4): place(sfx, whoosh(0.4, 0.15), [AT('c259', 'código compartido'), AT('c259', 'direcciones'), AT('c259', 'cuentas en internet'), AT('c259', 'patrones')][i])

# --- epílogo ---
for i in range(3): place(sfx, whoosh(0.5, 0.15), [AT('c268', 'los veinte') - .2, AT('c268', 'una parte') - .1, S('c269') - .1][i])
place(sfx, stamp(0.6), AT('c271', 'culpable'))
for k in range(30): place(sfx, tick(0.35), AT('c277', 'se postergó') - .4 + k * 0.13)
for i in range(4): place(sfx, beep(660, .06, .12), [S('c280'), AT('c280', 'las cuentas'), AT('c281', 'zonas horarias'), AT('c282', 'impresora')][i])
END8 = [AT('c287', 'lo único') - .2, AT('c287', 'casi mil'), AT('c287', 'del mundo') + .2]
for tc in END8: place(sfx, click(1.0), tc); place(sfx, thud(0.4), tc + 0.01)
place(sfx, boom(0.7, 5.0), E('c288') + .2)

# ---------- Narración y mezcla ----------
nar, nsr = sf.read('audio/narracion.wav', dtype='float32')
nar = resample_poly(nar, 147, 80).astype(F32)[:N]; nar = np.pad(nar, (0, N - len(nar)))
nar = hp(nar, 75, 2)
nar = reverb(nar, 0.9, 0.12, 0.10)
w = int(0.25 * SR)
e = np.sqrt(np.convolve(nar.astype(np.float64) ** 2, np.ones(w) / w, 'same')).astype(F32)
duck = np.clip(e / (np.percentile(e, 90) + 1e-9), 0, 1)
duck = np.convolve(duck, np.ones(int(0.4 * SR), F32) / int(0.4 * SR), 'same').astype(F32)
music_g = 1 - 0.45 * duck
mix = norm(nar, 0.85) + norm(music, 0.20) * music_g + norm(pulse, 0.10) + norm(sfx, 0.45)
mix = (np.tanh(mix * 1.1) / np.tanh(1.1)).astype(F32)
mix = mix[:int(D * SR)]
wide = norm(air, 0.04)[:len(mix)]
st = np.stack([mix + wide * 0.5, mix - wide * 0.5], 1)
sf.write('audio/mezcla.wav', st, SR)
print('ok', round(D, 2), 's')
