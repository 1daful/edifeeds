import { ApiClient } from '../../apiClient';
import { IMediaApi } from 'src/api/IMediaApi';
import { Axiosi } from '../Axiosi';
import { Resource } from '../Resource';
import { ApiFormat } from '../../apiReqFormat/ApiFormat';
import { MediaType } from '../../Types';
import config from "../../../public/config.json";

export class Deezer implements IMediaApi {
    client: ApiClient = new Axiosi();
    resources: Resource[] = [];
    search = (apiFormat: ApiFormat) => {
        return new Resource(this, "Music", {
            name: "searchRes",
            baseUrl: "/search",
            params: {
                artist: apiFormat.author,
                album: apiFormat.parent,
                track: apiFormat.title,
                label: apiFormat.meta,
                //dur_min: apiFormat.length
                //dur_max	The track's maximum duration in seconds	int	https://api.deezer.com/search?q=dur_max:500
                //bpm_min	The track's minimum bpm	int	https://api.deezer.com/search?q=bpm_min:120
                //bpm_max	

                
            }
        }, "searchRes")

    }
    getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config.api.GoogleBooks.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }
    getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config.api.Deezer.config
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    getData(resData: any) {
        let respData: Record<string, any>[] = [];
        let mData: MediaType
        for (const data of resData.items) {
            mData = {
                id: data.id,
                title: data.title,
                type: "music",
                authors: data.artist.name,
                publisher: {
                    name: "",
                    logo: "",
                    description: ""
                },
                //_id: new Date().toJSON(),
                status: '',
                meta: {
                    rank: data.rank,
                    link: data.link,
                    album: data.album
                },
                privacy: '',
                topic: "",
                isbn: "",
                license: '',
                orderby: '',
                content: "",
                inserted_at: "",
                thumbnailsmall: data.album.cover_small,
                thumbnaillarge: data.album.cover_big,
                //thumbnaillarge: data.md5_image,
                genre: "",
                tags: [],
                region: "",
                duration: data.duration,
                description: "",
                keywords: []
                //printType: data.volumeInfo.printType //book or magazine
            }
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData
    }
    
}