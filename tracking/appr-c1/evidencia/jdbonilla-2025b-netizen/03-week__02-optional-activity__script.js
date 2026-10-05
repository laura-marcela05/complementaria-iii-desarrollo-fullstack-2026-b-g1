const API_URL = 'https://jsonplaceholder.typicode.com/users';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const listaEl = document.getElementById('lista');
const reloadBtn = document.getElementById('reloadBtn');

function mostrarEstado(estado) {
  // estado puede ser: 'cargando', 'datos', 'error'
  loadingEl.classList.add('oculto');
  errorEl.classList.add('oculto');
  listaEl.classList.add('oculto');

  if (estado === 'cargando') loadingEl.classList.remove('oculto');
  if (estado === 'error') errorEl.classList.remove('oculto');
  if (estado === 'datos') listaEl.classList.remove('oculto');
}

async function cargarUsuarios() {
  mostrarEstado('cargando');
  reloadBtn.disabled = true;

  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('Respuesta no exitosa: ' + respuesta.status);
    }

    const usuarios = await respuesta.json();
    renderizarUsuarios(usuarios);
    mostrarEstado('datos');

  } catch (err) {
    console.error('Error al consumir la API:', err);
    mostrarEstado('error');

  } finally {
    reloadBtn.disabled = false;
  }
}

function renderizarUsuarios(usuarios) {
  listaEl.innerHTML = '';

  usuarios.forEach(usuario => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${usuario.name}</strong>
      <span>${usuario.email} · ${usuario.company.name}</span>
    `;
    listaEl.appendChild(li);
  });
}

reloadBtn.addEventListener('click', cargarUsuarios);

// Cargar los datos apenas se abre la página
cargarUsuarios();
