// Problema 1: al hacer clic en el boton se agrega una nueva tarea
// a la lista y se actualiza el contador (comportamiento en JavaScript)

const listaTareas = document.getElementById('lista-tareas');
const btnAgregarTarea = document.getElementById('btn-agregar-tarea');
const contadorTareas = document.getElementById('contador-tareas');

let contador = listaTareas.children.length;

btnAgregarTarea.addEventListener('click', () => {
  contador++;

  const nuevaTarea = document.createElement('li');
  nuevaTarea.className = 'list-group-item';
  nuevaTarea.textContent = `Nueva tarea #${contador}`;

  listaTareas.appendChild(nuevaTarea);
  contadorTareas.textContent = `Total de tareas: ${contador}`;
});