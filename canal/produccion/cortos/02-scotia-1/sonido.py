"""Música, efectos y mezcla de "¿Y si…?" parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c1'), ['D1', 'D2', 'A2', 'F3', 'A3'], 600, 1.0),
    (S('c1'), S('c4'), ['A1', 'A2', 'E3', 'C4', 'E4'], 650, 0.85),
    (S('c4'), S('c9'), ['F1', 'F2', 'C3', 'A3', 'D4'], 800, 0.8),
    (S('c9'), S('c15'), ['D1', 'D2', 'A2', 'Bb2', 'F3'], 600, 1.0),
    (S('c15'), S('c17'), ['Bb1', 'Bb2', 'F3', 'D4', 'A3'], 650, 0.9),
    (S('c17'), D, ['D1', 'D2', 'A2', 'F3', 'D4'], 700, 1.0),
])
music *= env(T, [(0, .8), (S('h2'), .7), (S('c1'), .55), (S('c2'), .5), (S('c3'), .6), (AT('c3', 'Murieron'), .35), (S('c4'), .55), (S('c8'), .7), (S('c9'), .9),
                 (S('c10'), .55), (S('c12'), .45), (S('c13'), .7), (S('c14'), 1.0), (S('c15'), .6), (S('c16'), .35), (S('c17'), .55), (S('c18'), .85), (S('outro') + .1, 1.1), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('c12'), S('c14'), 104, .9)
latido(pulse, S('c17'), S('outro'), 80, .8)

sfx = np.zeros(N, F32)
# gancho: el torpedo y el impacto
t1, imp = AT('h1', 'hundiera'), AT('h1', 'guerra') + .15
place(sfx, bajo_agua(torpedo_sfx(imp - t1, .7)), t1); place(sfx, boom(1.2, 4.5), imp); place(sfx, bajo_agua(noise(1.2) * np.exp(-tt(1.2) * 3)) * .6, imp)
place(sfx, ping(.25), .1)
place(sfx, stamp(1.0), AT('h2', 'No')); place(sfx, whoosh(1.0, .3), AT('h2', 'Y esta') - .4)
place(sfx, stamp(.9), AT('c1', 'ficción'))
for i in range(6): place(sfx, thud(.7), AT('c1', 'cada pieza') + i * .22 + .3)
# 1982
place(sfx, ping(.2, 1200), S('c2')); place(sfx, bajo_agua(torpedo_sfx(.8, .4)), AT('c2', 'torpedea')); place(sfx, boom(.8, 4), AT('c2', 'torpedea') + .7)
place(sfx, stamp(.8), AT('c3', 'fuera')); place(sfx, crujido(3.0, .35), AT('c3', 'Murieron') - .2)
# hoy: F-16 y la alianza
place(sfx, whoosh(.8, .3), S('c4') - .3)
place(sfx, jet(2.6, .45), AT('c5', 'cazas') - .6)
for i in range(4): place(sfx, click(.6), AT('c5', 'veinticuatro') + i * .2)
place(sfx, chime(.18, 880), AT('c5', 'con la aprobación'))
place(sfx, chime(.2, 660), AT('c6', 'aliados'))
place(sfx, stamp(.7), S('c7')); place(sfx, whoosh(2.0, .3), AT('c7', 'Estados Unidos'))
for i in range(3): place(sfx, jet(1.6, .2), AT('c7', 'Estados Unidos') + .6 + i * .9)
place(sfx, klaxon(1.4, .18), AT('c8', 'amenaza'))
# el detonante
place(sfx, boom(.7, 3.5), S('c9')); place(sfx, stamp(.9), AT('c9', 'detonante'))
place(sfx, estatica(S('c11') - S('c10'), .025), S('c10')); place(sfx, ping(.18), S('c10') + .3); place(sfx, ping(.15), S('c10') + 4)
place(sfx, whoosh(.6, .3), S('c11') - .3)
for w in ['Lucas', 'veintitrés', 'primera']: place(sfx, click(.8), AT('c11', w))
# 3:10, sonar, torpedo, impacto
for k in range(5): place(sfx, ping(.35, 1450), S('c12') + k * 1.0)
place(sfx, klaxon(1.6, .28), AT('c12', 'rápido'))
place(sfx, bajo_agua(torpedo_sfx(E('c13') - S('c13') + .6, .9)), S('c13') - .2)
place(sfx, boom(1.4, 5.0), S('c14')); place(sfx, thud(1.4), S('c14')); place(sfx, crujido(3.5, .55), S('c14') + .6)
place(sfx, bajo_agua(noise(2.5) * np.exp(-tt(2.5) * 1.2)) * .4, AT('c14', 'hunde') - .5)
# aguas internacionales, nadie se atribuye
place(sfx, stamp(.6), S('c15')); place(sfx, whoosh(1.2, .25), AT('c15', 'Cientos') - .2)
place(sfx, bajo_agua(torpedo_sfx(2.4, .25)), S('c16') - .4); place(sfx, boom(.4, 3), AT('c16', 'Nadie'))
# el teléfono en la Casa Rosada
place(sfx, ring(3.2, .3), AT('c17', 'suena')); place(sfx, whoosh(1.0, .25), AT('c17', 'Llaman') - .2)
place(sfx, ring(2.8, .32), S('c18'))
place(sfx, boom(1.0, 4), AT('c18', 'lo cambia') + .3); place(sfx, stamp(1.0), S('outro') + .1)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.24, sg=.55, pg=.12)
print('ok', round(D, 2), 's')
