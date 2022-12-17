<template>
    <div class="q-pa-md">
        <q-list bordered padding>
            <q-item v-if="user">
                <q-item-section>
                    <q-item-label header> Personal Information </q-item-label>
                    <q-btn icon="edit" color="primary" push @click="edit">
                        Edit
                    </q-btn>
                    <div>
                        <q-item v-for="(value, name) in user" :key="name">
                            <q-item-section v-if="isString(value)">
                                <q-item-label>
                                    {{name}} :
                                </q-item-label>
                            </q-item-section>
                            <q-item-section v-if="isString(value)">
                                <q-input  v-model="userValues[name]" outlined :label="value" :readonly='notEditable' />
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    email :
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-h5">
                                    {{user.email}}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-btn push color="primary" to="/reset/setEmail">Change email</q-btn>
                            </q-item-section>
                        </q-item>
                        <q-btn color="primary" push label="Save changes" @click="save" :loading="loading" :disable="notEditable"/>
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
            <q-item clickable v-ripple to="/reset/setPassword">
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
    <q-dialog v-model="alert" no-backdrop-dismiss>
        <q-card style="min-width: 350px;">
            <q-card-section>
                <div> {{this.error}} </div>
            </q-card-section>
            <q-card-actions>
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent, ref } from 'vue';
import { UserAttributes } from "@supabase/supabase-js";
let user: any
let userValues: UserAttributes = {
    email: "",
    password: "",
    data: {}
}

export default defineComponent({
    name: "UserDetails",
    data() {
        return {
            notification: ref(false),
            user,
            notEditable: ref(true),
            userValues,
            auth,
            loading: false,
            error: "",
            alert: false
        }
    },
    mounted() {
        this.user = JSON.parse(this.$route.query.user)
    },
    methods: {
        promt() {
            alert("Hey")
        },
      goSettings() {
          this.$router.push('/settings')
      },
      edit() {
          this.notEditable = false
      },
      async save() {
        this.loading = true
        const { data, error } = await this.auth.updateUser(userValues)
        if (error) {
            this.error = error.message
            this.alert = true
        }
        this.loading = false
      },
      
    isString(value: any) {
        if(typeof(value)==='string') return true
    }
    },
    /*props: {
      user: {
        type: Object,
        required: true
      }
    }*/
})
</script>
