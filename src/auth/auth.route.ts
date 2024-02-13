import express, { Router } from 'express';
import { authController } from './auth.controller';
import { validateReqBody } from '../middleware';
import { userSchema } from './schema';

const router: Router = express.Router();

router.post('/signup', validateReqBody(userSchema), authController.signUp);

export { router as authRouter };
