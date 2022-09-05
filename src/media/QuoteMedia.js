import { NetworkLocal } from './../api/network';
import { Media } from "./Media";
//import { PaperQuotes } from "../api/quotes/PaperQuotes";
//import { TheySaidSo } from "../api/quotes/Theysaidso";
//import { BookFormat } from "@/apiReqFormat/BookFormat";
import { ZenQuotes } from "../api/quotes/ZenQuotes";
//import { NetworkLocal } from "../api/network";
export class QuoteMedia {
    apis = [];
    //private mediaItems: Record<string, any>[] = [];
    media;
    //theySaidSo: IMediaApi;
    //paperQuotes: IMediaApi;
    zenQuotes;
    //bookFormat: BookFormat = new BookFormat()
    constructor(type) {
        //this.paperQuotes = new PaperQuotes();
        //this.theySaidSo = new TheySaidSo();
        this.zenQuotes = new ZenQuotes();
        this.media = new Media("quotes");
        this.apis.push(/*this.theySaidSo, */ this.zenQuotes);
    }
    async getMedia(params) {
        //let res = {}
        try {
            await this.media.load('quotes', this, params);
            NetworkLocal.test("checking res from QuoteMdia: ");
        }
        catch (err) {
            console.log(err);
            console.log("QuoteMedia not successful");
        }
    }
    async readMedia(params, op) {
        try {
            //NetworkLocal.test("Reading items from QuoteMedia")
            const res = await this.media.readItems('quotes', params, op);
            /*if(res) {
                res.forEach(async element => {
                    const image = await this.media.getImage(this.media.url, element.description)
                    if(image) element.thumbnailSmall = image.urls.regular
                });
            }*/
            NetworkLocal.test("QuoteMdia res: ", res);
            return res;
        }
        catch (err) {
            console.log(err);
        }
        console.log("Unable to load quote");
    }
}
//# sourceMappingURL=QuoteMedia.js.map