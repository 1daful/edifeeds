import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import {Axiosi } from "../Axiosi";
import { IMediaApi } from "../IMediaApi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";

export class Unsplash implements IMediaApi {
    client = new Axiosi();
    config!: any
    resources: Resource[] = [];
    BASE_URL: any
    BASE_PARAMS: any;
    apiFormat: ApiFormat = new ApiFormat({keyword: "rent"});

    imageRes = new Resource(this, 'books',
    {
        name: 'imageReq',
        baseUrl: '/photos/random',
        params: {
            query: this.apiFormat.keyword,
            count: this.apiFormat.length
        }
    }, 'imageResp');

    getBaseParams() {
        //const config = await this.client.load('../config.json')
        const apiBaseParams = config.api.Unsplash.config
        return apiBaseParams
    }
    async getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.api.Unsplash.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resp: Record<string, any>[]) {
        const respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        //if (resp.name === 'quoteResp')
        let respD: Record<string, any>[] = []
        if ((!Array.isArray(resp))) respD = [respData]
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
            }
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData
    }
    
}