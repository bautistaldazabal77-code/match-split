"""Música, efectos y mezcla de "Si una tormenta te atrapa en el Aconcagua", parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'A'), ('c3', 'Bb'), ('c5', 'G'), ('c6', 'F'), ('c7', 'C'), ('c8', 'D'), ('c9', 'Bb'), ('outro', 'Dfin')], brillo=420); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
def viento(d, g=.18):
    T = tt(d); return (bp(noise(d), 250, 1800) * (0.55 + 0.45 * np.sin(2 * np.pi * 0.23 * T) * np.sin(2 * np.pi * 0.07 * T + 1)) * env(T, [(0, 0), (1, 1), (d - 1, 1), (d, 0)]) * g).astype(F32)
def golpe_puerta(g=.9): T = tt(.35); return (lp(noise(.35), 260) * np.exp(-T * 22) * g * 3).astype(F32)
def rasguno(d=.8, g=.15): T = tt(d); return (bp(noise(d), 2500, 7000) * (np.sin(2 * np.pi * 7 * T) > .2) * env(T, [(0, 0), (.1, 1), (d - .1, 1), (d, 0)]) * g).astype(F32)
fin = S('outro')
place(R.sfx, viento(S('c6') + .5, .1), 0)
R.golpe(.05, .8); R.latido(.1, S('c6'), 96, .7); R.golpe(AF('h1', 'Quién'), .8)
for dt in [1.0, 1.35, 3.2]: place(R.sfx, golpe_puerta(.6), dt)
R.foto(S('c1') - .1); R.sello(AF('c1', 'pista')); place(R.sfx, beep(165, .35, .2), AF('c1', 'batería') + .2)
R.golpe(S('c2') - .05, .6); R.golpe(AF('c2', 'Esa'), .9)
R.foto(S('c3') - .1); R.zumbido(S('c3'), S('c4') - S('c3'), 46, .12)
g0 = AT('c4', 'golpes')
for i in range(5): place(R.sfx, golpe_puerta(.9), g0 + i * .33)
place(R.sfx, rasguno(1.4, .14), AF('c4', 'rasguños')); R.golpe(AF('c4', 'mamá'), .6)
R.foto(S('c5') - .1); R.sello(S('c5') + .1); R.zumbido(AT('c5', 'tiembla'), 1.6, 70, .1)
R.foto(S('c6') - .1); place(R.sfx, chime(.18, 660), AF('c6', 'sol')); place(R.sfx, chime(.18, 880), AF('c6', 'sol') + .25)
R.foto(S('c7') - .1); place(R.sfx, chime(.16, 990), AF('c7', 'bien'))
R.foto(S('c8') - .1); R.latido(S('c8'), fin, 80, .6); R.golpe(AF('c8', 'Suben'), 1.0)
R.foto(S('c9') - .1); [place(R.sfx, pop(.3, 1100 + i * 120), AT('c9', 'comentarios') - .2 + i * .25) for i in range(3)]
R.golpe(fin + .1, 1.0); R.sello(fin + .5)
R.mezclar()
