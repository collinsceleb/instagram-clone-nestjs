import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const post = await this.postRepository.findOneBy({
      id: createCommentInput.postId,
    });
    const user = await this.userRepository.findOneBy({
      id: createCommentInput.userId,
    });
    const newComment = await this.commentRepository.create({
      content: createCommentInput.content,
      post: post,
      user: user,
    });
    return this.commentRepository.save(newComment);
  }

  getAllComments(postId): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'user'],
    });
  }

  async updateComment(updateCommentInput: UpdateCommentInput) {
    await this.commentRepository.update(
      { id: updateCommentInput.id },
      {
        content: updateCommentInput.content,
      },
    );
    return await this.commentRepository.findOne({
      where: { id: updateCommentInput.id },
      relations: ['post', 'user'],
    });
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
