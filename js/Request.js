let Request = {
    response : [],
    get(url) {
        //Requête GET
        response = [];
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", url);
            request.send();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    Request.response = JSON.parse(this.responseText)
                    resolve(Request.response);
                    Request.afterRequest()
                };
            };
        });
    },
    orderDetails : {},
    post() {
        //Requête POST
        orderDetails = {};
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("POST", "http://localhost:3000/api/cameras/order")
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(sendObj));
            request.onreadystatechange = () => {
                if (request.readyState == 4 && request.status == 201) {
                    Resquest.orderDetails = JSON.parse(request.responseText);                
                    resolve(Request.orderDetails);
                    this.afterRequest();
                }
            }
        })
    },
    afterRequest : function(responseReq) {
    }
}