import { Resource } from './../Resource';
import { Axiosi } from './../Axiosi';
import config from "../../../public/config.json";
export class Zeptomail {
    resources = [];
    getBaseUrl() {
        try {
            const apiBaseUrl = config.api.Zeptomail.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        const apiBaseParams = config.api.Zeptomail.config;
        return apiBaseParams;
    }
    getData(res) {
        return res;
    }
    admin = [{
            address: config.email.address,
            name: config.email.name
        }];
    getResource(req, user, email) {
        switch (req) {
            case "single":
                return new Resource(this, "email", {
                    name: "emailReq",
                    baseUrl: "/email",
                    params: {},
                    data: {
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
                        attachments: email.attachments,
                        inline_images: email.inline_images
                    }
                }, "emailResp");
            case "single_template":
                return new Resource(this, "email", {
                    name: "templateReq",
                    baseUrl: "/email/template",
                    params: {},
                    data: {
                        mail_template_key: email.templateKey,
                        bounce_address: config.email.bounceAddress,
                        from: {
                            address: config.email.address,
                            name: config.email.name
                        },
                        to: user,
                        reply_to: this.admin,
                        cc: email.cc,
                        bcc: email.bcc,
                    }
                }, "templateResp");
            case "batch_template":
                return new Resource(this, "email", {
                    name: "tempBatch",
                    baseUrl: "/email/template/batch",
                    params: {},
                    data: {
                        mail_template_key: email.html,
                        bounce_address: config.email.bounceAddress,
                        from: {
                            address: config.email.address,
                            name: config.email.name
                        },
                        to: user,
                        reply_to: this.admin,
                    }
                }, "tempBatchResp");
            default:
                return new Resource(this, "", {
                    name: "",
                    baseUrl: "",
                    params: {}
                }, "");
        }
    }
    client = new Axiosi();
}
//# sourceMappingURL=Zeptomail.js.map