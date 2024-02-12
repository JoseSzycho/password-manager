import { IEmailModel } from './model.interface';

export interface IEmailProvider {
    send(model: IEmailModel, recipient: string): Promise<boolean>;
}
