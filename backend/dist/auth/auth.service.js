"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon = require("argon2");
const runtime_1 = require("@prisma/client/runtime");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, config, jwt) {
        this.prisma = prisma;
        this.config = config;
        this.jwt = jwt;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: { email: dto.email, username: dto.username, hash },
            });
            return;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Credentials taken');
                }
                throw error;
            }
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const token = await this.signToken(user.id, user.email, user.username, user.role);
        return token;
    }
    async signToken(id, email, username, role) {
        const payload = {
            sub: id,
            email,
            username,
            role,
        };
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: this.config.get('JWT_SECRET'),
        });
        return { access_token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map