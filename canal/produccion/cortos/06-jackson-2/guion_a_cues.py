"""Guion del reel "Pasó de verdad" · Michael Jackson, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"Michael Jackson": "Máikel Yákson", "Jackson Five": "Yákson Fáiv", "Jackson": "Yákson", "Michael": "Máikel", "Gary": "Gári", "Joe": "Yóu", "Thriller": "Tríler", "Grammy": "Grámi", "Neverland": "Néverland", "Peter Pan": "Píter Pan", "Conrad Murray": "Cónrad Múrrei", "Murray": "Múrrei"}
G = [
 ('h1', 'En agosto de mil novecientos noventa y tres, un chico de trece años acusó a Michael Jackson de abuso.', 0.35),
 ('h2', 'Él lo negó. La policía registró Neverland. No hubo cargos.', 0.6),
 ('c1', 'Al año siguiente, pagó un acuerdo millonario a la familia, sin admitir culpa. Dijo que lo hizo para terminar con el circo.', 0.5),
 ('c2', 'En dos mil tres, en un documental, dijo que compartía su cama con niños, y que no había nada sexual.', 0.45),
 ('c3', 'Meses después, la familia de otro chico lo denunció. Lo arrestaron y lo acusaron de abuso.', 0.45),
 ('c4', 'En dos mil cinco, el juicio duró más de tres meses. El jurado lo declaró no culpable de los catorce cargos.', 0.6),
 ('c5', 'Lo absolvieron. Pero nunca volvió a ser el mismo. Se fue de Estados Unidos y casi no volvió a cantar en vivo.', 0.5),
 ('c6', 'En dos mil nueve anunció cincuenta conciertos en Londres. Tenía cincuenta años y una deuda enorme.', 0.4),
 ('c7', 'No podía dormir. Su médico personal, Conrad Murray, le daba propofol, un anestésico que se usa en los quirófanos.', 0.45),
 ('c8', 'El veinticinco de junio de dos mil nueve, después de una noche sin dormir, Murray le dio una dosis más y salió de la habitación.', 0.5),
 ('c9', 'Cuando volvió, Michael no respiraba. Murió a los cincuenta años.', 0.7),
 ('c10', 'En dos mil once, Murray fue condenado por homicidio involuntario. Pasó menos de dos años en la cárcel.', 0.5),
 ('c11', 'En dos mil diecinueve, dos hombres lo acusaron en un documental. Su familia lo niega. Nunca hubo una condena.', 0.5),
 ('c12', 'Para unos, un genio que fue víctima de todos. Para otros, alguien que nunca rindió cuentas.', 0.5),
 ('c13', '¿Y vos qué pensás? Te leo en los comentarios.', 0.3),
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
