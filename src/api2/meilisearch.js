import { MeiliSearch } from 'meilisearch';
//import movies from '../small_movies.json'
export class Meilisearch {
    client;
    constructor(collName, items, host) {
        this.client = new MeiliSearch({ host });
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log(res));
    }
    test(collName) {
        this.client.index(collName).getTask(0);
    }
    async search(collName, query) {
        return await this.client.index(collName).search(query);
    }
}
//# sourceMappingURL=meilisearch.js.map