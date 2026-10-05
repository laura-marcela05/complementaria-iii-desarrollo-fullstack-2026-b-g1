# Semana 4 - Componente que consume datos

Actividad opcional de refuerzo.

## Sobre el uso de React

Se usa React cargado por CDN (sin `npm`, sin Vite, sin herramientas de build):

- `js/UserCard.jsx`: componente reutilizable que recibe un usuario y muestra su tarjeta.
- `js/App.jsx`: componente principal, mantiene el estado (`usuarios`, `estado`) y consume la API con `fetch` dentro de `useEffect`.

Los `.jsx` se cargan con `<script type="text/babel">`, y Babel (también por CDN) los transforma en el navegador.

## Qué hace

- Al cargar la página, `App` consume `https://jsonplaceholder.typicode.com/users`.
- Mientras espera la respuesta, muestra "Cargando usuarios...".
- Con los datos, renderiza un `UserCard` por cada usuario.
- Si algo falla, muestra un mensaje de error.

## Cómo probar

Como se cargan archivos `.jsx` por `src` y se hace `fetch`, es necesario abrir este ejercicio con un servidor local, por ejemplo Live Server de VS Code, en lugar de abrir directamente el archivo con `file://`.
