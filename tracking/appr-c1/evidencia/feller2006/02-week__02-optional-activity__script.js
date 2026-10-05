const boton = document.getElementById("mostrarMensaje");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.textContent = "¡Muy bien! Ya completaste una tarea.";
}); 