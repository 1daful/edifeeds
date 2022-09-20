<template>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <router-link v-for="menu in menus" :key="menu.name" :to="menu.path">
        <q-item clickable tag="a">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{menu.name}}</q-item-label>
          </q-item-section>
        </q-item>
        </router-link>
      </q-list>
    </q-drawer>

  <!--<q-toolbar v-if="!$auth.isAuthenticated && !$auth.loading">
    <q-btn @click.prevent="login" label="Login"></q-btn>
    <q-btn @click.prevent="signup" label="Sign up"></q-btn>
    <q-item v-if="$auth.isAuthenticated">
      <q-item-section>
        <q-avatar>
          <q-img v-if="$auth.user.picture" :src="$auth.user.picture" />
          <q-item-label v-else >{{$auth.user.name.charAt(0).toUpperCase}}</q-item-label>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{$auth.user.name}}</q-item-label>
        <q-item-label caption> See profile information </q-item-label>
      </q-item-section>
    </q-item>
  </q-toolbar>-->
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SiteNav',
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  computed: {
    menus() {
      let menus = [];
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
    },
  },
  /*methods: {
    signup() {
      this.$auth.signup();
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }*/
}
</script>