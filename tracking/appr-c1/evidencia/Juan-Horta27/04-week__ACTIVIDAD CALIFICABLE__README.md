# Lista de usuarios · Frontend que consume una API

Actividad calificable del Corte 1 · Desarrollo Fullstack · CORHUILA

Vista que muestra una lista de usuarios traída de una API pública,
construida con Angular y con manejo de los tres estados de la interfaz.

## Overview

This project is a small web application that shows a list of users on a
single screen. The frontend is built with Angular and it is divided into
two components: one that keeps the state and asks for the data, and
another one that only receives a user and displays it. The data comes
from the public API `https://jsonplaceholder.typicode.com/users`, which
is requested with `fetch` and answers with the users in JSON format. The
app handles three states: a loading message while the request is
running, the list of users when the data arrives, and an error message
when the request fails. There is also a button called "Probar el error"
that calls an invalid address on purpose, so the error state can be
tested without turning off the internet. The user card is a separate and
reusable component: it receives the name, the email and the city through
inputs, so it can be used again on any other screen without changing its
code. The state is kept with Angular signals, which means the view is
drawn again on its own every time the data changes and the DOM is never
modified by hand.

## Cómo ejecutarlo

Necesitas Node.js y el CLI de Angular (`npm install -g @angular/cli`).

```
npm install
ng serve
```

Luego abre `http://localhost:4200`.

El `npm install` es obligatorio la primera vez: descarga las
dependencias, que no vienen dentro del proyecto.

## Mockup

El boceto de la vista está en `public/mockup.html`. Se abre con doble
clic, o en `http://localhost:4200/mockup.html` mientras corre la app.
Muestra la distribución de la pantalla y cómo se ve en cada uno de los
tres estados, antes de haberla programado.

## Estructura

- **`src/app/usuario-tarjeta.component.ts`** — el componente
  reutilizable. Recibe nombre, correo y ciudad por `@Input()` y solo se
  encarga de mostrarlos. No sabe de dónde salieron los datos, por eso
  sirve en cualquier pantalla.
- **`src/app/usuarios-lista.component.ts`** — tiene el estado, hace la
  petición con `fetch` y crea una tarjeta por cada usuario.
- **`src/app/app.ts`** — arma la página y coloca la lista adentro.
- **`src/styles.css`** — estilos globales.

El estado se maneja con **signals** (`usuarios`, `cargando`, `error`).
Al cambiar un signal la vista se vuelve a dibujar sola, así que en
ningún momento se toca el DOM a mano.

## Los tres estados

| Estado | Cuándo aparece |
|---|---|
| Cargando | Mientras la petición está en curso. Hay medio segundo de espera puesto a propósito para que alcance a verse. |
| Datos | Llega la lista y se muestra, con un mensaje del total. |
| Error | La petición falla. Se muestra un mensaje entendible y se puede reintentar. |

Hay además un cuarto caso contemplado: si la API responde bien pero la
lista viene vacía, se avisa en vez de dejar la pantalla en blanco.

## API usada

`https://jsonplaceholder.typicode.com/users` — API pública de prueba,
sin registro ni llave. Devuelve diez usuarios con nombre, correo y
dirección; de ahí se toman el nombre, el correo y la ciudad.
