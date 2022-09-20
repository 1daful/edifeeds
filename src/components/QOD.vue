<template>
    <section v-if="quote" class="row margin"  id="qod">
        <q-img :src="quote.thumbnailSmall" spinner-color="whitesmoke" class="rounded-borders col-6">
            <q-item-label class="absolute-full text-subtitle2 flex flex-center">{{quote.description}}</q-item-label>
            <q-icon name="format_quote"></q-icon>
        </q-img>
        <q-avatar class="margin" size="200px">
            <p v-for="author in quote.authors" :key="author.name">{{author.name}}</p>
            <q-img :src="quote.thumbnailSmall" spinner-color="whitesmoke" class="col-6" />
        </q-avatar>
    </section>
</template>

<script lang="ts">
import { QuoteMedia } from "../media/QuoteMedia";

import { defineComponent } from 'vue';
import { MediaType } from "../Types";
//import { Axiosi } from "../api/Axiosi";

let quoteMedia = new QuoteMedia("quote");
let quote: MediaType
//let thumbnail: string
//let client = new Axiosi()
export default defineComponent ({
    name: 'QOD',
    data() {
        return{
            quote,
            //thumbnail,
            //client,
        }
    },
    /*methods: {
        async getImage(url: string, query: string) {
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
          //const images = await mediaApi.getItems('images')
         // const pexels = new Pexels({})
          //const images = await pexels.getPhotos('e')
         const image = await this.client.load(url + query)
          return image?.data.urls.regular
        //this.store.upload()
    }
    },*/
    /*computed: {
          icon() {
            let routes = this.$router.options.routes;
              let ics = [];
              for (const route of routes) {
                  if(route.navigational&&route.icon) {
                      ics.push(route);
                  }
              }
              return ics
          },
          bgImg() {
            let url = this.site.header.bgImg;
            return url
          }
      },*/
      async created() {
          await quoteMedia.getMedia()
          const f = await quoteMedia.readMedia([], {limit: 2})
          console.log("f: ", f)
          const q = JSON.parse(JSON.stringify(f))
          console.log("q: ", q)
          let w
          if (q) w = q.rows
          let p
          if (w) p = w[0]
          //const t = JSON.parse(JSON.stringify(p))
          this.quote = p?.doc;
          //this.thumbnail = await quoteMedia.getImage(this.quote.description)
          console.log("In QOD: ", this.quote)
          //console.log("In thumbni: ", this.thumbnail)
      },
      /*props: {
          bgImg: {
              type: String,
              required: true
          }
      }*/
})
</script>
<style scoped>
	.margin {
    margin-left: 10%
  }
</style>
