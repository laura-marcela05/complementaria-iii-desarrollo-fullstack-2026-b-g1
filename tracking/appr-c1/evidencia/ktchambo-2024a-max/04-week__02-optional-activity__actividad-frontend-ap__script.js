const charactersContainer = document.getElementById("characters");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const API_URL = "https://rickandmortyapi.com/api/character";

async function getCharacters() {

    loading.style.display = "block";
    error.style.display = "none";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const data = await response.json();

        displayCharacters(data.results);

    } catch (err) {

        console.error(err);

        loading.style.display = "none";
        error.style.display = "block";

    }
}

function displayCharacters(characters) {

    loading.style.display = "none";

    charactersContainer.innerHTML = "";

    characters.forEach(character => {

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            
            <div class="card-content">
                <h2>${character.name}</h2>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
            </div>
        `;

        charactersContainer.appendChild(card);

    });
}

getCharacters();