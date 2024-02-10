import { Request, Response, NextFunction } from 'express';
import { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';

export const validateReqBody = (schema: JSONSchemaType<unknown>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ allErrors: true, verbose: true });
        addFormats(ajv, ['email']);
        const validate = ajv.compile(schema);

        if (validate(req.body)) {
            next();
            return;
        } else {
            res.status(409).json(validate.errors);
        }
    };
};
