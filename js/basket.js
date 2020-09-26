let panierArray = [];
let basket = [];

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
        if (panierArray != []) {
            console.log(panierArray, "fct1")
            resolve(panierArray);
        }
        else {
            reject(Error("pas bon"));
        }
    });
};
function createBasket(id) {
    console.log('FCT 1.5')
    //pour chaque élément de l'array envoie une requête vers le serveur pour récupérer les données manquante et créer un array d'objet
    return new Promise((resolve, reject) => {

        id.forEach((product) => {        
            let request = new XMLHttpRequest();
            request.open("GET", `http://localhost:3000/api/cameras/${product.id}`);
            request.send();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status)
                    {                
                        let response = JSON.parse(this.responseText);
                        let tmpObj = {id: response._id, name: response.name, lense: product.lense, quantity: product.quantity, price: response.price/100};
                        basket.push(tmpObj);
                        console.log("fct2");
                        console.table(basket);
                        checkStorageTables(panierArray, basket, resolve);
                    };                
            };        
        })
        
        if (basket != []) {
            console.log("fct2.5");
            //resolve(basket)
        } 
        else {
            reject(Error("raté"));
        }
    });
};

function createHTMLTable (){
    console.log("fct3")    
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
};
function checkStorageTables(panierBrut, panierFinal, resolve) {
    console.log('debut')
    if(panierFinal.length === panierBrut.length) {
        console.log('resolue')
        resolve(panierFinal)
    }
}

retrieveLocalStorage()
    .then(createBasket(panierArray)
    .then(createHTMLTable))

//bouton vider le panier
document.getElementById("vide-panier").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    basket = [];
    window.location.reload();
  });

//récupération des données du formulaire
const prenomElt =  document.getElementById('prenom');
const nomElt =  document.getElementById('nom');
const adresseElt =  document.getElementById('adresse');
const villeElt =  document.getElementById('ville');
const emailElt =  document.getElementById('email');


