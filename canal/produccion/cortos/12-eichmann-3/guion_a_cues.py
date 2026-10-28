"""Guion del reel "Pasó de verdad" · Adolf Eichmann, parte 3 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Adolf Eichmann": "Adolf Áijman", "Eichmann": "Áijman", "Ricardo Klement": "Ricardo Klément", "Klement": "Klément", "Wannsee": "Vánsei", "Auschwitz": "Áushvits", "Gestapo": "Guestápo", "Otto Eckmann": "Oto Ékman", "Lothar Hermann": "Lótar Hérman", "Hermann": "Hérman", "Fritz Bauer": "Frits Báuer", "Bauer": "Báuer", "Mossad": "Mosád", "Liebl de Fichmann": "Líbel de Fíjman", "Zvi Aharoni": "Sví Ajaróni", "Isser Harel": "Íser Jarél", "Peter Malkin": "Píter Málkin", "El Al": "El Ál", "Ben-Gurion": "Ben Gurión", "Hannah Arendt": "Jána Árendt", "Josef Mengele": "Yósef Ménguele", "Mengele": "Ménguele", "Ramla": "Rámla", "Dakar": "Dakár", "Mercedes-Benz": "Mercedes Benz", "SS": "ese ese", "ONU": "ónu"}
G = [
 ('h1', 'El veintitrés de mayo de mil novecientos sesenta, el mundo se enteró: Adolf Eichmann estaba preso en Israel.', 0.4),
 ('h2', 'Y la Argentina estalló.', 0.6),
 ('c1', 'Dijo que Israel había violado su soberanía: habían secuestrado a un hombre en territorio argentino.', 0.45),
 ('c2', 'Israel habló de voluntarios y expresó su pesar. La Argentina llevó el caso a la ONU.', 0.45),
 ('c3', 'El veintitrés de junio, el Consejo de Seguridad le pidió a Israel una reparación adecuada.', 0.45),
 ('c4', 'En julio, la Argentina expulsó al embajador israelí. En agosto, los dos gobiernos dieron el conflicto por terminado.', 0.5),
 ('c5', 'El once de abril de mil novecientos sesenta y uno empezó el juicio, en Jerusalén. Eichmann declaró dentro de una cabina de vidrio blindado.', 0.45),
 ('c6', 'El fiscal dijo que no estaba solo: a su lado había seis millones de acusadores.', 0.5),
 ('c7', 'Declararon ciento doce testigos. Uno de ellos, sobreviviente de Auschwitz, se desmayó frente al tribunal.', 0.5),
 ('c8', 'Eichmann se defendió siempre igual: dijo que solo cumplía órdenes.', 0.5),
 ('c9', 'La filósofa Hannah Arendt, que cubrió el juicio, lo vio como un burócrata común. De ahí salió su idea más famosa: la banalidad del mal.', 0.5),
 ('c10', 'El quince de diciembre lo condenaron a muerte. Es la única ejecución ordenada por un tribunal civil en la historia de Israel.', 0.45),
 ('c11', 'Lo ahorcaron en la cárcel de Ramla, pasada la medianoche del primero de junio de mil novecientos sesenta y dos.', 0.45),
 ('c12', 'Entre sus últimas palabras dijo: viva Alemania, viva Argentina, viva Austria.', 0.6),
 ('c13', 'Cremaron su cuerpo y tiraron las cenizas al mar, fuera de las aguas de Israel. No tiene tumba.', 0.6),
 ('c14', 'En esos mismos días, el Mossad también buscó en Buenos Aires a Josef Mengele, el médico de Auschwitz. No lo atraparon.', 0.45),
 ('c15', 'Mengele escapó a Paraguay y a Brasil, y murió en mil novecientos setenta y nueve, sin ser juzgado.', 0.5),
 ('c16', '¿La Argentina tenía razón en reclamar, o Israel hizo justicia? Te leo en los comentarios.', 0.3),
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
