"""Música, efectos y mezcla de "Pasó de verdad" · MrBeast, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c3', 'G'), ('c6', 'C'), ('c8', 'G'), ('c10', 'A'), ('c11', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9)
co, cm = min(AT('h1', 'contando'), 2.8), AT('h1', 'cien mil')
n = int((cm + .6 - co) / .09)
for i in range(n): R.tic(co + i * .09 * (1 - i / (2.2 * n)), .12 + .1 * i / n)
R.sello(AT('h2', 'viral'))
R.foto(S('c1') - .1); R.foto(S('c2') - .1); R.golpe(AT('c2', 'universidad'), .5)
R.golpe(AT('c3', 'retos'), .5); R.golpe(AT('c3', 'dinero'), .7)
for i in range(12): R.tic(AT('c4', 'diez mil') + i * .1, .25)
R.golpe(AT('c4', 'patrocinador'), .5)
R.zumbido(S('c5'), 2.4, 70, .12)
R.foto(S('c6') - .1)
for f in ['autos', 'casas', 'isla']: R.tic(AT('c6', f), .5)
for i in range(16): R.tic(AT('c6', 'cuatrocientas') + i * .1, .2)
for f in ['veinte millones', 'treinta millones']:
    for i in range(12): R.tic(AT('c7', f) + i * .1, .22)
R.foto(S('c8') - .1); R.flash(AT('c8', 'canal')); R.foto(S('c9') - .1)
R.golpe(S('c10'), .7); R.sello(AT('c10', 'dividió'))
R.golpe(S('c11') + .2, 1.0); R.sello(S('outro') + .3)
R.mezclar()
