import { IRepository } from "../model/IRepository";
import config from "../../public/config.json";
import { createClient } from "@supabase/supabase-js";

export class SupabaseRepo implements IRepository {
    options = {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }

    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);

    addItem(_item: Record<string, any>): Promise<Record<string, any>> {
        throw new Error("Method not implemented.");
    }

    async addItems(items: Record<string, any>[], collName: string): Promise<void> {
        try {
            await this.supabase
              .from(collName)
              .insert(items)
        }
        catch (error) {
            error
        }
    }

    readItem(_collName: string): Promise<Record<string, any>> {
        throw new Error("Method not implemented.");
    }

    async readItems(collName: string, _params?: string[], _op?: Record<string, any>): Promise<Record<string, any>[]> {
        const { data, error } = await this.supabase

        .from(collName)

        .select()

        return data as unknown as Promise<Record<string, any>[]>
        }

    async updateItem(newItem: any, oldItem: Record<string, any>, collName: string): Promise<void> {
        const { data, error } = await this.supabase
          .from(collName)
          .update(newItem)
          .match(oldItem)
    }

    async deleteItem(collName: string, item: any): Promise<void> {
        const { data, error } = await this.supabase
          .from(collName)
          .delete()
          .match(item)
    }
    async find(op: Record<string, any>, collName: string,_sort?: string, _limit?: number) {
        Object.keys(op).forEach(async key => {
            let i = 0
            const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(key, `'${op[key]}'`)
            return { data, error };
        });
        
    }
}

