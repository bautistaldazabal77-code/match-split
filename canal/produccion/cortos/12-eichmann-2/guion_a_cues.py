"""Guion del reel "Pasó de verdad" · Adolf Eichmann, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Adolf Eichmann": "Adolf Áijman", "Eichmann": "Áijman", "Ricardo Klement": "Ricardo Klément", "Klement": "Klément", "Wannsee": "Vánsei", "Auschwitz": "Áushvits", "Gestapo": "Guestápo", "Otto Eckmann": "Oto Ékman", "Lothar Hermann": "Lótar Hérman", "Hermann": "Hérman", "Fritz Bauer": "Frits Báuer", "Bauer": "Báuer", "Mossad": "Mosád", "Liebl de Fichmann": "Líbel de Fíjman", "Zvi Aharoni": "Sví Ajaróni", "Isser Harel": "Íser Jarél", "Peter Malkin": "Píter Málkin", "El Al": "El Ál", "Ben-Gurion": "Ben Gurión", "Hannah Arendt": "Jána Árendt", "Josef Mengele": "Yósef Ménguele", "Mengele": "Ménguele", "Ramla": "Rámla", "Dakar": "Dakár", "Mercedes-Benz": "Mercedes Benz", "SS": "ese ese", "ONU": "ónu"}
G = [
 ('h1', 'El Mossad fue a ver la casa de Olivos y descartó la pista: era demasiado pobre para un alto jefe nazi.', 0.4),
 ('h2', 'Pero a fines de mil novecientos cincuenta y nueve, el dato volvió.', 0.6),
 ('c1', 'La familia se había mudado a la calle Garibaldi, en San Fernando, a una casa a nombre de Verónica Liebl de Fichmann. Una letra de diferencia.', 0.5),
 ('c2', 'A fines de febrero de mil novecientos sesenta llegó Zvi Aharoni, un investigador israelí, a vigilarlo.', 0.45),
 ('c3', 'El veintiuno de marzo hubo un festejo en la casa: las bodas de plata de Adolf y Vera Eichmann. La fecha coincidía. Era él.', 0.5),
 ('c4', 'El jefe del Mossad, Isser Harel, viajó en persona. Mandaron radios, binoculares, patentes falsas, esposas y maquillaje.', 0.45),
 ('c5', 'Once de mayo. Dos autos esperan en la calle Garibaldi. Uno, con el capó abierto, como si estuviera roto.', 0.45),
 ('c6', 'Eichmann siempre llegaba en el colectivo de las siete y cuarenta. Ese día no bajó. Casi suspenden todo.', 0.5),
 ('c7', 'A las ocho y cinco llegó el siguiente. Y bajó él.', 0.5),
 ('c8', 'El agente Peter Malkin le dijo: un momentito, señor. En veinte segundos estaba adentro del auto.', 0.45),
 ('c9', 'Ahí le buscaron las cicatrices que figuraban en su ficha. Era él.', 0.5),
 ('c10', 'Lo escondieron nueve días en una casa alquilada. Dijo sus números de las SS, y firmó que aceptaba ser juzgado en Israel.', 0.45),
 ('c11', 'Para sacarlo usaron una excusa perfecta: la Argentina festejaba ciento cincuenta años de la Revolución de Mayo, e Israel mandó una delegación en un avión de El Al.', 0.45),
 ('c12', 'El veinte de mayo lo drogaron, lo vistieron de tripulante y lo pasaron por Ezeiza como un empleado de la aerolínea que se había sentido mal.', 0.45),
 ('c13', 'A la medianoche despegaron. Escala en Dakar. El veintidós de mayo, Israel.', 0.5),
 ('c14', 'Al día siguiente, Ben-Gurion lo anunció en el Parlamento: Eichmann estaba en Israel.', 0.5),
 ('c15', 'En la parte tres: la furia de la Argentina, el juicio, y sus últimas palabras.', 0.3),
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
