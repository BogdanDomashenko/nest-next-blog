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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../shared/constants");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list() {
        return this.prisma.post.findMany({
            include: { author: { select: { username: true } } },
        });
    }
    async mylist(user) {
        return this.prisma.post.findMany({
            where: { authorId: user.id },
            include: {
                author: {
                    select: { id: true, username: true, email: true, role: true },
                },
            },
        });
    }
    async create(dto, user) {
        const post = await this.prisma.post.create({
            data: { title: dto.title, text: dto.text, authorId: user.id },
        });
        return post;
    }
    async delete(dto, user) {
        const post = await this.prisma.post.findUnique({ where: { id: dto.id } });
        if (!post) {
            throw new common_1.BadRequestException('This post does not exists');
        }
        if (post.authorId !== user.id && user.role !== constants_1.role.admin) {
            throw new common_1.ForbiddenException('Access dined');
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map