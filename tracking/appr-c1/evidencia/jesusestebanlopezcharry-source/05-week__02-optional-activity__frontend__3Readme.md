# Problema 3 — Framework y SPA

## 1. ¿Qué es un componente?

Un **componente** es una parte reutilizable de la interfaz de una aplicación. Puede representar un botón, una lista de productos, un formulario, una tarjeta, etc.

### Ejemplo en React

```jsx
function Boton() {
    return <button>Guardar</button>;
}
```

En este ejemplo, `Boton` es un componente que muestra un botón.

---

## 2. ¿Qué es el estado?

El **estado** es la información que puede cambiar durante el funcionamiento de la aplicación y que puede modificar lo que se muestra en pantalla.

### Ejemplo

```jsx
const [contador, setContador] = useState(0);

<button onClick={() => setContador(contador + 1)}>
    Clics: {contador}
</button>
```

En este caso:

* `contador` → contiene el valor actual.
* `setContador` → permite modificar el valor.
* `0` → es el valor inicial.

Cada vez que el usuario presiona el botón, el estado cambia y la interfaz se actualiza.

---

## 3. ¿Qué hace el enrutamiento?

El **enrutamiento (Routing)** permite navegar entre diferentes vistas de una aplicación utilizando diferentes URLs, sin necesidad de recargar completamente la página.

Por ejemplo:

```text
/productos
    ↓
Vista de productos

/clientes
    ↓
Vista de clientes

/login
    ↓
Vista de inicio de sesión
```

En una aplicación React se puede utilizar una librería como `React Router` para manejar estas rutas.

---

## 4. ¿Por qué una SPA necesita una API?

Una **SPA (Single Page Application)** es una aplicación web que carga una página principal y actualiza su contenido dinámicamente sin tener que recargar toda la página.

Aunque la interfaz se ejecuta en el navegador, normalmente necesita obtener información desde un servidor. Para realizar esta comunicación se utiliza una **API**.

### Ejemplo

```text
┌─────────────────────────┐
│       SPA / React       │
│       Frontend          │
└────────────┬────────────┘
             │
             │ GET /productos
             ↓
┌─────────────────────────┐
│      API / Backend      │
│    Node.js + Express    │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│       Base de datos     │
└────────────┬────────────┘
             │
             │ Datos
             ↓
┌─────────────────────────┐
│       SPA / React       │
│  Muestra los productos  │
└─────────────────────────┘
```

La API permite que el frontend pueda **consultar, crear, modificar y eliminar información**.

| Operación           | Método HTTP |
| ------------------- | ----------- |
| Consultar productos | `GET`       |
| Crear producto      | `POST`      |
| Modificar producto  | `PUT`       |
| Eliminar producto   | `DELETE`    |

## Conclusión

Los **componentes** permiten construir la interfaz de forma organizada y reutilizable. El **estado** permite manejar información que cambia durante la ejecución de la aplicación. El **enrutamiento** permite navegar entre diferentes vistas de una SPA.

Una SPA necesita una **API** porque esta permite conectar el frontend con el backend y acceder a los datos almacenados en el servidor o en una base de datos.


SPA vs MPA

A SPA (Single Page Application) loads a single web page and dynamically updates its content without fully reloading the page when the user navigates. An MPA (Multi-Page Application) loads a new HTML page from the server whenever the user navigates to a different section. Therefore, SPAs usually provide a faster and smoother user experience, while MPAs are more traditional and server-driven.