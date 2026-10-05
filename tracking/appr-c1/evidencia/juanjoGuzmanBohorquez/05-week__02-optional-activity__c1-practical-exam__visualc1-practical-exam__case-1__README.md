# Sistema de Control de Asistencia Estudiantil Corhuila

## Descripción del proyecto

El Sistema de Control de Asistencia Estudiantil Corhuila es una aplicación web propuesta para facilitar el registro y seguimiento de la asistencia de los estudiantes.

La idea surge debido a que actualmente el registro de asistencia puede realizarse mediante formatos físicos o plantillas que no están conectadas directamente a un sistema centralizado.

El objetivo del sistema es permitir que los docentes registren la asistencia de manera digital y que esta información pueda ser consultada y analizada de forma más rápida.

---

# Problema 1 — Fundamentos web

## HTML5

HTML5 se utiliza para estructurar el contenido de la página web.

En este proyecto se utilizan elementos semánticos como:

- `header` para el encabezado.
- `main` para el contenido principal.
- `section` para organizar la sección de estudiantes.
- `footer` para el pie de página.

También se utiliza una lista para mostrar los estudiantes y un botón para registrar la asistencia.

## CSS3

CSS3 se utiliza para dar estilo y presentación a la página web.

En este proyecto se utiliza para definir:

- Colores.
- Tamaños.
- Espaciado.
- Fondos.
- Botones.
- Distribución de los elementos.
- Apariencia general de la interfaz.

## JavaScript

JavaScript se utiliza para agregar comportamiento e interactividad.

En este proyecto se utiliza para detectar el clic del botón "Registrar asistencia" y mostrar un mensaje indicando que la asistencia fue registrada correctamente.

---
# Problema 3 — Framework y SPA

## 1. ¿Qué es un componente?

Un **componente** es una parte independiente y 
reutilizable de la interfaz de una aplicación. La idea 
es dividir una aplicación grande en partes más 
pequeñas, donde cada componente tenga una 
responsabilidad específica.

En nuestro **Sistema de Control de Asistencia 
Estudiantil Corhuila** podríamos tener diferentes 
componentes organizados de la siguiente manera:

```text
Sistema de Asistencia
│
├── Header
├── ListaEstudiantes
├── Estudiante
├── RegistroAsistencia
├── Reportes
└── Footer
```

Por ejemplo, `ListaEstudiantes` sería el componente 
encargado de mostrar los estudiantes.

### Ejemplo mínimo

```jsx
function ListaEstudiantes() {
    return (
        <section>
            <h2>Estudiantes</h2>

            <ul>
                <li>Juan Pérez</li>
                <li>María Rodríguez</li>
                <li>Carlos Gómez</li>
                <li>Laura Martínez</li>
            </ul>
        </section>
    );
}
```

Este componente podría utilizarse dentro de una vista 
más grande sin tener que escribir nuevamente toda la 
estructura de los estudiantes.

**En conclusión:** Un componente permite organizar, 
reutilizar y mantener más fácilmente las diferentes 
partes de la interfaz.

## 1. ¿Qué es un componente?

Un **componente** es una parte independiente y reutilizable de la interfaz de una aplicación. La idea es dividir una aplicación grande en partes más pequeñas, donde cada componente tenga una responsabilidad específica.

En nuestro **Sistema de Control de Asistencia Estudiantil Corhuila** podríamos tener diferentes componentes organizados de la siguiente manera:

```text
Sistema de Asistencia
│
├── Header
├── ListaEstudiantes
├── Estudiante
├── RegistroAsistencia
├── Reportes
└── Footer
```

Por ejemplo, `ListaEstudiantes` sería el componente encargado de mostrar los estudiantes.

### Ejemplo mínimo

```jsx
function ListaEstudiantes() {
    return (
        <section>
            <h2>Estudiantes</h2>

            <ul>
                <li>Juan Pérez</li>
                <li>María Rodríguez</li>
                <li>Carlos Gómez</li>
                <li>Laura Martínez</li>
            </ul>
        </section>
    );
}
```

Este componente podría utilizarse dentro de una vista más grande sin tener que escribir nuevamente toda la estructura de los estudiantes.

> **En conclusión:** Un componente permite organizar, reutilizar y mantener más fácilmente las diferentes partes de la interfaz.

---

## 1. ¿Qué es un componente?

Un **componente** es una parte independiente y reutilizable de la interfaz de una aplicación. La idea es dividir una aplicación grande en partes más pequeñas, donde cada componente tenga una responsabilidad específica.

En nuestro **Sistema de Control de Asistencia Estudiantil Corhuila** podríamos tener diferentes componentes organizados de la siguiente manera:

```text
Sistema de Asistencia
│
├── Header
├── ListaEstudiantes
├── Estudiante
├── RegistroAsistencia
├── Reportes
└── Footer
```

Por ejemplo, `ListaEstudiantes` sería el componente encargado de mostrar los estudiantes.

### Ejemplo mínimo

```jsx
function ListaEstudiantes() {
    return (
        <section>
            <h2>Estudiantes</h2>

            <ul>
                <li>Juan Pérez</li>
                <li>María Rodríguez</li>
                <li>Carlos Gómez</li>
                <li>Laura Martínez</li>
            </ul>
        </section>
    );
}
```

Este componente podría utilizarse dentro de una vista más grande sin tener que escribir nuevamente toda la estructura de los estudiantes.

