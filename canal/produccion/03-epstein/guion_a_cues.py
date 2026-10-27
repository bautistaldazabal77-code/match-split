"""Arma cues.json del video largo de Epstein a partir del guion por bloques (correr en esta carpeta).
Las frases se separan con " | "; "~" al final deja una pausa larga. SAY tiene la escritura fonética de los nombres en inglés."""
import json, re
SAY = {'Jeffrey Epstein': 'Yéfri Épstin', 'Epstein': 'Épstin', 'Ghislaine Maxwell': 'Guilén Máxuel', 'Ghislaine': 'Guilén', 'Robert Maxwell': 'Róbert Máxuel',
       'Maxwell': 'Máxuel', 'Leslie Wexner': 'Lésli Uéxner', 'Wexner': 'Uéxner', "Victoria's Secret": 'Victórias Sícret', 'Bear Stearns': 'Ber Stérns',
       'Adnan Khashoggi': 'Adnán Jashógui', 'Steven Hoffenberg': 'Stíven Jófenberg', 'Hoffenberg': 'Jófenberg', 'Towers Financial': 'Táuers Fainánshal',
       'Brooklyn': 'Brúclin', 'Wall Street': 'Uol Strit', 'Donald Trump': 'Dónald Trámp', 'Trump': 'Trámp', 'Vanity Fair': 'Vániti Fér', 'Vicky Ward': 'Víki Uórd',
       'Ward': 'Uórd', 'Maria Farmer': 'María Fármer', 'Farmer': 'Fármer', 'Palm Beach': 'Pam Bich', 'Michael Reiter': 'Máikel Ráiter', 'Reiter': 'Ráiter',
       'Little Saint James': 'Lítel Séint Yéims', 'Bill Clinton': 'Bil Clínton', 'Clinton': 'Clínton', 'Virginia Giuffre': 'Virginia Yúfri', 'Giuffre': 'Yúfri',
       'Mar-a-Lago': 'Mar a Lágo', 'Miami Herald': 'Maiámi Jérald', 'Julie K. Brown': 'Yúli Kéi Bráun', 'Michael Baden': 'Máikel Béiden',
       'Roy Baumeister': 'Rói Báumaister', 'FBI': 'efebeí', 'Manhattan': 'Manjátan', 'Dalton': 'Dálton', 'Mossad': 'Mosád'}
