# UrbanStyle E-Commerce

Frontend de una tienda de ropa urbana (camisetas, zapatos, vestidos y accesorios), construido con React (vía Babel standalone, sin build tools) y CSS puro. El catálogo se consume en tiempo real desde una API pública.

## Overview

UrbanStyle is a responsive front-end e-commerce application for a streetwear clothing store, built with React and vanilla CSS. The app consumes the DummyJSON public API (`https://dummyjson.com/products`) to fetch real product data, including titles, prices, images, and categories, instead of relying on hardcoded content. It properly handles the three key states of an asynchronous request: a loading state with a spinner while the data is being fetched, an error state with a retry button if the request fails, and a success state that renders the product catalog once the data arrives. Users can browse products by category, filter by brand, sort by price, switch between grid views, add items to a shopping cart, and view individual product details. The interface is fully responsive and follows a minimalist, dark-and-neutral visual style inspired by modern streetwear e-commerce brands.

## Cómo ejecutarlo

1. Clona este repositorio (o tu fork).
2. Abre la carpeta del proyecto en VS Code.
3. Instala la extensión **Live Server** si no la tienes.
4. Click derecho sobre `index.html` → **Open with Live Server**.
5. Se abrirá en `http://127.0.0.1:5500` (o similar).

> ⚠️ Importante: el proyecto usa `fetch()` para consumir la API, así que **necesita conexión a internet** para mostrar productos, y **no funciona** abriendo `index.html` directamente con doble clic (protocolo `file://`) — debe servirse con Live Server u otro servidor local.

## Estructura del proyecto

```
├── index.html      # Punto de entrada, carga React, Babel y los archivos del proyecto
├── app.jsx         # Toda la lógica y componentes de React
├── style.css       # Estilos
└── README.md
```

## API consumida

- **DummyJSON** — https://dummyjson.com/docs/products
- Endpoint usado: `GET https://dummyjson.com/products?limit=0`
- Se filtran y traducen las categorías de la API (`mens-shirts`, `tops`, `mens-shoes`, `womens-shoes`, `womens-dresses`, `sunglasses`, `womens-bags`, `womens-jewellery`, `mens-watches`, `womens-watches`) a las secciones de la tienda: **Camisetas, Zapatos, Vestidos, Accesorios**.

## Estados manejados

| Estado | Qué se ve |
|---|---|
| Cargando | Spinner + "Cargando catálogo…" |
| Error | Mensaje de error + botón "Reintentar" |
| Datos listos | Catálogo completo, filtros, carrito funcionando |

---
Actividad calificable · Corte 1 — Frontend que consume una API · Semana 4
