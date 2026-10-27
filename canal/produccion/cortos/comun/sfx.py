"""Herramientas de sonido para los cortos: filtros, colchón musical y efectos sintetizados.

Se importa desde el sonido.py de cada episodio (que corre en la carpeta del episodio):
  import sys; sys.path.insert(0, '../comun'); from sfx import *
"""
import json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, oaconvolve, resample_poly
SR = 44100
F32 = np.float32
rng = np.random.default_rng(7)

def lp(x, f, o=4): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x).astype(F32)
def hp(x, f, o=4): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x).astype(F32)
def bp(x, a, b, o=4): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x).astype(F32)
def tt(dur): return (np.arange(int(dur * SR)) / SR).astype(F32)
def noise(dur): return rng.standard_normal(int(dur * SR)).astype(F32)
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
def env(T, pts): p = np.array(pts, float); return np.interp(T, p[:, 0], p[:, 1]).astype(F32)

# ---------- línea de tiempo (con el momento de cada palabra) ----------
def _norm(s):
    import unicodedata, re
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9ñ ]', '', s)
class Linea:
    """S(cue), E(cue), AT(cue, 'frase') y ATE(cue, 'frase'): las mismas cuentas que motor.js."""
    def __init__(self, path='timeline.json'):
        self.tl = json.load(open(path)); self.C = {c['id']: c for c in self.tl['cues']}; self.D = self.tl['duration']
    def S(self, i): return self.C[i]['start']
    def E(self, i): return self.C[i]['end']
    def _find(self, cid, frase):
        q = _norm(frase).split(); w = [_norm(x['w']) for x in self.C[cid]['words']]
        for i in range(len(w) - len(q) + 1):
            if w[i:i + len(q)] == q: return i, i + len(q) - 1
        raise KeyError(f'falta {frase} en {cid}')
    def AT(self, cid, frase): return self.C[cid]['words'][self._find(cid, frase)[0]]['s']
    def ATE(self, cid, frase): return self.C[cid]['words'][self._find(cid, frase)[1]]['e']

# ---------- música ----------
NOTE = {'D1': 36.71, 'E1': 41.2, 'F1': 43.65, 'G1': 49.0, 'A1': 55.0, 'Bb1': 58.27, 'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.0, 'A2': 110.0,
        'Bb2': 116.54, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.0, 'A3': 220.0, 'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'A4': 440.0}
def voice(t, f, amp, harm=6, det=0.0025):
    out = np.zeros(len(t), F32)
    vib = 0.15 * np.sin(2 * np.pi * 0.07 * t + rng.uniform(0, 6))
    for k in range(1, harm + 1):
        a = amp / k ** 1.6
        out += a * np.sin(2 * np.pi * f * k * t + vib * k + rng.uniform(0, 6)).astype(F32)
        out += a * np.sin(2 * np.pi * f * k * (1 + det) * t + rng.uniform(0, 6)).astype(F32)
    return out
def pad(dur, notes, bright=700, breath=9.0):
    t = tt(dur); amps = [0.9, 0.7, 0.45, 0.28, 0.16, 0.1]
    x = sum(voice(t, NOTE[n], amps[min(i, 5)], 3 if i == 0 else 6) for i, n in enumerate(notes))
    x *= (0.6 + 0.4 * np.sin(2 * np.pi * t / breath) ** 2).astype(F32)
    return lp(x, bright)
def secciones(N, SEC, XF=1.5):
    """SEC: (inicio, fin, notas, brillo, ganancia); se funden entre sí"""
    music = np.zeros(N, F32); D = N / SR
    for i, (a, b, notes, br, g) in enumerate(SEC):
        a0, b0 = max(0, a - XF / 2), min(D, b + XF / 2)
        x = pad(b0 - a0, notes, br); n = len(x); fade = np.ones(n, F32); k = min(int(XF * SR), n // 2)
        if i: fade[:k] = np.linspace(0, 1, k)
        fade[-k:] = np.minimum(fade[-k:], np.linspace(1, 0, k))
        place(music, x * fade * g, a0)
    return music

# ---------- efectos ----------
def boom(g=1.0, dur=4.0):
    t = tt(dur); f = 32 + 40 * np.exp(-t * 3)
    b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.3)
    b += lp(rng.standard_normal(len(t)).astype(F32), 180) * np.exp(-t * 9) * 0.8
    return reverb(b.astype(F32), 3, 0.9, 0.35) * g
def whoosh(dur=1.6, g=0.5):
    t = tt(dur); n = noise(dur); out = np.zeros_like(n)
    for i, (a, b) in enumerate([(300, 900), (600, 1800), (1200, 3600)]):
        out += bp(n, a, b) * np.sin(np.pi * np.clip(t / dur, 0, 1)) ** (2 + i)
    return out * g
def click(g=1.0):
    t = tt(0.012); return bp(rng.standard_normal(len(t)).astype(F32), 1800, 6500) * np.exp(-t * 500) * g
def thud(g=1.0):
    t = tt(0.18); return ((np.sin(2 * np.pi * 85 * t) * np.exp(-t * 35) + lp(rng.standard_normal(len(t)).astype(F32), 400) * np.exp(-t * 60) * 0.6) * g).astype(F32)
def stamp(g=1.0):
    x = thud(g * 1.2); x[:int(0.012 * SR)] += click(g * 0.6); return x
def beep(f, dur=0.09, g=0.3):
    t = tt(dur); return (np.sin(2 * np.pi * f * t) * np.minimum(1, t / 0.004) * np.exp(-t * 18) * g).astype(F32)
def chime(g=0.3, f=880):
    t = tt(1.2); return ((np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 1.5 * t)) * np.exp(-t * 4) * np.minimum(1, t / .005) * g).astype(F32)
