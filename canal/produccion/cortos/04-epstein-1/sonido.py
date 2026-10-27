"""Música, efectos y mezcla de "Pasó de verdad" · Epstein, parte 1. Los momentos salen de timeline.json con las mismas cuentas que web/escenas.js."""
import sys; sys.path.insert(0, '../comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

music = secciones(N, [
    (0, S('c2'), ['D2', 'D3', 'A3', 'F4'], 500, 1.0),
    (S('c2'), S('c6'), ['Bb1', 'Bb2', 'F3', 'D4'], 550, .85),
    (S('c6'), S('c9'), ['G1', 'G2', 'D3', 'Bb3'], 550, .85),
    (S('c9'), S('c12'), ['A1', 'A2', 'E3', 'C4'], 450, .9),
    (S('c12'), D, ['D2', 'D3', 'A3', 'F4', 'E4'], 600, 1.0),
])
music *= env(T, [(0, .9), (S('c1'), .6), (S('c12') - .3, .6), (S('c12'), 1.0), (S('c14'), .8), (S('outro') + .1, 1.0), (D - .8, .6), (D, 0)])
pulse = np.zeros(N, F32)
latido(pulse, S('c8'), S('c10'), 84, .7)
latido(pulse, S('c14'), D - .5, 66, .8)

sfx = np.zeros(N, F32)
def sello(t): place(sfx, stamp(1.0), t); place(sfx, thud(.5), t + .02)
def foto(t): place(sfx, click(.35), t); place(sfx, whoosh(.5, .14), t - .2)
def contador(t): place(sfx, boom(.6, 2.5), t); place(sfx, beep(110, .25, .3), t); place(sfx, tick(.3), t + .05)
place(sfx, boom(.9, 4), .05); foto(.1)
sello(AT('h2', 'consecuencias'))
place(sfx, estatica(.2, .12), S('c1')); place(sfx, beep(1200, .06, .12), S('c1') + .1)
for t0 in [AT('c3', 'Nadie'), AT('c4', 'No hubo'), AT('c5', 'nunca'), AT('c6', 'no avanza'), AT('c7', 'desaparecieron'), AT('c9', 'no se lo dicen'), AT('c11', 'doce horas')]: contador(t0)
for t0 in [AT('c3', 'Nadie'), AT('c4', 'No hubo'), AT('c5', 'veinte'), AT('c5', 'nunca'), AT('c6', 'no avanza'), AT('c7', 'desaparecieron') + .2, AT('c9', 'no se lo dicen')]: sello(t0)
for t0 in [S('c2'), S('c4'), S('c8')]: foto(t0 - .1)
for t0 in [S('c2'), S('c4'), AT('c4', 'ochenta y uno'), S('c5'), S('c6'), S('c7'), S('c8'), S('c9'), S('c10')]: place(sfx, tick(.4), t0 - .1)   # el año cambia
mi = AT('c5', 'cuatrocientos'); place(sfx, (hp(noise(1.0), 600) * np.exp(-tt(1.0) * 3) * .35).astype(F32), mi); place(sfx, boom(.8, 3), mi + .2)
for i in range(10): place(sfx, tick(.18), mi + i * .1)
place(sfx, thud(.4), AT('c5', 'Su socio')); place(sfx, thud(.4), AT('c5', 'A Epstein'))
teclas(sfx, S('c6'), S('c6') + 1.6, .12, .08)
for i in range(6): place(sfx, (hp(noise(.25), 2500) * np.exp(-tt(.25) * 6) * .22).astype(F32), AT('c7', 'desaparecieron') - .6 + i * .08)
place(sfx, chime(.18, 330), AT('c9', 'treinta')); place(sfx, thud(.5), AT('c9', 'fiscal federal'))
place(sfx, (hp(noise(1.0), 3000) * .08 * np.sin(np.pi * tt(1.0))).astype(F32), AT('c9', 'acuerdo secreto'))
for i in range(18): place(sfx, tick(.15), S('c10') + .2 + i * .05)
place(sfx, thud(.5), AT('c10', 'trece'))
for i in range(7): place(sfx, thud(.22), S('c11') + .2 + i * .15)
place(sfx, boom(1.0, 5), S('c12')); place(sfx, estatica(.3, .2), S('c12'))
place(sfx, whoosh(1.0, .25), S('c13')); place(sfx, thud(.6), S('c13') + .4)
place(sfx, zumbido(D - S('c14'), 50, .2), S('c14') - .1)
place(sfx, estatica(.4, .3), S('c14') + 1.4); place(sfx, estatica(.3, .3), S('outro') + .4)
mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.2, sg=.45, pg=.1)
print('ok', round(D, 2), 's')
