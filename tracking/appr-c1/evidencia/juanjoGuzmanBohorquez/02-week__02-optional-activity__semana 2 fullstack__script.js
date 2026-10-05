// Selección de elementos del DOM
const toggleBtn = document.getElementById('toggleBtn');
const secretMessage = document.getElementById('secretMessage');

// Evento al hacer clic en el botón
toggleBtn.addEventListener('click', () => {
  // Alterna la clase 'show' para mostrar u ocultar el mensaje
  secretMessage.classList.toggle('show');

  // Actualiza el texto del botón según el estado
  if (secretMessage.classList.contains('show')) {
    toggleBtn.textContent = 'Ocultar Mensaje';
  } else {
    toggleBtn.textContent = 'Mostrar Mensaje Especial';
  }
});