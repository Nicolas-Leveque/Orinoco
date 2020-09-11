const infoPanier = document.getElementById('info-panier');
let panierArray = [];
function panier() { 
    console.log(localStorage)
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.hasOwnProperty(`panier${i}`)) {       
        let tmp = JSON.parse(localStorage.getItem(`panier${i}`))
        panierArray.push(tmp)}
    } 
    console.log(panierArray)
    panierArray.forEach(product => {
        console.log(product.name);
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<th>${product.name}</th><th>${product.lense}</th><th>${product.quantity}</th><th>${(product.price)/100}</th>`;
        infoPanier.appendChild(newRow);
    })
};
window.onload = panier;
document.getElementById('vide-panier').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    console.log(localStorage);
    window.location.reload();
});
