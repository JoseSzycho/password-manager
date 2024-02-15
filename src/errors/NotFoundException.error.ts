import { ICustomError } from './interface';

export class NotFoundException extends Error implements ICustomError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}
