# ¿Qué personaje de Rick y Morty eres?

Proyecto individual que construye una vista sencilla, valida datos del usuario,
consume una API pública y explica los fundamentos de una SPA (Single Page Application).

**API utilizada:** [Rick and Morty API](https://rickandmortyapi.com/) — API REST
pública, gratuita y sin necesidad de autenticación.

---

## Problema 1 — Fundamentos web

El proyecto usa **HTML5 semántico**: `<header>`, `<main>`, `<section>` y `<footer>`
organizan el contenido, y los resultados del personaje se muestran en una lista
real (`<ul>`/`<li>`) con sus datos (estado, especie, género, origen).

Con **CSS3** se define el diseño visual: colores, tipografía, tarjetas con sombra,
bordes redondeados y transiciones al interactuar con el botón.

Con **JavaScript** se agrega el comportamiento: al hacer clic en el botón
"Descubrir mi personaje", se valida el formulario y se dispara la búsqueda del
personaje sin recargar la página.

**Rol de cada lenguaje:**
- **HTML** → define la estructura y el contenido (qué hay en la página).
- **CSS** → define la presentación (cómo se ve).
- **JavaScript** → define el comportamiento (qué hace y cómo reacciona a las
  acciones del usuario).

---

## Problema 2 — Consumo de API

El archivo `assets/js/app.js` usa `fetch()` con método **GET** para pedir un
personaje aleatorio a la API:

```js
const response = await fetch(`${API_URL}/${idAleatorio}`);
const personaje = await response.json();
```

Los datos recibidos se muestran dinámicamente en la tarjeta de resultado,
incluyendo una lista (`<ul>`) con los detalles del personaje.

**Manejo de estados:**
| Estado | Qué pasa | Dónde se ve en el código |
|--------|----------|---------------------------|
| Carga  | Se muestra "⏳ Buscando tu personaje..." y se deshabilita el botón | `setStatus("Buscando...", "loading")` |
| Datos  | Se muestra la tarjeta con la imagen y los detalles del personaje | `mostrarResultado(nombre, edad, personaje)` |
| Error  | Si faltan datos, el formato es inválido, o la API falla, se muestra un mensaje en rojo | validaciones + bloque `catch (error)` |

**Métodos HTTP para otras acciones:**
- Para **crear** un personaje nuevo se usaría el método **POST**, enviando los
  datos del nuevo personaje en el cuerpo (body) de la petición.
- Para **borrar** un personaje se usaría el método **DELETE**, indicando el
  identificador (id) del personaje a eliminar en la URL.

*(Esta API pública es de solo lectura, por eso el proyecto solo implementa GET,
pero el comportamiento de POST y DELETE se explica aquí conceptualmente).*

---

## Problema 3 — Framework y SPA

- **Componente:** es una parte de la interfaz con una estructura fija (siempre
  se ve igual en su forma), pero que recibe datos distintos cada vez que se usa.
  Esto permite reutilizarlo sin tener que volver a escribir el HTML desde cero
  cada vez. En este proyecto, la función `mostrarResultado()` cumple ese rol:
  siempre arma la misma estructura (imagen + nombre + lista de detalles), solo
  cambiando según el personaje recibido.

  
- **Estado:** es la información que puede cambiar con el tiempo y que determina
  lo que se muestra en pantalla. En este proyecto, el mensaje de `#status`
  (cargando / éxito / error) y la visibilidad de `#resultSection` son ejemplos
  de estado: cambian según en qué momento del proceso va la aplicación.

- **Enrutamiento (routing):** es el mecanismo que permite mostrar distinto
  contenido o "pantalla" según la URL, sin necesidad de recargar el navegador.
  En un framework como React o Vue, un router intercepta los cambios de URL y
  decide qué componente mostrar en cada caso.

**¿Por qué una SPA necesita una API?**
Porque necesita pedir datos reales y actualizados desde afuera, ya que esos
datos no vienen escritos de antemano en el HTML. En este proyecto, cuando el
usuario hace clic en "Descubrir mi personaje", la información no estaba en la
página desde el inicio: se pide en ese momento a la API, y JavaScript la usa
para actualizar la pantalla sin recargarla.

### English requirement

A Single Page Application (SPA) loads one HTML page and updates its content
dynamically with JavaScript, without reloading the browser. A Multi Page
Application (MPA) loads a new full page from the server every time the user
navigates. Because of this, an SPA needs an API to fetch fresh data in the
background, while an MPA usually gets its data already embedded in each new
page the server sends.

---

## Estructura del proyecto

explorador-personajes/
├── index.html
├── assets/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── app.js
└── README.md


## Cómo probarlo

Abre `index.html` con Live Server (o haciendo doble clic). Ingresa un nombre
(solo letras) y una edad (solo números), y presiona **"Descubrir mi personaje"**.