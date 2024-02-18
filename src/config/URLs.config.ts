import 'dotenv/config';

export const URLs = {
    origin:
        (process.env.NODE_ENV === 'dev'
            ? 'http://localhost:3000'
            : process.env.ORIGIN_URL) ?? '',
};
