"""Música, efectos y mezcla de "Pasó de verdad" · Jacobo Grinberg, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'A'), ('c4', 'E'), ('c9', 'D'), ('c11', 'C'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.estatica(0, .45, .25)
for i in range(31): R.tic(2.5 + i * .015, .08)
R.tic(2.9, .5); R.golpe(AT('h1', 'cuarenta y ocho'), .6); R.sello(AT('h2', 'Nunca'))
R.zumbido(S('c1'), E('c2') - S('c1'), 55, .12); R.foto(AT('c1', 'India') - .1); R.sello(AT('c2', 'registro'))
R.golpe(AT('c3', 'esposa'), .6); R.sello(AT('c3', 'Tampoco'))
R.golpe(S('c4'), .6); R.latido(S('c5'), E('c8'), 70, .6)
for c in ['c5', 'c6', 'c7', 'c8']: R.foto(S(c) - .05)
R.sello(S('c9'))
for i in range(16): R.tic(S('c10') + i * .1, .22)
for f in ['cuerpo', 'pistas', 'culpables']: R.golpe(AT('c10', f), .45)
R.teclas(S('c11'), S('c11') + 1.2, .12)
R.foto(S('c12') - .1); R.sello(S('outro') + .3)
R.mezclar()
