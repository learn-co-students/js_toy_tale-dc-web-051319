//event.target.previousSibling

document.addEventListener('DOMContentLoaded', init )


const clearForm = document.querySelector('.add-toy-form')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')


let addToy = false

// YOUR CODE HERE

function init() {
  getToys()

}


function getToys () {
  return fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(json => toyCard(json))
}


function toyCard(toys) {
  toys.forEach( toy => {
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyDiv.id = `toy-${toy.id}`
    const p = document.createElement('p')
    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    const btn = document.createElement('button')
    btn.innerText = `Like <3`
    btn.className = "like-btn"
    btn.addEventListener('click', likeHandler)
    const h2 = document.createElement('h2')
    h2.innerText = `${toy.name}`
    toyDiv.appendChild(h2)
    toyDiv.appendChild(img)
    toyCollection.appendChild(toyDiv)
    p.innerText = `${toy.likes} Likes`
    toyDiv.appendChild(p)
    toyDiv.appendChild(btn)
  })
}

function oneToyCard(toy) {
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyDiv.id = `toy-${toy.id}`
    const p = document.createElement('p')
    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    const btn = document.createElement('button')
    btn.innerText = `Like <3`
    btn.className = "like-btn"
    btn.addEventListener('click', likeHandler)
    const h2 = document.createElement('h2')
    h2.innerText = `${toy.name}`
    toyDiv.appendChild(h2)
    toyDiv.appendChild(img)
    toyCollection.appendChild(toyDiv)
    p.innerText = `${toy.likes} Likes`
    toyDiv.appendChild(p)
    toyDiv.appendChild(btn)
}

function makeToy (event) {
  event.preventDefault()
    let name = event.target.name.value
    let image = event.target.image.value
    let likes = 0
  return fetch( "http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name,
      image,
      likes
    } )
  } )
  .then( function (response) {
    return response.json()
  } )
  .then( toy => {
    oneToyCard(toy)
    clearForm.reset()
  })
}




function likeHandler (event) {
  let id = event.target.parentNode.id.split("-")[1]
  let likes = parseInt(event.target.previousSibling.textContent.split(" ")[0]) + 1
  console.log(`This is the ${id} this is the like ${likes}`)
  return fetch( `http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      likes
    } )
  } )
  .then( function (response) {
    return response.json()
  } )
  .then( newLike => {
    likeScreenUpdate(newLike)

  })

}


function likeScreenUpdate(update) {

  const x = document.querySelector(`#toy-${update.id}`)
  const p = x.querySelector("p")
  p.innerText = `${update.likes} Likes`

  // querySelector div and querySelector for child
}




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', makeToy)
  } else {
    toyForm.style.display = 'none'
  }
})



// OR HERE!
