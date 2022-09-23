export type MediaType = {
  id: string
  title: string
  type: string
  authors: {
          name: string,
          pic: string,
          bio: string
  }[]
  publisher: {
          name: string,
          logo: string,
          description: string
  }
  status: string
  meta: any
  privacy: string
  topic: string
  isbn: string
  license: string
  //lccl: string
  //oclc: string
  //format: string
  //printType: string
  orderBy: string
  content: string
  created: any
  thumbnailSmall: string
  thumbnailLarge: string
  genre: string
  tags: []
  region: string
  length: number

  description: string
  keywords: []
}

export type AuthorType = {
  name: string
  pic: string
  bio: string
}

export type ConfigType = {
  header: any
  baseParam: any
}

export type Params = {
  limit: number
}

export type Section = "Recommended" | "Popular" | "Latest" | "Related"

export type MediaRes = "quotes" | "videos" | "books" | "music" | "quote" | "video" | "book" | "track" | "collections" | "images"

export type EmailAddress = {
  address: string,
  name: string,
  contact_number: string,
  company: string
}

type Base64Attachment = {
  content: string, 
  mime_type: string, 
  name: string
}

type Base64InlineImage = {
  content: string, 
  mime_type: string, 
  cid: string
}

type InlineImage = { 
  file_cache_key: string, 
  cid: string
}

type Attachment = { 
  file_cache_key: string, 
  name: string
}

export type EmailType = {
  subject: string,
  text: string,
  html: string,
  cc: EmailAddress[],
  bcc: EmailAddress[],
  attachments: Attachment[] | Base64Attachment[],
  inline_images: Base64InlineImage[] | InlineImage[]
}

export type filterType = "eq" | "gt" | "gte" | "lt" | "lte" | "ne" | "in" | "nin" | "exists" | "all"