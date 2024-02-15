import { JSONSchemaType } from 'ajv';
import { IEmail } from '../interface';

export const emailSchema: JSONSchemaType<IEmail> = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
    },
    required: ['email'],
    additionalProperties: false,
};
