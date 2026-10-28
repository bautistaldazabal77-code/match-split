"""Música, efectos y mezcla de "Pasó de verdad" · La bomba atómica, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c3', 'Bb'), ('c5', 'G'), ('c8', 'C'), ('c11', 'A'), ('c13', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.latido('c8', 'c10', 88, .8); R.latido('c13', R.D - .5, 66, .7)
R.foto(.1); pa = AT('h1', 'partieron'); place(R.sfx, (hp(noise(.5), 2000) * np.exp(-tt(.5) * 9) * .45).astype(F32), pa); R.golpe(AT('h2', 'energía'), .8)
R.golpe(AT('c1', 'fabricar'), .6); R.foto(S('c2') - .1)
R.teclas(S('c3'), S('c3') + 2.5); R.foto(AT('c3', 'Albert Einstein') - .1); R.sello(AT('c4', 'puerto'))
for t in [S('c5'), S('c6'), S('c7')]: R.foto(t - .1)
for i in range(12): R.tic(AT('c7', 'ciento treinta') + i * .1, .25)
for i in range(5): place(R.sfx, beep(880, .08, .14), AT('c8', 'cinco y veintinueve') + i * .4)
R.zumbido(S('c9'), E('c9') - S('c9'), 45, .2)
a = S('c10'); place(R.sfx, (hp(noise(1.2), 300) * np.exp(-tt(1.2) * 2) * .6).astype(F32), a - .05); place(R.sfx, boom(1.2, 6), a); place(R.sfx, rumble(3, .4), a + .2)
R.foto(AT('c10', 'arena') - .1)
R.zumbido(S('c11'), E('c11') - S('c11') + .5, 40, .15)
R.foto(S('c12') - .1); R.sello(AT('c12', 'rival'))
R.golpe(AT('c13', 'parte dos'), 1.0); R.sello(S('outro') + .3)
R.mezclar()
