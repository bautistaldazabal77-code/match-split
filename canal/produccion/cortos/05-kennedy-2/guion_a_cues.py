"""Guion del reel "Pasó de verdad" · Kennedy, parte 2 → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {"John F. Kennedy": "Yon Ef Kénedi", "Kennedy": "Kénedi", "Lee Harvey Oswald": "Li Járvi Ósuald", "Oswald": "Ósuald", "Edwin Walker": "Édwin Uóker", "Dallas": "Dálas", "Parkland": "Párkland", "J. D. Tippit": "Yei Di Típit", "Jack Ruby": "Yac Rúbi", "Ruby": "Rúbi", "Earl Warren": "Erl Uórren", "John Connally": "Yon Cónali", "Connally": "Cónali", "CIA": "Sía", "Elm": "Elm"}
G = [
 ('h1', 'El veinticuatro de noviembre de mil novecientos sesenta y tres, la policía de Dallas trasladaba a Lee Harvey Oswald frente a las cámaras de televisión.', 0.35),
 ('h2', 'Un hombre salió de entre los periodistas y le disparó en el estómago.', 0.6),
 ('c1', 'Se llamaba Jack Ruby. Tenía un club nocturno en Dallas. Dijo que lo hizo para ahorrarle a la viuda de Kennedy el dolor de un juicio.', 0.45),
 ('c2', 'Oswald murió en el mismo hospital que Kennedy. Nunca hubo juicio.', 0.6),
 ('c3', 'Una comisión presidida por el juez Earl Warren concluyó en mil novecientos sesenta y cuatro que Oswald actuó solo.', 0.45),
 ('c4', 'Pero para eso, una sola bala tenía que haber atravesado a Kennedy y herido cuatro veces al gobernador John Connally.', 0.4),
 ('c5', 'Esa bala apareció casi intacta en una camilla del hospital. Los críticos la llamaron la bala mágica.', 0.55),
 ('c6', 'Oswald también dijo que la foto del patio era un montaje. Un análisis de las sombras concluyó después que es auténtica.', 0.5),
 ('c7', 'En mil novecientos setenta y nueve, un comité del Congreso dijo lo contrario: que probablemente hubo una conspiración.', 0.4),
 ('c8', 'Se basaba en una grabación de la policía. Otro estudio concluyó después que esos sonidos no eran disparos.', 0.5),
 ('c9', 'Las teorías nunca pararon: la mafia, la CIA, la Unión Soviética. Ninguna se pudo probar.', 0.45),
 ('c10', 'Entre dos mil diecisiete y dos mil veinticinco, el gobierno publicó cientos de miles de páginas secretas. No apareció la prueba de un segundo tirador.', 0.45),
 ('c11', 'Aun así, según las encuestas, la mayoría de los estadounidenses cree que Oswald no actuó solo.', 0.5),
 ('c12', '¿Vos qué creés? ¿Actuó solo, o fue parte de algo más grande? Te leo en los comentarios.', 0.3),
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
