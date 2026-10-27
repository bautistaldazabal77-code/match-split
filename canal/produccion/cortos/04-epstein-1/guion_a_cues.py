"""Guion del reel "Pasó de verdad" · Epstein, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). La pronunciación de los nombres en inglés sale de ../../03-epstein/guion_a_cues.py (SAY)."""
import json, re
src = open('../../03-epstein/guion_a_cues.py').read()
SAY = eval(re.search(r'SAY = (\{.*?\})\n', src, re.S).group(1))
claves = sorted(SAY, key=len, reverse=True)
def decir(f):
    out, i = '', 0
    while i < len(f):
        for k in claves:
            if f.startswith(k, i) and (i == 0 or not f[i - 1].isalpha()):
                out += SAY[k]; i += len(k); break
        else: out += f[i]; i += 1
    return out
G = [
 ('lead', None, .3),
 ('h1', "Jeffrey Epstein cruzó un límite tras otro.", .35),
 ('h2', "Y siete veces salió sin consecuencias.", .45),
 ('c1', "Vamos a contarlas.", .6),
 ('c2', "Mil novecientos setenta y cuatro. Sin título universitario, lo contratan como profesor de matemáticas en una de las escuelas más caras de Manhattan.", .35),
 ('c3', "Según exalumnos, prestaba una atención incómoda a las alumnas. Nadie hizo nada.", .6),
 ('c4', "Pasa a Wall Street, al banco Bear Stearns. En mil novecientos ochenta y uno se va en medio de una investigación interna. No hubo cargos.", .6),
 ('c5', "Se asocia con Towers Financial, una estafa piramidal de cuatrocientos sesenta millones de dólares. Su socio recibe veinte años de cárcel. A Epstein nunca lo acusan.", .6),
 ('c6', "En mil novecientos noventa y seis, la artista Maria Farmer lo denuncia ante la policía y el FBI. La denuncia no avanza.", .6),
 ('c7', "En dos mil tres, la revista Vanity Fair prepara un perfil sobre él. Según la periodista, Epstein presionó a la revista y los testimonios de las víctimas desaparecieron.", .6),
 ('c8', "En dos mil cinco, en Palm Beach, la policía encuentra decenas de chicas con historias parecidas. Muchas eran menores.", .45),
 ('c9', "El FBI identifica a más de treinta víctimas. Pero el fiscal federal firma con sus abogados un acuerdo secreto: no habrá juicio federal. Y a las víctimas no se lo dicen.", .6),
 ('c10', "La condena: dieciocho meses en una cárcel del condado. Cumple trece.", .35),
 ('c11', "Y puede salir a su oficina doce horas por día, seis días por semana.", .7),
 ('c12', "Siete veces. Siete veces sin consecuencias.", .6),
 ('c13', "Once años después, todo volvió.", .5),
 ('c14', "En la parte dos: la noche en que fallaron las cámaras.", .3),
 ('outro', None, 2.6),
]
cues = []
for i, f, p in G:
    if f is None: cues.append({'id': i, 'silence': p}); continue
    c = {'id': i, 'text': f, 'pause': p}; s = decir(f)
    if s != f: c['say'] = s
    cues.append(c)
json.dump(cues, open('cues.json', 'w'), ensure_ascii=False, indent=1)
print(len(cues), 'cues ·', sum(len(c.get('text', '').split()) for c in cues), 'palabras')
