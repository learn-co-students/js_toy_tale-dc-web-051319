const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

function renderToys(toys) {
    let toyCollection = document.querySelector("#toy-collection")

    toys.forEach(toy => {
        //make a card
        let toyCard = document.createElement("div");
        toyCard.classList.add("card");
        toyCard.id = `toy-${toy.id}`

        //make and append name
        let toyName = document.createElement("h2");
        toyName.innerText = toy.name;
        toyCard.appendChild(toyName);

        //make and append image
        let toyImage = document.createElement("ing");
        toyImage.src = toy.image;
        toyCard.appendChild(toyImage);

        //make and append likes
        let toyLikes = document.createElement("p");
        toyLikes.innerText = toy.likes;
        toyCard.appendChild(toyLikes);

        //append card
        toyCollection.appendChild(toyCard);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    let toys = fetchToys();
    renderToys(toys);
});

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
