"""Música, efectos y mezcla de "Pasó de verdad" · Kennedy, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c4', 'Bb'), ('c6', 'C'), ('c9', 'A'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.latido('c5', 'c6', 84); R.latido('c9', 'c11', 96); R.latido('c14', R.D - .5, 66, .8)
R.foto(.1); R.foto(AT('h1', 'nombre falso')); R.foto(S('h2') - .1); R.golpe(AT('h2', 'presidente'))
for t in [S('c1'), S('c2'), S('c4'), S('c5'), S('c7'), S('c9'), S('c10')]: R.foto(t - .1)
R.tic(S('c3') - .1); R.flash(AT('c3', 'marco') - .1); R.sello(AT('c3', 'marco') + .1); R.sello(AT('c3', 'Nadie'))
for i in range(3): R.flash(AT('c6', 'tres') + i * .45)
R.golpe(AT('c7', 'cabeza'), 1.0)
R.tic(S('c8') - .1); R.golpe(S('c8') + .1)
R.flash(AT('c10', 'mató')); R.sello(AT('c10', 'mató'))
R.zumbido(S('c11'), E('c11') - S('c11') + .4, 60, .15); R.golpe(AT('c11', 'detuvieron'), .6)
R.teclas(AT('c12', 'soy'), E('c12'))
for i in range(4): place(R.sfx, beep(880, .08, .14), S('c13') + .3 + i * .6)
place(R.sfx, beep(880, 1.2, .12), S('c13') + 2.7)
R.flash(S('c14') - .1); R.estatica(S('c14'), .3, .2); R.golpe(AT('c14', 'pregunta'), 1.0); R.sello(S('outro') + .3)
R.mezclar()
