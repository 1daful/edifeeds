import { Media } from "./Media.js";
import { Youtube } from "../api/video/Youtube.js";
export class VideoMedia {
    apis = [];
    mediaItems = [];
    media;
    youtube;
    constructor(type) {
        this.youtube = new Youtube();
        this.media = new Media(type);
        this.apis.push(this.youtube);
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('videos', this, params);
        }
        catch (err) {
            console.log(err);
        }
        //return res
    }
    async readMedia(params, op) {
        try {
            return await this.media.readItems("videos", params, op);
        }
        catch (err) {
            console.log(err);
        }
    }
}
//# sourceMappingURL=VideoMedia.js.map