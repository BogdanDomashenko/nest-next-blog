import type { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    private static extractJWT;
    validate(payload: {
        sub: number;
        email: string;
        username: string;
    }): Promise<User>;
}
export {};
