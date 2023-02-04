import { IRepository } from "../model/IRepository";
import config from "../../public/config.json";
import { createClient } from "@supabase/supabase-js";

export class SupabaseRepo implements IRepository {
    async search(field: string, query: string, collName: string): Promise<any> {
        let i = 0
            const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(field, `'${query}'`)
            return { data, error };
    }
    options = {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }

    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);

    async addItem(collName: string, items: Record<string, any>[]): Promise<any> {
        return await this.supabase
              .from(collName)
              .insert(items)
    }

    async addItems(collName: string, items: Record<string, any>[]): Promise<any> {
        return await this.supabase
            .from(collName)
            .insert(items)
    }

    async readItem(collName: string, field: string, value: string): Promise<Record<string, any>> {
        const { data, error } = await this.supabase
        //.from(collName)
        //.select(*).eq(field, value)
        .from(collName)
        .select().eq('id', value)

        return data as unknown as Promise<Record<string, any>[]>
    }

    async readItems(collName: string, params?: Record<string, any>, param?: Record<string, any>, val?: any, limit = 10): Promise<Record<string, any>[]> {
        if(params !== undefined && val) {
            const { data, error } = await this.supabase
            .from(collName)
            .select(`${params.key}, ${params.fColl}(${params.fKey1})`)
            //.eq(`${params.fColl}.${params.fKey2}`, val)
            .eq(params.fKey2, val)
            .limit(limit)
            return data as unknown as Promise<Record<string, any>[]>
        }
        if(param && val) {
            const { data, error } = await this.supabase
            .from(collName)
            .select(`${param.key}`)
            //.eq(`${params.fColl}.${params.fKey2}`, val)
            .eq(param.fKey, val)
            .limit(limit)
            return data as unknown as Promise<Record<string, any>[]>
        }
        const { data, error } = await this.supabase
        .from(collName)
        .select()
        .limit(limit)

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