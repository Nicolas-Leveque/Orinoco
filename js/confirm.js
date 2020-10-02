let order;

function getOrderDetails() {
    return new Promise((resolve, reject) => {
        if (localStorage.key("order")) {
            order = (JSON.parse(localStorage.getItem("order")))
            resolve(order)
            console.log(order)
        }
    }) 
};

function displayPage() {
    let nameElt = document.getElementById('client-name')
    nameElt.innerHTML = order.name;

    let orderElt = document.getElementById('order')
    orderElt.innerHTML = order.order;

    let priceElt = document.getElementById('prix-total')
    priceElt.innerHTML = order.prix;
}
getOrderDetails()
    .then(displayPage);
localStorage.clear();
