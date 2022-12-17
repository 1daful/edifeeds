import { IMedia } from "./IMedia";
import { IMediaApi } from "../api/IMediaApi";
import { SoundCloud } from "../api/music/SoundCloud";
//import { Axiosi } from "src/api/Axiosi.js";

export class MusicMedia implements IMedia {
    apis: IMediaApi[] = [];
    //private mediaItems: Record<string, any>[] = [];
    //media: Media;
    soundCloud: IMediaApi;

    constructor(format?: {}) {
        this.soundCloud = new SoundCloud(format);
        //this.media = new Media(type);
        this.apis.push(this.soundCloud);
    }

    /*async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('music', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems("songTracks", params, op);}
        catch (err) {
            console.log(err)
        }
    }*/
}
