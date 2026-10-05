// JS: se encarga del COMPORTAMIENTO de la página (qué pasa cuando el usuario interactúa)

const listaObjetos = document.getElementById("listaObjetos");
const mensajeEstado = document.getElementById("mensajeEstado");
const formObjeto = document.getElementById("formObjeto");
const nombreObjeto = document.getElementById("nombreObjeto");
const btnCargarApi = document.getElementById("btnCargarApi");

// Crea un <li> con el texto del objeto y un botón para eliminarlo
function crearItemObjeto(texto) {
  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "✕";
  btnEliminar.className = "btn-eliminar";
  btnEliminar.type = "button";
  btnEliminar.setAttribute("aria-label", "Eliminar objeto");

  // Al hacer clic en "eliminar", se quita el objeto de la lista
  btnEliminar.addEventListener("click", () => {
    item.remove();
  });

  item.appendChild(span);
  item.appendChild(btnEliminar);
  return item;
}

// ---------- Problema 1: comportamiento con el formulario (clic / submit) ----------
formObjeto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const texto = nombreObjeto.value.trim();
  if (texto === "") {
    mensajeEstado.textContent = "Escribe un nombre de objeto antes de agregarlo.";
    return;
  }

  listaObjetos.appendChild(crearItemObjeto(texto));
  nombreObjeto.value = "";
  mensajeEstado.textContent = "Objeto agregado correctamente.";
});

// Habilitar/eliminar los objetos que ya vienen en el HTML por defecto
document.querySelectorAll("#listaObjetos .btn-eliminar").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest("li").remove();
  });
});

// ---------- Problema 2: consumo de API con fetch (GET) ----------
// Usamos una API pública de prueba para simular "objetos publicados por otros usuarios"
const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";

async function cargarObjetosDesdeApi() {
  // Estado: cargando
  mensajeEstado.textContent = "Cargando objetos...";
  btnCargarApi.disabled = true;

  try {
    const respuesta = await fetch(API_URL); // Método GET (por defecto en fetch)

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta del servidor: " + respuesta.status);
    }

    const datos = await respuesta.json();

    // Estado: datos cargados correctamente
    mensajeEstado.textContent = `Se cargaron ${datos.length} objetos nuevos desde la API.`;

    datos.forEach((publicacion) => {
      const texto = `${publicacion.title.slice(0, 40)}... - propuesto por usuario #${publicacion.userId}`;
      listaObjetos.appendChild(crearItemObjeto(texto));
    });

  } catch (error) {
    // Estado: error
    mensajeEstado.textContent = "Ocurrió un error al cargar los objetos: " + error.message;
  } finally {
    btnCargarApi.disabled = false;
  }
}

btnCargarApi.addEventListener("click", cargarObjetosDesdeApi);
