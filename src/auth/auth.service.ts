import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IUser } from './interface';
import { UserDto } from './dto';
import { ConflictException } from '../errors/';

class AuthService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async signUp(user: IUser) {
        try {
            const data = await this.prisma.user.create({
                data: {
                    ...user,
                },
            });

            return new UserDto(data);
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