B = [
 ('lead', 2.0),
 "El diez de agosto de dos mil diecinueve, en una cárcel federal de Nueva York, el preso más vigilado del país estaba solo en su celda.",
 "A su compañero lo habían trasladado el día anterior. | Los dos guardias que debían revisarlo cada media hora no lo hicieron. | Dos cámaras del pasillo no grabaron.",
 "A las seis y media de la mañana lo encontraron sin vida. ~",
 "Se llamaba Jeffrey Epstein. | Y esa noche fue el último capítulo de una historia que se repitió durante cuarenta años.",
 "Cada vez que cruzó un límite, alguien miró para otro lado. | Y cada vez que lo atraparon, salió casi sin castigo. | Vamos a contarlas, una por una.",
 "¿De dónde salió su fortuna? | ¿Por qué tantos poderosos lo rodeaban? | ¿Y qué hay, de verdad, en la famosa lista? ~",
 ('titulo', 5.0),
 ('cap1', 4.0),
 "Jeffrey Epstein nació en mil novecientos cincuenta y tres en Brooklyn, en una familia de clase media. | Su padre trabajaba en los parques de la ciudad. | Su madre, en una escuela.",
 "Sus compañeros lo recuerdan como un chico tranquilo, muy bueno en matemáticas. | Se salteó dos años y terminó la secundaria a los dieciséis. | Pasó por dos universidades. | No se recibió en ninguna.",
 "Y aun así, a los veintiún años, consiguió trabajo como profesor de matemáticas en la Dalton, una de las escuelas privadas más caras de Manhattan.",
 "Según exalumnos, prestaba una atención incómoda a las alumnas adolescentes. | Nadie hizo nada. ~",
 "Un padre de la escuela quedó impresionado con él y lo recomendó en Bear Stearns, uno de los grandes bancos de inversión de Wall Street. | En mil novecientos setenta y seis, la escuela lo dejó ir. | Y Wall Street lo recibió.",
 "En cuatro años ya era socio. | Su talento era tratar con clientes millonarios y encontrar formas de que pagaran menos impuestos.",
 "En mil novecientos ochenta y uno se fue del banco, en medio de una investigación interna por una operación irregular. | No hubo cargos. ~",
 "Fundó su propia consultora. | Decía que ayudaba a millonarios a recuperar dinero robado. | Entre sus clientes, según él mismo, estaba Adnan Khashoggi, un traficante de armas saudí que después aparecería en el escándalo Irán-Contra.",
 "Años más tarde, en su caja fuerte, encontrarían un pasaporte austríaco falso de los años ochenta, con su foto, otro nombre y una dirección en Arabia Saudita.",
 "Desde entonces circula una teoría: que Epstein trabajaba para un servicio de inteligencia. | Algunos periodistas lo vinculan con el Mossad israelí. | Nunca se presentó una prueba.",
 "En mil novecientos ochenta y siete se asoció con Steven Hoffenberg en Towers Financial. | Era una estafa piramidal. | Cuando se derrumbó, se habían perdido unos cuatrocientos sesenta millones de dólares. | Hoffenberg fue condenado a veinte años de cárcel.",
 "Epstein se había ido antes. | Nunca lo acusaron. ~",
 ('cap2', 4.0),
 "En mil novecientos ochenta y ocho fundó su propia firma. | Decía que solo aceptaba clientes con más de mil millones de dólares. | Hasta hoy se conoce uno solo: Leslie Wexner, el dueño de Victoria's Secret.",
 "En mil novecientos noventa y uno, Wexner le dio un poder legal sobre su fortuna. | Epstein podía firmar, comprar y vender en su nombre.",
 "Wexner le traspasó además una mansión de siete pisos en Manhattan, una de las casas privadas más grandes de la ciudad. | Años después, Wexner diría que Epstein se había quedado con más de cuarenta y seis millones de dólares suyos.",
 "Con ese dinero y esa casa, Epstein entró en otro mundo: aviones privados, desfiles, fiestas, políticos, millonarios, príncipes.",
 "En dos mil dos, Donald Trump lo describió así en una revista: | Es un tipo fantástico. | Se dice que le gustan las mujeres hermosas tanto como a mí, y muchas de ellas son bastante jóvenes. ~",
 "En esos años apareció la persona que lo cambiaría todo: Ghislaine Maxwell.",
 "Era hija de Robert Maxwell, un magnate de la prensa británica que murió en mil novecientos noventa y uno, al caer de su yate. | Después se descubrió que había robado cientos de millones de libras de los fondos de pensión de sus propios empleados.",
 "Ghislaine lo perdió todo. | Hasta que conoció a Epstein. | Fueron pareja, y después, socios. | Ella manejaba sus casas, sus fiestas y sus contactos.",
 ('cap3', 4.0),
 "Según los testimonios que después llegaron a los tribunales, desde los años noventa Epstein y Maxwell armaron un sistema para atraer a chicas.",
 "Buscaban a las más vulnerables: sin dinero, con problemas en casa, solas. | Les ofrecían trabajo o contactos en el mundo de la moda. | Les pagaban por masajes. | Y les pagaban más si traían a otras chicas.",
 "Muchas eran menores. | Algunas tenían catorce años. ~",
 "En mil novecientos noventa y seis, una artista que trabajaba para él, Maria Farmer, denunció ante la policía de Nueva York y ante el FBI que Epstein y Maxwell la habían agredido. | También denunció lo que le habían hecho a su hermana de dieciséis años.",
 "La denuncia no avanzó. ~",
 "Farmer contó algo más: que la casa de Manhattan estaba llena de cámaras, también en baños y dormitorios.",
 "De ahí nace la teoría más repetida del caso: que Epstein grababa a sus invitados para chantajearlos. | Es una teoría. | En dos mil veinticinco, el FBI dijo que no encontró pruebas de chantaje. | Muchos no le creyeron.",
 "En dos mil tres, la revista Vanity Fair preparó un perfil sobre él. | La periodista Vicky Ward entrevistó a las hermanas Farmer. | Pero cuando el artículo salió, sus testimonios no estaban. | Ward contó que Epstein presionó a la revista para que los sacaran. ~",
 ('cap4', 4.0),
 "En marzo de dos mil cinco, en Palm Beach, Florida, una mujer llamó a la policía. | Su hijastra de catorce años le había contado que un hombre rico le había pagado por un masaje en su mansión.",
 "La policía investigó durante más de un año. | Encontró decenas de chicas con historias parecidas.",
 "El jefe de policía, Michael Reiter, quería acusarlo de abuso de menores. | Pero el fiscal del estado llevó el caso a un gran jurado, que lo acusó de un solo delito: solicitar prostitución.",
 "Reiter pidió ayuda al FBI. | Los agentes identificaron a más de treinta víctimas y prepararon una acusación federal de cincuenta y tres páginas.",
 "Pero en dos mil siete, el fiscal federal de Miami, Alexander Acosta, firmó un acuerdo secreto con los abogados de Epstein.",
 "Epstein se declaraba culpable de dos delitos estatales. | A cambio, no habría juicio federal. | Ni para él, ni para ningún posible cómplice.",
 "A las víctimas no se lo dijeron. | Años después, un juez dictaminó que ese silencio violó la ley. ~",
 "La condena fue de dieciocho meses. | Cumplió trece, en una cárcel del condado. | Y tenía permiso para salir a su oficina doce horas por día, seis días por semana. ~",
 "Quedó registrado como delincuente sexual. | Y volvió a su vida: su avión, su mansión de Nueva York, su rancho en Nuevo México. | Y su isla.",
 ('cap5', 4.0),
 "Little Saint James. | Una isla privada de unas treinta hectáreas en las Islas Vírgenes de Estados Unidos, que Epstein compró en mil novecientos noventa y ocho.",
 "Sus invitados llegaban en su avión privado. | Los registros de vuelo, que hoy son públicos, muestran a pasajeros muy conocidos: el expresidente Bill Clinton, en viajes de su fundación en dos mil dos y dos mil tres; Donald Trump, en vuelos de los años noventa; actores, científicos, empresarios.",
 "Hay que decirlo claro: aparecer en un registro de vuelo no prueba ningún delito. | Clinton dijo que nunca pisó la isla. | Trump dijo que se alejó de Epstein y que lo echó de su club. | Ninguno de los dos fue acusado. ~",
 "La víctima que más hizo por exponer el caso fue Virginia Giuffre. | Contó que Maxwell la reclutó a los dieciséis años, en el club Mar-a-Lago, en Florida.",
 "Contó también que la obligaron a estar con el príncipe Andrés de Inglaterra. | Él siempre lo negó. | En dos mil veintidós llegaron a un acuerdo económico, sin que él admitiera nada.",
 ('cap6', 4.0),
 "Durante años, nada se movió. | Hasta que una periodista del Miami Herald, Julie K. Brown, salió a buscar a las víctimas de Palm Beach. | Encontró a unas ochenta. | Muchas nunca habían sido escuchadas.",
 "En noviembre de dos mil dieciocho publicó la serie Perversión de la justicia. | Y esta vez, el escándalo no se apagó. ~",
 "El seis de julio de dos mil diecinueve, Epstein aterrizó en Nueva Jersey en su avión privado, de vuelta de París. | Lo estaban esperando.",
 "Lo acusaron de tráfico sexual de menores. | Si lo condenaban, podía pasar el resto de su vida en la cárcel.",
 "En la caja fuerte de su mansión encontraron discos con fotos de desnudos, setenta mil dólares en efectivo, cuarenta y ocho diamantes y aquel pasaporte falso.",
 "Días después, Alexander Acosta, el fiscal del acuerdo de dos mil siete, que para entonces era secretario de Trabajo del gobierno de Trump, renunció. | Y el juez le negó la fianza a Epstein.",
 ('cap7', 4.0),
 "Epstein quedó preso en el Centro Correccional Metropolitano, en Manhattan.",
 "El veintitrés de julio lo encontraron en el piso de su celda con marcas en el cuello. | Lo pusieron bajo vigilancia por riesgo de suicidio. | Seis días después, se la quitaron.",
 "El ocho de agosto firmó un testamento. | El nueve de agosto trasladaron a su compañero de celda. | Nadie lo reemplazó.",
 "Esa noche, los dos guardias no hicieron las rondas. | Después se supo que habían falsificado los registros. | Y dos de las cámaras que apuntaban a su sector no grabaron.",
 "A las seis y media de la mañana lo encontraron sin vida. ~",
 "La médica forense de Nueva York concluyó que se había ahorcado. | Pero el patólogo Michael Baden, contratado por el hermano de Epstein, dijo que las fracturas del cuello se parecían más a una estrangulación.",
 "En dos mil veintitrés, el inspector general del Departamento de Justicia confirmó el suicidio, pero describió una cadena de negligencias.",
 "Y en dos mil veinticinco, el FBI publicó el video del pasillo para cerrar las dudas. | Al video le faltaba un minuto, justo antes de la medianoche. | El gobierno dijo que era un corte técnico que se repetía todas las noches.",
 "Para muchos, no cerró nada. ~",
 ('cap8', 4.0),
 "Con Epstein muerto, no hubo juicio. | Pero quedaba Ghislaine Maxwell.",
 "La detuvieron en dos mil veinte. | En dos mil veintiuno, un jurado la declaró culpable de tráfico sexual de menores. | La condenaron a veinte años. | Es la única otra persona condenada por la red de Epstein.",
 "Y entonces empezó la pregunta que lleva años sin respuesta: si había una red, ¿dónde están los demás? ~",
 "En julio de dos mil veinticinco, el Departamento de Justicia anunció que no existía ninguna lista de clientes. | La reacción fue tan grande que el Congreso aprobó, casi por unanimidad, una ley para obligar a publicar todos los archivos.",
 "En enero de dos mil veintiséis se publicaron más de tres millones de páginas, dos mil videos y ciento ochenta mil imágenes.",
 "Aparecen cientos de nombres: políticos, millonarios, científicos, príncipes. | Pero aparecer en esos archivos no significa haber cometido un delito. | Muchos son contactos, correos, invitaciones.",
 "Virginia Giuffre no llegó a verlo. | Murió en abril de dos mil veinticinco. | Meses después se publicaron sus memorias, y días más tarde el rey Carlos tercero le quitó a su hermano Andrés el título de príncipe.",
 "A Maxwell, en cambio, la trasladaron a una cárcel de mínima seguridad. ~",
 ('epi', 4.0),
 "Es fácil pensar que Epstein era un monstruo, distinto de todos nosotros. | Es más cómodo.",
 "Pero el psicólogo Roy Baumeister, que estudió durante años la crueldad humana, sostiene algo más incómodo: casi nadie se ve a sí mismo como malvado, y el daño suele crecer de a poco, cuando cruzar un límite no tiene costo.",
 "Epstein cruzó un límite, y no pasó nada. | Cruzó otro, y lo premiaron. | Y aprendió que, con dinero y contactos, las reglas eran para los demás. ~",
 "Su historia no habla solo de un hombre. | Habla de todos los que vieron algo y eligieron callar. | Las víctimas tardaron más de veinte años en ser escuchadas. ~",
 "¿Creés que algún día se va a saber toda la verdad? | Te leo en los comentarios.",
 ('outro', 6.0),
]
claves = sorted(SAY, key=len, reverse=True)
def decir(f):
    # reemplaza de la clave más larga a la más corta, sin volver a tocar lo ya reemplazado
    out, i = '', 0
    while i < len(f):
        for k in claves:
            if f.startswith(k, i) and (i == 0 or not f[i - 1].isalpha()):
                out += SAY[k]; i += len(k); break
        else:
            out += f[i]; i += 1
    return out
cues, n = [], 0
for b in B:
    if isinstance(b, tuple): cues.append({'id': b[0], 'silence': b[1]}); continue
    larga = b.endswith('~'); fr = [f.strip() for f in b.rstrip('~ ').split('|')]
    for i, f in enumerate(fr):
        n += 1; c = {'id': f'c{n}', 'text': f, 'pause': 0.42}
        if i == len(fr) - 1: c['pause'] = 1.9 if larga else 0.95
        s = decir(f)
        if s != f: c['say'] = s
        cues.append(c)
json.dump(cues, open('cues.json', 'w'), ensure_ascii=False, indent=1)
print(len(cues), 'líneas,', sum(len(c['text'].split()) for c in cues if 'text' in c), 'palabras')
