
let panierArray = [];
let priceArray = [];
let lignePanier = 0;
function panier() {
    //extrait les infos des produits dans le panier et les stock dans un array d'objet
    for (let i = 0; i <= localStorage.length - 1 ; i++) {
        if (localStorage.key(i).startsWith("5be")) {
            panierArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }else {return}
    }
    //pour chaque élément de l'array envoie une requête vers le serveur pour récupérer les données manquante et rempli le tableau html
    panierArray.forEach((product) => {        
        let request = new XMLHttpRequest();
        request.open("GET", `http://localhost:3000/api/cameras/${product.id}`);
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {                
                let response = JSON.parse(this.responseText);
                const infoPanier = document.getElementById("info-panier");
                const newRow = document.createElement("tr");
                newRow.setAttribute('data-row-id', lignePanier);
                lignePanier++;
                newRow.innerHTML = `<th>${response.name}</th><th>${product.lense}</th><th>${response.price/100}</th><th>${product.quantity}</th><th class="linePrice">${(response.price / 100) * product.quantity}</th><th><button class="btn btn-ouline-primary btn-sm delete-line">x</button></th>`;
                infoPanier.appendChild(newRow);              
            }
        };
    });
};

//bouton vider le panier
document.getElementById("vide-panier").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  panierArray = [];
  window.location.reload();
});

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

window.onload = panier;

//Affichage du prix total
window.addEventListener('load', (e) => {
    const test = document.querySelectorAll('th.linePrice')
    const closeButtons = document.querySelectorAll('.delete-line')
    console.log(test)
    console.log(closeButtons)
})