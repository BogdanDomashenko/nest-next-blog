import { PrismaService } from '../prisma/prisma.service';
import type { Post, User } from '@prisma/client';
import { PostDto } from './dto/post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<Post[]>;
    mylist(user: User): Promise<Post[]>;
    create(dto: PostDto, user: User): Promise<Post>;
    delete(dto: DeletePostDto, user: User): Promise<void>;
}
