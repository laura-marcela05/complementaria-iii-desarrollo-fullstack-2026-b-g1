const API_URL = 'https://jsonplaceholder.typicode.com/users';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const userListEl = document.getElementById('user-list');
const reloadBtn = document.getElementById('reload-btn');
const retryBtn = document.getElementById('retry-btn');

async function fetchUsers() {
  // Estado 1: Activar Carga
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  userListEl.innerHTML = '';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const users = await response.json();

    // Estado 2: Mostrar Datos
    renderUsers(users);
  } catch (error) {
    // Estado 3: Mostrar Error
    console.error('Fetch error:', error);
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
}

function renderUsers(users) {
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> @${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Ciudad:</strong> ${user.address.city}</p>
      <p><strong>Compañía:</strong> ${user.company.name}</p>
    `;
    userListEl.appendChild(card);
  });
}

reloadBtn.addEventListener('click', fetchUsers);
retryBtn.addEventListener('click', fetchUsers);

// Carga inicial
fetchUsers();