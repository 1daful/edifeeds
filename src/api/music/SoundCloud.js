import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class SoundCloud {
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.trackRes(apiFormat);
    }
    client = new Axiosi();
    config;
    resources = [];
    BASE_URL = '';
    BASE_PARAMS;
    resource = [];
    trackRes = (format) => {
        new Resource(this, 'music', {
            name: 'trackReq',
            baseUrl: '/tracks',
            params: {
                q: format.keyword,
                tags: format.tags,
                filter: {},
                license: '',
                bpm: '',
                duration: format.length,
                created_at: format.date,
                created: ''
            }
        }, 'trackResp');
    };
    getBaseParams() {
        try {
            const apiBaseParams = config.api.SoundCloud.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseUrl() {
        try {
            const apiBaseUrl = config.api.SoundCloud.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let mData;
        let respData = [];
        for (const data of resData.dataSource) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: '',
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.imageLinks.thumbnail,
                thumbnailLarge: data.imageLinks.large,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType
            };
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=SoundCloud.js.map