def tick(g=0.35):
    t = tt(0.03); return bp(rng.standard_normal(len(t)).astype(F32), 2500, 8000) * np.exp(-t * 300) * g
def beat(g=1.0):                                   # golpe grave de latido
    t = tt(0.5); return (np.sin(2 * np.pi * (48 + 12 * np.exp(-t * 20)) * t) * np.exp(-t * 7) * g).astype(F32)
def latido(dst, a, b, bpm=72, g=1.0):
    t = a
    while t < b: place(dst, beat(g), t); place(dst, beat(g * .6), t + .28); t += 60 / bpm
def vibra(dur=0.8, g=0.4):                         # celular vibrando sobre una superficie
    t = tt(dur); x = np.sin(2 * np.pi * 165 * t) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 9 * t)))
    x += 0.4 * bp(noise(dur), 100, 400) * (np.sin(2 * np.pi * 165 * t) > 0)
    return (x * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .03) * g).astype(F32)
def alerta(dur=2.8, g=0.3):                        # tono de alerta de emergencia (853 + 960 Hz, como el de los celulares)
    t = tt(dur); x = np.sin(2 * np.pi * 853 * t) + np.sin(2 * np.pi * 960 * t)
    gate = ((t % 0.5) < 0.38).astype(F32)
    return (np.tanh(x * 1.3) * gate * np.minimum(1, (dur - t) / .05) * g).astype(F32)
def frenos(dur=1.6, g=0.3):                        # chirrido de frenos del tren
    t = tt(dur); f = 2400 - 500 * t / dur + 60 * np.sin(2 * np.pi * 7 * t)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.6 + bp(noise(dur), 2000, 5000) * 0.5
    return (x * np.sin(np.pi * t / dur) ** .7 * g).astype(F32)
def puertas(g=0.4):                                # silbido neumático y puertas que se corren
    d = 1.1; t = tt(d); x = hp(noise(d), 3000) * np.exp(-t * 3) * 0.8 + bp(noise(d), 200, 900) * np.sin(np.pi * np.clip(t / .7, 0, 1)) * 0.6
    return (x * g).astype(F32)
def subte(dur, g=0.3):                             # ruido del vagón con traqueteo
    t = tt(dur); x = lp(noise(dur), 220) * 1.2 + bp(noise(dur), 300, 1200) * 0.2
    k = np.zeros(len(t), F32)
    for s in np.arange(0.2, dur, 0.74):
        for d in (0, 0.11): place(k, thud(0.9) * 0.6, s + d)
    return ((x + k) * np.minimum(1, t / 1.5) * np.minimum(1, (dur - t) / 1.0) * g).astype(F32)
def multitud(dur, g=0.3):                          # murmullo de gente
    t = tt(dur); x = np.zeros(len(t), F32)
    for f0 in (250, 420, 700, 1100):
        x += bp(noise(dur), f0, f0 * 1.6) * (0.5 + 0.5 * lp(np.abs(noise(dur)), 4) * 6)
    return (x * np.minimum(1, t / 1) * np.minimum(1, (dur - t) / .8) * g).astype(F32)
def pasos(dst, a, b, g=0.4, per=0.16):
    t = a
    while t < b: place(dst, thud(g * (0.6 + 0.4 * rng.random())) + 0, t); t += per * (0.8 + 0.4 * rng.random())
def vidrios(dur=2.2, g=0.4):                       # vidrios que estallan y caen
    out = np.zeros(int(dur * SR), F32); tb = tt(0.12)
    place(out, hp(noise(0.25), 2000) * np.exp(-tt(0.25) * 14) * 1.2, 0)
    for k in range(140):
        s = 0.02 + rng.exponential(0.45)
        if s > dur - 0.15: continue
        f = rng.uniform(2500, 9000)
        n = (np.sin(2 * np.pi * f * tb) + 0.5 * np.sin(2 * np.pi * f * 1.7 * tb)) * np.exp(-tb * rng.uniform(30, 70))
        place(out, n.astype(F32), s, rng.uniform(0.1, 0.5) * np.exp(-s * 0.9))
    return reverb(out, 1.2, 0.3, 0.25) * g
