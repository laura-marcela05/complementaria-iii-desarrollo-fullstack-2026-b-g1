# Task Manager — Frontend that consumes an API

## Overview

Task Manager is a simple frontend application for managing a personal to-do list, built with vanilla HTML, CSS, and JavaScript using the native `fetch` API. It consumes [JSONPlaceholder](https://jsonplaceholder.typicode.com), a real, free, public REST API that requires no authentication and is commonly used for practicing frontend integrations. On load, the app fetches the todos for one user from the `/todos` endpoint and renders them as a task list; from there, users can add a new task, mark a task as pending or completed, and delete a task, each action triggering a real `POST`, `PATCH`, or `DELETE` request to the API. Because JSONPlaceholder is a testing API, it accepts and responds to write requests but does not actually persist them on its server, so the app performs the real network call and then reflects the result in local state, which is also documented here so the behavior is clear rather than misleading. The interface explicitly handles three states around these requests: a loading state with skeleton placeholders while a request is in flight, an error state with a message and a retry button if a request fails, and a data state that renders the list (or an empty-state message when there are no tasks).

## Public API used

- **Base URL:** `https://jsonplaceholder.typicode.com/todos`
- **Endpoints consumed:**
  - `GET /todos?userId=1` → load the initial task list
  - `POST /todos` → create a task
  - `PATCH /todos/:id` → toggle a task's status
  - `DELETE /todos/:id` → delete a task
- **Important limitation:** JSONPlaceholder is a fake/testing API. It returns a valid response for `POST`, `PATCH`, and `DELETE` (as if the change worked), but it does **not** save that change on its server. This is expected and documented behavior of the API itself, not a bug in this app — that's why the frontend updates its own local state after a successful response, instead of re-fetching from the server (which would just return the original, unmodified data).

## Mockup

The initial wireframe for the list view is in [`mockup/mockup.svg`](./mockup/mockup.svg). It shows the header with a task counter, the "add task" form, a task row for both pending and completed items, and the annotated loading/error states.

## Project structure

```
week-04-frontend-api/
├── frontend/         # Vanilla HTML/CSS/JS frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
├── mockup/
│   └── mockup.svg
└── README.md
```

## How to run it

No backend and no build step are required — the frontend talks directly to the public API over the internet.

1. Open `frontend/index.html` directly in your browser, **or**, if your browser blocks `fetch` from a `file://` path, serve the folder locally:

   ```bash
   cd frontend
   npx serve .
   ```

2. Open the printed URL (for example `http://localhost:3000`) in your browser.
3. Make sure you have an internet connection, since the app fetches data from `jsonplaceholder.typicode.com`.

## Features / states handled

- **Loading**: animated skeleton rows are shown while `fetch` is resolving.
- **Data**: the task list renders each task with its title, date, and status badge.
- **Empty**: a friendly message is shown when there are no tasks.
- **Error**: a red banner with a clear message and a "Retry" button appears if a request fails (e.g., no internet connection or the API is unreachable).

## Tech stack

- HTML5, CSS3, vanilla JavaScript (ES6+, `fetch`, `async/await`)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) as the public REST API
