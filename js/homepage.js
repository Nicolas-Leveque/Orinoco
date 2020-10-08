//récupération des infos sur les produits et affichage dynamique des éléments
let productList;
function retrieveProductList() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest;
        request.open("GET", "http://localhost:3000/api/cameras");
        request.send();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                productList = JSON.parse(this.responseText);
                resolve(productList);        
            }
        }
    })
};
function displayProduct() {
    //création des éléments dynamique
    productList.forEach(product => {
        const newContainer = document.createElement("div");
        newContainer.classList.add('card');

        const newLink = document.createElement("a");
        newLink.setAttribute('href', `produit.html?id=${product._id}`);
        newLink.classList.add("product");

        const newImg = document.createElement("img");
        newImg.setAttribute('src', product.imageUrl);
        newImg.classList.add('card');

        const newLabel = document.createElement("p");
         newLabel.setAttribute('class', 'product-name');
        newLabel.innerHTML = `<div>${product.name}</div><div>${product.price/100} €</div>` ;
                       
        newLink.appendChild(newImg);
        newLink.appendChild(newLabel);
        newContainer.appendChild(newLink);

        const listeProduits = document.getElementById('main-list');
        listeProduits.appendChild(newContainer);               
    });
}
retrieveProductList()
    .then(displayProduct);
