<template>
  <ais-instant-search :search-client="searchClient" index-name="all_media">
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.name }}</h2>
      </template>
    </ais-hits>

    <hr/>
    <ais-index>
        <ais-hits index-name="book_media">
        <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
        </template>
        </ais-hits>
    </ais-index>  
    <hr/>
    <ais-index>
        <ais-hits index-name="video_media">
        <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
        </template>
        </ais-hits>
    </ais-index>
    <hr/>
    <ais-index>
        <ais-hits index-name="music_media">
        <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
        </template>
        </ais-hits>
    </ais-index>
    <hr/>
    <ais-index>
        <ais-hits index-name="quote_media">
        <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
        </template>
        </ais-hits>
    </ais-index> 
  </ais-instant-search>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import config from "../../public/config.json";
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

export default defineComponent({
    name: "Serp",
    data() {
        return {
        searchClient: algoliasearch(
            config.api.Algolia.id,
            config.api.Algolia.key
        ),
        };
    },
})
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>



