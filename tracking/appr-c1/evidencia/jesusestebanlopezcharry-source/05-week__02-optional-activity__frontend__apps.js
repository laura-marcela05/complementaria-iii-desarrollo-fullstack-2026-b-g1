const boton = document.getElementById("btnCargar");
const lista = document.getElementById("listaProductos");
const estado = document.getElementById("estado");

boton.addEventListener("click", function () {

    estado.textContent = "Cargando productos...";
    lista.innerHTML = "";

    fetch("/productos")
        .then(response => {

            if (!response.ok) {
                throw new Error("Error al consultar la API");
            }

            return response.json();
        })
        .then(productos => {

            productos.forEach(producto => {

                const elemento = document.createElement("li");

                elemento.textContent =
                    `${producto.nombre} - $${producto.precio} - ${producto.familia}`;

                lista.appendChild(elemento);
            });

            estado.textContent = "Productos cargados correctamente.";
        })
        .catch(error => {

            estado.textContent = "No se pudieron cargar los productos.";

            console.error(error);
        });
});

/* * MÉTODOS HTTP PARA OTRAS OPERACIONES: 
* * Para crear un producto usaría POST, porque permite enviar 
* los datos de un nuevo producto al servidor. 
* * Para borrar un producto usaría DELETE, indicando el 
* * identificador del producto que se desea eliminar. */