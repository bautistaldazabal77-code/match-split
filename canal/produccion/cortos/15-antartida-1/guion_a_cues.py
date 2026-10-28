"""Guion del reel "¿Y si…?" · La Antártida en 2048, parte 1 (ficción política con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"Weddell": "Uédel"}
G = [
 ('h1', 'Dicen que en dos mil cuarenta y ocho se termina el Tratado Antártico. Es mentira.', 0.45),
 ('h2', 'Pero ese año sí puede pasar algo. Esto es ficción política, con datos reales.', 0.6),
 ('c1', 'Primero, lo real. En mil novecientos cincuenta y nueve, doce países, entre ellos la Argentina, firmaron el Tratado Antártico y congelaron los reclamos de soberanía.', 0.45),
 ('c2', 'Pero los reclamos siguen ahí. La Argentina reclama este sector. Chile, este. Y el Reino Unido, este otro. Los tres se pisan.', 0.6),
 ('c3', 'La Argentina está desde mil novecientos cuatro: la base Orcadas es la más antigua de la Antártida que sigue habitada.', 0.5),
 ('c4', 'Y ahora, el dato que casi nadie conoce.', 0.4),
 ('c5', 'En mil novecientos noventa y uno se firmó el Protocolo de Madrid, que prohíbe la minería en la Antártida. Desde dos mil cuarenta y ocho, cualquiera de los países con voto puede pedir revisarlo.', 0.5),
 ('c6', 'Y hay con qué tentarse: barcos rusos hicieron estudios sísmicos, y una estimación rusa habló de quinientos once mil millones de barriles de petróleo. Rusia dice que es ciencia.', 0.6),
 ('c7', 'Desde acá, ficción.', 0.45),
 ('c8', 'Valentina tiene veintitrés años. Nació en la base Esperanza, como Emilio Palma, el primer bebé nacido en la Antártida, en mil novecientos setenta y ocho.', 0.5),
 ('c9', 'Enero de dos mil cuarenta y ocho. Valentina trabaja en la base Marambio cuando llega la noticia: un grupo de países, encabezado por Rusia, pide revisar la prohibición.', 0.5),
 ('c10', 'Nueve días después, en el radar aparece un buque sísmico en el mar de Weddell, justo en la zona que reclaman la Argentina, Chile y el Reino Unido.', 0.5),
 ('c11', 'Ninguno de los tres lo invitó.', 0.6),
 ('c12', '¿A quién llama primero la Argentina: a Santiago o a Londres? En la parte dos, quién se queda con qué.', 0.4),
 ('c13', '¿Vos qué harías? Te leo en los comentarios.', 0.3),
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
