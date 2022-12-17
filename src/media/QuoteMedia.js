//import { PaperQuotes } from "../api/quotes/PaperQuotes";
//import { TheySaidSo } from "../api/quotes/Theysaidso";
//import { BookFormat } from "@/apiReqFormat/BookFormat";
import { ZenQuotes } from "../api/quotes/ZenQuotes";
//import { NetworkLocal } from "../api/network";
export class QuoteMedia {
    apis = [];
    //private mediaItems: Record<string, any>[] = [];
    //media: Media;
    //theySaidSo: IMediaApi;
    //paperQuotes: IMediaApi;
    zenQuotes;
    //bookFormat: BookFormat = new BookFormat()
    constructor(format) {
        //this.paperQuotes = new PaperQuotes();
        //this.theySaidSo = new TheySaidSo();
        this.zenQuotes = new ZenQuotes(format);
        //this.media = new Media("quotes");
        this.apis.push(/*this.theySaidSo, */ this.zenQuotes);
    }
}
//# sourceMappingURL=QuoteMedia.js.map