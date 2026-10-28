"""Recorta Natural Earth 10 m (dominio público) a un rectángulo, con provincias, lagos y límites, y lo guarda como JS.
   Uso: python3 recorte_prov.py carpeta_ne salida.js "x0,y0,x1,y1" NOMBRE
   web/patagonia.js: python3 recorte_prov.py ne ../web/patagonia.js "-75,-42.5,-63.5,-32.5" PATA"""
import json, sys
NE, SAL, NOM = sys.argv[1], sys.argv[2], sys.argv[4]
X0, Y0, X1, Y1 = map(float, sys.argv[3].split(','))
def clip_ring(ring):
    def clip(pts, inside, inter):
        out = []
        for i in range(len(pts)):
            a, b = pts[i - 1], pts[i]
            if inside(b):
                if not inside(a): out.append(inter(a, b))
                out.append(b)
            elif inside(a): out.append(inter(a, b))
        return out
    ix = lambda x: lambda a, b: [x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])]
    iy = lambda y: lambda a, b: [a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y]
    p = ring
    for ins, it in [(lambda q: q[0] >= X0, ix(X0)), (lambda q: q[0] <= X1, ix(X1)), (lambda q: q[1] >= Y0, iy(Y0)), (lambda q: q[1] <= Y1, iy(Y1))]:
        if not p: break
        p = clip(p, ins, it)
    return p
def fino(r, d=.006):
    out = [r[0]]
    for p in r[1:]:
        if abs(p[0] - out[-1][0]) + abs(p[1] - out[-1][1]) >= d: out.append(p)
    return [[round(p[0], 3), round(p[1], 3)] for p in out]
def polys(g): return [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates'] if g['type'] == 'MultiPolygon' else []
def lines(g): return [g['coordinates']] if g['type'] == 'LineString' else g['coordinates'] if g['type'] == 'MultiLineString' else []
def dentro(p, m=.2): return X0 - m <= p[0] <= X1 + m and Y0 - m <= p[1] <= Y1 + m
def capa_poly(nombre, filtro=lambda f: True, props=()):
    feats = []
    for f in json.load(open(f'{NE}/ne_10m_{nombre}.geojson'))['features']:
        g = f['geometry']
        if not g or not filtro(f): continue
        for pol in polys(g):
            rings = [fino(r) for r in (clip_ring(ring) for ring in pol) if len(r) >= 3]
            rings = [r + [r[0]] for r in rings if len(r) >= 3]
            if rings: feats.append({'type': 'Feature', 'properties': {k: f['properties'].get(k) for k in props}, 'geometry': {'type': 'Polygon', 'coordinates': rings}})
    return {'type': 'FeatureCollection', 'features': feats}
def capa_linea(nombre):
    feats = []
    for f in json.load(open(f'{NE}/ne_10m_{nombre}.geojson'))['features']:
        g = f['geometry']
        if not g: continue
        for ln in lines(g):
            seg = []
            for p in ln + [None]:
                if p is not None and dentro(p): seg.append(p)
                else:
                    if len(seg) > 1: feats.append({'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': fino(seg)}})
                    seg = []
    return {'type': 'FeatureCollection', 'features': feats}
out = {'land': capa_poly('land'), 'islas': capa_poly('minor_islands'), 'lagos': capa_poly('lakes'), 'limites': capa_linea('admin_0_boundary_lines_land'),
       'prov': capa_poly('admin_1_states_provinces', lambda f: f['properties']['adm0_a3'] in ('ARG', 'CHL'), ('name', 'adm0_a3'))}
for k, v in out.items(): print(k, len(v['features']))
open(SAL, 'w').write('// Natural Earth 10 m (dominio público), recortado por mapas/recorte_prov.py\nwindow.' + NOM + ' = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
