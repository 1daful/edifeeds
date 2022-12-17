<template>
<div>
    <q-form v-if="setPassword" class="q-gutter-md margin" ref="passwordRef">
        <q-item-label>Enter your registered email address.</q-item-label>
        <q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>
        <q-btn @click="reset">Reset Password</q-btn>
    </q-form>
    <q-form v-else-if="setEmail" class="q-gutter-md margin" ref="emailRef">
        <q-item-label>Enter your new email address.</q-item-label>
        <q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>
        <q-btn @click="update(user.email)">Change Email</q-btn>
    </q-form>
    <q-item-label v-if="requestedLink">A verification link has been sent to your inbox. If you can't find it, please check your spam box or request a new verification link.</q-item-label>
    <q-item-label v-else-if="errors.message">{{errors.message}}</q-item-label>
</div>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from "vue";

//let user = {}
let token: URL
export default defineComponent({
    name: 'Reset',
    data() {
        return {
            auth,
             user: {
                email: "",
                password: ""
             },
             //token,
             //type: "",
             //newPassword: "",
             requestedLink: false,
             //verifyEmail: false,
             setPassword: false,
             setEmail: false,
             errors: {
                status: 0,
                message: ""
             },
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
        /*accessToken: {
            type: String,
            required: false
        },*/

        /*setEmail: {
            type: Boolean,
            required: false
        },
        setPassword: {
            type: Boolean,
            required: false
        }*/
    },
    methods: {
        async update(data: string) {
            const { user, error } = await this.auth.updateCred(data);

            if (error) {
                this.errors = error
            }
            else {
                //await this.auth.logout()
                this.requestedLink = true
            }
        },
        async reset() {
            
                /*const { data, error } = await this.auth.resetPassword(this.user.email, password)
                if (error) {
                    this.errors = error
                }
                else {
                    await this.auth.logout()
                    this.$router.push("/verification")
                }*/
            
            const { data, error } = await this.auth.resetPassword(this.user.email)
            if (error) {
                this.errors = error
            }
            else {
                //await this.auth.logout()
                this.requestedLink = true
            }
        }
    },
    mounted() {
        /*if( this.accessToken){
            this.token = new URL(this.accessToken)
            let params = this.token.searchParams
            this.type = params.get("type") || ""
            this.setPassword = false
        }*/
        this.setPassword = this.$route.query.setPassword as unknown as boolean
        this.setEmail = this.$route.query.setEmail as unknown as boolean
    }
})
</script>
