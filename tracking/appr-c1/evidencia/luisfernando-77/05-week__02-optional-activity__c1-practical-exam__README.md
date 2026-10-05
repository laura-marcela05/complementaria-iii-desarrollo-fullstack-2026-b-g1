# Parcial práctico · Corte 1 — TruequeLocal

## Problema 1 — Fundamentos web

- **HTML**: estructura el contenido (encabezado, formulario, lista, botones).
- **CSS**: define la apariencia visual (colores, tarjetas, espaciados).
- **JavaScript**: agrega comportamiento. Al enviar el formulario se agrega un objeto a la lista, y al hacer clic en "✕" se elimina.

## Problema 2 — Consumo de API

Se usa `fetch` con método **GET** a `https://jsonplaceholder.typicode.com/posts`. Estados manejados:

- **Cargando**: mensaje mientras se espera la respuesta.
- **Datos**: se pintan los objetos en la lista.
- **Error**: si falla, se muestra un mensaje (try/catch).

**Métodos HTTP:**
- Crear un objeto: **POST**.
- Borrar un objeto: **DELETE**.

## Problema 3 — Framework y SPA

- **Componente**: bloque de interfaz reutilizable (ej: cada `<li>` de un objeto).
- **Estado**: datos que cambian y actualizan la interfaz (ej: la lista de objetos).
- **Enrutamiento**: cambia de vista sin recargar la página (ej: Inicio, Publicar).

Ejemplo mínimo:

```
componente TarjetaObjeto(objeto):
    mostrar objeto.nombre
    boton "Eliminar" -> quitar objeto del estado

estado objetosDisponibles = []

al iniciar:
    objetosDisponibles = obtenerDatos(API)
    renderizar cada objeto

rutas:
    "/" -> Inicio
    "/publicar" -> PublicarObjeto
```

**¿Por qué una SPA necesita una API?**
La SPA solo maneja la interfaz; los datos reales (guardar, traer, borrar) los provee un servidor mediante una API.

---

## English requirement

A Single Page Application (SPA) updates content dynamically without reloading the page. A Multi Page Application (MPA) loads a new HTML page from the server on each navigation.
