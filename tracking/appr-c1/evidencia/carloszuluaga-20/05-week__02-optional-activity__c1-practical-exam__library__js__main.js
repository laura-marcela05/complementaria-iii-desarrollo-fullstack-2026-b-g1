const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const estado = document.getElementById("estado");

boton.addEventListener("click", function() {
    mensaje.textContent = "El botón funciona correctamente.";
});

fetch("https://dummyjson.com/products?limit=15")
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos");
        }

        return respuesta.json();
    })
    .then(function(datos) {
        estado.textContent = "Productos cargados:";

        datos.products.forEach(function(producto) {
            const elemento = document.createElement("li");
            elemento.textContent = producto.title;
            lista.appendChild(elemento);
        });
    })
    .catch(function(error) {
        estado.textContent = "Error al cargar los productos.";
        console.error(error);
    });