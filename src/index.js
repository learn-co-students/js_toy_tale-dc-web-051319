const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    getForm().addEventListener("submit", addNewToy)
  } else {
    toyForm.style.display = 'none'
  }
});

document.addEventListener("DOMContentLoaded", getToys);

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => createToy(toy)))
};

function createToy(toyObj) {

  let toyDiv = document.createElement("div");
  toyDiv.classList.add("card");
  
  let toyH2 = document.createElement("h2");
  toyH2.innerText = toyObj.name;

  let toyIMG = document.createElement("img");
  toyIMG.src = toyObj.image;
  toyIMG.classList.add("toy-avatar");

  let toyP = document.createElement("p");
  toyP.innerText = `${toyObj.likes} Likes`;
  
  let toyBtn = document.createElement("button");
  toyBtn.id = toyObj.id;
  toyBtn.addEventListener("click", updateLike);
  toyBtn.classList.add("like-button");
  toyBtn.innerText = "Like <3";

  let toyDel = document.createElement("button");
  toyDel.id = toyObj.id;
  toyDel.innerText = "Delete </3"
  toyDel.addEventListener("click", deleteToy);
  toyDel.classList.add("delete-button")

  toyDiv.append(toyH2, toyIMG, toyP, toyBtn, toyDel);

  getToyDiv().appendChild(toyDiv)
};

// use "event" as the argument on a function that is called in an event listener.

function updateLike(event) {
  // console.log(event.currentTarget.parentElement.querySelector("p")) <-- called traversing the DOM. 
  let toyId = event.currentTarget.id;
  let para = event.currentTarget.previousSibling;
  let currentLikes = event.currentTarget.previousSibling.innerText;
  currentLikes = parseInt(currentLikes.split(" ")[0])
  currentLikes += 1;
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: currentLikes
    })
  })
  .then(resp => resp.json())
  .then(data => {
    para.innerText = `${data.likes} Likes`
  })
  
}

function deleteToy(event) {
  event.preventDefault();
  let toRemove = event.currentTarget.parentElement;
  let toyId = event.currentTarget.id;
  getToyDiv().removeChild(toRemove);
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "DELETE"
  })
}
// ALWAYS put the return when getting an element with a fucntion
// ALWAYS put the () at the end when referring a function with a return?

function getToyDiv() {
  return document.getElementById("toy-collection")
}

function getForm() {
  return document.querySelector(".add-toy-form")
}

// ^ when looking for something with a class, use querySelector, OR put an ID on it and getElementByID 

function addNewToy (event) {
  event.preventDefault();

  let nameValue = document.getElementById("name-field");
  let imageValue = document.getElementById("img-url-field");

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: nameValue.value,
      image: imageValue.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(data => createToy(data))

  getForm().reset();
}


