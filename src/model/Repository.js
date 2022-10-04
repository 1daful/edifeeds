import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";
export class Repository {
    collName;
    constructor(collName) {
        this.collName = collName;
        this.db = new Pouchdb(collName);
        //this.db = new SupabaseRepo()
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    find(filters, collName, params) {
        return this.db.find(filters, collName);
    }
    db;
    changeDB(db, collName) {
        switch (db) {
            case 'pouchdb':
                return new Pouchdb(collName);
                break;
            case 'supabase':
                return new SupabaseRepo();
            default:
                break;
        }
        return new SupabaseRepo();
    }
    addItem(param) {
        this.db.addItem(param);
    }
    addItems(param) {
        this.db.addItems(param, this.collName);
    }
    async readItem(id) {
        return await this.db.readItem(id);
    }
    async readItems(collName, params, op) {
        return await this.db.readItems(collName, params, op);
    }
    updateItem(docId, param) {
        this.db.updateItem(docId, param, this.collName);
    }
    deleteItem(docId) {
        this.db.deleteItem(docId, this.collName);
    }
}
//# sourceMappingURL=Repository.js.map