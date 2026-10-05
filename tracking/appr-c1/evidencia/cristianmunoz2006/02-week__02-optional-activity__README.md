# Semana 2 — Maqueta una interfaz web: Mi Estantería

> **CONFIG:** FULL_NAME: `Cristian Andres Muñoz Montenegro` · GITHUB_USER: `cristianmunoz2006`

## Qué es

Una maqueta estática de interfaz: una "estantería" con una lista de
libros. Cada tarjeta tiene un botón que, al hacer clic, muestra u oculta
la sinopsis del libro. No consume ninguna API — el objetivo de esta
semana es estructura semántica, estilo con CSS y un comportamiento
simple con JavaScript.

## Cómo cumple el enunciado

- **HTML5 semántico:** `<header>`, `<main>`, `<section>`, una lista
  `<ul>` de `<li>` con `<article>` por cada libro, `<h1>`/`<h2>`/`<h3>`
  jerárquicos, `<button>` y `<footer>`.
- **CSS3:** paleta de color (crema, granate, verde bosque, dorado),
  espaciado consistente y **layout con flexbox** (`.book-list` con
  `flex-wrap` para que las tarjetas se acomoden solas y sean
  responsivas).
- **Comportamiento con JavaScript:** al hacer clic en "Ver sinopsis" se
  muestra el párrafo oculto (`hidden`) con la sinopsis del libro, y el
  botón cambia a "Ocultar sinopsis" para poder volver a ocultarlo.

## Estructura del proyecto

```
02-week/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Cómo ejecutarlo

No requiere instalación. Abre `index.html` directamente en el navegador,
o sírvelo con un servidor estático local:

```bash
cd 02-week
python3 -m http.server 8080
# abre http://localhost:8080
```

## Cómo se versionó con Git

```bash
git clone https://github.com/cristianmunoz2006/complementaria-iii-desarrollo-fullstack-2026-b-g1.git
cd complementaria-iii-desarrollo-fullstack-2026-b-g1
# coloca esta entrega dentro de la carpeta 02-week/02-optional-activity/
git add .
git commit -m "Entrega semana 02"
git push origin main
```
