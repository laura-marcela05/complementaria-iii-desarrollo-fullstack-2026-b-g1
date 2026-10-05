const toggleButton = document.getElementById("toggle-note");
const hiddenNote = document.getElementById("hidden-note");

toggleButton.addEventListener("click", () => {
  const isHidden = hiddenNote.hasAttribute("hidden");

  if (isHidden) {
    hiddenNote.removeAttribute("hidden");
    toggleButton.textContent = "Ocultar nota";
  } else {
    hiddenNote.setAttribute("hidden", "");
    toggleButton.textContent = "Mostrar nota";
  }
});