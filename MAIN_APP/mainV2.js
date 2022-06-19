const logo = document.querySelector('.logo')

const input = document.querySelector('input')
const searchBtn = document.querySelector('.search')

const pokemon_list = document.querySelector('.pokemon-list')
pokemon_list.classList.add('hide')

const pokeballAnimation = document.querySelector('.loading-animation')

const showAll = document.querySelector('.all')

// check the amout of pokemon
let totalPokemon

// Input
input.focus()
input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && input.value){
    const pokemonName = input.value
    searchPokemon(pokemonName)
    input.value = ''
  }
})
// Buttons
searchBtn.addEventListener('click', ()=>{
  const pokemonName = input.value
  searchPokemon(pokemonName)
  input.value = ''
})

showAll.addEventListener('click', ()=>{
  pokeballAnimation.classList.remove('hide')
  pokemon_list.classList.add('hide')
  displayPokemon()
})

// Function that shows all the pokemons
function displayPokemon(){
  pokemon_list.innerHTML = ''
  const fetchPokemon = fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  )


  fetchPokemon
    .then(response => {
      // Check HTTP problems
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      // Returns a object
      return response.json()
    }
    )
    .then(pokemonJson => {
      if(!pokemonJson.results){
        throw new Error(`Something went wrong`)
      }
      totalPokemon = pokemonJson.results.length
      // Returns the data from each pokemon
      return pokemonJson.results
    })
    .catch(error => console.log(`Could not load the pokemons:
    ${error}`))

    .then(
      results => {
        // This method will iterate over all the objects
        results.forEach((e) =>{
          // Calling the function that creates a Pokemon card
          createPokemonCard(e.name, e.url)
        }
        )
      }
    )
}

displayPokemon()


function searchPokemon(name){
  pokemon_list.innerHTML = ''
  const fetchPokemon = fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  )

  fetchPokemon
    .then(response => {
      // Check HTTP problems
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      // Returns a object
      return response.json()
    }
    )
    .then(pokemonJson => {
      if(!pokemonJson.results){
        throw new Error(`Something went wrong`)
      }
      totalPokemon = pokemonJson.results.length
      // Returns the data from each pokemon
      return pokemonJson.results
    })
    .catch(error => console.log(`Could not load the pokemons:
    ${error}`))

    .then(
      results => {
        // This method will iterate over all the objects
        results.forEach((e) =>{
          if(e.name === name.toLowerCase()){
            createPokemonCard(e.name, e.url)
          }
          // Calling the function that creates a Pokemon card
        }
        )
      }
    )
}

function createPokemonCard(pokemonName,pokemonUrl){
  fetch(pokemonUrl)
  .then(
    response => {
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      return response.json()
    }
  )

  .catch(
    error => {console.log(`Could not get to the pokemon data: ${error}`)}
  )

  .then(
    response => {

      const li = document.createElement('li')
      const h4 = document.createElement('h4')
      const link = document.createElement('a')
      const img = document.createElement('img')

      link.text = `See more info`
      h4.textContent = pokemonName[0].toUpperCase() + pokemonName.slice(1)
      img.src = response.sprites.front_default
      li.append(h4, img, link)
      pokemon_list.appendChild(li)

    }
  )

  .then(
    ()=> checkLength() 
  )
}

// This function will check if the amount of 'li' elements is equal to the amount of pokemons
// If it is, then the animation will disappear
function checkLength(){
  if(pokemon_list.childNodes.length === totalPokemon){
    pokeballAnimation.classList.add('hide')
    pokemon_list.classList.remove('hide')
  }
}