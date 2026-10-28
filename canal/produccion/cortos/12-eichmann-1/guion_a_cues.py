"""Guion del reel "Pasó de verdad" · Adolf Eichmann, parte 1 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Adolf Eichmann": "Adolf Áijman", "Eichmann": "Áijman", "Ricardo Klement": "Ricardo Klément", "Klement": "Klément", "Wannsee": "Vánsei", "Auschwitz": "Áushvits", "Gestapo": "Guestápo", "Otto Eckmann": "Oto Ékman", "Lothar Hermann": "Lótar Hérman", "Hermann": "Hérman", "Fritz Bauer": "Frits Báuer", "Bauer": "Báuer", "Mossad": "Mosád", "Liebl de Fichmann": "Líbel de Fíjman", "Zvi Aharoni": "Sví Ajaróni", "Isser Harel": "Íser Jarél", "Peter Malkin": "Píter Málkin", "El Al": "El Ál", "Ben-Gurion": "Ben Gurión", "Hannah Arendt": "Jána Árendt", "Josef Mengele": "Yósef Ménguele", "Mengele": "Ménguele", "Ramla": "Rámla", "Dakar": "Dakár", "Mercedes-Benz": "Mercedes Benz", "SS": "ese ese", "ONU": "ónu"}
G = [
 ('h1', 'En mil novecientos sesenta, en San Fernando, en el conurbano de Buenos Aires, vivía un hombre llamado Ricardo Klement.', 0.4),
 ('h2', 'Trabajaba en una fábrica, tenía cuatro hijos y tomaba el colectivo todos los días. Pero ese no era su nombre.', 0.6),
 ('c1', 'Era Adolf Eichmann, uno de los organizadores del Holocausto.', 0.5),
 ('c2', 'Desde una oficina de la Gestapo coordinó los trenes que llevaron a millones de judíos a los campos de exterminio.', 0.45),
 ('c3', 'En mil novecientos cuarenta y dos estuvo en la Conferencia de Wannsee, donde se coordinó la llamada solución final. Él preparó el acta.', 0.45),
 ('c4', 'En Hungría, en mil novecientos cuarenta y cuatro, organizó cuatro trenes por día hacia Auschwitz. En menos de dos meses deportaron a más de cuatrocientos treinta mil judíos.', 0.5),
 ('c5', 'Cuando Alemania se rindió, los estadounidenses lo capturaron sin saber quién era: dijo llamarse Otto Eckmann.', 0.45),
 ('c6', 'Se escapó, y vivió cuatro años escondido en el norte de Alemania, trabajando en un bosque.', 0.45),
 ('c7', 'En mil novecientos cincuenta, una red ligada a un obispo en Roma le dio papeles falsos. Con ellos sacó un pasaporte de la Cruz Roja: Ricardo Klement.', 0.45),
 ('c8', 'En julio llegó en barco a Buenos Aires. Trabajó en Tucumán, y después en Mercedes-Benz, donde llegó a jefe.', 0.45),
 ('c9', 'En mil novecientos cincuenta y dos llegaron su esposa y sus tres hijos.', 0.5),
 ('c10', 'Lo delató un noviazgo.', 0.5),
 ('c11', 'Uno de sus hijos salía con la hija de Lothar Hermann, un judío alemán ciego. El chico usaba el apellido real, y hablaba de lo que su padre había hecho en la guerra.', 0.45),
 ('c12', 'Hermann le escribió a Fritz Bauer, un fiscal alemán. Bauer no confiaba en la justicia de su país, llena de exnazis, y le pasó el dato en secreto a Israel.', 0.5),
 ('c13', 'En la parte dos: el Mossad, la casa de la calle Garibaldi, y el colectivo de las siete y cuarenta.', 0.3),
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
