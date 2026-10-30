"""Base de sonido para los reels "caso real": colchón de acordes oscuros, latidos y efectos de uso común.
Uso desde la carpeta del reel:
    from sonido_reel import *
    R = Reel([(0, 'D'), ('c4', 'Bb'), ...])     # acorde por tramo: (cue o segundo, tónica)
    R.foto(t); R.sello(t); R.golpe(t); R.tic(t); R.flash(t); R.estatica(t, d); R.latido(a, b, bpm)
    R.mezclar()
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sfx import *
ACORDES = {'D': ['D2', 'D3', 'A3', 'F4'], 'Bb': ['Bb1', 'Bb2', 'F3', 'D4'], 'G': ['G1', 'G2', 'D3', 'Bb3'], 'A': ['A1', 'A2', 'E3', 'C4'],
           'C': ['C2', 'C3', 'G3', 'Eb4'], 'F': ['F1', 'F2', 'C3', 'Ab3'], 'E': ['E2', 'E3', 'B3', 'G4'], 'Dfin': ['D2', 'D3', 'A3', 'F4', 'E4']}
class Reel:
    def __init__(self, tramos, brillo=520):
        self.L = Linea(); self.S, self.E, self.AT, self.ATE, self.D = self.L.S, self.L.E, self.L.AT, self.L.ATE, self.L.D
        self.N = int(self.D * SR) + SR; self.T = (np.arange(self.N) / SR).astype(F32)
        ts = [self.S(a) if isinstance(a, str) else a for a, _ in tramos] + [self.D]
        self.music = secciones(self.N, [(ts[i], ts[i + 1], ACORDES[n], brillo, 1.0) for i, (_, n) in enumerate(tramos)], XF=2.0)
        o = self.S('outro')
        self.music *= env(self.T, [(0, .9), (self.S('h2') if 'h2' in self.L.C else self.S('c1'), .65), (o - .3, .6), (o + .1, 1.0), (self.D - .8, .6), (self.D, 0)])
        self.pulse = np.zeros(self.N, F32); self.sfx = np.zeros(self.N, F32)
    def t(self, x): return self.S(x) if isinstance(x, str) else x
    def foto(self, t): place(self.sfx, click(.35), t); place(self.sfx, whoosh(.5, .14), t - .2)
    def sello(self, t): place(self.sfx, stamp(1.0), t); place(self.sfx, thud(.5), t + .02)
    def golpe(self, t, g=.8): place(self.sfx, boom(g, 3.5), t)
    def tic(self, t, g=.35): place(self.sfx, tick(g), t)
    def flash(self, t): place(self.sfx, (hp(noise(.35), 1500) * np.exp(-tt(.35) * 12) * .5).astype(F32), t); place(self.sfx, thud(.7), t)
    def estatica(self, t, d=.5, g=.3): place(self.sfx, estatica(d, g), t)
    def zumbido(self, t, d, f=50, g=.2): place(self.sfx, zumbido(d, f, g), t)
    def teclas(self, a, b, g=.14): teclas(self.sfx, a, b, g, .08)
    def latido(self, a, b, bpm=76, g=.7): latido(self.pulse, self.t(a), self.t(b), bpm, g)
    def mezclar(self):
        mezclar('audio/narracion.wav', self.music, self.sfx, self.pulse, self.D, mg=.2, sg=.45, pg=.1); print('ok', round(self.D, 2), 's')
