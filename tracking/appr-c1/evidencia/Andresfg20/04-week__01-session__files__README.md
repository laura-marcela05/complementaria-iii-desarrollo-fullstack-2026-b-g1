# Task Ledger (tm) — Frontend that consumes an API

Actividad calificable · Corte 1 · Semana 4
Vista de lista de tareas, implementada en HTML/CSS/JS puro, que consume una API pública (DummyJSON Todos) mediante `fetch`.

## Overview

Task Ledger is a single-page frontend for browsing, creating, completing, and deleting to-do items, styled as a paper ledger with one row per task. The app consumes the public [DummyJSON Todos API](https://dummyjson.com/docs/todos), using `GET /todos` to list tasks, `POST /todos/add` to create a task, `PUT /todos/:id` to toggle its completed status, and `DELETE /todos/:id` to remove it. All network calls are isolated in `js/api.js`, so the rest of the app never touches `fetch` directly. The interface explicitly handles three states: a loading state with skeleton rows while the initial request is in flight, a data state that renders the task list (with a further empty-state message when a filter has no matches), and an error state with a plain-language message and a retry button if the request fails. Task creation, completion toggling, and deletion update the UI optimistically and roll back with an inline message if the underlying request fails, since DummyJSON does not persist writes between page loads.

## Mockup / distribución de la vista

```
┌───────────────────────────────────────────┐
│  Task Ledger                         [tm]  │
│  One line per task. Mark it done...        │
├───────────────────────────────────────────┤
│  New entry                                 │
│  [ Write a task...              ] [ Add ]  │
├───────────────────────────────────────────┤
│  All   Pending   Completed        N tasks  │
├───────────────────────────────────────────┤
│ │ [ ] Buy groceries          Pending    ×  │
│ │ [x] Finish report          Completed  ×  │
│ │ [ ] Call the dentist       Pending    ×  │
│ │ ...                                      │
└───────────────────────────────────────────┘
```

- **Encabezado (masthead):** nombre de la app y marca `tm`.
- **Composer:** formulario de una sola línea para crear una tarea nueva.
- **Tabs de filtro:** `All / Pending / Completed`, con contador de tareas.
- **Lista de entradas:** una fila por tarea, con franja de color por estado (ámbar = pendiente, verde = completada), checkbox para alternar estado y botón `×` para eliminar.
- **Estados:** carga (skeleton rows), error (mensaje + botón "Try again") y vacío (mensaje contextual según el filtro activo), todos renderizados en el mismo contenedor `#entries`.

## Estructura del proyecto

```
task-manager-frontend/
├── index.html          # Marcado y estructura de la vista
├── css/
│   └── styles.css       # Design system (tokens, layout, estados)
├── js/
│   ├── api.js            # Toda la comunicación con la API (fetch)
│   ├── ui.js              # Funciones de render por estado
│   └── app.js              # Estado de la app y wiring de eventos
└── README.md
```

## API consumida

- **Base URL:** `https://dummyjson.com/todos`
- **Endpoints usados:**
  - `GET /todos?limit=20` — listar tareas
  - `POST /todos/add` — crear tarea
  - `PUT /todos/:id` — actualizar estado (`completed`)
  - `DELETE /todos/:id` — eliminar tarea
- DummyJSON es una API de ejemplo/mock: acepta y responde a las escrituras (`POST`/`PUT`/`DELETE`) de forma realista, pero no las persiste en el servidor. Al recargar la página, la lista vuelve a los datos semilla.

## Cómo ejecutarlo

No requiere build ni dependencias — es HTML/CSS/JS plano con módulos ES nativos.

1. Clona tu fork del repositorio de la clase.
2. Ubica esta carpeta dentro de la semana correspondiente (por ejemplo `semana-4/task-manager-frontend`).
3. Como los módulos ES (`type="module"`) no se pueden abrir con `file://`, sirve la carpeta con un servidor estático local. Alguna de estas opciones funciona:

   ```bash
   # Opción 1: extensión de VS Code "Live Server"

   # Opción 2: servidor HTTP embebido de Python
   cd task-manager-frontend
   python3 -m http.server 8080

   # Opción 3: paquete npx serve
   cd task-manager-frontend
   npx serve .
   ```

4. Abre `http://localhost:8080` (o el puerto indicado) en el navegador.

## Notas de implementación

- Sin frameworks: JavaScript vanilla con módulos ES (`import`/`export`) separados por responsabilidad (`api.js`, `ui.js`, `app.js`).
- Manejo de estados: `loading`, `data` (con sub-estado `empty`) y `error`, todos con su propia función de render.
- Actualizaciones optimistas para marcar/eliminar tareas, con reversión y mensaje si la petición falla.
- Accesibilidad básica: `aria-live` en la lista, `aria-pressed`/`aria-label` en los controles, foco visible (`:focus-visible`).
