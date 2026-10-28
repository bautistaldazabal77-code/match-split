"""Recorta capas de Natural Earth 10 m (dominio público) a un rectángulo y las guarda como JS.
   Uso: python3 recorte_zona.py salida.js "x0,y0,x1,y1" NOMBRE, con los GeoJSON de Natural Earth en ne/ (land, minor_islands, admin_0_boundary_lines_land).
   web/fuego.js: python3 recorte_zona.py ../web/fuego.js "-74,-56.4,-63,-50.3" FUEGO"""
import json, sys
X0, Y0, X1, Y1 = map(float, sys.argv[2].split(","))
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
    def ix(x):
        return lambda a, b: [x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])]
    def iy(y):
        return lambda a, b: [a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y]
    p = ring
    for ins, it in [(lambda q: q[0] >= X0, ix(X0)), (lambda q: q[0] <= X1, ix(X1)), (lambda q: q[1] >= Y0, iy(Y0)), (lambda q: q[1] <= Y1, iy(Y1))]:
        if not p: break
        p = clip(p, ins, it)
    return p
def rnd(p): return [round(p[0], 4), round(p[1], 4)]
def polys(geom):
    t, c = geom['type'], geom['coordinates']
    return [c] if t == 'Polygon' else c if t == 'MultiPolygon' else []
def lines(geom):
    t, c = geom['type'], geom['coordinates']
    return [c] if t == 'LineString' else c if t == 'MultiLineString' else []
def dentro(p, m=.15): return X0 - m <= p[0] <= X1 + m and Y0 - m <= p[1] <= Y1 + m
out = {}
for nombre, tipo, props in [('land', 'poly', []), ('minor_islands', 'poly', []), ('admin_0_boundary_lines_land', 'line', [])]:
    fc = json.load(open(f'ne/ne_10m_{nombre}.geojson')); feats = []
    for f in fc['features']:
        g = f['geometry']
        if not g: continue
        if tipo == 'poly':
            for pol in polys(g):
                rings = [r for r in (clip_ring(ring) for ring in pol) if len(r) >= 3]
                if rings: feats.append({'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [[rnd(p) for p in r] + [rnd(r[0])] for r in rings]}})
        else:
            for ln in lines(g):
                seg = []
                for p in ln + [None]:
                    if p is not None and dentro(p): seg.append(rnd(p))
                    else:
                        if len(seg) > 1: feats.append({'type': 'Feature', 'properties': {k: f['properties'].get(k) for k in props}, 'geometry': {'type': 'LineString', 'coordinates': seg}})
                        seg = []
    out[{'land': 'land', 'minor_islands': 'islas', 'admin_0_boundary_lines_land': 'limites'}[nombre]] = {'type': 'FeatureCollection', 'features': feats}
    print(nombre, len(feats))
open(sys.argv[1], 'w').write('// Natural Earth 10 m (dominio público), recortado a una zona por recorte_zona.py\nwindow.' + sys.argv[3] + ' = ' + json.dumps(out, separators=(',', ':')) + ';\n')
