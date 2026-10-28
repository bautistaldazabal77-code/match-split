"""Música, efectos y mezcla de "Pasó de verdad" · Michael Jackson, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c2', 'F'), ('c6', 'C'), ('c8', 'A'), ('c11', 'Bb'), ('c13', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
R.latido(0, 'c1', 72, .7); R.latido('c8', 'c9', 92); R.latido('c13', R.D - .5, 66, .7)
R.foto(.1); place(R.sfx, whoosh(.4, .3), AT('h1', 'cinturón')); R.sello(AT('h2', 'pegaba'))
for t in [S('c1'), S('c2'), S('c6'), S('c7'), S('c9'), S('c10'), S('c11'), S('c12')]: R.foto(t - .1)
for w in ['estudios', 'giras', 'hoteles']: place(R.sfx, thud(.4), AT('c4', w))
place(R.sfx, (hp(noise(.6), 2000) * np.exp(-tt(.6) * 6) * .4).astype(F32), AT('c5', 'espejo') - .3)
R.golpe(AT('c6', 'Thriller'), .8)
for i in range(8): place(R.sfx, chime(.14, 660 + i * 80), AT('c7', 'ocho') + i * .12)
place(R.sfx, (lp(noise(2.5), 1200) * .35 * np.minimum(1, tt(2.5) * 3)).astype(F32), AT('c8', 'fuego') - .2); R.golpe(AT('c8', 'fuego'), .7)
R.sello(AT('c9', 'vitiligo'))
R.zumbido(S('c10'), 4, 55, .12)
R.golpe(AT('c12', 'siempre'), .9); R.estatica(S('c13') - .1, .3, .2); R.golpe(S('c13') + .3, .8); R.sello(S('outro') + .3)
R.mezclar()
