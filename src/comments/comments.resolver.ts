import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../users/guards/gql-auth.guard';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.createComment(createCommentInput);
  }

  @Query(() => [Comment])
  @UseGuards(GqlAuthGuard)
  comments(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<Comment[]> {
    return this.commentsService.getAllComments(postId);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.updateComment({
      id: updateCommentInput.id,
      content: updateCommentInput.content,
    });
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  deleteComment(@Args('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
