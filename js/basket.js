const infoPanier = document.getElementById('info-panier');
let panierArray = [];
let infoProduit;
function panier() {
    
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.hasOwnProperty(`panier${i}`)) {       
        const tmp = JSON.parse(localStorage.getItem(`panier${i}`))
        panierArray.push(tmp)}
    }
    panierArray.forEach(product => {
        let request = new XMLHttpRequest;
        request.open("GET", `http://localhost:3000/api/cameras/${product.id}`);
        request.send();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let infoProduit = JSON.parse(this.responseText)
                console.log(infoProduit)
            };
        }; 
                
        console.log(infoProduit)
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<th>${infoProduit.name}</th><th>${product.lense}</th><th>${product.quantity}</th><th>${infoProduit.price/100*product.quantity}</th>`;
        infoPanier.appendChild(newRow);
    })
};
window.onload = panier;
document.getElementById('vide-panier').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    panierArray = [];
    window.location.reload();
});
