"use strict";

/**
 * Recetario Exprés
 * Frontend que consume la API pública DummyJSON (/recipes)
 * https://dummyjson.com/docs/recipes
 *
 * Estructura del archivo:
 *  1. Configuración y estado
 *  2. Manejo de estados de la UI
 *  3. Carga de datos (fetch)
 *  4. Render de tarjetas + búsqueda
 *  5. Arranque
 */

/* =========================================================
   1. Configuración y estado
   ========================================================= */
const API_URL = "https://dummyjson.com/recipes?limit=100";

const state = {
  allRecipes: [],
};

/* =========================================================
   2. Manejo de estados de la UI
   ========================================================= */
const els = {
  loading: document.getElementById("state-loading"),
  error: document.getElementById("state-error"),
  empty: document.getElementById("state-empty"),
  data: document.getElementById("state-data"),
  meta: document.getElementById("board-meta"),
  grid: document.getElementById("recipe-grid"),
  retryBtn: document.getElementById("retry-btn"),
  searchInput: document.getElementById("search-input"),
};

function setState(name) {
  const map = {
    loading: els.loading,
    error: els.error,
    empty: els.empty,
    data: els.data,
  };
  Object.entries(map).forEach(([key, el]) => {
    el.classList.toggle("is-hidden", key !== name);
  });
}

/* =========================================================
   3. Carga de datos (fetch)
   ========================================================= */
async function loadRecipes() {
  setState("loading");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`La API respondió con estado ${response.status}`);
    }
    const data = await response.json();

    state.allRecipes = data.recipes;
    els.meta.textContent = `${data.recipes.length} recetas cargadas.`;
    renderRecipes(state.allRecipes);
  } catch (err) {
    console.error("Error al cargar el recetario:", err);
    setState("error");
  }
}

/* =========================================================
   4. Render de tarjetas + búsqueda
   ========================================================= */
function renderRecipes(list) {
  if (list.length === 0) {
    setState("empty");
    return;
  }

  els.grid.innerHTML = list.map(recipeCardHTML).join("");
  setState("data");
}

function recipeCardHTML(recipe) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return `
    <article class="recipe-card">
      <img
        class="recipe-image"
        src="${recipe.image}"
        alt="${escapeHTML(recipe.name)}"
        loading="lazy"
      />
      <div class="recipe-body">
        <span class="recipe-tag">${escapeHTML(recipe.cuisine)}</span>
        <h3 class="recipe-name">${escapeHTML(recipe.name)}</h3>
        <p class="recipe-meta">Dificultad: ${escapeHTML(recipe.difficulty)}</p>
        <p class="recipe-meta">${totalTime} min · ★ ${recipe.rating}</p>
      </div>
    </article>
  `;
}

/** Evita inyección de HTML al insertar texto proveniente de la API. */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

let searchTimer;
els.searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const term = e.target.value.trim().toLowerCase();
  searchTimer = setTimeout(() => {
    const filtered = !term
      ? state.allRecipes
      : state.allRecipes.filter(
          (r) =>
            r.name.toLowerCase().includes(term) ||
            r.cuisine.toLowerCase().includes(term)
        );
    renderRecipes(filtered);
  }, 200);
});

els.retryBtn.addEventListener("click", loadRecipes);

/* =========================================================
   5. Arranque
   ========================================================= */
document.addEventListener("DOMContentLoaded", loadRecipes);
