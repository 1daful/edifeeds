import { NetworkLocal } from './network';
import { BookMedia } from "../media/BookMedia";
import { QuoteMedia } from "../media/QuoteMedia";
import { MusicMedia } from "../media/MusicMedia";
import { VideoMedia } from "../media/VideoMedia";
import { Media } from "../media/Media";
import { Gorse } from "../gorsejs/src";
import config from "../../public/config.json";
export class Recommender {
    bookMedia = new BookMedia("books");
    quoteMedia = new QuoteMedia("quotes");
    musicMedia = new MusicMedia("music");
    videoMedia = new VideoMedia("videos");
    media = new Media("collections");
    //repository: IRepository = new Repository();
    /*constructor() {
    }*/
    client = new Gorse({
        endpoint: config.api.Gorse.id,
        secret: config.api.Gorse.key,
    });
    async readMedia(type, op) {
        let params;
        //let op;
        let mediaList;
        //let collMedia =[]
        /*switch (section) {
            case 'related':
                if (!genre) {
                    console.error('genre is not provided')
                    break;
                }*/
        /*params = {
            fieldPath: 'genre',
            op: '=',
            value: `${genre}`
        };*/
        /*if (genre) {
            params = ['genre'];
            op = {
                [genre]: "$eq"
            }
            mediaList = await this.load(type, params, op);
            return mediaList
        }*/
        //break;
        //case 'sameAuthor':
        /*if (!item) {break;}
        params = {
            fieldPath: 'author',
            op: '=',
            value: `${item.author}`
        }*/
        /*if (author) {
            params = ['author'];
        op = {
            [author]: "$eq"
        }
        mediaList = await this.load(type, params, op);
        return mediaList
    }*/
        mediaList = await this.load(type, [], op);
        /*break;
    case 'top':
        await this.load(mediaList);
        break;
    case 'collection':
         y = await this.media.readItems();
         mediaList[4].mediaItems = y as never[]
        break
    default:
        break;*/
        NetworkLocal.test('mediaListRecomm: ', mediaList);
        return mediaList;
    }
    async load(type, params, op) {
        //for (const item of mediaList) {
        let items;
        switch (type) {
            case 'quotes':
                items = await this.quoteMedia.readMedia(params, op);
                NetworkLocal.test("mediaItems: ", items);
                return items;
            //break;
            case 'books':
                items = await this.bookMedia.readMedia(params, op);
                return items;
            //break;
            /*case 'music':
                item.mediaItems = this.musicMedia.readMedia(params, op);
                break;

            case 'video':
                item.mediaItems = this.videoMedia.readMedia(params, op);
                break;*/
            default:
                break;
        }
        return items;
    }
    getMedia(section, id = "general", category) {
        //new VideoMedia().getMedia()
        //new MusicMedia().getMedia()
        new BookMedia("books").getMedia();
        new QuoteMedia("quotes").getMedia();
        switch (section) {
            case "Recommended":
                this.getRecommended(id);
                break;
            case "Latest":
                this.getLatest(category);
                break;
            case "Popular":
                this.getPopular(category);
                break;
            case "Related":
                this.getRelated(id, category);
                break;
            default:
                break;
        }
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
        const feedbacks = [];
        await this.client.insertFeedbacks(feedbacks);
    }
}
//# sourceMappingURL=Recommender.js.map