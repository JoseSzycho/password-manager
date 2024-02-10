import express from 'express';
import { authRouter } from './auth/auth.route';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
