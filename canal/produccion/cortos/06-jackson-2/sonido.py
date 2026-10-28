"""Música, efectos y mezcla de "Pasó de verdad" · Michael Jackson, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'A'), ('c4', 'G'), ('c6', 'C'), ('c10', 'F'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.latido('c7', 'c9', 72, .8); R.latido('c12', R.D - .5, 66, .7)
R.foto(.1); R.sello(AT('h2', 'No hubo'))
R.golpe(AT('c1', 'acuerdo millonario'), .6)
R.estatica(S('c2') - .1, .3, .15)
R.foto(S('c3') - .1); R.sello(AT('c3', 'arrestaron'))
nc = AT('c4', 'no culpable')
for i in range(14): R.tic(nc + i * .1, .35)
R.golpe(nc + 1.5, .8); R.foto(S('c5') - .1)
for i in range(50): place(R.sfx, tick(.12), AT('c6', 'cincuenta conciertos') + i * .025)
R.foto(S('c7') - .1); R.foto(AT('c7', 'Conrad Murray') - .1)
for i in range(int((S('c9') - S('c8')) / .5)): R.tic(S('c8') + i * .5, .3)
place(R.sfx, beep(880, 1.6, .12), AT('c9', 'respiraba')); R.golpe(AT('c9', 'Murió'), .8)
R.foto(S('c10') - .1); R.sello(AT('c10', 'condenado'))
R.golpe(AT('c11', 'Nunca'), .6); R.foto(S('c12') - .1); R.golpe(S('c13'), .9); R.sello(S('outro') + .3)
R.mezclar()
