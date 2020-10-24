let Cart = {
    items : [],
    init() {
        //extrait les infos des produits dans le panier et les stock dans un array d'objet
        return new Promise((resolve, reject) => {
            
                Cart.items = [];
                for (let i = 0; i <= localStorage.length - 1 ; i++) {
                    if (localStorage.key(i).startsWith("5be")) {
                        Cart.items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    }
                };
            
            resolve(Cart.items);
        });   
    }
};
