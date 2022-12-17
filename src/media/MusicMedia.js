import { SoundCloud } from "../api/music/SoundCloud";
//import { Axiosi } from "src/api/Axiosi.js";
export class MusicMedia {
    apis = [];
    //private mediaItems: Record<string, any>[] = [];
    //media: Media;
    soundCloud;
    constructor(format) {
        this.soundCloud = new SoundCloud(format);
        //this.media = new Media(type);
        this.apis.push(this.soundCloud);
    }
}
//# sourceMappingURL=MusicMedia.js.map