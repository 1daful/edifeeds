import { boot } from 'quasar/wrappers'
import VueInstant from 'vue-instant';
import 'vue-instant/dist/vue-instant.css'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({app}) => {
  // something to do
  app.use(VueInstant)
})
