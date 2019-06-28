const TOYS_URL = "http://localhost:3000/toys"

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () => {
  fetchToys()
  addToyListener()
})

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

const fetchToys = () => {
    fetch(TOYS_URL)
    .then(resp => resp.json())
    .then(toysData => {
      toysData.forEach(toy => render(toy))
    })
  },

  postNewToy = (name, image) => {
    const data = {
      name: name,
      image: image,
      likes: 0
    }
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch(TOYS_URL, configObj)
    .then(resp => resp.json())
    .then(data => {
      render(data)
    })
    // Hide new toy form
    toyForm.style.display = 'none'
  },


  likeToy = (e) => {
    const likedToy = e.target.parentElement
    const id = likedToy.dataset.id
    const likes = likedToy.querySelector('p')

    const data = {
      likes: parseInt(likes.innerText)
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch(`${TOYS_URL}/${id}`, configObj)
    .then(resp => resp.json())
    .then(data => {
      // Update likes in JSON
      // PROBLEM: Not storing first click
      data.likes + 1
    })
    // Update like son page
    likes.innerText = data.likes + 1
  },


  render = (toy) => {
    const numToys = document.querySelector('#toy-collection').childElementCount
    const toyId = numToys + 1
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')
    toyCard.dataset.id = toyId
    toyCard.innerHTML += `
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}" alt="${toy.name}">
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
    `
    toyCard.querySelector('.like-btn').addEventListener('click', (e) => {
      likeToy(e)
    })
    toyCollection().appendChild(toyCard)
  },


  toyCollection = () => {
    return document.querySelector('#toy-collection')
  },

  addToyForm = () => {
    return document.querySelector('.add-toy-form')
  },

  addToyListener = () => {
    addToyForm().addEventListener('submit', () => {
      event.preventDefault()
      const name = addToyForm().children[1].value
      const image = addToyForm().children[3].value
      postNewToy(name, image)
      clearForm()
    })
  },
  
  clearForm = () => {
    addToyForm().reset()
  }


// OR HERE!
