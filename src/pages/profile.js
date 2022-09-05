import UserInfo from "../components/UserInfo.js";
import Collection from "../components/Collection.js";

export default {
  name: 'Profile',
  template:`<div class="content">
        <div class="card-body" id="profile-header">
            <h3 class="card-title"> {{user.displayName}} </h3>
            <b-avatar v-bind:src="user.photoUrl" @click="uploadPic"></b-avatar>
        </div>

        <div>
            <ul class="nav nav-pills" content-class="mt-4">
                <li>
                  <a href="#information" class="title" data-toggle="tab">information</h4>
                </li>
                <li>
                    <a href="#colllection" class="title" data-toggle="tab">colllection</h4>
                </li>
            </ul>
        </div>
        
        <div class="tab-content clear-fix">
          <div class="tab-pane active" id="user-info">
            <UserInfo></UserInfo>
          </div>
          <div class="tab-pane" id="collection">
            <Collection></Collection>
          </div>
        </div>
    </div>`,
    props: {
        storage: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    components: {
     Collection,
     UserInfo
    },
    methods: {
        uploadPic() {
            this.$router.push({path: '/upload-image', params: {storage: this.storage, user: this.user}})
        }
    }
}
