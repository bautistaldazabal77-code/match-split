"""Música, efectos y mezcla del corto del subte. Los momentos salen de timeline.json con las mismas
cuentas que web/escenas.js (S, E, AT, ATE), así cada efecto cae sobre su animación."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

# ---------- música: re menor oscuro; más claro en "la ventaja"; casi nada antes del giro ----------
music = secciones(N, [
    (0, S('c1'), ['D1', 'D2', 'A2', 'F3', 'A3'], 650, 1.0),
    (S('c1'), S('c3'), ['D1', 'D2', 'A2', 'F3', 'D4'], 750, 0.8),
    (S('c3'), S('c6'), ['Bb1', 'Bb2', 'F3', 'D4', 'A3'], 700, 0.95),
    (S('c6'), S('c9'), ['D1', 'D2', 'A2', 'F3', 'A3'], 650, 1.0),
    (S('c9'), S('c13'), ['F1', 'F2', 'C3', 'A3', 'E4'], 850, 0.8),
    (S('c13'), S('c14'), ['D1', 'D2', 'A2', 'F3', 'A3'], 650, 0.9),
    (S('c14'), S('c18'), ['F1', 'F2', 'C3', 'A3', 'D4'], 800, 0.85),
    (S('c18'), D, ['D1', 'D2', 'A2', 'F3', 'A3'], 550, 0.9),
])
music *= env(T, [(0, .9), (S('h2'), .7), (S('c1'), .55), (S('c3'), .6), (E('c3'), 1.0), (S('c5'), .6), (S('c7'), .7), (S('c8'), 1.0), (S('c9'), .55),
                 (S('c14'), .6), (E('c17'), .7), (S('c18') - .3, .7), (S('c18'), .05), (S('c19'), .05), (E('c19'), .6), (S('outro') + .1, 1.1), (D - .8, .6), (D, 0)])

# ---------- latidos y pulsos ----------
pulse = np.zeros(N, F32)
latido(pulse, E('c3') - .2, S('c5'), 96, .8)                          # la alerta
latido(pulse, AT('c13', 'Salvo'), S('c14'), 90, .6)                    # impacto directo
latido(pulse, S('c18') + .2, S('outro') + .2, 78, 1.0)                 # el mensaje

# ---------- efectos ----------
sfx = np.zeros(N, F32)
FL = .12
place(sfx, sizzle(1.4, .6), FL); place(sfx, boom(1.0, 5.0), FL + .25); place(sfx, rumble(3.0, .6), FL + .2)
PAN = AT('h1', 'estás') - .1
place(sfx, whoosh(1.8, .5), PAN)
place(sfx, chime(.18, 660), AT('h1', 'mejores'))
place(sfx, thud(.9), AT('h2', 'no')); place(sfx, boom(.35, 3), AT('h2', 'casi'))
# Tomás y la Línea A
place(sfx, whoosh(.8, .35), S('c1') - .3)
for w in ['Tomás', 'veintiocho', 'técnico', 'línea A']: place(sfx, click(.8), AT('c1', w))
place(sfx, whoosh(.6, .3), AT('c1', 'la primera') - .3); place(sfx, stamp(.9), AT('c1', 'mil'))
place(sfx, subte(S('c5') + 1.5 - S('c1'), .35), S('c1'))
# 8:12, el reloj
for k in range(7): place(sfx, tick(.5), S('c2') + k * .45)
place(sfx, thud(.6), AT('c2', 'Hora'))
# los celulares y la alerta
SU = AT('c3', 'suenan')
for k in range(5): place(sfx, vibra(.6, .5), SU + k * .7)
place(sfx, alerta(E('c3') + 1.5 - SU, .45), SU)
place(sfx, alerta(2.2, .18), E('c3') + 1.5)
place(sfx, whoosh(.5, .3), AT('c4', 'Alerta') - .3)
# estación Perú
place(sfx, frenos(1.7, .4), AT('c5', 'frena') - .1)
place(sfx, puertas(.55), AT('c5', 'puertas'))
place(sfx, multitud(S('c6') + 1.5 - AT('c5', 'la gente'), .35), AT('c5', 'la gente'))
pasos(sfx, AT('c5', 'correr'), S('c7'), .35, .14)
place(sfx, thud(1.0), AT('c6', 'Baja')); place(sfx, whoosh(.8, .3), AT('c6', 'Baja') - .3)
place(sfx, whoosh(1.0, .3), AT('c7', 'Sabe') - .2)
# el destello y la onda expansiva
DE, ON = AT('c7', 'destello'), AT('c7', 'onda')
place(sfx, sizzle(1.2, .6), DE); place(sfx, whoosh(1.3, .3), DE - 1.3)
for k in range(int((S('c8') - DE) / .5)): place(sfx, tick(.35), DE + k * .5)     # cronómetro
place(sfx, rumble(S('c8') + .3 - ON, .9), ON)
LL = AT('c8', 'llega'); place(sfx, boom(1.2, 5), LL - .05); place(sfx, thud(1.2), LL)
place(sfx, vidrios(2.6, .9), AT('c8', 'convierte'))
place(sfx, whoosh(1.0, .25), S('c9') - .4)
# la tierra como escudo: el contador Geiger cuenta cada vez menos
RA, NU, MI = AT('c10', 'radiación'), AT('c10', 'cada nueve'), ATE('c10', 'mitad')
geiger(sfx, RA, S('c12'), lambda t: 28 / 2 ** max(0, (t - NU) / ((MI + .3 - NU) / 7)) if t > NU else 28, .55)
place(sfx, chime(.25, 880), AT('c11', 'mil'))
# Kiev: bajada
place(sfx, whoosh(2.0, .3), AT('c12', 'Kiev') - .2)
t0 = AT('c12', 'Kiev'); place(sfx, (np.sin(2 * np.pi * np.cumsum(220 * np.exp(-tt(2.4) * .8)) / SR) * np.exp(-tt(2.4) * 1.2) * .25).astype(F32), t0)
place(sfx, thud(.9), AT('c12', 'Acá')); place(sfx, beep(520, .12, .25), AT('c12', 'Acá'))
# lluvia radiactiva, muralla, impacto directo
place(sfx, (hp(noise(S('c14') - S('c13')), 5000) * .05).astype(F32), S('c13'))
geiger(sfx, S('c13'), S('c14'), lambda t: 8, .35)
place(sfx, thud(1.0), AT('c13', 'muralla')); place(sfx, chime(.15, 660), AT('c13', 'muralla'))
SV = AT('c13', 'Salvo')
for k in range(4): place(sfx, beep(880, .12, .3), SV + k * .25)
place(sfx, boom(.6, 3.5), AT('c13', 'encima'))
# el plan
place(sfx, stamp(.8), AT('c14', 'plan'))
for w in [('c15', 'Lejos'), ('c16', 'En el medio'), ('c16', 'Agua'), ('c16', 'quedarse')]:
    x = AT(*w) + .2; place(sfx, click(.9), x); place(sfx, beep(1320, .08, .2), x + .02)
place(sfx, whoosh(.9, .4), AT('c15', 'bocas') - .7)
place(sfx, stamp(1.2), AT('c17', 'resuelto')); place(sfx, chime(.2, 990), AT('c17', 'resuelto'))
# 8:20: el mensaje
place(sfx, thud(.8), AT('c18', 'ocho y veinte'))
MS = AT('c18', 'mensaje'); place(sfx, vibra(.8, .6), MS); place(sfx, chime(.25, 1046), MS + .05)
place(sfx, pop(.5, 1100), AT('c19', 'Estoy')); place(sfx, pop(.55, 900), AT('c19', 'Venite'))
place(sfx, vibra(.5, .4), AT('c19', 'Venite'))
# parte 2
place(sfx, boom(1.1, 4), S('outro') + .1); place(sfx, stamp(1.0), S('outro') + .12)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.24, sg=.55, pg=.14)
print('ok', round(D, 2), 's')
