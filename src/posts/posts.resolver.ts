import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../users/guards/gql-auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Auth } from '../users/entities/auth.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: Auth,
  ) {
    return this.postsService.createPost({
      title: createPostInput.title,
      content: createPostInput.content,
      userId: user.id,
    });
  }

  @Query(() => [Post], { name: 'posts' })
  posts() {
    return this.postsService.getAllPost();
  }

  @Query(() => Post, { name: 'post' })
  post(@Args('id', { type: () => Int }) id: any) {
    return this.postsService.getPostById(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser() user: Auth,
  ) {
    return this.postsService.updatePostById(
      updatePostInput.id,
      updatePostInput,
    );
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.deletePost(id);
  }
}
