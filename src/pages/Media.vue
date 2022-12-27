<template>
    <div class="text-h4 q-mb-md q-pa-md row media item-start q-gutter-md" :key="this.type">
        <template v-if="mediaItems.length > 0">
            <q-card class="col-2 myCard" v-for="mediaItem in mediaItems" :key="mediaItem.id">
                        <q-img :src="mediaItem[this.type].thumbnaillarge" spinner-color="white" style="height: 15em;">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-center bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>
                    <q-card-section>
                    <q-icon
                            v-if="mediaItem[this.type].icon==='library_add_checked'" class="absolute float z-top"
                            color="white"
                            :name="mediaItem[this.type].icon"
                            size="25px">
                        </q-icon>
                        <q-btn fab-mini color="primary" v-if="mediaItem[this.type].icon==='library_add_checked'" class="absolute innerfloat"></q-btn>
                        <q-btn
                        v-else
                        fab-mini
                        color="red"
                        :icon-right="mediaItem.quotes.icon"
                        class="absolute text-white"
                        ref="mediaItems"
                        style="top: 0; right: 10px; transform: translateY(-50%);"
                        @click="addToCollection(mediaItem)"
                        />
                      <router-link :to="{name: 'Media',
                      params: {id: mediaItem[this.type].id},
                      query: {mediaType: 'type'}
                      }">
                          <p class="text-weight-bold" style="font-size: 16px">{{mediaItem[this.type].title}}</p>
                          <q-item-label class="caption text-subtitle1">{{mediaItem[this.type].description?.slice(0, 110)}} <span v-if="mediaItem[this.type].description?.length > 180">...</span></q-item-label>
                              
                      </router-link>
                    </q-card-section>
                    <q-card-actions v-if="mediaItem.quotes.inserted">
                        <q-icon left name="schedule" class="text-weight-bold" size="19px" /> 
                        <span> {{mediaItem[this.type].inserted}}</span>
                    </q-card-actions>
            </q-card>
        </template>
        <div v-else>There is nothing here.</div>
    </div>
</template>

<script lang="ts">

import { Recommender } from "../api/Recommender";
import { defineComponent } from "vue";
import { Axiosi } from "../api/Axiosi";
import { auth } from "../api/auth/SupabaseAuth";
import { Repository } from "../model/Repository";
import { CollectionType, MediaType } from "../Types";

let recommender = new Recommender()
let mediaItems: any = []
let type: any
let client = new Axiosi()
//const repository = new Repository("collections")
const user = auth.startSession()

export default defineComponent({
    name: 'Media',
    data() {
        return{
            type,
            mediaItems,
            client,
            auth,
            //repository,
            user,
            //icon: "library_add"
            //icon: "category"
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
      async addToCollection(item: MediaType) {
        
          if (this.user) {
            let collectedItem: CollectionType = {
                id: "",
                userId: this.user.id,
                icon: "",
                type: item.type,
                mediaId: item.id
            }
            //Object.assign(collectedItem, item)
            const coll = item.type + "Collection"
              const repository = new Repository(coll)
              await repository.addItem(coll, collectedItem);
              item.icon = 'library_add_checked'
              //this.$refs.mediaItems[0] = 'schedule'
              //re.icon = 'library_add'
              //this.$refs[item.id].icon = 'schedule'
              //console.log("refs ", re)
          }
          else {
              //this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});

          }
      }
  },
    async mounted() {
        this.type = this.$route.params.type
          const coll = this.type + "Collection"
          const repository = new Repository(coll)
          //let items = await repository.readItems(coll)
          let collectedItems = await repository.readItems(coll, {key: "*", fColl: this.type, fKey1: `*`, fKey2: "userId"}, undefined, this.user?.id, 10)
          this.mediaItems = collectedItems
          console.log("items: ", mediaItems)
          console.log("type ", this.type)
    
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
</style>
