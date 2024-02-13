import { ICustomError } from './interface';

export class ForbiddenException extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 403;
    }
}
