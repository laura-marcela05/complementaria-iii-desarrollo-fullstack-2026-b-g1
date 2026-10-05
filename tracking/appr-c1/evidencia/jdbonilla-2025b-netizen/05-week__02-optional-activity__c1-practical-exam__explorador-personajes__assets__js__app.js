const API_URL = "https://rickandmortyapi.com/api/character";
const TOTAL_PERSONAJES = 826;

const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const discoverBtn = document.getElementById("discoverBtn");
const statusEl = document.getElementById("status");
const resultSection = document.getElementById("resultSection");
const resultImg = document.getElementById("resultImg");
const resultIntro = document.getElementById("resultIntro");
const resultDetails = document.getElementById("resultDetails");

discoverBtn.addEventListener("click", descubrirPersonaje);

async function descubrirPersonaje() {
  const nombre = nameInput.value.trim();
  const edad = ageInput.value.trim();

  const soloLetras = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;

  const soloNumeros = /^[0-9]+$/;

  if (!nombre || !edad) {
    setStatus("⚠️ Por favor completa tu nombre y tu edad", "error");
    resultSection.hidden = true;
    return;
  }

  if (!soloLetras.test(nombre)) {
    setStatus("⚠️ El nombre no debe contener números", "error");
    resultSection.hidden = true;
    return;
  }

  if (!soloNumeros.test(edad)) {
    setStatus("⚠️ La edad debe ser solo números", "error");
    resultSection.hidden = true;
    return;
  }

  // 1) ESTADO: CARGA
  setStatus("⏳ Buscando tu personaje...", "loading");
  resultSection.hidden = true;
  discoverBtn.disabled = true;

  try {
    // ... (el resto sigue exactamente igual, no lo toques)
    const idAleatorio = Math.floor(Math.random() * TOTAL_PERSONAJES) + 1;
    const response = await fetch(`${API_URL}/${idAleatorio}`);

    if (!response.ok) {
      throw new Error("La API respondió con error " + response.status);
    }

    const personaje = await response.json();

    // 2) ESTADO: DATOS
    mostrarResultado(nombre, edad, personaje);
    setStatus("✅ ¡Personaje encontrado!", "success");

  } catch (error) {
    // 3) ESTADO: ERROR
    setStatus("❌ Ocurrió un error: " + error.message, "error");
  } finally {
    discoverBtn.disabled = false;
  }
}

function mostrarResultado(nombre, edad, personaje) {
  resultImg.src = personaje.image;
  resultImg.alt = personaje.name;
  resultIntro.textContent = `${nombre} (${edad} años), ¡tu personaje es ${personaje.name}!`;

  resultDetails.innerHTML = `
    <li><strong>Estado:</strong> ${personaje.status}</li>
    <li><strong>Especie:</strong> ${personaje.species}</li>
    <li><strong>Género:</strong> ${personaje.gender}</li>
    <li><strong>Origen:</strong> ${personaje.origin.name}</li>
  `;

  resultSection.hidden = false;
}

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = type;
}