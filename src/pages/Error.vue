<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
    <q-icon name="error" color="red" size="15em"></q-icon>
      <q-item-label style="font-size: 20vh">
        Try Again.
      </q-item-label>

      <div class="text-h2" style="opacity:.4">
        {{error.description}}
      </div>

      <q-btn
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Utility } from "../Utility";

const utility = new Utility()

export default defineComponent({
  name: 'Error',
  data() {
    return {
      accessToken: "",
      passwordType: "",
      error: {
        code: "",
        description: ""
      }
    }
  },
  props: {
    /*a_token: {
        type: String,
        required: true
    },*/
    myUrl: {
        type: String,
        required: true
    }
  },
  async mounted() {
      this.accessToken = this.$route.params.myUrl as unknown as string
      //console.log("myUrl ", this.myUrl)
      //console.log("accesToken ", this.accessToken)
      const token = utility.getUrl(this.accessToken)
      //console.log("tok ", token)
      let errorDescription = ""
      errorDescription = token.error_description
          let errorCode = token.error_code
          this.error.code = errorCode
          this.error.description = errorDescription.replaceAll("+", " ")
  },
});
</script>
