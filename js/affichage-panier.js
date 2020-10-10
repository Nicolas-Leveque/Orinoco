function majIconePanier() {
    const iconePanier = document.getElementById('red-dot');
    const nbreArticle = document.getElementById('nbre-item');
    if(Cart.items.length != 0) {
        iconePanier.removeAttribute('visibility');
        nbreArticle.innerHTML = Cart.items.length;
    }
}

Cart.afterInit = majIconePanier;
Cart.init();
