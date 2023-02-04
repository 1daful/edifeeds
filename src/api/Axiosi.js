import axios from 'axios';
import { NetworkLocal } from "./network";
export class Axiosi {
    message = 'Axios request successful!!!';
    config = {};
    async get(resource, auth) {
        const baseUrl = resource.URL;
        this.config.headers = (await resource.getBaseParam()).header;
        this.config.params = (await resource.getBaseParam()).baseParams;
        this.config.auth = auth;
        if (baseUrl) {
            const response = await axios.get(baseUrl, this.config);
            const res = resource.getResponse(response.data);
            return res;
        }
        const nothing = [];
        return nothing;
    }
    async post(resource, auth) {
        try {
            const baseUrl = await resource.URL;
            this.config.params = (await resource.getBaseParam()).baseParams;
            this.config.auth = auth;
            if (baseUrl) {
                const response = await axios.post(baseUrl, resource.request.data, this.config);
                NetworkLocal.test(this.message);
                return resource.getResponse(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
        const nothing = [];
        return nothing;
    }
    async load(addr, query) {
        try {
            const resp = await axios.get(addr, query);
            return resp;
        }
        catch (err) {
            console.error(err);
        }
    }
    async postTo(addr, data, query) {
        try {
            const resp = await axios.post(addr, data, query);
            return resp;
        }
        catch (err) {
            console.error(err);
        }
    }
}
//# sourceMappingURL=Axiosi.js.map