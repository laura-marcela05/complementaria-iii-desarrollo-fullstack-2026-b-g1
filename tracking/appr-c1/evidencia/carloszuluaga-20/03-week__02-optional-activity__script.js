const boton = document.getElementById("cargarBtn");
const lista = document.getElementById("lista");
const estado = document.getElementById("estado");

boton.addEventListener("click", function() {

    estado.textContent = "Cargando usuarios...";
    lista.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error en la petición");
            }

            return respuesta.json();
        })
        .then(function(usuarios) {

            estado.textContent = "Usuarios cargados correctamente";

            usuarios.forEach(function(usuario) {
                const elemento = document.createElement("li");
                elemento.textContent = usuario.name;
                lista.appendChild(elemento);
            });

        })
        .catch(function(error) {
            estado.textContent = "Error al cargar los usuarios";
            console.log(error);
        });
});