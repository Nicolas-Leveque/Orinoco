//récupération de l'id produit dans l'url

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idProduct = urlParam.get('id');

//créations des éléments dynamique

let productObj;
let newCard = document.createElement('div');
let newImg = document.createElement('img');
let newCardBody = document.createElement('div');
newCardBody.innerHTML = "<h3 class='card-title'></h3><h4></h4><p></p>";
newCard.appendChild(newImg);
newCard.appendChild(newCardBody);
document.getElementById('product-card').appendChild(newCard);
newCard.classList.add('card', 'mt-4');
newImg.classList.add('card-img-top','img-fluid');
const newCBText = newCardBody.children;

//récupération des données de produit et retour d'une promesse

function productCard() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.open("GET", `http://localhost:3000/api/cameras/${idProduct}`);
        request.send();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
                let response = JSON.parse(this.responseText)
                };
            };
        });
    };

//création de  la carte produit

productCard()
    .then(function(response) {
        newImg.setAttribute('src', response['imageUrl']);
        newCBText[0].textContent = response['name'];
        newCBText[1].textContent = response['price'] / 100 +" €";
        newCBText[2].textContent = response['description'];
        const menuLenses = document.getElementById('lenses');
        response['lenses'].forEach((lense) => {
            const newOption = document.createElement('option');
            newOption.textContent = lense;
            menuLenses.appendChild(newOption)
        });
    });



function panier() {
    console.log(productObj);
    
};
window.onload = productCard;

const btnPanier = document.getElementById("ajout-panier");
btnPanier.addEventListener('click', panier);
