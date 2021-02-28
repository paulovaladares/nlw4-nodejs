import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';

class SendMailService {
ß
    private client: Transporter

    constructor() {
        this.createAccount();
    }

    async createAccount() {
        const account = await nodemailer.createTestAccount();
        const transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        this.client = transporter;
    }

    async execute(to:string, subject:string, path:string, bodyInfo:object) {
        const templateFileContents = fs.readFileSync(path).toString("utf8");
        const mailTemplateParser = handlebars.compile(templateFileContents);
        const html = mailTemplateParser(bodyInfo);
        const message = {
            to,
            subject,
            html,
            from: 'Test Sender <noreply@paulovaladares.com.br>',
        };

        const mailResult = await this.client.sendMail(message);
        console.log('Message sent: %s', mailResult.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailResult));
    }
}

export default new SendMailService();