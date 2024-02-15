import express from 'express';
import { authRouter } from './auth/auth.route';
import { errorHandler } from './middleware';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
