import { ListMonk } from './Listmonk';
import { Zeptomail } from './Zeptomail';
import { Axiosi } from '../Axiosi';
import config from "../../../public/config.json";
export class Mailer {
    constructor() {
        this.client = new Axiosi();
    }
    client;
    sender = config.email.address;
    host = "smtp.zeptomail.com";
    messeger = new ListMonk();
    sendEmail(user, email) {
        this.client.post(this.messeger.transact(user));
    }
    sendTemplateEmail(user, email) {
        this.client.post(new Zeptomail().getResource("single_template", user, email));
    }
    sendTemplateBatch(user, email) {
        this.client.post(new Zeptomail().getResource("batch_template", user, email));
    }
}
//# sourceMappingURL=Mailer.js.map