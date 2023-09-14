const dataListElement = document.querySelector('#datalist')

function fetchList() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=10000').then(async response => {
    const data = await response.json()
    data.results.forEach(object => {
      const newOption = document.createElement('option')
      newOption.textContent = object.name
      dataListElement.appendChild(newOption)
    })
  })
}

fetchList()