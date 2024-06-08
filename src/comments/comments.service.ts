import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Auth } from '../users/entities/auth.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({
      where: {
        id: createCommentInput.postId,
      },
    });
    const user = await this.userRepository.findOne({
      where: {
        id: createCommentInput.userId,
      },
    });
    const newComment = await this.commentRepository.create({
      ...createCommentInput,
      post,
      user,
    });
    await this.commentRepository.save(newComment);
    return newComment;
  }

  getAllComments(postId): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'user'],
    });
  }

  async updateComment(id: number, updateCommentInput: UpdateCommentInput) {
    await this.commentRepository.update(id, updateCommentInput);
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['post', 'user'],
    });
  }

  async deleteComment(id: number) {
    const result = await this.commentRepository.delete(id);
    return { success: result.affected > 0 };
  }
}
