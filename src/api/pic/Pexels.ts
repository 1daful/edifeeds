import config from '../../../public/config.json';
import { ApiFormat } from 'src/apiReqFormat/ApiFormat';
import { Axiosi } from '../Axiosi';
import { IMediaApi } from '../IMediaApi';
import { Resource } from '../Resource';
import { MediaType } from "../../Types";
import { createClient, PhotosWithTotalResults } from 'pexels';
export class Pexels implements IMediaApi{
  constructor(format: {}) {
    let apiFormat = new ApiFormat(format)
    this.imageRes = this.getResource(apiFormat)
    this.cl = createClient(config.api.Pexels.config.header.Authorization)

  }
  client = new Axiosi();
  cl
  resources: Resource[] = [];
  //apiFormat: ApiFormat
  getResource(format: ApiFormat): Resource {
    let imageRes = new Resource(this, 'images', {
      name: "imageReq",
      baseUrl: "/search",
      params: {
        query: format.keyword,
        orientation: "",
        page: "",
        per_page: ""
  }
    },
    "imageResp")
    return imageRes
  }
  imageRes


  getBaseUrl() {
    const url = config.api.Pexels.baseUrl
    return url
  }
  getBaseParams() {
    const confi = config.api.Pexels.config
    return confi
  }
  getData(resData: Record<string, any>) {
      let respData: Record<string, any>[] = [];
      let mData: MediaType
      for (const data of resData.items) {
          mData = {
              type: "images",
              id: data.id,
              status: '',
              privacy: '',
              publisher: {
                name: '',
                logo: '',
                description: ''
              },
              isbn: '',
              region: '',
              length: 0,
              keywords: [],
              topic: '',
              tags: [],
              description: data.src.alt,
              genre: '',
              thumbnailSmall: data.src.small,
              thumbnailLarge: data.src.large,
              created: null,
              license: '',
              title: '',
              authors: [data.photographer],
              orderBy: '',
              content: '',
              meta: {
              attribution: {
                href: config.api.Pexels.attribution.href,
                src: config.api.Pexels.attribution.src,
                authorSrc: data.photographer_url
              },
              width: data.width,
              height: data.height,
            }
          }
          //this.volumeRes.response.dataList.push(mData);
          respData.push(mData);
      }
      return respData
  }

  async getPhotos(query: string) {
    let image: any  = await this.cl.photos.search({
      query: query
    }
    )
    return image.photos
  }
}
