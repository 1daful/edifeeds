import { Ghost } from './posts/Ghost';
import { Search } from './Search/Search';
import { NetworkLocal } from './network';
import { Media } from "../media/Media";
import { Gorse } from "../gorsejs/src";
import config from "../../public/config.json";
export class Recommender {
    client = new Gorse({
        endpoint: config.api.Gorse.id,
        secret: config.api.Gorse.key,
    });
    async readMedia(section, type, category, id, op) {
        let mediaList = await this.load(type, undefined, op);
        NetworkLocal.test('mediaListRecomm: ', mediaList, "Recomm");
        return mediaList;
    }
    async indexItems(mediaList, type) {
        const search = new Search();
        console.log("mediaList: ", mediaList);
        let mediaIt = mediaList;
        if (mediaIt)
            await search.index(type, mediaIt);
        NetworkLocal.test('Search indexed: ', mediaIt, "Search indexed");
    }
    async load(type, params, op) {
        let items;
        let media;
        switch (String(type)) {
            case 'quotes':
                media = new Media("quotes");
                items = await media.readItems("quotes", params, op);
                NetworkLocal.test("mediaItems: ", items, "media");
                return items;
            case 'books':
                media = new Media("books");
                items = await media.readItems("books", params, op);
                NetworkLocal.test("mediaItems: ", items, "media");
                return items;
            case 'posts':
                const blog = new Ghost();
                items = await blog.getPosts();
                NetworkLocal.test("mediaItems: ", items, "posts");
                return items;
            case 'music':
                media = new Media(type);
                items = await media.readItems(type, params, op);
                NetworkLocal.test("mediaItems: ", items, "posts");
                return items;
            case 'video':
                media = new Media(type);
                items = await media.readItems(type, params, op);
                NetworkLocal.test("mediaItems: ", items, "posts");
                return items;
            default:
                break;
        }
        return items;
    }
    async getMedia(type, params = { keyword: "gospel" }) {
        const media = new Media("collections");
        await media.fetch(type, params);
    }
    async getRecommended(userId, category) {
        const params = {
            userId,
            category
        };
        return await this.client.getRecommend(params);
    }
    async getPopular(category) {
        const params = {
            category
        };
        return await this.client.getPopular(params);
    }
    async getLatest(category) {
        const params = {
            category
        };
        return await this.client.getLatest(params);
    }
    async getRelated(itemId, category) {
        const params = {
            itemId,
            category
        };
        return await this.client.getItemNeighbors(params);
    }
    async insertFeedback(userId, feedbackType, itemId, timestamp) {
        const feedback = {
            UserId: userId,
            FeedbackType: feedbackType,
            ItemId: itemId,
            Timestamp: timestamp
        };
        const feedbacks = [feedback];
        await this.client.insertFeedbacks(feedbacks);
    }
    async insertUser(id) {
        const user = {
            UserId: id,
        };
        await this.client.insertUser(user);
    }
    async insertItem(itemId, category) {
        await this.client.insertItemCategory(itemId, category);
    }
}
//# sourceMappingURL=Recommender.js.map