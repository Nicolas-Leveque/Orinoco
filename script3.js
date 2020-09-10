function panier() { 
    //console.log(localStorage)
    
    for (product in localStorage) {
        if( localStorage.hasOwnProperty(product)) {
            const infoPanier = document.getElementById('info-panier');
            const newRow = document.createElement('tr')
            const newProductName = document.createElement('th')
            const newProductQty = document.createElement('th')
            const newProductPrice = document.createElement('th')
            newProductName.setAttribute('id', 'nom-produit');
            newProductQty.setAttribute('id', 'quantité');
            newProductPrice.setAttribute('id', 'prix')
            newRow.appendChild(newProductName);
            newRow.appendChild(newProductQty);
            newRow.appendChild(newProductPrice);
            infoPanier.appendChild(newRow);
            let request = new XMLHttpRequest;
            request.open("GET", `http://localhost:3000/api/cameras/${product}`);
            request.send();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status ==200 ) {
                    let productObj = JSON.parse(this.responseText);
                    console.log(productObj);
                    newProductName.innerHTML = productObj.name;
                    newProductQty.innerHTML = "<select id='quantite'><option value=1 selected>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option></select>";
                    const qteFinale = document.getElementById('quantité');
                    newProductPrice.innerHTML = (productObj.price/100) * qteFinale.value ;
                    
                }
            }
        }
    }
}
window.onload = panier;