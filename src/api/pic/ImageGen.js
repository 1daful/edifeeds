import config from "../../../public/config.json";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
export class Unsplash {
    client = new Axiosi();
    config;
    resources = [];
    BASE_URL;
    BASE_PARAMS;
    apiFormat = new ApiFormat({ keyword: "rent" });
    imageRes = new Resource(this, 'books', {
        name: 'imageReq',
        baseUrl: '/photos/random',
        params: {
            query: this.apiFormat.keyword,
            count: this.apiFormat.length
        }
    }, 'imageResp');
    async getBaseParams() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config?.api.Unsplash.client_id;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.api.Unsplash.baseUrl;
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
        let respD = [];
        if ((!Array.isArray(resp)))
            respD = [respData];
        for (const data of respD) {
            mData = {
                type: "images",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: data.description,
                genre: '',
                created: '',
                license: '',
                title: '',
                publisher_id: "",
                isbn: "",
                lccl: "",
                oclc: "",
                format: "",
                printType: '',
                thumbnailSmall: data.urls?.regular,
                authors: [{
                        name: data.user?.name,
                        pic: ''
                    }],
                thumbnailLarge: data.urls?.full,
                //authors: data.a,
                //tags: []
            };
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=ImageGen.js.map