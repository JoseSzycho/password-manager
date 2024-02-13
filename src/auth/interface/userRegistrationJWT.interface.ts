import { IUser } from './';

export interface userRegistrationJWT extends IUser {
    action: 'register';
}
