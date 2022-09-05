import { Repository } from "./Repository";
//import { SupabaseRepo } from "./SupabaseRepo";
//import { FIRepository } from "./FIRepository";
export class Metadata {
    /*constructor() {
        this.repository = new FIRepository(db);
    }*/
    repository = new Repository("metadata");
    //message!: string;
    saveGenres(items) {
        for (const item of items) {
            if (item.genre) {
                this.repository.addItems([{ id: item.genre }]);
            }
        }
    }
    loadGenres() {
        return this.repository.readItems();
    }
}
//# sourceMappingURL=metadata.js.map