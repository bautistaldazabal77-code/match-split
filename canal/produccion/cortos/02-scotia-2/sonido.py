"""Música, efectos y mezcla de "¿Y si…?" parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c1'), ['D1', 'D2', 'A2', 'F3', 'A3'], 600, 1.0),
    (S('c1'), S('c4'), ['A1', 'A2', 'E3', 'C4', 'E4'], 650, 0.85),
    (S('c4'), S('c7'), ['F1', 'F2', 'C3', 'A3', 'D4'], 800, 0.85),
    (S('c7'), S('c9'), ['D1', 'D2', 'A2', 'Bb2', 'F3'], 600, 1.0),
    (S('c9'), S('c12'), ['Bb1', 'Bb2', 'F3', 'D4', 'A3'], 700, 0.85),
    (S('c12'), D, ['F1', 'F2', 'C3', 'A3', 'E4'], 850, 0.85),
])
music *= env(T, [(0, .8), (S('h2'), .9), (S('c1'), .55), (S('c3'), .5), (S('c4'), .7), (S('c5'), .55), (S('c7'), 1.0), (S('c8'), .7), (S('c9'), .55),
                 (S('c10'), .6), (S('c12'), .55), (S('c13'), .5), (S('outro') + .1, 1.0), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('c3'), S('c4'), 92, .7)
latido(pulse, S('c8'), S('c9'), 100, .7)

sfx = np.zeros(N, F32)
place(sfx, bajo_agua(noise(3) * np.exp(-tt(3) * 1)) * .5, 0); place(sfx, crujido(3.5, .45), .2); place(sfx, ping(.2), .3)
place(sfx, stamp(.9), AT('h1', 'Qué'))
place(sfx, boom(.9, 4), S('h2')); place(sfx, stamp(1.0), S('h2') + .05)
# Lucas en la balsa
place(sfx, (lp(noise(S('c2') - S('c1')), 500) * .3 * np.minimum(1, tt(S('c2') - S('c1')) / 1.0)).astype(F32), S('c1'))
for i in range(6): place(sfx, tick(.4), AT('c1', 'once') - .3 + i * .15)
place(sfx, klaxon(.8, .12), AT('c1', 'rescatan') + .4); place(sfx, chime(.22, 880), AT('c1', 'sobrevivientes'))
# Astute
place(sfx, bajo_agua(torpedo_sfx(3, .3)), S('c2')); for_pings = [S('c2') + .3, S('c2') + 2.2]
for x in for_pings: place(sfx, ping(.3, 1250), x)
place(sfx, stamp(.8), S('c2') + .2)
# teoría: las tijeras
place(sfx, whoosh(1.4, .3), AT('c3', 'romper') - 1.4)
for i in range(3): place(sfx, click(1.0), AT('c3', 'romper') + i * .12)
place(sfx, (hp(noise(.7), 3000) * np.exp(-tt(.7) * 5) * .6).astype(F32), AT('c3', 'romper') + .2)
place(sfx, thud(1.0), AT('c4', 'falla')); place(sfx, chime(.2, 660), AT('c4', 'falla') + .05)
place(sfx, ring(1.6, .25), AT('c4', 'llama'))
# Cuarta Flota y satélites
place(sfx, whoosh(2.4, .3), S('c5')); place(sfx, (lp(noise(4), 120) * .5).astype(F32), S('c5') + 1)
place(sfx, stamp(.6), AT('c5', 'rutas'))
for i in range(6): bips(sfx, S('c6') + .4 + i * .8, 2, 2200, .14)
place(sfx, estatica(2.2, .05), AT('c6', 'imágenes')); place(sfx, chime(.18, 1320), AT('c6', 'imágenes'))
# bloqueo
place(sfx, stamp(.9), AT('c7', 'desembarco') + .3); place(sfx, boom(1.0, 4), AT('c7', 'Hay bloqueo')); place(sfx, stamp(1.2), AT('c7', 'Hay bloqueo'))
for i in range(4): place(sfx, jet(1.8, .25), AT('c8', 'rodean') - .4 + i * .6)
place(sfx, jet(2.4, .5), AT('c8', 'interceptado') - 1.0); place(sfx, klaxon(1.0, .18), AT('c8', 'interceptado'))
place(sfx, estatica(1.2, .08), AT('c8', 'volver') - .4)
# OTAN y el Trópico de Cáncer
place(sfx, whoosh(1.4, .3), S('c9')); place(sfx, chime(.22, 990), AT('c9', 'dato real'))
place(sfx, stamp(.8), AT('c10', 'no cubre')); place(sfx, whoosh(1.6, .3), AT('c10', 'Trópico') - .5)
place(sfx, stamp(1.0), AT('c11', 'mil')); place(sfx, stamp(1.0), AT('c11', 'tampoco'))
# mesa, tablero, comentarios
for i in range(3): place(sfx, thud(.7), S('c12') + .1 + i * .25)
for i in range(3): place(sfx, (hp(noise(.25), 2500) * np.exp(-tt(.25) * 12) * .5).astype(F32), AT('c12', 'negociar') - .4 + i * .15)
place(sfx, stamp(.9), AT('c13', 'Hoy'))
for i in range(6): place(sfx, beep(1320, .07, .18), AT('c13', 'cada pieza') + i * .18)
for i in range(4): place(sfx, pop(.45, 1000 + i * 150), AT('c14', 'comentarios') - .3 + i * .25)
place(sfx, boom(1.0, 4), S('outro') + .1); place(sfx, stamp(1.0), S('outro') + .12)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.24, sg=.55, pg=.12)
print('ok', round(D, 2), 's')
