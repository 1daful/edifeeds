<template>
    <!--<q-page class="home container">-->
          <SiteHero v-if="site" :site="site"></SiteHero>
          <!--<Genres></Genres>-->
          <QOD></QOD>
          <MediaComponent v-if="pos" :pos="pos"></MediaComponent>
          <!--<Newsletter v-if="site" :bgImg="site.newsletter.bgImg"></Newsletter>-->
          <Newsletter></Newsletter>
    <!--</q-page>-->
</template>

<script lang="ts">
import { Meta } from '../components/models';
import { defineComponent, ref } from 'vue';
import Newsletter from "../components/Newsletter.vue";
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import SiteHero from "../components/SiteHero.vue";
import MediaComponent from "../components/MediaComponent.vue";
import QOD from "../components/QOD.vue";
import Genres from "../components/Genres.vue";
import site from '../../public/config.json';
import { auth } from "../api/auth/SupabaseAuth";

let pos = "main"

export default defineComponent({
  name: 'IndexPage',
  components: {
    SiteHero,
    MediaComponent,
    QOD,
    Newsletter,
    Genres
  },
  setup () {
    /*const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);*/
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return {
      site,
      pos,
      auth,
      meta };
  }
});
</script>
