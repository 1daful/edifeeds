<template>
    <div :mediaItems="mediaItems">
        <div v-for="mediaItem in mediaItems" :key="mediaItem.title">
            <img :src="mediaItem.thumbnailSmall" :alt="mediaItem.title">
            <span> {{mediaItem.title}} </span>
        </div>
</div>
</template>

<script>
export default {
    name: 'MediaSidebar',
    props:{
        mediaItems: {
            type: Array,
            required: true
        }
    }
}
</script>