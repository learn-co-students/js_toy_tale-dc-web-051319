const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector(".add-toy-form")
let addToy = false

function fetchToys() {
    fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then(toys => {
            renderToys(toys);
        });
};

function writeToyToDatabase(name, image) {
    let formData = {
        name: name,
        image: image,
        likes: 0
    };

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObject)
        .then(response => response.json())
        .then(toy => {
            window.alert(`Your toy, ${toy.name}, has been added.`)
            renderToys(toy);
        })
        .catch(error => {
            window.alert(error.message);
        });
};

function toySubmitHandler() {
    let toyName = toyForm[0].value;
    let toyImage = toyForm[1].value;
    writeToyToDatabase(toyName, toyImage);
};

function renderToys(toys) {
    if (!toys[0]) {
        makeToyCard(toys);
    } else {
        toys.forEach(toy => {
            makeToyCard(toy);
        });
    };
};

function makeToyCard(toy) {
    let toyCollection = document.querySelector("#toy-collection")

    //make a card
    let toyCard = document.createElement("div");
    toyCard.classList.add("card");
    toyCard.id = `toy-${toy.id}`

    //make and append name
    let toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    toyCard.appendChild(toyName);

    //make and append image
    let toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.classList.add("toy-avatar");
    toyCard.appendChild(toyImage);

    //make and append likes
    let toyLikes = document.createElement("p");
    toyLikes.innerText = toy.likes;
    toyCard.appendChild(toyLikes);

    let toyLikeButton = document.createElement("button");
    toyLikeButton.innerText = "Like <3";
    toyLikeButton.classList.add("like-btn");
    toyCard.appendChild(toyLikeButton);

    //append card
    toyCollection.appendChild(toyCard);
};

function clearToys() {
    let toyCollection = document.querySelector("#toy-collection")
    while (toyCollection.firstChild) {
        toyCollection.removeChild(toyCollection.firstChild);
    };
};

document.addEventListener("DOMContentLoaded", () => {
    fetchToys();
});

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
        toyFormContainer.style.display = 'block';
        toyForm.addEventListener("submit", (event) => {
            event.preventDefault();
            toySubmitHandler();
            toyForm.reset();
        });
    } else {
        toyFormContainer.style.display = 'none';
    };
});
