let panierArray = [];
let basket = [];

function basketStorage() {
    //extrait les infos des produits dans le panier et les stock dans un array d'objet
        for (let i = 0; i <= localStorage.length - 1 ; i++) {
            if (localStorage.key(i).startsWith("5be")) {
                panierArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }else {
                return
            };
        };
        //pour chaque élément de l'array envoie une requête vers le serveur pour récupérer les données manquante et créer un array d'objet
        panierArray.forEach((product) => {        
            let request = new XMLHttpRequest();
            request.open("GET", `http://localhost:3000/api/cameras/${product.id}`);
            request.send();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status)
                    {                
                        let response = JSON.parse(this.responseText);
                        let tmpObj = {id: response._id, name: response.name, lense: product.lense, quantity: product.quantity, price: response.price/100};
                        basket.push(tmpObj);
                    };
            };        
        }); 
    console.table(basket)  
};
/*
function createBasket (){    
    console.table(basket);
    const infoPanier = document.getElementById("info-panier");
    infoPanier.innerHTML = '';
    basket.forEach((product) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = 
            `<th>${product.name}</th>
            <th>${product.lense}</th>
            <th>${product.price}</th>
            <th>${product.quantity}</th>
            <th class="linePrice">${product.price * product.quantity}</th>
            <th><button class="btn btn-danger btn-sm delete-line">x</button></th>`;
            infoPanier.appendChild(newRow);
    });
    
};*/
basketStorage();
    
setTimeout(function() {
       
        console.table(basket);
        const infoPanier = document.getElementById("info-panier");
        infoPanier.innerHTML = '';
        basket.forEach((product) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = 
                `<th>${product.name}</th>
                <th>${product.lense}</th>
                <th>${product.price}</th>
                <th>${product.quantity}</th>
                <th class="linePrice">${product.price * product.quantity}</th>
                <th><button class="btn btn-danger btn-sm delete-line">x</button></th>`;
                infoPanier.appendChild(newRow);
        });
        
    
}, 200);

//bouton vider le panier
document.getElementById("vide-panier").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    basket = [];
    window.location.reload();
  });



/*
//récupération des données du formulaire
const prenomElt =  document.getElementById('prenom')
const nomElt =  document.getElementById('nom')
const adresseElt =  document.getElementById('adresse')
const villeElt =  document.getElementById('ville')
const emailElt =  document.getElementById('email')

//bouton finaliser la commande
function validationUserElt() {

}
document.getElementById("confirm").addEventListener("click", function(e){
    e.preventDefault();
    console.log(prenomElt.value)
})

//Affichage du prix total
window.addEventListener('load', (e) => {
    const test = document.getElementsByClassName('linePrice')
    const closeButtons = document.querySelectorAll('.delete-line')
    console.log(test)
    console.log(closeButtons)
})



//document.querySelectorAll('[data-foo]');

var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
  
    if (everything turned out fine ) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  });
  */