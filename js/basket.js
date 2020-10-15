let prixTotal;
let basket = [];
let productDetails;
let contact;
let products = [];
let sendObj;
let orderDetails;
let panierArray =[];
function retrieveLocalStorage() {
    //extrait les infos des produits dans le panier et les stock dans un array d'objet
    return new Promise((resolve, reject) => {
        for (let i = 0; i <= localStorage.length - 1 ; i++) {
            if (localStorage.key(i).startsWith("5be")) {
                panierArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        };   
        resolve(panierArray);
        });   
};
function getProductsDetails() {
    //envoie une requête pour récupérer les infos produits
    return new Promise((resolve, reject) => {                
        let request = new XMLHttpRequest();
        request.open("GET", `http://localhost:3000/api/cameras/`);
        request.send();
        request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status)
            { 
                productDetails = JSON.parse(this.responseText);
                resolve(productDetails)
                };                
            };        
            
    });
};
function createBasket() {
    //créer un array d'objets contenant les infos nécessaire en combinant les infos tirées du localStorage et celles de l'API
    return new Promise((resolve, reject) => {
        panierArray.forEach((objectLocal) => {
            productDetails.forEach((objectProduct) => {
                if(objectLocal.id === objectProduct._id) {
                    let tmpObj = {};
                    tmpObj = {id: objectProduct._id, name: objectProduct.name, lense: objectLocal.lense, quantity: objectLocal.quantity, price: objectProduct.price/100};
                    basket.push(tmpObj);
                    checkStorageTables(panierArray, basket, resolve);
                }
            });
        });
    });
};
const infoPanier = document.getElementById("panier");
const infoPrixTotal = document.getElementById('prix-total');
function createHTMLTable (){
    //Affiche le panier sur la page HTML
    prixTotal = 0;
    infoPanier.innerHTML = '';
        for ( let i=0; i< basket.length; i++) {   
            const newRow = document.createElement("tr");
            newRow.setAttribute("id", `row-${i}`)
            newRow.innerHTML = 
                `<th>${basket[i].name}</th>
                <th>${basket[i].lense}</th>
                <th>${basket[i].price}</th>
                <th>${basket[i].quantity}</th>
                <th id="linePrice-${i}">${basket[i].price * basket[i].quantity}</th>
                <th><button onclick="deleteLine(${i})">X</button></th>`;
                infoPanier.appendChild(newRow);
                let linePrice = document.getElementById(`linePrice-${i}`);
                prixTotal += parseInt(linePrice.textContent);
        };
    infoPrixTotal.innerHTML = prixTotal;
};
function checkStorageTables(panierArray, basket, resolve) {
    if(basket.length === panierArray.length) {
        resolve(basket)
    }
};
retrieveLocalStorage()
    .then(getProductsDetails()
    .then(createBasket)
    .then(createHTMLTable))
function contactInfo() {
    //récupération et vérification des données du formulaire et création d'un objet de contact
    const prenomElt =  document.getElementById('firstName');
    const nomElt =  document.getElementById('lastName');
    const adresseElt =  document.getElementById('adress');
    const villeElt =  document.getElementById('city');
    const emailElt =  document.getElementById('email');
    
    if (!prenomElt.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ-]{1,20}$/g) || prenomElt.value === '') {
        prenomElt.style.borderColor = 'red';
        return;
    }
    if (!nomElt.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ-]{1,20}$/g) || nomElt.value === '') {
        nomElt.style.borderColor = 'red';
        return
    }
    if (!adresseElt.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-\s]{1,64}$/g) || adresseElt.value === '') {
        adresseElt.style.borderColor = 'red';
        return
    }
    if (!villeElt.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ-]{1,20}$/g) || villeElt.value === '') {
        console.log(villeElt.value);
        villeElt.style.borderColor = 'red';
        return
    }
    if (!emailElt.value.match(/[A-Za-z\._%0-9]+@+[A-Za-z0-9.-]+\.+[A-Za-z]/g) || emailElt.value === '') {
        emailElt.style.borderColor = 'red';
        return
    }
    contact = {
        firstName: prenomElt.value,
        lastName: nomElt.value,
        address: adresseElt.value,
        city: villeElt.value,
        email: emailElt.value
    }  
}
//Verifie si il y a des produits dans le panier et créer un array avec les id pour envoyer à l'API
function createBasketArray() {
    if (basket === []){
        alert("Le panier est vide")
        return
    } else {
        products =[];
        basket.forEach((product) => {
            products.push(product.id)
        })
    }
}
function checkoutRequest() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.open("POST", "http://localhost:3000/api/cameras/order")
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(sendObj));
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 201) {
                let response = JSON.parse(request.responseText);                
                orderDetails = response;
                resolve(orderDetails);
            }
        }
    })
}
//récupère les infos de commande et les envoie dans le localStorage avec la key order et redirige vers la page de confirmation
function orderObj() {
    let orderObj = {
        name: orderDetails.contact.firstName,
        order: orderDetails.orderId,
        prix: prixTotal,
    }
    if(!localStorage.getItem("order")) {
        localStorage.setItem("order", JSON.stringify(orderObj))
        document.location.href="confirmation.html"
    } else {
        alert('Vous avez déjà une commande en cours de traitement')
    }
}
//Le bouton commander envoie la requête POST à l'API et récupère les infos de commande
document.getElementById("confirm").addEventListener("click", (e) => {
    e.preventDefault();
    contactInfo();
    createBasketArray();
    sendObj = {contact, products};
    checkoutRequest()
        .then(orderObj)
});
//bouton vider le panier
document.getElementById("vide-panier").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    basket = [];
    window.location.reload();
});
// Efface une ligne du panier
function deleteLine(line) {
    localStorage.removeItem(basket[line].id);
    basket.splice(line, 1);
    createHTMLTable();
};