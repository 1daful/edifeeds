import config from "../../../public/config.json";
import { SendMailClient } from 'zeptomail';
export class Zeptomail {
    constructor() {
    }
    token = config.api.Zeptomail.token;
    url = config.api.Zeptomail.url;
    client = new SendMailClient({ url: this.url, token: this.token });
    admin = [{
            address: config.email.address,
            name: config.email.name
        }];
    sendMail(user, email) {
        this.client.sendMail({
            bounce_address: config.email.bounceAddress,
            from: {
                address: config.email.address,
                name: config.email.name
            },
            to: user,
            reply_to: this.admin,
            subject: email.subject,
            textbody: email.text,
            htmlbody: email.html,
            cc: email.cc,
            bcc: email.bcc,
            track_clicks: true,
            track_opens: true,
            //"client_reference": "<client reference>", 
            //mime_headers: { X-Zylker-User: "test-xxxx" }, 
            attachments: email.attachments,
            inline_images: email.inline_images
        }).then((resp) => console.log("success")).catch((error) => console.log("error"));
    }
    sendMailWithTemplate(user, email) {
        this.client.sendMailWithTemplate({
            mail_template_key: email.html,
            bounce_address: config.email.bounceAddress,
            from: {
                address: config.email.address,
                name: config.email.name
            },
            to: user,
            reply_to: this.admin,
            cc: email.cc,
            bcc: email.bcc,
            /*merge_info: {
                contact_number: user.contact_number,
                company: user.company
            },*/
            /*"client_reference": "<client reference>",
            "mime_headers": {
                "X-Test": "test"
            }*/
        }).then((resp) => console.log("success")).catch((error) => console.log("error"));
    }
    sendBatchTemplate(user, email) {
        this.client.mailBatchWithTemplate({
            mail_template_key: email.html,
            bounce_address: config.email.bounceAddress,
            from: {
                address: config.email.address,
                name: config.email.name
            },
            to: user,
            reply_to: this.admin,
            /*"client_reference": "<client reference>",
            "mime_headers": {
                "X-Test": "test"
            }*/
        }).then((resp) => console.log("success")).catch((error) => console.log("error"));
    }
}
//# sourceMappingURL=Zeptomail.js.map