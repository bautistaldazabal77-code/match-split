"""Guion del reel "¿Y si…?" · La antena china de Neuquén, parte 2 (ficción política con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"CONAE": "Conáe", "ENACOM": "Enacom", "swap": "suap"}
G = [
 ('h1', 'Washington pide cerrar la antena china de Neuquén. Pekín amenaza. ¿Qué hace la Argentina?', 0.45),
 ('h2', 'Parte dos. Ficción política, con datos reales.', 0.6),
 ('c1', 'Primero, Sofía. La citan a declarar. Su copia de los registros es lo que todos quieren ver.', 0.45),
 ('c2', 'Y acá aparece un dato real: en dos mil dieciséis, la Argentina y China firmaron que la estación es solo para uso civil.', 0.45),
 ('c3', 'Si se probara un uso militar, la Argentina tendría con qué reclamar. El problema es probarlo.', 0.5),
 ('c4', 'Y no sería la primera inspección. En abril de dos mil veinticuatro, la Cancillería, el ENACOM y la CONAE ya recorrieron la base, y concluyeron que se cumplían los fines pacíficos.', 0.5),
 ('c5', 'En esta historia, la Argentina elige un camino del medio: una inspección total, con la Fuerza Aérea, la CONAE y los servicios de inteligencia.', 0.45),
 ('c6', 'China acepta a medias: abre la sala de control, pero no los servidores.', 0.55),
 ('c7', 'Y entonces aparece otro dato real que casi nadie conoce.', 0.4),
 ('c8', 'En Malargüe, Mendoza, hay otra antena de treinta y cinco metros. Es de la Agencia Espacial Europea, tiene un acuerdo por cincuenta años y también le deja a la Argentina hasta el diez por ciento del tiempo.', 0.5),
 ('c9', 'La diferencia no es la antena. Es quién la opera.', 0.6),
 ('c10', 'Día veinte. Washington ofrece inversiones si la estación pasa a control argentino.', 0.45),
 ('c11', 'Pekín ofrece lo contrario: más compras y el swap renovado, si todo sigue igual.', 0.5),
 ('c12', 'Y Sofía vuelve a su turno. Ahora, cada noche, dos potencias miran la misma pantalla que ella.', 0.6),
 ('c13', '¿Podría pasar? La antena existe. El pedido de equipos nuevos existe. Y la presión de Washington, también.', 0.45),
 ('c14', '¿Vos la cerrarías o la dejarías? Te leo en los comentarios.', 0.3),
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
