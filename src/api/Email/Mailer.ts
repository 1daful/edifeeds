import { ListMonk } from './Listmonk';
import { EmailType } from './../../Types';
import { EmailAddress } from '@/Types';
import { Zeptomail } from './Zeptomail';
import { Axiosi } from '../Axiosi';
import config from "../../../public/config.json"
export class Mailer {
    constructor() {
        this.client = new Axiosi()
    }

    client
    sender = config.email.address
    host = "smtp.zeptomail.com"
    messeger = new ListMonk()

    sendEmail(user: EmailAddress[], email: EmailType) {
        this.client.post(this.messeger.transact(user))
        /*let msg = {
            sender: this.sender,
            to: [user.address],
            msg: email.html,
            host: this.host
        }*/
        //this.client.postTo(config.backURL + "/mailer", msg)
    }
    sendTemplateEmail(user: EmailAddress[], email: EmailType) {
        this.client.post(new Zeptomail().getResource("single_template", user, email))
    }
    sendTemplateBatch(user: EmailAddress[], email: EmailType) {
        this.client.post(new Zeptomail().getResource("batch_template", user, email))
    }
}