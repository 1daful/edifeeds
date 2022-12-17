<template>
    <div v-if="signUp" :bgImg="bgImg" class="q-pa-md margin" :style="{backgroundImage: `url(${bgImg})`}">
        <!--<img :src="logo" />-->
        <q-form ref="signUpForm" @submit="onSubmit" class="q-gutter-md margin">
        <!-- Name ---->
            <q-input rounded outlined bg-color="white" v-model="user.metadata.name" type="text" label="Name" lazy-rules :rules="rules.name"/>

          <!--Email---->
            <q-input rounded outlined v-model="user.cred.email" type="email" label="Email" lazy-rules :rules="rules.email"/>

            <!--Password-->
            <q-input rounded outlined v-model="user.cred.password" type="password" label="Password" lazy-rules :rules="rules.password"/>

            <q-linear-progress :value="passwordStrength.value"  v-if="passwordStrength.show" :buffer="passwordStrength.value"></q-linear-progress>
            <router-link :to="{
              name: 'Reset', 
              params: {param: 'setPassword'}
              }">Forget password?</router-link>

            <!--Newsletter-->
            <div><q-checkbox v-model='user.metadata.newsletter'></q-checkbox> <span>Send updates to my email address.</span></div>

            <!--TOS-->
            <p>By clicking sign up you have read and agreed to our <a :href="site.tosUrl">term of use</a> and <a :href="site.privacyPolicyUrl">privacy policy</a>.</p>

            <q-btn type="submit" color="primary" @click="onSubmit" :loading="loading" :disable="loading">Sign Up
              <template v-slot:loading>
                <q-spinner-bars v-if="loading"></q-spinner-bars>
              </template>
            </q-btn>
            <q-item-label>{{errors.signUpErrMsg}}</q-item-label>

        </q-form>

          <q-btn class="bl" v-for="social in socials" :key="social.id" :icon="social.icon" :label="social.id" color="primary" @click="socialSignIn(social.id)"/>
    </div>
    <div v-else-if="verified">
      A confirmation link is sent to your email address. If you can not see the email please check your spam folder or request a new confirmation link.
      <q-btn @click="resendLink">Resend link</q-btn>
    </div>
    <div v-else-if="confirmationError">{{confirmationError}}</div>
</template>

<script lang="ts">
import config from '../../public/config.json';
import { auth } from "../api/auth/SupabaseAuth";
//import ProgressBar from "../components/ProgressBar.vue";
import { Mailer } from "../api/Email/Mailer";
//import { MediaApi } from "../api/MediaApi";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { defineComponent, ref } from "vue";
//import { ListMonk } from '../api/Email/Listmonk';
import { EmailAddress, EmailType } from '../Types';
//import zxcvbn from 'zxcvbn';
//let firebase = new FirebaseSetUp();

//const api = new ListMonk()
//let mediaApi = new MediaApi(api);
let site = config
let emailAddress: EmailAddress
let emailType: EmailType
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
      const signUpForm = ref({})
        return {
          loading: false,
          site,
            auth,
            signUpForm,
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
              cred:{
                email: '',
                password: ''
              },
              metadata: {
                name: '',
                newsletter: false,
                isRobot: false
              }
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
            validated: false,
            confirmationError: "",
            mailer: new Mailer(),
            myUrl: "/"
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

            if (this.passwordStrength.variant === "danger") {
                return
            }
            if (await this.validate()) {
              this.loading = true
                const { user, session, error } = await this.auth.signUp(this.user.cred, this.user.metadata);
                //console.log(user, session)
                if (error) {
                this.errors.signUpErrMsg = error.message;
                //return
                }
                if (user) {
                /*this.user.id = this.user.name;
                db.addItems('users', this.user);*/
                if (this.user.metadata.newsletter) {
                  const data = {
                    email: this.user.cred.email,
                    name: this.user.metadata.name,
                    status:	"enabled",
                    //lists:	[0],
                    preconfirm_subscriptions:	true
                  }
                    //mediaApi.postItem('contacts');
                }
                if (this.auth.isNewUser(user)) {
                    emailAddress = {
                      address: this.user.cred.email,
                      name: this.user.metadata.name,
                      contact_number: "",
                      company: ""
                    }
                    emailType = {
                      subject: "Welcome",
                      text: "Welome to Edifeeds family",
                      html: "",
                      templateKey: "",
                      cc: [],
                      bcc: [],
                      attachments: [],
                      inline_images: []
                    }
                  this.mailer.sendEmail(emailAddress, emailType)
                }
                this.signUp = false
                this.verified = true;
                //this.$router.push(this.myUrl)
                }
                this.loading = false
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
        /*for(const error in this.errors) {
          if (error) {
            this.errorList.push()
          }
        }
        return this.validated*/
      },
      async resendLink() {
        const { user, session, error } = await this.auth.signUp(this.user.cred, this.user.metadata);
        if (error) {
          this.confirmationError = error.message
          this.verified = false
        }
        else if (user && session) {
          this.verified = true
        }
      }
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
