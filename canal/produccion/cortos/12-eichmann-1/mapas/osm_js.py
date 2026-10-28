"""Pasa un extracto XML de OpenStreetMap (© colaboradores de OpenStreetMap, ODbL) a GeoJSON liviano en JS: calles, vías y edificios."""
import xml.etree.ElementTree as ET, json, sys
src, out, var = sys.argv[1], sys.argv[2], sys.argv[3]
x0, y0, x1, y1 = map(float, sys.argv[4].split(','))
r = ET.parse(src).getroot()
nodes = {n.get('id'): (float(n.get('lon')), float(n.get('lat'))) for n in r.iter('node')}
calles, vias, edif = [], [], []
for w in r.iter('way'):
    t = {k.get('k'): k.get('v') for k in w.iter('tag')}
    pts = [nodes[n.get('ref')] for n in w.iter('nd') if n.get('ref') in nodes]
    if len(pts) < 2 or not any(x0 <= p[0] <= x1 and y0 <= p[1] <= y1 for p in pts): continue
    c = [[round(p[0], 5), round(p[1], 5)] for p in pts]
    if t.get('highway') in ('motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified', 'living_street'):
        calles.append({'type': 'Feature', 'properties': {'n': t.get('name', ''), 'k': t['highway']}, 'geometry': {'type': 'LineString', 'coordinates': c}})
    elif t.get('railway') == 'rail':
        vias.append({'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': c}})
    elif 'building' in t and c[0] == c[-1] and len(c) >= 4:
        edif.append({'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [c]}})
fc = lambda f: {'type': 'FeatureCollection', 'features': f}
open(out, 'w').write(f'// © colaboradores de OpenStreetMap (ODbL). Extracto de la zona, generado con osm_js.py\nwindow.{var} = ' + json.dumps({'calles': fc(calles), 'vias': fc(vias), 'edif': fc(edif)}, separators=(',', ':')) + ';\n')
print(len(calles), 'calles', len(vias), 'vías', len(edif), 'edificios')
