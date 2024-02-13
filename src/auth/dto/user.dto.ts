import { IUser } from '../interface';

export class UserDto implements IUser {
    firstName: string;
    lastName: string;
    email: string;
    constructor(user: IUser) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
