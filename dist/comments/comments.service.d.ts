import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
export declare class CommentsService {
    create(createCommentInput: CreateCommentInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCommentInput: UpdateCommentInput): string;
    remove(id: number): string;
}
