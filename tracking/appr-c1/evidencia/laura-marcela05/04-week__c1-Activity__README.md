# Buscador de recetas

Frontend que consume la API pública [TheMealDB](https://www.themealdb.com/) para
buscar recetas por nombre o ingrediente y mostrarlas como una lista de
elementos, manejando los estados de carga, datos y error.

## Mockup de la vista (lista de elementos)

```
 ┌───────────────────────────────────────────┐
 │    Escribe un ingrediente o nombre del plato...    │
 │            Buscador de recetas              │
 │      Consulta recetas en tiempo real         │
 ├───────────────────────────────────────────┤
 │  \[ input: buscar receta... ]  \[ Buscar ]    │
 ├───────────────────────────────────────────┤
 │  (loading) Cargando recetas...              │
 │  (error)   No se encontraron recetas...     │
 ├───────────────────────────────────────────┤
 │  ┌───┐  Nombre de la receta                 │
 │  │img│  Categoría · Región                  │
 │  └───┘                                      │
 │  ┌───┐  Nombre de la receta                 │
 │  │img│  Categoría · Región                  │
 │  └───┘                                      │
 │  ...                                        │
 ├───────────────────────────────────────────┤
 │        © 2026 Buscador de recetas           │
 └───────────────────────────────────────────┘
```

La vista se distribuye en: encabezado, barra de búsqueda, zona de estado
(carga/error) y lista de tarjetas de receta (imagen + nombre + categoría + región),
siguiendo el mismo estilo de pizarra usado en la actividad de la semana 2.

## Cómo ejecutarlo

1. Abre tu terminal y clona este repositorio:

```bash
   git clone https://github.com/laura-marcela05/complementaria-iii-desarrollo-fullstack-2026-b-g1.git
   ```

2. Ubica la carpeta `04-week`, entra a la carpeta `c1-Activity` y abre
`index.html` directamente en el navegador (doble clic), o sirve la
carpeta con una extensión tipo "Live Server" si prefieres recarga
automática.
3. No requiere instalación de dependencias ni llave de API: TheMealDB es de
uso libre para pruebas.
4. Escribe un término en el buscador (ej. `chicken`, `pasta`, `cake`) y
presiona "Buscar".

## Estados manejados

* **Carga:** mientras se espera la respuesta de la API, se muestra un mensaje
de "Cargando recetas...".
* **Datos:** si la API responde con resultados, se renderiza la lista de
tarjetas (imagen, nombre, categoría y región).
* **Error:** si la petición falla (por ejemplo, sin conexión) o la búsqueda
no encuentra resultados, se muestra un mensaje claro en lugar de dejar la
lista vacía sin explicación.

## Overview

This app is a recipe finder made with HTML, CSS and JavaScript. It uses the
TheMealDB API to search for recipes. The user writes an ingredient or a food
name, and the app looks for recipes with that name. Each recipe shows a
picture, its name, and its category. The app has three states: a loading
message while it waits for the API, a list of recipes when the search works,
and an error message when something goes wrong or there are no results.

