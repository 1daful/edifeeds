import { Axiosi } from "./Axiosi";
export class MediaApi {
    api;
    constructor(api) {
        this.api = api;
    }
    getResource(type) {
        let resource;
        for (const iterator of this.api.resources) {
            if (iterator['type'] === type) {
                resource = iterator;
            }
        }
        return resource;
    }
    async getItems(type) {
        const resource = this.getResource(type);
        const client = new Axiosi();
        const items = await client.get(resource);
        return items;
    }
    async postItem(type) {
        const resource = this.getResource(type);
        const client = new Axiosi();
        const response = await client.post(resource);
        return response;
    }
}
//# sourceMappingURL=MediaApi.js.map