"use strict";

// URL de la API local levantada con json-server sobre data/db.json
// (ver README: json-server --watch data/db.json --port 3000)
const API_URL = "http://localhost:3000/quotes";

const btn = document.getElementById("load-btn");
const list = document.getElementById("list");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-msg");
const statusText = document.getElementById("status-text");

// Comportamiento en JS: al hacer clic, se cargan los datos (Problema 1 y 2)
btn.addEventListener("click", loadQuotes);

async function loadQuotes() {
  // estado: cargando
  statusText.classList.add("d-none");
  errorMsg.classList.add("d-none");
  loading.classList.remove("d-none");
  list.innerHTML = "";

  try {
    // Consumo de API con fetch, método GET (Problema 2)
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error HTTP " + response.status);
    }

    const quotes = await response.json();
    renderList(quotes);
  } catch (error) {
    // estado: error
    console.error("Error al cargar las citas:", error);
    loading.classList.add("d-none");
    errorMsg.textContent =
      "No se pudo conectar con la API. Verifica que json-server esté " +
      "corriendo (ver README) e inténtalo de nuevo.";
    errorMsg.classList.remove("d-none");
  }
}

function renderList(quotes) {
  // estado: datos
  loading.classList.add("d-none");

  quotes.forEach((q) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `"${q.quote}" — ${q.author}`;
    list.appendChild(li);
  });
}
