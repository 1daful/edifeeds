import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
export class PaperQuotes {
    constructor() {
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.PaperQuotes.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.PaperQuotes.id,
                    KEY: this.config.api.PaperQuotes.key
                };
            }
        });
    }
    client = new Axiosi();
    config;
    BASE_URL = '';
    BASE_PARAMS;
    resources = [];
    apiFormat = new ApiFormat();
    quoteRes = new Resource(this, 'quotes', {
        name: 'quoteReq',
        baseUrl: '/quotes/',
        params: {
            categories: '',
            images: '',
            authors: '',
            random: '',
            tags: ''
        }
    }, 'quoteResp');
    data = {
        author: 'author',
        tags: 'tags',
        image: 'image'
    };
    async getBaseParams() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseParams = config?.data.api.PaperQuotes.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseUrl = config?.data.api.PaperQuotes.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        const respData = [];
        let mData;
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
//# sourceMappingURL=PaperQuotes.js.map