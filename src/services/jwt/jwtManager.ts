import jwt from 'jsonwebtoken';
import 'dotenv/config';

class JWTManager {
    private privateKey: string;
    /**
     * JWT manager that allows JWT generation and verification
     */
    constructor() {
        this.privateKey = process.env.JWT_PRIVATE_KEY ?? 'secret_key';
    }

    /**
     * Generate a JWT from a payload
     * @param payload They payload
     * @returns
     */
    generate(payload: object) {
        return jwt.sign(payload, process.env.JWT_PRIVATE_KEY || 'secret-key', {
            expiresIn: '1h',
        });
    }

    /**
     * Returns the payload if jwt is verified, otherwise
     * throws an error
     * @param token The JWT
     * @returns They payload
     */
    getPayload(token: string) {
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'secret-key');
    }
}

const jwtManager = new JWTManager();

export { jwtManager };
