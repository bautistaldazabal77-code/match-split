"""Guion del reel "¿Y si…?" · La Antártida en 2048, parte 2 (ficción política con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"Weddell": "Uédel"}
G = [
 ('h1', 'Dos mil cuarenta y ocho. Un buque sísmico aparece en el mar que reclaman tres países. ¿Qué pasa después?', 0.45),
 ('h2', 'Parte dos. Ficción política, con datos reales.', 0.6),
 ('c1', 'Primero, Valentina. Su reporte llega a Buenos Aires en una hora, y la Argentina manda al rompehielos Almirante Irízar.', 0.45),
 ('c2', 'Pero acá aparece un dato real: en la Antártida está prohibido todo lo militar. Ni bases militares, ni maniobras, ni pruebas de armas.', 0.45),
 ('c3', 'Lo que sí se permite es usar militares para la ciencia. Por eso a las bases argentinas las sostienen las Fuerzas Armadas.', 0.5),
 ('c4', 'Y otro: según el tratado, nada de lo que se haga mientras rige sirve para reforzar un reclamo. Ni las bases, ni los bebés nacidos ahí.', 0.6),
 ('c5', 'Día quince. Lo inesperado: la Argentina, Chile y el Reino Unido, que se pisan los reclamos, se ponen de acuerdo. Si se abre la minería, los tres pierden.', 0.5),
 ('c6', 'No sería tan raro: la Argentina y Chile ya patrullan juntos la península cada verano, desde mil novecientos noventa y ocho.', 0.5),
 ('c7', 'Y llega el dato que define todo. Para levantar la prohibición no alcanza con una votación.', 0.4),
 ('c8', 'El cambio tiene que ratificarlo cada uno de los veintiséis países con voto en mil novecientos noventa y uno. Entre ellos, la Argentina, Chile y el Reino Unido.', 0.5),
 ('c9', 'O sea: cualquiera de los tres puede frenarlo.', 0.6),
 ('c10', 'Día cuarenta. El cambio se aprueba, pero la Argentina no lo ratifica. La prohibición sigue.', 0.5),
 ('c11', 'Pero el protocolo tiene una salida: si el cambio no entra en vigor en tres años, cualquier país puede irse.', 0.5),
 ('c12', 'En esta historia, tres años después, el primero en anunciar que se va es el que pidió la conferencia.', 0.5),
 ('c13', '¿Podría pasar? Hoy, no. Pero la fecha, los reclamos y los barcos ya existen.', 0.45),
 ('c14', '¿Qué creés que pasa en dos mil cuarenta y ocho? Te leo en los comentarios.', 0.3),
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
