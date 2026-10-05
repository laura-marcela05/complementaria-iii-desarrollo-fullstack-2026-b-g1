const boton = document.getElementById("boton-agregar");
const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");

boton.addEventListener("click", function () {
  const titulo = document.getElementById("titulo");
  const artista = document.getElementById("artista");

  // Si falta algún campo no agregamos nada
  if (titulo.value === "" || artista.value === "") {
    aviso.textContent = "Escribe el título y el artista.";
    return;
  }

  aviso.textContent = "";

  // Armamos el nuevo <li> con sus dos spans
  const item = document.createElement("li");

  const spanTitulo = document.createElement("span");
  spanTitulo.className = "titulo";
  spanTitulo.textContent = titulo.value;

  const spanArtista = document.createElement("span");
  spanArtista.className = "artista";
  spanArtista.textContent = artista.value;

  item.appendChild(spanTitulo);
  item.appendChild(spanArtista);
  lista.appendChild(item);

  // Dejamos los campos vacíos para la siguiente canción
  titulo.value = "";
  artista.value = "";
  titulo.focus();
});
