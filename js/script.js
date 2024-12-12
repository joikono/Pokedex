document.addEventListener('DOMContentLoaded', showAll);

const pokemonContainer = document.getElementById('pokemon-container');
const searchBar = document.getElementById('search-bar');

async function fetchPokemons(limit = 151) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayPokemons(pokemons) {
    pokemonContainer.innerHTML = '';
    for (const pokemon of pokemons) {
        const details = await fetchPokemonDetails(pokemon.url);
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <img src="${details.sprites.front_default}" alt="${details.name}">
            <h3>${details.name}</h3>
            <p>Height: ${details.height}<</p>
            <p>>Weight: ${details.weight}</p>
            <p>Type: ${details.types.map(t => t.type.name).join(', ')}</p>
        `;
        pokemonContainer.appendChild(pokemonCard);
    }
}

async function showAll() {
    const allPokemons = await fetchPokemons();
    displayPokemons(allPokemons);
}

async function filterByType(type) {
    const allPokemons = await fetchPokemons();
    if (type === 'all') {
        displayPokemons(allPokemons);
        return;
    }
    const filtered = [];
    for (const pokemon of allPokemons) {
        const details = await fetchPokemonDetails(pokemon.url);
        if (details.types.some(t => t.type.name === type)) {
            filtered.push(pokemon);
        }
    }
    displayPokemons(filtered);
}

searchBar.addEventListener('input', async () => {
    const searchTerm = searchBar.value.toLowerCase();
    const allPokemons = await fetchPokemons();
    const filtered = allPokemons.filter(pokemon => pokemon.name.includes(searchTerm));
    displayPokemons(filtered);
});

