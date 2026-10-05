# c1-practical-exam — case-1

Proyecto del Parcial práctico · Corte 1. Es una vista simple que muestra una lista de jugadores de fútbol, consumidos desde una API propia creada con `json-server`.

## Estructura del proyecto

```
case-1/
├── assets/
│   ├── library/bootstrap/   → Bootstrap (librería de terceros)
│   ├── img/                 → imagen usada en la lista de jugadores
│   ├── css/style.css        → estilos propios
│   └── logic/app.js         → lógica del clic y del fetch a la API
├── api/
│   └── db.json              → datos que usa json-server como base de datos
├── docs/
│   └── problema3.md         → explicación del Problema 3 (componente, estado, enrutamiento, SPA)
├── index.html                → vista principal (Problema 1 y 2)
└── README.md                 → este archivo
```

## Cómo correr el proyecto

1. Abrir una terminal dentro de la carpeta `api/`.
2. Instalar json-server (si no está instalado):
```
   npm install -g json-server
```
3. Levantar la API:
```
   json-server --watch db.json --port 3000
```
4. Abrir `index.html` en el navegador.
5. Dar clic en el botón "Cargar jugadores" para ver la lista.

Nota: Para apagar el json basta con presionar `Ctrl + C` en la terminal donde se levantó el servidor.

## Problema 1 — Fundamentos web

Se construyó una vista con **HTML5 semántico** (`header`, `main`, lista y botón), a la que se le dio estilo con **CSS3** (colores, tipografía, espaciado) y se le agregó comportamiento con **JavaScript** (al hacer clic en el botón se ejecuta una función).

El rol de cada lenguaje es distinto pero se complementan:
- **HTML** se encarga de la estructura y el contenido de la página, es como el "esqueleto".
- **CSS** se encarga de la parte visual, cómo se ve todo (colores, tamaños, orden).
- **JavaScript** se encarga del comportamiento, o sea que la página reaccione a lo que hace el usuario, como un clic.

## Problema 2 — Consumo de API

Se consume la API propia (`http://localhost:3000/jugadores`) usando `fetch` con método **GET**, y se manejan los tres estados:
- **Carga:** mientras se están pidiendo los datos, se muestra el mensaje "Cargando jugadores...".
- **Datos:** cuando llegan los datos, se muestran en la lista.
- **Error:** si algo falla (por ejemplo si el servidor está apagado), se muestra un mensaje de error en pantalla.

Métodos HTTP usados para las otras operaciones:
- Para **crear** un jugador se usaría **POST** a `http://localhost:3000/jugadores`.
- Para **borrar** un jugador se usaría **DELETE** a `http://localhost:3000/jugadores/:id`.

## Problema 3 — Framework y SPA

La explicación completa (componente, estado, enrutamiento, ejemplo en pseudocódigo, por qué una SPA necesita API, y el párrafo en inglés) está en [`docs/problema3.md`](./docs/problema3.md).

