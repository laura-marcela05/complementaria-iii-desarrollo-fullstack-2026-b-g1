// Problema 2: consumo de API con fetch, metodo GET explicito.
// Maneja 3 estados: carga (visible por defecto), datos (se muestran
// al llegar la respuesta) y error (si el fetch falla)


const elCargaP2 = document.getElementById('estado-carga-p2');
const elErrorP2 = document.getElementById('estado-error-p2');
const elListaUsuarios = document.getElementById('lista-usuarios');

function cargarUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return respuesta.json();
    })
    .then((usuarios) => {
      elListaUsuarios.innerHTML = '';

      usuarios.forEach((usuario) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${usuario.name}</strong> — ${usuario.email}`;
        elListaUsuarios.appendChild(li);
      });

      elCargaP2.classList.add('d-none');
      elListaUsuarios.classList.remove('d-none');
    })
    .catch((error) => {
      console.error('Error cargando usuarios:', error);
      elCargaP2.classList.add('d-none');
      elErrorP2.classList.remove('d-none');
    });
}

cargarUsuarios();