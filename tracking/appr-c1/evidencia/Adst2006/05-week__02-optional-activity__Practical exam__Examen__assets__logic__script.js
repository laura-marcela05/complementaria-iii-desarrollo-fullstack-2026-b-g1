/* =========================================================
   PROBLEMA 1 — Comportamiento con JavaScript
   Al hacer clic en el botón, ocurre algo: se piden y se muestran
   los países.
   =========================================================

   PROBLEMA 2 — Consumo de API con fetch (GET)
   Maneja 3 estados: cargando, datos y error.
   Para crear un registro se usaría POST, y para borrar uno,
   DELETE. Aquí solo consultamos datos, por eso usamos GET.
   ========================================================= */

const loadBtn = document.getElementById("load-btn");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const countriesList = document.getElementById("countries-list");

// API gratuita y sin API key para datos de países
const API_URL = "https://countries.dev/region/Americas";

loadBtn.addEventListener("click", cargarPaises);

async function cargarPaises() {
  mostrarEstado("cargando");

  try {
    const respuesta = await fetch(API_URL); // método GET
    if (!respuesta.ok) throw new Error("Respuesta no válida de la API");

    const paises = await respuesta.json();

    mostrarEstado("datos");
    pintarPaises(paises);

  } catch (error) {
    mostrarEstado("error");
    console.error(error);
  }
}

function mostrarEstado(estado) {
  loadingState.classList.toggle("hidden", estado !== "cargando");
  errorState.classList.toggle("hidden", estado !== "error");
  if (estado === "cargando") countriesList.innerHTML = "";
}

function pintarPaises(paises) {
  countriesList.innerHTML = "";

  paises
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((pais) => {
      const capital = Array.isArray(pais.capital) ? pais.capital[0] : pais.capital;
      const bandera = (pais.flags && pais.flags.svg) || pais.flag || "";

      const item = document.createElement("li");
      item.className = "country-card";
      item.innerHTML = `
        <img src="${bandera}" alt="Bandera de ${pais.name}" />
        <div class="country-info">
          <h3>${pais.name}</h3>
          <p>Capital: ${capital || "N/A"}</p>
          <p>Población: ${pais.population.toLocaleString("es")}</p>
        </div>
      `;
      countriesList.appendChild(item);
    });
}
