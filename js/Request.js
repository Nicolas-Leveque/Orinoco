const { get } = require("request");

let Request = {
    responseReq : {},
    get() {
        //Requête GET
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", `http://localhost:3000/api/cameras/${idProduct}`);
            request.send();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                    responseReq = JSON.parse(this.responseText)
                };
            };
        });
    }
    
}