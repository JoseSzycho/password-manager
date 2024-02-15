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
        const origin = req.get('origin') ?? 'http://localhost:3000';
        try {
            await this.authService.signUp(user, origin);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {
        const jwt = req.query.jwt as string;

        try {
            const user = await this.authService.register(jwt);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    loginRequest = async (req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        try {
            await this.authService.loginRequest(email);
            // Always response with 204, so no one can know
            // if a email is registered or not
            res.status(204).json('');
        } catch (error) {
            next(error);
        }
    };
}

const authController = new AuthController(authService);
export { authController };
