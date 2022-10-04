import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class ZenQuotes {
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.quoteRes = this.getResource(apiFormat);
    }
    getResource(format) {
        return new Resource(this, 'quotes', {
            name: 'quoteReq',
            baseUrl: '/quotes',
            params: {
                categories: '',
                images: '',
                authors: '',
                random: '',
                tags: '',
                quotes: format.keyword
            }
        }, 'quoteResp');
    }
    client = new Axiosi();
    config;
    BASE_URL = '';
    BASE_PARAMS;
    resources = [];
    apiFormat = new ApiFormat();
    quoteRes;
    qod = new Resource(this, 'quote', {
        name: 'qodReq',
        baseUrl: '/random',
        params: {}
    }, 'qodResp');
    data = {
        quote: 'quote',
        author: 'author',
        tags: [],
        image: 'image'
    };
    async getBaseParams() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config?.api.ZenQuotes.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.api.ZenQuotes.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resp) {
        const respData = [];
        let mData;
        //if (resp.name === 'quoteResp')
        for (const data of resp) {
            mData = {
                type: "quotes",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: data.q,
                genre: "General",
                created: '',
                license: '',
                title: '',
                publisher_id: "",
                isbn: "",
                lccl: "",
                oclc: "",
                format: "",
                printType: '',
                thumbnailSmall: '',
                authors: [{
                        name: data.a,
                        pic: ''
                    }],
                thumbnailLarge: '',
                //authors: data.a,
                //tags: []
            };
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=ZenQuotes.js.map