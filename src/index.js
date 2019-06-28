const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyFormSubmitButton = document.querySelector('.add-toy-form')

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

document.addEventListener("DOMContentLoaded",() => {

  fetchAllToys()
  //added eventlister to create New toy button
  toyFormSubmitButton.addEventListener("submit", postNewToy)


})

//make GET request to fetch all toy objects,
function fetchAllToys(){

  fetch("http://localhost:3000/toys/")
  .then(response => response.json())
  .then(listAllToysObject => iterateThroughToysObject(listAllToysObject))
}

//iterate through each listAllToysObject
function iterateThroughToysObject(listAllToysObject){
  listAllToysObject.forEach((entry)=> { displayAToyEntry(entry)})
}

// for each toy object make a div with class of card , add it to the toy object
//add toy info to each card
//then for each entry  add it to the toy-collection div
function displayAToyEntry(entry){

  let toyCollection = document.querySelector("#toy-collection")
  //append toy elements to toy toyDiv
  let nameOfToy = toyNameField(entry)
  let imageOfToy = toyImageField(entry)
  let likeOfToy = toyLikeField(entry)
  let toyButtonOfToy = toyButtonField()
  let toyDivOfToy = toyDivField(entry)

  toyDivOfToy.append(nameOfToy,imageOfToy,likeOfToy,toyButtonOfToy )
  //append toy div to toy-collection
  toyCollection.appendChild(toyDivOfToy)
}

function toyImageField(entry) {
  let toyImage = document.createElement("img")
  toyImage.src = entry.image
  toyImage.classList.add("toy-avatar")
  return toyImage
}

function toyNameField(entry) {
  let toyName = document.createElement("h2")
  toyName.innerText = entry.name
  return toyName
}

function toyLikeField (entry){
  let toyLike = document.createElement("p")
  toyLike.innerText = `${entry.likes} Likes`
  return toyLike
}


function toyButtonField(){
  let toyLikeButton = document.createElement("button")
  toyLikeButton.classList.add("like-btn")
  toyLikeButton.innerText = "Like <3"
  toyLikeButton.addEventListener("click", updateLike )
  return toyLikeButton
}

function toyDivField(entry){
  let toyDiv = document.createElement("div")
  toyDiv.classList.add("card")
  toyDiv.dataset.id = entry.id
  return toyDiv
}

function postNewToy(){
  let data = {
    name: document.querySelector(".add-toy-form")[0].value,
    image: document.querySelector(".add-toy-form")[1].value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

function updateLike(){
  let id = event.target.parentElement.dataset.id

  let likes = event.target.parentElement.querySelector("p").innerText.split(" ")[0]


  likes++

  let toyEntryLikes = {
    likes: likes
  }
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyEntryLikes)
  }).then(res => res.json())
  .then(res => updateLikeFrontEnd(res,id))
}

function updateLikeFrontEnd(res,id){
  if (res.likes == null){
    res.likes = 0

  }
let oldLikeDataNumber =  document.querySelector(`[data-id~="${id}"]`).querySelector("p")

oldLikeDataNumber.innerText = `${res.likes} Likes`



}
