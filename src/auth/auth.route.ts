import express, { Router } from 'express';
import { authController } from './auth.controller';
import { validateReqBody } from '../middleware';
import { authSchema } from './schema/auth.schema';

const router: Router = express.Router();

router.post('/signup', validateReqBody(authSchema), authController.signUp);

export { router as authRouter };
