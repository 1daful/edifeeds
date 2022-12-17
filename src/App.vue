<template>
<!--<SiteHeader></SiteHeader>-->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SiteHeader from "../src/components/SiteHeader.vue"

export default defineComponent({
  name: 'App',
  components: {
    SiteHeader
  }
});
</script>
<style>
  body {
    background-color: rgb(250, 250, 250);
     /*background-color:rgba(231, 232, 243)*/
  }
</style>
