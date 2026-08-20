// Elementos usados en la página
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const resultsList = document.getElementById("resultsList");

// Traducciones para que la API entienda algunos ingredientes en español
const traducciones = {
  pollo: "chicken",
  carne: "beef",
  res: "beef",
  cerdo: "pork",
  pescado: "fish",
  camaron: "shrimp",
  camarones: "shrimp",
  arroz: "rice",
  pasta: "pasta",
  ensalada: "salad",
  sopa: "soup",
  pastel: "cake",
  torta: "cake",
  postre: "dessert",
  huevo: "egg",
  huevos: "egg",
  papa: "potato",
  papas: "potato",
  queso: "cheese",
  pan: "bread",
  chocolate: "chocolate",
};

// Traduzce el término introducido por el usuario si existe en el objeto
function traducirTermino(termino) {
  const clave = termino.toLowerCase().trim();
  return traducciones[clave] || termino;
}

// Muestro el estado de carga y limpio los resultados anteriores
function mostrarCargando() {
  loadingState.classList.remove("hidden");
  errorState.classList.add("hidden");
  resultsList.innerHTML = "";
}

// Muestra el mensaje de error y limpio los resultados
function mostrarError() {
  loadingState.classList.add("hidden");
  errorState.classList.remove("hidden");
  resultsList.innerHTML = "";
}

// Muestra en pantalla las recetas recibidas desde la API
function mostrarDatos(recetas) {
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  resultsList.innerHTML = "";

  // Comprueba si la API no devolvió ninguna receta
  if (!recetas || recetas.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No se encontraron recetas con ese nombre.";
    resultsList.appendChild(li);
    return;
  }

  // Creo un elemento de lista para cada receta encontrada
  recetas.forEach((receta) => {
    const li = document.createElement("li");
    li.textContent = receta.strMeal;
    resultsList.appendChild(li);
  });
}

// Se realiza la búsqueda de recetas en la API pública
function buscarRecetas() {
  const termino = searchInput.value.trim();

  // Se evita hacer una petición si el campo está vacío
  if (!termino) {
    mostrarError();
    return;
  }

  mostrarCargando();

  // Adapta el término al idioma utilizado por la API
  const terminoBusqueda = traducirTermino(termino);

  // Consulto TheMealDB y proceso la respuesta en formato JSON
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${terminoBusqueda}`,
  )
    .then((res) => res.json())
    .then((data) => mostrarDatos(data.meals))
    .catch((err) => {
      // Muestro el error en la consola y aviso al usuario
      console.error("Error al obtener recetas:", err);
      mostrarError();
    });
}

// Ejecutar la búsqueda al hacer clic en el botón
searchBtn.addEventListener("click", buscarRecetas);

// Buscar al presionar Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarRecetas();
  }
});
````;
