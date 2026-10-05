# 1. ¿Qué es un componente?

Un componente es una parte independiente y reutilizable de la interfaz.
-----
**Por ejemplo**, imaginemos:

```text
Aplicación
│
├── Header
├── TaskList
│   ├── Task
│   ├── Task
│   └── Task
└── Footer
```

Cada una de esas partes podría ser un componente.

**Un ejemplo mínimo en pseudocódigo sería:**

```text
COMPONENTE Task

    mostrar:
        "Estudiar JavaScript"

FIN COMPONENTE
```
La idea es que el componente encapsula una parte de la interfaz y su comportamiento.

# 2. ¿Qué es el estado?

El estado representa información que puede cambiar mientras la aplicación está funcionando.
----
**Por ejemplo:**
```
tareas = [
    "Estudiar",
    "Hacer ejercicio"
]
```
Si el usuario agrega una tarea:
```
tareas = [
    "Estudiar",
    "Hacer ejercicio",
    "Leer"
]
```
El estado cambió.

**Un pseudocódigo muy sencillo:**
```
estado tareas = []

agregarTarea("Estudiar")

estado tareas =
[
    "Estudiar"
]
```
También podríamos tener:
```
estado contador = 0

al hacer clic:
    contador = contador + 1
```
Antes:
```
contador = 0
```
Después del clic:
```
contador = 1
```
Eso es estado: un dato que puede cambiar y cuyo cambio puede afectar lo que vemos en pantalla.

# 3. ¿Qué hace el enrutamiento?

El enrutamiento permite determinar qué vista o componente mostrar dependiendo de la URL o ruta.
---
Imaginemos una SPA con:
```
/
 /home
 /products
 /contact
```
Podríamos tener:
```
Ruta             Componente

/home       →    Home
/products   →    Products
/contact    →    Contact
```
En pseudocódigo:
```
SI ruta = "/home"
    mostrar Home

SI ruta = "/products"
    mostrar Products

SI ruta = "/contact"
    mostrar Contact
```
Por ejemplo, si el usuario entra a:
```
/products
```
el sistema muestra:
```
Products
```
Si cambia a:
```
/contact
```
muestra:
```
Contact
```

**¿Por qué esto es importante en una SPA?**

Porque normalmente una SPA no necesita descargar una página HTML completamente nueva cada vez que el usuario cambia de sección.

La aplicación puede mantener la estructura principal y cambiar el componente que se muestra.

# 4. ¿Por qué una SPA necesita una API?

Una SPA puede encargarse de la interfaz, pero normalmente necesita información que está almacenada o procesada fuera del navegador.
----
**Por ejemplo:**
```
                 SPA
                  │
                  │ HTTP / fetch
                  ↓
                 API
                  │
                  ↓
              Base de datos
```
Imaginemos una aplicación de productos.

La SPA necesita mostrar:
```
Productos
────────────
Collar
Anillo
Pulsera
```
Pero esos productos normalmente no deberían estar escritos directamente dentro del código del frontend.

La SPA puede solicitar:
```
GET /products
```
La API responde:
```JSON
[
    {
        "id": 1,
        "name": "Collar"
    },
    {
        "id": 2,
        "name": "Anillo"
    }
]
```
Y la SPA utiliza esos datos para actualizar la interfaz.

# 5. Entonces, ¿una SPA siempre necesita una API?

Técnicamente sería más correcto decir que una SPA que necesita datos dinámicos de un servidor normalmente utiliza una API.

No toda SPA necesariamente requiere una API externa. Podría funcionar solamente con información local.

Pero para una aplicación real como:

- ecommerce,
- banco,
- sistema académico,
- gimnasio,
- redes sociales,

la SPA necesita comunicarse con un backend para obtener y modificar datos.

**En conclusión:**

"Una SPA necesita una API para comunicarse con el backend y obtener o enviar información sin tener que recargar completamente la página. Por ejemplo, puede utilizar GET para consultar productos y POST para crear información."

# 6. Diferencia entre SPA y MPA — English requirement

An SPA (Single Page Application) loads a single web page and updates its content dynamically without reloading the entire page. An MPA (Multi-Page Application) loads a new HTML page whenever the user navigates to a different section. Therefore, SPAs usually provide a more fluid user experience, while MPAs rely on multiple pages.

# 7. Ejemplo mínimo completo
```
COMPONENTE: TaskList

    estado:
        tareas = []

    función agregarTarea(tarea):
        tareas.agregar(tarea)

    mostrar:
        lista de tareas


ENRUTAMIENTO:

    "/home"     → Home
    "/tasks"    → TaskList
    "/contact"  → Contact


API:

    GET /tasks
        ↓
    devuelve las tareas
        ↓
    TaskList actualiza su estado
        ↓
    muestra las tareas
```
# 8. Resumen

## - Componente

Es una parte independiente y reutilizable de la interfaz."

## - Estado

Es información que puede cambiar durante la ejecución y cuyo cambio puede actualizar la interfaz.

## - Enrutamiento

Permite asociar rutas con diferentes vistas o componentes y determinar qué contenido mostrar.

## - SPA + API

La SPA utiliza una API para comunicarse con el backend, obtener y enviar datos sin tener que recargar completamente la página.

---
**Y la diferencia:**

- SPA → una página que cambia dinámicamente.
- MPA → múltiples páginas HTML que se cargan durante la navegación.