**En conclusión:** Un componente permite organizar, reutilizar y mantener más fácilmente las diferentes partes de la interfaz.

---

## 2. ¿Qué es el estado?

El **estado** es la información que puede cambiar 
durante el funcionamiento de una aplicación y que 
puede provocar una actualización de la interfaz.

En nuestro sistema existen muchos datos que podrían 
manejarse mediante estado. Por ejemplo:

* Si una asistencia ya fue registrada.
* La lista de estudiantes.
* El estudiante seleccionado.
* El número de inasistencias.
* El estado de carga de los datos.

Por ejemplo, podríamos tener un estado que indique si 
la asistencia fue registrada:

```jsx
const [asistenciaRegistrada, setAsistenciaRegistrada] = useState(false);
```

**Inicialmente:**
`asistenciaRegistrada = false`

Cuando el docente registra la asistencia:

```jsx
function registrarAsistencia() {
    setAsistenciaRegistrada(true);
}
```

**El estado cambia:**
`false` → `true`

Y la interfaz puede mostrar un mensaje:

```jsx
{asistenciaRegistrada && (
    <p>La asistencia ha sido registrada correctamente.</p>
)}
```

De esta manera, el cambio del estado permite que la 
aplicación refleje lo que está sucediendo.

### Ejemplo aplicado al sistema

```text
Docente presiona "Registrar asistencia"
                ↓
      Cambia el estado
                ↓
 asistenciaRegistrada = true
                ↓
La interfaz muestra el mensaje:
"asistencia registrada"
```

**En conclusión:** El estado permite que la aplicación 
recuerde información que cambia durante la interacción 
con el usuario y actualice la interfaz cuando sea 
necesario.
## 3. ¿Qué hace el enrutamiento?

El **enrutamiento** permite controlar las diferentes 
vistas o secciones de una aplicación mediante 
diferentes rutas (URLs).

En nuestro **Sistema de Control de Asistencia** 
podríamos tener:

* `/estudiantes`
* `/asistencia`
* `/reportes`

Cada ruta representaría una sección diferente de la 
aplicación:

```text
/estudiantes
       ↓
Lista de estudiantes

/asistencia
       ↓
Registro de asistencia

/reportes
       ↓
Reportes de asistencia
```

En un framework como React, podríamos representarlo 
mediante un *router*:

```jsx
<Routes>
    <Route path="/estudiantes" element={<Estudiantes />} />
    <Route path="/asistencia" element={<Asistencia />} />
    <Route path="/reportes" element={<Reportes />} />
</Routes>
```

Esto significa que cuando el usuario accede a `/
asistencia`, la aplicación muestra el componente 
`<Asistencia />`. Y cuando accede a `/reportes`, 
muestra `<Reportes />`.

**En conclusión:** El enrutamiento permite organizar 
la navegación entre las diferentes vistas de la 
aplicación. En una **SPA** (Single Page Application) 
esto es especialmente importante porque permite 
cambiar de una vista a otra sin tener que recargar una 
página HTML completamente nueva.

---
# 4. ¿Por qué una SPA necesita una API?
Una SPA (Single Page Application) se encarga principalmente de presentar la interfaz y permitir que el usuario interactúe con ella. Sin embargo, la aplicación necesita trabajar con información que normalmente se encuentra almacenada en un servidor o en una base de datos.
Por ejemplo, nuestro Sistema de Control de Asistencia necesita manejar información como:

Estudiantes
     ↓
Asignaturas
     ↓
Asistencias
     ↓
Inasistencias
     ↓
Reportes

No sería conveniente guardar toda esa información directamente dentro del código de la aplicación, porque los datos cambian constantemente.
Por eso la SPA se comunica con una API, que funciona como intermediaria entre la aplicación y el servidor.
La comunicación sería aproximadamente así:

```text
+-------------------+
|       SPA         |
| Sistema asistencia|
+---------+---------+
          |
          | HTTP / fetch()
          v
+-------------------+
|        API        |
| Sistema asistencia|
+---------+---------+
          |
          v
+-------------------+
|   Base de datos   |
| Estudiantes       |
| Asistencias       |
| Asignaturas       |
+-------------------+
```

Por ejemplo, cuando el docente abre la sección de estudiantes, la SPA podría solicitar los datos a la API mediante GET:

```javascript
const respuesta = await fetch(
    "https://api.corhuila.edu/estudiantes"
);
```

La API recibiría la solicitud y devolvería los estudiantes.
De la misma manera, cuando el docente registra una asistencia, la SPA podría enviar los datos a la API mediante POST.

```text
SPA
 │
 │ GET → consultar estudiantes
 │
 ▼
API
 │
 ▼
Base de datos

Y para registrar:

SPA
 │
 │ POST → registrar asistencia
 │
 ▼
API
 │
 ▼
Base de datos
```

Por eso, una SPA necesita una API para poder acceder y modificar información que se encuentra en el servidor. La SPA se ocupa principalmente de la interfaz y la experiencia del usuario, mientras que la API permite la comunicación con los datos del sistema.
---
# English requirement — SPA vs. MPA

**An SPA (Single Page Application) loads a single page and updates its content dynamically without fully reloading the page. An MPA (Multi-Page Application) uses multiple pages, so the browser loads a new page when the user navigates to a different section. Therefore, SPAs usually provide faster and smoother navigation than MPAs.**