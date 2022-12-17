<template>
    <div class="q-pa-md margin justify-center item-center" :style="{backgroundImage: `url(${bgImg})`}">
        <!--<img :src="logo" />-->
        <p class="text-weight-bold text-h5"> Sign in</p>
        <q-form @submit="onSubmit" class="q-gutter-md margin" ref="formRef">
          <!--Email---->
            <q-input rounded outlined v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>

            <!--Password-->
            <q-input rounded outlined color="blue" bg-color="white" v-model="user.password" :type="isPwd ? 'password' : 'text'" label="Password" lazy-rules :rules="rules.password">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <p>Forget password?
            <router-link :to="{
              name: 'Reset', 
              params: {param: 'setPassword'}
              }">Click to reset
            </router-link>
            </p>

            <q-btn label="Sign in" type="submit" color="primary" class="full-width" @click="onSubmit" :loading="loading" :disable="loading">
              <template v-slot:loading>
                <q-spinner-bars v-if="loading"></q-spinner-bars>
              </template>
            </q-btn>
        </q-form>

        <q-item-label class="margin">OR</q-item-label>
        <!--<q-separator inset="item"/>-->
            <q-btn v-for="social in socials" :key="social.id" class="bl" rounded :icon="social.icon" color="primary" @click="socialSignIn(social.id)">{{social.id}}</q-btn>

        <!--<social-login></social-login>-->
        <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </div>
    <div>
      <!--<signup-form tool-id="nkmbbm"/>-->
      <q-item-label>{{errors.signUpErrMsg}}</q-item-label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auth } from "../api/auth/SupabaseAuth";
//import { FirebaseAuth } from "../api/auth/FirebaseAuth";
import {Axiosi} from "../api/Axiosi"
import config from "../../public/config.json"
//import Userfront, {SignupForm} from "@userfront/vue"

let client = new Axiosi()

let socials = config.socials
//let auth = new FirebaseAuth()
//Userfront.init("demo1234")

export default defineComponent({
    name: 'SignIn',
    components: {
      //SignupForm
    },
    data() {
      const user = ref({
        email: "",
        password: ""
      })

      const emailRef = ref<any>(null)
      const formRef = ref({})

      //const passwordRef = ref(null)

        return {
          loading: false,
          emailRef,
          isPwd: true,
            client,
            auth,
            socials,
            bgImg: "a",
            user,
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
          errors: {
            passwordLengthErr: '',
            signUpErrMsg: '',
            email: "",
            password: ""
          },
          errorList: [],
          validated: false,
          formRef,
          myUrl: "/"
        }
    },
    props: {
        /*myUrl: {
            type: String,
            required: true
        },*/
        /*logo: {
            type: String,
            required: true
        },
        login: {
            type: Boolean,
            required: true
        }*/
    },
    computed: {
        /*validPassword() {
          console.log("this is the user", this.user)
          console.log("this is gImg", this.bgImg)
          if (this.user.password.length < 7&&this.user.password.length >0) {
            return 'Your password is too short.';
          }
          else if (this.user.password.length > 128){
            return 'Your password is too long.'
          }

          return "Password is required"
        },
        validEmail() {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (this.user.email !== null) {
            if(!re.test(this.user.email)) {
              return "Please enter a valid email"
            }
          }
          return 'Email address is required';
        }*/
    },
    methods: {
        socialSignIn(id: string) {
            this.auth.login(id)
        },
        async onSubmit() {
          /*this.validate().then(() => {
            if (this.errorList.length > 0) {
              return
            }
          })*/
          //this.emailRef.value.validate()
          if (await this.validate()){
            this.loading = true;
            const { user, session, error } = await this.auth.login(undefined, this.user);
            if (error) {
              this.errors.signUpErrMsg = error.message
              //console.log("sign in error try:", error)
            }
            if (user && session) {
              //this.$refs
              //this.$router.push(this.myUrl)
              window.location.href = "http://localhost:9000"
            }
            this.loading = false
          }
          }
            /*if (error) {
              this.errors.signUpErrMsg = error.message;
            console.log('this.errors.signuperror: ', this.errors.signUpErrMsg)
            console.log(user, session)
            }*/
            /*else {
              this.$router.push({path: this.myUrl})
            }*/,

        async validate() {
          const success = await this.$refs.formRef.validate()
          if (success) {
            this.validated = true
          }
          return this.validated
        },
      onload() {
        this.$emit("showHeader", true)
      }
    },
    created() {
        /*this.client.load("../config.json").then(resp => {
            if (resp) {
                this.socials = resp.data.socials
            }
        })*/
        this.onload()
        //this.auth.startUI()
        const sess = this.auth.startSession()
        console.log("sess: ", sess)
    }
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
  a {
    text-decoration-line: none;
  }
</style>
