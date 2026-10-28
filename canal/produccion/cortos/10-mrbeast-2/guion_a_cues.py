"""Guion del reel "Pasó de verdad" · MrBeast, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"MrBeast": "Míster Bist", "Jimmy Donaldson": "Yími Dónaldson", "YouTube": "Iutúb", "youtuber": "iutúber", "youtubers": "iutúbers"}
G = [
 ('h1', 'Mil personas ciegas ven por primera vez. Así se llamaba el video.', 0.4),
 ('h2', 'MrBeast pagó mil operaciones de cataratas, de unos diez minutos cada una, y filmó las reacciones.', 0.6),
 ('c1', 'Tuvo decenas de millones de vistas. Y una lluvia de críticas.', 0.45),
 ('c2', 'Lo acusaron de usar a personas pobres y enfermas para conseguir vistas. Le pusieron un nombre: pornografía de la pobreza.', 0.5),
 ('c3', 'Decían que cada video de ayuda le hacía ganar millones en publicidad.', 0.5),
 ('c4', 'Él respondió: la gente dice que los ricos deberían ayudar con su dinero. Yo lo hago, y dicen que soy malo.', 0.45),
 ('c5', 'Y preguntó por qué la ceguera curable sigue existiendo, y por qué los gobiernos no hacen nada.', 0.55),
 ('c6', 'En noviembre de dos mil veintitrés construyó cien pozos de agua en África.', 0.45),
 ('c7', 'Antes de que nadie opinara, escribió: ya sé que me van a cancelar por ayudar a la gente, y no me importa.', 0.5),
 ('c8', 'Esta vez, en Kenia, muchos apuntaron a otro lado: un youtuber había hecho lo que su gobierno no hacía.', 0.55),
 ('c9', 'Entonces, ¿dónde está el problema?', 0.45),
 ('c10', 'Para unos, mostrar a alguien en su peor momento para ganar vistas no está bien, aunque lo ayudes.', 0.45),
 ('c11', 'Para otros, mil personas volvieron a ver, y eso es lo único que importa.', 0.5),
 ('c12', '¿Ayudar frente a una cámara sigue siendo ayudar? Te leo en los comentarios.', 0.3),
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
