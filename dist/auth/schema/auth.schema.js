"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
exports.authSchema = {
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
//# sourceMappingURL=auth.schema.js.map