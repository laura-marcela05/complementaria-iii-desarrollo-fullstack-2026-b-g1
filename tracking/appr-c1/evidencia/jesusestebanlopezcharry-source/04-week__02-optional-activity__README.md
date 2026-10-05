# 🛒 Mi Inventario

Aplicación web frontend para la gestión y visualización de productos.
El proyecto consume APIs públicas mediante `fetch` y permite visualizar, buscar, agregar, editar y eliminar productos de manera local.

## 📌 Overview

Mi Inventario is a web application for managing and displaying products in an inventory system. The application consumes the public Open Food Facts API to obtain real product information such as product names, brands, categories, quantities, and barcodes. It also consumes the Open Prices API to retrieve registered prices associated with product barcodes when price information is available. The application handles different states such as loading, successful data retrieval, unavailable prices, empty results, and API errors. Users can search for products, load more products, create new products, edit products, view product information, and delete products. The stock is managed locally by the application because Open Food Facts does not provide the current stock available in the inventory.

## 📁 Estructura del proyecto

```text
Mi-Inventario/
│
├── index.html
├── estilos.css
├── script.js
└── README.md
```

## 🚀 Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API
* API pública de Open Food Facts
* API pública de Open Prices

## 🌐 APIs utilizadas

### Open Food Facts

El proyecto obtiene los productos desde la API pública de **Open Food Facts**:

```text
https://world.openfoodfacts.org/api/v2/search
```

La aplicación utiliza `fetch()` para realizar las solicitudes y obtener información real de los productos.

Entre los datos obtenidos se encuentran:

* Código de barras
* Nombre del producto
* Marca
* Categoría
* Cantidad

### Open Prices

Para consultar precios registrados de los productos se utiliza la API pública de **Open Prices**:

```text
https://prices.openfoodfacts.org/api/v1/prices
```

La aplicación utiliza el código de barras del producto para consultar si existe un precio registrado.

Si existe un precio disponible, se muestra en la tabla. Si no existe un precio registrado, se muestra:

```text
Precio no disponible
```

## ▶️ Cómo ejecutar el proyecto

### Opción 1: Abrir directamente en el navegador

1. Descargar o copiar el proyecto en una carpeta.
2. Ubicar el archivo `index.html`.
3. Hacer doble clic sobre `index.html`.
4. El proyecto se abrirá en el navegador.

> Se recomienda utilizar Google Chrome, Microsoft Edge o Mozilla Firefox.

### Opción 2: Utilizar Visual Studio Code

Para una ejecución más adecuada se recomienda utilizar **Visual Studio Code**.

1. Abrir Visual Studio Code.
2. Seleccionar **Archivo → Abrir carpeta**.
3. Seleccionar la carpeta `Mi-Inventario`.
4. Abrir el archivo `index.html`.
5. Instalar la extensión **Live Server**.
6. Hacer clic derecho sobre `index.html`.
7. Seleccionar **Open with Live Server**.
8. El proyecto se abrirá automáticamente en el navegador.

La dirección normalmente será similar a:

```text
http://127.0.0.1:5500/
```

## ⚙️ Funcionamiento

Al iniciar la aplicación:

1. Se realiza una petición a Open Food Facts utilizando `fetch()`.
2. Los productos obtenidos se almacenan en JavaScript.
3. Se consulta Open Prices utilizando el código de barras del producto.
4. Si existe un precio registrado, se obtiene y se muestra en la aplicación.
5. Los productos se muestran en una tabla.
6. El usuario puede buscar productos mediante el buscador.
7. El botón **Cargar más productos** obtiene más productos de la API.
8. El botón **Nuevo Producto** permite agregar productos localmente.
9. El botón **Ver** permite consultar la información de un producto.
10. El botón **Editar** permite modificar el nombre, precio y stock de un producto.
11. El botón **Eliminar** permite eliminar un producto de la lista.

## 🔄 Estados de la aplicación

La aplicación maneja diferentes estados durante la consulta de las APIs:

### ⏳ Cargando

Mientras se obtiene la información:

```text
⏳ Cargando productos desde la API...
```

También se muestra un estado de consulta de precios:

```text
💰 Consultando precios reales...
```

### ✅ Datos cargados

Cuando los productos se obtienen correctamente, se muestran en la tabla y se actualiza el contador de productos cargados.

### 💰 Precio disponible

Cuando Open Prices encuentra un precio registrado para el código de barras, se muestra el precio correspondiente.

### ⚠️ Precio no disponible

Cuando no existe un precio registrado para un producto, se muestra:

```text
Precio no disponible
```

### 📭 Sin resultados

Si la API no devuelve productos, se muestra:

```text
No hay productos.
```

### ❌ Error

Si ocurre un problema durante la consulta de la API:

```text
❌ Error al cargar los productos.
```

El botón permite intentar nuevamente la carga.

### ✓ No hay más productos

Cuando no existen más productos disponibles para cargar:

```text
✓ No hay más productos
```

## 📦 Stock

El stock corresponde al inventario manejado por la aplicación.

Open Food Facts proporciona información sobre los productos, pero no proporciona la cantidad de unidades disponibles en nuestro inventario.

Por esta razón, la aplicación maneja el stock localmente y permite modificarlo mediante la opción **Editar**.

## 📝 Nuevo producto

El usuario puede seleccionar:

```text
+ Nuevo Producto
```

y completar:

* Nombre del producto
* Precio
* Stock

Al seleccionar **Guardar Producto**, el nuevo producto se agrega a la lista mostrada en la aplicación.

> Los productos creados, editados o eliminados desde la interfaz se manejan localmente en el navegador y no modifican la información de las APIs públicas.

## 🔎 Búsqueda

El buscador permite escribir el nombre o la marca de un producto y filtrar los productos que se encuentran cargados actualmente.

## ➕ Cargar más productos

El botón **Cargar más productos** permite realizar nuevas solicitudes a Open Food Facts utilizando diferentes páginas de resultados.

De esta manera, el usuario puede cargar más productos sin tener que recargar la página.

## ✏️ Editar productos

El botón **Editar** permite modificar:

* Nombre
* Precio
* Stock

Los cambios se realizan localmente en el navegador.

## 🗑️ Eliminar productos

El botón **Eliminar** permite quitar un producto del listado después de confirmar la acción.

## ⚠️ Consideraciones

* Se necesita conexión a Internet para consultar las APIs de Open Food Facts y Open Prices.
* Los productos provenientes de las APIs son datos externos.
* No todos los productos tienen un precio registrado en Open Prices.
* Cuando no existe un precio registrado se muestra **Precio no disponible**.
* El stock no proviene de Open Food Facts y es administrado localmente por la aplicación.
* Los cambios realizados mediante **Nuevo Producto**, **Editar** y **Eliminar** son locales.
* Al recargar la página, los cambios locales pueden perderse.


## 👨‍💻 Proyecto académico

Proyecto desarrollado como actividad académica para demostrar:

* Diseño de un mockup.
* Desarrollo de un frontend.
* Consumo de APIs públicas.
* Uso de `fetch`.
* Manejo de estados de carga, datos, precio no disponible, resultados vacíos y error.
* Uso de Git para el versionado del proyecto.
* Organización del código JavaScript.
* Interacción con elementos de la interfaz.
* Implementación de operaciones básicas de inventario.
