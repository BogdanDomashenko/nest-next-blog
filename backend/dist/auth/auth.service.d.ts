import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, SigninDto } from './dto';
import { AccessToken } from '../shared/types';
export declare class AuthService {
    private prisma;
    private config;
    private jwt;
    constructor(prisma: PrismaService, config: ConfigService, jwt: JwtService);
    signup(dto: SignupDto): Promise<void>;
    signin(dto: SigninDto): Promise<AccessToken>;
    signToken(id: number, email: string, username: string, role: string): Promise<AccessToken>;
}
