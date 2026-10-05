# Semana 3 - Mockup + consumo de API

Actividad opcional de refuerzo.

## Mockup

El mockup de la vista (lista de elementos) está en Figma, enlazado en `../README.md`.

## Consumo de API

- `api/api.js` obtiene publicaciones desde `https://jsonplaceholder.typicode.com/posts` con `fetch` (GET).
- `js/main.js` importa esa función y maneja los tres estados: cargando, datos y error (`try/catch`).

## Cómo probar

Este ejercicio usa ES Modules y `fetch`, por lo que se recomienda abrirlo con un servidor local, por ejemplo Live Server de VS Code, en lugar de abrir directamente el archivo con `file://`.
