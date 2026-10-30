# Anuncios de ACE Al Día

Todo listo para cargar en el Administrador de anuncios de Meta (Instagram y Facebook) y en LinkedIn. Las imágenes están en `anuncios/imagenes/`:

- **Feed:** archivos `*-feed.png`, de 1080 × 1350.
- **Historias y reels:** archivos `*-story.png`, de 1080 × 1920.

Se regeneran con `node anuncios/generar.js`. Cambiá `acealdia.com.ar` por tu dominio real en `anuncios/plantilla.html` antes de regenerarlas.

## Objetivo de la primera campaña: medir demanda

La pregunta es **qué profesión y qué herramienta pide más la gente, y cuánto cuesta cada anotado**. Por eso hay un anuncio por profesión con el mismo presupuesto, y el panel muestra cuántos anotados trae cada uno.

**Estructura en Meta.** Objetivo **Clientes potenciales** con conversión en el sitio web, usando el evento **Lead** del píxel. Si todavía no tenés el píxel, usá el objetivo **Tráfico**.

| Conjunto de anuncios | Público sugerido | Anuncio |
|---|---|---|
| Abogados | Argentina, 25 a 65 años. Intereses: Derecho, Abogacía, Colegio de Abogados, Poder Judicial | abogados-feed / abogados-story |
| Contadores | Argentina, 25 a 65 años. Intereses: Contabilidad, Contador público, Impuestos, AFIP/ARCA | contadores-feed / contadores-story |
| Escribanos | Argentina, 28 a 70 años. Intereses: Escribanía, Notariado, Derecho inmobiliario | escribanos-feed / escribanos-story |
| General (remarketing) | Personas que visitaron la web y no se anotaron (público personalizado del píxel) | general-feed / general-story |

**LinkedIn** permite segmentar por cargo ("abogado", "contador público", "escribano"). Es más caro por clic, pero más preciso: probalo con un presupuesto chico.

**Cómo leer los resultados.** Dejá correr la campaña al menos 5 a 7 días antes de sacar conclusiones. En el panel, mirá **anotados por anuncio** y la **demanda por herramienta**. La profesión con más anotados por peso invertido es la que conviene construir primero.

## Links con seguimiento (UTM)

Usá estos links en cada anuncio, así el panel sabe de dónde viene cada anotado. Reemplazá `https://acealdia.com.ar/` por tu dominio.

| Anuncio | Link |
|---|---|
| Abogados · feed | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=abogados-feed#abogados` |
| Abogados · historia | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=abogados-story#abogados` |
| Contadores · feed | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=contadores-feed#contadores` |
| Contadores · historia | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=contadores-story#contadores` |
| Escribanos · feed | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=escribanos-feed#escribanos` |
| Escribanos · historia | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=lanzamiento&utm_content=escribanos-story#escribanos` |
| General · remarketing | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=paid&utm_campaign=remarketing&utm_content=general` |
| LinkedIn | `https://acealdia.com.ar/?utm_source=linkedin&utm_medium=paid&utm_campaign=lanzamiento&utm_content=linkedin-estudios` |
| Bio de Instagram | `https://acealdia.com.ar/?utm_source=instagram&utm_medium=bio` |
| WhatsApp (grupos, contactos) | `https://acealdia.com.ar/?utm_source=whatsapp&utm_medium=referido` |

En Meta, si el anuncio corre en Instagram y en Facebook, podés poner `utm_source={{site_source_name}}` y Meta completa la red sola.

## Textos

### Abogados
- **Texto principal:** ¿Cuántas veces contaste los días hábiles con el almanaque al lado? Cargás la notificación y el plazo, y ACE calcula el vencimiento con feriados, días no laborables y ferias. Gratis, sin registrarte.
- **Título:** ¿Cuándo vence? Calculalo en 5 segundos.
- **Descripción:** Vencimientos y liquidaciones para abogados.
- **Botón:** Más información.

### Contadores
- **Texto principal:** Tus clientes te mandan fotos de facturas por WhatsApp y vos pasás horas copiando CUIT e importes. Subís la foto o el PDF: ACE lee el QR de ARCA, verifica el CUIT y la ordena por cliente y por mes. Probalo gratis.
- **Título:** Basta de tipear facturas.
- **Descripción:** Comprobantes y documentación, al día.
- **Botón:** Más información.

### Escribanos
- **Texto principal:** El estudio de títulos, en minutos: cargás los antecedentes y ACE arma la cadena de dominio y marca lo que hay que mirar dos veces. Y el borrador de la escritura sale con los datos del DNI, sin errores de tipeo.
- **Título:** El estudio de títulos, en minutos.
- **Descripción:** Herramientas para escribanías.
- **Botón:** Más información.

### General (remarketing)
- **Texto principal:** Vencimientos, facturas, títulos y escrituras: ACE hace el trabajo de escritorio y vos revisás y firmás. Anotate para el lanzamiento y accedé al precio de fundador.
- **Título:** Que en el estudio nada se te pase.
- **Botón:** Registrarte.

## Antes de pautar

- [ ] Web publicada con dominio propio y la imagen para compartir con su URL definitiva (`og:image` en `web/index.html`).
- [ ] `ENDPOINT` de la planilla configurado, con un anotado de prueba que llegue (ver `medicion/INSTALAR.md`).
- [ ] Píxel de Meta y Clarity configurados.
- [ ] Política de privacidad completa (`web/privacidad.html`, con tus datos).
- [ ] Revisar que los textos de los anuncios cumplan las políticas de publicidad de Meta: no prometer resultados ni usar datos personales de la audiencia.
