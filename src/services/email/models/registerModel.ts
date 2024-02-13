import { IUser } from '../../../auth/interface';
import { IEmailModel } from '../interfaces/model.interface';

/**
 * Returns the html body for a user registration email
 * @param user The user information
 * @param magicLink The registration email
 * @returns The email body
 */
export const registerModel = (user: IUser, magicLink: string): IEmailModel => {
    return {
        subject: 'KeyPass registration',
        htmlBody: `<strong>First Name: ${user.firstName}</strong>
        <strong>Last Name: ${user.lastName}</strong>
        <strong>Email: ${user.email}</strong>
        <strong>Link to register: ${magicLink}</strong>`,
    };
};
