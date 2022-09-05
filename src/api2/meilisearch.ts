import { MeiliSearch } from 'meilisearch'
//import movies from '../small_movies.json'

export class Meilisearch {
  client
  constructor(collName: string, items: Record<string, any>[], host: string) {
    this.client = new MeiliSearch({ host })
    this.client.index(collName).addDocuments(items)
    .then((res) => console.log(res))
  }

  test(collName: string) {
    this.client.index(collName).getTask(0)
  }

  async search(collName: string, query: string) {
    return await this.client.index(collName).search(query)
  }

}
