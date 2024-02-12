import nodemailer from 'nodemailer';
import { IEmailModel } from '../interfaces/model.interface';
import { IEmailProvider } from '../interfaces/provider.interface';

export class SMTPProvider implements IEmailProvider {
    private user: string;
    private transporter;

    /**
     * Defines an email SMTP provider instance
     * @param host The SMTP host
     * @param port The SMTP port
     * @param user The SMTP user
     * @param password  The SMTP password
     */
    constructor(host: string, port: number, user: string, password: string) {
        this.user = user;

        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true,
            auth: {
                user: this.user,
                pass: password,
            },
        });
    }

    /**
     * Sends an email to a recipient given and html model
     * @param model The model
     * @param recipient The recipient
     * @returns <true> if sent, <false> if not
     */
    async send(model: IEmailModel, recipient: string): Promise<boolean> {
        const mailOptions = {
            from: this.user,
            to: recipient,
            subject: model.subject,
            html: model.htmlBody,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (e) {
            return false;
        }
    }
}
