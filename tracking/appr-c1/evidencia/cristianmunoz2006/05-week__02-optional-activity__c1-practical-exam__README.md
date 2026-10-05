# Parcial Práctico · Corte 1 — Semana 5

> **CONFIG:** FULL_NAME: `Cristian Andres Muñoz Montenegro` · GITHUB_USER: `cristianmunoz2006`

## Estructura del proyecto

```
c1-practical-exam/
├── assets/
│   └── css/
│       └── style.css        # ajustes propios sobre Bootstrap
├── data/
│   └── db.json                # datos que sirve json-server como API real
├── library/
│   └── bootstrap-4.6.2/        # Bootstrap local (ya incluido en el proyecto)
├── logic/
│   └── app.js                   # fetch (GET) + manejo de estados
├── index.html
└── README.md
```

## Cómo levantar la API local (json-server)

`data/db.json` se sirve como una API REST real con **json-server**
(necesitas [Node.js](https://nodejs.org) instalado):

```bash
# una sola vez, si no lo tienes instalado
npm install -g json-server

# desde la carpeta c1-practical-exam
json-server --watch data/db.json --port 3000
```

Esto expone `http://localhost:3000/quotes` con soporte real para
`GET`, `POST`, `PUT` y `DELETE`. Con la API corriendo, abre
`index.html` en el navegador y presiona "Cargar citas".

## Problema 1 — Fundamentos web (1.5)

La página (`index.html`) tiene un encabezado (`<header>` + `<h1>`), una
lista (`<ul>`) y un botón (`<button>`), con estilos de **Bootstrap 4.6.2**
(local, en `library/`) más ajustes propios en `assets/css/style.css`, y
un comportamiento en `logic/app.js`: al hacer clic en el botón, se
cargan y muestran las citas.

**Rol de cada lenguaje:**

- **HTML:** define la estructura y el contenido de la página (el
  encabezado, el botón, la lista donde van los datos).
- **CSS:** define la presentación visual (colores, espaciado,
  tipografía). Aquí la mayor parte viene de Bootstrap, y `style.css`
  solo hace ajustes puntuales.
- **JavaScript:** define el comportamiento: escucha el clic del botón,
  hace la petición `fetch` y actualiza el HTML con los datos recibidos.

## Problema 2 — Consumo de API (2.0)

El botón dispara una petición `fetch` con método **GET** hacia
`http://localhost:3000/quotes`, servido por json-server a partir de
`data/db.json`. Se manejan tres estados en `logic/app.js`:

- **Carga:** mientras espera la respuesta, se muestra un spinner de
  Bootstrap y el texto "Cargando...".
- **Datos:** si la respuesta es correcta, se recorren las citas y se
  agregan como `<li class="list-group-item">` a la lista.
- **Error:** si `fetch` falla (por ejemplo, si json-server no está
  corriendo) o la respuesta no es exitosa (`response.ok` es `false`),
  se muestra una alerta (`alert-danger` de Bootstrap) en vez de romper
  la página.

**Métodos HTTP:**

- Para **crear** un nuevo recurso se usaría **POST**.
- Para **borrar** un recurso existente se usaría **DELETE**.

(Con json-server corriendo, ambos ya funcionan de verdad sobre
`http://localhost:3000/quotes`, aunque este proyecto solo implementa el
`GET`.)

## Problema 3 — Framework y SPA (1.5)

- **Componente:** una pieza reutilizable de interfaz que agrupa su
  propia estructura, estilo y lógica. Por ejemplo, una tarjeta de cita
  que se puede repetir para cada elemento de una lista.
- **Estado:** los datos internos de un componente que, al cambiar,
  hacen que la interfaz se vuelva a dibujar automáticamente.
- **Enrutamiento (routing):** el mecanismo que decide qué componente
  mostrar según la URL actual, sin recargar la página completa.

**Pseudocódigo mínimo:**

```
componente TarjetaCita:
  estado: cita = null

  al_montar():
    cita = obtener_cita_de_la_api()

  render():
    si cita es null:
      mostrar "Cargando..."
    si_no:
      mostrar cita.texto y cita.autor

enrutador:
  ruta "/" -> mostrar componente ListaCitas
  ruta "/cita/:id" -> mostrar componente TarjetaCita
```

**¿Por qué una SPA necesita una API?** Una SPA no recarga páginas HTML
completas desde el servidor; en su lugar, carga una sola vez la
aplicación y luego pide únicamente los datos que necesita (en formato
JSON) a través de una API, actualizando solo las partes de la interfaz
que cambian.

### English requirement

An SPA (Single Page Application) loads a single HTML page once and then
updates the content dynamically with JavaScript, without reloading the
whole page. An MPA (Multi Page Application) loads a new HTML page from
the server on every navigation, which is simpler but usually slower
between pages. Because of this, an SPA relies on an API to fetch data
in the background instead of getting new data through full page loads.

## Cómo se versionó con Git

```bash
git clone <URL-de-tu-fork>
cd <carpeta-del-repo>
# coloca esta entrega dentro de:
# 05-week/optional-activity/c1-practical-exam/
git add .
git commit -m "Parcial práctico Corte 1 - Semana 05"
git push origin main
```
