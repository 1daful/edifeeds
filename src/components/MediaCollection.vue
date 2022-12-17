<template>

    <!--<div :mediaItems="mediaItems">
        <ul class="nav nav-pills nav-stacked">
            <li class="nav-item" v-for="mediaItem in mediaItems" :key="mediaItem.id">
                <a class="flex-sm-fill text-sm-center nav-link" :href="mediaItem.title" data-toggle="pill">
                    {{mediaItem.doc.title}}
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
    </q-splitter>-->
    
  <!--<div class="q-pa-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab :name="type" :label="type" v-for="type in mediaTypes" :key="type"/>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel v-for="type in mediaTypes" :key="type" class="q-pa-none">
          <q-splitter
            v-model="splitterModel"
            style="height: 250px"
          >

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal"
              >
                <q-tab name="innerMails" icon="mail" label="Mails" />
                <q-tab name="innerAlarms" icon="alarm" label="Alarms" />
                <q-tab name="innerMovies" icon="movie" label="Movies" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerMails">
                  <div class="text-h4 q-mb-md">Mails</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="innerAlarms">
                  <div class="text-h4 q-mb-md">Alarms</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="innerMovies">
                  <div class="text-h4 q-mb-md">Movies</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>-->

  <!--<div>
    <q-splitter
      v-model="splitterModel"
      style="height: 250px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab v-for="type in mediaTypes" :name="type" :label="type" :key="type" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel v-for="media in mediaItems" :key="media.type" :name="media.type">
            <div class="text-h4 q-mb-md">Mails</div>

            <q-card class="col-2 myCard" v-for="mediaItem in media.items" :key="mediaItem.id">
                        <q-img :src="mediaItem.doc.thumbnailLarge" spinner-color="white" style="height: 15em;">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-center bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>
                    <q-card-section v-if="mediaItem">

                      <q-btn
                        fab
                        color="primary"
                        :icon=mediaItem.icon
                        class="absolute text-white"
                        style="top: 0; right: 10px; transform: translateY(-50%);"
                        ref="mediaItems"
                        @click="addToCollection(mediaItem)"
                      />
                      <router-link :to="{name: 'Media',
                      params: {id: mediaItem.id},
                      query: {mediaType: mediaType}
                      }">
                          <p class="text-weight-bold" style="font-size: 16px">{{mediaItem.doc.title}}</p>
                          <q-item-label class="caption text-subtitle1">{{mediaItem.doc.description?.slice(0, 110)}} <span v-if="mediaItem.doc.description?.length > 180">...</span></q-item-label>
                              
                      </router-link>
                    </q-card-section>
                    <q-card-actions v-if="mediaItem.doc.created">
                        <q-icon left name="schedule" class="text-weight-bold" size="19px" /> 
                        <span> {{mediaItem.doc.created}}</span>
                    </q-card-actions>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>-->
  
        <!--<q-drawer
        v-model="shown"
      side="right"
      :show-if-above="false"
      bordered
      class="bg-grey-2"
    >-->
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