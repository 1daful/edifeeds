import { GoogleBooks } from "../api/book/GoogleBooks";
export class BookMedia {
    apis = [];
    googleBooks;
    constructor(format) {
        this.googleBooks = new GoogleBooks(format);
        this.apis.push(this.googleBooks);
    }
}
//# sourceMappingURL=BookMedia.js.map