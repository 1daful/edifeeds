import { Media } from "./Media.js";
import { SoundCloud } from "../api/music/SoundCloud.js";
export class MusicMedia {
    apis = [];
    //private mediaItems: Record<string, any>[] = [];
    media;
    soundCloud;
    constructor(type) {
        this.soundCloud = new SoundCloud();
        this.media = new Media(type);
        this.apis.push(this.soundCloud);
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('music', this, params);
        }
        catch (err) {
            console.log(err);
        }
        //return res
    }
    async readMedia(params, op) {
        try {
            return await this.media.readItems("songTracks", params, op);
        }
        catch (err) {
            console.log(err);
        }
    }
}
//# sourceMappingURL=MusicMedia.js.map