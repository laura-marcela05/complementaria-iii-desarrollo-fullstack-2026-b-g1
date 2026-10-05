// Referencias del DOM
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const successState = document.getElementById('successState');
const dataList = document.getElementById('dataList');
const retryBtn = document.getElementById('retryBtn');

// API pública de prueba
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Función para cambiar de estado en la UI
function setUIState(state) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  successState.classList.add('hidden');

  if (state === 'loading') loadingState.classList.remove('hidden');
  if (state === 'error') errorState.classList.remove('hidden');
  if (state === 'success') successState.classList.remove('hidden');
}

// Función principal para consumir la API
async function fetchData() {
  setUIState('loading');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const users = await response.json();
    renderList(users);
    setUIState('success');

  } catch (error) {
    console.error('Error al consumir la API:', error);
    setUIState('error');
  }
}

// Función para renderizar el mockup de elementos
function renderList(users) {
  dataList.innerHTML = ''; // Limpiar lista
  
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-card';
    li.innerHTML = `
      <h3>👤 ${user.name}</h3>
      <p>✉️ ${user.email}</p>
      <p>🏢 ${user.company.name}</p>
    `;
    dataList.appendChild(li);
  });
}

// Escuchar evento de reintento
retryBtn.addEventListener('click', fetchData);

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', fetchData);