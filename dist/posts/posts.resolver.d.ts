import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(createPostInput: CreatePostInput): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: any): Promise<Post>;
    updatePost(updatePostInput: UpdatePostInput): Promise<Post>;
    deletePost(id: number): string;
}
