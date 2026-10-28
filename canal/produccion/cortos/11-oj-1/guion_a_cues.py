"""Guion del reel "Pasó de verdad" · O. J. Simpson, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"O. J. Simpson": "Óu Yei Símpson", "Nicole Brown Simpson": "Nicól Bráun Símpson", "Simpson": "Símpson", "Nicole": "Nicól", "Ron Goldman": "Ron Góldman", "Ron": "Ron", "Johnnie Cochran": "Yóni Cócran", "Mark Fuhrman": "Mark Fúrman", "Las Vegas": "Las Végas"}
G = [
 ('h1', 'El diecisiete de junio de mil novecientos noventa y cuatro, noventa y cinco millones de personas miraban lo mismo por televisión.', 0.4),
 ('h2', 'Una camioneta blanca, a sesenta kilómetros por hora, perseguida por una fila de patrulleros.', 0.6),
 ('c1', 'Adentro iba O. J. Simpson, una de las estrellas de fútbol americano más famosas del país.', 0.4),
 ('c2', 'Cinco días antes habían encontrado asesinados a su exesposa, Nicole Brown Simpson, y a un amigo de ella, Ron Goldman.', 0.5),
 ('c3', 'Simpson había sido el primer jugador en correr más de dos mil yardas en una temporada. Después fue actor y comentarista.', 0.45),
 ('c4', 'Pero en mil novecientos ochenta y nueve no había impugnado un cargo de violencia doméstica contra Nicole.', 0.5),
 ('c5', 'Esa mañana tenía que entregarse. No apareció.', 0.45),
 ('c6', 'En la camioneta llevaba un arma, su pasaporte y miles de dólares en efectivo.', 0.45),
 ('c7', 'Después de horas, se entregó en su casa.', 0.5),
 ('c8', 'La policía tenía sangre, huellas y un par de guantes de cuero: uno en la escena del crimen, y el otro en su casa.', 0.5),
 ('c9', 'Parecía el caso más fácil de la historia.', 0.45),
 ('c10', 'Se convirtió en el juicio del siglo.', 0.5),
 ('c11', 'En la parte dos: el guante que debía condenarlo, y terminó salvándolo.', 0.3),
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
