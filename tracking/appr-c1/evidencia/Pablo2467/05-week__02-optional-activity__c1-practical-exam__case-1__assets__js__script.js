// --- Referencias a los elementos del DOM ---
const boton = document.getElementById('btn-estilo');
const lista = document.querySelector('.lista-productos');

// --- Evento: al hacer click, alterna el estilo de la lista ---
boton.addEventListener('click', () => {
  lista.classList.toggle('estilo-alterno');
});