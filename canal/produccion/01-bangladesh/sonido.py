import json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
SR = 44100
rng = np.random.default_rng(7)
tl = json.load(open('timeline.json')); C = {c['id']: c for c in tl['cues']}
def AT(cid, frase):  # misma fórmula que AT() en escenas.js
    c = C[cid]; return c['start'] + (c['end'] - c['start']) * c['text'].index(frase) / len(c['text'])
D = tl['duration']; N = int(D * SR); T = np.arange(N) / SR

def lp(x, f, o=4): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=4): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=4): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def env(points):  # lista de (tiempo, ganancia) -> curva lineal
    p = np.array(points, float); return np.interp(T, p[:, 0], p[:, 1])
def place(dst, src, t0, g=1.0):
    i = int(t0 * SR); j = min(len(dst), i + len(src))
    if i < len(dst): dst[i:j] += g * src[:j - i]
def ir(dur, decay):
    t = np.arange(int(dur * SR)) / SR
    return (rng.standard_normal(len(t)) * np.exp(-t / decay)).astype(np.float64) * 0.02
def reverb(x, dur=2.5, decay=0.6, mix=0.3):
    w = fftconvolve(x, ir(dur, decay))[:len(x)]
    w = lp(w, 6000); w /= (np.max(np.abs(w)) + 1e-9); return (1 - mix) * x + mix * w * np.max(np.abs(x))

# ---------- Música: colchón grave en re menor, que evoluciona ----------
def voice_tone(f, amp, harm=6, det=0.0025):
    out = np.zeros(N)
    vib = 0.15 * np.sin(2 * np.pi * 0.07 * T + rng.uniform(0, 6))
    for k in range(1, harm + 1):
        a = amp / k ** 1.6
        out += a * np.sin(2 * np.pi * f * k * T + vib * k + rng.uniform(0, 6))
        out += a * np.sin(2 * np.pi * f * k * (1 + det) * T + rng.uniform(0, 6))
    return out
pad = (voice_tone(36.71, 0.9, 3) + voice_tone(73.42, 0.7) + voice_tone(110.0, 0.45) +
       voice_tone(174.61, 0.28) + voice_tone(220.0, 0.16))
pad *= 0.6 + 0.4 * np.sin(2 * np.pi * T / 17.0) ** 2           # respiración lenta
pad = lp(pad, 700)
air = lp(hp(rng.standard_normal(N), 2500), 7000) * 0.05 * (0.5 + 0.5 * np.sin(2 * np.pi * T / 11))
shimmer = voice_tone(440.0, 0.05, 2) * env([(0, 0), (43, 0), (52, 1), (63, 1.4), (63.1, 0), (D, 0)])
music = pad + air + lp(shimmer, 3000)
title = C['title']['start']; chap = C['chapter']['start']
music *= env([(0, 0.0), (2.6, 0.35), (27, 0.5), (43, 0.55), (60, 0.95), (title - 0.05, 1.1), (title, 0.55),
              (title + 4.5, 0.7), (chap, 0.35), (chap + 3, 0.5), (110, 0.55), (126, 0.65), (D - 3, 0.3), (D, 0)])

# Pulso de tensión (bandeja vacía -> cita)
pulse = np.zeros(N)
t0 = C['c21']['start']
for k in range(int((C['c23']['end'] - t0) / 1.25)):
    tt = np.arange(int(0.5 * SR)) / SR
    place(pulse, np.sin(2 * np.pi * (48 + 12 * np.exp(-tt * 20)) * tt) * np.exp(-tt * 7), t0 + k * 1.25, 0.5)

# ---------- Efectos ----------
sfx = np.zeros(N)
def boom(g=1.0, dur=4.0):
    tt = np.arange(int(dur * SR)) / SR
    f = 32 + 40 * np.exp(-tt * 3)
    b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.3)
    b += lp(rng.standard_normal(len(tt)), 180) * np.exp(-tt * 9) * 0.8
    return reverb(b, 3, 0.9, 0.35) * g
def whoosh(dur=1.6, g=0.5):
    tt = np.arange(int(dur * SR)) / SR
    n = rng.standard_normal(len(tt)); out = np.zeros_like(n)
    for i, (a, b) in enumerate([(300, 900), (600, 1800), (1200, 3600)]):
        out += bp(n, a, b) * np.sin(np.pi * np.clip((tt / dur) * 1.0, 0, 1)) ** (2 + i)
    return out * g
def click(g=1.0):
    tt = np.arange(int(0.012 * SR)) / SR
    return bp(rng.standard_normal(len(tt)), 1800, 6500) * np.exp(-tt * 500) * g
def thud(g=1.0):
    tt = np.arange(int(0.18 * SR)) / SR
    return (np.sin(2 * np.pi * 85 * tt) * np.exp(-tt * 35) + lp(rng.standard_normal(len(tt)), 400) * np.exp(-tt * 60) * 0.6) * g
def motor(dur, f0=95, jam=False):
    tt = np.arange(int(dur * SR)) / SR
    f = f0 * (1 + 0.04 * np.sin(2 * np.pi * 7 * tt))
    if jam: f *= np.clip(1 - 0.5 * (tt / dur) ** 2, 0.4, 1) * (1 + 0.08 * rng.standard_normal(len(tt)).cumsum() / np.sqrt(np.arange(1, len(tt) + 1)))
    ph = 2 * np.pi * np.cumsum(f) / SR
    saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
    s = bp(saw, 150, 2500) * np.minimum(1, tt / 0.08)
    if jam: s *= 0.6 + 0.4 * (rng.random(len(tt)) > 0.12)
    return s * 0.35
