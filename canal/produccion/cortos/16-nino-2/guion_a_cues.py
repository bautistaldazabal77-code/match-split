"""Guion del reel "¿Y si…?" · El Niño llega a su pico, parte 2 (ficción con datos reales) → cues.json. Correr dentro de la carpeta del reel.
Cada línea es un cue (id, texto, pausa). SAY tiene la escritura fonética de las palabras que la voz lee mal."""
import json
SAY = {"OMM": "o eme eme"}
G = [
 ('h1', 'El Paraná podría pasar los seis metros en Rosario, y Elsa no se quiere ir de su isla. ¿Cómo termina?', 0.45),
 ('h2', 'Parte dos. Ficción, con datos reales.', 0.6),
 ('c1', 'Día diecisiete. Prefectura saca a las familias de las islas en lancha. Elsa sube a la última, con el perro y una bolsa con sus papeles.', 0.5),
 ('c2', 'Dato real: gran parte de Rosario está arriba de una barranca, varios metros sobre el río. Lo primero que se inunda son las islas y la costa baja.', 0.45),
 ('c3', 'Por eso el golpe más grande no es en la ciudad. Es en el río.', 0.5),
 ('c4', 'Dato real: por los puertos del Gran Rosario sale cerca del setenta y cinco por ciento de los granos, harinas y aceites que exporta la Argentina.', 0.5),
 ('c5', 'Día veinte. Con el río así, los barcos cargan más lento, y la terminal de Bruno trabaja a media máquina.', 0.45),
 ('c6', 'Día veintidós. En el tramo de islas, el agua llega al borde de la ruta que une Rosario con Victoria. La cortan por precaución.', 0.5),
 ('c7', 'Día veinticuatro. El río marca seis metros con diez. Es el pico. Todo el Litoral mira el mismo número.', 0.55),
 ('c8', 'Y entonces, por primera vez en un mes, el número baja. Seis metros. Cinco con ochenta. Cinco con cincuenta.', 0.5),
 ('c9', 'Día cincuenta. El río vuelve a estar por debajo de la alerta. Elsa vuelve a su casa. Hay barro hasta las rodillas, pero la casa sigue en pie.', 0.5),
 ('c10', 'En el poste de la entrada hay una marca vieja: la del ochenta y tres. Elsa hace una nueva, al lado, y escribe: dos mil veintisiete.', 0.6),
 ('c11', 'Esta historia es ficción. El tres coma ocho del pronóstico, no.', 0.5),
 ('c12', 'Si vivís cerca del río, seguí los avisos oficiales. Y contame: ¿vos te ibas o te quedabas?', 0.3),
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
