import { MediaType } from './../../Types';
import { Resource } from "../Resource";
import { IMediaApi } from "../IMediaApi";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json"

/**
 * This is a concrete GoogleBooks class implementation of IMedia
 */
export class GoogleBooks implements IMediaApi{
    client = new Axiosi()
    config!: any
    resources: Resource[] = [];
    //BASE_URL: any
    BASE_PARAMS: any;
    constructor(format?: {}) {
        const apiFormat = new ApiFormat(format)
        this.volumeRes(apiFormat)
    }

    volumeRes = (apiFormat: ApiFormat) => {
        new Resource(this, 'books',
        {
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
    }

    /*setDataSource(data: Record<string, any>) {
        this.volumeRes.response.dataSource = data.items;
    }*/

    getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config.api.GoogleBooks.baseUrl
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

    getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config.api.GoogleBooks.config
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resData: any) {
        let respData: Record<string, any>[] = [];
        let mData: MediaType
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
                //_id: new Date().toJSON(),
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
                //printType: data.volumeInfo.printType //book or magazine
            }
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData
    }

    /*setResponse(data: Record<string, any>) {
        this.setDataSource(data);
        this.setData(this.volumeRes.response);
    }*/
}
