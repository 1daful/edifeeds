<template>
    <!--<div :bgImg="bgImg" class="q-pa-md" :style="{background: url(bgImg)}">-->
    <div class="q-pa-md justify-center item-center news">
        <p class="text-h4 text-weight-bold">Stay In The Loop</p>
        <p class=" text-h6">We would love to send you updates and important information. Subscribe to our newsletter below.</p>
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="email" label="Email"></q-input>
            <q-btn label="submit" type="submit" color="primary"></q-btn>
        </q-form>
    </div>
</template>

<script lang="ts">
import { Repository } from '../model/Repository';
import { defineComponent } from 'vue';
import { Axiosi } from "../api/Axiosi";
import { ListMonk } from '../api/Email/Listmonk';

const repo = new Repository("subscribers")
const emailProvider = new ListMonk()
const resource = emailProvider.subscriber
const client = new Axiosi(resource)

export default defineComponent({
    name: 'Newsletter',
    data() {
        return {
            email: '',
            repo,
            client
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
            async onSubmit() {
                const data = await this.client.post({
                    email: this.email,
                    status: "enabled",
                    list: [0]
                });
                this.repo.addItem({
                    email: this.email,
                    id: data[0].id

                })
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