let panierArray = [];
let prixTotal;
let basket = [];
let productDetails;
let contact;
let products = [];
let sendObj;
function retrieveLocalStorage() {
    //extrait les infos des produits dans le panier et les stock dans un array d'objet
    return new Promise((resolve, reject) => {
        for (let i = 0; i <= localStorage.length - 1 ; i++) {
            if (localStorage.key(i).startsWith("5be")) {
                panierArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }else {
                return
            };
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
const infoPanier = document.getElementById("info-panier");
const infoPrixTotal = document.getElementById('prixTotal');
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
                <th><button class="btn btn-danger btn-sm delete-line" onclick="deleteLine(${i})">x</button></th>`;
                infoPanier.appendChild(newRow);
                let linePrice = document.getElementById(`linePrice-${i}`);
                prixTotal += parseInt(linePrice.textContent);
        };
    infoPrixTotal.innerHTML = prixTotal + "€";
};
function checkStorageTables(panierArray, basket, resolve) {
    if(basket.length === panierArray.length) {
        resolve(basket)
    }
}

retrieveLocalStorage()
    .then(getProductsDetails()
    .then(createBasket)
    .then(createHTMLTable))

//bouton vider le panier
document.getElementById("vide-panier").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    basket = [];
    window.location.reload();
  });

function contactInfo() {
    //récupération des données du formulaire et création d'un objet de contact
    const prenomElt =  document.getElementById('prenom');
    const nomElt =  document.getElementById('nom');
    const adresseElt =  document.getElementById('adresse');
    const villeElt =  document.getElementById('ville');
    const emailElt =  document.getElementById('email');
    
    if (!/[a-z]/i.test(prenomElt.value)) {
        return
        } else {
            if (!/[a-z]/i.test(nomElt.value)) {
                return
            } else {
                if (!/[a-z]/i.test(adresseElt.value)) {
                    return
                } else {
                    if (!/[a-z]/i.test(villeElt.value)) {
                        return
                    } else {
                        if (!/[a-z]/i.test(emailElt.value)) {
                            return
                            } else {
                                contact = {
                                    firstName: prenomElt.value,
                                    lastName: nomElt.value,
                                    address: adresseElt.value,
                                    city: villeElt.value,
                                    email: emailElt.value
                                }
                            }
                        }
                    }           
                }
            } 
}
function createBasketArray() {

    products =[];
    basket.forEach((product) => {
        products.push(product.id)
    })
}
function checkoutRequest() {
    let request = new XMLHttpRequest;
    request.open("POST", "http://localhost:3000/api/cameras/order")
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(sendObj));
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 201) {
            let response = JSON.parse(request.responseText);
            console.log(response);
        }
    }
    
}

document.getElementById("confirm").addEventListener("click", (e) => {
    e.preventDefault();
    contactInfo();
    createBasketArray();
    sendObj = {contact, products};
    checkoutRequest();
});

function deleteLine(line) {
    localStorage.removeItem(basket[line].id);
    basket.splice(line, 1);
    createHTMLTable();
    console.log(localStorage)
    
}

