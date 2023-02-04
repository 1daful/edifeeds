import { Youtube } from "../api/video/Youtube";
export class VideoMedia {
    apis = [];
    youtube;
    constructor(format) {
        this.youtube = new Youtube(format);
        this.apis.push(this.youtube);
    }
}
//# sourceMappingURL=VideoMedia.js.map