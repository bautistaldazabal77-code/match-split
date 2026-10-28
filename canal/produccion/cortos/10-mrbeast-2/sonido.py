"""Música, efectos y mezcla de "Pasó de verdad" · MrBeast, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'Bb'), ('c4', 'G'), ('c6', 'C'), ('c9', 'A'), ('c12', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.golpe(.05, .9); R.tic(2.8, .5)
R.foto(S('h2') - .1)
for f in ['mil operaciones', 'diez minutos', 'filmó']: R.tic(AT('h2', f), .45)
R.teclas(S('c1'), S('c1') + 1.2, .14); R.golpe(AT('c1', 'lluvia'), .6)
R.golpe(AT('c2', 'acusaron'), .5); R.sello(AT('c2', 'pornografía'))
R.golpe(AT('c3', 'millones'), .6)
R.teclas(AT('c4', 'la gente'), E('c4') - .3, .12)
R.golpe(AT('c5', 'gobiernos'), .6)
for i in range(14): R.tic(AT('c6', 'cien') + i * .1, .22)
R.teclas(AT('c7', 'ya sé'), E('c7') - .3, .12)
R.golpe(AT('c8', 'Kenia'), .6); R.golpe(S('c9'), .8)
R.latido(S('c10'), E('c11'), 66, .6); R.foto(S('c10')); R.foto(S('c11') - .1)
R.foto(S('c12') - .1); R.sello(S('outro') + .3)
R.mezclar()
