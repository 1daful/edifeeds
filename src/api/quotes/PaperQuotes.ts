import { IMediaApi } from "../IMediaApi";
import { Resource} from "../Resource";
//import { Response } from "../Response";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { ApiClient } from "src/apiClient";

export class PaperQuotes implements IMediaApi{
    constructor() {
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.PaperQuotes.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.PaperQuotes.id,
                    KEY: this.config.api.PaperQuotes.key
                };
            }
        });
    }
  client = new Axiosi()
    config!: any
    BASE_URL = '';
    BASE_PARAMS: any;
    resources: Resource[] = [];
    apiFormat: ApiFormat = new ApiFormat()

    quoteRes = new Resource(this, 'quotes',
    {
        name: 'quoteReq',
        baseUrl: '/quotes/',
        params: {
            categories: '',
            images: '',
            authors: '',
            random: '',
            tags: ''
        }
    },
    'quoteResp'
    );
    data = {
        //quote: 'quote',
        author: 'author',
        tags: 'tags',
        image: 'image'
    }
    async getBaseParams() {
        try{
            const config = await this.client.load('../config.json')
            const apiBaseParams = config?.data.api.PaperQuotes.baseParams
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    async getBaseUrl() {
        try{
            const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.data.api.PaperQuotes.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resData: Record<string, any>) {
        const respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        for (const data of resData.dataSource) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: '',
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.imageLinks.thumbnail,
                thumbnailLarge: data.imageLinks.large,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType
            }
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData
    }

    /*setResponse(data: Record<string, any>) {
        this.setDataSource(data);
        this.setData(this.quoteRes.response);
    }*/

}
