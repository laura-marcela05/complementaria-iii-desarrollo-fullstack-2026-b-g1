const boton = document.getElementById("miBoton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {
    mensaje.textContent = "¡Hola! Has hecho clic en el botón.";
});