const API_BASE = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const loadingMsg = document.getElementById("loadingMsg");
const errorMsg = document.getElementById("errorMsg");
const recipeList = document.getElementById("recipeList");

// ---------- STATE HELPERS ----------

function showLoading() {
  loadingMsg.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  recipeList.innerHTML = "";
}

function showError(message) {
  loadingMsg.classList.add("hidden");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
  recipeList.innerHTML = "";
}

function showRecipes(meals) {
  loadingMsg.classList.add("hidden");
  errorMsg.classList.add("hidden");
  recipeList.innerHTML = "";

  meals.forEach((meal) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.className = "recipe-card";
    link.href = meal.strSource || meal.strYoutube || "#";
    link.target = "_blank";
    link.rel = "noopener";

    const img = document.createElement("img");
    img.className = "recipe-thumb";
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;

    const info = document.createElement("div");
    info.className = "recipe-info";

    const name = document.createElement("span");
    name.className = "recipe-name";
    name.textContent = meal.strMeal;

    const category = document.createElement("span");
    category.className = "recipe-category";
    category.textContent = [meal.strCategory, meal.strArea]
      .filter(Boolean)
      .join(" · ");

    info.appendChild(name);
    info.appendChild(category);
    link.appendChild(img);
    link.appendChild(info);
    li.appendChild(link);
    recipeList.appendChild(li);
  });
}

// ---------- API CALL ----------

async function fetchRecipes(query) {
  showLoading();
  try {
    const response = await fetch(`${API_BASE}${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("network");
    }

    const data = await response.json();

    if (!data.meals) {
      showError(
        `No se encontraron recetas para "${query}". Intenta con otro término.`,
      );
      return;
    }

    showRecipes(data.meals);
  } catch (err) {
    showError(
      "Ocurrió un error al consultar las recetas. Revisa tu conexión e intenta de nuevo.",
    );
  }
}

// ---------- EVENTS ----------

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  fetchRecipes(query);
});

// Load an initial set of recipes so the list isn't empty on first visit
fetchRecipes("chicken");
