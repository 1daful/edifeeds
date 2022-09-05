import axios from 'axios';
//import { NetworkLocal } from "./network";
export class Axiosi {
    constructor(resource) {
        if (resource) {
            this.resource = resource;
        }
    }
    message = 'Axios request successful!!!';
    resource;
    config = {};
    async get() {
        if (this.resource) {
            //try {
            /*if (params) {
                this.resource.setRequestParam(params);
            }*/
            //const baseUrl = await this.resource.getBaseURL()
            const baseUrl = this.resource.URL;
            //console.log('Axios baseUrl:', baseUrl)
            this.config.params = (await this.resource.getBaseParam()).baseParams;
            this.config.headers = (await this.resource.getBaseParam()).header;
            console.log("Calling with Axios config: ", this.config);
            if (baseUrl) {
                const response = await axios.get(baseUrl, this.config)
                    .catch((error) => {
                    if (error.request) {
                        //const data = NetworkLocal.test(this.message)
                        if (response) {
                            return this.resource.getResponse(response.data);
                        }
                    }
                });
                //console.log("response: ", response)
                const res = this.resource.getResponse(response.data);
                console.log("axios res: ", res);
                return res;
            }
            //return this.resource.response.dataList;
            //}
            /*catch (error) {
                console.error(error)
            }*/
        }
        else {
            console.error('resource value not set');
        }
        const nothing = [];
        return nothing;
    }
    async post(data) {
        if (this.resource) {
            //this.resource.setRequestParam(params);
            //this.resource.setRequestParam(data);
            try {
                const baseUrl = await this.resource.getBaseURL();
                this.config.params = this.resource.getBaseParam();
                if (baseUrl) {
                    const response = await axios.post(baseUrl, data, this.config);
                    //NetworkLocal.test(this.message);
                    return this.resource.getResponse(response.data);
                }
                //return this.resource.response.dataList;
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            console.error('resource value not set');
        }
        const nothing = [];
        return nothing;
    }
}
//# sourceMappingURL=Axiosi.js.map