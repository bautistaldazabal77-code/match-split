"""Guion del reel "Pasó de verdad" · Kennedy, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"John F. Kennedy": "Yon Ef Kénedi", "Kennedy": "Kénedi", "Lee Harvey Oswald": "Li Járvi Ósuald", "Oswald": "Ósuald", "Edwin Walker": "Édwin Uóker", "Dallas": "Dálas", "Parkland": "Párkland", "J. D. Tippit": "Yei Di Típit", "Jack Ruby": "Yac Rúbi", "Ruby": "Rúbi", "Earl Warren": "Erl Uórren", "John Connally": "Yon Cónali", "Connally": "Cónali", "CIA": "Sía", "Elm": "Elm"}
G = [
 ('h1', 'En marzo de mil novecientos sesenta y tres, un hombre de veintitrés años recibió por correo un rifle que había comprado con un nombre falso.', 0.35),
 ('h2', 'Según la investigación oficial, ocho meses después, con ese rifle, mató a un presidente.', 0.6),
 ('c1', 'Se llamaba Lee Harvey Oswald. Había vivido en la Unión Soviética y había vuelto casado con una rusa.', 0.4),
 ('c2', 'Su esposa, Marina, le sacó una foto en el patio: él, vestido de negro, con el rifle en una mano y diarios de izquierda en la otra.', 0.45),
 ('c3', 'En abril intentó matar a un general retirado de extrema derecha, Edwin Walker. La bala pegó en el marco de una ventana. Nadie supo que había sido él.', 0.6),
 ('c4', 'El veintidós de noviembre, John F. Kennedy llegó a Dallas.', 0.35),
 ('c5', 'A las doce y media, su auto descapotable dobló por la calle Elm, frente al depósito de libros escolares donde trabajaba Oswald.', 0.4),
 ('c6', 'Desde una ventana del sexto piso sonaron tres disparos.', 0.5),
 ('c7', 'Uno le atravesó el cuello. Otro le dio en la cabeza.', 0.45),
 ('c8', 'Kennedy murió a la una de la tarde, en el hospital Parkland.', 0.5),
 ('c9', 'Oswald salió caminando del edificio antes de que lo cerraran.', 0.35),
 ('c10', 'Cuarenta y cinco minutos después, un policía, J. D. Tippit, lo paró en la calle. Oswald lo mató a tiros.', 0.45),
 ('c11', 'Lo detuvieron en un cine, a oscuras, en plena película.', 0.4),
 ('c12', 'Esa noche les dijo a los periodistas: soy solo un chivo expiatorio.', 0.5),
 ('c13', 'Dos días después, ya no pudo decir nada más.', 0.5),
 ('c14', 'En la parte dos: el hombre que lo mató frente a las cámaras, y la pregunta que nunca se cerró: ¿actuó solo?', 0.3),
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
