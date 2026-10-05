# Parcial Práctico - Corte 1
## Desarrollo Full Stack

**Estudiante:** Andrés Gómez

---

# Descripción

Este proyecto fue desarrollado como parte del parcial práctico del Corte 1 de la asignatura Desarrollo Full Stack.

En este trabajo se aplican conceptos básicos de:

- HTML5 semántico
- CSS3
- JavaScript
- Consumo de APIs con fetch
- Método HTTP GET
- Manejo de estados (carga, datos y error)
- Conceptos de SPA, componentes, estado y enrutamiento

---

# Problema 1 - Fundamentos Web

## HTML

HTML se utiliza para crear la estructura de la página web mediante etiquetas semánticas como:

- header
- main
- section
- footer
- ul
- li
- button

## CSS

CSS se utiliza para mejorar la apariencia de la página mediante colores, tamaños, márgenes y distribución de los elementos.

## JavaScript

JavaScript se utiliza para agregar comportamiento e interacción. En este proyecto, al presionar un botón se modifica el contenido mostrado en la página.

---

# Problema 2 - Consumo de API

Para obtener información se utilizó una petición HTTP mediante:

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
```

Se empleó el método GET para consultar los datos y mostrarlos dinámicamente en una lista.

## Estados de la interfaz

La aplicación contempla tres estados:

- Cargando: mientras se obtienen los datos.
- Datos: cuando la información se carga correctamente.
- Error: cuando ocurre un problema durante la petición.

## Métodos HTTP

**GET**
- Permite consultar información.

**POST**
- Permite crear nueva información.

**PUT**
- Permite actualizar información existente.

**DELETE**
- Permite eliminar información.

---

# Problema 3 - Framework y SPA

## ¿Qué es un componente?

Un componente es una parte reutilizable de una interfaz de usuario. Por ejemplo, una tarjeta de producto, un formulario o un menú de navegación.

## ¿Qué es el estado?

El estado corresponde a los datos que utiliza una aplicación para mostrar información al usuario. Cuando estos datos cambian, la vista se actualiza.

## ¿Qué es el enrutamiento?

El enrutamiento o router permite mostrar diferentes vistas según la URL sin necesidad de recargar toda la página.

Ejemplos:

```text
/productos
/contacto
/perfil
```

## ¿Por qué una SPA necesita una API?

Una SPA necesita una API porque los datos no se encuentran directamente en la interfaz. La aplicación realiza peticiones al backend para obtener la información que será mostrada al usuario.

---

# English Requirement

A SPA loads a single page and updates content without reloading.

An MPA loads a new page every time the user navigates.

A SPA is usually faster for the user after the first load.

---

# Estructura del Proyecto

```text
c1-practical-exam/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   └── logic/
│       └── logic.js
│
└── README.md
```

---

# Conclusión

Este proyecto permite aplicar los conceptos fundamentales vistos durante el primer corte, incluyendo la estructura de páginas web con HTML, el diseño con CSS, la interacción mediante JavaScript, el consumo de datos usando fetch y los conceptos básicos relacionados con las aplicaciones SPA.