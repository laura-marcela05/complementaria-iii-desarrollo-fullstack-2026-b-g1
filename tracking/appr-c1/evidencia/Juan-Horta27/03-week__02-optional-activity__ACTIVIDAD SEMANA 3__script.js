const URL_API = "https://jsonplaceholder.typicode.com/users";

// Dirección inventada: sirve para ver el estado de error
const URL_FALLA = "https://esta-direccion-no-existe.corhuila/usuarios";

const lista = document.getElementById("lista");
const estado = document.getElementById("estado");

function cargarUsuarios(url) {
  // Estado 1: cargando
  lista.innerHTML = "";
  estado.className = "";
  estado.textContent = "Cargando usuarios...";

  fetch(url)
    .then(res => {
      // Si el servidor responde con un error (404, 500...) lo tratamos como fallo
      if (!res.ok) {
        throw new Error("El servidor respondió " + res.status);
      }
      return res.json();
    })
    .then(usuarios => {
      // Estado 2: llegaron los datos
      if (usuarios.length === 0) {
        estado.textContent = "No hay usuarios para mostrar.";
        return;
      }
      mostrar(usuarios);
      estado.className = "ok";
      estado.textContent = "Se cargaron " + usuarios.length + " usuarios.";
    })
    .catch(error => {
      // Estado 3: algo falló
      estado.className = "error";
      estado.textContent = "No se pudieron cargar los usuarios. Revisa tu conexión e intenta de nuevo.";
      console.error(error);
    });
}

function mostrar(usuarios) {
  lista.innerHTML = usuarios
    .map(u => `
      <li>
        <div class="datos">
          <span class="nombre">${u.name}</span>
          <span class="correo">${u.email}</span>
        </div>
        <span class="ciudad">${u.address.city}</span>
      </li>
    `)
    .join("");
}

document.getElementById("btn-cargar").addEventListener("click", () => {
  cargarUsuarios(URL_API);
});

document.getElementById("btn-fallar").addEventListener("click", () => {
  cargarUsuarios(URL_FALLA);
});

// Al abrir la página cargamos la lista de una vez
cargarUsuarios(URL_API);
