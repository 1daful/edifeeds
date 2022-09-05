import { Axiosi } from "../api/axios.js";
import SiteHero from "../components/hero.js";
import MediaComponent from "../components/media-component.js";
/*import QOD from "../components/QOD.js";
import Newsletter from "../components/newsletter.js";
import Genres from "../components/genres.js";*/

let axios = new Axiosi();
let site
let pos = "main"
export default {
    name: 'home',
    template: `<div>
    <div class="home container">
      <div class="row">
        <div class="col-sm-8">
          <SiteHero v-if="site" :site="site"></SiteHero>
          <h4>
            Quote  of the day
          </h4>
            <!--<QOD></QOD>-->
          <MediaComponent v-if="pos" :pos="pos"></MediaComponent>
          <!--<Newsletter v-if="site" :bgImg="site.newsletter.bgImg"></Newsletter>-->
        </div>
        <div class="col-sm-4">
          <!--<Genres></Genres>-->
        </div>
      </div>
    </div>
  </div>`,
    data: function () {
        return {
            site,
            pos
        }
    },
    components: {
      SiteHero,
      //QOD,
      MediaComponent,
      //Newsletter,
      //Genres
    },
    mounted() {
        axios.load("../config.json").then(resp => {
            this.site = resp.data
        })
    }
};
