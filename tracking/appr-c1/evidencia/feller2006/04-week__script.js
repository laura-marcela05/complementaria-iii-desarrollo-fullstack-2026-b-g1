const userList = document.getElementById("user-list");
const status = document.getElementById("status");

const API_URL = "users.json";

async function getUsers() {
    try {
        status.textContent = "Loading users...";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error loading users");
        }

        const users = await response.json();

        displayUsers(users);

        status.textContent = `${users.length} users found`;

    } catch (error) {
        status.textContent = "Unable to load users. Please try again.";
        console.error(error);
    }
}

function displayUsers(users) {
    userList.innerHTML = "";

    users.forEach(user => {
        const card = document.createElement("article");

        card.classList.add("user-card");

        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.city}</p>
        `;

        userList.appendChild(card);
    });
}

getUsers();