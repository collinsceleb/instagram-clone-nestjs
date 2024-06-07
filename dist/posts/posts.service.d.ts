import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    createPost(createPostInput: CreatePostInput): Promise<Post>;
    getAllPost(): Promise<Post[]>;
    getPostById(id: FindOneOptions<Post>): Promise<Post>;
    updatePostById(id: any, updatePostInput: UpdatePostInput): Promise<Post>;
    deletePost(id: number): string;
}
