<template>
    <div :mediaItems="mediaItems">
        <ul class="nav nav-pills nav-stacked">
            <li class="nav-item" v-for="mediaItem in mediaItems" :key="mediaItem.id">
                <a class="flex-sm-fill text-sm-center nav-link" :href="mediaItem.title" data-toggle="pill">
                    {{mediaItem.title}}
                </a>
            </li>
        </ul>
    </div>

    <q-splitter v-model="splitterModel" style="height: 250px">
        <template v-slot:before>
            <q-tabs v-model="tab" vertical dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator class="text-grey">
                <q-tab v-for="mediaItem in mediaItems" :key="mediaItem.id" :name="mediaItem.title" :label="mediaItem.title">
                </q-tab>
            </q-tabs>
        </template>

        <template v-slot:after>
            <q-tab-panels vertical swipeable transition-prev="jump-up" transition-next="jump-up" v-model="tab" animated>
                <q-tab-panel v-for="mediaItem in mediaItems" :key="mediaItem.id" :name="mediaItem.title">
                    {{mediaItem.title}}
                </q-tab-panel>
            </q-tab-panels>
        </template>
    </q-splitter>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Repository} from "../model/Repository";
//import MediaComponent from "./MediaComponent.vue";

let repository = new Repository("collections");
let mediaItems: Array<any> = []

export default defineComponent({
    name: 'Collection',
    data() {
        return {
            repository,
            splitterModel: ref(50),
            mediaItems,
            tab: ref(mediaItems[0]?.name)
        }
    },
    /*computed: {
        tab() {
            let tab
            (mediaItems.forEach(element => {
                tab = element.name
            }
        ))
        }
    }
    props: {
        mediaItems: Array
    }*/
    mounted() {
        this.repository.readItems().then(items => {
            this.mediaItems = items
        })
    }
})
</script>
