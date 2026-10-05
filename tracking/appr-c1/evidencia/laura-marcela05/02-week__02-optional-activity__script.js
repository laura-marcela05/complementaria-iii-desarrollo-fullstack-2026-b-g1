const toggleBtn = document.getElementById("toggleBtn");
const note = document.getElementById("note");

toggleBtn.addEventListener("click", () => {
  const isHidden = note.classList.toggle("hidden");
  toggleBtn.textContent = isHidden ? "Un ultimo tip" : "Ocultar tip";
});
