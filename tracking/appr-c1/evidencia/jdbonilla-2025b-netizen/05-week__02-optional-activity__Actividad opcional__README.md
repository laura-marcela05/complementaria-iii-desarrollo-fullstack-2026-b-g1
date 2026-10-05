# Atlas · Mini-frontend (Semana 5)

Vista construida con **React + Vite** que consume la [REST Countries API](https://restcountries.com) para mostrar información de un país buscado por nombre.

## Qué hace

- Formulario de búsqueda por nombre de país.
- Maneja tres estados de la petición:
  - **Carga**: skeleton animado mientras llega la respuesta.
  - **Error**: mensaje claro si el país no existe o la API falla.
  - **Datos**: tarjeta con bandera, capital, región, población, idiomas y moneda.
- Diseño limpio y responsive, basado en un mockup propio (tema "atlas": navy + dorado).

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Stack

- React 18
- Vite 5
- Fetch nativo (sin librerías extra para consumo de API)

## Estructura

```
05-week/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── App.css
```
