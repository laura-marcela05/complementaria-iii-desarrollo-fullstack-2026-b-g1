# Semana 4 · Componente que consume datos

Proyecto React (Vite) para la actividad de **Desarrollo Fullstack – Semana 4**.

## ¿Qué hace?

Un componente reutilizable, `DataList`, que:

1. **Recibe/muestra datos** vía props (`apiUrl` y `renderItem`), por lo que se puede reutilizar con cualquier API y cualquier forma de pintar cada elemento (ver los dos usos distintos en `src/App.jsx`).
2. **Maneja estado** (`useState`) que se llena consumiendo una **API** (`useEffect` + `fetch`), controlando `loading`, `error` y `data`.
3. **Renderiza una lista** (`<ul>`/`<li>`) y **contempla el estado de carga** (spinner mientras carga, mensaje si hay error, mensaje si la lista viene vacía).

## Estructura

```
semana04-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                 # demo: usa DataList dos veces con APIs distintas
    └── components/
        ├── DataList.jsx        # componente reutilizable
        └── DataList.css
```

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Luego abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## Cómo se cumple la rúbrica

| Criterio         | Cómo se cumple |
|-------------------|----------------|
| Componente (35 pts) | `DataList` no depende de una API fija: recibe `apiUrl` y `renderItem` por props, se usa dos veces en `App.jsx` con datos y presentación distintos. |
| Estado desde API (45 pts) | `useState` para `data`, `loading`, `error`; `useEffect` dispara el `fetch` al montar el componente y cada vez que cambia `apiUrl`. |
| Render/carga (20 pts) | Se muestran claramente los tres estados: cargando (spinner), error, y lista vacía o con datos. |

## Entrega (según la guía)

1. Haz **fork** del repositorio de la clase y clónalo.
2. Copia esta carpeta dentro de `04-week/` de tu fork.
3. `git add .`
4. `git commit -m "Entrega semana 04"`
5. `git push`
6. Verifica que tu repo de perfil tenga el bloque `CONFIG` (`FULL_NAME` + `GITHUB_USER`).

> Actividad formativa y opcional (sin nota en Moodle).
