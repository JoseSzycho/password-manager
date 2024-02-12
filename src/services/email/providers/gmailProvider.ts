import { SMTPProvider } from './SMTPProvider';
import 'dotenv/config';

const gmailProvider = new SMTPProvider(
    'smtp.gmail.com',
    465,
    process.env.GMAIL_PROVIDER_USER || '',
    process.env.GMAIL_PROVIDER_PASSWORD || ''
);

export { gmailProvider };
