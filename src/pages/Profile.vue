<template>
  <div class="q-pa-md">
    <!--<div class="q-gutter-y-md">-->
        <!--<q-card id="profile-header">-->
        <q-item>
          <q-item-section>
            <h3> {{user.name}} </h3>
          </q-item-section>
          <q-item-section>
            <q-avatar v-if="user.picture.name" size="70px" color="primary" text-color="white" @click="uploadPic">
              <q-img :src="user.picture.name" />
            </q-avatar>
            <q-avatar v-else size="70px" color="primary" text-color="white" @click="uploadPic">
              {{user.name?.charAt(0).toUpperCase()}}
            </q-avatar>
        </q-item-section>
        </q-item>

      <q-toolbar class="header text-h5 text-weight-bold justify-between">
        <div q-pa-md class="action-buttons ml-auto header-link" >
          <!--<q-btn flat >-->
          <router-link v-for="menu in menus" :key="menu" :to="{
              name:menu,
              query: {user: userString}
            }" class="text-h6 text-weight-bolder">
            <q-btn flat>
            {{menu}}
            </q-btn>
          </router-link>
          <!--</q-btn>-->
        </div>
          <!--<div>Quasar v{{ $q.version }}</div>-->
        <!--<q-item-label caption> See profile information </q-item-label>-->
  </q-toolbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Collection from "./Collection.vue";
import UserDetails from './UserDetails.vue';
import { auth } from "../api/auth/SupabaseAuth"
import { defineComponent } from 'vue';

let userInfo = auth.startSession()
let userString: any
let initial: any
export default defineComponent({
  name: 'Profile',
  data() {
    return {
      auth,
      initial,
      tab: 'collection',
      userString,
      user: {
        name: userInfo?.user_metadata.name,
        picture: {
          name: userInfo?.user_metadata.pic,
        },
        email: userInfo?.email,
        contact: userInfo?.user_metadata.contact,
        description: userInfo?.user_metadata.description,
      },
      menus: ['Collection', 'Details']
    }
  },
  components: {
     Collection,
     UserDetails
  },
  created() {
    console.log("user: ", this.user)
    this.userString = JSON.stringify(this.user)
    this.initial= this.user.name?.charAt(0).toUpperCase()
    this.$router.push({
              name: "Collection",
              query: {user: this.userString}
            })
  },
  methods: {
  	uploadPic() {
      this.$router.push("/upload")
    }
  }
})
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
  .outline:hover {
    border-style: solid;
    border-width: 1px;
    border-color: blue;
  }
</style>