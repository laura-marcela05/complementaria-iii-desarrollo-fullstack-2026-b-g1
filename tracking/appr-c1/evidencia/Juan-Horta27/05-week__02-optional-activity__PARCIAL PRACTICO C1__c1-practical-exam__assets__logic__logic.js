/**
 * ========================================================
 * PARCIAL PRÁCTICO - CORTE 1: CATÁLOGO DE CANCIONES
 * Lógica en JavaScript simple y estructurada
 * ========================================================
 */

// 1. Selección de elementos del DOM
const btnCargar = document.getElementById("btn-cargar");
const btnLimpiar = document.getElementById("btn-limpiar");
const listaCanciones = document.getElementById("lista-canciones");
const estadoMensaje = document.getElementById("estado-mensaje");

// Ruta de nuestra API local de canciones
const API_URL = "assets/data/canciones.json";

/**
 * Función para actualizar el mensaje de estado en la interfaz
 * @param {string} tipo - 'loading' | 'error' | 'empty' | 'hide'
 * @param {string} texto - Mensaje a mostrar
 */
function mostrarEstado(tipo, texto = "") {
  if (tipo === "hide") {
    estadoMensaje.style.display = "none";
    estadoMensaje.className = "status-msg";
    estadoMensaje.textContent = "";
    return;
  }

  estadoMensaje.style.display = "block";
  estadoMensaje.className = `status-msg status-${tipo}`;
  estadoMensaje.textContent = texto;
}

/**
 * PROBLEMA 2: Consumo de API con fetch (GET) y manejo de estados
 */
async function cargarCanciones() {
  // --- 1. ESTADO DE CARGA ---
  mostrarEstado("loading", "⏳ Cargando canciones desde la API...");
  listaCanciones.innerHTML = ""; // Limpiar lista anterior

  try {
    // Petición HTTP con método GET usando fetch
    const respuesta = await fetch(API_URL, {
      method: "GET"
    });

    // Verificamos si la respuesta fue exitosa
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: Estado ${respuesta.status}`);
    }

    // Convertimos la respuesta a formato JSON
    const canciones = await respuesta.json();

    // --- 2. ESTADO DE DATOS (ÉXITO) ---
    mostrarEstado("hide"); // Ocultamos mensaje de carga

    if (canciones.length === 0) {
      mostrarEstado("empty", "No hay canciones disponibles en el catálogo.");
      return;
    }

    // Renderizar cada canción en el HTML
    canciones.forEach((cancion) => {
      const li = document.createElement("li");
      li.className = "song-item";

      li.innerHTML = `
        <div class="song-info">
          <strong>🎵 ${cancion.titulo}</strong>
          <span>${cancion.artista} — <em>${cancion.album}</em></span>
        </div>
        <div class="song-meta">
          <span class="badge">${cancion.genero}</span>
          <div>⏱️ ${cancion.duracion}</div>
        </div>
      `;

      listaCanciones.appendChild(li);
    });

    console.log("Canciones cargadas con éxito:", canciones);

  } catch (error) {
    // --- 3. ESTADO DE ERROR ---
    console.error("Error al obtener los datos:", error);
    mostrarEstado(
      "error",
      `❌ Ocurrió un error al cargar los datos: ${error.message}`
    );
  }
}

/**
 * Función sencilla para limpiar la lista
 */
function limpiarLista() {
  listaCanciones.innerHTML = "";
  mostrarEstado("empty", "Catálogo limpio. Presiona 'Cargar Canciones' para consultar la API.");
}

// PROBLEMA 1: Eventos de clic con JavaScript
btnCargar.addEventListener("click", cargarCanciones);
btnLimpiar.addEventListener("click", limpiarLista);

/**
 * ========================================================
 * NOTAS DE MÉTODOS HTTP (Problema 2):
 * - Para CONSULTAR / LEER datos: GET (usado arriba con fetch)
 * - Para CREAR un nuevo recurso: POST
 * - Para BORRAR un recurso: DELETE
 * - Para ACTUALIZAR un recurso: PUT / PATCH
 * ========================================================
 */
