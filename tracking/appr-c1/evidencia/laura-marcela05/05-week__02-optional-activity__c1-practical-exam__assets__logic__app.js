// ===== Elementos del DOM =====
const lista = document.getElementById("lista");
const estado = document.getElementById("estado");
const btnAgregar = document.getElementById("btnAgregar");

// ===== Problema 2: consumo de la colección interna con fetch =====

// Estado "cargando" ya está puesto en el HTML por defecto.
// Pedimos los datos con GET (leer datos = GET).
fetch("assets/data/db.json")
  .then(function (respuesta) {
    if (!respuesta.ok) {
      throw new Error("No se encontró la colección interna.");
    }
    return respuesta.json();
  })
  .then(function (recetas) {
    // Estado "con datos": pintamos la lista
    estado.textContent = "";
    recetas.forEach(function (receta) {
      const item = document.createElement("li");
      item.className = "list-group-item";
      item.textContent = receta.nombre + " - " + receta.descripcion;
      lista.appendChild(item);
    });
  })
  .catch(function (error) {
    // Estado "error": no se pudo leer la colección interna
    estado.textContent = "No se pudieron cargar las recetas.";
    console.error("Error al cargar db.json:", error);
  });

// ===== Problema 1: comportamiento con JavaScript (botón) =====

let contador = 1;

btnAgregar.addEventListener("click", function () {
  const nuevoItem = document.createElement("li");
  nuevoItem.className = "list-group-item";
  nuevoItem.textContent = "Nueva receta agregada " + contador;
  lista.appendChild(nuevoItem);
  contador++;
});

// Nota (para la explicación escrita del Problema 2):
// - Para LEER datos usamos GET (lo que hicimos arriba con fetch).
// - Para CREAR una receta nueva en un backend real, usaríamos POST.
// - Para BORRAR una receta del backend, usaríamos DELETE.
