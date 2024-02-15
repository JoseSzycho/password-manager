import { IEmailModel } from '../interfaces/model.interface';

/**
 * Returns the html body for a user registration email
 * @param user The user information
 * @param magicLink The registration email
 * @returns The email body
 */
export const loginModel = (magicLink: string): IEmailModel => {
    return {
        subject: 'KeyPass login',
        htmlBody: `<strong>Login link: ${magicLink}</strong>}`,
    };
};
