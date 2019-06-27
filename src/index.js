const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const submitForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){
  fetchToys()
})

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(toy => {
        // create new card container
        let newDiv = document.createElement('div')
        newDiv.classList.add('card')
        newDiv.id = toy.id
        // create h2 with name and append to card
        let newH2 = document.createElement('h2')
        newH2.innerText = toy.name
        newDiv.appendChild(newH2)
        // create img and append to card
        let newImg = document.createElement('img')
        newImg.src = toy.image
        newImg.classList.add('toy-avatar')
        newDiv.appendChild(newImg)
        // p element with like count
        let newP = document.createElement('p')
        newP.innerText = `${toy.likes} likes`
        newDiv.appendChild(newP)
        // button tag for liking
        let newBtn = document.createElement('button')
        newBtn.classList.add('like-btn')
        newBtn.innerText = "Like <3"
        newDiv.appendChild(newBtn)
        // append div to toy container
        toyCollection.appendChild(newDiv)
      })
      likeButtons()
      console.log(json)
    })
}

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



submitForm.addEventListener('submit', createToy)

function createToy(event) {
  event.preventDefault()
  let name = event.target.name.value 
  let url = event.target.image.value

  let formData = {
    name: name, 
    image: url, 
    likes: 0
  }

  let configObj = {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json)
    .then(json => {
      fetchToys()
      console.log(json)})
    .catch(error => console.log(error))
}


function likeButtons(){
  let likeButtons = document.querySelectorAll('.like-btn')
  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', handleLike)
  })
}

function handleLike(event){
  toyId = event.currentTarget.parentNode.id
  likeCount = parseInt(event.currentTarget.parentNode.children[2].innerText.split(" ")[0], 10) 
  let formData = {
    likes: likeCount + 1
  }

  let configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then(resp => resp.json())
    .then(json => {
      event.target .parentNode.children[2].innerText = `${json.likes} likes`
    })
    .catch(error => console.log(error))
  console.log(likeCount + 1)
}