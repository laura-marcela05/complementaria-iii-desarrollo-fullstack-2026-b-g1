// Lista de pokémon que vamos a pedirle a la API
const NOMBRES_POKEMON = ["pikachu", "mewtwo", "articuno", "zapdos", "moltres", "lugia"];

// Referencias a los elementos del HTML que vamos a controlar
const contenedorLista = document.getElementById("lista-pokemon");
const mensajeCargando = document.getElementById("mensaje-cargando");
const mensajeError = document.getElementById("mensaje-error");

// Pide a la API los datos de un pokémon 
function obtenerPokemon(nombre) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(res => res.json());
}

// Arma el HTML de todas las tarjetas juntas
function mostrar(pokemones) {
  contenedorLista.innerHTML = pokemones
    .map(pokemon => {
      const tipos = pokemon.types.map(t => t.type.name).join(" / ");
      return `
        <li class="pokemon-card">
          <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
          <h3>${pokemon.name}</h3>
          <p class="tipo">Tipo: ${tipos}</p>
        </li>
      `;
    })
    .join("");
}

// Estado inicial: mostrando "Cargando..." y ocultando el error
mensajeCargando.style.display = "block";
mensajeError.style.display = "none";

// Pedimos los 6 pokémon; cuando todos respondan, mostramos los datos.
// Si cualquiera falla, caemos en el catch 
Promise.all(NOMBRES_POKEMON.map(nombre => obtenerPokemon(nombre)))
  .then(pokemones => {
    mostrar(pokemones);
    mensajeCargando.style.display = "none"; // Estado: datos listos
  })
  .catch(err => {
    mensajeCargando.style.display = "none";
    mensajeError.style.display = "block";   // Estado: error
    console.error("Error:", err);
  });