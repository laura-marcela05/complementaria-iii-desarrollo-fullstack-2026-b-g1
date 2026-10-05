# Parcial práctico — Corte 1

## Frontend inicial — Lista de productos

Este proyecto corresponde al parcial práctico del Corte 1. Se construyó una interfaz usando HTML5, CSS3 y JavaScript, y se agregó el consumo de una API mediante `fetch`.

---

# Problema 1 — Fundamentos web

Se construyó una vista utilizando HTML5, CSS3 y JavaScript. La página contiene un encabezado, una lista de productos y un botón que muestra un mensaje al hacer clic.

### Rol de cada lenguaje

**HTML5:** se utiliza para crear la estructura de la página y organizar su contenido. En este proyecto se utilizan elementos como `header`, `main`, `section`, `h1`, `h2`, `ul`, `li` y `button`.

**CSS3:** se utiliza para definir la apariencia de la página. Se aplican colores, espacios, bordes, tamaños y otros estilos para organizar los elementos y mejorar su presentación.

**JavaScript:** se utiliza para agregar comportamiento a la página. En este proyecto se utiliza `addEventListener` para detectar el clic del usuario en el botón y mostrar un mensaje.

---

# Problema 2 — Consumo de API

Se utilizó `fetch` con el método HTTP **GET** para obtener productos desde una API.

API utilizada:

`https://dummyjson.com/products?limit=15`

Los productos recibidos se muestran automáticamente en la lista de la página.

### Estados de la interfaz

La aplicación maneja tres estados:

* **Carga:** muestra "Cargando productos..." mientras se realiza la petición.
* **Datos:** cuando la petición funciona, muestra "Productos cargados:" y los productos recibidos.
* **Error:** si ocurre un problema con la petición, muestra "Error al cargar los productos."

### Métodos HTTP para crear y borrar

Para **crear** un nuevo recurso utilizaría el método **POST**.

Para **borrar** un recurso utilizaría el método **DELETE**.

---

# Problema 3 — Framework y SPA

### Componente

Un componente es una parte de la interfaz que puede reutilizarse. Por ejemplo, en una aplicación de productos se podría tener un componente encargado de mostrar un producto.

Ejemplo mínimo:

```text
Producto
 ├── nombre
 └── precio
```

El componente recibe los datos y los muestra en la interfaz.

### Estado

El estado son los datos que utiliza y muestra la vista. Por ejemplo, una aplicación puede comenzar con una lista vacía y después actualizarla cuando recibe los productos de una API.

```text
productos = []

Después de consultar la API:

productos = [producto1, producto2, producto3]
```

En un framework como Angular o React, cuando cambia el estado, la vista puede actualizarse automáticamente.

### Enrutamiento

El enrutamiento permite mostrar diferentes vistas o componentes dependiendo de la URL sin recargar toda la página.

Ejemplo:

```text
/productos
/productos/1
/categorias
```

El router permite navegar entre estas vistas dentro de una SPA.

### ¿Por qué una SPA necesita una API?

Una SPA necesita una API porque la interfaz necesita comunicarse con el backend para obtener y enviar datos. La SPA se encarga de mostrar y actualizar la interfaz, mientras que la API permite comunicarse con el servidor y acceder a los datos.

---

## English requirement

A SPA loads one main page and updates the content without reloading the entire page. An MPA loads different pages when the user navigates between sections. React and Angular are commonly used to build SPAs.

---

# Estructura del proyecto

```text
c1-practical-exam/
├── assets/
│   └── img/
├── library/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── index.html
└── README.md
```

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API
* Git y GitHub
