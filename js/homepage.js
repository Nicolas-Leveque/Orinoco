function displayProduct() {
    //création des éléments dynamique
    Request.response.forEach(product => {
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
        newLabel.innerHTML = `<div>${product.name}</div><div>${product.price/100} €</div>`;

        newLink.appendChild(newImg);
        newLink.appendChild(newLabel);
        newContainer.appendChild(newLink);

        const listeProduits = document.getElementById('main-list');
        listeProduits.appendChild(newContainer);               
    });
};
//Envoie une requête à l'API et affiche les produits
Request.afterRequest = displayProduct;
Request.get("http://localhost:3000/api/cameras");


