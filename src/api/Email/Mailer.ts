import { EmailType } from './../../Types';
import { EmailAddress } from '@/Types';
import { Zeptomail } from './Zeptomail';
export class Mailer {
    constructor() {
        this.agent = new Zeptomail()
    }

    agent

    sendMails (user: EmailAddress[], email: EmailType) {
        this.agent.sendMail(user, email);
        this.agent.sendBatchTemplate(user, email)
    }
    sendMail () {}
}