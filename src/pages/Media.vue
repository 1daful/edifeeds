<template>
    <div class="text-h4 q-mb-md q-pa-md row media item-start q-gutter-md">
        <template v-if="mediaItems.length > 0">
            <q-card class="col-2 myCard" v-for="mediaItem in mediaItems" :key="mediaItem.id">
                        <q-img :src="mediaItem.doc.doc.thumbnailLarge" spinner-color="white" style="height: 15em;">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-center bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>
                    <q-card-section>

                      <q-btn
                        fab
                        color="primary"
                        :icon=mediaItem.icon
                        class="absolute text-white"
                        style="top: 0; right: 10px; transform: translateY(-50%);"
                        ref="mediaItems"
                        @click="addToCollection(mediaItem)"
                      />
                      <router-link :to="{name: 'Media',
                      params: {id: mediaItem.id},
                      query: {mediaType: type}
                      }">
                          <p class="text-weight-bold" style="font-size: 16px">{{mediaItem.doc.doc.title}}</p>
                          <q-item-label class="caption text-subtitle1">{{mediaItem.doc.doc.description?.slice(0, 110)}} <span v-if="mediaItem.doc.description?.length > 180">...</span></q-item-label>
                              
                      </router-link>
                    </q-card-section>
                    <q-card-actions v-if="mediaItem.doc.created">
                        <q-icon left name="schedule" class="text-weight-bold" size="19px" /> 
                        <span> {{mediaItem.doc.created}}</span>
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
import { NetworkLocal } from "../api/network";
import { auth } from "../api/auth/SupabaseAuth";
import { Repository } from "../model/Repository";
import { MediaType } from "../Types";

let recommender = new Recommender()
let mediaItems: any
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
          const coll = type + "Collection"
          const repository = new Repository(coll)
          let items = await repository.readItems()
          this.mediaItems = items.rows
          console.log("items: ", mediaItems)
    
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
