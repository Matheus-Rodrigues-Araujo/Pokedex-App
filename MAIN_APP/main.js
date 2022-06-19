const input = document.querySelector('input')
const searchBtn = document.querySelector('button')
const pokemon_list = document.querySelector('.pokemon-list')

const fetchPokemon = fetch(
  'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
)

// console.log(fetchPokemon)

fetchPokemon
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    // Retorna O objeto através do método Json
    return response.json()
  }
  )
  .then(pokemonJson => {
    // pokemonJson.results é o objeto com as informações de todos os Pokemons
    pokemonJson.results.forEach((e) =>{
      // const pokemonIndex = pokemonJson.results.indexOf(e)
      const li = document.createElement('li')
      const h4 = document.createElement('h4')
      const link = document.createElement('a')
      const img = document.createElement('img')
      link.text = `See more info`
      link.href = e.url
      h4.textContent = e.name

      const urls = fetch(e.url)
      .then(
        response =>{
          if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
          }
          return (response.json())
        }
      )
      .then(
        json => {
          img.src = json.sprites.front_default
        }
      )
      
    li.append(h4,img, link)
    pokemon_list.appendChild(li)
    })
  })
  .catch(error => console.log(`Could not load the pokemons:
  ${error}`))

function createPokemonCard(){
  const li = document.createElement('li')
  const h4 = document.createElement('h4')
  const link = document.createElement('a')
  const img = document.createElement('img')

  li.append(h4, img, link)
  pokemon_list.appendChild(li)
}