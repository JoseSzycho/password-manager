import { ICustomError } from './interface';

export class ConflictException extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 409;
    }
}
