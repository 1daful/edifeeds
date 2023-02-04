import { MediaType } from './../../Types';
import GhostContentAPI from '@tryghost/content-api'

export class Ghost {
    constructor(){
        this.api = new GhostContentAPI({
            url: 'https://demo.ghost.io',
            key: '22444f78447824223cefc48062',
            version: "v5.0"
          });
    }
api
    async getPosts() {   
        // fetch 8 posts, including related tags and authors
        const mediaItems: MediaType[] = []
        const posts = await this.api.posts
            .browse({limit: 8, include: 'tags,authors'})
            posts.forEach(post => {
                const media: MediaType = {
                    id: post.id || "",
                    title: post.title || "",
                    type: "posts",
                    authors: post.authors,
                    meta: {
                        comment: post.comment_id,
                        description: post.meta_description,
                        title: post.meta_title,
                        ogDescription: post.og_description,
                        ogImage: post.og_image,
                        ogTitle: post.og_title,
                        updated_at: post.updated_at
                    },
                    status: "published",
                    topic: "",
                    privacy: "public",
                    isbn: "",
                    license: "",
                    content: "",
                    orderby: "",
                    thumbnaillarge: post.feature_image || "",
                    thumbnailsmall: post.feature_image || "",
                    genre: post.primary_tag || "",
                    tags: post.tags,
                    region: "",
                    duration: post.reading_time,
                    publisher: {
                        name: '',
                        logo: '',
                        description: ''
                    },
                    description: post.excerpt,
                    keywords: [],
                    inserted_at: post.published_at
                }
                mediaItems.push(media)
            });
            return mediaItems
    }

    async getPost(id: string) {
        const post = await this.api.posts.read({id: id});
        const media: MediaType = {
            id: post.id || "",
            title: post.title || "",
            type: "posts",
            authors: post.authors,
            meta: {
                comment: post.comment_id,
                description: post.meta_description,
                title: post.meta_title,
                ogDescription: post.og_description,
                ogImage: post.og_image,
                ogTitle: post.og_title,
                updated_at: post.updated_at
            },
            status: "published",
            topic: "",
            privacy: "public",
            isbn: "",
            license: "",
            content: post.html,
            orderby: "",
            thumbnaillarge: post.feature_image || "",
            thumbnailsmall: post.feature_image || "",
            genre: post.primary_tag?.name || "",
            tags: post.tags,
            region: "",
            duration: post.reading_time,
            publisher: {
                name: '',
                logo: '',
                description: ''
            },
            description: post.excerpt,
            keywords: [],
            inserted_at: post.published_at
        }
        return await media
    }
}