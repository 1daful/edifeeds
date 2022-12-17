<template>
    <q-form v-if="passwordType" class="q-gutter-md margin" ref="passRef">
        <q-item-label>Enter your new password</q-item-label>
        <!--<q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>-->
            <q-input rounded outlined color="blue" bg-color="white" v-model="userPassword" :type="isPwd ? 'password' : 'text'" label="Password" lazy-rules :rules="rules.password">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
        </q-input>
        <q-btn color="primary" @click="update('password', userPassword)" :loading="loading" :disable="loading">Create New Password</q-btn>
        <q-item-label v-if="errors.message">{{errors.message}}</q-item-label>
    </q-form>
    <div v-else-if="passwordSuccess">
        Sign in with your new password.
        <q-btn color="primary" flat size="lg"><router-link to="/signin">Sign in</router-link></q-btn>
    </div>
    <div v-if="emailSuccess">
        Your email is successfully updated.
        <q-btn color="primary" flat size="lg"><router-link to="/">Go Home</router-link></q-btn>
    </div>
    <q-item-label class="text-center" v-else-if="errors.message">{{errors.message}}</q-item-label>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from 'vue'
import { Utility } from "../Utility";
import { useQuasar } from "quasar";

const utility = new Utility()

export default defineComponent({
    data() {
        return {
          isPwd: true,
            userPassword: "",
            passwordType: false,
            passwordSuccess: false,
            emailSuccess: false,
            errors: {
                message: "",
                status: 0
            },
            rules: {
              name: [
                (val: string) => (val !== null&&val !== '') || "Name is required",
                (val:string) => (val.length >2) || 'Name should be more than 2 characters'
                ],
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
            loading: false,
            auth,
            accessToken: "",
            $q: useQuasar(),
            //url: this.$q.localStorage.getItem("url") || "/"
            //type: ""
        }
    },
    methods: {
        async update(key: string, val: string) {
            this.loading = true
            const { data, user, error } = await this.auth.updateCred(key, val);

            if (error) {
                this.errors = error
                this.loading = false
            }
            else {
                //await this.auth.logout()
                this.loading = false
                this.passwordType = false
                this.passwordSuccess = true
                return user
            }
        },
    },
    async mounted() {
        this.accessToken = this.$route.params.url as unknown as string
        //if( this.accessToken){
            const token = utility.getUrl(this.accessToken)
            //let params = token.searchParams
            let type = token.type
            let email_change_token = token.email_change_token
            let user 
            //this.setPassword = false

            //console.log("type: ", type)

             switch (type) {
                case "recovery":
                    this.passwordType = true
                    break;
                case "email_change":
                    user = await this.update("email", email_change_token)
                    if (user) {
                        this.emailSuccess = true
                        this.passwordSuccess = false
                    }
                default:
                    //this.$router.push(this.url.toString())
                    break;
             }
        //}
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
<style scoped>
	.margin {
    text-align:center;
    /*width: 50%;*/
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2%
  }
  .bl {
    text-align: center;
    white-space: no-wrap;
    display: inline;
    margin-left: 5%;
    /*margin-right: 15%;*/
    margin-top: 2%;
    margin-bottom: 2%;
  }
</style>
