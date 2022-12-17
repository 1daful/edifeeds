<template>
    <!--<section id="hero" v-if="site" :site="site">
        <div class="hero-container">
            <q-card class="myCard margin text-center">
                <q-img :src="bgImg" fit="full" class="myCard">
                    <div class="padding absolute-full text-h5 text-center">{{site.header.description}}</div>
                </q-img>
            </q-card>
            <h2>Start a great day with edificient stories, music, quotes and videos</h2>
            <h4>All from Edifeeds</h4>
            <div v-if="icons">
                <router-link v-for="icon in icons" :key="icon.name" :to="icon.path" class="btn-get-started">
                    <i :class="icon.icon" style="font-size: 26px"></i>
                </router-link>
            </div>
        </div>
    </section>-->
    <div>
        <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        >
        <q-carousel-slide :name="1" :img-src="bgImg">
            <div class="padding absolute-full custom-caption text-h5 text-center">{{site.header.description}}</div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" :img-src="bgImg">
            <div class="padding absolute-full custom-caption text-h5 text-center">{{site.header.description}}</div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" :img-src="bgImg">
            <div class="padding absolute-full custom-caption text-h5 text-center">{{site.header.description}}</div>
        </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
    name: 'SiteHero',
    setup () {
        return {
            slide: ref(1)
        }
    },
    computed: {
        icons() {
          let routes = this.$router.options.routes;
            let ics = [];
            for (const route of routes) {
                if(route.meta?.navigational&&route.meta.icon) {
                    ics.push(route);
                }
            }
            return ics
        },
        bgImg() {
          let url = this.site.header.bgImg;
          return url
        }
    },
    props: {
        site: {
            type: Object,
            required: true
        }
    }
})
</script>
<style scoped>
.myCard {
    /*width: 1000px;
    max-width:1000px;
    min-width: 230px;*/
    max-height: 400px;
}
.margin {
    /*margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%*/
    margin-bottom: 5%;
}
.custom-caption {
  color: white;
  background-color: rgba(0, 0, 0, .6)
}
.padding{
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 200px;
    padding-bottom: 15px;
}
</style>