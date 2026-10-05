# -*- coding: utf-8 -*-
"""Cruza forks de Fullstack con la hoja F-S y calcula cobertura de semanas 1-5."""
import json, io, re, sys, subprocess, unicodedata, openpyxl

XLSX = r"C:\www\code-corhuila\repos_2026-b\activity-management\list-data\calification-term-1.xlsx"
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

def norm(s):
    s = unicodedata.normalize('NFD', str(s))
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return ' '.join(s.upper().replace('.', ' ').split())

def ghj(p):
    r = subprocess.run(["gh", "api", p], capture_output=True)
    if r.returncode != 0: return None
    try: return json.loads(r.stdout.decode("utf-8", "replace"))
    except Exception: return None

# --- roster de la hoja F-S ---
wb = openpyxl.load_workbook(XLSX); ws = wb["F-S"]
assert ws.cell(1, 16).value == "appr", "P1 no es appr"
roster = []
for r in range(2, ws.max_row + 1):
    nom = ws.cell(r, 3).value
    if not nom: continue
    roster.append({"row": r, "nombre": str(nom).strip(), "norm": norm(nom),
                   "tokens": set(norm(nom).split()), "correo": ws.cell(r, 4).value,
                   "appr": ws.cell(r, 16).value})
json.dump(roster, io.open("roster_fs.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1,
          default=lambda o: list(o) if isinstance(o, set) else o)

data = json.load(io.open("harvest_fs.json", encoding="utf-8"))
DOCENTE = {"JESUS", "ARIEL", "GONZALEZ", "BONILLA"}
ident, sinid = {}, []

for f in data:
    u = f["user"]; cand = how = None
    cfg = f.get("full_name_cfg")
    # CONFIG con el nombre del docente = copy-paste, no sirve para identificar
    if cfg and len(set(norm(cfg).split()) & DOCENTE) >= 3:
        cfg, how_extra = None, "CONFIG trae el nombre del docente"
    else:
        how_extra = None
    if cfg:
        ft = set(norm(cfg).split())
        best = max(roster, key=lambda r: len(ft & r["tokens"]))
        ov = len(ft & best["tokens"])
        if ov >= 3 and ov >= len(ft) - 1:
            cand, how = best, f"CONFIG ({ov}/{len(ft)})"
    if not cand:   # nombre del perfil de GitHub
        prof = ghj(f"users/{u}")
        pn = (prof or {}).get("name")
        if pn:
            ft = set(norm(pn).split())
            best = max(roster, key=lambda r: len(ft & r["tokens"]))
            if len(ft & best["tokens"]) >= 2 and len(ft) >= 2:
                cand, how = best, f"perfil GitHub '{pn}'"
    if not cand:   # prefijo del correo institucional
        ul = u.lower()
        for r in roster:
            pre = str(r["correo"]).split("@")[0].lower()
            if ul == pre or ul.startswith(pre + "-") or pre.startswith(ul):
                cand, how = r, f"correo ({pre})"; break
    if not cand:   # nombre del fork renombrado
        rt = set(norm(f["repo"].split("/")[1].replace("-", " ")).split())
        best = max(roster, key=lambda r: len(rt & r["tokens"]))
        if len(rt & best["tokens"]) >= 3:
            cand, how = best, "nombre del fork"
    if cand:
        ident[u] = {"row": cand["row"], "nombre": cand["nombre"], "how": how,
                    "anomalia": how_extra, "cfg": f.get("full_name_cfg")}
    else:
        sinid.append((u, f["repo"], f.get("full_name_cfg"), how_extra))

# --- cobertura de semanas ---
def weeks(rec):
    w = set()
    for a in rec["added"]:
        m = re.match(r'(\d{2})-week', a["path"])
        if m and int(m.group(1)) <= 5: w.add(int(m.group(1)))
    return sorted(w)

print(f"{'fil':<4}{'estudiante':<38}{'usuario':<28}{'sem 1-5':<18}{'CONFIG':<8}{'como se identifico'}")
print("-" * 128)
out = {}
byrow = {}
for f in sorted(data, key=lambda x: ident.get(x["user"], {}).get("row", 99)):
    u = f["user"]; i = ident.get(u)
    w = weeks(f)
    tiene_cfg = "si" if f.get("full_name_cfg") else "NO"
    if i:
        out[u] = {"row": i["row"], "nombre": i["nombre"], "weeks": w, "cfg": tiene_cfg,
                  "how": i["how"], "anomalia": i["anomalia"], "repo": f["repo"],
                  "n": len(f["added"]), "pushed": f["pushed"][:10]}
        byrow.setdefault(i["row"], []).append(u)
        print(f"{i['row']:<4}{i['nombre']:<38}{u:<28}{str(w):<18}{tiene_cfg:<8}{i['how']}")
for u, repo, cfg, extra in sinid:
    print(f"{'??':<4}{'(sin identificar)':<38}{u:<28}{'':<18}{'':<8}{repo}  cfg={cfg}  {extra or ''}")

dups = {r: v for r, v in byrow.items() if len(v) > 1}
if dups: print("\n!! filas con mas de un fork:", dups)
print("\n=== filas de F-S sin fork ===")
for r in roster:
    if r["row"] not in byrow:
        print(f"   fila {r['row']:<3} {r['nombre']:<40} {r['correo']}")
json.dump(out, io.open("ident_fs.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"\nidentificados {len(out)} / {len(data)} forks")
