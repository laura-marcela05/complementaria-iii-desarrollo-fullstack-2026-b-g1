const statusMessage = document.getElementById("status");
const userList = document.getElementById("userList");

let users = [];

async function getUsers() {

    statusMessage.textContent = "Cargando usuarios...";
    userList.innerHTML = "";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Error al consultar la API");
        }

        const data = await response.json();

        users = data;

        userList.innerHTML = "";

        users.forEach(function (user) {

            const listItem = document.createElement("li");

            listItem.textContent =
                user.name + " - " + user.email;

            userList.appendChild(listItem);
        });

        statusMessage.textContent = "Usuarios cargados correctamente.";

    } catch (error) {

        statusMessage.textContent =
            "Ocurrió un error al consultar los usuarios.";

        console.error(error);
    }
}

getUsers();
