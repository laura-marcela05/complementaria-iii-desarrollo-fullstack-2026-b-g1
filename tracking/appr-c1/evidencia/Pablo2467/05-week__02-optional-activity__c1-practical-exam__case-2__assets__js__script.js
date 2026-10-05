// --- Referencias al DOM ---
const estadoMensaje = document.getElementById('estado-mensaje');
const listaUsuarios = document.getElementById('lista-usuarios');
const btnRecargar = document.getElementById('btn-recargar');
const btnSimularError = document.getElementById('btn-simular-error');

const URL_API = 'https://jsonplaceholder.typicode.com/users';
const URL_INVALIDA = 'https://jsonplaceholder.typicode.com/usuarios-inexistentes';

// Función que muestra el estado de carga
function mostrarCargando() {
  estadoMensaje.textContent = 'Cargando usuarios...';
  estadoMensaje.className = 'cargando';
  listaUsuarios.innerHTML = '';
}

// Función que muestra un error
function mostrarError(mensaje) {
  estadoMensaje.textContent = `Error: ${mensaje}`;
  estadoMensaje.className = 'error';
  listaUsuarios.innerHTML = '';
}

// Función que renderiza los datos en la lista
function mostrarUsuarios(usuarios) {
  estadoMensaje.textContent = '';
  estadoMensaje.className = '';

  usuarios.forEach(usuario => {
    const li = document.createElement('li');
    li.className = 'usuario';
    li.innerHTML = `
      <h3>${usuario.name}</h3>
      <p><span>Email:</span> ${usuario.email}</p>
      <p><span>Ciudad:</span> ${usuario.address.city}</p>
      <p><span>Teléfono:</span> ${usuario.phone}</p>
    `;
    listaUsuarios.appendChild(li);
  });
}

// Función principal: consume la API dada una URL
function obtenerUsuarios(url) {
  mostrarCargando();

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`No se pudo obtener la información (status ${response.status})`);
      }
      return response.json();
    })
    .then(usuarios => {
      mostrarUsuarios(usuarios);
    })
    .catch(error => {
      mostrarError(error.message);
    });
}

// Botón: recargar con la URL correcta
btnRecargar.addEventListener('click', () => {
  obtenerUsuarios(URL_API);
});

// Botón: simular error a propósito (demo)
btnSimularError.addEventListener('click', () => {
  obtenerUsuarios(URL_INVALIDA);
});

// Ejecutar al cargar la página (con la URL correcta)
obtenerUsuarios(URL_API);