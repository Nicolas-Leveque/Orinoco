let order;

function getOrderDetails() {
    return new Promise((resolve, reject) => {
        if (localStorage.key("order")) {
            order = (JSON.parse(localStorage.getItem("order")))
            console.log('order', order);
            resolve(order);
        }
    }) 
};
function displayPage() {
    let nameElt = document.getElementById('client-name')
    nameElt.innerHTML = order.contact.firstName;

    let orderElt = document.getElementById('order')
    orderElt.innerHTML = order.orderId;

    let priceElt = document.getElementById('prix-total')
    priceElt.innerHTML = order.prix;
}
getOrderDetails()
    .then(displayPage);
localStorage.clear();
