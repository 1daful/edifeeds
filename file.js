// Use the JS library to create a bucket.

constructor() {const { data, error } = await supabase.storage.createBucket('avatars')}

upload(name: string, avatarFile: file){
const url = 'public/' + name + 'jpg'
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(url, avatarFile)
}


const { data, error } = await supabase.storage.from('avatars').download('public/avatar1.png')

getThumbnail(bucket:string, name: string){
const url = 'public/' + name + 'jpg'
	return await supabase.storage .from(bucket) // bucket name .getPublicUrl(url).publicURL // path to the image in the bucket 
}

getFile(url: string) {
let response = await fetch(url).blob
let file = await response.blob
return file
}
