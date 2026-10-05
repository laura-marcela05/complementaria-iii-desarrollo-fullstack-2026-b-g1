# Cuaderno de Citas — Actividad Corte 1: Frontend que consume una API

> **CONFIG:** FULL_NAME: `Cristian Andres Muñoz Montenegro` · GITHUB_USER: `cristianmunoz2006`

## Overview (English)

Cuaderno de Citas is a small single-page web app that displays a browsable
catalog of famous quotes, styled like an old library index-card archive.
The app consumes the free public **DummyJSON Quotes API**
(`https://dummyjson.com/quotes`), fetching a random "quote of the day" for
the hero section and the full quote collection for a searchable, paginated
card grid below it. It is built with plain HTML, CSS and vanilla
JavaScript (`fetch`, `async/await`), with no frameworks or build step
required. Since the source quotes are in English, each quote is
translated into Spanish on the fly through the free **MyMemory
Translation API**, translating only what is actually shown on screen (the
hero quote and the current page of cards) and caching results to avoid
repeat calls. The interface explicitly handles three states for every network
call: a **loading** state (animated skeleton cards and status text), a
**data** state (the rendered quotes), and an **error** state (a
torn-paper card explaining that the archive could not be reached, with a
retry button). A fourth, related state — **empty results** — is shown
when a search term matches no quotes, so the user is never left looking
at a blank screen without an explanation.

## Qué hace la app

- **Carta del día:** al cargar la página, se pide una cita aleatoria a
  `GET /quotes/random` y se muestra en una tarjeta destacada. El botón
  "Sacar otra carta" repite la consulta.
- **Catálogo completo:** se pide todo el archivo con
  `GET /quotes?limit=0` **una sola vez** y luego se pagina y filtra en el
  navegador (12 tarjetas por página).
- **Búsqueda:** el campo de texto filtra por autor o por palabras dentro
  de la cita (texto original en inglés), sin volver a llamar a la API de
  citas.
- **Traducción al español:** como DummyJSON entrega las citas en inglés,
  cada cita mostrada (la del hero y las de la página visible del
  catálogo) se traduce al vuelo con la API de MyMemory. Se traduce solo
  lo que se ve en pantalla —no las +1400 citas del catálogo— y el
  resultado se guarda en caché para no repetir la traducción al volver a
  una página ya vista. Si la traducción falla, la cita se muestra en
  inglés como respaldo, para que la app nunca se quede sin contenido.
- **Estados manejados:** carga (skeleton animado / "traduciendo…"),
  datos (tarjetas), error (con botón "Reintentar") y vacío (sin
  resultados de búsqueda).

## Estructura del proyecto

```
citas-celebres/
├── index.html        # Estructura semántica: header, hero, catálogo, footer
├── css/
│ └── style.css      # Tokens de diseño (color, tipografía) y layout
├── js/
│ └── app.js          # Fetch a la API, manejo de estados, búsqueda, paginación
└── README.md
```

## API utilizada

[DummyJSON — Quotes](https://dummyjson.com/docs/quotes): API pública,
gratuita y sin necesidad de API key.

- `GET /quotes/random` → una cita aleatoria.
- `GET /quotes?limit=0` → las +1400 citas del catálogo, en un solo llamado.

Adicionalmente se usa [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
(gratuita, sin API key) para traducir cada cita mostrada de inglés a
español: `GET https://api.mymemory.translated.net/get?q=<texto>&langpair=en|es`.

## Cómo ejecutarlo

No requiere instalación ni dependencias. Basta con abrir `index.html` en
el navegador, o servirlo con un servidor estático local (recomendado para
evitar restricciones de CORS/fetch al abrir el archivo directamente con
`file://`):

```bash
# Opción 1: con Python
cd citas-celebres
python3 -m http.server 8080
# luego abre http://localhost:8080

# Opción 2: con la extensión "Live Server" de VS Code
# clic derecho sobre index.html → "Open with Live Server"
```

## Cómo se versionó con Git

```bash
git clone <https://github.com/cristianmunoz2006/complementaria-iii-desarrollo-fullstack-2026-b-g1.git>
cd <04-week>/c1-activity/citas-celebres   
git add .
git commit -m "Actividad Corte 1: catálogo de citas que consume DummyJSON API"
git push origin main
```

## Mockup / distribución de la vista

```
┌─────────────────────────────────────────┐
│  eyebrow · TÍTULO · subtítulo           │  ← masthead
├─────────────────────────────────────────┤
│        [ tarjeta "Carta del día" ]      │  ← hero (quote random)
│        cita + autor + botón sortear     │
├─────────────────────────────────────────┤
│  Catálogo completo       [ Buscar___ ]  │  ← catalog head + búsqueda
│  N citas disponibles                    │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │No.01│ │No.02│ │No.03│  ...           │  ← grid de tarjetas
│  └─────┘ └─────┘ └─────┘                │
│    ← Anterior · Pág X de Y · Siguiente →│  ← paginación
├─────────────────────────────────────────┤
│              footer / créditos          │
└─────────────────────────────────────────┘
```

Cada tarjeta del catálogo funciona como una ficha de biblioteca: número de
registro (`No. 00xx`), texto de la cita y autor a modo de firma.
