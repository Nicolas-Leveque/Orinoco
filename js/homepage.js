//récupération des infos sur les produits et affichage dynamique des éléments
function retrieveProductList() {
    const request = new XMLHttpRequest;
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const productList = JSON.parse(this.responseText);
            //création des éléments dynamique
            productList.forEach(product => {
                const newContainer = document.createElement("div");
                newContainer.classList.add('col-lg-3', 'col-md-4', 'mb-4');

                const newLink = document.createElement("a");
                newLink.setAttribute('href', `product.html?id=${product._id}`);
                newLink.classList.add("product", "card");

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
    }
};

window.onload = retrieveProductList;
