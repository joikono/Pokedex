document.addEventListener("DOMContentLoaded", showAll);

function showFire() {
    alert('Fire');
}

const pokemonData = [
    { name: "Rattata", type: "Normal", img: "img/rattata.png" },
    { name: "Charmander", type: "Fire", img: "img/charmander.png" },
    { name: "Squirtle", type: "Water", img: "img/squirtle.png" },
    { name: "Bulbasaur", type: "Grass", img: "img/bulbasaur.png" },
];

function displayPokemons(pokemons) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ""; // Clear existing content
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <img src="${pokemon.img}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Type: ${pokemon.type}</p>
        `;
        container.appendChild(card);
    });
}

function showAll() {
    displayPokemons(pokemonData);
}

function filterByType(type) {
    const filteredPokemons = pokemonData.filter(pokemon => pokemon.type === type);
    displayPokemons(filteredPokemons);
}

