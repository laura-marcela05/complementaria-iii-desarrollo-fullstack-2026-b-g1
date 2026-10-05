# Problema 3 — Framework y SPA

## ¿Qué es un componente?

Un componente es como un pedazo de la interfaz que se puede reutilizar. En lugar de escribir el mismo código varias veces cuando solo cambia un pequeño detalle, se define un componente una sola vez y ese mismo componente se puede usar cuantas veces se necesite, cambiando solo los datos que recibe. Esto hace que el desarrollo sea más eficiente y se ahorre tiempo, porque no se repite código innecesariamente.

## ¿Qué es el estado?

El estado es la información que un componente guarda y que puede cambiar con el tiempo, por ejemplo la lista de jugadores que se van cargando. Cuando esa información cambia, el componente se da cuenta y actualiza automáticamente lo que se ve en pantalla, sin que uno tenga que refrescar nada manualmente.

## ¿Qué hace el enrutamiento?

El enrutamiento es lo que permite cambiar de "página" dentro de una SPA sin que el navegador recargue realmente el sitio. Lo único que cambia es la URL en la barra de direcciones, pero por detrás lo que pasa es que se muestra un componente distinto en pantalla, dando la sensación de que se navegó a otra página aunque nunca hubo una recarga completa.

## Ejemplo mínimo (pseudocódigo)

```
componente TarjetaJugador(jugador):
    mostrar jugador.nombre
    mostrar jugador.equipo

componente ListaJugadores:
    estado jugadores = []

    al iniciar:
        jugadores = obtenerDatos("/jugadores")   // esto es la API

    por cada jugador en jugadores:
        mostrar TarjetaJugador(jugador)

enrutador:
    ruta "/"          -> mostrar ListaJugadores
    ruta "/jugador/1" -> mostrar DetalleJugador
```

Aquí `TarjetaJugador` es el componente reutilizable, `jugadores` es el estado (cambia cuando llegan los datos y la pantalla se actualiza sola), y el enrutador es el que decide qué componente mostrar según la URL, sin recargar la página.

## ¿Por qué una SPA necesita una API?

Una SPA nunca recarga la página, pero igual necesita mostrar información actualizada (como la lista de jugadores). La única forma de conseguir esos datos sin recargar es pidiéndolos a una API, que responde con la información y el componente la muestra en pantalla al momento. Gracias a esto la aplicación se siente más fluida, porque los datos cambian sin que el usuario note ningún salto o recarga.

## English requirement

An SPA (Single Page Application) loads only one HTML page and updates the content dynamically using JavaScript, without reloading the browser. An MPA (Multi Page Application), on the other hand, loads a new full page from the server every time the user navigates to a different section. Because of this, an SPA usually feels faster and smoother, while an MPA is simpler but requires a full page reload for every change.