<template>
<div>
    <q-form v-if="setPassword" class="q-gutter-md margin" ref="passwordRef">
        <q-item-label>Enter your registered email address.</q-item-label>
        <q-input rounded outlined v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>
        <q-btn class="bl" color="primary" @click="reset" :loading="loading" :disable="loading">
          Reset Password
          <template v-slot:loading>
            <q-spinner-bars v-if="loading"></q-spinner-bars>
          </template>
        </q-btn>
    </q-form>
    <q-form v-else-if="setEmail" class="q-gutter-md margin" ref="emailRef">
        <q-item-label>Enter your new email address.</q-item-label>
        <q-input rounded outlined v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>
        <q-btn class="bl" color="primary" @click="update('email', user.email)">Change Email</q-btn>
    </q-form>
    <h4 class="q-gutter-md margin" v-else-if="requestedLinkPassword">
        <q-item-label>A verification link has been sent to your inbox. If you can't find it, please check your spam box or request a new verification link.</q-item-label>
        <q-btn class="bl" color="primary" @click="doReset">Resend link</q-btn>
    </h4>
    <h4 class="q-gutter-md margin" v-else-if="requestedLinkEmail">
        <q-item-label>A verification link has been sent to your inbox. If you can't find it, please check your spam box or request a new verification link.</q-item-label>
        <q-btn class="bl" color="primary" @click="resendLink">Resend link</q-btn>
    </h4>
    <q-item-label class="margin" v-if="errors.message"> <q-icon color="red" name="error" /> {{errors.message}}</q-item-label>
</div>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent, ref } from "vue";

//let user = {}
let token: URL
export default defineComponent({
    name: 'Reset',
    data() {
      const passwordRef = ref({});
      const emailRef = ref({})
        return {
            auth,
             user: {
                email: "",
                password: ""
             },
             //token,
             //type: "",
             //newPassword: "",
             loading: false,
             requestedLinkEmail: false,
             requestedLinkPassword: false,
             //verifyEmail: false,
             param: "",
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
        async update(key: string, val: string) {
            if(await this.validateEmail()) {
              this.loading = true
                const { user, error } = await this.auth.updateCred(key, val);

                if (error) {
                    this.errors = error
                }
                else {
                    //await this.auth.logout()
                    this.requestedLinkEmail = true
                    this.setEmail = false
                }
                this.loading = false
            }
        },
        async resendLink(key: string, val: string) {
            const { user, error } = await this.auth.updateCred(key, val);
            if (error) {
            this.errors.message = error.message
            //this.verified = false
            }
            else if (user) {
            //this.verified = true
            }
        },
        async doReset(){
              this.loading = true
                const { data, error } = await this.auth.resetPassword(this.user.email)
                if (error) {
                    this.errors = error
                }
                else {
                    //await this.auth.logout()
                    this.requestedLinkPassword = true
                    this.setPassword = false
                }
                this.loading = false
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
            if(await this.validatePassword()) {
              this.loading = true
                const { data, error } = await this.auth.resetPassword(this.user.email)
                if (error) {
                    this.errors = error
                }
                else {
                    //await this.auth.logout()
                    this.requestedLinkPassword = true
                    this.setPassword = false
                }
                this.loading = false
            }
        },
      async validatePassword(): Promise<boolean> {
        //if (this.signUpForm) {
            let validated = false
          const success = await this.$refs.passwordRef.validate()
          if (success) {
            validated = true
          }
          return validated
        //}
        /*for(const error in this.errors) {
          if (error) {
            this.errorList.push()
          }
        }
        return this.validated*/
      },
      async validateEmail(): Promise<boolean> {
        //if (this.signUpForm) {
            let validated = false
          const success = await this.$refs.emailRef.validate()
          if (success) {
            validated = true
          }
          return validated
        //}
        /*for(const error in this.errors) {
          if (error) {
            this.errorList.push()
          }
        }
        return this.validated*/
      },
    },
    mounted() {
        /*if( this.accessToken){
            this.token = new URL(this.accessToken)
            let params = this.token.searchParams
            this.type = params.get("type") || ""
            this.setPassword = false
        }*/
        this.param = this.$route.params.param as unknown as string
        //this.setEmail = this.$route.query.setEmail as unknown as boolean
        if(this.param === "setPassword") {
          this.setPassword = true
        }
        else if(this.param === "setEmail") {
          this.setEmail = true
        }
    }
})
</script>
<style scoped>
	.margin {
    text-align:center;
    /*width: 50%;*/
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 5%
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
