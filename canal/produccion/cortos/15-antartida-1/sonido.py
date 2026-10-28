"""Música, efectos y mezcla de "¿Y si…? La Antártida en 2048", parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'F'), ('c3', 'A'), ('c5', 'D'), ('c7', 'Bb'), ('c9', 'G'), ('c10', 'D'), ('c12', 'A'), ('c13', 'Dfin')], brillo=600); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
# gancho: 2048, el mito
R.golpe(.05, .9); R.zumbido(0, S('h2'), 44, .12); place(R.sfx, chime(.18, 1320), .3)
R.sello(AF('h1', 'mentira') + .1); R.golpe(AF('h1', 'mentira'), .6)
R.golpe(S('h2') - .05, .6); R.sello(AF('h2', 'ficción'))
# lo real
R.foto(S('c1') - .1)
for i in range(12): R.tic(AT('c1', 'doce') - .3 + i * .1, .25)
R.sello(AF('c1', 'firmaron') + .1); R.foto(AF('c1', 'congelaron')); place(R.sfx, whoosh(1.2, .25), AF('c1', 'congelaron'))
R.foto(S('c2') - .1)
for w in ['Argentina', 'Chile', 'Reino']: R.sello(AF('c2', w) + .1)
R.golpe(AF('c2', 'pisan'), .7)
R.foto(S('c3') - .1); place(R.sfx, chime(.18, 880), AF('c3', 'Orcadas'))
R.golpe(S('c4') - .05, .6)
R.foto(S('c5') - .1); R.teclas(S('c5') + .4, AT('c5', 'minería') + .6, .1); R.sello(AF('c5', 'minería') + .45)
R.foto(AF('c5', 'Desde')); R.zumbido(AT('c5', 'Desde'), 3.0, 52, .1); R.sello(AF('c5', 'revisarlo'))
R.foto(S('c6') - .1)
for i in range(6): place(R.sfx, bajo_agua(ping(.25, 700)), AT('c6', 'sísmicos') - .4 + i * .7)
R.foto(AF('c6', 'una estimación'))
for i in range(12): R.tic(AT('c6', 'quinientos') - .2 + i * .1, .25)
R.sello(AF('c6', 'Rusia dice'))
# la ficción
R.golpe(S('c7') - .05, 1.0); R.estatica(S('c7') - .05, .6, .3)
R.foto(S('c8') - .1); R.foto(AF('c8', 'como Emilio')); place(R.sfx, chime(.16, 990), AF('c8', 'primer'))
R.foto(S('c9') - .1); R.foto(AF('c9', 'cuando llega')); place(R.sfx, alerta(1.6, .18), AF('c9', 'cuando llega')); R.sello(AF('c9', 'Rusia') + .1)
R.latido(S('c10'), S('c12'), 96, .8)
for i in range(8): place(R.sfx, ping(.16, 1400), S('c10') + i * 1.0)
bips(R.sfx, AF('c10', 'buque'), 3, 1600, .16)
R.golpe(S('c11'), .8)
for i in range(3): R.sello(S('c11') + .6 + i * .2)
R.foto(S('c12') - .1); place(R.sfx, ring(1.4, .18), AF('c12', 'Santiago')); R.golpe(AF('c12', 'En la parte'), .9)
R.foto(S('c13') - .1)
for i in range(4): place(R.sfx, pop(.3, 1100 + i * 120), AT('c13', 'comentarios') - .2 + i * .25)
R.golpe(S('outro') + .1, 1.0); R.sello(S('outro') + .5)
R.mezclar()
