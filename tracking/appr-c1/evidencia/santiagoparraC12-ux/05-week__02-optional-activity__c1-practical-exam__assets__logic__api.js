const estado = document.getElementById("estado");
const lista = document.getElementById("lista");

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos");
        }

        return respuesta.json();
    })
    .then(datos => {
        estado.textContent = "Datos cargados correctamente";

        datos.slice(0, 10).forEach(post => {
            const elemento = document.createElement("li");
            elemento.textContent = post.title;
            lista.appendChild(elemento);
        });
    })
    .catch(error => {
        estado.textContent = "Ocurrió un error al cargar los datos";
        console.error(error);
    });