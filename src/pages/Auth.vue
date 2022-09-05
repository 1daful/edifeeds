<template>
<div>Redirecting</div>
</template>

<script lang="ts">
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Auth',
    data() {
        return {
            auth
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
    mounted() {
        console.log
        if( this.myUrl){
            console.log(this.myUrl)
        	const sess = this.auth.startSession()
        //console.log("sess: ", sess)
        /*if(sess)
          this.$router.push(this.myUrl))*/
        }
    }
})
</script>
