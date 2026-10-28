"""Música, efectos y mezcla de "Pasó de verdad" · O. J. Simpson, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c2', 'G'), ('c3', 'Bb'), ('c5', 'A'), ('c7', 'D'), ('c9', 'C'), ('c11', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.golpe(AT('h1', 'probara'), .5); R.sello(AT('h2', 'entraba'))
R.teclas(S('c1'), S('c1') + 1.5, .12); R.golpe(AT('c1', 'Pero'), .5)
R.foto(S('c2') - .1); R.golpe(AT('c2', 'si no'), .8)
R.foto(S('c3') - .1); R.golpe(AT('c3', 'racistas'), .6); R.golpe(AT('c3', 'mentido'), .5)
R.zumbido(S('c4'), E('c4') - S('c4'), 45, .15)
R.foto(S('c5') - .1); R.latido(AT('c5', 'menos de cuatro'), E('c5'), 72, .8)
for i in range(14): R.tic(AT('c6', 'ciento') + i * .1, .22)
R.sello(AT('c6', 'no culpable')); R.golpe(AT('c6', 'no culpable'), .9)
R.foto(S('c7') - .1); R.sello(AT('c7', 'responsable'))
for i in range(14): R.tic(AT('c7', 'treinta y tres') + i * .1, .22)
R.golpe(AT('c8', 'Si yo'), .6)
R.foto(S('c9') - .1); R.foto(S('c10') - .1); R.sello(AT('c10', 'condenaron'))
R.foto(S('c11') - .1); R.zumbido(S('c11'), E('c11') - S('c11'), 40, .12)
R.foto(S('c12') - .1); R.sello(S('outro') + .3)
R.mezclar()
