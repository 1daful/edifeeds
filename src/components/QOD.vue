<template>
    <section v-if="quote" class="margin"  id="qod">
        <div><h4 class="capitalize text-weight-bold">
            Quote  of the day
        </h4></div>
        <q-img :src="quote.thumbnailsmall" spinner-color="whitesmoke" class="rounded-borders q-ma-auto" height="300px">
            <q-item-label class="absolute-full text-subtitle2 flex flex-center">{{quote.description}}</q-item-label>
            <q-icon name="format_quote"></q-icon>
        </q-img>
        <!--<q-avatar size="200px">
            <p v-for="author in quote.authors" :key="author.name">{{author.name}}</p>
            <q-img :src="quote.thumbnailSmall" spinner-color="whitesmoke" class="col-6" />
        </q-avatar>-->
    </section>
    <q-skeleton height="200px" square v-show="loading" class="margin" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MediaType } from "../Types";
import { Media } from "../media/Media";
//import { Axiosi } from "../api/Axiosi";

let media = new Media("quotes");
let quote: MediaType
//let thumbnail: string
//let client = new Axiosi()
export default defineComponent ({
    name: 'QOD',
    data() {
        return{
            quote,
            loading: true
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
          //await media.fetch("quotes")
          const f = await media.readItems("quotes", {}, "", 2)
          //console.log("f: ", f)
          /*const q = JSON.parse(JSON.stringify(f))
          //console.log("q: ", q)
          let w
          if (q) w = q.rows
          let p
          if (w) p = w[0]*/
          //const t = JSON.parse(JSON.stringify(p))
          if (f) this.quote = f[0];
          //this.thumbnail = await quoteMedia.getImage(this.quote.description)
          this.loading = false
          //console.log("In QOD: ", this.quote)
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
        margin-top: 1%;
    margin-left: 10%;
    margin-right: 10%
  }
</style>
