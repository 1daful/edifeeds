import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi.js";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
export class InternetArchive {
    constructor() {
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.InternetArchive.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.InternetArchive.id,
                    KEY: this.config.api.InternetArchive.key
                };
            }
        });
    }
    client = new Axiosi();
    config;
    resources = [];
    BASE_URL = '';
    BASE_PARAMS;
    apiFormat = new ApiFormat();
    videoRes = new Resource(this, 'name', {
        name: 'videoReq',
        baseUrl: '/videos',
        params: {
            q: 'q',
            field: '',
            count: 100
        }
    }, 'videoResp');
    async getBaseParams() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseParams = config?.data.api.InternetArchive.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseUrl = config?.data.api.InternetArchive.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let video;
        for (const videoData of resData.dataSource) {
            video = {
                id: videoData.identifier,
                status: '',
                privacy: '',
                tags: videoData.subject,
                description: videoData.description,
                genre: videoData.mainCategory,
                thumbnailSmall: videoData.imageLinks.thumbnail,
                thumbnailLarge: videoData.imageLinks.large,
                created: videoData.publicDate,
                license: '',
                title: videoData.title,
                authors: videoData.creator,
                printType: videoData.printType,
                format: videoData.mediatype
            };
            respData.push(video);
        }
        return respData;
    }
}
//# sourceMappingURL=InternetArchive.js.map