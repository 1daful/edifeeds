import { IMedia } from "./IMedia";
import { GoogleBooks } from "../api/book/GoogleBooks";
import { IMediaApi } from "../api/IMediaApi";

export class BookMedia implements IMedia{
    //publisher!: string;
    //subtitle!: string;
    //pageCount!: number;

    apis: IMediaApi[] = [];
    //media: Media;
    googleBooks: IMediaApi;
    constructor(format?: {}){
        this.googleBooks = new GoogleBooks(format);
        //this.media = new Media(type);
        this.apis.push(this.googleBooks);
    }

    /*async readMedia(params?: string[], op?: Record<string, any>) {
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
    }*/
}