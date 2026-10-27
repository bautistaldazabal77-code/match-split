"""Música, efectos y mezcla de "Pasó de verdad" · Victor Ninov, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c1'), ['C2', 'C3', 'G3', 'Eb4', 'G4'], 650, 1.0),
    (S('c1'), S('c3'), ['B1', 'B2', 'F3', 'D4', 'Ab3'], 600, .9),
    (S('c3'), S('c7'), ['Ab1', 'Ab2', 'Eb3', 'C4', 'G4'], 650, .85),
    (S('c7'), S('c10'), ['F1', 'F2', 'C3', 'Ab3', 'Db4'], 600, 1.0),
    (S('c10'), S('c13'), ['Db2', 'Db3', 'Ab3', 'F4', 'C4'], 750, .85),
    (S('c13'), D, ['Eb2', 'Eb3', 'Bb3', 'G4', 'D5'], 1100, .9),
])
music *= env(T, [(0, .8), (S('h2'), .9), (S('c1'), .55), (S('c3'), .6), (S('c6'), .4), (S('c7'), .7), (S('c8'), .55), (S('c10'), .5), (S('c11'), .55),
                 (S('c13'), .7), (S('c14'), .8), (S('c15'), .6), (S('outro') + .1, 1.0), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('c3'), S('c6'), 88, .7)
latido(pulse, S('c8'), S('c10'), 76, .6)

sfx = np.zeros(N, F32)
# recapitulación
place(sfx, chime(.28, 990), .1); place(sfx, chime(.22, 1320), .25)
place(sfx, whoosh(.8, .3), AT('h1', 'Cuando revisaron') - .3)
for i in range(3): place(sfx, beep(330, .08, .2), AT('h1', 'Cuando revisaron') + .3 + i * .2)
place(sfx, boom(.8, 3), AT('h1', 'no estaban')); place(sfx, stamp(1.0), AT('h1', 'no estaban'))
place(sfx, boom(.9, 4), S('h2')); place(sfx, stamp(.9), S('h2') + .05)
# abril de 2001
teclas(sfx, S('c1') - .1, AT('c1', 'nueva cadena'), .22, .09)
place(sfx, beep(1980, .14, .25), AT('c1', 'nueva cadena') + .1)
place(sfx, whoosh(.7, .3), S('c2') - .2); teclas(sfx, AT('c2', 'compañeros') - .2, AT('c2', 'nada'), .18, .08)
place(sfx, beep(150, .5, .4), AT('c2', 'nada') - .05); place(sfx, stamp(1.1), AT('c2', 'nada'))
# la pregunta y los datos en bruto
place(sfx, whoosh(1.2, .3), AT('c3', 'pregunta') - .5)
for i in range(3): place(sfx, thud(.5), AT('c3', 'tres cadenas') - .1 + i * .18)
place(sfx, chime(.2, 660), S('c4')); place(sfx, beep(880, .25, .25), AT('c4', 'único'))
# nuevo análisis
teclas(sfx, S('c5'), S('c6') - .2, .2, .05)
for i in range(11): place(sfx, tick(.2), S('c5') + i * (S('c6') - S('c5') - .2) / 11)
place(sfx, beep(1500, .2, .2), AT('c5', 'evento por evento'))
# no estaban
for i in range(3): place(sfx, beep(196, .3, .35), AT('c6', 'no estaban') + i * .12)
place(sfx, boom(1.0, 4), AT('c6', 'no estaban') + .4); place(sfx, stamp(1.2), AT('c6', 'no estaban') + .4)
# retractación, informe, despido
place(sfx, whoosh(.9, .3), S('c7')); place(sfx, stamp(1.0), AT('c7', 'retira'))
place(sfx, whoosh(.9, .3), S('c8')); place(sfx, (hp(noise(1.2), 3000) * .08 * np.sin(np.pi * tt(1.2) / 1.2)).astype(F32), AT('c8', 'clara'))   # resaltador
place(sfx, thud(.7), AT('c8', 'responsable'))
place(sfx, whoosh(.7, .3), S('c9')); place(sfx, boom(.8, 3), AT('c9', 'despide')); place(sfx, stamp(1.2), AT('c9', 'despide'))
# su versión
place(sfx, chime(.18, 523), AT('c10', 'Dijo'))
# Alemania
place(sfx, whoosh(1.2, .3), S('c11'))
for i in range(34): place(sfx, tick(.18), AT('c11', 'treinta y cuatro') - .3 + i * .025)
place(sfx, beep(196, .3, .35), AT('c11', 'dos tampoco')); place(sfx, stamp(.8), AT('c11', 'dos tampoco'))
place(sfx, thud(.6), AT('c12', 'análisis'))
for i in range(3): place(sfx, chime(.18, 660 + i * 220), AT('c12', 'mantuvieron') + i * .12)
# el 118 existe: Dubna
place(sfx, whoosh(2.0, .35), S('c13')); place(sfx, chime(.3, 880), AT('c13', 'Existen'))
place(sfx, whoosh(1.6, .3), AT('c13', 'Estados Unidos') - .4); place(sfx, thud(.6), AT('c13', 'otra receta'))
place(sfx, chime(.3, 990), AT('c14', 'livermorio')); place(sfx, chime(.3, 1320), AT('c14', 'oganesón'))
for i in range(12): place(sfx, tick(.15), AT('c14', 'se completó') + i * .06)
place(sfx, boom(.6, 3), AT('c14', 'sin él'))
for i in range(4): place(sfx, pop(.45, 1000 + i * 150), AT('c15', 'comentarios') - .3 + i * .25)
place(sfx, boom(1.0, 4), S('outro') + .1); place(sfx, stamp(1.0), S('outro') + .12)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.24, sg=.55, pg=.12)
print('ok', round(D, 2), 's')
