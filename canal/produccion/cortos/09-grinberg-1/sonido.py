"""Música, efectos y mezcla de "Pasó de verdad" · Jacobo Grinberg, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c3', 'Bb'), ('c5', 'E'), ('c7', 'A'), ('c10', 'D'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.estatica(.0, .45, .25)
for i in range(31): R.tic(2.5 + i * .015, .08)
R.golpe(AT('h1', 'desapareció'), .7); R.tic(AT('h1', 'cumpleaños'), .5); R.sello(S('h2'))
R.foto(S('c1') - .1); R.teclas(S('c2'), S('c2') + 1.5, .12); R.golpe(AT('c2', 'cincuenta'), .5)
R.zumbido(S('c3'), E('c4') - S('c3'), 60, .1); R.latido(S('c4'), E('c4'), 60, .5)
R.zumbido(S('c5'), E('c5') - S('c5'), 48, .14); R.sello(AT('c6', 'nunca'))
R.foto(S('c7') - .1); R.golpe(AT('c8', 'Pachita'), .6); R.golpe(AT('c8', 'cuchillo'), .5)
R.foto(S('c9') - .1); R.foto(S('c10') - .1); R.latido(S('c10'), E('c11'), 72, .7)
R.foto(S('c11') - .1); R.estatica(AT('c11', 'dejó'), .6, .3); R.golpe(AT('c11', 'aparecer'), .8)
R.golpe(S('c12') + .2, 1.0); R.sello(S('outro') + .3)
R.mezclar()
