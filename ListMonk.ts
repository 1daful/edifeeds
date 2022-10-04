
list: {
  baseUrl: "api/lists"
  listPostResponse: {
    data: {
        id: 5,
        created_at: "2020-03-07T06:31:06.072483+01:00",
        updated_at: "2020-03-07T06:31:06.072483+01:00",
        uuid: "1bb246ab-7417-4cef-bddc-8fc8fc941d3a",
        name: "Test list",
        type: "public",
        tags: [],
        subscriber_count: 0
    }
}
  listPostRequest: {
  name: 
  type: "private" | "public"
  optin: "single" | "double"
  tags?: []
}
  listGetRequest: {
query	string
order_by: "name" | "status" | "created_at" | "updated_at"
order	string
page	number	
per_page	number
}
  listGetResponse: {
    "data": {
        "results": [
            {
                "id": 1,
                "created_at": "2020-02-10T23:07:16.194843+01:00",
                "updated_at": "2020-03-06T22:32:01.118327+01:00",
                "uuid": "ce13e971-c2ed-4069-bd0c-240e9a9f56f9",
                "name": "Default list",
                "type": "public",
                "optin": "double",
                "tags": [
                    "test"
                ],
                "subscriber_count": 2
            },
            {
                "id": 2,
                "created_at": "2020-03-04T21:12:09.555013+01:00",
                "updated_at": "2020-03-06T22:34:46.405031+01:00",
                "uuid": "f20a2308-dfb5-4420-a56d-ecf0618a102d",
                "name": "get",
                "type": "private",
                "optin": "single",
                "tags": [],
                "subscriber_count": 0
            }
        ],
        "total": 5,
        "per_page": 20,
        "page": 1
    }
}
  listIdGetRequest: {
  list_id:
}
  listIdGetResponse: {
    "data": {
        "id": 5,
        "created_at": "2020-03-07T06:31:06.072483+01:00",
        "updated_at": "2020-03-07T06:31:06.072483+01:00",
        "uuid": "1bb246ab-7417-4cef-bddc-8fc8fc941d3a",
        "name": "Test list",
        "type": "public",
        "optin": "double",
        "tags": [],
        "subscriber_count": 0
    }
}
}

subscriber = {
  baseUrl: "/api/subscribers"
  subscriberGetRequest: {
  page: 1
  per_page: 12
}
  subscriberGetResponse: {
    "data": {
        "results": [
            {
                "id": 1,
                "created_at": "2020-02-10T23:07:16.199433+01:00",
                "updated_at": "2020-02-10T23:07:16.199433+01:00",
                "uuid": "ea06b2e7-4b08-4697-bcfc-2a5c6dde8f1c",
                "email": "john@example.com",
                "name": "John Doe",
                "attribs": {
                    "city": "Bengaluru",
                    "good": true,
                    "type": "known"
                },
                "status": "enabled",
                "lists": [
                    {
                        "subscription_status": "unconfirmed",
                        "id": 1,
                        "uuid": "ce13e971-c2ed-4069-bd0c-240e9a9f56f9",
                        "name": "Default list",
                        "type": "public",
                        "tags": [
                            "test"
                        ],
                        "created_at": "2020-02-10T23:07:16.194843+01:00",
                        "updated_at": "2020-02-10T23:07:16.194843+01:00"
                    }
                ]
            },
            {
                "id": 2,
                "created_at": "2020-02-18T21:10:17.218979+01:00",
                "updated_at": "2020-02-18T21:10:17.218979+01:00",
                "uuid": "ccf66172-f87f-4509-b7af-e8716f739860",
                "email": "quadri@example.com",
                "name": "quadri",
                "attribs": {},
                "status": "enabled",
                "lists": [
                    {
                        "subscription_status": "unconfirmed",
                        "id": 1,
                        "uuid": "ce13e971-c2ed-4069-bd0c-240e9a9f56f9",
                        "name": "Default list",
                        "type": "public",
                        "tags": [
                            "test"
                        ],
                        "created_at": "2020-02-10T23:07:16.194843+01:00",
                        "updated_at": "2020-02-10T23:07:16.194843+01:00"
                    }
                ]
            },
            {
                "id": 3,
                "created_at": "2020-02-19T19:10:49.36636+01:00",
                "updated_at": "2020-02-19T19:10:49.36636+01:00",
                "uuid": "5d940585-3cc8-4add-b9c5-76efba3c6edd",
                "email": "sugar@example.com",
                "name": "sugar",
                "attribs": {},
                "status": "enabled",
                "lists": []
            }
        ],
        "query": "",
        "total": 3,
        "per_page": 20,
        "page": 1
    }
}
  subscriberPostRequest: {
Name: String
email: String
name:	String
status:	String = "enabled" | "disabled" | "blocked"
lists:	Number[]
attribs?: {}
preconfirm_subscriptions?:	Boolean
}
  subscriberPostResponse: {
  "data": {
    "id": 3,
    "created_at": "2019-07-03T12:17:29.735507+05:30",
    "updated_at": "2019-07-03T12:17:29.735507+05:30",
    "uuid": "eb420c55-4cfb-4972-92ba-c93c34ba475d",
    "email": "subsriber@domain.com",
    "name": "The Subscriber",
    "attribs": {
      "city": "Bengaluru",
      "projects": 3,
      "stack": { "languages": ["go", "python"] }
    },
    "status": "enabled",
    "lists": [1]
  }
}
  subscriberDeleteRequest: {
  param: {id}
}
  subscriberDeleteResponse: {
  "data": true
}
}

campaign = {
  baseUrl: "/api/campaigns"
  campaignPostRequest: {
name	String
subject	String	
lists	[]Number	Required	
from_email?	String
type: "regular" | "optin"
content_type: "richtext" | "html" | "markdown" | "plain"
body	String	
altbody?	String
send_at?	String
messenger?	String
template_id?	Number	
tags?	[]String
}
  campaignPostResponse: {
    "data": {
        "id": 1,
        "created_at": "2021-12-27T11:50:23.333485Z",
        "updated_at": "2021-12-27T11:50:23.333485Z",
        "views": 0,
        "clicks": 0,
        "bounces": 0,
        "lists": [{
            "id": 1,
            "name": "Default list"
        }],
        "started_at": null,
        "to_send": 1,
        "sent": 0,
        "uuid": "90c889cc-3728-4064-bbcb-5c1c446633b3",
        "type": "regular",
        "name": "Test campaign",
        "subject": "Hello, world",
        "from_email": "listmonk \u003cnoreply@listmonk.yoursite.com\u003e",
        "body": "",
        "altbody": null,
        "send_at": null,
        "status": "draft",
        "content_type": "richtext",
        "tags": ["test"],
        "template_id": 1,
        "messenger": "email"
    }
}
}

transactional = {
  baseUrl: "/api/tx"
  transactionalPostRequest: {
subscriber_email	String
subscriber_id?	Number
template_id	Number
data?	Object
headers?	[]Object
content_type?: "html" | "markdown" | "plain"
}
  transactionalPostResponse: {
  "data": true
}
}