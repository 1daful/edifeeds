import { IMedia } from "./IMedia.js";
import { GoogleBooks } from "../api/book/GoogleBooks.js";
import { IMediaApi } from "../api/IMediaApi.js";
import { Media } from "./Media.js";
import { MediaRes } from "@/Types.js";

export class BookMedia implements IMedia{
    //publisher!: string;
    //subtitle!: string;
    //pageCount!: number;

    apis: IMediaApi[] = [];
    media: Media;
    googleBooks: IMediaApi;
    constructor(type: MediaRes){
        this.googleBooks = new GoogleBooks();
        this.media = new Media(type);
        this.apis.push(this.googleBooks);
    }

    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems("books", params, op);
        }
        catch (err) {
            console.log(err)
        }
    }

    async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('books', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
}