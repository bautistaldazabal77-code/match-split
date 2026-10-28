"""Guion del reel "Pasó de verdad" · MrBeast, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"MrBeast": "Míster Bist", "Jimmy Donaldson": "Yími Dónaldson", "YouTube": "Iutúb", "youtuber": "iutúber", "youtubers": "iutúbers"}
G = [
 ('h1', 'En dos mil diecisiete, un chico de dieciocho años subió un video contando del uno al cien mil.', 0.4),
 ('h2', 'Tardó unas cuarenta horas. Se volvió viral.', 0.6),
 ('c1', 'Se llamaba Jimmy Donaldson. En internet, MrBeast.', 0.4),
 ('c2', 'Subía videos desde los trece años. Dejó la universidad para dedicarse solo a YouTube.', 0.45),
 ('c3', 'Y encontró una fórmula: retos imposibles, y dinero. Mucho dinero.', 0.5),
 ('c4', 'Ese mismo año le regaló diez mil dólares a una persona sin hogar. El dinero era de un patrocinador.', 0.45),
 ('c5', 'Todo lo que ganaba, lo volvía a poner en los videos.', 0.45),
 ('c6', 'Regaló autos, casas, hasta una isla. Recreó El juego del calamar con cuatrocientas cincuenta y seis personas.', 0.45),
 ('c7', 'Juntó veinte millones de dólares para plantar árboles, y otros treinta millones para sacar basura del mar.', 0.45),
 ('c8', 'En dos mil veinticuatro se convirtió en el canal con más suscriptores del mundo.', 0.5),
 ('c9', 'Para millones, era el youtuber más generoso del planeta.', 0.45),
 ('c10', 'Pero no para todos. En enero de dos mil veintitrés subió un video que dividió a internet.', 0.5),
 ('c11', 'En la parte dos: la crítica más grande que enfrentó MrBeast.', 0.3),
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
