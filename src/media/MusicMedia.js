import { SoundCloud } from "../api/music/SoundCloud";
import { Deezer } from "../api/music/Deezer";
export class MusicMedia {
    apis = [];
    soundCloud;
    deezer;
    constructor(format) {
        this.soundCloud = new SoundCloud(format);
        this.deezer = new Deezer(format);
        this.apis.push(this.soundCloud);
        this.apis.push(this.deezer);
    }
}
//# sourceMappingURL=MusicMedia.js.map