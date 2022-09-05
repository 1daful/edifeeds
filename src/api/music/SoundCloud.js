import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
export class SoundCloud {
    constructor() {
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.SoundCloud.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.SoundCloud.id,
                    KEY: this.config.api.SoundCloud.key
                };
            }
        });
    }
    client = new Axiosi();
    config;
    resources = [];
    apiFormat = new ApiFormat();
    /*private _filters = {
         q: '',
         tags: '',
         filter: '',
         license: '',
         bpm: '',
         duration: '',
         created_at: '',
         ids: '',
         genres: ''
     };*/
    BASE_URL = '';
    BASE_PARAMS;
    resource = [];
    trackRes = new Resource(this, 'tracks', {
        name: 'trackReq',
        baseUrl: '/tracks',
        params: {
            q: '',
            tags: [],
            filter: {},
            license: '',
            bpm: '',
            duration: '',
            created_at: '',
            created: ''
        }
    }, 'trackResp');
    data = {
        id: 'id',
        title: 'title',
        duration: 'duration',
        status: 'state',
        privacy: 'sharing',
        tags: 'tag_list',
        url: 'url',
        description: 'description',
        genre: 'genre',
        thumbnail: 'artwork_url',
        creator: 'user_id',
        timestamp: 'created_at',
        license: 'license',
    };
    /*setDataSource(data: Record<string, any>) {
        this.trackRes.response.dataSource = data.items;
    }*/
    async getBaseParams() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseParams = config?.data.api.SoundCloud.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseUrl = config?.data.api.SoundCloud.baseUrl;
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
            //this.trackRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=SoundCloud.js.map