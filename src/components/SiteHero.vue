<template>
    <section id="hero" v-if="site" :site="site">
        <div class="hero-container">
            <span>{{site.header.description}}</span>
            <div v-if="icons">
                <router-link v-for="icon in icons" :key="icon.name" :to="icon.path" class="btn-get-started">
                    <i :class="icon.icon" style="font-size: 26px"></i>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'SiteHero',
    computed: {
        icons() {
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
    },
    props: {
        site: {
            type: Object,
            required: true
        }
    }
}
</script>