# Case 1 - Fullstack: Rol de cada lenguaje

El **case-1** es una pequeña aplicación web que permite al usuario ingresar su nombre y apellido, y al hacer clic en un botón, muestra un mensaje de confirmación en pantalla. El proyecto está compuesto por tres archivos, cada uno correspondiente a un lenguaje distinto, y cada uno cumple un rol específico dentro de la arquitectura Fullstack (Frontend).

## Estructura del proyecto

```
case-1/
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── script.js
```

## 1. HTML (`index.html`) — Estructura y contenido

**Rol:** HTML es el lenguaje de marcado que define la **estructura** y el **contenido** de la página. Es el esqueleto sobre el cual se apoyan el estilo (CSS) y el comportamiento (JavaScript).

En este caso, el `index.html`:

- Declara el documento (`<!DOCTYPE html>`) y el idioma (`lang="es"`).
- Define el `<head>`, donde se enlazan las hojas de estilo: Bootstrap (`bootstrap.min.css`) y los estilos propios (`styles.css`).
- Define el `<body>` con los elementos visibles:
  - Un título (`<h1>`) con el nombre del ejercicio.
  - Dos campos de texto (`<input>`) para capturar el **nombre** y el **apellido** del usuario.
  - Un botón (`<button id="boton">`) que dispara la acción.
  - Un elemento `<span id="mensaje">` vacío, que servirá como contenedor donde luego se mostrará el mensaje generado por JavaScript.
- Al final, enlaza el script (`script.js`) que le dará interactividad a la página.

En resumen, el HTML **no tiene lógica ni estilo propio**: solo declara qué elementos existen y cómo se relacionan entre sí (inputs, botón, mensaje). Es la base sobre la que actúan los otros dos lenguajes.

## 2. CSS (`styles.css`) — Presentación y estilo visual

**Rol:** CSS se encarga de la **apariencia visual** de los elementos definidos en el HTML. No agrega contenido ni comportamiento, solo controla cómo se ven las cosas (espaciados, tamaños, márgenes, etc.).

En `styles.css` se definen reglas simples:

- `body { margin: 30px; }` → agrega un margen general a toda la página para que el contenido no quede pegado a los bordes del navegador.
- `input { margin-bottom: 10px; }` → separa verticalmente los campos de texto entre sí.
- `button { padding: 8px; }` → agranda el área clickeable/visual del botón, dándole más espacio interno.
- `#mensaje { margin-left: 10px; }` → separa el mensaje de confirmación del botón, para que no queden pegados visualmente.

Este archivo trabaja junto con Bootstrap (framework CSS incluido también en el `<head>`), que aporta estilos base más generales, mientras que `styles.css` son los ajustes personalizados y específicos de este ejercicio.

## 3. JavaScript (`script.js`) — Comportamiento e interactividad

**Rol:** JavaScript es el lenguaje que le da **lógica y dinamismo** a la página. Es el encargado de reaccionar a las acciones del usuario y modificar el contenido de la página en tiempo real, sin necesidad de recargarla.

En `script.js`:

```js
let boton = document.getElementById("boton");
let mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.innerHTML = "Datos ingresados correctamente";
});
```

El proceso es el siguiente:

1. Se obtienen referencias a los elementos del DOM: el botón (`boton`) y el `span` de mensaje (`mensaje`), usando `document.getElementById()`.
2. Se agrega un **event listener** (escuchador de eventos) al botón, de tipo `click`.
3. Cuando el usuario hace clic en el botón, se ejecuta una función que **modifica el contenido HTML** del `span#mensaje`, insertando el texto `"Datos ingresados correctamente"`.

Es decir, JavaScript es el "cerebro" del ejercicio: conecta la interfaz (HTML) con la interacción del usuario, permitiendo que la página **responda dinámicamente** a un evento (el clic) sin necesidad de un backend ni de recargar la página.

## Resumen general

| Lenguaje   | Rol principal                          | Qué hace en case-1                                                                 |
|------------|------------------------------------------|--------------------------------------------------------------------------------------|
| **HTML**   | Estructura y contenido                  | Define los inputs, el botón y el contenedor del mensaje.                            |
| **CSS**    | Presentación y estilo visual            | Da márgenes, espaciados y padding a los elementos para que se vean ordenados.        |
| **JavaScript** | Comportamiento e interactividad     | Detecta el clic en el botón y actualiza dinámicamente el mensaje en pantalla.        |

En conjunto, los tres lenguajes forman la capa de **frontend** de esta aplicación: HTML aporta el "qué", CSS aporta el "cómo se ve" y JavaScript aporta el "cómo reacciona".