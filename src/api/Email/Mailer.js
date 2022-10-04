import { Zeptomail } from './Zeptomail';
export class Mailer {
    constructor() {
        this.agent = new Zeptomail();
    }
    agent;
    sendMails(user, email) {
        this.agent.sendMail(user, email);
        this.agent.sendBatchTemplate(user, email);
    }
    sendMail() { }
}
//# sourceMappingURL=Mailer.js.map