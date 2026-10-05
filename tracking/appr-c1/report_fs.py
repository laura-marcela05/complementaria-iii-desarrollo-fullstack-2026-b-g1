# -*- coding: utf-8 -*-
import json, io, os, csv, html, datetime

SLUG = "complementaria-iii-desarrollo-fullstack-2026-b-g1"
OUT = rf"C:\www\code-corhuila\repos_2026-b\{SLUG}\tracking\appr-c1"
os.makedirs(OUT, exist_ok=True)
a = json.load(io.open("assessment_fs.json", encoding="utf-8"))
COMP = {int(k): v for k, v in a["completos"].items()}
INC = {int(k): v for k, v in a["incompletos"].items()}
SIN = {int(k): v for k, v in a["sin_fork"].items()}
REGLA = a["regla"]
roster = {r["row"]: r for r in json.load(io.open("roster_fs.json", encoding="utf-8"))}
HOY = datetime.date.today().isoformat()
e = html.escape

def grid(ws):
    return "".join(f'<span class="w {"on" if i in ws else "off"}">{i}</span>' for i in range(1, 6))

# ---------- CSV ----------
with io.open(os.path.join(OUT, "appr-c1-fullstack.csv"), "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["fila", "estudiante", "usuario_github", "semanas_entregadas", "completo_1a5", "resumen", "appr"])
    for r in sorted(COMP):
        w.writerow([r, roster[r]["nombre"], COMP[r][0], "1 2 3 4 5", "SI", COMP[r][1], 0.6])
    for r in sorted(INC):
        u, wk, res, _ = INC[r]
        w.writerow([r, roster[r]["nombre"], u, " ".join(map(str, wk)), "NO", res, ""])
    for r in sorted(SIN):
        w.writerow([r, roster[r]["nombre"], "", "", "NO", SIN[r], ""])

# ---------- notas ----------
md = [f"# Notas de retroalimentacion — appr Corte 1\n",
      f"Complementaria III · Desarrollo Fullstack · 2026-B · generado {HOY}\n",
      "> **Criterio:** la appr (0.6) es solo para quien entrego las actividades de las semanas 1 a 5.\n"
      "> La cumplen 12 de 26. A los demas no se les escribe nota (celda en blanco), pero varios\n"
      "> entregaron trabajo de buena calidad en las semanas 4 y 5 y eso se les reconoce abajo.\n"]
for r in sorted(COMP):
    u, res, nota = COMP[r]
    md.append(f"\n---\n\n## {roster[r]['nombre']}  ·  appr 0.6\n")
    md.append(f"`@{u}` · {roster[r]['correo']} · semanas 1 a 5 completas\n\n{nota}\n")
for r in sorted(INC):
    u, wk, res, nota = INC[r]
    md.append(f"\n---\n\n## {roster[r]['nombre']}  ·  sin appr\n")
    md.append(f"`@{u}` · {roster[r]['correo']} · semanas entregadas: {wk}\n\n{nota}")
    md.append(REGLA.format(w=", ".join(map(str, wk))) + "\n")
md.append("\n---\n\n## Sin entrega localizada\n\n_Verificar en Moodle o preguntarles antes de cerrar el corte._\n")
for r in sorted(SIN):
    md.append(f"\n- **{roster[r]['nombre']}** ({roster[r]['correo']}) — {SIN[r]}")
md.append("\n\n**Mensaje sugerido:** «No encontre tu entrega en GitHub. Puede que la hayas subido a otra cuenta o que "
          "no hayas alcanzado a hacer el fork. Escribeme y lo revisamos. El Manual de Entrega por GitHub del curso "
          "tiene el paso a paso.»\n")
io.open(os.path.join(OUT, "notas-estudiantes.md"), "w", encoding="utf-8").write("".join(md))

# ---------- HTML ----------
comp_rows = "".join(f"""<tr class="ok"><td class="num">{r}</td>
<td class="name">{e(roster[r]['nombre'])}<div class="mono">@{e(COMP[r][0])}</div></td>
<td class="wk">{grid({1,2,3,4,5})}</td><td class="desc">{e(COMP[r][1])}</td>
<td class="appr"><span class="pill g">0.6</span></td></tr>""" for r in sorted(COMP))
inc_rows = "".join(f"""<tr><td class="num">{r}</td>
<td class="name">{e(roster[r]['nombre'])}<div class="mono">@{e(INC[r][0])}</div></td>
<td class="wk">{grid(set(INC[r][1]))}</td><td class="desc">{e(INC[r][2])}</td>
<td class="appr"><span class="pill q">—</span></td></tr>""" for r in sorted(INC))
sin_rows = "".join(f"""<tr><td class="num">{r}</td>
<td class="name">{e(roster[r]['nombre'])}<div class="mono">{e(roster[r]['correo'])}</div></td>
<td class="desc">{e(SIN[r])}</td><td class="appr"><span class="pill q">—</span></td></tr>""" for r in sorted(SIN))
notes_html = "".join(f"""<div class="note"><h3>{e(roster[r]['nombre'])}
<span class="pill {'g' if r in COMP else 'q'}">{'0.6' if r in COMP else 'sin appr'}</span></h3>
<div class="mono small">@{e((COMP.get(r) or INC[r])[0])}</div>
<p>{e((COMP[r][2] if r in COMP else INC[r][3]))}</p></div>"""
                     for r in sorted(list(COMP) + list(INC)))

HTML = f"""<title>Apreciativa C1 · Fullstack</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{{--ink:#1A2445;--accent:#3A5AE8;--bg:#F7F8FC;--card:#FFF;--border:#E4E7F1;--muted:#6B7280;
--g-bg:#D1FAE5;--g-fg:#065F46;--n-bg:#F1F2F6;--n-fg:#4B5563;--mono:'JetBrains Mono',ui-monospace,monospace}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#10142A;--card:#171C38;--border:#2A3055;--ink:#EEF1FF;--muted:#A6ADC9;--n-bg:#252B4D;--n-fg:#A6ADC9;--g-bg:#0C4A3A;--g-fg:#8FF0CB}}}}
:root[data-theme="dark"]{{--bg:#10142A;--card:#171C38;--border:#2A3055;--ink:#EEF1FF;--muted:#A6ADC9;--n-bg:#252B4D;--n-fg:#A6ADC9;--g-bg:#0C4A3A;--g-fg:#8FF0CB}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);font-family:'DM Sans',Segoe UI,Arial,sans-serif;padding:32px 20px;line-height:1.5}}
.wrap{{max-width:1240px;margin:0 auto}}
h1{{font-family:Outfit;font-size:27px;margin:0 0 4px}}
.sub{{color:var(--muted);font-size:14px;margin:0 0 24px}}
.summary{{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:24px}}
.stat{{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 20px;min-width:130px}}
.stat .n{{font-family:Outfit;font-size:27px;font-weight:700}}
.stat .l{{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.04em}}
.card{{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px 24px;margin-bottom:20px}}
.card h2{{font-family:Outfit;font-size:17px;margin:0 0 4px}}
.table-wrap{{overflow-x:auto}}
table{{width:100%;border-collapse:collapse;font-size:13px}}
th,td{{text-align:left;padding:9px;border-bottom:1px solid var(--border);vertical-align:top}}
th{{color:var(--muted);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.03em}}
td.num{{color:var(--muted);font-family:var(--mono);width:38px}}
td.name{{font-weight:600;min-width:210px}}
.mono{{font-family:var(--mono);font-size:11px;color:var(--muted);font-weight:400}}
.small{{font-size:11px}}
td.desc{{color:var(--muted);font-size:12.5px;max-width:560px}}
td.appr{{text-align:right}} td.wk{{white-space:nowrap;width:118px}}
.w{{display:inline-block;width:19px;height:19px;line-height:19px;text-align:center;border-radius:5px;
font-family:var(--mono);font-size:10px;font-weight:700;margin-right:2px}}
.w.on{{background:var(--g-bg);color:var(--g-fg)}} .w.off{{background:var(--n-bg);color:var(--n-fg);opacity:.55}}
.pill{{display:inline-block;padding:3px 11px;border-radius:999px;font-size:12px;font-weight:700}}
.pill.g{{background:var(--g-bg);color:var(--g-fg)}} .pill.q{{background:var(--n-bg);color:var(--n-fg)}}
tr.ok td{{background:color-mix(in srgb,var(--g-bg) 26%,transparent)}}
.note{{border-left:3px solid var(--accent);padding:2px 0 2px 15px;margin-bottom:19px}}
.note h3{{font-family:Outfit;font-size:14.5px;margin:0 0 2px;display:flex;gap:9px;align-items:center;flex-wrap:wrap}}
.note p{{margin:7px 0 0;font-size:13.5px}}
.rule{{background:var(--g-bg);color:var(--g-fg);border-radius:10px;padding:14px 17px;font-size:13.5px;margin-bottom:20px}}
ul{{margin:8px 0;padding-left:20px;font-size:13.5px}} li{{margin-bottom:5px}}
</style>
<div class="wrap">
<h1>Nota apreciativa · Corte 1</h1>
<p class="sub">Complementaria III — Desarrollo Fullstack · 2026-B · columna <code>appr</code>, hoja <code>F-S</code> · aplicado {HOY}</p>

<div class="rule"><b>Criterio:</b> la appr (0.6) se da unicamente a quien entrego las actividades de las
<b>semanas 1 a 5</b>. La cumplen 12 de 26. A los demas no se les escribe nota: la celda queda en blanco.</div>

<div class="summary">
<div class="stat"><div class="n">26</div><div class="l">estudiantes</div></div>
<div class="stat"><div class="n">12</div><div class="l">appr 0.6</div></div>
<div class="stat"><div class="n">12</div><div class="l">incompletos</div></div>
<div class="stat"><div class="n">2</div><div class="l">sin ubicar</div></div>
</div>

<div class="card"><h2>Completan las semanas 1 a 5 — appr 0.6</h2><div class="table-wrap"><table>
<thead><tr><th>#</th><th>Estudiante</th><th>1 2 3 4 5</th><th>Que entrego</th><th>appr</th></tr></thead>
<tbody>{comp_rows}</tbody></table></div></div>

<div class="card"><h2>No completan — celda en blanco</h2>
<p class="sub" style="margin:0 0 12px">Casi todos tienen solo las semanas 4 y 5. Varios hicieron buen trabajo ahi;
la nota de cada uno lo reconoce y explica por que no alcanza el bono.</p>
<div class="table-wrap"><table>
<thead><tr><th>#</th><th>Estudiante</th><th>1 2 3 4 5</th><th>Que entrego</th><th>appr</th></tr></thead>
<tbody>{inc_rows}</tbody></table></div></div>

<div class="card"><h2>Sin entrega localizable</h2><div class="table-wrap"><table>
<thead><tr><th>#</th><th>Estudiante</th><th>Que se intento</th><th>appr</th></tr></thead>
<tbody>{sin_rows}</tbody></table></div></div>

<div class="card"><h2>Notas para entregar a cada estudiante</h2>{notes_html}</div>

<div class="card"><h2>Correcciones frente al conteo del 09-sep</h2>
<ul>
<li>Aquel informe dio <b>0 de 25</b> y reporto «24 de 25 sin Semana 1». En realidad <b>14 si la entregaron</b>,
casi todos el 1-sep: sus README de presentacion estan en <code>01-week/02-optional-activity/</code>, no en
<code>01-week/</code> a secas.</li>
<li><b>Juan Jose Guzman</b> — se dijo «solo el mockup, sin componente funcional». Tiene Punto 1-mockup,
Punto 2-frontend y Punto 3-manejo Estados: semana 4 completa.</li>
<li><b>Juan Pablo Valverde</b> — se dijo que su S3 «no responde al planteamiento». Es un componente React que
consume API con los 3 estados (75 de los 100 pts de esa semana); solo le falta el mockup.</li>
<li><b>Juan Diego Bonilla</b> tiene dos cuentas; <code>juan895</code> es la abandonada con el fork vacio, no un
estudiante que no entrego.</li>
<li><b>Julio Cesar Lozano</b>: su bloque CONFIG trae el nombre del docente en vez del propio — corregir.</li>
</ul></div>

<div class="card"><h2>Como se verifico</h2>
<ul>
<li>Arbol completo de cada fork (todas las ramas) menos el esqueleto del repo base, comparando ruta <b>y sha</b>;
se omitieron <code>node_modules</code> y carpetas de build.</li>
<li>Identidad: CONFIG de <code>usuario/usuario</code>, nombre del perfil de GitHub, prefijo del correo
institucional y nombre del fork. 25 de 25 forks identificados.</li>
<li>Cada semana se contrasto con su enunciado oficial en <code>ova-web/2026-B/fullstack</code>.</li>
<li>Evidencia cruda en <code>tracking/appr-c1/evidencia/&lt;usuario&gt;/</code>.</li>
</ul></div>
</div>"""
io.open(os.path.join(OUT, "informe-appr-c1.html"), "w", encoding="utf-8").write(HTML)
print("Generado en", OUT)
for f in sorted(os.listdir(OUT)):
    p = os.path.join(OUT, f)
    print("   ", f, f"({os.path.getsize(p)} B)" if os.path.isfile(p) else "/")
