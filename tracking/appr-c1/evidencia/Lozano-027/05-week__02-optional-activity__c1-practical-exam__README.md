# Parcial Práctico · Corte 1 — Semana 5

## Problema 1 — Fundamentos web

En este problema se desarrolló una vista web utilizando **HTML5, CSS3, Bootstrap y JavaScript**.

La página contiene un encabezado, contenido principal, secciones, un botón y una lista.

### HTML5

HTML5 se utiliza para crear la estructura de la página y organizar el contenido mediante elementos semánticos como:

- `header`
- `main`
- `section`
- `footer`

También se utilizan `button`, `p` y `ul`.

### CSS3 y Bootstrap

CSS3 se utiliza para personalizar algunos estilos propios de la página.

Bootstrap se utiliza para facilitar el diseño mediante clases como:

```html
btn btn-primary
```

```html
card
```

```html
list-group
```

### JavaScript

JavaScript agrega interacción a la página. Al presionar el botón, se muestra un mensaje:

```javascript
helloButton.addEventListener("click", function () {
    message.textContent = "Hello! JavaScript is working.";
});
```

### Función de cada tecnología

- **HTML5:** crea la estructura y organiza el contenido.
- **CSS3:** personaliza la apariencia.
- **Bootstrap:** facilita el diseño y los componentes visuales.
- **JavaScript:** agrega comportamiento e interacción.

---

## Problema 2 — Consumo de API

Para este problema se utiliza la API pública **JSONPlaceholder**.

La aplicación consulta los usuarios mediante:

```text
https://jsonplaceholder.typicode.com/users
```

La petición se realiza con `fetch()` y el método HTTP `GET`.

```javascript
const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);
```

Después, la respuesta se convierte a JSON:

```javascript
const users = await response.json();
```

Los usuarios se recorren y se muestran en una lista HTML.

### Estados de la petición

**Estado de carga:** se muestra `Loading users...` mientras se espera la respuesta.

**Estado de datos:** los nombres de los usuarios se muestran en la lista cuando la respuesta es correcta.

**Estado de error:** si ocurre un problema, se muestra un mensaje utilizando `catch`.

### Métodos HTTP

| Acción | Método HTTP |
|---|---|
| Consultar | `GET` |
| Crear | `POST` |
| Actualizar | `PUT` o `PATCH` |
| Eliminar | `DELETE` |

Para crear un recurso se utiliza **POST** y para eliminar un recurso se utiliza **DELETE**.

---

## Problema 3 — Framework y SPA

### Componente

Un componente es una parte reutilizable de la interfaz de una aplicación.

Ejemplo:

```jsx
function UserList() {
    return (
        <section>
            <h2>Users</h2>
            <ul></ul>
        </section>
    );
}
```

### Estado

El estado es información que puede cambiar durante la ejecución de una aplicación.

Ejemplo:

```javascript
let loading = true;
```

Cuando termina la carga:

```javascript
loading = false;
```

### Routing

El routing permite navegar entre diferentes vistas o rutas de una aplicación.

Ejemplo:

```text
/        → Inicio
/users   → Usuarios
/about   → Acerca de
```

### ¿Por qué una SPA necesita una API?

Una SPA necesita una API para comunicarse con el servidor y obtener o enviar información. El frontend puede realizar peticiones HTTP para consultar, crear, actualizar o eliminar datos.

Ejemplo:

```text
Frontend SPA
     |
     | HTTP Request
     v
    API
     |
     v
  Servidor
```

---

## English requirement — SPA vs MPA

An **SPA (Single Page Application)** uses one main page and changes its content dynamically without reloading the entire page.

An **MPA (Multi Page Application)** loads a new HTML page when the user navigates to another section.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Fetch API
- JSON
- HTTP

---

## Estructura del proyecto

```text
c1-practical-exam/
│
├── README.md
│
└── case-1/
    │
    ├── index.html
    ├── app.js
    │
    └── assets/
        ├── library/
        │   └── bootstrap/
        │       ├── css/
        │       │   └── bootstrap.min.css
        │       └── js/
        │           └── bootstrap.bundle.min.js
        │
        ├── img/
        │   └── .gitkeep
        │
        └── css/
            └── style.css
```

### Archivos principales

- **`index.html`**: contiene la estructura HTML5.
- **`app.js`**: contiene la interacción y el consumo de la API.
- **`assets/css/style.css`**: contiene los estilos propios.
- **`assets/library/bootstrap/`**: contiene los archivos locales de Bootstrap.

---

## Cómo ejecutar

No se necesita Node.js ni una instalación adicional para esta versión.

1. Abrir la carpeta `c1-practical-exam`.
2. Entrar en `case-1`.
3. Abrir `index.html` con Google Chrome o Microsoft Edge.
4. Presionar **Click me** para probar JavaScript.
5. Presionar **Load users** para consultar la API.

> Se necesita conexión a Internet para que la consulta a JSONPlaceholder funcione.

---

## Pruebas realizadas

### Prueba 1 — JavaScript

Presionar `Click me` y comprobar que aparece:

```text
Hello! JavaScript is working.
```

### Prueba 2 — API

Presionar `Load users` y comprobar que se muestran los nombres de los usuarios.

### Prueba 3 — Estados

Durante la consulta se muestra el estado de carga. Si la petición falla, se muestra un mensaje de error.

---

## Relación con la rúbrica

| Problema | Requisito | Implementación |
|---|---|---|
| Problema 1 | HTML5 semántico | `header`, `main`, `section`, `footer` |
| Problema 1 | CSS3 | `style.css` |
| Problema 1 | Bootstrap | `btn`, `card`, `list-group` |
| Problema 1 | JavaScript | Evento `click` |
| Problema 2 | API | JSONPlaceholder |
| Problema 2 | Fetch | `fetch()` |
| Problema 2 | GET | Consulta de usuarios |
| Problema 2 | Loading | Mensaje de carga |
| Problema 2 | Data | Lista de usuarios |
| Problema 2 | Error | `catch` |
| Problema 2 | Crear | `POST` |
| Problema 2 | Eliminar | `DELETE` |
| Problema 3 | Componente | Ejemplo `UserList` |
| Problema 3 | Estado | Ejemplo `loading` |
| Problema 3 | Routing | Ejemplo de rutas |
| Problema 3 | SPA + API | Explicación de comunicación |
| Inglés | SPA vs MPA | Explicación en inglés |

---

## Autor

**FULL_NAME:** Tu Nombre Completo  
**GITHUB_USER:** TuUsuarioGitHub

---

## Entrega

El proyecto debe subirse al fork personal del repositorio de la clase, dentro de la carpeta correspondiente a la semana indicada por el docente.

Proceso básico:

```text
Fork
  ↓
Clonar
  ↓
Agregar el trabajo
  ↓
git add
  ↓
git commit
  ↓
git push
```

Antes de entregar, comprobar que los archivos estén en las rutas indicadas y que la aplicación funcione correctamente en el navegador.
