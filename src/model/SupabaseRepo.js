import config from "../../public/config.json";
import { createClient } from "@supabase/supabase-js";
export class SupabaseRepo {
    options = {
        schema: 'public',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    };
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);
    addItem(_item) {
        throw new Error("Method not implemented.");
    }
    async addItems(items, collName) {
        try {
            await this.supabase
                .from(collName)
                .insert(items);
        }
        catch (error) {
            error;
        }
    }
    readItem(_collName) {
        throw new Error("Method not implemented.");
    }
    async readItems(collName, _params, _op) {
        const { data, error } = await this.supabase
            .from(collName)
            .select();
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
    find(_params, _op, _sort, _limit) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=SupabaseRepo.js.map