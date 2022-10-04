<template>
    <div :bgImg="bgImg" class="q-pa-md margin" :style="{backgroundImage: `url(${bgImg})`}">
        <!--<img :src="logo" />-->
        <q-form ref="signUpForm" @submit="onSubmit" class="q-gutter-md margin">
        <!-- Name ---->
            <q-input v-model="user.name" type="text" label="Name" lazy-rules :rules="rules.name"/>

          <!--Email---->
            <q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>

            <!--Password-->
            <q-input v-model="user.password" type="password" label="Password" lazy-rules :rules="rules.password"/>

            <q-linear-progress :value="passwordStrength.value"  v-if="passwordStrength.show" :buffer="passwordStrength.value"></q-linear-progress>
            <router-link :to="{name: 'PasswordRecovery'}">Forget password?</router-link>

            <!--Newsletter-->
            <div><q-checkbox v-model='user.newsletter'></q-checkbox> <span>Send updates to my email address.</span></div>

            <!--TOS-->
            <p>By clicking sign up you have read and agreed to our <a :href="site.tosUrl">term of use</a> and <a :href="site.privacyPolicyUrl">privacy policy</a>.</p>

            <q-btn type="submit" color="primary" @click="onSubmit">Sign Up</q-btn>

        </q-form>

          <q-btn class="bl" v-for="social in socials" :key="social.id" :icon="social.icon" :label="social.id" color="primary" @click="socialSignIn(social.id)"/>
        <div id="auth-ui">
        </div>
    </div>
</template>

<script lang="ts">
import config from '../../public/config.json';
import { auth } from "../api/auth/SupabaseAuth";
//import ProgressBar from "../components/ProgressBar.vue";
import { MailjetFunc } from "../api/Email/MailjetFunc";
import { MediaApi } from "../api/MediaApi";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { defineComponent, ref } from "vue";
//import zxcvbn from 'zxcvbn';
//let firebase = new FirebaseSetUp();

let api = new MailjetFunc();
let mediaApi = new MediaApi(api);
let site = config
//let db = new SupabaseRepo()

export default defineComponent({
    name: 'SignUp',

    /*setup() {
      const signUp = ref()
      let validated: boolean

      async function validate(this: any): Promise<boolean> {
        if (signUp) {
          const success = await signUp.value.validate()
          if (success) {
            validated = true
          }
          return validated
        }
        or(const error in this.errors) {
          if (error) {
            this.errorList.push(error)
          }
          else {
            this.errorList.pop()
          }
        }
        return validated
      }
    },*/
    data() {
        return {
          site,
            auth,
            signUpForm: ref({}),
            bgImg: "",
            socials: config.socials,
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
            errors: {
                passwordLengthErr: '',
                signUpErrMsg: '',
                emailEmpty: '',
                passwordEmpty: '',
                displayNameEmpty: ''
            },
            errorList: [],
            user: {
                name: '',
                email: '',
                password: '',
                newsletter: false,
                isRobot: false
            },
            passwordStrength: {
                show: true,
                messages: '',
                value: 0.5,
                variant: '',
                max: 0
            },
            signUp: true,
            verified: false,
            validated: false
        }
    },

    /*components: {
        ProgressBar
        },
    props: {
        logo: {
            type: String,
            required: true
        },
        site: {
            type: Object,
            required: true
        }
    },*/
    methods: {
        async onSubmit() {
            /*if(this.user.isRobot) {
                this.message = "Please check the box to verify you're human."
                return;
            }*/

            if (this.passwordStrength.variant ==="danger") {
                return
            }
            if (await this.validate()) {
                const { user, session, error } = await this.auth.signUp(this.user, this.user);
                console.log(user, session)
                if (error) {
                this.errors.signUpErrMsg = error.message;
                }
                else {
                /*this.user.id = this.user.name;
                db.addItems('users', this.user);*/
                if (this.user.newsletter) {
                    mediaApi.postItem('postContact', {}, this.user);
                }
                this.signUp = false
                this.verified = true;
                }
            }
        },
        socialSignIn(id: string) {
            this.auth.login(id)
        },
      async validate(): Promise<boolean> {

        //if (this.signUpForm) {
          const success = await this.$refs.signUpForm.validate()
          if (success) {
            this.validated = true
          }
          return this.validated
        //}
        for(const error in this.errors) {
          if (error) {
            this.errorList.push()
          }
        }
        return this.validated
      },
        /*setPasswordStrength() {
            let result = zxcvbn(this.user.password);
            this.passwordStrength.value = result.score;
            this.passwordStrength.max = 1.0;
            switch (this.passwordStrength.value) {

                case 0:
                case 1:
                case 2:
                  this.passwordStrength.show = true
                this.passwordStrength.messages = 'Pasword is weak.';
                this.passwordStrength.variant = 'danger';
                break;
                case 3:
                  this.passwordStrength.show = true
                this.passwordStrength.messages = 'Pasword is moderate.';
                this.passwordStrength.variant = 'warning';
                break;
                case 4:
                  this.passwordStrength.show = true
                this.passwordStrength.messages = 'Pasword is strong.';
                this.passwordStrength.variant = 'sucess';
                break;

                default:
                break;
            }
        },*/
        /*onVerify(response) {
            if (response) {
                this.user.isRobot = true;
            }
        }*/
    }
})
</script>
<style scoped>
	.margin {
    text-align:center;
    /*width: 50%;*/
    margin-left: 15%;
    margin-right: 15%;
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
