# Mini-frontend: Jugadores Selección Colombia

Actividad Semana 5 · Desarrollo Fullstack · Corhuila

## 1. Descripción general

Este proyecto es una vista pequeña (mini-frontend) que muestra la lista de
convocados de la Selección Colombia al Mundial 2026. Los datos no vienen de
un backend real, sino de una API local simulada con **json-server**, que lee
la información desde el archivo `api/db.json`.

Al abrir la página se ve un botón **"Mostrar jugadores"**; al presionarlo,
la vista le pide los datos a la API y los muestra en tarjetas. Mientras se
comunica con la API, la vista pasa por tres estados: cargando, con datos, o
con error.

## 2. Mockup (boceto inicial)

Antes de escribir el código se pensó el diseño como dos pantallas simples,
dibujadas así:

**Pantalla 1 — Estado inicial (antes de pedir los datos)**

```
 ______________________________________________
| Selección Colombia                              |
|________________________________________________|
| Convocados al Mundial 2026                      |
| Presiona el botón para ver la lista.            |
|                                                  |
|                                                  |
|              [ Mostrar jugadores ]              |
|                                                  |
|                                                  |
|________________________________________________|
```

La página no le pide nada a la API apenas se abre. Se queda quieta,
mostrando solo un botón en el centro, hasta que el usuario decide ver la
lista.

**Pantalla 2 — Lista de jugadores (tras presionar el botón)**

```
 ______________________________________________
| Selección Colombia                              |
|________________________________________________|
| Convocados al Mundial 2026                      |
| Presiona el botón para ver la lista.            |
|                                                  |
|  [ ]  David Ospina        [ ]  James Rodríguez  |
|       #1 · Portero              #10 · Volante   |
|                                                  |
|  [ ]  Luis Díaz           [ ]  Yerry Mina       |
|       #7 · Delantero            #3 · Defensa    |
|________________________________________________|
```

Al presionar el botón de la Pantalla 1, este desaparece y en su lugar se
muestra (en este orden) el spinner de carga y, cuando la API responde, esta
lista. Cada jugador es una tarjeta con un ícono, su nombre, el dorsal y la
posición, y se acomodan en varias columnas según el tamaño de pantalla.

Este boceto es la base del diseño final: se respetó la misma idea (un
punto de entrada claro con el botón, tarjetas simples, colores de la
selección) y se terminó de vestir con Bootstrap para que se viera limpio
sin escribir mucho CSS a mano.

## 3. Los tres estados de la vista

La vista no pide los datos automáticamente al abrir la página: primero se
muestra un botón **"Mostrar jugadores"** en el centro. Solo cuando el
usuario lo presiona empieza la comunicación con la API, y ahí sí aparecen
los tres estados posibles:

- **Cargando:** al presionar el botón, se le pide la información a la API.
  Mientras responde, se muestra un spinner de Bootstrap con el texto
  "Cargando jugadores...".
- **Con datos:** si la API responde bien, el spinner desaparece y se pintan
  las tarjetas de los jugadores.
- **Con error:** si la API no responde (por ejemplo, porque `json-server`
  no está corriendo), se muestra un mensaje de alerta explicando el
  problema, con un botón de "Reintentar" para volver a pedir los datos sin
  recargar la página.

## 4. Tecnologías usadas

- **React** (vía CDN, sin herramientas de build como Vite o Webpack), como
  framework de JavaScript para la vista, usando Babel standalone para poder
  escribir JSX directamente en el navegador sin pasos de compilación.
- [Bootstrap 5](https://getbootstrap.com/), descargado del sitio oficial
  (paquete "Compiled CSS and JS") y guardado localmente en
  `assets/library/bootstrap/`, como framework de estilos.
- [json-server](https://github.com/typicode/json-server), como API falsa
  para simular el backend, usando `api/db.json` como base de datos.

## 5. Estructura del proyecto

```
case-1/
├── assets/
│   ├── library/bootstrap/   → Bootstrap (librería de terceros, css/ y js/)
│   ├── img/                 → ícono usado en la lista de jugadores
│   ├── css/style.css        → estilos propios
│   └── logic/app.js         → componente React (JSX), fetch y los 3 estados
├── api/
│   └── db.json              → datos que usa json-server como base de datos
├── index.html                → vista principal
└── README.md                 → este archivo
```

## 6. Cómo correrlo

1. Instala `json-server` (una sola vez, si no lo tienes):

   ```bash
   npm install -g json-server
   ```

2. Desde la carpeta `case-1/`, levanta la API falsa:

   ```bash
   json-server --watch api/db.json --port 3000
   ```

   Esto deja disponible `http://localhost:3000/jugadores` con los datos de
   `db.json`.

3. Abre `index.html` en el navegador (por ejemplo con la extensión
   **Live Server** de VS Code, o haciendo doble clic en el archivo).

   > Nota: React y Babel se cargan desde un CDN, así que se necesita
   > conexión a internet para verlos funcionar (json-server, en cambio,
   > corre en tu computador sin internet).

> Si `index.html` se abre sin tener `json-server` corriendo, la vista
> muestra el estado de error, con un botón para reintentar una vez lo
> levantes.

## 7. Notas finales

- Los datos de los jugadores (nombre, club, posición) corresponden a la
  convocatoria real de la Selección Colombia al Mundial 2026.