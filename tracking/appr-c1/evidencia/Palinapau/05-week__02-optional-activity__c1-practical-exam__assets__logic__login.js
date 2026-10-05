// ==========================================
// Problema 1
// Comportamiento de un botón
// ==========================================

const botonSaludo =
    document.getElementById("botonSaludo");

const mensaje =
    document.getElementById("mensaje");


botonSaludo.addEventListener("click", function () {

    mensaje.textContent =
        "Botón presionado correctamente";

});



// ==========================================
// Problema 2
// Consumo de API con fetch y get
// ==========================================

const botonCargar =
    document.getElementById("cargarDatos");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const listaDatos =
    document.getElementById("listaDatos");



botonCargar.addEventListener(
    "click",
    cargarUsuarios
);



function cargarUsuarios() {


    // Limpiar datos anteriores

    listaDatos.innerHTML = "";


    // Ocultar errores anteriores

    error.classList.add("d-none");


    // Mostrar estado de carga

    loading.classList.remove("d-none");



    // Fetch utiliza get por defecto

    fetch(
        "https://jsonplaceholder.typicode.com/users"
    )


        // Respuesta del servidor

        .then(function (respuesta) {

            if (!respuesta.ok) {

                throw new Error(
                    "No fue posible obtener los datos"
                );

            }

            return respuesta.json();

        })



        // Datos obtenidos del servidor

        .then(function (usuarios) {


            // Ocultar estado de carga

            loading.classList.add("d-none");



            // Mostrar cada usuario

            usuarios.forEach(function (usuario) {


                const elemento =
                    document.createElement("li");


                elemento.className =
                    "list-group-item";


                elemento.innerHTML = `

                    <strong>
                        ${usuario.name}
                    </strong>

                    <br>

                    <small>
                        ${usuario.email}
                    </small>

                `;


                listaDatos.appendChild(elemento);

            });

        })



        // Manejo de errores

        .catch(function (err) {


            loading.classList.add("d-none");


            error.textContent =
                "Ocurrió un error: " + err.message;


            error.classList.remove("d-none");

        });

}