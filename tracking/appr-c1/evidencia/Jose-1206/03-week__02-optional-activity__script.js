const API_URL = 'https://jsonplaceholder.typicode.com/users';

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const userList = document.getElementById('user-list');
const reloadBtn = document.getElementById('reload-btn');
const retryBtn = document.getElementById('retry-btn');

function showLoading() {
  loadingState.hidden = false;
  errorState.hidden = true;
  userList.hidden = true;
  userList.innerHTML = '';
}

function showError(message) {
  loadingState.hidden = true;
  errorState.hidden = false;
  userList.hidden = true;
  errorMessage.textContent = message;
}

function showData(users) {
  loadingState.hidden = true;
  errorState.hidden = true;
  userList.hidden = false;

  userList.innerHTML = users
    .map(
      (user) => `
        <li class="user-card">
          <span class="user-name">${user.name}</span>
          <span class="user-meta">${user.email} · ${user.company.name}</span>
        </li>
      `
    )
    .join('');
}

async function loadUsers() {
  showLoading();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const users = await response.json();
    showData(users);
  } catch (error) {
    showError(error.message || 'Ocurrió un error inesperado.');
  }
}

reloadBtn.addEventListener('click', loadUsers);
retryBtn.addEventListener('click', loadUsers);

loadUsers();
