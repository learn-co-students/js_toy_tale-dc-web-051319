const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

document.addEventListener('DOMContentLoaded', () => {
  getToys()
})

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.map(toy => renderToy(toy)))
}

function renderToy(toy){
  
  let toyDiv= document.createElement("div")
 
  toyDiv.className += "card"
  // or toyDiv.classlist.add("card")

  let toyName = document.createElement("h2")
  toyName.innerText = toy.name
  

  let toyImg = document.createElement("img")
  toyImg.src = toy.image
  toyImg.className += "toy-avatar"

  let toyLikes = document.createElement("p")
  toyLikes.id = `${toy.id}-likes`
  toyLikes.innerText = `Likes: ${toy.likes}`

  let toyButton = document.createElement("button")
  toyButton.addEventListener("click", addLike)
  toyButton.id = toy.id
  toyButton.innerText = "🖤"
  getToyCollection().appendChild(toyDiv)
  toyDiv.append(toyName, toyImg, toyLikes, toyButton) 
}

/////post handler!!!!

function addNewToy(event){
  event.preventDefault()

  let nameElement = document.getElementById("name-field")
  let imageElement = document.getElementById("img-url-field")
  // console.log("im ttryingg")
  
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: nameElement.value,
        //add value to the end of name and image elements
        image: imageElement.value,
        likes: 0

      })
    })
  .then(response=> response.json())
  .then(data => renderToy(data))
  
}











/////// like handlerrrr
function addLike(event){
  // console.log(event.currentTarget.id)
 
  // targetoy.like.innertext ++
  // add like is going to make a patch request that
  //  adds a like to the json file and then change the amount of like(innertex) on the likes

  let targetToy= event.currentTarget
  currentLikes = document.getElementById(`${targetToy.id}-likes`)
 
  toyLikeToInt = parseInt(currentLikes.innerHTML.split(" ")[1])
  toyLikeToInt++

  let data = {"likes": toyLikeToInt }

  

  fetch( `http://localhost:3000/toys/${targetToy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(results=> {
    // debugger
    currentLikes.innerText = `Likes: ${results.likes}`
    //when interpolating at this point grab from the backend
  })
}





//// node stuff ///

function getToyCollection(){
  return document.querySelector("#toy-collection")
}

function getForm() {
  return document.querySelector(".add-toy-form")
}

