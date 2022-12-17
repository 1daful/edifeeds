<template>
    <div>
        <q-toolbar>
            <q-toolbar-title class="uppercase text-h6">
                {{mediaType}}
            </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md row media item-start q-gutter-md" v-if="media">

            <q-card class="col-2 myCard" v-for="mediaItem in media" :key="mediaItem.id">
                        <q-img :src="mediaItem.thumbnailLarge" spinner-color="white" style="height: 15em;">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-center bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>
                    <q-card-section v-if="mediaItem">
                        <q-icon
                            v-if="mediaItem.icon==='library_add_checked'" class="absolute float z-top"
                            color="white"
                            :name="mediaItem.icon"
                            size="25px">
                        </q-icon>
                        <q-btn fab-mini color="primary"
                            v-if="mediaItem.icon==='library_add_checked'" class="absolute innerfloat"></q-btn>
                        <q-btn
                        v-else
                        fab-mini
                        color="red"
                        :icon-right="mediaItem.icon"
                        class="absolute text-white"
                        ref="mediaItems"
                        style="top: 0; right: 10px; transform: translateY(-50%);"
                        @click="addToCollection(mediaItem)"
                        />

                        <router-link :to="{name: 'Media',
                        params: {id: mediaItem.id},
                        query: {mediaType: mediaType}
                        }">
                            <p class="text-weight-bold" style="font-size: 16px">{{mediaItem.title}}</p>
                            <q-item-label class="caption text-subtitle1">{{mediaItem.description?.slice(0, 110)}} <span v-if="mediaItem.description?.length > 180">...</span></q-item-label>
                                
                        </router-link>
                    <!--<q-card-actions>
                        <q-icon name="schedule_filled" class="text-weight-bold" size="19px" left/> <span> {{mediaItem.doc.created}}</span>
                    </q-card-actions>-->
                        <!--<b-button @click="addToCollection">
                            <b-icon :icon="collIcon">
                            </b-icon>
                        </b-button>-->
                        <!--<b-button @click="addToFavourites">
                            <b-icon :icon="favIcon">
                            </b-icon>
                        </b-button>-->
                    </q-card-section>
                    <q-card-actions>

                        <q-icon left name="schedule" class="text-weight-bold" size="19px" v-if="mediaItem.created"/> 
                        <span> {{mediaItem.created}}</span>
                    </q-card-actions>
            </q-card>
            </div>
        </div>
  <!--<router-link :to="{name: MediaList, params: {type: mediaItem.type}}"><p>See more</p></router-link>-->
</template>

<script lang="ts">

import { Recommender } from "../api/Recommender";
import { defineComponent } from "vue";
import { Axiosi } from "../api/Axiosi";
import { auth } from "../api/auth/SupabaseAuth";
import { Repository } from "../model/Repository";
import { MediaType } from "../Types";
import { Search } from "../api/Search/Search";

let recommender = new Recommender()
let media: any
let mediaType: any
let client = new Axiosi()
//const repository = new Repository("collections")
const user = auth.startSession()
//let url = "https://api.unsplash.com/photos/random?client_id=h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE&query="

export default defineComponent({
    name: 'Media',
    data() {
        return{
            media,
            mediaType,
            client,
            auth,
            //repository,
            user,
            //icon: "library_add"
            //icon: "category"
            icon: "",
            coll: {}
        }
    },
    props: {
      /*mediaType: {
          type: String,
          required: true
      }*/
      /*,
      db: {
          type: Object,
          required: true
      },
      auth: {
          type: Object,
          required: true
      }*/
  },
  methods: {
    /*async getImage(url: string, query: string) {
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
          //const images = await mediaApi.getItems('images')
         // const pexels = new Pexels({})
          //const images = await pexels.getPhotos('e')
         const image = await this.client.load(url + query)
          return image?.data.urls.regular
        //this.store.upload()*/
      async addToCollection(item: any) {
        
          if (this.user) {
            let collectedItem = {
                user_id: this.user.id,
                collected: false
            }
            Object.assign(collectedItem, item)
            const coll = item.type + "Collection"
              const repository = new Repository(coll)
              await repository.addItem(collectedItem);
              item.icon = 'library_add_checked'
              let re = this.$refs.mediaItems
              //this.$refs.mediaItems[0] = 'schedule'
              //re.icon = 'library_add'
              //this.$refs[item.id].icon = 'schedule'
              //console.log("refs ", re)
          }
          else {
              //this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});

          }
      },
      /*addToFavourites() {
          if (this.auth.startSession()) {
              let subPath = `${this.media.type}/${this.media.id}/favourites`;
              let item = {id: this.firAuth.currentUser};
              this.repository.setChild(subPath, item);
              this.icon = 'heart-fill'
          }
          else {
              this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
          }
      }*/
  },
    async mounted() {
        this.mediaType = this.$route.query.mediaType
        const keyword = this.$route.query.keyword || ""
        const search = new Search()
        let p = await search.search(this.mediaType, String(keyword))
        console.log("Serp: ", p)
      try {
      if (p) {
          const q = JSON.parse(JSON.stringify(p))
          const f = q.rows
          //Object.assign(this.media, f)
          this.media = p.hits
      this.media.forEach(async (element: any) => {
        element.icon = "library_add"
      });
      }
      }
      catch(error) {
          console.log(error)
      }
    },
})
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 300px
}
	.myCard {
    width: 100%;
    max-width:250px;
    min-width: 200px;
    }
    a {
    	color: black;
    	text-decoration: none;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .float {
        top: 0; 
        left: 230px; 
        right: 2px; 
        transform: translateY(-50%);
    }
    .innerfloat{
        
        top: 0; 
        left: 200px; 
        right: 5px; 
        transform: translateY(-50%);
    }
</style>
