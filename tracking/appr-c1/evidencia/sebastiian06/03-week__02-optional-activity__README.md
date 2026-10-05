# 📊 API DE RICK Y MORTY

The **Rick and Morty Character Explorer** is a single-page web application built with vanilla HTML, CSS, and JavaScript that allows users to search and display characters from the popular animated series. The application consumes the public **Rick and Morty API** (https://rickandmortyapi.com), which provides character data including names, status, species, gender, location, and episode appearances. When a user performs a search, the app fetches data from the API endpoint `/api/character/?name={query}` and processes the JSON response to extract relevant information. The interface handles four key states: **loading** (shows a spinner and animated bars while fetching data), **success** (displays a list of character cards with avatars and details), **empty** (informs the user when no characters match the search term), and **error** (shows a friendly message when the API request fails or the network is offline). By managing these states effectively, the application provides a smooth user experience regardless of the API response or connection status, demonstrating fundamental frontend concepts like DOM manipulation, asynchronous fetching, and state management without external libraries.

## Estructura de la Respuesta JSON

```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character/?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Citadel of Ricks",
        "url": "https://rickandmortyapi.com/api/location/3"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    }
  ]
}
```

## Ciclo Petición/Respuesta con Rick y Morty API

```javascript
// 1. CLIENTE hace petición
fetch('https://rickandmortyapi.com/api/character/?name=rick')

// 2. SERVIDOR responde con JSON
{
  "info": { "count": 826 },
  "results": [ { "name": "Rick Sanchez", ... } ]
}

// 3. CLIENTE procesa y muestra
const data = await response.json();
displayCharacters(data.results);
```


## 🚀 EJECUTAR Y PROBAR

### Ejecutar index.html en el navegador

**Búsquedas Recomendadas:**

|Búsqueda	|Resultado Esperado|
|-----------|------------------|
|"rick"	|Personajes con "Rick" en el nombre|
|"morty"	|Personajes con "Morty" en el nombre|
|"summer"	|Summer Smith|
|"beth"	|Beth Smith|
|"birdperson"	|Birdperson|
|"pickle"	|Rick en forma de pepinillo|

-------
**Ver los Estados:**

1. Carga: La búsqueda muestra animación de carga
2. Datos: Lista de personajes con avatar y detalles
3. Vacío: Busca "xyzabc123" para ver mensaje
4. Error: Desconecta internet para ver error

## 📁 Estructura del Proyecto

```text
api-books-app/
├── index.html          # Estructura HTML5 semántica
├── styles.css          # Estilos CSS3 con Flexbox/Grid
└── script.js           # JavaScript con consumo de API
```

## 🛠️ Tecnologías Utilizadas

- HTML5: Estructura semántica

- CSS3: Diseño responsive con Flexbox y Grid

- JavaScript (ES6+): Fetch API, async/await, DOM manipulation

- Rick and Morty API: Fuente de datos pública


## 📊 Estados de la Interfaz

|Estado	|Visual	|Condición|
|-------|-------|---------|
|Inicial	|Mensaje: "Busca personajes"	|Página cargada|
|Cargando	|Spinner + barras animadas	|Esperando respuesta de la API|
|Con Datos	|Lista de personajes	|API respondió con resultados|
|Vacío	|Mensaje: "No se encontraron"	|Sin resultados para la búsqueda|
|Error	|Mensaje de error + botón reintentar	|Falló la conexión o el servidor|

## 📝 Aprendizajes

- Consumo de APIs públicas con Fetch API

- Manejo de estados (carga, éxito, error, vacío)

- Manipulación del DOM sin frameworks

- Manejo de errores con try/catch

- Diseño responsive con CSS moderno

- Validación de entrada de usuario

- Debounce para optimizar búsquedas

