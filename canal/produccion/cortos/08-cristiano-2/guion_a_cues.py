"""Guion del reel "Pasó de verdad" · Cristiano Ronaldo, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Madeira": "Madéira", "Sporting": "Spórting", "Manchester United": "Mánchester Iunáited", "Champions League": "Chámpions Lig", "Real Madrid": "Real Madrid"}
G = [
 ('h1', 'Le preguntaron si era el mejor jugador de la historia. Respondió que sí, sin dudar.', 0.4),
 ('h2', 'Para muchos, eso era arrogancia. Para él, era trabajo.', 0.6),
 ('c1', 'En dos mil nueve, el Real Madrid pagó por él noventa y cuatro millones de euros, el fichaje más caro de la historia hasta ese momento.', 0.45),
 ('c2', 'En nueve temporadas hizo cuatrocientos cincuenta goles. Más goles que partidos jugados.', 0.45),
 ('c3', 'Ganó cinco Champions League y cinco Balones de Oro.', 0.45),
 ('c4', 'Sus compañeros contaban que era el primero en llegar a entrenar y el último en irse.', 0.5),
 ('c5', 'En la final de la Eurocopa de dos mil dieciséis se lesionó y salió llorando.', 0.4),
 ('c6', 'Desde el costado gritó indicaciones como un entrenador más. Portugal ganó el primer gran título de su historia.', 0.55),
 ('c7', 'No tiene tatuajes. Contó que es para poder donar sangre.', 0.5),
 ('c8', 'En el Mundial de dos mil veintidós, a los treinta y siete años, lo dejaron en el banco. Muchos dijeron que estaba terminado.', 0.45),
 ('c9', 'Se fue a jugar a Arabia Saudita. Y siguió haciendo goles.', 0.45),
 ('c10', 'En dos mil veinticuatro llegó a novecientos goles oficiales. Nadie en la historia había hecho tantos.', 0.5),
 ('c11', 'El chico al que le decían llorón se convirtió en el máximo goleador de la historia del fútbol.', 0.5),
 ('c12', '¿Arrogante, o simplemente sabía lo que valía? Te leo en los comentarios.', 0.3),
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
