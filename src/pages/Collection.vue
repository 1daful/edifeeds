<template>

  <div class="q-pa-md">
    <div class="row item-start q-gutter-md">
    <q-list bordered padding class="rounded-borders text-primary col-3 gt-xs">
      <q-item  v-for="type in mediaItems" :key="type.name" :to="{name: 'Media', params: {type: type.name}}"
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
  <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Repository} from "../model/Repository";
import { Media } from "../model/Media";

let repository = new Repository("collections");
let mediaItems: Array<any> = Media

export default defineComponent({
    name: 'Collection',
    data() {
        return {
            leftDrawerOpen: true,
            link: ref('quotes'),
            repository,
            shown: true,
            mediaItems,
            
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
      this.$router.push({name: 'Media', params: {type: "quotes"}})
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