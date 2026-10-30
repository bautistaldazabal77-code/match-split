"""Arma index.html (página completa para publicar en cualquier hosting) a partir de pagina.html. Uso: python3 armar.py"""
import pathlib
aqui = pathlib.Path(__file__).parent
cuerpo = (aqui / 'pagina.html').read_text()
(aqui / 'index.html').write_text('<!doctype html>\n<html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n'
  + cuerpo + '\n</body></html>\n')
print('index.html listo')
