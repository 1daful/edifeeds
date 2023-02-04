import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class Youtube {
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.videoRes(apiFormat);
        this.searchRes(apiFormat);
    }
    client = new Axiosi();
    config;
    BASE_URL = '';
    BASE_PARAMS;
    apiFormat = new ApiFormat();
    resources = [];
    videoData = {};
    searchData = {};
    videoRes = (format) => {
        new Resource(this, 'videos', {
            name: 'videos',
            baseUrl: '/videos',
            params: {
                q: format.keyword,
                part: {
                    snippet: 'data'
                },
                filters: {
                    chart: '',
                    region: '',
                    ids: ''
                },
            }
        }, 'videoResp');
    };
    searchRes = (format) => {
        new Resource(this, 'videos', {
            name: 'searchReq',
            baseUrl: '/search',
            params: {
                related: '',
                author: format.author,
                televised: '',
                broadcast: '',
                sort: 'order',
                q: format.keyword,
                category: format.genre,
                region: '',
            }
        }, 'searchResp');
    };
    getBaseParams() {
        try {
            const apiBaseParams = config.api.Youtube.config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseUrl() {
        try {
            const apiBaseUrl = config.api.Youtube.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resp) {
        let video;
        let videoData;
        let respData = [];
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
                };
                respData.push(video);
            }
        }
        else if (resp.name === 'searchResp') {
            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id.videoId,
                    title: videoData.snippet.title,
                    status: videoData.snippet.liveBroadcastContent,
                    thumbnailSmall: videoData.snippet.thumbnails.default.url,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    source: 'youtube'
                };
                respData.push(video);
            }
        }
        return respData;
    }
}
//# sourceMappingURL=Youtube.js.map