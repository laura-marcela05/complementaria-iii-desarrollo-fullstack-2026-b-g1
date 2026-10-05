// Importamos la función que consulta la API
import { getPosts } from "../api/api.js";

const estado = document.getElementById("estado");
const lista = document.getElementById("lista-publicaciones");

async function cargarPublicaciones() {
  // Estado de carga
  estado.textContent = "Cargando publicaciones...";

  try {
    const publicaciones = await getPosts();

    // Estado con datos: ya no mostramos el mensaje de carga
    estado.textContent = "";

    publicaciones.forEach((publicacion) => {
      const item = document.createElement("li");
      item.textContent = publicacion.title;
      lista.appendChild(item);
    });
  } catch (error) {
    // Estado de error
    estado.textContent = "Ocurrió un error al cargar las publicaciones.";
  }
}

cargarPublicaciones();
