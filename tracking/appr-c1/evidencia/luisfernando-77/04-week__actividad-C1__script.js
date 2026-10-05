const API_URL = 'https://fakestoreapi.com/products';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const gridEl = document.getElementById('products-grid');
const reloadBtn = document.getElementById('reload-btn');

async function fetchProducts() {
  // 1. Estado de Carga (Loading)
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  gridEl.innerHTML = '';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener datos');
    
    const data = await response.json();
    
    // 2. Estado de Datos
    renderProducts(data);
  } catch (err) {
    // 3. Estado de Error
    console.error(err);
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
}

function renderProducts(products) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div>
        <span class="badge">Disponible para Trueque</span>
        <h3>${product.title}</h3>
        <p>${product.description.substring(0, 80)}...</p>
      </div>
      <button class="btn" style="width:100%; margin-top:10px;">Ofrecer Trueque</button>
    `;
    gridEl.appendChild(card);
  });
}

reloadBtn.addEventListener('click', fetchProducts);

// Cargar automáticamente al entrar
document.addEventListener('DOMContentLoaded', fetchProducts);