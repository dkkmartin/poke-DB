const input = document.querySelector('input')
const pokeDiv = document.querySelector('.pokeBox')
const headerLi = document.querySelectorAll('.header__ul li')
const form = document.querySelector('form')
const pokeball = document.querySelector('.pokeball')
let pokemonSpellsArray

form.addEventListener('submit', (e) => {
  e.preventDefault()
  pokeball.style.display = 'block'
  pokeDiv.style.display = 'none'
  getPokemon(input.value)
})

headerLi.forEach((li) => {
  li.addEventListener('click', () => {
    pokeball.style.display = 'block'
    pokeDiv.style.display = 'none'
    getPokemon(li.textContent.toLowerCase());
  });
});


function calcPokeHeight(data) {
  return data * 10
}

function calcPokeWeight(data) {
  return data / 10
}

function capitalizer(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function loopOverSpells() {
  pokemonSpellsArray.forEach((object) => {
    getPokemonSpells(object.ability.name)
  })
}

async function getPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
    headers: {
      "accept": "application/json"
    },
    method: "GET"
  }).then((response) => {
    return response.json()
  }).then((jsonData) => {
    pokemonSpellsArray = jsonData.abilities
    const ul = document.createElement('ul')
    ul.classList.add('grid__con')
    pokeDiv.innerHTML = ''
    ul.innerHTML = `
    <li class="pokeDetails">
      <div class="pokeImage">
        <img src="${jsonData.sprites.front_default}"></img>
        <h2>${capitalizer(jsonData.name)}</h2>
      </div>
      <ul class="pokeSpecs">
      <h4>Measurements</h4>
        <div class="height__weight">
          <li><span class="boldSpan">Height: </span>${calcPokeHeight(jsonData.height)} cm</li>
          <li><span class="boldSpan">Weight:</span> ${calcPokeWeight(jsonData.weight)} kg</li>
        </div>
        <h4>Abilities</h4>
        <div class="abilities">
        </div>
      </ul>
    </li>
    `
    pokeDiv.appendChild(ul)
    loopOverSpells()
  })
}

function getPokemonSpells(spell) {
  const spellsDiv = document.querySelector('.abilities')
  fetch(`https://pokeapi.co/api/v2/ability/${spell}`, {
    headers: {
      "accept": "application/json"
    },
    method: "GET"
  }).then((response) => {
    return response.json()
  }).then((jsonData) => {
    const newSpellDiv = document.createElement('div')
    const newSpellTitle = document.createElement('h5')
    const newSpellDesc = document.createElement('p')
    newSpellTitle.textContent = jsonData.name
    newSpellDesc.textContent = jsonData.effect_entries[1].effect
    newSpellDiv.appendChild(newSpellTitle)
    newSpellDiv.appendChild(newSpellDesc)
    spellsDiv.appendChild(newSpellDiv)
    pokeball.style.display = 'none'
    pokeDiv.style.display = 'block'
  })
}