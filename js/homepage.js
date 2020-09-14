const listeProduits = document.getElementById('main-list');

//récupération des infos sur les produits et affichage dynamique des éléments
function retrieveProductList() {
    const request = new XMLHttpRequest;
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const productList = JSON.parse(this.responseText);
            
            productList.forEach(product => {
                const newContainer = document.createElement("div");
                const newLink = document.createElement("a");
                const newImg = document.createElement("img");
                const newLabel = document.createElement("p");
                newContainer.classList.add('col-lg-3', 'col-md-4', 'mb-4');
                newImg.setAttribute('src', product.imageUrl);
                newImg.classList.add('card');
                newLink.setAttribute('href', `product.html?id=${product._id}`);
                newLabel.setAttribute('class', 'product-name');
                newLabel.innerHTML = `<div>${product.name}</div><div>${product.price/100} €</div>` ;
                newLink.appendChild(newImg);
                newLink.appendChild(newLabel);
                newLink.classList.add("product", "card");
                newContainer.appendChild(newLink)
                listeProduits.appendChild(newContainer);               
            });
        }
    }
};

window.onload = retrieveProductList;
