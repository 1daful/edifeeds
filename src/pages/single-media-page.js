/*import { FIRepository } from "../model/FIRepository";
import { FirebaseAuth } from "../api/Auth/FirebaseAuth"
import Comment from "../components/Comment.vue";
import SidebarComponent from "../components/SidebarComponent.vue"*/

export default {
  name: 'SingleMediaPage',
  template: `<div class="container">
    <div class="row">
        <div class="col-sm-8">
            <b-img :src="media.thumbnail"></b-img>
            <h4>
                {{media.title}}
            </h4>
            <b-avatar :src="author.pic"></b-avatar>
            <span>
            <b-icon-clock-fill></b-icon-clock-fill>
            {{media.created}}
            </span>
                <b-button @click="addToCollection">
                    <b-icon :icon="collIcon">
                    </b-icon>
                </b-button>
                <b-button @click="addToFavourites">
                    <b-icon :icon="favIcon">
                    </b-icon>
                    <b-badge>{{media.count}} </b-badge>
                </b-button>
            <b-button><b-icon-chat-fill></b-icon-chat-fill><b-badge> {{comment.count}} </b-badge></b-button>
            <div>
                {{media.description}}
            </div>
            <!-- share -->
            <div>
                <button @click="facebook"><i class="fi-social-facebook"></i>
                    facebook
                </button>
                <span><i class="fi-social-twitter"></i>
                    <a class="twitter-share-button" href="https://twitter.com/intent/tweet"></a>
                </span>
                <span><i class="fi-social-pinterest"></i> 
                    <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" :data-pin-id="media.thumbnail"></a>
                </span>
            </div>
            <Comment :db="db" :path="path"></Comment>
        </div>
        <div class="col-sm-4">
            <div>
                <h4>
                    Tags
                </h4>
                <p id="books-tags">
                    <span v-for="tag in media.tags" :key="tag">
                        <b-tag></b-tag>{{tag}}
                    </span>
                </p>
            </div>
            <hr />
            <SidebarComponent></SidebarComponent>
        </div>
    </div>
</div>`,
data() {
    return {
        repository: new FIRepository(this.db),
        firAuth: new FirebaseAuth(this.auth),
        collIcon: 'plus-square',
        favIcon: 'hearth',
        path: `${this.media.type}/${this.media.id}/comments`
    }
},
props: {
    media: {
        type: Object,
        required: true
    },
    db: {
        type: Object,
        required: true
    },
    auth: {
        type: Object,
        required: true
    },
    FB: {
        type: Object,
        required: true
    },
},
components: {
    SidebarComponent,
    Comment
},
methods: {
    facebook() {
        this.FB.ui({
            method: 'share',
            href: this.$route.path
        }, function(response) {
            if (response && !response.error) {
                alert('Post shared successfully!');
            }
        })
    },
    addToCollection() {
        if (this.firAuth.currentUser) {
            this.repository.setItem(this.media.type, this.media);
            this.icon = 'plus-square-fill'
        }
        else {
            this.$router.push({path: '/sig-in', params: {msg: 'You must login first'}});
        }
    },
    addToFavourites() {
        if (this.firAuth.currentUser) {
            let subPath = `${this.media.type}/${this.media.id}/favourites`;
            let item = {id: this.firAuth.currentUser};
            this.repository.setChild(subPath, item);
            this.icon = 'heart-fill'
        }
        else {
            this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
        }
    }
}
/*metaInfo() {
    return {
        meta: [
            //twitter card
            {
                name: 'twitter:card', 
                content: 'summary'
            },
            {
                name: 'twitter:title', 
                content: this.media.title
            },
            {
                name: 'twitter:description', 
                content: this.media.description
            },
            {
                name: 'twitter:image', 
                content: this.logo
            },
            //Facebook OpenGraph
        ]
    }
}*/
}