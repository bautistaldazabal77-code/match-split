"""Guion del reel de terror "Si una tormenta te atrapa en el Aconcagua", parte 2 (historia de ficción) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {}
G = [
 ('h1', 'Tres y catorce de la mañana, a casi seis mil metros. Una radio te dice que abras. Las reglas, que no. ¿Quién miente?', 0.45),
 ('c1', 'La pista estaba en la parte uno: a medianoche, la batería de la radio se murió. La pantalla sigue negra.', 0.4),
 ('c2', 'Una radio sin batería no puede recibir nada. Esa voz no salió de la radio.', 0.45),
 ('c3', 'Te acercás despacio. La voz no viene del aparato. Viene de la rendija de abajo de la puerta.', 0.45),
 ('c4', 'Despertás a Lucas. Ninguno de los dos contesta. Afuera siguen los golpes. Después, rasguños. Después, tu nombre, con la voz de tu mamá.', 0.5),
 ('c5', 'Regla dos. Lucas le echa al calentador el último combustible. La llama tiembla, pero no se apaga.', 0.45),
 ('c6', 'A las cinco y media, silencio. A las siete, sale el sol.', 0.45),
 ('c7', 'A las nueve llega la patrulla de verdad, desde abajo. Habían pasado la noche en una cueva de nieve. Estaban todos bien.', 0.45),
 ('c8', 'Al lado de la puerta del refugio hay huellas. Pero no bajan hacia Plaza de Mulas. Suben, hacia la cumbre.', 0.55),
 ('c9', 'Si hubieras abierto, ¿qué había del otro lado? Te leo en los comentarios.', 0.3),
]
claves = sorted(SAY, key=len, reverse=True)
def decir(f):
    out, i = "", 0
    while i < len(f):
        for k in claves:
            if f.startswith(k, i) and (i == 0 or not f[i - 1].isalpha()):
                out += SAY[k]; i += len(k); break
        else: out += f[i]; i += 1
    return out
cues = [{"id": "lead", "silence": .3}]
for i, f, p in G:
    c = {"id": i, "text": f, "pause": p}; s = decir(f)
    if s != f: c["say"] = s
    cues.append(c)
cues.append({"id": "outro", "silence": 3.0})
json.dump(cues, open("cues.json", "w"), ensure_ascii=False, indent=1)
print(len(cues), "cues ·", sum(len(c.get("text", "").split()) for c in cues), "palabras")
