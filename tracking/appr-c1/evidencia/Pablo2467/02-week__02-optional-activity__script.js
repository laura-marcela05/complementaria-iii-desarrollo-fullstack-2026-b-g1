// Seleccionamos los elementos del HTML
const boton = document.getElementById('btn-mostrar');
const mensajeOculto = document.getElementById('mensaje-oculto');

// Agregamos el evento de clic al botón
boton.addEventListener('click', function() {
    // Verificamos si el mensaje tiene la clase 'oculto'
    if (mensajeOculto.classList.contains('oculto')) {
        mensajeOculto.classList.remove('oculto');
        boton.textContent = 'Ocultar estado'; // Cambia el texto del botón
    } else {
        mensajeOculto.classList.add('oculto');
        boton.textContent = 'Ver mi estado actual'; // Restaura el texto
    }
});