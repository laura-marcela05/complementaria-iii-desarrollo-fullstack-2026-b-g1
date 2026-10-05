# Explorador de Países — Semana 5

## Problema 1 — Fundamentos web
- **HTML** define la estructura: el encabezado (`header`), la lista (`ul`) y el botón.
- **CSS** define la apariencia: colores, tipografía y el acomodo en tarjetas.
- **JavaScript** define el comportamiento: al hacer clic en el botón, se piden los datos y se dibujan en la lista.

## Problema 2 — Consumo de API
Se usa `fetch` con método **GET** contra `https://countries.dev/region/Americas`.
Se manejan tres estados: cargando, datos y error (ver `assets/logic/script.js`).
- Para **crear** un registro se usaría **POST**.
- Para **borrar** un registro se usaría **DELETE**.

## Problema 3 — Framework y SPA
- **Componente**: un pedazo de interfaz reutilizable (ej. una tarjeta de país).
- **Estado**: los datos que un componente recuerda y que, al cambiar, actualizan la pantalla (ej. la lista de países, si está cargando).
- **Enrutamiento**: decide qué componente mostrar según la URL, sin recargar la página.

```
componente ListaPaises:
  estado paises = []
  estado cargando = verdadero

  al_montar():
    paises = await fetch("/api/countries")
    cargando = falso

ruta "/paises" -> ListaPaises
```

Una SPA necesita una API porque, al no recargar la página, no puede pedir un HTML nuevo
al servidor cada vez: solo pide los **datos** (JSON) y ella misma los dibuja.

### English requirement
A Single Page Application (SPA) loads one HTML page and updates its content dynamically
with JavaScript, without reloading the browser. A Multi Page Application (MPA) instead
requests a brand new HTML page from the server on every navigation, which is slower but
simpler to build.
