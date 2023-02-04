<template>
  <div :key="mediaType">
    <q-card class="col-2 myCard" v-for="mediaItem in items" :key="mediaItem.id">
      <q-img :src="mediaItem.thumbnaillarge" spinner-color="white" style="height: 15em">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            <q-icon name="error" /> Cannot load image
          </div>
        </template>
      </q-img>
      <q-card-section v-if="mediaItem">
        <q-icon
          v-if="mediaItem.icon === 'library_add_checked'"
          class="absolute float z-top"
          color="white"
          :name="mediaItem.icon"
          size="25px"
        >
        </q-icon>
        <q-btn
          fab-mini
          color="primary"
          v-if="mediaItem.icon === 'library_add_checked'"
          class="absolute innerfloat"
        ></q-btn>
        <q-btn
          v-else
          fab-mini
          color="red"
          :icon-right="mediaItem.icon"
          class="absolute text-white"
          ref="mediaItems"
          style="top: 0; right: 10px; transform: translateY(-50%)"
          @click="addToCollection(mediaItem)"
        />

        <router-link
          :to="{
            name: 'Media',
            params: { id: mediaItem.id },
            query: { mediaType: mediaType },
          }"
        >
          <p class="text-weight-bold" style="font-size: 16px">{{ mediaItem.title }}</p>
          <q-item-label class="caption text-subtitle1"
            >{{ mediaItem.description?.slice(0, 110) }}
            <span v-if="mediaItem.description?.length > 180">...</span></q-item-label
          >
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
        <q-icon
          left
          name="schedule"
          class="text-weight-bold"
          size="19px"
          v-if="mediaItem.created"
        />
        <span> {{ mediaItem.created }}</span>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MediaType } from "../Types";
import { Search } from "../api/Search/Search";

export default defineComponent({
  data() {
    return {
      mediaType: "",
      items: [],
      keyword: "",
    };
  },
  async mounted() {
    this.mediaType = this.$route.params.type;
    this.keyword = this.$route.query.search;
    const search = new Search();
    //this.mediaItems.forEach(async (item) => {
    const p = await search.search(this.mediaType, String(this.keyword));
    this.items = p.hits;
    console.log("Algolia ", this.mediaType, this.items);
    //});
    try {
      if (p) {
        const q = JSON.parse(JSON.stringify(p));
        const f = q.rows;
        //Object.assign(this.media, f)
        //this.media = p.hits
        /*this.media.forEach(async (element: any) => {
        element.icon = "library_add"
      });*/
      }
    } catch (error) {
      console.log(error);
    }
    console.log("search results: ", this.items);
  },
});
</script>
