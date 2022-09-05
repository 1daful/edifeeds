<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
        <q-card id="profile-header">
            <h3> {{user.name}} </h3>
            <q-avatar @click="uploadPic">
              <q-img :src="user.picture" />
            </q-avatar>

          <q-tabs v-model="tab" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator class="text-grey">
              <q-tab name="details" label="details">
              </q-tab>
              <q-tab name="collection" label="Collection">
              </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="collection">
              <Collection></Collection>
            </q-tab-panel>
            <q-tab-panel name="details">
              <user-details :user="user"></user-details>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import Collection from "../components/Collection.vue";
import UserDetails from '../components/UserDetails.vue';
import { auth } from "../api/auth/SupabaseAuth"
import { defineComponent } from 'vue';

let userInfo = auth.startSession()
export default defineComponent({
  name: 'Profile',
  data() {
    return {
    auth,
    tab: 'collection',
    user: {
      name: userInfo?.user_metadata.user_name || "User",
      picture: userInfo?.user_metadata.picture || "W"
    }
    }
  },
  components: {
     Collection,
     UserDetails
  },
  mounted() {
    console.log("user: ", this.user)
  },
  methods: {
  	uploadPic() {}
  }
})
</script>
