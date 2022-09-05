<template>
    <div class="q-pa-md">
        <q-list bordered padding>
            <q-item>
                <q-item-section>
                    <q-item-label header> Your Info </q-item-label>
                    <q-btn icon="edit" push @click="edit">
                        Edit
                    </q-btn>
                    <div>
                        <q-item v-for="(value, name) in user" :key="name">
                            <q-item-section>
                                <q-item-label>
                                    {{name}} :
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input  v-model="text" :label="value" :readonly='editable' />
                            </q-item-section>
                        </q-item>
                        <q-btn label="Save changes" @click="save" />
                    </div>
                </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item-label header> General </q-item-label>
            <q-item clickable v-ripple @click="goSettings">
                <q-item-section>
                    <q-item-label> Content filtering </q-item-label>
                    <q-item-label caption> Change your content filtering level </q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
                <q-item-section>
                    <q-item-label> Password </q-item-label>
                    <q-item-label caption> Change your password </q-item-label>
                </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label> Notifications </q-item-label>
                    <q-item-label caption> Notify me about updates </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-toggle v-model="notification" color="blue" val="notif" />
                </q-item-section>
            </q-item>

        </q-list>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "UserDetails",
    data() {
        return {
            notification: ref(false),
            //user: $auth.user,
            editable: ref(false),
            text: ref(''),

        }
    },
    methods: {
      goSettings() {
          this.$router.push('/settings')
      },
      edit() {
          this.editable = true
      },
      save() {

      }
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    }
})
</script>
