function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let monsterContainer = qs('#monster-container')
let backButton = qs('#back')
let forwardButton = qs('#forward')
let form = qs('form')


let counter = 1
let monsters

function render(){
  monsterContainer.innerHTML = ''
    monsters.forEach(one => {
      let div = ce('div')
      let div2 = ce('div')
      let div3 = ce('div')
      let br = ce('br')
      div.innerText = `Name: ${one.name}`
      div2.innerText = `Age: ${one.age}`
      div3.innerText = `Description: ${one.description}`
      monsterContainer.append(div, div2, div3, br)
      console.log(one)
    })
}

document.addEventListener('DOMContentLoaded', () => {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
    .then( res => res.json())
    .then( res => monsters = res)
    .then( render)
})

backButton.addEventListener('click', () => {
  if(counter > 1){
  counter--
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
    .then( res => res.json())
    .then( res => monsters = res )
    .then( render)
}})

forwardButton.addEventListener('click', () => {
  if(counter < 20){
  counter++
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
    .then( res => res.json())
    .then( res => monsters = res )
    .then( render)
}})

form.addEventListener('submit', (e) => {
  console.log(e)
  e.preventDefault()
  let data = {
    name: e.target.name.value,
    age: e.target.age.value,
    description: e.target.description.value
  }
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers:
      {
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
  })
  counter = 1
  render()
})
