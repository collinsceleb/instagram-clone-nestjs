import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.createComment(createCommentInput);
  }

  @Query(() => [Comment])
  comments(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<Comment[]> {
    return this.commentsService.getAllComments(postId);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.updateComment({
      id: updateCommentInput.id,
      content: updateCommentInput.content,
    });
  }

  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
