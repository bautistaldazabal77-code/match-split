"""Genera la locución de un guion y la línea de tiempo con marcas por palabra.

Uso:
  python voz.py <guion.json> <dir_salida>

Motores (variable ENGINE):
  chatterbox  clona la voz de REF_AUDIO (wav limpio de 8-15 s) con Chatterbox
              Multilingual (MIT). Cada frase se verifica con Whisper y se
              regenera si no se entiende bien.
  piper       voz sintética de Piper (PIPER_BIN, PIPER_VOICE). PITCH y SPEED
              ajustan tono y velocidad.

Otras variables: TEMPO (factor de velocidad final, default 1.0),
INTENTOS (default 3), SOLO (lista de índices de línea a regenerar, ej. "3,14").

Salida: <dir_salida>/voz.wav (48 kHz mono), <dir_salida>/timeline.json y
<dir_salida>/lineas/NN.wav
"""
import difflib
import json
import os
import re
import subprocess
import sys
import wave

import numpy as np

SR = 48000
START = 0.25
ENGINE = os.environ.get("ENGINE", "piper")
TEMPO = float(os.environ.get("TEMPO", "1.0"))
INTENTOS = int(os.environ.get("INTENTOS", "3"))

FX = {
    "narrador": "highpass=f=70,bass=g=2:f=120,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,aecho=0.8:0.6:30:0.06",
    "telefono": "highpass=f=380,lowpass=f=3000,acrusher=bits=9:mix=0.25,acompressor=threshold=-20dB:ratio=4,volume=1.3",
}
NUM = {"1": "uno", "2": "dos", "3": "tres", "6": "seis", "7": "siete", "10": "diez", "12": "doce",
       "13": "trece", "14": "catorce", "11": "once", "15": "quince"}


class Piper:
    def __init__(self):
        self.bin = os.environ.get("PIPER_BIN", "piper")
        self.voice = os.environ["PIPER_VOICE"]
        self.pitch = float(os.environ.get("PITCH", "0.88"))
        self.speed = float(os.environ.get("SPEED", "1.12"))

    def raw(self, text, out, voz, seed):
        speed = self.speed * (1.25 if voz == "telefono" else 1.0)
        subprocess.run([self.bin, "-m", self.voice, "--length-scale", str(speed), "-f", out],
                       input=text.encode(), check=True, capture_output=True)
        p = self.pitch * (0.95 if voz == "telefono" else 1.0)
        with wave.open(out) as w:
            sr = w.getframerate()
        return f"asetrate={int(sr * p)},aresample={SR},atempo={1 / p:.4f}"


class Chatterbox:
    def __init__(self):
        import torch
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS
        torch.set_num_threads(os.cpu_count() or 4)
        self.torch = torch
        self.model = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
        self.ref = os.environ["REF_AUDIO"]

    def raw(self, text, out, voz, seed):
        import torchaudio
        self.torch.manual_seed(1234 + seed)
        wav = self.model.generate(text, language_id="es", audio_prompt_path=self.ref,
                                  exaggeration=0.6 if voz == "telefono" else 0.5,
                                  cfg_weight=0.5, temperature=0.8)
        torchaudio.save(out, wav, self.model.sr)
        return f"aresample={SR}" + (",atempo=0.9" if voz == "telefono" else "")


def post(raw, path, pre, voz):
    tempo = f",atempo={TEMPO}" if TEMPO != 1.0 else ""
    af = f"{pre}{tempo},{FX[voz]}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", af, "-ac", "1", "-ar", str(SR),
                    "-sample_fmt", "s16", path], check=True)


def load(path):
    with wave.open(path) as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768


def trim(a, thr=0.012, pad=0.04):
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx) == 0:
        return a
    return a[max(0, idx[0] - int(pad * SR)): min(len(a), idx[-1] + int(pad * SR))]


def norm(w):
    return re.sub(r"[^\wáéíóúñü]", "", w.lower())


