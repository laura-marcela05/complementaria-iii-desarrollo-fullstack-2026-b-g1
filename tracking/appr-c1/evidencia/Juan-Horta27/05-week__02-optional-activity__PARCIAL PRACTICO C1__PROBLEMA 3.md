# Problema 3 — Framework y SPA

## Componente

Un componente es un pedazo de interfaz que trae consigo todo lo que necesita para funcionar: su marcado, su comportamiento y, si hace falta, sus propios datos. La idea es poder usarlo en varios lugares sin copiar y pegar código, y cambiarlo en un solo sitio cuando algo se tenga que ajustar.

Recibe información desde afuera (las *props*) y devuelve lo que se debe pintar en pantalla:

```
COMPONENTE Saludo(nombre):
    DEVOLVER un título que diga "Hola, " + nombre

USO:
    Saludo(nombre = "Juan")
    Saludo(nombre = "Mario")
```

El mismo componente sirve dos veces con datos distintos. Eso es básicamente todo lo que hay detrás de la palabra.

## Estado

Las props llegan de afuera y el componente no las modifica. El estado, en cambio, es la información que vive dentro del componente y sí puede cambiar mientras la aplicación está corriendo: un contador, el texto de un input, si un menú está abierto o cerrado.

Lo importante es que cuando el estado cambia, el framework vuelve a dibujar ese componente solo. No hay que buscar el elemento en el DOM ni actualizarlo a mano.

```
COMPONENTE Contador:
    ESTADO conteo = 0

    MOSTRAR un botón con el texto "Clics: " + conteo

    CUANDO el usuario haga clic en el botón:
        conteo = conteo + 1
        el framework redibuja el componente automáticamente
```

Si guardáramos el número en una variable normal, el valor cambiaría pero la pantalla se quedaría igual. La diferencia está en declararlo como estado: eso es lo que avisa al framework que algo cambió.

## Enrutamiento

En una página tradicional cada URL pide un archivo nuevo al servidor. En una SPA no: el enrutador escucha la URL del navegador y decide qué componente montar, sin recargar nada.

```
RUTAS:
    SI la url es "/"             -> montar Inicio
    SI la url es "/cursos"       -> montar Cursos
    SI la url es "/cursos/:id"   -> montar DetalleCurso, pasándole el id
    EN CUALQUIER OTRO CASO       -> montar PaginaNoEncontrada
```

Si el usuario entra a `/cursos/12`, el enrutador reconoce el patrón, monta `DetalleCurso` y le pasa el `12` como parámetro. La barra de direcciones sigue funcionando normal — atrás, adelante, compartir el enlace — pero la página nunca se recarga.

## ¿Por qué una SPA necesita una API?

Porque la SPA solo es la cara visible de la aplicación. Todo lo que se descarga al navegador (HTML, JS, CSS) es estático, y ahí no hay nada que consultar: no hay base de datos, no hay lógica de negocio, no hay forma de saber quién es el usuario.

Cuando el enrutador monta `DetalleCurso`, ese componente no tiene los datos del curso 12. Tiene que pedirlos:

```
COMPONENTE DetalleCurso(id):
    ESTADO curso = vacío

    AL MONTARSE:
        pedir a la API los datos de "/api/cursos/" + id
        cuando lleguen, guardarlos en el estado curso

    SI curso está vacío -> MOSTRAR "Cargando..."
    SI NO               -> MOSTRAR el nombre y la descripción del curso
```

La API es la que habla con la base de datos y devuelve JSON. A eso se suman tres razones de peso:

- **Seguridad.** Cualquiera puede abrir las herramientas del navegador y leer el código del front. Las credenciales de la base de datos y las reglas del negocio no pueden estar ahí.
- **Persistencia.** El estado de un componente se borra al recargar. Lo que se debe conservar tiene que viajar al servidor.
- **Reutilización.** La misma API puede alimentar después una app móvil o un panel administrativo sin escribirla otra vez.

Sin API, una SPA queda reducida a una interfaz bonita que no guarda ni consulta nada.

## English requirement

An SPA (Single Page Application) loads one HTML document and then rewrites its content with JavaScript as the user navigates, so the page never reloads and the data is requested from an API in the background. An MPA (Multi Page Application) works the other way around: every link asks the server for a brand new page, which is then rendered from scratch in the browser. The trade-off is that an SPA feels faster once it has loaded, while an MPA is lighter on the first visit and easier for search engines to index.
