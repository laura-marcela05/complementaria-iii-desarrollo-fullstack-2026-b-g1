let boton = document.getElementById("boton");
let mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function() {
    mensaje.innerHTML = "Datos ingresados correctamente";
});


let cargar = document.getElementById("cargar");
let estado = document.getElementById("estado");
let lista = document.getElementById("lista");

cargar.addEventListener("click", function() {

    estado.innerHTML = "Cargando datos...";
    lista.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function(respuesta) {

            if (!respuesta.ok) {
                throw new Error("Error al obtener los datos");
            }

            return respuesta.json();
        })
        .then(function(datos) {

            estado.innerHTML = "Datos cargados correctamente";

            datos.forEach(function(usuario) {

                let elemento = document.createElement("li");

                elemento.innerHTML = usuario.name;

                lista.appendChild(elemento);
            });
        })
        .catch(function(error) {

            estado.innerHTML = "Ocurrió un error al cargar los datos";
        });

});