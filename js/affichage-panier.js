export function retrieveLocalStorage() {
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
function majIconePanier() {
    const iconePanier = document.getElementById('panier-number');
    console.log(panierArray.length);
    if(panierArray.length != 0) {
        iconePanier.setAttribute('visibility', 'visible');
        iconePanier.innerHTML = panierArray.length;
    }
}
let panierArray = [];
retrieveLocalStorage()
    .then(majIconePanier);