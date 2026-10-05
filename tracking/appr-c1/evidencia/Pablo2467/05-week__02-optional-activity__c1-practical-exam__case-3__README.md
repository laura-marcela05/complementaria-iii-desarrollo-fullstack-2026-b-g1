# Problema 3 — Framework y SPA

Explicación conceptual de componente, estado, enrutamiento y por qué una SPA necesita
una API, con ejemplos en pseudocódigo. Incluye el requisito en inglés (SPA vs MPA).

## Contenido

Todo el desarrollo conceptual está en `index.html`, organizado en 5 secciones:

1. Qué es un componente (con pseudocódigo de ejemplo).
2. Qué es el estado (con pseudocódigo de ejemplo).
3. Qué hace el enrutamiento (con pseudocódigo de ejemplo).
4. Por qué una SPA necesita una API.
5. English requirement: SPA vs MPA (2-3 oraciones en inglés).

## Resumen rápido

- **Componente**: pieza de interfaz reutilizable que combina estructura, lógica y
  estilo, y se puede instanciar varias veces con datos distintos.
- **Estado**: datos internos de un componente que, al cambiar, provocan que la vista
  se vuelva a renderizar automáticamente.
- **Enrutamiento**: mecanismo que muestra un componente u otro según la URL actual,
  sin recargar la página completa.
- **SPA y API**: una SPA no recibe HTML nuevo del servidor al navegar, por lo que
  depende de una API (normalmente vía `fetch`) para obtener datos actualizados.

## Estructura de archivos

case-3/
├── index.html
├── README.md
└── assets/
    └── css/
        └── style.css