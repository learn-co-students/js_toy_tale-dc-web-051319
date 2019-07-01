document.body.style.backgroundColor = 'lightgreen'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

let url = 'http://localhost:3000/toys'

document.addEventListener('DOMContentLoaded', function() {
    fetchToys() 
})

function fetchToys() {
    fetch(url)
    .then(response => response.json())
    .then( toys => toys.forEach( toy => displayToy(toy)))
}

function displayToy(toy) {
    let div = document.createElement('div')
    div.classList.add('card')
    
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
    
    let img = document.createElement('img')
    img.src = toy.image
    img.classList.add('toy-avatar')
    
    let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    
    let btn = document.createElement('button')
    btn.addEventListener('click', updateLike)
    btn.classList.add('like-button')
    btn.id = toy.id
    btn.innerText = 'Like <3'
    
    div.append(h2, img, p, btn)
    getToyDiv().appendChild(div)
}

function updateLike(event) {
    // console.log(event.currentTarget.parentElement.querySelector('p'))
    let id = event.currentTarget.id
    let para = event.currentTarget.previousSibling
    let currentLikes = event.currentTarget.previousSibling.innerText
    currentLikes = parseInt(currentLikes.split(' ')[0])
    currentLikes += 1

    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            likes: currentLikes
        })
    })
        .then(response => response.json())
        .then(data => {
            para.innerText = `${data.likes} Likes`
        })
}

function getToyDiv() {
    return document.getElementById('toy-collection')
}

function getForm() {
    return document.querySelector('.add-toy-form')
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
      getForm().addEventListener('submit', addNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})

function addNewToy(event) {
    event.preventDefault()

    let name = document.getElementById('name-field')
    let img = document.getElementById('img-url-field')

    fetch(url, {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            image: img.value,
            likes: 0
        })
    })
        .then(response => response.json())
        .then(data =>displayToy(data))
}
