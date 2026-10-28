"""Guion del reel "Pasó de verdad" · Jacobo Grinberg, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Jacobo Grinberg": "Jacobo Grínberg", "Grinberg": "Grínberg", "UNAM": "unám", "CIA": "Sía"}
G = [
 ('h1', 'El doce de diciembre de mil novecientos noventa y cuatro, Jacobo Grinberg cumplía cuarenta y ocho años.', 0.4),
 ('h2', 'Su familia lo esperaba para festejar. Nunca llegó.', 0.6),
 ('c1', 'Según su familia, días antes había dicho que esperaba una invitación para viajar a la India.', 0.45),
 ('c2', 'Pero, según la investigación, no hay registro de que haya salido de México.', 0.5),
 ('c3', 'Y había otro detalle: su esposa, Teresa, también desapareció. Tampoco la encontraron.', 0.6),
 ('c4', 'Las teorías se multiplicaron.', 0.45),
 ('c5', 'Que se fue por su cuenta, a vivir lejos de todos, como los chamanes que estudiaba.', 0.45),
 ('c6', 'Que alguien se lo llevó por lo que investigaba. Hubo quienes señalaron a la CIA, sin ninguna prueba.', 0.45),
 ('c7', 'Que le pasó algo, y alguien cercano sabe más de lo que dijo.', 0.45),
 ('c8', 'Y las más fantásticas: que logró lo que su teoría decía, y desapareció en otra realidad.', 0.5),
 ('c9', 'Ninguna se pudo probar.', 0.5),
 ('c10', 'Pasaron más de treinta años. No hay cuerpo, no hay pistas firmes, no hay culpables.', 0.5),
 ('c11', 'Sus libros, en cambio, se venden más que nunca.', 0.5),
 ('c12', '¿Qué creés que le pasó a Jacobo Grinberg? Te leo en los comentarios.', 0.3),
]
claves = sorted(SAY, key=len, reverse=True)
def decir(f):
    out, i = '', 0
    while i < len(f):
        for k in claves:
            if f.startswith(k, i) and (i == 0 or not f[i - 1].isalpha()):
                out += SAY[k]; i += len(k); break
        else: out += f[i]; i += 1
    return out
cues = [{'id': 'lead', 'silence': .3}]
for i, f, p in G:
    c = {'id': i, 'text': f, 'pause': p}; s = decir(f)
    if s != f: c['say'] = s
    cues.append(c)
cues.append({'id': 'outro', 'silence': 2.5})
json.dump(cues, open('cues.json', 'w'), ensure_ascii=False, indent=1)
print(len(cues), 'cues ·', sum(len(c.get('text', '').split()) for c in cues), 'palabras')
