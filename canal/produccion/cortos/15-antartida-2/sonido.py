"""Música, efectos y mezcla de "¿Y si…? La Antártida en 2048", parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'Bb'), ('c2', 'F'), ('c5', 'D'), ('c7', 'A'), ('c9', 'G'), ('c10', 'D'), ('c12', 'Bb'), ('c13', 'D'), ('c14', 'Dfin')], brillo=600); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
# gancho: el buque en el radar
R.golpe(.05, .9); R.latido(.3, S('h2'), 96, .7)
for i in range(5): place(R.sfx, ping(.16, 1400), .3 + i * 1.2)
bips(R.sfx, AF('h1', 'buque'), 3, 1600, .16); R.golpe(AF('h1', 'Qué'), .8)
R.golpe(S('h2') - .05, .7); R.sello(AF('h2', 'Ficción'))
# Valentina y el Irízar
R.foto(S('c1') - .1); place(R.sfx, whoosh(1.2, .25), AF('c1', 'llega')); R.sello(AF('c1', 'hora'))
R.foto(AF('c1', 'y la Argentina')); R.zumbido(AT('c1', 'y la Argentina'), 3.0, 40, .14); place(R.sfx, crujido(2.0, .25), AF('c1', 'rompehielos'))
# los datos del tratado
R.foto(S('c2') - .1)
for w in ['bases', 'maniobras', 'armas']: R.sello(AF('c2', w) + .15)
R.foto(S('c3') - .1); place(R.sfx, jet(2.6, .3), S('c3') + .2); place(R.sfx, chime(.18, 880), AF('c3', 'ciencia'))
R.foto(S('c4') - .1); R.teclas(AT('c4', 'nada') - .2, AT('c4', 'reclamo') + .2, .1)
for w in ['bases', 'bebés']: R.sello(AF('c4', w) + .25)
# la alianza
R.foto(S('c5') - .1); place(R.sfx, chime(.2, 660), AF('c5', 'acuerdo')); place(R.sfx, chime(.2, 990), AF('c5', 'acuerdo') + .15)
R.foto(AF('c5', 'Si se abre')); R.golpe(AF('c5', 'pierden'), .7)
R.foto(S('c6') - .1); R.zumbido(S('c6'), 5.0, 46, .08)
# el dato que define todo
R.golpe(S('c7') - .05, .8); R.foto(AF('c7', 'Para levantar')); R.sello(AF('c7', 'votación') + .1)
R.foto(S('c8') - .1)
for i in range(26): R.tic(S('c8') + .4 + i * (AT('c8', 'veintiséis') - S('c8')) / 26, .22)
for w in ['Argentina', 'Chile', 'Reino']: R.sello(AF('c8', w) + .1)
R.golpe(S('c9'), .8)
for i in range(3): R.sello(S('c9') + .2 + i * .2)
R.foto(S('c10') - .1); place(R.sfx, chime(.18, 880), AF('c10', 'aprueba')); R.sello(AF('c10', 'ratifica')); R.sello(AF('c10', 'sigue') + .1)
R.foto(S('c11') - .1); R.latido(S('c11'), S('c13'), 86, .7)
for i in range(3): R.tic(AT('c11', 'tres') + i * .5, .4)
R.foto(S('c12') - .1); place(R.sfx, whoosh(2.0, .3), AF('c12', 'primero')); R.golpe(AF('c12', 'va'), .7)
R.foto(S('c13') - .1)
for w in ['fecha', 'reclamos', 'barcos']: place(R.sfx, chime(.16, 990), AT('c13', w))
R.foto(S('c14') - .1)
for i in range(4): place(R.sfx, pop(.3, 1100 + i * 120), AT('c14', 'comentarios') - .2 + i * .25)
R.golpe(S('outro') + .1, 1.0); R.sello(S('outro') + .5)
R.mezclar()
