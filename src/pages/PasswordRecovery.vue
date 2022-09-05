<template>
<div>
    <q-form v-if="setPassword" @submit="onSubmit" class="q-gutter-md margin" ref="signUp">
        <q-input v-model="user.email" type="email" label="Enter your email address" lazy-rules :rules="rules.email"/>
        <q-btn @click="search"></q-btn>
    </q-form>

    <q-form v-if="type" @submit="onSubmit" class="q-gutter-md margin" ref="signUp">
        <q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>
        <q-input v-model="user.password" type="password" label="Enter your new password" lazy-rules :rules="rules.password"/>
    </q-form>
</div>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from "vue";

let user = {}
let token: URL
export default defineComponent({
    name: 'Auth',
    data() {
        return {
            auth,
             user: {
                email: "",
                password: ""
             },
             token,
             type: "",
             newPassword: "",
             setPassword: true,
             rules: {
              email: [
                (val: string|null) => (val !== null&&val !== '') || "Email is required",
                (val: string) => {
                  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(val) || "Please enter a valid email"
                }
            ],
            password: [
                (val: string|null) => (val !== null&&val !== '') || "Password is required",
                (val: string) => val.length > 6 || "Password too short",
                (val: string) => val.length < 129 || "Password too long"
            ]
            },
        }
    },
    props: {
        /*a_token: {
            type: String,
            required: true
        },*/
        accessToken: {
            type: String,
            required: true
        }
    },
    methods: {
        async onSubmit() {
            const { data, error } = await this.auth.updateUser(this.accessToken, this.user);
            this.$router.push("/signin")
        },
        search() {
            this.auth.getUser()
        }
    },
    mounted() {
        if( this.accessToken){
            this.token = new URL(this.accessToken)
            let params = this.token.searchParams
            this.type = params.get("type") || ""
            this.setPassword = false
        }
    }
})
</script>
