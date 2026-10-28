"""Guion del reel "Pasó de verdad" · Beagle 1978, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Beagle": "Bígol", "Picton": "Píkton", "Lennox": "Lénox", "Pinochet": "Pinoché", "Juan Pablo Segundo": "Juan Pablo Segundo"}
G = [
 ('h1', 'Seis meses después del Mundial setenta y ocho, la Argentina y Chile estuvieron a horas de una guerra.', 0.4),
 ('h2', 'El plan tenía fecha y hora: veintidós de diciembre, a las diez de la noche.', 0.6),
 ('c1', 'La pelea era por tres islas en la boca del canal de Beagle, en el fin del mundo: Picton, Nueva y Lennox.', 0.45),
 ('c2', 'Parecen chicas, pero quien las tuviera podía reclamar una enorme porción de mar, camino a la Antártida.', 0.5),
 ('c3', 'Los dos países le pidieron a la Corona británica que decidiera. En mayo de mil novecientos setenta y siete, el fallo le dio las tres islas a Chile.', 0.45),
 ('c4', 'En enero de mil novecientos setenta y ocho, la dictadura argentina lo declaró nulo.', 0.5),
 ('c5', 'Del otro lado gobernaba Pinochet. Chile minó sus fronteras y preparó su escuadra.', 0.5),
 ('c6', 'En diciembre, Videla firmó la orden. Se llamó Operativo Soberanía.', 0.5),
 ('c7', 'La flota argentina zarpó hacia el sur: el portaaviones Veinticinco de Mayo, el crucero General Belgrano, destructores y buques de desembarco con infantes de marina.', 0.45),
 ('c8', 'La escuadra chilena la esperaba entre las islas. Según fuentes chilenas, un avión ya la había ubicado.', 0.5),
 ('c9', 'Entonces llegó un temporal, con vientos huracanados y olas de más de doce metros.', 0.5),
 ('c10', 'Y esa misma mañana, el papa Juan Pablo Segundo se comunicó con los dos gobiernos: iba a mandar un enviado personal.', 0.5),
 ('c11', 'La junta militar discutió una hora. Y aceptó.', 0.6),
 ('c12', 'A la tarde, horas antes del desembarco, la flota argentina dio la vuelta.', 0.5),
 ('c13', 'Nadie disparó. Pero el plan no terminaba en las islas. En la parte dos: qué iba a pasar si nadie llamaba.', 0.3),
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
