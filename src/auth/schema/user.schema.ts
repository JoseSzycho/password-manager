import { JSONSchemaType } from 'ajv';
import { IUser } from '../interface';

export const userSchema: JSONSchemaType<IUser> = {
    type: 'object',
    properties: {
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
    },
    required: ['firstName', 'lastName', 'email'],
    additionalProperties: false,
};
