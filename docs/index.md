---
title: "Documentación de proyecto"
---

# Complementaria III — Profundización Desarrollo Fullstack

**Corporación Universitaria del Huila (CORHUILA) · 2026-B**

Documentación de proyecto del curso. Cada equipo trabaja su repositorio `-docs` siguiendo el
[Monolith Governance Framework](https://github.com/jesusarielgb-works/monolith-governance-framework).

---

## Documentos

### [Replanteamiento y recomendaciones — Corte 1](replanteamiento-corte-1.html)

Estado de los repositorios `-docs` de los diez equipos al **28 de septiembre de 2026**, medido
contra la meta del corte: secciones `00-governance` … `06-data` al **100%** y `07-api` y
`12-ux-ui` al **80%**.

Contiene:

- El tablero de avance por equipo contra la meta.
- Los hallazgos de consistencia al cruzar secciones — lo que una sección afirma y la
  siguiente contradice.
- Ocho reglas de trabajo para el resto del semestre.
- Lo que le falta a cada equipo, ordenado por lo que más rinde primero.
- Un checklist de nueve preguntas para cerrar el corte.

**Lectura obligatoria antes de seguir documentando.**

---

## Cómo verificar tu propio repositorio

Antes de dar por terminada una sección, corre esto dentro de tu repo `-docs`:

```bash
grep -rn "\[!NOTE\] INSTRUCTIONS" --include="*.md" . | grep -v "_template"
```

Si devuelve algo, la sección todavía no está terminada.

---

<sub>Docente: Jesús Ariel González Bonilla · [Repositorio del curso](https://github.com/code-corhuila/complementaria-iii-desarrollo-fullstack-2026-b-g1)</sub>
