import { injectable } from 'tsyringe';
import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';

import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION,
            }),
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = Handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <rentx.application.noreply@gmail.com>',
            subject,
            html: templateHTML,
        });

        console.log('Message sent: %s', message.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { SESMailProvider };
