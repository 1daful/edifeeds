import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class GoogleBooks {
    client = new Axiosi();
    config;
    resources = [];
    BASE_PARAMS;
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.volumeRes(apiFormat);
    }
    volumeRes = (apiFormat) => {
        new Resource(this, 'books', {
            name: 'volumeReq',
            baseUrl: '/volumes',
            params: {
                q: {
                    keyword: apiFormat.keyword,
                    intitle: apiFormat.title || '',
                    inauthor: apiFormat.author || '',
                    inpublisher: apiFormat.publisher || '',
                    subject: apiFormat.genre || '',
                    isbn: apiFormat.isbn || '',
                    lccn: apiFormat.lccl || '',
                    oclc: apiFormat.oclc || ''
                },
                download: apiFormat.format,
                filter: '',
                printType: apiFormat.printType || '',
                projection: '',
                orderBy: apiFormat.orderBy || '',
            }
        }, 'volumeResp');
    };
    getBaseUrl() {
        try {
            const apiBaseUrl = config.api.GoogleBooks.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        try {
            const apiBaseParams = config.api.GoogleBooks.config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData.items) {
            mData = {
                id: data.id,
                title: data.volumeInfo.title,
                type: "books",
                authors: data.volumeInfo.authors,
                publisher: {
                    name: "",
                    logo: "",
                    description: ""
                },
                status: '',
                meta: {},
                privacy: '',
                topic: "",
                isbn: "",
                license: '',
                orderby: '',
                content: "",
                inserted_at: data.volumeInfo.publishedDate,
                thumbnailsmall: data.volumeInfo.imageLinks.smallThumbnail,
                thumbnaillarge: data.volumeInfo.imageLinks.thumbnail,
                genre: data.volumeInfo.mainCategory,
                tags: data.volumeInfo.categories,
                region: "",
                duration: 0,
                description: data.volumeInfo.description,
                keywords: []
            };
            respData.push(mData);
        }
        return respData;
    }
}
//# sourceMappingURL=GoogleBooks.js.map