const infoPanier = document.getElementById("info-panier");
let panierArray = [];
let infoProduit;
function panier() {
    //extrait les infos des peoduits dans le panier et les stock dans un array d'objet
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.hasOwnProperty(`panier${i}`)) {
        const tmp = JSON.parse(localStorage.getItem(`panier${i}`));
        panierArray.push(tmp);
        }
    }
    //pour chaque élément de l'array envoie une requête vers le serveur pour récupérer les données manquante et rempli le tableau html
    panierArray.forEach((product) => {
        return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", `http://localhost:3000/api/cameras/${product.id}`);
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response.name);
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>${response.name}</th><th>${product.lense}</th><th>${product.quantity}</th><th>${(response.price / 100) * product.quantity}</th>`;
            infoPanier.appendChild(newRow);
            }
        };
        })
    });
}
window.onload = panier;
document.getElementById("vide-panier").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  panierArray = [];
  window.location.reload();
});
