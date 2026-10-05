// Guardamos referencias a los elementos que vamos a usar
const boton = document.getElementById("boton");
const curioso = document.getElementById("curioso");

// Evento: al hacer clic, mostramos u ocultamos el dato curioso
boton.addEventListener("click", function () {
  curioso.classList.toggle("oculto");

  if (curioso.classList.contains("oculto")) {
    boton.textContent = "Mostrar dato curioso";
  } else {
    boton.textContent = "Ocultar dato curioso";
  }
});
