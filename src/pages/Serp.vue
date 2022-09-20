<template>
    <div classes="q-pa-md row items-start q-gutter-md">
        <q-card class="media-card" v-for="item in item" : key>
            <q-img :src="item.thumbnailSmall"></q-img>
            <q-card-section>
            </q-card-section>
        </q-card>
    </div>
</template>