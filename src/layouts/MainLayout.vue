<template>
  <q-layout view="lHh Lpr lFf">
        <!-- ======= Header ======= -->

    <q-header elevated reveal>
      <q-toolbar class="header-link text-h5 text-weight-bold justify-between">
        <a :href="site.baseUrl">
        <img class="ml-2" height="30" alt="Company logo" src="/logo.png" />
        <q-item class="self-center">
          {{site.title}}

        </q-item>
        </a>
        <div q-pa-md class="action-buttons ml-auto gt-xs header-link" >
          <!--<q-btn flat >-->
          <router-link v-for="menu in menus" :key="menu.name" :to="menu.path" class="text-h6">
            <q-btn flat>
            {{menu.name}}
            </q-btn>
          </router-link>
          <!--</q-btn>-->
        </div>

          <!--<div>Quasar v{{ $q.version }}</div>-->

          <q-input type="search" filled dense bg-color="white" v-show="showSearch" v-model="search"/>
          <q-btn flat icon="search" dense @click="toggleSearch"></q-btn>
    <div class="row justify-end" v-if="!userInfo">
      <q-btn flat size="lg"><router-link to="/signin">Sign in</router-link></q-btn>
      <q-btn flat size="lg"><router-link to="/signup">Sign up</router-link></q-btn>
    </div>
    <q-item v-if="userInfo">
      <q-item-section>
        <q-avatar>
          <q-img v-if="user.picture" :src="user.picture" />
          <q-item-label v-else >{{user.name?.charAt(0).toUpperCase}}</q-item-label>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{user.name}}</q-item-label>
        <!--<q-item-label caption> See profile information </q-item-label>-->
      </q-item-section>
    </q-item>
        <div class="row justify-end">
          <div class="col-7 lt-sm" >
            <q-btn
              flat
              dense
              round
              @click="leftDrawerOpen = !leftDrawerOpen"
              aria-label="Menu"
              icon="menu">
              <q-popup-proxy class="lt-sm" :breakpoint="100">
                <q-list separator padding class="menu-panel">
                  <router-link class="link" v-for="menu in menus" :key="menu.name" :to="menu.path">
                    <q-item clickable tag="a">
                      <q-item-label class="text-subtitle1 text-weight-bold">{{menu.name}}</q-item-label>
                    </q-item>
                  </router-link>
                </q-list>
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>

  </q-toolbar>
    </q-header>
        <!-- End Header -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { auth} from "../api/auth/SupabaseAuth";
import site from '../../public/config.json';
//import Serp from "../components/Search.vue"
//import { Typesense } from 'src/typesense';

let userInfo = auth.startSession()
//import EssentialLink from 'components/EssentialLink.vue';

/*const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];*/

export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  computed: {
      menus() {
          let menus: any[] = [];
          let routes = this.$router.options.routes
          for (let route of routes) {
              if(route.children){
                route.children.forEach(child => {
                  if(child.meta?.navigational)
                  menus.push(child);
                });
              }
          }
          return menus
      }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const showSearch = ref(false)
    const search = ref('')
    //const typesense = new Typesense()
    /*function searchQuery() {
      typesense.search(search.value)
    }*/

    return {
      //typesense,
      userInfo,
      search,
      showSearch,
      leftDrawerOpen,
      toggleSearch() {
        showSearch.value = !showSearch.value
        /*if(showSearch.value) {
          searchQuery()
        }*/
      },
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user: ref(
        {
          name: userInfo?.user_metadata.name,
          picture: userInfo?.user_metadata.pic
        }
      ),
      site
    }
  },
  /*methods: {
    searchQuery() {
    },
    signup() {
      this.$router.push({
        name: "SignUp"
      }
      )
    },
    login() {
      this.$router.push({
        name: "SignIn"
      });
    },*/
    /*logout() {
      this.auth.logout();
      this.$router.push({ path: "/" });
    }
  }*/
});

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
    /*background:#195a926c;*/
    background: #4b98db94;
    color: rgb(189, 187, 187)
  }
</style>
