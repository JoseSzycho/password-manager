import { IAuth } from '../interface';

export class AuthDto {
    AuthDto: IAuth;
    constructor(auth: IAuth) {
        this.AuthDto = auth;
    }
}
