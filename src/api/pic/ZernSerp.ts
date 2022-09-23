import { IMediaApi } from "../../api/IMediaApi";
//import { ApiClient } from "../../apiClient";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";

export class ZerpSerp implements IMediaApi {
    constructor(apiFormat: ApiFormat) {
        this.apiFormat = apiFormat
    }
    client = new Axiosi();
    resources: Resource[] = [];
    apiFormat: ApiFormat = new ApiFormat()
    async getBaseUrl() {
        try{
            const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.data.api.ZerpSerp.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
        /*.then(resp => {
            if (resp) {
                this.config = resp.data;
                console.log('axios load working', this.config.api.GoogleBooks.baseUrl)
                this.BASE_URL = this.config.api.GoogleBooks.baseUrl;
                this.BASE_PARAMS =  {
                    ID: this.config.api.GoogleBooks.id,
                    KEY: this.config.api.GoogleBooks.key
                }
            }
        })*/
    }

    async getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config?.api.zenserp.config.baseParams
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resData: Record<string, any>) {
        let respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        for (const data of resData.items) {
            mData = {
                type: "images",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: "",
                genre: "",
                thumbnailSmall: data.thumbnail,
                thumbnailLarge: data.sourceUrl,
                created: '',
                license: '',
                title: data.title,
                authors: data.source,
                printType: "" //book or magazine
            }
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData
    }
    searchRes = new Resource(this, "images",
    {
        name: "searchRes",
        baseUrl: "/search",
        params: {
            q: this.apiFormat.keyword,
            tbm: this.apiFormat.format
        }
    }, "searchResp"
    )
}
