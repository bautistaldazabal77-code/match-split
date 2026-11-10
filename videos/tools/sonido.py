"""Ambiente, música y efectos sintetizados a partir de timeline.json.

Uso: python sonido.py <dir_salida>   (lee timeline.json y voz.wav, escribe mezcla.wav)
"""
import json
import os
import sys
import wave

import numpy as np
from scipy import signal

SR = 48000
rng = np.random.default_rng(13)


def load(path):
    with wave.open(path) as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768


def save(path, st):
    st = np.clip(st, -1, 1)
    with wave.open(path, "w") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).T.copy().tobytes())


def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo, hi], btype="band", fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype="high", fs=SR, output="sos"), x)


def env(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na)
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr)
    return e


def place(buf, x, t, gain=1.0):
    s = int(t * SR)
    if s >= buf.shape[-1]:
        return
    x = x[..., : buf.shape[-1] - s]
    buf[..., s:s + x.shape[-1]] += x * gain


def stereo(x, width=0.0):
    return np.vstack([x, x]) if width == 0 else np.vstack([x * (1 - width), x * (1 + width)])


def drone(n):
    t = np.arange(n) / SR
    lfo = 0.6 + 0.4 * np.sin(2 * np.pi * 0.05 * t)
    x = (np.sin(2 * np.pi * 55 * t) * 0.5 + np.sin(2 * np.pi * 82.4 * t + 1) * 0.25
         + np.sin(2 * np.pi * 110.3 * t) * 0.12 + np.sin(2 * np.pi * 116.5 * t) * 0.08)  # semitono disonante
    noise = lp(rng.standard_normal(n), 180) * 0.6
    return (x + noise) * lfo


def rain(n):
    x = bp(rng.standard_normal(n), 500, 7000) * 0.5
    drops = np.zeros(n)
    idx = rng.integers(0, n, int(n / SR * 90))
    drops[idx] = rng.uniform(0.3, 1, len(idx))
    drops = bp(drops, 1500, 6000) * 2.5
    return x + drops


