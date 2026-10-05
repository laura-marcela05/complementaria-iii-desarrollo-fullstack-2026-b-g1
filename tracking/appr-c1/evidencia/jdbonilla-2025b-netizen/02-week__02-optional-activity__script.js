const boton = document.getElementById('toggleBtn');
const mensaje = document.getElementById('mensaje');

boton.addEventListener('click', () => {
  mensaje.classList.toggle('oculto');

  if (mensaje.classList.contains('oculto')) {
    boton.textContent = 'Mostrar mensaje';
  } else {
    boton.textContent = 'Ocultar mensaje';
  }
});
