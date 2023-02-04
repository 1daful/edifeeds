import { Response } from "./Response";
import site from "../../public/config.json";
export class Resource {
    constructor(api, type, request, respName) {
        this.api = api;
        this.type = type;
        this.request = request;
        this.response = new Response(respName);
        this.api.resources.push(this);
    }
    type;
    request;
    response;
    api;
    URL = site.backURL;
    isObject(obj) {
        return obj instanceof Object && obj.constructor === Object;
    }
    getRequestParam(resData) {
        let newParam = '';
        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])) {
                const keyse = Object.keys(resData[key]);
                let i = 0;
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    if (i > 0 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    i++;
                    resData[key] = newParam;
                });
            }
            if (!resData[key]) {
                delete resData[key];
            }
        });
        return resData;
    }
    async getBaseParam() {
        const obj = {
            header: {},
            baseParams: {
                baseUrl: ""
            },
        };
        try {
            const apiBaseParams = this.api.getBaseParams().baseParams;
            Object.assign(obj.baseParams, apiBaseParams);
            console.log("obj.params", this.api.getBaseParams(), this.api.constructor.name);
            Object.assign(obj.baseParams, this.getRequestParam(this.request.params));
            const baseURL = await this.getBaseURL() || "";
            obj.baseParams.baseUrl = baseURL;
            obj.header = (await this.api.getBaseParams()).header;
            console.log("config obj: ", obj);
            return obj;
        }
        catch (err) {
            console.log;
        }
        return obj;
    }
    async getBaseURL() {
        try {
            const apiBaseUrl = await this.api.getBaseUrl();
            const baseUrl = apiBaseUrl + this.request.baseUrl;
            return baseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getResponse(data) {
        return this.api.getData(data);
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData) {
            mData = {
                type: "books",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.volumeInfo.imageLinks.smallThumbnail,
                thumbnailLarge: data.volumeInfo.imageLinks.thumbnail,
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
//# sourceMappingURL=Resource.js.map