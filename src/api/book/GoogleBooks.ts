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
    BASE_URL: any
    BASE_PARAMS: any;
    apiFormat: ApiFormat = new ApiFormat({keyword: "rent"});

    volumeRes = new Resource(this, 'books',
    {
        name: 'volumeReq',
        baseUrl: '/volumes',
        params: {
            q: {
                keyword: this.apiFormat.keyword,
                intitle: this.apiFormat.title || '',
                inauthor: this.apiFormat.author || '',
                inpublisher: this.apiFormat.publisher || '',
                subject: this.apiFormat.genre || '',
                isbn: this.apiFormat.isbn || '',
                lccn: this.apiFormat.lccl || '',
                oclc: this.apiFormat.oclc || ''
            },
            download: this.apiFormat.format || '',
            filter: '',
            printType: this.apiFormat.printType || '',
            projection: '',
            orderBy: this.apiFormat.orderBy || '',
        }
    }, 'volumeResp');

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

    getData(resData: Record<string, any>) {
        let respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        for (const data of resData.items) {
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
                printType: data.printType //book or magazine
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
