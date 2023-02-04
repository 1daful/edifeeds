import { IMedia } from "./IMedia";
import { IMediaApi } from "../api/IMediaApi";
import { SoundCloud } from "../api/music/SoundCloud";
import { Deezer } from "../api/music/Deezer";
//import { Axiosi } from "src/api/Axiosi.js";

export class MusicMedia implements IMedia {
    apis: IMediaApi[] = [];
    //private mediaItems: Record<string, any>[] = [];
    //media: Media;
    soundCloud: IMediaApi;
    deezer: IMediaApi

    constructor(format?: {}) {
        this.soundCloud = new SoundCloud(format);
        this.deezer = new Deezer(format)
        //this.media = new Media(type);
        this.apis.push(this.soundCloud);
        this.apis.push(this.deezer)
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
