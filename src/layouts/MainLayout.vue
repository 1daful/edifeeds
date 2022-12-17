<template>
  <q-layout view="lHh Lpr lFf">
        <!-- ======= Header ======= -->
        <site-header></site-header>
        <!-- End Header -->

      <router-view />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SiteHeader from '../components/SiteHeader.vue';
//import SiteNav from '../components/SiteNav.vue'

  export default defineComponent({
    name: 'MainLayout',
    components: {
      SiteHeader,
      //SiteNav
    }
  })
</script>

<style scoped>
  a {
    text-decoration-line: none;
  }

  .header-link a {
    color: whitesmoke;
  }

  .header-link div {
    display: inline;
  }
  .router-link-active div {
    background:#e96711e5;
    /*background: #4b98db94;*/
    /*color: rgb(189, 187, 187)*/
  }
</style>