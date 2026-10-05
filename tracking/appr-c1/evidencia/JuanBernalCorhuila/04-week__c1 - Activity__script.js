const API_URL = "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga";

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const teamsContainer = document.getElementById("teams-container");
const retryBtn = document.getElementById("retry-btn");

function obtenerEquipos() {
  // 1. Mostrar estado de carga y ocultar estados anteriores
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  teamsContainer.innerHTML = "";

  // 2. Consumo de API con fetch (.then / .catch igual a lo visto en clase)
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Respuesta de red no ok");
      }
      return response.json();
    })
    .then(data => {
      // Ocultar carga al recibir los datos
      loadingEl.classList.add("hidden");

      if (!data.teams || data.teams.length === 0) {
        throw new Error("No hay equipos disponibles");
      }

      mostrarEquipos(data.teams);
    })
    .catch(error => {
      console.error("Error capturado:", error);
      // Ocultar carga y mostrar estado de error
      loadingEl.classList.add("hidden");
      errorEl.classList.remove("hidden");
    });
}

function mostrarEquipos(equipos) {
  equipos.forEach(equipo => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${equipo.strBadge}" alt="Escudo de ${equipo.strTeam}">
      <h3>${equipo.strTeam}</h3>
      <p>Estadio: ${equipo.strStadium || 'N/A'}</p>
      <p>Fundado: ${equipo.intFormedYear || 'N/A'}</p>
    `;
    teamsContainer.appendChild(card);
  });
}

// Event listeners
retryBtn.addEventListener("click", obtenerEquipos);
document.addEventListener("DOMContentLoaded", obtenerEquipos);