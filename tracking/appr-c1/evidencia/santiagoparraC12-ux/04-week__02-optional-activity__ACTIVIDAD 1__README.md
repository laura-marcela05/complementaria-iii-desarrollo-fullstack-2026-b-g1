# PokéDex · SPA con React que consume una API

Frontend construido como **Single Page Application (SPA)** con **React**, que consume la [PokeAPI](https://pokeapi.co) para mostrar una lista de Pokémon, con manejo de estados de carga, datos y error. Este proyecto retoma y aplica los cuatro temas vistos hasta ahora en el curso.

## Overview

This project is a Pokédex-themed Single Page Application built with React, consuming the public PokeAPI to display a searchable, paginated list of Pokémon. Unlike a traditional multi-page app, the entire experience — the list, the search box, and the detail panel — renders inside a single HTML document and updates without any full-page reload, which is the core idea behind an SPA. The interface is broken into small, reusable components such as `StatusBar`, `SearchBar`, `PokemonList`, `PokemonRow`, and `DetailPanel`, each with a single responsibility, following the component-based structure that frameworks like React encourage. Data fetching uses the native `fetch` API inside `useEffect` hooks: one call loads a page of twenty Pokémon on mount, and a second, lazy call loads a specific Pokémon's types and stats only when its row is clicked. The app explicitly manages loading, success, error, and empty-search states through React state (`useState`), reflecting each one visually with a skeleton screen, a rendered list, a retry button, or a "no matches" message respectively.

## Cómo se conecta con lo visto en clase

| Semana | Tema | Cómo se aplica aquí |
|---|---|---|
| **01** | Fullstack, SCRUM y Git | Este es solo el frontend (consume una API externa, no guarda datos); se entrega versionado con Git en el fork del repo de la clase, en commits pequeños y descriptivos (buena práctica de trabajo ágil). |
| **02** | Fundamentos web (HTML5/CSS3/JS) y SPA vs MPA | La estructura sigue siendo HTML semántico + CSS + JS "de comportamiento" (ahora como JSX), pero organizada como **SPA**: una sola página (`index.html`) que nunca recarga; la navegación entre "lista" y "detalle" ocurre solo cambiando estado en memoria. |
| **03** | Mockup + consumo de API desde el frontend | El diseño del Pokédex fue pensado primero como mockup (header con luces, pantalla, controles) antes de programarlo; el consumo de la API se hace con `fetch`, manejando los 3 estados (carga/datos/error) más un estado vacío. |
| **04** | Frontend con framework (React) | Toda la vista se reescribió como **componentes de React** (`App`, `StatusBar`, `SearchBar`, `PokemonList`, `PokemonRow`, `DetailPanel`), usando `useState`/`useEffect` para manejar estado y ciclo de vida en lugar de manipular el DOM manualmente. |

## Mockup / estructura de la vista

```
┌─────────────────────────────┐
│  (lente)      ● ● ●          │  <- header (lights)
├─────────────────────────────┤
│  ● EN LÍNEA         20 REG.  │  <- StatusBar
│  [ BUSCAR POR NOMBRE… ]      │  <- SearchBar
│  #001 [img] bulbasaur   ▶    │
│  #002 [img] ivysaur     ▶    │  <- PokemonList / PokemonRow
│  #003 [img] venusaur    ▶    │
│  ...                         │
├─────────────────────────────┤
│        [ CARGAR MÁS ▼ ]      │  <- footer control
└─────────────────────────────┘
        (al hacer clic en una fila, aparece DetailPanel)
```

## Estados manejados

| Estado | Cuándo ocurre | Componente | Qué se muestra |
|---|---|---|---|
| **Carga (loading)** | Al montar la app y al pedir la primera página | `LoadingState` | Filas "esqueleto" animadas + luz de estado amarilla parpadeante |
| **Datos (success)** | Cuando la API responde 200 OK | `PokemonList` | Lista de Pokémon con sprite, id y nombre; luz verde fija |
| **Error** | Falla de red o respuesta no-OK | `ErrorState` | Mensaje de error + botón "Reintentar"; luz roja parpadeante |
| **Vacío** | La búsqueda local no encuentra coincidencias | `EmptyState` | Mensaje "Sin coincidencias" con el término buscado |

## API consumida

- **Base:** `https://pokeapi.co/api/v2/pokemon` (pública, sin API key).
- **Listado:** `GET /pokemon?limit=20&offset=0` → nombres + URL de cada Pokémon (hook `useEffect` en `App`).
- **Detalle:** `GET /pokemon/{id o nombre}` → tipos y estadísticas base, cargado solo al abrir `DetailPanel` (hook `useEffect` con cleanup para evitar condiciones de carrera).
- **Sprites:** se arman contra el CDN de sprites oficial de PokeAPI en GitHub, sin llamada adicional.

## Cómo ejecutarlo

Este proyecto usa **React vía CDN** (sin `npm install` ni build step), para poder abrirlo directamente:

1. Clona tu fork del repositorio de la clase.
2. Entra a la carpeta de esta actividad.
3. Abre `index.html` en el navegador **o** sirve la carpeta con un servidor estático simple:
   ```bash
   python3 -m http.server 8080
   ```
   y visita `http://localhost:8080`.
4. También funciona publicado con GitHub Pages, apuntando a esta carpeta.

> Nota: `app.jsx` se transpila en el navegador con Babel standalone, cargado desde CDN en `index.html`. Es la forma más simple de usar React sin herramientas de build (Vite/CRA), adecuada para esta etapa del curso.

## Estructura de archivos

```
├── index.html   # punto de montaje único (SPA) + carga de React/Babel por CDN
├── app.jsx      # componentes de React, estado y lógica de fetch
├── styles.css   # estilos (tema Pokédex retro), estados visuales, accesibilidad
└── README.md
```

## Notas técnicas

- Accesible: foco visible en todos los controles, `aria-live` en las zonas dinámicas, `prefers-reduced-motion` respetado.
- Responsivo: pensado mobile-first, probado desde ~360px de ancho.
- Componentes con responsabilidad única, siguiendo el patrón contenedor (`App`) + presentacionales (`StatusBar`, `PokemonRow`, etc.) típico de React.
