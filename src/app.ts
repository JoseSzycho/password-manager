import express from 'express';
import { authRouter } from './auth/auth.route';
import { errorHandler } from './middleware';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
