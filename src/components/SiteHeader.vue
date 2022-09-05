<template>
  <div>
        <!-- ======= Header ======= -->

    <q-header elevated reveal>
      <q-toolbar class="header-link text-h5 text-weight-bold">
        <a :href="site.baseUrl">
        <img class="ml-2" height="30" alt="Company logo" src="/logo.png" />
        <q-item>
          {{site.title}}

        </q-item>
        </a>
        <div q-pa-md class="action-buttons ml-auto gt-xs header-link" >
          <!--<q-btn flat >-->
          <router-link v-for="menu in menus" :key="menu.name" :to="menu.path" class="text-h6">
            <q-item clickable>
            {{menu.name}}
            </q-item>
          </router-link>
          <!--</q-btn>-->
        </div>

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
          <!--<div>Quasar v{{ $q.version }}</div>-->
    <q-item v-if="!user">
      <q-btn flat @click.prevent="login" label="Login"></q-btn>
      <q-btn flat @click.prevent="signup" label="Sign up"></q-btn>
    </q-item>
    <q-item v-if="user">
      <q-item-section>
        <q-avatar>
          <q-img v-if="user.picture" :src="user.picture" />
          <q-item-label v-else >{{user.name?.charAt(0).toUpperCase}}</q-item-label>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{user.name}}</q-item-label>-->
        <q-item-label caption> See profile information </q-item-label>
      </q-item-section>
    </q-item>
  </q-toolbar>
    </q-header>
        <!-- End Header -->

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { auth} from "../api/auth/SupabaseAuth";

let userInfo = auth.startSession()

export default defineComponent({
    name: 'SiteHeader',

  setup (props) {
    return {
      leftDrawerOpen: ref(false),
      props,
      user: ref(
        {
          name: userInfo?.user_metadata.name,
          picture: userInfo?.user_metadata.pic
        }
      )
    }
  },

  computed: {
      menus() {
          let menus = [];
          let routes = this.$router.options.routes
          for (let route of routes) {
              if(route.meta?.navigational){
                  menus.push(route);
              }
          }
          return menus
      }
  },
  methods: {
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
    },
    /*logout() {
      this.auth.logout();
      this.$router.push({ path: "/" });
    }*/
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
