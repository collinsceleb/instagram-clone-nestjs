import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
export declare class CommentsResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentInput: CreateCommentInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateCommentInput: UpdateCommentInput): string;
    remove(id: number): string;
}
