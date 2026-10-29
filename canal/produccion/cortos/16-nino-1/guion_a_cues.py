"""Guion del reel "¿Y si…?" · El Niño llega a su pico, parte 1 (ficción con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"Saulo": "Sáulo"}
G = [
 ('h1', 'Diciembre de dos mil veintiséis. El Pacífico está tres coma ocho grados más caliente que lo normal. Nunca había pasado. ¿Qué le pasa a Rosario?', 0.45),
 ('h2', '¿Y si El Niño llega a su pico? Ficción, con datos reales.', 0.6),
 ('c1', 'Primero, lo real. En octubre, la Organización Meteorológica Mundial avisó que El Niño podría llegar a tres coma ocho grados entre noviembre y enero.', 0.45),
 ('c2', 'Su secretaria general, la argentina Celeste Saulo, lo dijo así: nunca se registró un valor de tres coma ocho. El récord anterior fue dos coma seis, en dos mil quince.', 0.45),
 ('c3', 'Y ese récord ya se sintió acá: en enero de dos mil dieciséis, el Paraná en Rosario rozó los cinco metros y medio.', 0.6),
 ('c4', 'Ahora, la ficción. Bruno tiene veintinueve años y trabaja en una terminal de granos del Gran Rosario. Su abuela Elsa vive en una isla, justo enfrente.', 0.5),
 ('c5', 'Día uno. En el sur de Brasil llueve dos semanas seguidas. Toda esa agua baja por el Paraná.', 0.45),
 ('c6', 'Dato real: una crecida puede tardar unos dieciocho días en bajar desde Iguazú hasta el Delta. Rosario la ve venir.', 0.5),
 ('c7', 'Día nueve. El río marca cuatro metros y medio en el puerto. Bruno le escribe a su abuela: esto viene en serio. Ella le contesta: ya lo vi en el ochenta y tres.', 0.5),
 ('c8', 'Dato real: en mil novecientos ochenta y tres, el Paraná estuvo crecido durante meses. En Santa Fe, se cayó el Puente Colgante.', 0.55),
 ('c9', 'Día catorce. Cinco metros: nivel de alerta. Día dieciséis. Cinco con treinta: nivel de evacuación.', 0.45),
 ('c10', 'Esos son los niveles reales que usa Rosario.', 0.5),
 ('c11', 'Y el pronóstico de ese día dice algo que nadie quería leer: el pico todavía no llegó. El río podría pasar los seis metros.', 0.55),
 ('c12', 'Y Elsa no se quiere ir de la isla. ¿Vos qué harías? La parte dos, en mi perfil.', 0.3),
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