def ring_burst(dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sel = (np.sin(2 * np.pi * 16 * t) > 0)
    f = np.where(sel, 1250, 1580)
    ph = np.cumsum(2 * np.pi * f / SR)
    x = np.sign(np.sin(ph)) * 0.3 + np.sin(ph) * 0.7
    return bp(x, 600, 4000) * env(n, 0.01, 0.03)


def ring(dur_total):
    """Patrón de timbre de teléfono de escritorio: 0.4 on / 0.2 off / 0.4 on / 2.0 off."""
    n = int(dur_total * SR)
    out = np.zeros(n)
    t = 0.0
    while t < dur_total:
        for d, gap in ((0.4, 0.2), (0.4, 2.0)):
            b = ring_burst(d)
            s = int(t * SR)
            out[s:s + len(b)] += b[: max(0, n - s)]
            t += d + gap
    return out


def click():
    n = int(0.08 * SR)
    return hp(rng.standard_normal(n), 800) * np.exp(-np.arange(n) / (0.008 * SR)) * 0.8


def breath(dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    e = np.clip(np.sin(2 * np.pi * t / 2.6), 0, None) ** 1.5
    x = bp(rng.standard_normal(n), 400, 2600) * e * 0.5
    return x


def stinger():
    n = int(3.5 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (55 * np.exp(-t * 0.8)) * t) * np.exp(-t * 1.2)
    hit = lp(rng.standard_normal(n), 400) * np.exp(-t * 6) * 1.5
    screech = (np.sin(2 * np.pi * 1870 * t + 3 * np.sin(2 * np.pi * 7 * t)) * 0.15
               + np.sin(2 * np.pi * 1981 * t) * 0.12) * np.exp(-t * 0.9) * env(n, 0.05, 0.5)
    return (boom * 0.9 + hit * 0.6 + screech) * 0.9


def creak(dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 90 + 60 * np.sin(2 * np.pi * 0.7 * t) + 20 * rng.standard_normal(n).cumsum() / np.sqrt(n)
    ph = np.cumsum(2 * np.pi * f / SR)
    pulses = (np.sin(ph) > 0.95).astype(float)
    x = bp(pulses, 300, 3000) * env(n, 0.2, 0.4)
    return x * 1.5


def heartbeat(dur, bpm=72):
    n = int(dur * SR)
    out = np.zeros(n)
    k = int(0.25 * SR)
    tt = np.arange(k) / SR
    thump = np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 18)
    period = 60 / bpm
    t = 0
    while t < dur:
        for off, g in ((0, 1.0), (0.28, 0.7)):
            s = int((t + off) * SR)
            if s + k < n:
                out[s:s + k] += thump * g
        t += period
    return out


def main():
    out = sys.argv[1]
    tl = json.load(open(os.path.join(out, "timeline.json")))
    voz = load(os.path.join(out, "voz.wav"))
    D = tl["duration"]
    n = int(D * SR)
    L = {i: l for i, l in enumerate(tl["lines"])}
    by_scene = lambda name: [l for l in tl["lines"] if l["escena"] == name]

    bed = np.zeros((2, n))
    # Ambiente: drone grave constante + lluvia (más fuerte en exteriores)
    d = drone(n)
    bed += stereo(d * 0.16)
    r = rain(n)
    rain_gain = np.full(n, 0.035)
    for l in tl["lines"]:
        if l["escena"].startswith(("exterior", "pasillo")):
            s, e = int(l["start"] * SR), int((l["end"] + 0.4) * SR)
            rain_gain[s:e] = 0.09
    rain_gain = np.convolve(rain_gain, np.ones(SR // 2) / (SR // 2), mode="same")
    bed += np.vstack([r * rain_gain, np.roll(r, 900) * rain_gain])

    sfx = np.zeros((2, n))
    rings = [l for l in tl["lines"] if l.get("sfx") == "ring"]
    # Primer timbre: desde "empieza a sonar" hasta "Hasta que se corta"
    corte = by_scene("telefono_mudo")[0]["start"] + 0.35
    place(sfx, stereo(ring(corte - rings[0]["start"] - 0.6)), rings[0]["start"] + 0.6, 0.30)
    # Segundo timbre: hasta que contestas
    contesta = by_scene("contesta")[0]
    place(sfx, stereo(ring(contesta["start"] + 0.9 - rings[1]["start"] - 0.5)), rings[1]["start"] + 0.5, 0.30)
    place(sfx, stereo(click()), contesta["start"] + 1.0, 0.6)
    # Respiración por el teléfono
    br = [l for l in tl["lines"] if l.get("sfx") == "breath"][0]
    voz_tel = [l for l in tl["lines"] if l["voz"] == "telefono"][0]
    place(sfx, stereo(breath(voz_tel["start"] - br["start"] - 0.2)), br["start"] + 0.2, 0.22)
    # Golpe de tensión al final de "Con tu misma voz"
    st = [l for l in tl["lines"] if l.get("sfx") == "stinger"][0]
    place(sfx, stereo(stinger(), 0.1), st["end"] - 0.15, 0.55)
    # Puerta que cruje
    cr = [l for l in tl["lines"] if l.get("sfx") == "creak"][0]
    place(sfx, stereo(creak(2.6)), cr["start"] + 1.2, 0.25)
    # Latido en la decisión final
    dec = by_scene("decision")[0]
    place(sfx, stereo(heartbeat(D - dec["start"])), dec["start"], 0.5)

    # Silencio dramático: se apaga el drone justo cuando se corta el teléfono
    mute = np.ones(n)
    s0 = int(corte * SR)
    s1 = int((by_scene("libro")[0]["start"]) * SR)
    mute[s0:s1] = 0.25
    mute = np.convolve(mute, np.ones(SR // 5) / (SR // 5), mode="same")
    bed *= mute

    # Ducking del fondo bajo la voz
    venv = np.convolve(np.abs(voz[:n]) if len(voz) >= n else np.pad(np.abs(voz), (0, n - len(voz))),
                       np.ones(SR // 10) / (SR // 10), mode="same")
    duck = 1 - 0.45 * np.clip(venv / 0.05, 0, 1)
    bed *= duck

    v = voz[:n] if len(voz) >= n else np.pad(voz, (0, n - len(voz)))
    mix = bed + sfx + stereo(v * 1.0)
    # Fundido de entrada corto y de salida al final
    mix *= env(n, 0.05, 0.6)
    mix = mix / np.abs(mix).max() * 0.95
    save(os.path.join(out, "mezcla.wav"), mix)
    print("mezcla.wav", f"{D:.1f}s")


if __name__ == "__main__":
    main()
