"""Música, efectos y mezcla de "¿Y si…? La antena china de Neuquén", parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('c1', 'Bb'), ('c4', 'A'), ('c5', 'D'), ('c7', 'F'), ('c9', 'G'), ('c10', 'A'), ('c12', 'Bb'), ('c13', 'D'), ('c14', 'Dfin')]); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
# gancho
R.golpe(.05, .9); R.zumbido(0, S('h2'), 48, .14); R.sello(AF('h1', 'cerrar') + .1)
R.golpe(AF('h1', 'Pekín'), .8); R.golpe(AF('h1', 'Qué'), .7)
R.golpe(S('h2') - .05, .7); R.sello(AF('h2', 'Ficción'))
# Sofía y el acuerdo de 2016
R.foto(S('c1') - .1); R.sello(AF('c1', 'declarar')); place(R.sfx, whoosh(.8, .25), AF('c1', 'registros'))
R.foto(S('c2') - .1); R.teclas(AT('c2', 'dieciséis'), AT('c2', 'civil'), .1); R.sello(AF('c2', 'civil') + .25)
R.foto(S('c3') - .1); R.golpe(AF('c3', 'probarlo'), .6)
# la inspección de 2024 y la total
R.foto(S('c4') - .1)
for w in ['Cancillería', 'ENACOM', 'CONAE']: R.tic(AF('c4', w) + .1, .5)
R.foto(AF('c4', 'y concluyeron')); place(R.sfx, chime(.2, 880), AF('c4', 'pacíficos'))
R.foto(S('c5') - .1); R.latido(S('c5'), S('c7'), 88, .7)
for w in ['Fuerza', 'CONAE', 'inteligencia']: R.tic(AF('c5', w) + .1, .5)
R.foto(S('c6') - .1); place(R.sfx, chime(.16, 660), AF('c6', 'sala')); R.sello(AF('c6', 'servidores') + .1)
# Malargüe
R.golpe(S('c7') - .05, .6); R.foto(S('c8') - .1); R.zumbido(AT('c8', 'Malargüe'), 1.6, 60, .1)
R.foto(AF('c8', 'Es de la'))
for w in ['cincuenta', 'diez']: R.tic(AF('c8', w) + .1, .5)
R.golpe(AF('c9', 'quién'), .9)
# las ofertas
R.foto(S('c10') - .1)
for i in range(6): R.tic(AT('c10', 'inversiones') + i * .18, .25)
R.foto(S('c11') - .1); R.sello(AF('c11', 'compras') + .1); R.sello(AF('c11', 'swap') + .1)
R.foto(S('c12') - .1); R.teclas(S('c12') + .2, S('c12') + 3, .08); bips(R.sfx, AF('c12', 'potencias'), 2, 1500, .14)
R.foto(S('c13') - .1)
for w in ['La antena', 'El pedido', 'presión']: place(R.sfx, chime(.16, 990), AT('c13', w) + .25)
R.foto(S('c14') - .1)
for i in range(4): place(R.sfx, pop(.3, 1100 + i * 120), AT('c14', 'comentarios') - .2 + i * .25)
R.golpe(S('outro') + .1, 1.0); R.sello(S('outro') + .5)
R.mezclar()
