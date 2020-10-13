//récupération de l'id produit dans l'url

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idProduct = urlParam.get('id');

//récupération des données de produit et retour d'une promesse
let responseReq;
function productCard() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.open("GET", `http://localhost:3000/api/cameras/${idProduct}`);
        request.send();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
                responseReq = JSON.parse(this.responseText)
            };
        };
    });
};

let productLense;
let productQty = 1;

function showProduct(response) {

    //création des éléments HTML
    const prodName = document.createElement('h3');
    const prodPrice = document.createElement('p');
    const prodDescription = document.createElement('p');
    const prodLense = document.createElement('div');
    const prodQty = document.createElement('div');
    const prodImg = document.createElement('img');
    const prodCard = document.getElementById('info');
    prodCard.appendChild(prodName);
    prodCard.appendChild(prodDescription);
    prodCard.appendChild(prodLense);
    prodCard.appendChild(prodQty);
    prodCard.appendChild(prodPrice);
    
    //affichage des éléments
    const prodPhoto = document.getElementById('photo');
    prodPhoto.appendChild(prodImg);
    prodLense.innerHTML = "<label for='lenses'>Lentille :</label><select name='lenses' id='lenses'><option>Choisir</option></select>";
    prodQty.innerHTML = "<label for='quantity'>Quantité</label><input type='number' name='quantity' id='quantity' value='1'>";
    prodImg.setAttribute('src', response['imageUrl']);
    prodName.textContent = response['name'];
    prodPrice.textContent = response['price'] / 100 +" €";
    prodDescription.textContent = response['description'];

    //création et affichage du menu de choix de le lentille
    const menuLenses = document.getElementById('lenses');
    response['lenses'].forEach((lense) => {
        const newOption = document.createElement('option');
        newOption.textContent = lense;
        menuLenses.appendChild(newOption)
    })
    //Choix de la lentille
    menuLenses.addEventListener('change', function(e) {
    e.preventDefault();
    productLense = e.target.value;
    })
    //quantité de produit
    
    document.getElementById('quantity').addEventListener('change', function(e) {
    e.preventDefault();
    productQty = parseInt(e.target.value);
    });
    
};

productCard()
    .then(showProduct);

//fonction panier
const btnPanier = document.getElementById("ajout-panier");
btnPanier.addEventListener('click', function(e) {
    e.preventDefault();
    //verifie si le client à choisi une lentille
    if (!productLense) {
        alert("Vous devez choisir une lentille");
        return
    }            
    //créer l'objet
    let panierObj = ({
        id: responseReq["_id"],
        lense: productLense,
        quantity: productQty
    })
    //verifie si le produit est déjà dans le localStorage, si oui mets à jour la quantité
    if(!localStorage.getItem(responseReq._id)) {
        localStorage.setItem(responseReq._id, JSON.stringify(panierObj));
        
    }else {
        let tmpProduct = JSON.parse(localStorage.getItem(responseReq._id));
        let tmpQty = panierObj.quantity + tmpProduct.quantity;
        panierObj.quantity = tmpQty;
        localStorage.setItem(responseReq._id, JSON.stringify(panierObj));
        
    }
    Cart.items = [];
    Cart.afterInit = majIconePanier;
    Cart.init();
});



