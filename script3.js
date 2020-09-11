function panier() { 
    //console.log(localStorage)
    
    for (product in localStorage) {
        if( localStorage.hasOwnProperty(product)) {
            const infoPanier = document.getElementById('info-panier');
            const newRow = document.createElement('tr')
            const newProductName = document.createElement('th')
            const newProductPrice = document.createElement('th')
            newProductName.setAttribute('id', 'nom-produit');
            newProductPrice.setAttribute('id', 'prix')
            newRow.appendChild(newProductName);
            newRow.appendChild(newProductPrice);
            infoPanier.appendChild(newRow);
            let request = new XMLHttpRequest;
            request.open("GET", `http://localhost:3000/api/cameras/${product}`);
            request.send();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status ==200 ) {
                    let productObj = JSON.parse(this.responseText);
                    newProductName.innerHTML = productObj.name;
                    newProductPrice.innerHTML = (productObj.price/100);
                    
                }
            }
        }
    }
}
window.onload = panier;
