<template>
    <q-form v-if="passwordType" class="q-gutter-md margin" ref="passRef">
        <q-item-label>Enter your new password</q-item-label>
        <!--<q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>-->
        <q-input v-model="password" type="password" label="Password" lazy-rules :rules="rules.password"/>
        <q-btn @click="update(password)">Create New Password</q-btn>
        <q-item-label v-if="errors.message">{{errors.message}}</q-item-label>
    </q-form>
    <div v-else-if="passwordSuccess">
        Now you can login with your new password.
        <q-btn flat size="lg"><router-link to="/signin">Sign in</router-link></q-btn>
    </div>
    <div v-if="emailSuccess">
        Your email is successfully updated.
        <q-btn flat size="lg"><router-link to="/">Go Home</router-link></q-btn>
    </div>
    <q-item-label v-else-if="errors.message">{{errors.message}}</q-item-label>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from 'vue'
import { Utility } from "../Utility";

const utility = new Utility()

export default defineComponent({
    data() {
        return {
            password: "",
            passwordType: false,
            emailSuccess: false,
            errors: {
                message: "",
                status: 0
            },
            auth,
            accessToken: ""
            //type: ""
        }
    },
    methods: {
        async update(dat: string) {
            const { data, user, error } = await this.auth.updateCred(dat);

            if (error) {
                this.errors = error
            }
            else {
                //await this.auth.logout()
                return user
            }
        },
    },
    async mounted() {
        this.accessToken = this.$route.query.accessToken as unknown as string
        if( this.accessToken){
            const token = utility.getUrl(this.accessToken)
            //let params = token.searchParams
            let type = token.type
            let email_change_token = token.email_change_token
            //this.setPassword = false
             switch (type) {
                case "recovery":
                    this.passwordType = true
                    break;
                case "email_change":
                    const user = await this.update(email_change_token)
                    if (user) {
                        this.emailSuccess = true
                    }
                default:
                    break;
             }
        }
    },
    /*props: {
        accessToken: {
            type: String,
            required: true
        },
        verifyEmail: {
            type: String,
            required: false
        },
        requestedLink: {
            type: Boolean,
            required: false
        }
    }*/
})
</script>
