import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
export class TheySaidSo {
    constructor() {
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.TheySaidSo.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.TheySaidSo.id,
                    KEY: this.config.api.TheySaidSo.key
                };
            }
        });
    }
    client = new Axiosi();
    config;
    BASE_URL = '';
    BASE_PARAMS;
    apiFormat = new ApiFormat();
    resources = [];
    quoteRes = new Resource(this, 'quotes', {
        name: 'quoteReq',
        baseUrl: '/qod.json',
        params: {
            minlenght: null,
            maxlenght: null,
            start: null,
            category: '',
            author: '',
            categories: '',
            images: '',
            random: ''
        }
    }, 'quoteRes');
    attribution = `<span style="z-index: 50; font-size: 0.9em;">
    <img src="https://theysaidso.com/branding/theysaidso.png"
    height="20" width="20" alt="theusaidso.com" />
    <a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">
    theysaidso.com</a>
    </span>`;
    async getBaseParams() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseParams = config?.data.api.TheySaidSo.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseUrl = config?.data.api.TheySaidSo.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resp) {
        const respData = [];
        let mData;
        for (const data of resp.quotes) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: data.tags,
                genre: data.category,
                thumbnailSmall: data.background,
                license: '',
                title: data.title,
                author: data.author,
                printType: data.printType,
                content: data.quote,
                date: data.date
            };
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=Theysaidso.js.map