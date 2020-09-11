//récupération de l'id produit dans l'url

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idProduct = urlParam.get('id');

//créations des éléments dynamique

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
    });

//Choix de la lentille
let productLense;
productCard()
    .then(function(response) {
        const menuLenses = document.getElementById('lenses');
        response['lenses'].forEach((lense) => {
            const newOption = document.createElement('option');
            newOption.textContent = lense;
            menuLenses.appendChild(newOption)
        });
        
        menuLenses.addEventListener('change', function(e) {
            e.preventDefault();
            productLense = e.target.value;
        })
    })
//quantité de produit
let productQty = 1;
productCard()
    .then(function(response) {
        document.getElementById('quantité').addEventListener('change', function(e) {
            e.preventDefault();
            productQty = e.target.value;
        })
    })

//fonction panier
const btnPanier = document.getElementById("ajout-panier");
productCard()
    .then(function(response) {
        btnPanier.addEventListener('click', function(e) {
            e.preventDefault();
            //verifie si le client à choisi une lentille
            if (!productLense) {
                alert("Vous devez choisir une lentille");
                return
            }
            //créer l'objet
            let panierObj = (JSON.stringify({
                id: response["_id"],
                name: response["name"],
                price: response["price"],
                imageUrl: response["imageUrl"],
                lense: productLense,
                quantity: productQty
            }))
            //envoie l'objet dans le localStorage
            const numeroLigne = "panier" + (localStorage.length + 1);
            localStorage.setItem(numeroLigne, panierObj)
            console.log(localStorage);
        });
    })

window.onload = productCard;



