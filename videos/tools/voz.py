"""Genera la locución de un guion y la línea de tiempo con marcas por palabra.

Uso:
  python voz.py <guion.json> <dir_salida>

Variables de entorno:
  PIPER_BIN    ejecutable de piper (default: "piper")
  PIPER_VOICE  modelo .onnx de la voz
  PITCH        factor de tono del narrador (default 0.88, <1 = más grave)
  SPEED        length-scale de piper (default 1.12, >1 = más lento)

Salida: <dir_salida>/voz.wav (48 kHz mono) y <dir_salida>/timeline.json
"""
import json
import os
import re
import subprocess
import sys
import wave

import numpy as np

SR = 48000
PIPER = os.environ.get("PIPER_BIN", "piper")
VOICE = os.environ["PIPER_VOICE"]
PITCH = float(os.environ.get("PITCH", "0.88"))
SPEED = float(os.environ.get("SPEED", "1.12"))
START = 0.25

FX = {
    "narrador": "bass=g=3:f=110,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,aecho=0.8:0.6:35:0.10",
    "telefono": "highpass=f=380,lowpass=f=3000,acrusher=bits=9:mix=0.25,acompressor=threshold=-20dB:ratio=4,volume=1.3",
}


def tts(text, path, speed, pitch, fx):
    raw = path + ".raw.wav"
    subprocess.run([PIPER, "-m", VOICE, "--length-scale", str(speed), "-f", raw],
                   input=text.encode(), check=True, capture_output=True)
    with wave.open(raw) as w:
        sr = w.getframerate()
    af = f"asetrate={int(sr * pitch)},aresample={SR},atempo={1 / pitch:.4f},{fx}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", af, "-ac", "1", "-ar", str(SR), path], check=True)
    os.remove(raw)


def load(path):
    with wave.open(path) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    return a


def trim(a, thr=0.01, pad=0.03):
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx) == 0:
        return a
    s = max(0, idx[0] - int(pad * SR))
    e = min(len(a), idx[-1] + int(pad * SR))
    return a[s:e]


def norm(w):
    return re.sub(r"[^\wáéíóúñü]", "", w.lower())


def word_times(model, audio, say_words):
    a16 = audio[::3]  # 48k -> 16k
    segs, _ = model.transcribe(a16, language="es", word_timestamps=True, initial_prompt=" ".join(say_words))
    got = [w for s in segs for w in (s.words or [])]
    dur = len(audio) / SR
    if len(got) == len(say_words):
        return [(w.start, w.end) for w in got], [w.word.strip() for w in got]
    # Respaldo: reparto proporcional a la cantidad de letras
    lens = np.array([max(2, len(norm(w))) for w in say_words], dtype=float)
    edges = np.concatenate([[0], np.cumsum(lens)]) / lens.sum() * dur
    return [(edges[i], edges[i + 1]) for i in range(len(say_words))], [w.word.strip() for w in got]


def caption_tokens(line, say_words):
    cap = line.get("cap", line["say"])
    toks = []
    for raw in cap.split():
        n = 1
        if "|" in raw:
            raw, n = raw.rsplit("|", 1)
            n = int(n)
        toks.append((raw, n))
    total = sum(n for _, n in toks)
    if total != len(say_words):
        raise SystemExit(f"Subtítulo y voz no coinciden ({total} vs {len(say_words)}): {cap}")
    return toks


def chunk(tokens):
    chunks, cur = [], []
    for t in tokens:
        cur.append(t)
        txt = " ".join(x["text"] for x in cur)
        if re.search(r"[.,:;?!»]$", t["text"]) or len(cur) >= 3 or len(txt) >= 16:
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)
    return chunks


def main():
    guion_path, out = sys.argv[1], sys.argv[2]
    os.makedirs(os.path.join(out, "lineas"), exist_ok=True)
    guion = json.load(open(guion_path))
    from faster_whisper import WhisperModel
    model = WhisperModel("small", device="cpu", compute_type="int8")

    t = START
    pieces, lines = [], []
    for i, ln in enumerate(guion["lineas"]):
        voz = ln.get("voz", "narrador")
        p = os.path.join(out, "lineas", f"{i:02d}.wav")
        speed = SPEED * (1.25 if voz == "telefono" else 1.0)
        tts(ln["say"], p, speed, PITCH * (0.95 if voz == "telefono" else 1.0), FX[voz])
        a = trim(load(p))
        dur = len(a) / SR
        say_words = ln["say"].split()
        times, heard = word_times(model, a, say_words)
        if [norm(w) for w in heard] != [norm(w) for w in say_words]:
            print(f"  [{i:02d}] se escucha: {' '.join(heard)!r}")
        toks = caption_tokens(ln, say_words)
        caps, k = [], 0
        for text, n in toks:
            s, e = times[k][0], times[k + n - 1][1]
            caps.append({"text": text, "s": round(t + s, 3), "e": round(t + e, 3)})
            k += n
        chunks = chunk(caps)
        for ci, ch in enumerate(chunks):
            for c in ch:
                c["chunk"] = f"{i}-{ci}"
        lines.append({
            "i": i, "escena": ln["escena"], "voz": voz, "sfx": ln.get("sfx"),
            "start": round(t, 3), "end": round(t + dur, 3), "caps": caps,
        })
        pieces.append((t, a))
        t += dur + ln.get("pausa", 0.3)
        print(f"[{i:02d}] {lines[-1]['start']:6.2f}-{lines[-1]['end']:6.2f} {ln['say']}")

    total = t
    mix = np.zeros(int(total * SR) + SR, dtype=np.float32)
    for st, a in pieces:
        s = int(st * SR)
        mix[s:s + len(a)] += a
    mix = mix[: int(total * SR)]
    mix = mix / max(1e-6, np.abs(mix).max()) * 0.89
    with wave.open(os.path.join(out, "voz.wav"), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    json.dump({"duration": round(total, 3), "lines": lines}, open(os.path.join(out, "timeline.json"), "w"),
              ensure_ascii=False, indent=1)
    print(f"Duración total: {total:.1f} s")


if __name__ == "__main__":
    main()
