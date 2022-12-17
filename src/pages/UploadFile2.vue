<template>
	<div id="app">
		<DropZone class="drop-area" @files-dropped="addFile" #default="{ dropZoneActive }">
			<label for="file-input">
				<span v-if="dropZoneActive">
					<span>Drop Image File Here</span>
					<span class="smaller">to add them</span>
				</span>
				<span v-else>
					<span>Drag Your File Here</span>
					<span class="smaller">
						or <strong><em>click here</em></strong> to select file
					</span>
				</span>

				<input type="file" id="file-input" @change="onInputChange" />
			</label>
			<ul class="image-list" v-show="file">
				<FilePreview :file="file" tag="li" @remove="removeFile" />
			</ul>
		</DropZone>
		<button @click.prevent="uploadFile()" class="upload-button">Upload</button>
	</div>
</template>

<script setup lang="ts">
// Components
import DropZone from '../components/DropZone.vue'
import FilePreview from '../components/FilePreview.vue'

// File Management
import useFileList from '../api/file-list'

const { file, addFile, removeFile } = useFileList()

// Uploader
//import createUploader from '../vue-dd-uploader/src/compositions/file-uploader'
import { SupabaseStore } from "../api/SupabaseStore";
const store = new SupabaseStore()
const { uploadFile } = await store.upload("avatar", "public/" + file.url, file.file)

function onInputChange(e: { target: { files: any[]; value: null } }) {
	//store.upload(e.target.files[0])
	addFile(e.target.files[0])
	e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
}
</script>

