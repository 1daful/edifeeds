import config from "../../public/config.json";
import { createClient } from "@supabase/supabase-js";
export class SupabaseRepo {
    async search(field, query, collName) {
        let i = 0;
        const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(field, `'${query}'`);
        return { data, error };
    }
    options = {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    };
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);
    async addItem(collName, items) {
        return await this.supabase
            .from(collName)
            .insert(items);
    }
    async addItems(collName, items) {
        return await this.supabase
            .from(collName)
            .insert(items);
    }
    async readItem(collName, field, value) {
        const { data, error } = await this.supabase
            //.from(collName)
            //.select(*).eq(field, value)
            .from(collName)
            .select().eq('id', value);
        return data;
    }
    async readItems(collName, params, param, val, limit = 10) {
        if (params !== undefined && val) {
            const { data, error } = await this.supabase
                .from(collName)
                .select(`${params.key}, ${params.fColl}(${params.fKey1})`)
                //.eq(`${params.fColl}.${params.fKey2}`, val)
                .eq(params.fKey2, val)
                .limit(limit);
            return data;
        }
        if (param && val) {
            const { data, error } = await this.supabase
                .from(collName)
                .select(`${param.key}`)
                //.eq(`${params.fColl}.${params.fKey2}`, val)
                .eq(param.fKey, val)
                .limit(limit);
            return data;
        }
        const { data, error } = await this.supabase
            .from(collName)
            .select()
            .limit(limit);
        return data;
    }
    async updateItem(newItem, oldItem, collName) {
        const { data, error } = await this.supabase
            .from(collName)
            .update(newItem)
            .match(oldItem);
    }
    async deleteItem(collName, item) {
        const { data, error } = await this.supabase
            .from(collName)
            .delete()
            .match(item);
    }
    async find(op, collName, _sort, _limit) {
        Object.keys(op).forEach(async (key) => {
            let i = 0;
            const { data, error } = await this.supabase
                .from(collName)
                .select()
                .textSearch(key, `'${op[key]}'`);
            return { data, error };
        });
    }
}
//# sourceMappingURL=SupabaseRepo.js.map