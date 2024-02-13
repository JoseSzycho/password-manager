import { ICustomError } from './interface';

export class BadRequestException extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}
