const boton = document.getElementById("mensajeBtn");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.textContent = "¡Tarea realizada!";
});