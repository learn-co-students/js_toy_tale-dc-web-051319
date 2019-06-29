document.addEventListener('DOMContentLoaded', () => {
  // Event Listeners go here
  // Starts the fetch
  const addBtn = document.querySelector('#new-toy-btn')
  // cd 

  const toyForm = document.querySelector('.container')
  let addToy = false
  fetchToys()
  

});





  


function toyCollect(){
  let toyCollection = document.querySelector('#toy-collection')
  return toyCollection
}


function fetchToys(){
  fetch('http://localhost:3000/toys')         //Fetches URL
  .then(response => response.json())          //Gets Response in 
  .then(toyData => {
      toyData.forEach(toy => {createToys(toy)})
     
  }
  )};

function createToys(toy){
  
  let card = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  p.innerText = ""+toy.likes+" Likes"
  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.innerText = 'Like <3'
  h2.innerText = ""+toy.name+""
  img.setAttribute('src', ""+toy.image+"")
  img.setAttribute('class', 'toy-avatar')
  card.setAttribute('class', 'card')
  card.append(h2) 
  card.append(img)
  card.append(p)
  card.append(button)
  renderToys(card)
  
}

function renderToys(card){
  toyCollect().append(card)
}


// OR HERE!


// addBtn.addEventListener('click', () => {
 



//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })