# Problema 3 - Framework y SPA

## 1. Componente

Un componente es una parte reutilizable de la interfaz. Agrupa su propia estructura y comportamiento, y se puede usar varias veces dentro de una aplicación.

Pseudocódigo mínimo:

```text
Componente Boton:
    mostrar un botón
    cuando el usuario haga clic:
        ejecutar una acción
```

## 2. Estado

El estado representa información que puede cambiar mientras el usuario utiliza la aplicación. Cuando el estado cambia, la interfaz se actualiza para reflejar ese cambio.

Ejemplo sencillo:

```text
estado contador = 0

al hacer clic:
    contador = contador + 1
    actualizar pantalla
```

## 3. Enrutamiento

El enrutamiento permite cambiar entre vistas o páginas de una SPA utilizando rutas, por ejemplo:

```text
/
/usuarios
/perfil
```

En una SPA, normalmente el enrutamiento actualiza solo la parte de la vista que cambia, sin recargar completamente todo el documento HTML.

## 4. ¿Por qué una SPA necesita una API?

El frontend de una SPA se ejecuta principalmente en el navegador, pero casi siempre necesita obtener o enviar datos a un servidor (por ejemplo, usuarios, productos, publicaciones o inicio de sesión). La API es el medio que permite esa comunicación entre el frontend y el backend, ya que el frontend por sí solo no puede acceder directamente a la base de datos ni a la lógica del servidor.

## 5. SPA vs MPA — English requirement

An SPA loads a single main page and updates its content dynamically without reloading the entire website. An MPA loads a new HTML page from the server every time the user navigates to another section. SPAs usually feel faster once loaded, while MPAs follow a more traditional page-by-page approach.
