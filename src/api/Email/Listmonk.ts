import config from "../../../public/config.json";
import { ApiClient } from '../../apiClient';
import { Resource } from '../Resource';
import { IMediaApi } from './../IMediaApi';
import { Axiosi } from "../Axiosi";

export class ListMonk implements IMediaApi {
    client: ApiClient = new Axiosi();
    resources: Resource[] = [];
    subscriber = new Resource(this, "contacts",
        {
            name: "subscriber",
            baseUrl: "/subscribers",
            params: {}
        },
        "subscriber"
    )
    getBaseUrl() {
        const apiBaseUrl = config.api.ListMonk.baseUrl
        return apiBaseUrl
    }
    getBaseParams() {
        const apiBaseParams = config.api.ListMonk.config
        return apiBaseParams
    }
    getData(resData: Record<string, any>) {
        
        
        //let mData: Record<string, any>
        /*for (const data of resData.items) {
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
            //respData.push(mData);
        }*/
        let respData: Record<string, any>[] = this.subscriber.getData(resData.items);
        return respData
    }

}