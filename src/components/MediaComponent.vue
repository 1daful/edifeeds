<template>
  <div class="q-pa-md media">
    <Section v-for="sectionItem in sections" :key="sectionItem.pos" :sect="sectionItem" :pos="pos">
    </Section>
  </div>
</template>

<script lang="ts">
import Section from "../components/Section.vue";
//import { Recommender } from '../api/Recommender';
import { defineComponent } from "vue";

//let recommender = new Recommender();
//let section: any[]

export default defineComponent({
  name: 'MediaComponent',
  data() {
    return {
      sections: [
          {
              name: 'recommended',
              mediaList: [{}],
              pos: 'main',
              id: ""
          },
          {
              name: 'top',
              mediaList: [{}],
              pos: 'main',
              id: ""
          },
          {
              name: 'ever-green',
              mediaList: [{}],
              pos: 'main',
              id: ""
          },
          {
            name: 'related',
            mediaList: [{}],
            pos: 'sidebar',
            id: ""
          },
          {
            name: 'sameAuthor',
            mediaList: [({})],
            pos: 'sidebar',
            id: ""
          },
          {
            name: 'top',
            mediaList: [{}],
            pos: 'sidebar',
            id: ""
          },
        ],

    }
  },
  props: {
    pos: {
      type: String,
      required: true
    }
  },

    /*methods: {
      async section() {
    
    for (const section of this.sections) {
      if (this.pos == "main" && section.pos =="main") {
        section.id = section.pos + section.name
        section.mediaList = await recommender.readMedia(section.name)
        console.log("section.mediaList: ", section.mediaList)
        console.log("this.section: ", this.sections)
      }
      else if (this.pos == "sidebar" && section.pos == "sidebar") {
        recommender.readMedia(section.name).then(list => {
          section.mediaList = list
        })
      }
    }
    console.log("sections: ", this.sections)
      }
    },
    async mounted() {
      await recommender.getMedia()
      await this.section()
    },*/

    components: {
      Section
    }
})
</script>