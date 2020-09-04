function productCard() {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const idProduct = urlParam.get('id');
    let productObj;
    let request = new XMLHttpRequest;
    request.open("GET", `http://localhost:3000/api/cameras?/:_id=${idProduct}`);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let productList = JSON.parse(this.responseText);
            productList.forEach(product => {
                if (product._id == idProduct) {
                    productObj = product;
                };
            });
            let newCard = document.createElement('div');
            let newImg = document.createElement('img');
            let newCardBody = document.createElement('div');
            newCardBody.innerHTML = "<h3 class='card-title'></h3><h4></h4><p></p>";
            newCard.appendChild(newImg);
            newCard.appendChild(newCardBody);
            document.getElementById('product-card').appendChild(newCard);
            newCard.classList.add('card', 'mt-4');
            newImg.classList.add('card-img-top','img-fluid');
            newImg.setAttribute('src', productObj.imageUrl);
            const newCBText = newCardBody.children;
            newCBText[0].textContent = productObj.name;
            newCBText[1].textContent = productObj.price / 100 +" €";
            newCBText[2].textContent = productObj.description;
        }
    }
}
window.onload = productCard;