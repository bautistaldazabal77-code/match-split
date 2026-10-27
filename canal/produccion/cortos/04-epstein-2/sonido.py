"""Música, efectos y mezcla de "Pasó de verdad" · Epstein, parte 2. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c3'), ['Bb1', 'Bb2', 'F3', 'Db4'], 550, 1.0),
    (S('c3'), S('c7'), ['C2', 'C3', 'G3', 'Eb4'], 400, 1.0),
    (S('c7'), S('c10'), ['G1', 'G2', 'D3', 'Bb3'], 500, .9),
    (S('c10'), D, ['D2', 'D3', 'A3', 'F4', 'E4'], 600, 1.0),
])
music *= env(T, [(0, .9), (S('h2'), .7), (S('c5'), .5), (S('c6'), .9), (S('c7'), .6), (S('c12'), .8), (S('outro') + .1, 1.0), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('h1'), S('c1'), 84, .7)
latido(pulse, S('c5'), S('c6'), 60, .8)
latido(pulse, S('c12'), S('c13'), 76, .7)

sfx = np.zeros(N, F32)
def sello(t): place(sfx, stamp(1.0), t); place(sfx, thud(.5), t + .02)
def foto(t): place(sfx, click(.35), t); place(sfx, whoosh(.5, .14), t - .2)
place(sfx, jet(2.6, .35), .1)
foto(AT('h1', 'avión') - .1); place(sfx, thud(.6), S('h2')); place(sfx, (hp(noise(.3), 1500) * np.exp(-tt(.3) * 10) * .4).astype(F32), S('h2') + .3)
place(sfx, (hp(noise(1.0), 3000) * .08 * np.sin(np.pi * tt(1.0))).astype(F32), AT('c1', 'tráfico')); sello(AT('c1', 'resto'))
foto(S('c2') - .1); place(sfx, boom(.9, 4), S('c2') + .2)
for t0 in [S('c3'), AT('c3', 'vigilancia'), AT('c3', 'Seis días'), S('c4'), AT('c4', 'Nadie')]: place(sfx, tick(.35), t0); place(sfx, beep(880, .08, .1), t0)
for t0 in [S('c3') - .1, AT('c3', 'Seis días') - .1, S('c4') - .1, S('c5') - .1]: place(sfx, tick(.4), t0)
place(sfx, zumbido(S('c7') - S('c5'), 50, .22), S('c5') - .1)
for t0 in [AT('c5', 'rondas'), AT('c5', 'falsificado'), AT('c5', 'cámaras')]: place(sfx, beep(1200, .06, .12), t0)
ca = AT('c5', 'cámaras'); place(sfx, estatica(.7, .3), ca + .3); place(sfx, estatica(.3, .3), ca + 1.4)
place(sfx, beep(150, .5, .35), S('c6')); place(sfx, boom(.8, 4), S('c6') + .2)
place(sfx, thud(.5), AT('c7', 'suicidio')); place(sfx, thud(.4), AT('c7', 'dos mil veintitrés')); place(sfx, boom(.6, 3), AT('c7', 'cadena'))
sa = AT('c8', 'minuto') + .3; place(sfx, zumbido(S('c9') - S('c8'), 55, .15), S('c8') - .1); place(sfx, estatica(.7, .35), sa); place(sfx, beep(220, .3, .3), sa + .7)
sello(AT('c9', 'juicio')); foto(AT('c9', 'Solo') - .2); sello(AT('c9', 'veinte'))
tr = AT('c10', 'tres millones')
for i in range(12): place(sfx, tick(.18), tr + i * .09)
for i in range(22): place(sfx, (hp(noise(.15), 2000) * np.exp(-tt(.15) * 20) * .15).astype(F32), S('c10') + .2 + i * .1)
place(sfx, boom(.7, 3), S('c11')); place(sfx, thud(.5), AT('c11', 'no es'))
for i in range(8): place(sfx, thud(.22), S('c12') + i * .25)
place(sfx, boom(1.0, 6), S('c13'))
place(sfx, stamp(.6), S('outro') + .3)
mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.2, sg=.45, pg=.1)
print('ok', round(D, 2), 's')
