<template>
    <!--<div :bgImg="bgImg" class="q-pa-md" :style="{background: url(bgImg)}">-->
    <div class="q-pa-md margin justify-center item-center news">
        <p class="text-h4 text-weight-bold">Stay In The Loop</p>
        <p class=" text-h6">We would love to send you updates and important information. Subscribe to our newsletter below.</p>
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="email" label="Email"></q-input>
            <q-btn label="submit" type="submit" color="primary"></q-btn>
        </q-form>
    </div>
</template>

<script lang="ts">
import { Repository } from '@/model/Repository';
import { defineComponent } from 'vue';

const repo = new Repository("subscriber)
export default defineComponent({
    name: 'Newsletter',
    data() {
        return {
            email: '',
            repo
        }
    },
    /*computed: {
          icon() {
            let routes = this.$router.options.routes;
              let ics = [];
              for (const route of routes) {
                  if(route.navigational&&route.icon) {
                      ics.push(route);
                  }
              }
              return ics
          },
          bgImg() {
            let url = this.site.header.bgImg;
            return url
          }
      },*/
      /*data() {
          text
      },*/
        /*props: {
            bgImg: {
                type: String,
                required: true
            }
        },*/
        methods: {
            onSubmit() {
              this.repo.addItem()
        }
    }
})
</script>

<style scoped>
    .news {
        margin-left: 30px;
        margin-right: 50px
    }
</style>