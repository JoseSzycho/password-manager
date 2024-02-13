import { NextFunction, Request, Response } from 'express';
import { authService, AuthService } from './auth.service';
import { IUser } from './interface';

class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const user: IUser = req.body;
        try {
            const data = await this.authService.signUp(user);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };
}

const authController = new AuthController(authService);
export { authController };
