import { IRepository } from "./IRepository";
import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";

export class Repository implements IRepository {
    collName: string;
    constructor(collName: string) {
      this.collName = collName
       this.db = new Pouchdb(collName)
      //this.db = new SupabaseRepo()
    }
  find(filters?: Record<string, any>, collName?: string, params?: string[]): Promise<any> {
    return this.db.find(filters, collName, params)
  }
    db:IRepository

    changeDB(db: database, collName: string) {
      switch (db) {
        case 'pouchdb':
          return new Pouchdb(collName)
          break;

        case 'supabase':
          return new SupabaseRepo()

        default:
          break;
      }
      return new SupabaseRepo()
    }

    addItem(param: Record<string, any>) {
      this.db.addItem(param)
    }
    addItems(param: Record<string, any>[]): void {
        this.db.addItems(param, this.collName)
    }
    async readItem(id?: string): Promise<Record<string, any>> {
        return await this.db.readItem(id);
    }
    async readItems(collName?: string, params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]> {
        return await this.db.readItems(collName, params, op)
    }
    updateItem(docId: any, param: Record<string, any>): void {
        this.db.updateItem(docId, param, this.collName)
    }
    deleteItem(docId: any): void {
        this.db.deleteItem(docId, this.collName)
    }

}

type database = 'pouchdb' | 'supabase'
