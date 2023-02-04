import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class ZenQuotes {
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.quoteRes(apiFormat);
        this.qod(apiFormat);
    }
    client = new Axiosi();
    config;
    BASE_URL = '';
    BASE_PARAMS;
    resources = [];
    apiFormat = new ApiFormat();
    quoteRes = (format) => {
        new Resource(this, 'quotes', {
            name: 'quoteReq',
            baseUrl: '/quotes',
            params: {
                categories: '',
                images: '',
                authors: '',
                random: '',
                tags: format.tags,
                quotes: format.keyword
            }
        }, 'quoteResp');
    };
    qod = (format) => {
        new Resource(this, 'quote', {
            name: 'qodReq',
            baseUrl: '/random',
            params: format
        }, 'qodResp');
    };
    async getBaseParams() {
        try {
            const apiBaseParams = config?.api.ZenQuotes.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
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
        for (const data of resp) {
            mData = {
                type: "quotes",
                status: '',
                privacy: '',
                tags: [],
                description: data.q,
                genre: "",
                inserted_at: new Date().toJSON(),
                license: '',
                orderby: "",
                content: "",
                topic: "",
                meta: "",
                region: "",
                duration: 0,
                keywords: [],
                title: '',
                publisher: {
                    name: "",
                    logo: "",
                    description: ""
                },
                isbn: "",
                thumbnailsmall: '',
                authors: [
                    data.a
                ],
                thumbnaillarge: '',
            };
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=ZenQuotes.js.map