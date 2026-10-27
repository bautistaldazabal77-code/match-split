"""Música, efectos y mezcla de "Pasó de verdad" · Victor Ninov, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c1'), ['C2', 'C3', 'G3', 'Eb4', 'G4'], 650, 1.0),
    (S('c1'), S('c4'), ['Ab1', 'Ab2', 'Eb3', 'C4', 'G4'], 750, .85),
    (S('c4'), S('c7'), ['F1', 'F2', 'C3', 'Ab3', 'Eb4'], 800, .85),
    (S('c7'), S('c8'), ['Eb2', 'Eb3', 'Bb3', 'G4', 'D5'], 1100, .9),
    (S('c8'), S('c11'), ['C2', 'C3', 'G3', 'Eb4', 'D4'], 650, .85),
    (S('c11'), D, ['B1', 'B2', 'F3', 'D4', 'Ab3'], 600, 1.0),
])
music *= env(T, [(0, .8), (S('h2') - .3, .9), (S('h2'), .45), (S('c1'), .6), (S('c4'), .55), (S('c7'), .8), (S('c8'), .6), (S('c9'), .5), (S('c11'), .7),
                 (S('c13'), .4), (S('c14'), .9), (S('outro') + .1, 1.0), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('c9'), S('c11'), 84, .6)
latido(pulse, S('c12'), S('c14'), 104, .8)

sfx = np.zeros(N, F32)
# la tabla se arma casilla por casilla
for z in range(1, 119, 3): place(sfx, tick(.12), .05 + z * .021)
place(sfx, chime(.3, 990), AT('h1', 'dos elementos')); place(sfx, chime(.25, 1320), AT('h1', 'dos elementos') + .15)
place(sfx, (hp(noise(.5), 2000) * np.exp(-tt(.5) * 9) * .5).astype(F32), S('h2'))      # se rajan
place(sfx, boom(.8, 3), AT('h2', 'existía')); place(sfx, stamp(1.1), AT('h2', 'existía'))
# Ninov, cazador de elementos
place(sfx, whoosh(1.2, .3), S('c1') - .5); place(sfx, chime(.18, 660), AT('c1', 'Victor'))
for i in range(6): place(sfx, beep(1500 + i * 120, .05, .12), AT('c1', 'cazadores') + i * .2)
place(sfx, beep(2200, .12, .2), AT('c1', 'cazadores') + 1.25)
# globo: Darmstadt y Berkeley
place(sfx, whoosh(1.8, .35), S('c2') - .2)
for w in ('ciento diez', 'ciento once', 'ciento doce'): place(sfx, pop(.4, 900), AT('c2', w))
place(sfx, whoosh(2.0, .35), S('c3')); place(sfx, chime(.2, 880), AT('c3', 'receta'))
place(sfx, thud(.6), AT('c3', 'criptón')); place(sfx, thud(.6), AT('c3', 'plomo'))
place(sfx, zumbido(1.6, 110, .12), AT('c3', 'disparar'))
# 36 + 82 = 118
place(sfx, stamp(.6), AT('c4', 'treinta')); place(sfx, stamp(.6), AT('c4', 'ochenta'))
fu = AT('c4', 'Si se funden') + .5
place(sfx, whoosh(.6, .4), fu - .55); place(sfx, boom(1.0, 3.5), fu); place(sfx, sizzle(1.0, .35), fu)
place(sfx, chime(.3, 1320), AT('c4', 'ciento dieciocho'))
# el acelerador
place(sfx, zumbido(S('c6') - S('c5') + .2, 55, .35), S('c5') - .1)
for i in range(10): place(sfx, tick(.25), S('c5') + i * (AT('c5', 'acelerador') - S('c5')) / 10)
teclas(sfx, AT('c5', 'billones') - .9, AT('c5', 'billones') + .2, .2, .04)
# las tres cadenas en la pantalla
teclas(sfx, S('c6') - .1, AT('c6', 'encontró') + .35)
for k in range(3): place(sfx, beep(1760, .1, .22), AT('c6', 'encontró') + .45 + k * .22)
ta = AT('c6', 'Tres átomos')
for i in range(7): place(sfx, pop(.35, 1600 - i * 140), ta + .15 + i * .4)
place(sfx, chime(.25, 990), AT('c6', 'dieciséis'))
# el anuncio y la isla
for i in range(3): place(sfx, whoosh(.5, .25), S('c7') + i * .4); place(sfx, thud(.4), S('c7') + i * .4 + .25)
place(sfx, (lp(noise(4), 600) * .25 * np.sin(np.pi * tt(4) / 4)).astype(F32), AT('c7', 'mar') - .5)     # olas
place(sfx, whoosh(1.4, .3), AT('c7', 'mar')); place(sfx, chime(.3, 1175), AT('c7', 'isla') + .2)
# repetirlo; el mundo dice que no
place(sfx, stamp(.5), AT('c8', 'otro'))
for w in ('Alemania', 'Japón', 'Francia'): place(sfx, beep(330, .18, .3), AT('c9', w) + .3)
place(sfx, boom(.7, 3), AT('c9', 'Nada')); place(sfx, stamp(1.0), AT('c9', 'Nada'))
place(sfx, beep(220, .35, .35), AT('c10', 'Tampoco'))
# 2001
teclas(sfx, S('c11') - .1, AT('c11', 'cadena'))
place(sfx, beep(1980, .14, .25), AT('c11', 'cadena'))
teclas(sfx, AT('c12', 'otros'), S('c13') + .1, .18, .09)
place(sfx, beep(150, .5, .4), AT('c13', 'no estaba') - .05); place(sfx, boom(1.0, 3.5), AT('c13', 'no estaba')); place(sfx, stamp(1.2), AT('c13', 'no estaba'))
# parte 2
place(sfx, whoosh(1.4, .3), S('c14') - .3); place(sfx, boom(.9, 4), S('c14')); place(sfx, stamp(.9), S('outro'))

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.24, sg=.55, pg=.12)
print('ok', round(D, 2), 's')
