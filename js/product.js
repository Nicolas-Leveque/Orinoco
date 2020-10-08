//récupération de l'id produit dans l'url

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idProduct = urlParam.get('id');

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

//créations des éléments dynamique

const prodName = document.createElement('h3');
const prodPrice = document.createElement('p');
const prodDescription = document.createElement('p');
const prodLense = document.createElement('div');
const prodQty = document.createElement('div');
const prodImg = document.createElement('img');

prodLense.innerHTML = "<label for='lenses'>Lentille :</label><select name='lenses' id='lenses'><option>Choisir</option></select>";
prodQty.innerHTML = "<label for='quantity'>Quantité</label><input type='number' name='quantity' id='quantity' value='1'>";

//création de  la carte produit

const prodCard = document.getElementById('info');
prodCard.appendChild(prodName);
prodCard.appendChild(prodDescription);
prodCard.appendChild(prodLense);
prodCard.appendChild(prodQty);
prodCard.appendChild(prodPrice);

const prodPhoto = document.getElementById('photo');
prodPhoto.appendChild(prodImg);

//Affichage de la carte produit
let productLense;
productCard()
    .then(function(response) {
        prodImg.setAttribute('src', response['imageUrl']);
        prodName.textContent = response['name'];
        prodPrice.textContent = response['price'] / 100 +" €";
        prodDescription.textContent = response['description'];
    });

//Choix de la lentille

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
        document.getElementById('quantity').addEventListener('change', function(e) {
            e.preventDefault();
            productQty = parseInt(e.target.value);
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
            let panierObj = ({
                id: response["_id"],
                lense: productLense,
                quantity: productQty
            })
            //verifie si le produit est déjà dans le localStorage, si oui mets à jour la quantité
            if(!localStorage.getItem(response._id)) {
                localStorage.setItem(response._id, JSON.stringify(panierObj));
                alert("Produit ajouté au panier")
            }else {
                let tmpProduct = JSON.parse(localStorage.getItem(response._id));
                let tmpQty = panierObj.quantity + tmpProduct.quantity;
                panierObj.quantity = tmpQty;
                localStorage.setItem(response._id, JSON.stringify(panierObj));
                alert("Produit ajouté au panier")
            }
        });
    });



