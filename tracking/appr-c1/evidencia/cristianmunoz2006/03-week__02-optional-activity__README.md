# Semana 3 — Mockup + consumo de API: Recetario Exprés

> **CONFIG:** FULL_NAME: `Cristian Andres Muñoz Montenegro` · GITHUB_USER: `cristianmunoz2006`

## Qué es

Una vista de lista de recetas de cocina, consultadas en vivo desde la API
pública **DummyJSON**. Cada tarjeta muestra imagen, nombre, tipo de
cocina, dificultad, tiempo total y calificación. Incluye un filtro de
búsqueda por nombre o cocina.

> **Nota:** la primera versión de esta entrega usaba la API REST
> Countries, pero su endpoint gratuito (`v3.1`) fue **descontinuado**
> (ahora exige API key). Por eso se migró a DummyJSON, que sigue siendo
> pública y no requiere autenticación.

## Mockup / distribución de la vista

```
┌─────────────────────────────────────────┐
│  eyebrow · RECETARIO EXPRÉS · subtítulo │  ← header
├─────────────────────────────────────────┤
│  Recetas                  [ Filtrar__ ] │  ← board head + búsqueda
│  N recetas cargadas                     │
│  ┌───────────┐ ┌───────────┐            │
│  │ [imagen]  │ │ [imagen]  │            │
│  │ Cocina    │ │ Cocina    │ ...        │  ← grid de tarjetas
│  │ Nombre    │ │ Nombre    │            │
│  │ Dificultad│ │ Dificultad│            │
│  │  Tiempo   │ │ Tiempo    │            │
│  └───────────┘ └───────────┘            │
├─────────────────────────────────────────┤
│              footer / créditos          │
└─────────────────────────────────────────┘
```

## Cómo cumple el enunciado

- **Mockup:** distribución clara de una vista de lista — encabezado,
  barra de filtro y una grilla de tarjetas (`.recipe-grid`), cada una
  con imagen, cocina, nombre, dificultad, tiempo y calificación en
  orden fijo.
- **Consumo de API con fetch:** se consulta
  `GET https://dummyjson.com/recipes?limit=0` con `async/await`, y se
  renderizan los datos reales en la lista.
- **Estados manejados:**
  - **Cargando:** grilla de skeletons animados + texto de estado.
  - **Datos:** las tarjetas de recetas renderizadas.
  - **Error:** tarjeta con mensaje claro y botón "Reintentar" si la API
    no responde.
  - **Vacío:** mensaje cuando la búsqueda no encuentra coincidencias.

## Estructura del proyecto

```
03-week/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Cómo ejecutarlo

No requiere instalación. Abre `index.html` directamente en el navegador,
o sírvelo con un servidor estático local (recomendado, para evitar
restricciones de `fetch` al abrir el archivo con `file://`):

```bash
cd 03-week
python3 -m http.server 8080
# abre http://localhost:8080
```

## Cómo se versionó con Git

```bash
git clone https://github.com/cristianmunoz2006/complementaria-iii-desarrollo-fullstack-2026-b-g1.git
cd complementaria-iii-desarrollo-fullstack-2026-b-g1
# coloca esta entrega dentro de la carpeta 03-week/03-optional-activity/
git add .
git commit -m "Entrega semana 03"
git push origin main
```
