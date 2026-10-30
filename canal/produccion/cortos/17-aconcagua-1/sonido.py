"""Música, efectos y mezcla de "Si una tormenta te atrapa en el Aconcagua", parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'Bb'), ('c3', 'G'), ('c6', 'D'), ('c7', 'A'), ('c8', 'Bb'), ('c9', 'D'), ('outro', 'Dfin')], brillo=420); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
def viento(d, g=.18):  # viento blanco: ruido filtrado que sube y baja
    T = tt(d); return (bp(noise(d), 250, 1800) * (0.55 + 0.45 * np.sin(2 * np.pi * 0.23 * T) * np.sin(2 * np.pi * 0.07 * T + 1)) * env(T, [(0, 0), (1, 1), (d - 1, 1), (d, 0)]) * g).astype(F32)
def golpe_puerta(g=.9): T = tt(.35); return (lp(noise(.35), 260) * np.exp(-T * 22) * g * 3).astype(F32)
def rasguno(d=.8, g=.15): T = tt(d); return (bp(noise(d), 2500, 7000) * (np.sin(2 * np.pi * 7 * T) > .2) * env(T, [(0, 0), (.1, 1), (d - .1, 1), (d, 0)]) * g).astype(F32)
fin = S('outro')
place(R.sfx, viento(S('c2') + .2, .2), 0); place(R.sfx, viento(fin - S('c2'), .09), S('c2'))
R.golpe(.05, .9); R.latido(.2, S('c1'), 70, .6); R.golpe(AF('h1', 'vas'), .7); R.sello(AF('h1', 'Y si') + .2)
R.foto(S('c1') - .1); R.foto(AF('c1', 'Vos'))
R.foto(S('c2') - .1); R.estatica(AF('c2', 'habla'), .5, .25); R.estatica(AT('c2', 'habla') + .4, S('c3') - AT('c2', 'habla') - .6, .04)
for c in ['c3', 'c4', 'c5']: R.golpe(S(c) - .05, .55); R.sello(S(c) + .1)
R.foto(S('c6') - .1); R.zumbido(S('c6'), 1.0, 60, .12); place(R.sfx, beep(220, .25, .2), AF('c6', 'muere')); place(R.sfx, beep(165, .35, .2), AF('c6', 'muere') + .3)
R.latido(S('c6') + 2, S('c8'), 64, .5)
R.foto(S('c7') - .1); R.golpe(AF('c7', 'vuelve'), .5); R.estatica(AT('c7', 'vuelve') + .2, S('c8') - AT('c7', 'vuelve') - .4, .05); R.zumbido(AT('c7', 'vuelve'), S('c8') - AT('c7', 'vuelve'), 48, .1)
g0 = AT('c8', 'golpean') - .05
for i, dt in enumerate([0, .35, .7]): place(R.sfx, golpe_puerta(1.0), g0 + dt)
for dt in [-.1, .3]: place(R.sfx, golpe_puerta(.9), AT('c8', 'Patrulla') + dt)
R.latido(S('c8'), fin, 110, .9); place(R.sfx, rasguno(1.2, .12), AF('c8', 'Y escuchás'))
R.golpe(S('c9') - .05, .9); R.sello(AF('c9', 'Hay una'))
R.golpe(fin + .1, 1.0); R.sello(fin + .5)
R.mezclar()
