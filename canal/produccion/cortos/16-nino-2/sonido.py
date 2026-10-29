"""Música, efectos y mezcla de "¿Y si…? El Niño llega a su pico", parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sonido_reel import *
R = Reel([(0, 'A'), ('h2', 'D'), ('c1', 'Bb'), ('c2', 'F'), ('c4', 'D'), ('c6', 'G'), ('c7', 'A'), ('c8', 'F'), ('c9', 'D'), ('c11', 'Bb'), ('c12', 'D'), ('outro', 'Dfin')], brillo=600); S, AT, E = R.S, R.AT, R.E
AF = lambda c, f: AT(c, f) - .15
def lluvia(d, g=.12): T = tt(d); return (bp(noise(d), 700, 6000) * env(T, [(0, 0), (.6, 1), (d - .6, 1), (d, 0)]) * g).astype(F32)
def corriente(d, g=.2): T = tt(d); return (lp(noise(d), 380) * env(T, [(0, 0), (.5, 1), (d - .5, 1), (d, 0)]) * g * 4).astype(F32)
def motor(d, g=.15): T = tt(d); return (lp(np.sign(np.sin(2 * np.pi * 38 * T)) * (.6 + .4 * np.sin(2 * np.pi * 3 * T)), 300) * env(T, [(0, 0), (.4, 1), (d - .5, 1), (d, 0)]) * g).astype(F32)
# gancho: el río sube y Elsa no se quiere ir
R.golpe(.05, .9); R.latido(.2, S('h2'), 96, .7); place(R.sfx, corriente(AT('h1', 'Cómo'), .14), 0)
R.sello(AF('h1', 'seis')); R.foto(AF('h1', 'Elsa')); R.golpe(AF('h1', 'Cómo'), .8)
R.golpe(S('h2') - .05, .7); R.sello(AF('h2', 'Ficción'))
# la evacuación en lancha
R.foto(S('c1') - .1); place(R.sfx, lluvia(S('c2') - S('c1'), .1), S('c1')); place(R.sfx, motor(S('c2') - AT('c1', 'lancha'), .14), AF('c1', 'lancha'))
# la barranca y el golpe en el río
R.foto(S('c2') - .1); R.sello(AF('c2', 'real')); place(R.sfx, corriente(3.0, .12), AF('c2', 'islas'))
R.golpe(S('c3') - .05, .6); R.golpe(AF('c3', 'Es en'), .8)
# el 75 % y la terminal
R.foto(S('c4') - .1); R.sello(AF('c4', 'real')); R.teclas(AT('c4', 'setenta') - .3, AT('c4', 'setenta') + .9, .1); R.sello(AT('c4', 'exporta'))
R.foto(S('c5') - .1); R.zumbido(S('c5'), S('c6') - S('c5'), 44, .1); place(R.sfx, chime(.16, 440), AF('c5', 'media'))
# la ruta
R.foto(S('c6') - .1); place(R.sfx, corriente(S('c7') - S('c6'), .12), S('c6')); place(R.sfx, frenos(1.4, .2), AF('c6', 'cortan')); R.sello(AF('c6', 'cortan'))
# el pico
R.foto(S('c7') - .1); R.latido(S('c7'), S('c8'), 100, .8); R.golpe(AF('c7', 'pico'), .9); R.sello(AF('c7', 'pico'))
R.foto(AF('c7', 'Todo')); [place(R.sfx, pop(.3, 900 + i * 90), AT('c7', 'Todo') + i * .12) for i in range(6)]
# la bajante
R.foto(S('c8') - .1); place(R.sfx, chime(.2, 660), AF('c8', 'baja'))
for i, w in enumerate(['Seis', 'ochenta', 'cincuenta']): place(R.sfx, chime(.18, 990 - i * 110), AF('c8', w))
# la vuelta a casa y el poste
R.foto(S('c9') - .1); place(R.sfx, corriente(4.0, .08), S('c9')); place(R.sfx, chime(.2, 880), AF('c9', 'pie'))
R.foto(S('c10') - .1); R.teclas(AT('c10', 'escribe'), AT('c10', 'veintisiete') + .4, .12); place(R.sfx, chime(.22, 660), AT('c10', 'veintisiete') + .3)
# cierre
R.golpe(S('c11') - .05, .7); R.sello(AF('c11', 'tres'))
R.foto(S('c12') - .1); [place(R.sfx, pop(.3, 1100 + i * 120), AT('c12', 'Y contame') + .5 + i * .25) for i in range(3)]
R.golpe(S('outro') + .1, 1.0); R.sello(S('outro') + .5)
R.mezclar()
