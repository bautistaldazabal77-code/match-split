"""Música, efectos y mezcla del video largo de Jeffrey Epstein. Los momentos salen de timeline.json con las mismas cuentas que las escenas."""
import sys; sys.path.insert(0, '../cortos/comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

# acordes oscuros por capítulo (caso real: menor, graves, poco brillo)
music = secciones(N, [
    (0, S('cap1'), ['D2', 'D3', 'A3', 'F4'], 500, 1.0),
    (S('cap1'), S('cap2'), ['Bb1', 'Bb2', 'F3', 'D4'], 550, .8),
    (S('cap2'), S('cap3'), ['G1', 'G2', 'D3', 'Bb3'], 600, .8),
    (S('cap3'), S('cap4'), ['A1', 'A2', 'E3', 'C4'], 450, .9),
    (S('cap4'), S('cap5'), ['D2', 'D3', 'A3', 'F4'], 500, .85),
    (S('cap5'), S('cap6'), ['F1', 'F2', 'C3', 'Ab3'], 550, .85),
    (S('cap6'), S('cap7'), ['Bb1', 'Bb2', 'F3', 'Db4'], 600, .9),
    (S('cap7'), S('cap8'), ['C2', 'C3', 'G3', 'Eb4'], 400, 1.0),
    (S('cap8'), S('epi'), ['G1', 'G2', 'D3', 'Bb3'], 550, .9),
    (S('epi'), D, ['D2', 'D3', 'A3', 'F4', 'E4'], 650, .9),
], XF=3.0)
pts = [(0, .6), (S('c1'), .5)]
for cap in ['titulo', 'cap1', 'cap2', 'cap3', 'cap4', 'cap5', 'cap6', 'cap7', 'cap8', 'epi']:     # sube en las placas y el título
    pts += [(S(cap) - .3, .55), (S(cap) + .4, 1.0), (E(cap) - .2, 1.0), (E(cap) + .6, .5)]
pts += [(S('outro'), .7), (S('outro') + 1, 1.0), (D - 1.5, .8), (D, 0)]
music *= env(T, sorted(pts))
pulse = np.zeros(N, F32)
for a, b, bpm in [('c1', 'c6', 66), ('c38', 'c43', 84), ('c81', 'c87', 72), ('c120', 'c124', 88), ('c134', 'c138', 60), ('c141', 'c144', 70), ('c151', 'c152', 76)]:
    latido(pulse, S(a), S(b), bpm, .7)

sfx = np.zeros(N, F32)
def placa(cap):                                   # entrada de cada capítulo (con el glitch del título)
    place(sfx, whoosh(1.6, .35), S(cap) - .6); place(sfx, boom(.7, 4), S(cap) + .3)
    place(sfx, estatica(.25, .12), S(cap) + .6)
for cap in ['cap1', 'cap2', 'cap3', 'cap4', 'cap5', 'cap6', 'cap7', 'cap8', 'epi']: placa(cap)
def sello(t): place(sfx, stamp(1.0), t); place(sfx, thud(.5), t + .02)
def foto(t): place(sfx, click(.35), t); place(sfx, whoosh(.5, .12), t - .2)      # obturador suave al entrar una foto
def contador(t): place(sfx, boom(.6, 2.5), t); place(sfx, beep(110, .25, .3), t); place(sfx, tick(.3), t + .05)
# ---------- apertura: la cámara del pasillo ----------
place(sfx, zumbido(S('c6') - .5, 50, .18), 0)
for t0 in [S('c2'), S('c3'), S('c4')]: place(sfx, beep(1200, .06, .12), t0)
c4 = S('c4'); place(sfx, estatica(.7, .3), c4 + .2); place(sfx, estatica(.3, .3), c4 + 1.3)
place(sfx, beep(150, .5, .35), S('c5')); place(sfx, boom(.8, 4), S('c5') + .3)
foto(S('c6') - .1); place(sfx, chime(.2, 440), S('c7'))
for t0 in [S('c8'), S('c9')]: place(sfx, thud(.5), t0)
for t0 in [S('c11'), S('c12'), S('c13')]: place(sfx, thud(.4), t0); place(sfx, whoosh(.6, .15), t0 + .2)
place(sfx, boom(1.0, 5), S('titulo') + .1); place(sfx, estatica(.6, .25), S('titulo') + .1); place(sfx, stamp(.8), S('titulo') + .6)
# contador de impunidad
for t0 in [AT('c23', 'Nadie hizo nada'), S('c30'), S('c43'), S('c71'), ATE('c80', 'sacaran'), AT('c94', 'violó la ley'), AT('c97', 'doce horas')]: contador(t0)
# sellos
for t0 in [S('c30'), S('c37'), S('c41') + .3, S('c43'), S('c71'), S('c93') + .2, S('c108'), S('c113'), S('c123') + .3, AT('c125', 'renunció'), AT('c126', 'negó'),
           AT('c145', 'juicio'), AT('c160', 'quitó')]: sello(t0)
# fotos (entradas principales)
for t0 in [S('c14'), S('c17'), S('c21'), S('c24'), S('c31'), S('c49'), S('c55'), S('c56'), S('c58'), S('c72'), S('c82'), S('c83'), S('c89'), S('c98'),
           S('c109'), S('c111'), S('c127'), S('c146'), S('c161')]: foto(t0 - .1)
# ---------- capítulo 1 ----------
teclas(sfx, S('c17') + .2, S('c21') - .4, .12, .08)                                 # la ficha se escribe
place(sfx, rumble(S('c40') - S('c39'), .3), S('c39'))
mi = AT('c40', 'cuatrocientos'); place(sfx, (hp(noise(1.2), 600) * np.exp(-tt(1.2) * 3) * .35).astype(F32), mi); place(sfx, boom(.9, 3), mi + .2)
for i in range(12): place(sfx, tick(.18), mi + i * .1)
# ---------- capítulo 2 ----------
for i in range(7): place(sfx, thud(.25), S('c44') + i * .3)                       # chinches del tablero
place(sfx, (hp(noise(1.0), 3000) * .08 * np.sin(np.pi * tt(1.0))).astype(F32), S('c48'))   # resaltador
for i in range(6): place(sfx, chime(.12, 660 + i * 110), S('c51') + i * .5)
cu = AT('c50', 'cuarenta'); place(sfx, boom(.7, 3), cu)
teclas(sfx, S('c53'), E('c54'), .14, .09)                                          # la cita se escribe
# ---------- capítulo 3 ----------
for i in range(18): place(sfx, pop(.15, 600 + (i % 6) * 60), S('c62') + .2 + i * .1 if i < 6 else S('c66') + (i - 6) * .12)    # siluetas
place(sfx, boom(.8, 3), S('c68'))
for i in range(5): place(sfx, beep(1500, .05, .12), AT('c72', 'cámaras') + i * .15)
for i in range(6): place(sfx, (hp(noise(.3), 2500) * np.exp(-tt(.3) * 6) * .25).astype(F32), S('c79') + i * .12)
# ---------- capítulo 4 ----------
place(sfx, ring(1.8, .12), AT('c81', 'llamó') - .2)
place(sfx, thud(.5), S('c86'))
place(sfx, thud(.6), S('c87')); place(sfx, chime(.18, 330), AT('c88', 'treinta')); place(sfx, chime(.18, 330), AT('c88', 'cincuenta'))
for i in range(18): place(sfx, tick(.15), S('c95') + .2 + i * .05)
place(sfx, thud(.5), S('c96'))
for i in range(4): place(sfx, whoosh(.4, .15), AT('c99', 'su avión') + i * .6)
# ---------- capítulo 5 ----------
place(sfx, jet(2.4, .25), S('c101'))
teclas(sfx, S('c103'), S('c104'), .14, .08)
for w in ['Bill Clinton', 'Donald Trump']: place(sfx, (hp(noise(.8), 3000) * .08 * np.sin(np.pi * tt(.8) / .8)).astype(F32), AT('c104', w))
place(sfx, boom(.7, 3), S('c105'))
place(sfx, chime(.25, 440), AT('c109', 'Virginia'))
# ---------- capítulo 6 ----------
for i in range(10): place(sfx, tick(.2), S('c114') + .2 + i * .25)
teclas(sfx, S('c115'), S('c116'), .1, .1)
for i in range(16): place(sfx, pop(.1, 700 + (i % 4) * 80), S('c116') + i * .1)
for i in range(7): place(sfx, whoosh(.4, .12), S('c119') + .2 + i * .15)
place(sfx, jet(2.4, .3), S('c120') + .5); place(sfx, thud(.6), S('c121')); place(sfx, (hp(noise(.3), 1500) * np.exp(-tt(.3) * 10) * .4).astype(F32), S('c121') + .3)
place(sfx, (lp(noise(1.6), 300) * np.exp(-tt(1.6) * 2) * .3).astype(F32), S('c124') + .1)   # la puerta de la caja fuerte
for w in ['discos', 'setenta mil', 'cuarenta y ocho', 'pasaporte']: place(sfx, thud(.35), AT('c124', w))
# ---------- capítulo 7 ----------
for t0 in [S(f'c{i}') for i in range(128, 134)]: place(sfx, tick(.3), t0); place(sfx, beep(880, .08, .1), t0)
place(sfx, zumbido(S('c138') - S('c134'), 50, .2), S('c134'))
for t0 in [S('c134') + .4, S('c135'), S('c136')]: place(sfx, beep(1200, .06, .12), t0)
ca = S('c136'); place(sfx, estatica(.8, .3), ca + .3); place(sfx, estatica(.4, .3), ca + 1.6)
place(sfx, beep(150, .5, .35), S('c137')); place(sfx, boom(.8, 4), S('c137') + .2)
place(sfx, thud(.5), S('c138')); place(sfx, chime(.2, 330), AT('c139', 'estrangulación'))
place(sfx, thud(.5), AT('c140', 'confirmó')); place(sfx, boom(.6, 3), AT('c140', 'cadena'))
sa = AT('c142', 'minuto') + .3; place(sfx, estatica(.7, .35), sa); place(sfx, beep(220, .3, .3), sa + .7)
place(sfx, boom(.9, 4), S('c144'))
# ---------- capítulo 8 ----------
for i, t0 in enumerate([S('c147'), S('c148'), S('c149')]): place(sfx, thud(.5), t0); place(sfx, beep(330 - i * 40, .2, .2), t0)
for i in range(8): place(sfx, thud(.22), AT('c151', 'dónde') - .3 + i * .12)
place(sfx, (hp(noise(1.0), 3000) * .08 * np.sin(np.pi * tt(1.0))).astype(F32), AT('c152', 'no existía'))
place(sfx, multitud(AT('c153', 'Congreso') - S('c153'), .18), S('c153'))
place(sfx, boom(.8, 3), AT('c153', 'unanimidad'))
for w in ['tres millones', 'dos mil', 'ciento ochenta']:
    t0 = AT('c154', w)
    for i in range(10): place(sfx, tick(.18), t0 + i * .09)
for i in range(26): place(sfx, (hp(noise(.15), 2000) * np.exp(-tt(.15) * 20) * .15).astype(F32), S('c154') + .2 + i * .1)
place(sfx, boom(.7, 3), S('c156'))
place(sfx, chime(.22, 330), S('c158')); place(sfx, chime(.18, 294), S('c159'))
# ---------- epílogo ----------
place(sfx, thud(.5), AT('c162', 'monstruo'))
for i in range(7): place(sfx, beep(196 - i * 8, .2, .12), AT('c164', 'de a poco') + i * .5)
for t0 in [S('c165'), S('c166'), S('c167')]: place(sfx, thud(.5), t0 + .3); place(sfx, whoosh(.5, .12), t0)
for i in range(11): place(sfx, thud(.15), S('c169') + i * .06)
place(sfx, boom(.7, 4), AT('c169', 'callar'))
place(sfx, boom(1.0, 6), S('c171'))
place(sfx, stamp(.7), S('outro') + 1.0)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.18, sg=.42, pg=.1)
print('ok', round(D, 2), 's')
