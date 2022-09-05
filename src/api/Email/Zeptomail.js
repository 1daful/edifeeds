import config from "../../../public/config.json";
import { SendMailClient } from 'zeptomail';
export class Zeptomail {
    constructor() {
    }
    token = config.api.Zeptomail.token;
    url = config.api.Zeptomail.url;
    client = new SendMailClient({ url: this.url, token: this.token });
    sendMail(user, email, cc, bcc) {
        this.client.sendMail({
            bounce_address: "bounce@example.com",
            from: {
                "address": config.email.address,
                "name": config.email.name
            },
            to: [
                {
                    email_address: {
                        address: user.address,
                        name: user.name
                    }
                }
            ],
            reply_to: [{
                    address: config.email.address,
                    name: config.email.name
                }],
            subject: email.subject,
            textbody: email.text,
            htmlbody: email.html,
            cc: cc,
            bcc: bcc,
            track_clicks: true,
            track_opens: true,
            //"client_reference": "<client reference>", 
            //mime_headers: { X-Zylker-User: "test-xxxx" }, 
            attachments: [
                {
                    content: "..x+SEXa3zKfnDnBA2qExtXikBpUAFABQAhGSPY/0IoAWgD/2Q==",
                    mime_type: "image/jpg",
                    name: "DM-welcome-guide"
                },
                {
                    file_cache_key: "<File Cache Key>",
                    name: "DM-reports"
                }
            ],
            inline_images: [
                {
                    mime_type: "image/jpg",
                    content: "...x+SEXa3zKfnDnBA2qExtXikBpUAFABQAhGSPY/0IoAWgD/2Q==",
                    cid: "img-welcome-design"
                },
                {
                    file_cache_key: "<File Cache Key>",
                    cid: "img-CTA"
                }
            ]
        }).then((resp) => console.log("success")).catch((error) => console.log("error"));
    }
    sendMailWithTemplate(user, cc, bcc) {
        this.client.sendMailWithTemplate({
            "mail_template_key": "<template key>",
            "bounce_address": "bounce@example.com",
            from: {
                "address": config.email.address,
                "name": config.email.name
            },
            to: [{
                    email_address: {
                        address: user.address,
                        name: user.name
                    }
                }],
            reply_to: [{
                    address: config.email.address,
                    name: config.email.name
                }],
            cc: cc,
            bcc: bcc,
            merge_info: {
                "contact_number": "8787xxxxxx789",
                "company": "example.com"
            },
            "client_reference": "<client reference>",
            "mime_headers": {
                "X-Test": "test"
            }
        }).then((resp) => console.log("success")).catch((error) => console.log("error"));
    }
}
//# sourceMappingURL=Zeptomail.js.map