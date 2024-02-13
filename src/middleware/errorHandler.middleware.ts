/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../errors/interface';

export const errorHandler = (
    error: ICustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.status).json({
        error: {
            message: error.message,
        },
    });
};