# impresora que intenta arrancar y se traba
place(sfx, motor(0.9), 0.25); place(sfx, motor(0.35, jam=True), 1.15)
for tclk in [0.32, 0.47, 0.66, 0.81, 1.02, 1.21, 1.33]: place(sfx, click(0.7), tclk)
place(sfx, thud(0.9), 1.52)
place(sfx, motor(0.45, 88), 1.85); place(sfx, motor(0.25, 80, jam=True), 2.28)
for tclk in [1.9, 2.05, 2.31]: place(sfx, click(0.6), tclk)
place(sfx, thud(0.8), 2.55)
# golpes graves
place(sfx, boom(0.55, 3.5), C['c6']['start'] - 0.05)
place(sfx, boom(0.45, 3.0), C['c10']['end'] + 0.25)      # aparece JUPITER
place(sfx, boom(1.0, 5.0), title)                          # placa de título
place(sfx, whoosh(1.4, 0.35), C['c12']['start'] - 0.6)
place(sfx, whoosh(1.8, 0.5), chap - 0.4)
place(sfx, click(0.5), C['c21']['start'] + 0.4); place(sfx, click(0.4), C['c21']['start'] + 1.6)
# tecleo de la cita: misma fórmula que la animación (ver escenas.js)
q = C['c23']; quote = '“' + q['text'] + '”'
ts, te = q['start'] - 0.2, q['end'] - 0.3
for i, ch in enumerate(quote):
    if ch.strip(): place(sfx, click(0.55 + 0.25 * rng.random()), ts + (te - ts) * i / len(quote))
# tecleo de JUPITER
j0 = C['c10']['end'] + 0.25
for i in range(7): place(sfx, click(0.8), j0 + i * 0.11)

# ---------- Efectos de las escenas con imágenes (mismos tiempos que escenas.js) ----------
def beep(f, dur=0.09, g=0.3):
    tt = np.arange(int(dur * SR)) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / 0.004) * np.exp(-tt * 18) * g
def swish(dur=0.35, g=0.3): return whoosh(dur, g)
s3, s4 = C['c3']['start'], C['c4']['start']
for i in range(11): place(sfx, click(0.45 + 0.2 * rng.random()), s3 - 0.3 + i * 0.045)       # usuario
for i in range(10): place(sfx, click(0.55 + 0.2 * rng.random()), s3 + 0.25 + i * 0.085)      # contraseña
place(sfx, beep(660), AT('c3', 'correctas')); place(sfx, beep(990), AT('c3', 'correctas') + 0.1)
place(sfx, beep(520, 0.06, 0.18), s4 + 0.2); place(sfx, beep(780, 0.08, 0.22), AT('c4', 'sistema'))
place(sfx, click(0.8), AT('c5', 'el día') - 0.15)
hr = AT('c5', 'la hora')
for i in range(9): place(sfx, click(0.35), hr - 0.25 + i * 0.09)                            # agujas del reloj
for i in range(4): place(sfx, click(0.6), AT('c5', 'feriado') - 0.45 + i * 0.14)
place(sfx, thud(1.1), C['c6']['start'] + 0.02)                                              # sello
for c in ['c7', 'c8', 'c9']: place(sfx, swish(0.4, 0.28), C[c]['end'] - 0.3)                 # rayas rojas
place(sfx, click(0.7), AT('c10', 'palabra') - 0.1)
place(sfx, whoosh(1.2, 0.22), C['c2']['start'] - 0.6)                                       # Daca de noche
place(sfx, whoosh(1.3, 0.25), C['c17']['start'] - 0.5)                                      # la torre
t0, gap = AT('c18', 'Su única') + 0.1, 0.8                                                 # la impresora imprime (PRINT0, PRINTGAP)
for i in range(9):
    place(sfx, motor(0.5, 118) * 0.55, t0 + i * gap)
    for k in range(3): place(sfx, click(0.3), t0 + i * gap + 0.1 + k * 0.13)
place(sfx, whoosh(1.0, 0.18), C['c20']['start'] - 0.5)                                      # entra el archivo
for d in [0.35, 1.05, 1.75]:                                                                # se apagan las luces (LIGHTS_OFF)
    tt = AT('c24', 'La impresora') + d
    place(sfx, click(1.0), tt); place(sfx, thud(0.4), tt + 0.01)

# ---------- Narración ----------
nar, nsr = sf.read('audio/narracion.wav', dtype='float64')
nar = resample_poly(nar, 147, 80)[:N]; nar = np.pad(nar, (0, N - len(nar)))
nar = hp(nar, 75, 2)
nar = reverb(nar, 0.9, 0.12, 0.10)                          # sala chica, apenas
# ducking: baja la música cuando habla la voz
e = np.sqrt(np.convolve(nar ** 2, np.ones(int(0.25 * SR)) / int(0.25 * SR), 'same'))
duck = np.clip(e / (np.percentile(e, 90) + 1e-9), 0, 1)
duck = np.convolve(duck, np.ones(int(0.4 * SR)) / int(0.4 * SR), 'same')
music_g = 1 - 0.45 * duck

def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
mix = (norm(nar, 0.85) + norm(music, 0.20) * music_g + norm(pulse, 0.10) + norm(sfx, 0.45))
mix = np.tanh(mix * 1.1) / np.tanh(1.1)                    # limitador suave
st = np.stack([mix, mix], 1)
# leve ancho estéreo solo para música/aire
wide = norm(air, 0.04)
st[:, 0] += wide * 0.5; st[:, 1] -= wide * 0.5
sf.write('audio/mezcla.wav', st.astype(np.float32), SR)
print('ok', round(D, 2), 's')
