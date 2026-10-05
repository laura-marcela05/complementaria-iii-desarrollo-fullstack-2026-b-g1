// Obtenemos los elementos del HTML
const boton = document.getElementById("btn-mostrar");
const mensaje = document.getElementById("mensaje");

// Al hacer clic, mostramos u ocultamos el mensaje
boton.addEventListener("click", () => {
  mensaje.classList.toggle("oculto");
});
