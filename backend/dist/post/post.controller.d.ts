import type { User } from '@prisma/client';
import { DeletePostDto } from './dto/delete-post.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    list(): Promise<import(".prisma/client").Post[]>;
    mylist(user: User): Promise<import(".prisma/client").Post[]>;
    create(dto: PostDto, user: User): Promise<import(".prisma/client").Post>;
    delete(dto: DeletePostDto, user: User): Promise<void>;
}
