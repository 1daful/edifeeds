<template>

  <div class="q-pa-md">
    <div class="row item-start q-gutter-md">
    <q-list bordered padding class="rounded-borders text-primary col-3 gt-xs">
      <q-item  v-for="type in mediaTypes" :key="type.name" :to="{name: 'Media', query: {type: type.name}}"
        clickable
        v-ripple
        :active="link === type.name"
        @click="link = type.name"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon :name="type.icon" />
        </q-item-section>

        <q-item-section>{{type.name}}</q-item-section>
      </q-item>
    </q-list>

      <div class="col-7">
  <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Repository} from "../model/Repository";
//import Media from "../components/Media.vue";
//import MediaComponent from "./MediaComponent.vue";

let repository = new Repository("collections");
//let mediaItems: Array<any> = []

export default defineComponent({
    name: 'Collection',
    data() {
        return {
            leftDrawerOpen: true,
            link: ref('quotes'),
            repository,
            shown: true,
            mediaItems: [
              {
                  items: [],
                  type: "quotes"
              },
              {
                  items: [],
                  type: "books"
              },
              {
                  items: [],
                  type: "music"
              },
              {
                  items: [],
                  type: "videos"
              }
            ],
            mediaTypes: [
              {
                name: 'quotes', 
                icon: "format_quote"
              }, 
              {
                name: 'books',
                icon: "menu_book"
              }, {
                name: 'music',
                icon: "music_note"
              }, {
                name: 'videos',
                icon: "movie"
              }
            ],
            
      tab: ref('mails'),
      splitterModel: ref(20)
        }
    },
    components: {
    },
    methods: {
      toggleLeftDrawer () {
        this.leftDrawerOpen = !this.leftDrawerOpen
      }
    },
    /*computed: {
        tab() {
            let tab
            (mediaItems.forEach(element => {
                tab = element.name
            }
        ))
        }
    }
    props: {
        mediaItems: Array
    }*/
    mounted() {
      this.$router.push({name: 'Media', query: {type: "quotes"}})
        //this.mediaItems = items.rows
        //console.log("items: ", this.mediaItems)
    }
})
</script>

<style scoped>
.my-menu-link {
  color: white;
  background: blue
}

</style>