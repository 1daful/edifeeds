<template>
  <div>
    <!--<q-toolbar>
            <q-toolbar-title class="uppercase text-h6">
                {{mediaType}}
            </q-toolbar-title>
        </q-toolbar>-->
    <div class="q-pa-md media item-start q-gutter-md">
      <q-list>
        <q-item>
          <q-item-section v-for="mediaItem in mediaItems" :key="mediaItem.name"
            ><router-link
              :to="{
                name: 'SERPView',
                params: { type: mediaItem.name },
                query: { search: keyword },
              }"
            >
              {{ mediaItem.name }}</router-link
            ></q-item-section
          >
        </q-item>
      </q-list>
      <router-view :key="$route.fullPath"></router-view>
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
import { mediaItems } from "../model/Media";
import { CollectionType } from "../Types";

let recommender = new Recommender();
let mediaType: any;
let client = new Axiosi();
//const repository = new Repository("collections")
const user = auth.startSession();
//let url = "https://api.unsplash.com/photos/random?client_id=h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE&query="

export default defineComponent({
  name: "Media",
  data() {
    return {
      keyword: "",
      mediaItems,
      mediaType,
      client,
      auth,
      //repository,
      user,
      //icon: "library_add"
      //icon: "category"
      icon: "",
      coll: {},
      results: {
        books: [],
        quotes: [],
        videos: [],
        posts: [],
        music: [],
      },
    };
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
        let collectedItem: CollectionType = {
          id: "",
          userId: this.user.id,
          icon: "",
          type: item.type,
          mediaId: item.id,
        };
        Object.assign(collectedItem, item);
        const coll = item.type + "Collection";
        const repository = new Repository(coll);
        await repository.addItem(coll, collectedItem);
        let re = this.$refs.mediaItems;
        //this.$refs.mediaItems[0] = 'schedule'
        //re.icon = 'library_add'
        //this.$refs[item.id].icon = 'schedule'
        //console.log("refs ", re)
      } else {
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
    let p;
    this.keyword = this.$route.query.keyword || "";
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
.myCard {
  width: 100%;
  max-width: 250px;
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
.innerfloat {
  top: 0;
  left: 200px;
  right: 5px;
  transform: translateY(-50%);
}
</style>
