"""Genera archivos de prueba con datos inventados: una factura A en PDF con el QR de ARCA, la foto del QR suelto y un DNI ficticio con su código PDF417.
Uso: python3 generar_ejemplos.py  (necesita reportlab, qrcode, pdf417gen y Pillow)"""
import base64, json, pathlib
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
import qrcode
import pdf417gen
from PIL import Image, ImageDraw, ImageFont

OUT = pathlib.Path(__file__).parent / 'ejemplos'
def cuit(base):
    w = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]; v = 11 - sum(a * int(b) for a, b in zip(w, base)) % 11
    return base + str(0 if v == 11 else v)
EMISOR, CLIENTE = cuit('3071234567'), cuit('2733445566')
datos = {'ver': 1, 'fecha': '2026-10-14', 'cuit': int(EMISOR), 'ptoVta': 4, 'tipoCmp': 1, 'nroCmp': 12873, 'importe': 220704.00, 'moneda': 'PES', 'ctz': 1,
         'tipoDocRec': 80, 'nroDocRec': int(CLIENTE), 'tipoCodAut': 'E', 'codAut': 76123456789012}
url = 'https://www.afip.gob.ar/fe/qr/?p=' + base64.b64encode(json.dumps(datos).encode()).decode()

def dib_qr(tam):
    w = qr.QrCodeWidget(url); b = w.getBounds(); d = Drawing(tam, tam, transform=[tam / (b[2] - b[0]), 0, 0, tam / (b[3] - b[1]), 0, 0]); d.add(w); return d

c = canvas.Canvas(str(OUT / 'factura-A-ejemplo.pdf'), pagesize=A4); W, H = A4
c.setFont('Helvetica-Bold', 20); c.drawString(40, H - 60, 'DISTRIBUIDORA EJEMPLO S.A.'); c.setFont('Helvetica', 10)
c.drawString(40, H - 78, 'Documento de prueba con datos inventados · no válido como factura')
c.rect(W / 2 - 25, H - 95, 50, 45); c.setFont('Helvetica-Bold', 30); c.drawCentredString(W / 2, H - 85, 'A'); c.setFont('Helvetica', 10)
for i, t in enumerate([f'FACTURA N.º 00004-00012873', 'Fecha: 14/10/2026', f'CUIT: {EMISOR[:2]}-{EMISOR[2:10]}-{EMISOR[10]}', f'Cliente: Marina Rodríguez · CUIT {CLIENTE[:2]}-{CLIENTE[2:10]}-{CLIENTE[10]}',
                      '', 'Servicios de mantenimiento octubre 2026 ........ $ 182.400,00', 'IVA 21 % ................................... $ 38.304,00', 'TOTAL ...................................... $ 220.704,00']):
    c.drawString(40, H - 140 - i * 18, t)
renderPDF.draw(dib_qr(110), c, 40, 60); c.drawString(170, 120, 'CAE N.º 76123456789012'); c.drawString(170, 104, 'Vto. CAE: 24/10/2026'); c.save()
qrcode.make(url, box_size=8, border=4).save(OUT / 'qr-factura-ejemplo.png')
# "foto": el QR algo girado sobre fondo de papel
im = Image.open(OUT / 'qr-factura-ejemplo.png').convert('RGB'); fondo = Image.new('RGB', (900, 900), (236, 232, 222)); fondo.paste(im.rotate(7, expand=True, fillcolor=(236, 232, 222)), (210, 200))
fondo.save(OUT / 'foto-qr-ejemplo.jpg', quality=85)

# DNI ficticio con el código PDF417 del frente
txt = '00512345678@GOMEZ@LAURA BEATRIZ@F@28456112@B@14/02/1981@10/05/2019@200'
cod = pdf417gen.render_image(pdf417gen.encode(txt, columns=8, security_level=2), scale=3, ratio=3, padding=10)
dni = Image.new('RGB', (1000, 630), (214, 226, 236)); g = ImageDraw.Draw(dni)
try: f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 28); f2 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
except OSError: f = f2 = ImageFont.load_default()
g.text((40, 30), 'DOCUMENTO DE PRUEBA · DATOS INVENTADOS', fill=(160, 30, 30), font=f2)
g.text((40, 80), 'GOMEZ', fill=(20, 30, 50), font=f); g.text((40, 120), 'LAURA BEATRIZ', fill=(20, 30, 50), font=f); g.text((40, 170), 'DNI 28.456.112', fill=(20, 30, 50), font=f2)
cod = cod.convert('RGB'); k = min(920 / cod.width, 1); cod = cod.resize((int(cod.width * k), int(cod.height * k))); dni.paste(cod, (40, 250))
dni.save(OUT / 'dni-ejemplo.png')
print('ejemplos listos:', ', '.join(sorted(p.name for p in OUT.iterdir())))
