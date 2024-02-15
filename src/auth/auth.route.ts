import express, { Router } from 'express';
import { authController } from './auth.controller';
import { validateReqBody } from '../middleware';
import { emailSchema, userSchema } from './schema';

const router: Router = express.Router();

router.post('/signup', validateReqBody(userSchema), authController.signUp);
router.post('/register', authController.register);
router.post(
    '/login-request',
    validateReqBody(emailSchema),
    authController.loginRequest
);

export { router as authRouter };
