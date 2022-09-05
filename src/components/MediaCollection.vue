<template>
    <div class="tab-content">
        <div v-for="mediaItem in media" :key="mediaItem.type" class='tab-pane' :id="mediaItem.type">
            <h4>{{mediaItem.type}}</h4>
            <Media :media="mediaItem.media"></Media>
        </div>
    </div>
</template>

<script>
import { Recommender } from '../api/Recommender.js';

let recommender = new Recommender();
let media = recommender.getMedia('collection');

export default {
    name: 'Collection',
    data() {
    return {
      media
    }
  }
}
</script>