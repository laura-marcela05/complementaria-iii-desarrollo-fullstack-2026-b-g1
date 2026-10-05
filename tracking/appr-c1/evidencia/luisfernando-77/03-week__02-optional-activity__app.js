// ---------------------------------------------------------------
// Semana 3 · Consumo de API con fetch y manejo de estados
// API pública usada: JSONPlaceholder (https://jsonplaceholder.typicode.com)
// No requiere API key, ideal para practicar fetch.
// ---------------------------------------------------------------

const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadingSection = document.getElementById("state-loading");
const errorSection = document.getElementById("state-error");
const errorDetail = document.getElementById("error-detail");
const dataList = document.getElementById("state-data");
const rowTemplate = document.getElementById("person-row-template");

const reloadBtn = document.getElementById("reload-btn");
const retryBtn = document.getElementById("retry-btn");

function showState(state) {
  loadingSection.hidden = state !== "loading";
  errorSection.hidden = state !== "error";
  dataList.hidden = state !== "data";
}

function buildPersonRow(person) {
  const node = rowTemplate.content.cloneNode(true);

  node.querySelector(".person__name").textContent = person.name;
  node.querySelector(".person__role").textContent = person.company?.name ?? "Sin equipo asignado";
  node.querySelector(".person__email").textContent = person.email;
  node.querySelector(".person__city").textContent = person.address?.city ?? "";

  return node;
}

function renderPeople(people) {
  dataList.innerHTML = "";

  if (!people || people.length === 0) {
    const emptyRow = document.createElement("li");
    emptyRow.className = "person";
    emptyRow.textContent = "No hay personas para mostrar.";
    dataList.appendChild(emptyRow);
    return;
  }

  people.forEach((person) => {
    dataList.appendChild(buildPersonRow(person));
  });
}

async function loadDirectory() {
  showState("loading");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`El servidor respondió con estado ${response.status}`);
    }

    const people = await response.json();
    renderPeople(people);
    showState("data");

  } catch (error) {
    console.error("Error al consumir la API:", error);
    errorDetail.textContent = error.message || "Ocurrió un error inesperado.";
    showState("error");
  }
}

reloadBtn.addEventListener("click", loadDirectory);
retryBtn.addEventListener("click", loadDirectory);

loadDirectory();