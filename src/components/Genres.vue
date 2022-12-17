<template>
    <button class="btn" v-for="genre in genres.rows" :key="genre.id" variant="primary" @click="loadMedia(genre.id)">
        {{genre.doc.id}}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Metadata } from '../model/metadata'

let metadata = new Metadata();
let genres: any[]

export default defineComponent({
    name: 'Genres',
    data() {
        return {
            //params: {},
            genres,
            metadata
        }
    },
    methods: {
        loadMedia(id: any) {
            this.$router.push({path: 'topical-index', params: {genre: id}});
        }
    },
    async mounted() {
        this.genres = await this.metadata.loadGenres()
        console.log("Genres: ", this.genres)
    }
})
</script>
