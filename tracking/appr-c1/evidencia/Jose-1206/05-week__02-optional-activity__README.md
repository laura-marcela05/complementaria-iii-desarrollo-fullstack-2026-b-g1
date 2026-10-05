# Catálogo de Productos — Mini-frontend integrado

Actividad 5 de Desarrollo Fullstack. Vista construida en React (vía CDN, sin build tool) que consume la API pública **FakeStoreAPI** y muestra un catálogo de productos.

## Qué incluye

- **Mockup → implementación:** la vista sigue el mockup de una lista/grid de tarjetas de producto (imagen, título y precio).
- **Consumo de API real:** `fetch` contra `https://fakestoreapi.com/products`.
- **Manejo de estados:** `loading` (spinner), `success` (grid de productos) y `error` (mensaje + posibilidad de reintentar con el botón "Actualizar catálogo").
- **Diseño limpio:** paleta cálida y tipografía Fraunces + Inter, tarjetas con layout flexible (`flexbox`).

## Estructura del proyecto

```
act5/
├── index.html   # Punto de entrada, monta el componente React
├── style.css    # Estilos de la vista y de los tres estados
├── app.js       # Componente App: estado, fetch y renderizado
└── README.md    # Este archivo
```

## Cómo ejecutarlo

1. Descarga la carpeta completa.
2. Abre `index.html` directamente en el navegador (no requiere instalación ni servidor, React se carga desde CDN).
3. Al cargar, el componente hace la petición automáticamente; usa el botón **Actualizar catálogo** para volver a consultarla.

## Versionado

Este proyecto se documenta siguiendo un versionado simple tipo [SemVer](https://semver.org/):

- **v1.0.0** — Primera entrega funcional: consumo de API, estados de carga/datos/error y diseño integrado a partir del mockup.

*Actividad 5 — Semana 5 — Desarrollo Fullstack*
