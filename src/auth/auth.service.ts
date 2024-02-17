import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IUser } from './interface';
import { jwtManager } from '../services/jwt';
import { gmailProvider } from '../services/email';
import { registerModel } from '../services/email/models/registerModel';
import { ConflictException } from '../errors';
import { ForbiddenException } from '../errors';
import { userRegistrationJWT } from './interface/userRegistrationJWT.interface';
import { UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { loginModel } from '../services/email/models/loginModel';

class AuthService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /**
     * Sends an email to the signed up user with the registration link.
     * Once the user clicks on the link, the user will be created and
     * stored into the data base.
     * @param user The user information
     * @returns Nothing to avoid registered email leaks
     */
    async signUp(user: IUser, origin: string) {
        if (await this.prisma.user.findUnique({ where: { email: user.email } }))
            return;

        const token = jwtManager.generate({ ...user, action: 'register' });
        const registrationLink = `${origin}/auth/register?jwt=${token}`;

        await gmailProvider.send(
            registerModel(user, registrationLink),
            user.email
        );

        return;
    }

    /**
     * Register a user given the payload of a valid JWT
     * @param jwt The JWT
     * @returns The user information
     */
    async register(jwt: string) {
        let user;

        try {
            const payload = jwtManager.getPayload(jwt) as userRegistrationJWT;
            if (payload.action != 'register') throw new Error();

            user = new UserDto(payload);
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }

        try {
            const createdUser = await this.prisma.user.create({
                data: {
                    ...user,
                },
            });

            return new UserDto(createdUser);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Account already created');
                }
            }
            throw error;
        }
    }

    /**
     * Sends a email to the email of the requested login with a magic
     * link that allows to login into the account.
     * @param email The user email
     * @returns Nothing to avoid registered email leaks
     */
    async loginRequest(email: string, origin: string) {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) return;

        const token = jwtManager.generate({ userId: user.id, action: 'login' });
        const loginLink = `${origin}/auth/loginRequest?jwt=${token}`;
        await gmailProvider.send(loginModel(loginLink), email);

        return;
    }
}

const authService = new AuthService(prisma);

export { authService, AuthService };
