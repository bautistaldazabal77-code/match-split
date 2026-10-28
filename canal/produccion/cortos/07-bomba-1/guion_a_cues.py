"""Guion del reel "Pasó de verdad" · la bomba atómica, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Werner Heisenberg": "Vérner Jáisenberg", "Leo Szilard": "Léo Sílard", "Roosevelt": "Rúsvelt", "Albert Einstein": "Álbert Áinstain", "Leslie Groves": "Lésli Gróuvs", "Robert Oppenheimer": "Róbert Ópenjaimer", "Oppenheimer": "Ópenjaimer", "Trinity": "Tríniti", "Enola Gay": "Enóla Guéi", "Little Boy": "Lítel Bói", "Fat Man": "Fat Man", "Truman": "Trúman", "Hitler": "Jítler"}
G = [
 ('h1', 'En diciembre de mil novecientos treinta y ocho, en Berlín, dos químicos partieron un átomo de uranio en dos.', 0.35),
 ('h2', 'Al partirse, liberaba energía. Muchísima energía.', 0.6),
 ('c1', 'Los físicos entendieron enseguida lo que eso significaba: se podía fabricar una bomba.', 0.4),
 ('c2', 'Y tenían miedo de que Hitler la tuviera primero: Alemania tenía físicos como Werner Heisenberg.', 0.45),
 ('c3', 'En agosto de mil novecientos treinta y nueve, el físico Leo Szilard escribió una carta al presidente Roosevelt. La firmó el científico más famoso del mundo: Albert Einstein.', 0.4),
 ('c4', 'La carta advertía que una sola bomba de ese tipo podía destruir un puerto entero.', 0.55),
 ('c5', 'Tres años después nació el Proyecto Manhattan. Al frente quedaron un general, Leslie Groves, y un físico, Robert Oppenheimer.', 0.4),
 ('c6', 'En el desierto de Nuevo México construyeron una ciudad secreta: Los Álamos. No figuraba en ningún mapa.', 0.4),
 ('c7', 'En todo el país, unas ciento treinta mil personas trabajaron en el proyecto. Casi ninguna sabía qué estaba construyendo.', 0.5),
 ('c8', 'El dieciséis de julio de mil novecientos cuarenta y cinco, a las cinco y veintinueve de la mañana, probaron la primera bomba atómica de la historia. La llamaron Trinity.', 0.4),
 ('c9', 'Antes, algunos científicos calcularon si la explosión podía incendiar la atmósfera. Concluyeron que no. Igual, nadie estaba del todo seguro.', 0.5),
 ('c10', 'El destello se vio a cientos de kilómetros. La arena del desierto se convirtió en vidrio.', 0.5),
 ('c11', 'Años después, Oppenheimer recordó una frase de un texto sagrado hindú: ahora me he convertido en la muerte, el destructor de mundos.', 0.6),
 ('c12', 'Pero había un detalle: Alemania se había rendido dos meses antes. La carrera ya no tenía rival.', 0.5),
 ('c13', 'Tres semanas después, la bomba igual se usó. En la parte dos: Hiroshima.', 0.3),
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
