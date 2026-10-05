const listaEstudiantes = document.getElementById("listaEstudiantes");
const boton = document.getElementById("btnAsistencia");
const mensaje = document.getElementById("mensaje");

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Consultar estudiantes desde la API
async function cargarEstudiantes() {

    // Estado de carga
    listaEstudiantes.innerHTML = "<li>Cargando estudiantes...</li>";

    try {

        // Solicitud GET a la API
        const respuesta = await fetch(API_URL);

        // Verificar si la respuesta fue correcta
        if (!respuesta.ok) {
            throw new Error("No fue posible obtener los estudiantes.");
        }

        // Convertir la respuesta a JSON
        const estudiantes = await respuesta.json();

        // Estado de datos
        listaEstudiantes.innerHTML = "";

        estudiantes.forEach(function (estudiante) {

            const li = document.createElement("li");

            li.textContent = `${estudiante.name} - ${estudiante.email}`;

            listaEstudiantes.appendChild(li);
        });

    } catch (error) {

        // Estado de error
        listaEstudiantes.innerHTML =
            "<li>Error al cargar los estudiantes.</li>";

        console.error("Error:", error);
    }
}

// Registrar asistencia
boton.addEventListener("click", function () {
    mensaje.textContent =
        "La asistencia ha sido registrada correctamente.";
});

// Cargar estudiantes al iniciar la página
cargarEstudiantes();