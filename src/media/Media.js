import { Repository } from '../model/Repository';
import { QuoteMedia } from './QuoteMedia';
import { NetworkLocal } from './../api/network';
import { MediaApi } from "../api/MediaApi.js";
import { EdiStorage } from "src/api/storage.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
import { Axiosi } from "../api/Axiosi";
import { Unsplash } from "../api/pic/ImageGen";
import { BookMedia } from './BookMedia';
import { VideoMedia } from './VideoMedia';
import { MusicMedia } from './MusicMedia';
import { Metadata } from '../model/metadata';
export class Media {
    constructor(type) {
        this.repository = new Repository(type);
    }
    repository;
    metadata = new Metadata();
    store = new EdiStorage();
    imageGen = new Unsplash({ keyword: "christian and gospel", length: "10" });
    client = new Axiosi();
    async fetch(type, params) {
        let media;
        if (type) {
            switch (type) {
                case "quotes":
                    media = new QuoteMedia(params);
                    return await this.load(media, type);
                case "books":
                    media = new BookMedia(params);
                    return await this.load(media, type);
                case "videos":
                    media = new VideoMedia(params);
                    return await this.load(media, type);
                case "music":
                    media = new MusicMedia(params);
                    return await this.load(media, type);
                default:
                    break;
            }
        }
        else {
            await this.load(new QuoteMedia(params), "quotes");
            await this.load(new BookMedia(params), "books");
            await this.load(new MusicMedia(params), "music");
            await this.load(new VideoMedia(params), "videos");
        }
    }
    async load(media, type) {
        try {
            for (const api of media.apis) {
                let mediaApi = new MediaApi(api);
                const items = await mediaApi.getItems(type);
                if (items && type == "quotes") {
                    const images = await this.getImage();
                    if (Array.isArray(images)) {
                        for (let index = 0; index < 10; index++) {
                            const item = items[index];
                            item.thumbnailsmall = images[index]?.thumbnailSmall;
                            item.thumbnaillarge = images[index]?.thumbnailLarge;
                        }
                    }
                }
                if (items) {
                    await this.addItems(items, type);
                    await this.metadata.saveGenres(items);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async addItems(items, collName) {
        const result = {};
        try {
            if (collName) {
                const repository = new Repository(collName);
                await repository.addItems(collName, items);
                return result;
            }
        }
        catch (err) {
            console.log(err);
        }
        return result;
    }
    async readItems(collName, params, op, limit) {
        let results;
        if (collName) {
            const repository = new Repository(collName);
            results = await this.repository.readItems(collName, params, op, limit);
            NetworkLocal.test("result: ", results);
            return results;
        }
        try {
            results = await this.repository.readItems(collName, params, op);
            NetworkLocal.test("result: ", results);
            return results;
        }
        catch (err) {
            console.log(err);
            console.log("Unable to load media");
        }
    }
    async getImage() {
        const format = new ApiFormat({});
        const images = await this.client.get(this.imageGen.imageRes);
        return images;
    }
    async getThumbnail(name, collName) {
        const repository = new Repository(collName);
        let data = await repository.search("name", name);
        return data.thumbnail;
    }
}
//# sourceMappingURL=Media.js.map