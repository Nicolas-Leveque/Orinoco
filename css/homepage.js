function retrieveProductList(e) {
    e.preventDefault();
    let request = new XMLHttpRequest;
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let productList = JSON.parse(this.responseText);
            console.table(productList);
            let product = document.createElement('div');
            
            productList.forEach(product => {
                
                let newLink = document.createElement("a");
                let newImg = document.createElement("img");
                let newLabel = document.createElement("p");
                newImg.setAttribute('src', product.imageUrl);
                newLink.setAttribute('href', `product.html?${product._id}`);
                newLabel.setAttribute('class', 'product-name');
                newLabel.innerHTML = `<div>${product.name}</div><div>${product.price/100} €</div>` ;
                newLink.appendChild(newImg);
                newLink.appendChild(newLabel);
                newLink.classList.add("product");
                
                listeProduits.appendChild(newLink);


                
            });
        }
    }
};
const listeProduits = document.getElementById('main-list');
//document.getElementById('request').addEventListener('click', retrieveProductList);
window.onload = retrieveProductList;
