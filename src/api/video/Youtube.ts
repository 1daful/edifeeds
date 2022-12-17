import { IMediaApi } from "../IMediaApi";
import { Resource } from "../Resource";
import {Axiosi} from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class Youtube implements IMediaApi{
    constructor(format?: {}) {
        const apiFormat = new ApiFormat(format)
        this.videoRes(apiFormat);
        this.searchRes(apiFormat)
    }
    client = new Axiosi()
    config!: any
    BASE_URL = '';
    BASE_PARAMS: any
    apiFormat = new ApiFormat()

    resources: Resource[] = [];
    videoData: Record<string, any> = {};
    searchData: Record<string, any> = {};

    videoRes = (format: ApiFormat) => {
        new Resource(this, 'video',
        {
            name: 'videos',
            baseUrl: '/videoRes',
            params: {
                q: format.keyword,
                part: {
                    snippet: 'data'
                },
                filters: {
                    chart: 'chart', //required, mostPopular
                    region: 'regionCode',
                    ids: ''
                },
            }
        }, 'videoResp');
    }

    searchRes = (format: ApiFormat) => {
        new Resource(this, 'video', {
            name: 'searchReq',
            baseUrl: '/search',
            params: {
                related: 'relatedToId',
                author: format.author,
                televised: 'channelType', //any, show
                broadcast: 'eventType', //completed, live, upcoming
                sort: 'order', //date, rating, relevance, title, videoCount, viewCount
                q: format.keyword,
                category: format.genre,
                region: 'regionCode',
            }
        }, 'searchResp')
    }
    async getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config.api.Youtube.config.baseParams
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    async getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config.api.Youtube.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resp: Record<string, any>) {
        let video: Record<string, any>;
        let videoData;
        let respData: Record<string, any>[] = [];
        if (resp.name === 'videoResp') {
            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id,
                    title: videoData.snippet.title,
                    duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    privacy: videoData.status.privacyStatus,
                    tags: videoData.snippet.tags,
                    description: videoData.snippet.description,
                    genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnailSmall,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    license: videoData.status.license,
                    source: 'youtube'
                }
                respData.push(video);
            //this.videoRes.response.dataList.push(video);
            }
        }

        else if (resp.name === 'searchResp') {

            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id.videoId,
                    title: videoData.snippet.title,
                    //duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    //privacy: videoData.status.privacyStatus,
                    //tags: videoData.snippet.tags,
                    //description: videoData.snippet.description,
                    //genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnails.default.url,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    //license: videoData.status.license,
                    source: 'youtube'
                }
            //this.searchRes.response.dataList.push(video);
            respData.push(video)
            }
        }
        return respData
    }

}
