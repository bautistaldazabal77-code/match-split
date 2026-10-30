"""Guion del reel de terror "Si una tormenta te atrapa en el Aconcagua", parte 1 (historia de ficción) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {}
G = [
 ('h1', 'Si una tormenta te deja atrapado a casi seis mil metros en el Aconcagua, vas a tener que elegir a quién creerle. Y si elegís mal, no bajás.', 0.45),
 ('c1', 'Refugio Berlín. Treinta y dos grados bajo cero. Vos y Lucas, tu compañero de cordada, esperan que pase el viento blanco.', 0.4),
 ('c2', 'A las nueve de la noche, habla la radio: "Refugio Berlín, acá Plaza de Mulas. La patrulla que subió esta tarde no responde. Hasta que pase la tormenta, tres reglas."', 0.45),
 ('c3', 'Regla uno: nadie sube de noche con viento blanco. Si alguien golpea la puerta, no es la patrulla.', 0.35),
 ('c4', 'Regla dos: que no se apague el calentador.', 0.35),
 ('c5', 'Regla tres: si escuchan su nombre desde afuera, no contesten.', 0.45),
 ('c6', 'Medianoche. La batería de la radio se muere y la pantalla queda negra. Lucas se duerme. Vos no.', 0.5),
 ('c7', 'Tres y catorce de la mañana. La radio vuelve a hablar: "Refugio Berlín, nunca mandamos ningún mensaje. Las reglas son falsas. La patrulla está en su puerta. Ábranles ya."', 0.4),
 ('c8', 'Y golpean. "¡Patrulla de rescate! ¡Abran, que se viene un alud!" Y escuchás tu nombre.', 0.45),
 ('c9', '¿Seguís las reglas o abrís la puerta? Hay una pista que casi nadie vio. Contámela en los comentarios. La parte dos, en mi perfil.', 0.3),
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
