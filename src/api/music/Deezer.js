import { Axiosi } from '../Axiosi';
import { Resource } from '../Resource';
import { ApiFormat } from '../../apiReqFormat/ApiFormat';
import config from "../../../public/config.json";
export class Deezer {
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.search(apiFormat);
    }
    client = new Axiosi();
    resources = [];
    search = (apiFormat) => {
        return new Resource(this, "music", {
            name: "searchRes",
            baseUrl: "/search",
            params: {
                artist: apiFormat.author,
                album: apiFormat.parent,
                track: apiFormat.title,
                q: apiFormat.keyword
            }
        }, "searchRes");
    };
    getBaseUrl() {
        try {
            const apiBaseUrl = config.api.GoogleBooks.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        try {
            const apiBaseParams = config.api.Deezer.config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
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
                genre: "",
                tags: [],
                region: "",
                duration: data.duration,
                description: "",
                keywords: []
            };
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=Deezer.js.map