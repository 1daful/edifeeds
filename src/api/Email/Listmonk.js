import config from "../../../public/config.json";
import { Resource } from '../Resource';
import { Axiosi } from "../Axiosi";
export class ListMonk {
    client = new Axiosi();
    resources = [];
    subscriber = new Resource(this, "contacts", {
        name: "subscriber",
        baseUrl: "/subscribers",
        params: {}
    }, "subscriber");
    getBaseUrl() {
        const apiBaseUrl = config.api.ListMonk.baseUrl;
        return apiBaseUrl;
    }
    getBaseParams() {
        const apiBaseParams = config.api.ListMonk.config;
        return apiBaseParams;
    }
    getData(res) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=Listmonk.js.map