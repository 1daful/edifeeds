<template>
        <!-- ======= Header ======= -->
  <q-header elevated reveal bordered class="bg-white">
      <q-toolbar class="header text-h5 text-weight-bold justify-between">
        <a :href="site.baseUrl">
        <img class="ml-2" height="30" alt="Company logo" src="/logo.png" />
        <q-item class="self-center" color="primary">
          {{site.title}}

        </q-item>
        </a>
        <div q-pa-md class="action-buttons ml-auto gt-sm header-link" >
          <!--<q-btn flat >-->
          <router-link v-for="menu in menus" :key="menu.name" :to="menu.path" class="text-h6 text-weight-bolder">
            <q-btn flat>
            {{menu.name}}
            </q-btn>
          </router-link>
          <!--</q-btn>-->
        </div>

          <!--<div>Quasar v{{ $q.version }}</div>-->

          <q-input @keyup.enter="doSearch" color="black" label="Search" class="q-ml-md ml-auto gt-sm text-black" type="search" outlined rounded standout dense v-model="search">
            <template v-slot:append>
              <q-icon v-if="search" name="clear" class="cursor-pointer" @click="search=''"></q-icon>
            </template>
          </q-input>
    <div class="row justify-end q-ml-md ml-auto gt-sm" v-if="!userInfo">
      <q-btn dense size="17px" outline class="outline rounded-borders q-ma-sm"  color="primary" :to="{name: 'SignIn', params: {myUrl: '/home'}}"> Sign in </q-btn>
      <q-btn dense glossy size="17px" color="primary" to="/signup">Sign up</q-btn>
    </div>

        <q-avatar v-if="userInfo" class="text-primary">
          <img v-if="user.picture" :src="user.picture" />
          <span v-else >{{user.name?.charAt(0).toUpperCase}}</span>
        </q-avatar>
      
        <q-item-label class="text-primary">{{user.name}}</q-item-label>


      <q-btn v-if="userInfo" color="primary" dense push size="17px" @click="signout">Sign out</q-btn>
        
        <!--<q-item-label caption> See profile information </q-item-label>-->
    
        <div class="row justify-end">
          <div class="col-7 lt-md q-ml-md">
            <q-btn
            size="20px"
              color="primary"
              flat
              dense
              round
              @click="leftDrawerOpen = !leftDrawerOpen"
              aria-label="Menu"
              icon="menu">
              <!--<q-popup-proxy class="lt-sm" :breakpoint="100" bg-color="blue">
                <q-list separator padding class="menu-panel">
                  <router-link class="link" v-for="menu in menus" :key="menu.name" :to="menu.path">
                    <q-item clickable tag="a">
                      <q-item-label class="text-subtitle1 text-weight-bold">{{menu.name}}</q-item-label>
                    </q-item>
                  </router-link>
                  <q-input class="q-ml-md" type="search" standout dense v-model="search">
                    <template v-slot:append>
                      <q-icon v-if="search" name="clear" class="cursor-pointer" @click="search=''"></q-icon>
                      <q-btn color="primary" icon="search" class="cursor-pointer" @click="doSearch"></q-btn>
                    </template>
                  </q-input>
                </q-list>
              </q-popup-proxy>-->
            </q-btn>
          </div>
        </div>

      </q-toolbar>
    </q-header>
        <!-- End Header -->

        <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      :show-if-above="false"
      bordered
      class="bg-grey-2 q-pa-sm"
      :breakpoint="500"
    >
      <q-list padding>
        <q-btn icon="close" @click="leftDrawerOpen = !leftDrawerOpen" color="red"></q-btn>
        <router-link v-for="menu in menus" :key="menu.name" :to="menu.path">
        <q-item clickable tag="a">
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{menu.name}}</q-item-label>
          </q-item-section>
        </q-item>
        </router-link>
        <div v-if="!userInfo">
      <q-btn class="q-ma-sm" color="primary" size="12px" to="/signin">Sign in</q-btn>
      <q-btn color="primary" size="12px" to="/signup">Sign up</q-btn>
    </div>
        <q-input rounded dense outlined class="q-ml-md" type="search" standout v-model="search">
          <template v-slot:append>
            <q-icon v-if="search" name="clear" class="cursor-pointer" @click="search=''"></q-icon>
            <q-icon color="primary" size="lg" name="search" class="cursor-pointer" @click="doSearch"></q-icon>
          </template>
        </q-input>
      </q-list>
    </q-drawer>

</template>


<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { auth} from "../api/auth/SupabaseAuth";
  import site from '../../public/config.json';
  import { useRouter } from 'vue-router';
  //import Serp from "../components/Search.vue"
  //import { Typesense } from 'src/typesense';
  
  let userInfo = auth.startSession()
  //const eauth = auth
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
    name: 'SiteHeader',
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
    setup() {
      const leftDrawerOpen = ref(false)
      const showSearch = ref(false)
      const search = ref('')
      const router = useRouter()
      
      //const typesense = new Typesense()
      /*function searchQuery() {
        typesense.search(search.value)
      }*/
  
      return {
        //typesense,
        auth,
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
        doSearch(){
          router.push({
            name: "Search", 
            query: {keyword: search.value, mediaType: "quotes"}
          })
        },
      /*signout() {
        this.auth.logout();
        windows.location.reload()
        this.$router.push({ path: "/" });
      },*/
  
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
    methods: {
      /*searchQuery() {
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
      signout() {
        this.auth.logout();
        window.location.href = "http://localhost:9000"
        //this.$router.push({ path: "/" });
      }
    }
  });
  
  </script>

<style scoped>
  a {
    text-decoration-line: none;
  }

  .header-link a {
    color: black;
    /*font-weight: bold;*/
  }

  .header div {
    display: inline;
  }
  .router-link-active button {
    background:#00080fc9;
    /*background: #4b98db94; #ddd, gainsboro, #f7f7f7, dodgerblue, #f97300, aqua, cornflowerblue*
    background:#e96711e5;
    color: rgb(189, 187, 187)*/
    color: white
  }
  /*.outline:hover {
    border-style: solid;
    border-width: 1px;
    border-color: blue;
  }*/

  .btn-color {
    background: rgb(55, 25, 112)
  }
</style>
