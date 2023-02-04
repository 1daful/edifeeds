import { Repository } from "./Repository";
export class Metadata {
    repository = new Repository("metadata");
    async saveGenres(items) {
        let mediaItems = [];
        for (const item of items) {
            if (item.genre) {
                await this.repository.addItems('metadata', [{ id: item.genre }]);
            }
            if (item.tags.length > 0) {
                for (const tag of item.tags)
                    mediaItems.push({ id: tag });
            }
        }
        await this.repository.addItems('metadata', mediaItems);
    }
    async loadGenres() {
        return await this.repository.readItems();
    }
}
//# sourceMappingURL=metadata.js.map