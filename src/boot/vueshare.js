//import {cr} from "vue";
import SocialSharing from 'vue-social-sharing';
import { boot } from "quasar/wrappers";

export default boot(({app}) => {
    //const instantsearch = InstantSearch({})
    app.config.globalProperties.$SocialSharing = SocialSharing
    //app.use(SocialSharing)
})

export {SocialSharing}