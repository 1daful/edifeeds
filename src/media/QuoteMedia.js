import { ZenQuotes } from "../api/quotes/ZenQuotes";
export class QuoteMedia {
    apis = [];
    zenQuotes;
    constructor(format) {
        this.zenQuotes = new ZenQuotes(format);
        this.apis.push(this.zenQuotes);
    }
}
//# sourceMappingURL=QuoteMedia.js.map