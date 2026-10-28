"""Música, efectos y mezcla de "Pasó de verdad" · Cristiano Ronaldo, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c3', 'Bb'), ('c6', 'G'), ('c9', 'A'), ('c10', 'C'), ('c11', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.foto(AT('h1', 'pensó'))
R.foto(S('c1') - .1); R.sello(AT('c2', 'alcohol'))
R.zumbido(S('c3'), E('c3') - S('c3'), 50, .12); R.golpe(AT('c3', 'solo'), .6)
R.sello(AT('c4', 'llorón'))
R.latido(S('c5'), S('c6') - .2, 150, .8); R.golpe(AT('c5', 'operaron'), .5)
R.foto(S('c6') - .1); R.golpe(AT('c6', 'Manchester United'), .7); R.flash(AT('c7', 'siete'))
R.foto(S('c8') - .1); R.golpe(AT('c8', 'egoísta'), .6)
R.zumbido(S('c9'), E('c9') - S('c9'), 42, .15); R.golpe(AT('c9', 'murió'), .7)
R.foto(S('c10') - .1); R.flash(AT('c10', 'Balón de Oro')); R.sello(AT('c10', 'arrogante'))
R.golpe(S('c11') + .2, 1.0); R.sello(S('outro') + .3)
R.mezclar()
