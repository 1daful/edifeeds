import { Algolia } from './Algolia';
export class Search {
    client = new Algolia;
    index(type, items) {
        this.client.index(type, items);
    }
    async search(type, keyword) {
        return await this.client.search(type, keyword);
    }
}
//# sourceMappingURL=Search.js.map