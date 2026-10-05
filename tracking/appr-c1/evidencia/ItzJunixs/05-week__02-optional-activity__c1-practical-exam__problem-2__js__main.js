// Importamos la función que consulta la API
import { getUsers } from "../api/api.js";

const estado = document.getElementById("estado");
const lista = document.getElementById("lista-usuarios");

async function cargarUsuarios() {
  // Estado de carga
  estado.textContent = "Cargando usuarios...";

  try {
    const usuarios = await getUsers();

    // Estado con datos: ya no mostramos el mensaje de carga
    estado.textContent = "";

    usuarios.forEach((usuario) => {
      const item = document.createElement("li");
      item.textContent = `${usuario.name} - ${usuario.email}`;
      lista.appendChild(item);
    });
  } catch (error) {
    // Estado de error
    estado.textContent = "Ocurrió un error al cargar los usuarios.";
  }
}

cargarUsuarios();
