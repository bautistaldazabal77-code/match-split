"""Guion del reel "Pasó de verdad" · O. J. Simpson, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"O. J. Simpson": "Óu Yei Símpson", "Nicole Brown Simpson": "Nicól Bráun Símpson", "Simpson": "Símpson", "Nicole": "Nicól", "Ron Goldman": "Ron Góldman", "Ron": "Ron", "Johnnie Cochran": "Yóni Cócran", "Mark Fuhrman": "Mark Fúrman", "Las Vegas": "Las Végas"}
G = [
 ('h1', 'El quince de junio de mil novecientos noventa y cinco, la fiscalía le pidió a O. J. Simpson que se probara el guante.', 0.4),
 ('h2', 'No le entraba.', 0.7),
 ('c1', 'El cuero se había mojado y secado varias veces, y él tenía puestos guantes de látex debajo. Pero la imagen ya estaba en todas las pantallas.', 0.45),
 ('c2', 'Su abogado, Johnnie Cochran, lo convirtió en una frase: si no le entra, tienen que absolverlo.', 0.5),
 ('c3', 'La defensa también mostró que uno de los detectives, Mark Fuhrman, había usado insultos racistas, y que había mentido sobre eso en el juicio.', 0.45),
 ('c4', 'Y sembró la duda: ¿y si la policía había plantado pruebas?', 0.55),
 ('c5', 'El tres de octubre de mil novecientos noventa y cinco, después de menos de cuatro horas de deliberación, llegó el veredicto.', 0.4),
 ('c6', 'Unos ciento cincuenta millones de personas lo vieron: no culpable.', 0.6),
 ('c7', 'Dos años después, en un juicio civil, otro jurado lo declaró responsable de las dos muertes, y lo condenó a pagar treinta y tres millones y medio de dólares.', 0.5),
 ('c8', 'Años más tarde apareció un libro suyo con un título difícil de olvidar: Si yo lo hubiera hecho.', 0.5),
 ('c9', 'En dos mil siete, en Las Vegas, entró con hombres armados a una habitación de hotel para recuperar recuerdos deportivos.', 0.45),
 ('c10', 'Esta vez sí lo condenaron: hasta treinta y tres años de prisión. Salió en libertad condicional en dos mil diecisiete.', 0.5),
 ('c11', 'Murió en abril de dos mil veinticuatro, de cáncer. Siempre negó haber matado a Nicole y a Ron.', 0.5),
 ('c12', '¿Lo salvó el guante, o todo lo demás? Te leo en los comentarios.', 0.3),
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
