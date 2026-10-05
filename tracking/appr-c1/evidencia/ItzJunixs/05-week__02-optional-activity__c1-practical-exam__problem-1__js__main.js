// Obtenemos los elementos que necesitamos del HTML
const boton = document.getElementById("btn-agregar");
const lista = document.getElementById("lista-tecnologias");

// Cuando se hace clic en el botón, agregamos un nuevo elemento a la lista
boton.addEventListener("click", () => {
  const nuevoElemento = document.createElement("li");
  nuevoElemento.textContent = "Nuevo elemento agregado con JavaScript";
  lista.appendChild(nuevoElemento);
});
