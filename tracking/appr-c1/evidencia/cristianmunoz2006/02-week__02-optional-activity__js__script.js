"use strict";

/**
 * Comportamiento de la maqueta: al hacer clic en "Ver sinopsis",
 * se muestra (o se vuelve a ocultar) el párrafo de sinopsis de esa
 * tarjeta, y el texto del botón cambia para reflejar el estado.
 */
const toggleButtons = document.querySelectorAll(".btn-toggle");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".book-card");
    const synopsis = card.querySelector(".book-synopsis");

    const isHidden = synopsis.hasAttribute("hidden");

    if (isHidden) {
      synopsis.removeAttribute("hidden");
      button.textContent = "Ocultar sinopsis";
    } else {
      synopsis.setAttribute("hidden", "");
      button.textContent = "Ver sinopsis";
    }
  });
});
