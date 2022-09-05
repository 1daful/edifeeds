import { IRepository } from "./IRepository";
//import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";

export class Repository implements IRepository {
    collName: string;
    constructor(collName: string) {
      this.collName = collName
       
      this.db = new SupabaseRepo()
    }
    db:IRepository

    changeDB(db: database) {
      switch (db) {
        case 'pouchdb':
          this.db = new SupabaseRepo()
          break;

        case 'supabase':
          this.db = new SupabaseRepo()

        default:
          break;
      }
      this.db = new SupabaseRepo()
    }

    addItem(): Promise<Record<string, any>> {
        throw new Error("Method not implemented.");
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
    find(): void {
        throw new Error("Method not implemented.");
    }

}

type database = 'pouchdb' | 'supabase'
