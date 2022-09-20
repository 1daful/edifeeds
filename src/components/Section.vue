<template>
    <div :section= "section">
        <div class="q-pa-md">
                <h5 class="capitalize text-weight-bold">
                    {{section.name}}
                </h5>
                <Media v-for="mediaType in mediaTypes" :key="mediaType" :mediaType="mediaType"></Media>
        </div>
    </div>
</template>

<script lang="ts">
//import { Recommender } from '@/api/Recommender';
import { defineComponent } from 'vue';
import Media from './Media.vue';

export default defineComponent({
    name: 'Section',
    data() {
      return {
        mediaTypes:[
          "quotes",
          "videos",
          "music",
          "books"
        ],
        section: this.sect
      }
    },
    props: {
        pos: {
            type: String,
            required: true
        },
        sect: {
            type: Object,
            required: true
        }
    },
    methods: {
      async sections() {
      if (this.pos == "main" && this.section.pos =="main") {
        this.section.id = this.section.pos + this.section.name
      }
      /*else if (this.pos == "sidebar" && this.section.pos == "sidebar") {
        recommender.readMedia(this.section.name).then(list => {
          this.section.mediaList = list
        })
      }*/
      }
    },
    async mounted() {
      await this.sections()
    },
    components: {
        Media
    }
})
</script>
<style>
	.capitalize {
    text-transform: capitalize;
  }
</style>
