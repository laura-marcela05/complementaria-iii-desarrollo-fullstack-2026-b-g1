// Lógica JS: Problema 1 (evento clic) + Problema 2 (fetch con estados)

const btnCargar = document.getElementById("btnCargar");
const estado = document.getElementById("estado");
const lista = document.getElementById("listaJugadores");

btnCargar.addEventListener("click", () => {
  cargarJugadores();
});

function cargarJugadores() {
  // Estado: cargando
  estado.textContent = "Cargando jugadores...";
  lista.innerHTML = "";

  fetch("http://localhost:3000/jugadores")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos");
      }
      return respuesta.json();
    })
    .then((jugadores) => {
      // Estado: datos listos
      estado.textContent = "Jugadores cargados ✔️";
      mostrarJugadores(jugadores);
    })
    .catch((error) => {
      // Estado: error
      estado.textContent = "❌ Ocurrió un error: " + error.message;
    });
}

function mostrarJugadores(jugadores) {
  jugadores.forEach((jugador) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex align-items-center";

    item.innerHTML = `
      <img src="assets/img/jugador.png" alt="Jugador" width="40" height="40" class="me-2">
      <span>${jugador.nombre} — ${jugador.equipo} (${jugador.posicion}, #${jugador.dorsal})</span>
    `;
    lista.appendChild(item);
  });
}   