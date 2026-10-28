"""Música, efectos y mezcla de "Pasó de verdad" · Cristiano Ronaldo, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'G'), ('c5', 'Bb'), ('c8', 'A'), ('c10', 'C'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.foto(max(AT('h1', 'mejor'), 2.9))
R.foto(S('c1') - .1); nv = AT('c1', 'noventa')
for i in range(12): R.tic(nv + i * .1, .25)
R.golpe(nv + 1.25, .6)
R.teclas(AT('c2', 'cuatrocientos') - .1, AT('c2', 'cuatrocientos') + 1.4, .4)
R.foto(S('c3') - .1); R.flash(S('c3') + .1); R.foto(S('c4') - .1)
R.foto(S('c5') - .1); R.golpe(AT('c5', 'lesionó'), .6); R.sello(AT('c6', 'ganó'))
R.golpe(AT('c7', 'tatuajes'), .5)
R.foto(S('c8') - .1); R.sello(AT('c8', 'banco'))
R.foto(S('c9') - .1); nv = AT('c10', 'novecientos')
for i in range(16): R.tic(nv + i * .1, .22)
R.golpe(nv + 1.6, .8)
R.foto(S('c11') - .1); R.golpe(AT('c11', 'llorón'), .5)
R.foto(S('c12') - .1); R.sello(S('outro') + .3)
R.mezclar()
