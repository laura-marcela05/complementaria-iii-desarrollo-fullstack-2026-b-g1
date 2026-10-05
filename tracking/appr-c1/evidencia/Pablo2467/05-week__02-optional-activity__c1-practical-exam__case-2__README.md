# Problema 2 — Consumo de API

Lista de usuarios obtenida desde una API pública con `fetch`, manejando los tres
estados de la petición: carga, datos y error.

## Descripción

Al cargar la página, se hace una petición GET a la API de JSONPlaceholder
(`https://jsonplaceholder.typicode.com/users`). Mientras se espera la respuesta se
muestra un mensaje de "Cargando...". Si la petición es exitosa, los usuarios se
renderizan dinámicamente como tarjetas con nombre, email, ciudad y teléfono. Si la
petición falla (error de red o respuesta HTTP no exitosa), se muestra un mensaje de
error en lugar de la lista.

## Manejo de estados

- **Carga**: se muestra apenas se ejecuta `obtenerUsuarios()`, antes de recibir
  respuesta del servidor.
- **Datos**: una vez que `fetch` resuelve correctamente y `response.ok` es `true`,
  se limpia el mensaje de estado y se construyen las tarjetas con `createElement`.
- **Error**: se activa tanto si `fetch` rechaza la promesa (por ejemplo, sin conexión)
  como si el servidor responde con un status no exitoso (por ejemplo, 404), gracias a
  la verificación manual de `response.ok`.

## Métodos HTTP

- **Crear un usuario nuevo** → `POST`, ya que se envían datos nuevos al servidor
  para que cree un recurso.
- **Borrar un usuario** → `DELETE`, ya que se le solicita al servidor eliminar un
  recurso existente, normalmente identificado por su ID en la URL
  (por ejemplo, `DELETE /users/5`).

## Estructura de archivos

case-2/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── img/
    └── js/
        └── script.js