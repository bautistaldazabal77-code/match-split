"""Guion del reel "¿Y si…?" · La antena china de Neuquén, parte 1 (ficción política con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"CONAE": "Conáe", "swap": "suap"}
G = [
 ('h1', 'En el medio de la Patagonia hay una antena de treinta y cinco metros que mira al espacio. Es de China, y tiene contrato por cincuenta años.', 0.45),
 ('h2', '¿Y si Washington pidiera cerrarla? Esto es ficción política, con datos reales.', 0.6),
 ('c1', 'Primero, lo real. La estación está en Bajada del Agrio, Neuquén: doscientas hectáreas en el desierto. Funciona desde dos mil dieciocho.', 0.45),
 ('c2', 'La opera una agencia vinculada al Ejército Popular de Liberación. China dice que es solo para ciencia: sigue sus misiones a la Luna y a Marte.', 0.5),
 ('c3', 'Y un dato que casi nadie conoce: los trabajadores chinos se rigen por las leyes laborales de China, y la Argentina solo usa el diez por ciento del tiempo de la antena.', 0.5),
 ('c4', 'En agosto de dos mil veintiséis, China pidió sumar equipos. La Fuerza Aérea advirtió que, aunque no haya antena nueva, puede haber más capacidades sensibles.', 0.6),
 ('c5', 'Desde acá, ficción.', 0.45),
 ('c6', 'Sofía tiene veintiséis años. Es radioastrónoma de la CONAE y trabaja en ese diez por ciento argentino.', 0.45),
 ('c7', 'Una noche, en su turno, ve algo raro en los registros. La antena no apunta a la Luna: sigue a un satélite que pasa sobre el Atlántico Sur.', 0.5),
 ('c8', 'Sofía guarda una copia. Tres días después, ese archivo está en Washington.', 0.5),
 ('c9', 'No saldría de la nada: en dos mil veinticinco, con el swap de veinte mil millones de dólares, el secretario del Tesoro de Estados Unidos ya habló de las bases y los centros de observación chinos en la Argentina.', 0.45),
 ('c10', 'En esta historia, el pedido es directo: cerrar la estación de Neuquén.', 0.5),
 ('c11', 'Pero China también presiona: tiene un swap de unos dieciocho mil millones de dólares con el Banco Central, y es la principal compradora de carne argentina.', 0.5),
 ('c12', 'Pekín avisa que, si se rompe el contrato, revisa todo lo demás.', 0.5),
 ('c13', 'La Argentina, en el medio. ¿Cierra la antena o la mantiene? En la parte dos, la decisión.', 0.4),
 ('c14', '¿Vos qué harías? Te leo en los comentarios.', 0.3),
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
