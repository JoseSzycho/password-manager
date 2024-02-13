import { ICustomError } from './interface';

export class InternalServerErrorException
    extends Error
    implements ICustomError
{
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 500;
    }
}
