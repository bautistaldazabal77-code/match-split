"""Música, efectos y mezcla del video largo de Victor Ninov. Los momentos salen de timeline.json con las mismas cuentas que las escenas."""
import sys; sys.path.insert(0, '../cortos/comun')
from sfx import *
L = Linea(); S, E, AT, ATE, D = L.S, L.E, L.AT, L.ATE, L.D
N = int(D * SR) + SR
T = (np.arange(N) / SR).astype(F32)

# un acorde por capítulo; el epílogo vuelve al acorde del comienzo
music = secciones(N, [
    (0, S('cap1'), ['C2', 'C3', 'G3', 'Eb4', 'G4'], 650, 1.0),
    (S('cap1'), S('cap2'), ['Ab1', 'Ab2', 'Eb3', 'C4', 'G4'], 750, .85),
    (S('cap2'), S('cap3'), ['F1', 'F2', 'C3', 'Ab3', 'Eb4'], 800, .85),
    (S('cap3'), S('cap4'), ['Eb2', 'Eb3', 'Bb3', 'G4', 'D5'], 1100, .9),
    (S('cap4'), S('cap5'), ['C2', 'C3', 'G3', 'Eb4', 'D4'], 650, .85),
    (S('cap5'), S('cap6'), ['B1', 'B2', 'F3', 'D4', 'Ab3'], 600, 1.0),
    (S('cap6'), S('epi'), ['F1', 'F2', 'C3', 'Ab3', 'Db4'], 600, 1.0),
    (S('epi'), S('c142'), ['Db2', 'Db3', 'Ab3', 'F4', 'C4'], 750, .85),
    (S('c142'), D, ['C2', 'C3', 'G3', 'Eb4', 'G4'], 900, 1.0),
], XF=3.0)
pts = [(0, .7), (S('c1'), .55)]
for cap in ['titulo', 'cap1', 'cap2', 'cap3', 'cap4', 'cap5', 'cap6', 'epi']:     # sube en las placas y el título
    pts += [(S(cap) - .3, .6), (S(cap) + .4, 1.0), (E(cap) - .2, 1.0), (E(cap) + .6, .55)]
pts += [(S('outro'), .7), (S('outro') + 1, 1.0), (D - 1.5, .8), (D, 0)]
music *= env(T, sorted(pts))
pulse = np.zeros(N, F32)
for a, b, bpm in [('c9', 'c12', 80), ('c90', 'cap5', 96), ('c100', 'c103', 84), ('c114', 'c119', 76), ('c126', 'c130', 88)]:
    latido(pulse, S(a), S(b), bpm, .7)

sfx = np.zeros(N, F32)
def placa(cap):                                   # entrada de cada capítulo
    place(sfx, whoosh(1.6, .35), S(cap) - .6); place(sfx, boom(.7, 4), S(cap) + .3)
for cap in ['cap1', 'cap2', 'cap3', 'cap4', 'cap5', 'cap6', 'epi']: placa(cap)
# ---------- apertura ----------
for z in range(1, 119, 3): place(sfx, tick(.1), .4 + z * .016)
place(sfx, chime(.28, 990), S('c2') + .1); place(sfx, chime(.24, 1320), S('c2') + .25)
place(sfx, zumbido(E('c4') - S('c4') + .5, 55, .3), S('c4') - .2)
for i in range(3): place(sfx, whoosh(.5, .2), S('c5') + i * .45); place(sfx, thud(.35), S('c5') + i * .45 + .3)
place(sfx, beep(1500, .06, .1), AT('c7', 'cazadores'))
for i in range(5): place(sfx, beep(1500 + i * 110, .05, .1), AT('c7', 'cazadores') + .3 * (i + 1))
place(sfx, chime(.2, 660), S('c8'))
for k, d in [(116, 0), (118, .45)]:
    for j in range(3): place(sfx, (hp(noise(.03), 3000) * .3).astype(F32), AT('c10', 'nunca') + d - .3 + j * .1)
    place(sfx, beep(220, .25, .25), AT('c10', 'nunca') + d)
