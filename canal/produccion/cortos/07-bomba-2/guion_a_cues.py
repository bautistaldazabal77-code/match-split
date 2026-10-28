"""Guion del reel "Pasó de verdad" · la bomba atómica, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Werner Heisenberg": "Vérner Jáisenberg", "Leo Szilard": "Léo Sílard", "Roosevelt": "Rúsvelt", "Albert Einstein": "Álbert Áinstain", "Leslie Groves": "Lésli Gróuvs", "Robert Oppenheimer": "Róbert Ópenjaimer", "Oppenheimer": "Ópenjaimer", "Trinity": "Tríniti", "Enola Gay": "Enóla Guéi", "Little Boy": "Lítel Bói", "Fat Man": "Fat Man", "Truman": "Trúman", "Hitler": "Jítler"}
G = [
 ('h1', 'El seis de agosto de mil novecientos cuarenta y cinco, a las ocho y cuarto de la mañana, un avión llamado Enola Gay soltó una bomba sobre Hiroshima.', 0.35),
 ('h2', 'Tardó cuarenta y tres segundos en caer.', 0.6),
 ('c1', 'Explotó a unos seiscientos metros sobre la ciudad. Se llamaba Little Boy.', 0.45),
 ('c2', 'Unas setenta mil personas murieron en el acto. De algunas solo quedó la sombra marcada en la piedra.', 0.6),
 ('c3', 'Japón no se rindió.', 0.5),
 ('c4', 'Tres días después, otro avión salió hacia la ciudad de Kokura con una segunda bomba. Estaba nublado. Cambiaron de objetivo: Nagasaki.', 0.45),
 ('c5', 'A las once y dos de la mañana, Fat Man explotó sobre Nagasaki.', 0.5),
 ('c6', 'El quince de agosto, el emperador Hirohito anunció la rendición por radio. Era la primera vez que los japoneses escuchaban su voz.', 0.5),
 ('c7', 'Para fin de año, las dos bombas habían matado a más de doscientas mil personas.', 0.55),
 ('c8', 'Estados Unidos dijo que así evitó una invasión que habría costado muchas más vidas. Los historiadores todavía lo discuten.', 0.45),
 ('c9', 'Oppenheimer fue recibido como un héroe. Pero en octubre le dijo al presidente Truman: siento que tengo las manos manchadas de sangre.', 0.45),
 ('c10', 'A Truman no le gustó. Dijo que no quería volver a verlo.', 0.45),
 ('c11', 'En mil novecientos cincuenta y cuatro, en plena Guerra Fría, le quitaron el acceso a los secretos que él mismo había ayudado a crear. Recién en dos mil veintidós el gobierno anuló esa decisión.', 0.5),
 ('c12', 'Hoy hay más de doce mil armas nucleares en el mundo.', 0.6),
 ('c13', '¿Fue necesaria la bomba? Te leo en los comentarios.', 0.3),
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
