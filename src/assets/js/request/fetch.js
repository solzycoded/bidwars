class FetchRequest {
    constructor(method, url, data = {}){
        this.baseUrl = "http://localhost:3000/";

        this.method  = method;
        this.url     = this.baseUrl + url;
        this.data    = data;

        this.options = this.makeOptions();
    }

    makeOptions(){
        const options = {
            method: this.method,
            url: this.url,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if(this.method!="GET"){
            options.body = JSON.stringify(this.data);
        }

        return options;
    }

    async send(successFn = () => {}, failureFn = () => {}) {
        try{
            await fetch(this.url, this.options)
                .then(response => response.json())
                .then(response => {
                    if(response.success){
                        successFn(response.data);
                    }
                    else{
                        failureFn(response.data);
                    }
                })
                .catch(err => {
                    const error = err.error!=undefined ? err.error : "";
                    failureFn({message: "Something went wrong!", error});
                });
        } catch(err) {
            const error = err.error!=undefined ? err.error : "";
            failureFn({message: "Something went wrong!", error});
        }
    }
}