def norm_text(t):
    t = re.sub(r"(\d+):(\d+)", lambda m: f"{m[1]} y {int(m[2])}", t)
    t = re.sub(r"\d+", lambda m: NUM.get(m[0], m[0]), t)
    return " ".join(norm(w) for w in t.split() if norm(w))


def heard(model, audio):
    segs, _ = model.transcribe(audio[::3], language="es")
    return " ".join(s.text for s in segs)


def word_times(model, audio, say_words):
    segs, _ = model.transcribe(audio[::3], language="es", word_timestamps=True, initial_prompt=" ".join(say_words))
    got = [w for s in segs for w in (s.words or [])]
    if len(got) == len(say_words):
        return [(w.start, w.end) for w in got]
    lens = np.array([max(2, len(norm(w))) for w in say_words], dtype=float)
    dur = len(audio) / SR
    edges = np.concatenate([[0], np.cumsum(lens)]) / lens.sum() * dur
    return [(edges[i], edges[i + 1]) for i in range(len(say_words))]


def caption_tokens(line, say_words):
    toks = []
    for raw in line.get("cap", line["say"]).split():
        n = 1
        if "|" in raw:
            raw, n = raw.rsplit("|", 1)
            n = int(n)
        toks.append((raw, n))
    if sum(n for _, n in toks) != len(say_words):
        raise SystemExit(f"Subtítulo y voz no coinciden: {line.get('cap')}")
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
    solo = {int(x) for x in os.environ["SOLO"].split(",")} if os.environ.get("SOLO") else None
    from faster_whisper import WhisperModel
    asr = WhisperModel("small", device="cpu", compute_type="int8")
    engine = None

    # 1) generar (o reutilizar) cada línea
    for i, ln in enumerate(guion["lineas"]):
        p = os.path.join(out, "lineas", f"{i:02d}.wav")
        if (solo is not None and i not in solo) or (solo is None and os.environ.get("REUSAR") and os.path.exists(p)):
            continue
        engine = engine or (Chatterbox() if ENGINE == "chatterbox" else Piper())
        voz = ln.get("voz", "narrador")
        best = (-1, None)
        for k in range(INTENTOS if ENGINE == "chatterbox" else 1):
            raw = p + f".raw{k}.wav"
            pre = engine.raw(ln["say"], raw, voz, seed=k + 7 * i)
            cand = p + f".c{k}.wav"
            post(raw, cand, pre, voz)
            os.remove(raw)
            h = heard(asr, trim(load(cand)))
            score = difflib.SequenceMatcher(None, norm_text(h), norm_text(ln["say"])).ratio()
            print(f"[{i:02d}] intento {k + 1}: {score:.2f} «{h.strip()}»", flush=True)
            if score > best[0]:
                if best[1]:
                    os.remove(best[1])
                best = (score, cand)
            else:
                os.remove(cand)
            if score >= 0.93:
                break
        os.replace(best[1], p)

    # 2) línea de tiempo con marcas por palabra
    t = START
    pieces, lines = [], []
    for i, ln in enumerate(guion["lineas"]):
        a = trim(load(os.path.join(out, "lineas", f"{i:02d}.wav")))
        dur = len(a) / SR
        say_words = ln["say"].split()
        times = word_times(asr, a, say_words)
        caps, k = [], 0
        for text, n in caption_tokens(ln, say_words):
            caps.append({"text": text, "s": round(t + times[k][0], 3), "e": round(t + times[k + n - 1][1], 3)})
            k += n
        for ci, ch in enumerate(chunk(caps)):
            for c in ch:
                c["chunk"] = f"{i}-{ci}"
        lines.append({"i": i, "escena": ln["escena"], "voz": ln.get("voz", "narrador"), "sfx": ln.get("sfx"),
                      "start": round(t, 3), "end": round(t + dur, 3), "caps": caps})
        pieces.append((t, a))
        t += dur + ln.get("pausa", 0.3)

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
