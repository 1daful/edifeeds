import { GoogleBooks } from "../api/book/GoogleBooks.js";
import { Media } from "./Media.js";
export class BookMedia {
    //publisher!: string;
    //subtitle!: string;
    //pageCount!: number;
    apis = [];
    media;
    googleBooks;
    constructor(type) {
        this.googleBooks = new GoogleBooks();
        this.media = new Media(type);
        this.apis.push(this.googleBooks);
    }
    async readMedia(params, op) {
        try {
            return await this.media.readItems("books", params, op);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('books', this, params);
        }
        catch (err) {
            console.log(err);
        }
        //return res
    }
}
//# sourceMappingURL=BookMedia.js.map