import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IUser } from './interface';
import { jwtManager } from '../services/jwt';
import { gmailProvider } from '../services/email';
import { registerModel } from '../services/email/models/registerModel';
import { ConflictException, InternalServerErrorException } from '../errors';
import { ForbiddenException } from '../errors';
import { userRegistrationJWT } from './interface/userRegistrationJWT.interface';
import { UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
     * @returns The user information
     */
    async signUp(user: IUser) {
        if (await this.prisma.user.findUnique({ where: { email: user.email } }))
            throw new ConflictException('Email already in use');

        const token = jwtManager.generate({ ...user, action: 'register' });
        const registrationLink = `http://localhost:3000/auth/register?jwt=${token}`;
        const emailSent = await gmailProvider.send(
            registerModel(user, registrationLink),
            user.email
        );

        if (!emailSent) {
            throw new InternalServerErrorException('Server can not send email');
        }

        return user;
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
            if (payload.action != 'register')
                throw new ForbiddenException('Invalid action');

            user = new UserDto(payload);
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }

        try {
            await this.prisma.user.create({
                data: {
                    ...user,
                },
            });

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Email address in use.');
                }
            }
            throw error;
        }
    }
}

const authService = new AuthService(prisma);

export { authService, AuthService };
