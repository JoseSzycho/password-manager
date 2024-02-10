import { Request, Response } from 'express';

class AuthController {
    signUp = (req: Request, res: Response) => {
        res.status(200).json(req.body);
    };
}

const authController = new AuthController();
export { authController };
