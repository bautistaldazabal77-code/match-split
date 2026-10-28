"""Guion del reel "Pasó de verdad" · Beagle 1978, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Beagle": "Bígol", "Picton": "Píkton", "Lennox": "Lénox", "Pinochet": "Pinoché", "Juan Pablo Segundo": "Juan Pablo Segundo"}
G = [
 ('h1', 'El plan del veintidós de diciembre de mil novecientos setenta y ocho tenía horarios exactos.', 0.4),
 ('h2', 'Así lo reconstruyeron después libros y diarios de los dos países.', 0.6),
 ('c1', 'A las ocho de la noche, infantes de marina iban a ocupar las islas del cabo de Hornos.', 0.45),
 ('c2', 'A las diez, la hora H, Picton, Nueva y Lennox, y el canal de Beagle.', 0.5),
 ('c3', 'A medianoche, el Quinto Cuerpo de Ejército iba a avanzar desde Santa Cruz hacia Punta Arenas y Puerto Natales.', 0.45),
 ('c4', 'A las seis de la mañana, la Fuerza Aérea iba a atacar a los aviones chilenos en tierra.', 0.5),
 ('c5', 'Y desde Mendoza, el Tercer Cuerpo de Luciano Benjamín Menéndez iba a cruzar la cordillera por tres pasos, hacia Santiago y, si podía, Valparaíso.', 0.5),
 ('c6', 'Chile lo esperaba. Había minado sus fronteras, volado pasos de montaña y preparado una línea de defensa para frenar el avance sobre Punta Arenas.', 0.45),
 ('c7', 'Su escuadra, al mando del almirante Raúl López, salió de los fiordos a buscar a la flota argentina.', 0.5),
 ('c8', 'Entre los dos países iban a pelear unos doscientos mil hombres.', 0.45),
 ('c9', 'Las estimaciones de muertos iban de treinta mil a cincuenta mil.', 0.6),
 ('c10', 'Y había otro miedo: que entraran Perú, Bolivia o Brasil, y que la guerra se extendiera por toda la región.', 0.5),
 ('c11', 'Nada de eso pasó. En enero de mil novecientos setenta y nueve, los dos países aceptaron la mediación del Papa.', 0.45),
 ('c12', 'Tardaron seis años. En mil novecientos ochenta y cuatro, ya en democracia, el ochenta y dos por ciento de los argentinos votó a favor del acuerdo.', 0.5),
 ('c13', 'Las islas quedaron para Chile, y la Argentina se quedó con la mayor parte del mar.', 0.5),
 ('c14', 'Y uno de los pasos por donde iba a cruzar el ejército hoy se llama Paso Cardenal Samoré, por el enviado del Papa.', 0.5),
 ('c15', '¿Qué habría pasado si nadie llamaba? Te leo en los comentarios.', 0.3),
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
