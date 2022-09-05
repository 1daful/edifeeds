//import {cr} from "vue";
import { InstantSearch } from 'vue-instantsearch';
import { boot } from "quasar/wrappers";
/*const algolia = {

}*/

export default boot(({app}) => {
    //const instantsearch = InstantSearch({})
    app.use(InstantSearch)
})