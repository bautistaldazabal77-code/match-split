"""Guion del reel "Pasó de verdad" · Michael Jackson, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Michael Jackson": "Máikel Yákson", "Jackson Five": "Yákson Fáiv", "Jackson": "Yákson", "Michael": "Máikel", "Gary": "Gári", "Joe": "Yóu", "Thriller": "Tríler", "Grammy": "Grámi", "Neverland": "Néverland", "Peter Pan": "Píter Pan", "Conrad Murray": "Cónrad Múrrei", "Murray": "Múrrei"}
G = [
 ('h1', 'En los ensayos, su padre se sentaba frente a ellos con un cinturón en la mano.', 0.35),
 ('h2', 'Si se equivocaban, les pegaba. Lo contó él mismo, años después.', 0.6),
 ('c1', 'Michael Jackson nació en mil novecientos cincuenta y ocho en Gary, Indiana, en una casa de dos cuartos donde vivían once personas.', 0.4),
 ('c2', 'Su padre, Joe, trabajaba en una acería y soñaba con ser músico. Armó una banda con sus hijos: los Jackson Five.', 0.4),
 ('c3', 'Michael tenía seis años cuando empezó a cantar con ellos. A los once, ya tenían cuatro números uno seguidos.', 0.45),
 ('c4', 'Su infancia se le fue en estudios, giras y hoteles. Contó que lloraba al ver a otros chicos jugar.', 0.45),
 ('c5', 'Su padre también se burlaba de su nariz. De chico, dijo, no podía mirarse al espejo.', 0.6),
 ('c6', 'En mil novecientos ochenta y dos sacó Thriller. Se convirtió en el disco más vendido de la historia.', 0.4),
 ('c7', 'En mil novecientos ochenta y cuatro ganó ocho premios Grammy en una sola noche, un récord.', 0.4),
 ('c8', 'Ese año, grabando un comercial, se le prendió fuego el pelo. Desde entonces empezó a tomar calmantes.', 0.5),
 ('c9', 'Su piel también empezó a cambiar. Muchos decían que se la aclaraba a propósito. La autopsia confirmó que tenía vitiligo.', 0.55),
 ('c10', 'Era el artista más famoso del planeta. Y uno de los hombres más solos.', 0.5),
 ('c11', 'En mil novecientos ochenta y ocho compró un rancho y lo llamó Neverland, como la isla de Peter Pan: el lugar donde los niños nunca crecen.', 0.45),
 ('c12', 'Cinco años después, ese rancho iba a cambiar su vida para siempre.', 0.5),
 ('c13', 'En la parte dos: las acusaciones, el juicio, y la noche en que su médico le dio la última dosis.', 0.3),
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
