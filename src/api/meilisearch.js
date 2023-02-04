import { MeiliSearch } from 'meilisearch';
export class Meilisearch {
    client;
    constructor(host) {
        this.client = new MeiliSearch({ host: host });
    }
    test(collName) {
        this.client.index(collName).getTask(0);
    }
    async search(collName, query) {
        return await this.client.index(collName).search(query);
    }
    index(collName, items) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
}
//# sourceMappingURL=meilisearch.js.map