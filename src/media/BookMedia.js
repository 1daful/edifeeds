import { GoogleBooks } from "../api/book/GoogleBooks";
export class BookMedia {
    //publisher!: string;
    //subtitle!: string;
    //pageCount!: number;
    apis = [];
    //media: Media;
    googleBooks;
    constructor(format) {
        this.googleBooks = new GoogleBooks(format);
        //this.media = new Media(type);
        this.apis.push(this.googleBooks);
    }
}
//# sourceMappingURL=BookMedia.js.map