// ==========================================
// PROBLEMA 1 - JAVASCRIPT
// ==========================================

const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", function () {
    message.textContent = "Hello! JavaScript is working.";
});


// ==========================================
// PROBLEMA 2 - CONSUMO DE API
// ==========================================

const loadButton = document.getElementById("loadButton");
const userList = document.getElementById("userList");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

loadButton.addEventListener("click", loadUsers);

async function loadUsers() {
    userList.innerHTML = "";
    error.textContent = "";

    // Estado de carga
    loading.classList.remove("d-none");
    loadButton.disabled = true;

    try {
        // Petición GET a la API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Error loading users");
        }

        // Convertimos la respuesta a JSON
        const users = await response.json();

        // Estado de datos
        users.forEach(function (user) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = user.name;
            userList.appendChild(li);
        });

    } catch (errorMessage) {
        // Estado de error
        error.textContent = "Error: Could not load users.";
        console.error(errorMessage);

    } finally {
        // Finalizamos el estado de carga
        loading.classList.add("d-none");
        loadButton.disabled = false;
    }
}
