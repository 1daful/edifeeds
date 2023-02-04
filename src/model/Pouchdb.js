import { NetworkLocal } from '../api/network.js';
import PouchDB from 'pouchdb';
export class Pouchdb {
    constructor(collName) {
        this.db = new PouchDB(collName);
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    db;
    async addItem(item) {
        let response;
        if (item) {
            item._id = new Date().toJSON();
            try {
                response = await this.db.put(item);
                console.log("checking response from Repository: ", response);
                return response;
            }
            catch (err) {
                console.log("From db", item);
                console.log(err);
            }
        }
        return response;
    }
    async addItems(items, collName) {
        let newItems = [];
        try {
            for (const item of items) {
                item._id = new Date().toJSON();
                newItems.push(item);
            }
            await this.db.bulkDocs(newItems);
            NetworkLocal.test("Adding items to repository");
        }
        catch (err) {
            console.log(err);
        }
    }
    async readItems(collName, params, op) {
        let items;
        if (op) {
            try {
                op.include_docs = true;
                items = await this.db.allDocs(op);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                items = await this.db.allDocs({ include_docs: true });
            }
            catch (err) {
                console.log(err);
            }
        }
        return items;
    }
    async readItem(collName) {
        let item;
        try {
            item = await this.db.get(collName).then();
        }
        catch (err) {
            console.log(err);
        }
        return item;
    }
    async updateItem(docId, param) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.put(doc, param);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async deleteItem(docId) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.remove(doc);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async createIndex(fields) {
    }
    async find(filters, sort, limit) {
        try {
            let selector = {};
            Object.keys(filters).forEach(filter => {
                let op = filters[filter];
                let select = {};
                Object.keys(op).forEach(element => {
                    let el = "$" + element;
                    const sel = {
                        [el]: op[element]
                    };
                    Object.assign(select, sel);
                });
                Object.assign(selector, { [filter]: select });
            });
            return this.db.find({
                selector: selector,
                sort: [sort],
                limit: limit
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
//# sourceMappingURL=Pouchdb.js.map