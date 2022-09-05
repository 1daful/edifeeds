<template>
    <!--<div :bgImg="bgImg" class="q-pa-md" :style="{background: url(bgImg)}">-->
    <div>
        <p>We would love to send you updates and important information. Subscribe to our newsletter below.</p>
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="email" label="Email"></q-input>
            <q-btn label="submit" type="submit" color="primary"></q-btn>
        </q-form>
    </div>
</template>

<script>
export default {
    name: 'Newsletter',
    data() {
        return {
            email: ''
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
              
        }
    }
}
</script>