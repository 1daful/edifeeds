import config from '../../../public/config.json';
import { ApiFormat } from 'src/apiReqFormat/ApiFormat';
import { Axiosi } from '../Axiosi';
import { Resource } from '../Resource';
import { createClient } from 'pexels';
export class Pexels {
    constructor(format) {
        let apiFormat = new ApiFormat(format);
        this.imageRes = this.getResource(apiFormat);
        this.cl = createClient(config.api.Pexels.config.header.Authorization);
    }
    client = new Axiosi();
    cl;
    resources = [];
    getResource(format) {
        let imageRes = new Resource(this, 'images', {
            name: "imageReq",
            baseUrl: "/search",
            params: {
                query: format.keyword,
                orientation: "",
                page: "",
                per_page: ""
            }
        }, "imageResp");
        return imageRes;
    }
    imageRes;
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
            respData.push(mData);
        }
        return respData;
    }
    async getPhotos(query) {
        let image = await this.cl.photos.search({
            query: query
        });
        return image.photos;
    }
}
//# sourceMappingURL=Pexels.js.map