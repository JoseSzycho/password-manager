import { NextFunction, Request, Response } from 'express';
import { authService, AuthService } from './auth.service';
import { IUser } from './interface';
import { InternalServerErrorException } from '../errors';
import 'dotenv/config';
import { URLs } from '../config/URLs.config';

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
            res.status(204).json('');
        } catch (error) {
            next(error);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {
        const origin = URLs.origin;
        const jwt = req.query.jwt as string;
        // set internalUse to not send the email login request
        const internalUse = true;

        try {
            // register user and get login link
            const user = await this.authService.register(jwt);
            const loginLink = await this.authService.loginRequest(
                user.email,
                origin,
                internalUse
            );

            if (loginLink) {
                // if register jwt valid, should always being a login link,
                // as error is thrown if jwt was invalid
                res.redirect(loginLink);
            } else {
                // if no login link, there is some server error
                throw new InternalServerErrorException('Unexpected error');
            }
        } catch (error) {
            next(error);
        }
    };

    loginRequest = async (req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const origin = URLs.origin;
        try {
            await this.authService.loginRequest(email, origin);
            // Always response with 204, so no one can know
            // if a email is registered or not
            res.status(204).json('');
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        const jwt = req.query.jwt as string;
        try {
            const authJwt = await this.authService.login(jwt);
            res.cookie('jwt', authJwt, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                signed: true,
            }).redirect(
                `${req.get('origin') ?? 'http://localhost:3000'}/dashboard`
            );
        } catch (error) {
            next(error);
        }
    };
}

const authController = new AuthController(authService);
export { authController };
