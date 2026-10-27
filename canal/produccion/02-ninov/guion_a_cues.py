"""Arma cues.json del video largo a partir del guion por bloques (correr en esta carpeta: python3 guion_a_cues.py).
Cada bloque es un párrafo: las frases se separan con " | "; "~" al final de un párrafo deja una pausa larga ([pausa] del guion).
Las placas de capítulo son silencios. SAY tiene la escritura fonética de los nombres que la voz lee mal."""
import json
SAY = {'GSI': 'ge ese i', 'Smolańczuk': 'Smolánchuk', 'Darleane Hoffman': 'Darlín Jófman', 'Albert Ghiorso': 'Álbert Guiórso',
       'Physical Review Letters': 'Físical Rivíu Léters', 'RIKEN': 'Ríken', 'GANIL': 'Ganíl', 'Rochus Vogt': 'Rójus Fogt',
       'Lawrence Livermore': 'Lórens Lívermor', 'Lawrence Berkeley': 'Lórens Bérkli'}
B = [
 ('lead', 2.0),
 "El siete de junio de mil novecientos noventa y nueve, un laboratorio de Estados Unidos anunció que había creado algo que nunca había existido en la Tierra. | Dos elementos químicos nuevos. | El ciento dieciséis, y el ciento dieciocho.",
 "Los había fabricado chocando átomos a una velocidad enorme, en un acelerador de partículas en California. | Las revistas de ciencia lo celebraron. | Los libros de texto se preparaban para cambiar.",
 "El primer autor del trabajo era un físico de casi cuarenta años, uno de los mejores cazadores de elementos del mundo. | Se llamaba Victor Ninov. ~",
 "Dos años después, el mismo laboratorio tuvo que admitir algo que nunca le había pasado a ningún laboratorio de su tipo. | Esos átomos no existieron nunca. | Y cuando revisaron los datos originales, descubrieron que la prueba tampoco estaba ahí.",
 "Esta es la historia de cómo un científico brillante intentó agregar dos casillas a la tabla periódica. | Y de por qué no pudo. ~",
 ('titulo', 5.5),
 ('cap1', 4.0),
 "En la naturaleza hay unos noventa elementos. | Del hidrógeno, el más liviano, al uranio, el más pesado que se encuentra en cantidad en la Tierra. | Todo lo que está después del uranio hubo que fabricarlo.",
 "La receta es simple de explicar, y muy difícil de hacer. | Se toma un átomo pesado, se le dispara otro átomo a una velocidad enorme, y se espera que, en algún choque entre billones, los dos núcleos se fundan en uno solo.",
 "Si se funden, el número de protones se suma. | Y el número de protones es lo que define a un elemento.",
 "Pero estos núcleos gigantes son inestables. | Viven milésimas de segundo, y se desarman. | Cada vez que pierden un pedazo, una partícula alfa, bajan dos casillas en la tabla.",
 "Esa escalera de caídas, una detrás de otra, es la huella digital del elemento. | Nadie ve el átomo. | Lo que se ve es la cadena de desintegraciones que deja en un detector, con su posición y su tiempo exactos. ~",
 "Durante el siglo veinte, la caza de elementos fue una carrera entre tres lugares. | Berkeley, en California. | Dubna, en la Unión Soviética. | Y Darmstadt, en Alemania, donde funciona un centro de investigación llamado GSI.",
 "En GSI, entre mil novecientos noventa y cuatro y mil novecientos noventa y seis, un equipo creó los elementos ciento diez, ciento once y ciento doce.",
 "En ese equipo había un joven físico búlgaro. | Su especialidad era un aparato llamado separador de gas: un filtro que, de todo lo que sale de un choque, deja pasar solo a los átomos pesados que interesan. | Era Victor Ninov.",
 "Además de saber construir el filtro, Ninov dominaba el programa con el que se analizaban los datos. | Un programa complicado, que muy pocos sabían usar.",
 "A mediados de los noventa, el Laboratorio Nacional Lawrence Berkeley lo contrató. | Berkeley quería volver a la carrera de los elementos. | Y Ninov era exactamente lo que necesitaba.",
 ('cap2', 4.0),
 "Para fabricar elementos cada vez más pesados, los físicos tenían un problema. | Cuanto más arriba en la tabla, menos probable es que el choque funcione. | Para los últimos elementos que se habían descubierto, hacían falta semanas de choques continuos para conseguir uno o dos átomos.",
 "Y entonces llegó a Berkeley un teórico polaco, Robert Smolańczuk, con un cálculo sorprendente. | Según su cálculo, si se disparaba criptón contra plomo, la probabilidad de crear el elemento ciento dieciocho era mucho más alta de lo que todo el mundo pensaba.",
 "El criptón tiene treinta y seis protones. | El plomo, ochenta y dos. | Juntos, ciento dieciocho.",
 "Era una idea polémica. | Muchos colegas no la creían. | Pero en Berkeley decidieron probarla. | Tenían un acelerador capaz de producir un haz intenso de criptón, y un separador de gas recién instalado. | El experto en ese separador era Ninov.",
 "En la primavera de mil novecientos noventa y nueve empezó el experimento. | El acelerador disparaba unos dos billones de átomos de criptón por segundo contra láminas finísimas de plomo. | Así, durante once días. ~",
 "Y Ninov encontró algo. | Tres cadenas. | En cada una, un átomo pesado que se clavaba en el detector y, después, seis desintegraciones seguidas, en menos de un segundo. | Justo lo que se esperaba del elemento ciento dieciocho. | Y en el camino, como un escalón de la cadena, el elemento ciento dieciséis.",
 "Tres átomos de un elemento que nadie había visto jamás. | Casi exactamente como había predicho Smolańczuk.",
 ('cap3', 4.0),
 "Hay una idea que obsesiona a los físicos desde hace décadas: la isla de estabilidad. | La teoría dice que, más allá de la zona de los elementos que se desarman en un instante, podría haber una región de núcleos más estables, que vivan mucho más. | Algunos sueñan con que duren minutos, días, o incluso años.",
 "El resultado de Berkeley parecía mostrar que esa isla existía, y que se podía llegar.",
 "El anuncio fue un acontecimiento. | Ninov, primer autor del trabajo, lo resumió con una frase que salió en todos lados: | Saltamos por encima de un mar de inestabilidad, hasta una isla de estabilidad.",
 "Darleane Hoffman, una de las grandes químicas de los elementos pesados, dijo que después de treinta años de búsqueda, el descubrimiento era enormemente gratificante. | Y Albert Ghiorso, una leyenda que había participado en el descubrimiento de doce elementos, veía en Ninov a una versión más joven de sí mismo.",
 "El trabajo se publicó en agosto en Physical Review Letters, una de las revistas de física más importantes del mundo. | Ninov empezó a dar charlas en otros laboratorios.",
 "Solo faltaba una cosa. | La que siempre falta en ciencia. | Que alguien más lo repitiera.",
 ('cap4', 4.0),
 "Ese mismo año, el equipo de GSI en Darmstadt, el lugar donde se había formado Ninov, intentó reproducir el experimento. | No encontró nada. | En Japón, el instituto RIKEN tampoco. | En Francia, el laboratorio GANIL tampoco.",
 "Al principio no era tan raro. | Fabricar un átomo así es dificilísimo, y cualquier diferencia en el haz o en el detector puede cambiar el resultado.",
 "Pero en el año dos mil, el propio equipo de Berkeley repitió el experimento, con el mismo acelerador y el mismo método. | Y tampoco encontró nada. ~",
 "Revisaron el equipo. | Cambiaron detalles. | Siguieron midiendo.",
 "En abril de dos mil uno hicieron otra corrida. | Y esta vez, el programa de análisis de Ninov encontró una nueva cadena del elemento ciento dieciocho.",
 "Pero esta vez pasó algo distinto. | Otros miembros del equipo ya habían escrito sus propios programas para leer los datos. | Y cuando buscaron esa cadena en el mismo archivo, | no estaba.",
 ('cap5', 4.0),
 "Si la cadena de dos mil uno no aparecía en los datos, había que hacer una pregunta incómoda. | ¿Qué pasaba con las de mil novecientos noventa y nueve?",
 "En mil novecientos noventa y nueve, Ninov había sido el único del equipo que trabajó directamente con los datos en bruto. | Los demás habían confiado en su análisis.",
 "Un grupo coordinado por Darleane Hoffman volvió a los archivos originales de mil novecientos noventa y nueve, los que salieron del detector durante esos once días. | Los leyeron con otros programas, evento por evento.",
 "Las tres cadenas no estaban. | No eran dudosas, ni estaban mal interpretadas. | No estaban. | En los datos que había registrado el detector no había ningún rastro del elemento ciento dieciocho. | Tampoco del ciento dieciséis.",
 "El veintisiete de julio de dos mil uno, Berkeley retiró el descubrimiento. | El equipo escribió que, después de volver a analizar los datos primarios, había llegado a una conclusión: las tres cadenas no estaban en los datos de mil novecientos noventa y nueve.",
 "Ninov pidió que su nombre no figurara en esa retractación. | Por eso la revista recién publicó una nota editorial un año después. ~",
 "Ahora la pregunta ya no era si el elemento existía. | Era otra. | Si las cadenas no estaban en los datos, ¿de dónde habían salido?",
 ('cap6', 4.0),
 "El laboratorio armó primero un comité técnico, que trabajó unos cuatro meses. | Después, en noviembre de dos mil uno, un comité formal de investigación, presidido por el físico Rochus Vogt, del Instituto de Tecnología de California.",
 "En marzo de dos mil dos, el comité entregó su informe. | Encontró, dice el informe, evidencia clara y convincente de que los datos de mil novecientos noventa y nueve habían sido fabricados. | Y concluyó que el responsable era Victor Ninov.",
 "El informe también criticó al resto del equipo, por no haber tenido a nadie más que revisara los datos originales.",
 "En mayo de dos mil dos, Berkeley despidió a Ninov.",
 "Él nunca aceptó la acusación. | Escribió que en ningún momento había participado, a sabiendas, en ninguna forma de tergiversación de datos, ni de mala conducta científica. | Inició un reclamo formal contra el despido. | Y dijo una frase que resume cómo vivió todo esto: | Una vez que te marcan como falsificador, empieza la avalancha. ~",
 "Porque mientras tanto, en Darmstadt, el equipo de GSI había hecho algo que nadie le había pedido. | Revisó los datos de sus propios descubrimientos, de mil novecientos noventa y cuatro a mil novecientos noventa y seis.",
 "Eran treinta y cuatro cadenas. | Dos no aparecían en los datos: una del elemento ciento diez, de mil novecientos noventa y cuatro, y una del ciento doce, de mil novecientos noventa y seis. | Los investigadores descartaron que fuera un error simple. | Eran análisis en los que había trabajado Ninov.",
 "Los descubrimientos de Darmstadt se mantuvieron, porque las demás cadenas eran reales y alcanzaban para probarlos. | Pero dos de las pruebas no estaban en los datos.",
 ('epi', 4.0),
 "Los elementos ciento dieciséis y ciento dieciocho existen. | Los crearon, de verdad, en Dubna, un equipo ruso junto a científicos del Laboratorio Nacional Lawrence Livermore, de Estados Unidos. | El ciento dieciséis, en el año dos mil. | El ciento dieciocho, en experimentos de dos mil dos y dos mil cinco, anunciados en dos mil seis.",
 "Hoy se llaman livermorio y oganesón. | Y no se hicieron con la receta de criptón y plomo, sino con otra. ~",
 "El caso cambió las reglas. | La Sociedad Estadounidense de Física pidió más formación en ética, y que cada coautor de un trabajo pueda responder por la parte que firma. | Nunca más un descubrimiento debería depender de una sola persona, y de un programa que solo esa persona entiende.",
 "Ninov siempre sostuvo que es inocente.",
 "La ciencia tiene una regla que no se puede esquivar. | Un resultado no vale porque lo diga alguien prestigioso, ni porque salga en una revista importante. | Vale si otro, en otro lugar, con otros aparatos, puede volver a verlo.",
 "Victor Ninov anunció dos elementos que nadie más pudo ver. | Y la tabla periódica, al final, se completó sin él. ~",
 ('outro', 6.0),
]
cues, n = [], 0
for b in B:
    if isinstance(b, tuple): cues.append({'id': b[0], 'silence': b[1]}); continue
    larga = b.endswith('~'); fr = [f.strip() for f in b.rstrip('~ ').split('|')]
    for i, f in enumerate(fr):
        n += 1; c = {'id': f'c{n}', 'text': f, 'pause': 0.42}
        if i == len(fr) - 1: c['pause'] = 1.9 if larga else 0.95
        say = f
        for k, v in SAY.items(): say = say.replace(k, v)
        if say != f: c['say'] = say
        cues.append(c)
json.dump(cues, open('cues.json', 'w'), ensure_ascii=False, indent=1)
pal = sum(len(c['text'].split()) for c in cues if 'text' in c)
print(len(cues), 'líneas,', pal, 'palabras')
