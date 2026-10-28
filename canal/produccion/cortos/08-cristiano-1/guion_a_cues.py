"""Guion del reel "Pasó de verdad" · Cristiano Ronaldo, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Madeira": "Madéira", "Sporting": "Spórting", "Manchester United": "Mánchester Iunáited", "Champions League": "Chámpions Lig", "Real Madrid": "Real Madrid"}
G = [
 ('h1', 'Su madre contó que, cuando quedó embarazada, pensó en no tenerlo.', 0.4),
 ('h2', 'Ese bebé se llamaba Cristiano Ronaldo.', 0.6),
 ('c1', 'Nació en mil novecientos ochenta y cinco en Madeira, una isla de Portugal, en una casa humilde.', 0.4),
 ('c2', 'Su padre era utilero en un club de barrio y tenía problemas con el alcohol.', 0.5),
 ('c3', 'A los doce años lo fichó el Sporting de Lisboa. Se fue solo, a casi mil kilómetros de su familia.', 0.45),
 ('c4', 'En Lisboa se burlaban de su acento. Lloraba casi todos los días. Sus compañeros le decían el llorón.', 0.5),
 ('c5', 'A los quince le detectaron un problema en el corazón: latía demasiado rápido. Lo operaron, y a los pocos días ya estaba entrenando.', 0.5),
 ('c6', 'A los dieciocho jugó un amistoso contra el Manchester United. Esa misma semana, el club inglés lo fichó.', 0.45),
 ('c7', 'Le dieron la camiseta número siete, la de las leyendas del club.', 0.4),
 ('c8', 'Al principio lo criticaban por egoísta y por adornarse con la pelota.', 0.45),
 ('c9', 'En dos mil cinco murió su padre, por el alcohol. Cristiano tenía veinte años. Desde entonces, contó, casi no toma alcohol.', 0.6),
 ('c10', 'En dos mil ocho ganó su primer Balón de Oro. Y entonces empezaron a llamarlo arrogante.', 0.5),
 ('c11', 'En la parte dos: por qué no le importó.', 0.3),
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
