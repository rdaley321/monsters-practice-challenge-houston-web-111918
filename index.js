function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let monsterContainer = qs('#monster-container')
let backButton = qs('#back')
let forwardButton = qs('#forward')


let counter = 1
let monsters

function render(res){
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
  counter++
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
    .then( res => res.json())
    .then( res => monsters = res )
    .then( render)
})
