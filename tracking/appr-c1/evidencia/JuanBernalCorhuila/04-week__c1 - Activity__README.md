# Fullstack API Consumer - Equipos de LaLiga Española

Este proyecto consiste en una aplicación web interactiva desarrollada para la materia de **Desarrollo Fullstack**. La aplicación consume la API pública de **TheSportsDB** para visualizar la lista de equipos de fútbol pertenecientes a LaLiga Española.

---

## Mockup de la Interfaz

A continuación se muestra el diseño y la distribución de la vista planificada para la aplicación:

```text
+-------------------------------------------------------+
|              ⚽ Equipos de LaLiga Española             |
+-------------------------------------------------------+
|                                                       |
|   [ ⏳ Cargando... / ⚠️ Error con botón Reintentar ]   |
|                                                       |
|  +------------------+  +------------------+  +-----+  |
|  |  [ Escudo Logo ] |  |  [ Escudo Logo ] |  | ... |  |
|  |  Nombre Equipo   |  |  Nombre Equipo   |  |     |  |
|  |  Estadio         |  |  Estadio         |  |     |  |
|  |  Año Fundación   |  |  Año Fundación   |  |     |  |
|  +------------------+  +------------------+  +-----+  |
|                                                       |
+-------------------------------------------------------+
```

---

## Overview

This web application displays an organized catalog of football teams competing in the Spanish LaLiga. The frontend consumes dynamic data from the free and public API provided by TheSportsDB using asynchronous HTTP requests via JavaScript's native `fetch` API. To deliver a seamless user experience, the application explicitly handles three distinct UI states across the request lifecycle. When the application initializes, a loading state displays an active indicator to notify the user while data is being retrieved. Upon a successful API response, the data state dynamically renders responsive card components into a CSS grid displaying each team's crest, stadium name, and founding year. Finally, if a network failure or endpoint error occurs, the error state catches the exception and provides an error message alongside an interactive retry button to re-trigger the request.

---

## Cómo ejecutar el proyecto

Para ejecutar este proyecto de forma local en tu equipo:

1. **Clonar el repositorio:**
   Abre tu terminal y clona este repositorio:
   ```bash
   git clone https://github.com/JuanBernalCorhuila/complementaria-iii-desarrollo-fullstack-2026-b-g1.git
   ```

2. **Ingresar a la carpeta de la semana:**
   Navega al directorio donde se encuentra esta entrega:
   ```bash
   cd complementaria-iii-desarrollo-fullstack-2026-b-g1
   ```

3. **Abrir la aplicación:**
   No se requiere la instalación de dependencias ni servidores de Node.js. Abre el archivo `index.html` en cualquier navegador web moderno:
   - Haciendo **doble clic** directamente sobre el archivo `index.html`.
   - O usando la extensión **Live Server** en Visual Studio Code (clic derecho sobre `index.html` -> *Open with Live Server*).

Nota: Asegúrate de tener una conexión a Internet activa para que la aplicación pueda consumir la API de TheSportsDB correctamente.