import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation('createComment')
  create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentsService.create(createCommentInput);
  }

  @Query('comments')
  findAll() {
    return this.commentsService.findAll();
  }

  @Query('comment')
  findOne(@Args('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Mutation('updateComment')
  update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentsService.update(updateCommentInput.id, updateCommentInput);
  }

  @Mutation('removeComment')
  remove(@Args('id') id: number) {
    return this.commentsService.remove(id);
  }
}
