"""Guion del reel "Pasó de verdad" · Epstein, parte 2 → cues.json. Correr dentro de la carpeta del reel.
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
 ('h1', "El seis de julio de dos mil diecinueve, Jeffrey Epstein aterrizó en Nueva Jersey en su avión privado.", .35),
 ('h2', "Lo estaban esperando.", .5),
 ('c1', "Lo acusaron de tráfico sexual de menores. Podía pasar el resto de su vida preso.", .45),
 ('c2', "Un mes después, estaba muerto.", .7),
 ('c3', "El veintitrés de julio lo encontraron en su celda con marcas en el cuello. Lo pusieron bajo vigilancia por riesgo de suicidio. Seis días después, se la quitaron.", .4),
 ('c4', "El nueve de agosto trasladaron a su compañero de celda. Nadie lo reemplazó.", .5),
 ('c5', "Esa noche, los dos guardias no hicieron las rondas. Después se supo que habían falsificado los registros. Y dos cámaras del pasillo no grabaron.", .5),
 ('c6', "A las seis y media de la mañana lo encontraron sin vida.", .7),
 ('c7', "La forense dijo suicidio. En dos mil veintitrés, el inspector general del Departamento de Justicia lo confirmó, pero describió una cadena de negligencias.", .45),
 ('c8', "En dos mil veinticinco, el FBI publicó el video del pasillo. Le faltaba un minuto, justo antes de la medianoche.", .6),
 ('c9', "Con Epstein muerto, no hubo juicio. Solo Ghislaine Maxwell fue condenada: veinte años de prisión.", .5),
 ('c10', "En enero de dos mil veintiséis se publicaron más de tres millones de páginas. Aparecen cientos de nombres.", .4),
 ('c11', "Pero aparecer en esos archivos no es un delito.", .5),
 ('c12', "Y las víctimas siguen preguntando: si había una red, ¿dónde están los demás?", .6),
 ('c13', "¿Vos qué creés? Te leo en los comentarios.", .3),
 ('outro', None, 2.4),
]
cues = []
for i, f, p in G:
    if f is None: cues.append({'id': i, 'silence': p}); continue
    c = {'id': i, 'text': f, 'pause': p}; s = decir(f)
    if s != f: c['say'] = s
    cues.append(c)
json.dump(cues, open('cues.json', 'w'), ensure_ascii=False, indent=1)
print(len(cues), 'cues ·', sum(len(c.get('text', '').split()) for c in cues), 'palabras')
