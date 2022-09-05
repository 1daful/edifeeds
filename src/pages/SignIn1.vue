<template>
  <div>
    <!--<img :src="config.logo" />-->
    <b-form @submit.prevent="onSubmit">
      <!--Email-->
      <b-form-group id="email-group" label="Email address:" label-for="email" description="Sign in with your email.">
        <b-form-input id="email" v-model="user.email" type="email" required :state="validEmail"></b-form-input>
        <b-form-invalid-feedback :state="validmail">
          Email is invalid.
        </b-form-invalid-feedback>
      </b-form-group>
      
      <!--Submit button-->
      <b-button type="submit" variant="primary">Sign in</b-button>
    </b-form>
    <br />
    <p>Or use any of the following</p>
    <div id="firebaseui"></div>
  </div>
</template>

<script>
  //import config from '../config.json';
  import { MediaApi } from "../api/MediaApi";
  import { MailjetFunc } from '../api/Email/MailjetFunc';
  import { Axiosi } from '../api/Axiosi'
  import { FirebaseAuth } from "../api/auth/FirebaseAuth"

  let api = new MailjetFunc()
  let mediaApi = new MediaApi(api);
  let config;
  let client = new Axiosi();
  let auth = new FirebaseAuth()
  let ui = auth.getUi()


  // The start method will wait until the DOM is loaded.

  export default {
      name: 'SigIn',
      data() {
        return {
          config,
          client,
          auth,
          ui,
          errors: {
            passwordLengthErr: '',
            signUpErrMsg: '',
            emailEmpty: '',
            passwordEmpty: '',
            displayNameEmpty: ''
          },
          user: {
            displayName: '',
            email: '',
            password: '',
            newsletter: ''
          },
          passwordStrength: {
            show: false,
            messages: '',
            value: 0,
            variant: '',
            max: 0
          },
          signUp: true,
          verified: false
        }
      },
      mounted() {
        this.client.load("../config.json").then(resp => {
            if (resp) {
                this.config = resp.data
                
  const uiconfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        let user = authResult.user;
        let isNewUser = authResult.additionalUserInfo.isNewUser;
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        if (isNewUser) {
          mediaApi.postItem('contact', {}, user);
        }
        return true;
      },

      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.
      /*signInFailure: function(error) {
        // For merge conflicts, the error.code will be
        // 'firebaseui/anonymous-upgrade-merge-conflict'.
        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        var cred = error.credential;
        // If using Firebase Realtime Database. The anonymous user data has to be
        // copied to the non-anonymous user.
        var app = firebase.app();
        // Save anonymous user data first.
        return app.database().ref('users/' + firebase.auth().currentUser.uid)
            .once('value')
            .then(function(snapshot) {
                data = snapshot.val();
                // This will trigger onAuthStateChanged listener which
                // could trigger a redirect to another page.
                // Ensure the upgrade flow is not interrupted by that callback
                // and that this is given enough time to complete before
                // redirection.
                return firebase.auth().signInWithCredential(cred);
            })
            .then(function(user) {
                // Original Anonymous Auth instance now has the new user.
                return app.database().ref('users/' + user.uid).set(data);
            })
            .then(function() {
                // Delete anonymnous user.
                return anonymousUser.delete();
            }).then(function() {
                // Clear data in case a new user signs in, and the state change
                // triggers.
                data = null;
                // FirebaseUI will reset and the UI cleared when this promise
                // resolves.
                // signInSuccessWithAuthResult will not run. Successful sign-in
                // logic has to be run explicitly.
                window.location.assign('<url-to-redirect-to-on-success>');
            });

      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },*/
    },
    
    //credentialHelper: this.auth.credentials,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //signInFlow: 'popup',
    signInSuccessUrl: this.config.signInProps.signInSucessUrl,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      this.auth.GOOGLE_Id_ID,
      this.auth.FACEBOOK_ID,
      this.auth.TWITER_ID,
      /*{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // Invisible reCAPTCHA with image challenge and bottom left badge.
        recaptchaParameters: {
          type: 'image',
          size: 'invisible',
          badge: 'bottomleft'
        }
      },*/
    ],
    // Set to true if you only have a single federated provider like
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID and you would like to
    // immediately redirect to the provider's site instead of showing a
    // 'Sign in with Provider' button first. In order for this to take
    // effect, the signInFlow option must also be set to 'redirect'.
    immediateFederatedRedirect: false,
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: this.config.tosUrl,
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign(this.config.privacyPolicyUrl);
    }
  };
        this.ui.start('#firebaseui', uiconfig);}
        })
      },
      methods: {
        onSubmit() {
          if (!this.user.email) {
            this.errors.emailEmpty = 'Email is required.';
            return
          }
          if (!this.user.password) {
            this.errors.passwordEmpty = 'Password is required.';
            return
          }
          if (this.validEmail&&this.validPassword) {
            this.auth.signIn(this.user.email, this.user.password, {displayName: this.user.displayName});
            if (this.auth.authMessage.signUpErrMsg) {
              this.errors.signUpErrMsg = this.auth.authMessage.signUpErrMsg;
            }
            else {
              this.$router.options.route;
              if (this.user.newsletter) {
                mediaApi.postItem('contact',{}, this.user);
              }
            }
          }
          
        },
        validEmail() {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(this.user.email);
        },
        validPassword() {
          if (this.user.password.length < 7) {
            this.errors.passwordLengthErr = 'Your password is too short.';
          }
          else if (this.user.password.length > 128){
            this.errors.passwordLengthErr = 'Your password is too long.'
          }
          return this.user.password.length > 7 && this.user.password.length < 128
        },
    }
  }
</script>