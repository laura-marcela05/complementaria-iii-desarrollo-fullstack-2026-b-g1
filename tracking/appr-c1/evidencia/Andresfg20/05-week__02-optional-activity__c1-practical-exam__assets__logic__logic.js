const btnMensaje = document.getElementById("btnMensaje");
const textoMensaje = document.getElementById("textoMensaje");

let mensajeCambiado = false;

btnMensaje.addEventListener("click", function () {
  if (!mensajeCambiado) {
    textoMensaje.textContent = "¡El botón funciona correctamente!";
  } else {
    textoMensaje.textContent = "Este es el texto inicial.";
  }
  mensajeCambiado = !mensajeCambiado;
});

const btnCargarUsuarios = document.getElementById("btnCargarUsuarios");
const listaUsuarios = document.getElementById("listaUsuarios");
const estadoCarga = document.getElementById("estadoCarga");
const estadoError = document.getElementById("estadoError");

btnCargarUsuarios.addEventListener("click", cargarUsuarios);

async function cargarUsuarios() {
  listaUsuarios.innerHTML = "";
  estadoError.textContent = "";
  estadoCarga.textContent = "Cargando usuarios...";

  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información");
    }

    const usuarios = await respuesta.json();

    estadoCarga.textContent = "";

    usuarios.forEach(function (usuario) {
      const item = document.createElement("li");
      item.textContent = usuario.name + " - " + usuario.email;
      listaUsuarios.appendChild(item);
    });

  } catch (error) {
    estadoCarga.textContent = "";
    estadoError.textContent = "Ocurrió un error al cargar los usuarios.";
  }
}