def geiger(dst, a, b, rate, g=0.5):               # rate(t): clics por segundo
    t = a
    while t < b:
        r = max(0.3, rate(t)); t += rng.exponential(1 / r)
        if t < b: place(dst, click(g * (0.7 + 0.3 * rng.random())), t)
def sizzle(dur=1.2, g=0.4):                        # destello: chasquido brillante
    t = tt(dur); return (hp(noise(dur), 4000) * np.exp(-t * 4) * g + np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 9) * g * .2).astype(F32)
def rumble(dur, g=0.5):                            # retumbo que crece
    t = tt(dur); return (lp(noise(dur), 90) * (t / dur) ** 1.5 * 3 * g).astype(F32)
def pop(g=0.4, f=1200):                            # burbuja de mensaje
    t = tt(0.09); return (np.sin(2 * np.pi * (f + 900 * np.exp(-t * 60)) * t) * np.exp(-t * 40) * g).astype(F32)

def mezclar(nar_path, music, sfx, pulse, D, out='audio/mezcla.wav', mg=0.22, sg=0.5, pg=0.12):
    """voz al frente; la música baja cuando habla la voz"""
    N = len(music)
    nar, nsr = sf.read(nar_path, dtype='float32')
    from math import gcd
    if nsr != SR: k = gcd(SR, nsr); nar = resample_poly(nar, SR // k, nsr // k).astype(F32)
    nar = nar[:N]; nar = np.pad(nar, (0, N - len(nar)))
    nar = hp(nar, 75, 2); nar = reverb(nar, 0.9, 0.12, 0.08)
    w = int(0.25 * SR)
    e = np.sqrt(np.convolve(nar.astype(np.float64) ** 2, np.ones(w) / w, 'same')).astype(F32)
    duck = np.clip(e / (np.percentile(e, 90) + 1e-9), 0, 1)
    duck = np.convolve(duck, np.ones(int(0.4 * SR), F32) / int(0.4 * SR), 'same').astype(F32)
    mix = norm(nar, 0.85) + norm(music, mg) * (1 - 0.45 * duck) + norm(pulse, pg) + norm(sfx, sg)
    mix = (np.tanh(mix * 1.1) / np.tanh(1.1)).astype(F32)[:int(D * SR)]
    T = np.arange(len(mix)) / SR
    wide = norm(lp(hp(rng.standard_normal(len(mix)).astype(F32), 2500), 7000) * (0.5 + 0.5 * np.sin(2 * np.pi * T / 11)).astype(F32), 0.02)
    sf.write(out, np.stack([mix + wide, mix - wide], 1), SR)

# ---------- efectos navales y de comunicaciones ----------
def ping(g=0.35, f=1450):                          # sonar activo: pulso con cola larga
    t = tt(2.2); x = np.sin(2 * np.pi * f * t) * np.exp(-t * 2.2) * np.minimum(1, t / .01)
    return reverb(x.astype(F32), 2.5, .8, .5) * g
def torpedo_sfx(dur=2.0, g=0.4):                   # zumbido de hélice que se acerca
    t = tt(dur); f = 180 + 120 * (t / dur)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5 + bp(noise(dur), 300, 1800) * 0.6
    return (x * (t / dur) ** 1.5 * g).astype(F32)
def bajo_agua(x): return lp(x, 900)                # cualquier sonido, como se oye debajo del agua
def crujido(dur=2.5, g=0.4):                       # casco de metal que se dobla
    t = tt(dur); f = 55 + 25 * np.sin(2 * np.pi * .7 * t) + 15 * lp(noise(dur), 3) * 30
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.3 + bp(noise(dur), 80, 400) * 0.5
    return (lp(x.astype(F32), 700) * np.sin(np.pi * t / dur) * g).astype(F32)
def ring(dur=2.0, g=0.25):                         # tono de llamada (dos frecuencias, con cortes)
    t = tt(dur); x = (np.sin(2 * np.pi * 440 * t) + np.sin(2 * np.pi * 480 * t)) * (((t % 1.2) < 0.8).astype(F32))
    return bp(x.astype(F32), 300, 3400) * np.minimum(1, (dur - t) / .02) * g
def jet(dur=2.4, g=0.4):                           # avión que pasa
    t = tt(dur); env_ = np.exp(-((t - dur / 2) / (dur / 5)) ** 2)
    x = bp(noise(dur), 400, 4000) * 0.7 + lp(noise(dur), 200) * 0.6
    return (x * env_ * g).astype(F32)
def estatica(dur, g=0.15): return (bp(noise(dur), 1500, 5000) * (0.6 + 0.4 * (rng.random(int(dur * SR)) > .7)) * g).astype(F32)
def bips(dst, a, n=3, f=1800, g=0.18, sep=0.12):
    for i in range(n): place(dst, beep(f, .06, g), a + i * sep)
def klaxon(dur=2.0, g=0.3):                        # alarma de zafarrancho
    t = tt(dur); x = np.sign(np.sin(2 * np.pi * 420 * t)) * ((t % 0.6) < 0.4)
    return lp(x.astype(F32), 2200) * np.minimum(1, (dur - t) / .05) * g
