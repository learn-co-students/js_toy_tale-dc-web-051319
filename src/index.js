const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


document.addEventListener("DOMContentLoaded", init)

function init(){
  getToys()
 
}






function getToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => data.forEach(putToysHere) )
}




function putToysHere(data){
  let toyCollection = document.getElementById("toy-collection")
  let newDiv = document.createElement('div')
  let card = newDiv.classList.add('card')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let h3 = document.createElement('h3')
  let btn = document.createElement('button')
  img.classList.add('toy-avatar')
  h2.innerText = data.name 
  img.src = data.image
  newDiv.id = data.id
  h3.innerText = `${data.likes} likes`
  btn.classList.add('like-btn')
  btn.innerText = 'Like <3'
  btn.addEventListener('click', plusLikes)
  newDiv.appendChild(h2)
  newDiv.appendChild(img)
  newDiv.appendChild(h3)
  newDiv.appendChild(btn)
  toyCollection.appendChild(newDiv)
}


function plusLikes(e){
  newNum = parseInt(e.target.parentNode.querySelector("h3").innerText.split(" ")[0])
  newNum++

  toyId = parseInt(e.target.parentElement.id)
  e.target.previousElementSibling.innerText = `${newNum} likes`

  
  // e.target.parentEvent.querySelector("h3").innerText = `${newNum++} likes`
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
     method: 'PATCH', 
     headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
     },
     body: JSON.stringify({likes: newNum})
  })
    .then(res => res.json())
    .then(data => console.log(data))
  
 
}








const toyish = document.querySelector('.add-toy-form')
toyish.addEventListener('submit', postToys)


function postToys(e){
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value

  fetch('http://localhost:3000/toys',{
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
    
  })
  .then(response => response.json())
  .then(data => putToysHere(data))
}



// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})



// OR HERE!
