function retrieveProductList(e) {
    e.preventDefault();
    let request = new XMLHttpRequest;
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let productList = JSON.parse(this.responseText);
            console.log(productList)
            if (listeProduits.hasChildNodes()) {
                let child = document.getElementById('product-list');
                listeProduits.removeChild(child);
            }
            productList.forEach(product => {
                let newContainer = document.createElement("div");
                let newLink = document.createElement("a");
                let newImg = document.createElement("img");
                let newLabel = document.createElement("p");
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
const listeProduits = document.getElementById('main-list');
window.onload = retrieveProductList;
