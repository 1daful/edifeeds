<template>
  <div>
    <q-page class="home container">
          <SiteHero v-if="site" :site="site"></SiteHero>
          <Genres></Genres>
          <QOD></QOD>
          <!--<MediaComponent v-if="pos" pos="main"></MediaComponent>-->
          <!--<Newsletter v-if="site" :bgImg="site.newsletter.bgImg"></Newsletter>-->
          <Newsletter></Newsletter>
    </q-page>
  </div>
</template>

<script lang="ts">
  //import config from "../../public/config.json"
import { defineComponent } from 'vue';
import Newsletter from "../components/Newsletter.vue";
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Axiosi } from "../api/Axiosi";
import SiteHero from "../components/SiteHero.vue";
import MediaComponent from "../components/MediaComponent.vue";
import QOD from "../components/QOD.vue";
import Genres from "../components/Genres.vue";
import { auth } from "../api/auth/SupabaseAuth";

let client = new Axiosi();
let site: Object;

export default defineComponent({
  name: 'Home',
  data() {
        return {
            site,
            auth,
            loading: true
        }
    },
    components: {
      SiteHero,
      QOD,
      MediaComponent,
      Newsletter,
      Genres
    },
    mounted() {
        client.load("../config.json").then(resp => {
            if (resp) this.site = resp.data
        })
        const sess = this.auth.startSession()
        console.log("sess: ", sess)
    }
})
</script>