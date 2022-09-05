import { IMedia } from "./IMedia.js";
import { IMediaApi } from "../api/IMediaApi.js";
import { Media } from "./Media.js";
import { Youtube } from "../api/video/Youtube.js";
import { MediaRes } from "@/Types.js";
export class VideoMedia implements IMedia {
    apis: IMediaApi[] = [];
    private mediaItems: Record<string, any>[] = [];
    media: Media;
    youtube: Youtube;

    constructor(type: MediaRes) {
        this.youtube = new Youtube();
        this.media = new Media(type);
        this.apis.push(this.youtube)
    }

    async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('videos', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems("videos", params, op);
        } 
        catch (err) {
            console.log(err)
        }
    }
}