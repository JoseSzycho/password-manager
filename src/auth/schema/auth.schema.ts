import { JSONSchemaType } from 'ajv';
import { IAuth } from '../interface';

export const authSchema: JSONSchemaType<IAuth> = {
    type: 'object',
    properties: {
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8, maxLength: 36 },
        repeatedPassword: { type: 'string', minLength: 8, maxLength: 36 },
    },
    required: [
        'firstName',
        'lastName',
        'email',
        'password',
        'repeatedPassword',
    ],
};
