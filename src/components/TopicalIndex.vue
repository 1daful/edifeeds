<template>
    <div :genre="genre">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <div class="tab-content">
                    <div class="tab-pane active container">
                      <Media :media="media"></Media>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import Media from "../components/Media.vue";
import { Recommender } from '../api/Recommender';

let recommender = new Recommender();

export default {
    name: 'TopicalIndex',
    data() {
        return {
            media: recommender.getMedia('top', this.genre)
        }
    },
    props: {
        genre: {
            type: String,
            required: true
        }
    }
}
</script>