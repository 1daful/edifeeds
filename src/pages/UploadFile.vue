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
				<FilePreview v-if="file" :file="file" tag="div" @remove="removeFile" />
		</DropZone>
		<q-btn v-if="file" @click.prevent="uploadFile" :loading="loading" :disable="loading" class="upload-button">Upload</q-btn>
	</div>
</template>

<script lang="ts">
// Components
import DropZone from '../components/DropZone.vue'
import FilePreview from '../components/FilePreview.vue'

// File Management
import useFileList, { UploadableFile } from '../api/file-list'

const { file, addFile, removeFile } = useFileList()

// Uploader
//import createUploader from '../vue-dd-uploader/src/compositions/file-uploader'
import { SupabaseStore } from "../api/SupabaseStore";
import { auth } from "../api/auth/SupabaseAuth";
import { defineComponent } from 'vue'

const store = new SupabaseStore()

export default defineComponent({
	name: 'SingleMediaPage',
    data() {
        return {
			file,
			//uploadFiles,
			addFile,
			removeFile,
			loading: false,
			auth
		}
	},
	components: {
		DropZone,
		FilePreview
	},
	methods: {
		onInputChange(e: { target: { files: any[]; value: null; }; }) {
			//store.upload(e.target.files[0])
			this.file = this.addFile(e.target.files[0])
			e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
		},

		async uploadFile() {
					// track status and upload file
			this.file.status = 'loading'
			this.loading = true

			// change status to indicate the success of the upload request
			const user = this.auth.startSession()
			const path = "public/" + user?.user_metadata.name
				const {data, error} = await store.upload("avatar", path, this.file.file)
				if (data) {this.file.status = true}
				else {this.file.status = false}
			this.loading = false
		}
	}
})
</script>
<style lang="stylus">
html {
	height: 100%;
	width: 100%;
	background-color: #b6d6f5;

	/* Overlapping Stripes Background, based off https://codepen.io/MinzCode/pen/Exgpqpe */
	--color1: rgba(55, 165, 255, 0.35);
	--color2: rgba(96, 181, 250, 0.35);
	--rotation: 135deg;
	--size: 10px;
	background-blend-mode: multiply;
	background-image: repeating-linear-gradient(
			var(--rotation),
			var(--color1) calc(var(--size) * 0),
			var(--color1) calc(var(--size) * 9),
			var(--color2) calc(var(--size) * 9),
			var(--color2) calc(var(--size) * 12),
			var(--color1) calc(var(--size) * 12)
		),
		repeating-linear-gradient(
			calc(var(--rotation) + 90deg),
			var(--color1) calc(var(--size) * 0),
			var(--color1) calc(var(--size) * 9),
			var(--color2) calc(var(--size) * 9),
			var(--color2) calc(var(--size) * 12),
			var(--color1) calc(var(--size) * 12)
		);
}

body {
	height: 100%;
	margin: 0;
	padding: 0;
}
</style>

<style scoped lang="stylus">
#app {
	font-family: Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0 auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.drop-area {
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 50px;
	background: #ffffff55;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	transition: .2s ease;

	&[data-active=true] {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		background: #ffffffcc;
	}
}

label {
	font-size: 36px;
	cursor: pointer;
	display: block;

	span {
		display: block;
	}

	input[type=file]:not(:focus-visible) {
		// Visually Hidden Styles taken from Bootstrap 5
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}

	.smaller {
		font-size: 16px;
	}
}

.image-list {
	display: flex;
	list-style: none;
	flex-wrap: wrap;
	padding: 0;
}

.upload-button {
	display: block;
	appearance: none;
	border: 0;
	border-radius: 50px;
	padding: 0.75rem 3rem;
	margin: 1rem auto;
	font-size: 1.25rem;
	font-weight: bold;
	background: #369;
	color: #fff;
	text-transform: uppercase;
}

button {
	cursor: pointer;
}
</style>
