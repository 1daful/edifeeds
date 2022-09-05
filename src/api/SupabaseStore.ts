import { createClient } from '@supabase/supabase-js';
import config from '../../public/config.json';
export class SupabaseStore implements IEdiStorage {
  supabase = createClient(config.api.Supabase.url, config.api.Supabase.key)
  async create(path: string) {
    const { data, error } = await this.supabase.storage.createBucket(path)
    return { data, error }
  }

  async getUrl(collName: string, path: string) {
    return await this.supabase.storage.from(collName).getPublicUrl(path)
  }

  async upload(collName: string, path: string, file: any): Promise<any> {
  	const { data, error } = await this.supabase.storage
    .from(collName)
    .upload(path, file)
    return { data, error }
  }

  async download(collName: string, path: string) {
  	const { data, error } = await this.supabase.storage.from(collName).download(path)
    return { data, error }
  }
}
