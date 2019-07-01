const TOYS_URL = "http://localhost:3000/toys"

const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () => {
  fetchToys()
  addToyListener()
})

document.querySelector('#new-toy-btn').addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  addToy ? toyForm.style.display = 'block' : toyForm.style.display = 'none'
})

const fetchToys = () => {
    fetch(TOYS_URL)
    .then(resp => resp.json())
    .then(toysData => {
      toysData.forEach(toy => render(toy))
    })
  },

  render = (toy) => {
    const collection = toyCollection()
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')
    toyCard.dataset.id = toy.id
    toyCard.innerHTML += `
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}" alt="${toy.name}">
      <p><span>${toy.likes}</span> Likes</p>
      <button class="like-btn">Like <3</button>
    `
    toyCard.querySelector('.like-btn').addEventListener('click', e => likeToy(e) )
    collection.appendChild(toyCard)
  },

  addToyListener = () => {
    const form = addToyForm()
    form.addEventListener('submit', () => {
      event.preventDefault() 
      const name = form.querySelector('[name="name"]').value
      const image = form.querySelector('[name="image"]').value
      postNewToy(name, image)
      clearForm()
    })
  },

  postNewToy = (name, image) => {
    const data = {
      name, image, likes: 0
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
    .then(resp => resp.json()).then(data => render(data) )
    // Hide new toy form
    toyForm.style.display = 'none'
  },

  likeToy = (e) => {
    const likedToy = e.target.parentElement
    const id = likedToy.dataset.id
    const likes = likedToy.querySelector('p span')

    // Update likes
    let addLike = parseInt(likes.innerHTML) + 1

    // Change data.likes to addLike
    const data = {
      likes: addLike
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }
    // Push new likes to database
    fetch(`${TOYS_URL}/${id}`, configObj)
    .then(resp => resp.json())

    // Change displayed likes from database
    .then(data => likes.innerHTML = data.likes )
  },

  toyCollection = () => {
    return document.querySelector('#toy-collection')
  },

  addToyForm = () => {
    return document.querySelector('.add-toy-form')
  },
  
  clearForm = () => {
    addToyForm().reset()
  }