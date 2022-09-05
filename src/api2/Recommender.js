import { BookMedia } from "../media/BookMedia";
import { QuoteMedia } from "../media/QuoteMedia";
import { MusicMedia } from "../media/MusicMedia";
import { VideoMedia } from "../media/VideoMedia";
import { Media } from "../media/Media";
export class Recommender {
    bookMedia = new BookMedia();
    quoteMedia = new QuoteMedia();
    musicMedia = new MusicMedia();
    videoMedia = new VideoMedia();
    media = new Media("collections");
    //repository: IRepository = new Repository();
    /*constructor() {
    }*/
    async readMedia(type, genre, author) {
        let params;
        let op;
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
        if (genre) {
            params = ['genre'];
            op = {
                [genre]: "$eq"
            };
            mediaList = await this.load(type, params, op);
            return mediaList;
        }
        //break;
        //case 'sameAuthor':
        /*if (!item) {break;}
        params = {
            fieldPath: 'author',
            op: '=',
            value: `${item.author}`
        }*/
        if (author) {
            params = ['author'];
            op = {
                [author]: "$eq"
            };
            mediaList = await this.load(type, params, op);
            return mediaList;
        }
        mediaList = await this.load(type);
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
        console.log('mediaListRecomm: ', mediaList);
        return mediaList;
    }
    async load(type, params, op) {
        //for (const item of mediaList) {
        let items;
        switch (type) {
            case 'quotes':
                items = await this.quoteMedia.readMedia(params);
                console.log("mediaItems: ", items);
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
    getMedia() {
        //new VideoMedia().getMedia()
        //new MusicMedia().getMedia()
        new BookMedia().getMedia();
    }
}
//# sourceMappingURL=Recommender.js.map