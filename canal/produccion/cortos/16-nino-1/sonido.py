"""Música, efectos y mezcla de "¿Y si…? El Niño llega a su pico", parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'D'), ('h2', 'Bb'), ('c1', 'F'), ('c4', 'D'), ('c5', 'G'), ('c7', 'A'), ('c8', 'D'), ('c9', 'Bb'), ('c11', 'A'), ('c12', 'D'), ('outro', 'Dfin')], brillo=600); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
def lluvia(d, g=.12): T = tt(d); return (bp(noise(d), 700, 6000) * env(T, [(0, 0), (.6, 1), (d - .6, 1), (d, 0)]) * g).astype(F32)
def corriente(d, g=.2): T = tt(d); return (lp(noise(d), 380) * env(T, [(0, 0), (.5, 1), (d - .5, 1), (d, 0)]) * g * 4).astype(F32)
# gancho grande: la pregunta
R.golpe(.05, 1.0); R.latido(.1, S('h1'), 104, .8)
for w in ['El Niño', 'rompe', 'y el Paraná', 'en Rosario']: R.golpe(AF('h0', w) + .1, .6)
R.golpe(AF('h0', 'seis') + .1, 1.0); R.sello(AF('h0', 'seis') + .1)
# el Pacífico se calienta
R.foto(S('h1') - .1); place(R.sfx, rumble(AT('h1', 'tres') - S('h1') + .5, .35), S('h1'))
for i in range(8): R.tic(S('h1') + .3 + i * (AT('h1', 'ocho') - S('h1') - .3) / 8, .25)
R.golpe(AF('h1', 'Nunca'), .9); R.foto(AF('h1', 'Qué')); bips(R.sfx, AF('h1', 'Rosario'), 3, 1600, .16)
R.golpe(S('h2') - .05, .7); R.sello(AF('h2', 'Ficción'))
# la OMM, Saulo y el récord
R.foto(S('c1') - .1); R.sello(AF('c1', 'real')); R.teclas(AT('c1', 'tres') - .4, AT('c1', 'tres') + .6, .1)
R.foto(S('c2') - .1); R.golpe(AF('c2', 'nunca'), .5)
R.foto(AF('c2', 'El récord')); place(R.sfx, chime(.18, 660), AF('c2', 'dos coma')); place(R.sfx, chime(.2, 990), AF('c2', 'dos mil') + .4)
R.foto(S('c3') - .1); place(R.sfx, corriente(4.0, .12), S('c3')); R.sello(AF('c3', 'cinco') + .3)
# Bruno y Elsa
R.foto(S('c4') - .1); R.sello(AF('c4', 'ficción')); R.foto(AF('c4', 'Su abuela')); place(R.sfx, corriente(3.0, .1), AT('c4', 'Su abuela'))
# la lluvia y la crecida que baja
R.foto(S('c5') - .1); place(R.sfx, lluvia(AT('c5', 'Toda') - S('c5') + .8, .14), S('c5')); place(R.sfx, whoosh(2.0, .3), AF('c5', 'baja'))
R.foto(S('c6') - .1); R.sello(AF('c6', 'real')); R.latido(S('c6'), S('c7'), 80, .6)
for i in range(6): R.tic(S('c6') + .3 + i * (AT('c6', 'venir') - S('c6')) / 6, .25)
# el chat
R.foto(S('c7') - .1); place(R.sfx, vibra(.6, .3), AF('c7', 'escribe')); place(R.sfx, pop(.35, 1100), AT('c7', 'escribe') + .2); place(R.sfx, pop(.35, 900), AT('c7', 'contesta') + .3)
# 1983
R.foto(S('c8') - .1); R.sello(AF('c8', 'real')); place(R.sfx, corriente(4.5, .14), S('c8')); place(R.sfx, crujido(2.2, .35), AF('c8', 'cayó')); R.golpe(AT('c8', 'cayó') + .6, .7)
# alerta y evacuación
R.foto(S('c9') - .1); R.latido(S('c9'), S('c11'), 92, .7); R.sello(AF('c9', 'alerta')); place(R.sfx, alerta(1.6, .12), AF('c9', 'evacuación')); R.sello(AF('c9', 'evacuación'))
R.foto(S('c10') - .1); R.sello(S('c10'))
R.foto(S('c11') - .1); R.teclas(AT('c11', 'pronóstico'), AT('c11', 'pico'), .1); R.golpe(AF('c11', 'pico'), .7); R.golpe(AF('c11', 'seis'), .8)
# Elsa no se quiere ir
R.foto(S('c12') - .1); place(R.sfx, lluvia(AT('c12', 'Vos') - S('c12') + .6, .16), S('c12')); place(R.sfx, rumble(1.2, .3), S('c12'))
R.foto(AF('c12', 'Vos')); place(R.sfx, chime(.2, 880), AF('c12', 'La parte'))
R.golpe(S('outro') + .1, 1.0); R.sello(S('outro') + .5)
R.mezclar()
