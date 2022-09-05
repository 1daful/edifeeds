import config from '../../../public/config.json';
import { ApiFormat } from 'src/apiReqFormat/ApiFormat';
import { Axiosi } from '../Axiosi';
import { Resource } from '../Resource';
export class Pexels {
    constructor(apiFormat) {
        this.apiFormat = apiFormat;
    }
    client = new Axiosi();
    resources = [];
    apiFormat = new ApiFormat();
    imageRes = new Resource(this, 'images', {
        name: "imageReq",
        baseUrl: "/search",
        params: {
            query: this.apiFormat.keyword,
            orientation: this.apiFormat.keyword,
            page: "",
            per_page: ""
        }
    }, "imageResp");
    getBaseUrl() {
        const url = config.api.Pexels.baseUrl;
        return url;
    }
    getBaseParams() {
        const confi = config.api.Pexels.config;
        return confi;
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData.items) {
            mData = {
                type: "images",
                id: data.id,
                status: '',
                privacy: '',
                publisher: {
                    name: '',
                    logo: '',
                    description: ''
                },
                isbn: '',
                region: '',
                length: 0,
                keywords: [],
                topic: '',
                tags: [],
                description: data.src.alt,
                genre: '',
                thumbnailSmall: data.src.small,
                thumbnailLarge: data.src.large,
                created: null,
                license: '',
                title: '',
                authors: [data.photographer],
                orderBy: '',
                content: '',
                meta: {
                    attribution: {
                        href: config.api.Pexels.attribution.href,
                        src: config.api.Pexels.attribution.src,
                        authorSrc: data.photographer_url
                    },
                    width: data.width,
                    height: data.height,
                }
            };
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=Pexels.js.map