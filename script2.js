function productCard() {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const idProduct = urlParam.get('id');
    let productObj;
    let request = new XMLHttpRequest;
    request.open("GET", `http://localhost:3000/api/cameras/${idProduct}`);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            productObj = JSON.parse(this.responseText);
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
            const menuLenses = document.getElementById('lenses');
            productObj.lenses.forEach((lense) => {
                const newOption = document.createElement('option');
                newOption.textContent = lense;
                menuLenses.appendChild(newOption);
            })
        }
    }
}
function panier() {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const idProduct = urlParam.get('id');
    let productObj;
    let request = new XMLHttpRequest;
    request.open("GET", `http://localhost:3000/api/cameras/${idProduct}`);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            productObj = JSON.parse(this.responseText);
            if (localStorage.getItem(productObj._id)) {
                localStorage[productObj._id]++
            } else {
                localStorage.setItem(productObj._id, 1);
            }
            
            //localStorage.setItem(this.responseText, 1);
            console.log(localStorage);
        }
    }
}
window.onload = productCard;
const btnPanier = document.getElementById("ajout-panier");
btnPanier.addEventListener('click', panier);
