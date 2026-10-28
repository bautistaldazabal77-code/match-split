"""Guion del reel "Pasó de verdad" · Jacobo Grinberg, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Jacobo Grinberg": "Jacobo Grínberg", "Grinberg": "Grínberg", "UNAM": "unám", "CIA": "Sía"}
G = [
 ('h1', 'En diciembre de mil novecientos noventa y cuatro, un científico mexicano desapareció cuatro días antes de su cumpleaños.', 0.4),
 ('h2', 'Nunca lo encontraron.', 0.6),
 ('c1', 'Se llamaba Jacobo Grinberg. Era neurofisiólogo e investigador de la UNAM, la universidad más grande de México.', 0.4),
 ('c2', 'Se había doctorado en Nueva York y escribió más de cincuenta libros.', 0.4),
 ('c3', 'Pero no investigaba lo de siempre. Quería entender la conciencia: qué pasa en el cerebro cuando pensamos, meditamos o nos conectamos con otra persona.', 0.45),
 ('c4', 'Hizo experimentos con parejas que meditaban juntas. Según él, aunque estuvieran en cuartos aislados, sus cerebros mostraban patrones parecidos.', 0.45),
 ('c5', 'Para explicarlo creó la teoría sintérgica: la realidad sería un gran campo de información, y el cerebro, una especie de antena.', 0.45),
 ('c6', 'La mayoría de los científicos nunca la aceptó.', 0.5),
 ('c7', 'Para entender la conciencia, Grinberg pasó años con chamanes y curanderos de México.', 0.4),
 ('c8', 'La más famosa fue Pachita, una curandera que, según él, operaba a sus pacientes con un cuchillo y sin anestesia.', 0.45),
 ('c9', 'Escribió un libro sobre ella. Dijo que lo que vio no tenía explicación.', 0.5),
 ('c10', 'Muchos colegas empezaron a mirarlo con desconfianza.', 0.5),
 ('c11', 'Y entonces, un día de diciembre, simplemente dejó de aparecer.', 0.5),
 ('c12', 'En la parte dos: las pistas, las teorías, y la pregunta que sigue abierta.', 0.3),
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
