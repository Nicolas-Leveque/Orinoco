function majIconePanier() {
    const iconePanier = document.getElementById('red-dot');
    const nbreArticle = document.getElementById('nbre-item');
    nbreArticle.innerHTML = '';
    let tmpArticle = [];
    
    for ( i = 0; i <= Cart.items.length - 1; i++){
        tmpArticle.push(Cart.items[i].quantity);
    }
    if(Cart.items.length != 0) {
        iconePanier.style.visibility='visible';
        nbreArticle.innerHTML = tmpArticle.reduce((a,b) => a + b, 0);
    }
}
//Si le nombre de produit dans Cart.items est diiférent du localStorage mets à jour Cart.items et l'icone du header
Cart.init()
    .then(majIconePanier);