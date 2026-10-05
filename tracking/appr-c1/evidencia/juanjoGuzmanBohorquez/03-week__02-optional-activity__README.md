# 📱 API Integration & UI State Management — JSONPlaceholder

> Dynamic web application that consumes a public REST API using native `fetch()`, featuring full UI state management (Loading, Success, and Error) and automated HTML rendering via JavaScript.

---

## 📊 Overview

| Attribute | Details |
| --- | --- |
| **Institution** | Corporación Universitaria del Huila (CORHUILA) |
| **Course** | Desarrollo Full Stack / Programación Móvil |
| **Primary Goal** | Asynchronous API fetching & UI State Management |
| **Tech Stack** | HTML5, CSS3 (Flexbox/Animations), JavaScript ES6+ |
| **API Endpoint** | `https://jsonplaceholder.typicode.com/users` |

---

## 📸 Demostración Visual de la Aplicación

### Estado 1: Api de Prueba
<img width="705" height="107" alt="Captura de pantalla 2026-08-29 a la(s) 3 14 38 p m" src="https://github.com/user-attachments/assets/16c97f51-d0c7-4d1f-8c9f-8bd866e12a49" />

### Estado 2: Consumir la Api
<img width="733" height="439" alt="Captura de pantalla 2026-08-29 a la(s) 3 16 13 p m" src="https://github.com/user-attachments/assets/c591c935-8c22-4ca0-8c9f-416bf54c1420" />

---

## 🌐 ¿Dónde y cómo se consume la API?

El consumo de la API se realiza **exclusivamente en el archivo `script.js`** mediante la API nativa `fetch()` y sintaxis `async/await`. 

El archivo HTML proporciona los contenedores de la interfaz, CSS estiliza los componentes y los estados, y **JavaScript ejecuta la petición a la red**, procesa el JSON recibido e inyecta dinámicamente los elementos en el DOM:

```javascript
// Consumo principal en script.js
const API_URL = '[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)';

async function fetchData() {
  setUIState('loading'); // 1. Cambia UI a estado de carga

  try {
    const response = await fetch(API_URL); // 2. Petición HTTP a la API pública
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const users = await response.json(); // 3. Conversión de la respuesta a JSON
    renderList(users);                  // 4. Inyección de datos en el HTML
    setUIState('success');              // 5. Cambia UI a estado de éxito

  } catch (error) {
    setUIState('error');                // 6. Manejo visual de error
  }
}
