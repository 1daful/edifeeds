<template>
    <div>
    <div>
        <h6>
            What messages do you hear?
        </h6>
        <div>
            <button class="btn" v-for="genre in genres" :key="genre.id" variant="primary" @click="loadMedia(genre.id)">
                {{genre.id}}
            </button>
        </div>
    </div>
</div>
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
            genres
        }
    },
    methods: {
        loadMedia(id: any) {
            this.$router.push({path: 'topical-index', params: {genre: id}});
        }
    },
    async mounted() {
        this.genres = await metadata.loadGenres()
    }
})
</script>