teclas(sfx, S('c11'), S('c11') + 1.5, .18)
for i in range(3): place(sfx, beep(196, .2, .22), AT('c11', 'datos originales') + i * .25)
place(sfx, whoosh(1.0, .25), AT('c12', 'dos casillas'))
place(sfx, (hp(noise(.6), 2000) * np.exp(-tt(.6) * 8) * .45).astype(F32), S('c13') + .2); place(sfx, thud(.8), S('c13') + 1.1)
place(sfx, boom(1.0, 5), S('titulo') + .1); place(sfx, stamp(.8), S('titulo') + .5)
# ---------- capítulo I ----------
for z in range(1, 93, 4): place(sfx, tick(.08), S('c14') + z * .012)
place(sfx, chime(.18, 1320), AT('c15', 'hidrógeno')); place(sfx, chime(.18, 440), AT('c15', 'uranio'))
for z in range(93, 119, 2): place(sfx, tick(.12), S('c16') + (z - 93) * .04)
for i in range(9): place(sfx, whoosh(.5, .12), S('c18') + .2 + i * .55)
fu = AT('c18', 'se fundan'); place(sfx, whoosh(.5, .3), fu - .45); place(sfx, boom(.9, 3), fu + .1); place(sfx, sizzle(.9, .3), fu + .1)
place(sfx, stamp(.5), AT('c19', 'se suma')); place(sfx, chime(.25, 990), AT('c20', 'define'))
place(sfx, rumble(E('c22') - S('c21'), .3), S('c21')); place(sfx, (hp(noise(.8), 1500) * np.exp(-tt(.8) * 5) * .5).astype(F32), AT('c22', 'se desarman'))
al = AT('c23', 'partícula alfa'); paso = max(.35, (AT('c24', 'huella digital') - al) / 6)
for i in range(7): place(sfx, pop(.35, 1600 - i * 140), al + (i - 1) * paso if i else S('c23'))
for i in range(5): place(sfx, beep(1760, .08, .18), AT('c26', 'posición') - .2 + i * .35)
for w in ['c28', 'c29', 'c30']: place(sfx, ping(.18, 1200), S(w))
for w in ['ciento diez', 'ciento once', 'ciento doce']: place(sfx, pop(.35, 900), AT('c31', w))
place(sfx, zumbido(4, 82, .12), S('c33'))
place(sfx, chime(.18, 660), S('c34')); teclas(sfx, S('c35'), S('c35') + 3, .15)
place(sfx, whoosh(2.0, .3), S('c37'))
# ---------- capítulo II ----------
place(sfx, beep(330, .3, .15), AT('c42', 'uno o dos'))
teclas(sfx, AT('c43', 'cálculo'), AT('c43', 'cálculo') + 2.6, .12, .1)        # tiza (suena parecido)
place(sfx, chime(.25, 1175), AT('c44', 'mucho más alta'))
place(sfx, stamp(.5), S('c45')); place(sfx, stamp(.5), S('c46')); h = S('c47') + .05
place(sfx, whoosh(.5, .3), h - .5); place(sfx, boom(.9, 3), h); place(sfx, chime(.3, 1320), h + .2)
for i in range(5): place(sfx, pop(.25, 700 + (i % 2) * 200), S('c49') + i * .12)
place(sfx, zumbido(E('c52') - S('c50') + .4, 55, .3), S('c50') - .2); place(sfx, chime(.2, 880), AT('c51', 'separador de gas'))
for i in range(11): place(sfx, tick(.25), S('c53') + .5 + i * (S('c55') + .8 - S('c53') - .5) / 11)
place(sfx, zumbido(E('c55') - S('c54') + .4, 55, .3), S('c54') - .2)
teclas(sfx, S('c56') - .1, S('c56') + 1.4, .22, .04)
for k in range(3): place(sfx, beep(1760, .1, .22), S('c57') + k * .3)
cl = AT('c58', 'se clavaba'); place(sfx, thud(.6), cl - .2)
for i in range(6): place(sfx, pop(.35, 1600 - i * 140), AT('c58', 'seis') + i * .32)
place(sfx, chime(.25, 990), AT('c60', 'ciento dieciséis'))
for i in range(3): place(sfx, chime(.18, 880 + i * 220), S('c61') + .3 + i * .3)
# ---------- capítulo III ----------
place(sfx, (lp(noise(S('c67') - S('c63')), 500) * .25 * np.sin(np.pi * tt(S('c67') - S('c63')) / (S('c67') - S('c63')))).astype(F32), S('c63'))   # mar
place(sfx, whoosh(2.4, .3), S('c66')); place(sfx, chime(.3, 1175), S('c66') + 2.3)
for i in range(4): place(sfx, whoosh(.5, .22), S('c67') + i * .5); place(sfx, thud(.35), S('c67') + i * .5 + .3)
teclas(sfx, S('c69'), E('c69') - .2, .12, .09)
for z in range(12): place(sfx, tick(.18), AT('c71', 'doce elementos') - .3 + z * .1)
place(sfx, thud(.5), S('c72'))
for i in range(8): place(sfx, ping(.12, 1300 + i * 40), S('c73') + .8 + i * .2)
# ---------- capítulo IV ----------
for w in ['c77', 'c79', 'c80']: place(sfx, ping(.18, 1200), S(w))
for t0 in [S('c78'), S('c79') + .9, S('c80') + .9]: place(sfx, beep(330, .18, .3), t0)
place(sfx, beep(220, .35, .35), S('c84') + .3)
place(sfx, (hp(noise(.3), 1500) * np.exp(-tt(.3) * 10) * .4).astype(F32), S('c85')); place(sfx, click(.6), S('c86')); place(sfx, click(.6), S('c86') + .15)
teclas(sfx, S('c87'), S('c88') - .2, .1, .12)
teclas(sfx, S('c88'), AT('c89', 'nueva cadena'), .2, .07); place(sfx, beep(1980, .14, .25), AT('c89', 'nueva cadena'))
teclas(sfx, S('c92'), S('c93'), .2, .08)
place(sfx, beep(150, .5, .4), S('c93') + .05); place(sfx, boom(1.0, 4), S('c93') + .1); place(sfx, stamp(1.2), S('c93') + .1)
# ---------- capítulo V ----------
place(sfx, thud(.6), S('c95'))
place(sfx, beep(880, .3, .22), AT('c96', 'el único'))
teclas(sfx, S('c99') - .3, S('c100') - .1, .18, .05)
for i in range(3): place(sfx, beep(196, .3, .35), S('c100') + .5 + i * .15)
place(sfx, boom(1.0, 4), S('c102')); place(sfx, stamp(1.2), S('c102'))
place(sfx, chime(.2, 330), S('c103') + .2); place(sfx, chime(.2, 330), S('c104'))
place(sfx, stamp(1.0), AT('c105', 'retiró'))
place(sfx, (hp(noise(1.0), 3000) * .07).astype(F32), AT('c107', 'su nombre'))
place(sfx, thud(.5), AT('c108', 'un año después'))
place(sfx, boom(.8, 4), AT('c111', 'de dónde'))
# ---------- capítulo VI ----------
place(sfx, whoosh(1.0, .25), S('c112')); place(sfx, whoosh(1.0, .25), AT('c113', 'noviembre'))
place(sfx, (hp(noise(1.2), 3000) * .08 * np.sin(np.pi * tt(1.2) / 1.2)).astype(F32), AT('c115', 'clara'))     # resaltador
place(sfx, (hp(noise(.8), 3000) * .08 * np.sin(np.pi * tt(.8) / .8)).astype(F32), AT('c115', 'fabricados'))
place(sfx, thud(.8), S('c116'))
place(sfx, boom(.8, 3), AT('c118', 'despidió')); place(sfx, stamp(1.2), AT('c118', 'despidió'))
place(sfx, chime(.18, 523), S('c120'))
teclas(sfx, S('c123'), E('c123') - .1, .12, .09)
for i in range(3): place(sfx, pop(.3, 900), S('c125') + i * .2)
for i in range(34): place(sfx, tick(.15), S('c126') - .1 + i * .03)
for w in ['ciento diez', 'del ciento doce']: place(sfx, beep(196, .3, .35), AT('c127', w))
place(sfx, stamp(.8), S('c128')); place(sfx, thud(.6), S('c129'))
for i in range(3): place(sfx, chime(.18, 660 + i * 220), S('c130') + i * .15)
# ---------- epílogo ----------
place(sfx, chime(.3, 880), S('c132'))
place(sfx, ping(.18, 1200), AT('c133', 'Dubna')); place(sfx, ping(.18, 1100), AT('c133', 'Livermore')); place(sfx, whoosh(1.4, .25), AT('c133', 'Livermore'))
place(sfx, pop(.3, 1000), S('c134')); place(sfx, pop(.3, 1200), S('c135'))
place(sfx, chime(.3, 990), AT('c136', 'livermorio')); place(sfx, chime(.3, 1320), AT('c136', 'oganesón'))
for tz in [S('c139') + .6, AT('c139', 'cada coautor'), S('c140')]: place(sfx, click(.6), tz)
for tz in [AT('c143', 'prestigioso') + .5, AT('c143', 'revista') + .5]: place(sfx, (hp(noise(.3), 2500) * np.exp(-tt(.3) * 8) * .3).astype(F32), tz)
for i in range(3): place(sfx, chime(.18, 880 + i * 110), AT('c144', 'volver a verlo') + i * .2)
for z in range(0, 118, 4): place(sfx, tick(.1), S('c146') + z * .008)
place(sfx, boom(1.0, 6), AT('c146', 'sin él') + .3)
place(sfx, stamp(.7), S('outro') + 1.0)

mezclar('audio/narracion.wav', music, sfx, pulse, D, mg=.2, sg=.45, pg=.1)
print('ok', round(D, 2), 's')
