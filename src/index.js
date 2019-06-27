const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const indexURL = "http://localhost:3000/toys";



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

function getJSON(url){
  return fetch(url).then(response => response.json());
}

function initIndexPage(){
  getJSON(indexURL).then(toys => toys.forEach(renderInDOM));
}


function postData(url , data = {}) {
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
}


function patchData(url , data = {}) {
  return fetch(url, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
}

function likeHandler(e){
  const newLike = Number(e.target.previousElementSibling.innerText)+1;
  const editURL = "http://localhost:3000/toys/"+e.target.parentElement.id;
  const editToy = { likes : newLike };
  patchData(editURL,editToy);
}

function renderInDOM(toy){
  const toyCollectionDiv = document.getElementById("toy-collection");
  const toyCardDiv = document.createElement("div");
  const toyName = document.createElement("h2");
  const toyImg = document.createElement("img");
  const toyP = document.createElement("p");
  const toyLike = document.createElement("button");
  toyCardDiv.classList.add("card");
  toyImg.classList.add("toy-avatar");
  toyLike.classList.add("like-btn");
  toyCardDiv.id=toy.id;
  toyName.innerText = toy.name;
  toyImg.src = toy.image;
  toyP.innerText = toy.likes;
  toyLike.innerText="Like <3";
  toyLike.addEventListener("click",likeHandler);
  toyCardDiv.appendChild(toyName);
  toyCardDiv.appendChild(toyImg);
  toyCardDiv.appendChild(toyP);
  toyCardDiv.appendChild(toyLike);
  toyCollectionDiv.appendChild(toyCardDiv);
}




function toySubmitHandler(e){
  const newToy = {name: e.target.name.value,
                image: e.target.image.value,
                likes: 0
              };
  postData(indexURL,newToy);
}

function init(){
  initIndexPage();
}



document.addEventListener("DOMContentLoaded",init);
toyForm.addEventListener("submit",toySubmitHandler);

