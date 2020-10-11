function majIconePanier() {
    const iconePanier = document.getElementById('red-dot');
    const nbreArticle = document.getElementById('nbre-item');
    nbreArticle.innerHTML = '';
    let tmpArticle = [];
    for ( i = 0; i <= Cart.items.length - 1; i++){
        tmpArticle.push(Cart.items[i].quantity)
    }
    if(Cart.items.length != 0) {
        iconePanier.style.visibility='visible';
        nbreArticle.innerHTML = tmpArticle.reduce((a,b) => a + b, 0);
    }
}

Cart.afterInit = majIconePanier;
Cart.init();
