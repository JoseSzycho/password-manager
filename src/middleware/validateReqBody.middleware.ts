import { Request, Response, NextFunction } from 'express';
import { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { BadRequestException } from '../errors';

export const validateReqBody = (schema: JSONSchemaType<unknown>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ allErrors: true });
        addFormats(ajv, ['email']);
        const validate = ajv.compile(schema);

        if (validate(req.body)) {
            next();
            return;
        } else {
            const error = new BadRequestException(
                'The request object is incorrect'
            );
            next(error);
        }
    };
};
